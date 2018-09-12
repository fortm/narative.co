import React, { Component } from 'react'
import styled from 'styled-components'

const images = [{}, {}, {}, {}, {}, {}, {}, {}]

class CareersImages extends Component {
  state = {
    activeIndex: 0,
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress)
  }

  componentWillMount() {
    window.removeEventListener('keydown', this.handleKeyPress)
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
    if (this.state.activeIndex === images.length / 2 - 1) {
      return
    }

    this.setState({
      activeIndex: this.state.activeIndex + 1,
    })
  }

  handlePrevClick = () => {
    if (this.state.activeIndex === 0) {
      return
    }

    this.setState({
      activeIndex: this.state.activeIndex - 1,
    })
  }

  render() {
    const { activeIndex } = this.state
    const offset = activeIndex * 72 * -1

    return (
      <CareersImagesContainer>
        <GalleryContainer style={{ transform: `translateX(${offset}rem)` }}>
          {images.map((image, index) => (
            <ImageContainer style={{ left: `${index * 36}rem` }}>
              {index}
            </ImageContainer>
          ))}
        </GalleryContainer>
        <GalleryControl
          disabled={activeIndex === 0}
          onClick={this.handlePrevClick}
          left
        >
          <ChevronLeft />
        </GalleryControl>
        <GalleryControl
          disabled={activeIndex === images.length / 2 - 1}
          onClick={this.handleNextClick}
          right
        >
          <ChevronRight />
        </GalleryControl>
      </CareersImagesContainer>
    )
  }
}

export default CareersImages

const CareersImagesContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 70rem;
  margin-top: 7rem;
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
  background: #fff;
  border-radius: 3px;
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
  }} height: 5rem;
  width: 5rem;
  border-radius: 50%;
  background: #090a0c;
  cursor: ${p => (p.disabled ? 'initial' : 'pointer')};

  opacity: ${p => (p.disabled ? 0 : 1)};
  transition: opacity 0.6s cubic-bezier(0.7, 0, 0.2, 1);
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
