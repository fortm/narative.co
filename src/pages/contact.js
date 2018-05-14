import React, { Component } from 'react'
import Link from 'gatsby-link'
import styled, { keyframes } from 'styled-components'
import { media, transitions } from '@styles'
import { Container, Logo } from '@components'
import { Forms } from '@modules'
import { apiCall } from '@utils'

import Transition from 'react-transition-group/Transition'

const duration = 600

const defaultStyle = {
  opacity: 0,
}

const transitionStyles = {
  entering: { opacity: 0, transform: 'translateX(100%)' },
  entered: { opacity: 1, transform: 'translateX(0)' },
  exiting: { opacity: 1, transform: 'translateX(0)' },
  exited: { opacity: 0, transform: 'translateX(100%)' },
}

const SlideInContainer = styled.div`
  background: #fff;
  width: 100%;
  height: 100%;
  position: relative;
  top: 0px;
  right: 0px;
  z-index: 0;
  display: flex;
  align-items: center;
  transform: translateX(0);
  transition: opacity 600ms cubic-bezier(0.39, 0.575, 0.565, 1);
  padding: 7rem 4rem 0;

  ${media.large`
    width: 50%;
    position: absolute;
    padding-left: 110px;
    overflow-y: scroll;
    box-shadow: rgba(0, 0, 0, 0.4) 40px 0px 40px -40px inset;
    transition: all 600ms cubic-bezier(0.39, 0.575, 0.565, 1);
    transform: translateX(100%);
    opacity: 0;
    padding: 0;
  `};
`

const SlideIn = ({ in: inProp, children }) => {
  return (
    <Transition in={inProp} timeout={duration}>
      {state => {
        return (
          <SlideInContainer
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
          >
            {children}
          </SlideInContainer>
        )
      }}
    </Transition>
  )
}

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  justify-content: center;
  width: 100%;

  ${media.medium`
    width: 30rem;
    margin: 0 auto;
  `};

  ${media.large`
    grid-template-columns: repeat(2, 1fr [col-start]);
    width: 100%;
    height: 91vh;
  `};
