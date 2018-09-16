import React, { Component } from 'react'
import styled from 'styled-components'
import Observer from './Observer'
import { media } from '@styles'

const createArrayWithLegth = length =>
  Array.apply(null, { length }).map(Number.call, Number)

const rows = createArrayWithLegth(11)
const columns = createArrayWithLegth(7)
const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct']

class CareersGraph extends Component {
  state = {
    animate: false,
  }

  componentDidMount() {
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
  }

  componentDidWillunmount() {
    window.addEventListener('resize', this.handleResize)
  }

  handleResize = () => {
    if (!this.graph || !this.container) return

    const subractor = this.graph.offsetHeight > 250 ? 13 : 9

    this.container.style.height = `${this.graph.offsetHeight - subractor}px`
  }

  handlePercentage = visiblePercentage => {
    if (visiblePercentage > 33) {
      this.setState({ animate: true })
    }
  }

  render() {
    const { animate } = this.state

    return (
      <Observer
        render={({ visiblePercentage }) => {
          if (!animate) {
            this.handlePercentage(visiblePercentage)
          }

          return (
            <CareersGraphContainer>
              <CareersGraphGrid innerRef={svg => (this.container = svg)}>
                <CareersGraphGridRowContainer>
                  {rows.map((item, index) => (
                    <CareersGraphGridRow
                      key={index}
                      animate={animate}
                      index={rows.length - index + 1}
                      style={{ top: `${index * 10}%` }}
                    />
                  ))}
                </CareersGraphGridRowContainer>
                <CareersGraphGridColumnContainer animate={animate}>
                  {columns.map((item, index) => (
                    <CareersGraphGridColumn
                      key={index}
                      style={{ left: `${index * 14.028}%` }}
                    />
                  ))}
                </CareersGraphGridColumnContainer>
                <CareersGraphSVGContainer
                  innerRef={svg => (this.graph = svg)}
                  animate={animate}
                >
                  <CareersGraphSVG />
                </CareersGraphSVGContainer>
                <LabelsContainer animate={animate}>
                  <YLabels>
                    <YLabs>Labs</YLabs>
                    <YStudio>Studio</YStudio>
                  </YLabels>
                  <XLabelsContainer>
                    {months.map((month, index) => (
                      <XLabels
                        key={index}
                        style={{ left: `${index * 100 / 8.38}%` }}
                      >
                        {month}
                      </XLabels>
                    ))}
                  </XLabelsContainer>
                </LabelsContainer>
              </CareersGraphGrid>
            </CareersGraphContainer>
          )
        }}
      />
    )
  }
}

export default CareersGraph

const CareersGraphContainer = styled.div`
  position: relative;
  margin: 0 auto;
  max-width: 1140px;
  top: -12rem;
  margin-bottom: 10rem;

  ${media.desktop`
    top: -4rem;
    margin-bottom: 14rem;
  `};

  ${media.tablet`
    top: 0rem;
  `};

  ${media.phablet`
    margin-bottom: 11rem;
  `};

  ${media.phone`
    top: -1rem;
    margin-bottom: 10rem;
  `};
`

const CareersGraphGrid = styled.div`
  position: relative;
  height: 361px;
  width: 100%;
`

const LabelsContainer = styled.div`
  opacity: ${p => (p.animate ? 1 : 0)};
  transition: opacity 1s ease-in 3400ms;
`

const XLabelsContainer = styled.div`
  position: absolute;
  max-width: 1140px;
  right: 0;
  top: 0;
  height: 100%;
  margin-left: 16.67%;
  left: -3rem;
`

const XLabels = styled.div`
  position: absolute;
  margin: 0 auto;
  left: 2rem;
  bottom: -4rem;
  text-align: center;
  width: 3.5rem;
  color: ${p => p.theme.colors.grey};

  ${media.desktop`
    font-size: 1.4rem;
    bottom: -5rem;
  `};

  ${media.phablet`
    font-size: 0.8rem;
    bottom: -3rem;
  `};
`

const YLabels = styled.div`
  position: absolute;
  left: 8rem;
  bottom: 0;

  ${media.desktop`
    font-size: 1.4rem;
    left: 2rem;
    bottom: -0.4rem;
  `};

  ${media.tablet`
    font-size: 1.4rem;
    left: 1rem;
  `};

  ${media.phablet`
    font-size: 0.8rem;
  `};
`

const YLabs = styled.div`
  position: relative;
  top: -0.5rem;
  left: 1.1rem;
  color: #fff;

  ${media.tablet`
    top: 0.4rem;
  `};
`

const YStudio = styled.div`
  position: relative;
  top: 1rem;
  color: #e9daac;

  ${media.tablet`
    top: 0.5rem;
    left: 0.5rem;
  `};
`

const CareersGraphGridRowContainer = styled.div``

const CareersGraphGridRow = styled.div`
  position: absolute;
  width: 100%;
  max-width: 1440px;
  height: 1px;
  background: radial-gradient(
    50% 60%,
    rgba(255, 255, 255, 0.35) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  opacity: ${p => (p.animate ? 1 : 0)};
  transition: opacity 500ms ease-out ${p => p.index * 200}ms;
`

