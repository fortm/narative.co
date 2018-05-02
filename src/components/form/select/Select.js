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
  pointer-events: ${props => (props.isOpen ? 'initial' : 'none')};
  padding: 0.8rem 1.2rem;
  transition: all 200ms ${props => props.theme.transitions.easeOut};

  &:hover {
    background: rgba(0, 0, 0, 0.06);
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

const StyledSelectArrow = styled(SelectArrow)`
  position: absolute;
  right: 0;
`

class Select extends Component {
  state = {
    isOpen: false,
    selectedValue: '',
  }

  handleClickOutside(event) {
    console.log(event)
    this.toggleSelectDropdown()
  }

  toggleSelectDropdown = event => {
    console.log(event)
    this.setState({ isOpen: !this.state.isOpen })
  }

  handleSelectClick = selectedValue => {
    this.setState({ selectedValue })
  }

  render() {
    const { field, label, options } = this.props
    const { isOpen, selectedValue } = this.state

    return (
      <InputContainer onClick={() => this.toggleSelectDropdown()}>
        <SelectBorder>
          <LabelAnimation>
            <StyledLabel selectedValue={selectedValue}>
              {selectedValue || label}
            </StyledLabel>
          </LabelAnimation>
          <SelectArrow />
          <StyledSelect {...field} {...this.props} value={selectedValue}>
            <FadeIn in={isOpen}>
              <div
                style={{
                  position: 'absolute',
                  top: '0',
                  right: '0',
                  background: '#fff',
                  width: '100%',
                  borderRadius: '3px',
                  padding: '0.6rem 0',
                  boxShadow:
                    '0 8px 10px 1px rgba(0,0,0,0.14), 0 3px 14px 2px rgba(0,0,0,0.12), 0 5px 5px -3px rgba(0,0,0,0.2)',
                  boxShadow:
                    '0 0 0 1px rgba(99,114,130,0.12), 0 8px 16px rgba(27,39,51,0.16)',
                }}
              >
                {options.map(option => {
                  return (
                    <SelectOption
                      key={option.name}
                      isOpen={isOpen}
                      onClick={() => this.handleSelectClick(option.name)}
                    >
                      {option.name}
                    </SelectOption>
                  )
                })}
              </div>
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
