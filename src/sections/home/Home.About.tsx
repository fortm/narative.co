import React from 'react'
import styled from 'styled-components'

import Section from '@components/Section'
import Heading from '@components/Heading'
import IntersectionObserver from '@components/IntersectionObserver'
import Sticky from '@components/Sticky'

import mediaqueries from '@styles/media'

const HomeAbout = () => {
  return (
    <Grid>
      <Sticky
        height="682px"
        top={140}
        render={({ progress }) => (
          <AboutHeading>What our team is about</AboutHeading>
        )}
      />
      <IntersectionObserver
        style={{ position: 'relative' }}
        render={({ visible }) => (
          <>
            <Text>
              Even the most brilliant companies hit points where their focus is
              spread thin by the many challenges that growing businesses face,
              blocking them from reaching their full potential. That's where we
              come in.
            </Text>
            <Text>
              Narative brings focus through the lens of a team that’s faced it
              all before, at scrappy startups and established enterprises alike.
              That’s why we don’t do big pitches or presentations — it’s just
              not in our DNA.
            </Text>
            <Text>
              Instead, we take the time to understand what drives your company
              and customers as if they were our own, uncovering every problem
              and opportunity along the way.{' '}
              <strong>Then we get straight to work</strong>.
            </Text>
            <Fade visible={visible} />
          </>
        )}
      />
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
`

const Text = styled.p`
  font-size: 32px;
  color: #fff;
  padding-bottom: 70px;
`

const AboutHeading = styled(Heading.h2)`
  color: ${p => p.theme.colors.grey};
`

const Fade = styled.div`
  position: fixed;
  background: transparent;
  height: 100%;
  width: 75%;
  left: 25%;
  top: 0;
  opacity ${p => (p.visible ? 1 : 0)};
  transition: opacity 0.2s linear;
  pointer-events: none;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 140px;
    width: 100%;
    background: linear-gradient(#0b0b0e, transparent);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 75%;
    background: linear-gradient(transparent, #0b0b0e);
  }
`
