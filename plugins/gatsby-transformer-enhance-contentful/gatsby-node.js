const urljoin = require('url-join')
const settings = require('../../src/settings')
const readingTime = require('reading-time')
const { documentToHtmlString } = require('@contentful/rich-text-html-renderer')

const {
  HTMLRendererOpts,
} = require('../gatsby-transformer-contentful-rich-text-html-renderer/htmlRenderer')

const TYPE_ARTICLE = 'ContentfulArticle'

const URL_ARTICLES = settings.urls.articles

const typeToUrl = {
  [TYPE_ARTICLE]: URL_ARTICLES,
}

const nodeTypesToModify = [TYPE_ARTICLE]

const getReadingTime = refNode => {
  // Get the content matrix that Contentful stores for RichText fields
  const content = refNode.content
  const nodeType = refNode.nodeType

  // Use the Contentful HTML renderer to render this to a string
  const html = documentToHtmlString({ content, nodeType }, HTMLRendererOpts)
  const options = { wordsPerMinute: 250 }
  const { minutes, ...rest } = readingTime(html, options)

  return {
    ...rest,
    minutes: minutes,
    text: `${Math.round(minutes)} minute read`,
  }
}
/**
 * Add key fields missing from the Contentful source pull
 */
exports.onCreateNode = ({ node, getNode, actions: { createNodeField } }) => {
  // We only want to touch Contentful nodes
  if (!node || node.internal.owner !== 'gatsby-source-contentful') return
  // We only want to modify a subset of all Contentful nodes
  if (!nodeTypesToModify.includes(node.internal.type)) return

  // Otherwise add our fields
  // Start making some useful variables
  const type = node.internal.type
  const normalizedType = type
  const bodyNode = getNode(node.body___NODE)

  // * #1 postDate - Normalize date between new and legacy articles
  // Also factor in the "publicationDate" on press link objects
  const postDate = node.createdAt
  createNodeField({ node, name: 'postDate', value: postDate })
  createNodeField({
    node,
    name: 'readingTime',
    value: getReadingTime(bodyNode),
  })

  // * #2 path - Add a full path to the URL of the article n.b PressLinks don't have slugs
  const root = typeToUrl[normalizedType] || false

  if (root) {
    // You also need to take in to account the prefix for the URL. If it's a locale
    // that isn't English then it needs to live at /fr/<path>
    const urlParts = []

    urlParts.push(root)

    // We will set a path root variable which helps distinguish sections  e.g. /fr/articles
    createNodeField({
      node,
      name: 'pathPrefix',
      value: urljoin(urlParts),
    })

    if (node.slug) {
      urlParts.push(node.slug)

      createNodeField({
        node,
        name: 'path',
        value: urljoin(urlParts),
      })
    }
  }
}
