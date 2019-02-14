import React, { Component, Fragment } from 'react'
import { graphql, navigate } from 'gatsby'
import styled from 'styled-components'

import { media, transitions } from '@styles'
import { Section, Heading, Helmet, Layout } from '@components'
import Footer from '@components/Navigation/Navigation.Footer'
import { startAnimation } from '@utils'

import LabsPreview from '../sections/labs/Labs.Preview'

class IndexPage extends Component {
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
      needlBackground,
      feyBackground,
    } = this.props.data
    const { seo } = allContentfulHomePage.edges[0].node

    const products = [
      {
        cta: '#7A8085',
        logo: NeedlLogo,
        background: needlBackground.childImageSharp.fluid,
        backgroundColor: '#D6D9DE',
        url: '',
        excerpt:
          "Whether you're looking to get inked or you're a tattoo artist yourself, Needl helps you get what you need. Find artists and styles, schedule appointments, book flashes and get paid.",
      },
      {
        cta: '#fff',
        logo: FeyLogo,
        background: feyBackground.childImageSharp.fluid,
        backgroundColor: '#1A1A1A',
        url: 'https://feyapp.com',
        excerpt:
          'Sick of tracking your trades across Evernote, Excel files and countless screenshots? Fey gives you the complete picture of your portfolio, with fast data entry, always-on risk analysis and more.',
      },
    ]

    return (
      <Layout navOffset>
        <Fragment>
          <Helmet
            title={seo.title}
            description={seo.description}
            image={seo.image.file.url}
            pathname={this.props.location.pathname}
          />
          <Section>
            <ContentContainer>
              <div style={{ top: '-60px' }} />
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
              <div />
            </ContentContainer>
            <div />
          </Section>
          <Section>
            {products.map(product => (
              <LabsPreview product={product} />
            ))}
          </Section>
          <Footer />
        </Fragment>
      </Layout>
    )
  }
}

export default IndexPage

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

const TextContainer = styled.div`
  max-width: 570px;
  ${transitions.fadeUp};
`

