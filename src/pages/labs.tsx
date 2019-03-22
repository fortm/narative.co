import React, { Component, Fragment } from 'react'
import { graphql, navigate } from 'gatsby'
import styled from 'styled-components'

import { Section, Heading, SEO, Layout } from '@components'
import Footer from '@components/Navigation/Navigation.Footer'
import Media from '@components/Media/Media.Img'
import ScrollIndicator from '@components/ScrollIndicator'

import { startAnimation } from '@utils'
import mediaqueries from '@styles/media'
import transitions from '@styles/transitions'

import LabsPreview from '../sections/labs/Labs.Preview'

class LabsPage extends Component<{}, { animate: string }> {
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
    const {
      allContentfulHomePage,
      hero,
      needlBackground,
      feyBackground,
    } = this.props.data
    const { seo } = allContentfulHomePage.edges[0].node
    const pageBackground = 'linear-gradient(180deg, #08080b 50%, #191D23 100%)'

    const navConfig = {
      fixed: false,
      theme: 'light',
      offset: true,
    }

    /**
     * This labs page is a bit of limbo in terms of pulling data from Contentful
     * and locally. Therefore, we're constructing the products array within the component
     * itself in a ...not so clean way :). It works for now!
     */
    const products = [
      {
        logo: FeyLogo,
        background: feyBackground.childImageSharp.fluid,
        backgroundColor: '#1A1A1A',
        excerpt:
          'Sick of tracking your trades across Evernote, Excel files and countless screenshots? Fey gives you the complete picture of your portfolio, with fast data entry, always-on risk analysis and more.',
        children: (
          <>
            <HorizontalRule />
            <div>
              <LinkToProduct to="https://feyapp.com">
                <GlobeIcon />
                Read more
              </LinkToProduct>
              <LinkToProduct to="https://narative.co/design/open/fey">
                <FigmaIcon /> View in Figma
              </LinkToProduct>
            </div>
          </>
        ),
      },
      {
        logo: NeedlLogo,
        background: needlBackground.childImageSharp.fluid,
        backgroundColor: '#D6D9DE',
        excerpt:
          "Whether you're looking to get inked or you're a tattoo artist yourself, this upcoming app will help you get what you need. Find artists and styles, schedule appointments, book flashes and get paid.",
        children: (
          <>
            <HorizontalRule dark />
            <LinkToProduct dark as="div">
              Coming: when it’s ready
            </LinkToProduct>
          </>
        ),
      },
    ]

    return (
      <Layout nav={navConfig} background={pageBackground}>
        <Fragment>
          <SEO
            title={seo.title}
            description={seo.description}
            image={seo.image.file.url}
            pathname={this.props.location.pathname}
          />
          <HeroSection>
            <ContentContainer>
              <div />
              <TextContainer animation={animation}>
                <HeaderPill>Labs</HeaderPill>
                <Heading.h1>
                  Whether with our clients or all by ourselves, we're always
                  busy building something new.
                </Heading.h1>
                <MainText>
                  Take a peek at the products we're creating in-house at
                  Narative.
                </MainText>
              </TextContainer>
              <MobileOnly>
                <ScrollIndicator />
              </MobileOnly>
            </ContentContainer>

            <HeroImage>
              <Media critical src={hero.childImageSharp.fluid} />
            </HeroImage>
          </HeroSection>
          <Section narrow>
            {products.map(product => (
              <LabsPreview key={product.excerpt} product={product} />
            ))}
          </Section>
          <Footer />
        </Fragment>
      </Layout>
    )
  }
}

export default LabsPage

export const pageQuery = graphql`
  query LabsPageQuery {
    allContentfulHomePage {
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
        }
      }
    }
    hero: file(name: { regex: "/labs-hero-phone/" }) {
      childImageSharp {
        fluid(maxWidth: 1060, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    needlBackground: file(name: { regex: "/needl-labs/" }) {
      childImageSharp {
        fluid(maxWidth: 1140, maxHeight: 380, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    feyBackground: file(name: { regex: "/fey-labs/" }) {
      childImageSharp {
        fluid(maxWidth: 1140, maxHeight: 380, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
  }
`

