import React, { Component, Fragment } from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled, { keyframes } from 'styled-components'

import { media, transitions } from '@styles'
import {
  CareersAccordian,
  CareersGraph,
  CareersImages,
  Container,
  CopyToClipboard,
  Helmet,
  Layout,
  Logo,
  Perks,
  SocialLinks,
} from '@components'
import { Section } from '@modules'
import { ArrowRightIcon } from '../icons/ui'

class CareersPage extends Component {
  state = { animation: '' }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ animation: 'start' })
    })
  }

  render() {
    const { animation } = this.state

    return (
      <Layout>
        <GradientContainer animation={animation}>
          <Helmet
            title="Careers"
            pathname={this.props.location.pathname}
            image={this.props.data.careersMeta.childImageSharp.fixed.src}
          />
          <Content>
            <MobileHero>
              <Container>
                <GridContainer>
                  <LeftContainer>
                    <LogoContainer to="/">
                      <Logo />
                    </LogoContainer>
                    <TextContainer animation={animation} transitionDelay={300}>
                      <HiringPill>We're hiring</HiringPill>
                      <WelcomeHeader>
                        Let's build products, together, <br />with the world's
                        best startups
                      </WelcomeHeader>
                      <MainText>
                        Imagine a place where we get to choose the brands we
                        believe in, working alongside their team to establish a
                        seamless integration. Where trust, contribution and
                        quality are at the core of our values.
                      </MainText>
                    </TextContainer>
                    <div />
                  </LeftContainer>
                  <RightContainer>
                    <ImageContainer>
                      <NarativeHeroImg
                        fluid={
                          this.props.data.careersHero.childImageSharp.fluid
                        }
                      />
                      <ImageTraceContainer>
                        <NarativeHeroOutline />
                      </ImageTraceContainer>
                    </ImageContainer>
                    <ShareIconContainer>
                      <CopyToClipboard
                        textToCopy="https://narative.co/careers"
                        successText="narative.co/careers"
                      >
                        <Fragment>
                          Share this page <ShareIcon />
                        </Fragment>
                      </CopyToClipboard>
                    </ShareIconContainer>
                  </RightContainer>
                </GridContainer>
              </Container>
            </MobileHero>
            <MobileBody>
              <MobilePuller />
              <Container>
                <ScrollLine />
              </Container>
              <Container hideOnDesktop>
                <ImageContainer>
                  <NarativeHeroImg
                    fluid={this.props.data.careersHero.childImageSharp.fluid}
                  />
                  <ImageTraceContainer>
                    <NarativeHeroOutline />
                  </ImageTraceContainer>
                </ImageContainer>
              </Container>
              <Section header="Why Narative">
                <SectionCopy maxWidth="69rem">
                  At Narative, nobody has a "boss". Instead, we hold a common
                  goal, where everyone owns executive level decision, regardless
                  of position. We teach and learn from each other everyday, with
                  growth based on trust and relationships.
                </SectionCopy>
              </Section>
              <Section header="Working at Narative">
                <FlexColumn>
                  <WhatWeDoContent>
                    <SectionCopy maxWidth="46rem">
                      Not only are we mindful of the projects we select, we get
                      to choose how and when we work, to ensure we're at our
                      best.
                    </SectionCopy>
                  </WhatWeDoContent>
                  <WhatWeDoList>
                    <Perks />
                  </WhatWeDoList>
                </FlexColumn>
              </Section>
              <Section header="We have fun">
                <SectionCopy maxWidth="67rem">
                  Since we're all remote, it's always a party when the team gets
                  together. And we like food... a lot.
                </SectionCopy>
                <CareersImages images={this.props.data.gallery.edges} />
              </Section>
              <Section
                header={
                  <div style={{ paddingRight: '2.5rem' }}>
                    Building our future
                  </div>
                }
              >
                <SectionCopy maxWidth="67rem">
                  We engage with{' '}
                  <Underline>
                    <UnderlineInner>exceptional clients</UnderlineInner>
                  </Underline>{' '}
                  to fund our own ideas. Displaying our core beliefs through the
                  development of our own products. We call this Narative Labs.
                </SectionCopy>
              </Section>
              <CareersGraph />

              <Section header="Say hello">
                <SectionCopy maxWidth="67rem">
                  If you have the devotion, the curiosity and the desire to
                  build great things, you might fit right in.
                </SectionCopy>
              </Section>
              <Container>
                <CareersAccordian />
              </Container>
              <Container>
                <Footer>
                  <CopyRightContainer>
                    <ContactActionsContainer>
                      <ContactButton to="/contact">Contact us</ContactButton>
                      <ContactText to="/" color="#fff">
                        <ArrowAnimation>
                          Go back home
                          <ArrowRightIcon color="#fff" />
                        </ArrowAnimation>
                      </ContactText>
                    </ContactActionsContainer>
                  </CopyRightContainer>
                  <SocialIconsFooter>
                    <SocialLinks />
                  </SocialIconsFooter>
                </Footer>
              </Container>
            </MobileBody>
          </Content>
        </GradientContainer>
      </Layout>
    )
  }
}

export default CareersPage

export const pageQuery = graphql`
  query CareersPageQuery {
    careersHero: file(name: { regex: "/narative-careers-hero/" }) {
      childImageSharp {
        fluid(maxWidth: 467, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    careersMeta: file(name: { regex: "/careers-meta/" }) {
      childImageSharp {
        fixed(width: 1200, quality: 100) {
          ...GatsbyImageSharpFixed_noBase64
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

const fadeIn = keyframes`
  0% {
      opacity: 0;
  }
  100% {
    opacity: 1;
  }
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

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr [col-start]);
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  height: 88vh;
  width: 100%;

  ${media.desktop`
    height: initial
    grid-template-columns: 1fr;
  `};

  ${media.phone`
    width: 100%;
  `};
`

const LogoContainer = styled(Link)`
  max-height: 2.3rem;
  max-width: 13.059rem;
  margin-bottom: 0;
  text-decoration: none;

  ${media.desktop`
    max-width: 10rem;
    margin-bottom: 4rem;
    transition-delay: 0ms !important;
    transition-duration: 500ms !important;
  `};
`

const TextContainer = styled.div`
  ${transitions.fadeUp};

  ${media.desktop`
    transition-delay: 0ms !important;
    transition-duration: 500ms !important;
  `};
`

const HiringPill = styled.div`
  color: ${p => p.theme.colors.grey};
  border: 1px solid ${p => p.theme.colors.grey};
  border-radius: 3px;
  padding: 0.1rem 1.2rem;
  margin-bottom: 1.5rem;
  display: inline-block;
  font-weight: 600;
