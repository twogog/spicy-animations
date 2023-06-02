import {getCustomProperty, incrementCustomProperty, setCustomProperty} from './helpers.js'

const FRAME_TIME = 100;
const DINO_FRAME_COUNT = 2;
const GRAVITY = 0.002;
const JUMP_SPEED = 0.45;
const isPhone = /android|iphone/i.test(navigator.userAgent)

let isJumping
let currentFrameTime
let dinoFrame
let yVelocity

export function updateDino(dinoElements, delta, speedScale) {
  const [dino] = dinoElements;
  handleRun(dinoElements, delta, speedScale)
  handleJump(dino, delta)
}

export function setupDino(dino) {
  isJumping = false;
  dinoFrame = 0;  
  currentFrameTime = 0;
  yVelocity = 0;
  setCustomProperty(dino.value, '--bottom', '20')

  if (isPhone) {
    document.removeEventListener('ontouchstart', onJump)
    document.addEventListener('ontouchstart', onJump)
  } else {
    document.removeEventListener('keydown', onJump)
    document.addEventListener('keydown', onJump)
  }
}

function handleRun(dinoElements, delta, speedScale) {
  const [dino, dinoStatImg, dinoRunImg1, dinoRunImg2] = 
  dinoElements;
  if (isJumping) {
    dino.value.src = dinoStatImg
    return;  
  }

  if (currentFrameTime >= FRAME_TIME) {
    dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT
    dino.value.src = dinoFrame ? dinoRunImg2 : dinoRunImg1
    currentFrameTime -= FRAME_TIME
  }
  currentFrameTime += delta * speedScale
}

function handleJump(dino, delta) {
  if (!isJumping) return
  incrementCustomProperty(dino.value, '--bottom', delta * yVelocity)
  if (getCustomProperty(dino.value, '--bottom') <= '20') {
    setCustomProperty(dino.value, '--bottom', '20')
    isJumping = false;
  }
  yVelocity -= GRAVITY * delta;
}

function onJump(e) {
  if (!isPhone) if (e.code !== 'Space' && e.code !== 'ArrowUp' || isJumping) return
  isJumping = true; 
  yVelocity = JUMP_SPEED
}

export function getDinoRect(dino) {
  return dino.getBoundingClientRect()
}