const MobileOnly = styled.div`
  ${mediaqueries.desktop_up`
    opacity: 0;
  `}
`

const HeroSection = styled(Section)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const HeroImage = styled.div`
  position: relative;
  width: 610px;
  top: -60px;
  right: -10px;
  animation: float 4.8s ease-in-out infinite 1.4s;

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

  ${mediaqueries.phablet`
    width: 100%;
    top: 0;
    right: 0;
    margin-bottom: 60px;
  `};
`

const TextContainer = styled.div`
  max-width: 560px;
  ${transitions.fadeUp};

  ${mediaqueries.phablet`
    position: relative;
    top: -50px;
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

const ContentContainer = styled.div`
  height: calc(100vh - 140px);
  min-height: 440px;
  padding: 0 0 100px;

  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${mediaqueries.phablet`
    height: calc(100vh - 90px);
    padding: 0;
  `};
`

const HeaderPill = styled.div`
  color: ${p => p.theme.colors.grey};
  border: 1px solid ${p => p.theme.colors.grey};
  border-radius: 3px;
  padding: 0.1rem 1.2rem;
  margin-bottom: 1.5rem;
  display: inline-block;
  font-weight: 500;
  min-width: 100px;
  text-align: center;
`

const HorizontalRule = styled.hr`
  width: 140px;
  height: 1px;
  border: none;
  margin-bottom: 30px;
  background: ${p => (p.dark ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255,255,255,0.1)')};

  ${mediaqueries.phablet`
    width: 100%;
    margin: 0 auto 25px;
    background: ${p =>
      p.dark ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255,255,255,0.1)'};
  `}
`

const LinkToProduct = styled.a`
  font-weight: 600;
  font-size: 16px;
  color: ${p => (p.dark ? p.theme.colors.grey : '#fff')};

  svg {
    margin-right: 13px;
  }

  &:nth-child(2) {
    margin-left: 30px;
  }

  ${mediaqueries.tablet`
    display: block;
    margin: 0 auto;
    color: ${p => (p.dark ? '#000' : '#fff')};

    &:nth-child(2) {
      margin: 15px auto 0;
    }

      svg {
        display: none;
      }
  `}
`

