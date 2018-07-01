import React, { Component } from 'react'
import Link from 'gatsby-link'
import styled, { keyframes } from 'styled-components'
import { media, transitions } from '@styles'
import { Container, Logo } from '@components'
import { Forms, Section, Testimonials } from '@modules'
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
    width: 30rem;
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

const NarativeVideoContainer = styled.div`
  clip-path: polygon(0 36%, 0 0, 100% 64%, 100% 100%);
  height: 53rem;
  width: 49rem;
  margin-top: 2rem;
  pointer-events: none;
  overflow: hidden;
  align-self: flex-end;

  ${media.desktop`
    width: 46rem;
  `};

  ${media.phablet`
    height: auto;
    width: 30rem;
    margin: 0 auto;
  `};
`

const NarativeVideo = styled.video`
  position: relative;
  height: 53rem;

  ${transitions.blurIn};

  ${media.tablet`
    height: 30rem;
  `};
`

const TextContainer = styled.div`
  ${transitions.fadeUp};
`

const WelcomeHeader = styled.h1`
  color: ${props => props.theme.colors.grey};
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

const HideOnMobile = styled.span`
  display: block;

  ${media.tablet`
    display: none;
  `};
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
  width: 36rem;
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
  }

  &:not(:last-child) {
    border-bottom: 1px solid #707173;
  }

  ${media.tablet`
    font-size: 1.2rem;
  `};
`

const ContactContainer = styled(Link)`
  position: relative;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  height: 6rem;
  width: 6rem;
  border-radius: 50%;

  ${media.desktop`
    margin-top: 10rem;
  `};

  @keyframes pulsingLarge {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(2.2);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 0;
    }
  }

  @keyframes pulsingMedium {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.9);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 0;
    }
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    box-shadow: inset 0 0 0 3px #fff;
    transition: all 300ms cubic-bezier(0.39, 0.575, 0.565, 1);
    animation: pulsingLarge 3s infinite;
    pointer-events: none;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    box-shadow: inset 0 0 0 2px #fff;
    transition: all 300ms cubic-bezier(0.39, 0.575, 0.565, 1);
    animation: pulsingMedium 3s infinite 0.4s;
    pointer-events: none;
  }
`

const ScrollIndicator = styled.div`
  pointer-events: none;
  position: relative;
  font-weight: 700;
  color: ${props => props.theme.colors.grey};
  height: 24rem;
  border-left: 1px solid ${props => props.theme.colors.grey};
  margin-bottom: 7rem;

  ${media.desktop`
    display: none;
  `};

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: -3px;
    height: 5px;
    width: 5px;
    border-radius: 50%;
    background: ${props => props.theme.colors.grey};
  }

  span {
    position: relative;
    background: ${props => props.theme.colors.bg};
    left: -2px;
    padding-bottom: 16px;
  }
`

const ContactContainerCircle = styled.div`
  @keyframes pulsingSmall {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.6);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 0;
    }
  }

  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  box-shadow: inset 0 0 0 1px #fff;
  transition: all 300ms cubic-bezier(0.39, 0.575, 0.565, 1);
  animation: pulsingSmall 3s infinite 0.8s;
`

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 5rem;
  color: ${props => props.theme.colors.grey};
`

const SocialIconContainer = styled.a`
  margin-left: 3rem;
  text-decoration: none;
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

const ContactUsContainer = styled(Link)`
  position: absolute;
  right: 0;
  top: 0;
  color: white;
  top: 3rem;
  color: ${props => props.theme.colors.grey};
  font-weight: 500;

  ${media.desktop`
    display: none;
  `} &::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 100%;
    transform: scale(0);
    height: 2px;
    background: ${props => props.theme.colors.grey};
    transform-origin: left;
    transition: all 400ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
    transition: all 300ms ease;
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 12px;
    height: 2px;
    background: ${props => props.theme.colors.grey};
  }

  &:hover::before {
    transform: scale(1);
  }
