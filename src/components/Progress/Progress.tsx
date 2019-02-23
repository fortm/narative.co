import React, { Component, memo } from 'react'
import styled from 'styled-components'

import { clamp } from '@utils'

export interface IProgress {
  height: number
  offset: number
  onClose?: () => void
}

class Progress extends Component<IProgress, { value: number; headings: [] }> {
  ticking = false

  state = { value: 0, headings: [] }

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
    if (
      prevProps.offset !== this.props.offset ||
      prevProps.height !== this.props.height
    ) {
      this.handleProgressHeadings()
    }
  }

  handleProgressHeadings = () => {
    const { height } = this.props
    const titleHeading = document.querySelector('h1')
    const allHeadings = Array.from(document.querySelectorAll('h2')).reverse()
    allHeadings.push(titleHeading)

    const headings = allHeadings
      .map(heading => {
        const offsetTop = heading.offsetTop
        const text = heading.innerText
        const headingOffset = (offsetTop / height) * 100

        return {
          text,
          offset: offsetTop,
          offetPercentage: headingOffset,
        }
      })
      .reverse()

    this.setState({ headings })
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
    const { value, headings } = this.state
    const progressOffset = { transform: `translateY(${value - 100}%)` }

    return (
      <Frame>
        <Trackline aria-hidden="true" value={value} max={100}>
          <ProgressLine style={progressOffset} />
        </Trackline>
        <Headings>
          <HeadingsHover>
            {headings.map((heading: string, index: number) => {
              const previousOffset = headings[index - 1]
                ? headings[index - 1].offetPercentage
                : 0
              const nextOffset = headings[index + 1]
                ? headings[index + 1].offetPercentage
                : 100

              return (
                <Heading
                  key={heading.text}
                  index={index}
                  value={value}
                  offset={heading.offetPercentage}
                  previousOffset={previousOffset}
                  nextOffset={nextOffset}
                  onClick={() =>
                    scrollTo(0, heading.offset + this.props.offset)
                  }
                >
                  {heading.text}
                </Heading>
              )
            })}
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
  width: 200px;
  height: 100%;
  transition: opacity 0.5s linear 0.2s;

  &:hover {
    opacity: 1;
    transition: opacity 0.3s linear;
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
    p.value > p.previousOffset && p.value > p.offset && p.value < p.nextOffset
      ? '1 !important'
      : 0.25};
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
