import React, { Component } from 'react'
import styled from 'styled-components'
import { media } from '@styles'

const RadioContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1.5rem;

  ${media.tablet`
    display: block;
  `};
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
  margin: 0;
  transition: all 200ms ${props => props.theme.transitions.easeIn};

  ${media.tablet`
    margin-bottom: 1.5rem;
  `};

  &::after {
    position: absolute;
    content: '';
    display: inline-block;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    opacity: 0;
    box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.16);
    transition: opacity 200ms ${props => props.theme.transitions.easeIn};
  }

  &:hover::after {
    opacity: 1;
  }
`

const StyledRadioInput = styled.input`
  opacity: 0;
  height: 0;
  width: 0;
  position: absolute;

  &:checked + ${StyledLabel} {
    border: 1px solid #000;
    color: #000;
    font-weight: 500;
  }

  &:checked + ${StyledLabel}::after {
    opacity: 1;
  }
`

class Radio extends Component {
  state = {
    selectedValue: '',
  }

  handleClick = selectedValue => {
    this.setState({ selectedValue })
    this.props.form.setFieldValue(this.props.field.name, selectedValue)
  }

  render() {
    const { options } = this.props

    return (
      <React.Fragment>
        <RadioContainer>
          {options.map(option => (
            <div key={option.value} style={{ position: 'relative' }}>
              <StyledRadioInput
                type="radio"
                id={option.id}
                value={option.value}
                checked={this.state.selectedValue === option.value}
                onClick={() => this.handleClick(option.value)}
              />
              <StyledLabel htmlFor={option.id}>{option.label}</StyledLabel>
            </div>
          ))}
        </RadioContainer>
      </React.Fragment>
    )
  }
}
Radio.propTypes = {
  // label: PropTypes.string.isRequired,
}

export default Radio
