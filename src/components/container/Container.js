import React from 'react'
import styled from 'styled-components'
import { media } from '@styles'

const Container = styled.div`
  max-width: 1180px;
  margin: 0 auto;
  padding: 5rem 4rem 0;
  background: ${props =>
    props.background === 'dark' ? props.theme.colors.bg : 'transparent'};

  ${media.large`
    padding: 2rem;
  `};
`

export default Container
