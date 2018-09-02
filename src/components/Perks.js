import React, { Component } from 'react'
import styled from 'styled-components'

import Observer from './Observer'

// 100% remote
//  -
// work from your couch, or from a beach
// Autonomy
//  -
// build your own hours, work at your own pace
// Respect
//  -
// companies trust us for what we build
// Vacation
//  -
// well, you make your own schedule. really
// Competitive salaries
//  -
// we pay what you deserve
// Executive decisions
//  -
// we listen to you, at all times

const perks = [
  {
    heading: '100% remote',
    text: 'work from your couch, or from a beach',
  },
  {
    heading: 'Autonomy',
    text: 'build your own hours, work at your own pace',
  },
  {
    heading: 'Respect',
    text: 'companies trust us for what we build',
  },
  {
    heading: 'Vacation',
    text: 'well, you make your own schedule. really',
  },
  {
    heading: 'Competitive salaries',
    text: 'we pay what you deserve',
  },
  {
    heading: 'Executive decisions',
    text: 'we listen to you, at all times',
  },
]

class Perks extends Component {
  state = {
    animate: false,
  }

  render() {
    const { animate } = this.state

    return (
      <Observer
        render={({ visible }) => {
          console.log(visible)
          if (visible && !animate) {
            this.setState({ animate: true })
          }

          return (
            <PerksContainer>
              <PerksList>
                {perks.map((perk, index) => (
                  <PerksItemContainer>
                    <PerksItem animate={animate} index={index}>
                      <PerksItemHighlight>
                        {perk.heading} &nbsp;-&nbsp;
                      </PerksItemHighlight>
                      {perk.text}
                    </PerksItem>
                    {index !== perks.length - 1 && (
                      <PerksItemLineContainer>
                        <PerksItemLine animate={animate} index={index} />
                      </PerksItemLineContainer>
                    )}
                  </PerksItemContainer>
                ))}
              </PerksList>
            </PerksContainer>
          )
        }}
      />
    )
  }
}

export default Perks

const PerksContainer = styled.div`
  width: 100%;
  position: relative;
  top: -0.25rem;
`

const PerksList = styled.ul`
  list-style: none;
`

const PerksItemContainer = styled.li`
  position: relative;
`

const PerksItem = styled.div`
  color: ${p => p.theme.colors.grey};
  height: 5rem;
  display: flex;
  align-items: center;

  transform: ${p => (p.animate ? `translateY(0)` : `translateY(5rem)`)};
  opacity: ${p => (p.animate ? 1 : 0)};
  transition: all 1.5s cubic-bezier(0.77, 0, 0.175, 1) ${p => p.index * 50}ms;
`

const PerksItemHighlight = styled.span`
  color: #fff;
  font-weight: 600;
`

const PerksItemLineContainer = styled.div`
  overflow: hidden;
  width: 40%;
  height: 1px;

  position: absolute;
  left: 0;
  bottom: 0;
`

const PerksItemLine = styled.div`
  width: 100%;
  height: 1px;
  transform: translateX(-100%);
  background: linear-gradient(
    to right,
    ${p => p.theme.colors.grey},
    transparent
  );

  transform: ${p => (p.animate ? `translateX(0)` : `translateX(-100%)`)};

  transition: transform 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)
    ${p => p.index * 70 + 1200}ms;
`
