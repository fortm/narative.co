import React from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'gatsby'

import Heading from '@components/Heading'
import ButtonArrow from '@components/Button/Button.Arrow'
import Media from '@components/Media/Media.Img'

import mediaqueries from '@styles/media'

import { IArticleNode } from '@typings'

const ArticlesFeatured = ({ article }: { article: IArticleNode }) => (
  <Frame>
    <Left to={`/articles/${article.slug}`}>
      <SuperScript>Featured article</SuperScript>
      <Heading.h2 dark>{article.title}</Heading.h2>
      <Excerpt>{article.excerpt}</Excerpt>
      <ButtonArrow
        text="Read more"
        color="#000"
        as={Link}
        to={`/articles/${article.slug}`}
      />
    </Left>
    <Right to={`/articles/${article.slug}`}>
      <Media src={article.hero.Article__Featured} />
    </Right>
  </Frame>
)

export default ArticlesFeatured

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

const Frame = styled.div`
  position: relative;
  display: flex;
  padding: 100px 0;
  align-items: center;
  overflow: hidden;

  ${mediaqueries.tablet`
    padding: 100px 0;
    overflow: visible;
  `}

  ${mediaqueries.phablet`
    padding: 60px 0 80px;
  `}
`

const Left = styled(Link)`
  display: block;
  width: 100%;
  max-width: 500px;
  position: relative;
  z-index: 1;
`

const Right = styled(Link)`
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  right: -8%;

  ${mediaqueries.tablet`
    position: absolute;
    width: 90%
    right: -50%;
    z-index: 0;
    opacity: 0.25;

    & > div {
      top: 50%;
      transform: translateY(-50%);
    }
  `}
`

const SuperScript = styled.div`
  position: relative;
  display: inline-block;
  margin-bottom: 65px;
  opacity: 0.25;

  &::after {
    content: '';
    position: absolute;
    height: 1px;
    width: 30px;
    right: -42px;
    top: 11px;
    background: #000;
  }

  ${mediaqueries.tablet`
    margin-bottom: 60px;
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
    display: box;
  `}
`
