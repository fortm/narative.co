import React from 'react'
import styled, { keyframes } from 'styled-components'

import Section from '@components/Section'

const ScrollIndicator = () => (
  <Frame>
    <Bar />
  </Frame>
)

export default ScrollIndicator

const Frame = styled.div`
  position: relative;
  width: 1px;
  height: 90px;
  background: rgba(255, 255, 255, 0.2);
  top: ;
`

const animateUp = keyframes`
  from { transform: translateY(0); }
  to { transform: translateY(-60px); }
`

const Bar = styled.div`
  position: absolute;
  width: 1px;
  height: 30px;
  bottom: 0;
  background: #fff;
  animation: ${animateUp} 1s var(--ease-out-cubic) forwards;
`
