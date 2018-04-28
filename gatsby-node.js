/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require('path')

const modifyWebpackConfig = ({ config, stage }) => {
  config.merge({
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src/components/'),
        '@layouts': path.resolve(__dirname, 'src/layouts/'),
        '@pages': path.resolve(__dirname, 'src/pages/'),
        '@styles': path.resolve(__dirname, 'src/styles/'),
        '@utils': path.resolve(__dirname, 'src/utils/'),
      },
    },
  })
  return config
}

module.exports = {
  modifyWebpackConfig,
}
