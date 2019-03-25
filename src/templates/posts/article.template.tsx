/**
 * Why is this a template?
 * In order to add pagination to the articles page we need to use createPagination
 * during the onCreatePages Gatsby hook. Therefore, we need to create it dynamically
 * using a template instead of putting it into the regular Gatsby /pages folder
 */

import React, { Component } from 'react'
import styled from 'styled-components'
import throttle from 'lodash/throttle'

import Layout from '@components/Layout'
import { RichText } from '@components/Media'
import withDarkMode from '@components/DarkMode'
import Progress from '@components/Progress'
import ProgressMobile from '@components/Progress/Progress.Mobile'
import Section from '@components/Section'
import NavigationFooter from '@components/Navigation/Navigation.Footer'

import mediaqueries from '@styles/media'
import { debounce } from '@utils'

import Aside from '../../sections/article/Article.Aside'
import ArticleHero from '../../sections/article/Article.Hero'
import ArticleControls from '../../sections/article/Article.Controls'
import ArticlePreview from '../../sections/article/Article.Preview'
import ArticleMicrodata from '../../sections/article/Article.Microdata'

import { IDetailPage } from '@typings'

interface PostState {
  previousPath: string
}

interface ArticleProps extends IDetailPage {
  mode: string
  toggleMode: () => void
}

class Article extends Component<ArticleProps, PostState> {
  contentSectionRef: React.RefObject<HTMLElement> = React.createRef()
  hasCalculatedHeightBefore = false
  article = this.props.pageContext.article
  next = this.props.pageContext.next
  relateds = this.props.pageContext.relateds

  state = {
    showProgress: true,
    contentHeight: 0,
    contentOffset: 0,
    previousPath: '/',
    trackingData: null,
  }

  componentDidMount() {
    this.calculateBodySize()

    window.addEventListener('resize', this.calculateBodySize)
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.calculateBodySize)
    }
  }

  /**
   * Calculate the size of our component. This is initially equal to
   * the component's height but then we want to recalculate everytime
   * an image in the content's body has loaded
   */
  calculateBodySize = throttle(() => {
    // Get the narrow content section
    const $contentSection = this.contentSectionRef.current!

    if (!$contentSection) {
      return
    }

    // If we haven't checked the content's height before,
    // we want to add listeners to the content area's
    // imagery to recheck when it's loaded
    if (!this.hasCalculatedHeightBefore) {
      const debouncedCalculation = debounce(this.calculateBodySize)
      const $imgs = $contentSection.querySelectorAll('img')
      $imgs.forEach($img => {
        // If the image hasn't finished loading then add a listener
        if (!$img.complete) $img.onload = debouncedCalculation
      })

      // Handle embedded tweets
      twttr.ready(twttr => {
        twttr.events.bind('rendered', this.calculateBodySize)
      })

      // Prevent rerun of the listener attachment
      this.hasCalculatedHeightBefore = true
    }

    // Set the height and offset of the content area
    this.setState({
      contentHeight: $contentSection.getBoundingClientRect().height,
      contentOffset: $contentSection.offsetTop,
    })
  }, 20)

  render = () => {
    const { contentHeight, contentOffset } = this.state
    const { location, mode, toggleMode, ...props } = this.props

    const scrollInfo = { height: contentHeight, offset: contentOffset }
    const article = this.article
    const author = this.article.author
    const next = this.next

    const navConfig = {
      theme: 'dark',
      offset: false,
      fixed: false,
      low: true,
    }

    return (
      <Layout nav={navConfig}>
        <ArticleMicrodata article={article} location={location} />
        <ArticleHero article={article} />
        <Aside {...scrollInfo}>
          <Progress {...scrollInfo} {...scrollInfo} />
        </Aside>
        <Aside right {...scrollInfo}>
          <ArticleControls toggleMode={toggleMode} mode={mode} />
        </Aside>
        <MobileControls>
          <ArticleControls toggleMode={toggleMode} mode={mode} />
        </MobileControls>
        <Content contentRef={this.contentSectionRef} content={article.body} />
        <Gradient>
          <Meta>
            <div>Posted on {article.publicationDate}</div>
            <div>
              By {author.name}
              {author.title && ` , ${author.title}`}
            </div>
          </Meta>
          <NextArticle narrow>
            <FooterNext>Next article from Narative</FooterNext>
            <ArticlePreview articles={next} />
            <FooterSpacer />
          </NextArticle>
          <NavigationFooter
            mode={mode}
            to="/articles"
            text="Back to Articles"
          />
        </Gradient>
        <ProgressMobile mode={mode} title={article.title} {...scrollInfo} />
      </Layout>
    )
  }
}

export default withDarkMode(Article)

const MobileControls = styled.div`
  position: relative;
  padding-top: 65px;
  background: ${p => p.theme.mode.background};
  text-align: center;

  ${mediaqueries.desktop_up`
    display: none;
  `}
`

const Content = styled(RichText).attrs<{ textHighlightColor: string }>({})`
  position: relative;
  padding: 160px 0 35px;
  background: ${p => p.theme.mode.background};

  ${mediaqueries.tablet`
    padding: 60px 0 0;
  `}
`

const Gradient = styled.div`
  position: relative;
  background: ${p => p.theme.mode.gradient};
  transition: background 0.4s ease-in-out;
`

const Meta = styled.div`
  width: 100%;
  max-width: 680px;
  margin: 0 auto;
  font-size: 14px;
  color: ${p => p.theme.mode.text};
  margin-bottom: 80px;

  ${mediaqueries.tablet`
    padding: 0 20px;
    margin-bottom: 50px;
  `};
`

const NextArticle = styled(Section)`
  display: block;
`

const FooterNext = styled.div`
  position: relative;
  opacity: 0.25;
  margin-bottom: 100px;
  color: ${p => p.theme.mode.text};

  ${mediaqueries.tablet`
    margin-bottom: 50px;
  `}

  &::after {
    content: '';
    position: absolute;
    background: ${p => p.theme.mode.text};
    width: ${(910 / 1140) * 100}%;
    height: 1px;
    right: 0;
    top: 11px;

    ${mediaqueries.tablet`
      width: ${(600 / 1140) * 100}%;
    `}

    ${mediaqueries.phablet`
      width: ${(400 / 1140) * 100}%;
    `}

    ${mediaqueries.phone`
      width: 90px
    `}
  }
`

const FooterSpacer = styled.div`
  margin-bottom: 65px;
`
