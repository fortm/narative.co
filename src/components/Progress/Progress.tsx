import React, { Component, memo } from 'react'

import styled from 'styled-components'

import { clamp } from '@utils'

export interface IProgress {
  height: number
  offset: number
  onClose?: () => void
}

class Progress extends Component<IProgress, { value: number }> {
  ticking = false

  state = { value: 0 }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll)
    window.addEventListener('onresize', this.onScroll)
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.onScroll)
      window.removeEventListener('onresize', this.onScroll)
    }
  }

  onScroll = (event: Event) => {
    if (!this.ticking) {
      // RAF and make our progress calculation
      // on callback of the setState clear the thread
      window.requestAnimationFrame(() => {
        const percentComplete =
          ((window.scrollY - this.props.offset) /
            (this.props.height - this.props.offset)) *
          100

        this.setState(
          { value: clamp(+percentComplete.toFixed(2), -2, 104) },
          () => (this.ticking = false)
        )
      })
      // Prevent further scrolls triggers
      this.ticking = true
    }
  }

  render = () => {
    const { value } = this.state
    const tacks = Array(4).fill('')
    const progressOffset = { transform: `translateY(${value - 100}%)` }

    return (
      <Frame>
        <Trackline aria-hidden="true" value={value} max={100}>
          <ProgressLine style={progressOffset} />
        </Trackline>
        <Tracks>
          {tacks.map((tack: string, index: number) => (
            <Tack
              key={index}
              index={index}
              value={value}
              total={tacks.length}
            />
          ))}
        </Tracks>
      </Frame>
    )
  }
}

export default Progress

const Frame = memo(styled.div`
  position: relative;
`)

const Tracks = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Tack = styled.span`
  position: relative;
  width: 6px;
  height: 1px;
  right: 3px;
  background-color: ${p =>
    p.index * (99.9 / (p.total - 1)) <= p.value
      ? p.theme.mode.text
      : p.theme.colors.grey};
  transition: background 0.2s;
`

const Trackline = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: calc(88vh - 40px);
  max-height: 480px;
  width: 1px;
  background-color: ${p => p.theme.colors.grey};
  overflow: hidden;
`

const ProgressLine = styled.div`
  position: absolute;
  height: 100%;
  top: 0%;
  transform: translateY(${p => p.offset - 100}%);
  width: 1px;
  background-color: ${p => p.theme.mode.text};
  left: 0;
`
