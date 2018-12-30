/**
 * Used in componentDidMount to start an animation.
 * This avoids the annoying behaviour of triggering
 * and animation on mount but it not flowing correctly
 * due to fram timing.
 */
export function startAnimation(callback) {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      callback()
    })
  })
}
