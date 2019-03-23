import React from 'react'
import { graphql } from 'gatsby'

import Layout from '@components/Layout'
import SEO from '@components/SEO'

import HomeHero from '../sections/home/Home.Hero'
import HomeAbout from '../sections/home/Home.About'
import HomeCallToAction from '../sections/home/Home.CallToAction'
import HomeTestimonial from '../sections/home/Home.Testimonial'
import HomeServices from '../sections/home/Home.Services'

function IndexPage({ data, location }) {
  const contentful = data.allContentfulHomePage.edges[0].node

  const navConfig = {
    offset: true,
    fixed: true,
    theme: 'light',
  }

  return (
    <Layout nav={navConfig} location={location}>
      <>
        <SEO
          title={contentful.seo.title}
          description={contentful.seo.description}
          image={contentful.seo.image.file.url}
          pathname={location.pathname}
        />
        <HomeHero />
        <HomeAbout />
        <HomeServices />
        <HomeTestimonial />
        <HomeCallToAction />
      </>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query HomePageQuery {
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
          heading {
            childMarkdownRemark {
              html
            }
          }
          text {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  }
`
