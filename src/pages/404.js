import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'

const NotFoundContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  width: 100vw;

  h1,
  a {
    color: ${props => props.theme.colors.grey};
  }
`

const NotFoundNumber = styled.h1`
  display: flex;
  font-size: 20rem;
`

const NotFoundLink = styled(Link)`
  text-decoration: underline;
  margin-top: 3rem;
`

const NotFoundPage = () => (
  <NotFoundContainer>
    <NotFoundNumber>404</NotFoundNumber>
    <NotFoundLink to="/">home</NotFoundLink>
  </NotFoundContainer>
)

export default NotFoundPage
