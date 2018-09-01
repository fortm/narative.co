import React, { Component } from 'react'
import Link from 'gatsby-link'
import styled, { keyframes } from 'styled-components'
import { media, transitions } from '@styles'
import { CareersAccordian, Container, Logo } from '@components'
import { Section, Testimonials } from '@modules'
import * as SocialIcons from '../icons/social'
import { ArrowRightIcon, PencilIcon } from '../icons/ui'

const animateButtonLine = keyframes`
  0% {
      width: 0;
  }
  50% {
      width: 70%;
  }
  100% {
      width: 70%;
      left: 100%;
  }
`

const fadeInOut = keyframes`
  0% {
      opacity: 0;
      width: 0;
  }
  50% { opacity: 1; width: 40%}
  60% { opacity: 1; width: 70%}
  80% {
    opacity: 0;
    width: 50%;
    left: 100%;
  }
`

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr [col-start]);
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  height: 88vh;
  width: 100%;

  ${media.desktop`
    height: initial
    grid-template-columns: 1fr;
  `};

  ${media.phone`
    width: 100%;
  `};
`

const LogoContainer = styled(Link)`
  max-height: 2.3rem;
  max-width: 13.059rem;
  margin-bottom: 0;
  text-decoration: none;
  ${transitions.fadeUp};

  ${media.desktop`
  max-width: 10rem;
  margin-bottom: 4rem;
  `};
`

const TextContainer = styled.div`
  ${transitions.fadeUp};
`

const HiringPill = styled.div`
  color: ${p => p.theme.colors.grey};
  border: 1px solid ${p => p.theme.colors.grey};
  border-radius: 3px;
  padding: 0.1rem 1.2rem;
  margin-bottom: 1.5rem;
  display: inline-block;
  font-weight: 600;

  @keyframes;
`

const WelcomeHeader = styled.h1`
  color: white;
  font-size: 3.6rem;
  margin-bottom: 2rem;

  ${media.desktop`
    font-size: 1.8rem;
  `};
`

const MainText = styled.p`
  font-size: 1.6rem;
  font-weight: 400;
  color: ${props => props.theme.colors.grey};
  margin-bottom: 2rem;
  max-width: 42rem;
`

const ContactText = styled(Link)`
  display: flex;
  flex-direction: row;
  font-size: 1.6rem;
  font-weight: 600;
  color: ${props => props.theme.colors.grey};

  ${media.tablet`
    flex-direction: column;
  `};

  svg {
    margin-left: 1rem;
    transition: transform 300ms ${props => props.theme.transitions.in};
  }
`

const HideOnMobile = styled.div`
  display: block;

  ${props =>
    props.smallest
      ? media.tablet`
    display: none;
  `
      : `@media (max-width: 32rem) {
    display: none;
    }`};
`

const HideOnDesktop = styled.span`
  display: none;

  ${media.tablet`
    display: block;
  `};
`

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 49.5rem;
  height: 53rem;

  ${media.desktop`
    padding-top: 5rem;
    justify-content: flex-start;
    width: 100%;
    height: initial;
  `};
`

const RightContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding-top: 4rem;

  ${media.desktop`
    justify-content: center;
    margin-bottom: 5rem;
  `};
`

const CopyRightContainer = styled.div`
  display: block;

  font-size: 1.6rem;
  font-weight: 500;
  color: ${props => props.theme.colors.grey};
  ${transitions.fadeUp};

  ${media.desktop`
    display: none;
  `};
`

const CopyRightContainerMobile = styled.div`
  display: none;
  font-size: 1.6rem;
  font-weight: 500;
  color: ${props => props.theme.colors.grey};
  align-self: center;
  margin-top: 2rem;

  ${media.desktop`
    display: none;
  `};
`

const HighlightText = styled.span`
  color: #fff;
