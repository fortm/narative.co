import React, { memo } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import Heading from '@components/Heading'
import IntersectionObserver from '@components/IntersectionObserver'
import Section from '@components/Section'
import Sticky from '@components/Sticky'

import mediaqueries from '@styles/media'

const values = [
  {
    heading: 'Brand',
    list: [
      'Visual identity',
      'Strategic messaging',
      'Customer journey analysis',
    ],
    link: {
      text: 'Inquiry about branding',
      to: '/contact',
    },
  },
  {
    heading: 'Build',
    list: [
      'Reponsive websites',
      'Content management systems',
      'Cross-platform apps',
    ],
    link: {
      text: 'Inquiry about building',
      to: '/contact',
    },
  },
  {
    heading: 'Grow',
    list: [
      'Content strategy',
      'Conversion optimization',
      'Nurturing and onboarding',
    ],
    link: {
      text: 'Inquiry about growing',
      to: '/contact',
    },
  },
]

const HomesValues = () => {
  return (
    <Sticky
      height="280vh"
      render={({ progress }) => (
        <Grid>
          <Item>
            {values.map((value, index) => {
              const total = values.length
              const nextThreshold = ((100 / total) * (index + 1)) / 100
              const threshold = ((100 / total) * index) / 100

              const active = progress > threshold && progress < nextThreshold

              return (
                <Value active={active} index={index}>
                  <Transform active={active}>
                    <Heading.h2>{value.heading}</Heading.h2>
                    <List>
                      {value.list.map(item => (
                        <ListItem>{item}</ListItem>
                      ))}
                    </List>
                  </Transform>
                  <StyledLink to={value.link.to} active={active}>
                    {value.link.text}
                  </StyledLink>
                </Value>
              )
            })}
          </Item>
          <Item />
          <Item />
          <Item />
        </Grid>
      )}
    />
  )
}
export default HomesValues

const Grid = styled(Section)`
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`

const Item = memo(styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 50px 0;
  padding: 50px 0;
  border-left: 1px solid #1d2128;

  &:last-child {
    border-right: 1px solid #1d2128;
  }
`)

const Value = memo(styled.div`
  position: relative;

  &:not(:last-child) {
    margin-bottom: 70px;
  }

  &:first-child {
    &::after {
      content: '';
      position: absolute;
      right: 0;
      top: 0;
      width: 1px;
      height: 100%;
      background: ${p => p.theme.colors.grey};
      transition: transform 0.6s var(--ease-out-cubic);
    }
  }

  h2 {
    color: ${p => (p.active ? '#fff' : p.theme.colors.grey)};
    transition: color 0.3s var(--ease-out-quad);
  }
`)

const Transform = styled.div`
  transform: translateY(${p => (p.active ? 0 : 42)}px);
  transition: transform 0.4s var(--ease-in-out-cubic);
`

const StyledLink = styled(Link)`
  font-weight: 600;
  color: ${p => p.theme.colors.gold};
  opacity: ${p => (p.active ? 1 : 0)};
  transition: opacity 0.3s var(--ease-out-quad);

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
