import React, { Component } from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'
import OutsideClickHandler from 'react-outside-click-handler'

import { Container, Logo, SocialLinks } from '@components'
import { media } from '@styles'

const navOptions = [
  { to: '#', text: 'Labs (coming soon)', disabled: true },
  { to: '/careers', text: 'Careers' },
  { to: 'https://medium.com/narative', text: 'Articles', external: true },
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

class Navigation extends Component {
  leftToggle = React.createRef()

  state = { active: false, lastScrollTop: 0 }

  componentDidMount() {
    window.addEventListener('keydown', this.handleEscKeyPress)
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('keydown', this.handleEscKeyPress)
    }
  }

  handleScroll = () => {
    const currentPosition =
      window.pageYOffset || document.documentElement.scrollTop

    if (currentPosition - 20 > this.state.lastScrollTop) {
      this.handleOutsideClick()
    }
  }

  handleEscKeyPress = ({ key }) => {
    if (key === 'Escape') {
      this.handleOutsideClick()
    }
  }

  handleToggleClick = () => {
    const screenWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth

    this.setState({
      active: !this.state.active,
      lastScrollTop: window.pageYOffset,
    })

    window.addEventListener('scroll', this.handleScroll)

    if (screenWidth > 768) {
      if (!this.state.active) {
        this.leftToggle.current.animate(animateIn, {
          duration: 900,
          fill: 'both',
          easing: 'cubic-bezier(0.075, 0.82, 0.165, 1)',
        })
      } else {
        this.handleCloseAnimation()
      }
    } else {
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
    window.removeEventListener('scroll', this.handleScroll)
    this.handleCloseAnimation()
    this.setState({ active: false })
  }

  render() {
    const { active } = this.state

    return (
      <OutsideClickHandler onOutsideClick={this.handleOutsideClick}>
        <NavFixedContainer>
          <Container>
            <NavContainer>
              <LogoContainer to="/">
                <Logo onlySymbol />
              </LogoContainer>
              <Nav>
                <DesktopNavList>
                  <NavItems active={active} />
                </DesktopNavList>
                <ToggleContainer onClick={this.handleToggleClick}>
                  <LeftToggle active={active} ref={this.leftToggle} />
                  <RightToggle active={active} />
                </ToggleContainer>
              </Nav>
            </NavContainer>
          </Container>
        </NavFixedContainer>
        <MobileNavListContainer active={active}>
          <MobileNavControlsContainer active={active}>
            <LogoContainer to="/">
              <Logo onlySymbol fill="black" />
            </LogoContainer>
            <span onClick={this.handleToggleClick}>
              <CloseIcon />
            </span>
          </MobileNavControlsContainer>
          <MobileNavList active={active}>
            <NavItems active={active} />
          </MobileNavList>
          <SocialLinksContainer active={active}>
            <SocialLinks fill="black" />
          </SocialLinksContainer>
        </MobileNavListContainer>
      </OutsideClickHandler>
    )
  }
}

export default Navigation

const NavItems = ({ active }) =>
  navOptions.map((nav, index) => {
    const delay = active ? 30 * (navOptions.length - index) : 30 * index

    return (
      <NavItem key={nav.to}>
        {nav.external ? (
          <NavAnchor
            target="_blank"
            rel="noopener"
            active={active}
            disabled={nav.disabled}
            href={nav.to}
            delay={delay}
          >
            {nav.text}
          </NavAnchor>
        ) : (
          <NavAnchor
            active={active}
            disabled={nav.disabled}
            to={nav.to}
            delay={delay}
            as={Link}
          >
            {nav.text}
          </NavAnchor>
        )}
      </NavItem>
    )
  })

const NavFixedContainer = styled.div`
  ${media.tablet`
    position: fixed;
    height: 90px;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 10;
  `};
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
  background: #fff;
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
  color: #fff;
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
  padding-top: 240px;

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

  ${media.phablet`
    padding-top: 67%;
  `};

  ${media.phone`
    padding-top: 60%;
  `};

  ${media.se`
  padding-top: 45%;

  `};
`

const MobileNavListContainer = styled.div`
  overflow: hidden;
  z-index: 100000;
  list-style: none;
  display: none;
  position: fixed;
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
  padding: 25px;
  display: flex;
  justify-content: space-between;

  transition: opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.9) 0.5s,
    transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.9) 0.5s;
  opacity: ${p => (p.active ? 1 : 0)};
  transform: ${p => (p.active ? 'translateX(0)' : 'translateY(30px)')};
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
