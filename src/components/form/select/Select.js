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
    right: 0.6rem;
    bottom: 0.8rem;
  }
`

const SelectBorder = styled.div`
  position: relative;
  border-bottom: 1px solid #b9bbbe;
  padding: 0.45em 0;
  pointer-events: initial;
  cursor: pointer;
`

const SelectBorderActive = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  width: 100%;
  height: 1px;
  border-bottom: 1px solid #000;
  transform-origin: left;
  transform: scale(0);
  transition: all 400ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
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

const SelectOption = styled.div`
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

const SelectArrowButton = styled.button`
  background: transparent;
  border: none;
  position: absolute;
  right: 0;
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 50%;
  bottom: 0rem;
  background: transparent;
  transform: scale(0.6);
  transition: all 300ms ${props => props.theme.transitions.out};

  &:focus,
  &:active {
    transform: scale(1.6);
    background: rgba(0, 0, 0, 0.06);
  }
  &:focus ~ ${SelectBorderActive}, &:active ~ ${SelectBorderActive} {
    transform: scale(1);
  }
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

class Select extends Component {
  state = {
    isOpened: false,
    selectedValue: '',
  }

  handleClickOutside(event) {
    this.setState({ isOpened: false })
  }

  toggleSelectDropdown = event => {
    event.preventDefault()
    this.setState({ isOpened: !this.state.isOpened })

    if (event.keyCode === 40 || event.keyCode === 32) {
      this.setState({ isOpened: true })
    }
    if (event.keyCode === 27) {
      this.setState({ isOpened: false })
    }
  }

  handleSelectClick = selectedValue => {
    this.setState({ selectedValue })
    this.props.form.setFieldValue(this.props.field.name, selectedValue, true)
  }

  handleFocus = () => {
    document.addEventListener('keydown', this.toggleSelectDropdown)
  }

  handleBlur = () => {
    document.removeEventListener('keydown', this.toggleSelectDropdown)
  }

  render() {
    const { field, label, options } = this.props
    const { isOpened, selectedValue } = this.state

    return (
      <InputContainer onClick={event => this.toggleSelectDropdown(event)}>
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
          <SelectArrowButton
            type="button"
            tabIndex="0"
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            innerRef={elem => (this.btn = elem)}
          />
          <SelectBorderActive />
          <SelectArrow />
          <StyledSelect {...field} {...this.props} value={selectedValue}>
            <FadeIn in={isOpened}>
              <SelectOptionContainer isOpened={isOpened} role="menu">
                {options.map(option => {
                  return (
                    <SelectOption
                      key={option.id}
                      role="menuitem"
                      onClick={() => this.handleSelectClick(option.value)}
                    >
                      {option.value}
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
  options: [],
}

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default enhanceWithClickOutside(Select)
