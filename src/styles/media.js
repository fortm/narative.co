/**
 * Breakpoints and utils
 */

import { css } from 'styled-components'

/**
 * example usage:
 *
 * ${media.large`
 *   width: 100px;
 * `};
 *
 */

const sizes = {
  hdpi: 1440,
  mdpi: 1280,
  desktop: 1024,
  tablet: 768,
  phone: 376,
}

// iterate through the sizes and create a media template
export const media = Object.keys(sizes).reduce((accumulator, label) => {
  // use em in breakpoints to work properly cross-browser and support users
  // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
  const emSize = sizes[label] / 16
  accumulator[label] = (...args) => css`
    @media (max-width: ${emSize}em) {
      ${css(...args)};
    }
  `
  return accumulator
}, {})

// export const media = {
//   smallest: (...args) => css`
//     @media (min-width: 360px) {
//       ${css(...args)};
//     }
//   `,
//   xsmall: (...args) => css`
//     @media (min-width: 400px) {
//       ${css(...args)};
//     }
//   `,
//   small: (...args) => css`
//     @media (min-width: 640px) {
//       ${css(...args)};
//     }
//   `,
//   medium: (...args) => css`
//     @media (min-width: 768px) {
//       ${css(...args)};
//     }
//   `,
//   large: (...args) => css`
//     @media (min-width: 1024px) {
//       ${css(...args)};
//     }
//   `,
//   xlarge: (...args) => css`
//     @media (min-width: 1200px) {
//       ${css(...args)};
//     }
//   `,
//   largest: (...args) => css`
//     @media (min-width: 1440px) {
//       ${css(...args)};
//     }
//   `,
// }
