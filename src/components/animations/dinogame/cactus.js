import {getCustomProperty, incrementCustomProperty, setCustomProperty} from './helpers.js'

const SPEED = 0.08
const CACTUS_MIN_INTERVAL = 1500;
const CACTUS_MAX_INTERVAL = 2000;

let nextCactusTime

export function setupCactus() {
  const cactuses = document.querySelectorAll('.cactus');
  cactuses.forEach(cactus => cactus.remove())
  nextCactusTime = CACTUS_MIN_INTERVAL
}

export function updateCactus(elements, delta, speedScale) {
  const [playground, cactusImg] = elements;
  const cactuses = document.querySelectorAll('.cactus');
  cactuses.forEach(cactus => {
    incrementCustomProperty(cactus, '--left', delta * speedScale * SPEED * -1)
    if (getCustomProperty(cactus, '--left') <= -100) cactus.remove()
  })
  if (nextCactusTime <= 0) {
    createCactus(playground, cactusImg)
    nextCactusTime = randomRange(CACTUS_MIN_INTERVAL, CACTUS_MAX_INTERVAL) / speedScale
  }
  nextCactusTime -= delta;
}

function randomRange(min, max) {
  return Math.floor(Math.random() * (max-min + 1) + min)
}

function createCactus(playground, cactusImg) {
  const cactus = document.createElement('img');
  cactus.src = cactusImg
  cactus.classList.add('cactus');
  setCustomProperty(cactus, '--left', 100)
  playground.append(cactus);
}

export function getCactusRects() {
  return [...document.querySelectorAll('.cactus')]
    .map(cactus => cactus.getBoundingClientRect())
}