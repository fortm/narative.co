import React from 'react'
import styled from 'styled-components'

import mediaqueries from '@styles/media'

const LogoSymbolContainer = styled.div`
  height: 30px;
  width: 23px;

  ${mediaqueries.phablet`
    height: 25px;
    width: 19.09px;
  `};
`
/**
 * An inline SVG for Narative Logo with aria labels
 *
 * @param {String} fill dark or light
 */
const Logo = ({
  fill = '#fff',
  onlySymbol = false,
}: {
  fill?: string
  onlySymbol?: boolean
}) => {
  if (onlySymbol) {
    return (
      <LogoSymbolContainer>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 23 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 30H22.9091V26.4595H0V30Z"
            fill={fill}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.00598145 24.7176L7.01982 19.7873L7.01897 15.2965L0.00598145 10.3745V24.7176Z"
            fill={fill}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M22.8917 0L15.8492 4.87412V9.29375L22.894 14.2569L22.8918 0H22.8917Z"
            fill={fill}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.0065918 0V8.62637L22.8961 24.7297L22.8948 16.0316L0.0065918 0Z"
            fill={fill}
          />
        </svg>
      </LogoSymbolContainer>
    )
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1601 282">
      <title>Narative Logo</title>
      <g fill={fill} fillRule="evenodd">
        <path d="M0 281.128h215.048V247.95H0zM.057 231.627l65.839-46.202-.008-42.082L.057 97.22zM214.885 0l-66.108 45.675v41.416l66.13 46.51-.02-133.6zM913.339 52.205h58.12V230.03h58.949V52.205h58.12V2.003h-175.19zM320.332 2.002L234.014 230.03h62.858l55.641-160.588 26.467 75.91h-37.375l-15.738 45.06h68.753l13.535 39.618h62.858L384.695 2.002zM771.967 2.002L685.649 230.03h62.858l55.64-160.588 26.467 75.91H793.24l-15.738 45.06h68.752l13.535 39.618h62.859L836.328 2.002zM1273.245 2.002h-64.063l82.332 196.952 29.457-75.926zM1596.813 137.942V92.88h-51.569l-.16 45.062z" />
        <path d="M1471.695 2.003V230.03h129.027v-50.203h-70.078V52.205h70.078V2.003zM1124.339 52.308l58.949-.02V2.002h-58.95zM1124.339 230.03h58.949V67.012l-58.95-.187zM1382.343 2.004l-88.095 228.12 58.924-.093 95.644-228.027zM.057 0v80.837L214.92 231.74l-.012-81.509zM683.288 230.398l-71.42-93.434c16.274-3.827 28.576-11.136 36.915-21.922 8.334-10.782 12.506-24.842 12.506-42.181 0-9.677-1.559-18.748-4.671-27.214-3.116-8.467-7.735-15.922-13.861-22.376a57.454 57.454 0 0 0-7.979-6.951c-4.638-3.45-9.934-6.36-15.897-8.723-9.429-3.728-20.452-5.594-33.084-5.594h-91.733V230.03h58.95v-87.703l.004.008-.023-71.87.019.03V47.669h11.128c11.625 0 20.55 2.419 26.766 7.258 6.213 4.839 9.324 11.795 9.324 20.868 0 9.073-3.111 16.028-9.324 20.867-5.582 4.345-13.369 6.722-23.315 7.166l-.194 60.933 41.856 65.27h.267l.237.368h73.529z" />
      </g>
    </svg>
  )
}

export default Logo
