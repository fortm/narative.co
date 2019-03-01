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
              <div />
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
              <ScrollIndicator />
            </ContentContainer>
            <div />
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

const Gradient = styled.div`
  background: linear-gradient(180deg, #08080b 0%, #0b0b0e 44.18%, #111216 100%);
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

const MobileContactText = styled.span`
  display: none;

  ${mediaqueries.tablet`
    opacity: 1;
    pointer-events: initial;
    margin-top: 50px;
    display: block;
  `};
`

const ContentContainer = styled.div`
  height: calc(100vh - 140px);
  min-height: 440px;

  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${mediaqueries.phablet`
    height: calc(100vh - 90px);
    padding: 0;
  `};
`
