<script setup>
  import groundImg from '../../../assets/dinoimgs/ground.png'
  import dinoStatImg from '../../../assets/dinoimgs/dino-stationary.png'
  import dinoRunImg1 from '../../../assets/dinoimgs/dino-run-0.png'
  import dinoRunImg2 from '../../../assets/dinoimgs/dino-run-1.png'
  import dinoLoseImg from '../../../assets/dinoimgs/dino-lose.png'
  import cactusImg from '../../../assets/dinoimgs/cactus.png'
  
  import {updateGround, setupGround} from './ground'
  import {updateDino, setupDino} from './dino'
  import { ref } from 'vue';

  const ground1 = ref(null)
  const ground2 = ref(null)
  const dino = ref(null)
  
  const hide = ref(false);
  const score = ref(0);

  let lastTime;
  let speedScale;
  const SPEED_BOOST = .0000001;

  function update(time) {
    if(!lastTime) {
      lastTime = time;
      window.requestAnimationFrame(update);
      return;
    }
    const delta = time - lastTime;
    updateScore(delta)
    boostSpeed(delta)
    
    updateDino([dino, dinoStatImg, dinoRunImg1, dinoRunImg2], delta, speedScale)
    updateGround([ground1.value, ground2.value], delta, speedScale);
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
    setupGround([ground1.value, ground2.value])
    window.requestAnimationFrame(update);
  }

</script>

<template>
  <div class='dino-game'>
    <div class="score">{{ Math.floor(score) }}</div>
    <div v-if='!hide' class="start-screen" @click="startGame">Click Here To Start</div>
    <img ref='ground1' :src=groundImg class="ground">
    <img ref='ground2' :src=groundImg class="ground">
    <img ref='dino' :src='dinoStatImg' class="dino">
  </div>
</template>

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
  position: absolute;
  left: 1%;
  height: 20%;
  bottom: 5rem;
}
.cactus {
  position: absolute;
  left: calc(var(--left) * 1%);
  height: 20%;
  bottom: 5rem;
}

</style>
