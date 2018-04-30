import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 4.5rem;
  border: 1px solid #000;
  border-radius: 3px;
  background: #000;
  color: #fff;
  font-weight: 500;
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.1);
`
const Button = ({ text, type }) => {
  return <StyledButton type={type || 'submit'}>{text}</StyledButton>
}

export default Button
