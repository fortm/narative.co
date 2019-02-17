import React from 'react'

import { ThemeProvider } from 'styled-components'
import { GlobalStyles, theme } from '@styles'

import Container from '@components/Layout/Layout.Container'

interface LayoutProps {
  background?: string
  nav: {
    fixed?: boolean
    offset?: boolean
    theme?: string
  }
}

/**
 * <Layout /> needs to wrap every page as it provides styles, navigation,
 * and the main structure of each page. Within Layout we have the <Container />
 * which hides a lot of the mess we need to create our Desktop and Mobile experiences.
 */
const Layout = ({ children, ...rest }: LayoutProps) => (
  <ThemeProvider theme={theme}>
    <>
      <GlobalStyles />
      <Container {...rest}>{children}</Container>
    </>
  </ThemeProvider>
)

export default Layout
