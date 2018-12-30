import React from 'react'
import styled, { keyframes } from 'styled-components'

import { media } from '@styles'

import { Spinner } from './Button'

export default ({ onClick, text, color = 'white', isSubmitting }) => (
  <ArrowButton onClick={onClick} color={color}>
    {isSubmitting ? (
      <Spinner />
    ) : (
      <ArrowAnimation color={color}>
        {text}
        <ArrowRightIcon fill={color} />
      </ArrowAnimation>
    )}
  </ArrowButton>
)

const ArrowButton = styled.button`
  display: flex;
  flex-direction: row;
  font-size: 16px;
  font-weight: 600;
  color: ${p => p.color};
  background: transparent;

  ${media.tablet`
    flex-direction: column;
  `};

  svg {
    position: relative;
    margin-left: 10px;
    top: 1px;
    transition: transform 300ms cubic-bezier(0.47, 0, 0.745, 0.715);
  }

  &:focus svg {
    transform: translateX(3rem);
  }
`

ArrowButton.defaultProps = {
  onClick: () => {},
  text: '',
}
const animateButtonLine = keyframes`
  0% {
      width: 0;
  }
  50% {
      width: 70%;
  }
  100% {
      width: 70%;
      left: 100%;
  }
`

const fadeInOut = keyframes`
  0% {
      opacity: 0;
      width: 0;
  }
  50% { opacity: 1; width: 40%}
  60% { opacity: 1; width: 70%}
  80% {
    opacity: 0;
    width: 50%;
    left: 100%;
  }
`

const ArrowAnimation = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  overflow-x: hidden;
  padding: 0 3rem 0 0;
  font-size: 1.8rem;

  ${media.tablet`
    padding: 0rem 3rem 0 0rem;
  `};

  &::after {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: 12px;
    height: 1px;
    width: 0;
    background: ${p => p.color};
    opacity: 0;
    z-index: 100;
  }

  svg {
    transition: all 300ms cubic-bezier(0.77, 0, 0.175, 1);
  }

  &:hover svg {
    transform: translateX(3rem);
  }

  &:hover span::after {
    animation: ${fadeInOut} 1s cubic-bezier(0.77, 0, 0.175, 1) forwards;
  }

  &:hover::after {
    opacity: 1;
    animation: ${animateButtonLine} 1s cubic-bezier(0.77, 0, 0.175, 1) forwards;

    ${media.tablet`
      animation: none;
    `};
  }
`

export const ArrowRightIcon = ({ fill = 'white' }) => (
  <svg width="35" height="7" viewBox="0 0 35 7" version="1.1">
    <g id="Canvas" fill="none">
      <g id="arrow-left-icon">
        <path
          id="triangle"
          d="M 3.5 0L 6.53109 5.25L 0.468911 5.25L 3.5 0Z"
          transform="matrix(0 1 -1 0 35 0)"
          fill={fill}
        />
        <line
          id="Line"
          y1="-0.5"
          x2="30"
          y2="-0.5"
          transform="translate(0 4)"
          stroke={fill}
        />
      </g>
    </g>
  </svg>
)
