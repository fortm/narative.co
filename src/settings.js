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
  ['CardStandard', 366, 203],
  ['CardPost', 244, 140],
  ['Home__Hero', 692, 485],
  ['Article__Hero', 1140, 520],
]
