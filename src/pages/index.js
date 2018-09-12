import React, { Component } from 'react'
import Link from 'gatsby-link'
import styled, { keyframes } from 'styled-components'
import { media, transitions } from '@styles'
import { Container, Logo, SocialLinks } from '@components'
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
  ${transitions.fadeUpLong};

  ${media.desktop`
  max-width: 10rem;
  margin-bottom: 4rem;
  `};
`

const NarativeVideoContainer = styled.div`
  clip-path: polygon(0 36%, 0 0, 100% 64%, 100% 100%);
  width: 424px;
  height: 458px;
  margin-top: 8rem;
  pointer-events: none;
  overflow: hidden;
  align-self: flex-end;

  ${media.desktop`
    width: 50rem;
  `};

  ${media.phablet`
    height: auto;
    width: 33rem;
    height: 36rem;
    margin: 0 auto;
  `};

  ${media.phone`
    width: 24rem;
    height: 24rem;
  `};
`

const NarativeVideo = styled.video`
  position: relative;
  height: 53rem;

  ${transitions.blurIn};

  ${media.phone`
    height: 30rem;
  `};
`

const TextContainer = styled.div`
  ${transitions.fadeUpLong};
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
  font-size: 1.8rem;
  font-weight: 400;
  color: ${props => props.theme.colors.grey};
  margin-bottom: 2rem;
`

const ContactText = styled(Link)`
  display: flex;
  flex-direction: row;
  font-size: 1.8rem;
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

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 47rem;
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

  font-size: 1.8rem;
  font-weight: 500;
  color: ${props => props.theme.colors.grey};
  ${transitions.fadeUpLong};

  ${media.desktop`
    display: none;
  `};
`

const ArrowAnimation = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  overflow-x: hidden;
  padding: 0 3rem 0 0.5rem;
  font-size: 1.8rem;

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

const HighlightText = styled.span`
  color: #fff;
  ${props => props.underline && `text-decoration: underline`};
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
  width: 40rem;
  list-style: none;

  ${media.desktop`
    width: 100%;
  `};
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

const SocialIconsFooter = styled.div`
  display: flex;
  align-items: center;

  ${props =>
    props.hideOnMobile &&
    media.desktop`
    display: none;
  `};
`

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const CareersCotnainer = styled(Link)`
  position: absolute;
  right: -4.3rem;
  color: white;
  top: 2.5rem;
  padding: 0.2rem 1.2rem;
  color: #fff;
  font-weight: 500;
  border-radius: 3px;
  display: flex;
  align-items: center;
  opacity: 0;
  animation: 0.5s forwards ease ${fadeIn};
  animation-delay: 0.8s;

  svg {
    margin-left: 1rem;
  }

  ${media.desktop`
    display: none;
  `};

  &:hover::before {
    transform: scale(1);
  }
`

const Content = styled.div`
  position: relative;
  z-index: 1;
`

const GradientContainer = styled.div`
  position: relative;
  min-height: 100vh;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgb(9, 10, 12);
    pointer-events: none;
    transition: all 1.5s ease;
    z-index: 0;
    opacity: ${p => (p.animation ? 0 : 1)};
  }
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
    const { animation } = this.state

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
                    <WelcomeHeader>We develop startups</WelcomeHeader>
                    <MainText>
                      Narative was founded by product designers, software
                      engineers and entrepreneurs with decades of experience at
                      the world's most successful startups. We merge best
                      practices in design, engineering and strategy to create
                      narratives that empower your brand.
                    </MainText>
                    <ContactText to="/contact">
                      <ArrowAnimation>
                        <HighlightText>Get in touch</HighlightText>
                        .
                        <ArrowRightIcon color="white" />
                      </ArrowAnimation>
                    </ContactText>
                  </TextContainer>
                  <CopyRightContainer
                    animation={animation}
                    transitionDelay={800}
                  >
                    <SocialLinks fill="#7a8085" />
                  </CopyRightContainer>
                </LeftContainer>
                <RightContainer>
                  <CareersCotnainer to="/careers">
                    <ArrowAnimation>
                      <HighlightText>We're hiring</HighlightText>
                      <ArrowRightIcon color="white" />
                    </ArrowAnimation>
                  </CareersCotnainer>
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
          </Content>
        </GradientContainer>
      </React.Fragment>
    )
  }
}

export default IndexPage
