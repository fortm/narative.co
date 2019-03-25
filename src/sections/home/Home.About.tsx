import React from 'react'
import styled from 'styled-components'

import Section from '@components/Section'
import Heading from '@components/Heading'
import IntersectionObserver from '@components/IntersectionObserver'
import Sticky from '@components/Sticky'

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

const HomeAbout = () => (
  <Gradient>
    <MobileContainer>
      <MobileShapeShifter />
    </MobileContainer>
    <MobileSpacer />
    <Grid narrow>
      <Sticky
        height="682px"
        top={140}
        disableOnMobile
        render={() => <AboutHeading>The Narative Approach</AboutHeading>}
      />
      <div>
        {aboutNarativeText.map(text => (
          <IntersectionObserver
            key={text}
            render={({ visiblePercentage }) => (
              <Text
                style={{ opacity: visiblePercentage / 100 }}
                dangerouslySetInnerHTML={{ __html: text }}
              />
            )}
          />
        ))}
      </div>
    </Grid>
  </Gradient>
)

export default HomeAbout

const Gradient = styled.div`
  background: linear-gradient(180deg, #08080b 70%, #101216 100%);
`
const Grid = styled(Section)`
  position: relative;
  display: grid;
  grid-template-columns: 135px 670px;
  grid-column-gap: 128px;
  padding-top: 100px;
  padding-bottom: 30px;
  z-index: 1;

  ${mediaqueries.tablet`
    padding-top: 80px;
    display: block;
    padding-bottom: 100;
  `}
`

const Text = styled.p`
  font-size: 32px;
  color: #fff;
  padding-bottom: 420px;
  margin-bottom: -350px;

  ${mediaqueries.tablet`
    font-size: 22px;
    padding-bottom: 240px;
    margin-bottom: -200px;
  `}
`

const AboutHeading = styled(Heading.h2)`
  color: ${p => p.theme.colors.grey};
`

const MobileContainer = styled.div`
  position: absolute;
  width: 100%;

  ${mediaqueries.tablet_up`
    display: none;
  `}
`

const MobileSpacer = styled.div`
  ${mediaqueries.tablet_up`
    display: none;
  `}

  ${mediaqueries.phablet`
    height: 700px;
  `}

  ${mediaqueries.phone`
    height: 600px;
  `}
`

const MobileShapeShifter = () => (
  <svg
    width="100%"
    viewBox="0 0 375 919"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_f)">
      <path
        d="M329.998 594.561L45 795.141V892.469L329.984 692.782L329.998 594.561Z"
        stroke="url(#paint0_linear)"
        stroke-width="12"
      />
    </g>
    <g filter="url(#filter1_f)">
      <rect
        y="200"
        width="375"
        height="375"
        fill="#66748D"
        fill-opacity="0.15"
      />
    </g>
    <g filter="url(#filter2_dd)">
      <path
        d="M329.998 537.319L45 336.816V239.528L329.984 439.14L329.998 537.319Z"
        stroke="white"
        stroke-width="12"
      />
    </g>
    <rect
      x="35.5"
      y="224.5"
      width="6"
      height="6"
      fill="black"
      stroke="#93C3EA"
    />
    <rect
      x="35.5"
      y="546.5"
      width="6"
      height="6"
      fill="black"
      stroke="#93C3EA"
    />
    <rect
      x="333.5"
      y="546.5"
      width="6"
      height="6"
      fill="black"
      stroke="#93C3EA"
    />
    <rect
      x="333.5"
      y="224.5"
      width="6"
      height="6"
      fill="black"
      stroke="#93C3EA"
    />
    <rect
      x="42.25"
      y="227.25"
      width="290.5"
      height="0.5"
      fill="#7A8085"
      stroke="#93C3EA"
      stroke-width="0.5"
    />
    <rect
      x="42.25"
      y="549.25"
      width="290.5"
      height="0.5"
      fill="#7A8085"
      stroke="#93C3EA"
      stroke-width="0.5"
    />
    <rect
      x="336.77"
      y="231.271"
      width="314.459"
      height="0.54123"
      transform="rotate(90 336.77 231.271)"
      fill="#7A8085"
      stroke="#93C3EA"
      stroke-width="0.54123"
    />
    <rect
      x="38.7704"
      y="231.271"
      width="314.459"
      height="0.54123"
      transform="rotate(90 38.7704 231.271)"
      fill="#7A8085"
      stroke="#93C3EA"
      stroke-width="0.54123"
    />
    <defs>
      <filter
        id="filter0_f"
        x="24"
        y="568"
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
        id="filter1_f"
        x="-200"
        y="0"
        width="775"
        height="775"
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
        <feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur" />
      </filter>
      <filter
        id="filter2_dd"
        x="-31"
        y="158"
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
        y1="710"
        x2="187.5"
        y2="583"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="white" stop-opacity="0" />
        <stop offset="1" stop-color="white" stop-opacity="0.2" />
      </linearGradient>
    </defs>
  </svg>
)
