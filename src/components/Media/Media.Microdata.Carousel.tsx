import React from 'react'

import { Helmet as ReactHelmet } from 'react-helmet'

import { IMicrodataCarousel } from '@typings'

const MicrodataCarousel = ({ urls }: IMicrodataCarousel) => {
  const dataStr = urls.reduce(
    (acc, url, i) =>
      acc +
      `
      {
        "@type": "ListItem",
        "position": ${i + 1},
        "url": "${url}"
      },
  `,
    ''
  )

  return (
    <ReactHelmet>
      <script type="application/ld+json">
        {`{
          "@context":"https://schema.org",
          "@type":"ItemList",
          "itemListElement":[
            ${dataStr}
          ]
        }`}
      </script>
    </ReactHelmet>
  )
}

export default MicrodataCarousel
