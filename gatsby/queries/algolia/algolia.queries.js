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
 * Imagery. I've chosen to render imagery based on component it might be needed in.
 * I've tried to be descriptive about where it will end up being used.
 *
 * Sometimes I'm using underscores for the alias. I'm trying to indicate the page and component.
 * e.g. Home__Hero is for the image in the hero of the homepage.
 *
 * I'm cranking the quality to 100 because a lot of the old legacy imagery
 * is really crappy res already. I don't want to double compress it.
 */
const heroImageryField = `
  hero {
    CardStandard: fixed(width: 366, height: 203, quality: 88) {
      ${GatsbyContentfulFixed_withWebp}
    }
    CardPost: fixed(width: 244, height: 140, quality: 88) {
      ${GatsbyContentfulFixed_withWebp}
    }
    Home__Hero: fixed(width: 692, height: 485, quality: 88) {
      ${GatsbyContentfulFixed_withWebp}
    }
    Article__Hero: fixed(width: 1140, height: 520, quality: 88) {
      ${GatsbyContentfulFixed_withWebp}
    }
  }
`

// ${heroImageryField}
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

// todo : documentation
const pressNode = `
  ${basicNode}
  ${publicationField}
  linkToPress
  publicationDate
  featured
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
    sort: {fields: [fields___postDate], order: DESC}
  ) {
    edges {
      node {
        ${modernPostNode}
      }
    }
  }
  
  articlesLegacy: allContentfulLegacyArticle(
    filter: { type: {eq: "Article"}, node_locale: {eq: "${locale}"}, title: {ne: null} },
    sort: {fields: [fields___postDate], order: DESC}
  ) {
    edges {
      node {
        ${postNode}
      }
    }
  }
`

/**
 * Get announcements
 *
 * @param {string} locale 2 letter locale code
 *
 * @returns {object} Gatsby style GraphQL query with a key of posts {data: { posts: {edges: [ ... ]}}}
 */
module.exports.announcements = locale => `
  announcementsPosts: allContentfulNews(
    filter: { node_locale: {eq: "${locale}"}, title: {ne: null} },
    sort: {fields: [fields___postDate], order: DESC}
  ) {
    edges {
      node {
        ${modernPostNode}
      }
    }
  }

  announcementsLegacy: allContentfulLegacyArticle(
    filter: { type: {eq: "Announcement"}, node_locale: {eq: "${locale}"}, title: {ne: null} },
    sort: {fields: [fields___postDate], order: DESC}
  ) {
    edges {
      node {
        ${postNode}
      }
    }
  }
`

/**
 * Get research
 *
 * @param {string} locale 2 letter locale code
 *
 * @returns {object} Gatsby style GraphQL query with a key of posts {data: { posts: {edges: [ ... ]}}}
 */
module.exports.research = locale => `
  researchPosts: allContentfulResearch(
    filter: { node_locale: {eq: "${locale}"}, title: {ne: null} },
    sort: {fields: [fields___postDate], order: DESC}
  ) {
    edges {
      node {
        ${modernPostNode}
      }
    }
  }

  researchLegacy: allContentfulLegacyArticle(
    filter: { type: {eq: "Research"}, node_locale: {eq: "${locale}"}, title: {ne: null} },
    sort: {fields: [fields___postDate], order: DESC}
  ) {
    edges {
      node {
        ${postNode}
      }
    }
  }
`

/**
 * Get press links for the press section
 *
 * @param {string} locale 2 letter locale code
 *
 * @returns {object} Gatsby style GraphQL query with a key of posts {data: { posts: {edges: [ ... ]}}}
 */
module.exports.pressLinks = locale => `
  pressLinksPosts: allContentfulPressLink(
    filter: { node_locale: {eq: "${locale}"}, title: {ne: null} },
    sort: {fields: [fields___postDate], order: DESC}
  ) {
    edges {
      node {
        ${pressNode}
      }
    }
  }
`

/**
 * Get files for the press-kit searchbar
 *
 * @param {string} locale 2 letter locale code
 *
 * @returns {object} Gatsby style GraphQL query with a key of posts {data: { posts: {edges: [ ... ]}}}
 */
module.exports.files = locale => `
  folders: allContentfulFolder(filter:{node_locale:{eq:"${locale}"}}) {
    edges {
      node {
        title
        files {
          id
          title
          description
          file {
            url
            details {
              size
              image {
                width
                height
              }
            }
            fileName
            contentType
          }
          fluid(maxWidth: 130, quality: 88) {
            aspectRatio
            src
            srcSet
            srcWebp
            srcSetWebp
            sizes
          }
        }
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
