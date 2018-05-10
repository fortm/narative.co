import React from 'react'
import styled from 'styled-components'
import { Container } from '@components/'

const SectionSpacer = styled.div`
  padding-bottom: 25rem;
`

const SectionContainer = styled.div`
  display: flex;
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
`

const SectionContent = styled.div`
  flex: 1;
`

const Section = ({ children, header }) => {
  return (
    <SectionSpacer>
      <Container>
        <SectionContainer>
          <SectionHeader>{header}</SectionHeader>
          <SectionContent>{children}</SectionContent>
        </SectionContainer>
      </Container>
    </SectionSpacer>
  )
}

export default Section
