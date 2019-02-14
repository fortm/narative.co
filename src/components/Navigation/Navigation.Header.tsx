import React, { Component } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { Link, navigate } from 'gatsby'
import OutsideClickHandler from 'react-outside-click-handler'
import Swipeable from 'react-swipeable'
import { isMobileOnly } from 'react-device-detect'

import { Section, Logo, SocialLinks } from '@components'
import { media } from '@styles'
import mediaqueries from '@styles/media'

const navLinks = [
  { to: '/labs', text: 'Labs' },
  { to: '/careers', text: 'Careers' },
  { to: '/articles', text: 'Articles' },
  { to: '/contact', text: 'Contact' },
]

const animateIn = [
  { width: '15px', transform: 'initial' },
  {
    width: '20px',
    transform: 'translate3d(3px, -2px, 0) rotate(90deg)',
  },
  {
    width: '20px',
    transform: 'translate3d(3px, -2px, 0) rotate(90deg)',
  },
  {
    width: '20px',
    transform: 'translate3d(-3px, -2px, 0) rotate(90deg)',
  },
]

const animateOut = [
  {
    width: '20px',
    transform: 'translate3d(-3px, -2px, 0) rotate(90deg)',
  },
  { width: '15px', transform: 'initial' },
]

const themes = {
  light: {
    color: '#fff',
  },
  dark: {
    color: '#000',
  },
}

class Navigation extends Component {
  leftToggle = React.createRef()

  state = { active: false, previousPath: '', showPreviousPath: false }

  componentDidMount() {
    const previousPath = localStorage.getItem('previousPath')
    this.setState({ previousPath })

    window.addEventListener('keydown', this.handleEscKeyPress)
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (typeof window !== 'undefined') {
      const previousPathFromStorage = localStorage.getItem('previousPath')
      const urlsThatUseBackButton = ['/articles']

      if (prevState.previousPath !== previousPathFromStorage) {
        this.setState({
          previousPath: previousPathFromStorage,
          showPreviousPath: urlsThatUseBackButton.some(
            pathname => window.location.pathname.indexOf(pathname) >= 0
          ),
        })
      }
    }
    return null
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('keydown', this.handleEscKeyPress)
    }
  }

  handleEscKeyPress = ({ key }) => {
    if (key === 'Escape') {
      this.handleOutsideClick()
    }
  }

  handleToggleClick = () => {
    this.setState({
      active: !this.state.active,
    })

    if (!isMobileOnly) {
      if (!this.state.active) {
        this.leftToggle.current.animate(animateIn, {
          duration: 900,
          fill: 'both',
          easing: 'cubic-bezier(0.075, 0.82, 0.165, 1)',
        })
      } else {
        this.handleCloseAnimation()
      }
    }
  }

  handleCloseAnimation = () => {
    if (this.state.active) {
      this.leftToggle.current.animate(animateOut, {
        duration: 250,
        fill: 'both',
        easing: 'cubic-bezier(0.075, 0.82, 0.165, 1)',
      })
    }
  }

  handleOutsideClick = () => {
    this.handleCloseAnimation()
    this.setState({ active: false })
  }

  navigateOut = (event, path) => {
    event.preventDefault()
    this.handleOutsideClick()

    if (path === '#') return

    setTimeout(() => {
      navigate(path)
    }, 250)
  }

  render() {
    const { active, previousPath, showPreviousPath } = this.state
    const { nav } = this.props
    const fill = nav.theme === 'dark' ? '#000' : '#fff'
    const theme = themes[nav.theme]

    return (
      <ThemeProvider theme={theme}>
        <OutsideClickHandler onOutsideClick={this.handleOutsideClick}>
          <NavFixedContainer navFixed={nav.fixed}>
            <Section>
              <NavContainer>
                {previousPath && showPreviousPath && (
                  <LogoBack to={`/${previousPath.split('/')[1]}`}>
                    <BackChevron />
                  </LogoBack>
                )}
                <LogoContainer to="/">
                  <Logo onlySymbol fill={fill} />
                </LogoContainer>
                <Nav>
                  <DesktopNavList>
                    <NavItems active={active} handleClick={this.navigateOut} />
                  </DesktopNavList>
                  <ToggleContainer onClick={this.handleToggleClick}>
                    <LeftToggle active={active} ref={this.leftToggle} />
                    <RightToggle active={active} />
                  </ToggleContainer>
                </Nav>
              </NavContainer>
            </Section>
          </NavFixedContainer>
          <Swipeable
            onSwipedUp={this.handleOutsideClick}
            onSwipedDown={this.handleOutsideClick}
          >
            <MobileNavListContainer active={active}>
              <MobileNavControlsContainer active={active}>
                <LogoContainer to="/">
                  <Logo onlySymbol fill="black" />
                </LogoContainer>
                <button onClick={this.handleToggleClick}>
                  <CloseIcon />
                </button>
              </MobileNavControlsContainer>
              <MobileNavCenter>
                <MobileNavList active={active}>
                  <NavItems active={active} handleClick={this.navigateOut} />
                </MobileNavList>
                <SocialLinksContainer active={active}>
                  <SocialLinks fill="black" />
                </SocialLinksContainer>
              </MobileNavCenter>
            </MobileNavListContainer>
          </Swipeable>
        </OutsideClickHandler>
      </ThemeProvider>
    )
  }
}

