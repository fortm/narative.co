import React, { Component } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { navigate } from 'gatsby'
import Swipeable from 'react-swipeable'

import Navigation from '@components/Navigation/Navigation.Header'
import NavigationMobile from '@components/Navigation/Navigation.Mobile.Header'

import { GlobalStyles, media, theme } from '@styles'
import mediaqueries from '@styles/media'
import {
  startAnimation,
  debounce,
  getBreakpointFromTheme,
  getWindowDimensions,
} from '@utils'

interface LayoutProps {
  background?: string
  nav: {
    fixed?: boolean
    offset?: boolean
    theme?: string
  }
}

class Layout extends Component<LayoutProps, { animation: string }> {
  static defaultProps = {
    nav: {
      theme: 'light',
      offset: true,
      fixed: true,
    },
  }

  container = React.createRef()

  state = { animation: '', active: false, mobileNavOffset: 576, mask: false }

  componentDidMount() {
    startAnimation(() => this.setState({ animation: 'start' }))

    window.addEventListener('resize', this.handleResize)
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
    window.addEventListener('scroll', this.handleScroll)
  }

  handleResize = debounce(() => {
    const { width } = getWindowDimensions()
    const tablet = getBreakpointFromTheme('tablet')

    if (width > tablet && this.state.active) {
      this.closeMobileNav()
    }
  })

  handleScroll = () => {
    if (!this.container.current) return

    const offset = this.container.current.getBoundingClientRect().top

    if (offset <= 0) {
      this.closeMobileNav()
    }
  }

  closeMobileNav = () => {
    this.setState({
      active: false,
      mobileNavOffset: 0,
    })
  }

  openMobileNav = () => {
    const { height } = getWindowDimensions()
    const mobileNavOffset = height < 700 ? 420 : 576

    this.setState({ active: true, mobileNavOffset })
  }

  navigateOut = (event, path) => {
    event.preventDefault()

    this.closeMobileNav()

    if (!window.location.pathname.includes(path)) {
      setTimeout(() => {
        this.setState({ mask: false })
        navigate(path)
      }, 500)
    }
  }

  render() {
    const { background, children, nav } = this.props
    const { active, animation, mask, mobileNavOffset } = this.state
    const navTheme = nav.theme

    return (
      <ThemeProvider theme={theme}>
        <>
          <GlobalStyles />
          <NavigationMobile navigateOut={this.navigateOut} />

          <Swipeable onSwipedUp={this.closeMobileNav}>
            <WebContainer
              active={active}
              animation={animation}
              background={background}
              navOffset={nav.offset}
              mobileNavOffset={mobileNavOffset}
              onClick={active ? this.closeMobileNav : () => {}}
              theme={navTheme}
              ref={this.container}
            >
              <ToggleContainer onClick={this.openMobileNav}>
                <LeftToggle theme={navTheme} />
                <RightToggle theme={navTheme} />
              </ToggleContainer>
              <Navigation nav={nav} />
              <Mask mask={mask} theme={navTheme} />
              {children}
            </WebContainer>
          </Swipeable>
        </>
      </ThemeProvider>
    )
  }
}

export default Layout

const WebContainer = styled.div`
  position: ${p => (p.active ? 'fixed' : 'relative')};
  background: linear-gradient(180deg, #08080b 0%, #0b0b0e 44.18%, #111216 100%);
  min-height: 100vh;

  ${mediaqueries.tablet`
    transform: translateY(${p => (p.active ? p.mobileNavOffset : 0)}px);
    transition: transform 0.56s cubic-bezier(0.52, 0.16, 0.24, 1);
    will-change: transform;
    width: 100vw;
    height: 100%;
  `}

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

  &::after {
    content: '';
    position: absolute;
    top: -20px;
    left: 0;
    width: 100%;
    height: 20px;
    background: ${p => (p.theme !== 'dark' ? '#08080b' : '#fafafa')};
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    box-shadow: 0px -20px 40px rgba(0, 0, 0, 0.2);
  }

  ${p =>
    p.navOffset &&
    media.tablet`
      padding-top: 90px; 
  `};
`

const ToggleContainer = styled.button`
  position: absolute;
  z-index: 999;
  width: 30px;
  height: 30px;
  top: 50px;
  right: 30px;

  ${mediaqueries.desktop_up`
    display: none;
    visibility: hidden;
  `}
`

const Toggle = styled.span`
  position: absolute;
  right: 10px;
  height: 1px;
  background: ${p => (p.theme === 'dark' ? '#000' : '#fafafa')};
  transition: transform 0.4s cubic-bezier(0.075, 0.82, 0.165, 1),
    width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
`

const LeftToggle = styled(Toggle)`
  top: 15px;
  width: ${p => (p.active ? '20px' : '15px')};
  transform: ${p =>
    p.active ? 'translate3d(0px, -2px, 0) rotate(45deg)' : 'initial'};
`

const RightToggle = styled(Toggle)`
  width: 20px;
  top: 9px;
  transform: initial;
  transform: ${p =>
    p.active ? 'translate3d(0px, 4px, 0) rotate(-45deg)' : 'initial'};
`

const Mask = styled.div`
  opacity: 0;
  opacity: ${p => (p.mask ? 1 : 0)};
  transition: opacity 0.5s linear;
  pointer-events: none;

  ${media.tablet`
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background: ${p => (p.theme !== 'dark' ? '#08080b' : '#fff')};
    z-index: 9; 
  `}
`
