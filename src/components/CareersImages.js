import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'

import Observer from './Observer'
import HorizontalScroll from './HorizontalScroll'
import { media } from '@styles'

class CareersImages extends Component {
  state = {
    activeIndex: 0,
    disabled: false,
    inView: false,
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress)
  }

  componentWillMount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('keydown', this.handleKeyPress)
    }
  }

  handleKeyPress = ({ keyCode }) => {
    const leftKeyCode = 37
    const rightKeyCode = 39

    if (keyCode === leftKeyCode) {
      this.handlePrevClick()
    }
    if (keyCode === rightKeyCode) {
      this.handleNextClick()
    }
  }

  handleNextClick = () => {
    if (
      this.state.activeIndex === this.props.images.length / 2 - 1 ||
      this.state.disabled
    ) {
      return
    }

    this.setState({
      activeIndex: this.state.activeIndex + 1,
      disabled: true,
    })

    setTimeout(() => {
      this.setState({ disabled: false })
    }, 600)
  }

  handlePrevClick = () => {
    if (this.state.activeIndex === 0 || this.state.disabled) {
      return
    }

    this.setState({
      activeIndex: this.state.activeIndex - 1,
      disabled: true,
    })

    setTimeout(() => {
      this.setState({ disabled: false })
    }, 600)
  }

  render() {
    const { activeIndex } = this.state
    const offset = activeIndex * 72 * -1

    return (
      <Fragment>
        <CareersImagesContainer>
          <Observer
            render={({ visiblePercentage }) => {
              if (visiblePercentage > 60 && !this.state.inView) {
                this.setState({ inView: true })
              }

              return (
                <GalleryContainer
                  style={{ transform: `translateX(${offset}rem)` }}
                >
                  {this.props.images.map((image, index) => (
                    <ImageContainer
                      key={image.node.childImageSharp.sizes.src}
                      index={index}
                      inView={this.state.inView}
                      style={{ left: `${index * 36}rem` }}
                    >
                      <Img sizes={image.node.childImageSharp.sizes} />
                    </ImageContainer>
                  ))}
                </GalleryContainer>
              )
            }}
          />
          <GalleryControl
            disabled={activeIndex === 0}
            onClick={this.handlePrevClick}
            left
          >
            <ChevronLeft />
          </GalleryControl>
          <GalleryControl
            disabled={activeIndex === this.props.images.length / 2 - 1}
            onClick={this.handleNextClick}
            right
          >
            <ChevronRight />
          </GalleryControl>
        </CareersImagesContainer>
        <CareersImagesContainerMobile>
          <HorizontalScroll
            list={this.props.images}
            name="image"
            render={({ image }) => (
              <ImageContainerMobile>
                <Img sizes={image.node.childImageSharp.sizes} />
              </ImageContainerMobile>
            )}
          />
        </CareersImagesContainerMobile>
      </Fragment>
    )
  }
}

export default CareersImages

const CareersImagesContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 70rem;
  margin-top: 7rem;

  ${media.phablet`
    display: none;
  `};
`

const CareersImagesContainerMobile = styled.div`
  display: none;

  ${media.phablet`
    display: block;
    width: 100%;
    margin: 3rem 0;
  `};
`

const GalleryContainer = styled.div`
  position: relative;
  height: 24rem;
  transition: transform 0.6s cubic-bezier(0.7, 0, 0.2, 1);
`

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10rem;

  position: absolute;
  left: 0;
  width: 34rem;
  height: 100%;
  border-radius: 3px;
  overflow: hidden;
  filter: grayscale(100);

  opacity: ${p => (p.inView ? 1 : 0)};
  transition: opacity 0.8s cubic-bezier(0.55, 0.085, 0.68, 0.53)
      ${p => p.index * 200}ms,
    filter 0.2s cubic-bezier(0.55, 0.085, 0.68, 0.53);

  .gatsby-image-outer-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
  }

  &:hover {
    filter: grayscale(0);
  }

  ${media.phablet`
    width: 28rem;
  `};
`

const ImageContainerMobile = styled.div`
  border-radius: 3px;
  overflow: hidden;
  width: 32rem;

  ${media.phone`
    width: 24rem;
  `};
`

const GalleryControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${p => {
    if (p.left) {
      return `left: -9rem;`
    }

    if (p.right) {
      return `right: -9rem;`
    }
  }};
  height: 5rem;
  width: 5rem;
  border-radius: 50%;
  background: #090a0c;
  cursor: ${p => (p.disabled ? 'initial' : 'pointer')};

  opacity: ${p => (p.disabled ? 0 : 1)};
  transition: opacity 600ms cubic-bezier(0.7, 0, 0.2, 1);
`

const ChevronRight = ({ fill = 'white' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
  >
    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" fill={fill} />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
)

const ChevronLeft = ({ fill = 'white' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
  >
    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill={fill} />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
)