const MainText = styled.p`
  font-size: 3.2rem;
  font-weight: 400;
  color: ${p => p.theme.colors.grey};
  line-height: 1.3;

  ${media.phablet`
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

  ${media.phablet`
    height: calc(100vh - 160px);
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

const NeedlLogo = () => (
  <svg
    width="70"
    height="23"
    viewBox="0 0 70 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.40897 5.57218H7.56757L13.2128 17.4812H13.2615L14.9405 5.57218H18.7364L16.3275 22.7095H11.3635L5.54793 10.5101H5.49926L3.79595 22.7095H0L2.40897 5.57218Z"
      fill="black"
    />
    <path
      d="M30.8404 20.6763C30.1591 21.4186 29.3398 21.9914 28.3827 22.3949C27.4419 22.7983 26.4929 23 25.5358 23C24.6274 23 23.7919 22.8548 23.0295 22.5643C22.2671 22.2738 21.6263 21.8624 21.1072 21.3298C20.6043 20.7812 20.2312 20.1276 19.9879 19.3692C19.7608 18.6108 19.7121 17.7636 19.8419 16.8276C19.9716 15.8917 20.2555 15.0445 20.6935 14.2861C21.1477 13.5277 21.7074 12.8822 22.3725 12.3497C23.0376 11.801 23.7919 11.3815 24.6355 11.091C25.479 10.8005 26.355 10.6553 27.2634 10.6553C28.107 10.6553 28.8532 10.8005 29.5021 11.091C30.1509 11.3815 30.6782 11.801 31.0837 12.3497C31.4893 12.8822 31.765 13.5277 31.911 14.2861C32.0733 15.0445 32.0895 15.8917 31.9597 16.8276L31.7894 17.9653H23.3215C23.3701 18.6592 23.6054 19.2159 24.0271 19.6355C24.4651 20.0389 25.041 20.2406 25.7548 20.2406C26.355 20.2406 26.8741 20.1115 27.3121 19.8533C27.7663 19.579 28.18 19.232 28.5531 18.8125L30.8404 20.6763ZM28.4801 15.4964C28.5774 14.8832 28.4476 14.3587 28.0908 13.923C27.7339 13.4873 27.2229 13.2695 26.5578 13.2695C26.1522 13.2695 25.7872 13.334 25.4628 13.4631C25.1383 13.5922 24.8545 13.7616 24.6111 13.9714C24.3678 14.1651 24.165 14.399 24.0028 14.6734C23.8406 14.9316 23.727 15.2059 23.6621 15.4964H28.4801Z"
      fill="black"
    />
    <path
      d="M44.8129 20.6763C44.1315 21.4186 43.3123 21.9914 42.3552 22.3949C41.4143 22.7983 40.4654 23 39.5083 23C38.5998 23 37.7644 22.8548 37.002 22.5643C36.2395 22.2738 35.5988 21.8624 35.0797 21.3298C34.5768 20.7812 34.2037 20.1276 33.9603 19.3692C33.7332 18.6108 33.6846 17.7636 33.8143 16.8276C33.9441 15.8917 34.228 15.0445 34.666 14.2861C35.1202 13.5277 35.6799 12.8822 36.345 12.3497C37.0101 11.801 37.7644 11.3815 38.6079 11.091C39.4515 10.8005 40.3275 10.6553 41.2359 10.6553C42.0794 10.6553 42.8257 10.8005 43.4745 11.091C44.1234 11.3815 44.6506 11.801 45.0562 12.3497C45.4617 12.8822 45.7375 13.5277 45.8835 14.2861C46.0457 15.0445 46.062 15.8917 45.9322 16.8276L45.7618 17.9653H37.294C37.3426 18.6592 37.5778 19.2159 37.9996 19.6355C38.4376 20.0389 39.0135 20.2406 39.7273 20.2406C40.3275 20.2406 40.8466 20.1115 41.2846 19.8533C41.7388 19.579 42.1524 19.232 42.5256 18.8125L44.8129 20.6763ZM42.4526 15.4964C42.5499 14.8832 42.4201 14.3587 42.0632 13.923C41.7063 13.4873 41.1954 13.2695 40.5303 13.2695C40.1247 13.2695 39.7597 13.334 39.4353 13.4631C39.1108 13.5922 38.8269 13.7616 38.5836 13.9714C38.3403 14.1651 38.1375 14.399 37.9753 14.6734C37.8131 14.9316 37.6995 15.2059 37.6346 15.4964H42.4526Z"
      fill="black"
    />
    <path
      d="M59.7343 22.7095H56.3764L56.571 21.1604H56.5224C56.3601 21.3702 56.1411 21.588 55.8654 21.8139C55.6058 22.0237 55.3057 22.2174 54.965 22.3949C54.6244 22.5724 54.2513 22.7176 53.8457 22.8306C53.4564 22.9435 53.059 23 52.6534 23C51.7774 23 50.9988 22.8548 50.3174 22.5643C49.6523 22.2577 49.1008 21.8381 48.6628 21.3056C48.2248 20.757 47.9166 20.1115 47.7381 19.3692C47.5759 18.6269 47.5597 17.812 47.6895 16.9245C47.803 16.1015 48.0382 15.3189 48.3951 14.5766C48.752 13.8181 49.1981 13.1484 49.7334 12.5675C50.285 11.9866 50.9177 11.5267 51.6314 11.1878C52.3452 10.8328 53.1238 10.6553 53.9674 10.6553C54.7298 10.6553 55.4274 10.7763 56.06 11.0184C56.6927 11.2443 57.1712 11.6396 57.4957 12.2044H57.5443L59.7343 0H63.3843L59.7343 22.7095ZM57.2037 16.8276C57.3335 15.9401 57.1793 15.222 56.7414 14.6734C56.3034 14.1247 55.622 13.8504 54.6974 13.8504C53.7727 13.8504 53.0184 14.1247 52.4344 14.6734C51.8504 15.222 51.4935 15.9401 51.3638 16.8276C51.234 17.7152 51.38 18.4333 51.8018 18.9819C52.2397 19.5306 52.9211 19.8049 53.8457 19.8049C54.7704 19.8049 55.5247 19.5306 56.1087 18.9819C56.7089 18.4333 57.0739 17.7152 57.2037 16.8276Z"
      fill="black"
    />
    <path d="M66.35 0H70L66.35 22.7095H62.7001L66.35 0Z" fill="black" />
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
