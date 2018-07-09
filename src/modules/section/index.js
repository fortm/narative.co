import React from 'react'
import styled from 'styled-components'
import { AnimateScrollFadeUp, Container } from '@components'
import { media } from '@styles'

const SectionSpacer = styled.div`
  padding-bottom: 25rem;

  ${media.hdpi`
    padding-bottom: 18rem;
  `};

  ${media.desktop`
    padding-bottom: 10rem;
  `};
`

const SectionContainer = styled.div`
  display: flex;

  ${media.desktop`
    flex-direction: column;
  `};
`

const SectionHeader = styled.h2`
  align-self: flex-start;
  font-size: 3.2rem;
  border-bottom: 4px solid ${props => props.theme.colors.grey};
  color: ${props => props.theme.colors.grey};
  width: 20rem;
  min-width: 20rem;
  line-height: 1.4;
  padding-bottom: 1rem;
  margin-right: 9.3rem;

  ${media.desktop`
    flex-direction: column;
    margin: 0 0 3.5rem 0;
  `};
`

const SectionContent = styled.div`
  flex: 1;
`

const Section = ({ children, header, hideOverflow }) => {
  return (
    <SectionSpacer>
      <AnimateScrollFadeUp>
        <Container hideOverflow={hideOverflow}>
          <SectionContainer>
            <SectionHeader>{header}</SectionHeader>
            <SectionContent>{children}</SectionContent>
          </SectionContainer>
        </Container>
      </AnimateScrollFadeUp>
    </SectionSpacer>
  )
}

export default Section
