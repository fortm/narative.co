import React, { Component } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { Link, navigate } from 'gatsby'
import OutsideClickHandler from 'react-outside-click-handler'
import { isMobileOnly } from 'react-device-detect'

import { Section, Logo } from '@components'
import mediaqueries from '@styles/media'

const navLinks = [
  { to: '/careers', text: 'Careers' },
  { to: '/labs', text: 'Labs' },
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

interface NavigationState {
  active: boolean
  previousPath: string
  showPreviousPath: boolean
}

class Navigation extends Component<{}, NavigationState> {
  leftToggle = React.createRef()

  state = {
    active: false,
    previousPath: '',
    showPreviousPath: false,
  }

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
    const $toggle = this.leftToggle.current

    this.setState(
      {
        active: !this.state.active,
      },
      () => {
        if (!isMobileOnly) {
          if (this.state.active && $toggle) {
            $toggle.animate(animateIn, {
              duration: 900,
              fill: 'both',
              easing: 'cubic-bezier(0.075, 0.82, 0.165, 1)',
            })
          } else {
            this.handleCloseAnimation()
          }
        }
      }
    )
  }

  handleCloseAnimation = () => {
    const $toggle = this.leftToggle.current

    if ($toggle) {
      $toggle.animate(animateOut, {
        duration: 250,
        fill: 'both',
        easing: 'cubic-bezier(0.075, 0.82, 0.165, 1)',
      })
    }
  }

  handleOutsideClick = () => {
    if (this.state.active) {
      this.handleCloseAnimation()
      this.setState({ active: false })
    }
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
                <LogoContainer to="/" aria-label="Back home">
                  <Logo onlySymbol fill={fill} />
                </LogoContainer>
                <Nav>
                  <DesktopNavList>
                    <NavItems active={active} handleClick={this.navigateOut} />
                  </DesktopNavList>
                  <ToggleContainer
                    onClick={this.handleToggleClick}
                    aria-label="Mobile Navigation Button"
                  >
                    <LeftToggle active={active} ref={this.leftToggle} />
                    <RightToggle active={active} />
                  </ToggleContainer>
                </Nav>
              </NavContainer>
            </Section>
          </NavFixedContainer>
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
        <NavAnchor
          active={active ? active : undefined}
          disabled={nav.disabled}
          to={nav.to}
          delay={delay}
          as={Link}
          onClick={event => handleClick(event, nav.to)}
          getProps={({ isPartiallyCurrent }) =>
            isPartiallyCurrent ? { ['data-active']: 'true' } : null
          }
        >
          {nav.text}
        </NavAnchor>
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

  ${mediaqueries.tablet`
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

const LogoContainer = styled(Link)`
  transition: opacity 0.3s var(--ease-out-quad);

  &:hover {
    opacity: 0.6;
  }
`

const ToggleContainer = styled.button`
  position: relative;
  height: 40px;
  width: 40px;
  right: -10px;
  cursor: pointer;

  ${mediaqueries.phablet`
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

  ${mediaqueries.tablet`
      display: none;
    `}
`

const LeftToggle = styled(Toggle)`
  top: 23px;
  width: ${p => (p.active ? '20px' : '15px')};

  ${mediaqueries.phablet`
    top: 15px;
    width: 15px;
  `};
`

const RightToggle = styled(Toggle)`
  top: 17px;
  width: 20px;
  transform: ${p =>
    p.active ? 'translate3d(3px, 4px, 0) rotate(90deg)' : 'initial'};

  ${mediaqueries.phablet`
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

  ${mediaqueries.phablet`
  display: none;

  `};
`

const NavItem = styled.li`
  display: inline-block;
  margin-right: 60px;

  &:last-child {
    margin-right: 40px;
  }

  ${mediaqueries.tablet`
    margin-right: 40px;

    &:first-child {
      display: none;
    }

    &:last-child {
      margin-right: 30px;
    }
  `};

  ${mediaqueries.phablet`
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

  &[data-active='true'] {
    &::after {
      content: '';
      position: absolute;
      margin: 0 auto;
      left: 0;
      right: 0;
      bottom: 4px;
      height: 1px;
      width: 20px;
      background: ${p => p.theme.color};
    }
  }

  &:hover {
    opacity: ${p => (p.disabled ? 0.15 : 0.6)};
  }

  ${mediaqueries.phablet`
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
