/**
 * Isomorphic settings file (hence not typescript and commonjs notation)
 */

module.exports.urls = {
  authors: 'authors',
  articles: 'articles',
  netlify: {
    previewContent: '/.netlify/functions/preview-content',
  },
  medium: 'https://medium.com/',
  linkedin: 'https://www.linkedin.com/company/',
  instagram: 'https://www.instagram.com/',
  twitter: 'https://twitter.com/',
  facebook: 'https://www.facebook.com/',
}

/**
 * What size do we want to cut hero images to?
 */
module.exports.heroImageDimensions = [
  ['CardPreview', 1200, 825],
  ['Article__Featured', 1200, 825],
  ['Article__Hero', 1600, 1100],
]
