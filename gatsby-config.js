const siteMetadata = {
  title: 'Narative',
}

const plugins = [
  'gatsby-plugin-react-helmet',
  'gatsby-plugin-styled-components',
  'gatsby-plugin-react-next',
  {
    resolve: `gatsby-plugin-favicon`,
    options: {
      logo: './static/favicon.png',
      injectHTML: true,
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: true,
        coast: false,
        favicons: true,
        firefox: true,
        twitter: false,
        yandex: false,
        windows: false,
      },
    },
  },
  {
    resolve: `gatsby-plugin-google-analytics`,
    options: {
      trackingId: 'UA-118232427-1',
    },
  },
]

module.exports = {
  plugins,
  siteMetadata,
}
