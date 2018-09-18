import React, { Component, Fragment } from 'react'
import { Link, graphql } from 'gatsby'
import styled from 'styled-components'
import Transition from 'react-transition-group/Transition'

import { media, transitions } from '@styles'
import { Container, Layout, Logo, Helmet, SocialLinks } from '@components'
import { Forms } from '@modules'
import { ChevronDownIcon, ExIcon } from '../icons/ui'

class ContactPage extends Component {
  state = { animation: '' }

  componentDidMount() {
    const animated = localStorage.getItem('animated')

    setTimeout(() => {
      this.setState({
        animation: 'start',
        animated,
      })
    })

    if (!animated) {
      localStorage.setItem('animated', true)
    }
  }

  render() {
    const { animation, animated } = this.state

    return (
      <Layout>
        <Fragment>
          <Helmet
            title="Contact"
            pathname={this.props.location.pathname}
            image={this.props.data.contactMeta.childImageSharp.fixed.src}
          />
          <Container>
            <GridContainer>
              <LeftContainer>
                <CloseContainerMobile to="/" animation={animation}>
                  <ExIcon color="white" />
                </CloseContainerMobile>
                <LogoContainer to="/" animated={animated} animation={animation}>
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
                    problem, leave us your phone number and our account
                    management team will contact you within one business day.
                  </MainText>
                  <Forms.PhoneForm />
                </TextContainer>
                <CopyRightContainer animation={animation} transitionDelay={300}>
                  <SocialLinks fill="#7a8085" />
                </CopyRightContainer>

                <MobileArrowContainer
                  animation={animation}
                  transitionDelay={500}
                >
                  <ChevronDownIcon />
                </MobileArrowContainer>
              </LeftContainer>
              <RightContainer />
            </GridContainer>
          </Container>
          <SlideIn in={animation === 'start'}>
            <div
              style={{ position: 'relative', width: '100%', top: '-1.4rem' }}
            >
              <FormContainer animation={animation} transitionDelay={1000}>
                <Forms.ContactForm />
              </FormContainer>
            </div>
          </SlideIn>
          <CloseContainer to="/">
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
    box-shadow: none;
    padding: 7rem 4rem 0;
    overflow: initial;

     &::before {
        content: '';
        position: absolute;
        bottom: -250px;
        left: 0;
        height: 250px;
        width: 100%;
        z-index: 0;
        background: #fff;
      }

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
    margin: 0 auto;
    height: auto;
  `};

  ${media.phone`
    width: 100%;
  `};
`

const LogoContainer = styled(Link)`
  max-height: 2.3rem;
  max-width: 13.059rem;
  margin-bottom: 0;
  text-decoration: none;
  opacity: ${p => (p.animation ? 0.2 : 1)};
  position: relative;
  top: -1.4rem;
  transition: opacity 1s ease;

  ${media.desktop`
    max-width: 10rem;
    margin-bottom: 7rem;
    top: 0;
  `};
`

const TextContainer = styled.div`
  ${transitions.fadeUp};
`

const WelcomeHeader = styled.h1`
  color: white;
  font-size: 3.6rem;
  margin-bottom: 2rem;

  ${media.desktop`
    font-size: 1.8rem;
  `};
`

const MainText = styled.p`
  font-size: 1.8rem;
  font-weight: 400;
  color: ${props => props.theme.colors.grey};
  margin-bottom: 2rem;
`

const LeftContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 36rem;
  height: 53rem;

  ${media.desktop`
    margin: 0 auto;
    padding: 5rem 0 1rem;
    width: 100%;
    height: auto;
  `};

  ${media.phablet`
    padding: 5rem 0 1rem;
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
  font-size: 1.8rem;
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

  ${media.desktop`
    padding: 0;
    width: 100%;
  `};
`

const HighlightText = styled.span`
  color: #fff;
  ${props => props.underline && `text-decoration: underline`};
`

const CloseContainerMobile = styled(Link)`
  display: none;
  position: absolute;
  top: 0;
  right: 0rem;
  cursor: pointer;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  opacity: ${props => (props.animation ? '1' : '0')};
  transform: rotate(${props => (props.animation ? '0' : '-60deg')});
  transition: all 1s 1s ease-out;

  ${media.desktop`
    display: flex;
    top: 5rem;
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

const MobileArrowContainer = styled.div`
  display: none;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  right: 0;
  bottom: -2.2rem;
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
    bottom: -4.2rem;
  `};

  ${media.phablet`
    bottom: -2.2rem;
  `};
`
