import React, { Component } from 'react'
import styled from 'styled-components'
import Transition from 'react-transition-group/Transition'
import { media } from '@styles'

const fadeInDuration = 500

const fadeInDefaultStyle = {
  transition: `all ${fadeInDuration}ms ease-out`,
  opacity: 0,
  transformOrigin: 'top',
  transform: 'translateY(1rem)',
}

const fadeInTransitionStyles = {
  entered: {
    opacity: 1,
    transform: 'translateY(0rem)',
  },
  exiting: {
    opacity: 0,
    transition: `all ${fadeInDuration / 2}ms ease-out`,
    transform: 'translateY(0rem)',
  },
}

export const FadeIn = ({ in: inProp, children }) => {
  return (
    <Transition in={inProp} timeout={fadeInDuration / 500}>
      {state => (
        <div
          style={{
            ...fadeInDefaultStyle,
            ...fadeInTransitionStyles[state],
          }}
        >
          {children}
        </div>
      )}
    </Transition>
  )
}

const testimonials = [
  {
    copy:
      "“Working with this team was a privilege. Their fearless vision on authentic, scalable design is unparalleled in the industry. It's rare to find individuals that approach challenges with no compromise.”",
    name: 'Dave  Llastovskiy',
    title: 'Head of Marketing',
    company: 'Bus.com',
    portrait: '/images/testimonials/dave-from-bus.com.png',
    portraitAltText:
      'Portrait of Dave  Llastovskiy, Head of Marketing at Bus.com',
  },
  {
    copy:
      "“Working with this team was a privilege. Their fearless vision on authentic, scalable design is unparalleled in the industry. It's rare to find individuals that approach challenges with no compromise.”",
    name: 'Dave  Llastovskiy',
    title: 'Head of Marketing',
    company: 'Bus.com',
    portrait: '/images/testimonials/dave-from-bus.com.png',
    portraitAltText:
      'Portrait of Dave  Llastovskiy, Head of Marketing at Bus.com',
  },
]

const ArrowRight = () => (
  <svg width="35" height="7" viewBox="0 0 35 7" version="1.1">
    <g id="Canvas" fill="none">
      <g id="arrow-left-icon">
        <path
          id="triangle"
          d="M 3.5 0L 6.53109 5.25L 0.468911 5.25L 3.5 0Z"
          transform="matrix(0 1 -1 0 35 0)"
          fill="white"
        />
        <line
          id="Line"
          y1="-0.5"
          x2="30"
          y2="-0.5"
          transform="translate(0 4)"
          stroke="white"
        />
      </g>
    </g>
  </svg>
)

const TestimonialContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  overflow-x: visible;
`

const TestimonialContent = styled.div`
  max-width: 49rem;
  display: flex;
  flex-direction: column;
  margin-right: 1rem;
`

const TestimonialBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: #fff;

  ${media.desktop`
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  `};
`

const TestimonialBottomActions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: #fff;

  svg {
    cursor: pointer;
    position: relative;
    top: -1;
    margin-left: 11px;
  }
`

const TestimonialCopy = styled.p`
  color: ${props => props.theme.colors.grey};
  font-size: 2.2rem;
  font-style: italic;
  font-family: 'meta';
  margin-bottom: 3.5rem;

  ${media.desktop`
    line-height: 1.2;
    font-size: 2.4rem;
  `};
`

const TestimonialName = styled.p`
  color: #fff;
  font-size: 1.8rem;
  font-weight: 500;

  ${media.desktop`
    margin-bottom: 3.5rem;
  `};
`

const TestimonialDotContainer = styled.div`
  display: flex;
`

const TestimonialDot = styled.div`
  position: relative;
  background: ${props => (props.active ? '#fff' : props.theme.colors.grey)};
  height: 10px;
  width: 10px;
  border-radius: 50%;
  margin: 0 11px;
  cursor: pointer;
  transition: background 400ms ease;

  &::after {
    content: '';
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    opacity: 0;
    transform: scale(1);
    box-shadow: inset 0 0 0 1px #fff;
    transition: all 300ms ${props => props.theme.transitions.out};
  }

  ${props =>
    !props.active &&
    `
    &:hover::after {
      transform: scale(2);
      opacity: 1;
    }
    `};
`

const TestimonialPortrait = styled.img`
  position: absolute;
  right: 80px;

  ${media.desktop`
      position: absolute;
      right: -180px;
    `};
`

class Testimonials extends Component {
  state = {
    active: 0,
    animateTop: false,
    animateBottom: false,
  }

  componentDidMount() {
    this.setState({ animateTop: true, animateBottom: true })
  }

  nextTestimonial = goToTestimonial => {
    this.setState({ animateTop: false, animateBottom: false })

    setTimeout(() => {
      this.setState({ animateTop: true })
    }, 500)

    setTimeout(() => {
      this.setState({ animateBottom: true })
      const { active } = this.state
      const totalTestimonials = testimonials.length - 1
      const nextActiveTestimonial =
        typeof goToTestimonial === 'number' ? goToTestimonial : active + 1

      if (!goToTestimonial && active === totalTestimonials) {
        this.setState({ active: 0 })
      } else {
        this.setState({ active: nextActiveTestimonial })
      }
    }, 700)
  }
  render() {
    const { active, animateTop, animateBottom } = this.state
    const testimonial = testimonials[active]

    return (
      <TestimonialContainer>
        <TestimonialContent>
          <FadeIn in={animateTop}>
            <TestimonialCopy>{testimonial.copy}</TestimonialCopy>
          </FadeIn>
          <TestimonialBottom>
            <FadeIn in={animateBottom}>
              <TestimonialName>
                {testimonial.name}, {testimonial.title} –{' '}
                <span style={{ textDecoration: 'underline' }}>
                  {testimonial.company}
                </span>
              </TestimonialName>
            </FadeIn>
            <TestimonialBottomActions>
              <TestimonialDotContainer>
                {testimonials.map((test, index) => (
                  <TestimonialDot
                    key={test.name}
                    active={active === index}
                    onClick={() => this.nextTestimonial(index)}
                  />
                ))}
              </TestimonialDotContainer>
              <div onClick={() => this.nextTestimonial()}>
                <ArrowRight />
              </div>
            </TestimonialBottomActions>
          </TestimonialBottom>
        </TestimonialContent>
        <TestimonialPortrait
          src={testimonial.portrait}
          alt={testimonial.portraitAltText}
        />
      </TestimonialContainer>
    )
  }
}

export default Testimonials
