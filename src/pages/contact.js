import React, { Component } from 'react'
import Link from 'gatsby-link'
import styled, { keyframes } from 'styled-components'
import { media, transitions } from '@styles'
import { Container, Logo } from '@components'
import { Forms } from '@modules'
import { apiCall } from '@utils'

const animateButtonLine = keyframes`
  0% {
      width: 0;
  }
  50% {
      width: 70%;
  }
  100% {
      width: 70%;
      left: 90%;
  }
`

const WhiteContainer = styled.div`
  background: #fff;
  width: 50%;
  height: 100%;
  position: absolute;
  top: 0px;
  right: 0px;
  box-shadow: rgba(0, 0, 0, 0.4) 40px 0px 40px -40px inset;
  z-index: 0;
  overflow-y: scroll;
  transform: ${props =>
    props.animation === 'start' ? 'translateX(0)' : 'translateX(100%)'};
  transition: all 600ms cubic-bezier(0.39, 0.575, 0.565, 1);
  padding-left: 110px;
  display: flex;
  align-items: center;
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
  <svg width="14" height="14" viewBox="0 0 14 14" version="1.1">
    <g id="Canvas" fill="none">
      <path
        id="x"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M 13.8599 0.842085C 13.944 0.926255 14 1.05257 14 1.16489C 14 1.27713 13.944 1.40345 13.8599 1.48762L 8.34983 7L 13.8596 12.5124C 13.944 12.5965 14 12.7229 14 12.8351C 14 12.9474 13.944 13.0737 13.8596 13.1579L 13.1584 13.8597C 13.074 13.9438 12.962 14 12.8357 14C 12.7234 14 12.5971 13.9438 12.513 13.8597L 6.99987 8.3441L 1.48677 13.8597C 1.40263 13.9438 1.27656 14 1.1643 14C 1.05204 14 0.925713 13.9438 0.84158 13.8597L 0.140136 13.1579C 0.0560031 13.0737 0 12.9474 0 12.8351C 0 12.7229 0.0560031 12.5965 0.140136 12.5124L 5.65017 7L 0.140391 1.48762C 0.0560031 1.40345 0 1.27713 0 1.16489C 0 1.05257 0.0560031 0.926255 0.140391 0.842085L 0.84158 0.140326C 0.925969 0.0561561 1.03797 0 1.1643 0C 1.27656 0 1.40289 0.0561561 1.48702 0.140326L 7.00013 5.6559L 12.5132 0.140326C 12.5974 0.0561561 12.7234 0 12.8357 0C 12.948 0 13.0743 0.0561561 13.1584 0.140326L 13.8599 0.842085Z"
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
  right: -25.3rem;
  bottom: 2.2rem;
  width: 33rem;
  height: 1px;
  background: #eff0f0;
  transform: rotate(-90deg);
`

const ScrollTextContainer = styled.div`
  position: fixed;
  left: calc(50% + 13rem + 46rem + 2rem);
  top: calc(50% - 18px / 2 + 56px);
  transform: rotate(-90deg);
  color: rgba(0, 0, 0, 0.18);
  padding: 0 1rem;
  background: #fff;
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
        <div>
          <WhiteContainer animation={animation}>
            <div style={{ position: 'relative' }}>
              <FormContainer animation={animation} delay={1200}>
                <Forms.ContactForm />
              </FormContainer>
              <ScrollContainer />
            </div>
          </WhiteContainer>
          <CloseContainer to="/">
            <Ex />
          </CloseContainer>
          <ScrollTextContainer>Scroll down</ScrollTextContainer>
        </div>
        <Container>
          <GridContainer>
            <LeftContainer>
              <LogoContainer animation={animation}>
                <Logo />
              </LogoContainer>
              <TextContainer animation={animation}>
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
              <CopyRightContainer animation={animation}>
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
