import React, { Component, createRef } from 'react'
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

/**
 * Narative.co/articles
 *
 * This template is used to present our wonderful articles that we pull
 * from Contentful. This is not located in the /pages folder because we're
 * using it in the createPages lifecycle event
 */

class ArticlesPage extends Component<
  {},
  { imageLoaded: boolean; animation: string; current: number }
> {
  contentful = this.props.data.allContentfulHomePage.edges[0].node
  articles = this.props.pageContext.group
  featured = this.props.pageContext.additionalContext.featured[0]
  hero = this.props.data.hero

  text = createRef()

  state = { animation: '', current: 0, imageLoaded: false }

  componentDidMount() {
    startAnimation(() => {
      this.setState({ animation: 'start' })
    })
  }

  /**
   * handleTyping()
   * This will initiate the typing life effect we have displayed over the
   * hero image typewriter. Basically go through the string one char at a time
   * and udpate the counter until we're out of characters to type!
   */
  handleTyping = () => {
    const { current } = this.state
    var text = ' help your business take the next step.'
    var speed = Math.floor(Math.random() * 60) + 30

    if (current < text.length && this.text.current) {
      this.text.current.innerHTML += text.charAt(current)
      this.setState({ current: current + 1 })

      setTimeout(this.handleTyping, speed)
    }
  }

  handleImageLoaded = () => {
    this.setState({ imageLoaded: true })
    this.handleTyping()
  }

  render() {
    const { animation, imageLoaded } = this.state
    const { seo } = this.contentful

    const navConfig = {
      offset: true,
      fixed: true,
      theme: 'light',
    }

    return (
      <Layout nav={navConfig}>
        <>
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
                <Media
                  critical
                  src={this.hero.childImageSharp.fluid}
                  onLoad={this.handleImageLoaded}
                />
                <HeroImageText imageLoaded={imageLoaded}>
                  Narative builds brands, websites, and products for grow-minded
                  companies. We're a team with senior startup experience here to
                  <Caret ref={this.text} />
                </HeroImageText>
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
        </>
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
  width: 640px;
  position: absolute;
  right: -10px;
  top: 42%;
  transform: translateY(-50%);

  ${mediaqueries.desktop_medium`
    display: none;
  `};

  ${mediaqueries.phablet`
    width: 100%;
    margin-bottom: 60px;
  `};
`

const HeroImageText = styled.p`
  opacity: ${p => (p.imageLoaded ? 1 : 0)};
  transition: opacity 0.3s;
  position: absolute;
  color: #b798f2;
  width: 215.87px;
  top: 198px;
  left: 170px;
  font-size: 12px;
  transform: perspective(333px) rotateX(-42deg);
`

const Caret = styled.span`
  position: relative;

  &::after {
    content: '';
    position: absolute;
    right: -2px;
    top: 4px;
    height: 70%;
    width: 1px;
    background: #b798f2;
    animation: blink 1s step-end infinite;
  }

  @keyframes blink {
    from,
    to {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
  }
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
    top: -60px;
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
