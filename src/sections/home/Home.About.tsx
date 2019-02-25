import React from 'react'
import styled from 'styled-components'

import Section from '@components/Section'
import Heading from '@components/Heading'

import mediaqueries from '@styles/media'

const HomeAbout = () => {
  return (
    <Grid>
      <AboutHeading>What our team is about</AboutHeading>
      <div>
        <Text>
          Even the most brilliant companies hit points where their focus is
          spread thin by the many challenges that growing businesses face,
          blocking them from reaching their full potential. That's where we come
          in.
        </Text>
        <Text>
          Narative brings focus through the lens of a team that’s faced it all
          before, at scrappy startups and established enterprises alike. That’s
          why we don’t do big pitches or presentations — it’s just not in our
          DNA.
        </Text>
        <Text>
          Instead, we take the time to understand what drives your company and
          customers as if they were our own, uncovering every problem and
          opportunity along the way. Then we get straight to work.
        </Text>
      </div>
    </Grid>
  )
}

export default HomeAbout

const Grid = styled(Section)`
  display: grid;
  grid-template-columns: 135px 670px;
  grid-column-gap: 128px;
  padding-top: 100px;
  padding-bottom: 200px;
`

const Text = styled.p`
  font-size: 32px;
  color: #fff;

  &:not(:last-child) {
    margin-bottom: 70px;
  }
`

const AboutHeading = styled(Heading.h2)`
  color: ${p => p.theme.colors.grey};
`
