const { documentToHtmlString } = require('@contentful/rich-text-html-renderer')

const { HTMLRendererOpts } = require('./htmlRenderer')

async function onCreateNode({
  node,
  actions: { createNode, createParentChildLink },
  createNodeId,
  createContentDigest,
}) {
  const {
    internal: { mediaType, owner },
  } = node

  // Return if not Contentful or rich text
  if (owner !== 'gatsby-source-contentful' || mediaType !== 'text/richtext') {
    return
  }

  // Get the content matrix that Contentful stores for RichText fields
  const content = node.content
  const nodeType = node.nodeType

  // Use the Contentful HTML renderer to render this to a string
  const html = documentToHtmlString({ content, nodeType }, HTMLRendererOpts)

  // Create a new node for our HTML
  const htmlNode = {
    html,
    id: createNodeId(`${node.id} > rich text rendered`),
    children: [],
    parent: node.id,
    internal: {
      type: 'RichTextHtml',
    },
  }

  // Add the rendered content
  htmlNode.content = html
  // Create a content digest
  htmlNode.internal.contentDigest = createContentDigest(htmlNode)

  // Create our new node and link it to our Contentful node
  createNode(htmlNode)
  createParentChildLink({ parent: node, child: htmlNode })
}

exports.onCreateNode = onCreateNode
