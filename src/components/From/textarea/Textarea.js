import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { media } from '@styles'

class Textarea extends Component {
  textarea = React.createRef()

  state = { value: '' }

  componentDidMount() {
    this.handleTyping()
  }

  handleTyping = () => {
    const textarea = this.textarea.current

    this.setState({ value: textarea.value })
    textarea.style.height = 'auto'
    textarea.style.height = textarea.scrollHeight + 'px'
  }

  render() {
    const { field, label, maxLength, rows, ...props } = this.props
    const hasError =
      props.form.touched[field.name] && props.form.errors[field.name]

    return (
      <InputContainer>
        <InputBorder hasError={hasError}>
          <StyledInput
            onInput={this.handleTyping}
            ref={this.textarea}
            rows={rows}
            type="text"
            maxLength={maxLength || 290}
            {...field}
            {...props}
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

const InputContainer = styled.div`
  position: relative;
  top: -15px;
  padding: 1.4rem 0 1rem;
  width: 500px;

  &::after {
    content: '';
    height: 1px;
    width: 295px;
    position: absolute;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.25);
  }

  ${media.tablet`
    top: 0;
    padding: 1.4rem 0 2.5rem;
    width: 100%;

    &::after {
      content: none;
    }
  `};
`

const InputError = styled.div`
  position: absolute;
  bottom: 0.3rem;
  color: ${p => p.theme.colors.red};
  font-size: 1.2rem;

  ${media.tablet`
    bottom: 0.5rem;
  `};
`

const InputBorder = styled.div`
  position: relative;

  ${media.tablet`
    padding: 0.45em 0;
  ${p =>
    p.hasError
      ? `border-bottom: 1px solid ${p.theme.colors.red}`
      : `border-bottom: 1px solid #b9bbbe`};
    `};
`

const InputBorderActive = styled.div`
  ${media.tablet`
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1px;
    width: 100%;
    height: 1px;
    border-bottom: 1px solid #000;
    transform-origin: left;
    transform: scale(0);
    transition: all 400ms cubic-bezier(0.23, 1, 0.32, 1);
  `};

  ${p => p.hasError && `display: none;`};
`

const StyledLabel = styled.label`
  display: block;
  font-size: 3.2rem;
  color: ${p => (p.hasError ? p.theme.colors.red : 'rgba(0,0,0,0.25)')};
  border: none;
  pointer-events: none;

  ${media.tablet`
    font-size: 1.6rem;
    color: ${p => (p.hasError ? p.theme.colors.red : 'rgba(0,0,0,0.33)')};
  `};
`

const LabelAnimation = styled.span`
  display: block;
  position: absolute;
  bottom: 0;
  pointer-events: none;
  width: 100%;
  height: 100%;

  transform: perspective(100px);
  transform-origin: 0 0;
  transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1),
    color 0.4s cubic-bezier(0.25, 0.8, 0.25, 1),
    width 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);

  ${p =>
    p.hasValue &&
    `
    label {
      color: #000;
    }

    font-weight: 500;
    width: 133.3333333%;
    transform: translateY(-1.28125em) scale(0.45) perspective(100px)
      translateZ(0.001px);
  `};

  ${media.tablet`
  ${p =>
    p.hasValue &&
    `
      width: 133.3333333%;
      transform: translateY(-1.28125em) scale(0.8) perspective(100px)
        translateZ(0.001px);
        `}`};

  ${media.tablet`
    padding-top: 0.55rem;
  `};
`

const StyledInput = styled.textarea`
  display: block;
  width: 100%;
  font-size: 3.2rem;
  height: 4.8rem;
  border: none;
  background: transparent;
  color: ${p => p.theme.colors.grey};
  -webkit-text-fill-color: ${p => p.theme.colors.grey};

  ${media.tablet`
    font-size: 1.6rem;
    height: 1.8rem;
    color: #000;
  `};

  &:active,
  &:focus {
    outline: none;
  }

  &[value]:not([value='']) ~ ${LabelAnimation} {
    label {
      color: #000;
    }

    font-weight: 500;
    width: 133.3333333%;
    transform: translateY(-1.28125em) scale(0.45) perspective(100px)
      translateZ(0.001px);

    ${media.tablet`
      width: 133.3333333%;
      transform: translateY(-1.28125em) scale(0.8) perspective(100px)
        translateZ(0.001px);
    `};
  }

  &:active ~ ${LabelAnimation}, &:focus ~ ${LabelAnimation} {
    label {
      color: #000;
    }

    font-weight: 500;
    width: 133.3333333%;
    transform: translateY(-1.28125em) scale(0.45) perspective(100px)
      translateZ(0.001px);

    ${media.tablet`
      width: 133.3333333%;
      transform: translateY(-1.28125em) scale(0.8) perspective(100px)
        translateZ(0.001px);
    `};
  }

  &:active ~ ${InputBorderActive}, &:focus ~ ${InputBorderActive} {
    transform: scale(1);
  }
`
