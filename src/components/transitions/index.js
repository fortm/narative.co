import React from 'react'
import Transition from 'react-transition-group/Transition'

const fadeInDuration = 200

const fadeInDefaultStyle = {
  transition: `all ${fadeInDuration}ms cubic-bezier(0.175, 0.885, 0.32, 1.275)`,
  opacity: 0,
  transformOrigin: 'top left',
  transform: 'translateY(-2rem) scale(0.96)',
}

const fadeInTransitionStyles = {
  entered: { opacity: 1, transform: 'translateY(0rem) scale(1)' },
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
