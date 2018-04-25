import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import styled, { ThemeProvider } from 'styled-components'
import { theme } from '../styles/theme'
import { globalStyles } from '../styles/global'

// Injecting global styles and reset
globalStyles()

const WebContainer = styled.div`
  background: ${theme.colors.bg};
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`

const Layout = ({ children, data }) => (
  <ThemeProvider theme={theme}>
    <WebContainer>
      <Helmet
        title={data.site.siteMetadata.title}
        meta={[
          { name: 'description', content: 'Sample' },
          { name: 'keywords', content: 'sample, something' },
        ]}
      />
      <div>{children()}</div>
    </WebContainer>
  </ThemeProvider>
)

Layout.propTypes = {
  children: PropTypes.func,
}

export default Layout

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
