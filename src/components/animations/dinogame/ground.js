import {getCustomProperty, incrementCustomProperty, setCustomProperty} from './helpers.js'

const SPEED = 0.08;

export function setupGround(grounds) {
  const [first, second] = grounds;
  setCustomProperty(first, '--left', 0)
  setCustomProperty(second, '--left', 800)
}

export function updateGround(grounds, delta, speedscale) {
  grounds.forEach((elem) => {
    incrementCustomProperty(elem, '--left', delta * speedscale * SPEED * -1)
    if (getCustomProperty(elem, '--left') <= -800) {
      incrementCustomProperty(elem, '--left', 1600)
    }
  })
}
