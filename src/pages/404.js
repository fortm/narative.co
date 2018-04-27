import React from 'react'
import Link from 'gatsby-link'
import styled, { ThemeProvider } from 'styled-components'
import theme from '../styles/theme'

const NotFoundContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  color: ${props => props.theme.colors.grey};
`

const NotFoundNumber = styled.h1`
  display: flex;
  font-size: 20rem;
  color: ${props => props.theme.colors.grey};
`

const NotFoundLink = styled(Link)`
  text-decoration: underline;
  margin-top: 3rem;
`

const NotFoundPage = () => (
  <ThemeProvider theme={theme}>
    <NotFoundContainer>
      <NotFoundNumber>404</NotFoundNumber>
      <NotFoundLink to="/">home</NotFoundLink>
    </NotFoundContainer>
  </ThemeProvider>
)

export default NotFoundPage
