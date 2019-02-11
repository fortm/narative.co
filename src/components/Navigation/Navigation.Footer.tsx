import React from 'react'
import styled from 'styled-components'
import { Link, navigate } from 'gatsby'

import ButtonArrow from '@components/Button/Button.Arrow'
import Section from '@components/Section'
import SocialLinks from '@components/SocialLinks'

import mediaqueries from '@styles/media'

const Footer = ({ mode = 'dark' }: { mode: string }) => {
  const color = mode === 'dark' ? '#fff' : '#000'

  return (
    <Section>
      <Frame>
        <CopyRightContainer>
          <ContactActionsContainer>
            <ContactButton to="/contact">Contact us</ContactButton>
            <ButtonArrow
              color={color}
              onClick={() => navigate('/')}
              text="Go home"
            />
          </ContactActionsContainer>
        </CopyRightContainer>
        <SocialIconsFooter>
          <SocialLinks fill={color} />
        </SocialIconsFooter>
      </Frame>
    </Section>
  )
}

export default Footer

const Frame = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10rem;
  color: ${p => p.theme.colors.grey};

  ${mediaqueries.tablet`
    justify-content: center;
    flex-direction: column;
    padding-bottom: 5rem;
  `};
`

const CopyRightContainer = styled.div`
  display: block;
  font-size: 1.8rem;
  font-weight: 500;

  ${mediaqueries.desktop`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 9rem;
    width: 100%;
  `};
`

const ContactActionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 42rem;

  ${mediaqueries.phablet`
    width: 100%;
    flex-direction: column;

    button:nth-child(2) {
      position: relative;
      left: 25px;
    }
  `};
`

const SocialIconsFooter = styled.div`
  display: flex;
  align-items: center;

  ${p =>
    p.hideOnMobile &&
    mediaqueries.desktop`
    display: none;
  `};
`

const ContactButton = styled(Link)`
  position: relative;
  height: 45px;
  width: 195px;
  background: #000;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 3px;
  font-weight: 600;

  ${mediaqueries.phablet`
    width: 100%;
    margin-bottom: 3rem;
  `};

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-shadow: 0px 3px 18px rgba(0, 0, 0, 0.28);
    opacity: 0;
    pointer-events: none;
    transform: scale(0.8);
    transition: all 300ms ease-out;
  }

  &:hover::after {
    transform: scale(1);
    opacity: 1;
  }
`
