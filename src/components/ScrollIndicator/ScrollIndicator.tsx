import React from 'react'
import styled, { keyframes } from 'styled-components'

import Section from '@components/Section'

const ScrollIndicator = ({ mode }: { mode?: string }) => (
  <Frame mode={mode}>
    <Bar mode={mode} />
  </Frame>
)

export default ScrollIndicator

const Frame = styled.div`
  position: relative;
  width: 1px;
  height: 90px;
  background: ${p =>
    p.mode === 'dark' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)'};
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
  background: ${p => (p.mode === 'dark' ? '#000' : '#fff')};
  animation: ${animateUp} 1.2s cubic-bezier(0.694, 0, 0.335, 1) forwards 0.5s;
`
