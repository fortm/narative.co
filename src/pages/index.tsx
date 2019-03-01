import React, { Component, Fragment } from 'react'
import { Link, graphql, navigate } from 'gatsby'
import styled from 'styled-components'

import { ButtonArrow, Section, Heading, SEO, Layout } from '@components'
import ScrollIndicator from '@components/ScrollIndicator'

import HomeAbout from '../sections/home/Home.About'
import HomeCallToAction from '../sections/home/Home.CallToAction'
import HomeTestimonial from '../sections/home/Home.Testimonial'
import HomeServices from '../sections/home/Home.Services'

import transitions from '@styles/transitions'
import { startAnimation } from '@utils'
import mediaqueries from '@styles/media'

class IndexPage extends Component<{}, { animation: string }> {
  state = { animation: '' }

  componentDidMount() {
    startAnimation(() => {
      this.setState({ animation: 'start' })
    })
  }

  navigateOut = (event, path) => {
    event.preventDefault()
    this.setState({ animation: '' })

    setTimeout(() => {
      navigate(path)
    }, 350)
  }

  render() {
    const { animation } = this.state
    const contentful = this.props.data.allContentfulHomePage.edges[0].node
    const background =
      'linear-gradient(180deg,#08080b 0%,#0b0b0e 5%,#111216 11%)'

    const navConfig = {
      offset: true,
      fixed: false,
      theme: 'light',
    }

    return (
      <Layout nav={navConfig} background={background}>
        <Fragment>
          <SEO
            title={contentful.seo.title}
            description={contentful.seo.description}
            image={contentful.seo.image.file.url}
            pathname={this.props.location.pathname}
          />
          <Section>
            <ContentContainer>
              <TextContainer animation={animation}>
                <Heading.h1>
                  <em>Narative</em> builds brands, websites and products for
                  growth-minded companies.
                </Heading.h1>
                <MainText>
                  We're a team with senior startup experience here to help your
                  business take the next step.
                </MainText>
                <ContactText
                  to="/contact"
                  onClick={event => this.navigateOut(event, '/contact')}
                  animation={animation}
                >
                  <ButtonArrow text="Get in touch" />
                </ContactText>
              </TextContainer>
              {/* <Main>
                <div />
                <div />
                <div />
              </Main> */}
            </ContentContainer>
            <ScrollIndicator />
          </Section>
          <HomeAbout />
          <HomeServices />
          <HomeTestimonial />
          <HomeCallToAction />
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
          heading {
            childMarkdownRemark {
              html
            }
          }
          text {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  }
`

const TextContainer = styled.div`
  max-width: 570px;
  ${transitions.fadeUp};

  ${mediaqueries.phablet`
    position: relative;
    top: -50px;
  `}
`

const MainText = styled.p`
  font-size: 3.2rem;
  font-weight: 400;
  color: ${p => p.theme.colors.grey};
  line-height: 1.3;
  margin-bottom: 50px;

  ${mediaqueries.phablet`
    font-size: 2.2rem;
  `};
`

const ContactText = styled(Link)`
  display: flex;
  flex-direction: row;
  font-size: 1.8rem;
  font-weight: 600;
  color: ${p => p.theme.colors.grey};
  ${transitions.fadeUp};

  svg {
    margin-left: 1rem;
    transition: transform 300ms ${p => p.theme.transitions.in};
  }
`

const ContentContainer = styled.div`
  height: calc(100vh - 230px);
  min-height: 440px;

  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${mediaqueries.phablet`
    height: calc(100vh - 180px);
    padding: 0;
  `};
`

const Main = styled.main`
  :root {
    --deg: 1;
    --x: -50%;
    --y: -50%;
  }
  position: relative;
  right: 17%;
  max-height: 425px;

  & > div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(var(--x, -50%), var(--y, -50%)) rotate(0deg);
    font-size: 15vmin;
    width: 3em;
    height: 3em;
    border-radius: 100% 95% 95% 105%;
    animation: wobble calc(150ms * var(--t)) linear infinite;
    transform-origin: -var(--y) -var(--x);
    box-shadow: 0.1em 0.1em 0.1em 0.1em #788ec1 inset, 0 0 0.15em 0 #444563;
    display: flex;
    align-items: center;
    justify-content: center;

    &::after {
      font-size: 1em;
      white-space: nowrap;
    }
    &:nth-child(12) {
      --x: -47%;
      --y: -52%;
      --t: 58;
    }
    &:nth-child(3) {
      --x: -45%;
      --y: -50%;
      --t: 46;
    }
    &:nth-child(4) {
      --x: -53%;
      --y: -45%;
      --t: 72;
    }
    &:nth-child(5) {
      --x: -55%;
      --y: -45%;
      --t: 62;
    }
  }

  @keyframes wobble {
    to {
      transform: translate(var(--x), var(--y)) rotate(360deg);
    }
  }
`
