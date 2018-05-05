import React, { Component } from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import { Formik, Form as FormikForm, Field } from 'formik'
import { Button, Container, Form } from '@components'
import { apiCall } from '@utils'

const FormHeader = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 3rem;
  color: ${props => props.theme.colors.grey};
`

const FormSection = styled.fieldset`
  margin-bottom: ${props => (props.spacing === 'large' ? '5rem' : '3.5rem')};
`

const StyledFormikForm = styled(FormikForm)`
  width: 46rem;
  align-self: flex-end;
  position: relative;
  padding-bottom: 10rem;
`

const selectOptions = [
  {
    label: 'Startup',
    id: 'startup',
    value: 'Startup',
  },
  {
    label: 'Growing business',
    id: 'growingBusiness',
    value: 'Growing business',
  },
  {
    label: 'Enterprise',
    id: 'enterprise',
    value: 'Enterprise',
  },
]

const radioOptions = [
  {
    label: 'Branding',
    id: 'branding',
    value: 'Branding',
  },
  {
    label: 'Product and Web',
    id: 'productAndWeb',
    value: 'Product and Web',
  },
  {
    label: 'Editorial',
    id: 'editorial',
    value: 'Editorial',
  },
  {
    label: 'Other',
    id: 'other',
    value: 'Other',
  },
]

const validate = (values, props) => {
  let errors = {}

  if (!values.name) {
    errors.name = 'Required'
  }

  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  return errors
}

class ContactForm extends Component {
  handleSubmit = async values => {
    const { name, email, companySize, project, details } = values
    console.log({ values })

    const method = 'post'
    const endpoint = '/contact/proposal'
    const data = {
      companySize,
      email,
      details,
      name,
      project,
    }

    const response = await apiCall({ method, endpoint, data })
  }

  render() {
    return (
      <Formik
        onSubmit={this.handleSubmit}
        validate={validate}
        render={props => (
          <StyledFormikForm>
            <FormSection>
              <FormHeader>About you</FormHeader>
              <Field component={Form.Text} label="Full name" name="name" />
              <Field component={Form.Text} label="Email" name="email" />
              <Field
                component={Form.Select}
                label="Size of company"
                name="companySize"
                options={selectOptions}
              />
            </FormSection>
            <FormSection spacing="large">
              <FormHeader>About your project</FormHeader>
              <Form.Radio options={radioOptions} name="project" />
            </FormSection>
            <FormSection>
              <FormHeader>Give us the details</FormHeader>
              <Field
                component={Form.Text}
                label="Tell us a bit more"
                name="details"
              />
            </FormSection>
            <Button text="Submit" />
          </StyledFormikForm>
        )}
      />
    )
  }
}

export default ContactForm
