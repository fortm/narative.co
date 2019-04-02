import React, { createContext, useContext, useState, ReactChild } from 'react'
import { navigate } from 'gatsby'
import { getBreakpointFromTheme, getWindowDimensions } from '@utils'

// it returns two components Provider and Consumer
export const ContactContext = createContext({
  showContact: false,
  toggleContact: () => {},
})

export function ContactProvider({ children }: { children: ReactChild }) {
  const [showContact, setShowContact] = useState(false)

  function toggleContact() {
    const { width } = getWindowDimensions()
    const tablet = getBreakpointFromTheme('tablet')

    // If it's greater than tablet and current open, close it!
    if (width > tablet) {
      setShowContact(prevContact => !prevContact)
    } else {
      navigate('/contact')
    }
  }

  return (
    <ContactContext.Provider value={{ showContact, toggleContact }}>
      {children}
    </ContactContext.Provider>
  )
}