const NeedlLogo = () => (
  <svg
    width="161"
    height="23"
    viewBox="0 0 161 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.096 11.592H8.376C12.984 11.592 14.304 9.048 14.304 6.408C14.304 2.928 12.12 1.32 8.328 1.32H0.696V2.472C1.944 2.496 2.328 2.832 2.328 4.2V15.192C2.328 16.56 1.944 16.896 0.696 16.896V18H8.136V16.896C6.504 16.896 6.096 16.536 6.096 15.168V11.592ZM10.296 6.456C10.296 9.048 9.6 9.816 7.704 9.816H6.096V3.024H7.512C9.6 3.024 10.296 3.936 10.296 6.456ZM20.7566 8.544C20.7086 6.96 20.1806 5.784 20.0126 5.472H19.6526L15.7886 6.432V7.488C16.9886 7.536 17.2286 7.776 17.2286 9.528V15.24C17.2286 16.608 16.9646 16.896 15.7646 16.92V18H22.7006V16.92C21.0686 16.896 20.8046 16.608 20.8046 15.24V11.496C20.8046 9.624 21.2846 9.048 23.1086 9.048C23.6846 9.048 23.9966 9.12 24.4286 9.24L25.1006 5.616C24.9086 5.544 24.5726 5.472 24.2126 5.472C22.8926 5.472 21.3566 6.48 20.7566 8.544ZM37.9461 11.712C37.9461 7.512 35.4501 5.472 31.9701 5.472C28.1541 5.472 25.7541 8.04 25.7541 11.928C25.7541 15.96 28.0101 18.312 31.7781 18.312C35.1141 18.312 37.9461 16.272 37.9461 11.712ZM34.0341 11.616C34.0341 15.312 33.3141 16.824 31.8981 16.824C30.1701 16.824 29.6661 15.336 29.6661 11.976C29.6661 8.184 30.3381 7.008 31.8501 7.008C33.2901 7.008 34.0341 8.136 34.0341 11.616ZM40.8531 17.616C40.8531 20.088 40.3971 21.216 38.9331 21.888L39.6291 22.944C41.8371 22.416 44.4051 21.192 44.4051 17.616V5.592H43.8771L39.3891 6.432V7.488C40.5891 7.536 40.8531 7.776 40.8531 9.528V17.616ZM44.6211 2.4C44.6211 1.248 43.7091 0.311999 42.5331 0.311999C41.3331 0.311999 40.3491 1.248 40.3491 2.4C40.3491 3.576 41.3091 4.512 42.4611 4.512C43.6611 4.512 44.6211 3.576 44.6211 2.4ZM53.5076 16.224C51.2036 16.224 50.2916 15.12 50.1956 12.408H57.4916V11.376C57.4916 7.704 55.9556 5.472 52.1876 5.472C48.7076 5.472 46.3556 7.8 46.3556 11.856C46.3556 15.936 48.5396 18.288 52.2596 18.288C54.3956 18.288 55.9796 17.64 57.2756 16.368L56.6996 15.384C55.6676 15.936 54.5156 16.224 53.5076 16.224ZM52.2116 6.96C53.4596 6.96 53.9396 7.872 53.9396 10.776H50.2196C50.3876 7.848 50.9876 6.96 52.2116 6.96ZM69.1628 6.456C68.3228 5.904 67.1228 5.496 65.2268 5.496C61.8908 5.496 59.0588 7.776 59.0588 12.096C59.0588 16.296 61.6988 18.288 64.9148 18.288C66.7388 18.288 68.3708 17.64 69.4748 16.344L68.8268 15.432C67.8188 16.032 67.1228 16.296 65.9948 16.296C64.1948 16.296 62.7548 15.144 62.7548 11.544C62.7548 7.872 64.0988 6.984 65.2268 6.984C66.2108 6.984 66.4028 7.608 66.4988 9.096H69.1628V6.456ZM78.381 5.784H75.477C75.477 4.56 75.573 3.12 75.693 2.256L73.197 2.568C72.597 3.48 72.237 4.656 72.093 5.736L70.485 6.384V7.608H71.925V14.856C71.925 17.496 73.149 18.312 75.333 18.312C76.653 18.312 77.685 18.024 78.597 17.448L78.237 16.2C77.685 16.416 77.301 16.488 76.869 16.488C75.669 16.488 75.501 15.84 75.501 14.064V7.608H77.997L78.381 5.784ZM96.9332 8.856C96.9332 10.248 97.0772 11.88 97.1492 12.432H97.0292C96.7652 11.736 96.1892 10.488 95.4452 9.312L90.3572 1.32H84.8132V2.472C86.0612 2.496 86.4452 2.832 86.4452 4.2V15.192C86.4452 16.56 86.0612 16.896 84.8132 16.896V18H90.1652V16.896C88.8932 16.896 88.5092 16.56 88.5092 15.192V8.976C88.5092 7.44 88.3652 5.856 88.2932 5.304H88.3892C88.6292 5.832 89.2532 7.128 90.3812 8.88L96.2612 18H98.9492V4.2C98.9492 2.832 99.3092 2.496 100.557 2.472V1.32H95.2772V2.472C96.5492 2.496 96.9332 2.832 96.9332 4.2V8.856ZM108.89 16.224C106.586 16.224 105.674 15.12 105.578 12.408H112.874V11.376C112.874 7.704 111.338 5.472 107.57 5.472C104.09 5.472 101.738 7.8 101.738 11.856C101.738 15.936 103.922 18.288 107.642 18.288C109.778 18.288 111.362 17.64 112.658 16.368L112.082 15.384C111.05 15.936 109.898 16.224 108.89 16.224ZM107.594 6.96C108.842 6.96 109.322 7.872 109.322 10.776H105.602C105.77 7.848 106.37 6.96 107.594 6.96ZM121.594 16.224C119.29 16.224 118.378 15.12 118.282 12.408H125.578V11.376C125.578 7.704 124.042 5.472 120.274 5.472C116.794 5.472 114.442 7.8 114.442 11.856C114.442 15.936 116.626 18.288 120.346 18.288C122.482 18.288 124.066 17.64 125.362 16.368L124.786 15.384C123.754 15.936 122.602 16.224 121.594 16.224ZM120.298 6.96C121.546 6.96 122.026 7.872 122.026 10.776H118.306C118.474 7.848 119.074 6.96 120.298 6.96ZM135.689 16.368C135.761 17.376 136.169 18.12 136.337 18.312H136.697L140.585 17.448V16.464C139.313 16.368 139.049 16.176 139.049 14.424V0.383999H138.425L133.961 1.032V2.088C135.137 2.136 135.497 2.376 135.497 4.128V6.672C134.897 5.928 133.841 5.496 132.641 5.496C129.497 5.496 127.145 7.464 127.145 11.976C127.145 16.368 129.161 18.288 131.969 18.288C133.601 18.288 135.017 17.496 135.689 16.368ZM131.033 11.712C131.033 8.352 131.993 7.512 133.433 7.512C134.201 7.512 134.945 7.752 135.497 8.4V15.072C134.825 15.744 134.081 16.08 133.289 16.08C131.849 16.08 131.033 15.096 131.033 11.712ZM146.521 2.76C146.521 1.32 146.209 0.623999 146.089 0.383999H145.729L141.385 1.032V2.088C142.609 2.136 142.969 2.376 142.969 4.128V15.24C142.969 16.608 142.705 16.896 141.481 16.92V18H148.009V16.92C146.761 16.896 146.521 16.584 146.521 15.216V2.76ZM156.445 16.224C154.141 16.224 153.229 15.12 153.133 12.408H160.429V11.376C160.429 7.704 158.893 5.472 155.125 5.472C151.645 5.472 149.293 7.8 149.293 11.856C149.293 15.936 151.477 18.288 155.197 18.288C157.333 18.288 158.917 17.64 160.213 16.368L159.637 15.384C158.605 15.936 157.453 16.224 156.445 16.224ZM155.149 6.96C156.397 6.96 156.877 7.872 156.877 10.776H153.157C153.325 7.848 153.925 6.96 155.149 6.96Z"
      fill="black"
    />
  </svg>
)

