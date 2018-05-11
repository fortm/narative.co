import React, { Component } from 'react'
import styled from 'styled-components'
import Transition from 'react-transition-group/Transition'

const fadeInDuration = 300

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
    transform: 'translateY(0rem)',
  },
}

export const FadeIn = ({ in: inProp, children }) => {
  return (
    <Transition in={inProp} timeout={fadeInDuration}>
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
      '”Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium dolore laudantium, totam rem aperiam.”',
    name: 'Dennis Brotzky',
    title: 'CEO',
    company: 'Jobeir',
    portrait: 'http://via.placeholder.com/180x220',
    portraitAltText: 'Portrait of Dennis Brotzky, CEO of Jobeir',
  },
  {
    copy:
      '”Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium dolore laudantium, totam rem aperiam.”',
    name: 'Thiago Costa',
    title: 'CEO',
    company: 'Jobeir',
    portrait: 'http://via.placeholder.com/180x220',
    portraitAltText: 'Portrait of Dennis Brotzky, CEO of Jobeir',
  },
  {
    copy:
      '”Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium dolore laudantium, totam rem aperiam.”',
    name: 'Mack Attack',
    title: 'CEO',
    company: 'Jobeir',
    portrait: 'http://via.placeholder.com/180x220',
    portraitAltText: 'Portrait of Dennis Brotzky, CEO of Jobeir',
  },
  {
    copy:
      '”Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium dolore laudantium, totam rem aperiam.”',
    name: 'Thomas Russell',
    title: 'CEO',
    company: 'Jobeir',
    portrait: 'http://via.placeholder.com/180x220',
    portraitAltText: 'Portrait of Dennis Brotzky, CEO of Jobeir',
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
  display: flex;
  justify-content: flex-start;
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
  font-size: 2.8rem;
  font-style: italic;
  font-family: 'meta';
  margin-bottom: 3.5rem;
`

const TestimonialName = styled.p`
  color: #fff;
  font-size: 1.8rem;
  font-weight: 500;
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

class Testimonials extends Component {
  state = {
    active: 0,
    animate: false,
  }

  componentDidMount() {
    this.setState({ animate: true })
  }

  nextTestimonial = goToTestimonial => {
    this.setState({ animate: false })

    setTimeout(() => {
      const { active } = this.state
      const totalTestimonials = testimonials.length - 1
      const nextActiveTestimonial = goToTestimonial
        ? goToTestimonial
        : active + 1

      if (!goToTestimonial && active === totalTestimonials) {
        this.setState({ active: 0 })
      } else {
        this.setState({ active: nextActiveTestimonial })
      }
      this.setState({ animate: true })
    }, 300)
  }
  render() {
    const { active, animate } = this.state
    const testimonial = testimonials[active]

    return (
      <TestimonialContainer>
        <TestimonialContent>
          <TestimonialCopy>
            <FadeIn in={animate}>{testimonial.copy}</FadeIn>
          </TestimonialCopy>
          <TestimonialBottom>
            <FadeIn in={animate}>
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
        <div>
          <img src={testimonial.portrait} alt={testimonial.portraitAltText} />
        </div>
      </TestimonialContainer>
    )
  }
}

export default Testimonials
