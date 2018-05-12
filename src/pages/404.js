import React, { Component } from 'react'
import Link from 'gatsby-link'
import styled, { keyframes, ThemeProvider } from 'styled-components'
import { media, transitions, theme } from '@styles'
import { Container, Logo } from '@components'
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
  align-items: center;
  justify-content: center;
  margin: 0 auto;

  height: 88vh;
  grid-template-columns: repeat(2, 1fr [col-start]);
  width: 100%;

  ${media.desktop`
    grid-template-columns: 1fr;
    width: 30rem;
  `};
`

const LogoContainer = styled.div`
  max-width: 16rem;
  margin-bottom: 0;

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
  height: auto;
  width: 30rem;
  `};
`

const NarativeVideo = styled.video`
  position: relative;
  height: 53rem;
  ${transitions.blurIn};

  ${media.desktop`
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

const ContactActionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 40rem;
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
  color: #000;

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
const LeftContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 36rem;
  height: 53rem;

  ${media.desktop`
    justify-content: flex-start;
    flex-direction: column;
    width: 100%;
  `};
`

const RightContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 53rem;

  ${media.desktop`
    justify-content: center;
    flex-direction: column;
    padding-top: 4rem;
  `};
`

const NotFoudImage = styled.img`
  width: 800px;
  position: fixed;
  right: 0;
`

const ArrowAnimation = styled.div`
  position: relative;
  display: inline-block;
  padding: 0 3rem 0 0.5rem;
  overflow-x: hidden;

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
    background: #000;
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

const ContactUsContainer = styled(Link)`
  position: absolute;
  right: 0;
  top: 0;
  color: white;
  color: ${props => props.theme.colors.grey};
  font-weight: 500;

  &::before {
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

class NotFound extends Component {
  state = { animation: '' }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ animation: 'start' })
    })
  }

  render() {
    const { animation, view } = this.state

    return (
      <ThemeProvider theme={theme}>
        <div
          style={{
            background: '#fff',
            minHeight: '100vh',
            width: '100vw',
          }}
        >
          <Container background="light">
            <GridContainer>
              <LeftContainer>
                <LogoContainer animation={animation}>
                  <Logo color="dark" />
                </LogoContainer>
                <TextContainer animation={animation} transitionDelay={600}>
                  <WelcomeHeader>Oh, nooo!</WelcomeHeader>
                  <MainText>
                    This page is like those old school "404" when something goes
                    wrong, but dont worry, we're still live and well.
                  </MainText>
                  <MainText>
                    If you have any questions or a billion dollar idea for a
                    project, just contact us. We love ideas.
                  </MainText>
                  <ContactActionsContainer>
                    <ContactButton>Contact us</ContactButton>
                    <ContactText to="/">
                      <ArrowAnimation>
                        Go back home .
                        <ArrowRightIcon />
                      </ArrowAnimation>
                    </ContactText>
                  </ContactActionsContainer>
                </TextContainer>
                <CopyRightContainer animation={animation} transitionDelay={800}>
                  © {new Date().getFullYear()} Narative Studio Inc.
                </CopyRightContainer>
                <div />
              </LeftContainer>
              <RightContainer>
                <ContactUsContainer to="/contact">
                  Contact us
                </ContactUsContainer>
                <NotFoudImage
                  src="http://res.cloudinary.com/narative/image/upload/v1526049042/4042x.jpg"
                  alt="404, Page Not Found"
                />
              </RightContainer>
            </GridContainer>
          </Container>
        </div>
      </ThemeProvider>
    )
  }
}

export default NotFound
