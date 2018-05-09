import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import MaskedInput from 'react-text-mask'

const phoneNumberMasker = [
  '(',
  /[1-9]/,
  /\d/,
  /\d/,
  ')',
  ' ',
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
]

const InputContainer = styled.div`
  position: relative;
  padding: 1.4rem 0 2.5rem;
  overflow-x: hidden;
`

const InputBorder = styled.div`
  position: relative;
  ${props =>
    props.hasError
      ? `border-bottom: 2px solid ${props.theme.colors.red}`
      : `border-bottom: 1px solid #fff`};

  padding: 0.45em 0;

  svg {
    position: absolute;
    left: 0;
    top: 0.5rem;
  }
`

const StyledLabel = styled.label`
  display: block;
  font-size: 1.6rem;
  color: ${props =>
    props.hasError ? props.theme.colors.red : props.theme.colors.grey};
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
  left: 6rem;
  pointer-events: none;
  width: 100%;
  height: 100%;
  padding-top: 0.55rem;

  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
`

const StyledInput = styled(MaskedInput)`
  display: block;
  width: 100%;
  font-size: 1.6rem;
  height: 1.8rem;
  border: none;
  background: transparent;
  padding-left: 6rem;
  color: #fff;

  &:active,
  &:focus {
    outline: none;
  }

  &[value]:not([value='']) ~ ${LabelAnimation} {
    opacity: 0;
  }

  &:active ~ ${LabelAnimation}, &:focus ~ ${LabelAnimation} {
    opacity: 0.4;
  }
`

const PlusOne = styled.div`
  position: absolute;
  left: 2.4rem;
  top: 0.6rem;
  color: ${props => (props.hasError ? props.theme.colors.red : '#fff')};
`

const StyledButton = styled.button`
  position: absolute;
  right: 0rem;
  top: 0.5rem;
  background: transparent;
  border: none;
  font-weight: 500;
  color: ${props => props.theme.colors.grey};
  color: #fff;
`

const PhoneIcon = ({ hasError }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" version="1.1">
    <g id="Canvas" fill="none">
      <g id="phone-icon">
        <path
          id="Stroke 1"
          d="M 0 0L 24 0L 24 24L 0 24L 0 0Z"
          strokeWidth="0"
          stroke="black"
          strokeOpacity="0.01"
        />
        <path
          id="Fill 2"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M 3.01667 6.49167C 4.21667 8.85 6.15 10.775 8.50833 11.9833L 10.3417 10.15C 10.5667 9.925 10.9 9.85 11.1917 9.95C 12.125 10.2583 13.1333 10.425 14.1667 10.425C 14.625 10.425 15 10.8 15 11.2583L 15 14.1667C 15 14.625 14.625 15 14.1667 15C 6.34167 15 0 8.65833 0 0.833333C 0 0.375 0.375 0 0.833333 0L 3.75 0C 4.20833 0 4.58333 0.375 4.58333 0.833333C 4.58333 1.875 4.75 2.875 5.05833 3.80833C 5.15 4.1 5.08333 4.425 4.85 4.65833L 3.01667 6.49167Z"
          transform="translate(4 4)"
          fill={hasError ? '#f44336' : '#fff'}
        />
      </g>
    </g>
  </svg>
)

const Phone = ({ field, label, ...props }) => {
  const hasError =
    props.form.touched[field.name] && props.form.errors[field.name]

  return (
    <InputContainer>
      <InputBorder hasError={hasError}>
        <StyledInput
          mask={phoneNumberMasker}
          guide={false}
          type="tel"
          {...field}
          {...props}
          onKeyDown={e => {
            // A temporary workaround
            let cursorPos = Number(e.target.selectionStart)
            let keyCode = Number(e.keyCode)

            if ((cursorPos === 6 || cursorPos === 10) && keyCode === 8) {
              e.preventDefault()

              e.target.value = e.target.value || ''
              e.target.value = e.target.value.replace(/\D+/g, ' ')
              // Simulate backspace delete
              e.target.value = e.target.value.substring(
                0,
                e.target.value.length - 1
              )
            }
          }}
        />
        <PhoneIcon hasError={hasError} />
        <PlusOne hasError={hasError}>+1</PlusOne>
        <LabelAnimation>
          <StyledLabel hasError={hasError}>{label}</StyledLabel>
        </LabelAnimation>
        <StyledButton type="submit">Submit</StyledButton>
      </InputBorder>
      <InputError hasError={hasError}>
        {hasError && props.form.errors[field.name]}
      </InputError>
    </InputContainer>
  )
}

Phone.propTypes = {
  label: PropTypes.string.isRequired,
}

export default Phone
