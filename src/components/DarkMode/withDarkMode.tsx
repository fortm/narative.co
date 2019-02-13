import React, { Component } from 'react'
import { ThemeProvider } from 'styled-components'

const themes = {
  light: {
    mode: {
      gradient: 'linear-gradient(180deg, #fff 80%, #D9DBE0 100%)',
      background: '#fff',
      text: '#000',
      color: '#000',
      links: '#6166DC',
      progress: {
        complete: '#000',
        bg: '#B5B8B9',
      },
    },
  },
  dark: {
    mode: {
      gradient:
        'linear-gradient(180deg, #111216 29.86%, rgba(66, 81, 98, 0.36) 272.57%)',
      background: '#111216',
      text: '#fff',
      color: '#fff',
      links: '#E9DAAC',
      progress: {
        complete: '#fff',
        bg: '#7A8085',
      },
    },
  },
}

function withDarkMode(WrappedComponent) {
  return class DarkAndLight extends Component {
    state = { mode: 'dark' }

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
