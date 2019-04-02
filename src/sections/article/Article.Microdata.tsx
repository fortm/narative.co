import React from 'react'
import { graphql, StaticQuery } from 'gatsby'

import { MicrodataBreadcrumb } from '@components/Media'
import SEO from '@components/SEO'

import { IArticleNode } from '@typings'

const PublicLogoQuery = graphql`
  query ArticlePublicationQuery {
    url: allContentfulHomePage {
      edges {
        node {
          seo {
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

// An SEO bomb we want to keep. This is another standard that's worth setting up.
export default ({ article, location }: { article: IArticleNode }) => (
  <StaticQuery
    query={PublicLogoQuery}
    render={({ url: { edges } }) => (
      <Microdata
        article={article}
        publicationLogo={edges[0].node.seo.image.file.url}
        location={location}
        sectionName={article.title}
        sectionUrl={location.href}
      />
    )}
  />
)

const Microdata = ({
  article: {
    canonical,
    title,
    excerpt,
    author,
    hero,
    postDate,
    backgroundImage,
    readingTime,
    path,
  },
  location,
  publicationLogo,
  sectionName,
  sectionUrl,
}: {
  article: IArticleNode
  location: Location
  publicationLogo: string
  sectionName: string
  sectionUrl: string
}) => {
  let isoDateStr

  try {
    isoDateStr = new Date(postDate!).toISOString()
  } catch (error) {
    // Now all browsers can parse our date string. That's fine. The crawler can
    console.warn(error)
  }

  return (
    <>
      <MicrodataBreadcrumb
        levels={[
          {
            name: sectionName,
            item: sectionUrl,
          },
          { name: title, item: location.href },
        ]}
      />
      <SEO
        title={title}
        description={excerpt}
        image={backgroundImage.seo.src}
        canonical={canonical}
        pathname={path}
        readingTime={readingTime.text}
        published={isoDateStr}
      >
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "Article",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "${location.href}"
            },
            "headline": "${title}",
            "image": "${hero.Article__Hero.src}",
            "datePublished": "${isoDateStr}",
            "dateModified": "${isoDateStr}",
            "author": {
              "@type": "Person",
              "name": "${author ? author.name : 'Hopper Editors'}"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Hopper",
              "logo": {
                "@type": "ImageObject",
                "url": "${location.origin + publicationLogo}"
              }
            },
            "description": "${excerpt}"
          }
        `}
        </script>
      </SEO>
    </>
  )
}
