import React, { Component } from 'react'
import styled from 'styled-components'
import { Link, graphql, StaticQuery } from 'gatsby'

import Logo from '@components/Logo'
import IntersectionObserver from '@components/IntersectionObserver'
import Section from '@components/Section'

import ContactSlideIn from '../contact/Contact.SlideIn'

import mediaqueries from '@styles/media'

const ctaLinks = [
  { to: '/careers', text: 'Careers' },
  { to: '/labs', text: 'Labs' },
  { to: '/articles', text: 'Articles' },
  { to: '/contact', text: 'Contact' },
]

const imageQuery = graphql`
  query HomeCTAQuery {
    file(name: { regex: "/waves-texture-1/" }) {
      childImageSharp {
        original {
          src
        }
      }
    }
  }
`

class HomeCallToAction extends Component<{}, { animation: string }> {
  state = { animation: '' }

  handleActionClick = () => {
    this.setState({ animation: 'start' })
  }

  handleClose = () => {
    this.setState({ animation: '' })
  }

  render() {
    const { animation } = this.state

    return (
      <StaticQuery
        query={imageQuery}
        render={({ file }) => (
          <IntersectionObserver
            render={({ visiblePercentage }) => (
              <Frame>
                <Nav inView={visiblePercentage > 90}>
                  <Logo onlySymbol fill="rgba(255,255,255,0.25)" />
                  <NavLinks>
                    {ctaLinks.map(link => (
                      <NavLink key={link.to} to={link.to}>
                        {link.text}
                      </NavLink>
                    ))}
                  </NavLinks>
                </Nav>
                <TextContainer>
                  <TextBackground
                    background={file.childImageSharp.original.src}
                  >
                    <Text>
                      Together, we’ll discover what your company is truly
                      capable of.
                    </Text>
                  </TextBackground>
                </TextContainer>
                <CallToAction onClick={this.handleActionClick}>
                  <CTAText animation={animation}>
                    Contact Us <ChevronDownIcon />
                  </CTAText>
                </CallToAction>
                <ContactSlideIn
                  animation={animation}
                  onClose={this.handleClose}
                />
              </Frame>
            )}
          />
        )}
      />
    )
  }
}

export default HomeCallToAction

const Frame = styled.div`
  position: relative;
  min-height: 100vh;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0px;
    left: 0;
    width: 100%;
    height: 1px;
    background: radial-gradient(
      571.64px at 50.14% 100.05%,
      rgba(255, 255, 255, 0.25) 0%,
      rgba(255, 255, 255, 0.02) 100%
    );
  }
`

const Nav = styled(Section)`
  position: relative;
  display: flex;
  justify-content: space-between;
  padding-top: 100px;
  opacity: ${p => (p.inView ? 1 : 0)};
  transition: opacity ${p => (p.inView ? '1s' : '0.5s')} linear;
  z-index: 1;
`

const NavLinks = styled.div``

const NavLink = styled(Link)`
  font-weight: 600;
  font-size: 18px;
  color: #fafafa;
  transition: opacity 0.3s var(--ease-out-quad);

  &:not(:last-child) {
    margin-right: 60px;
  }

  &:hover {
    opacity: 0.5;
  }
`

const TextContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const TextBackground = styled.div`
  -webkit-background-clip: text;

  background-repeat: no-repeat;
  background-image: url(${p => p.background});
  background-size: cover;
  color: transparent !important;
  background-position: center;
`

const Text = styled.p`
  font-family: ${p => p.theme.fontfamily.serif};
  font-weight: 700;
  line-height: 1.1;
  font-size: 80px;
  letter-spacing: -0.5px;
  max-width: 680px;
  color: transparent;
`

const CallToAction = styled.button`
  position: absolute;
  bottom: calc(-50vh + 75px);
  width: 100%;
  height: 50vh;
  background: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  text-align: center;
  color: #000;
`

const CTAText = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  width: 100%;
  top: 22px;
  font-weight: 600;
  pointer-events: none;

  opacity: ${p => (p.animation ? 0 : 1)};
  transition: opacity 0.3s linear ${p => (p.animation ? 0 : '0.5s')};
`

const ChevronDownIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.41 7.83984L12 12.4198L16.59 7.83984L18 9.24984L12 15.2498L6 9.24984L7.41 7.83984Z"
      fill="black"
      fill-opacity="0.25"
    />
  </svg>
)
