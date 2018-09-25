/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
// const path = require('path')

// const modifyWebpackConfig = ({ config, stage }) => {
//   config.merge({
//     resolve: {
//       alias: {

//       },
//     },
//   })

//   return config
// }

const path = require('path')
const fs = require('fs-extra')

const onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src/components/'),
        '@layouts': path.resolve(__dirname, 'src/layouts/'),
        '@modules': path.resolve(__dirname, 'src/modules/'),
        '@pages': path.resolve(__dirname, 'src/pages/'),
        '@styles': path.resolve(__dirname, 'src/styles/'),
        '@utils': path.resolve(__dirname, 'src/utils/'),
      },
    },
  })
}
;('use strict')

const onPostBuild = () => {
  fs.copySync(
    path.join(__dirname, './_redirects'),
    path.join(__dirname, './public/_redirects')
  )
}

module.exports = {
  onCreateWebpackConfig,
  onPostBuild,
}
