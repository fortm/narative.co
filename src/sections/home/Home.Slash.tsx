import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import cursorTopLeftImage from '../../assets/cursors/rotate-top-left.svg'
import cursorTopRightImage from '../../assets/cursors/rotate-top-right.svg'
import cursorBottomLeftImage from '../../assets/cursors/rotate-bottom-left.svg'
import cursorBottomRightImage from '../../assets/cursors/rotate-bottom-right.svg'

function HomeSlash() {
  const pane = useRef()
  const mirrorPane = useRef()
  const relativeMirrorPane = useRef()
  const relativePane = useRef()
  const innerPane = useRef()
  const numbers = useRef()
  const glow = useRef()

  const cornerRotation = useRef()

  // Minimum resizable area
  const minWidth: number = 0
  const minHeight: number = 0

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

  let alt: boolean
  let shift: boolean

  let b: number
  let x: number
  let y: number

  let startAngle: number

  let redraw = false
  let event

  // Mouse events
  useEffect(() => {
    pane.current.addEventListener('mousedown', onMouseDown)
    cornerRotation.current.addEventListener('mousedown', onMouseDownRotation)
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
    document.addEventListener('keydown', onKeydown)
    document.addEventListener('keyup', onKeyup)

    // Touch events
    pane.current.addEventListener('touchstart', onTouchDown)
    document.addEventListener('touchmove', onTouchMove)
    document.addEventListener('touchend', onTouchEnd)

    // Remove all the events when unselected
    return () => {
      pane.current.removeEventListener('mousedown', onMouseDown)
      cornerRotation.current.addEventListener('mousedown', onMouseDownRotation)
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
      document.removeEventListener('keydown', onKeydown)
      document.removeEventListener('keyup', onKeyup)

      // Touch events
      pane.current.removeEventListener('touchstart', onTouchDown)
      document.removeEventListener('touchmove', onTouchMove)
      document.removeEventListener('touchend', onTouchEnd)
    }
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

  function onMouseDownRotation(event) {
    onDown(event, 'rotation')
    event.preventDefault()
  }

  function onKeydown(event) {
    alt = event.key === 'Alt'
    shift = event.key === 'Shift'
    redraw = true
  }

  function onKeyup(event) {
    event.preventDefault()
    alt = false
    shift = false
    redraw = true
  }

  function onDown(event, src) {
    pane.current.style.transition = ''
    mirrorPane.current.style.transition = ''
    calc(event)

    let isResizing = onRightEdge || onBottomEdge || onTopEdge || onLeftEdge

    let center = {
      x: b.left + b.width / 2,
      y: b.top + b.height / 2,
    }
    let x = event.clientX - center.x
    let y = event.clientY - center.y
    startAngle = (180 / Math.PI) * Math.atan2(y, x)

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
      startAngle: startAngle,
      rotate: src === 'rotation',
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
    if (typeof window === 'undefined') return

    requestAnimationFrame(animate)

    if (!redraw) return

    redraw = false

    if (clicked) {
      glow.current.style.opacity = 0
    }

    if (clicked && clicked.rotate) {
      return rotate()
    }

    if (clicked && clicked.isResizing) {
      if (clicked.onRightEdge) {
        let currentWidth = Math.max(x, minWidth)
        pane.current.style.width = Math.max(x, minWidth) + 'px'
        mirrorPane.current.style.width = Math.max(x, minWidth) + 'px'
        handleShift(currentWidth)

        pane.current.style.left = 0
        pane.current.style.right = ''
        mirrorPane.current.style.left = 0
        mirrorPane.current.style.right = ''
      }

      if (clicked.onBottomEdge) {
        let currentHeight =
          Math.max(y, minHeight) > 345 ? 345 : Math.max(y, minHeight)

        pane.current.style.height = currentHeight + 'px'
        mirrorPane.current.style.height = currentHeight + 'px'
        handleShift(currentHeight)

        pane.current.style.top = 0
        pane.current.style.bottom = ''

        mirrorPane.current.style.bottom = 0
        mirrorPane.current.style.top = ''
      }

      if (clicked.onLeftEdge) {
        let currentWidth = Math.max(
          clicked.cx - event.clientX + clicked.w,
          minWidth
        )

        let w = alt ? (currentWidth - 299) * 2 + 299 : currentWidth

        if (currentWidth > minWidth) {
          pane.current.style.width = w + 'px'
          mirrorPane.current.style.width = w + 'px'
          handleShift(w)
        }
        pane.current.style.right = 0
        pane.current.style.left = ''
        mirrorPane.current.style.right = 0
        mirrorPane.current.style.left = ''
      }

      if (clicked.onTopEdge) {
        let currentHeight = Math.max(
          clicked.cy - event.clientY + clicked.h,
          minHeight
        )

        currentHeight = alt && currentHeight > 345 ? 345 : currentHeight

        if (currentHeight > minHeight) {
          pane.current.style.height = currentHeight + 'px'
          mirrorPane.current.style.height = currentHeight + 'px'
          handleShift(currentHeight)
        }
        pane.current.style.bottom = 0
        pane.current.style.top = ''
        mirrorPane.current.style.top = 0
        mirrorPane.current.style.bottom = ''
      }

      function handleShift(len) {
        if (shift) {
          pane.current.style.width = len + 'px'
          pane.current.style.height = len + 'px'
          mirrorPane.current.style.width = len + 'px'
          mirrorPane.current.style.height = len + 'px'
        }
      }

      addWidthAndHeightUnits()
    }

    if (alt) {
      pane.current.style.top = ''
      pane.current.style.right = ''
      pane.current.style.bottom = ''
      pane.current.style.left = ''
      relativePane.current.style.display = 'flex'
      relativePane.current.style.alignItems = 'center'
      relativePane.current.style.justifyContent = 'center'
      mirrorPane.current.style.top = ''
      mirrorPane.current.style.right = ''
      mirrorPane.current.style.bottom = ''
      mirrorPane.current.style.left = ''
      relativeMirrorPane.current.style.display = 'flex'
      relativeMirrorPane.current.style.alignItems = 'center'
      relativeMirrorPane.current.style.justifyContent = 'center'
    } else {
      relativePane.current.style.display = ''
      relativePane.current.style.alignItems = ''
      relativePane.current.style.justifyContent = ''
      relativeMirrorPane.current.style.display = ''
      relativeMirrorPane.current.style.alignItems = ''
      relativeMirrorPane.current.style.justifyContent = ''
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

  function addWidthAndHeightUnits() {
    numbers.current.innerHTML = `${Math.round(b.width)} x ${Math.round(
      b.height
    )}`
    numbers.current.style.opacity = 1
  }

  function rotate() {
    const { left, top } = pane.current.getBoundingClientRect()
    const center = {
      x: left + pane.current.offsetWidth / 2,
      y: top + pane.current.offsetHeight / 2,
    }

    let mouse_x = event.pageX
    let mouse_y = event.pageY

    let radians = Math.atan2(mouse_x - center.x, mouse_y - center.y)
    let degree = radians * (180 / Math.PI) * -1 + 100
    let rotation = degree - clicked.startAngle
    let normalize = rotation >= 360 ? rotation - 360 : rotation

    normalize = normalize > 18 ? 18 : normalize

    pane.current.style.transform = `rotate(${normalize - 10}deg)`
    mirrorPane.current.style.transform = `rotate(${(normalize - 10) * -1}deg)`
  }

  function resetStyles() {
    if (pane.current.style.transform.includes('rotate')) {
      const deg = Number(pane.current.style.transform.replace(/[^0-9\.]+/g, ''))
      const result = Math.abs(deg - 360) > Math.abs(0 - deg) ? 0 : 360
      pane.current.style.transform = `rotate(${result}deg)`
      mirrorPane.current.style.transform = `rotate(${result}deg)`
    } else {
      pane.current.style.transform = ''
      mirrorPane.current.style.transform = ''
    }

    pane.current.style.transition = `width 0.3s cubic-bezier(0.215, 0.61, 0.355, 1),
      height 0.3s cubic-bezier(0.215, 0.61, 0.355, 1), transform 0.3s ease`
    pane.current.style.width = '299px'
    pane.current.style.height = '324px'
    numbers.current.style.opacity = 0

    mirrorPane.current.style.transition = `width 0.3s cubic-bezier(0.215, 0.61, 0.355, 1),
      height 0.3s cubic-bezier(0.215, 0.61, 0.355, 1), transform 0.3s ease`
    mirrorPane.current.style.width = '299px'
    mirrorPane.current.style.height = '324px'

    glow.current.style.opacity = 1
  }

  function onUp(event) {
    calc(event)
    resetStyles()

    clicked = null
  }

  animate()

  return (
    <Frame>
      <Relative ref={relativePane}>
        <Outline ref={pane}>
          <OutlineGlow ref={glow} />
          <InnerMask>
            <InnerOutline ref={innerPane}>
              <SlashWithGlow />
            </InnerOutline>
          </InnerMask>
          <Numbers ref={numbers} />
          <Corners>
            <TLeft />
            <TRight />
            <BLeft />
            <BRight />
          </Corners>
        </Outline>
        <CornerControls ref={cornerRotation}>
          <TLeftControl />
          <TRightControl />
          <BLeftControl />
          <BRightControl />
        </CornerControls>
      </Relative>
      <Mirror ref={relativeMirrorPane}>
        <Outline ref={mirrorPane} hideControls>
          <InnerMask>
            <InnerOutline ref={innerPane}>
              <MirrorSlashWithGlow />
            </InnerOutline>
          </InnerMask>
        </Outline>
      </Mirror>
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

const Relative = styled.div`
  position: relative;
  height: 324px;
  width: 299px;
  border: 1px solid transparent;
  z-index: 0;
`

const Mirror = styled(Relative)`
  position: absolute;
  top: 90%;
  filter: blur(6px);
  z-index: 0;

  &::after {
    content: '';
    position: absolute;
    left: -100vw;
    top: -10%;
    width: 300vw;
    height: 120%;
    background: linear-gradient(rgba(16, 18, 22, 0.8), #101216 33%);
  }
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
  pointer-events: none;
`

const OutlineGlow = styled.div`
  transition: opacity 0.2s ease-out;
  pointer-events: none;

  &::after {
    content: '';
    position: absolute;
    width: 110%;
    height: 110%;
    top: -5%;
    left: -5%;

    background: rgba(102, 116, 141, 0.15);
    filter: blur(200px);
  }
`
const Outline = styled.div`
  position: absolute;
  height: 324px;
  width: 299px;

  ${p =>
    !p.hideControls &&
    `
  border: 1px solid #6166dc;
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

  &::after {
    content: '';
    position: absolute;
    left: -5px;
    top: -5px;
    border: 4px solid transparent;
    width: calc(100% + 10px);
    height: calc(100% + 10px);
    z-index: 10;
  }
  `}
`

const InnerMask = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
`

const InnerOutline = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
`

const CornerControls = styled.div``

const CornerControl = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 50%;
  position: absolute;
  z-index: 0;
`

const TRightControl = styled(CornerControl)`
  right: -20px;
  top: -20px;
  cursor: url(${cursorTopRightImage}), auto;
`
const TLeftControl = styled(CornerControl)`
  left: -20px;
  top: -20px;
  cursor: url(${cursorTopLeftImage}), auto;
`
const BLeftControl = styled(CornerControl)`
  left: -20px;
  bottom: -20px;
  cursor: url(${cursorBottomLeftImage}), auto;
`
const BRightControl = styled(CornerControl)`
  right: -20px;
  bottom: -20px;
  cursor: url(${cursorBottomRightImage}), auto;
`

const Corners = styled.div``

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

const SlashWithGlow = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 437 461"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
    style={{ transform: 'scale(1.47, 1.44)' }}
  >
    <g filter="url(#filter0_dd)">
      <path
        d="M360.998 379.319L76 178.816V81.528L360.984 281.14L360.998 379.319Z"
        stroke="white"
        stroke-width="12"
      />
    </g>
    <defs>
      <filter
        id="filter0_dd"
        x="0"
        y="0"
        width="437"
        height="460.877"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="35" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.399641 0 0 0 0 0.453299 0 0 0 0 0.554653 0 0 0 0.6 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="5" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.2 0"
        />
        <feBlend
          mode="normal"
          in2="effect1_dropShadow"
          result="effect2_dropShadow"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect2_dropShadow"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
)

const MirrorSlashWithGlow = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 437 461"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
    style={{ transform: 'scale(1.47, 1.44)' }}
  >
    <path
      d="M76.002 379.319L361 178.816V81.528L76.0164 281.14L76.002 379.319Z"
      stroke="white"
      stroke-width="12"
    />
  </svg>
)
