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

const NavigationMobile = ({ navigateOut }) => (
  <Frame>
    <SocialIconsFooter>
      <SocialLinks fill="#fff" />
    </SocialIconsFooter>
    <HorizontalRule />
    {footerLinks.map(link => (
      <StyledLink
        key={link.to}
        to={link.to}
        onClick={event => navigateOut(event, link.to)}
        getProps={({ isPartiallyCurrent }) =>
          isPartiallyCurrent ? { ['data-active']: 'true' } : null
        }
      >
        {link.text}
      </StyledLink>
    ))}
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

const HorizontalRule = styled.hr`
  border: none;
  height: 1px;
  background: rgba(255, 255, 255, 0.25);
  margin: 0 40px 80px;

  @media screen and (max-height: 700px) {
    margin: 0 20px 40px;
  }
`

const SocialIconsFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 60px;

  @media screen and (max-height: 700px) {
    margin-bottom: 40px;
  }
`

const StyledLink = styled(Link)`
  font-size: 22px;
  color: #fff;
  display: block;
  text-align: center;

  &[data-active='true'] {
    color: #7a8085;
  }

  &:not(:last-child) {
    margin-bottom: 35px;

    @media screen and (max-height: 700px) {
      margin-bottom: 25px;
    }
  }
`
