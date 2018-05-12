import React from 'react'
import styled from 'styled-components'
import { media } from '@styles'

const Container = styled.div`
  max-width: 1180px;
  margin: 0 auto;
  padding: 2rem;
  background: ${props =>
    props.background === 'dark' ? props.theme.colors.bg : 'transparent'};

  ${media.desktop`
    padding: 5rem 4rem 1rem;
  `};
`

export default Container