`

const LogoContainer = styled(Link)`
  max-width: 10rem;
  margin-bottom: 4rem;
  text-decoration: none;
  ${transitions.fadeUp};

  ${media.large`
    max-width: 16rem;
    max-height: 2.3rem;
    margin-bottom: 2rem;
    margin-bottom: 0;
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
  position: relative;
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

const FormContainer = styled.div`
  width: 100%;
  position: relative;
  height: 58rem;
  margin: 0 auto;
  width: 100%;
  ${transitions.fadeUp};

  ${media.medium`
    padding: 2rem;
    width: 46rem;
  `};

  ${media.xlarge`
    padding: 0;
  `};
`

const HighlightText = styled.span`
  color: #fff;
  ${props => props.underline && `text-decoration: underline`};
`

const Ex = ({ fill = 'black' }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" version="1.1">
    <g id="Canvas" fill="none">
      <path
        id="Stroke 1"
        d="M 0 0L 24 0L 24 24L 0 24L 0 0Z"
        strokeWidth="0"
        stroke="black"
        strokeOpacity="0.01"
      />
      <path
        id="Shape"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M 14 1.4L 12.6 0L 7 5.6L 1.4 0L 0 1.4L 5.6 7L 0 12.6L 1.4 14L 7 8.4L 12.6 14L 14 12.6L 8.4 7L 14 1.4Z"
        transform="translate(5 5)"
        fill={fill}
      />
    </g>
  </svg>
)

const ChevronDown = () => (
  <svg width="24" height="25" viewBox="0 0 24 25" version="1.1">
    <g id="Canvas" fill="none">
      <g id="chevron-down-icon">
        <path
          id="Stroke 1"
          d="M 0 0L 24 0L 24 24L 0 24L 0 0Z"
          transform="translate(0 1)"
          stroke="black"
          stroke-opacity="0.01"
          stroke-width="0"
        />
        <path
          id="&#239;&#132;&#135;"
          d="M 12.0034 0.998282C 12.0034 0.902062 11.9553 0.793814 11.8832 0.72165L 11.2818 0.120276C 11.2096 0.0481109 11.1014 0 11.0052 0C 10.9089 0 10.8007 0.0481109 10.7285 0.120276L 6.00172 4.84708L 1.27491 0.120276C 1.20275 0.0481109 1.0945 0 0.998282 0C 0.890034 0 0.793814 0.0481109 0.721649 0.120276L 0.120275 0.72165C 0.0481099 0.793814 0 0.902062 0 0.998282C 0 1.0945 0.0481099 1.20275 0.120275 1.27491L 5.72509 6.87973C 5.79725 6.95189 5.9055 7 6.00172 7C 6.09794 7 6.20619 6.95189 6.27835 6.87973L 11.8832 1.27491C 11.9553 1.20275 12.0034 1.0945 12.0034 0.998282Z"
          transform="translate(6 9)"
          fill="black"
        />
      </g>
    </g>
  </svg>
)

const CloseContainerMobile = styled(Link)`
  position: absolute;
  top: 0rem;
  right: 0rem;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  ${media.large`
    display: none;
  `};
`

const CloseContainer = styled(Link)`
  display: none;
  align-items: center;
  justify-content: center;
  position: fixed;
  right: 3.5rem;
  top: 5rem;
  cursor: pointer;
  border-radius: 50%;
  height: 3.4rem;
  width: 3.4rem;

  ${media.large`
    display: flex;
  `};

  &::after {
    content: '';
    position: absolute;
    height: 3.4rem;
    width: 3.4rem;
    top: 0;
    border-radius: 50%;
    transform: scale(0.8);
    transition: all 200ms ${props => props.theme.transitions.in};
  }
  &:hover::after {
    background: rgba(0, 0, 0, 0.06);
    transform: scale(1);
  }
  &:active::after {
    background: rgba(0, 0, 0, 0.12);
    transform: scale(1.2);
  }
`

const MobileArrowContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  right: 0;
  bottom: -3.2rem;
  height: 4.4rem;
  width: 4.4rem;
  margin: 0 auto;
  border: 1.33333e-11px solid rgba(0, 0, 0, 0.00784314);
  box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.146711);
  background: #fff;
  z-index: 1;
  border-radius: 50%;
  ${transitions.fadeUp};

  ${media.large`
    display: none;;
  `};
`

class ContactPage extends Component {
  state = { animation: '' }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ animation: 'start' })
    })
  }

  render() {
    const { animation } = this.state

    return (
      <div>
        <Container>
          <GridContainer>
            <LeftContainer>
              <CloseContainerMobile to="/" animation={animation}>
                <Ex fill="white" />
              </CloseContainerMobile>
              <LogoContainer to="/" animation={animation} transitionDelay={300}>
                <Logo />
              </LogoContainer>
              <TextContainer animation={animation} transitionDelay={300}>
                <WelcomeHeader>How can we help?</WelcomeHeader>
                <MainText>
                  <HighlightText>Tell us a bit</HighlightText> about your
                  project or idea.
                </MainText>
                <MainText>
                  <HighlightText>No time to fill a form?</HighlightText> No
                  problem, leave us your phone number and our account management
                  team will contact you within one business day.
                </MainText>
                <Forms.PhoneForm />
              </TextContainer>
              <CopyRightContainer transitionDelay={300}>
                © {new Date().getFullYear()} Narative Studio Inc.
              </CopyRightContainer>

              <MobileArrowContainer animation={animation} transitionDelay={500}>
                <ChevronDown />
              </MobileArrowContainer>
            </LeftContainer>
            <RightContainer />
          </GridContainer>
        </Container>
        <SlideIn in={animation === 'start'}>
          <div style={{ position: 'relative', width: '100%' }}>
            <FormContainer animation={animation} transitionDelay={1000}>
              <Forms.ContactForm />
            </FormContainer>
          </div>
        </SlideIn>
        <CloseContainer to="/">
          <Ex />
        </CloseContainer>
      </div>
    )
  }
}

export default ContactPage
