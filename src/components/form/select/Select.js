import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const InputContainer = styled.div`
  position: relative;
  padding-top: 1.4rem;
  margin-bottom: 2rem;

  svg {
    position: absolute;
    right: 0.4rem;
    bottom: 1rem;
    pointer-events: none;
  }
`

const SelectBorder = styled.div`
  position: relative;
  border-bottom: 1px solid #b9bbbe;
  padding: 0.45em 0;
  pointer-events: initial;
  cursor: pointer;
`

const StyledLabel = styled.label`
  display: block;
  font-size: 1.6rem;
  color: ${props => props.theme.colors.grey};
  border: none;
`

const LabelAnimation = styled.span`
  display: block;
  position: absolute;
  bottom: 0;
  pointer-events: none;
  width: 100%;
  height: 100%;
  padding-top: 0.55rem;
`

const StyledSelect = styled.select`
  pointer-events: none;
  display: block;
  width: 100%;
  font-size: 1.6rem;
  height: 1.8rem;
  border: none;
  background: transparent;
  outline: none;
`

const SelectArrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="6"
    viewBox="0 0 10 5"
  >
    <g fill="none" fill-rule="evenodd">
      <path
        stroke="#000"
        stroke-opacity=".008"
        stroke-width="0"
        d="M-7-10h24v24H-7z"
      />
      <path fill="#000" d="M0 0l5 5 5-5z" />
    </g>
  </svg>
)

const StyledSelectArrow = styled(SelectArrow)`
  position: absolute;
  right: 0;
`

class Select extends Component {
  state = {
    showOptions: false,
  }

  handleClick = () => {
    this.setState({ showOptions: true })
    console.log('clicked')
  }

  render() {
    const { field, label, options } = this.props

    return (
      <InputContainer>
        <SelectBorder onClick={this.handleClick}>
          <StyledSelect {...field} {...this.props}>
            {options.map(option => {
              return <option>{option.name}</option>
            })}
          </StyledSelect>
          <LabelAnimation>
            <StyledLabel>{label}</StyledLabel>
          </LabelAnimation>
          <SelectArrow />
        </SelectBorder>
      </InputContainer>
    )
  }
}

Select.defaultProps = {
  options: [],
}

Select.propTypes = {
  label: PropTypes.string.isRequired,
}

export default Select
