import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import styled, { ThemeProvider } from 'styled-components'
import { globalStyles, theme } from '@styles'
import WebFont from 'webfontloader'

// Injecting global styles and reset
globalStyles()

const meta = [
  {
    name: 'description',
    content:
      'Narative is a digital-first design studio that is all about reducing the noise and unnecessary details—using classical techniques with state of the art technologies, we help you solve your problems, grow your business and simply tell your story.',
  },
  {
    name: 'keywords',
    content: 'Design, Technology, Agency, Excellence',
  },
]

const WebContainer = styled.div`
  background: ${theme.colors.bg};
  height: 100vh;
  width: 100vw;
`

class Layout extends Component {
  componentDidMount() {
    WebFont.load({
      typekit: {
        id: 'huf6cwu',
      },
    })
  }

  render() {
    const { children, data } = this.props
    return (
      <ThemeProvider theme={theme}>
        <WebContainer>
          <Helmet title={data.site.siteMetadata.title} meta={meta} />
          <div>{children()}</div>
        </WebContainer>
      </ThemeProvider>
    )
  }
}

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
