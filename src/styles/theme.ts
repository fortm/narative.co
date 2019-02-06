/**
 * theme object is used to provide our application with a
 * set of global variables that can be accessed within
 * styled-components. This app theme is passed to the highest
 * level <ThemeProvider /> within src/root/Root.js
 */
import { keyframes } from 'styled-components'

const black = '#262626'
const bg = '#111216'
const grey = '#7a8085'
const red = '#f44336'

const flicker = keyframes`
  0% { opacity: 0.3; }
  50% { opacity: 1; }
  100% { opacity: 0.3; }
`

const transitions = {
  default: 'cubic-bezier(0.23, 1, 0.32, 1)',
  defaultSpeed: '0.25',
  in: 'cubic-bezier(0.47, 0, 0.745, 0.715)',
  inBack: 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
  out: 'cubic-bezier(0.23, 1, 0.32, 1)',
  outBack: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  inOut: 'cubic-bezier(0.86, 0, 0.07, 1)',
  inOutBack: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
}

export const theme = {
  colors: {
    black,
    bg,
    grey,
    red,
  },
  animations: {
    flicker,
  },
  transitions,
  placeholder: {
    dark: 'rgba(0, 0, 0, 0.25)',
    light: 'rgba(0, 0, 0, 0.25)',
  },
  input: {
    border: '#b9bbbe',
  },
  dimensions: {
    tap: 48,
    navigation: '11rem',
    navigationWithMargin: '17rem',
    navigationWithMarginMobile: '10.5rem',
    navigationSlideIn: '6rem',
    narrowContainer: '78rem',
    sectionWidth: '124rem',
    sectionPadding: '5rem',
  },
  fontfamily: {
    sansSerif:
      "'futura-pt', '-apple-system', 'BlinkMacSystemFont', 'San Francisco', 'Helvetica Neue', 'Helvetica', 'Ubuntu', 'Roboto', 'Noto', 'Segoe UI', 'Arial', sans-serif",
    serif: "'ff-meta-serif-web-pro', serif",
  },
  breakpoints: [
    ['phone_small', 320],
    ['phone', 376],
    ['phablet', 540],
    ['tablet', 768],
    ['desktop', 1024],
    ['desktop_large', 1440],
  ],
}

export default theme
