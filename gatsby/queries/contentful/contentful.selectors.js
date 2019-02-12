const {
  assoc,
  chain,
  curry,
  descend,
  either,
  filter,
  flatten,
  flip,
  groupBy,
  head,
  identity,
  includes,
  last,
  lens,
  map,
  merge,
  omit,
  over,
  partition,
  path,
  pipe,
  pluck,
  prop,
  slice,
  sortWith,
  tap,
  toPairs,
  update,
  values,
  when,
} = require('ramda')

/**
 * To help reading a file, this is a reference of how
 * graphql objects come back from the Contentful source
 *
 * {
 *  data: {
 *    posts <key named in query>: {
 *      edges: [
 *       {
 *         node: {
 *           field: 'value'
 *           ...
 *           fields: {
 *             ... extra fields set during transform stage
 *           }
 *         }
 *       }
 *      ]
 *    }
 *  }
 * }
 */

/**
 * Get a node from an edge item
 */
const _node = prop('node')

/**
 * Get the queries that are stored behind a top-level data key
 */
const _data = prop('data')

const _arrayQueries = pipe(
  // Get the queries from the top level data key
  // e.g. { legacyArticleForCategory: {...}, articleForCategory: {...} }
  _data,
  // Get rid of the model name keys
  // e.g. [{edges: [...nodes]}, {edges: [...nodes]}, {edges: [...nodes]}]
  values
)

// todo : docmentation
const _mergeQueries = pipe(
  _arrayQueries,
  // Map over each query's node array and get the edges key
  // e.g. [[{...node}, {...node}], [{...node}, {...node}]]
  pluck('edges'),
  // Flatten out the array
  // e.g. [{node: {...fields}}, {node: {...fields}}, {node: {...fields}}]
  flatten,
  // Map over each node and then select the node key from it
  // e.g. [{...fields}, {...fields}, {...fields}]
  map(_node)
)

/**
 * Check if there are any errors in the query calls to Graphql
 *
 * This looks more complicated than it should be. Basically, if any query contains a prop
 * called errors, then find the first erroring query, console.error and exit with a fail code.
 * If there are no queries with errors, then just identify (effectively a pass).
 *
 * todo : Throw an actual error
 * I have no idea how to get Gatsby to properly accept thrown errors and fail the build.
 * Here I'm manually error code exiting the build script, which I don't love.
 */

const _throwQueryError = pipe(
  prop('errors'),
  tap(console.error),
  tap(() => process.exit(1))
)

const _checkQueryIntegrity = when(
  prop('errors'),
  // When you find an error key on a query, then throw an error
  _throwQueryError
)

/**
 * Sorter for sortby function that defines how nodes should be sorted
 */
const _byDate = descend(prop('postDate'))

/**
 * All the fields in our node have different ways of being accessed.
 * For example, the excerpt is behind a key excerpt (e.g. excerpt: { excerpt: 'our excerpt' })
 *
 * Lenses are an efficient way to "get" content, so here I'm writing lenses
 * that will get more awkward positioned content from our nodes.
 *
 * Lenses also define a "setter", so if we put the content back in to
 * an object (our cleaned node) then where should it go? Often that means
 * just putting it back at the root of our clean/new node
 *
 * I've also added some "getter" only functions here that aren't strictly
 * lenses because they have no need to write
 *
 * They're inside of an object to make the code a bit more readable later on
 */
const lenses = {
  // Get the excerpt from {excerpt: {excerpt: '...'}} and set on { excerpt: '...' }
  excerpt: lens(path(['excerpt', 'excerpt']), assoc('excerpt')),
  // The fallback lens needs to "get" the contentfulid and set on a key fallback
  fallback: lens(prop('contentfulid'), assoc('hero')),
  /**
   * The body lens getter depends on if it's a legacy or modern article.
   * Using the either switch we get the legacy or modern.
   * The setter is just a body key on the root.
   */
  body: lens(
    either(
      // Get the body of legacy articles from {body: {childMarkdownRemark: {html: '...'}}}
      path(['body', 'childMarkdownRemark', 'html']),
      // Get the body of new articles from {body: {childRichTextHtml: {html: '...'}}}
      path(['body', 'childRichTextHtml', 'html'])
    ),
    assoc('body')
  ),
  // Self is to get the node itself. We will use this to create a key _raw
  // that is just a like for like clone of what Graphql gave us originally.
  self: lens(identity, assoc('_raw')),
}

