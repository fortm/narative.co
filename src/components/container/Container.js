import React from 'react'
import styled from 'styled-components'
import { media } from '@styles'

const Container = styled.div`
  max-width: 1180px;
  margin: 0 auto;
  padding: 5rem 4rem 1rem;
  background: ${props =>
    props.background === 'dark' ? props.theme.colors.bg : 'transparent'};

  ${media.large`
    padding: 2rem;
  `};

  ${media.largest`
    max-width: 1440px;
  `};
`

export default Container
