import React, { Component } from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import { media, transitions } from '@styles'
import { Container, Logo } from '@components'

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

const WelcomeHeader = styled.h1`
  color: ${props => props.theme.colors.grey};
  font-size: 1.8rem;
  margin-bottom: 2rem;
  ${transitions.fadeUp};

  ${media.large`
    font-size: 3.6rem;
  `};
`

const MainText = styled.p`
  font-size: 1.6rem;
  font-weight: 400;
  color: ${props => props.theme.colors.grey};
  margin-bottom: 2rem;
  ${transitions.fadeUp};
`

const ContactText = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  color: ${props => props.theme.colors.grey};
  ${transitions.fadeUp};

  svg {
    margin-left: 1rem;
    transition: transform 300ms ${props => props.theme.transitions.in};
  }
`

const BasicText = styled.p`
  font-size: 1.6rem;
  font-weight: 400;
`

const ContactLink = styled.a`
  color: #fff;
  text-decoration: underline;

  &:hover ~ svg {
    transform: translateX(0.3rem);
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
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="10"
    viewBox="0 0 30 10"
  >
    <path
      fill="#FFF"
      fillRule="evenodd"
      d="M24.697 0l-.934.881 3.698 3.494H0v1.25h27.461l-3.698 3.494.934.881L30 5z"
    />
  </svg>
)

class IndexPage extends Component {
  state = { animation: '' }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ animation: 'start' })
    }, 300)
  }

  render() {
    const { animation } = this.state

    return (
      <Container background="dark">
        <GridContainer>
          <LeftContainer>
            <LogoContainer animation={animation}>
              <Logo />
            </LogoContainer>
            <div>
              <WelcomeHeader animation={animation} transitionDelay={600}>
                Some things are worth the wait.
              </WelcomeHeader>
              <MainText animation={animation} transitionDelay={600}>
                We’re Narative! Yes, that is with one R. Narative is a
                digital-first design studio that is all about reducing the noise
                and unnecessary details—using classical techniques with state of
                the art technologies, we help you solve your problems, grow your
                business and simply tell your story.
              </MainText>
              <ContactText animation={animation} transitionDelay={600}>
                Our new site is on its way.{' '}
                <ContactLink href="mailto:info@narative.co?Subject=👋%20Narative">
                  Get in touch
                </ContactLink>
                .
                <ArrowRight />
              </ContactText>
            </div>
            <CopyRightContainer animation={animation} transitionDelay={800}>
              © {new Date().getFullYear()} Narative Studio Inc.
            </CopyRightContainer>
          </LeftContainer>
          <RightContainer>
            <NarativeVideoContainer>
              <NarativeVideo
                autoPlay="autoplay"
                controls="false"
                muted
                poster="https://res.cloudinary.com/narative/video/upload/v1524716897/narative-wave.jpg"
                animation={animation}
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
