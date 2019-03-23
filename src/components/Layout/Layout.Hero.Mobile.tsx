import React from 'react'
import styled from 'styled-components'

import mediaqueries from '@styles/media'
import {
  getWindowDimensions,
  getBreakpointFromTheme,
  useScrollPosition,
} from '@utils'

export function calculateStyles(position: number): {} {
  const { width, height } = getWindowDimensions()
  const breakpoint = getBreakpointFromTheme('tablet')

  const styles = {
    opacity: 1 - position / height / 0.85,
    transform: `translateY(-${position * 0.2}px)`,
  }

  return width > breakpoint || position <= 0 ? {} : styles
}

function LayoutHeroMobile({ children }) {
  const position = useScrollPosition()

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
    top: 90px;
    position: fixed;
  `}
`
