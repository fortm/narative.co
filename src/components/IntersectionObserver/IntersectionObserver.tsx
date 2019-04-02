/**
 * After using this for a few instances we've slowly come to the
 * conclusion that renderProp IO is not that great. But it's still here :)
 *
 * Use as you wish!
 *
 * <IntersectionObserver
 *   render={data => <div>Your code</div>}
 * />
 */

import React, { Component } from 'react'

interface IntersectionObserverProps {
  element?: HTMLElement
  render: (any) => any
}

interface IntersectionObserverState {
  boundingClientRect: {}
  visiblePercentage: number
  visible: boolean
  entering: boolean
  exiting: boolean
}

class IntersectionObserver extends Component<
  IntersectionObserverProps,
  IntersectionObserverState
> {
  element = React.createRef()

  state = {
    boundingClientRect: {},
    visiblePercentage: 0,
    visible: false,
    entering: false,
    exiting: false,
  }

  componentDidMount() {
    /**
     * Because Gatsby and React have a fun way of dealing with the
     * window and DOM elements we want to indicate we'll be passing
     * an element later by first sending "placeholder". This will bypass
     * setting of an intersection observer until the element has arrived.
     */
    if (this.props.element !== 'placeholder') {
      this.setupObserver()
    }
  }

  componentWillUnmount() {
    if (this.observer && typeof this.observer.disconnect === 'function') {
      this.observer.disconnect()
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.element !== prevProps.element) {
      this.setupObserver()
    }
  }

  setupObserver = () => {
    const $el = this.props.element || this.element.current
    this.observer = new window.IntersectionObserver(entries => {
      const element = entries[0]
      this.handleObservation(element)

      this.hasStartedObservation = true
    }, this.generateObserverOptions())

    this.observer.observe($el)
  }

  handleObservation = element => {
    const boundingClientRect = element.boundingClientRect
    const eventType = boundingClientRect.top > 0 ? 'entering' : 'exiting'
    const visiblePercentage = Math.floor(element.intersectionRatio * 100)

    this.setState({
      boundingClientRect,
      entering: eventType === 'entering',
      exiting: eventType === 'exiting',
      visible: visiblePercentage > 0,
      visiblePercentage,
      intersectionRatio: element.intersectionRatio,
    })
  }

  generateObserverOptions = () => {
    const threshold = []

    for (let i = 0; i <= 1.0; i += 0.01) {
      threshold.push(i)
    }

    // Setting defaults for options, but overriding with props if provided
    return {
      root: null,
      rootMargin: '0px',
      threshold,
      ...this.props.options,
    }
  }

  render() {
    return (
      <div data-component="intersection-observer" ref={this.element}>
        {this.props.render(this.state)}
      </div>
    )
  }
}

export default IntersectionObserver
