import React, { createRef, useEffect, useState, useContext } from 'react'
import styled from 'styled-components'
import { graphql, StaticQuery } from 'gatsby'
import { useSpring, animated } from 'react-spring'
import throttle from 'lodash/throttle'

import Heading from '@components/Heading'
import Section from '@components/Section'
import IntersectionObserver from '@components/IntersectionObserver'
import Sticky from '@components/Sticky'
import Media from '@components/Media/Media.Img'
import { ContactContext } from '@components/Contact/Contact.Context'

import mediaqueries from '@styles/media'
import { getWindowDimensions } from '@utils'

import HomeServicesMobile from './Home.Services.Mobile'

export const services = [
  {
    heading: 'Brand',
    list: ['Visual identity', 'Strategic messaging', 'Customer journeys'],
    link: {
      text: "Let's talk about your brand",
      to: '/contact',
    },
  },
  {
    heading: 'Build',
    list: [
      'Responsive websites',
      'Content management systems',
      'Cross-platform apps',
    ],
    link: {
      text: "Let's build something together",
      to: '/contact',
    },
  },
  {
    heading: 'Grow',
    list: [
      'Content strategy',
      'Conversion optimization',
      'Nurturing and onboarding',
    ],
    link: {
      text: "Let's grow your business",
      to: '/contact',
    },
  },
]

const imageQuery = graphql`
  query SerivesImageQuery {
    texture: file(name: { regex: "/waves-texture-2/" }) {
      childImageSharp {
        original {
          src
        }
      }
    }
    first: file(name: { regex: "/desktop-home-brand/" }) {
      childImageSharp {
        fluid(maxWidth: 787, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    second: file(name: { regex: "/desktop-home-build/" }) {
      childImageSharp {
        fluid(maxWidth: 787, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    third: file(name: { regex: "/desktop-home-grow/" }) {
      childImageSharp {
        fluid(maxWidth: 787, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
  }
`

const calculateActive = (progress: number) => (index: number): boolean => {
  const total = services.length
  const nextThreshold = ((100 / total) * (index + 1)) / 100
  const threshold = ((100 / total) * index) / 100

  if (index === 0) {
    return progress < nextThreshold
  }

  if (index === 2) {
    return progress > threshold
  }

  return progress > threshold && progress < nextThreshold
}

const calculateOffset = (progress: number) => {
  if (typeof window === 'undefined') return 0

  if (document.getElementById('grid-value')) {
    const $val = document.getElementById('grid-value').getBoundingClientRect()

    const total = ($val.height + 45) * 2
    let offset = total * progress

    if (progress < 0) {
      offset = 0
    }

    return {
      height: $val.height,
      top: $val.y,
      offset,
    }
  }

  return {}
}

const calcOpacity = (entering: boolean, top: number): { opacity?: number } =>
  entering
    ? {}
    : {
        opacity: Math.abs(top) > 250 ? 0 : 1 - Math.abs(top) / 250,
      }

const calcTransform = (offset: number): string =>
  `translateY(${offset * 180}px)`

function getTime() {
  const now = new Date()
  const hours = now.getHours()
  const days = ['Sun.', 'Mon.', 'Tues.', 'Wed.', 'Thurs.', 'Fri.', 'Sat.']
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sept',
    'Nov',
    'Dec',
  ]

  return {
    month: months[now.getMonth()],
    date: now.getDate(),
    day: days[now.getDay()],
    hours: hours > 12 ? hours - 12 : hours,
    minutes: ('0' + now.getMinutes()).slice(-2),
  }
}

function Time() {
  const [time, setTime] = useState(getTime())

  useEffect(() => {
    const tick = setInterval(() => {
      setTime(getTime())
    }, 1000)

    return () => {
      clearInterval(tick)
    }
  }, [])

  return (
    <TimeContainer>
      <Digits>
        {time.hours}:{time.minutes}
      </Digits>
      <FullDate>
        {time.day},{time.month} {time.date}
      </FullDate>
    </TimeContainer>
  )
}