const FeyLogo = () => (
  <svg
    width="69"
    height="26"
    viewBox="0 0 69 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M59.8015 15.4941L54 6H58.1844L61.5 12.2293L64.8384 6H69L63.2017 15.4941V20.8128C63.2009 21.1274 63.0799 21.4289 62.8653 21.6513C62.6507 21.8737 62.3599 21.9991 62.0564 22H59.8015V15.4941Z"
      fill="white"
    />
    <path
      d="M41.161 6.00002H51V8.06922C51 8.38434 50.8784 8.68656 50.6619 8.90939C50.4454 9.13222 50.1517 9.2574 49.8456 9.2574H43.4338V12.2414H48.6157V14.3106C48.6148 14.6254 48.4929 14.9271 48.2766 15.1497C48.0603 15.3724 47.7672 15.4979 47.4612 15.4987H43.4338V18.746H50.9934V20.8118C50.9939 20.968 50.9643 21.1227 50.9064 21.267C50.8486 21.4114 50.7636 21.5426 50.6563 21.653C50.549 21.7634 50.4216 21.8509 50.2813 21.9105C50.141 21.97 49.9907 22.0004 49.839 22H40V7.1882C40 7.0316 40.0301 6.87654 40.0885 6.73194C40.1469 6.58734 40.2325 6.45606 40.3404 6.34563C40.4483 6.23521 40.5764 6.14783 40.7172 6.08852C40.858 6.02921 41.0088 5.99913 41.161 6.00002Z"
      fill="white"
    />
    <path
      d="M28.2742 22H26V7.18744C26 6.87251 26.1217 6.57048 26.3383 6.34779C26.555 6.1251 26.8488 6 27.1551 6H37V8.06789C36.9991 8.38254 36.8772 8.68406 36.6607 8.90655C36.4443 9.12904 36.151 9.25443 35.8449 9.25532H29.4195V12.2374H34.634V14.3053C34.634 14.6202 34.5122 14.9222 34.2956 15.1449C34.079 15.3676 33.7852 15.4927 33.4788 15.4927H29.4195V20.8159C29.4195 21.1288 29.299 21.429 29.0844 21.6508C28.8698 21.8727 28.5785 21.9982 28.2742 22Z"
      fill="white"
    />
    <path
      d="M12.3557 21.3519C12.5597 21.5565 12.7218 21.8006 12.8324 22.0701C12.943 22.3395 13 22.6289 13 22.9211C13 23.2134 12.943 23.5028 12.8324 23.7722C12.7218 24.0417 12.5597 24.2858 12.3557 24.4904L10.8777 26L9.37507 24.459C8.55033 23.6131 8.06222 22.4836 8.00555 21.29C7.94888 20.0964 8.3277 18.9238 9.06842 18L12.3557 21.3519Z"
      fill="white"
    />
    <path
      d="M12.3612 9.60037C12.7703 10.0148 13 10.5764 13 11.162C13 11.7476 12.7703 12.3093 12.3612 12.7237L8.53364 16.5955C7.98718 17.1448 7.55408 17.7985 7.25948 18.5186C6.96489 19.2386 6.81469 20.0108 6.8176 20.79C6.81853 21.1966 6.86021 21.602 6.942 22L5.43328 20.4319C4.51549 19.5021 4 18.2418 4 16.9279C4 15.6139 4.51549 14.3536 5.43328 13.4238L10.7983 8L12.3612 9.60037Z"
      fill="white"
    />
    <path
      d="M12.3504 1.6047C12.7663 2.02399 13 2.59237 13 3.18499C13 3.77761 12.7663 4.34599 12.3504 4.76528L4.63302 12.5447C3.93442 13.247 3.42076 14.1137 3.13851 15.0662C2.85626 16.0187 2.81432 17.0271 3.01649 18L1.45492 16.4246C0.993711 15.9611 0.627808 15.4106 0.378155 14.8046C0.128502 14.1986 0 13.549 0 12.8929C0 12.2369 0.128502 11.5873 0.378155 10.9813C0.627808 10.3753 0.993711 9.82477 1.45492 9.3613L10.7532 0L12.3504 1.6047Z"
      fill="white"
    />
  </svg>
)

