import React, { Component } from 'react'
import styled from 'styled-components'

import mediaqueries from '@styles/media'

export default ({ mode, toggleMode }) => (
  <>
    <ShareButton mode={mode} />
    <DarkModeSelect toggleMode={toggleMode} mode={mode} />
  </>
)

const DarkModeSelect = ({ toggleMode, mode }) => (
  <IconWrapper mode={mode} onClick={toggleMode}>
    <MoonOrSun isDarkMode={mode === 'dark'} />
  </IconWrapper>
)

class ShareButton extends Component {
  state = { hasCopied: false }

  copyToClipboardOnClick = () => {
    if (this.state.hasCopied) return

    const tempInput = document.createElement('input')
    document.body.appendChild(tempInput)
    tempInput.setAttribute('value', window.location.href)
    tempInput.select()
    document.execCommand('copy')
    document.body.removeChild(tempInput)

    this.setState({
      hasCopied: true,
    })

    setTimeout(() => {
      this.setState({ hasCopied: false })
    }, 1000)
  }

  render() {
    const { mode } = this.props
    const Icon = mode === 'dark' ? ShareDarkModeOffIcon : ShareDarkModeOnIcon

    return (
      <IconWrapper mode={mode} onClick={this.copyToClipboardOnClick}>
        <Icon />
        <ToolTip mode={mode} hasCopied={this.state.hasCopied}>
          Copied
        </ToolTip>
      </IconWrapper>
    )
  }
}

const ToolTip = styled.div`
  position: absolute;
  padding: 4px 13px;
  background: ${p => (p.mode === 'dark' ? '#000' : 'rgba(0,0,0,0.1)')};
  color: ${p => p.theme.mode.text};
  border-radius: 5px;
  font-size: 14px;
  top: -35px;
  opacity: ${p => (p.hasCopied ? 1 : 0)};
  transform: ${p => (p.hasCopied ? 'translateY(-3px)' : 'none')};
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -6px;
    margin: 0 auto;
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid
      ${p => (p.mode === 'dark' ? '#000' : 'rgba(0,0,0,0.1)')};
  }
`

const IconWrapper = styled.button`
  opacity: 0.25;
  position: relative;
  border-radius: 5px;
  width: 40px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 44px 0;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }

  ${mediaqueries.tablet`
    display: inline-flex;
    margin: 0 20px 0 0;
    width: 63px;
  `}
`

const ShareDarkModeOffIcon = () => (
  <svg
    width="24"
    height="20"
    viewBox="0 0 24 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2 5C2 3.34328 3.34328 2 5 2H14C15.6567 2 17 3.34328 17 5V9C17 10.6567 15.6567 12 14 12H10C9.44771 12 9 12.4477 9 13C9 13.5523 9.44771 14 10 14H14C16.7613 14 19 11.7613 19 9V5C19 2.23872 16.7613 0 14 0H5C2.23872 0 0 2.23872 0 5V9C0 10.4938 0.656313 11.8361 1.6935 12.7509C2.10768 13.1163 2.73961 13.0767 3.10494 12.6625C3.47028 12.2483 3.43068 11.6164 3.0165 11.2511C2.39169 10.6999 2 9.89621 2 9V5ZM7 11C7 9.34328 8.34328 8 10 8H14C14.5523 8 15 7.55228 15 7C15 6.44772 14.5523 6 14 6H10C7.23872 6 5 8.23872 5 11V15C5 17.7613 7.23872 20 10 20H19C21.7613 20 24 17.7613 24 15V11C24 9.50621 23.3437 8.16393 22.3065 7.24906C21.8923 6.88372 21.2604 6.92332 20.8951 7.3375C20.5297 7.75168 20.5693 8.38361 20.9835 8.74894C21.6083 9.30007 22 10.1038 22 11V15C22 16.6567 20.6567 18 19 18H10C8.34328 18 7 16.6567 7 15V11Z"
      fill="white"
    />
  </svg>
)

const ShareDarkModeOnIcon = () => (
  <svg
    width="24"
    height="20"
    viewBox="0 0 24 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2 5C2 3.34328 3.34328 2 5 2H14C15.6567 2 17 3.34328 17 5V9C17 10.6567 15.6567 12 14 12H10C9.44771 12 9 12.4477 9 13C9 13.5523 9.44771 14 10 14H14C16.7613 14 19 11.7613 19 9V5C19 2.23872 16.7613 0 14 0H5C2.23872 0 0 2.23872 0 5V9C0 10.4938 0.656313 11.8361 1.6935 12.7509C2.10768 13.1163 2.73961 13.0767 3.10494 12.6625C3.47028 12.2483 3.43068 11.6164 3.0165 11.2511C2.39169 10.6999 2 9.89621 2 9V5ZM7 11C7 9.34328 8.34328 8 10 8H14C14.5523 8 15 7.55228 15 7C15 6.44772 14.5523 6 14 6H10C7.23872 6 5 8.23872 5 11V15C5 17.7613 7.23872 20 10 20H19C21.7613 20 24 17.7613 24 15V11C24 9.50621 23.3437 8.16393 22.3065 7.24906C21.8923 6.88372 21.2604 6.92332 20.8951 7.3375C20.5297 7.75168 20.5693 8.38361 20.9835 8.74894C21.6083 9.30007 22 10.1038 22 11V15C22 16.6567 20.6567 18 19 18H10C8.34328 18 7 16.6567 7 15V11Z"
      fill="black"
    />
  </svg>
)

// This is based off a codepen! Much appreciated to: https://codepen.io/aaroniker/pen/KGpXZo
const MoonOrSun = styled.div`
  position: relative;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${p => p.theme.mode.text};
  transform: scale(${p => (p.isDarkMode ? 0.55 : 1)});
  transition: all 0.45s ease;

  ${mediaqueries.tablet`
    width: 20px;
    height: 20px;
  `}

  &::before {
    content: '';
    position: absolute;
    right: -8px;
    top: -8px;
    height: 24px;
    width: 24px;
    background: ${p => p.theme.mode.background};
    border-radius: 50%;
    transform: translate(${p => (p.isDarkMode ? '14px, -14px' : '0, 0')});
    transition: transform 0.45s ease;

    ${mediaqueries.tablet`
      width: 20px;
      height: 20px;
    `}
  }

  &::after {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin: -4px 0 0 -4px;
    position: absolute;
    top: 50%;
    left: 50%;
    box-shadow: 0 -23px 0 ${p => p.theme.mode.text},
      0 23px 0 ${p => p.theme.mode.text}, 23px 0 0 ${p => p.theme.mode.text},
      -23px 0 0 ${p => p.theme.mode.text}, 15px 15px 0 ${p => p.theme.mode.text},
      -15px 15px 0 ${p => p.theme.mode.text},
      15px -15px 0 ${p => p.theme.mode.text},
      -15px -15px 0 ${p => p.theme.mode.text};
    transform: scale(${p => (p.isDarkMode ? 1 : 0)});
    transition: all 0.35s ease;

    ${mediaqueries.tablet`
      transform: scale(${p => (p.isDarkMode ? 0.92 : 0)});
    `}
  }
`
