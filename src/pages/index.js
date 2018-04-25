import React, { Component } from 'react'
import Link, { withPrefix } from 'gatsby-link'
import styled from 'styled-components'
import { media } from '../styles/media'

const PageContainer = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 3rem 4.5rem;
  background: ${props => props.theme.colors.bg};
`

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  justify-content: center;
  height: 91vh;

  ${media.large`
    grid-template-columns: repeat(2, 1fr [col-start]);
  `};
`

const LogoImage = styled.img`
  max-width: 16rem;
  margin-bottom: 1rem;

  ${props =>
    props.animation !== 'start' &&
    `
    opacity: 0;
    transform: translate3d(0, 1.4rem, 0);
  `};

  transition: opacity 700ms 200ms cubic-bezier(0.694, 0, 0.335, 1),
    color 300ms cubic-bezier(0.694, 0, 0.335, 1),
    transform 700ms 200ms cubic-bezier(0.694, 0, 0.335, 1);

  ${media.large`
    margin-bottom: 3.5rem;
    font-size: 16rem;
  `};
`
const NarativeMarkImage = styled.img`
  height: 25rem;
  position: relative;
  top: -4rem;
  opacity: ${props => (props.hasLoaded ? '1' : '0')};
  transition: all 400ms ${props => props.theme.transitions.easeIn};

  ${media.large`
    height: 53rem;
  `};
`

const WelcomeHeader = styled.h1`
  color: ${props => props.theme.colors.grey};
  font-size: 1.8rem;

  ${props =>
    props.animation !== 'start' &&
    `
    opacity: 0;
    transform: translate3d(0, 1.4rem, 0);
  `};

  transition: opacity 700ms 200ms cubic-bezier(0.694, 0, 0.335, 1),
    color 300ms cubic-bezier(0.694, 0, 0.335, 1),
    transform 700ms 200ms cubic-bezier(0.694, 0, 0.335, 1);
  transition-delay: 888ms;

  ${media.large`
    font-size: 4.8rem;
    margin-bottom: 3.5rem;
  `};
`

const ContactText = styled.p`
  font-size: 4.8rem;
  font-weight: 500;
  display: none;

  ${props =>
    props.animation !== 'start' &&
    `
    opacity: 0;
    transform: translate3d(0, 1.4rem, 0);
  `};

  color: ${props => props.theme.colors.grey};
  transition: opacity 700ms 200ms cubic-bezier(0.694, 0, 0.335, 1),
    color 300ms cubic-bezier(0.694, 0, 0.335, 1),
    transform 700ms 200ms cubic-bezier(0.694, 0, 0.335, 1);
  transition-delay: 888ms;

  ${media.large`
    display: block;
  `};
`

const ContactLink = styled.a`
  font-size: 4.8rem;
  font-weight: 500;
  color: #a0a4a9;
  text-decoration: underline;
`

const ContactLinkMobile = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 23rem;
  height: 4rem;
  font-size: 1.6rem;
  font-weight: 500;
  color: #000;
  background: #fff;
  text-align: center;

  margin: 5rem 0;

  ${media.large`
    display: none;
  `};
`

const LeftContainer = styled.div`
  width: 100%;
  text-align: center;

  ${media.large`
  text-align: left;
    max-width: 32rem;
  `};
`

const RightContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  ${media.large`
    justify-content: flex-end;
  `};
`

const CopyRightContainer = styled.div`
  font-size: 1.6rem;
  font-weight: 500;
  color: ${props => props.theme.colors.grey};
  text-align: center;

  ${media.large`
    text-align: left;
  `};
`

class IndexPage extends Component {
  state = { animation: '', image: 'loading' }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ animation: 'start' })
    }, 300)
  }

  handleImageLoaded = () => {
    this.setState({ image: 'loaded' })
  }

  handleImageErrored = () => {
    this.setState({ image: 'failed to load' })
  }

  render() {
    const { animation, image } = this.state

    return (
      <PageContainer>
        <GridContainer>
          <LeftContainer>
            <LogoImage
              animation={animation}
              src={withPrefix('/images/logo/narative-logo-white.svg')}
              alt="Narative logo white"
              onLoad={this.handleImageLoaded}
              onError={this.handleImageErrored}
            />
            <WelcomeHeader animation={animation}>
              great things are worth the wait.
            </WelcomeHeader>
            <ContactText animation={animation}>
              contact us for{' '}
              <ContactLink href="mailto:info@narative.co?Subject=👋%20Narative">
                more info
              </ContactLink>.
            </ContactText>
          </LeftContainer>
          <RightContainer>
            <NarativeMarkImage
              hasLoaded={image === 'loaded'}
              src={withPrefix('/images/mark/waves/waves.png')}
            />
            <ContactLinkMobile href="mailto:info@narative.co?Subject=👋%20Narative">
              contact us
            </ContactLinkMobile>
          </RightContainer>
        </GridContainer>
        <CopyRightContainer>
          © {new Date().getFullYear()} Studio Narative Inc.
        </CopyRightContainer>
      </PageContainer>
    )
  }
}

export default IndexPage
