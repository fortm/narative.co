import { css } from 'styled-components'

/**
 * blurIn
 * Blurs in the component
 *
 * Usage:
 * Add to styled-component definition
 */
const blurIn = css`
  filter: blur(0);
  transform: scale(1);

  ${props =>
    props.animation !== 'start' &&
    `
    filter: blur(0.5rem);
    transform: scale(1.15);
  `};

  transition: filter 500ms 200ms cubic-bezier(0.694, 0, 0.335, 1),
    opacity 500ms 300ms cubic-bezier(0.694, 0, 0.335, 1),
    transform 10s 3000ms cubic-bezier(0.694, 0, 0.335, 1);
`

/**
 * fadeUp
 * Fades in and Up the selected element.
 *
 * Usage:
 *
 * <Component
 *  animation={animation}
 *  transitionDelay={1000}
 * />
 *
 * Will transition in that element with a delay of 1 second
 */
const fadeUp = css`
  ${props =>
    props.animation !== 'start' &&
    `
    opacity: 0;
    transform: translate3d(0, 1.4rem, 0);
  `};

  transition: all 800ms
    ${props => (props.transitionDelay ? `${props.transitionDelay}ms` : '400ms')}
    cubic-bezier(0.694, 0, 0.335, 1);
`

export const transitions = {
  blurIn,
  fadeUp,
}
