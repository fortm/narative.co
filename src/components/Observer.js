import React, { Component } from 'react'

class Observer extends Component {
  state = {
    visiblePercentage: 0,
    visible: false,
    entering: false,
    exiting: false,
  }

  componentDidMount() {
    this.observer = new window.IntersectionObserver(entries => {
      const element = entries[0]
      this.handleObservation(element)

      this.hasStartedObservation = true
    }, this.generateObserverOptions())

    this.observer.observe(this.elem)
  }

  componentWillUnmount() {
    if (this.observer && typeof this.observer.disconnect === 'function') {
      this.observer.disconnect()
    }
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
      <div ref={htmlElement => (this.elem = htmlElement)}>
        {this.props.render(this.state)}
      </div>
    )
  }
}

export default Observer
