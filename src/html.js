import React, { Component } from 'react'

class HTML extends Component {
  render() {
    return (
      <html {...this.props.htmlAttributes}>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <link rel="stylesheet" href="https://use.typekit.net/huf6cwu.css" />
          <script src="https://cdnjs.cloudflare.com/ajax/libs/web-animations/2.3.1/web-animations-next.min.js" />
          <script src="https://polyfill.io/v2/polyfill.min.js?features=IntersectionObserver" />

          {this.props.headComponents}
        </head>
        <body {...this.props.bodyAttributes}>
          {this.props.preBodyComponents}
          <div
            key={`body`}
            id="___gatsby"
            style={{ overflowX: 'hidden' }}
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}
        </body>
      </html>
    )
  }
}

export default HTML
