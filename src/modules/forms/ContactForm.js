import React, { Component } from 'react'
import Link from 'gatsby-link'
import styled, { keyframes } from 'styled-components'
import { Formik, Form as FormikForm, Field } from 'formik'
import { Button, Form } from '@components'
import { media } from '@styles'
import { apiCall } from '@utils'
import { SubmittedCheckIcon } from '../../icons/ui'

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const FormHeader = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 3rem;
  color: ${props => props.theme.colors.grey};
`

const FormSection = styled.fieldset`
  margin-bottom: ${props => (props.spacing === 'large' ? '5rem' : '3.5rem')};

  ${media.hdpi`
  margin-bottom: ${props => (props.spacing === 'large' ? '4rem' : '3rem')};
  
  `};
`

const StyledFormikForm = styled(FormikForm)`
  align-self: flex-end;
  position: relative;
  width: 46rem;
  padding-bottom: 10rem;
  margin: 0 auto;

  ${media.hdpi`
    margin-left: 0;
    width: 100%;
    padding: 0 4rem 5rem;
  `};

  ${media.desktop`
    width: 50rem;
    margin: 0 auto;
    padding: 0 0 5rem;
  `};

  ${media.phablet`
    width: 100%;
  `};
`

const SubmittedScreen = styled.div`
  width: 46rem;
  height: 53rem;
  padding-bottom: 10rem;
  margin: 0 auto;
  align-self: flex-end;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  opacity: 0;
  animation: ${fadeIn} 50ms 500ms ${props => props.theme.transitions.in}
    forwards;

  ${media.mdpi`
    padding-bottom: 0;
    margin: 0 auto;
  `};

  svg {
    margin-bottom: 3rem;
  }
`

const SubmittedHeader = styled.h2`
  font-size: 3.2rem;
  line-height: 1;
  margin-bottom: 3rem;

  ${media.mdpi`
    font-size: 2.8rem;
  `};
`

const SubmittedText = styled.p`
  color: ${props => props.theme.colors.grey};
  font-size: 1.6rem;
  max-width: 220px;
  margin-bottom: 3rem;
`

const SubmittedBackButton = styled(Link)`
  text-decoration: underline;
  font-size: 1.6rem;
  font-weight: 500;
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
    label: 'Product and Web',
    id: 'productAndWeb',
    value: 'Product and Web',
  },
  {
    label: 'Branding',
    id: 'branding',
    value: 'Branding',
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
  state = {
    submitted: false,
    firstName: '',
  }

  handleSubmit = async (values, { setSubmitting }) => {
    const { name, email, companySize, project, details } = values

    const method = 'post'
    const endpoint = '/contact/proposal'
    const data = {
      companySize,
      email,
      details,
      name,
      project,
    }

    try {
      await apiCall({ method, endpoint, data })

      setSubmitting(false)
      this.setState({ submitted: true, firstName: name.split(' ')[0] })
    } catch (err) {
      console.warn(err)
    }
  }

  render() {
    return (
      <div>
        {this.state.submitted ? (
          <SubmittedScreen>
            <SubmittedCheckIcon />
            <SubmittedHeader>Thank you, {this.state.firstName}</SubmittedHeader>
            <SubmittedText>
              Our business development team will get back to you shortly.
            </SubmittedText>
            <SubmittedBackButton to="/">Go back</SubmittedBackButton>
          </SubmittedScreen>
        ) : (
          <Formik
            onSubmit={this.handleSubmit}
            validate={validate}
            render={props => {
              return (
                <StyledFormikForm>
                  <FormSection>
                    <FormHeader>About you</FormHeader>
                    <Field
                      component={Form.Text}
                      label="Full name"
                      name="name"
                    />
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
                    <Field
                      component={Form.Radio}
                      options={radioOptions}
                      name="project"
                    />
                  </FormSection>
                  <FormSection>
                    <FormHeader>Give us the details</FormHeader>
                    <Field
                      component={Form.Textarea}
                      label="Tell us a bit more"
                      name="details"
                    />
                  </FormSection>
                  <Button isSubmitting={props.isSubmitting} text="Submit" />
                </StyledFormikForm>
              )
            }}
          />
        )}
      </div>
    )
  }
}

export default ContactForm