const CareersGraphGridColumnContainer = styled.div`
  position: absolute;
  max-width: 1140px;
  margin-left: 16.67%;
  left: -1.8rem;
  right: 0;
  top: 0;
  height: 100%;
  opacity: ${p => (p.animate ? 1 : 0)};
  transition: opacity 0.5s ease-out 3000ms;

  ${media.tablet`
    left: -1rem;
  `};
  ${media.phone`
    left: -0.5rem;
  `};
`

const CareersGraphGridColumn = styled.div`
  position: absolute;
  width: 1px;
  height: 100%;
  background: rgba(255, 255, 255, 0.04);
`

const CareersGraphSVGContainer = styled.div`
  position: absolute;
  bottom: -7px;
  left: 0;
  right: 0;
  padding: 0px 12.8%;
  margin: 0 auto;
  width: 100%;
  max-width: 1140px;

  svg {
    width: 100%;
  }

  svg path {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;

    ${p =>
      p.animate &&
      `
      animation: dash 4s cubic-bezier(0.5, 0, 0.415, 0.955) forwards;
    `};
  }

  @keyframes dash {
    from {
      stroke-dashoffset: 1000;
    }
    to {
      stroke-dashoffset: 2000;
    }
  }

  .one,
  .two,
  .three,
  .four,
  .five,
  .six,
  .seven {
    opacity: 0;
  }

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  ${p =>
    p.animate &&
    `
    .one {
      animation: fadein 0.4s ease-out 400ms forwards;
    }

    .two {
      animation: fadein 0.4s ease-out 1100ms forwards;
    }

    .three {
      animation: fadein 0.4s ease-out 1400ms forwards;
    }

    .four {
      animation: fadein 0.4s ease-out 1700ms forwards;
    }

    .five {
      animation: fadein 0.4s ease-out 1900ms forwards;
    }

    .six {
      animation: fadein 0.4s ease-out 2100ms forwards;
    }

    .seven {
      animation: fadein 0.4s ease-out 3500ms forwards;
    }
  `};
`

const CareersGraphSVG = () => (
  <svg viewBox="0 0 845 376" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M837.5 8L703 188L567.5 295.5H433.5L298 314.5L162.5 330.5H26H0"
      stroke="white"
      strokeWidth="2"
    />
    <path
      d="M838 152H703H567.5L433.5 241L297 223L162.5 259.5L27 368H0"
      stroke="#E9DAAC"
      strokeWidth="2"
    />
    <circle
      cx="26.5"
      cy="330.5"
      r="6.5"
      fill="#080a0e"
      stroke="white"
      strokeWidth="2"
      className="one"
    />
    <circle
      cx="162.5"
      cy="330.5"
      r="6.5"
      fill="#080a0e"
      stroke="white"
      strokeWidth="2"
      className="two"
    />
    <circle
      cx="297.5"
      cy="313.5"
      r="6.5"
      fill="#080a0e"
      stroke="white"
      strokeWidth="2"
      className="three"
    />
    <circle
      cx="433.5"
      cy="295.5"
      r="6.5"
      fill="#080a0e"
      stroke="white"
      strokeWidth="2"
      className="four"
    />
    <circle
      cx="567.5"
      cy="295.5"
      r="6.5"
      fill="#080a0e"
      stroke="white"
      strokeWidth="2"
      className="five"
    />

    <circle
      cx="703.5"
      cy="187.5"
      r="6.5"
      fill="#080a0e"
      stroke="white"
      strokeWidth="2"
      className="six"
    />
    <circle
      cx="837.5"
      cy="7.5"
      r="6.5"
      fill="#080a0e"
      stroke="white"
      strokeWidth="2"
      className="seven"
    />
    <circle
      cx="26.5"
      cy="368.5"
      r="6.5"
      fill="#080a0e"
      stroke="#E9DAAC"
      strokeWidth="2"
      className="one"
    />
    <circle
      cx="162.5"
      cy="259.5"
      r="6.5"
      fill="#080a0e"
      stroke="#E9DAAC"
      strokeWidth="2"
      className="two"
    />
    <circle
      cx="297.5"
      cy="223.5"
      r="6.5"
      fill="#080a0e"
      stroke="#E9DAAC"
      strokeWidth="2"
      className="three"
    />
    <circle
      cx="433.5"
      cy="241.5"
      r="6.5"
      fill="#080a0e"
      stroke="#E9DAAC"
      strokeWidth="2"
      className="four"
    />
    <circle
      cx="567.5"
      cy="151.5"
      r="6.5"
      fill="#080a0e"
      stroke="#E9DAAC"
      strokeWidth="2"
      className="five"
    />
    <circle
      cx="703.5"
      cy="151.5"
      r="6.5"
      fill="#080a0e"
      stroke="#E9DAAC"
      strokeWidth="2"
      className="six"
    />

    <circle
      cx="837.5"
      cy="151.5"
      r="6.5"
      fill="#080a0e"
      stroke="#E9DAAC"
      strokeWidth="2"
      className="seven"
    />
  </svg>
)
