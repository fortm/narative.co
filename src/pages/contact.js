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
  background: '#fff',
  width: '50%',
  height: '100%',
  position: 'absolute',
  top: '0px',
  right: '0px',
  boxShadow: 'rgba(0, 0, 0, 0.4) 40px 0px 40px -40px inset',
  zIndex: '0',
  overflowY: 'scroll',
  transition: `all ${duration}ms cubic-bezier(0.39, 0.575, 0.565, 1)`,
  paddingLeft: '110px',
  display: 'flex',
  alignItems: 'center',
  opacity: 0,
}

const transitionStyles = {
  entering: { opacity: 0, transform: 'translateX(100%)' },
  entered: { opacity: 1, transform: 'translateX(0)' },
  exiting: { opacity: 1, transform: 'translateX(0)' },
  exited: { opacity: 0, transform: 'translateX(100%)' },
}

const SlideIn = ({ in: inProp, children }) => {
  return (
    <Transition in={inProp} timeout={duration}>
      {state => {
        return (
          <div
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
          >
            {children}
          </div>
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
  width: 46rem;
  position: relative;
  height: 58rem;
  ${transitions.fadeUp};
`

const HighlightText = styled.span`
  color: #fff;
  ${props => props.underline && `text-decoration: underline`};
`

const Ex = () => (
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
        fill="black"
      />
    </g>
  </svg>
)

const CloseContainer = styled(Link)`
  position: fixed;
  left: calc(50% + 13rem + 46rem + 6rem);
  top: 5rem;
  cursor: pointer;
`

const ScrollContainer = styled.div`
  position: absolute;
  right: -24.5rem;
  bottom: 2.2rem;
  width: 31.4rem;
  height: 1px;
  background: #eff0f0;
  transform: rotate(-90deg);

  &::after {
    content: '';
    position: absolute;
    background: #eff0f0;
    left: 0;
    top: -2px;
    height: 5px;
    width: 5px;
    borderradius: 50%;
  }
`

const ScrollTextContainer = styled.div`
  position: fixed;
  width: 10rem;
  left: calc(50% + 13rem + 46rem + 1.7rem);
  top: calc(50% - 18px / 2 + 56px);
  transform: rotate(-90deg);
  color: rgba(0, 0, 0, 0.18);
  padding: 0 1rem;
  background: #fff;
  ${transitions.fadeUp};
  transition-property: opacity;
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
        <SlideIn in={animation === 'start'}>
          <div style={{ position: 'relative' }}>
            <FormContainer animation={animation} transitionDelay={1000}>
              <Forms.ContactForm />
            </FormContainer>
            <ScrollContainer />
          </div>
        </SlideIn>
        <CloseContainer to="/">
          <Ex />
        </CloseContainer>
        <ScrollTextContainer animation={animation} transitionDelay={1000}>
          Scroll down
        </ScrollTextContainer>
        <Container>
          <GridContainer>
            <LeftContainer>
              <LogoContainer animation={animation} transitionDelay={300}>
                <Logo />
              </LogoContainer>
              <TextContainer animation={animation} transitionDelay={300}>
                <WelcomeHeader>How can we help?</WelcomeHeader>
                <MainText>
                  <HighlightText>Tell us a bit more</HighlightText> about your
                  project. The more detailed is the description, the more
                  accurate our quote will be.
                </MainText>
                <MainText>
                  <HighlightText>In a rush?</HighlightText> Leave us your phone
                  number below and our business development team will contact
                  you within 24 working hours.
                </MainText>
                <Forms.PhoneForm />
              </TextContainer>
              <CopyRightContainer animation={animation} transitionDelay={300}>
                © {new Date().getFullYear()} Narative Studio Inc.
              </CopyRightContainer>
            </LeftContainer>
            <RightContainer />
          </GridContainer>
        </Container>
      </div>
    )
  }
}

export default ContactPage
