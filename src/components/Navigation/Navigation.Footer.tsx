import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import Section from '@components/Section'
import SocialLinks from '@components/SocialLinks'
import Logo from '@components/Logo'
import mediaqueries, { media } from '@styles/media'

const footerLinks = [
  { to: '/labs', text: 'Labs' },
  { to: '/careers', text: 'Careers' },
  { to: '/articles', text: 'Articles' },
  { to: '/contact', text: 'Contact' },
]

const Footer = ({ mode = 'dark' }: { mode?: string }) => {
  const color = mode === 'dark' ? '#fff' : '#000'
  const transparentColor =
    mode === 'dark' ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.25)'

  return (
    <Section>
      <Frame color={color}>
        <CopyRight>© {new Date().getFullYear()} Narative Studio Inc.</CopyRight>
        <Left color={color}>
          <LogoContainer to="/">
            <Logo fill={color} onlySymbol />
          </LogoContainer>
          <SocialIconsFooter>
            <SocialLinks fill={transparentColor} />
          </SocialIconsFooter>
        </Left>
        <Right>
          {footerLinks.map(link => (
            <FooterLink color={color} to={link.to}>
              {link.text}
            </FooterLink>
          ))}
        </Right>
      </Frame>
    </Section>
  )
}

export default Footer

const Frame = styled.footer`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 200px 0 80px;

  ${mediaqueries.tablet`
    justify-content: center;
    flex-direction: column-reverse;
    padding: 80px 0;
    margin-top: 65px;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background: ${p => p.color};
      opacity: 0.25;
    }
  `};
`

const Left = styled.div`
  display: flex;

  ${mediaqueries.tablet`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 60px;
    opacity: 1;
  `};

  svg path {
    transition: fill 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.9);
  }

  a:hover svg path {
    fill: ${p => p.color};
  }
`

const Right = styled.div`
  display: flex;
  align-items: center;

  ${mediaqueries.tablet`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 60px;
  `};

  ${mediaqueries.phablet`
    width: 100%;
  `}
`

const LogoContainer = styled(Link)`
  opacity: 0.25;
  transition: opacity 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.9);

  &:hover {
    opacity: 1;
  }

  ${mediaqueries.tablet`
    display: none;
  `}
`

const SocialIconsFooter = styled.div`
  display: flex;
  align-items: center;
  margin-left: 50px;

  ${mediaqueries.desktop`
    margin-left: 35px;
  `};

  ${mediaqueries.tablet`
    margin: 0 auto;
  `}
`

const FooterLink = styled(Link)`
  font-weight: 600;
  font-size: 18px;
  color: ${p => p.color};
  transition: opacity 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.9);

  &:hover {
    opacity: 0.6;
  }

  &:not(:last-child) {
    margin-right: 60px;
  }

  ${mediaqueries.desktop`
    &:not(:last-child) {
      margin-right: 35px;
    }
  `};

  ${mediaqueries.tablet`
    font-weight: 400;

    &:not(:last-child) {
      margin: 0 auto 35px;
    }
  `}
`

const CopyRight = styled.div`
  color: ${p => p.theme.colors.grey};
  text-align: center;

  ${mediaqueries.desktop_up`
    display: none;
  `}
`
