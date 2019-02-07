import React, { Component } from 'react'
import { ThemeProvider } from 'styled-components'

const themes = {
  light: {
    mode: {
      gradient: 'linear-gradient(180deg, #fff 90%, #D9DBE0 100%)',
      background: '#fff',
      text: '#000',
      links: '#6166DC',
    },
  },
  dark: {
    mode: {
      gradient:
        'linear-gradient(180deg, #111216 0%, #111216 90%, #191d23 100%);',
      background: '#000',
      text: '#fff',
      links: '#E9DAAC',
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
      console.log(theme)
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
