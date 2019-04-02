import React from 'react'
import styled from 'styled-components'

import Media from '@components/Media/Media.Img'
import mediaqueries from '@styles/media'

const ArticlePreview = ({ product }) => (
  <Card background={product.backgroundColor}>
    <Content>
      <Icon>{product.logo()}</Icon>
      <Excerpt>{product.excerpt}</Excerpt>
      {product.children}
    </Content>
    <Image>
      <Media src={product.background} />
    </Image>
  </Card>
)

export default ArticlePreview

const Card = styled.div`
  position: relative;
  width: 100%;
  height: 380px;
  padding: 80px 70px;
  background: ${p => p.background};
  box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  margin: 0 auto;

  &:not(:last-child) {
    margin: 30px auto;
  }

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
    padding: 40px 20px 30px;
  `}
`

const Content = styled.div`
  position: relative;
  z-index: 1;
  max-width: 354px;

  ${mediaqueries.phablet`
    text-align: center;
  `}
`

const Icon = styled.div`
  height: 25px;
  margin-bottom: 25px;
`

const Excerpt = styled.p`
  font-size: 18px;
  color: ${p => p.theme.colors.grey};
  margin-bottom: 30px;

  ${mediaqueries.phablet`
    margin-bottom: 25px;
  `}
`

const Image = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  border-radius: 5px;
  overflow: hidden;

  .gatsby-image-wrapper {
    height: 100%;
  }

  ${mediaqueries.tablet`
    display: none;
  `}
`
