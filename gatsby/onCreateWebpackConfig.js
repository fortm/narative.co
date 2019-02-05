'use strict'

const path = require('path')

module.exports = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, '../src/components/'),
        '@styles': path.resolve(__dirname, '../src/styles/'),
        '@utils': path.resolve(__dirname, '../src/utils/'),
      },
      extensions: ['.js', '.json', '.ts', '.tsx'],
    },
  })
}
