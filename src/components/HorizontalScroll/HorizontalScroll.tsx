import React from 'react'
import styled from 'styled-components'

/**
 * A mobile device focused horistonal scroll component
 *  __________
 * |          |
 * | [ ] [ ] [|
 * |          |
 *
 * Usage:
 * <HorizontalScroll
 *   list={Array}
 *   name="item"
 *   render={(item, index) =>
 *    <div>{item.value}</div>
 *   }
 * />
 *
 * Used to horizontall display content that is scrollable
 * such as images, locations, cards, etc.
 */

interface HorizontalScrollProps {
  list: []
  name: string
  render: () => void
  narrow?: boolean
  innerRef?: React.Ref
}

const HorizontalScroll = ({
  list,
  name,
  render,
  narrow,
  innerRef,
}: HorizontalScrollProps) => (
  <HorizontalScrollContainer narrow={narrow}>
    <HorizontalScrollInner>
      <HorizontalScroller ref={innerRef}>
        {list.map((props, index) => {
          return (
            <HorizontalScrollItem key={index} narrow={narrow}>
              {render({ [name]: props, index })}
            </HorizontalScrollItem>
          )
        })}
      </HorizontalScroller>
    </HorizontalScrollInner>
  </HorizontalScrollContainer>
)

HorizontalScroll.defaultProps = {
  list: [],
  name: 'item',
}

export default HorizontalScroll

const HorizontalScrollContainer = styled.div`
  margin-right: -${p => (p.narrow ? 2 : 4)}rem !important;
  margin-left: -${p => (p.narrow ? 2 : 4)}rem !important;
  overflow-y: hidden !important;
  overflow-x: hidden !important;
  -webkit-overflow-scrolling: touch;
`

const HorizontalScrollInner = styled.div`
  height: 100% !important;
  width: 100% !important;
  overflow-y: hidden !important;
`

const HorizontalScroller = styled.div`
  height: 100% !important;
  overflow-y: auto !important;
  white-space: nowrap !important;
  overflow-x: scroll !important;
  padding-bottom: 3rem !important;
  margin-bottom: -3rem !important;
`

const HorizontalScrollItem = styled.div`
  display: inline-block;
  width: calc(100vw - 6rem);
  margin-right: 0.75rem !important;
  margin-left: 0.75rem !important;

  &:first-child {
    margin-left: ${p => (p.narrow ? 2 : 4)}rem !important;
  }

  &:last-child {
    margin-right: ${p => (p.narrow ? 2 : 4)}rem !important;
  }
`