`

const WelcomeHeader = styled.h1`
  color: white;
  font-size: 3.6rem;
  margin-bottom: 2rem;

  ${media.desktop`
    font-size: 1.8rem;
  `};
`

const MainText = styled.p`
  font-size: 1.8rem;
  font-weight: 400;
  color: ${props => props.theme.colors.grey};
  margin-bottom: 2rem;
  max-width: 47rem;
`

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 50.5rem;
  height: 53rem;

  ${media.desktop`
    padding-top: 5rem;
    justify-content: flex-start;
    width: 100%;
    height: initial;
  `};
`

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 460px;
  right: -8rem;
  margin: 0 auto;

  ${media.mdpi`
    right: 0;
  `};

  ${media.tablet`
    margin-bottom: 10rem;
  `};
`

const NarativeHeroImg = styled(Img)`
  opacity: 0;
  animation: fadein 1s cubic-bezier(0.5, 0, 0.415, 0.955) forwards 2s;

  @keyframes fadein {
    to {
      opacity: 1;
    }
  }
`

const ImageTraceContainer = styled.div`
  position: absolute;
  left: -22px;
  top: -16px;
  height: 100%;
  width: 100%;

  svg .narative-hero-fadein-last {
    opacity: 0;
    animation: fadein 1s ease-out forwards 2.5s;
  }

  svg .narative-hero-fadein-last-half {
    opacity: 0;
    animation: fadeinHalf 1s ease-out forwards 2.5s;
  }

  @keyframes fadein {
    to {
      opacity: 1;
    }
  }

  @keyframes fadeinHalf {
    to {
      opacity: 0.5;
    }
  }

  ${media.tablet`
    left: -21px;
    top: -13px;
  `};

  ${media.phablet`
    left: -16px;
    top: -13px;
  `};

  ${media.phone`
    left: -15px;
    top: -10px;
  `};

  ${media.se`
    left: -12px;
    top: -9px;
  `};
`

const ScrollLine = styled.div`
  position: relative;
  height: 9rem;
  width: 1px;
  margin-bottom: 4rem;
  background: ${p => p.theme.colors.grey};

  transform: translateY(9rem);
  opacity: 0;
  animation: sample 1s ease-out forwards 3s;

  @keyframes sample {
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: -2px;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: ${p => p.theme.colors.grey};
  }

  ${media.tablet`
    display: none;
  `};
`

const RightContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding-top: 4rem;

  ${media.desktop`
    justify-content: center;
    margin-bottom: 5rem;
  `};

  ${media.tablet`
    justify-content: center;
    top: 100vh;
  `};
`

const CopyRightContainer = styled.div`
  display: block;
  font-size: 1.8rem;
  font-weight: 500;

  ${media.desktop`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 9rem;
    width: 100%;
  `};
`

const ContactActionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 42rem;

  ${media.phablet`
    width: 100%;
    flex-direction: column;
  `};
`

const ContactButton = styled(Link)`
  position: relative;
  height: 45px;
  width: 195px;
  background: #000;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 3px;
  font-weight: 500;

  ${media.phablet`
    width: 100%;
    margin-bottom: 3rem;
  `};

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-shadow: 0px 3px 18px rgba(0, 0, 0, 0.28);
    opacity: 0;
    pointer-events: none;
    transform: scale(0.8);
    transition: all 300ms ease-out;
  }

  &:hover::after {
    transform: scale(1);
    opacity: 1;
  }
`

const ContactText = styled(Link)`
  display: flex;
  flex-direction: row;
  font-size: 1.8rem;
  font-weight: 600;
  color: ${p => (p.color ? p.color : '#000')};

  ${media.tablet`
    flex-direction: column;
  `};

  svg {
    margin-left: 1rem;
    transition: transform 300ms ${props => props.theme.transitions.in};
  }
