import React from 'react'
import styled from 'styled-components'
import { AnimatorFadeUp, Container } from '@components'
import { media } from '@styles'

const SectionSpacer = styled.div`
  padding-bottom: 20rem;

  ${media.hdpi`
    padding-bottom: 15rem;
  `};

  ${media.desktop`
    padding-bottom: 10rem;
  `};

  ${media.tablet`
    padding-bottom: 5rem;
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
  color: ${props => props.theme.colors.grey};
  width: 20rem;
  min-width: 20rem;
  line-height: 1.4;
  padding-bottom: 1rem;
  margin-right: 6.3rem;

  ${media.desktop`
    flex-direction: column;
    margin: 0 0 3.5rem 0;
  `};

  ${media.tablet`
    padding-bottom: 0;
    margin-bottom: 1rem;
    width: 100%;
    font-size: 2.4rem;
  `};
`

const SectionContent = styled.div`
  flex: 1;
`

const Section = ({ children, header, hideOverflow }) => {
  return (
    <SectionSpacer>
      <AnimatorFadeUp>
        <Container hideOverflow={hideOverflow}>
          <SectionContainer>
            <SectionHeader>{header}</SectionHeader>
            <SectionContent>{children}</SectionContent>
          </SectionContainer>
        </Container>
      </AnimatorFadeUp>
    </SectionSpacer>
  )
}

export default Section
