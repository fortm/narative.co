import React, { Component } from 'react'
import styled, { ThemeProvider } from 'styled-components'

import { Navigation } from '@components'
import { GlobalStyles, media, theme } from '@styles'
import { startAnimation } from '@utils'

const WebContainer = styled.div`
  position: relative;
  background: linear-gradient(180deg, #08080b 0%, #0b0b0e 44.18%, #111216 100%);
  min-height: 100vh;
  width: 100vw;
  overflow-x: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: ${p =>
      p.background ||
      'linear-gradient(180deg, #08080b 0%, #0b0b0e 44.18%, #111216 100%)'};
    pointer-events: none;
    transition: all 1.5s ease;
    z-index: 0;
    opacity: ${p => (p.animation ? 1 : 0)};

    ${media.tablet`
      background: #0D0E10;
    `};
  }

  ${media.tablet`
    overflow: initial;
    padding-top: 90px;
  `};
`

class Layout extends Component {
  state = { animation: '' }

  componentDidMount() {
    startAnimation(() => this.setState({ animation: 'start' }))
  }

  render() {
    const { background, children } = this.props

    return (
      <ThemeProvider theme={theme}>
        <>
          <GlobalStyles />
          <WebContainer
            animation={this.state.animation}
            background={background}
          >
            <Navigation />
            {children}
          </WebContainer>
        </>
      </ThemeProvider>
    )
  }
}

export default Layout
