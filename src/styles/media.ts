import { css } from 'styled-components'

import theme from '@styles/theme'

const toEm = (size: number) => size / 16 + 'em'

/**
 * All breakpoints can be found inside of theme.breakpoints.
 * Each is turned in to a min + 1 and max-width version.
 *
 * There are also break points to cover coarse and fine pointer devices
 *
 * @example
 *
 *    ${mediaqueries.phone` width: 100px; `};
 *    ${mediaqueries.tablet_up` width: 200px; `};
 */

const mediaqueries: IMediaqueries = theme.breakpoints.reduce(
  (acc, [label, size], i) => ({
    ...acc,
    // max-width media query e.g. mediaqueries.desktop
    [label]: (...args: TemplateStringsArray[]) => css`
      @media (max-width: ${toEm(size)}) {
        ${css(...args)};
      }
    `,
    // min-width media query e.g. mediaqueries.desktop_up
    // This is the breakpoint prior's size +1
    [`${label}_up`]: (...args: TemplateStringsArray[]) => css`
      @media (min-width: ${toEm(theme.breakpoints[i - 1][1] + 1)}) {
        ${css(...args)};
      }
    `,
  }),
  {}
)

// Add media queries for touch etc.
mediaqueries.coarse = (...args: TemplateStringsArray[]) => css`
  @media (pointer: coarse) {
    ${css(...args)};
  }
`

// Add media queries for mouse and trackpad etc.
mediaqueries.fine = (...args: TemplateStringsArray[]) => css`
  @media (pointer: fine) {
    ${css(...args)};
  }
`

export const media = mediaqueries

export default mediaqueries
