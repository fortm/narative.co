import React, { Component } from 'react'
import styled, { ThemeProvider } from 'styled-components'

import Navigation from '@components/Navigation/Navigation.Header'
import { GlobalStyles, media, theme } from '@styles'
import { startAnimation } from '@utils'

interface LayoutProps {
  background?: string
  nav: {
    fixed?: boolean
    offset?: boolean
    theme?: string
  }
}

const WebContainer = styled.div`
  position: relative;
  background: linear-gradient(180deg, #08080b 0%, #0b0b0e 44.18%, #111216 100%);
  min-height: 100vh;

  ${p =>
    p.navOffset &&
    ` padding-top: 140px; 
  `};

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

  ${p =>
    p.navOffset &&
    media.tablet`
      padding-top: 90px; 
  `};
`

class Layout extends Component<LayoutProps, { animation: string }> {
  static defaultProps = {
    nav: {
      theme: 'light',
      offset: true,
      fixed: true,
    },
  }

  state = { animation: '' }

  componentDidMount() {
    startAnimation(() => this.setState({ animation: 'start' }))
  }

  render() {
    const { background, children, nav } = this.props

    return (
      <ThemeProvider theme={theme}>
        <>
          <GlobalStyles />
          <WebContainer
            animation={this.state.animation}
            background={background}
            navOffset={nav.offset}
          >
            <Navigation nav={nav} />
            {children}
          </WebContainer>
        </>
      </ThemeProvider>
    )
  }
}

export default Layout
