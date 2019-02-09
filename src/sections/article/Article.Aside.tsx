import React, { Component, ReactNode } from 'react'
import styled from 'styled-components'

import HandleOverlap from './Article.HandleOverlap'

import mediaqueries from '@styles/media'
import { clamp } from '@utils'

interface AsideProps {
  children: ReactNode[]
  right?: boolean
  height: number
  offset: number
}

class Aside extends Component<
  AsideProps,
  { value: number; showAside: boolean }
> {
  ticking = false

  state = { value: 0, showAside: true }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll)
    window.addEventListener('onresize', this.onScroll)
  }

  componentDidUpdate(prevProps) {
    /**
     * If the height of the content is less than the screen height we don't
     * want to show a progress indicator because it will be buggy and there's
     * not point to see a progress indicator when you can see all of the content.
     */
    if (this.props.height !== prevProps.height) {
      if (this.props.height < screen.height) {
        this.setState({ showAside: false })
      }
    }
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
          { value: clamp(+percentComplete.toFixed(2), -2, 105) },
          () => (this.ticking = false)
        )
      })
      // Prevent further scrolls triggers
      this.ticking = true
    }
  }

  render() {
    const { children, right } = this.props
    const { showAside, value } = this.state
    const show = showAside && value > -2 && value < 101

    return (
      <Frame right={right}>
        <Align show={show}>
          <HandleOverlap>{children}</HandleOverlap>
        </Align>
      </Frame>
    )
  }
}

export default Aside

const Frame = styled.aside`
  display: flex;
  justify-content: ${p => (p.right ? 'flex-end' : 'flex-start')};
  margin: 0 auto;
  max-width: 1140px;

  ${mediaqueries.desktop_medium`
    display: none;
  `}
`

const Align = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  transform: translateY(0px);
  top: 0;
  height: 100vh;
  z-index: 3;

  opacity: ${p => (p.show ? 1 : 0)};
  visibility: ${p => (p.show ? 'visible' : 'hidden')};
  transition: opacity 0.4s linear, visibility 0.4s linear;
`
