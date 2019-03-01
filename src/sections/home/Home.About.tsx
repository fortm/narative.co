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

const HomeAbout = () => {
  return (
    <Grid narrow>
      <Sticky
        height="682px"
        top={140}
        disableOnMobile
        render={({ progress }) => (
          <AboutHeading>What our team is about</AboutHeading>
        )}
      />
      <div>
        {aboutNarativeText.map(text => (
          <IntersectionObserver
            render={({ visiblePercentage }) => (
              <Text
                key={text}
                style={{ opacity: visiblePercentage / 100 }}
                dangerouslySetInnerHTML={{ __html: text }}
              />
            )}
          />
        ))}
      </div>
    </Grid>
  )
}

export default HomeAbout

const Grid = styled(Section)`
  position: relative;
  display: grid;
  grid-template-columns: 135px 670px;
  grid-column-gap: 128px;
  padding-top: 100px;
  padding-bottom: 200px;

  ${mediaqueries.tablet`
    padding-top: 80px;
    display: block;
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
