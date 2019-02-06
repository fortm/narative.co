import React, { Component, Fragment } from 'react'
import { Link, graphql, navigate } from 'gatsby'
import styled from 'styled-components'

import { media, transitions } from '@styles'
import { ButtonArrow, Section, Heading, Helmet, Layout } from '@components'
import { startAnimation } from '@utils'

class IndexPage extends Component {
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

    return (
      <Layout>
        <Fragment>
          <Helmet
            title={contentful.seo.title}
            description={contentful.seo.description}
            image={contentful.seo.image.file.url}
            pathname={this.props.location.pathname}
          />
          <Section>
            <ContentContainer>
              <div style={{ top: '-60px' }} />
              <TextContainer animation={animation}>
                <Heading.h1>{contentful.heading}</Heading.h1>
                <MainText>{contentful.text.text}</MainText>

                {/* With flexbox we need to have a mobile and desktop element
                in the DOM so we can have the proper design in palce. This is
                the Mobile only Contact button*/}
                <MobileContactText
                  to="/contact"
                  onClick={event => this.navigateOut(event, '/contact')}
                  animation={animation}
                >
                  <ButtonArrow text="Get in touch" />
                </MobileContactText>
              </TextContainer>

              {/* And this is the Desktop only Contact button */}
              <ContactText
                to="/contact"
                onClick={event => this.navigateOut(event, '/contact')}
                animation={animation}
              >
                <ButtonArrow text="Get in touch" />
              </ContactText>
            </ContentContainer>
            <div />
          </Section>
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

const TextContainer = styled.div`
  max-width: 620px;
  ${transitions.fadeUp};
`

const MainText = styled.p`
  font-size: 3.2rem;
  font-weight: 400;
  color: ${p => p.theme.colors.grey};
  line-height: 1.3;

  ${media.phablet`
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

  ${media.tablet`
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

  ${media.tablet`
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

  ${media.phablet`
    height: calc(100vh - 160px);
    padding: 0;
  `};
`
