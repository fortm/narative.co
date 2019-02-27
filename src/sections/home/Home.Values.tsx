import React, { memo } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import Heading from '@components/Heading'
import IntersectionObserver from '@components/IntersectionObserver'
import Section from '@components/Section'
import Sticky from '@components/Sticky'

import { getWindowDimensions } from '@utils'
import mediaqueries from '@styles/media'

const values = [
  {
    heading: 'Brand',
    list: [
      'Visual identity',
      'Strategic messaging',
      'Customer journey analysis',
    ],
    link: {
      text: 'Inquiry about branding',
      to: '/contact',
    },
  },
  {
    heading: 'Build',
    list: [
      'Reponsive websites',
      'Content management systems',
      'Cross-platform apps',
    ],
    link: {
      text: 'Inquiry about building',
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
      text: 'Inquiry about growing',
      to: '/contact',
    },
  },
]

const calculateActive = (progress: number) => (index: number): boolean => {
  const total = values.length
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
  if (document.getElementById('grid-column')) {
    const { height } = getWindowDimensions()
    const $col = document.getElementById('grid-column').getBoundingClientRect()
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

const HomesValues = () => {
  return (
    <Sticky
      height="300vh"
      render={({ progress, visible }) => {
        const getActive = calculateActive(progress)
        const offset = calculateOffset(progress)

        const firstActive: boolean = getActive(0)
        const secondActive: boolean = getActive(1)
        const thirdActive: boolean = getActive(2)

        return (
          <Grid>
            <Column id="grid-column">
              <Value id="grid-value" active={firstActive}>
                <Heading.h2>Brand</Heading.h2>
                <List>
                  <ListItem>Visual identity</ListItem>
                  <ListItem>Strategic messaging</ListItem>
                  <ListItem>Customer journey analysis</ListItem>
                </List>
                <StyledLink to="/contact" active={firstActive}>
                  Inquire about branding
                </StyledLink>
                <Progress
                  style={{
                    transform: `translateY(${offset.offset}px)`,
                    height: '100%',
                    top: 0,
                  }}
                />
              </Value>
              <Value active={secondActive}>
                <Transform active={secondActive || thirdActive}>
                  <Heading.h2>Build</Heading.h2>
                  <List>
                    <ListItem>Reponsive websitesy</ListItem>
                    <ListItem>Content management systems</ListItem>
                    <ListItem>Cross-platform apps</ListItem>
                  </List>
                </Transform>
                <StyledLink to="/contact" active={secondActive}>
                  Inquire about building
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
                <StyledLink to="/contact" active={thirdActive}>
                  Inquire about growing
                </StyledLink>
              </Value>
            </Column>
            <Column />
            <Column />
            <Column withRightBorder />
            <ImageSlides>
              <ImageSlide active={firstActive}>1</ImageSlide>
              <ImageSlide active={secondActive}>2</ImageSlide>
              <ImageSlide active={thirdActive}>3</ImageSlide>
            </ImageSlides>
          </Grid>
        )
      }}
    />
  )
}

export default HomesValues

const Grid = memo(styled(Section)`
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`)

const Column = memo(styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 50px 0;
  border-left: 1px solid #1d2128;

  ${p =>
    p.withRightBorder &&
    `
    border-right: 1px solid #1d2128;
    `}
`)

const Value = memo(styled.div`
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
`)

const Transform = styled.div`
  transform: translateY(${p => (p.active ? 0 : 42)}px);
  transition: transform 0.6s var(--ease-out-cubic);
`

const StyledLink = styled(Link)`
  font-weight: 600;
  color: ${p => p.theme.colors.gold};
  opacity: ${p => (p.active ? 1 : 0)};
  transition: opacity 0.3s var(--ease-out-quad);

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
  right: -1px;
  z-index: 1;
  background: ${p => p.theme.colors.grey};
  transition: opacity 0.3s var(--ease-out-quad);
`

const ImageSlides = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 0;
  width: 75%;
  height: 100%;
  pointer-events: none;
`

const ImageSlide = styled.div`
  position: absolute;
  width: 250px;
  height: 250px;
  background: #fafafa;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 80px;
  opacity: ${p => (p.active ? 1 : 0)};
  transition: opacity 0.3s var(--ease-out-quad);
`
