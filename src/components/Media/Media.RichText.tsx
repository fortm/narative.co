import React from 'react'

import styled, { css } from 'styled-components'
import mediaqueries, { media } from '@styles/media'

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

  ${mediaqueries.tablet`
    padding: 0 40px;
  `};
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
  h6 {
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
    font-size: 2.8rem;
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

    ${mediaqueries.desktop`
      margin-top: 0;
      margin-bottom: 1rem;
    `};
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
    margin-bottom: 0;

    img {
      margin-bottom: 15px;
    }

    figcaption {
      ${articleWidth};
      font-family: ${p => p.theme.fontfamily.sansSerif};
      color: ${p => p.theme.mode.text};
      opacity: 0.25;
      font-size: 2.2rem;
      display: block;
      margin-bottom: 60px;
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
      line-height: 1.1;
      max-width: 780px;
      margin: 0 auto;
      color: ${p => p.theme.mode.text};
      ${transitionColor};
    }

    ${mediaqueries.tablet`
      margin: 0 auto 35px;
    `}
  }
  ul,
  ol {
    ${articleWidth} list-style: none;
    counter-reset: list;
    color: ${p => p.theme.mode.text};
    ${transitionColor};
    position: relative;
    padding-left: 30px;

    li {
      position: relative;

        ${mediaqueries.tablet`
          padding-left: 40px;
        `}

      p {
        ${mediaqueries.tablet`
          padding: 0;
        `}
      }
    }

    li > * {
      display: inline;
    }

    li::before {
      width: 3rem;
      display: inline-block;
      position: absolute;
      color: ${p => p.theme.colors.grey.mid};
    }
  }

  ul li::before {
    content: '';
    position: absolute;
    left: -3rem;
    top: 1.4rem;
    height: 8px;
    width: 8px;
    background: ${p => p.theme.mode.text};

    ${mediaqueries.tablet`
      left: 0;
    `}
  }

  ol li::before {
    counter-increment: list;
    content: counter(list) '.';
    font-weight: 600;
    position: absolute;
    left: -3rem;
    top: 0.1rem;

    ${mediaqueries.tablet`
      left: 0;
    `}
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
    width: 100%;
    max-width: 680px;
  }

  img.Image_Large {
    width: 100%;
    max-width: 1140px;
  }

  img.Image_Full {
    width: 100%;
    width: 100vw;
  }

  table {
    ${articleWidth};
    width: 100%;
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
    margin: 35px auto;
    opacity: 0.33;
  }

  hr {
    ${articleWidth};
    position: relative;
    width: 100%;
    margin: 25px auto 60px;
    border: 0;
    height: 14.36px;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='10' height='15' viewBox='0 0 10 15' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3crect x='0.326172' y='14.1777' width='16' height='1' transform='rotate(-60 0.326172 14.1777)' fill='${p =>
      p.theme.mode.text}'/%3e%3c/svg%3e ");
    background-repeat: repeat-x;
    box-sizing: border-box;

    ${mediaqueries.tablet`
      width: calc(100vw - 80px);
      margin: 5px auto 20px;
    `};
  }
`
