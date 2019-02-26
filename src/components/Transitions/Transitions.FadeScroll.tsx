import React, { Component } from 'react'
import { isMobile } from 'react-device-detect'
import { IntersectionObserver } from '@components'

/**
 * <TransitionsFadeScroll />
 *
 * As the element scrolls on and off screen we want to fade it in and out
 * depending on the intersectionRatio.
 */
class TransitionsFadeScroll extends Component<{
  children: React.ReactNode
  enabledOnMobile?: boolean
}> {
  static defaultProps = {
    enabledOnMobile: false,
  }

  calculateStyleCurves = ({ intersectionRatio, exiting, ...rest }) => {
    // To avoid NaN errors, return out if there's no intersectionRatio
    if (!intersectionRatio) {
      return { opacity: 0, transform: 0 }
    }

    const opacityCurve = Math.pow(intersectionRatio, 2)
    const transformCurve = Math.pow(intersectionRatio - 1, 2) * 15

    // Only change transform when scrolling back up
    if (exiting) {
      return {
        opacity: opacityCurve,
      }
    }

    return {
      opacity: opacityCurve,
    }
  }

  render() {
    const { children } = this.props

    if (isMobile) return children

    return (
      <IntersectionObserver
        render={data => (
          <div style={this.calculateStyleCurves(data)}>{children}</div>
        )}
      />
    )
  }
}

export default TransitionsFadeScroll