export default Navigation

const NavItems = ({ active, handleClick }) =>
  navLinks.map((nav, index) => {
    const delay = active ? 30 * (navLinks.length - index) : 30 * index

    return (
      <NavItem key={nav.to}>
        {nav.external ? (
          <NavAnchor
            target="_blank"
            rel="noopener"
            active={active ? active : undefined}
            disabled={nav.disabled}
            href={nav.to}
            delay={delay}
          >
            {nav.text}
          </NavAnchor>
        ) : (
          <NavAnchor
            active={active ? active : undefined}
            disabled={nav.disabled}
            to={nav.to}
            delay={delay}
            as={Link}
            onClick={event => handleClick(event, nav.to)}
          >
            {nav.text}
          </NavAnchor>
        )}
      </NavItem>
    )
  })

const NavFixedContainer = styled.div`
  position: absolute;
  height: 90px;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 10;

  ${mediaqueries.tablet`
    position: ${p => (p.navFixed ? 'fixed' : 'absolute')};
  `}
`

const NavContainer = styled.div`
  position: relative;
  z-index: 100;
  padding-top: 100px;
  display: flex;
  justify-content: space-between;

  ${media.tablet`
    padding-top: 50px;
  `};
`

const LogoBack = styled(Link)`
  position: absolute;
  left: -44px;

  svg {
    transition: transform 0.25s var(--ease-out-quad);
  }

  &:hover svg {
    transform: translateX(-4px);
  }

  ${mediaqueries.tablet`
    display: none;
  `}
`

const LogoContainer = styled(Link)``

const ToggleContainer = styled.button`
  position: relative;
  height: 40px;
  width: 40px;
  right: -10px;
  cursor: pointer;

  ${media.phablet`
    width: 30px;
    height: 30px;
    right: -10px;
  `};
`

const Toggle = styled.span`
  position: absolute;
  right: 10px;
  height: 1px;
  background: ${p => p.theme.color};
  transition: transform 0.4s cubic-bezier(0.075, 0.82, 0.165, 1),
    width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
`

const LeftToggle = styled(Toggle)`
  top: 23px;
  width: ${p => (p.active ? '20px' : '15px')};

  ${media.phablet`
    top: 15px;
    width: 15px;
  `};
`

const RightToggle = styled(Toggle)`
  top: 17px;
  width: 20px;
  transform: ${p =>
    p.active ? 'translate3d(3px, 4px, 0) rotate(90deg)' : 'initial'};

  ${media.phablet`
    top: 9px;
    transform: initial;
  `};
`

const Nav = styled.nav`
  display: flex;
  align-items: center;
`

const DesktopNavList = styled.ul`
  list-style: none;

  ${media.phablet`
  display: none;

  `};
`

