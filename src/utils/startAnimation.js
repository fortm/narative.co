// Used in componentDidMount to start an animation
export function startAnimation(callback) {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      callback()
    })
  })
}
