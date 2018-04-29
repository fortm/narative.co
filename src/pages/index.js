import React, { Component } from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import { media, transitions } from '@styles'
import { Container, Form, Logo } from '@components'

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

const ContactText = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  color: ${props => props.theme.colors.grey};

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

const FormHeader = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 3rem;
  color: ${props => props.theme.colors.grey};
`

const FormSection = styled.fieldset``

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
  state = { animation: '', view: 'home' }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ animation: 'start' })
    }, 300)

    // Required as a workaround for Safari video
    this.video.muted = true
    this.video.controls = false
    this.video.play()
  }

  goToView = view => {
    this.setState({ view })
  }

  render() {
    const { animation, view } = this.state

    return (
      <div
        style={{
          transition: 'all 400ms cubic-bezier(0.5, 0.0, 0.515, 1)',
          transform: view === 'home' ? 'translateX(0)' : 'translateX(-100vw)',
          minHeight: '100vh',
        }}
      >
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
                  digital-first design studio that is all about reducing the
                  noise and unnecessary details—using classical techniques with
                  state of the art technologies, we help you solve your
                  problems, grow your business and simply tell your story.
                </MainText>
                <ContactText>
                  Our new site is on its way.{' '}
                  <ContactLink href="mailto:info@narative.co?Subject=👋%20Narative">
                    Get in touch
                  </ContactLink>
                  .
                  <div onClick={() => this.goToView('contact')}>Switch</div>
                  <ArrowRight />
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
        <div
          style={{
            position: 'fixed',
            top: '0',
            right: '-200vw',
            left: '0',
            zIndex: '-1',
            background: '#111216',
          }}
        >
          <div
            style={{
              background: '#fff',
              width: '50%',
              height: '100%',
              position: 'fixed',
              top: '0',
              right: '-100vw',
              boxShadow: 'rgba(0, 0, 0, 0.4) 40px 0px 40px -40px inset',
              zIndex: '-1',
            }}
          />
          <Container>
            <GridContainer>
              <LeftContainer>
                <LogoContainer animation={animation}>
                  <Logo />
                </LogoContainer>
                <TextContainer animation={animation} transitionDelay={600}>
                  <WelcomeHeader>How can we help?</WelcomeHeader>
                  <MainText>
                    Tell us a bit more about your project. The more detailed is
                    the description, the more accurate our quote will be.
                  </MainText>
                  <MainText>
                    In a rush? Leave us your phone number below and our business
                    development team will contact you within 24 working hours.
                  </MainText>
                </TextContainer>
                <CopyRightContainer animation={animation} transitionDelay={800}>
                  © {new Date().getFullYear()} Narative Studio Inc.
                </CopyRightContainer>
                <div onClick={() => this.goToView('home')}> Back</div>
              </LeftContainer>
              <RightContainer>
                <form style={{ width: '400px', alignSelf: 'flex-end' }}>
                  <FormSection>
                    <FormHeader>About you</FormHeader>
                    <Form.Input label="Full name" />
                    <Form.Input label="Email" />
                    <Form.Select label="Size of company" />
                  </FormSection>
                  <FormSection>
                    <FormHeader>About your project</FormHeader>
                  </FormSection>
                  <Form.Radio />
                  <FormSection>
                    <FormHeader>Give us the details</FormHeader>
                    <Form.Input label="Tells us a bit more" />
                  </FormSection>
                </form>
              </RightContainer>
            </GridContainer>
          </Container>
        </div>
      </div>
    )
  }
}

export default IndexPage
