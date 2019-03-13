import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

function HomeSlash() {
  const pane = useRef()
  const innerPane = useRef()

  // Minimum resizable area
  const minWidth: number = 80
  const minHeight: number = 100

  // Thresholds
  const MARGINS: number = 4

  // End of what's configurable.
  let clicked: {} | null = null

  let onRightEdge: boolean
  let onBottomEdge: boolean
  let onLeftEdge: boolean
  let onTopEdge: boolean

  let rightScreenEdge: number
  let bottomScreenEdge: number

  let b: number
  let x: number
  let y: number

  let redraw = false
  let event

  // Mouse events
  useEffect(() => {
    pane.current.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)

    // Touch events
    pane.current.addEventListener('touchstart', onTouchDown)
    document.addEventListener('touchmove', onTouchMove)
    document.addEventListener('touchend', onTouchEnd)
  }, [])

  function onTouchDown(event) {
    onDown(event.touches[0])
    event.preventDefault()
  }

  function onTouchMove(event) {
    onMove(event.touches[0])
  }

  function onTouchEnd(event) {
    if (event.touches.length == 0) onUp(event.changedTouches[0])
  }

  function onMouseDown(event) {
    onDown(event)
    event.preventDefault()
  }

  function onDown(event) {
    calc(event)

    let isResizing = onRightEdge || onBottomEdge || onTopEdge || onLeftEdge

    clicked = {
      x: x,
      y: y,
      cx: event.clientX,
      cy: event.clientY,
      w: b.width,
      h: b.height,
      isResizing: isResizing,
      isMoving: !isResizing && canMove(),
      onTopEdge: onTopEdge,
      onLeftEdge: onLeftEdge,
      onRightEdge: onRightEdge,
      onBottomEdge: onBottomEdge,
    }
  }

  function canMove() {
    return x > 0 && x < b.width && y > 0 && y < b.height && y < 30
  }

  function calc(event) {
    b = pane.current.getBoundingClientRect()
    x = event.clientX - b.left
    y = event.clientY - b.top

    onTopEdge = y < MARGINS
    onLeftEdge = x < MARGINS
    onRightEdge = x >= b.width - MARGINS
    onBottomEdge = y >= b.height - MARGINS

    rightScreenEdge = window.innerWidth - MARGINS
    bottomScreenEdge = window.innerHeight - MARGINS
  }

  function onMove(ee) {
    calc(ee)
    event = ee
    redraw = true
  }

  function animate() {
    requestAnimationFrame(animate)

    if (!redraw) return

    redraw = false

    if (clicked && clicked.isResizing) {
      if (clicked.onRightEdge) {
        pane.current.style.width = Math.max(x, minWidth) + 'px'
      }

      if (clicked.onBottomEdge) {
        pane.current.style.height = Math.max(y, minHeight) + 'px'
      }

      if (clicked.onLeftEdge) {
        let currentWidth = Math.max(
          clicked.cx - event.clientX + clicked.w,
          minWidth
        )
        if (currentWidth > minWidth) {
          pane.current.style.width = currentWidth + 'px'
        }
      }

      if (clicked.onTopEdge) {
        let currentHeight = Math.max(
          clicked.cy - event.clientY + clicked.h,
          minHeight
        )
        if (currentHeight > minHeight) {
          pane.current.style.height = currentHeight + 'px'
        }
      }

      return
    }

    // This code executes when mouse moves without clicking
    // style cursor
    if ((onRightEdge && onBottomEdge) || (onLeftEdge && onTopEdge)) {
      pane.current.style.cursor = 'nwse-resize'
    } else if ((onRightEdge && onTopEdge) || (onBottomEdge && onLeftEdge)) {
      pane.current.style.cursor = 'nesw-resize'
    } else if (onRightEdge || onLeftEdge) {
      pane.current.style.cursor = 'ew-resize'
    } else if (onBottomEdge || onTopEdge) {
      pane.current.style.cursor = 'ns-resize'
    } else {
      pane.current.style.cursor = 'default'
    }
  }

  animate()

  function onUp(event) {
    calc(event)
    clicked = null
  }

  return (
    <Frame>
      <Outline ref={pane}>
        <Slash />
        {/* <svg height="100%" width="100%">
          <g style={{ transform: 'scale(0.96) translate(6px, 6px)' }}>
            <line
              x1="-8px"
              y1="0px"
              x2="100%"
              y2="66%"
              stroke="#fff"
              strokeWidth="13"
            />
            <line
              x1="-6px"
              y1="31%"
              x2="100%"
              y2="100%"
              stroke="#fff"
              strokeWidth="13"
            />
            <line
              x1="0"
              y1="6px"
              x2="0"
              y2="33%"
              stroke="#fff"
              strokeWidth="13"
            />
            <line
              x1="100%"
              y1="66%"
              x2="100%"
              y2="100%"
              stroke="#fff"
              strokeWidth="13"
            />
          </g>
        </svg> */}
        <TLeft />
        <TRight />
        <BLeft />
        <BRight />
      </Outline>
    </Frame>
  )
}

export default HomeSlash

const Frame = styled.div`
  position: relative;
  width: 50%;
  display: flex;
  justify-items: flex-start;
  height: 100%;
  justify-content: center;
  align-items: center;
`

const Outline = styled.div`
  position: absolute;
  height: 324px;
  width: 299px;
  border: 1px solid #6166dc;

  &::after {
    content: '';
    position: absolute;
    left: -2px;
    top: -2px;
    border: 4px solid transparent;
    width: calc(100% + 4px);
    height: calc(100% + 4px);
  }
`

const InnerOutline = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
`

const Corner = styled.div`
  height: 7px;
  width: 7px;
  background: #111216;
  border: 1px solid #6166dc;
  position: absolute;
  pointer-events: none;
`

const TLeft = styled(Corner)`
  top: -3px;
  left: -3px;
`

const TRight = styled(Corner)`
  top: -3px;
  right: -3px;
`

const BLeft = styled(Corner)`
  bottom: -3px;
  left: -3px;
`

const BRight = styled(Corner)`
  bottom: -3px;
  right: -3px;
`

// const Parallelogram = styled.div`
//   width: 100%;
//   height: 33%;
//   transform: skewY(35deg);
//   border: 16px solid #fff;
//   position: absolute;
//   top: 31.3%;
//   left: 0;
// `

const Slash = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 297 321"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
  >
    <path
      d="M290.998 309.319L6 108.816V11.528L290.984 211.14L290.998 309.319Z"
      stroke="white"
      strokeWidth="12"
      vectorEffect="non-scaling-stroke"
      strokeLinejoin="miter"
    />
  </svg>
)

const NewSlash = () => (
  <svg
    width="100%"
    height="100%"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 297 321"
    preserveAspectRatio="none"
  >
    <path
      d="M211 171L6.5 12.5L7 88L211 246.5V171Z"
      stroke="white"
      strokeWidth="12"
    />
  </svg>
)
