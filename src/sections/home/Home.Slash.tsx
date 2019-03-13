import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

function HomeSlash() {
  const [show, setShow] = useState(true)
  const pane = useRef()
  const innerPane = useRef()
  const numbers = useRef()
  const glow = useRef()

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
    if (show) {
      pane.current.addEventListener('mousedown', onMouseDown)
      document.addEventListener('mousemove', onMove)
      document.addEventListener('mouseup', onUp)

      // Touch events
      pane.current.addEventListener('touchstart', onTouchDown)
      document.addEventListener('touchmove', onTouchMove)
      document.addEventListener('touchend', onTouchEnd)
    }

    return () => {
      pane.current.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)

      // Touch events
      pane.current.removeEventListener('touchstart', onTouchDown)
      document.removeEventListener('touchmove', onTouchMove)
      document.removeEventListener('touchend', onTouchEnd)
    }
  }, [show])

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
    pane.current.style.transition = ''
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
    if (typeof window === 'undefined') {
      return
    }

    requestAnimationFrame(animate)

    if (!redraw) return

    redraw = false

    if (clicked && clicked.isResizing) {
      if (clicked.onRightEdge) {
        pane.current.style.width = Math.max(x, minWidth) + 'px'

        const scale = num => `scale(${(event.clientX + num) / num})`

        if (event.clientX > 1350) {
          innerPane.current.style.transform = scale(55000)
        } else {
          innerPane.current.style.transform = scale(100000)
        }
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

        const scale = num => `scale(${(currentWidth + num) / num})`

        if (currentWidth > 1400) {
          innerPane.current.style.transform = scale(44000)
        } else if (currentWidth > 800) {
          innerPane.current.style.transform = scale(34000)
        } else {
          innerPane.current.style.transform = scale(28000)
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

      let computed = getComputedStyle(pane.current)
      const cleanNum = num =>
        Math.round(parseInt(num.replace('[\\D.]', ''), 10))

      numbers.current.innerHTML = `${cleanNum(computed.width)} x ${cleanNum(
        computed.height
      )}`

      numbers.current.style.opacity = 1

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

    pane.current.style.transition = `width 0.3s cubic-bezier(0.215, 0.61, 0.355, 1),
      height 0.3s cubic-bezier(0.215, 0.61, 0.355, 1)`
    pane.current.style.width = '299px'
    pane.current.style.height = '324px'
    innerPane.current.style.transform = ''
    numbers.current.style.opacity = 0
    clicked = null
  }

  function handleToggle() {
    if (!clicked) {
      setShow(!show)
    }
  }

  return (
    <Frame>
      <Outline ref={pane} show={show} onClick={handleToggle}>
        <OutlineGlow show={show} />
        <InnerMask>
          <InnerOutline ref={innerPane}>
            <Slash />
          </InnerOutline>
        </InnerMask>
        <Numbers ref={numbers} />
        <Corners show={show}>
          <TLeft />
          <TRight />
          <BLeft />
          <BRight />
        </Corners>
        <SlashContainer show={show}>
          <SlashReflection />
        </SlashContainer>
      </Outline>
    </Frame>
  )
}

export default HomeSlash

const Frame = styled.div`
  position: relative;
  width: 45%;
  display: flex;
  justify-items: flex-start;
  height: 90%;
  justify-content: center;
  align-items: center;
  align-self: flex-start;
`

const Numbers = styled.div`
  position: absolute;
  bottom: -20px;
  left: 0;
  right: 0;
  margin: 0 auto;
  text-align: center;
  font-size: 10px;
  color: #6166dc;
  transition: opacity 0.1s linear;
`

const OutlineGlow = styled.div`
  opacity: ${p => (p.show ? 0 : 1)};

  &::after {
    content: '';
    position: absolute;
    width: 130%;
    height: 130%;
    top: -15%;
    left: -15%;

    background: rgba(102, 116, 141, 0.15);
    filter: blur(200px);
  }
`
const Outline = styled.div`
  position: absolute;
  height: 324px;
  width: 299px;
  border: 1px solid transparent;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    left: 4px;
    top: 4px;
    cursor: pointer;
    z-index: 1;
    width: calc(100% - 8px);
    height: calc(100% - 8px);
  }

  ${p =>
    p.show &&
    `
  border-color: #6166dc;

  &::after {
    content: '';
    position: absolute;
    left: -5px;
    top: -5px;
    border: 4px solid transparent;
    width: calc(100% + 10px);
    height: calc(100% + 10px);
  }
  `}
`

const InnerMask = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
`

const InnerOutline = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
`

const Corners = styled.div`
  opacity: ${p => (p.show ? 1 : 0)};
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

const SlashContainer = styled.div`
  opacity: ${p => (p.show ? 0 : 1)};
  width: 100%;
  height: 100%;
  left: -17px;
  top: 105%;
  position: absolute;
`

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

const SlashReflection = () => (
  <svg
    width="327"
    height="351"
    viewBox="0 0 327 351"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_f)">
      <path
        d="M305.998 26.5609L21 227.141V324.469L305.984 124.782L305.998 26.5609Z"
        stroke="url(#paint0_linear)"
        stroke-width="12"
      />
    </g>
    <defs>
      <filter
        id="filter0_f"
        x="0"
        y="0"
        width="327"
        height="351"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur stdDeviation="7.5" result="effect1_foregroundBlur" />
      </filter>
      <linearGradient
        id="paint0_linear"
        x1="163.5"
        y1="142"
        x2="163.5"
        y2="15"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="white" stop-opacity="0" />
        <stop offset="1" stop-color="white" stop-opacity="0.2" />
      </linearGradient>
    </defs>
  </svg>
)
