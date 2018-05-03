import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import enhanceWithClickOutside from 'react-click-outside'
import { FadeIn } from '../../transitions'

const InputContainer = styled.div`
  position: relative;
  padding-top: 1.4rem;
  margin-bottom: 2rem;
  z-index: 100;

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
  color: ${props => (props.selectedValue ? '#000' : props.theme.colors.grey)};
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

  transform: perspective(100px);
  transform-origin: 0 0;
  transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1),
    color 0.4s cubic-bezier(0.25, 0.8, 0.25, 1),
    width 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);

  ${props =>
    props.selectedValue &&
    `
    font-weight: 500;
    width: 133.3333333%
    transform: translateY(-1.28125em) scale(0.8) perspective(100px)
      translateZ(0.001px);
      `};
`

const StyledSelect = styled.div`
  display: block;
  width: 100%;
  font-size: 1.6rem;
  height: 1.8rem;
  border: none;
  background: transparent;
  outline: none;
`

const SelectOption = styled.option`
  padding: 0.8rem 1.2rem;
  transition: all 200ms ${props => props.theme.transitions.easeOut};

  &:hover {
    background: rgba(0, 0, 0, 0.06);
  }
`

const SelectOptionContainer = styled.div`
  pointer-events: ${props => (props.isOpened ? 'initial' : 'none')};
  position: absolute;
  top: 0px;
  right: 0px;
  background: rgb(255, 255, 255);
  width: 100%;
  border-radius: 3px;
  padding: 0.6rem 0px;
  box-shadow: rgba(99, 114, 130, 0.12) 0px 0px 0px 1px,
    rgba(27, 39, 51, 0.16) 0px 8px 16px;
`

const SelectArrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="6"
    viewBox="0 0 10 5"
  >
    <g fill="none" fillRule="evenodd">
      <path
        stroke="#000"
        strokeOpacity=".008"
        strokeWidth="0"
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
    isOpened: false,
    selectedValue: '',
  }

  handleClickOutside(event) {
    this.setState({ isOpened: false })
  }

  toggleSelectDropdown = event => {
    this.setState({ isOpened: !this.state.isOpened })
  }

  handleSelectClick = selectedValue => {
    this.setState({ selectedValue })
  }

  render() {
    const { field, label, options } = this.props
    const { isOpened, selectedValue } = this.state

    return (
      <InputContainer onClick={() => this.toggleSelectDropdown()}>
        <SelectBorder>
          <LabelAnimation selectedValue={selectedValue}>
            <StyledLabel>{label}</StyledLabel>
          </LabelAnimation>
          <LabelAnimation>
            {selectedValue && (
              <StyledLabel selectedValue={selectedValue}>
                {selectedValue}
              </StyledLabel>
            )}
          </LabelAnimation>
          <SelectArrow />
          <StyledSelect {...field} {...this.props} value={selectedValue}>
            <FadeIn in={isOpened}>
              <SelectOptionContainer isOpened={isOpened}>
                {options.map(option => {
                  return (
                    <SelectOption
                      key={option.name}
                      onClick={() => this.handleSelectClick(option.name)}
                    >
                      {option.name}
                    </SelectOption>
                  )
                })}
              </SelectOptionContainer>
            </FadeIn>
          </StyledSelect>
        </SelectBorder>
      </InputContainer>
    )
  }
}

Select.defaultProps = {
  options: [
    {
      name: 'Thiago Costa',
    },
    {
      name: 'Dennis Brotzky',
    },
    {
      name: 'Mack Attack',
    },
    {
      name: 'Nicolas Wells',
    },
  ],
}

Select.propTypes = {
  label: PropTypes.string.isRequired,
}

export default enhanceWithClickOutside(Select)
