import React, { Component } from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'
import Flipping from 'flipping'

const Yolo = styled.div`
  border: 1px solid red;
  transition: all 300ms ease;

  &[data-state='loading'] {
    transform: translateX(0) scaleX(0.4);
  }
  &[data-state='half'] {
    transform: translateX(20%) scaleX(1);
  }
  &[data-state='full'] {
    transform: translateX(10%) scaleX(0);
  }
`

const flipping = new Flipping()

const machine = {
  initial: 'loading',
  states: {
    loading: {
      on: { DATA_LOADED: 'half' },
    },
    half: {
      on: { SHOW_EMAILS: 'full' },
    },
    full: {
      on: { CLICK: 'loading' },
    },
  },
}

let currentState = machine.initial

const transition = (state, event) => {
  return machine.states[state].on[event] || state
}

class AnimatedProcess extends Component {
  constructor(props) {
    super(props)
    this.animation = React.createRef()
  }

  componentDidMount() {
    document.body.addEventListener('click', () => {
      this.send('CLICK')
      this.startSequence()
    })
  }

  startSequence = () => {
    setTimeout(() => {
      this.send('DATA_LOADED')
    }, 3500)

    setTimeout(() => {
      this.send('SHOW_EMAILS')
    }, 4500)
  }

  send = event => {
    currentState = transition(currentState, event)

    flipping.read()
    this.animation.current.setAttribute('data-state', currentState)
    flipping.flip()
  }

  render() {
    return (
      <div>
        <h1>
          <Link to="/">{this.props.siteTitle}</Link>
          <Yolo data-state="loading" innerRef={this.animation}>
            Hello
          </Yolo>
        </h1>
      </div>
    )
  }
}

export default AnimatedProcess
