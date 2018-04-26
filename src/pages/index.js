import React, { Component } from 'react'
import Link, { withPrefix } from 'gatsby-link'
import styled from 'styled-components'
import { media } from '../styles/media'

const PageContainer = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 3rem 2rem;
  background: ${props => props.theme.colors.bg};
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

const LogoImage = styled.img`
  max-width: 16rem;
  margin-bottom: 2rem;

  ${props =>
    props.animation !== 'start' &&
    `
    opacity: 0;
    transform: translate3d(0, 1.4rem, 0);
  `};

  transition: opacity 700ms 200ms cubic-bezier(0.694, 0, 0.335, 1),
    transform 700ms 200ms cubic-bezier(0.694, 0, 0.335, 1);

  ${media.large`
    margin-bottom: 2rem;
    font-size: 16rem;
  `};
`

const NarativeVideoContainer = styled.div`
  clip-path: polygon(0 40%, 0 0, 100% 60%, 100% 100%);
  height: auto;
  width: 30rem;
  margin-top: 2rem;

  ${media.large`
    height: 53rem;
    width: 49rem;
  `};
`

const NarativeVideo = styled.video`
  position: relative;
  height: 30rem;
  transition: all 500ms 200ms cubic-bezier(0.694, 0, 0.335, 1);
  filter: blur(0);

  ${props =>
    props.animation !== 'start' &&
    `
    filter: blur(0.5rem);
    
  `};

  ${media.large`
    height: 53rem;  
  `};
`

const WelcomeHeader = styled.h1`
  color: ${props => props.theme.colors.grey};
  font-size: 1.8rem;
  margin-bottom: 2rem;

  ${media.large`
    font-size: 3.6rem;
  `};
`

const ContactText = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  color: ${props => props.theme.colors.grey};

  svg {
    margin-left: 1rem;
    transition: transform 300ms ${props => props.theme.transitions.in};
  }
`

const MainText = styled.p`
  font-size: 1.6rem;
  font-weight: 400;
  color: ${props => props.theme.colors.grey};
  margin-bottom: 2rem;
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
      fill-rule="evenodd"
      d="M24.697 0l-.934.881 3.698 3.494H0v1.25h27.461l-3.698 3.494.934.881L30 5z"
    />
  </svg>
)

class IndexPage extends Component {
  state = { animation: '', image: 'loading' }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ animation: 'start' })
    }, 300)

    this.mark.props.onLoad(this.handleImageLoaded())
  }

  handleImageLoaded = () => {
    setTimeout(() => {
      this.setState({ image: 'loaded' })
    }, 300)
  }

  handleImageErrored = () => {
    this.setState({ image: 'failed to load' })
  }

  render() {
    const { animation, image } = this.state

    return (
      <PageContainer>
        <GridContainer>
          <LeftContainer>
            <LogoImage
              animation={animation}
              src={withPrefix('/images/logo/narative-logo-white.svg')}
              alt="Narative logo white"
              onLoad={this.handleImageLoaded}
              ref={img => (this.mark = img)}
              onError={this.handleImageErrored}
            />
            <div>
              <WelcomeHeader>Some things are worth the wait.</WelcomeHeader>
              <MainText>
                We’re Narative! And no, we did not misspell it. Narative is a
                digital-first design studio that is all about reducing the noise
                and unnecessary details—using classical techniques with state of
                the art technologies, we help you solve your problems, grow your
                business and simply tell your story.
              </MainText>
              <ContactText>
                Our new site is on its way.{' '}
                <ContactLink href="mailto:info@narative.co?Subject=👋%20Narative">
                  Get in touch
                </ContactLink>
                .
                <ArrowRight />
              </ContactText>
            </div>
            <CopyRightContainer>
              © {new Date().getFullYear()} Studio Narative Inc.
            </CopyRightContainer>
          </LeftContainer>
          <RightContainer>
            <NarativeVideoContainer>
              <NarativeVideo
                preload="none"
                autoPlay="autoplay"
                loop="loop"
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
              © {new Date().getFullYear()} Studio Narative Inc.
            </CopyRightContainerMobile>
          </RightContainer>
        </GridContainer>
      </PageContainer>
    )
  }
}

export default IndexPage
