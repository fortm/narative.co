import React, { Component, memo } from 'react'

import styled from 'styled-components'

import { clamp } from '@utils'

export interface IProgress {
  height: number
  offset: number
  onClose?: () => void
}

class Progress extends Component<IProgress, { value: number; tacks: [] }> {
  ticking = false

  state = { value: 0, tacks: [] }

  componentDidMount() {
    this.handleProgressHeadings()

    window.addEventListener('scroll', this.onScroll)
    window.addEventListener('resize', this.onScroll)
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.onScroll)
      window.removeEventListener('resize', this.onScroll)
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.height !== this.props.height) {
      this.handleProgressHeadings()
    }
  }

  handleProgressHeadings = () => {
    const { height } = this.props
    const h1 = document.querySelector('h1')
    const headings = Array.from(document.querySelectorAll('h2')).reverse()
    headings.push(h1)

    const tacks = headings.map(heading => {
      const offsetTop = heading.offsetTop
      const text = heading.innerText
      const headingOffset = (offsetTop / height) * 100

      return {
        text,
        offset: offsetTop,
        offetPercentage: headingOffset,
      }
    })

    this.setState({ tacks })
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
    const { value, tacks } = this.state
    const progressOffset = { transform: `translateY(${value - 100}%)` }

    return (
      <Frame>
        <Trackline aria-hidden="true" value={value} max={100}>
          <ProgressLine style={progressOffset} />
        </Trackline>
        <Headings>
          <HeadingsHover>
            {tacks.map((tack: string, index: number) => (
              <Heading
                key={tack.text}
                index={index}
                value={value}
                offset={tack.offetPercentage}
                onClick={() => scrollTo(0, tack.offset + this.props.offset)}
              >
                {tack.text}
              </Heading>
            ))}
          </HeadingsHover>
        </Headings>
      </Frame>
    )
  }
}

export default Progress

const Frame = memo(styled.div`
  position: relative;
`)

const Headings = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
`

const HeadingsHover = styled.div`
  position: relative;
  opacity: 0;
  width: 180px;
  height: 100%;
  transition: opacity 0.3s linear;

  &:hover {
    opacity: 1;
  }
`

const Heading = styled.span`
  position: absolute;
  cursor: pointer;
  top: ${p => p.offset}%;
  left: 11px;
  width: 180px;
  line-height: 1.2;
  color: ${p => p.theme.mode.text};
  opacity: ${p =>
    p.value - 6 > p.offset || p.value + 1 < p.offset ? 0.25 : '1 !important'};
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.5;
  }
`

const Trackline = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: calc(88vh - 40px);
  max-height: 480px;
  width: 1px;
  background-color: ${p => p.theme.mode.progress.bg};
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
