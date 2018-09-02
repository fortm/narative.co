import React, { Component } from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import styled, { keyframes } from 'styled-components'
import { media, transitions } from '@styles'
import {
  CareersAccordian,
  CareersGraph,
  Container,
  Logo,
  Perks,
} from '@components'
import { Section } from '@modules'
import * as SocialIcons from '../icons/social'
import { ArrowRightIcon } from '../icons/ui'

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

const ImageContainer = styled.div`
  width: 100%;
  max-width: 45rem;
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

  ${media.desktop`
    display: none;
  `};
`

const ContactActionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 42rem;

  ${media.phablet`
    width: 100%;
    flex-direction: column;
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
  font-weight: 500;

  ${media.phablet`
    width: 100%;
    margin-bottom: 2.5rem;
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

const ContactText = styled(Link)`
  display: flex;
  flex-direction: row;
  font-size: 1.6rem;
  font-weight: 600;
  color: ${p => (p.color ? p.color : '#000')};

  ${media.tablet`
    flex-direction: column;
  `};

  svg {
    margin-left: 1rem;
    transition: transform 300ms ${props => props.theme.transitions.in};
  }
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

const WhatWeDoList = styled.ul`
  width: 42rem;
  list-style: none;

  ${media.desktop`
    width: 100%;
  `};
`

const WhatWeDoListItem = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  height: 5rem;
  color: ${props => props.theme.colors.grey};

  transition: all 1.5s cubic-bezier(0.77, 0, 0.175, 1) & > span {
    color: #fff;
    display: flex;
  }

  &:not(:last-child) {
    &::after {
      content: '';
      position: absolute;
      width: 38%;
      height: 1px;
      left: 0;
      bottom: 0;
      background: ${props => props.theme.colors.grey};
      transition: transform 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
    }
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
    const { animation } = this.state

    console.log(this.props)
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
                <RightContainer>
                  <ImageContainer>
                    <Img sizes={this.props.data.file.childImageSharp.sizes} />
                  </ImageContainer>
                </RightContainer>
              </GridContainer>
            </Container>

            <Section header="Why Narative">
              <SectionCopy maxWidth="69rem">
                At Narative, nobody has a "boss". Instead, we hold a common
                goal, one where everyone has executive level decision,
                regardless of position. We teach and learn from each other every
                day, with growth based on trust and relationships.
              </SectionCopy>
            </Section>
            <Section header="Our perks">
              <FlexColumn>
                <WhatWeDoContent>
                  <SectionCopy maxWidth="41rem">
                    We don't just mindfully select our clients, you get to
                    choose how and when you work, to ensure you're at your best.
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
                  <Perks />
                  {/* <WhatWeDoListItem>
                    <span>
                      100% remote{' '}
                      <HideOnMobile smallest>&nbsp;-&nbsp;</HideOnMobile>
                    </span>{' '}
                    <HideOnMobile smallest>
                      work from your couch, or from a beach
                    </HideOnMobile>
                  </WhatWeDoListItem>
                  <WhatWeDoListItem>
                    <span>
                      Autonomy{' '}
                      <HideOnMobile smallest>&nbsp;-&nbsp;</HideOnMobile>
                    </span>{' '}
                    <HideOnMobile smallest>
                      build your own hours, work at your own pace
                    </HideOnMobile>
                  </WhatWeDoListItem>
                  <WhatWeDoListItem>
                    <span>
                      Respect{' '}
                      <HideOnMobile smallest>&nbsp;-&nbsp;</HideOnMobile>
                    </span>{' '}
                    <HideOnMobile smallest>
                      companies trust us for what we build
                    </HideOnMobile>
                  </WhatWeDoListItem>
                  <WhatWeDoListItem>
                    <span>
                      {' '}
                      Vacation{' '}
                      <HideOnMobile smallest>&nbsp;-&nbsp;</HideOnMobile>
                    </span>{' '}
                    <HideOnMobile smallest>
                      well, you make your own schedule. really
                    </HideOnMobile>
                  </WhatWeDoListItem>
                  <WhatWeDoListItem>
                    <span>
                      {' '}
                      Competitive salaries{' '}
                      <HideOnMobile smallest>&nbsp;-&nbsp;</HideOnMobile>
                    </span>{' '}
                    <HideOnMobile smallest>
                      we pay what you deserve
                    </HideOnMobile>
                  </WhatWeDoListItem>
                  <WhatWeDoListItem>
                    <span>
                      Executive decisions{' '}
                      <HideOnMobile smallest>&nbsp;-&nbsp;</HideOnMobile>
                    </span>{' '}
                    <HideOnMobile smallest>
                      we listen to you, at all times
                    </HideOnMobile>
                  </WhatWeDoListItem> */}
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
            <Section
              header={
                <div style={{ paddingRight: '2.5rem' }}>
                  Building our future
                </div>
              }
            >
              <SectionCopy maxWidth="67rem">
                We engage with exceptional clients to fund our own ideas.
                Manifesting our core beliefs through the development of our own
                products. We call this Narative Labs.
              </SectionCopy>
            </Section>
            <CareersGraph />

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
                <CopyRightContainer>
                  <ContactActionsContainer>
                    <ContactButton to="/contact">Contact us</ContactButton>
                    <ContactText to="/" color="#fff">
                      <ArrowAnimation>
                        Go back home
                        <ArrowRightIcon color="#fff" />
                      </ArrowAnimation>
                    </ContactText>
                  </ContactActionsContainer>
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

export const pageQuery = graphql`
  query CareersPageQuery {
    file(name: { regex: "/narative-careers-hero/" }) {
      childImageSharp {
        sizes(maxWidth: 458, quality: 100) {
          ...GatsbyImageSharpSizes_noBase64
        }
      }
    }
  }
`
