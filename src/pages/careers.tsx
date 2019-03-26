import React, { Component } from 'react'
import { graphql, Link } from 'gatsby'
import styled from 'styled-components'

import {
  Transitions,
  CareersAccordian,
  CareersGraph,
  CareersImages,
  Section,
  Heading,
  SEO,
  Layout,
  Perks,
} from '@components'
import Footer from '@components/Navigation/Navigation.Footer'
import Media from '@components/Media/Media.Img'
import ScrollIndicator from '@components/ScrollIndicator'
import LayoutHeroMobile from '@components/Layout/Layout.Hero.Mobile'
import Pill from '@components/Pill'

import mediaqueries from '@styles/media'
import transitions from '@styles/transitions'
import { startAnimation } from '@utils'

class CareersPage extends Component<{}, { animation: string }> {
  state = { animation: '', startBulb: false }

  componentDidMount() {
    startAnimation(() => {
      this.setState({ animation: 'start' })
    })
  }

  render() {
    const { animation, startBulb } = this.state
    const { data, location } = this.props
    const contentful = data.allContentfulCareersPage.edges[0].node
    const pageBackground =
      'linear-gradient(rgb(9, 10, 12),rgb(17, 18, 22) 60%,#1a1e24 100%)'

    const navConfig = {
      offset: true,
      fixed: true,
      theme: 'light',
    }

    return (
      <Layout background={pageBackground} nav={navConfig}>
        <SEO
          title={contentful.seo.title}
          description={contentful.seo.description}
          image={contentful.seo.image.file.url}
          pathname={location.pathname}
        />
        <LayoutHeroMobile>
          <>
            <Section>
              <GridContainer>
                <LeftContainer>
                  <TextContainer animation={animation}>
                    <Pill text="Careers" />
                    <Heading.h1>
                      Narative is a tight-knit team from across the world
                      building great things.
                    </Heading.h1>
                    <MainText>
                      We’re enthusiastic about partnering with and creating
                      brands worth believing in.
                    </MainText>
                  </TextContainer>
                  <div />
                </LeftContainer>
                <ImageContainer desktop>
                  <HeroImageTop>
                    <Media critical src={data.heroTop.childImageSharp.fluid} />
                  </HeroImageTop>
                  <HeroImageBottom start={startBulb}>
                    <Media
                      critical
                      onLoad={() => this.setState({ startBulb: true })}
                      src={data.heroBottom.childImageSharp.fluid}
                    />
                  </HeroImageBottom>
                </ImageContainer>
              </GridContainer>
            </Section>
            <Section>
              <ScrollIndicator />
            </Section>
          </>
        </LayoutHeroMobile>
        <Section hideOnDesktop>
          <ImageContainer>
            <HeroImageTop>
              <Media critical src={data.heroTop.childImageSharp.fluid} />
            </HeroImageTop>
            <HeroImageBottom>
              <Media
                critical
                src={data.heroBottom.childImageSharp.fluid}
                onLoad={() => this.setState({ startBulb: true })}
              />
            </HeroImageBottom>
          </ImageContainer>
        </Section>
        <Spacer />
        <CareerRow header="Why Narative">
          <SectionCopy maxWidth="69rem">
            At Narative, nobody has a "boss". Instead, we hold a common goal,
            where everyone owns executive level decision, regardless of
            position. We teach and learn from each other everyday, with growth
            based on trust and relationships.
          </SectionCopy>
        </CareerRow>
        <CareerRow header="Working at Narative">
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
        </CareerRow>
        <CareerRow header="We have fun">
          <SectionCopy maxWidth="67rem">
            Since we're all remote, it's always a party when the team gets
            together. And we like food... a lot.
          </SectionCopy>
          <CareersImages images={data.gallery.edges} />
        </CareerRow>
        <CareerRow
          header={
            <div style={{ paddingRight: '2.5rem' }}>Building our future</div>
          }
        >
          <SectionCopy maxWidth="67rem">
            We engage with exceptional clients to fund our own ideas. Displaying
            our core beliefs through the development of our own products. We
            call this <LabsLink to="/labs">Narative Labs</LabsLink>.
          </SectionCopy>
        </CareerRow>
        <CareersGraph />
        <CareerRow header="Say hello">
          <SectionCopy maxWidth="67rem">
            If you have the devotion, the curiosity and the desire to build
            great things, you might fit right in.
          </SectionCopy>
        </CareerRow>
        <Section narrow>
          <CareersAccordian />
        </Section>
        <Footer />
      </Layout>
    )
  }
}

