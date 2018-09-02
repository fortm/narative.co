import React, { Component } from 'react'
import styled from 'styled-components'
import Observer from './Observer'

const rows = Array.apply(null, { length: 11 }).map(Number.call, Number)
const columns = Array.apply(null, { length: 7 }).map(Number.call, Number)

class CareersGraph extends Component {
  state = {
    animate: false,
  }

  handlePercentage = visiblePercentage => {
    if (visiblePercentage > 50) {
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
              <CareersGraphGrid>
                {rows.map((item, index) => (
                  <CareersGraphGridRow style={{ top: `${index * 36.1}px` }} />
                ))}
                <CareersGraphGridColumnContainer>
                  {columns.map((item, index) => (
                    <CareersGraphGridColumn
                      style={{ left: `${index * 135.333}px` }}
                    />
                  ))}
                </CareersGraphGridColumnContainer>
                <CareersGraphSVGContainer animate={animate}>
                  <CareersGraphSVG />
                </CareersGraphSVGContainer>
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
  top: -15rem;
  margin-bottom: 10rem;
`

const CareersGraphGrid = styled.div`
  position: relative;
  height: 361px;
`

const CareersGraphGridRow = styled.div`
  position: absolute;
  width: 100%;
  max-width: 1440px;
  height: 1px;
  background: radial-gradient(
    50% 50%,
    rgba(255, 255, 255, 0.35) 0%,
    rgba(255, 255, 255, 0) 100%
  );
`

const CareersGraphGridColumnContainer = styled.div`
  position: absolute;
  width: 812px;
  margin: 0 auto;
  left: 2rem;
  right: 0;
  top: 0;
  height: 100%;
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
  margin: 0 auto;
  width: 845px;

  svg path {
    stroke-dasharray: 1000;
    stroke-dashoffset: -1000;
    ${p =>
      p.animate &&
      `
      animation: dash 4s cubic-bezier(0.5, 0, 0.415, 0.955) forwards;
    `};
  }

  @keyframes dash {
    to {
      stroke-dashoffset: 0;
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
      animation: fadein 0.3s ease-out 500ms forwards;
    }

    .two {
      animation: fadein 0.3s ease-out 1200ms forwards;
    }

    .three {
      animation: fadein 0.3s ease-out 1500ms forwards;
    }

    .four {
      animation: fadein 0.3s ease-out 2000ms forwards;
    }

    .five {
      animation: fadein 0.3s ease-out 2200ms forwards;
    }

    .six {
      animation: fadein 0.3s ease-out 2400ms forwards;
    }

    .seven {
      animation: fadein 0.3s ease-out 3600ms forwards;
    }
  `};
`

const CareersGraphSVG = () => (
  <svg
    width="845"
    height="376"
    viewBox="0 0 845 376"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M837.5 8L703 188L567.5 295.5H433.5L298 314.5L162.5 330.5H26H0"
      stroke="white"
      stroke-width="2"
    />
    <path
      d="M838 152H703H567.5L433.5 241L297 223L162.5 259.5L27 368H0"
      stroke="#E9DAAC"
      stroke-width="2"
    />
    <circle
      cx="26.5"
      cy="330.5"
      r="6.5"
      fill="#080a0e"
      stroke="white"
      stroke-width="2"
      className="one"
    />
    <circle
      cx="162.5"
      cy="330.5"
      r="6.5"
      fill="#080a0e"
      stroke="white"
      stroke-width="2"
      className="two"
    />
    <circle
      cx="297.5"
      cy="313.5"
      r="6.5"
      fill="#080a0e"
      stroke="white"
      stroke-width="2"
      className="three"
    />
    <circle
      cx="433.5"
      cy="295.5"
      r="6.5"
      fill="#080a0e"
      stroke="white"
      stroke-width="2"
      className="four"
    />
    <circle
      cx="567.5"
      cy="295.5"
      r="6.5"
      fill="#080a0e"
      stroke="white"
      stroke-width="2"
      className="five"
    />

    <circle
      cx="703.5"
      cy="187.5"
      r="6.5"
      fill="#080a0e"
      stroke="white"
      stroke-width="2"
      className="six"
    />
    <circle
      cx="837.5"
      cy="7.5"
      r="6.5"
      fill="#080a0e"
      stroke="white"
      stroke-width="2"
      className="seven"
    />
    <circle
      cx="26.5"
      cy="368.5"
      r="6.5"
      fill="#080a0e"
      stroke="#E9DAAC"
      stroke-width="2"
      className="one"
    />
    <circle
      cx="162.5"
      cy="259.5"
      r="6.5"
      fill="#080a0e"
      stroke="#E9DAAC"
      stroke-width="2"
      className="two"
    />
    <circle
      cx="297.5"
      cy="223.5"
      r="6.5"
      fill="#080a0e"
      stroke="#E9DAAC"
      stroke-width="2"
      className="three"
    />
    <circle
      cx="433.5"
      cy="241.5"
      r="6.5"
      fill="#080a0e"
      stroke="#E9DAAC"
      stroke-width="2"
      className="four"
    />
    <circle
      cx="567.5"
      cy="151.5"
      r="6.5"
      fill="#080a0e"
      stroke="#E9DAAC"
      stroke-width="2"
      className="five"
    />
    <circle
      cx="703.5"
      cy="151.5"
      r="6.5"
      fill="#080a0e"
      stroke="#E9DAAC"
      stroke-width="2"
      className="six"
    />

    <circle
      cx="837.5"
      cy="151.5"
      r="6.5"
      fill="#080a0e"
      stroke="#E9DAAC"
      stroke-width="2"
      className="seven"
    />
  </svg>
)
