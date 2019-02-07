import React, { Component, memo } from 'react'

import styled from 'styled-components'

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
          ((window.scrollY - this.props.offset) / this.props.height) * 100

        this.setState(
          { value: clamp(+percentComplete.toFixed(2), 0, 100) },
          () => (this.ticking = false)
        )
      })
      // Prevent further scrolls triggers
      this.ticking = true
    }
  }

  render = () => {
    const { value } = this.state
    const tacks = [0, 1, 2, 4]
    return (
      <Frame>
        <Trackline aria-hidden="true" value={value} max={100} />

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
  opacity: 0.5;
`

const Tracks = styled.div`
  position: absolute;
  height: 100%;
  display: flex;
  justify-content: space-between;

  width: calc(100vh - 120px);
  position: absolute;
  transform: rotate(90deg);
  position: absolute;
  top: calc(50% + 30px);
  left: 50%;

  transform: translateX(-50%) translateY(-50%) rotate(90deg);
`

const Tack = styled.span`
  height: 6px;
  width: 1px;
  position: relative;
  top: -3px;
  background-color: ${p =>
    p.index * (100 / (p.total - 1)) < p.value ? '#fff' : p.theme.colors.grey};
`

const Trackline = styled.progress`
  display: flex;
  flex-direction: column;

  &[value] {
    appearance: none;
    width: calc(100vh - 120px);
    height: 0.1rem;
    position: absolute;
    transform: rotate(90deg);
    position: absolute;
    top: calc(50% + 30px);
    left: 50%;

    transform: translateX(-50%) translateY(-50%) rotate(90deg);
  }

  &[value]::-webkit-progress-bar {
    background-color: ${p => p.theme.colors.grey};
    height: 0.1rem;
  }

  &[value]::-webkit-progress-value {
    background-color: #fff;
    height: 0.1rem;
    position: relative;
    top: 0rem;
  }
`
