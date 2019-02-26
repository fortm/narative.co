import React, { Component } from 'react'
import styled from 'styled-components'

interface StickyProps {
  children: React.Children
  height: number
  top?: number
}

interface StickyState {
  position: number
  progress: number
}

class Sticky extends Component<StickProps, StickyState> {
  element = React.createRef()

  state = {
    position: 0,
    progress: 0,
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    const $el = this.element.current

    const scrollPosition = window.pageYOffset || window.scrollY
    const topOfElement = $el.offsetTop
    const topOfElementRelativeToDoc = $el.getBoundingClientRect().top
    const heightOfElement = $el.getBoundingClientRect().height

    const scrollPositionRelativeToContainer =
      scrollPosition - topOfElementRelativeToDoc

    const viewportHeight = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    )

    const position =
      scrollPositionRelativeToContainer < 0
        ? 0
        : scrollPositionRelativeToContainer

    const progressOverElement =
      (scrollPosition - topOfElement) / (heightOfElement - viewportHeight) || 0

    const progress = progressOverElement > 1 ? 1 : progressOverElement

    this.setState({ position, progress })
  }

  render() {
    const { height, render, top } = this.props

    return (
      <div ref={this.element} data-component="ScrollProvider">
        <StickyDuration height={height}>
          <StickyItemContainer>
            <StickyItem top={top}>{this.props.render(this.state)}</StickyItem>
          </StickyItemContainer>
        </StickyDuration>
      </div>
    )
  }
}

export default Sticky

const StickyDuration = styled.div`
  height: ${p => p.height || '100vh'};
`

const StickyItemContainer = styled.div`
  height: 100%;
`

const StickyItem = styled.div`
  position: sticky;
  z-index: 1;
  top: ${p => p.top || 0}px;
  min-height: initial;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`
