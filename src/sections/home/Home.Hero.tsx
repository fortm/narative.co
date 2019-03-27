import React, { Component } from 'react'
import { Link, navigate } from 'gatsby'
import styled from 'styled-components'

import { ButtonArrow, Section, Heading } from '@components'
import ScrollIndicator from '@components/ScrollIndicator'
import ShapeShifter from '@components/ShapeShifter'
import IntersectionObserver from '@components/IntersectionObserver'
import LayoutHeroMobile from '@components/Layout/Layout.Hero.Mobile'

import transitions from '@styles/transitions'
import { startAnimation } from '@utils'
import mediaqueries from '@styles/media'

class HomeHero extends Component<{}, { animation: string }> {
  state = { animation: '' }

  componentDidMount() {
    startAnimation(() => {
      this.setState({ animation: 'start' })
    })
  }

  navigateOut = (event, path) => {
    event.preventDefault()
    this.setState({ animation: '' })

    setTimeout(() => {
      navigate(path)
    }, 350)
  }

  render() {
    const { animation } = this.state

    return (
      <LayoutHeroMobile>
        <HomeHeroContainer id="home-hero">
          <Section>
            <IntersectionObserver
              render={({ intersectionRatio }) => (
                <ContentContainer style={{ opacity: intersectionRatio }}>
                  <TextContainer animation={animation}>
                    <Heading.h1>
                      <em>Narative</em> builds brands, websites and products for
                      growth-minded companies.
                    </Heading.h1>
                    <MainText>
                      We're a team with senior startup experience here to help
                      your business take the next step.
                    </MainText>
                    <ContactText
                      to="/contact"
                      onClick={event => this.navigateOut(event, '/contact')}
                      animation={animation}
                    >
                      <ButtonArrow text="Get in touch" />
                    </ContactText>
                  </TextContainer>
                  <ShapeShifter />
                </ContentContainer>
              )}
            />
            <ScrollIndicator />
          </Section>
        </HomeHeroContainer>
      </LayoutHeroMobile>
    )
  }
}

export default HomeHero

const HomeHeroContainer = styled.div`
  ${mediaqueries.desktop`
    #mirror-mask {
      display: none;
  `}
`

const TextContainer = styled.div`
  position: relative;
  z-index: 10;
  max-width: 570px;
  top: 10px;
  ${transitions.fadeUp};

  ${mediaqueries.phablet`
    top: 0;
    position: relative;
  `}
`

const MainText = styled.p`
  font-size: 3.2rem;
  font-weight: 400;
  color: ${p => p.theme.colors.grey};
  line-height: 1.3;
  margin-bottom: 50px;

  ${mediaqueries.phablet`
    font-size: 2.2rem;
  `};
`

const ContactText = styled(Link)`
  display: flex;
  flex-direction: row;
  font-size: 1.8rem;
  font-weight: 600;
  color: ${p => p.theme.colors.grey};
  ${transitions.fadeUp};

  svg {
    margin-left: 1rem;
    transition: transform 300ms ${p => p.theme.transitions.in};
  }
`

const ContentContainer = styled.div`
  height: calc(100vh - 230px);
  min-height: 440px;
  padding-top: 10px;

  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${mediaqueries.phablet`
    height: calc(100vh - 180px);
    padding: 0;
  `};

  @media screen and (max-height: 600px) {
    min-height: 100%;
  }
`
