import {getCustomProperty, incrementCustomProperty, setCustomProperty} from './helpers.js'

const SPEED = .05;

export function setupGround(elements) {
  const [first, second] = elements;
  setCustomProperty(first, '--left', 0)
  setCustomProperty(second, '--left', 800)
}

export function updateGround(elements, delta, speedscale) {
  elements.forEach((elem) => {
    incrementCustomProperty(elem, '--left', delta * speedscale * SPEED * -1)
    if (getCustomProperty(elem, '--left') <= -800) {
      incrementCustomProperty(elem, '--left', 1600)
    }
  })
}
