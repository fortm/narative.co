import React from 'react'
import styled from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'

import Section from '@components/Section'
import Heading from '@components/Heading'
import IntersectionObserver from '@components/IntersectionObserver'
import Sticky from '@components/Sticky'
import Media from '@components/Media/Media.Img'

import mediaqueries, { media } from '@styles/media'

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
    shape: file(name: { regex: "/mobile-header-backslash/" }) {
      childImageSharp {
        fluid(maxWidth: 787, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
  }
`

const HomeAbout = () => (
  <StaticQuery
    query={imageQuery}
    render={({ shape }) => (
      <Gradient>
        <MobileContainer>
          <Media critical src={shape.childImageSharp.fluid} />
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
                    style={{ opacity: visiblePercentage / 2 / 50 }}
                    dangerouslySetInnerHTML={{ __html: text }}
                  />
                )}
              />
            ))}
          </div>
        </Grid>
      </Gradient>
    )}
  />
)

export default HomeAbout

const Gradient = styled.div`
  background: linear-gradient(180deg, #08080b 70%, #101216 100%);

  ${mediaqueries.tablet`
    background: linear-gradient(180deg,#121318 70%,#101216 100%);
  `}
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
  position: relative;
  top: 70px;
  font-size: 32px;
  color: #fff;

  padding-top: 280px;
  margin-top: -350px;

  padding-bottom: 140px;
  margin-bottom: -70px;

  /* padding: 100px 0 100px;
  margin: -100px 0 -100px; */
  ${mediaqueries.tablet`
    font-size: 22px;
    padding-bottom: 240px;
    margin-bottom: -200px;
  `};
`

const AboutHeading = styled(Heading.h2)`
  color: ${p => p.theme.colors.grey};
`

const MobileContainer = styled.div`
  position: absolute;
  width: 100%;

  &::after {
    content: '';
    position: absolute;
    top: -100px;
    width: 100%;
    height: 300px;
    background: linear-gradient(transparent, #08080b 33%, #15161c);
  }

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
