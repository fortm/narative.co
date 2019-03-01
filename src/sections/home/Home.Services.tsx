import React from 'react'
import styled from 'styled-components'
import { Link, graphql, StaticQuery } from 'gatsby'

import Heading from '@components/Heading'
import Section from '@components/Section'
import MediaQuery from '@components/MediaQuery'
import Sticky from '@components/Sticky'

import { getWindowDimensions } from '@utils'

import HomeServicesMobile from './Home.Services.Mobile'

export const services = [
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

const imageQuery = graphql`
  query SerivesImageQuery {
    file(name: { regex: "/waves-texture-2/" }) {
      childImageSharp {
        original {
          src
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

const HomeServices = () => {
  return (
    <>
      <MediaQuery minWidth="tablet">
        <StaticQuery
          query={imageQuery}
          render={({ file }) => (
            <Section>
              <HeadingBackground background={file.childImageSharp.original.src}>
                <LargeHeading>
                  Narative helps you brand, build and grow.
                </LargeHeading>
              </HeadingBackground>
            </Section>
          )}
        />
        <Sticky
          height="300vh"
          render={({ progress }) => {
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
                        <ListItem>Reponsive websites</ListItem>
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
      </MediaQuery>
      <MediaQuery maxWidth="tablet">
        <HomeServicesMobile />
      </MediaQuery>
    </>
  )
}

export default HomeServices

const HeadingBackground = styled.div`
  -webkit-background-clip: text;

  background-repeat: no-repeat;
  background-image: url(${p => p.background});
  background-size: cover;
  color: transparent !important;
  background-position: center;
  max-width: 900px;
`

const LargeHeading = styled.h2`
  font-weight: 700;
  font-size: 80px;
  letter-spacing: -0.5px;
  margin-bottom: 60px;
  line-height: 1.2;
  font-family: ${p => p.theme.fontfamily.serif};
  background: transparent;
  color: transparent;
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
  border-left: 1px solid #1d2128;

  ${p =>
    p.withRightBorder &&
    `
    border-right: 1px solid #1d2128;
    `}
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

const Card = styled.div`
  min-height: 400px;
  background: #1d2128;
  border-radius: 5px;
  overflow: hidden;
  text-align: center;
`

const CardHeading = styled(Heading.h3)`
  color: ${p => p.theme.colors.grey};
  max-width: 276px;
  margin-bottom: 30px;
`

const CardImage = styled.div`
  width: calc(100% - 4rem);
  margin: 0 auto;
  height: 300px;
  background: #fafafa;
  opacity: 0.1;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`

const CardList = styled.ul`
  list-style: none;
  margin: 35px auto 20px;
`

const CardItem = styled.li`
  font-size: 18px;
  color: #fafafa;
`

const CardLink = styled(Link)`
  display: inline-block;
  font-size: 18px;
  font-weight: 600;
  text-decoration-line: underline;
  color: ${p => p.theme.colors.gold};
  margin-bottom: 15px;
`

const Highlight = styled.span`
  color: ${p => (p.active ? '#fff' : p.theme.colors.grey)};
`

const XProgress = styled.div``
