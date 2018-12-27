import React, { Component } from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'
import OutsideClickHandler from 'react-outside-click-handler'

import { Container, Logo } from '@components'

const navOptions = [
  { to: '#', text: 'Labs (coming soon)', disabled: true },
  { to: '/careers', text: 'Careers' },
  { to: 'https://medium.com/narative', text: 'Articles', external: true },
  { to: '/contact', text: 'Contact' },
]

class Navigation extends Component {
  leftToggle = React.createRef()

  state = { active: false }

  handleClickOutside() {
    this.setState({ active: false })
  }

  handleToggleClick = () => {
    this.setState({ active: !this.state.active })

    if (!this.state.active) {
      this.leftToggle.current.animate(
        [
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
        ],
        {
          duration: 900,
          fill: 'both',
          easing: 'cubic-bezier(0.075, 0.82, 0.165, 1)',
          direction: 'normal',
        }
      )
    } else {
      this.handleCloseAnimation()
    }
  }

  handleCloseAnimation = () => {
    if (this.state.active) {
      this.leftToggle.current.animate(
        [
          {
            width: '20px',
            transform: 'translate3d(-3px, -2px, 0) rotate(90deg)',
          },
          { width: '15px', transform: 'initial' },
        ],
        {
          duration: 400,
          fill: 'both',
          easing: 'cubic-bezier(0.075, 0.82, 0.165, 1)',
          direction: 'normal',
        }
      )
    }
  }

  render() {
    const { active } = this.state

    return (
      <Container>
        <NavContainer>
          <LogoContainer to="/">
            <Logo onlySymbol />
          </LogoContainer>
          <OutsideClickHandler
            onOutsideClick={() => {
              this.handleCloseAnimation()
              this.setState({ active: false })
            }}
          >
            <Nav>
              <NavList>
                <NavItems active={active} />
              </NavList>
              <ToggleContainer onClick={this.handleToggleClick}>
                <LeftToggle active={active} ref={this.leftToggle} />
                <RightToggle active={active} />
              </ToggleContainer>
            </Nav>
          </OutsideClickHandler>
        </NavContainer>
      </Container>
    )
  }
}

export default Navigation

const NavItems = ({ active }) =>
  navOptions.map((nav, index) => {
    const delay = active ? 36 * (navOptions.length - index) : 36 * index

    return (
      <NavItem key={nav.to}>
        {nav.external ? (
          <NavAnchor
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

const NavContainer = styled.div`
  padding-top: 100px;
  display: flex;
  justify-content: space-between;
`

const LogoContainer = styled(Link)``

const ToggleContainer = styled.button`
  position: relative;
  height: 40px;
  width: 40px;
  right: -10px;
  cursor: pointer;
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
  /* transform: ${p =>
    p.active ? 'translate3d(3px, -2px, 0) rotate(90deg)' : 'initial'}; */
`

const RightToggle = styled(Toggle)`
  top: 17px;
  width: 20px;
  transform: ${p =>
    p.active ? 'translate3d(3px, 4px, 0) rotate(90deg)' : 'initial'};
`

const Nav = styled.nav`
  display: flex;
  align-items: center;
`

const NavList = styled.ul`
  list-style: none;
`

const NavItem = styled.li`
  display: inline-block;
  margin-right: 60px;
`

const NavAnchor = styled.a`
  display: inline-block;
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
`
