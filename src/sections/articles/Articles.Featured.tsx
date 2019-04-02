import React from 'react'
import styled, { css } from 'styled-components'
import { Link, navigate } from 'gatsby'

import Heading from '@components/Heading'
import ButtonArrow from '@components/Button/Button.Arrow'
import Media from '@components/Media/Media.Img'

import ArticlesFeaturedMobile from './Articles.Featured.Mobile'

import mediaqueries from '@styles/media'

import { IArticleNode } from '@typings'

/**
 * The top featured item. This displays a single article that has been tagged
 * Featured: true in Contentful. This does not fit in the Grid below.
 */
const ArticlesFeatured = ({ article }: { article: IArticleNode }) => (
  <>
    <Frame>
      <StyledLink to={`/articles/${article.slug}`}>
        <Left>
          <SuperScript>Featured article</SuperScript>
          <FeaturedTitle dark>{article.title}</FeaturedTitle>
          <Excerpt>{article.excerpt}</Excerpt>
          <ButtonArrow
            text="Read more"
            color="#000"
            onClick={() => navigate(`/articles/${article.slug}`)}
          />
        </Left>
        <Right>
          <Media src={article.hero.Article__Featured} />
        </Right>
      </StyledLink>
    </Frame>
    <ArticlesFeaturedMobile article={article} />
  </>
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
  padding: 60px 0 100px;
  align-items: center;
  overflow: hidden;

  ${mediaqueries.tablet`
    display: none;
  `}
`

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  width: 100%;

  &:hover h2 {
    color: ${p => p.theme.colors.purple};
  }
`

const FeaturedTitle = styled(Heading.h2)`
  margin-bottom: 15px;
  transition: color 0.3s ease-in-out;
`

const Left = styled.div`
  display: block;
  width: 100%;
  max-width: 500px;
  position: relative;
  z-index: 1;
`

const Right = styled.div`
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  right: -8%;
  transform: scale(1.088);

  ${mediaqueries.tablet`
    display: none;
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
  margin-bottom: 30px;
  color: ${p => p.theme.colors.grey};
  display: ${p => (p.hasOverflow ? 'none' : 'box')};
  max-width: ${p => (p.narrow ? '415px' : '515px')};

  ${mediaqueries.desktop`
    display: box;
  `}
`
