'use strict'
require('dotenv').config()

const path = require('path')

const createPaginatedPages = require('gatsby-paginate')
const { pipe, pluck, intersection } = require('ramda')

const {
  _cleanNodes,
  _checkQueryIntegrity,
  _mergeQueries,
  _partitionFeatured,
  _groupByAuthor,
} = require('./queries/contentful/contentful.selectors')
const gql = require('./queries/contentful/contentful.queries')

const settings = require('../src/settings')

// Speedy logging function to print progress to terminal
const log = (msg, section) =>
  console.log(`\n\x1b[36m${msg} \x1b[4m${section}\x1b[0m\x1b[0m\n`)

// Map of template paths
const templatesDir = path.resolve(__dirname, '../src/templates')
const templates = {
  articles: path.resolve(templatesDir, 'pages/articles.template.tsx'),
  article: path.resolve(templatesDir, 'posts/article.template.tsx'),
  author: path.resolve(templatesDir, 'posts/author.template.tsx'),
}

// Some useful variables
const queryLimit = process.env.NODE_ENV === 'development' ? 10 : null // Limit pages for deving
const featuredLimit = 1 // The maximum number of featured/popular articles we want to show around the site
const relatedLimit = 3 // The maximum number of relateds for each piece of content
const pageLength = 6 // How many nodes should be displayed on each list pages

/**
 * Take as many posts as we can that share categories with our target post UP TO a maximum number of relateds
 *
 * We want to take from our category arrays, but if we find n elements (max # of relateds)
 * then we don't want to just keep searching. We instead want to stop and move to the next
 * part of the function, so I'm using a generator. This way we can avoid going over all posts every time.
 *
 * @param {string} postId Our target post's ID
 * @param {array}  postCategories Our target post's categories as an array of IDs
 */
function* takeRelated(postId, postCategories, posts) {
  let numberTaken = 0
  for (const { node, categories } of posts) {
    // If we've hit the limit then return
    if (numberTaken === relatedLimit) return
    // Otherwise test if there is intersection between
    // this post's categories and the loop post's categories,
    // and that we're not making a post a related of itself.
    if (intersection(postCategories, categories).length && postId !== node.id) {
      // Increment the number taken
      numberTaken++
      // Yield that node back
      yield node
    }
  }
}

function buildPaginatedPath(index, pathPrefix) {
  return index > 1 ? `${pathPrefix}/page/${index}` : `/${pathPrefix}`
}

