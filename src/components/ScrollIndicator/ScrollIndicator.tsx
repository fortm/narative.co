import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import throttle from 'lodash/throttle'

function calculateWindowOffset() {
  return (
    window.scrollY ||
    window.scrollTop ||
    document.getElementsByTagName('html')[0].scrollTop
  )
}

function useWindowOffset() {
  if (typeof window === 'undefined') return 0

  const [windowOffset, setWindowSize] = useState(0)

  useEffect(() => {
    const handleScroll = throttle(
      () => setWindowSize(calculateWindowOffset()),
      15
    )

    // We don't want to add the listener beyond the height of the indicator
    if (windowOffset < 90) {
      window.addEventListener('scroll', handleScroll)
      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  return windowOffset
}

const ScrollIndicator = ({
  mode,
  disableScrollAnimation,
}: {
  mode?: string
  disableScrollAnimation?: boolean
}) => {
  const offset = useWindowOffset()
  const [mounted, setMounted] = useState(false)
  const [delayed, setDelayed] = useState(false)

  const barStyles =
    offset && !disableScrollAnimation
      ? { transform: `translateY(${offset}px) ` }
      : {}
  const frameStyles =
    offset && !disableScrollAnimation
      ? { transform: `scaleY(${1 - offset / 90})` }
      : {}

  useEffect(() => {
    if (!mounted) setMounted(true)
    if (!delayed) {
      setTimeout(() => {
        setDelayed(true)
      }, 1625)
    }
  }, [])

  return (
    <Frame>
      <Background style={frameStyles} mode={mode} />
      <Bar
        style={barStyles}
        mode={mode}
        mounted={mounted}
        offset={offset}
        delayed={delayed}
      />
    </Frame>
  )
}

export default ScrollIndicator

const Frame = styled.div`
  position: relative;
  width: 1px;
  height: 90px;
  overflow: hidden;
  z-index: 10;
`

const Background = styled.div`
  position: relative;
  width: 1px;
  height: 90px;
  background: ${p =>
    p.mode === 'dark' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)'};
  transform-origin: bottom;
`

const Bar = styled.div`
  position: absolute;
  width: 1px;
  height: 30px;
  top: 0;
  background: ${p => (p.mode === 'dark' ? '#000' : '#fff')};
  transform: translateY(${p => (p.mounted ? 0 : '60px')});
  transform-origin: bottom;
  ${p =>
    !p.delayed &&
    `transition: transform 1.4s cubic-bezier(0.694, 0, 0.335, 1) 0.25s;`}
`
