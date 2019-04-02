import React, { useState, useEffect } from 'react'
import throttle from 'lodash/throttle'
import { getBreakpointFromTheme, getWindowDimensions } from '@utils'

interface MediaQueryProps {
  maxWidth?: string
  minWidth?: string
  children: React.ReactNode
}

/**
 * On resize will calculate the screen dimension.
 * based off https://github.com/rehooks/window-size
 */
function useWindowSize() {
  // If we don't check for window a whole lot of crazy build bugs occur!
  if (typeof window !== 'undefined') {
    const [windowSize, setWindowSize] = useState(getWindowDimensions())

    const handleResize = throttle(function() {
      setWindowSize(getWindowDimensions())
    })

    useEffect(() => {
      window.addEventListener('resize', handleResize)
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }, [])

    return windowSize
  }

  // Default to 0 when running gatsby-node (build process)
  return 0
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
function MediaQuery({ maxWidth, minWidth, children }: MediaQueryProps) {
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
