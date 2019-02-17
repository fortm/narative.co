import React, { Component, ReactNode } from 'react'
import styled from 'styled-components'

interface OverlapProps {
  children: ReactNode[]
}

interface OverlapState {
  isOverlapping: boolean
}

/**
 * <HandleOverlap />
 * This is similar to Medium's "show and hide" the sidebar if it's overlapping an
 * element on the page. For our implementation, the only piece of content that can
 * overlap the <Aside /> is an image. and only 1 image at a time!
 *
 * So, this calculates the position of its children and the currently viewable <img />
 * and decides wether or not they're overlapping (with some buffer). If they are overlapping
 * we want to hide the top element.
 */
class HandleOverlap extends Component<OverlapProps, OverlapState> {
  asideRef: React.RefObject<HTMLElement> = React.createRef()
  ticking = false

  state = { isOverlapping: false }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll)
    window.addEventListener('resize', this.onScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll)
    window.removeEventListener('resize', this.onScroll)
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

  // Is the current element within the window's frame? That's all we care about!
  isVisible = (element: HTMLElement): boolean => {
    const rect = element.getBoundingClientRect()

    return rect.top < window.innerHeight && rect.bottom >= 0
  }

  /**
   * This is a nice stackoverflow answer that sums up the overlapping feature. All
   * we've added is a small BUFFER because we don't want it to disppear as it touches.
   * We prefer to start the fade out a few pixels before!
   */
  collide = (fixedElement: HTMLElement, image: HTMLElement): boolean => {
    const BUFFER = 35
    const rect1 = fixedElement.getBoundingClientRect()
    const rect2 = image.getBoundingClientRect()

    return !(
      rect1.top - BUFFER > rect2.bottom ||
      rect1.right < rect2.left ||
      rect1.bottom + BUFFER < rect2.top ||
      rect1.left > rect2.right
    )
  }

  render() {
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
