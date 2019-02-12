import React from 'react'
import styled, { css } from 'styled-components'
import { Link, navigate } from 'gatsby'

import Media from '@components/Media/Media.Img'

import { IArticleNode } from '@typings'
import mediaqueries from '@styles/media'

const ArticlePreview = ({ article }: { article: IArticleNode }) => {
  const slug = `/articles/${article.slug}`

  return (
    <Card background={article.backgroundColor} onClick={() => navigate(slug)}>
      <Content>
        <Icon>
          <Media src={article.icon.file.url} />
        </Icon>
        <Title>{article.title}</Title>
        <Excerpt>{article.excerpt}</Excerpt>
        <HorizontalRule />
        <LinkToArticle to={slug}>Read more</LinkToArticle>
      </Content>
      <Image>
        <Media src={article.backgroundImage.fluid} />
      </Image>
    </Card>
  )
}

export default ArticlePreview

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

const Card = styled.div`
  position: relative;
  width: 100%;
  height: 380px;
  padding: 65px;
  background: ${p => p.background};
  box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  margin: 0 auto;
  cursor: pointer;

  &::after {
    content: '';
    position: absolute;
    pointer-events: none;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    top: 0;
    left: 0;
    box-shadow: 0px 10px 100px rgba(0, 0, 0, 0.16);
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  &:hover::after {
    opacity: 1;
  }

  ${mediaqueries.tablet`
    height: auto;
    padding: 40px 40px 30px;
  `}
`

const Content = styled.div`
  max-width: 410px;

  ${mediaqueries.phablet`
    text-align: center;
  `}
`

const Icon = styled.div`
  height: 25px;
  margin-bottom: 35px;

  ${mediaqueries.phablet`
    margin-bottom: 25px;
  `}
`

const Title = styled.h2`
  font-size: 22px;
  color: #fff;
  font-family: ${p => p.theme.fontfamily.serif};
  margin-bottom: 10px;
  ${limitToTwoLines}

  ${mediaqueries.phablet`
    margin-bottom: 15px;
  `}
`

const Excerpt = styled.p`
  font-size: 18px;
  color: #fff;
  margin-bottom: 35px;
  ${limitToTwoLines}

  ${mediaqueries.phablet`
    margin-bottom: 25px;
  `}
`

const HorizontalRule = styled.hr`
  width: 140px;
  height: 1px;
  border: none;
  margin-bottom: 30px;
  background: rgba(255, 255, 255, 0.15);

  ${mediaqueries.phablet`
    width: 100%;
    margin: 0 auto 25px;
    background: rgba(255, 255, 255, 0.30);
  `}
`

const LinkToArticle = styled(Link)`
  font-weight: 600;
  font-size: 16px;
  color: #fff;
`

const Image = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;

  .gatsby-image-wrapper {
    height: 100%;
  }

  ${mediaqueries.tablet`
    display: none;
  `}
`
