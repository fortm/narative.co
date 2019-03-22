import React from 'react'
import styled from 'styled-components'
import { Link, graphql, StaticQuery } from 'gatsby'

import Heading from '@components/Heading'
import Section from '@components/Section'
import IntersectionObserver from '@components/IntersectionObserver'
import Sticky from '@components/Sticky'
import Media from '@components/Media/Media.Img'

import mediaqueries from '@styles/media'

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
      text: "Let's talk about your brand",
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
    first: file(name: { regex: "/home-services-typewriter/" }) {
      childImageSharp {
        fluid(maxWidth: 787, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    second: file(name: { regex: "/home-services-typewriter-1/" }) {
      childImageSharp {
        fluid(maxWidth: 787, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    third: file(name: { regex: "/home-services-typewriter-2/" }) {
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

const calculateAnimation = (
  entering: boolean,
  vp: number,
  top: number
): { transform: string; opacity?: number } => {
  const isFirefox = typeof InstallTrigger !== 'undefined'

  // background-text-clip breaks if you animate values in Firefox
  if (isFirefox) {
    return {
      transform: `translateY(60px)`,
    }
  }

  return entering
    ? {
        transform: `translateY(${vp}px)`,
      }
    : {
        transform: `translateY(${100}px)`,
        opacity: Math.abs(top) > 180 ? 0 : 1 - Math.abs(top) / 180,
      }
}

const HomeServices = () => {
  return (
    <>
      <StaticQuery
        query={imageQuery}
        render={({ texture, first, second, third }) => (
          <HomeServicesDesktop>
            <Section>
              <IntersectionObserver
                render={({
                  visiblePercentage,
                  entering,
                  boundingClientRect,
                }) => (
                  <HeadingBackground
                    visible={visiblePercentage > 0}
                    background={texture.childImageSharp.original.src}
                    style={calculateAnimation(
                      entering,
                      visiblePercentage,
                      boundingClientRect.top
                    )}
                  >
                    <LargeHeading>
                      Narative helps you brand, build and grow.
                    </LargeHeading>
                  </HeadingBackground>
                )}
              />
            </Section>

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
                    <Column>
                      <Value id="grid-value" active={firstActive}>
                        <Heading.h2>Brand</Heading.h2>
                        <List>
                          <ListItem>Visual identity</ListItem>
                          <ListItem>Strategic messaging</ListItem>
                          <ListItem>Customer journey analysis</ListItem>
                        </List>
                        <StyledLink to="/contact" active={firstActive}>
                          Let’s talk about your brand
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
                      <ImageSlide active={firstActive}>
                        <Media src={first.childImageSharp.fluid} />
                      </ImageSlide>
                      <ImageSlide active={secondActive}>
                        <Media critical src={second.childImageSharp.fluid} />
                      </ImageSlide>
                      <ImageSlide active={thirdActive}>
                        <Media critical src={third.childImageSharp.fluid} />
                      </ImageSlide>
                    </ImageSlides>
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
  background-size: cover;
  color: transparent !important;
  background-position: center;
  max-width: 900px;
  margin-top: 100px;
  top: -100px;
  padding-bottom: calc(100vh - 192px);
  margin-bottom: calc(-100vh + 192px);
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
  width: 80%;
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
