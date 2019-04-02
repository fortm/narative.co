import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import Footer from '@components/Navigation/Navigation.Footer'
import Section from '@components/Section'
import SEO from '@components/SEO'
import Layout from '@components/Layout'

import ArticlesHero from '../../sections/articles/Articles.Hero'
import ArticlesGrid from '../../sections/articles/Articles.Grid'
import ArticlesFeatured from '../../sections/articles/Articles.Featured'

/**
 * Narative.co/articles
 *
 * This template is used to present our wonderful articles that we pull
 * from Contentful. This is not located in the /pages folder because we're
 * using it in the createPages lifecycle event
 */

function ArticlesPage({ data, location, pageContext }) {
  const { seo } = data.allContentfulPage.edges[0].node
  const articles = pageContext.group
  const featured = pageContext.additionalContext.featured[0]

  const navConfig = {
    offset: true,
    fixed: true,
    theme: 'light',
  }

  return (
    <Layout nav={navConfig}>
      <>
        <SEO
          title={seo.title}
          description={seo.description}
          image={seo.image.file.url}
          pathname={location.pathname}
        />
        <ArticlesHero />
        <WhiteBackground>
          <Section narrow>
            <ArticlesFeatured article={featured} />
            <ArticlesGrid articles={articles} />
          </Section>
          <Footer mode="light" />
        </WhiteBackground>
      </>
    </Layout>
  )
}

export default ArticlesPage

export const pageQuery = graphql`
  query ArticlesPageQuery {
    allContentfulPage(filter: { pageName: { eq: "Articles" } }) {
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
  }
`

const WhiteBackground = styled.div`
  position: relative;
  background: #fafafa;
`