/**
 * Next come the composite functions that provide some meat to our new node.
 * They're basic ramda overs. They get and set a lens (left hand side) and
 * on whatever the right hand side creates. Often it's just "here's our new node add to it".
 * So the right hand side is just identity (a function that takes input and returns it unchanged)
 *
 * I'm going to put these in an object called set just because we might combine
 * and use these in different ways depending on what data we got from
 */
const set = {
  excerpt: over(lenses.excerpt, identity),
  body: over(lenses.body, identity),
  raw: over(lenses.self, identity),
}

/**
 * Custom fields set during the transform are stored inside of a fields key.
 * We want to elevate them to the root of the new node. Basically...
 * { fields: { ... extra fields } } to { ...extra fields }
 *
 * To do this I'm using a chain. It's a little magic but basically it
 * makes the result of a prop call on our param and the original param, parameters of merge
 *
 * (merge, prop) => node => merge(prop('fields', node), node)
 *
 * After we use the chain to elevate the fields to root of the object, wipe the original fields
 */
const _elevateFields = pipe(
  chain(merge, prop('fields')),
  omit(['fields'])
)

/**
 * Clean a node and transform it from what graphql gives us to something
 * that is actually usuable and fun to use in the template. Also does
 * some normalization between the legacy and standard articles
 *
 * @param {object} _ The original node from a Graphql edge
 * @returns {object} The original node set to raw, and all the fields normalized
 */
const _cleanNode = pipe(
  // set.raw, // Set the initial object to a _raw key todo: re-add this because of build size concerns
  set.body, // Normalize the body depending on legacy vs. modern model
  set.excerpt, // Fish the nested body from excerpt.excerpt
  _elevateFields // Lift our custom fields to the root
)

/**
 * Exactly the same as _cleanNode but just takes an array of nodes and cleans them vs. a single node
 */
const _cleanNodes = pipe(map(_cleanNode))
/**
 * Extract n number of posts that are marked as featured.
 * I'm using a curry here just to keep the type of function this file exports consistent.
 *
 * @example
 *   _partitionFeatured([nodes...], 6) // [[ ... 6 featured], [... remaining]]
 *
 * @param {number} max The maximum number of featured elements that you want to return
 * @param {array} arr Accepts an array of cleaned edge nodes
 *
 * @returns {array} 2 element multidimensional array containing max number featured and "the rest" (featured beyond max and unfeatured)
 */
const _partitionFeatured = curry((max, arr) => {
  /**
   * This function is 2 steps. First we make an array of
   * a `max` number of elements that need to be featured.
   *
   * ['id-1', 'id-2', ..., 'id-max'] (length is `max` or less)
   */
  const nFeaturedIds = pipe(
    filter(prop('featured')),
    slice(0, max),
    pluck('id')
  )(arr)

  /**
   * Now we partition our entire array of nodes.
   * This will return a multimensional containing:
   * [things that meet our condition, things that don't]
   *
   * Our condition is "whether it's ID is in the list of nFeatured"
   *
   * Because objects are being partitioned we have to do a little
   * prop() to get just the ID. We could avoid this extra step by storing
   * a list of nFeatured objects instead of the IDs, but the downside
   * to doing that is Ramda will have to do a lot of comparisons between
   * big complicated arrays. It could do that... but I don't want it to
   */
  return partition(
    pipe(
      prop('id'),
      // Flip here is reversing the order of args that includes takes
      flip(includes)(nFeaturedIds)
    )
  )(arr)
})

/**
 * Get all nodes for a certain author.
 * Put them in a 2 element array containing the nodes and the author's details.
 *
 * @param {array} _ Array of arrays of nodes e.g. [[ ... research nodes], [... announcement nodes], etc.]
 * @returns {array} Nodes grouped by author in 2 element arrays [[{...author}, nodes], [{...author}, nodes], [{...author}, nodes]]
 */
const _groupByAuthor = pipe(
  // Flatten all models in to a single big array of nodes
  flatten,
  // Group our nodes by their author ID
  groupBy(path(['author', 'id'])),
  // Convert this to 2 element arrays of our author id and our nodes
  toPairs,
  // Map over the 2 element array...
  map(
    // For each author 2 element array...
    pipe(
      // Set the first element of the array to the full author object
      // You can get the full author object by just selecting the first node's author prop
      over(lens(last, update(0)), path([0, 'author'])),
      // Sort this author's nodes by their post date
      over(lens(last, update(1)), sortWith([_byDate]))
    )
  ),
  // Remove any pair that has a "null" for author
  filter(head)
)

/**
 * Note that we only really export the more compositional stuff
 */
module.exports = {
  _checkQueryIntegrity,
  _cleanNodes,
  _mergeQueries,
  _partitionFeatured,
  _groupByAuthor,
}
