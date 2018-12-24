import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const InputContainer = styled.div`
  position: relative;
  padding: 1.4rem 0 2.5rem;
`

const InputBorder = styled.div`
  position: relative;
  padding: 0.45em 0;
  ${props =>
    props.hasError
      ? `border-bottom: 1px solid ${props.theme.colors.red}`
      : `border-bottom: 1px solid #b9bbbe`};
`

const InputBorderActive = styled.div`
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

  ${props => props.hasError && `display: none;`};
`

const StyledLabel = styled.label`
  display: block;
  font-size: 1.6rem;
  color: ${props =>
    props.hasError ? props.theme.colors.red : props => props.theme.colors.grey};
  border: none;
  pointer-events: none;
`

const InputError = styled.div`
  position: absolute;
  bottom: 0.5rem;
  color: ${props => props.theme.colors.red};
  font-size: 1.2rem;
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
    props.hasValue &&
    `
    ${LabelAnimation} {
      font-weight: 500;
      width: 133.3333333%;
      transform: translateY(-1.28125em) scale(0.8) perspective(100px)
        translateZ(0.001px);
    }
  `};
`

const StyledInput = styled.textarea`
  display: block;
  width: 100%;
  font-size: 1.6rem;
  border: none;
  background: transparent;
  resize: none;

  &:active,
  &:focus {
    outline: none;
  }

  &[value]:not([value='']) ~ ${LabelAnimation} {
    font-weight: 500;
    width: 133.3333333%;
    transform: translateY(-1.28125em) scale(0.8) perspective(100px)
      translateZ(0.001px);
  }

  &:active ~ ${LabelAnimation}, &:focus ~ ${LabelAnimation} {
    font-weight: 500;
    width: 133.3333333%;
    transform: translateY(-1.28125em) scale(0.8) perspective(100px)
      translateZ(0.001px);
  }
  &:active ~ ${InputBorderActive}, &:focus ~ ${InputBorderActive} {
    transform: scale(1);
  }
`

class Textarea extends Component {
  state = {
    value: '',
  }

  handleTyping = value => {
    this.setState({ value: this.textarea.value })
    this.textarea.style.height = 'auto'
    this.textarea.style.height = this.textarea.scrollHeight + 'px'
  }

  render() {
    const { field, label, ...props } = this.props
    const hasError =
      props.form.touched[field.name] && props.form.errors[field.name]

    return (
      <InputContainer>
        <InputBorder hasError={hasError}>
          <StyledInput
            onInput={this.handleTyping}
            rows="1"
            type="text"
            {...field}
            {...props}
            innerRef={elem => (this.textarea = elem)}
          />
          <LabelAnimation hasValue={this.state.value}>
            <StyledLabel hasError={hasError}>{label}</StyledLabel>
          </LabelAnimation>
          <InputBorderActive hasError={hasError} />
        </InputBorder>
        <InputError hasError={hasError}>
          {hasError && props.form.errors[field.name]}
        </InputError>
      </InputContainer>
    )
  }
}

Textarea.propTypes = {
  label: PropTypes.string.isRequired,
}

export default Textarea
