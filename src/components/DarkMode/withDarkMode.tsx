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
      progress: {
        complete: '#000',
        bg: '#B5B8B9',
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
      progress: {
        complete: '#fff',
        bg: '#7A8085',
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

      if (mode !== this.state.mode) {
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