`

const ArrowAnimation = styled.div`
  position: relative;
  display: inline-block;
  overflow-x: hidden;
  padding: 0 3rem 0 0.5rem;

  ${media.tablet`
    padding: 0rem 3rem 0 0rem;
  `};

  &::after {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: 12px;
    height: 1px;
    width: 0;
    background: #fff;
    opacity: 0;
    z-index: 100;
  }

  svg {
    transition: all 300ms cubic-bezier(0.77, 0, 0.175, 1);
  }

  &:hover svg {
    transform: translateX(3rem);
  }

  &:hover span::after {
    animation: ${fadeInOut} 1s cubic-bezier(0.77, 0, 0.175, 1) forwards;
  }

  &:hover::after {
    opacity: 1;
    animation: ${animateButtonLine} 1s cubic-bezier(0.77, 0, 0.175, 1) forwards;

    ${media.tablet`
      animation: none;
    `};
  }
`
const SectionCopy = styled.p`
  color: #fff;
  font-size: 3.6rem;
  line-height: 1.2;
  max-width: ${props => (props.maxWidth ? props.maxWidth : '100%')};

  ${media.desktop`
    font-size: 2.2rem;
    line-height: 1.4;
    max-width: 100%;
  `};
`

const SectionCopyHighlight = styled.span`
  position: relative;
  background: #e9daac;
  display: inline-block;
  padding: 0px 1px;
  color: #000;

  &::before {
    content: '';
    position: absolute;
    left: -5px;
    height: 100%;
    top: 0;
    bottom: 0;
    width: 5px;
    background: #e9daac;
  }

  &::after {
    content: '';
    position: absolute;
    right: -5px;
    width: 5px;
    height: 100%;
    top: 0;
    bottom: 0;
    background: #e9daac;
  }
`

const FunctionArrowContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 7rem;
  max-width: 68rem;

  ${media.desktop`
    margin-top: 3.5rem;
  `};
`

const FunctionArrowWord = styled.div`
  font-weight: 900;
  text-transform: uppercase;
  font-size: 2.4rem;
  color: ${props => props.theme.colors.grey};
  ${props =>
    props.paddingLeft ? `padding-left: 2.6rem` : `padding-right: 2.6rem`};

  ${media.phone`
      ${props =>
        props.paddingLeft ? `padding-left: 0.6rem` : `padding-right: 0.6rem`};
  `};
`

const FunctionArrow = styled.div`
  position: relative;
  height: 2px;
  width: 100%;
  background: ${props => props.theme.colors.grey};

  &::before,
  &::after {
    content: '';
    position: absolute;
    right: -2px;
    transform: rotate(45deg);
    height: 2px;
    border-radius: 4px;
    width: 10px;
    background: ${props => props.theme.colors.grey};
    top: -3px;
  }

  &::after {
    transform: rotate(-45deg);
    top: initial;
    bottom: -3px;
  }
`

const WhatWeDoList = styled.ul`
  width: 40rem;
  list-style: none;

  ${media.desktop`
    width: 100%;
  `};
`

const WhatWeDoListItem = styled.li`
  display: flex;
  align-items: center;
  height: 5rem;
  color: ${props => props.theme.colors.grey};

  & > span {
    color: #fff;
    display: flex;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #707173;
  }

  ${media.tablet`
    font-size: 1.2rem;
  `};

  @media (max-width: 32rem) {
    font-size: 1.4rem;
  }
`

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 5rem;
  color: ${props => props.theme.colors.grey};

  ${media.tablet`
    justify-content: center;
  `};
`

const SocialIconContainer = styled.a`
  margin-left: 3rem;
  text-decoration: none;

  ${media.tablet`
    margin: 0 1.6rem;
  `};
`

const SocialIconsFooter = styled.div`
  display: flex;
  align-items: center;

  ${props =>
    props.hideOnMobile &&
    media.desktop`
    display: none;
  `};
`

const HorizontalRule = styled.div`
  background: #707173;
  height: 1px;
  width: 100%;
  max-width: 68rem;
  margin-bottom: 7rem;

  ${media.desktop`
    margin-bottom: 3.5rem;
  `};
`

const FlexColumn = styled.div`
  display: flex;
  justify-content: space-between;

  ${media.desktop`
    flex-direction: column;
  `};
`

const TestimonialsImage = styled.img`
  width: 69rem;
  margin: 7rem auto;

  ${media.desktop`
    width: 100%;
    margin: 3.5rem auto;
  `};
