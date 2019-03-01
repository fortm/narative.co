import React, { Component } from 'react'
import styled from 'styled-components'
import Transition from 'react-transition-group/Transition'

import mediaqueries from '@styles/media'
import { scrollable } from '@utils'
import { ExIcon } from '../../icons/ui'

import ContactForm from './Contact.ContactForm'

class ContactSlideIn extends Component<{ animation?: string }> {
  componentDidMount() {
    window.addEventListener('keydown', this.handleEscKeyPress)
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('keydown', this.handleEscKeyPress)
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.animation !== prevProps.animation) {
      if (this.props.animation === 'start') {
        scrollable('disable')
      } else {
        scrollable('enable')
      }
    }
  }

  exitContactSlideIn = () => {
    this.props.onClose()
  }

  handleEscKeyPress = ({ key }) => {
    if (key === 'Escape') {
      this.exitContactSlideIn()
    }
  }

  render() {
    const { animation } = this.props

    return (
      <>
        <SlideIn in={animation === 'start'}>
          <FormContainer animation={animation}>
            <ContactForm />
          </FormContainer>
        </SlideIn>
        <CloseContainer onClick={this.props.onClose} animation={animation}>
          <ExIcon />
        </CloseContainer>
      </>
    )
  }
}

export default ContactSlideIn

const defaultStyle = {
  transform: 'translateY(100vh)',
}

const transitionStyles = {
  entering: { opacity: 0, transform: 'translateY(100vh)' },
  entered: { opacity: 1, transform: 'translateY(40px)' },
  exiting: { opacity: 1, transform: 'translateY(40px)' },
  exited: { opacity: 1, transform: 'translateY(100vh)' },
}

const SlideIn = ({ in: inProp, children }) => (
  <Transition in={inProp} timeout={0}>
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
  z-index: 9;
  position: fixed;
  overflow-y: scroll;
  transition: transform 1s cubic-bezier(0.19, 1, 0.22, 1);
  will-change: transform;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background: #fff;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  filter: blur(0);

  ${mediaqueries.tablet`
    display: none;
    opacity: 0;
    visibility: hidden;
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

  opacity: ${p => (p.animation ? 1 : 0)};
  transform: translateY(${p => (p.animation ? '0' : '-120px')});
  transition: transform 0.7s cubic-bezier(0.215, 0.61, 0.355, 1)
      ${p => (p.animation ? '0.2s' : '0s')},
    opacity 0s linear ${p => (p.animation ? '0s' : '1s')};

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
