import React, { useLayoutEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import shapes from './Shapes'

// ShapeShifter

// Refs to the shapes
// Array of shapes, reflections, dimensions, and refs

// Some sort of state management for active shape
// Some sort of event handling to add and remove events

// Handle keydown, shortcuts
//

const minWidth: number = 0
const minHeight: number = 0

// Thresholds
const MARGINS: number = 4
const round = num => Math.round(num)

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

let redraw: boolean = false

let pressedKeys: {} = {}

let shapeWidth
let shapeHeight

// useLayoutEffect(() => {
//   pane.current.addEventListener('mousedown', onMouseDown)
//   cornerRotation.current.addEventListener('mousedown', onMouseDownRotation)
//   document.addEventListener('mousemove', onMove)
//   document.addEventListener('mouseup', onUp)

//   // Touch events
//   pane.current.addEventListener('touchstart', onTouchDown)
//   document.addEventListener('touchmove', onTouchMove)
//   document.addEventListener('touchend', onTouchEnd)

//   // Remove all the events when unselected
//   return () => {
//     pane.current.removeEventListener('mousedown', onMouseDown)
//     cornerRotation.current.addEventListener('mousedown', onMouseDownRotation)
//     document.removeEventListener('mousemove', onMove)
//     document.removeEventListener('mouseup', onUp)
//     document.removeEventListener('keydown', onKeydown)
//     document.removeEventListener('keyup', onKeyup)

//     // Touch events
//     pane.current.removeEventListener('touchstart', onTouchDown)
//     document.removeEventListener('touchmove', onTouchMove)
//     document.removeEventListener('touchend', onTouchEnd)
//   }
// }, [])

function ShapeShifter() {
  const [activeShape, setActiveShape] = useState(0)
  const Active = shapes[activeShape]
  const activeStyles = { width: Active.width, height: Active.height }
  const resetActiveStyles = JSON.stringify(activeStyles)

  const shape = useRef()
  const shapeMirror = useRef()
  const rel = useRef()
  const relMirror = useRef()
  const numbers = useRef()
  const glow = useRef()

  useLayoutEffect(() => {
    const $shape = shape.current
    $shape.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
    document.addEventListener('keydown', onKeydown)
    document.addEventListener('keyup', onKeyup)

    // Remove all the events when unselected
    return () => {
      $shape.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
      document.removeEventListener('keydown', onKeydown)
      document.removeEventListener('keyup', onKeyup)
    }
  }, [])

  function onKeydown(event) {
    pressedKeys[event.key] = event.key
    redraw = true
  }

  function onKeyup(event) {
    delete pressedKeys[event.key]
    redraw = true
  }

  function onMouseDown(event) {
    onDown(event)
    event.preventDefault()
  }

  function onMove(e) {
    updateGlobalSettings(e)
    event = e
    redraw = true
  }

  function updateGlobalSettings(event) {
    b = shape.current.getBoundingClientRect()
    x = event.clientX - b.left
    y = event.clientY - b.top

    onTopEdge = y < MARGINS
    onLeftEdge = x < MARGINS
    onRightEdge = x >= b.width - MARGINS
    onBottomEdge = y >= b.height - MARGINS

    rightScreenEdge = window.innerWidth - MARGINS
    bottomScreenEdge = window.innerHeight - MARGINS
  }

  function resetStyles($el) {
    const reset = JSON.parse($el.getAttribute('data-reset'))
    $el.style.transition = `
      width 0.3s cubic-bezier(0.215, 0.61, 0.355, 1),
      height 0.3s cubic-bezier(0.215, 0.61, 0.355, 1),
      transform 0.3s ease
    `
    $el.style.width = `${reset.width}px`
    $el.style.height = `${reset.height}px`

    numbers.current.style.opacity = 0
    glow.current.style.opacity = 1
  }

  function onDown(event) {
    updateGlobalSettings(event)
    shape.current.style.transition = ''

    let isResizing = onRightEdge || onBottomEdge || onTopEdge || onLeftEdge

    let center = {
      x: b.left + b.width / 2,
      y: b.top + b.height / 2,
    }

    clicked = {
      x: event.clientX - center.x,
      y: event.clientY - center.y,
      cx: event.clientX,
      cy: event.clientY,
      w: b.width,
      h: b.height,
      isResizing,
      onTopEdge,
      onLeftEdge,
      onRightEdge,
      onBottomEdge,
      startAngle,
    }
  }

  function onUp(event) {
    updateGlobalSettings(event)
    resetStyles(shape.current)

    clicked = null
  }

  function handleActiveShapeClick() {
    shape.current.style.transition = ''
    if (activeShape === shapes.length - 1) {
      setActiveShape(0)
    } else {
      setActiveShape(curr => curr + 1)
    }
  }

  function addWidthAndHeightUnits() {
    numbers.current.innerHTML = `${round(b.width)} x ${round(b.height)}`
    numbers.current.style.opacity = 1
  }

  function handleAlt($el, $rel) {
    if (pressedKeys.Alt) {
      $el.style.top = ''
      $el.style.right = ''
      $el.style.bottom = ''
      $el.style.left = ''
      $rel.style.display = 'flex'
      $rel.style.alignItems = 'center'
      $rel.style.justifyContent = 'center'
    } else {
      $rel.style.display = ''
      $rel.style.alignItems = ''
      $rel.style.justifyContent = ''
    }
  }

  function handleShift($el, len) {
    const limitedLength = pressedKeys.Alt && len > 345 ? 345 : len

    if (pressedKeys.Shift) {
      $el.style.width = `${limitedLength}px`
      $el.style.height = `${limitedLength}px`
    }
  }

  function handleLeft($el, len) {
    $el.style.width = `${len}px`
    $el.style.height = `${len}px`
  }

  function handleRight($el, len) {
    $el.style.width = `${len}px`
    $el.style.height = `${len}px`
  }

  function handleTop($el, len) {
    $el.style.width = `${len}px`
    $el.style.height = `${len}px`
  }

  function handleBottom($el, len) {
    $el.style.width = `${len}px`
    $el.style.height = `${len}px`
  }

  ;(function animate() {
    if (typeof window === 'undefined') return
    requestAnimationFrame(animate)

    if (!redraw) return

    const $shape = shape.current
    const $rel = rel.current

    redraw = false

    if (clicked) {
      glow.current.style.opacity = 0
    }

    if (clicked && clicked.isResizing) {
      if (clicked.onRightEdge) {
        let currentWidth = Math.max(x, minWidth)
        $shape.style.width = `${currentWidth}px`
        $shape.style.left = 0
        $shape.style.right = ''
        handleShift($shape, currentWidth)
      }

      if (clicked.onBottomEdge) {
        const currentHeight =
          Math.max(y, minHeight) > 345 ? 345 : Math.max(y, minHeight)

        $shape.style.height = `${currentHeight}px`
        $shape.style.top = 0
        $shape.style.bottom = ''
        handleShift($shape, currentHeight)
      }

      if (clicked.onLeftEdge) {
        const currentWidth = Math.max(
          clicked.cx - event.clientX + clicked.w,
          minWidth
        )

        if (currentWidth > minWidth) {
          $shape.style.width = `${currentWidth}px`
        }
        $shape.style.right = 0
        $shape.style.left = ''
        handleShift($shape, currentWidth)
      }

      if (clicked.onTopEdge) {
        let currentHeight = Math.max(
          clicked.cy - event.clientY + clicked.h,
          minHeight
        )
        currentHeight =
          pressedKeys.Alt && currentHeight > 345 ? 345 : currentHeight

        if (currentHeight > minHeight) {
          $shape.style.height = `${currentHeight}px`
        }
        $shape.style.bottom = 0
        $shape.style.top = ''
        handleShift($shape, currentHeight)
      }

      addWidthAndHeightUnits()
      handleAlt($shape, $rel)
    }

    // This code executes when mouse moves without clicking
    // style cursor
    if ((onRightEdge && onBottomEdge) || (onLeftEdge && onTopEdge)) {
      $shape.style.cursor = 'nwse-resize'
    } else if ((onRightEdge && onTopEdge) || (onBottomEdge && onLeftEdge)) {
      $shape.style.cursor = 'nesw-resize'
    } else if (onRightEdge || onLeftEdge) {
      $shape.style.cursor = 'ew-resize'
    } else if (onBottomEdge || onTopEdge) {
      $shape.style.cursor = 'ns-resize'
    } else {
      $shape.style.cursor = 'default'
    }
  })()

  return (
    <Frame>
      <Relative ref={rel} style={activeStyles}>
        <ShapeContainer
          style={activeStyles}
          onClick={handleActiveShapeClick}
          ref={shape}
          data-reset={resetActiveStyles}
        >
          <ShapeGlow ref={glow} />
          <Numbers ref={numbers} />
          <Active.Shape />
          <TopLeftCorner />
          <TopRightCorner />
          <BottomLeftCorner />
          <BottomRightCorner />
        </ShapeContainer>
        <ShapeContainer style={activeStyles} ref={shapeMirror} mirror>
          <Active.Mirror />
        </ShapeContainer>
      </Relative>
    </Frame>
  )
}

export default ShapeShifter

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
`
const ShapeContainer = styled.div`
  position: absolute;
  border: 1px solid #6166dc;
  cursor: pointer;
  will-change: width, height;

  ${p =>
    p.mirror &&
    `
    pointer-events: none;
    border: 1px solid transparent;
    top: 110%;
  `}
`

const ShapeGlow = styled.div`
  transition: opacity 0.3s ease;
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

const Corner = styled.div`
  height: 7px;
  width: 7px;
  background: #111216;
  border: 1px solid #6166dc;
  position: absolute;
  pointer-events: none;
`

const TopLeftCorner = styled(Corner)`
  top: -3px;
  left: -3px;
`

const TopRightCorner = styled(Corner)`
  top: -3px;
  right: -3px;
`

const BottomLeftCorner = styled(Corner)`
  bottom: -3px;
  left: -3px;
`

const BottomRightCorner = styled(Corner)`
  bottom: -3px;
  right: -3px;
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
