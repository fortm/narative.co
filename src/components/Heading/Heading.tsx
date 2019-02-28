import styled, { css } from 'styled-components'

import mediaqueries from '@styles/media'

const commonStyles = (marginBottom = 0, fontWeight = 700) => css`
  font-weight: ${fontWeight};
  color: ${p => (p.dark ? '#000' : '#fff')};
  text-transform: ${p => (p.upper ? 'uppercase' : 'none')};
  margin-bottom: ${({ margin = true }) => (margin ? marginBottom : 0)}rem;
`

const makeHeading = key =>
  styled[key].attrs({})`
    ${p => styles[p.styles] || styles[key]};
  `

/**
 * Examples:
 * <Heading.h1>Lorem Ipsum</Heading.h1>
 * <Heading.h2 styles="h1">Lorem Ipsum</Heading.h2>
 * <Heading.h3 styles="h6">Lorem Ipsum</Heading.h3>
 * <Heading.h4>Lorem Ipsum</Heading.h4>
 * <Heading.h5>Lorem Ipsum</Heading.h5>
 * <Heading.h6>Lorem Ipsum</Heading.h6>
 *
 *
 * Props:
 * <Heading.h2 styles="h1">Lorem Ipsum</Heading.h2>
 * Will generate an h2 tag with h1 styling
 */

const constants = {
  blockquote: {
    fontsize: '3.2rem',
    fontFamily: "'ff-meta-serif-web-pro', serif",
    fontsizeMobile: '2.2rem',
    lineheight: 1.1,
  },
  h1: {
    fontsize: '3.2rem',
    fontsizeMobile: '2.2rem',
    lineheight: 1.3,
    lineheightMobile: 1.4,
  },
  h2: {
    fontsize: '3.2rem',
    fontsizeMobile: '2.3rem',
    fontFamily: "'ff-meta-serif-web-pro', serif",
    lineheight: 1.2,
  },
  h3: {
    fontsize: '2.4rem',
    fontFamily: "'ff-meta-serif-web-pro', serif",
    fontsizeMobile: '2.4rem',
    lineheight: 1.45,
  },
  h4: {
    fontsize: '1.8rem',
    fontsizeMobile: '1.4rem',
  },
  h5: {
    fontsize: '1.8rem',
    fontsizeMobile: '1.4rem',
  },
  h6: {
    fontsize: '1.8rem',
    fontsizeMobile: '1.4rem',
  },
}

const styles = {
  blockquote: css`
    text-align: center;
    font-style: italic;
    font-family: 'ff-meta-serif-web-pro', serif;
    font-size: ${constants.blockquote.fontsize};
    line-height: ${constants.blockquote.lineheight};

    ${commonStyles(0, 400)} ${mediaqueries.phablet` font-size: ${
      constants.blockquote.fontsizeMobile
    }; `};
  `,
  h1: css`
    font-size: ${constants.h1.fontsize};
    line-height: ${constants.h1.lineheight};

    ${commonStyles(1, 400)} ${mediaqueries.phablet`
      font-size: ${constants.h1.fontsizeMobile};
      line-height: ${constants.h1.lineheightMobile};
    `};
  `,
  h2: css`
    font-size: ${constants.h2.fontsize};
    line-height: ${constants.h2.lineheight};
    font-family: ${constants.h2.fontFamily};

    ${commonStyles(2)} ${mediaqueries.phablet` font-size: ${
      constants.h2.fontsizeMobile
    }; `};
  `,
  h3: css`
    font-size: ${constants.h3.fontsize};
    line-height: ${constants.h3.lineheight};
    font-family: ${constants.h2.fontFamily};

    ${commonStyles(0.5)} ${mediaqueries.phablet` font-size: ${
      constants.h3.fontsizeMobile
    }; `};
  `,
  h4: css`
    font-size: ${constants.h4.fontsize};

    ${commonStyles()} ${mediaqueries.phablet` font-size: ${
      constants.h4.fontsizeMobile
    }; `};
  `,
  h5: css`
    font-size: ${constants.h5.fontsize};

    ${commonStyles()} ${mediaqueries.phablet` font-size: ${
      constants.h5.fontsizeMobile
    }; `};
  `,
  h6: css`
    font-size: ${constants.h6.fontsize};

    ${commonStyles()} ${mediaqueries.phablet` font-size: ${
      constants.h6.fontsizeMobile
    }; `};
  `,
}

export { styles as headingMixins, constants as headingConstants }

export const h1 = makeHeading('h1')
export const h2 = makeHeading('h2')
export const h3 = makeHeading('h3')

export default {
  h1,
  h2,
  h3,
  h4: makeHeading('h4'),
  h5: makeHeading('h5'),
  h6: makeHeading('h6'),
  blockquote: makeHeading('blockquote'),
  cite: styled.cite.attrs({})`
    ${p => styles[p.styles] || styles.h2};
    font-style: normal;
    margin-bottom: 0;
    margin-top: 2.5rem;
    display: inline-block;

    ${mediaqueries.phablet`
      margin-top: 1.5rem;
    `};
  `,
}
