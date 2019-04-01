import { css } from 'styled-components'
import mediaqueries from '@styles/media'

/**
 * blurIn
 * Blurs in the component
 *
 * Usage:
 * Add to styled-component definition
 */
const blurIn = css`
  filter: blur(0);
  opacity: 1;

  ${p =>
    p.animation !== 'start' &&
    `
    opacity: 0;
    filter: blur(0.5rem);
  `};

  transition: filter 600ms 1200ms cubic-bezier(0.694, 0, 0.335, 1),
    opacity 1.2s 1300ms cubic-bezier(0.694, 0, 0.335, 1);
`

const fadeIn = css`
  ${p =>
    p.animation !== 'start' &&
    `
    opacity: 0;
  `};

  transition: opacity 0.6s cubic-bezier(0.215, 0.61, 0.355, 1)
    ${p => (p.transitionDelay ? `${p.transitionDelay}ms` : '')};

  ${mediaqueries.tablet`
      transition: opacity 0.6s
      ${p =>
        p.transitionDelay
          ? `${p.transitionDelayMobile || p.transitionDelay}ms`
          : ''}
      cubic-bezier(0.694, 0, 0.335, 1);
    `}
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
  ${p =>
    p.animation !== 'start' &&
    `
    opacity: 0;
    transform: translate3d(0, 1.4rem, 0);
  `};

  transition: all 800ms
    ${p => (p.transitionDelay ? `${p.transitionDelay}ms` : '')}
    cubic-bezier(0.694, 0, 0.335, 1);

  ${mediaqueries.tablet`
      transition: all 800ms
      ${p =>
        p.transitionDelay
          ? `${p.transitionDelayMobile || p.transitionDelay}ms`
          : ''}
      cubic-bezier(0.694, 0, 0.335, 1);
    `}
`

const fadeUpLong = css`
  ${p =>
    p.animation !== 'start' &&
    `
    opacity: 0;
    transform: translate3d(0, 1rem, 0);
  `};

  transition: opacity ${p => (p.duration ? `${p.duration}ms` : '1100ms')}
      cubic-bezier(0.215, 0.61, 0.355, 1)
      ${p => (p.transitionDelay ? `${p.transitionDelay}ms` : '200ms')},
    transform ${p => (p.duration ? `${p.duration + 200}ms` : '1300ms')}
      cubic-bezier(0.25, 0.46, 0.45, 0.94)
      ${p => (p.transitionDelay ? `${p.transitionDelay}ms` : '200ms')};

  transition: opacity 2.5s cubic-bezier(0.345, 0.045, 0.355, 1)
      ${p => p.transitionDelay && `${p.transitionDelay}ms`},
    transform 2.5s cubic-bezier(0.645, 0.045, 0.355, 1)
      ${p => p.transitionDelay && `${p.transitionDelay}ms`};
`

export const transitions = {
  blurIn,
  fadeIn,
  fadeUp,
  fadeUpLong,
}

export default {
  blurIn,
  fadeIn,
  fadeUp,
  fadeUpLong,
}
