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

const HorizontalScroll = ({ list, name, render }) => (
  <HorizontalScrollContainer>
    <HorizontalScrollInner>
      <HorizontalScroller>
        {list.map((props, index) => {
          return (
            <HorizontalScrollItem key={index}>
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
  margin-right: -4rem !important;
  margin-left: -4rem !important;
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
  margin-right: 0.75rem !important;
  margin-left: 0.75rem !important;

  &:first-child {
    margin-left: 4rem !important;
  }

  &:last-child {
    margin-right: 4rem !important;
  }
`
