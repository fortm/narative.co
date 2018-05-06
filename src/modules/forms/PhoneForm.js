import React, { Component } from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import { Formik, Form as FormikForm, Field } from 'formik'
import { Button, Container, Form } from '@components'

const FormHeader = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 3rem;
  color: ${props => props.theme.colors.grey};
`

const FormSection = styled.fieldset`
  margin-bottom: 5rem;
`

const StyledFormikForm = styled(FormikForm)`
  width: 46rem;
  align-self: flex-end;
  position: relative;
`

const PhoneIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" version="1.1">
    <g id="Canvas" fill="none">
      <path
        id="Fill 2"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M 3.01667 6.49167C 4.21667 8.85 6.15 10.775 8.50833 11.9833L 10.3417 10.15C 10.5667 9.925 10.9 9.85 11.1917 9.95C 12.125 10.2583 13.1333 10.425 14.1667 10.425C 14.625 10.425 15 10.8 15 11.2583L 15 14.1667C 15 14.625 14.625 15 14.1667 15C 6.34167 15 0 8.65833 0 0.833333C 0 0.375 0.375 0 0.833333 0L 3.75 0C 4.20833 0 4.58333 0.375 4.58333 0.833333C 4.58333 1.875 4.75 2.875 5.05833 3.80833C 5.15 4.1 5.08333 4.425 4.85 4.65833L 3.01667 6.49167Z"
        fill="white"
      />
    </g>
  </svg>
)

const validate = (values, props) => {
  let errors = {}

  if (!values.phone) {
    errors.phone = 'Required'
  }

  return errors
}

class ContactForm extends Component {
  handleSubmit(event) {
    console.log(event)
  }

  render() {
    return (
      <Formik
        onSubmit={this.handleSubmit}
        validate={validate}
        render={props => (
          <StyledFormikForm>
            <FormSection>
              <Field component={Form.Phone} label="123 456-7890" name="phone" />
            </FormSection>
          </StyledFormikForm>
        )}
      />
    )
  }
}

export default ContactForm
