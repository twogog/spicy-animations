import {getCustomProperty, incrementCustomProperty, setCustomProperty} from './helpers.js'

const FRAME_TIME = 100;
const DINO_FRAME_COUNT = 2;
const GRAVITY = 0.0025;
const JUMP_SPEED = 0.45;

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
  document.removeEventListener('keydown', onJump)
  document.addEventListener('keydown', onJump)
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
  if (e.code !== 'Space' || isJumping) return
  isJumping = true; 
  yVelocity = JUMP_SPEED
}