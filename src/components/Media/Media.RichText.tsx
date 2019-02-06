import React from 'react'

import styled, { css } from 'styled-components'
import mediaqueries from '@styles/media'
import { IRichText } from '@typings'

const RichText: React.SFC<IRichText> = ({ content, ...props }) => {
  return (
    <Content
      dangerouslySetInnerHTML={{
        __html: content.childRichTextHtml.html,
      }}
      {...props}
    />
  )
}

export default RichText

const articleWidth = css`
  width: 100%;
  max-width: 680px;
  margin: 0 auto;
`

const Content = styled.div`
  * {
    line-height: 1.5;
    font-size: 1.8rem;
    font-family: ${p => p.theme.fontfamily.sansSerif};
    color: #fff;
    margin-bottom: 2.34rem;

    & + h1,
    & + h2,
    & + h3 {
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  figcaption {
    ${articleWidth};
    margin-top: 4.68rem;
    font-family: ${p => p.theme.fontfamily.serif};
    * {
      font-family: ${p => p.theme.fontfamily.serif};
    }
  }

  h1,
  h1 * {
    font-weight: 700;
    font-size: 2.2rem;
    line-height: 1.1;
    ${mediaqueries.desktop_up`
    font-size: 4.2rem;
    margin-bottom: 2.5rem;
  `};
  }

  h2,
  h2 * {
    font-size: 2.2rem;
    line-height: 1.45;
    margin-bottom: 2rem;
  }

  h3,
  h3 * {
    font-size: 1.8rem;
    line-height: 1.45;
    margin-bottom: 1.5rem;
  }

  a,
  a * {
    color: ${p => p.theme.colors.skyblue};
    &:visited {
      color: ${p => p.theme.colors.skyblue};
      opacity: 0.85;
    }
  }

  figure {
    text-align: center;
    figcaption {
      font-size: 1.2rem;
      font-weight: 700;
      color: ${p => p.theme.colors.grey.light};
      display: block;
    }
  }

  blockquote {
    position: relative;
    text-align: left;
    font-style: normal;
    font-style: italic;

    p {
      font-family: ${p => p.theme.fontfamily.serif};
      font-size: 36px;
      color: #fff;
      line-height: 1.2;
      max-width: 780px;
      margin: 25px auto 65px;
    }
  }

  hr {
    height: 1px;
    position: relative;
    width: 100%;
    background-color: ${p => p.theme.colors.grey.lighter};
    margin-top: 0;
    margin-left: 0;
    margin-right: 0;
    border: 0;
  }

  ul,
  ol {
    ${articleWidth} list-style: none;
    counter-reset: list;

    li > * {
      display: inline;
    }

    li::before {
      width: 2.5rem;
      margin-left: -2.5rem;
      display: inline-block;
      position: absolute;
      color: ${p => p.theme.colors.grey.mid};
    }
  }

  ul li::before {
    content: '•';
  }

  ol li::before {
    counter-increment: list;
    content: counter(list) '.';
    font-weight: 600;
  }

  p {
    ${articleWidth} margin-bottom: 40px;
    line-height: 1.6;
    font-size: 22px;

    b {
      font-weight: 800;
    }
  }

  img {
    display: block;
    position: relative;
    max-width: 100%;
    z-index: 0;
    margin: 20px auto 65px;
  }

  table {
    ${articleWidth} width: 100%;
    border-collapse: collapse;
    border-top: 1px solid #dfe3e8;
  }

  tbody {
    display: table-row-group;
    vertical-align: middle;
    border-color: inherit;
  }

  th {
    text-transform: uppercase;
    font-weight: 600;
  }

  tr {
    &:hover {
      background-color: #f4f6f8;
    }
  }

  td {
    padding: 10px 8px;
    border-bottom: 1px solid #dfe3e8;
    vertical-align: top;
    white-space: nowrap;
  }
`
