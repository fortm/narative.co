'use strict'

const path = require('path')
const fs = require('fs-extra')

module.exports = () =>
  fs.copySync(
    path.join(__dirname, '../_redirects'),
    path.join(__dirname, '../public/_redirects')
  )
