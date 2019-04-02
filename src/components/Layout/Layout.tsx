import React from 'react'

import { ThemeProvider } from 'styled-components'
import { GlobalStyles, theme } from '@styles'

import Container from '@components/Layout/Layout.Container'
import { ContactProvider } from '@components/Contact/Contact.Context'
import ContactSlideIn from '@components/Contact/Contact.SlideIn'

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
    <ContactProvider>
      <>
        <GlobalStyles />
        <Container {...rest}>{children}</Container>
        <ContactSlideIn />
      </>
    </ContactProvider>
  </ThemeProvider>
)

export default Layout
