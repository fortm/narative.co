import React, { Component } from 'react'

import { Link, graphql, StaticQuery } from 'gatsby'
import styled, { css } from 'styled-components'

import Heading from '@components/Heading'
import Helmet from '@components/Helmet'
import Layout from '@components/Layout'
import { MicrodataBreadcrumb, RichText } from '@components/Media'
import withDarkMode from '@components/DarkMode'
import Section from '@components/Section'
import Progress from '@components/Progress'
import IntersectionObserver from '@components/IntersectionObserver'

import mediaqueries from '@styles/media'
import { debounce } from '@utils'

import { IDetailPage, IArticleNode } from '@typings'

import Aside from '../sections/article/Article.Aside'

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

  get readingTime() {
    this.article.fields.readingTime.minutes
  }

  componentDidMount() {
    this.calculateBodySize()

    window.addEventListener('onresize', this.calculateBodySize)
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('onresize', this.calculateBodySize)
    }
  }

  /**
   * Calculate the size of our component. This is initially equal to
   * the component's height but then we want to recalculate everytime
   * an image in the content's body has loaded
   */
  calculateBodySize = () => {
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

      // Prevent rerun of the listener attachment
      this.hasCalculatedHeightBefore = true
    }

    console.log($contentSection.offsetTop)
    // Set the height and offset of the content area
    this.setState({
      contentHeight: $contentSection.getBoundingClientRect().height,
      contentOffset: $contentSection.offsetTop,
    })
  }

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
    }

    console.log(contentOffset)

    return (
      <Layout nav={navConfig}>
        <StaticQuery
          query={ArticlePublicationLogoQuery}
          render={({ url: { edges } }) => (
            <Microdata
              article={article}
              publicationLogo={edges[0].node.seo.image.file.url}
              location={location}
              sectionName={article.title}
              sectionUrl={location.href}
            />
          )}
        />
        <ArticleHero article={article} author={author} />
        <Aside {...scrollInfo}>
          <Progress {...scrollInfo} />
        </Aside>
        <Aside right {...scrollInfo}>
          <ShareButton mode={mode} />
          <DarkModeSelect toggleMode={toggleMode} mode={mode} />
        </Aside>
        <Content contentRef={this.contentSectionRef} content={article.body} />
        <Gradient>
          <Meta>
            <div>Posted on {article.fields.postDate}</div>
            <div>
              By {author.name} – {author.title}
            </div>
          </Meta>
          <Footer>
            <FooterContent>
              <FooterHeading>Next</FooterHeading>
              <FooterLink to={`/articles/${next.slug}`}>
                {next.title}
              </FooterLink>
            </FooterContent>
          </Footer>
        </Gradient>
      </Layout>
    )
  }
}

export default withDarkMode(Article)

const ArticlePublicationLogoQuery = graphql`
  query ArticlePublicationQuery {
    url: allContentfulHomePage {
      edges {
        node {
          seo {
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

const inlineAnimate = cond => obj => (cond ? obj : {})

const ArticleHero = ({ article, author }) => {
  return (
    <IntersectionObserver
      render={({
        boundingClientRect: { height },
        visiblePercentage,
      }: {
        boundingClientRect: { height: number }
        visiblePercentage: number
      }) => {
        const canAnimate = inlineAnimate(height > 540)
        const headerOffset = canAnimate({
          transform: `translateY(${(100 - visiblePercentage) * 1.33}px)`,
          opacity: 1 - ((100 - visiblePercentage) / 100) * 1.66,
        })
        const readingOffset = canAnimate({
          transform: `translateY(${visiblePercentage / 1.5}px)`,
        })

        return (
          <Hero>
            <HeroContent>
              <Header style={headerOffset}>
                <HeroTitle>{article.title}</HeroTitle>
                <HeroSubtitle>
                  By {author.name} – {author.title}
                </HeroSubtitle>
              </Header>
            </HeroContent>
            <RelativeSection style={readingOffset}>
              <ReadingTime>{article.fields.readingTime.text}</ReadingTime>
            </RelativeSection>
          </Hero>
        )
      }}
    />
  )
}

const articleWidth = css`
  width: 100%;
  max-width: 680px;
  margin: 0 auto;

  ${mediaqueries.tablet`
    padding: 0 40px;
  `};
`

const Content = styled(RichText).attrs<{ textHighlightColor: string }>({})`
  position: relative;
  padding: 160px 0 35px;
  background: ${p => p.theme.mode.background};

  ${mediaqueries.tablet`
    padding: 80px 0;
  `}
`

const Gradient = styled.div`
  position: relative;
  background: ${p => p.theme.mode.gradient};
  transition: background 0.4s ease-in-out;
`

const Hero = styled.div`
  position: relative;
  z-index: 5;
  min-height: 540px;
  height: 100vh;
  width: 100vw;
  background: #fafafa;
  display: flex;
  overflow: hidden;
