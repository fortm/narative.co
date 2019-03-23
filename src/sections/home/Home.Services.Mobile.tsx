import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import Heading from '@components/Heading'
import Section from '@components/Section'
import HorizontalScroll from '@components/HorizontalScroll'

import { services } from './Home.Services'
import mediaqueries from '@styles/media'

class HomeServicesMobile extends Component {
  element = React.createRef()
  state = { progress: 0 }

  componentDidMount() {
    if (this.element.current) {
      this.element.current.addEventListener('scroll', this.handleScroll)
    }
  }

  componentWillUnmount() {
    if (this.element.current && window !== 'undefined') {
      this.element.current.removeEventListener('scroll', this.handleScroll)
    }
  }

  handleScroll = () => {
    const $el = this.element.current
    const maxOffset = $el.scrollWidth - $el.clientWidth

    const progress = $el.scrollLeft / maxOffset
    this.setState({ progress })
  }

  render() {
    const { progress } = this.state

    const first = progress <= 0.333
    const second = progress >= 0.334 && progress <= 0.666
    const third = progress >= 0.667

    return (
      <Frame>
        <Section narrow>
          <CardHeading>
            Narative helps you <Highlight active={first}>brand</Highlight>,{' '}
            <Highlight active={second}>build</Highlight> and{' '}
            <Highlight active={third}>grow</Highlight>
          </CardHeading>
          <HorizontalScroll
            list={services}
            name="service"
            narrow
            innerRef={this.element}
            render={({ service }) => (
              <Card key={service.heading}>
                <List>
                  {service.list.map(item => (
                    <Item key={item}>{item}</Item>
                  ))}
                </List>
                <CardLink to={service.link.to}>{service.link.text}</CardLink>
                <Image />
              </Card>
            )}
          />
          <Progress>
            <Value progress={progress} />
          </Progress>
        </Section>
      </Frame>
    )
  }
}

export default HomeServicesMobile

const Frame = styled.div`
  padding-top: 110px;
  padding-bottom: 80px;

  ${mediaqueries.desktop_up`
    display: none;
  `}
`

const Card = styled.div`
  min-height: 400px;
  background: #1d2128;
  border-radius: 5px;
  overflow: hidden;
  text-align: center;
`

const CardHeading = styled(Heading.h3)`
  color: ${p => p.theme.colors.grey};
  max-width: 276px;
  margin-bottom: 30px;
`

const Image = styled.div`
  width: calc(100% - 4rem);
  margin: 0 auto;
  height: 300px;
  background: #fafafa;
  opacity: 0.1;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`

const List = styled.ul`
  list-style: none;
  margin: 35px auto 20px;
`

const Item = styled.li`
  font-size: 18px;
  color: #fafafa;
`

const CardLink = styled(Link)`
  display: inline-block;
  font-size: 18px;
  font-weight: 600;
  text-decoration-line: underline;
  color: ${p => p.theme.colors.gold};
  margin-bottom: 15px;
`

const Highlight = styled.span`
  color: ${p => (p.active ? '#fff' : p.theme.colors.grey)};
  transition: color 0.3s ease-in-out;
`

const Progress = styled.div`
  margin-top: 40px;
  position: relative;
  width: 100%;
  height: 2px;
  background: #1d2128;
  overflow: hidden;
`

const Value = styled.div`
  position: absolute;
  left: 0;
  width: 33%;
  height: 2px;
  background: #fff;
  transform: translateX(${p => p.progress * 200}%);
`
