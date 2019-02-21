/**
 * This react helmt code is adapted from
 * https://themeteorchef.com/tutorials/reusable-seo-with-react-helmet.
 *
 * A great tutorial explaining how to setup a robust version of an
 * SEO friendly react-helmet instance.
 *
 *
 * Use the Helmt on pages to generate SEO and meta content!
 *
 * Usage:
 * <SEO
 *   title={title}
 *   description={description}
 *   image={image}
 * />
 *
 */

import React from 'react'
import Helmet from 'react-helmet'

interface HelmetProps {
  title: string
  description?: string
  pathname: string
  image?: string
  url?: string
  canonical?: string
  contentType?: string
  published?: string
  updated?: string
  category?: string
  tags?: string
  twitter?: string
}

const seoURL = path => `https://narative.co${path}`

// Twitter requires https to prepend any paths.
const addHttps = path => {
  if (path.substring(0, 5) === 'https') return path
  return `https:${path}`
}

const seoDescription =
  "Narative brings decades of design, marketing and engineering expertise directly to your team. We help you build the products you've always dreamed of, and the ones you're yet to dream up."

const getMetaTags = ({
  title,
  description,
  url,
  image,
  contentType,
  published,
  updated,
  category,
  tags,
  twitter,
  readingTime,
}: HelmetProps) => {
  const metaTags = [
    { charset: 'utf-8' },
    {
      'http-equiv': 'X-UA-Compatible',
      content: 'IE=edge',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'theme-color',
      content: '#000',
    },
    { itemprop: 'name', content: title },
    { itemprop: 'description', content: description },
    { itemprop: 'image', content: addHttps(image) },
    { name: 'description', content: description },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: 'Narative' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:creator', content: twitter || 'Narative' },

    {
      name: 'twitter:image',
      content: addHttps(image),
    },
    { property: 'og:title', content: title },
    { property: 'og:type', content: contentType },
    { property: 'og:url', content: url },
    { property: 'og:image', content: image },
    { property: 'og:description', content: description },
    { property: 'og:site_name', content: 'Narative' },
  ]

  if (published)
    metaTags.push({ name: 'article:published_time', content: published })
  if (updated)
    metaTags.push({ name: 'article:modified_time', content: updated })
  if (category) metaTags.push({ name: 'article:section', content: category })
  if (tags) metaTags.push({ name: 'article:tag', content: tags })

  if (readingTime) {
    metaTags.push({ name: 'twitter:label1', value: 'Reading time' })
    metaTags.push({ name: 'twitter:data1', value: readingTime })
  }

  return metaTags
}

const SEO = ({
  title,
  description = seoDescription,
  pathname,
  canonical,
  image,
  contentType,
  published,
  updated,
  category,
  tags,
  twitter,
  readingTime,
}: HelmetProps) => {
  return (
    <Helmet
      htmlAttributes={{ lang: 'en' }}
      title={title}
      link={[
        {
          rel: 'canonical',
          href: canonical
            ? canonical
            : `https://www.narative.co${pathname ? pathname : '/'}`,
        },
      ]}
      meta={getMetaTags({
        title,
        description,
        contentType,
        url: seoURL(pathname),
        image,
        published,
        updated,
        category,
        tags,
        twitter,
        readingTime,
      })}
    />
  )
}

export default SEO
