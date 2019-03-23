import React, { Component, Fragment } from 'react'
import { graphql, navigate } from 'gatsby'
import styled from 'styled-components'

import Heading from '@components/Heading'
import Footer from '@components/Navigation/Navigation.Footer'
import ScrollIndicator from '@components/ScrollIndicator'
import Media from '@components/Media/Media.Img'
import Pill from '@components/Pill'
import LayoutHeroMobile from '@components/Layout/Layout.Hero.Mobile'

import ArticlesGrid from '../../sections/articles/Articles.Grid'
import ArticlesFeatured from '../../sections/articles/Articles.Featured'

import mediaqueries from '@styles/media'
import transitions from '@styles/transitions'
import { Section, SEO, Layout } from '@components'
import { startAnimation } from '@utils'

class ArticlesPage extends Component {
  contentful = this.props.data.allContentfulHomePage.edges[0].node
  articles = this.props.pageContext.group
  featured = this.props.pageContext.additionalContext.featured[0]
  hero = this.props.data.hero

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
          <SEO
            title={seo.title}
            description={seo.description}
            image={seo.image.file.url}
            pathname={this.props.location.pathname}
          />
          <LayoutHeroMobile>
            <HeroSection relative>
              <ContentContainer>
                <div />
                <TextContainer animation={animation}>
                  <Pill text="Articles" />
                  <Heading.h1>
                    Perspectives on technology, design and business from the
                    team at Narative.
                  </Heading.h1>
                  <MainText>
                    Because the only thing we love more than doing what we do is
                    sharing what we do.
                  </MainText>
                </TextContainer>
                <ScrollIndicator />
              </ContentContainer>
              <HeroImage>
                <Media critical src={this.hero.childImageSharp.fluid} />
              </HeroImage>
            </HeroSection>
          </LayoutHeroMobile>
          <WhiteBackground>
            <Section narrow>
              <ArticlesFeatured article={this.featured} />
              <ArticlesGrid articles={this.articles} />
            </Section>
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
    hero: file(name: { regex: "/articles-hero-typewriter/" }) {
      childImageSharp {
        fluid(maxWidth: 1060, quality: 88) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
  }
`

const HeroSection = styled(Section)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const HeroImage = styled.div`
  width: 880px;
  position: absolute;
  right: -140px;
  top: -10px;

  ${mediaqueries.desktop_medium`
    display: none;
  `};

  ${mediaqueries.phablet`
    width: 100%;
    margin-bottom: 60px;
  `};
`

const WhiteBackground = styled.div`
  position: relative;
  background: #fafafa;
`

const ContentContainer = styled.div`
  height: calc(100vh - 140px);
  min-height: 440px;

  a {
    color: #fff;
    font-size: 22px;
  }

  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${mediaqueries.phablet`
    height: calc(100vh - 90px);
    padding: 0;
  `};
`

const TextContainer = styled.div`
  max-width: 570px;
  ${transitions.fadeUp};

  ${mediaqueries.phablet`
    position: relative;
    top: -50px;
  `};
`

const MainText = styled.p`
  font-size: 3.2rem;
  font-weight: 400;
  color: ${p => p.theme.colors.grey};
  line-height: 1.3;

  ${mediaqueries.phablet`
    font-size: 2.2rem;
  `};
`
