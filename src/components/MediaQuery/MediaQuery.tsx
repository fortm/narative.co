import { useState, useEffect } from 'react'
import { getBreakpointFromTheme, getWindowDimensions } from '@utils'

interface ShowProps {
  maxWidth?: string
  minWidth?: string
  children: React.ReactNode
}

/**
 * On resize will calculate the screen dimension.
 * based off https://github.com/rehooks/window-size
 */
function useWindowSize() {
  const [windowSize, setWindowSize] = useState(getWindowDimensions())

  function handleResize() {
    setWindowSize(getWindowDimensions())
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return windowSize
}

/**
 * // Will show its children on 768px and greater!
 * <MediaQuery minWidth="tablet">
 *  {children}
 * </MediaQuery>
 *
 * A gateway component used to show and hide components on at different screen widths.
 * This component will show everything GREATER THAN or EQUAL to the breakpoint passed in.
 *
 * It's tied to mediaqueries set in theme.ts.
 */
function MediaQuery({ maxWidth, minWidth, children }) {
  const { width: windowWidth } = useWindowSize()

  const on = maxWidth || minWidth
  const breakpoint = on ? getBreakpointFromTheme(on.toLowerCase()) : Infinity

  // maxWidth will render anything SMALLER than the breakpoint
  if (maxWidth && breakpoint > windowWidth) {
    return children
  }

  // minWidth will render anything GREATER than the breakpoint
  if (minWidth && breakpoint < windowWidth) {
    return children
  }

  return null
}

export default MediaQuery
