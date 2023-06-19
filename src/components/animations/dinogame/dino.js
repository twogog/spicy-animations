import {getCustomProperty, incrementCustomProperty, setCustomProperty} from './helpers.js'

const GRAVITY = 0.002;
const JUMP_SPEED = 0.45;
const isPhone = /android|iphone/i.test(navigator.userAgent)

let isJumping

let frameLimit
let cycle
const handleRunStats = {
  runFrameImg: 0,
  dinoFrame: frameLimit - 1,
}

let yVelocity

export function updateDino(dinoElements, delta) {
  const [dino] = dinoElements;
  handleRun(dinoElements)
  handleJump(dino, delta)
}

export function setupDino(dino) {
  isJumping = false;
  frameLimit = 6;
  cycle = 1;
  handleRunStats.dinoFrame = frameLimit - 1;
  handleRunStats.runFrameImg = 0;
  yVelocity = 0;
  setCustomProperty(dino.value, '--bottom', '20')

  if (isPhone) {
    document.removeEventListener('touchstart', onJump)
    document.addEventListener('touchstart', onJump)
  } else {
    document.removeEventListener('keydown', onJump)
    document.addEventListener('keydown', onJump)
  }
}

function handleRun(dinoElements) {
  const [dino, dinoStatImg, dinoRunImg1, dinoRunImg2] = 
  dinoElements;
  if (isJumping) {
    dino.value.src = dinoStatImg
    return;  
  }

  if (handleRunStats.runFrameImg === 1 && handleRunStats.dinoFrame === (frameLimit - 1)) {
    dino.value.src = dinoRunImg1
    handleRunStats.runFrameImg = 0;
  } else if (handleRunStats.dinoFrame === (frameLimit - 1)) {
    dino.value.src = dinoRunImg2
    handleRunStats.runFrameImg = 1;
  }
  handleRunStats.dinoFrame += 1;
  if (handleRunStats.dinoFrame === frameLimit) handleRunStats.dinoFrame = 0;
  cycle += 1;
  if (cycle % 999 === 0) {
    frameLimit === 1 ? '' : frameLimit -= 1;
    handleRunStats.dinoFrame = frameLimit - 1;
  }
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
  const {code} = e;
  if (!isPhone) {
    if (code === 'Space' || code === 'ArrowUp') e.preventDefault();
    if (code !== 'Space' && code !== 'ArrowUp' || isJumping) return
  } else if (isJumping) return
  
  isJumping = true; 
  yVelocity = JUMP_SPEED
}

export function getDinoRect(dino) {
  return dino.getBoundingClientRect()
}