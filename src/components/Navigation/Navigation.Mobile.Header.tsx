import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import SocialLinks from '@components/SocialLinks'
import mediaqueries from '@styles/media'

const footerLinks = [
  { to: '/careers', text: 'Careers' },
  { to: '/labs', text: 'Labs' },
  { to: '/articles', text: 'Articles' },
  { to: '/contact', text: 'Contact' },
]

/**
 * The fixed navigation sitting "behind" the mobile version of narative.co
 * All the link functionality is taken over by the passed in navigateOut()
 * function that delays and allows us to animate between states.
 *
 * @param navigateOut
 */
const NavigationMobile = ({
  active,
  navigateOut,
}: {
  active: boolean
  naviagteOut: (Event, string) => void
}) => (
  <Frame>
    <SocialIconsFooter active={active}>
      <SocialLinks fill="#fff" />
    </SocialIconsFooter>
    <HorizontalRule active={active} />
    <MobileLinks active={active}>
      {footerLinks.map((link, index) => (
        <StyledLink
          active={active}
          key={link.to}
          index={index}
          to={link.to}
          onClick={event => navigateOut(event, link.to)}
          getProps={({ isPartiallyCurrent }) =>
            isPartiallyCurrent ? { ['data-active']: 'true' } : null
          }
        >
          {link.text}
        </StyledLink>
      ))}
    </MobileLinks>
  </Frame>
)

export default NavigationMobile

const Frame = styled.nav`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 0;
  padding: 80px 0;
  height: 100vh;
  background: #1d2128;

  @media screen and (max-height: 700px) {
    padding: 40px 0;
  }

  ${mediaqueries.desktop_up`
    display: none;
    visibility: hidden;
  `}
`

const SocialIconsFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 60px;

  opacity: ${p => (p.active ? 1 : 0)};
  transform: translateY(${p => (p.active ? 0 : -12)}px);
  transition: all 0.5s var(--ease-out-quad) 200ms;

  @media screen and (max-height: 700px) {
    margin-bottom: 40px;
  }
`

const HorizontalRule = styled.hr`
  border: none;
  height: 1px;
  background: rgba(255, 255, 255, 0.25);
  margin: 0 40px 65px;

  opacity: ${p => (p.active ? 1 : 0)};
  transform: scaleX(${p => (p.active ? 1 : 0.6)});
  transition: transform 0.6s var(--ease-out-quad), opacity 0.4s ease-out;

  @media screen and (max-height: 700px) {
    margin: 0 20px 25px;
  }
`

const MobileLinks = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledLink = styled(Link)`
  position: relative;
  font-size: 22px;
  color: #fff;
  display: inline-block;
  margin: 0 auto;
  text-align: center;

  opacity: ${p => (p.active ? 1 : 0)};
  transform: translateY(${p => (p.active ? 0 : -10)}px);
  transition: all 0.5s cubic-bezier(0.32, 0.08, 0.24, 1)
    ${p => p.index * 45 + 200}ms;

  &[data-active='true'] {
    color: #7a8085;
  }

  padding: 15px;
  margin-bottom: 5px;

  @media screen and (max-height: 700px) {
    margin-bottom: 0;
  }
`
