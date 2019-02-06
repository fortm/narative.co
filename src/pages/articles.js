import React, { Component, Fragment } from 'react'
import { Link, graphql, navigate } from 'gatsby'
import styled from 'styled-components'

import { media } from '@styles'
import { Section, Helmet, Layout } from '@components'
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
    const articles = this.props.data.allContentfulArticle.edges

    return (
      <Layout navOffset>
        <Fragment>
          <Helmet
            title={contentful.seo.title}
            description={contentful.seo.description}
            image={contentful.seo.image.file.url}
            pathname={this.props.location.pathname}
          />
          <Section>
            <ContentContainer>
              {articles.map(({ node: article }) => (
                <Link key={article.title} to={`/articles/${article.slug}`}>
                  {article.title}
                </Link>
              ))}
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
  query ArticlePageQuery {
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

    allContentfulArticle {
      edges {
        node {
          slug
          title
        }
      }
    }
  }
`

const ContentContainer = styled.div`
  height: calc(100vh - 140px);
  min-height: 440px;
  padding: 0100px 0 100px;
  a {
    color: #fff;
    font-size: 22px;
  }

  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${media.phablet`
    height: calc(100vh - 160px);
    padding: 0;
  `};
`