`

const HeroContent = styled.div`
  position: absolute;
  height: 100%;
  left: 0;
  right: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`

const Header = styled.header`
  max-width: 680px;
  margin: 0 auto;

  ${mediaqueries.tablet`
    padding: 0 40px;
  `}
`

const HeroTitle = styled(Heading.h1)`
  font-size: 48px;
  color: #000;
  font-family: ${p => p.theme.fontfamily.serif};
  font-weight: 700;

  ${mediaqueries.tablet`
    font-size: 32px;
  `}
`

const HeroSubtitle = styled.div`
  font-size: 18px;
  color: #7a8085;
  font-weight: 800;
`

const RelativeSection = styled(Section)`
  position: relative;
  width: 100%;
  pointer-events: none;
`

const ReadingTime = styled.div`
  position: absolute;
  left: -5px;
  bottom: 180px;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.25);
  transform: rotate(90deg);

  &::after {
    content: '';
    position: absolute;
    height: 1px;
    top: 12px;
    width: 130px;
    right: -150px;
    background: #111216;
  }

  ${mediaqueries.tablet`
    left: 2px;
    bottom: 112px;
    font-size: 14px;
  `}
`

const Meta = styled.div`
  width: 100%;
  max-width: 680px;
  margin: 0 auto;
  font-size: 14px;
  color: ${p => p.theme.mode.text};
  margin-bottom: 160px;

  ${mediaqueries.tablet`
    padding: 0 40px;
  `};
`

const PostDate = styled.div``

const Author = styled.div``

const Footer = styled.div`
  padding: 160px 0;
  background: #fafafa;
`

const FooterContent = styled.div`
  ${articleWidth}
`

const FooterHeading = styled.h6`
  margin-bottom: 45px;
  font-size: 18px;
  font-weight: 400;
  color: ${p => p.theme.colors.grey};
`
const FooterLink = styled(Link)`
  font-size: 48px;
  color: #000;
  font-family: ${p => p.theme.fontfamily.serif};
  font-weight: 700;

  ${mediaqueries.tablet`
    font-size: 32px;
  `}
