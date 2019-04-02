import React from 'react'
import { graphql, Link, StaticQuery } from 'gatsby'
import styled from 'styled-components'

import {
  CareersAccordian,
  CareersGraph,
  CareersImages,
  Perks,
  Section,
} from '@components'
import mediaqueries from '@styles/media'

import CareersRow from './Careers.Row'

// Grabbing all the gallery images. Returns an Array[] of images
const galleryQuery = graphql`
  query CareersBodyQuery {
    gallery: allFile(filter: { name: { regex: "/careers-gallery/" } }) {
      edges {
        node {
          childImageSharp {
            fluid(maxWidth: 960, quality: 100) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    }
  }
`

/**
 * Careers Body
 * - Why Narative
 * - Working at Narative
 * - Rail/Horizontal Scroll of Gallery images
 * - Building our future (Labs/Studio)
 * - Careers
 */
function CareersBody() {
  return (
    <StaticQuery
      query={galleryQuery}
      render={({ gallery }) => (
        <>
          <CareersRow header="Why Narative">
            <SectionCopy maxWidth="69rem">
              At Narative, nobody has a "boss". Instead, we hold a common goal,
              where everyone owns executive level decision, regardless of
              position. We teach and learn from each other everyday, with growth
              based on trust and relationships.
            </SectionCopy>
          </CareersRow>
          <CareersRow header="Working at Narative">
            <FlexColumn>
              <WhatWeDoContent>
                <SectionCopy maxWidth="42rem">
                  Not only are we mindful of the projects we select, we get to
                  choose how and when we work, to ensure we're at our best.
                </SectionCopy>
              </WhatWeDoContent>
              <WhatWeDoList>
                <Perks />
              </WhatWeDoList>
            </FlexColumn>
          </CareersRow>

          {/* Horizontal scroll Gallery */}
          <CareersRow header="We have fun">
            <SectionCopy maxWidth="67rem">
              Since we're all remote, it's always a party when the team gets
              together. And we like food... a lot.
            </SectionCopy>
            <CareersImages images={gallery.edges} />
          </CareersRow>

          {/* Graph with Studio and Labs */}
          <CareersRow
            header={
              <div style={{ paddingRight: '2.5rem' }}>Building our future</div>
            }
          >
            <SectionCopy maxWidth="67rem">
              We engage with exceptional clients to fund our own ideas.
              Displaying our core beliefs through the development of our own
              products. We call this{' '}
              <LabsLink to="/labs">Narative Labs</LabsLink>.
            </SectionCopy>
          </CareersRow>
          <CareersGraph />

          {/* Careers */}
          <CareersRow header="Say hello">
            <SectionCopy maxWidth="67rem">
              If you have the devotion, the curiosity and the desire to build
              great things, you might fit right in.
            </SectionCopy>
          </CareersRow>
          <Section narrow>
            <CareersAccordian />
          </Section>
        </>
      )}
    />
  )
}

export default CareersBody

const SectionCopy = styled.p`
  color: #fff;
  font-size: 3.2rem;
  line-height: 1.2;
  max-width: ${props => (props.maxWidth ? props.maxWidth : '100%')};

  ${mediaqueries.desktop`
    font-size: 2.2rem;
    line-height: 1.4;
    max-width: 100%;
  `};

  ${mediaqueries.tablet`
    font-size: 1.8rem;
  `};
`

const WhatWeDoList = styled.ul`
  width: 38rem;
  list-style: none;

  ${mediaqueries.desktop`
    width: 100%;
  `};
`

const FlexColumn = styled.div`
  display: flex;
  justify-content: space-between;

  ${mediaqueries.desktop`
    flex-direction: column;
  `};
`

const WhatWeDoContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${mediaqueries.desktop`
    margin-bottom: 2.5rem;
  `};
`

const LabsLink = styled(Link)`
  text-decoration: underline;
  text-decoration-color: ${p => p.theme.colors.gold};
  color: #fff;
  transition: color 0.3s ease-out;

  &:hover {
    color: ${p => p.theme.colors.gold};
  }
`
