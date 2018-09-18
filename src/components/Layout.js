import React, { Component } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { globalStyles, media, theme } from '@styles'

import '../polyfills/intersection-observer'

// Injecting global styles and reset
globalStyles()

const WebContainer = styled.div`
  background: ${theme.colors.bg};
  min-height: 100vh;
  width: 100vw;
  overflow-x: hidden;

  ${media.tablet`
    overflow: initial;
  `};
`

class Layout extends Component {
  render() {
    const { children } = this.props

    return (
      <ThemeProvider theme={theme}>
        <WebContainer>{children}</WebContainer>
      </ThemeProvider>
    )
  }
}

export default Layout
