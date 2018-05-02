import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const RadioContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1.5rem;
`

const StyledLabel = styled.label`
  position: relative;
  display: block;
  font-size: 1.8rem;
  color: ${props => props.theme.colors.grey};
  border: none;
  border: 1px solid ${props => props.theme.colors.grey};
  border-radius: 3px;
  height: 45px;
  display: flex;
  font-size: 1.6rem;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 200ms ${props => props.theme.transitions.easeIn};

  &::after {
    position: absolute;
    content: '';
    display: inline-block;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    opacity: 0;
    box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.2);
    transition: opacity 200ms ${props => props.theme.transitions.easeIn};
  }
`

const StyledRadioInput = styled.input`
  opacity: 0;
  height: 0;
  width: 0;
  position: absolute;

  &:checked + ${StyledLabel} {
    border-color: #000;
    color: #000;
  }

  &:checked + ${StyledLabel}::after {
    opacity: 1;
  }

  &:checked + ${StyledLabel}::after {
    opacity: 1;
  }
`

const Radio = ({ field, label, options, name, ...props }) => {
  return (
    <React.Fragment>
      <RadioContainer>
        {options.map(option => (
          <div key={option.value} style={{ position: 'relative' }}>
            <StyledRadioInput
              type="radio"
              id={option.id}
              value={option.value}
              name={name}
            />
            <StyledLabel htmlFor={option.id}>{option.label}</StyledLabel>
          </div>
        ))}
      </RadioContainer>
    </React.Fragment>
  )
}

Radio.propTypes = {
  // label: PropTypes.string.isRequired,
}

export default Radio
