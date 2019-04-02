import React from 'react'
import styled from 'styled-components'

import { Transitions, Section, Heading } from '@components'
import mediaqueries from '@styles/media'

/**
 * <CareerRow />
 * A generic component specifically used on the Careers page. This will
 * implement the standard Left Heading with Right Text/Content
 *
 * [Heading]    [...........................]
 *              [..........Content..........]
 *              [...........................]
 */

const CareerRow = ({
  children,
  header,
  hideOverflow,
}: {
  children: React.ReactNode
  header: string
  hideOverflow?: boolean
}) => (
  <CareerRowSpacer>
    <Transitions.FadeScroll>
      <Section hideOverflow={hideOverflow} narrow>
        <CareerRowContainer>
          <CareerRowHeader>{header}</CareerRowHeader>
          <CareerRowContent>{children}</CareerRowContent>
        </CareerRowContainer>
      </Section>
    </Transitions.FadeScroll>
  </CareerRowSpacer>
)

export default CareerRow

const CareerRowSpacer = styled.div`
  padding-bottom: 20rem;
  overflow-x: hidden;

  ${mediaqueries.desktop_large`
    padding-bottom: 15rem;
  `};

  ${mediaqueries.desktop`
    padding-bottom: 10rem;
  `};

  ${mediaqueries.tablet`
    padding-bottom: 6rem;
  `};
`

const CareerRowContainer = styled.div`
  display: flex;

  ${mediaqueries.desktop`
    flex-direction: column;
  `};
`

const CareerRowHeader = styled(Heading.h2)`
  align-self: flex-start;
  font-size: 3.2rem;
  color: ${p => p.theme.colors.grey};
  width: 20rem;
  min-width: 20rem;
  line-height: 1.4;
  padding-bottom: 1rem;
  margin-right: 6.3rem;

  ${mediaqueries.desktop`
    flex-direction: column;
    margin: 0 0 3.5rem 0;
  `};

  ${mediaqueries.tablet`
    padding-bottom: 0;
    margin-bottom: 1rem;
    width: 100%;
    font-size: 2.4rem;
  `};
`

const CareerRowContent = styled.div`
  flex: 1;
`
