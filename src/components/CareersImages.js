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

  componentWillUnmount() {
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
    }, 800)
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
    }, 800)
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
                setTimeout(() => {
                  this.setState({ viewed: true })
                }, 1000)
              }

              return (
                <GalleryContainer
                  style={{ transform: `translateX(${offset}rem)` }}
                >
                  {this.props.images.map((image, index) => (
                    <ImageContainer
                      key={image.node.childImageSharp.fluid.src}
                      index={index}
                      activeIndex={activeIndex}
                      inView={this.state.inView}
                      viewed={this.state.viewed}
                      style={{ left: `${index * 36}rem` }}
                    >
                      <Img fluid={image.node.childImageSharp.fluid} />
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
                <Img fluid={image.node.childImageSharp.fluid} />
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
  transition: transform 0.8s cubic-bezier(0.7, 0, 0.2, 1);
`

/**
 * 0 ==> 0 1
 * 1 ==> 2 3
 * 2 ==> 4 5
 * 3 ==> 6 7
 *
 */
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

  opacity: ${p =>
    p.inView
      ? p.activeIndex * 2 === p.index || p.index === p.activeIndex * 2 + 1
        ? 1
        : 0.2
      : 0};

  ${p => {
    if (p.viewed) {
      return `transition: opacity 0.6s cubic-bezier(0.55, 0.085, 0.68, 0.53),
    filter 0.3s cubic-bezier(0.55, 0.085, 0.68, 0.53);`
    }

    if (p.inView) {
      return `transition: opacity 0.6s cubic-bezier(0.55, 0.085, 0.68, 0.53)
      ${p.index * 180}ms;`
    }
  }};

  .gatsby-image-wrapper {
    border-radius: 2px;
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
  }

  &:hover {
    ${p =>
      p.inView
        ? p.activeIndex * 2 === p.index || p.index === p.activeIndex * 2 + 1
          ? `filter: grayscale(0);`
          : ``
        : ``};
  }

  ${media.phablet`
    width: 28rem;
  `};
`

const ImageContainerMobile = styled.div`
  border-radius: 3px;
  overflow: hidden;
  width: 34rem;

  ${media.phone`
    width: 30rem;
  `};

  ${media.se`
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
      return `left: -26.3rem;`
    }

    if (p.right) {
      return `right: -17.6rem;`
    }
  }};
  height: 4rem;
  width: 4rem;
  border-radius: 50%;
  z-index: 10;
  background: #fff;
  cursor: ${p => (p.disabled ? 'initial' : 'pointer')};

  opacity: ${p => (p.disabled ? 0.25 : 1)};
  transition: opacity 600ms cubic-bezier(0.7, 0, 0.2, 1);

  ${media.mdpi`
    ${p => {
      if (p.left) {
        return `left: -26.3rem;`
      }

      if (p.right) {
        return `right: -5rem;`
      }
    }};
  `};

  ${media.desktop`
    ${p => {
      if (p.left) {
        return `left: -5rem;`
      }

      if (p.right) {
        return `right: -5rem;`
      }
    }};
  `};
`

const ChevronRight = ({ fill = '#090a0c' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" fill={fill} />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
)

const ChevronLeft = ({ fill = '#090a0c' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill={fill} />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
)
