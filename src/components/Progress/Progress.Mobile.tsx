import React, { Component } from 'react'

import { ellipsis } from 'polished'
import styled from 'styled-components'
import { Link } from 'gatsby'

import Section from '@components/Section'
import mediaqueries from '@styles/media'
import { clamp } from '@utils'
import { ExIcon } from '../../icons/ui'

import { IProgress } from '@typings'

class Progress extends Component<
  IProgress,
  { value: number; showProgressIndicator: boolean }
> {
  hasEventListener = false
  ticking = false
  frameRef: React.RefObject<HTMLDivElement> = React.createRef()

  state = { value: 0, showProgressIndicator: true }

  get $frame() {
    return this.frameRef.current!
  }

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
          ((window.scrollY - this.props.offset) / (this.props.height - 50)) *
          100

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
    const { mode, title } = this.props
    const { showProgressIndicator, value } = this.state
    const isStuck = showProgressIndicator && value > 0 && value < 100
    const fill = mode === 'dark' ? '#fff' : '#000'

    return (
      <Frame aria-hidden="true" ref={this.frameRef} stuck={isStuck}>
        <Content narrow>
          <Title>{title}</Title>
          <OnCloser to="/articles">
            <ExIcon fill={fill} />
          </OnCloser>
        </Content>
        <Trackline value={value} max={100} />
      </Frame>
    )
  }
}

export default Progress

const Frame = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: ${p => p.theme.mode.progress.mobile.bg};
  z-index: 1;
  font-size: 1.2rem;
  line-height: 1;
  transition: transform 300ms var(--ease-out-quad), opacity 120ms;
  transform: translateY(-100%);
  opacity: 0;

  ${p =>
    p.stuck &&
    `
    opacity: 1;
    transform: none;
    transition: transform 400ms var(--ease-in-out-quad), opacity 300ms;
  `}

  ${mediaqueries.desktop_large_up`
    display: none;
    visibility: hidden;
    opacity: 0;
  `}
`

const Content = styled(Section)`
  ${mediaqueries.desktop_large`
    display: flex;
    justify-content: space-between;
  `}
`

const Title = styled.span`
  padding: 2rem 0;
  font-size: 16px;
  ${ellipsis()}
  display: block;
  color: ${p => p.theme.mode.text};
`

const OnCloser = styled(Link)`
  display: flex;
  align-items: center;
  padding-left: 2rem;
`

const Trackline = styled.progress`
  &[value] {
    appearance: none;
    width: 100%;
    height: 1px;
    position: absolute;
    bottom: 0;
  }

  &[value]::-webkit-progress-bar {
    background-color: ${p => p.theme.mode.progress.mobile.incomplete};
    height: 0.1rem;
  }

  &[value]::-webkit-progress-value {
    background-color: ${p => p.theme.mode.progress.mobile.complete};
    height: 1px;
    position: relative;
    top: -0.1rem;
  }
`
