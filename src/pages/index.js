import React, { Component, Fragment } from 'react'
import { Link, graphql } from 'gatsby'
import styled, { keyframes } from 'styled-components'

import { media, transitions } from '@styles'
import { Container, Heading, Helmet, Layout } from '@components'
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
          {/* <GradientContainer animation={animation}> */}
          <Container>
            <LeftContainer>
              <div style={{ top: '-60px' }} />
              <TextContainer animation={animation}>
                <Heading.h1>
                  Narative brings decades of design, marketing and engineering
                  expertise directly to your team.
                </Heading.h1>
                <MainText>
                  We help you build the products you've always dreamed of — and
                  the ones you're yet to dream up.
                </MainText>
              </TextContainer>
              <ContactText
                animation={animation}
                to="/contact"
                transitionDelay={100}
              >
                <ArrowAnimation>
                  <HighlightText>Get in touch</HighlightText>
                  .
                  <ArrowRightIcon color="white" />
                </ArrowAnimation>
              </ContactText>
            </LeftContainer>
            <div />
          </Container>
          {/* </GradientContainer> */}
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

const TextContainer = styled.div`
  max-width: 640px;
  ${transitions.fadeUp};
`

const MainText = styled.p`
  font-size: 3.2rem;
  font-weight: 400;
  color: ${props => props.theme.colors.grey};

  ${media.phablet`
    font-size: 2.2rem;
  `};
`

const ContactText = styled(Link)`
  display: flex;
  flex-direction: row;
  font-size: 1.8rem;
  font-weight: 600;
  color: ${props => props.theme.colors.grey};
  ${transitions.fadeUp};

  ${media.tablet`
    flex-direction: column;
  `};

  svg {
    margin-left: 1rem;
    transition: transform 300ms ${props => props.theme.transitions.in};
  }
`

const LeftContainer = styled.div`
  height: calc(100vh - 130px);
  min-height: 440px;
  max-height: 720px;
  padding: 0 0 100px;

  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${media.phablet`
    min-height: 400px;
    max-height: 540px;
    padding: 150px 0 100px;
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

// const GradientContainer = styled.div`
//   position: relative;
//   min-height: 100vh;

//   &::before {
//     content: '';
//     position: absolute;
//     top: 0;
//     left: 0;
//     height: 100%;
//     width: 100%;
//     background: linear-gradient(226.45deg, #191b21 8.28%, #111216 61.84%);
//     pointer-events: none;
//     transition: all 1.5s ease;
//     z-index: 0;
//     opacity: ${p => (p.animation ? 0 : 1)};
//   }
// `
