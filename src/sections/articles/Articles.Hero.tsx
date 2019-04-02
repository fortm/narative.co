import React, { useEffect, useState, useRef } from 'react'
import { graphql, StaticQuery } from 'gatsby'
import styled from 'styled-components'

import Heading from '@components/Heading'
import ScrollIndicator from '@components/ScrollIndicator'
import Media from '@components/Media/Media.Img'
import Pill from '@components/Pill'
import LayoutHeroMobile from '@components/Layout/Layout.Hero.Mobile'

import mediaqueries from '@styles/media'
import transitions from '@styles/transitions'
import { Section } from '@components'
import { startAnimation } from '@utils'

const imageQuery = graphql`
  query ArticlesHeroQuery {
    heroImage: file(name: { regex: "/articles-hero-typewriter/" }) {
      childImageSharp {
        fluid(maxWidth: 1060, quality: 88) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
  }
`

function ArticlesHero() {
  const [animation, setAnimation] = useState('')
  const [current, setCurrent] = useState(0)
  const [imageLoaded, setImageLoaded] = useState(false)

  const text = useRef()

  useEffect(() => {
    if (animation !== 'start') {
      startAnimation(() => {
        setAnimation('start')
      })
    }

    if (imageLoaded) {
      /**
       * handleTyping Effect
       * This will initiate the typing life effect we have displayed over the
       * hero image typewriter. Basically go through the string one char at a time
       * and udpate the counter until we're out of characters to type!
       */
      const sentence = ' help your business take the next step.'
      const speed = Math.floor(Math.random() * 60) + 30

      setTimeout(() => {
        if (current < sentence.length && text.current) {
          text.current.innerHTML += sentence.charAt(current)
          setCurrent(prevCurrent => prevCurrent + 1)
        }
      }, speed)
    }
  }, [current, imageLoaded, text])

  return (
    <StaticQuery
      query={imageQuery}
      render={({ heroImage }) => (
        <LayoutHeroMobile>
          <HeroSection relative>
            <ContentContainer>
              <div />
              <TextContainer animation={animation}>
                <Pill text="Articles" />
                <Heading.h1>
                  Perspectives on technology, design and business from the team
                  at Narative.
                </Heading.h1>
                <MainText>
                  Because the only thing we love more than doing what we do is
                  sharing what we do.
                </MainText>
              </TextContainer>
              <ScrollIndicator />
            </ContentContainer>
            <HeroImage>
              <Media
                critical
                src={heroImage.childImageSharp.fluid}
                onLoad={() => setImageLoaded(true)}
              />
              <HeroImageText imageLoaded={imageLoaded}>
                Narative builds brands, websites and products for growth-minded
                companies. We're a team with senior startup experience here to
                <Caret ref={text} />
              </HeroImageText>
            </HeroImage>
          </HeroSection>
        </LayoutHeroMobile>
      )}
    />
  )
}

export default ArticlesHero

const HeroSection = styled(Section)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const HeroImage = styled.div`
  width: 640px;
  position: absolute;
  right: -10px;
  top: 42%;
  transform: translateY(-50%);

  ${mediaqueries.desktop_medium`
    display: none;
  `};

  ${mediaqueries.phablet`
    width: 100%;
    margin-bottom: 60px;
  `};
`

const HeroImageText = styled.p`
  opacity: ${p => (p.imageLoaded ? 1 : 0)};
  transition: opacity 0.3s;
  position: absolute;
  color: #b798f2;
  width: 214.87px;
  top: 198px;
  left: 170px;
  font-size: 12px;
  transform: perspective(333px) rotateX(-42deg);
`

const Caret = styled.span`
  position: relative;

  &::after {
    content: '';
    position: absolute;
    right: -2px;
    top: 4px;
    height: 70%;
    width: 1px;
    background: #b798f2;
    animation: blink 1s step-end infinite;
  }

  @keyframes blink {
    from,
    to {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
  }
`

const ContentContainer = styled.div`
  height: calc(100vh - 140px);
  min-height: 600px;

  a {
    color: #fff;
    font-size: 22px;
  }

  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${mediaqueries.phablet`
    height: calc(100vh - 90px);
    padding: 0;
  `};
`

const TextContainer = styled.div`
  max-width: 570px;
  ${transitions.fadeIn};

  ${mediaqueries.phablet`
    position: relative;
    top: -50px;
  `};
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
