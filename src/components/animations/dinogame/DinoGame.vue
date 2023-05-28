<script setup>
  import {updateGround, setupGround} from './ground'
  import { ref, onMounted } from 'vue';

  const ground1 = ref(null)
  const ground2 = ref(null)

  let lastTime;
  
  function update(time) {
    if(!lastTime) {
      lastTime = time;
      window.requestAnimationFrame(update);
      return;
    }
    const delta = time - lastTime;
    updateGround([ground1.value, ground2.value], delta, 1);
    lastTime = time;
    window.requestAnimationFrame(update);
  }

  onMounted(() => {
    setupGround([ground1.value, ground2.value])
    window.requestAnimationFrame(update);
  })

</script>

<template>
  <div class='dino-game'>
    <div class="score">0</div>
    <div class="start-screen">Click Here To Start</div>
    <img ref='ground1' src="../../../assets/dinoimgs/ground.png" class="ground">
    <img ref='ground2' src="../../../assets/dinoimgs/ground.png" class="ground">
    <img src="../../../assets/dinoimgs/dino-stationary.png" class="dino">
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
.hide {
  display: none;
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
