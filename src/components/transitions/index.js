import React from 'react'
import Transition from 'react-transition-group/Transition'

const fadeInDuration = 180

const fadeInDefaultStyle = {
  transition: `all ${fadeInDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
  opacity: 0,
  transformOrigin: 'top',
  transform: 'translateY(-3rem) ',
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
