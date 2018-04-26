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
      logo: './src/favicon.png',
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

const pathPrefix = `/static`

const modifyWebpackConfig = ({ config, stage }) => {
  config.merge({
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src/components/'),
        '@layouts': path.resolve(__dirname, 'src/layouts/'),
        '@pages': path.resolve(__dirname, 'src/pages/'),
        '@utils': path.resolve(__dirname, 'src/utils/'),
      },
    },
  })
  return config
}

module.exports = {
  // modifyWebpackConfig,
  pathPrefix,
  plugins,
  siteMetadata,
}