module.exports = async ({ actions: { createPage }, graphql }) => {
  /**
   * The queries will return featured and unfeatured combined, which we'll then partition from one another.
   * I'm doing it this way vs. 2 queries (1 for featured, 1 for unfeatured) because we want all the sorting to
   * take place inside of the Graphql not after the fact. That way a page can decide if it cares
   * about the distinction between featured and not-featured.
   *
   * List pages, for example, do really care about the featured/not-featured paradigm.
   * The design is "featured" at the top and "not-featured" at the bottom.
   *
   * Splitting them up, is a little bit of a tricky dance. There is a maximum number of featured
   * items we want to show, but we don't want to lose the featured items after that number.
   * Any featured items after that maximum number need to remain in the main array of items.
   */

  // Some shared context for our graphql calls
  const opts = { limit: queryLimit }

  /**
   * /articles/
   * Article model and LegacyArticle model where type == Article
   */
  log('Querying', 'articles')

  const qArticles = await graphql(gql.articles, opts)

  // Clean the data returned by GraphQL
  const articles = pipe(
    _checkQueryIntegrity,
    // Merge the results of our 2 queries (new and legacy) together
    // e.g. [{...node}, {...node}, {...node}, ...]
    _mergeQueries,
    // Clean the node in to something more palatable for our template
    // e.g. [{...cleanNode}, {...cleanNode}, {...cleanNode}, ...]
    _cleanNodes
  )(qArticles)

  /**
   * /authors/<author slug>
   * Articles grouped by each author
   *
   * Getting all articles for an author isn't much fun because we have
   * different models (legacy + new etc.). So instead we do this with a selector.
   */
  log('Creating', 'authors')

  const authors = _groupByAuthor([articles])

  authors.forEach(([author, nodes]) => {
    /**
     * For some reason an author is created for each locale. So authors will contain...
     *
     * [{name: "briana", id: "some-french-id"}, [ {french post}, {french post} ]],
     * [{name: "briana", id: "some-english-id"}, [ {english post}, {english post} ]]
     *
     * So if you just get the locale of the first node you will get the locale for all this author's nodes
     */
    const pathPrefix = settings.urls.authors + '/' + author.slugs

    // Create pages for our authors
    createPaginatedPages({
      pathPrefix,
      createPage,
      pageLength,
      pageTemplate: templates.author,
      // Paginate-able objects are the nodes for this author
      edges: nodes,
      buildPath: buildPaginatedPath,
      context: {
        author,
        originalPath: pathPrefix,
        skip: pageLength,
        limit: pageLength,
      },
    })
  })

  /**
   * #1 Create an array of paginated page to house these nodes.
   *    e.g. /articles/ /articles/2 /articles/3 ... etc
   *
   * As part of this process we want to divide our nodes in to "featured" and "the rest".
   * The rest will be anything unfeatured AND any featured item beyond the maximum number of posts we want to feature.
   */
  const [featured, unfeatured] = _partitionFeatured(featuredLimit, articles)

  /**
   * Prefix is just any slug stripped from any path (assumes all have same path root)
   * This seems like a complicated way to do this when pathPrefix could just be a parameter,
   * but I don't really want to fuck with URLs in createPages. That's the responsibility of
   * the data so happens at the Contentful-Enhance plugin.
   */
  const pathPrefix = unfeatured[0] && unfeatured[0].pathPrefix

  /**
   * Building out the Aritlces page
   */
  createPaginatedPages({
    pathPrefix,
    createPage,
    pageLength,
    pageTemplate: templates.articles,
    // Paginate-able objects are unfeatured
    edges: unfeatured,
    buildPath: buildPaginatedPath,
    context: {
      // Featured are additional context
      featured,
      originalPath: pathPrefix,
      skip: pageLength,
      limit: pageLength,
    },
  })
  /**
   * #2 Now we want to create "detail pages". Detail pages display each individual post.
   *
   * We are going to have to loop over all articles in all models and
   * search for intersection in categories (to calculate our "related" posts). Problem:
   *
   * i)   I don't want to loop over all 2000 articles each time
   * ii)  I am only testing intersection of strings not category objects
   *      (e.g. ['austin-category-id'] not [{name: 'Austin', id: 'austin-category-id'}])
   */

  // Now map over the nodes for this locale
  articles.forEach((article, index) => {
    /**
     * We need to find related posts for this node.
     * A related post for this node is any post that intersects with it's categories.
     */
    let relateds = []

    const categories = article.category || []
    // Not every node has a category, so don't waste time on those that don't
    if (categories.length) {
      /**
       * We want to take the first n articles that are in the same category regardless of model.
       *
       * Categories are objects {name: 'Austin', id: 'austin-category'}.
       * To make testing intersection of categories perform better we're not going
       * to test object to object but string to string. That means we map categories
       * down from an array of objects to an array of category IDs.
       */
      const categoryIds = pluck('id', categories)
      const generator = takeRelated(article.id, categoryIds, articles)

      // Exhaust the generator in to the relateds array
      for (const related of generator) {
        relateds.push(related)
      }
    }

    /**
     * There are a few scenarios where we only find a few related articles,
     * less than the number we expect (relatedLimit).
     * For example, the post itself might not have it's own categories OR
     * the post might have a category but there are few others in that categories.
     *
     * We will grab the latest nodes from the same model as our node to "top up" our relateds
     */
    let topups = []
    if (relateds.length < relatedLimit) {
      const required = relatedLimit - relateds.length
      topups = articles
        // Slice one more topup than you need
        .slice(0, required + 1)
        // Filter out the node itself (which might have been taken as a related)
        .filter(related => related.id !== article.id)
        // Now limit the topups to what you actually need
        .slice(0, required)
    }

    // Grab the two next articles in the list
    let next = articles.slice(index + 1, index + 3)

    // If it's the last item in the list, there will be no articles. So grab the first 2
    if (next.length === 0) next = articles.slice(0, 2)

    // If there's 1 item in the list, grab the first article
    if (next.length === 1) next = [...next, articles[0]]

    // Create the page for this post
    createPage({
      path: article.path,
      component: templates.article,
      context: {
        article,
        slug: article.path,
        id: article.id,
        title: article.title,
        // Add it to our created page. Topups might well be empty if we found enough relateds
        // relateds: [...relateds, ...topups],
        next,
      },
    })
  })
}