`

const ShadowContainer = styled.div`
  background: ${props => props.theme.colors.bg};

  &::before {
    position: fixed;
    top: -100px;
    left: 0;
    right: 0;
    width: 100%;
    height: 100px;
    content: '';
    box-shadow: 0px 40px 100px rgba(17, 18, 22, 1);

    ${media.tablet`
      top: -80px;
      height: 80px;
      box-shadow: 0px 30px 80px rgba(17, 18, 22, 1);
    `};
  }

  &::after {
    position: fixed;
    bottom: -100px;
    left: 0;
    right: 0;
    width: 100%;
    height: 100px;
    content: '';
    box-shadow: 0px -40px 100px rgba(17, 18, 22, 1);

    ${media.tablet`
      bottom: -80px
      height: 80px;
      box-shadow: 0px -30px 80px rgba(17, 18, 22, 1);
    `};
  }
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
class IndexPage extends Component {
  state = { animation: '' }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ animation: 'start' })
    })

    // Required as a workaround for Safari video
    this.video.muted = true
    this.video.controls = false
    this.video.volume = 0
    this.video.canplay = false
    this.video.play()
  }

  render() {
    const { animation, view } = this.state

    return (
      <ShadowContainer>
        <Container background="dark">
          <GridContainer>
            <LeftContainer>
              <LogoContainer to="/" animation={animation}>
                <Logo />
              </LogoContainer>
              <TextContainer animation={animation} transitionDelay={600}>
                <WelcomeHeader>Hi there</WelcomeHeader>
                <MainText>
                  Narative is a digital studio co-founded by designers,
                  engineers and strategists with decades of experience at
                  Canada’s most successful startups. We merge best practices in
                  design and growth marketing to create narratives that empowers
                  your brand and product.
                </MainText>
                <ContactText to="/contact">
                  <ArrowAnimation>
                    <HighlightText>Get in touch</HighlightText>
                    .
                    <ArrowRightIcon color="white" />
                  </ArrowAnimation>
                </ContactText>
              </TextContainer>
              <div />
            </LeftContainer>
            <RightContainer>
              <ContactUsContainer to="/contact">Contact us</ContactUsContainer>
              <NarativeVideoContainer>
                <NarativeVideo
                  controls={false}
                  poster="https://res.cloudinary.com/narative/video/upload/v1524716897/narative-wave.jpg"
                  animation={animation}
                  innerRef={video => (this.video = video)}
                  muted="muted"
                  role="img"
                  volume="0"
                  canplay="false"
                  autoPlay="autoplay"
                >
                  <source
                    src="http://res.cloudinary.com/narative/video/upload/v1524716897/narative-wave.webm"
                    type="video/webm"
                  />
                  <source
                    src="http://res.cloudinary.com/narative/video/upload/v1524716897/narative-wave.mp4"
                    type="video/mp4"
                  />
                </NarativeVideo>
              </NarativeVideoContainer>
            </RightContainer>
          </GridContainer>
        </Container>
        <Container>
          <ScrollIndicator>
            <span>Scroll down</span>
          </ScrollIndicator>
        </Container>
        <Section header="What design is to us">
          <div>
            <SectionCopy maxWidth="65rem">
              Design for us is the core of lorem ipsum dolor sit amet,
              consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam, quis
              nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat.
            </SectionCopy>
            <FunctionArrowContainer>
              <FunctionArrowWord>Function</FunctionArrowWord> <FunctionArrow />{' '}
              <FunctionArrowWord paddingLeft>Form</FunctionArrowWord>
            </FunctionArrowContainer>
          </div>
        </Section>
        <Section header="What we do">
          <FlexColumn>
            <WhatWeDoContent>
              <SectionCopy maxWidth="36rem">
                Empowering businesses through design and strategy. Narative is
                all about telling the world your story.
              </SectionCopy>
              <div style={{ color: '#fff', marginBottom: '1.6rem' }}>
                <SocialIconsFooter hideOnMobile>
                  <span>Look us up, we're cool:</span>
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
                <span>Branding ·&nbsp;</span> logotype design, guidelines,
                typefaces and marks
              </WhatWeDoListItem>
              <WhatWeDoListItem>
                <span>Marketing ·&nbsp;</span> strategy, business development,
                growth
              </WhatWeDoListItem>
              <WhatWeDoListItem>
                <span>Editorial ·&nbsp;</span> whitepapers, books and magazine
                designs
              </WhatWeDoListItem>
              <WhatWeDoListItem>
                <span> Development ·&nbsp;</span> dennis will write anything he
                wants here
              </WhatWeDoListItem>
              <WhatWeDoListItem>
                <span> Product design ·&nbsp;</span> mobile and web apps
              </WhatWeDoListItem>
              <WhatWeDoListItem>
                <span>Experience ·&nbsp;</span> optimize the usability of your
                digital product
              </WhatWeDoListItem>
              <WhatWeDoListItem>
                <span>CRM ·&nbsp;</span> email design, strategy and platform
                setup
              </WhatWeDoListItem>
              <WhatWeDoListItem>
                <span>CRO ·&nbsp;</span> conversion rate optimization and lead
                generation
              </WhatWeDoListItem>
            </WhatWeDoList>
          </FlexColumn>
        </Section>
        <Section header="Why we do it" hideOverflow>
          <div>
            <div>
              <SectionCopy maxWidth="69rem">
                <HideOnMobile>
                  Focusing on design and digital storytelling, we had the
                  pleasure to work with the world's most{' '}
                  <SectionCopyHighlight>ambitious brands</SectionCopyHighlight>{' '}
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
            <HorizontalRule />
            <Testimonials />
          </div>
        </Section>
        <Section header="Say hello">
          <FlexColumn>
            <SectionCopy maxWidth="50rem">
              We love new projects, meeting people and build amazing things.
            </SectionCopy>
            <ContactContainer to="/contact">
              <ContactContainerCircle />
              <PencilIcon />
            </ContactContainer>
          </FlexColumn>
        </Section>
        <Container>
          <Footer>
            <CopyRightContainer animation={animation} transitionDelay={800}>
              © {new Date().getFullYear()} Narative Studio Inc.
            </CopyRightContainer>
            <SocialIconsFooter>
              <span>Look us up, we're cool:</span>
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
      </ShadowContainer>
    )
  }
}

export default IndexPage
