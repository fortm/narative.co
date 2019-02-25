import React, { Component, Fragment } from 'react'
import { Link, graphql, navigate } from 'gatsby'
import styled from 'styled-components'

import transitions from '@styles/transitions'
import mediaqueries from '@styles/media'
import { ButtonArrow, Section, Heading, SEO, Layout } from '@components'
import { startAnimation } from '@utils'

import HomeAbout from '../sections/home/Home.About'
import HomeCallToAction from '../sections/home/Home.CallToAction'
import HomeTestimonial from '../sections/home/Home.Testimonial'
import HomeValues from '../sections/home/Home.Values'
import { backgrounds } from 'polished'

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
    const background = 'linear-gradient(180deg, #08080B 0%, #111216 44.18%);'

    return (
      <Layout navOffset background={background}>
        <Fragment>
          <SEO
            title={contentful.seo.title}
            description={contentful.seo.description}
            image={contentful.seo.image.file.url}
            pathname={this.props.location.pathname}
          />
          <Section>
            <ContentContainer>
              <div style={{ top: '-60px' }} />
              <TextContainer animation={animation}>
                <Heading.h1>
                  <em>Narative</em> builds brands, websites and products for
                  growth-minded companies.
                </Heading.h1>
                <MainText>
                  We're a team with senior startup experience here to help your
                  business take the next step.
                </MainText>

                {/* With flexbox we need to have a mobile and desktop element
                in the DOM so we can have the proper design in palce. This is
                the Mobile only Contact button*/}
                <ContactText
                  to="/contact"
                  onClick={event => this.navigateOut(event, '/contact')}
                  animation={animation}
                >
                  <ButtonArrow text="Get in touch" />
                </ContactText>
              </TextContainer>

              <div />
            </ContentContainer>
            <div />
          </Section>
          <HomeAbout />
          <HomeValues />
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

  ${mediaqueries.tablet`
    opacity: 0;
    pointer-events: none;
    flex-direction: column;
  `};

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
  padding: 0 0 100px;

  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${mediaqueries.phablet`
    height: calc(100vh - 90px);
    padding: 0;
  `};
`
