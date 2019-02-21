import React, { Fragment } from 'react'
import styled from 'styled-components'
import settings from '../../settings'

import * as SocialIcons from '../../icons/social'
import mediaqueries from '@styles/media'

const SocialLinks = ({ fill = 'white' }: { fill: string }) => (
  <Fragment>
    <SocialIconContainer
      target="_blank"
      rel="noopener"
      href={settings.urls.facebook}
    >
      <SocialIcons.FacebookIcon fill={fill} />
    </SocialIconContainer>
    <SocialIconContainer
      target="_blank"
      rel="noopener"
      href={settings.urls.twitter}
    >
      <SocialIcons.TwitterIcon fill={fill} />
    </SocialIconContainer>
    <SocialIconContainer
      target="_blank"
      rel="noopener"
      href={settings.urls.instagram}
    >
      <SocialIcons.InstagramIcon fill={fill} />
    </SocialIconContainer>
    <SocialIconContainer
      target="_blank"
      rel="noopener"
      href={settings.urls.linkedin}
    >
      <SocialIcons.LinkedinIcon fill={fill} />
    </SocialIconContainer>
  </Fragment>
)

export default SocialLinks

const SocialIconContainer = styled.a`
  margin-left: 3.2rem;
  text-decoration: none;

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }

  ${mediaqueries.tablet`
    margin: 0 2.2rem;
  `};
`
