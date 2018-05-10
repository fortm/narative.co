import React, { Component } from 'react'
import Link from 'gatsby-link'
import styled, { keyframes } from 'styled-components'
import { Formik, Form as FormikForm, Field } from 'formik'
import { Button, Container, Form } from '@components'
import { media } from '@styles'
import { apiCall } from '@utils'

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

  width: 100%;

  ${media.medium`
    width: 36rem;
  `};
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

const CheckIcon = () => (
  <svg width="18" height="14" viewBox="0 0 18 14" version="1.1">
    <g id="Canvas" fill="none">
      <g id="check">
        <path
          id="Shape"
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M 5.6 10.6L 1.4 6.4L 0 7.8L 5.6 13.4L 17.6 1.4L 16.2 0L 5.6 10.6Z"
          transform="translate(0.399902 0.600098)"
          fill="white"
        />
      </g>
    </g>
  </svg>
)

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const SubmittedTextContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.8rem;
  padding: 2rem 0 4rem;
  animation: 200ms ${fadeIn} ${props => props.theme.transitions.in};

  ${media.large`
    padding: 2rem 0 0 0;
    margin-bottom: 7.8rem;
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
