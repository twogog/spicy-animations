
const FRAME_TIME = 100;
const DINO_FRAME_COUNT = 2;
const GRAVITY = 0.11;
const JUMP_SPEED = 0.45;

let isJumping
let currentFrameTime
let dinoFrame

export function updateDino(dinoElements, delta, speedScale) {
  handleRun(dinoElements, delta, speedScale)
  handleJump()
}

export function setupDino(dino) {
  isJumping = false;
  dinoFrame = 0;  
  currentFrameTime = 0;
}

function handleRun(dinoElements, delta, speedScale) {
  const [dino, dinoStatImg, dinoRunImg1, dinoRunImg2] = dinoElements;
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

function handleJump(dinoElements, delta, speedScale) {

}