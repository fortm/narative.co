/**
 * Preface
 * N.B. Gatsby doesn't really support Graphql fragments because the
 * data is splintered across many many types. I'm going to use
 * template string interpolation which is bad practice,
 * but I can't think of a better way that maintains DRY
 *
 * Also Contentful returns us every locale ever, even if they're null.
 * Since title is a required field on all of our content,
 * I'm doing a not null check on that as part of each filter.
 * If there's a better way, I'm open to it!
 */

/**
 * Basic node data shared by every node whether it's an article, press link or legacy article.
 * If you add to this fragment you have to be sure that every single node has that field
 */
const basicNode = `
  id
  title
  node_locale
  excerpt {
    excerpt
  }
  fields {
    postDate(formatString: "MMM. D, YYYY")
    pathPrefix
  }
`

/**
 * We cant use the GatsbyContentfulFixed_withWebp etc. fragments on a non-page query so
 * I'm redoing them with template literals here. I'm using the root package as reference:
 *
 * https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-source-contentful/src/fragments.js
 */
const GatsbyContentfulFixed_withWebp = `
  base64
  width
  height
  src
  srcSet
  srcWebp
  srcSetWebp
`

/**
 * basicNode + any field that a post like node (modern or legacy) has on it
 */
const postNode = `
 ${basicNode}
  slug
  author {
    name
    bio {
      bio
    }
    # todo: add slug to /authors
    avatar {
      id # todo: add dimensions
    }
  }
  fields {
    path
  }
  category{
    id
    name
  }
`

/**
 * postNode + any field that a modern post would have e.g. a rich text body
 */
const modernPostNode = `
  ${postNode}
  featured
`

const publicationField = `
  publication {
    name
    # todo : Add the avatar of publications here
  }
`

/**
 * Get articles
 *
 * @param {string} locale 2 letter locale code
 *
 * @returns {object} Gatsby style GraphQL query with a key of posts {data: { posts: {edges: [ ... ]}}}
 */
module.exports.articles = locale => `
  articlesPosts: allContentfulArticle(
    filter: { node_locale: {eq: "${locale}"}, title: {ne: null} },
    sort: {fields: [fields___publicationDate], order: DESC}
  ) {
    edges {
      node {
        ${modernPostNode}
      }
    }
  }
`

/**
 * Author query if we ever want to add in author specific search
 *
 * @param {string} locale 2 letter locale code
 *
 * @returns {object} Gatsby style GraphQL query with a key of posts {data: { posts: {edges: [ ... ]}}}
 */
module.exports.author = locale => `
  allContentfulAuthor(filter: {node_locale: {eq: "${locale}"}}) {
    edges {
      node {
        node_locale
        id
        name
        slug
      }
    }
  }
`
