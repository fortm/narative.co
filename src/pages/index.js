import React, { Component, Fragment } from 'react'
import { Link, graphql } from 'gatsby'
import styled, { keyframes } from 'styled-components'

import { media, transitions } from '@styles'
import { Container, Heading, Helmet, Layout, Logo } from '@components'
import { ArrowRightIcon } from '../icons/ui'

class IndexPage extends Component {
  state = { animation: '' }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ animation: 'start' })
    })
  }

  render() {
    const { animation } = this.state
    const contentful = this.props.data.allContentfulHomePage.edges[0].node

    return (
      <Layout>
        <Fragment>
          <Helmet
            title={contentful.seo.title}
            description={contentful.seo.description}
            image={contentful.seo.image.file.url}
            pathname={this.props.location.pathname}
          />
          <GradientContainer animation={animation}>
            <Container>
              <LeftContainer>
                <LogoContainer to="/">
                  <Logo onlySymbol />
                </LogoContainer>
                <TextContainer animation={animation} transitionDelay={600}>
                  <Heading.h1>
                    Narative brings decades of design, marketing and engineering
                    expertise directly to your team.
                  </Heading.h1>
                  <MainText>
                    We help you build the products you've always dreamed of —
                    and the ones you're yet to dream up.
                  </MainText>
                </TextContainer>
                <ContactText to="/contact">
                  <ArrowAnimation>
                    <HighlightText>Get in touch</HighlightText>
                    .
                    <ArrowRightIcon color="white" />
                  </ArrowAnimation>
                </ContactText>
              </LeftContainer>
              <RightContainer />
            </Container>
          </GradientContainer>
        </Fragment>
      </Layout>
    )
  }
}

export default IndexPage

export const pageQuery = graphql`
  query HomePageQuery {
    allContentfulHomePage {
      edges {
        node {
          seo {
            title
            description
            image {
              file {
                url
              }
            }
          }
          heading
          text {
            text
          }
        }
      }
    }
  }
`

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

const LogoContainer = styled(Link)`
  margin-bottom: 0;
  text-decoration: none;

  ${media.desktop`
    max-width: 10rem;
    margin-bottom: 4rem;
  `};

  ${media.tablet`
    margin-bottom: 7rem;
  `};
`

const TextContainer = styled.div`
  ${transitions.fadeUp};
  max-width: 640px;
`

const MainText = styled.p`
  font-size: 3.2rem;
  font-weight: 400;
  color: ${props => props.theme.colors.grey};
`

const ContactText = styled(Link)`
  display: flex;
  flex-direction: row;
  font-size: 1.8rem;
  font-weight: 600;
  color: ${props => props.theme.colors.grey};

  ${media.tablet`
    flex-direction: column;
  `};

  svg {
    margin-left: 1rem;
    transition: transform 300ms ${props => props.theme.transitions.in};
  }
`

const LeftContainer = styled.div`
  height: 100vh;
  padding: 100px 0;
  max-height: 600px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${media.desktop`
    padding-top: 5rem;
    justify-content: flex-start;
    width: 100%;
    height: initial;
  `};
`

const RightContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding-top: 4rem;

  ${media.desktop`
    justify-content: center;
    padding-top: 7rem;
    margin-bottom: 5rem;
  `};
`

const ArrowAnimation = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  overflow-x: hidden;
  padding: 0 3rem 0 0;
  font-size: 1.8rem;

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
    background: #fff;
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

const HighlightText = styled.span`
  color: #fff;
  ${props => props.underline && `text-decoration: underline`};
`

const GradientContainer = styled.div`
  position: relative;
  min-height: 100vh;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: linear-gradient(226.45deg, #191b21 8.28%, #111216 61.84%);
    pointer-events: none;
    transition: all 1.5s ease;
    z-index: 0;
    opacity: ${p => (p.animation ? 0 : 1)};
  }
`
