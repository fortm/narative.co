import React, { Component } from 'react'
import styled from 'styled-components'
import { detectMobile } from '@utils'

const StyledVideo = styled.video`
  height: 100%;
`

class Video extends Component {
  state = {
    isMobile: false,
  }

  componentDidMount() {
    const isMobile = detectMobile()
    const { dataset } = this.video

    this.setState({ isMobile })

    // Always load the poster image
    this.video.poster = dataset.poster

    // If it's not mobile, attach the video to the source objects
    if (!isMobile) {
      this.webm.src = dataset.webmSrc
      this.mp4.src = dataset.mp4Src
    }

    // Once it's complete, load the video!
    this.video.load()
  }

  render() {
    const { label, webm, mp4, poster } = this.props

    return (
      <StyledVideo
        data-webm-src={webm}
        data-mp4-src={mp4}
        data-poster={poster}
        aria-label={label}
        autoPlay="autoplay"
        canPlay="false"
        muted="muted"
        role="img"
        volume="0"
        playsinline
        innerRef={video => (this.video = video)}
      >
        <source type="video/webm" ref={webm => (this.webm = webm)} />
        <source type="video/mp4" ref={mp4 => (this.mp4 = mp4)} />
      </StyledVideo>
    )
  }
}

export default Video
