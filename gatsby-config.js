const siteMetadata = {
  title: 'Narative Starter',
}

const plugins = [
  'gatsby-plugin-react-helmet',
  'gatsby-plugin-styled-components',
]

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
  plugins,
  siteMetadata,
}
