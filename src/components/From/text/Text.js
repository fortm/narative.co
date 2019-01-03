import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { isMobile } from 'react-device-detect'

import { media } from '@styles'

class Text extends Component {
  input = React.createRef()

  state = { focusCount: 0 }

  componentDidMount() {
    if (isMobile) return

    if (this.props.autoFocus) {
      this.input.current.focus()
    }
  }

  handleFocus = () => {
    this.setState({ focusCount: this.state.focusCount + 1 })
  }

  render() {
    const { autoFocus, field, label, ...rest } = this.props

    const hasError =
      this.props.form.touched[field.name] && this.props.form.errors[field.name]
    const allowFocus = this.state.focusCount > 1 || !autoFocus

    console.log(this.props.form, field)
    return (
      <InputContainer>
        <InputBorder hasError={hasError}>
          <StyledInput
            type="text"
            autoComplete="Off"
            allowFocus={allowFocus}
            onFocus={this.handleFocus}
            ref={this.input}
            {...field}
            {...rest}
            autoFocus={false}
          />
          <LabelAnimation hasValue={field.value}>
            <StyledLabel hasError={hasError}>{label}</StyledLabel>
          </LabelAnimation>
          <InputBorderActive hasError={hasError} />
        </InputBorder>
        <InputError hasError={hasError}>
          {hasError && this.props.form.errors[field.name]}
        </InputError>
      </InputContainer>
    )
  }
}

Text.propTypes = {
  label: PropTypes.string.isRequired,
}

export default Text

const InputContainer = styled.div`
  position: relative;
  top: -15px;
  padding: 1.4rem 0 1rem;
  width: 400px;

  ${media.tablet`
    top: 0;
    padding: 1.4rem 0 2rem;
    width: 100%;
  `};
`

const InputError = styled.div`
  position: absolute;
  bottom: 0.1rem;
  color: ${p => p.theme.colors.red};
  font-size: 1.2rem;

  ${media.tablet`
    bottom: 0.5rem;
  `};
`

const InputBorder = styled.div`
  position: relative;

  ${media.tablet`
    padding: 0.35em 0 0.4rem;
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
  color: ${p => (p.hasError ? p.theme.colors.red : 'rgba(0,0,0,0.33)')};
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
  font-weight: 300;

  transform: perspective(100px);
  transform-origin: 0 0;
  transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1),
    color 0.4s cubic-bezier(0.25, 0.8, 0.25, 1),
    font-weight 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) 0.1s,
    width 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);

  ${media.tablet`
    padding-top: 0.55rem;
  `};

  ${p =>
    p.hasValue &&
    `
    label { color: #000; }
    font-weight: 500;
    width: 133.3333333%;
    transform: translateY(-1em) scale(0.45) perspective(100px)
      translateZ(0.001px);
  `};

  ${p =>
    p.hasValue &&
    media.tablet`
      width: 133.3333333%;
      transform: translateY(-1.28125em) scale(0.8) perspective(100px)
        translateZ(0.001px);
    `};
`

const StyledInput = styled.input`
  display: block;
  width: 100%;
  font-size: 3.2rem;
  font-weight: 300;
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

  ${p =>
    p.allowFocus &&
    `
    &:active ~ ${LabelAnimation}, &:focus ~ ${LabelAnimation} {
      label { color: #000; }
      font-weight: 500;
      width: 133.3333333%;
      transform: translateY(-1em) scale(0.45) perspective(100px)
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
  `};

  &:active ~ ${LabelAnimation}, &:focus ~ ${LabelAnimation} {
    ${media.tablet`
          width: 133.3333333%;
          transform: translateY(-1.28125em) scale(0.8) perspective(100px)
            translateZ(0.001px);
        `};
  }
`
