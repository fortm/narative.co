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
          <Section relative>
            <LearnMore animation={animation}>Learn more</LearnMore>
            <ContentContainer>
              <div style={{ top: '-60px' }} />
              <TextContainer animation={animation}>
                <HeaderPill>Articles</HeaderPill>
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
  padding: 0 0 100px;

  a {
    color: #fff;
    font-size: 22px;
  }

  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${media.phablet`
    height: calc(100vh - 90px);
    padding: 0;
    top: -45px;
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

const HeaderPill = styled.div`
  color: ${p => p.theme.colors.grey};
  border: 1px solid ${p => p.theme.colors.grey};
  border-radius: 3px;
  padding: 0.1rem 1.2rem;
  margin-bottom: 1.5rem;
  display: inline-block;
  font-weight: 500;
  min-width: 100px;
  text-align: center;
`

const LearnMore = styled.div`
  position: absolute;
  bottom: 100px;
  left: 0;
  color: ${p => p.theme.colors.grey};
  font-weight: 600;
  left: 12px;
  font-size: 12px;
  opacity: ${p => (p.animation ? 1 : 0)};
  transform: rotate(90deg) translateX(${p => (p.animation ? '0' : '20px')});
  transition: all 1s ease-out 0.5s;

  &::after {
    content: '';
    position: absolute;
    width: 100px;
    right: -120px;
    height: 1px;
    top: 9px;
    background: ${p => p.theme.colors.grey};
  }
`
