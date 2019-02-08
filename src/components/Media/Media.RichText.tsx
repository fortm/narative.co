import React from 'react'

import styled, { css } from 'styled-components'
import mediaqueries from '@styles/media'
import { IRichText } from '@typings'

const RichText: React.SFC<IRichText> = ({ content, contentRef, ...props }) => {
  return (
    <Content
      ref={contentRef}
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

const transitionColor = css`
  transition: color 0.3s ease;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;

  * {
    line-height: 1.5;
    font-size: 2.2rem;
    font-family: ${p => p.theme.fontfamily.sansSerif};
    color: ${p => p.theme.mode.text};
    margin-bottom: 2.34rem;
    ${transitionColor};

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
    color: ${p => p.theme.mode.text};
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
    font-size: 2.2rem;
    line-height: 1.45;
    margin-bottom: 1.5rem;
  }

  a,
  a * {
    color: ${p => p.theme.mode.links};
    ${transitionColor};

    &:visited {
      color: ${p => p.theme.mode.links};
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
    margin: 65px auto;
    width: 100%;

    p {
      font-family: ${p => p.theme.fontfamily.serif};
      font-size: 36px;
      color: #fff;
      line-height: 1;
      max-width: 780px;
      margin: 0 auto;
      color: ${p => p.theme.mode.text};
      ${transitionColor};
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
    color: ${p => p.theme.mode.text};
    ${transitionColor};

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
    color: ${p => p.theme.mode.text};

    b {
      font-weight: 800;
    }
  }

  img {
    display: block;
    position: relative;
    max-width: 100%;
    z-index: 0;
    margin: 40px auto 65px;
  }

  img.Image_Regular {
    max-width: 680px;
  }

  img.Image_Large {
    max-width: 1140px;
  }

  img.Image_Full {
    width: 100vw;
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
    color: ${p => p.theme.mode.text};
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

  hr {
    width: 250px;
    height: 1px;
    background: ${p => p.theme.colors.grey};
    margin: 35px auto;
    opacity: 0.33;
  }
`
