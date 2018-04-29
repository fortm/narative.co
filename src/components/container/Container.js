import React from 'react'
import styled from 'styled-components'
import { media } from '@styles'

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem;
  background: ${props =>
    props.background === 'dark' ? props.theme.colors.bg : 'transparent'};
`

export default Container
