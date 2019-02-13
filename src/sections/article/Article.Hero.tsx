import React from 'react'
import styled from 'styled-components'

import Heading from '@components/Heading'
import IntersectionObserver from '@components/IntersectionObserver'
import Section from '@components/Section'
import Media from '@components/Media/Media.Img'

import mediaqueries from '@styles/media'

import { IArticleNode } from '@typings'

const inlineAnimate = (cond: boolean) => (obj: any) => (cond ? obj : {})

const ArticleHero = ({ article }: { article: IArticleNode }) => {
  const author = article.author

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
              <Section>
                <Header style={headerOffset}>
                  <HeroTitle>{article.title}</HeroTitle>
                  <HeroSubtitle>
                    By {author.name} – {author.title}
                  </HeroSubtitle>
                </Header>
              </Section>
            </HeroContent>
            <RelativeSection style={readingOffset}>
              <ReadingTime>{article.readingTime.text}</ReadingTime>
            </RelativeSection>
            <Image>
              <Media src={article.hero.Article__Hero} />
            </Image>
          </Hero>
        )
      }}
    />
  )
}

export default ArticleHero

const Hero = styled.div`
  position: relative;
  z-index: 5;
  min-height: 800px;
  height: 100vh;
  width: 100vw;
  background: #fafafa;
  display: flex;
  overflow: hidden;

  ${mediaqueries.tablet`
    min-height: 100vh;
  `}
`

const HeroContent = styled.div`
  position: absolute;
  height: 100%;
  left: 0;
  right: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
`

const Header = styled.header`
  max-width: 680px;
  transition: transform 0.05s ease-in-out;

  ${mediaqueries.tablet`
    max-width: 480px;
  `}
`

const HeroTitle = styled(Heading.h1)`
  font-size: 48px;
  color: #000;
  font-family: ${p => p.theme.fontfamily.serif};
  font-weight: 700;

  ${mediaqueries.tablet`
    font-size: 32px;
    line-height: 1.3;
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
    font-size: 14px;
  `}
`

const Image = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
  right: -50%;

  & > div {
    top: 50%;
    transform: translateY(-50%);
  }

  ${mediaqueries.tablet`
    right: -360px;
    width: 720px;
    opacity: 0.25;
  `}
`
