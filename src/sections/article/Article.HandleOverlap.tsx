import React, { Component, ReactNode } from 'react'
import styled from 'styled-components'

interface OverlapProps {
  children: ReactNode[]
}

interface OverlapState {
  isOverlapping: boolean
}

class HandleOverlap extends Component<OverlapProps, OverlapState> {
  asideRef: React.RefObject<HTMLElement> = React.createRef()
  ticking = false

  state = { isOverlapping: false }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll)
    window.addEventListener('onresize', this.onScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll)
    window.removeEventListener('onresize', this.onScroll)
  }

  onScroll = () => {
    if (!this.ticking) {
      // RAF and make our progress calculation
      // on callback of the setState clear the thread
      window.requestAnimationFrame(() => {
        const images = [].slice.call(document.querySelectorAll('img'))
        const noImagesAreVisible = !images.some(this.isVisible)

        images.forEach(
          (image: HTMLElement): void | null => {
            if (noImagesAreVisible) {
              return this.setState(
                {
                  isOverlapping: this.collide(this.asideRef.current, image),
                },
                () => (this.ticking = false)
              )
            }
            /**
             * If the image is not in the viewport don't fire state events for it,
             * otherwise we run into issues with multiple images on the page.
             */
            if (!this.isVisible(image)) {
              this.ticking = false
              return null
            }

            this.setState(
              {
                isOverlapping: this.collide(this.asideRef.current, image),
              },
              () => (this.ticking = false)
            )
          }
        )
      })
      // Prevent further scrolls triggers
      this.ticking = true
    }
  }

  isVisible = (element: HTMLElement): boolean => {
    const rect = element.getBoundingClientRect()

    return rect.top < window.innerHeight && rect.bottom >= 0
  }

  collide = (fixedElement: HTMLElement, image: HTMLElement): boolean => {
    const rect1 = fixedElement.getBoundingClientRect()
    const rect2 = image.getBoundingClientRect()
    const buffer = 35

    return !(
      rect1.top - buffer > rect2.bottom ||
      rect1.right < rect2.left ||
      rect1.bottom + buffer < rect2.top ||
      rect1.left > rect2.right
    )
  }

  render() {
    // console.log(this.state.isOverlapping)
    return (
      <Frame isOverlapping={this.state.isOverlapping} ref={this.asideRef}>
        {this.props.children}
      </Frame>
    )
  }
}

export default HandleOverlap

const Frame = styled.div`
  opacity: ${p => (p.isOverlapping ? 0 : 1)};
  transition: opacity 0.3s;
`
