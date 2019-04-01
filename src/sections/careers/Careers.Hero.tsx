import React, { useEffect, useState } from 'react'
import { graphql, StaticQuery } from 'gatsby'
import styled, { css, keyframes } from 'styled-components'

import { Section, Heading } from '@components'
import Media from '@components/Media/Media.Img'
import ScrollIndicator from '@components/ScrollIndicator'
import LayoutHeroMobile from '@components/Layout/Layout.Hero.Mobile'
import Pill from '@components/Pill'

import mediaqueries from '@styles/media'
import transitions from '@styles/transitions'
import { startAnimation } from '@utils'

const heroQuery = graphql`
  query CareersHeroPageQuery {
    heroTop: file(name: { regex: "/careers-hero-cable/" }) {
      childImageSharp {
        fluid(maxWidth: 322, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    heroBottom: file(name: { regex: "/careers-hero-bulb/" }) {
      childImageSharp {
        fluid(maxWidth: 767, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
  }
`

function CareersHero() {
  // Fade in the text as we do on all the headings
  const [animation, setAnimation] = useState('')

  // Start the bulb up animation once the image has laoded
  const [animateBulb, setBulbAnimation] = useState(false)

  useEffect(() => {
    startAnimation(() => {
      setAnimation('start')
    })
  }, [])

  return (
    <StaticQuery
      query={heroQuery}
      render={({ heroTop, heroBottom }) => (
        <>
          <LayoutHeroMobile>
            <>
              <Section>
                <GridContainer>
                  <LeftContainer>
                    <TextContainer animation={animation}>
                      <Pill text="Careers" />
                      <Heading.h1>
                        Narative is a tight-knit team from across the world
                        building great things.
                      </Heading.h1>
                      <MainText>
                        We’re enthusiastic about partnering with and creating
                        brands worth believing in.
                      </MainText>
                    </TextContainer>
                    <div />
                  </LeftContainer>
                  <ImageContainer desktop>
                    <HeroImageTop>
                      <Media critical src={heroTop.childImageSharp.fluid} />
                    </HeroImageTop>
                    <HeroImageBottom start={animateBulb}>
                      <Media
                        critical
                        onLoad={() => setBulbAnimation(true)}
                        src={heroBottom.childImageSharp.fluid}
                      />
                    </HeroImageBottom>
                  </ImageContainer>
                </GridContainer>
              </Section>
              <Section>
                <ScrollIndicator />
              </Section>
            </>
          </LayoutHeroMobile>

          {/*
            The below is only for Mobile users. This is because
            we hide the Bulb illustration from the hero and want
            it to scroll up over the fixed hero on mobile.
          */}
          <Section hideOnDesktop>
            <ImageContainer>
              <HeroImageTop>
                <Media critical src={heroTop.childImageSharp.fluid} />
              </HeroImageTop>
              <HeroImageBottom>
                <Media
                  critical
                  src={heroBottom.childImageSharp.fluid}
                  onLoad={() => setBulbAnimation(true)}
                />
              </HeroImageBottom>
            </ImageContainer>
          </Section>

          <Spacer />
        </>
      )}
    />
  )
}

export default CareersHero

const GridContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 505px 1fr;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  height: calc(100vh - 230px);
  min-height: 600px;
  width: 100%;

  ${mediaqueries.desktop`
    height: initial
    grid-template-columns: 1fr;
    height: calc(100vh - 140px);
    min-height: 100%;
    padding: 0;
  `};

  ${mediaqueries.phablet`
    height: calc(100vh - 180px);
    width: 100%;
  `};
`

const TextContainer = styled.div`
  ${transitions.fadeUp};
  position: relative;

  h1 {
    max-width: 470px;
  }

  ${mediaqueries.desktop`
    transition-delay: 0ms !important;
    transition-duration: 500ms !important;
  `};

  ${mediaqueries.phablet`
    top: -50px;
  `}
`

const MainText = styled.p`
  font-size: 3.2rem;
  font-weight: 400;
  color: ${p => p.theme.colors.grey};
  line-height: 1.3;

  ${mediaqueries.phablet`
    font-size: 2.2rem;
  `};
`

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  max-width: 62.1rem;

  ${mediaqueries.desktop`
    justify-content: flex-start;
    width: 100%;
    height: initial;
  `};
`

const ImageContainer = styled.div`
  position: absolute;
  width: 100%;
  width: 460px;
  right: -20px;
  justify-self: flex-end;

  ${mediaqueries.desktop_medium`
    right: 2%;
  `};

  ${mediaqueries.desktop`
    display:  ${p => (p.desktop ? ' none' : 'block')}
    right: 0;
    left: 0;
    position: relative;
    margin: 0 auto;
    margin-bottom: 50px;
    width: 100%;
  `};
`

const HeroImageTop = styled.div`
  max-width: 161.09px;
  margin: 0 auto;
  position: relative;
  left: -6px;

  ${mediaqueries.tablet`
    max-width: 130px;
  `}
`

const float = keyframes`
  0%, 100% {
    transform: translatey(0px);
  }

  50% {
    transform: translatey(-8px);
  }
`

const HeroImageBottom = styled.div`
  max-width: 381.46px;
  margin: 0 auto;
  transform: translateY(${p => (p.start ? '0' : '60px')});
  transition: transform 1.4s var(--ease-in-out-cubic);

  ${p =>
    p.start &&
    css`
      animation: ${float} 4.8s ease-in-out infinite 1.4s;
    `}

  ${mediaqueries.tablet`
    transform: none;
  `}
`

const Spacer = styled.div`
  height: 145px;

  ${mediaqueries.tablet`
    height: 0;
  `};
`
