import React from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'gatsby'

import Heading from '@components/Heading'
import ButtonArrow from '@components/Button/Button.Arrow'
import mediaqueries from '@styles/media'

const article = {
  title: 'Why we built a company before building a product',
  excerpt:
    'At Narative, collaboration and contribution is at our core, this is why Figma couldn’t be more suited for a company like ours.',
  fields: {
    readingTime: {
      text: '6 minute read',
    },
  },
}

const ArticlesFeatured = ({}) => {
  return (
    <Frame>
      <Left>
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
      <div>Img</div>
    </Frame>
  )
}

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
  padding: 150px 0;
`

const Left = styled.div`
  width: 500px;
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
