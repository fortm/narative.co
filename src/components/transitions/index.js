import React from 'react'
import Transition from 'react-transition-group/Transition'

const fadeInDuration = 100

const fadeInDefaultStyle = {
  transition: `all ${fadeInDuration}ms ease-out`,
  opacity: 0,
  transformOrigin: 'top left',
  transform: 'translateY(-1rem) scale(0.96)',
}

const fadeInTransitionStyles = {
  entered: { opacity: 1, transform: 'translateY(-0.5rem) scale(1)' },
  exiting: { opacity: 0 },
}

export const FadeIn = ({ in: inProp, children }) => {
  return (
    <Transition in={inProp} timeout={fadeInDuration}>
      {state => {
        console.log({ state })
        return (
          <div
            style={{
              ...fadeInDefaultStyle,
              ...fadeInTransitionStyles[state],
            }}
          >
            {children}
          </div>
        )
      }}
    </Transition>
  )
}