const NavItem = styled.li`
  display: inline-block;
  margin-right: 60px;

  &:last-child {
    margin-right: 40px;
  }

  ${media.tablet`
    margin-right: 40px;

    &:first-child {
      display: none;
    }

    &:last-child {
      margin-right: 30px;
    }
  `};

  ${media.phablet`
    display: block;
    margin: 0 auto;

    &:first-child {
      display: block;
    }

    &:last-child {
      margin: 0 auto;
    }
  `};
`

const NavAnchor = styled.a`
  display: flex;
  height: 40px;
  align-items: center;
  color: ${p => p.theme.color};
  font-weight: 600;
  font-size: 18px;
  transition: opacity 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.9) ${p => p.delay}ms,
    transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.9) ${p => p.delay}ms;

  pointer-events: ${p => (p.active ? 'initial' : 'none')};
  opacity: ${p => (p.active ? (p.disabled ? 0.15 : 1) : 0)};
  transform: ${p => (p.active ? 'translateX(0)' : 'translateX(12px)')};

  &:hover {
    opacity: ${p => (p.disabled ? 0.15 : 0.6)};
  }

  ${media.phablet`
    display: block;
    margin: 0 auto;
    text-align: center;
    color: #000;
    font-weight: 400;
    margin-bottom: 10px;

  transition: opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.9) ${p =>
    p.delay + 300}ms,
    transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.9) ${p =>
      p.delay * 2 + 300}ms;
      opacity: ${p => (p.active ? (p.disabled ? 0.15 : 1) : 0)};
  transform: ${p => (p.active ? 'translateX(0)' : 'translateY(30px)')};
  `};
`

const MobileNavList = styled.ul`
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column-reverse;
  list-style: none;
  width: 200px;

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    max-width: 250px;
    right: 0;
    left: 0;
    margin: 0 auto;
    height: 1px;
    bottom: 0;
    background: #cdcdcd;
    transition: transform 0.6s cubic-bezier(0.25, 0.4, 0.4, 1) 0.5s;
    transform: ${p => (p.active ? 'scale(1)' : 'scale(0)')};
  }
`

const MobileNavListContainer = styled.div`
  position: fixed;
  overflow: hidden;
  z-index: 100000;
  list-style: none;
  display: none;
  width: 100%;
  height: 100vh;
  background: #fff;
  top: 16px;
  left: 0;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  transform: translateY(${p => (p.active ? '0' : '100vh')});
  transition: ${p =>
    p.active
      ? 'transform 0.5s cubic-bezier(0.215, 0.61, 0.355, 1)'
      : 'transform 0.4s ease-in'};
  will-change: transform;

  ${media.phablet`
    display: block;
  `};
`

const SocialLinksContainer = styled.div`
  margin: 0 auto;
  max-width: 300px;
  padding: 25px 25px 0;
  display: flex;
  justify-content: space-between;

  transition: opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.9) 0.5s,
    transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.9) 0.5s;
  opacity: ${p => (p.active ? 1 : 0)};
  transform: ${p => (p.active ? 'translateX(0)' : 'translateY(30px)')};
`

const MobileNavCenter = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const MobileNavControlsContainer = styled.div`
  position: fixed;
  z-index: 1;
  top: 34px;
  width: 100%;
  padding: 0 40px;
  display: flex;
  justify-content: space-between;

  transform: translateY(${p => (p.active ? '0' : '-100vh')});
  transition: ${p =>
    p.active
      ? 'transform 0.5s cubic-bezier(0.215, 0.61, 0.355, 1)'
      : 'transform 0.4s ease-in'};
`

const CloseIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 0H24V24H0V0Z"
      stroke="black"
      strokeOpacity="0.01"
      strokeWidth="0"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19 6.4L17.6 5L12 10.6L6.4 5L5 6.4L10.6 12L5 17.6L6.4 19L12 13.4L17.6 19L19 17.6L13.4 12L19 6.4Z"
      fill="black"
    />
  </svg>
)

const BackChevron = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.41 16.09L10.83 11.5L15.41 6.91L14 5.5L8 11.5L14 17.5L15.41 16.09Z"
      fill="black"
    />
  </svg>
)
