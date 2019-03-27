import React from 'react'
import styled from 'styled-components'

import mediaqueries from '@styles/media'
import {
  clamp,
  getWindowDimensions,
  getBreakpointFromTheme,
  useScrollPosition,
} from '@utils'

export function calculateStyles(position: number): {} {
  const { width, height } = getWindowDimensions()
  const breakpoint = getBreakpointFromTheme('tablet')

  const styles = {
    opacity: 1 - position / height / 0.8,
    transform: `translateY(-${position * 0.22}px)`,
  }

  return width > breakpoint || position <= 0 ? {} : styles
}

function LayoutHeroMobile({ children }) {
  const position = clamp(useScrollPosition(), 0, 1000)

  return (
    <>
      <Spacer />
      <Frame style={calculateStyles(position)}>{children}</Frame>
    </>
  )
}

export default LayoutHeroMobile

const Spacer = styled.div`
  ${mediaqueries.tablet`
    height: 100vh;
  `}
`

const Frame = styled.div`
  ${mediaqueries.tablet`
    height: 100vh;
    min-height: 550px;
    top: 90px;
    position: fixed;
    z-index: 0;

    @media screen and (max-height: 600px) {
      padding-top: 60px;
    }
  `}
`
