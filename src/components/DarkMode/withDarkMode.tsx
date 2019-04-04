import React, { Component } from 'react'
import { ThemeProvider } from 'styled-components'

/**
 * withDarkMode() HOC
 *
 * To be used once per page. DO NOT use this on nested children of the current
 * HOC as you will run into state issues. Please pass down props as necessary.
 *
 * TODO: This is a candidate for using Context. It really shouldn't be a HOC
 * that relies on prop drilling :).
 */
const themes = {
  light: {
    mode: {
      gradient: 'linear-gradient(180deg, #fff 66%, #D9DBE0 100%)',
      background: '#fff',
      text: '#000',
      hover: '#6166DC',
      color: '#000',
      links: '#6166DC',
      hr:
        "data:image/svg+xml,%3Csvg width='10' height='15' viewBox='0 0 10 15' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0.567383' y='14.1777' width='16' height='1' transform='rotate(-60 0.567383 14.1777)' fill='%232D2E33'/%3E%3C/svg%3E",
      progress: {
        complete: '#000',
        bg: '#B5B8B9',
        mobile: {
          complete: '#08080B',
          incomplete: '#EAEAEA',
          bg: '#fafafa',
        },
      },
      preview: {
        bg: '#fff',
      },
    },
  },
  dark: {
    mode: {
      gradient: 'linear-gradient(180deg, #111216 30%, #191D23 100%)',
      background: '#111216',
      text: '#fff',
      hover: '#E9DAAC',
      color: '#fff',
      links: '#E9DAAC',
      hr:
        "data:image/svg+xml,%3Csvg width='10' height='15' viewBox='0 0 10 15' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0.432617' y='13.8564' width='16' height='1' transform='rotate(-60 0.432617 13.8564)' fill='%2350525B'/%3E%3C/svg%3E%0A",
      progress: {
        complete: '#fff',
        bg: '#7A8085',
        mobile: {
          complete: '#B5B8B9',
          incomplete: '#1B1B1B',
          bg: 'rgba(0,0,0,0.92)',
        },
      },
      preview: {
        bg: '#1D2128',
      },
    },
  },
}

function withDarkMode(WrappedComponent) {
  return class DarkAndLight extends Component {
    // We default to light mode!
    state = { mode: 'light' }

    componentDidMount() {
      const mode = localStorage.getItem('mode')

      if (mode === 'dark') {
        this.toggleMode()
      }
    }

    toggleMode = () => {
      const mode = this.state.mode === 'dark' ? 'light' : 'dark'

      this.setState({ mode }, () => localStorage.setItem('mode', mode))
    }

    render() {
      const theme = themes[this.state.mode]

      return (
        <ThemeProvider theme={theme}>
          <WrappedComponent
            toggleMode={this.toggleMode}
            mode={this.state.mode}
            {...this.props}
          />
        </ThemeProvider>
      )
    }
  }
}

export default withDarkMode