const GlobeIcon = () => (
  <svg
    width="19"
    height="14"
    viewBox="0 0 19 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.20896 13.9999C7.34271 14.0075 5.54559 13.2942 4.19251 12.0089C3.99106 11.8171 3.90719 11.5325 3.97251 11.2622C4.03782 10.9919 4.24239 10.7769 4.50915 10.6983C4.77591 10.6197 5.06434 10.6894 5.26579 10.8811C6.33096 11.8879 7.74335 12.445 9.20896 12.4366C9.75609 12.4375 10.3006 12.3616 10.8267 12.2111C11.2297 12.1183 11.6349 12.3572 11.7488 12.7548C11.8627 13.1524 11.6455 13.5697 11.2544 13.7043C10.5898 13.898 9.90125 13.9975 9.20896 13.9999ZM16.3176 8.00353C16.3654 7.67126 16.3888 7.33593 16.3876 7.00024C16.3321 3.08455 13.117 -0.0470396 9.20122 0.000534954C6.45785 -0.00568609 3.94655 1.53903 2.71483 3.99037C2.52583 4.37695 2.68601 4.84355 3.07259 5.03254C3.45918 5.22154 3.92578 5.06136 4.11477 4.67478C5.08411 2.75804 7.05334 1.55361 9.20122 1.5638C12.258 1.51614 14.7767 3.95138 14.8321 7.00802C14.8331 7.26825 14.8149 7.5282 14.7777 7.78576C14.7464 7.99001 14.7978 8.19829 14.9203 8.36463C15.0429 8.53097 15.2266 8.6417 15.431 8.67239H15.5632C15.9535 8.67623 16.2863 8.39008 16.3409 8.00353H16.3176ZM18.5887 9.07689C18.6387 8.88411 18.6545 8.68405 18.6354 8.48581C18.5826 8.06792 18.2068 7.76795 17.7876 7.80917C17.3762 7.86566 17.0817 8.23547 17.1188 8.64913C16.9632 9.23244 13.9456 9.92464 8.81246 8.64913C4.92374 7.66918 2.26385 6.11369 1.65721 5.07929C1.5883 4.98755 1.55264 4.8751 1.5561 4.76041C1.65121 4.35218 1.4057 3.94202 1.00097 3.83297C0.596247 3.72393 0.177909 3.95523 0.0550537 4.35598C-0.0711348 4.8728 0.021739 5.41878 0.311709 5.86481C1.25278 7.45919 4.43376 9.14689 8.42359 10.1502C10.2864 10.6343 12.2001 10.8954 14.1245 10.9279C16.4266 10.9824 18.2387 10.4224 18.5965 9.07689H18.5887Z"
      fill="white"
    />
  </svg>
)

