<script setup>
import { useDinoStore } from '../../../stores/dinoUsers'
import { onMounted, ref } from 'vue'

defineProps(['currentName'])
const dinoStore = useDinoStore()
const users = ref([])
const leaderBoard = ref(null)

let position = 'hidden'
let positionMap = {
  hidden: 'translate(-100%, -50%)',
  visible: 'translate(0, -50%)'
}

function rollUp() {
  position = position === 'hidden' ? 'visible' : 'hidden'
  leaderBoard.value.style.transform = positionMap[position]
}

onMounted(() => {
  dinoStore.loadUsers().then(() => {
    const rating = dinoStore
      .getUsers()
      .slice()
      .sort((a, b) => b.score - a.score)
    users.value = rating
  })
})
</script>

<template>
  <div ref="leaderBoard" class="leader-board">
    <div class="overflower">
      <h3 class="title">Dino Warriors</h3>
      <ol>
        <li
          v-for="user in users"
          :key="user.name"
          :style="user.name === currentName?.name ? 'color: green' : ''"
        >
          {{
            `${user.name === currentName?.name ? `You're here)` : user.name}: ${Math.floor(
              user.score
            )}`
          }}
        </li>
      </ol>
      <button @click="rollUp" @touchstart="rollUp" class="activator"></button>
    </div>
  </div>
</template>

<style scoped>
.leader-board {
  --main-color: hsl(200deg 70% 10%);
  position: absolute;
  z-index: 10;
  top: 50%;
  left: 0;
  transform: translate(-100%, -50%);
  transition: 2s;
  color: #fff;
  border-radius: 5px;
  background-color: var(--main-color);
  list-style-position: inside;
}

.leader-board ol {
  line-height: 1.6;
}
.overflower {
  padding: 1rem;
  height: 20rem;
  overflow: auto;
  scrollbar-gutter: stable;
}

.title {
  margin-bottom: 1rem;
}

.activator {
  position: absolute;
  right: -100px;
  top: 20%;
  transform: translate(0, -50%);
  width: 20px;
  height: 20px;
  border: none;
  outline: none;
  border-radius: 50%;
  background-color: yellow;
  animation: flash 5s ease infinite alternate;
}

@keyframes flash {
  from {
    opacity: 0.7;
  }
  to {
    opacity: 0;
  }
}
</style>
