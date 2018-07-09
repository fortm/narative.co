import React, { Component } from 'react'
import Observer from './Observer'

class AnimatorFadeUp extends Component {
  calculateStyleCurves = ({ intersectionRatio }) => {
    if (!intersectionRatio) {
      return
    }

    const opacityCurve = Math.pow(intersectionRatio, 3)
    const transformCurve = Math.pow(intersectionRatio - 1, 2) * 150

    return {
      opacity: opacityCurve,
      transform: `translateY(${transformCurve}px)`,
    }
  }

  render() {
    return (
      <Observer
        render={data => (
          <div
            style={this.calculateStyleCurves(data)}
            ref={htmlElement => (this.elem = htmlElement)}
          >
            {this.props.children}
          </div>
        )}
      />
    )
  }
}

export default AnimatorFadeUp
