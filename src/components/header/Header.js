import React from 'react'
import Link from 'gatsby-link'

const Header = ({ siteTitle }) => (
  <h1>
    <Link to="/">{siteTitle}</Link>
  </h1>
)

export default Header
