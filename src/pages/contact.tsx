import React, { Component, Fragment } from 'react'
import { graphql, navigate } from 'gatsby'
import styled from 'styled-components'
import Transition from 'react-transition-group/Transition'

import transitions from '@styles/transitions'
import mediaqueries from '@styles/media'
import { Section, Layout, SEO } from '@components'
import { startAnimation } from '@utils'
import { ExIcon } from '../icons/ui'

import ContactForm from '../sections/contact/Contact.ContactForm'
import PhoneForm from '../sections/contact/Contact.PhoneForm'

class ContactPage extends Component<{}, { animation: string }> {
  state = { animation: '' }

  componentDidMount() {
    startAnimation(() => {
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
    const previousPath = localStorage.getItem('previousPath')
    let pathname = previousPath || '/'

    if (previousPath.includes('contact')) {
      pathname = '/'
    }

    this.setState({ animation: '' })

    // Wait for the animation out to navigate to the previous page
    setTimeout(() => {
      navigate(pathname)
    }, 550)
  }

  handleEscKeyPress = ({ key }) => {
    if (key === 'Escape') {
      this.exitContactPage()
    }
  }

  render() {
    const { animation } = this.state
    const navConfig = {
      offset: true,
      fixed: true,
      isContactPage: true,
      theme: 'light',
    }

    return (
      <Layout nav={navConfig} background="#08080b">
        <Fragment>
          <SEO
            title="Contact"
            pathname={this.props.location.pathname}
            image={this.props.data.contactMeta.childImageSharp.fixed.src}
          />
          <FixedElement>
            <Section>
              <PhoneFormContainer>
                <TextContainer animation={animation}>
                  <MainText>
                    <HighlightText>No time to fill a form?</HighlightText> No
                    problem, leave us your phone number and we'll call you back
                    within 24 hours.
                  </MainText>
                  <PhoneForm />
                </TextContainer>
              </PhoneFormContainer>
            </Section>
          </FixedElement>
          <SlideIn in={animation === 'start'}>
            <FormContainer
              animation={animation}
              transitionDelay={500}
              transitionDelayMobile={300}
            >
              <ContactForm baseDelay={800} />
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

const defaultStyle = {
  transform: 'translateY(100vh)',
}

const transitionStyles = {
  entering: { opacity: 0, transform: 'translateY(100vh)' },
  entered: { opacity: 1, transform: 'translateY(40px)' },
  exiting: { opacity: 1, transform: 'translateY(100vh)' },
  exited: { opacity: 0, transform: 'translateY(100vh)' },
}

const SlideIn = ({ in: inProp, children }) => (
  <Transition in={inProp} timeout={600}>
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

const SlideInContainer = styled.div`
  width: 100%;
  height: calc(100vh - 40px);
  top: 0px;
  right: 0px;
  padding-top: 125px;
  z-index: 0;
  position: fixed;
  overflow-y: scroll;
  transition: transform 1.4s cubic-bezier(0.19, 1, 0.22, 1);
  will-change: transform;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background: #fff;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  filter: blur(0);

  ${mediaqueries.tablet`
    width: 100%;
    position: relative;
    top: 310px;
    height: calc(100vh - 340px);
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

const MainText = styled.p`
  font-size: 1.8rem;
  font-weight: 400;
  color: ${p => p.theme.colors.grey};
  margin-bottom: 2rem;
`

const FixedElement = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  width: 100%;
`

const PhoneFormContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  display: none;

  ${mediaqueries.tablet`
    display: block;
    padding: 13rem 0 1rem;
  `};
`

const FormContainer = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto;
  width: 100%;
  background: #fff;
  z-index: 99999;
`

const HighlightText = styled.span`
  display: block;
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
    ${p => (p.animation ? '1s' : '0s')};

  ${mediaqueries.tablet`
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
