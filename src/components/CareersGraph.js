import React, { Component } from 'react'
import styled from 'styled-components'
import Observer from './Observer'

const rows = Array.apply(null, { length: 11 }).map(Number.call, Number)
const columns = Array.apply(null, { length: 7 }).map(Number.call, Number)
const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct']

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
        render={({ visiblePercentage, visible }) => {
          if (!animate) {
            this.handlePercentage(visiblePercentage)
          }

          return (
            <CareersGraphContainer>
              <CareersGraphGrid>
                {rows.map((item, index) => (
                  <CareersGraphGridRow
                    visible={visible}
                    index={index}
                    style={{ top: `${index * 36.1}px` }}
                  />
                ))}
                <CareersGraphGridColumnContainer
                  visible={visiblePercentage > 75}
                >
                  {columns.map((item, index) => (
                    <CareersGraphGridColumn
                      style={{ left: `${index * 135.333}px` }}
                    />
                  ))}
                </CareersGraphGridColumnContainer>
                <CareersGraphSVGContainer animate={animate}>
                  <CareersGraphSVG />
                </CareersGraphSVGContainer>
                <LabelsContainer animate={animate}>
                  <YLabels>
                    <YLabs>Labs</YLabs>
                    <YStudio>Studio</YStudio>
                  </YLabels>
                  <XLabelsContainer>
                    {months.map((month, index) => (
                      <XLabels style={{ left: `${index * 135.333}px` }}>
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
  top: -15rem;
  margin-bottom: 10rem;
`

const CareersGraphGrid = styled.div`
  position: relative;
  height: 361px;
`

const LabelsContainer = styled.div`
  opacity: ${p => (p.animate ? 1 : 0)};
  transition: opacity 0.5s ease-out 4600ms;
`

const XLabelsContainer = styled.div`
  position: absolute;
  width: 812px;
  margin: 0 auto;
  left: -1rem;
  right: 0;
  top: 0;
  height: 100%;
`

const XLabels = styled.div`
  position: absolute;
  margin: 0 auto;
  left: 2rem;
  bottom: -4rem;
  text-align: center;
  width: 3.5rem;
  color: ${p => p.theme.colors.grey};
`

const YLabels = styled.div`
  position: absolute;
  left: 8rem;
  bottom: 0;
`

const YLabs = styled.div`
  position: relative;
  top: -0.5rem;
  left: 1.1rem;
  color: #fff;
`

const YStudio = styled.div`
  position: relative;
  top: 1rem;
  color: #e9daac;
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
  opacity: ${p => (p.visible ? 1 : 0)};
  transition: opacity 500ms ease-out ${p => p.index * 150}ms;
`

const CareersGraphGridColumnContainer = styled.div`
  position: absolute;
  width: 812px;
  margin: 0 auto;
  left: 2rem;
  right: 0;
  top: 0;
  height: 100%;
  opacity: ${p => (p.visible ? 1 : 0)};
  transition: opacity 500ms ease-out 1s;
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
      animation: dash 4s cubic-bezier(0.5, 0, 0.415, 0.955) forwards 0.9s;
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
      animation: fadein 0.4s ease-out 1400ms forwards;
    }

    .two {
      animation: fadein 0.4s ease-out 2100ms forwards;
    }

    .three {
      animation: fadein 0.4s ease-out 2400ms forwards;
    }

    .four {
      animation: fadein 0.4s ease-out 2700ms forwards;
    }

    .five {
      animation: fadein 0.4s ease-out 2900ms forwards;
    }

    .six {
      animation: fadein 0.4s ease-out 3100ms forwards;
    }

    .seven {
      animation: fadein 0.4s ease-out 4500ms forwards;
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