export default CareersPage

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

export const pageQuery = graphql`
  query CareersPageQuery {
    allContentfulCareersPage {
      edges {
        node {
          seo {
            title
            description
            image {
              file {
                url
              }
            }
          }
          heading
          text {
            text
          }
        }
      }
    }
    heroTop: file(name: { regex: "/careers-hero-cable/" }) {
      childImageSharp {
        fluid(maxWidth: 322, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    heroBottom: file(name: { regex: "/careers-hero-bulb/" }) {
      childImageSharp {
        fluid(maxWidth: 767, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
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

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 505px 1fr;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  height: calc(100vh - 140px);
  min-height: 440px;

  width: 100%;

  ${mediaqueries.desktop`
    height: initial
    grid-template-columns: 1fr;
    height: calc(100vh - 140px);
    padding: 0;
  `};

  ${mediaqueries.phablet`
    height: calc(100vh - 180px);
    width: 100%;
  `};
`

const TextContainer = styled.div`
  ${transitions.fadeUp};
  top: -10px;
  position: relative;

  h1 {
    max-width: 470px;
  }

  ${mediaqueries.desktop`
    transition-delay: 0ms !important;
    transition-duration: 500ms !important;
  `};

  ${mediaqueries.phablet`
    top: -70px;
  `}
`

const MainText = styled.p`
  font-size: 3.2rem;
  font-weight: 400;
  color: ${p => p.theme.colors.grey};
  line-height: 1.3;

  ${mediaqueries.phablet`
    font-size: 2.2rem;
  `};
`

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  max-width: 62.1rem;

  ${mediaqueries.desktop`
    justify-content: flex-start;
    width: 100%;
    height: initial;
  `};
`

const ImageContainer = styled.div`
  position: absolute;
  width: 100%;
  width: 460px;
  right: 14%;

  ${mediaqueries.desktop_medium`
    right: -2%;
  `};

  ${mediaqueries.desktop`
    display:  ${p => (p.desktop ? ' none' : 'block')}
    right: 0;
    left: 0;
    position: relative;
    margin: 0 auto;
    margin-bottom: 50px;
    width: 100%;
  `};
`

const HeroImageTop = styled.div`
  max-width: 161.09px;
  margin: 0 auto;
  position: relative;
  left: -6px;

  ${mediaqueries.tablet`
    max-width: 130px;
  `}
`

const HeroImageBottom = styled.div`
  max-width: 381.46px;
  margin: 0 auto;
  transform: translateY(${p => (p.start ? '0' : '60px')});
  transition: transform 1.4s var(--ease-in-out-cubic);

  ${p => p.start && 'animation: float 4.8s ease-in-out infinite 1.4s;'}

  @keyframes float {
    0% {
      transform: translatey(0px);
    }
    50% {
      transform: translatey(-8px);
    }
    100% {
      transform: translatey(0px);
    }
  }

  ${mediaqueries.tablet`
    transform: none;
  `}
`

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

const Underline = styled.span`
  color: #e9daac;
  text-decoration: underline;
`
const UnderlineInner = styled.span`
  color: #fff;
  text-decoration: none;
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

const Spacer = styled.div`
  height: 145px;

  ${mediaqueries.tablet`
    height: 0;
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
