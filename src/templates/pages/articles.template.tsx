import React, { Component, Fragment } from 'react'
import { graphql, navigate } from 'gatsby'
import styled from 'styled-components'

import { media, transitions } from '@styles'
import { Section, Helmet, Layout } from '@components'
import Heading from '@components/Heading'
import Footer from '@components/Navigation/Navigation.Footer'
import { startAnimation } from '@utils'

import ArticlesGrid from '../../sections/articles/Articles.Grid'
import ArticlesFeatured from '../../sections/articles/Articles.Featured'
import mediaqueries from '@styles/media'

class ArticlesPage extends Component {
  contentful = this.props.data.allContentfulHomePage.edges[0].node
  articles = this.props.pageContext.group
  featured = this.props.pageContext.additionalContext.featured[0]

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
    const { seo } = this.contentful

    const navConfig = {
      offset: true,
      fixed: false,
      theme: 'light',
    }

    return (
      <Layout nav={navConfig}>
        <Fragment>
          <Helmet
            title={seo.title}
            description={seo.description}
            image={seo.image.file.url}
            pathname={this.props.location.pathname}
          />
          <Section>
            <ContentContainer>
              <div style={{ top: '-60px' }} />
              <TextContainer animation={animation}>
                <Heading.h1>
                  Perspectives on technology, design and business from the team
                  at Narative.
                </Heading.h1>
                <MainText>
                  Because the only thing we love more than doing what we do is
                  sharing what we do.
                </MainText>
              </TextContainer>
              <div />
            </ContentContainer>
            <div />
          </Section>
          <WhiteBackground>
            <NoOverflowSection narrow>
              <ArticlesFeatured article={this.featured} />
              <ArticlesGrid articles={this.articles} />
            </NoOverflowSection>
            <Footer mode="light" />
          </WhiteBackground>
        </Fragment>
      </Layout>
    )
  }
}

export default ArticlesPage

export const pageQuery = graphql`
  query ArticlesPageQuery {
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
        }
      }
    }
  }
`

const NoOverflowSection = styled(Section)`
  ${mediaqueries.tablet`
    overflow: hidden;
  `}
`
const WhiteBackground = styled.div`
  position: relative;
  background: #fafafa;
`

const ContentContainer = styled.div`
  height: calc(100vh - 140px);
  min-height: 440px;
  padding: 100px 0;

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

const TextContainer = styled.div`
  max-width: 570px;
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