`

const ArrowAnimation = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  overflow-x: hidden;
  padding: 0 3rem 0 0.5rem;

  ${media.tablet`
    padding: 0rem
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

    ${media.tablet`
    display: none;
    `};
  }

  svg {
    transition: all 300ms cubic-bezier(0.77, 0, 0.175, 1);

    ${media.tablet`
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

const SectionCopy = styled.p`
  color: #fff;
  font-size: 3.6rem;
  line-height: 1.2;
  max-width: ${props => (props.maxWidth ? props.maxWidth : '100%')};

  ${media.desktop`
    font-size: 2.2rem;
    line-height: 1.4;
    max-width: 100%;
  `};

  ${media.tablet`
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

  ${media.desktop`
    width: 100%;
  `};
`

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 5rem;
  color: ${props => props.theme.colors.grey};

  ${media.tablet`
    justify-content: center;
    flex-direction: column;
  `};
`

const SocialIconsFooter = styled.div`
  display: flex;
  align-items: center;

  ${props =>
    props.hideOnMobile &&
    media.desktop`
    display: none;
  `};
`

const FlexColumn = styled.div`
  display: flex;
  justify-content: space-between;

  ${media.desktop`
    flex-direction: column;
  `};
`

const WhatWeDoContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${media.desktop`
    margin-bottom: 2.5rem;
  `};
`

const Content = styled.div`
  position: relative;
  z-index: 1;
`

const MobileHero = styled.div`
  ${media.tablet`
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    width: 100%;
  `};
`

const MobileBody = styled.div`
  ${media.tablet`
    transform: translateY(44rem);
    padding-top: 7rem;
    height: 100%;
    position: relative;
    background: #111216;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      height: 100%;
      width: 100%;
      left: 0;
      bottom: 0;
      z-index: -1;
      background: linear-gradient(180deg, #000 0%, #111216 41.44%, #111216 69.06%, #1A1E24 90.61%);
    }
  `};

  ${media.phablet`
    transform: translateY(38rem);
  `};

  ${media.phone`
    padding-top: 6rem;
    transform: translateY(42rem);
  `};

  ${media.se`
    transform: translateY(46rem);
  `};
`

const MobilePuller = styled.div`
  ${media.tablet`
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    top: 1.5rem;
    width: 4.2rem;
    height: 4px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 100px;
`};
`

const GradientContainer = styled.div`
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: linear-gradient(
      rgb(9, 10, 12),
      rgb(17, 18, 22) 60%,
      #1a1e24 100%
    );
    pointer-events: none;
    transition: all 1.5s ease;
    z-index: 0;
    opacity: ${p => (p.animation ? 1 : 0)};

    ${media.tablet`
      background: #0D0E10;
    `};
  }
`

const ShareIconContainer = styled.div`
  position: absolute;
  top: -5.5rem;
  right: 0;
  opacity: 0;
  color: ${p => p.theme.colors.grey};
  animation: ${fadeIn} 2s cubic-bezier(0.77, 0, 0.175, 1) forwards 2.4s;

  ${media.desktop`
    display: none;
  `};

  svg {
    margin-left: 0.9rem;
  }
`

const ShareIcon = () => (
  <svg
    width="14"
    height="15"
    viewBox="0 0 14 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.2952 10.6024C10.7229 10.6024 10.2108 10.8283 9.81928 11.1822L4.4503 8.05723C4.48795 7.88404 4.51807 7.71084 4.51807 7.53012C4.51807 7.3494 4.48795 7.17621 4.4503 7.00301L9.75904 3.90813C10.1657 4.28464 10.7003 4.51807 11.2952 4.51807C12.5452 4.51807 13.5542 3.50904 13.5542 2.25904C13.5542 1.00904 12.5452 0 11.2952 0C10.0452 0 9.03614 1.00904 9.03614 2.25904C9.03614 2.43976 9.06626 2.61295 9.10392 2.78614L3.79518 5.88102C3.38855 5.50452 2.85392 5.27108 2.25904 5.27108C1.00904 5.27108 0 6.28012 0 7.53012C0 8.78012 1.00904 9.78916 2.25904 9.78916C2.85392 9.78916 3.38855 9.55572 3.79518 9.17922L9.15663 12.3117C9.11898 12.4699 9.09639 12.6355 9.09639 12.8012C9.09639 14.0136 10.0828 15 11.2952 15C12.5075 15 13.494 14.0136 13.494 12.8012C13.494 11.5889 12.5075 10.6024 11.2952 10.6024Z"
      fill="white"
    />
  </svg>
)

const NarativeHeroOutline = () => (
  <svg
    width="101.5%"
    viewBox="0 0 467 492"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M460.787 322.591L449 314.331V290H448V313.63L24.5001 16.8574V2H23.5001V16.1567L1.28687 0.590576L0.713013 1.40942L23.5001 17.3777V178.623L9.78534 169.089L9.21454 169.911L23.5001 179.841V267H24.5001V180.536L448 474.92V485H449V475.615L460.215 483.411L460.785 482.589L449 474.397V315.552L460.213 323.409L460.787 322.591ZM24.5001 179.318L448 473.702V314.851L24.5001 18.0784V179.318Z"
      fill="url(#paint0_linear)"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M450.989 222.5H359.096L359.028 222.598L359.001 222.579V313.995C409.403 313.464 450.193 272.838 450.989 222.5ZM359.201 221.5L359.001 221.36V158.55L360.012 159.254L360.583 158.433L359.001 157.332V128.005C409.903 128.542 451.001 169.971 451.001 221C451.001 221.13 451.001 221.26 451 221.39L449.177 220.121L448.606 220.942L449.408 221.5H359.201ZM357.453 221.5H265.002C265.001 221.333 265.001 221.167 265.001 221C265.001 181.557 289.556 147.848 324.214 134.328L326.262 135.754L326.833 134.933L325.343 133.896C335.504 130.084 346.509 128 358.001 128V156.635L356.365 155.496L355.793 156.317L358.001 157.854V220.663L355.474 218.902L354.903 219.723L357.453 221.5ZM358.001 222.5H265.013C265.814 273.171 307.139 314 358.001 314V222.5ZM264.001 221C264.001 272.915 306.086 315 358.001 315H359.001V314.995C410.455 314.458 452.001 272.581 452.001 221C452.001 169.085 409.916 127 358.001 127C346.143 127 334.797 129.196 324.349 133.203L322.615 131.996L322.043 132.817L323.228 133.641C288.526 147.466 264.001 181.369 264.001 221ZM317.825 129.879L315.715 128.41L316.287 127.59L318.396 129.058L317.825 129.879ZM334.7 141.629L330.481 138.692L331.052 137.871L335.271 140.808L334.7 141.629ZM343.137 147.504L338.918 144.567L339.49 143.746L343.708 146.683L343.137 147.504ZM351.575 153.379L347.356 150.442L347.927 149.621L352.146 152.558L351.575 153.379ZM368.45 165.129L364.231 162.192L364.802 161.371L369.021 164.308L368.45 165.129ZM376.887 171.004L372.668 168.067L373.24 167.246L377.458 170.183L376.887 171.004ZM385.325 176.879L381.106 173.942L381.677 173.121L385.896 176.058L385.325 176.879ZM393.762 182.754L389.543 179.817L390.115 178.996L394.333 181.933L393.762 182.754ZM402.2 188.629L397.981 185.692L398.552 184.871L402.771 187.808L402.2 188.629ZM410.637 194.504L406.418 191.567L406.99 190.746L411.208 193.683L410.637 194.504ZM419.075 200.379L414.856 197.442L415.427 196.621L419.646 199.558L419.075 200.379ZM427.512 206.254L423.293 203.317L423.865 202.496L428.083 205.433L427.512 206.254ZM435.95 212.129L431.731 209.192L432.302 208.371L436.521 211.308L435.95 212.129ZM444.387 218.004L440.168 215.067L440.74 214.246L444.958 217.183L444.387 218.004ZM315.715 192.41L317.778 193.848L318.349 193.027L316.287 191.59L315.715 192.41ZM321.903 196.723L326.028 199.598L326.599 198.777L322.474 195.902L321.903 196.723ZM330.153 202.473L334.278 205.348L334.849 204.527L330.724 201.652L330.153 202.473ZM338.403 208.223L342.528 211.098L343.099 210.277L338.974 207.402L338.403 208.223ZM346.653 213.973L350.778 216.848L351.349 216.027L347.224 213.152L346.653 213.973ZM363.153 225.473L367.278 228.348L367.849 227.527L363.724 224.652L363.153 225.473ZM371.403 231.223L375.528 234.098L376.099 233.277L371.974 230.402L371.403 231.223ZM379.653 236.973L383.778 239.848L384.349 239.027L380.224 236.152L379.653 236.973ZM387.903 242.723L392.028 245.598L392.599 244.777L388.474 241.902L387.903 242.723ZM396.153 248.473L400.278 251.348L400.849 250.527L396.724 247.652L396.153 248.473ZM404.403 254.223L408.528 257.098L409.099 256.277L404.974 253.402L404.403 254.223ZM412.653 259.973L416.778 262.848L417.349 262.027L413.224 259.152L412.653 259.973ZM420.903 265.723L425.027 268.598L425.599 267.777L421.474 264.902L420.903 265.723ZM429.152 271.473L433.277 274.348L433.849 273.527L429.724 270.652L429.152 271.473ZM437.402 277.223L441.527 280.098L442.099 279.277L437.974 276.402L437.402 277.223ZM445.652 282.973L447.715 284.41L448.287 283.59L446.224 282.152L445.652 282.973Z"
      fill="url(#paint1_linear)"
    />
    <path
      className="narative-hero-fadein-last"
      d="M30.8822 11.542C30.8822 11.866 30.9812 12.127 31.0982 12.316C31.4042 12.829 31.9982 13.099 32.5382 13.099C33.5192 13.099 34.3022 12.343 34.3022 11.335C34.3022 10.651 33.9242 10.075 33.2762 9.868C33.9962 9.58 34.2212 8.932 34.2212 8.419C34.2212 7.6 33.6452 6.916 32.6552 6.916C32.3312 6.916 31.9082 6.979 31.5482 7.348C31.3052 7.6 31.1162 7.978 31.1072 8.428H31.4852C31.4942 8.131 31.6022 7.834 31.7912 7.627C32.0612 7.321 32.4122 7.276 32.6552 7.276C33.4022 7.276 33.8072 7.807 33.8072 8.446C33.8072 8.842 33.6272 9.211 33.3662 9.427C33.3032 9.481 33.0152 9.706 32.5562 9.706V10.066C32.8442 10.066 33.1232 10.12 33.3212 10.246C33.6362 10.444 33.8882 10.831 33.8882 11.344C33.8882 12.091 33.2762 12.739 32.5382 12.739C32.1422 12.739 31.7012 12.505 31.4762 12.181C31.3592 12.001 31.2872 11.776 31.2782 11.542H30.8822ZM39.0249 6.997H36.7299L35.9559 9.544C36.2169 9.382 36.5139 9.283 36.8919 9.283C37.8909 9.283 38.5839 9.994 38.5839 11.011C38.5839 12.019 37.8639 12.739 36.8739 12.739C36.2709 12.739 35.7489 12.46 35.4159 11.965L35.0649 12.109C35.4969 12.856 36.2349 13.099 36.8649 13.099C38.0349 13.099 38.9979 12.298 38.9979 11.002C38.9979 9.805 38.1879 8.923 36.9099 8.923C36.7659 8.923 36.6489 8.941 36.5049 8.977L37.0089 7.357H39.0249V6.997ZM41.2916 6.997C40.8416 6.997 40.5356 7.159 40.3376 7.366C40.1216 7.591 39.9956 7.897 39.9956 8.266C39.9956 8.662 40.1576 8.968 40.3556 9.166C40.5176 9.328 40.8056 9.517 41.2556 9.517C41.6606 9.517 41.9936 9.364 42.2006 9.139C42.3896 8.941 42.5336 8.635 42.5336 8.248C42.5336 7.933 42.4346 7.636 42.1916 7.375C41.9126 7.078 41.6066 6.997 41.2916 6.997ZM40.0586 10.075V10.381H42.4616V10.075H40.0586ZM41.2556 7.213C41.5616 7.213 41.8046 7.33 41.9666 7.483C42.1376 7.645 42.2816 7.915 42.2816 8.257C42.2816 8.635 42.1196 8.878 41.9576 9.031C41.8316 9.148 41.5976 9.301 41.2466 9.301C41.0576 9.301 40.7966 9.247 40.5626 9.022C40.3736 8.833 40.2476 8.59 40.2476 8.257C40.2476 7.969 40.3376 7.717 40.5446 7.51C40.6886 7.366 40.9226 7.213 41.2556 7.213Z"
      fill="#E9DAAC"
    />
    <path
      className="narative-hero-fadein-last"
      d="M5.25425 190.099L7.25225 187.264C7.35125 187.12 7.63925 186.688 7.63925 186.04C7.63925 184.807 6.73025 183.916 5.51525 183.916C4.25525 183.916 3.37325 184.834 3.37325 186.031C3.37325 187.255 4.27325 188.128 5.46125 188.128C5.73125 188.128 6.00125 188.083 6.28025 187.966L4.94825 189.865L5.25425 190.099ZM5.50625 184.276C6.49625 184.276 7.22525 185.032 7.22525 186.022C7.22525 187.021 6.50525 187.768 5.50625 187.768C4.52525 187.768 3.78725 187.048 3.78725 186.022C3.78725 185.041 4.51625 184.276 5.50625 184.276ZM10.4279 183.916C10.0409 183.916 9.50091 184.06 9.01491 184.645C8.54691 185.203 8.24991 186.013 8.24991 187.003C8.24991 187.993 8.54691 188.803 9.01491 189.361C9.44691 189.874 9.96891 190.099 10.4279 190.099C10.8869 190.099 11.4089 189.874 11.8409 189.361C12.3089 188.803 12.6059 187.993 12.6059 187.003C12.6059 186.013 12.3089 185.203 11.8409 184.645C11.3549 184.06 10.8149 183.916 10.4279 183.916ZM10.4279 189.739C10.2209 189.739 9.75291 189.676 9.31191 189.127C8.92491 188.65 8.66391 187.957 8.66391 187.003C8.66391 186.04 8.92491 185.356 9.31191 184.879C9.52791 184.609 9.89691 184.276 10.4279 184.276C10.9589 184.276 11.3279 184.609 11.5439 184.879C11.9309 185.356 12.1919 186.04 12.1919 187.003C12.1919 187.957 11.9309 188.65 11.5439 189.127C11.1029 189.676 10.6349 189.739 10.4279 189.739ZM14.4586 183.997C14.0086 183.997 13.7026 184.159 13.5046 184.366C13.2886 184.591 13.1626 184.897 13.1626 185.266C13.1626 185.662 13.3246 185.968 13.5226 186.166C13.6846 186.328 13.9726 186.517 14.4226 186.517C14.8276 186.517 15.1606 186.364 15.3676 186.139C15.5566 185.941 15.7006 185.635 15.7006 185.248C15.7006 184.933 15.6016 184.636 15.3586 184.375C15.0796 184.078 14.7736 183.997 14.4586 183.997ZM13.2256 187.075V187.381H15.6286V187.075H13.2256ZM14.4226 184.213C14.7286 184.213 14.9716 184.33 15.1336 184.483C15.3046 184.645 15.4486 184.915 15.4486 185.257C15.4486 185.635 15.2866 185.878 15.1246 186.031C14.9986 186.148 14.7646 186.301 14.4136 186.301C14.2246 186.301 13.9636 186.247 13.7296 186.022C13.5406 185.833 13.4146 185.59 13.4146 185.257C13.4146 184.969 13.5046 184.717 13.7116 184.51C13.8556 184.366 14.0896 184.213 14.4226 184.213Z"
      fill="#E9DAAC"
    />
    <path
      className="narative-hero-fadein-last"
      d="M28.636 393.967C28.285 393.472 27.781 393.247 27.205 393.247C26.134 393.247 25.414 394.03 25.414 395.164C25.414 396.37 26.242 397.099 27.205 397.099C27.682 397.099 28.267 396.91 28.636 396.343V397H28.996V393.328H28.636V393.967ZM27.223 393.589C27.853 393.589 28.654 394.048 28.654 395.137C28.654 395.983 28.15 396.757 27.232 396.757C26.305 396.757 25.792 395.965 25.792 395.137C25.792 394.138 26.494 393.589 27.223 393.589ZM29.8206 398.422L30.1086 398.566L34.6446 390.457L34.3566 390.313L29.8206 398.422ZM35.4742 390.439V397H35.8342V396.343C35.9422 396.523 36.3472 397.099 37.2562 397.099C38.3722 397.099 39.0562 396.217 39.0562 395.137C39.0562 394.075 38.3812 393.247 37.2742 393.247C36.6892 393.247 36.1852 393.49 35.8342 393.967V390.439H35.4742ZM37.2472 396.757C36.3202 396.757 35.8162 396.037 35.8162 395.119C35.8162 394.102 36.5362 393.589 37.2562 393.589C38.0122 393.589 38.6782 394.129 38.6782 395.137C38.6782 396.037 38.1742 396.757 37.2472 396.757ZM41.8644 393.571H45.7704V393.229H41.8644V393.571ZM41.8644 394.849H45.7704V394.507H41.8644V394.849ZM49.482 394.39C49.482 393.688 49.572 392.914 49.671 392.302C49.77 391.672 49.878 391.159 50.076 390.547L49.734 390.34C49.527 390.925 49.419 391.393 49.302 391.987C49.131 392.86 49.068 393.463 49.068 394.39C49.068 395.308 49.131 395.911 49.302 396.793C49.419 397.387 49.527 397.855 49.734 398.44L50.076 398.233C49.896 397.657 49.77 397.108 49.671 396.478C49.554 395.776 49.482 395.011 49.482 394.39ZM54.344 393.967C53.993 393.472 53.489 393.247 52.913 393.247C51.842 393.247 51.122 394.03 51.122 395.164C51.122 396.37 51.95 397.099 52.913 397.099C53.39 397.099 53.975 396.91 54.344 396.343V397H54.704V393.328H54.344V393.967ZM52.931 393.589C53.561 393.589 54.362 394.048 54.362 395.137C54.362 395.983 53.858 396.757 52.94 396.757C52.013 396.757 51.5 395.965 51.5 395.137C51.5 394.138 52.202 393.589 52.931 393.589ZM55.6456 394.21H57.4186V395.848H57.7786V394.21H59.5516V393.868H57.7786V392.23H57.4186V393.868H55.6456V394.21ZM60.4966 390.439V397H60.8566V396.343C60.9646 396.523 61.3696 397.099 62.2786 397.099C63.3946 397.099 64.0786 396.217 64.0786 395.137C64.0786 394.075 63.4036 393.247 62.2966 393.247C61.7116 393.247 61.2076 393.49 60.8566 393.967V390.439H60.4966ZM62.2696 396.757C61.3426 396.757 60.8386 396.037 60.8386 395.119C60.8386 394.102 61.5586 393.589 62.2786 393.589C63.0346 393.589 63.7006 394.129 63.7006 395.137C63.7006 396.037 63.1966 396.757 62.2696 396.757ZM65.4613 398.44C65.6683 397.855 65.7763 397.387 65.8933 396.793C66.0643 395.911 66.1273 395.308 66.1273 394.39C66.1273 393.463 66.0643 392.86 65.8933 391.987C65.7763 391.393 65.6683 390.925 65.4613 390.34L65.1193 390.547C65.3173 391.159 65.4253 391.672 65.5243 392.302C65.6233 392.914 65.7133 393.688 65.7133 394.39C65.7133 395.011 65.6413 395.776 65.5243 396.478C65.4253 397.108 65.2993 397.657 65.1193 398.233L65.4613 398.44ZM67.2093 398.422L67.4973 398.566L72.0333 390.457L71.7453 390.313L67.2093 398.422ZM75.8508 393.967C75.4998 393.472 74.9958 393.247 74.4198 393.247C73.3488 393.247 72.6288 394.03 72.6288 395.164C72.6288 396.37 73.4568 397.099 74.4198 397.099C74.8968 397.099 75.4818 396.91 75.8508 396.343V397H76.2108V393.328H75.8508V393.967ZM74.4378 393.589C75.0678 393.589 75.8688 394.048 75.8688 395.137C75.8688 395.983 75.3648 396.757 74.4468 396.757C73.5198 396.757 73.0068 395.965 73.0068 395.137C73.0068 394.138 73.7088 393.589 74.4378 393.589ZM79.2531 393.571H83.1591V393.229H79.2531V393.571ZM79.2531 394.849H83.1591V394.507H79.2531V394.849ZM88.0046 397H88.4006V390.997H87.2486L87.0686 391.357H88.0046V397ZM90.492 396.73C90.492 396.919 90.636 397.063 90.825 397.063C91.014 397.063 91.158 396.919 91.158 396.73C91.158 396.541 91.014 396.397 90.825 396.397C90.636 396.397 90.492 396.541 90.492 396.73ZM94.4444 390.916L92.4464 393.742C92.3474 393.886 92.0594 394.318 92.0594 394.966C92.0594 396.217 92.9684 397.099 94.1834 397.099C95.4344 397.099 96.3254 396.181 96.3254 394.975C96.3254 393.751 95.4254 392.878 94.2374 392.878C93.9674 392.878 93.6974 392.923 93.4184 393.04L94.7504 391.15L94.4444 390.916ZM94.1924 396.739C93.2114 396.739 92.4734 395.992 92.4734 394.984C92.4734 393.985 93.1934 393.238 94.1924 393.238C95.1824 393.238 95.9114 393.958 95.9114 394.984C95.9114 395.974 95.1824 396.739 94.1924 396.739ZM97.7605 397H98.1565V390.997H97.0045L96.8245 391.357H97.7605V397ZM102.34 393.886C103.159 393.454 103.177 392.68 103.177 392.5C103.177 391.591 102.484 390.916 101.584 390.916C100.684 390.916 99.9912 391.591 99.9912 392.5C99.9912 392.68 100.009 393.454 100.828 393.886C100.189 394.129 99.8472 394.75 99.8472 395.407C99.8472 396.451 100.639 397.099 101.584 397.099C102.529 397.099 103.321 396.451 103.321 395.407C103.321 394.75 102.979 394.129 102.34 393.886ZM101.584 393.715C100.945 393.715 100.405 393.211 100.405 392.5C100.405 391.789 100.927 391.276 101.584 391.276C102.241 391.276 102.763 391.789 102.763 392.5C102.763 393.211 102.223 393.715 101.584 393.715ZM101.584 396.739C100.774 396.739 100.261 396.145 100.261 395.407C100.261 394.615 100.81 394.057 101.584 394.057C102.358 394.057 102.907 394.615 102.907 395.407C102.907 396.145 102.394 396.739 101.584 396.739ZM106.515 390.916C106.128 390.916 105.588 391.06 105.102 391.645C104.634 392.203 104.337 393.013 104.337 394.003C104.337 394.993 104.634 395.803 105.102 396.361C105.534 396.874 106.056 397.099 106.515 397.099C106.974 397.099 107.496 396.874 107.928 396.361C108.396 395.803 108.693 394.993 108.693 394.003C108.693 393.013 108.396 392.203 107.928 391.645C107.442 391.06 106.902 390.916 106.515 390.916ZM106.515 396.739C106.308 396.739 105.84 396.676 105.399 396.127C105.012 395.65 104.751 394.957 104.751 394.003C104.751 393.04 105.012 392.356 105.399 391.879C105.615 391.609 105.984 391.276 106.515 391.276C107.046 391.276 107.415 391.609 107.631 391.879C108.018 392.356 108.279 393.04 108.279 394.003C108.279 394.957 108.018 395.65 107.631 396.127C107.19 396.676 106.722 396.739 106.515 396.739ZM109.663 395.542C109.663 395.866 109.762 396.127 109.879 396.316C110.185 396.829 110.779 397.099 111.319 397.099C112.3 397.099 113.083 396.343 113.083 395.335C113.083 394.651 112.705 394.075 112.057 393.868C112.777 393.58 113.002 392.932 113.002 392.419C113.002 391.6 112.426 390.916 111.436 390.916C111.112 390.916 110.689 390.979 110.329 391.348C110.086 391.6 109.897 391.978 109.888 392.428H110.266C110.275 392.131 110.383 391.834 110.572 391.627C110.842 391.321 111.193 391.276 111.436 391.276C112.183 391.276 112.588 391.807 112.588 392.446C112.588 392.842 112.408 393.211 112.147 393.427C112.084 393.481 111.796 393.706 111.337 393.706V394.066C111.625 394.066 111.904 394.12 112.102 394.246C112.417 394.444 112.669 394.831 112.669 395.344C112.669 396.091 112.057 396.739 111.319 396.739C110.923 396.739 110.482 396.505 110.257 396.181C110.14 396.001 110.068 395.776 110.059 395.542H109.663ZM114.251 395.542C114.251 395.866 114.35 396.127 114.467 396.316C114.773 396.829 115.367 397.099 115.907 397.099C116.888 397.099 117.671 396.343 117.671 395.335C117.671 394.651 117.293 394.075 116.645 393.868C117.365 393.58 117.59 392.932 117.59 392.419C117.59 391.6 117.014 390.916 116.024 390.916C115.7 390.916 115.277 390.979 114.917 391.348C114.674 391.6 114.485 391.978 114.476 392.428H114.854C114.863 392.131 114.971 391.834 115.16 391.627C115.43 391.321 115.781 391.276 116.024 391.276C116.771 391.276 117.176 391.807 117.176 392.446C117.176 392.842 116.996 393.211 116.735 393.427C116.672 393.481 116.384 393.706 115.925 393.706V394.066C116.213 394.066 116.492 394.12 116.69 394.246C117.005 394.444 117.257 394.831 117.257 395.344C117.257 396.091 116.645 396.739 115.907 396.739C115.511 396.739 115.07 396.505 114.845 396.181C114.728 396.001 114.656 395.776 114.647 395.542H114.251ZM120.721 397.099L122.719 394.264C122.818 394.12 123.106 393.688 123.106 393.04C123.106 391.807 122.197 390.916 120.982 390.916C119.722 390.916 118.84 391.834 118.84 393.031C118.84 394.255 119.74 395.128 120.928 395.128C121.198 395.128 121.468 395.083 121.747 394.966L120.415 396.865L120.721 397.099ZM120.973 391.276C121.963 391.276 122.692 392.032 122.692 393.022C122.692 394.021 121.972 394.768 120.973 394.768C119.992 394.768 119.254 394.048 119.254 393.022C119.254 392.041 119.983 391.276 120.973 391.276ZM126.651 393.886C127.47 393.454 127.488 392.68 127.488 392.5C127.488 391.591 126.795 390.916 125.895 390.916C124.995 390.916 124.302 391.591 124.302 392.5C124.302 392.68 124.32 393.454 125.139 393.886C124.5 394.129 124.158 394.75 124.158 395.407C124.158 396.451 124.95 397.099 125.895 397.099C126.84 397.099 127.632 396.451 127.632 395.407C127.632 394.75 127.29 394.129 126.651 393.886ZM125.895 393.715C125.256 393.715 124.716 393.211 124.716 392.5C124.716 391.789 125.238 391.276 125.895 391.276C126.552 391.276 127.074 391.789 127.074 392.5C127.074 393.211 126.534 393.715 125.895 393.715ZM125.895 396.739C125.085 396.739 124.572 396.145 124.572 395.407C124.572 394.615 125.121 394.057 125.895 394.057C126.669 394.057 127.218 394.615 127.218 395.407C127.218 396.145 126.705 396.739 125.895 396.739ZM131.581 393.886C132.4 393.454 132.418 392.68 132.418 392.5C132.418 391.591 131.725 390.916 130.825 390.916C129.925 390.916 129.232 391.591 129.232 392.5C129.232 392.68 129.25 393.454 130.069 393.886C129.43 394.129 129.088 394.75 129.088 395.407C129.088 396.451 129.88 397.099 130.825 397.099C131.77 397.099 132.562 396.451 132.562 395.407C132.562 394.75 132.22 394.129 131.581 393.886ZM130.825 393.715C130.186 393.715 129.646 393.211 129.646 392.5C129.646 391.789 130.168 391.276 130.825 391.276C131.482 391.276 132.004 391.789 132.004 392.5C132.004 393.211 131.464 393.715 130.825 393.715ZM130.825 396.739C130.015 396.739 129.502 396.145 129.502 395.407C129.502 394.615 130.051 394.057 130.825 394.057C131.599 394.057 132.148 394.615 132.148 395.407C132.148 396.145 131.635 396.739 130.825 396.739ZM132.917 396.874L133.214 397.099L137.507 390.997H133.16V391.357H136.805L132.917 396.874ZM140.154 390.799L136.527 395.857H139.758V397H140.154V395.857H140.991V395.497H140.154V390.799ZM137.229 395.497L139.758 391.969V395.497H137.229ZM143.573 397.099L145.571 394.264C145.67 394.12 145.958 393.688 145.958 393.04C145.958 391.807 145.049 390.916 143.834 390.916C142.574 390.916 141.692 391.834 141.692 393.031C141.692 394.255 142.592 395.128 143.78 395.128C144.05 395.128 144.32 395.083 144.599 394.966L143.267 396.865L143.573 397.099ZM143.825 391.276C144.815 391.276 145.544 392.032 145.544 393.022C145.544 394.021 144.824 394.768 143.825 394.768C142.844 394.768 142.106 394.048 142.106 393.022C142.106 392.041 142.835 391.276 143.825 391.276ZM149.502 393.886C150.321 393.454 150.339 392.68 150.339 392.5C150.339 391.591 149.646 390.916 148.746 390.916C147.846 390.916 147.153 391.591 147.153 392.5C147.153 392.68 147.171 393.454 147.99 393.886C147.351 394.129 147.009 394.75 147.009 395.407C147.009 396.451 147.801 397.099 148.746 397.099C149.691 397.099 150.483 396.451 150.483 395.407C150.483 394.75 150.141 394.129 149.502 393.886ZM148.746 393.715C148.107 393.715 147.567 393.211 147.567 392.5C147.567 391.789 148.089 391.276 148.746 391.276C149.403 391.276 149.925 391.789 149.925 392.5C149.925 393.211 149.385 393.715 148.746 393.715ZM148.746 396.739C147.936 396.739 147.423 396.145 147.423 395.407C147.423 394.615 147.972 394.057 148.746 394.057C149.52 394.057 150.069 394.615 150.069 395.407C150.069 396.145 149.556 396.739 148.746 396.739ZM153.434 397.099L155.432 394.264C155.531 394.12 155.819 393.688 155.819 393.04C155.819 391.807 154.91 390.916 153.695 390.916C152.435 390.916 151.553 391.834 151.553 393.031C151.553 394.255 152.453 395.128 153.641 395.128C153.911 395.128 154.181 395.083 154.46 394.966L153.128 396.865L153.434 397.099ZM153.686 391.276C154.676 391.276 155.405 392.032 155.405 393.022C155.405 394.021 154.685 394.768 153.686 394.768C152.705 394.768 151.967 394.048 151.967 393.022C151.967 392.041 152.696 391.276 153.686 391.276ZM159.877 390.799L156.25 395.857H159.481V397H159.877V395.857H160.714V395.497H159.877V390.799ZM156.952 395.497L159.481 391.969V395.497H156.952ZM164.294 393.886C165.113 393.454 165.131 392.68 165.131 392.5C165.131 391.591 164.438 390.916 163.538 390.916C162.638 390.916 161.945 391.591 161.945 392.5C161.945 392.68 161.963 393.454 162.782 393.886C162.143 394.129 161.801 394.75 161.801 395.407C161.801 396.451 162.593 397.099 163.538 397.099C164.483 397.099 165.275 396.451 165.275 395.407C165.275 394.75 164.933 394.129 164.294 393.886ZM163.538 393.715C162.899 393.715 162.359 393.211 162.359 392.5C162.359 391.789 162.881 391.276 163.538 391.276C164.195 391.276 164.717 391.789 164.717 392.5C164.717 393.211 164.177 393.715 163.538 393.715ZM163.538 396.739C162.728 396.739 162.215 396.145 162.215 395.407C162.215 394.615 162.764 394.057 163.538 394.057C164.312 394.057 164.861 394.615 164.861 395.407C164.861 396.145 164.348 396.739 163.538 396.739ZM169.738 390.799L166.111 395.857H169.342V397H169.738V395.857H170.575V395.497H169.738V390.799ZM166.813 395.497L169.342 391.969V395.497H166.813ZM174.724 397V396.64H171.862L173.788 394.507C173.959 394.318 174.184 394.048 174.319 393.859C174.553 393.535 174.751 393.139 174.751 392.626C174.751 391.654 174.004 390.916 172.969 390.916C172.321 390.916 171.898 391.168 171.637 391.438C171.367 391.717 171.16 392.158 171.16 392.698H171.556C171.556 392.257 171.727 391.915 171.907 391.717C172.222 391.357 172.618 391.276 172.942 391.276C173.77 391.276 174.337 391.87 174.337 392.626C174.337 393.049 174.157 393.391 173.986 393.652C173.77 393.976 173.536 394.228 173.329 394.462L171.025 397H174.724ZM177.882 390.916C177.495 390.916 176.955 391.06 176.469 391.645C176.001 392.203 175.704 393.013 175.704 394.003C175.704 394.993 176.001 395.803 176.469 396.361C176.901 396.874 177.423 397.099 177.882 397.099C178.341 397.099 178.863 396.874 179.295 396.361C179.763 395.803 180.06 394.993 180.06 394.003C180.06 393.013 179.763 392.203 179.295 391.645C178.809 391.06 178.269 390.916 177.882 390.916ZM177.882 396.739C177.675 396.739 177.207 396.676 176.766 396.127C176.379 395.65 176.118 394.957 176.118 394.003C176.118 393.04 176.379 392.356 176.766 391.879C176.982 391.609 177.351 391.276 177.882 391.276C178.413 391.276 178.782 391.609 178.998 391.879C179.385 392.356 179.646 393.04 179.646 394.003C179.646 394.957 179.385 395.65 178.998 396.127C178.557 396.676 178.089 396.739 177.882 396.739ZM180.923 396.73C180.923 396.919 181.067 397.063 181.256 397.063C181.445 397.063 181.589 396.919 181.589 396.73C181.589 396.541 181.445 396.397 181.256 396.397C181.067 396.397 180.923 396.541 180.923 396.73ZM182.741 396.73C182.741 396.919 182.885 397.063 183.074 397.063C183.263 397.063 183.407 396.919 183.407 396.73C183.407 396.541 183.263 396.397 183.074 396.397C182.885 396.397 182.741 396.541 182.741 396.73ZM184.559 396.73C184.559 396.919 184.703 397.063 184.892 397.063C185.081 397.063 185.225 396.919 185.225 396.73C185.225 396.541 185.081 396.397 184.892 396.397C184.703 396.397 184.559 396.541 184.559 396.73Z"
      fill="#E9DAAC"
    />
    <path
      opacity="0.5"
      className="narative-hero-fadein-last-half"
      d="M456.254 312.099L458.252 309.264C458.351 309.12 458.639 308.688 458.639 308.04C458.639 306.807 457.73 305.916 456.515 305.916C455.255 305.916 454.373 306.834 454.373 308.031C454.373 309.255 455.273 310.128 456.461 310.128C456.731 310.128 457.001 310.083 457.28 309.966L455.948 311.865L456.254 312.099ZM456.506 306.276C457.496 306.276 458.225 307.032 458.225 308.022C458.225 309.021 457.505 309.768 456.506 309.768C455.525 309.768 454.787 309.048 454.787 308.022C454.787 307.041 455.516 306.276 456.506 306.276ZM461.428 305.916C461.041 305.916 460.501 306.06 460.015 306.645C459.547 307.203 459.25 308.013 459.25 309.003C459.25 309.993 459.547 310.803 460.015 311.361C460.447 311.874 460.969 312.099 461.428 312.099C461.887 312.099 462.409 311.874 462.841 311.361C463.309 310.803 463.606 309.993 463.606 309.003C463.606 308.013 463.309 307.203 462.841 306.645C462.355 306.06 461.815 305.916 461.428 305.916ZM461.428 311.739C461.221 311.739 460.753 311.676 460.312 311.127C459.925 310.65 459.664 309.957 459.664 309.003C459.664 308.04 459.925 307.356 460.312 306.879C460.528 306.609 460.897 306.276 461.428 306.276C461.959 306.276 462.328 306.609 462.544 306.879C462.931 307.356 463.192 308.04 463.192 309.003C463.192 309.957 462.931 310.65 462.544 311.127C462.103 311.676 461.635 311.739 461.428 311.739ZM465.459 305.997C465.009 305.997 464.703 306.159 464.505 306.366C464.289 306.591 464.163 306.897 464.163 307.266C464.163 307.662 464.325 307.968 464.523 308.166C464.685 308.328 464.973 308.517 465.423 308.517C465.828 308.517 466.161 308.364 466.368 308.139C466.557 307.941 466.701 307.635 466.701 307.248C466.701 306.933 466.602 306.636 466.359 306.375C466.08 306.078 465.774 305.997 465.459 305.997ZM464.226 309.075V309.381H466.629V309.075H464.226ZM465.423 306.213C465.729 306.213 465.972 306.33 466.134 306.483C466.305 306.645 466.449 306.915 466.449 307.257C466.449 307.635 466.287 307.878 466.125 308.031C465.999 308.148 465.765 308.301 465.414 308.301C465.225 308.301 464.964 308.247 464.73 308.022C464.541 307.833 464.415 307.59 464.415 307.257C464.415 306.969 464.505 306.717 464.712 306.51C464.856 306.366 465.09 306.213 465.423 306.213Z"
      fill="#E9DAAC"
    />
    <path
      opacity="0.5"
      className="narative-hero-fadein-last-half"
      d="M427.882 487.542C427.882 487.866 427.981 488.127 428.098 488.316C428.404 488.829 428.998 489.099 429.538 489.099C430.519 489.099 431.302 488.343 431.302 487.335C431.302 486.651 430.924 486.075 430.276 485.868C430.996 485.58 431.221 484.932 431.221 484.419C431.221 483.6 430.645 482.916 429.655 482.916C429.331 482.916 428.908 482.979 428.548 483.348C428.305 483.6 428.116 483.978 428.107 484.428H428.485C428.494 484.131 428.602 483.834 428.791 483.627C429.061 483.321 429.412 483.276 429.655 483.276C430.402 483.276 430.807 483.807 430.807 484.446C430.807 484.842 430.627 485.211 430.366 485.427C430.303 485.481 430.015 485.706 429.556 485.706V486.066C429.844 486.066 430.123 486.12 430.321 486.246C430.636 486.444 430.888 486.831 430.888 487.344C430.888 488.091 430.276 488.739 429.538 488.739C429.142 488.739 428.701 488.505 428.476 488.181C428.359 488.001 428.287 487.776 428.278 487.542H427.882ZM436.025 482.997H433.73L432.956 485.544C433.217 485.382 433.514 485.283 433.892 485.283C434.891 485.283 435.584 485.994 435.584 487.011C435.584 488.019 434.864 488.739 433.874 488.739C433.271 488.739 432.749 488.46 432.416 487.965L432.065 488.109C432.497 488.856 433.235 489.099 433.865 489.099C435.035 489.099 435.998 488.298 435.998 487.002C435.998 485.805 435.188 484.923 433.91 484.923C433.766 484.923 433.649 484.941 433.505 484.977L434.009 483.357H436.025V482.997ZM438.292 482.997C437.842 482.997 437.536 483.159 437.338 483.366C437.122 483.591 436.996 483.897 436.996 484.266C436.996 484.662 437.158 484.968 437.356 485.166C437.518 485.328 437.806 485.517 438.256 485.517C438.661 485.517 438.994 485.364 439.201 485.139C439.39 484.941 439.534 484.635 439.534 484.248C439.534 483.933 439.435 483.636 439.192 483.375C438.913 483.078 438.607 482.997 438.292 482.997ZM437.059 486.075V486.381H439.462V486.075H437.059ZM438.256 483.213C438.562 483.213 438.805 483.33 438.967 483.483C439.138 483.645 439.282 483.915 439.282 484.257C439.282 484.635 439.12 484.878 438.958 485.031C438.832 485.148 438.598 485.301 438.247 485.301C438.058 485.301 437.797 485.247 437.563 485.022C437.374 484.833 437.248 484.59 437.248 484.257C437.248 483.969 437.338 483.717 437.545 483.51C437.689 483.366 437.923 483.213 438.256 483.213Z"
      fill="#E9DAAC"
    />
    <defs>
      <linearGradient
        id="paint0_linear"
        x1="1.00001"
        y1="-96"
        x2="405.286"
        y2="536.72"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#E9DAAC" />

        <stop offset="0" stopColor="#E9DAAC" stopOpacity="0">
          <animate
            attributeName="offset"
            values="0;1"
            begin="0.4s"
            dur="2.2s"
            fill="freeze"
          />
        </stop>
      </linearGradient>
      <linearGradient
        id="paint1_linear"
        x1="438.782"
        y1="-26.8835"
        x2="283.305"
        y2="241.849"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#E9DAAC">
          <animate
            attributeName="offset"
            begin="0.4s"
            values="0"
            dur="2.2s"
            fill="freeze"
          />
        </stop>
        <stop offset="0" stopColor="#E9DAAC" stopOpacity="0">
          <animate
            attributeName="offset"
            values="0;1"
            begin="0.4s"
            dur="2.2s"
            fill="freeze"
          />
        </stop>
      </linearGradient>
    </defs>
  </svg>
)
