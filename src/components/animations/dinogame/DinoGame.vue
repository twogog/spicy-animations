<script setup>
import groundImg from '../../../assets/dinoimgs/ground.png'
import dinoStatImg from '../../../assets/dinoimgs/dino-stationary.png'
import dinoRunImg1 from '../../../assets/dinoimgs/dino-run-0.png'
import dinoRunImg2 from '../../../assets/dinoimgs/dino-run-1.png'
import dinoLoseImg from '../../../assets/dinoimgs/dino-lose.png'
import cactusImg from '../../../assets/dinoimgs/cactus.png'

import LeaderBoard from './LeaderBoard.vue'

import { toast } from 'vue3-toastify'

import { updateGround, setupGround } from './ground'
import { updateDino, setupDino, getDinoRect } from './dino'
import { updateCactus, setupCactus, getCactusRects } from './cactus'

import { useDinoStore } from '../../../stores/dinoUsers.js'
import { ref, onMounted } from 'vue'

const dinoStore = useDinoStore()

const playground = ref(null)
const ground1 = ref(null)
const ground2 = ref(null)
const dino = ref(null)

const hide = ref(false)
const score = ref(0)

const newUserDialogue = ref(null)
const newUserForm = ref('registration')
const newUserName = ref(null)
const newUserPassword = ref(null)
const newUserEmail = ref(null)

let currentUser = ref(null)
const record = ref(currentUser.value?.score || 0)

let skipped = false
let lastTime
let speedScale
const SPEED_BOOST = 0.00001

function update(time) {
  if (!lastTime) {
    lastTime = time
    window.requestAnimationFrame(update)
    return
  }
  const delta = time - lastTime
  updateScore(delta)
  boostSpeed(delta)

  updateCactus([playground.value, cactusImg], delta, speedScale)
  updateDino([dino, dinoStatImg, dinoRunImg1, dinoRunImg2], delta)
  updateGround([ground1.value, ground2.value], delta, speedScale)
  if (checkLose(dino.value)) return handleLose(dino.value)

  lastTime = time
  window.requestAnimationFrame(update)
}

function boostSpeed(delta) {
  speedScale += delta * SPEED_BOOST
}

function updateScore(delta) {
  score.value += delta * 0.01
}

function startGame() {
  const users = dinoStore.getUsers()
  const user = currentUser.value?.name || users.find((user) => user.name === newUserName.value)
  if (user || skipped) {
    hide.value = true
    lastTime = null
    speedScale = 1
    score.value = 0
    setupDino(dino)
    setupCactus(dino)
    setupGround([ground1.value, ground2.value])
    window.requestAnimationFrame(update)
  } else {
    newUserGate()
  }
}

function checkLose(dino) {
  const dinoRect = getDinoRect(dino)
  return getCactusRects().some((cactus) => isCollision(cactus, dinoRect))
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
  dino.src = dinoLoseImg
  hide.value = false
}

function checkRecord() {
  if (skipped) {
    record.value = record.value < score.value
      ? score.value : record.value;
    return;
  }
  if (currentUser.value.score < score.value) {
    record.value = score.value
    dinoStore
      .addScore({ ...currentUser.value, score: score.value })
      .then((users) => {
        const place =
          users
            .slice()
            .sort((a, b) => b.score - a.score)
            .findIndex((s) => s.name === currentUser.value.name) + 1
        toast.success(`You're now in ${place} place!`, {
          autoClose: 3000,
          position: 'top-center'
        })
      })
      .catch((e) => console.warn(e.message))
  }
}

function newUserGate() {
  newUserDialogue.value.showModal()
}

function skipDialogue() {
  newUserDialogue.value.close()
  skipped = true;
  newUserName.value = ''
  startGame()
}

function createUser() {
  const newUser = {
    name: newUserName.value,
    email: newUserEmail.value,
    password: newUserPassword.value
  }
  dinoStore
    .addUser(newUser)
    .then(() => {
      newUserDialogue.value.close()
      toast.success('success!', { autoClose: 2000 })
      const users = dinoStore.getUsers()
      currentUser.value = users.find((u) => u.name === newUser.name)
    })
    .catch((err) => toast.error(err.message, { autoClose: 2000 }))
}

function checkUser() {
  const newUser = { name: newUserName.value, password: newUserPassword.value }
  dinoStore
    .checkUser(newUser)
    .then(() => {
      newUserDialogue.value.close()
      toast.success('logged', { autoClose: 2000 })
      const users = dinoStore.getUsers()
      currentUser.value = users.find((u) => u.name === newUser.name)
      record.value = currentUser.value.score
    })
    .catch((err) => toast.error(err.message, { autoClose: 2000 }))
}

function checkVisibility() {
  if (document.visibilityState === 'hidden') lastTime = null
}

onMounted(() => {
  document.removeEventListener('visibilitychange', checkVisibility)
  document.addEventListener('visibilitychange', checkVisibility)
  dinoStore.loadUsers()
})

</script>

<template>
  <dialog ref="newUserDialogue" class="dialog">
    <form @submit.prevent="newUserForm === 'login' ? createUser() : checkUser()">
      <div class="body">
        <input v-model.trim="newUserName" required placeholder="your nickname" maxlength="8" />
        <input
          v-model.trim="newUserPassword"
          type="password"
          required
          placeholder="your password"
          minlength="5"
          maxlength="12"
        />
        <input
          v-if="newUserForm !== 'registration'"
          v-model.trim="newUserEmail"
          type="email"
          required
          placeholder="your email"
          maxlength="30"
        />
      </div>
      <div class="footer">
        <button
          type="button"
          @click="newUserForm = newUserForm === 'login' ? 'registration' : 'login'"
        >
          {{ newUserForm }}
        </button>
        <button type="submit">submit</button>
        <button @click='skipDialogue' type="button">skip</button>
      </div>
    </form>
  </dialog>

  <div class="dino-game" ref="playground">
    <LeaderBoard :currentName=currentUser />
    <span class="record">Your record is: {{ Math.floor(record) }}</span>
    <span class="score">{{ Math.floor(score) }}</span>
    <p v-if="!hide" class="start-screen" @click="startGame">
      Click Here To Start
      <span>{{ currentUser?.name || newUserName }}</span>
    </p>
    <img ref="ground1" :src="groundImg" class="ground" />
    <img ref="ground2" :src="groundImg" class="ground" />
    <img ref="dino" :src="dinoStatImg" class="dino" />
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
*,
*::before,
*::after {
  box-sizing: border-box;
  user-select: none;
}

.dialog {
  --padding: 1rem;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 1rem;
}

form .body {
  padding: var(--padding);
  display: grid;
  grid-row-gap: 0.5rem;
}

form input {
  padding: 0.5rem 0 0.5rem 0.5rem;
  border: 1px solid grey;
}

form .footer {
  display: flex;
  gap: 10px;
  padding: var(--padding);
}
form .footer button {
  padding: 0 0.5rem;
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
  width: max-content;
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

.start-screen span {
  display: block;
  text-align: center;
  color: green;
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
