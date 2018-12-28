import React, { Component, Fragment } from 'react'
import { graphql, navigate } from 'gatsby'
import styled from 'styled-components'
import Transition from 'react-transition-group/Transition'

import { media, transitions } from '@styles'
import { Container, Layout, Heading, Helmet } from '@components'
import { ExIcon } from '../icons/ui'

import ContactForm from '../sections/contact/Contact.ContactForm'
import PhoneForm from '../sections/contact/Contact.PhoneForm'

class ContactPage extends Component {
  state = { animation: '' }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        animation: 'start',
      })
    })

    window.addEventListener('keydown', this.handleEscKeyPress)
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('keydown', this.handleEscKeyPress)
    }
  }

  exitContactPage = () => {
    this.setState({
      animation: '',
    })

    setTimeout(() => {
      navigate('/')
    }, 550)
  }

  handleEscKeyPress = ({ key }) => {
    if (key === 'Escape') {
      this.exitContactPage()
    }
  }

  render() {
    const { animation } = this.state

    return (
      <Layout>
        <Fragment>
          <Helmet
            title="Contact"
            pathname={this.props.location.pathname}
            image={this.props.data.contactMeta.childImageSharp.fixed.src}
          />
          <Container>
            <PhoneFormContainer>
              <TextContainer animation={animation} transitionDelay={300}>
                <WelcomeHeader>How can we help?</WelcomeHeader>
                <MainText>
                  <HighlightText>No time to fill a form?</HighlightText> No
                  problem, leave us your phone number and we'll call you back
                  within 24 hours.
                </MainText>
                <PhoneForm />
              </TextContainer>
            </PhoneFormContainer>
          </Container>
          <SlideIn in={animation === 'start'}>
            <FormContainer animation={animation} transitionDelay={1000}>
              <ContactForm />
            </FormContainer>
          </SlideIn>
          <CloseContainer onClick={this.exitContactPage} animation={animation}>
            <ExIcon />
          </CloseContainer>
        </Fragment>
      </Layout>
    )
  }
}

export default ContactPage

export const pageQuery = graphql`
  query ContactPageQuery {
    contactMeta: file(name: { regex: "/narative-meta/" }) {
      childImageSharp {
        fixed(width: 1200, quality: 100) {
          ...GatsbyImageSharpFixed_noBase64
        }
      }
    }
  }
`

const duration = 600

const defaultStyle = {
  opacity: 1,
  transform: 'translateY(100%)',
}

const transitionStyles = {
  entering: { transform: 'translateY(100vh)' },
  entered: { transform: 'translateY(40px)' },
  exiting: { transform: 'translateY(100vh)' },
  exited: { transform: 'translateY(100vh)' },
}

const SlideIn = ({ in: inProp, children }) => {
  return (
    <Transition in={inProp} timeout={duration}>
      {state => (
        <SlideInContainer
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
          }}
        >
          {children}
        </SlideInContainer>
      )}
    </Transition>
  )
}

const SlideInContainer = styled.div`
  width: 100%;
  height: calc(100vh - 40px);
  top: 0px;
  right: 0px;
  padding-top: 125px;
  z-index: 0;
  position: absolute;
  overflow-y: scroll;
  box-shadow: rgba(0, 0, 0, 0.4) 40px 0px 40px -40px inset;
  transition: transform 0.7s cubic-bezier(0.215, 0.61, 0.355, 1);
  will-change: transform;
  transform: translateX(100%);
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  background: #fff;

  ${media.desktop`
    width: 100%;
    position: relative;
    top: -40px;
    box-shadow: none;
    padding-top: 7rem;
    overflow: initial;

    &::before {
      content: '';
      position: absolute;
      top: 20px;
      width: 42px;
      margin: 0 auto;
      left: 0;
      right: 0;
      height: 4px;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 100px;
    }
  `};
`

const TextContainer = styled.div`
  ${transitions.fadeUp};
`

const WelcomeHeader = styled(Heading.h3)`
  color: white;
  margin-bottom: 2rem;
`

const MainText = styled.p`
  font-size: 1.8rem;
  font-weight: 400;
  color: ${p => p.theme.colors.grey};
  margin-bottom: 2rem;
`

const PhoneFormContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  display: none;

  ${media.tablet`
  display: block;
    padding: 5rem 0 1rem;
  `};
`

const FormContainer = styled.div`
  width: 100%;
  position: relative;
  margin: 0 auto;
  width: 100%;

  ${media.tablet`
    padding: 2rem;
    width: 46rem;
  `};

  ${media.desktop`
    padding: 0;
    width: 100%;
  `};
`

const HighlightText = styled.span`
  color: #fff;
  ${p => p.underline && `text-decoration: underline`};
`

const CloseContainer = styled.button`
  position: fixed;
  z-index: 1000;
  right: 0;
  left: 0;
  margin: 0 auto;
  top: 24px;
  cursor: pointer;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;

  transform: translateY(${p => (p.animation ? '0' : '-80px')});
  transition: transform 0.7s cubic-bezier(0.215, 0.61, 0.355, 1)
    ${p => (p.animation ? '0.7s' : '0s')};

  ${media.desktop`
    display: none;
  `};

  &::after {
    content: '';
    position: absolute;
    height: 40px;
    width: 40px;
    top: 0;
    border-radius: 50%;
    transform: scale(0.8);
    transition: all 200ms ${p => p.theme.transitions.in};
  }

  &:hover::after {
    background: rgba(0, 0, 0, 0.03);
    transform: scale(1);
  }
`
