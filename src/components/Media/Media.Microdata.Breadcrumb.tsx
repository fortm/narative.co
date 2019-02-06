import React from 'react'

import { Helmet as ReactHelmet } from 'react-helmet'

import { IMicrodataBreadcrumb } from '@typings'

const MicrodataBreadcrumb = ({ levels }: IMicrodataBreadcrumb) => {
  const dataStr = levels.reduce(
    (acc, { name, item }, i) =>
      acc +
      `
      {
        "@type": "ListItem",
        "position": ${i + 1},
        "name": "${name}",
        "item": "${item}"
      },
  `,
    ''
  )

  return (
    <ReactHelmet>
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [${dataStr}]
          }`}
      </script>
    </ReactHelmet>
  )
}

export default MicrodataBreadcrumb
