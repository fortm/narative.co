import React, { Component } from 'react'
import Link from 'gatsby-link'
import styled, { keyframes } from 'styled-components'
import { Formik, Form as FormikForm, Field } from 'formik'
import { Button, Container, Form, Transitions } from '@components'
import { media } from '@styles'
import { apiCall } from '@utils'

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
  margin-bottom: ${props => (props.spacing === 'large' ? '4rem' : '3rem')};

  ${media.xlarge`
   margin-bottom: ${props => (props.spacing === 'large' ? '5rem' : '3.5rem')};
  `};
`

const StyledFormikForm = styled(FormikForm)`
  width: 100%;
  align-self: flex-end;
  position: relative;
  padding-bottom: 5rem;

  ${media.xlarge`
    width: 36rem;
    padding-bottom: 10rem;
  `};
`

const SubmittedScreen = styled.div`
  width: 100%;
  position: relative;
  height: 53rem;
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

  ${media.xlarge`
    width: 36rem;
    padding-bottom: 10rem;
  `};

  svg {
    margin-bottom: 3rem;
  }
`

const SubmittedHeader = styled.h2`
  font-size: 2.8rem;
  line-height: 1;
  margin-bottom: 3rem;

  ${media.xlarge`
    font-size: 3.2rem;
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

const SubmittedCheckIcon = () => (
  <svg width="90" height="90" viewBox="0 0 90 90" version="1.1">
    <g id="Canvas" fill="none">
      <g id="confirmation-icon">
        <rect
          id="Rectangle"
          x="0.75"
          y="0.75"
          width="88.5"
          height="88.5"
          rx="2.25"
          stroke="black"
          stroke-width="1.5"
        />
        <path
          id="Vector"
          d="M 0 17.8971L 14.7165 30.8571L 39.8571 0"
          transform="translate(25.0715 29.5715)"
          stroke="black"
          stroke-width="1.5"
        />
      </g>
    </g>
  </svg>
)

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
      const response = await apiCall({ method, endpoint, data })

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
                      component={Form.Text}
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
