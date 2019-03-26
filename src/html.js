import React from 'react'
import { withPrefix } from 'gatsby'

export default props => (
  <html {...props.htmlAttributes}>
    <head>
      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <link rel="stylesheet" href="https://use.typekit.net/huf6cwu.css" />
      <script src="https://cdnjs.cloudflare.com/ajax/libs/web-animations/2.3.1/web-animations-next.min.js" />
      <script src="https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver" />
      <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.2/TweenLite.min.js" />
      <script src="http://s000.tinyupload.com/?file_id=58422330472888860394" />
      <script src={withPrefix('/scripts/MorphSVGPlugin.min.js')} />
      {props.headComponents}
    </head>
    <body {...props.bodyAttributes}>
      {props.preBodyComponents}
      <div
        key="body"
        id="___gatsby"
        dangerouslySetInnerHTML={{ __html: props.body }}
      />
      {props.postBodyComponents}
    </body>
  </html>
)
