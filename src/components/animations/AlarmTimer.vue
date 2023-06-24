<script setup>
import { ref, reactive } from 'vue'

const showTimer = ref(false)
const showSettings = ref(true)
const minutesInput = ref(null)

let timer = null

const progressBar = ref(null)

const hms = reactive({
  hours: null,
  minutes: null,
  seconds: null,
  purpose: null
})

function startTimer() {
  const ctx = progressBar.value.getContext('2d')
  ctx.strokeStyle = 'green'
  ctx.lineWidth = 10
  const canvasWidth = progressBar.value.width
  const canvasHeight = progressBar.value.height

  hms.purpose = minutesInput.value * 60000 // hours, minutes, seconds
  let step = 360 / (minutesInput.value * 60)
  let angle = 270 - step

  showTimer.value = true
  showSettings.value = false

  timer = setInterval(() => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    ctx.beginPath()
    ctx.arc(canvasWidth / 2, canvasHeight / 2, 80, toRadians(270), toRadians((angle += step)))
    ctx.stroke()

    timerRush(hms, timer)
  }, 1000)
}

function timerRush(hms, timer) {
  if (hms.purpose === 0) clearInterval(timer)
  const currentDate = new Date(hms.purpose)
  hms.purpose -= 1000
  hms.hours = currentDate.getUTCHours()
  hms.minutes = currentDate.getMinutes()
  hms.seconds = currentDate.getSeconds()
}

function toRadians(degrees) {
  const pi = Math.PI
  return degrees * (pi / 180)
}
</script>

<template>
  <form v-show="showSettings" @submit.prevent="startTimer" class="settings">
    <input
      v-model="minutesInput"
      type="number"
      min="1"
      max="600"
      required
      name="minutes"
      id="minutes"
      placeholder="minutes"
    />
  </form>
  <div v-show="showTimer" class="timer">
    <canvas ref="progressBar" width="300" height="250"></canvas>
    <time v-if="hms.hours !== null" ref="timerFrame">{{
      `${hms.hours.toString().padStart(2, 0)}:${hms.minutes.toString().padStart(2, 0)}:${hms.seconds
        .toString()
        .padStart(2, 0)}`
    }}</time>
  </div>
</template>

<style scoped>
.settings {
  display: flex;
  justify-content: center;
  align-items: center;
}

.settings input {
  width: 20rem;
  padding: 2rem;
  border-radius: 50%;
  text-align: center;
}
.timer {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.timer time {
  font-size: 3rem;
  color: white;
}
canvas {
  position: absolute;
}
</style>
