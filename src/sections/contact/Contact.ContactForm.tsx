import React, { Component } from 'react'
import { Link } from 'gatsby'
import styled, { keyframes } from 'styled-components'
import { Formik, Form as FormikForm, Field } from 'formik'

import {
  Button,
  ButtonArrow,
  Section,
  CopyToClipboard,
  Heading,
  Form,
  SocialLinks,
} from '@components'
import mediaqueries from '@styles/media'
import { apiCall, startAnimation } from '@utils'
import { SubmittedCheckIcon } from '../../icons/ui'

const validate = values => {
  let errors = {}

  if (!values.name) {
    errors.name = "Hi, we're Narative. What's your name?"
  }

  if (!values.email) {
    errors.email = "This one's important!"
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Forgot a character?'
  }

  if (!values.details) {
    errors.details = 'Entice us!'
  }
  if (values.details.length > 289) {
    errors.details = 'Short and sweet, please!'
  }

  return errors
}

class ContactForm extends Component<
  { baseDelay: number },
  { animation: string; submitted: boolean; firstName: string }
> {
  state = {
    animation: '',
    submitted: false,
    firstName: '',
  }

  componentDidMount() {
    startAnimation(() => {
      this.setState({
        animation: 'start',
      })
    })
  }

  handleSubmit = async (values, { setSubmitting }) => {
    const { company, details, email, name } = values

    const method = 'post'
    const endpoint = '/contact/proposal'
    const data = {
      company,
      email,
      details,
      name,
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
    const { baseDelay } = this.props
    const { animation, firstName, submitted } = this.state

    return (
      <Section>
        {submitted ? (
          <SubmittedScreen>
            <SubmittedCheckIcon />
            <SubmittedHeader>Thank you, {firstName}</SubmittedHeader>
            <SubmittedText>
              Our business development team will get back to you shortly.
            </SubmittedText>
            <SubmittedBackButton to="/">Go back</SubmittedBackButton>
            <SocialLinksContainer>
              <SocialLinks fill="black" />
            </SocialLinksContainer>
            <CopyRightContainer>
              © {new Date().getFullYear()} Narative Studio Inc.
            </CopyRightContainer>
          </SubmittedScreen>
        ) : (
          <Formik
            onSubmit={this.handleSubmit}
            validate={validate}
            validateOnBlur={false}
            initialValues={{
              name: '',
              email: '',
              details: '',
            }}
            render={props => {
              return (
                <StyledFormikForm>
                  <FormSection
                    animation={animation}
                    delay={baseDelay + 350}
                    spacing="large"
                  >
                    <FormHeader morePadding>Tell us about you</FormHeader>
                    <span>
                      <Field
                        component={Form.Text}
                        label="your name"
                        name="name"
                        autoFocus={true}
                      />
                      <Field
                        component={Form.Text}
                        label="email address"
                        name="email"
                      />
                      <Field
                        component={Form.Text}
                        label="company"
                        name="company"
                      />
                    </span>
                  </FormSection>
                  <FormSection animation={animation} delay={baseDelay + 480}>
                    <FormHeader>Tell us about your idea</FormHeader>
                    <Field
                      component={Form.Textarea}
                      label="give us a short description"
                      name="details"
                      rows={1}
                    />
                  </FormSection>
                  <ButtonContainer
                    animation={animation}
                    delay={baseDelay + 610}
                  >
                    <ButtonArrow
                      isSubmitting={props.isSubmitting}
                      color="black"
                      text="Submit"
                      type="submit"
                    />
                  </ButtonContainer>
                  <MobileButtonContainer>
                    <Button isSubmitting={props.isSubmitting} text="Submit" />
                  </MobileButtonContainer>
                  <ContactByEmail animation={animation} />
                </StyledFormikForm>
              )
            }}
          />
        )}
      </Section>
    )
  }
}

export default ContactForm

const ContactByEmail = ({ animation }) => (
  <>
    <ContactWithEmail animation={animation} delay={1240}>
      <ContactWithEmailText>
        <CopyToClipboard
          copyOnClick="contact@narative.co"
          iconFill="rgba(0,0,0,0.3)"
        >
          Prefer to send us an email instead?{' '}
          <button>
            <address>contact@narative.co</address>
          </button>
        </CopyToClipboard>
      </ContactWithEmailText>
    </ContactWithEmail>
    <MobileContactWithEmail href="mailto:contact@narative.co">
      Prefer to send us an email instead? <span>contact@narative.co</span>
    </MobileContactWithEmail>
  </>
)

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const FormHeader = styled(Heading.h2)`
  color: #000;
  width: 265px;
  padding-right: ${p => (p.morePadding ? '100px' : '76px')};

  ${mediaqueries.tablet`
    width: 100%;
    padding: 0;
    margin-bottom: 5px;
    color: ${p => p.theme.colors.grey};
  `};
`

const FormSection = styled.div`
  display: flex;
  margin-bottom: ${p => (p.spacing === 'large' ? '7rem' : '2.5rem')};

  ${mediaqueries.tablet`
    margin-bottom: ${p => (p.spacing === 'large' ? '2rem' : '1rem')};
    flex-direction: column;
  `};

  transition: opacity 0.5s linear ${p => p.delay}ms,
    transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.9) ${p => p.delay}ms;
  opacity: ${p => (p.animation ? 1 : 0)};
  transform: ${p => (p.animation ? 'translateY(0)' : 'translateY(20px)')};
`

const ContactWithEmailText = styled.div`
  padding-top: 55px;
  font-size: 18px;
  color: rgba(0, 0, 0, 0.33);

  button {
    text-decoration: underline;
    font-weight: 600;
  }
`

const MobileContactWithEmail = styled.a`
  display: none;
  text-align: center;
  color: rgba(0, 0, 0, 0.33);
  margin-top: 40px;

  ${mediaqueries.tablet`
    display: block;
  `};

  span {
    text-decoration: underline;
    font-weight: 600;
  }
`

const ContactWithEmail = styled.div`
  position: relative;
  padding-top: 55px;
  margin-left: 265px;

  transition: opacity 0.5s linear ${p => p.delay}ms,
    transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.9) ${p => p.delay}ms;
  opacity: ${p => (p.animation ? 1 : 0)};
  transform: ${p => (p.animation ? 'translateY(0)' : 'translateY(20px)')};

  &::after {
    content: '';
    height: 1px;
    width: 295px;
    position: absolute;
    left: 0;
    top: 55px;
    background: #c6c6c6;
  }

  &::before {
    content: '';
    height: 5px;
    width: 5px;
    border-radius: 50%;
    position: absolute;
    left: 0;
    top: 53px;
    background: #c6c6c6;
  }

  ${mediaqueries.tablet`
    display: none;
  `};
`
const StyledFormikForm = styled(FormikForm)`
  align-self: flex-end;
  position: relative;
  padding-bottom: 10rem;
  margin: 0 auto;
  background: #fff;
  z-index: 99999;

  ${mediaqueries.desktop_large`
    margin-left: 0;
    width: 100%;
    padding: 0 4rem 5rem;
  `};

  ${mediaqueries.desktop`
    margin: 0 auto;
    padding: 0 0 5rem;
  `};

  ${mediaqueries.phablet`
    width: 100%;
  `};
`

const SubmittedScreen = styled.div`
  width: 46rem;
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
  animation: ${fadeIn} 50ms 500ms ${p => p.theme.transitions.in} forwards;

  ${mediaqueries.desktop`
    padding-bottom: 0;
    margin: 0 auto;
    width: 100%;
    padding-bottom: 8rem;
  `};

  svg {
    margin-bottom: 3rem;
  }
`

const SubmittedHeader = styled(Heading.h2)`
  margin-bottom: 3rem;
  color: #000;
`

const SubmittedText = styled.p`
  color: ${p => p.theme.colors.grey};
  font-size: 2.2rem;
  max-width: 275px;
  margin-bottom: 3rem;
`

const SubmittedBackButton = styled(Link)`
  font-size: 18px;
  font-weight: 600;
`

const SocialLinksContainer = styled.div`
  width: 100%;
  max-width: 240px;
  display: flex;
  margin: 100px auto 50px;
  justify-content: space-between;
`

const CopyRightContainer = styled.div`
  font-size: 16px;
  color: ${p => p.theme.colors.grey};
`

const ButtonContainer = styled.div`
  margin-left: 265px;
  padding-top: 35px;
  transition: opacity 0.5s linear ${p => p.delay}ms,
    transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.9) ${p => p.delay}ms;
  opacity: ${p => (p.animation ? 1 : 0)};
  transform: ${p => (p.animation ? 'translateY(0)' : 'translateY(20px)')};

  ${mediaqueries.tablet`
    display: none;
  `};
`

const MobileButtonContainer = styled.div`
  display: none;

  ${mediaqueries.tablet`
    display: block;
  `};
`
