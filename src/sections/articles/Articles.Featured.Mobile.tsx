import React from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'gatsby'

import Heading from '@components/Heading'
import ButtonArrow from '@components/Button/Button.Arrow'
import Media from '@components/Media/Media.Img'

import mediaqueries, { media } from '@styles/media'

import { IArticleNode } from '@typings'

const ArticlesFeaturedMobile = ({ article }: { article: IArticleNode }) => {
  return (
    <Grid>
      <GridItem article={article} />
    </Grid>
  )
}

export default ArticlesFeaturedMobile

const GridItem = ({ article }) => {
  if (!article) return null

  const hasOverflow = narrow && article.title.length > 35

  return (
    <ArticleLink to={`/articles/${article.slug}`}>
      <Item>
        <Image background={article.backgroundColor}>
          <Media src={article.backgroundImage.fluid} />
          <FeaturedPill>Featured</FeaturedPill>
        </Image>
        <Title dark hasOverflow={hasOverflow}>
          {article.title}
        </Title>
        <Excerpt narrow={narrow} hasOverflow={hasOverflow}>
          {article.excerpt}
        </Excerpt>
        <TimeToRead>{article.readingTime.text}</TimeToRead>
      </Item>
    </ArticleLink>
  )
}

const wide = '1fr'
const narrow = '457px'
const limitToTwoLines = css`
  text-overflow: ellipsis;
  overflow-wrap: normal;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  white-space: normal;
  overflow: hidden;

  ${mediaqueries.phablet`
    -webkit-line-clamp: 3;
  `}
`

const Grid = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: ${p =>
    p.reverse ? `${narrow} ${wide}` : `${wide} ${narrow}`};
  grid-template-rows: 2;
  column-gap: 30px;
  padding-top: 80px;
  margin-bottom: 80px;

  ${mediaqueries.desktop_up`
    display: none;
  `}

  ${mediaqueries.desktop`
    grid-template-columns: 1fr 1fr;
  `}

  ${mediaqueries.tablet`
    grid-template-columns: 1fr;
    margin-bottom: 0;
  `}
`

const Image = styled.div`
  position: relative;
  height: 240px;

  background-color: ${p => p.background};
  transition: transform 0.3s var(--ease-out-quad),
    box-shadow 0.3s var(--ease-out-quad);

  & > div {
    height: 100%;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  ${mediaqueries.tablet`
    height: 240px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  `}

  ${mediaqueries.phablet`
    height: 200px;
  `}
`

const Item = styled.div`
  position: relative;
  background: ${p => p.theme.colors.bg};
  margin-bottom: 40px;
  box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  overflow: hidden;
`

const FeaturedPill = styled.span`
  display: block;
  position: absolute;
  background: #e9daac;
  border-radius: 3px;
  bottom: -11px;
  left: 20px;
  color: #000;
  height: 23px;
  width: 80px;
  text-align: center;
`

const Title = styled(Heading.h2)`
  font-size: 22px;
  margin-bottom: ${p => (p.hasOverflow ? '45px' : '10px')};
  transition: color 0.3s ease-in-out;
  color: #fff;
  ${limitToTwoLines};

  ${mediaqueries.tablet`
    padding: 30px 20px 0;
    margin-bottom: 10px;
    -webkit-line-clamp: 3;
  `}
`

const Excerpt = styled.p`
  ${limitToTwoLines};
  font-size: 18px;
  margin-bottom: 10px;
  color: ${p => p.theme.colors.grey};
  display: ${p => (p.hasOverflow ? 'none' : 'box')};
  max-width: ${p => (p.narrow ? '415px' : '515px')};

  ${mediaqueries.desktop`
    display: -webkit-box;
  `}

  ${mediaqueries.tablet`
    max-width: 100%;
    padding:  0 20px;
    margin-bottom: 20px;
    -webkit-line-clamp: 3;
  `}
`

const TimeToRead = styled.div`
  font-weight: 600;
  font-size: 18px;
  color: ${p => p.theme.colors.grey};
  opacity: 0.5;

  ${mediaqueries.tablet`
    max-width: 100%;
    padding:  0 20px 30px;
  `}
`

const ArticleLink = styled(Link)`
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 5px;
  z-index: 1;
  transition: transform 0.33s var(--ease-out-quart);
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);

  &:hover ${Image} {
    transform: translateY(-1px);
    box-shadow: 0 50px 80px -20px rgba(0, 0, 0, 0.27),
      0 30px 50px -30px rgba(0, 0, 0, 0.3);
  }

  ${mediaqueries.tablet`
    &:hover ${Image} {
      box-shadow: none;
    }

    &:active {
      transform: scale(0.97) translateY(3px);
    }
  `}
`
