import React, { Component } from 'react'
import IntersectionObserver from './IntersectionObserver'

class AnimateScrollFadeUp extends Component {
  state = {}

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <IntersectionObserver
        render={data => {
          const { intersectionRatio } = data
          const opacityCurve = Math.pow(intersectionRatio, 3)
          const transformCurve = `translateY(${Math.pow(
            intersectionRatio - 1,
            2
          ) * 150}px)`

          console.log({ opacityCurve, transformCurve })

          return (
            <div
              style={{
                opacity: opacityCurve,
                transform: transformCurve,
              }}
              ref={htmlElement => (this.elem = htmlElement)}
            >
              {this.props.children}
            </div>
          )
        }}
      />
    )
  }
}

export default AnimateScrollFadeUp
