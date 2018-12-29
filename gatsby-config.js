require('dotenv').config()

const siteMetadata = {
  title: 'Narative',
}

const plugins = [
  'gatsby-plugin-react-helmet',
  `gatsby-image`,
  `gatsby-plugin-sharp`,
  `gatsby-transformer-sharp`,
  `gatsby-transformer-remark`,
  {
    resolve: `gatsby-plugin-styled-components`,
    options: {
      displayName: process.env.NODE_ENV === 'development',
    },
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `assets`,
      path: `${__dirname}/src/assets/`,
    },
  },
  {
    resolve: `gatsby-source-contentful`,
    options: {
      spaceId: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_PREVIEW_API_KEY,
      environment: process.env.CONTENTFUL_ENVIRONMENT,
      host: `preview.contentful.com`,
    },
  },
  {
    resolve: `gatsby-source-contentful`,
    options: {
      spaceId: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_DELIVERY_API_KEY,
      environment: process.env.CONTENTFUL_ENVIRONMENT,
    },
  },
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
    resolve: 'gatsby-plugin-manifest',
    options: {
      name: 'Narative',
      short_name: 'Narative',
      start_url: '/',
      background_color: '#111216',
      theme_color: '#111216',
    },
  },
  {
    resolve: 'gatsby-plugin-robots-txt',
    options: {
      host: 'https://narative.co',
      sitemap: 'https://narative.co/sitemap.xml',
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
