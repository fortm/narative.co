/**
 * Breakpoints and utils
 */

// const breakpoints = {
//   smallest: '360px',
//   xsmall: '400px',
//   small: '640px',
//   medium: '768px',
//   large: '1024px',
//   xlarge: '1400px',
//   largest: '1500px',
// };

// export const bpCustom = (width, content) => `
// 	@media screen and (min-width: ${width}) {
// 	  ${content}
// 	}
// `;

// export const bp = (breakpt, content) => `
//   @media screen and (min-width: ${breakpoints[breakpt]}) {
//     ${content}
//   }
// `;

import { css } from 'styled-components'

/** example:   
  ${media.large`
    width: 100px;
  `};
*/

export const media = {
  smallest: (...args) => css`
    @media (min-width: 360px) {
      ${css(...args)};
    }
  `,
  xsmall: (...args) => css`
    @media (min-width: 400px) {
      ${css(...args)};
    }
  `,
  small: (...args) => css`
    @media (min-width: 640px) {
      ${css(...args)};
    }
  `,
  medium: (...args) => css`
    @media (min-width: 768px) {
      ${css(...args)};
    }
  `,
  large: (...args) => css`
    @media (min-width: 1024px) {
      ${css(...args)};
    }
  `,
  xlarge: (...args) => css`
    @media (min-width: 1200px) {
      ${css(...args)};
    }
  `,
  largest: (...args) => css`
    @media (min-width: 1440px) {
      ${css(...args)};
    }
  `,
}
