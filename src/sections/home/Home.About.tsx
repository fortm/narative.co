import React from 'react'
import styled from 'styled-components'

import Section from '@components/Section'
import Heading from '@components/Heading'
import IntersectionObserver from '@components/IntersectionObserver'
import Sticky from '@components/Sticky'

import mediaqueries from '@styles/media'

const HomeAbout = () => {
  return (
    <IntersectionObserver
      style={{ position: 'relative' }}
      render={({ visible }) => (
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
          </div>
        </Grid>
      )}
    />
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
  padding-bottom: 70px;

  ${mediaqueries.tablet`
    font-size: 22px;
    padding-bottom: 40px;
  `}
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
  pointer-events: none;

  ${mediaqueries.tablet`
    width: 100%;
    left: 0;
  `}

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 140px;
    width: 100%;
    background: linear-gradient(#111216, transparent);

    ${mediaqueries.tablet`
      content: none;
    `}
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -2%;
    left: 0;
    width: 100%;
    height: 52%;
    background: linear-gradient(transparent, #111216);
  }
`
