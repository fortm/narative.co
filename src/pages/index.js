import React, { Component } from 'react'
import Link from 'gatsby-link'
import styled, { keyframes } from 'styled-components'
import { media, transitions } from '@styles'
import { Container, Logo } from '@components'
import { Forms } from '@modules'

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
  grid-template-columns: 1fr;
  align-items: center;
  justify-content: center;
  height: 91vh;
  width: 30rem;
  margin: 0 auto;

  ${media.large`
    grid-template-columns: repeat(2, 1fr [col-start]);
    width: 100%;
  `};
`

const LogoContainer = styled.div`
  max-width: 16rem;
  margin-bottom: 2rem;

  ${transitions.fadeUp};

  ${media.large`
    margin-bottom: 0;
  `};
`

const NarativeVideoContainer = styled.div`
  clip-path: polygon(0 36%, 0 0, 100% 64%, 100% 100%);
  height: auto;
  width: 30rem;
  margin-top: 2rem;
  pointer-events: none;

  ${media.large`
    height: 53rem;
    width: 49rem;
  `};
`

const NarativeVideo = styled.video`
  position: relative;
  height: 30rem;
  ${transitions.blurIn};

  ${media.large`
    height: 53rem;  
  `};
`

const TextContainer = styled.div`
  ${transitions.fadeUp};
`

const WelcomeHeader = styled.h1`
  color: ${props => props.theme.colors.grey};
  font-size: 1.8rem;
  margin-bottom: 2rem;

  ${media.large`
    font-size: 3.6rem;
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
  font-size: 1.6rem;
  font-weight: 600;
  color: ${props => props.theme.colors.grey};

  svg {
    margin-left: 1rem;
    transition: transform 300ms ${props => props.theme.transitions.in};
  }
`

const LeftContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;

  ${media.large`
    justify-content: space-between;
    max-width: 36rem;
    height: 53rem;
  `};
`

const RightContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;

  ${media.large`
    align-items: center;
    justify-content: flex-end;
  `};
`

const CopyRightContainer = styled.div`
  display: none;
  font-size: 1.6rem;
  font-weight: 500;
  color: ${props => props.theme.colors.grey};
  ${transitions.fadeUp};

  ${media.large`
    display: block;
  `};
`

const CopyRightContainerMobile = styled.div`
  font-size: 1.6rem;
  font-weight: 500;
  color: ${props => props.theme.colors.grey};
  align-self: flex-start;

  ${media.large`
    display: none;
  `};
`

const ArrowRight = () => (
  <svg width="35" height="7" viewBox="0 0 35 7" version="1.1">
    <g id="Canvas" fill="none">
      <g id="arrow-left-icon">
        <path
          id="triangle"
          d="M 3.5 0L 6.53109 5.25L 0.468911 5.25L 3.5 0Z"
          transform="matrix(0 1 -1 0 35 0)"
          fill="white"
        />
        <line
          id="Line"
          y1="-0.5"
          x2="30"
          y2="-0.5"
          transform="translate(0 4)"
          stroke="white"
        />
      </g>
    </g>
  </svg>
)

const HighlightText = styled.span`
  color: #fff;

  &:after {
    content: '';
    position: absolute;
    top: 11px;
    background: #111216;
    width: 55%;
    height: 3px;
    left: 0;
    opacity: 0;
    transition: opacity 300ms ease;
  }
`

const ArrowAnimation = styled.div`
  position: relative;
  display: inline-block;
  padding: 0 3rem 0 0.5rem;
  overflow-x: hidden;

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
    this.video.play()
  }

  render() {
    const { animation, view } = this.state

    return (
      <Container background="dark">
        <GridContainer>
          <LeftContainer>
            <LogoContainer animation={animation}>
              <Logo />
            </LogoContainer>
            <TextContainer animation={animation} transitionDelay={600}>
              <WelcomeHeader>Some things are worth the wait.</WelcomeHeader>
              <MainText>
                We’re Narative! Yes, that is with one R. Narative is a
                digital-first design studio that is all about reducing the noise
                and unnecessary details—using classical techniques with state of
                the art technologies, we help you solve your problems, grow your
                business and simply tell your story.
              </MainText>
              <ContactText to="/contact">
                Our new site is on its way.{' '}
                <ArrowAnimation>
                  <HighlightText>Get in touch</HighlightText>
                  .
                  <ArrowRight />
                </ArrowAnimation>
              </ContactText>
            </TextContainer>
            <CopyRightContainer animation={animation} transitionDelay={800}>
              © {new Date().getFullYear()} Narative Studio Inc.
            </CopyRightContainer>
          </LeftContainer>
          <RightContainer>
            <NarativeVideoContainer>
              <NarativeVideo
                controls="false"
                poster="https://res.cloudinary.com/narative/video/upload/v1524716897/narative-wave.jpg"
                animation={animation}
                innerRef={video => (this.video = video)}
              >
                <source
                  src="https://res.cloudinary.com/narative/video/upload/v1524716897/narative-wave.webm"
                  type="video/webm"
                />
                <source
                  src="https://res.cloudinary.com/narative/video/upload/v1524716897/narative-wave.mp4"
                  type="video/mp4"
                />
                <source
                  src="https://res.cloudinary.com/narative/video/upload/v1524716897/narative-wave.ogv"
                  type="video/ogg"
                />
              </NarativeVideo>
            </NarativeVideoContainer>
            <CopyRightContainerMobile>
              © {new Date().getFullYear()} Narative Studio Inc.
            </CopyRightContainerMobile>
          </RightContainer>
        </GridContainer>
      </Container>
    )
  }
}

export default IndexPage
