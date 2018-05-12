import React, { Component } from 'react'
import Link from 'gatsby-link'
import styled, { keyframes } from 'styled-components'
import { Formik, Form as FormikForm, Field } from 'formik'
import { Button, Container, Form } from '@components'
import { media } from '@styles'
import { apiCall } from '@utils'
import { CheckIcon, PhoneIcon } from '../../icons/ui'

const FormHeader = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 3rem;
  color: ${props => props.theme.colors.grey};
`

const FormSection = styled.fieldset`
  margin-bottom: 5rem;
`

const StyledFormikForm = styled(FormikForm)`
  align-self: flex-end;
  position: relative;
  width: 36rem;

  ${media.tablet`
    width: 100%;
  `};
`

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const SubmittedTextContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.8rem;
  padding: 2rem 0 0 0;
  margin-bottom: 7.8rem;
  animation: 200ms ${fadeIn} ${props => props.theme.transitions.in};

  ${media.desktop`
    padding: 2rem 0 4rem;
    margin-bottom: 0;
  `};
`

const SubmittedText = styled.p`
  font-size: 1.8rem;
  color: #fff;
`

const validate = (values, props) => {
  let errors = {}

  if (!values.phone) {
    errors.phone = 'Required'
  }

  return errors
}

class ContactForm extends Component {
  state = {
    submitted: false,
  }

  handleSubmit = async (values, { setSubmitting }) => {
    const { phone } = values

    const method = 'post'
    const endpoint = '/contact/phone'
    const data = {
      phone,
    }

    try {
      const response = await apiCall({ method, endpoint, data })

      setSubmitting(false)
      this.setState({ submitted: true })
    } catch (err) {
      console.warn(err)
    }
  }

  render() {
    return (
      <div>
        {this.state.submitted ? (
          <SubmittedTextContainer>
            <SubmittedText>Thank you! We'll call you shortly.</SubmittedText>{' '}
            <CheckIcon />
          </SubmittedTextContainer>
        ) : (
          <Formik
            onSubmit={this.handleSubmit}
            validate={validate}
            render={props => (
              <StyledFormikForm>
                <FormSection>
                  <Field
                    component={Form.Phone}
                    label="123 456-7890"
                    name="phone"
                  />
                </FormSection>
              </StyledFormikForm>
            )}
          />
        )}
      </div>
    )
  }
}

export default ContactForm
