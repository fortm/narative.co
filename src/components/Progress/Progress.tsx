import React, { Component, memo } from 'react'

import styled, { css } from 'styled-components'

import mediaqueries from '@styles/media'
import { clamp } from '@utils'

export interface IProgress {
  height: number
  offset: number
  title: string
  onClose?: () => void
}

class Progress extends Component<
  IProgress,
  { value: number; showProgressIndicator: boolean }
> {
  hasEventListener = false
  ticking = false

  state = { value: 0, showProgressIndicator: true }

  componentDidMount() {
    this.toggleEventListener()
  }

  componentDidUpdate(prevProps) {
    /**
     * If the height of the content is less than the screen height we don't
     * want to show a progress indicator because it will be buggy and there's
     * not point to see a progress indicator when you can see all of the content.
     */
    if (this.props.height !== prevProps.height) {
      if (this.props.height < screen.height) {
        this.setState({ showProgressIndicator: false })
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll)
  }

  /**
   * Once our article's body area enters the viewport we want
   * to add a passive scroll event listener. Once the element
   * leaves the viewport we'll take this event listener off
   */
  toggleEventListener = () => {
    // If it's an unlisten then remove the event listener
    if (this.hasEventListener) {
      return window.removeEventListener('scroll', this.onScroll)
    }

    // Otherwise we want to add our event listener
    window.addEventListener('scroll', this.onScroll)
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
          { value: clamp(+percentComplete.toFixed(2), -2, 105) },
          () => (this.ticking = false)
        )
      })
      // Prevent further scrolls triggers
      this.ticking = true
    }
  }

  render = () => {
    const { showProgressIndicator, value } = this.state
    const tacks = Array(4).fill()
    const show = showProgressIndicator && value > -1 && value < 101
    const progressOffset = { transform: `translateY(${value - 100}%)` }

    return (
      <Frame show={show}>
        <Trackline aria-hidden="true" value={value} max={100}>
          <ProgressLine style={progressOffset} />
        </Trackline>
        <Tracks>
          {tacks.map((tack, index) => (
            <Tack index={index} value={value} total={tacks.length} />
          ))}
        </Tracks>
      </Frame>
    )
  }
}

export default Progress

const Frame = styled.div`
  position: relative;
  opacity: ${p => (p.show ? 0.5 : 0)};
  transition: opacity 0.33s;
`

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
  height: calc(88vh - 180px);
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
