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
 * <Helmet
 *   title={title}
 *   description={description}
 *   image={image}
 * />
 *
 */

import React from 'react'
import { Helmet as ReactHelmt } from 'react-helmet'

const seoURL = path => `https://narative.co${path}`
const seoDescription =
  "Narative brings decades of design, engineering and marketing expertise directly to your team, so you can build the products you've always dreamed of — and the ones you're yet to dream up."

const getMetaTags = ({
  title,
  description,
  url,
  image = '/public/static/imgs/brand/narative-hero-metadata.jpg',
  contentType,
  published,
  updated,
  category,
  tags,
  twitter,
}) => {
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
    { itemprop: 'image', content: seoURL(image) },
    { name: 'description', content: description },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: 'Narative' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:creator', content: twitter || 'Narative' },
    {
      name: 'twitter:image',
      content: seoURL(image),
    },
    { property: 'og:title', content: title },
    { property: 'og:type', content: contentType },
    { property: 'og:url', content: url },
    { property: 'og:image', content: seoURL(image) },
    { property: 'og:description', content: description },
    { property: 'og:site_name', content: 'Narative' },
  ]

  if (published)
    metaTags.push({ name: 'article:published_time', content: published })
  if (updated)
    metaTags.push({ name: 'article:modified_time', content: updated })
  if (category) metaTags.push({ name: 'article:section', content: category })
  if (tags) metaTags.push({ name: 'article:tag', content: tags })

  return metaTags
}

const Helmet = ({
  title,
  description = seoDescription,
  pathname,
  image,
  contentType,
  published,
  updated,
  category,
  tags,
  twitter,
}) => {
  return (
    <ReactHelmt
      htmlAttributes={{ lang: 'en' }}
      title={title}
      link={[
        {
          rel: 'canonical',
          href: `https://www.narative.co${pathname ? pathname : '/'}`,
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
      })}
    />
  )
}

export default Helmet
