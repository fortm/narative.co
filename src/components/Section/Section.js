import styled from 'styled-components'

import media from '@styles/media'

const Section = styled.section`
  max-width: 1220px;
  margin: 0 auto;
  padding: 0 4rem;
  background: ${p =>
    p.background === 'dark' ? p.theme.colors.bg : 'transparent'};
  display: ${p => (p.hideOnDesktop ? 'none' : 'block')};

  ${media.desktop`
    max-width: 100%;
    display: ${p => (p.hideOnDesktop ? 'none' : 'block')};
  `};

  ${media.tablet`
    display: block;
  `};

  ${media.phablet`
    max-width: 100%;
    ${p => p.hideOverflow && `overflow: hidden`};
  `};

  ${media.phablet`
    padding: 0 4rem;
  `};
`

export default Section
