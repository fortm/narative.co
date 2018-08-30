/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require('path')

const modifyBabelrc = ({ babelrc }) => ({
  ...babelrc,
  ...(process.env.NODE_ENV !== 'development' && {
    plugins: babelrc.plugins.concat([
      'transform-regenerator',
      'transform-runtime',
    ]),
  }),
})

const modifyWebpackConfig = ({ config, stage }) => {
  config.merge({
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

  if (stage === 'build-html') {
    config.loader('null', {
      test: /webfontloader/,
      loader: 'null-loader',
    })
  }
  return config
}

module.exports = {
  modifyBabelrc,
  modifyWebpackConfig,
}