function Code() {
  return (
    <CodeContainer>
      <VectorTop>
        {`<svg width="23" height="30" viewBox="0 0 23 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0 30H22.9091V26.4595H0V30Z" fill="#111216"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.00598145 24.7176L7.01982 19.7873L7.01897 15.2965L0.00598145 10.3745V24.7176Z" fill="#111216"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M22.8917 0L15.8492 4.87412V9.29375L22.894 14.2569L22.8918 0H22.8917Z" fill="#111216"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.0065918 0V8.62637L22.8961 24.7297L22.8948 16.0316L0.0065918 0Z" fill="#111216"/>
                        </svg>`}
      </VectorTop>
      <VectorBottom>
        {`<svg width="23" height="30" viewBox="0 0 23 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 30H22.9091V26.4595H0V30Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd`}
      </VectorBottom>
    </CodeContainer>
  )
}
function HomeServices() {
  const config = { mass: 1, tension: 200, friction: 25 }

  const [props, set] = useSpring(() => ({
    offset: 1,
    config,
  }))
  const heading = createRef()
  const { toggleContact } = useContext(ContactContext)

  useEffect(() => {
    const handleScroll = throttle(() => {
      if (heading.current) {
        const { height } = getWindowDimensions()
        const offset = heading.current.getBoundingClientRect().top
        set({ offset: 1 - offset / height })
      }
    })

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const animatedStyles = {
    transform: props.offset.interpolate(calcTransform),
    position: 'relative',
    zIndex: 2,
    pointerEvents: 'none',
  }

  return (
    <>
      <StaticQuery
        query={imageQuery}
        render={({ texture, first, second, third }) => (
          <HomeServicesDesktop>
            <Section>
              <IntersectionObserver
                render={({ entering, boundingClientRect }) => {
                  return (
                    <animated.div style={animatedStyles}>
                      <HeadingBackground
                        background={texture.childImageSharp.original.src}
                        style={calcOpacity(entering, boundingClientRect.top)}
                      >
                        <LargeHeading ref={heading}>
                          Narative helps you brand, build and grow.
                        </LargeHeading>
                      </HeadingBackground>
                    </animated.div>
                  )
                }}
              />
            </Section>
            <Sticky
              height="333vh"
              render={({ progress }) => {
                const getActive = calculateActive(progress)
                const offset = calculateOffset(progress)

                const firstActive: boolean = getActive(0)
                const secondActive: boolean = getActive(1)
                const thirdActive: boolean = getActive(2)

                const background = firstActive
                  ? '#556767'
                  : secondActive
                  ? '#5f6f82'
                  : '#59698a'

                const progressStyles = {
                  transform: `translateY(${offset.offset}px)`,
                  height: '100%',
                  top: 0,
                  background,
                }

                return (
                  <Grid>
                    <ImageSlides>
                      <ImageSlide critical active={firstActive}>
                        <Media src={first.childImageSharp.fluid} />
                        <Time />
                      </ImageSlide>
                      <ImageSlide active={secondActive}>
                        <Media critical src={second.childImageSharp.fluid} />
                        <Code />
                      </ImageSlide>
                      <ImageSlide active={thirdActive}>
                        <Media critical src={third.childImageSharp.fluid} />
                      </ImageSlide>
                    </ImageSlides>
                    <Column>
                      <Value id="grid-value" active={firstActive}>
                        <Heading.h2>Brand</Heading.h2>
                        <List>
                          <ListItem>Visual identity</ListItem>
                          <ListItem>Strategic messaging</ListItem>
                          <ListItem>Customer journeys</ListItem>
                        </List>
                        <StyledLink
                          onClick={toggleContact}
                          active={firstActive}
                        >
                          Let’s talk about your brand
                        </StyledLink>
                        <Progress style={progressStyles} />
                      </Value>
                      <Value active={secondActive}>
                        <Transform active={secondActive || thirdActive}>
                          <Heading.h2>Build</Heading.h2>
                          <List>
                            <ListItem>Responsive websites</ListItem>
                            <ListItem>Content management systems</ListItem>
                            <ListItem>Cross-platform apps</ListItem>
                          </List>
                        </Transform>
                        <StyledLink
                          onClick={toggleContact}
                          active={secondActive}
                        >
                          Let's build something together
                        </StyledLink>
                      </Value>
                      <Value active={thirdActive}>
                        <Transform active={thirdActive}>
                          <Heading.h2>Grow</Heading.h2>
                          <List>
                            <ListItem>Content strategy</ListItem>
                            <ListItem>Conversion optimization</ListItem>
                            <ListItem>Nurturing and onboarding</ListItem>
                          </List>
                        </Transform>
                        <StyledLink
                          onClick={toggleContact}
                          active={thirdActive}
                        >
                          Let’s grow your business
                        </StyledLink>
                      </Value>
                    </Column>
                    <Column gradient />
                    <Column gradient />
                    <Column />
                  </Grid>
                )
              }}
            />
          </HomeServicesDesktop>
        )}
      />
      <HomeServicesMobile />
    </>
  )
}

export default HomeServices

const HomeServicesDesktop = styled.div`
  background: #101216;
  padding-top: 130px;

  ${mediaqueries.tablet`
    display: none;
  `}
`

const HeadingBackground = styled.div`
  position: relative;
  -webkit-background-clip: text;
  background-clip: text;

  background-repeat: no-repeat;
  background-image: url(${p => p.background});
  color: transparent !important;
  background-position: bottom left;
  max-width: 900px;
  padding-bottom: 400px;
  margin-bottom: -250px;
  z-index: 4;
`

const LargeHeading = styled.h2`
  display: inline;
  font-weight: 700;
  font-size: 80px;
  letter-spacing: -0.5px;
  line-height: 1.2;
  font-family: ${p => p.theme.fontfamily.serif};
  background: transparent;
  color: transparent;
  padding-bottom: 200px;
`

const Grid = styled(Section)`
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`

const Column = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 50px 0;

  &::before {
    content: '';
    width: 1px;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    background: ${p =>
      p.gradient
        ? `linear-gradient(
            rgba(255, 255, 255, 0.1),
            transparent 33%,
            transparent 70%,
            rgba(255, 255, 255, 0.1)
          )`
        : 'rgba(255, 255, 255, 0.1)'};
  }
`

const Value = styled.div`
  position: relative;

  &:not(:last-child) {
    margin-bottom: 45px;
  }

  h2 {
    color: ${p => (p.active ? '#fff' : p.theme.colors.grey)};
    transition: color 0.3s var(--ease-out-quad);
  }

  li {
    color: ${p => (p.active ? '#fff' : p.theme.colors.grey)};
    transition: color 0.3s var(--ease-out-quad);
  }
`

const Transform = styled.div`
  transform: translateY(${p => (p.active ? 0 : 42)}px);
  transition: transform 0.6s var(--ease-out-cubic);
`

const StyledLink = styled.button`
  font-weight: 600;
  color: ${p => p.theme.colors.gold};
  opacity: ${p => (p.active ? 1 : 0)};
  transition: opacity 0.3s var(--ease-out-quad);
  cursor: pointer;
  pointer-events: ${p => (p.active ? 'initial' : 'none')};

  &:hover {
    text-decoration: underline;
  }
`

const List = styled.ul`
  list-style: none;
  margin-bottom: 20px;
`

const ListItem = styled.li`
  color: #7a8085;
`

const Progress = styled.div`
  position: absolute;
  width: 1px;
  right: 0px;
  z-index: 1;
  background: ${p => p.theme.colors.grey};
  transition: opacity 0.3s var(--ease-out-quad);
`

const ImageSlides = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 80px;
  width: 70%;
  height: 100%;
  pointer-events: none;

  & > div {
    width: 100%;
  }
`

const ImageSlide = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 2%;
  right: 0;
  width: 88%;
  height: 100%;
  pointer-events: none;
  opacity: ${p => (p.active ? 1 : 0)};
  transition: opacity 0.3s var(--ease-out-quad);

  & > div {
    width: 100%;
  }
`

const Digits = styled.div`
  font-size: 24px;
  font-weight: 200;

  @media only screen and (max-width: 1220px) {
    font-size: 18px;
  }
`

const TimeContainer = styled.span`
  position: absolute;
  width: 80px;
  top: 55%;
  left: 16.5%;
  transform: rotate(-6deg);
  color: #fafafa;
  opacity: 0.7;
  text-align: center;

  @media only screen and (max-height: 800px) {
    top: 55%;
  }

  @media only screen and (max-width: 1300px) {
    left: 15.5%;
  }

  @media only screen and (max-width: 1024px) {
    left: 14.6%;
  }

  @media only screen and (max-width: 900px) {
    display: none;
  }
`

const FullDate = styled.div`
  position: relative;
  left: 1px;
  top: 1px;
  font-size: 7px;
  font-weight: 600;

  @media only screen and (max-width: 1220px) {
    font-size: 5px;
  }
`

const CodeContainer = styled.span`
  display: block;
  color: #33749f;
  font-size: 6px;

  @media only screen and (max-width: 1100px) {
    font-size: 5px;
  }
`

const VectorTop = styled.div`
  position: absolute;
  left: 33%;
  top: 38%;
  max-width: 18%;

  @media only screen and (max-height: 800px) {
    top: 35%;
  }

  @media only screen and (max-width: 1100px) {
    top: 42%;
    max-width: 22%;
  }

  @media only screen and (max-width: 900px) {
    display: none;
  }
`

const VectorBottom = styled.div`
  position: absolute;
  left: 33%;
  top: 50%;
  max-width: 18%;

  @media only screen and (max-height: 800px) {
    top: 50%;
  }

  @media only screen and (max-width: 1100px) {
    max-width: 22%;
  }

  @media only screen and (max-width: 900px) {
    display: none;
  }
`
