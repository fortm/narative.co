import React, { Component } from 'react'
import Link from 'gatsby-link'
import styled, { keyframes } from 'styled-components'
import { media, transitions } from '@styles'
import { Container, Logo } from '@components'
import { Forms } from '@modules'
import { apiCall } from '@utils'
import { ChevronDownIcon, ExIcon } from '../icons/ui'
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
  display: flex;
  align-items: center;
  width: 50%;
  height: 100%;
  top: 0px;
  right: 0px;
  opacity: 0;
  padding: 0;
  z-index: 0;
  position: absolute;
  padding-left: 110px;
  overflow-y: scroll;
  box-shadow: rgba(0, 0, 0, 0.4) 40px 0px 40px -40px inset;
  transition: all 600ms cubic-bezier(0.39, 0.575, 0.565, 1);
  transform: translateX(100%);

  background: #fff;

  ${media.desktop`
    width: 100%;
    position: relative;
    transform: translateX(0);
    transition: opacity 600ms cubic-bezier(0.39, 0.575, 0.565, 1);
    padding: 7rem 4rem 0;
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
  grid-template-columns: repeat(2, 1fr [col-start]);
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 91vh;

  ${media.desktop`
    grid-template-columns: 1fr;
    width: 30rem;
    margin: 0 auto;
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
  justify-content: space-between;
  flex-direction: column;
  max-width: 36rem;
  height: 53rem;

  ${media.desktop`
    justify-content: flex-start;
    width: 100%;
  `};
`

const RightContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;

  ${media.desktop`
    justify-content: center;
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

const FormContainer = styled.div`
  width: 100%;
  position: relative;
  height: 58rem;
  margin: 0 auto;
  width: 100%;
  ${transitions.fadeUp};

  ${media.tablet`
    padding: 2rem;
    width: 46rem;
  `};

  ${media.hdpi`
    padding: 0;
  `};
`

const HighlightText = styled.span`
  color: #fff;
  ${props => props.underline && `text-decoration: underline`};
`

const CloseContainerMobile = styled(Link)`
  display: none;
  position: absolute;
  top: 0rem;
  right: 0rem;
  cursor: pointer;
  border-radius: 50%;
  align-items: center;
  justify-content: center;

  ${media.desktop`
    display: flex;
  `};
`

const CloseContainer = styled(Link)`
  position: fixed;
  right: 3.5rem;
  top: 5rem;
  cursor: pointer;
  border-radius: 50%;
  height: 3.4rem;
  width: 3.4rem;
  display: flex;
  align-items: center;
  justify-content: center;

  ${media.desktop`
    display: none;
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

const ScrollContainer = styled.div`
  display: block;
  position: absolute;
  right: -10.5rem;
  bottom: 19.5rem;
  width: 31.4rem;
  height: 1px;
  background: #eff0f0;
  transform: rotate(-90deg);
  ${transitions.fadeUp};
  transition-property: opacity;

  ${media.hdpi`
    display: none;
  `};

  &::after {
    content: '';
    position: absolute;
    background: #eff0f0;
    left: 0;
    top: -2px;
    height: 5px;
    width: 5px;
    border-radius: 50%;
  }
`

const ScrollTextContainer = styled.div`
  display: block;
  position: fixed;
  width: 10rem;
  right: 0.4rem;
  top: calc(50% - 18px / 2 + 56px);
  transform: rotate(-90deg);
  color: rgba(0, 0, 0, 0.18);
  padding: 0 1rem;
  background: #fff;
  ${transitions.fadeUp};
  transition-property: opacity;

  ${media.hdpi`
    display: none;
  `};
`

const MobileArrowContainer = styled.div`
  display: none;
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

  ${media.desktop`
    display: flex;
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
                <ExIcon color="white" />
              </CloseContainerMobile>
              <LogoContainer animation={animation} transitionDelay={300}>
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
                <ChevronDownIcon />
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
          <ExIcon />
        </CloseContainer>
        <ScrollContainer animation={animation} transitionDelay={1000} />
        <ScrollTextContainer animation={animation} transitionDelay={1000}>
          Scroll down
        </ScrollTextContainer>
      </div>
    )
  }
}

export default ContactPage
