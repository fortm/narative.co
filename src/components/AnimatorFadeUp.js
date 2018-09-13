import React, { Component } from 'react'
import { isMobile } from 'react-device-detect'
import Observer from './Observer'

class AnimatorFadeUp extends Component {
  static defaultProps = {
    enabledOnMobile: false,
  }

  calculateStyleCurves = ({ intersectionRatio, exiting }) => {
    // To avoid NaN errors, return out if there's no intersectionRatio
    if (!intersectionRatio) {
      return { opacity: 0, transform: 0 }
    }

    const opacityCurve = Math.pow(intersectionRatio, 2)
    const transformCurve = Math.pow(intersectionRatio - 1, 2) * 30

    // Only change opacity when scrolling back up
    if (exiting) {
      return {
        opacity: opacityCurve,
      }
    }

    return {
      opacity: opacityCurve,
      transform: ` matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, ${transformCurve}, 0, 1)`,
    }
  }

  render() {
    const { children } = this.props

    if (isMobile) return children

    return (
      <Observer
        render={data => {
          return <div style={this.calculateStyleCurves(data)}>{children}</div>
        }}
      />
    )
  }
}

export default AnimatorFadeUp
