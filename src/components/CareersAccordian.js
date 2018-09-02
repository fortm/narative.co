import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'

import { media } from '@styles'
import { ArrowRightIcon } from '../icons/ui'

const animateButtonLine = keyframes`
  0% {
      width: 0;
  }
  50% {
      width: 70%;
  }
  100% {
      width: 70%;
      left: 100%;
  }
`

const fadein = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const fadeInOut = keyframes`
  0% {
      opacity: 0;
      width: 0;
  }
  50% { opacity: 1; width: 40%}
  60% { opacity: 1; width: 70%}
  80% {
    opacity: 0;
    width: 50%;
    left: 100%;
  }
`

const careers = [
  {
    title: 'Full Stack or Frontend Engineer',
    location: 'Remote, Vancouver, Montreal, Toronto',
    description:
      "Narative is founded by designers, engineers and entrepreneurs with decades of experience at the world's most successful startups. We merge best practices in design, development and strategy to create narratives that empower your brand and product.",
    mailTo:
      'mailto:info@narative.co?subject=Full Stack or Frontend Engineer @ Narative',
  },
  {
    title: 'UX Copywriter',
    location: 'Remote, Vancouver, Montreal, Toronto',
    description:
      "Narative is founded by designers, engineers and entrepreneurs with decades of experience at the world's most successful startups. We merge best practices in design, development and strategy to create narratives that empower your brand and product.",
    mailTo: 'mailto:info@narative.co?subject=UX Copywriter @ Narative',
  },
  {
    title: 'Product Manager',
    location: 'Remote, Vancouver, Montreal, Toronto',
    description:
      "Narative is founded by designers, engineers and entrepreneurs with decades of experience at the world's most successful startups. We merge best practices in design, development and strategy to create narratives that empower your brand and product.",
    mailTo: 'mailto:info@narative.co?subject=Product Manager @ Narative',
  },
]

const CareersAccordianItem = ({ career, handleIndexOpen, index, isOpen }) => (
  <AccordianListItem isOpen={isOpen} onClick={() => handleIndexOpen(index)}>
    <AccordianListTop>
      <AccordianListText>
        <AccordianListTitle>{career.title}</AccordianListTitle>
        <AccordianListLocation>{career.location}</AccordianListLocation>
      </AccordianListText>
      <IconContainer isOpen={isOpen} />
    </AccordianListTop>

    {isOpen && (
      <div>
        <AccordianListDescription>
          {career.description}
        </AccordianListDescription>
        <AccordianMailTo href={career.mailTo}>
          <ArrowAnimation>
            Email us about this job
            <ArrowRightIcon color="white" />
          </ArrowAnimation>
        </AccordianMailTo>
      </div>
    )}
  </AccordianListItem>
)

class CareersAccordian extends Component {
  state = {
    openRowIndex: null,
  }

  handleIndexOpen = index => {
    if (index === this.state.openRowIndex) {
      return this.setState({
        openRowIndex: null,
      })
    }

    return this.setState({
      openRowIndex: index,
    })
  }

  render() {
    return (
      <AccordianContainer>
        <AccordianList>
          {careers.map((career, index) => (
            <CareersAccordianItem
              key={career.title}
              handleIndexOpen={this.handleIndexOpen}
              career={career}
              index={index}
              isOpen={this.state.openRowIndex === index}
            />
          ))}
        </AccordianList>
      </AccordianContainer>
    )
  }
}

export default CareersAccordian

const AccordianContainer = styled.div`
  color: #fff;
  max-width: 69rem;
  height: 47rem;
  margin: 0 0 10rem 26.3rem;
  position: relative;
  top: -9rem;
  transition: height 0.5s ease;

  ${media.desktop`
    margin:  0 auto 15rem;
    top: -4rem;
  `};
`

const AccordianList = styled.ul`
  list-style: none;
`

const IconContainer = styled.div`
  position: relative;

  &::before {
    content: '';
    position: absolute;
    right: 4px;
    top: 12px;
    height: 2px;
    width: 8px;
    background: #fff;
    transform: rotate(${p => (p.isOpen ? -45 : 45)}deg);
    transition: transform 300ms ease;
  }

  &::after {
    content: '';
    position: absolute;
    right: 0px;
    top: 12px;
    height: 2px;
    width: 8px;
    background: #fff;
    transform: rotate(${p => (p.isOpen ? 45 : -45)}deg);
    transition: transform 300ms ease;
  }
`

const AccordianListText = styled.span`
  transition: transform 200ms ease-in-out;
`

const AccordianListItem = styled.li`
  border-bottom: 1px solid #707173;
  padding: 2.5rem 0;
  cursor: pointer;

  &:hover ${AccordianListText} {
    transform: translateX(${p => (p.isOpen ? 0 : 5)}px);
  }
`

const AccordianListTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`

const AccordianListTitle = styled.h4`
  font-family: 'futura-pt';
  font-size: 1.6rem;
  font-weight: 600;
  color: #fff;
`

const AccordianListLocation = styled.div`
  color: ${p => p.theme.colors.grey};
`

const AccordianListDescription = styled.p`
  position: relative;
  margin-top: 5rem;
  color: ${p => p.theme.colors.grey};
  margin-bottom: 2.5rem;
  opacity: 0;
  animation: 1s ease-out ${fadein} forwards;

  &::before {
    content: '';
    position: absolute;
    top: -2.5rem;
    left: 0;
    width: 2.5rem;
    height: 1px;
    background: #c4c4c4;
    animation: 325ms forwards scale ease;
    transform-origin: 0% 50%;
  }

  @keyframes scale {
    from {
      transform: scale(0);
    }

    to {
      transform: scale(1);
    }
  }
`

const AccordianMailTo = styled.a`
  display: flex;
  align-items: center;
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 2.5rem;
  color: #fff;
  opacity: 0;
  animation: 1.4s ease-out ${fadein} forwards;
`

const ArrowAnimation = styled.div`
  position: relative;
  display: inline-block;
  padding: 0 3rem 0 0.5rem;
  overflow-x: hidden;

  ${media.phablet`
    padding: 0;
    text-decoration: underline;
  `};

  &::after {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: 12px;
    height: 1px;
    width: 0;
    background: #fff;
    opacity: 0;
    z-index: 100;
  }

  svg {
    margin-left: 1rem;
    transition: all 300ms cubic-bezier(0.77, 0, 0.175, 1);

    ${media.phablet`
      display: none;
    `};
  }

  &:hover svg {
    transform: translateX(3rem);
  }

  &:hover span::after {
    animation: ${fadeInOut} 1s cubic-bezier(0.77, 0, 0.175, 1) forwards;
  }

  &:hover::after {
    opacity: 1;
    animation: ${animateButtonLine} 1s cubic-bezier(0.77, 0, 0.175, 1) forwards;

    ${media.tablet`
      animation: none;
    `};
  }
`
