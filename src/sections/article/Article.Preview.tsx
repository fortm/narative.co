import React from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'gatsby'

import Heading from '@components/Heading'
import Media from '@components/Media/Media.Img'

import mediaqueries from '@styles/media'

/**
 *  [LONG], [SHORT]
 */

const ArticlesPreview = ({ articles }) => {
  return (
    <>
      <Grid>
        <GridItem article={articles[0]} narrow />
        <GridItem article={articles[1]} />
      </Grid>
    </>
  )
}

export default ArticlesPreview

const GridItem = ({ article, narrow }) => {
  if (!article) return null

  const hasOverflow = narrow && article.title.length > 35

  return (
    <Item>
      <ArticleLink to={`/articles/${article.slug}`} />
      <Image background={article.backgroundColor}>
        <Media src={article.backgroundImage.fluid} />
      </Image>
      <Title dark hasOverflow={hasOverflow}>
        {article.title}
      </Title>
      <Excerpt narrow={narrow} hasOverflow={hasOverflow}>
        {article.excerpt}
      </Excerpt>
      <TimeToRead>{article.readingTime.text}</TimeToRead>
    </Item>
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
    p.reverse ? `${wide} ${narrow}` : `${narrow} ${wide}`};
  grid-template-rows: 2;
  column-gap: 30px;
  margin-bottom: 80px;

  ${mediaqueries.desktop`
    grid-template-columns: 1fr 1fr;
  `}

  ${mediaqueries.tablet`
    grid-template-columns: 1fr;
    margin-bottom: 60px;
  `}
`

const Image = styled.div`
  position: relative;
  height: 280px;
  box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  margin-bottom: 30px;
  background-color: ${p => p.background};

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    box-shadow: 0px 20px 80px rgba(0, 0, 0, 0.14);
    transition: opacity 0.3s ease-in-out;
  }

  & > div {
    height: 100%;
    border-radius: 5px;
  }

  ${mediaqueries.tablet`
    height: 240px;
    margin-bottom: 0;
    box-shadow: none;
  `}

  ${mediaqueries.phablet`
    height: 200px;
  `}
`

const Item = styled.div`
  position: relative;

  ${mediaqueries.tablet`
    margin-bottom: 40px;
    box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.2);
    border-radius: 5px;

    &:last-child {
      display:  none;
    }
  `}
`

const Title = styled(Heading.h2)`
  font-size: 22px;
  margin-bottom: ${p => (p.hasOverflow ? '45px' : '10px')};
  color: ${p => p.theme.mode.text};
  transition: color 0.3s ease-in-out;
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
  color: ${p => p.theme.mode.text};
  opacity: 0.25;

  ${mediaqueries.tablet`
    max-width: 100%;
    padding:  0 20px 30px;
  `}
`

const ArticleLink = styled(Link)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 5px;
  z-index: 1;

  &:hover ~ ${Image} {
    &::after {
      opacity: 1;
    }
  }

  &:hover ~ h2 {
    color: ${p => p.theme.mode.hover};
  }
`