`

const DarkModeSelect = ({ toggleMode, mode }) => {
  const Icon = mode === 'dark' ? DarkModeOffIcon : DarkModeOnIcon

  return (
    <IconWrapper mode={mode} onClick={toggleMode}>
      <Icon />
    </IconWrapper>
  )
}

const ShareButton = ({ mode }) => {
  const Icon = mode === 'dark' ? ShareDarkModeOffIcon : ShareDarkModeOnIcon

  return (
    <IconWrapper mode={mode}>
      <Icon />
    </IconWrapper>
  )
}

const DarkModeOffIcon = () => (
  <svg
    width="11"
    height="12"
    viewBox="0 0 11 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.46915 9.48389C8.24685 9.81682 9.0549 9.95402 9.88666 9.89635C9.4527 10.3352 8.95277 10.6904 8.38492 10.9634C7.64157 11.3208 6.84862 11.5 6 11.5C5.0111 11.5 4.09929 11.2505 3.2551 10.7497L3.25512 10.7496L3.24965 10.7465C2.40216 10.2581 1.73021 9.60078 1.22758 8.76943C0.743017 7.92685 0.5 7.00694 0.5 6C0.5 4.99177 0.743603 4.08001 1.22757 3.25397C1.73089 2.40594 2.40315 1.74134 3.24965 1.25353L3.24967 1.25356L3.2551 1.25034C4.09929 0.749548 5.0111 0.5 6 0.5C6.14961 0.5 6.29763 0.505372 6.44409 0.516086C5.86417 0.930196 5.3847 1.45545 5.00795 2.08785L5.0079 2.08782L5.00395 2.09469C4.53871 2.90455 4.30469 3.77944 4.30469 4.71094C4.30469 5.76009 4.59022 6.72337 5.16082 7.58792L5.16078 7.58795L5.16466 7.59366C5.74918 8.45324 6.51993 9.0865 7.46915 9.48389Z"
      stroke="white"
    />
  </svg>
)

const DarkModeOnIcon = () => (
  <svg
    width="11"
    height="12"
    viewBox="0 0 11 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 12C6.92188 12 7.78906 11.8047 8.60156 11.4141C9.41406 11.0234 10.1016 10.4766 10.6641 9.77344C10.7422 9.67969 10.75 9.57812 10.6875 9.46875C10.625 9.34375 10.5313 9.29687 10.4063 9.32812C9.45313 9.5 8.53906 9.39844 7.66406 9.02344C6.80469 8.66406 6.10938 8.09375 5.57813 7.3125C5.0625 6.53125 4.80469 5.66406 4.80469 4.71094C4.80469 3.86719 5.01563 3.07812 5.4375 2.34375C5.875 1.60937 6.46094 1.03906 7.19531 0.632812C7.30469 0.554687 7.34375 0.453125 7.3125 0.328125C7.29688 0.203125 7.22656 0.125 7.10156 0.09375C6.74219 0.03125 6.375 0 6 0C4.92188 0 3.92188 0.273437 3 0.820312C2.07812 1.35156 1.34375 2.07812 0.796875 3C0.265625 3.90625 0 4.90625 0 6C0 7.09375 0.265625 8.10156 0.796875 9.02344C1.34375 9.92969 2.07813 10.6484 3 11.1797C3.92188 11.7266 4.92188 12 6 12Z"
      fill="black"
    />
  </svg>
)

const ShareDarkModeOffIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.5 9.38008C10.0567 9.38008 9.66 9.55508 9.35667 9.82925L5.1975 7.40841C5.22667 7.27425 5.25 7.14008 5.25 7.00008C5.25 6.86008 5.22667 6.72591 5.1975 6.59175L9.31 4.19425C9.625 4.48591 10.0392 4.66675 10.5 4.66675C11.4683 4.66675 12.25 3.88508 12.25 2.91675C12.25 1.94841 11.4683 1.16675 10.5 1.16675C9.53167 1.16675 8.75 1.94841 8.75 2.91675C8.75 3.05675 8.77333 3.19091 8.8025 3.32508L4.69 5.72258C4.375 5.43091 3.96083 5.25008 3.5 5.25008C2.53167 5.25008 1.75 6.03175 1.75 7.00008C1.75 7.96841 2.53167 8.75008 3.5 8.75008C3.96083 8.75008 4.375 8.56925 4.69 8.27758L8.84333 10.7042C8.81417 10.8267 8.79667 10.9551 8.79667 11.0834C8.79667 12.0226 9.56083 12.7867 10.5 12.7867C11.4392 12.7867 12.2033 12.0226 12.2033 11.0834C12.2033 10.1442 11.4392 9.38008 10.5 9.38008Z"
      fill="white"
    />
  </svg>
)

const ShareDarkModeOnIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.5 9.37935C10.0567 9.37935 9.66 9.55435 9.35667 9.82852L5.1975 7.40768C5.22667 7.27352 5.25 7.13935 5.25 6.99935C5.25 6.85935 5.22667 6.72518 5.1975 6.59102L9.31 4.19352C9.625 4.48518 10.0392 4.66602 10.5 4.66602C11.4683 4.66602 12.25 3.88435 12.25 2.91602C12.25 1.94768 11.4683 1.16602 10.5 1.16602C9.53167 1.16602 8.75 1.94768 8.75 2.91602C8.75 3.05602 8.77333 3.19018 8.8025 3.32435L4.69 5.72185C4.375 5.43018 3.96083 5.24935 3.5 5.24935C2.53167 5.24935 1.75 6.03102 1.75 6.99935C1.75 7.96768 2.53167 8.74935 3.5 8.74935C3.96083 8.74935 4.375 8.56852 4.69 8.27685L8.84333 10.7035C8.81417 10.826 8.79667 10.9543 8.79667 11.0827C8.79667 12.0218 9.56083 12.786 10.5 12.786C11.4392 12.786 12.2033 12.0218 12.2033 11.0827C12.2033 10.1435 11.4392 9.37935 10.5 9.37935Z"
      fill="black"
    />
  </svg>
)

const IconWrapper = styled.button`
  position: relative;
  background: ${p => (p.mode === 'dark' ? '#000' : 'rgba(0,0,0,0.1)')};
  border-radius: 5px;
  width: 34px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
`

const Microdata = ({
  article: { title, excerpt, author, hero, postDate },
  location,
  publicationLogo,
  sectionName,
  sectionUrl,
}: {
  article: IArticleNode
  location: Location
  publicationLogo: string
  sectionName: string
  sectionUrl: string
}) => {
  let isoDateStr

  try {
    isoDateStr = new Date(postDate!).toISOString()
  } catch (error) {
    // Now all browsers can parse our date string. That's fine. The crawler can
    // console.log(error)
  }

  return (
    <>
      <MicrodataBreadcrumb
        levels={[
          {
            name: sectionName,
            item: sectionUrl,
          },
          { name: title, item: location.href },
        ]}
      />
      <Helmet
        title={title}
        description={excerpt}
        image={hero.Article__Hero.src}
      >
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "Article",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "${location.href}"
            },
            "headline": "${title}",
            "image": "${hero.Article__Hero.src}",
            "datePublished": "${isoDateStr}",
            "dateModified": "${isoDateStr}",
            "author": {
              "@type": "Person",
              "name": "${author ? author.name : 'Hopper Editors'}"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Hopper",
              "logo": {
                "@type": "ImageObject",
                "url": "${location.origin + publicationLogo}"
              }
            },
            "description": "${excerpt}"
          }
        `}
        </script>
      </Helmet>
    </>
  )
}
