<script setup>
  import groundImg from '../../../assets/dinoimgs/ground.png'
  import dinoStatImg from '../../../assets/dinoimgs/dino-stationary.png'
  import dinoRunImg1 from '../../../assets/dinoimgs/dino-run-0.png'
  import dinoRunImg2 from '../../../assets/dinoimgs/dino-run-1.png'
  import dinoLoseImg from '../../../assets/dinoimgs/dino-lose.png'
  import cactusImg from '../../../assets/dinoimgs/cactus.png'
  
  import {updateGround, setupGround} from './ground'
  import {updateDino, setupDino, getDinoRect} from './dino'
  import {updateCactus, setupCactus, getCactusRects} from './cactus'

  import { ref } from 'vue';
  
  const playground = ref(null)
  const ground1 = ref(null)
  const ground2 = ref(null)
  const dino = ref(null)
  
  const hide = ref(false);
  const score = ref(0);

  const localRecord = (() => {
    try {
      const storageResult = localStorage.getItem('score-record');
      if (storageResult) return storageResult
      return 0;
    } catch (error) {
      console.warn(error)
      alert('You need to share your localStorage for a consistent record writing');
      return 0;
    }
  })()
  
  const record = ref(localRecord);
  
  function checkRecord() {
    try {
      const storageResult = localStorage.getItem('score-record');
      if (storageResult) {  
        score.value > storageResult
          ? localStorage.setItem('score-record', JSON.stringify(score.value)) : ''
          record.value = localStorage.getItem('score-record');
      } else {
        localStorage.setItem('score-record', JSON.stringify(score.value))
        record.value = score.value;
      }  
    } catch (error) {
      console.warn(error)
      record.value < score.value ? record.value = score.value : ''
    }
  }

  let lastTime;
  let speedScale;
  const SPEED_BOOST = .00001;

  function update(time) {
    if(!lastTime) {
      lastTime = time;
      window.requestAnimationFrame(update);
      return;
    }
    const delta = time - lastTime;
    updateScore(delta)
    boostSpeed(delta)
    
    updateCactus([playground.value, cactusImg], delta, speedScale)
    updateDino([dino, dinoStatImg, dinoRunImg1, dinoRunImg2], delta, speedScale)
    updateGround([ground1.value, ground2.value], delta, speedScale);
    if (checkLose(dino.value)) return handleLose(dino.value)
    
    lastTime = time;
    window.requestAnimationFrame(update);
  }
  
  function boostSpeed(delta) {
    speedScale += delta * SPEED_BOOST
  }

  function updateScore(delta) {
    score.value += delta * 0.01;
  }

  function startGame() {
    lastTime = null;
    speedScale = 1;
    score.value = 0;
    hide.value = true;
    setupDino(dino)
    setupCactus(dino)
    setupGround([ground1.value, ground2.value])
    window.requestAnimationFrame(update);
  }

  function checkLose(dino) {
    const dinoRect = getDinoRect(dino)
    return getCactusRects().some(cactus => isCollision(cactus, dinoRect))
  }

  function isCollision(rect1, rect2) {
    return (
      rect1.left < rect2.right &&
      rect1.top < rect2.bottom &&
      rect1.right > rect2.left &&
      rect1.bottom > rect2.top 
    )
  }

  function handleLose(dino) {
    checkRecord()
    dino.src = dinoLoseImg;
    hide.value = false;
  }

</script>

<template>
  <div class='dino-game' ref="playground">
    <span class="record">Your record is: {{ Math.floor(record) }}</span>
    <span class="score">{{ Math.floor(score) }}</span>
    <p v-if='!hide' class="start-screen" @click="startGame">Click Here To Start</p>
    <img ref='ground1' :src=groundImg class="ground">
    <img ref='ground2' :src=groundImg class="ground">
    <img ref='dino' :src='dinoStatImg' class="dino">
  </div>
</template>

<style>
  .cactus {
  position: absolute;
  left: calc(var(--left) * 1%);
  height: 20%;
  bottom: 5rem;
  }
</style>

<style scoped>
*, *::before, *::after {
  box-sizing: border-box;
  user-select: none;
}
.dino-game {
  position: relative;
  overflow: hidden;
  color: #fff;
}
.record {
  position: absolute;
  font-size: 2rem;
  left: 50%;
  top: 5%;
  transform: translate(-50%);
  width:max-content;
}
.score {
  position: absolute;
  bottom: 50%;
  right: 1%;
}
.start-screen {
  font-size: 2rem;
  position: absolute;
  top: 50%;
  left: 50%;
  width: max-content;
  transform: translate(-50%, -50%);
}
.ground {
  --left: 0;
  position: absolute;
  bottom: 5rem;
  width: 800%;
  left: calc(var(--left) * 1%);
}
.dino {
  --bottom: 20;
  position: absolute;
  left: 1%;
  height: 20%;
  bottom: calc(var(--bottom) * 1%);
}
</style>