const FigmaIcon = () => (
  <svg
    width="12"
    height="16"
    viewBox="0 0 12 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.5172 3.07248C1.5172 2.04865 2.34845 1.2174 3.37228 1.2174H5.22737V4.92756H3.37228C2.34845 4.92756 1.5172 4.09631 1.5172 3.07248ZM3.37228 0C1.6761 0 0.299805 1.3763 0.299805 3.07248C0.299805 4.08075 0.78612 4.97598 1.53686 5.53629C0.78612 6.0966 0.299805 6.99184 0.299805 8.00011C0.299805 9.00831 0.78606 9.9035 1.53672 10.4638C0.78606 11.0241 0.299805 11.9193 0.299805 12.9275C0.299805 14.6237 1.6761 16 3.37228 16C5.06846 16 6.44476 14.6237 6.44476 12.9275V11.0726V10.4639V10.4637V10.4489C6.96038 10.8403 7.60325 11.0726 8.30012 11.0726C9.99631 11.0726 11.3726 9.69629 11.3726 8.00011C11.3726 6.99184 10.8863 6.09661 10.1355 5.5363C10.8863 4.97598 11.3726 4.08075 11.3726 3.07248C11.3726 1.3763 9.99631 0 8.30012 0H6.44476H5.83634H5.83606H5.22764H3.37228ZM3.37228 6.14502C2.34845 6.14502 1.5172 6.97627 1.5172 8.00011C1.5172 9.0177 2.33834 9.84504 3.35357 9.8551L3.37228 9.85504H5.22736V6.14502H3.37228ZM1.5172 12.9275C1.5172 11.9099 2.33834 11.0826 3.35357 11.0725L3.37228 11.0726H5.22736V12.9275C5.22736 13.9514 4.39611 14.7826 3.37228 14.7826C2.34845 14.7826 1.5172 13.9514 1.5172 12.9275ZM6.44504 4.92756H8.30012C9.32396 4.92756 10.1552 4.09631 10.1552 3.07248C10.1552 2.04865 9.32396 1.2174 8.30012 1.2174H6.44504V4.92756ZM6.44504 8.00011C6.44504 6.97627 7.27629 6.14502 8.30012 6.14502C9.32396 6.14502 10.1552 6.97627 10.1552 8.00011C10.1552 9.02394 9.32396 9.85519 8.30012 9.85519C7.27629 9.85519 6.44504 9.02394 6.44504 8.00011Z"
      fill="white"
    />
  </svg>
)
