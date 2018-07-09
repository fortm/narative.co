import React, { Component } from 'react'
import Observer from './Observer'

class AnimatorFadeUp extends Component {
  calculateStyleCurves = ({ intersectionRatio, exiting }) => {
    // To avoid NaN errors, return out if there's no intersectionRatio
    if (!intersectionRatio) {
      return {}
    }

    const opacityCurve = Math.pow(intersectionRatio, 3)
    const transformCurve = Math.pow(intersectionRatio - 1, 2) * 200

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
    return (
      <Observer
        render={data => (
          <div style={this.calculateStyleCurves(data)}>
            {this.props.children}
          </div>
        )}
      />
    )
  }
}

export default AnimatorFadeUp
