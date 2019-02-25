import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import Heading from '@components/Heading'
import Section from '@components/Section'

import mediaqueries from '@styles/media'

const HomesValues = () => {
  return (
    <Grid>
      <Item>
        <Value>
          <Heading.h2>Brand</Heading.h2>
          <List>
            <ListItem>Visual identity</ListItem>
            <ListItem>Strategic messaging</ListItem>
            <ListItem>Customer journey analysis</ListItem>
          </List>
          <StyledLink>Inquiry about branding</StyledLink>
        </Value>
        <Value>
          <Heading.h2>Build</Heading.h2>
          <List>
            <ListItem>Reponsive websites</ListItem>
            <ListItem>Content management systems</ListItem>
            <ListItem>Cross-platform apps</ListItem>
          </List>
          <StyledLink>Inquiry about building</StyledLink>
        </Value>
        <Value>
          <Heading.h2>Grow</Heading.h2>
          <List>
            <ListItem>Content strategy</ListItem>
            <ListItem>Conversion optimization</ListItem>
            <ListItem>Nurturing and onboarding</ListItem>
          </List>
          <StyledLink>Inquiry about growing</StyledLink>
        </Value>
      </Item>
      <Item />
      <Item />
      <Item />
    </Grid>
  )
}
export default HomesValues

const Grid = styled(Section)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`

const ImageGrid = styled(Section)`
  display: grid;
  grid-template-columns: 1fr 3fr;
`

const Item = styled.div`
  border-left: 1px solid #1d2128;
  padding: 65px 0;

  &:last-child {
    border-right: 1px solid #1d2128;
  }
`

const Value = styled.div`
  &:not(:last-child) {
    margin-bottom: 70px;
  }
`

const StyledLink = styled(Link)`
  font-weight: 600;
  color: ${p => p.theme.colors.gold};

  &:hover {
    text-decoration: underline;
  }
`

const List = styled.ul`
  list-style: none;
  margin-bottom: 20px;
`

const ListItem = styled.li`
  font-size: 18px;
  color: #7a8085;
`