`

const WhatWeDoContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${media.desktop`
    margin-bottom: 2.5rem;
  `};
`

const Content = styled.div`
  position: relative;
  z-index: 1;
`

const GradientContainer = styled.div`
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: linear-gradient(
      rgb(9, 10, 12),
      rgb(17, 18, 22) 60%,
      rgb(13, 18, 27) 100%
    );
    pointer-events: none;
    transition: all 1.5s ease;
    z-index: 0;
    opacity: ${p => (p.animation ? 1 : 0)};
  }
`
class CareersPage extends Component {
  state = { animation: '' }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ animation: 'start' })
    })
  }

  render() {
    const { animation, view } = this.state

    return (
      <React.Fragment>
        <GradientContainer animation={animation}>
          <Content>
            <Container>
              <GridContainer>
                <LeftContainer>
                  <LogoContainer to="/" animation={animation}>
                    <Logo />
                  </LogoContainer>
                  <TextContainer animation={animation} transitionDelay={600}>
                    <HiringPill>We're hiring</HiringPill>
                    <WelcomeHeader>
                      We help the world's best startups build their products
                    </WelcomeHeader>
                    <MainText>
                      Imagine a place where we get to choose, together, the
                      brands we believe in. Where trust and contribution is at
                      the core of our values.
                    </MainText>
                    <ContactText to="/contact">
                      <HighlightText>Learn more</HighlightText>
                    </ContactText>
                  </TextContainer>
                  <div />
                </LeftContainer>
                <RightContainer>.</RightContainer>
              </GridContainer>
            </Container>

            <Section header="Why Narative">
              <SectionCopy maxWidth="66rem">
                Nobody at Narative has a "boss". Instead we have a common goal,
                where everyone has executive decision, regardless of your
                position. We teach and learn from each other every day and we
                grow based on trust and relationships.
              </SectionCopy>
              <FunctionArrowContainer>
                <FunctionArrowWord>Function</FunctionArrowWord>{' '}
                <FunctionArrow />{' '}
                <FunctionArrowWord paddingLeft>Form</FunctionArrowWord>
              </FunctionArrowContainer>
            </Section>
            <Section header="Our perks">
              <FlexColumn>
                <WhatWeDoContent>
                  <SectionCopy maxWidth="36rem">
                    We not only get to choose our clients, but you also get to
                    choose how you work and even when you work.
                  </SectionCopy>
                  <div style={{ color: '#fff', marginBottom: '1.6rem' }}>
                    <SocialIconsFooter hideOnMobile>
                      <HideOnMobile>Find us on the web:</HideOnMobile>
                      <SocialIconContainer
                        target="_blank"
                        href="https://www.facebook.com/narative.co/"
                      >
                        <SocialIcons.FacebookIcon />
                      </SocialIconContainer>
                      <SocialIconContainer
                        target="_blank"
                        href="https://twitter.com/narative_co"
                      >
                        <SocialIcons.TwitterIcon />
                      </SocialIconContainer>
                      <SocialIconContainer
                        target="_blank"
                        href="https://www.linkedin.com/company/narative/"
                      >
                        <SocialIcons.LinkedinIcon />
                      </SocialIconContainer>
                      <SocialIconContainer
                        target="_blank"
                        href="https://github.com/narative"
                      >
                        <SocialIcons.GithubIcon />
                      </SocialIconContainer>
                      <SocialIconContainer
                        target="_blank"
                        href="https://www.instagram.com/narative.co/"
                      >
                        <SocialIcons.DribbleIcon />
                      </SocialIconContainer>
                    </SocialIconsFooter>
                  </div>
                </WhatWeDoContent>
                <WhatWeDoList>
                  <WhatWeDoListItem>
                    <span>
                      Branding{' '}
                      <HideOnMobile smallest>&nbsp;-&nbsp;</HideOnMobile>
                    </span>{' '}
                    <HideOnMobile smallest>
                      logotype design, guidelines, typefaces and marks
                    </HideOnMobile>
                  </WhatWeDoListItem>
                  <WhatWeDoListItem>
                    <span>
                      Marketing{' '}
                      <HideOnMobile smallest>&nbsp;-&nbsp;</HideOnMobile>
                    </span>{' '}
                    <HideOnMobile smallest>
                      strategy, business development, growth
                    </HideOnMobile>
                  </WhatWeDoListItem>
                  <WhatWeDoListItem>
                    <span>
                      Editorial{' '}
                      <HideOnMobile smallest>&nbsp;-&nbsp;</HideOnMobile>
                    </span>{' '}
                    <HideOnMobile smallest>
                      whitepapers, books and magazine designs
                    </HideOnMobile>
                  </WhatWeDoListItem>
                  <WhatWeDoListItem>
                    <span>
                      {' '}
                      Development{' '}
                      <HideOnMobile smallest>&nbsp;-&nbsp;</HideOnMobile>
                    </span>{' '}
                    <HideOnMobile smallest>
                      dennis will write anything he wants here
                    </HideOnMobile>
                  </WhatWeDoListItem>
                  <WhatWeDoListItem>
                    <span>
                      {' '}
                      Product design{' '}
                      <HideOnMobile smallest>&nbsp;-&nbsp;</HideOnMobile>
                    </span>{' '}
                    <HideOnMobile smallest>mobile and web apps</HideOnMobile>
                  </WhatWeDoListItem>
                  <WhatWeDoListItem>
                    <span>
                      Experience{' '}
                      <HideOnMobile smallest>&nbsp;-&nbsp;</HideOnMobile>
                    </span>{' '}
                    <HideOnMobile smallest>
                      optimize the usability of your digital product
                    </HideOnMobile>
                  </WhatWeDoListItem>
                </WhatWeDoList>
              </FlexColumn>
            </Section>
            <Section header="Big products" hideOverflow>
              <div>
                <SectionCopy maxWidth="69rem">
                  <HideOnMobile>
                    Focusing on design and digital storytelling, we had the
                    pleasure to work with the world's most{' '}
                    <SectionCopyHighlight>
                      ambitious brands
                    </SectionCopyHighlight>{' '}
                    to create amazing experiences.
                  </HideOnMobile>
                  <HideOnDesktop>
                    Focusing on design and digital storytelling, we had the
                    pleasure to work with the world's most ambitious brands to
                    create{' '}
                    <SectionCopyHighlight>
                      amazing experiences.
                    </SectionCopyHighlight>
                  </HideOnDesktop>
                </SectionCopy>
                <SectionCopy maxWidth="69rem" />
                <TestimonialsImage src="/images/testimonials/placeholder-image.png" />
              </div>
            </Section>
            <Section header="Say hello">
              <SectionCopy maxWidth="67rem">
                If you have the devotion, the curiosity and the desire to build
                great things, you might fit right in
              </SectionCopy>
            </Section>
            <Container>
              <CareersAccordian />
            </Container>
            <Container>
              <Footer>
                <CopyRightContainer animation={animation} transitionDelay={800}>
                  © {new Date().getFullYear()} Narative Studio Inc.
                </CopyRightContainer>
                <SocialIconsFooter>
                  <SocialIconContainer
                    target="_blank"
                    href="https://www.facebook.com/narative.co/"
                  >
                    <SocialIcons.FacebookIcon />
                  </SocialIconContainer>
                  <SocialIconContainer
                    target="_blank"
                    href="https://twitter.com/narative_co"
                  >
                    <SocialIcons.TwitterIcon />
                  </SocialIconContainer>
                  <SocialIconContainer
                    target="_blank"
                    href="https://www.linkedin.com/company/narative/"
                  >
                    <SocialIcons.LinkedinIcon />
                  </SocialIconContainer>
                  <SocialIconContainer
                    target="_blank"
                    href="https://github.com/narative"
                  >
                    <SocialIcons.GithubIcon />
                  </SocialIconContainer>
                  <SocialIconContainer
                    target="_blank"
                    href="https://www.instagram.com/narative.co/"
                  >
                    <SocialIcons.DribbleIcon />
                  </SocialIconContainer>
                </SocialIconsFooter>
              </Footer>
            </Container>
          </Content>
        </GradientContainer>
      </React.Fragment>
    )
  }
}

export default CareersPage
