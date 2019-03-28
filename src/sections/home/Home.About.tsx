import React from 'react'
import styled from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'

import Section from '@components/Section'
import Heading from '@components/Heading'
import IntersectionObserver from '@components/IntersectionObserver'
import Sticky from '@components/Sticky'
import Media from '@components/Media/Media.Img'
import Transitions from '@components/Transitions'

import mediaqueries from '@styles/media'

const aboutNarativeText = [
  `Even the most brilliant companies hit points where their focus is
  spread thin by the many challenges that growing businesses face,
  blocking them from reaching their full potential. That's where we
  come in.`,
  `Narative brings focus through the lens of a team that’s faced it
  all before, at scrappy startups and established enterprises alike.
  That’s why we don’t do big pitches or presentations — it’s just
  not in our DNA.`,
  `Instead, we take the time to understand what drives your company
  and customers as if they were our own, uncovering every problem
  and opportunity along the way.
  <strong>Then we get straight to work</strong>.`,
]

const imageQuery = graphql`
  query ShapeImageQuery {
    glow: file(name: { regex: "/mobile-glow/" }) {
      childImageSharp {
        fluid(maxWidth: 787, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
  }
`

/**
 * <HomeAbout />
 *
 * The challenge was to create a FadeIn and FadeOut effect as the user
 * scrolls over the main Paragraphs of the homepage.
 *
 * To accomplish this we do two things
 * 1. Using a Padding/Margin trick to get the FadeOut to work nicely
 * 2. Overlaying a fixed gradient to get the FadeIn to work nicely
 */
const HomeAbout = () => (
  <StaticQuery
    query={imageQuery}
    render={({ glow }) => (
      <>
        <MobileContainer>
          <Slash />
          <MediaContainer>
            <Media critical src={glow.childImageSharp.fluid} />
          </MediaContainer>
        </MobileContainer>
        <Gradient>
          <Grid narrow>
            <Sticky
              height="682px"
              top={140}
              disableOnMobile
              render={() => <AboutHeading>The Narative Approach</AboutHeading>}
            />
            <div>
              {/*
                Then each Text node gets it's own IntersectionObserver to handle
                the margin and padding trick!
              */}
              {aboutNarativeText.map(text => (
                <IntersectionObserver
                  key={text}
                  render={({ visiblePercentage }) => (
                    <TextContainer>
                      <Transitions.FadeScroll>
                        <Text
                          style={{ opacity: visiblePercentage / 100 }}
                          dangerouslySetInnerHTML={{ __html: text }}
                        />
                      </Transitions.FadeScroll>
                    </TextContainer>
                  )}
                />
              ))}
            </div>
          </Grid>
        </Gradient>
      </>
    )}
  />
)

export default HomeAbout

const Gradient = styled.div`
  position: relative;
  z-index: 3;
  background: #08080b;
  background: linear-gradient(#08080b, #101216);

  ${mediaqueries.tablet`
    background: linear-gradient(transparent, #101216);
  `};
`
const Grid = styled(Section)`
  position: relative;
  display: grid;
  grid-template-columns: 135px 670px;
  grid-column-gap: 128px;
  padding-top: 100px;
  padding-bottom: 30px;
  z-index: 1;
  pointer-events: none;

  ${mediaqueries.tablet`
    padding-top: 80px;
    display: block;
    padding-bottom: 100;
  `}
`

const TextContainer = styled.div`
  position: relative;
  top: 70px;
  padding-top: 280px;
  margin-top: -350px;

  padding-bottom: 140px;
  margin-bottom: -70px;

  ${mediaqueries.tablet`
    font-size: 22px;
    top: 0;
    margin: 0;
    padding: 0 0 40px 0;
  `};
`
const Text = styled.p`
  font-size: 32px;
  color: #fff;

  ${mediaqueries.tablet`
    font-size: 22px;
  `};
`

const AboutHeading = styled(Heading.h2)`
  position: relative;
  color: ${p => p.theme.colors.grey};
`

const MobileContainer = styled.div`
  position: relative;
  max-width: 100vw;
  margin-bottom: -85%;
  overflow-x: hidden;

  ${mediaqueries.tablet_up`
    display: none;
  `}
`

const MediaContainer = styled.div`
  position: absolute;
  left: 0;
  top: -100px;
  height: 100%;
  width: 100%;
`

const Slash = () => (
  <svg
    width="100%"
    viewBox="0 0 375 761"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_f)">
      <path
        d="M329.998 436.561L45 637.141V734.469L329.984 534.782L329.998 436.561Z"
        stroke="url(#paint0_linear)"
        stroke-width="12"
      />
    </g>
    <g filter="url(#filter1_dd)">
      <path
        d="M329.998 379.319L45 178.816V81.528L329.984 281.14L329.998 379.319Z"
        stroke="white"
        stroke-width="12"
      />
    </g>
    <rect
      x="35.5"
      y="66.5"
      width="6"
      height="6"
      fill="black"
      stroke="#93C3EA"
    />
    <rect
      x="35.5"
      y="388.5"
      width="6"
      height="6"
      fill="black"
      stroke="#93C3EA"
    />
    <rect
      x="333.5"
      y="388.5"
      width="6"
      height="6"
      fill="black"
      stroke="#93C3EA"
    />
    <rect
      x="333.5"
      y="66.5"
      width="6"
      height="6"
      fill="black"
      stroke="#93C3EA"
    />
    <rect
      x="42.25"
      y="69.25"
      width="290.5"
      height="0.5"
      fill="#7A8085"
      stroke="#93C3EA"
      stroke-width="0.5"
    />
    <rect
      x="42.25"
      y="391.25"
      width="290.5"
      height="0.5"
      fill="#7A8085"
      stroke="#93C3EA"
      stroke-width="0.5"
    />
    <rect
      x="336.771"
      y="73.2706"
      width="314.459"
      height="0.54123"
      transform="rotate(90 336.771 73.2706)"
      fill="#7A8085"
      stroke="#93C3EA"
      stroke-width="0.54123"
    />
    <rect
      x="38.7706"
      y="73.2706"
      width="314.459"
      height="0.54123"
      transform="rotate(90 38.7706 73.2706)"
      fill="#7A8085"
      stroke="#93C3EA"
      stroke-width="0.54123"
    />
    <defs>
      <filter
        id="filter0_f"
        x="24"
        y="410"
        width="327"
        height="351"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur stdDeviation="7.5" result="effect1_foregroundBlur" />
      </filter>
      <filter
        id="filter1_dd"
        x="-31"
        y="0"
        width="437"
        height="460.877"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="35" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.399641 0 0 0 0 0.453299 0 0 0 0 0.554653 0 0 0 0.6 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="5" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.2 0"
        />
        <feBlend
          mode="normal"
          in2="effect1_dropShadow"
          result="effect2_dropShadow"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect2_dropShadow"
          result="shape"
        />
      </filter>
      <linearGradient
        id="paint0_linear"
        x1="187.5"
        y1="552"
        x2="187.5"
        y2="425"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" stopOpacity="0" />
        <stop offset="1" stopColor="white" stopOpacity="0.2" />
      </linearGradient>
    </defs>
  </svg>
)
