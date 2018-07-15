import React, { Component } from 'react'
import Link from 'gatsby-link'
import styled, { keyframes } from 'styled-components'
import { media, transitions } from '@styles'
import { Container, Logo, Video } from '@components'
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
  width: 30rem;
  margin: 0 auto;

  ${media.large`
    height: 91vh;
    grid-template-columns: repeat(2, 1fr [col-start]);
    width: 100%;
  `};
`

const LogoContainer = styled(Link)`
  max-width: 10rem;
  margin-bottom: 4rem;
  text-decoration: none;
  ${transitions.fadeUp};

  ${media.large`
    max-height: 2.3rem;
    max-width: 13.059rem;
    margin-bottom: 0;
  `};
`

const NarativeVideoClip = styled.div`
  clip-path: polygon(0 36%, 0 0, 100% 64%, 100% 100%);
  height: auto;
  width: 30rem;
  margin-top: 2rem;
  pointer-events: none;
  overflow: hidden;

  ${media.large`
    height: 53rem;
    width: 49rem;
  `};
`

const NarativeVideoContainer = styled.div`
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
  flex-direction: column;
  font-size: 1.6rem;
  font-weight: 600;
  color: ${props => props.theme.colors.grey};

  ${media.medium`
    flex-direction: row;
  `};

  svg {
    margin-left: 1rem;
    transition: transform 300ms ${props => props.theme.transitions.in};
  }
`

const HideOnMobile = styled.span`
  display: none;

  ${media.medium`
    display: block;
  `};
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
  padding-top: 4rem;

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
  align-self: center;
  margin-top: 2rem;

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
`

const ArrowAnimation = styled.div`
  position: relative;
  display: inline-block;
  padding: 0rem 3rem 0 0rem;
  overflow-x: hidden;

  ${media.medium`
    padding: 0 3rem 0 0.5rem;   
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

    ${media.medium`
      animation: ${animateButtonLine} 1s cubic-bezier(0.77, 0, 0.175, 1) forwards;
    `};
  }
`

class IndexPage extends Component {
  state = { animation: '' }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ animation: 'start' })
    })
  }

  render() {
    const { animation, view } = this.state

    return (
      <Container background="dark">
        <GridContainer>
          <LeftContainer>
            <LogoContainer to="/" animation={animation}>
              <Logo />
            </LogoContainer>
            <TextContainer animation={animation} transitionDelay={600}>
              <WelcomeHeader>We develop startups</WelcomeHeader>
              <MainText>
                Narative is a digital studio co-founded by designers, engineers
                and strategists with decades of experience at Canada’s most
                successful startups. We merge best practices in design and
                growth marketing to create narratives that empowers your brand.
              </MainText>
              <ContactText to="/contact">
                <HideOnMobile>Our new site is on its way. </HideOnMobile>
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
            <NarativeVideoClip>
              <NarativeVideoContainer animation={animation}>
                <Video
                  poster="https://res.cloudinary.com/narative/video/upload/v1524716897/narative-wave.jpg"
                  webm="https://res.cloudinary.com/narative/video/upload/v1524716897/narative-wave.webm"
                  mp4="https://res.cloudinary.com/narative/video/upload/v1524716897/narative-wave.mp4"
                  label="Narative water mark"
                />
              </NarativeVideoContainer>
            </NarativeVideoClip>
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
