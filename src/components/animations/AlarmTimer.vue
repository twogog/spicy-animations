<script setup>
import { ref, reactive, onMounted } from 'vue'

const showTimer = ref(false)
const showSettings = ref(true)
const secondsInput = ref(null)
const phrase = ref(null)

let timer = null
let voices

const progressBar = ref(null)

const robot = window.speechSynthesis
robot.onvoiceschanged = () => {
  voices = robot.getVoices().filter((v) => v.lang.includes('ru') || v.lang.includes('en'))
}

onMounted(() => {
  canvas.ctx = progressBar.value.getContext('2d')
  canvas.width = progressBar.value.width
  canvas.height = progressBar.value.height
  canvas.ctx.strokeStyle = 'green'
  canvas.ctx.lineWidth = 10
})

const canvas = reactive({
  ctx: null,
  width: null,
  height: null
})

const hms = reactive({
  hours: null,
  minutes: null,
  seconds: null,
  purpose: null,
  angle: 0,
  paused: false
})

function resetHMS(hms) {
  hms.hours = null
  hms.minutes = null
  hms.seconds = null
  hms.purpose = null
  hms.angle = 0
  hms.paused = false
}

function startTimer(e, ifpaused) {
  if (!ifpaused) hms.purpose = secondsInput.value * 1000 // hours, minutes, seconds
  let step = 360 / secondsInput.value
  if (!hms.angle) hms.angle = 270 - step

  showTimer.value = true
  showSettings.value = false

  timer = setInterval(() => {
    draw(step)
    timerRush(hms, timer)
  }, 1000)
}

function draw(step) {
  canvas.ctx.clearRect(0, 0, canvas.width, canvas.height)
  canvas.ctx.beginPath()
  canvas.ctx.arc(
    canvas.width / 2,
    canvas.height / 2,
    80,
    toRadians(270),
    toRadians((hms.angle += step))
  )
  canvas.ctx.stroke()
}

function timerRush(hms, timer) {
  const currentDate = new Date(hms.purpose)
  if (hms.purpose === 0) {
    hms.seconds = currentDate.getSeconds()
    clearInterval(timer)
    talkPhrase(phrase.value)
    return
  }
  hms.purpose -= 1000
  hms.hours = currentDate.getUTCHours()
  hms.minutes = currentDate.getMinutes()
  hms.seconds = currentDate.getSeconds()
}

function toRadians(degrees) {
  const pi = Math.PI
  return degrees * (pi / 180)
}

function resetTimer() {
  clearInterval(timer)
  canvas.ctx.clearRect(0, 0, canvas.width, canvas.height)

  resetHMS(hms)

  showTimer.value = false
  showSettings.value = true
}

function pauseTimer() {
  hms.paused = hms.paused ? false : true
  if (hms.paused) {
    clearInterval(timer)
  } else {
    startTimer('vueref', true)
  }
}

function talkPhrase(phrase) {
  const speaker = new SpeechSynthesisUtterance(phrase)
  if (/[a-zA-Z]/.test(phrase)) {
    speaker.voice = voices.filter((v) => v.lang.includes('en'))[0]
    speaker.lang = 'en-US';
  } else {
    const [first, second, third] = voices.filter((v) => v.lang.includes('ru'))
    const choose = third || second || first
    speaker.voice = choose
    speaker.lang = 'ru-RU'
  }

  speechSynthesis.speak(speaker)
}
</script>

<template>
  <form v-show="showSettings" @submit.prevent="startTimer" class="settings">
    <input
      v-model="secondsInput"
      type="number"
      min="1"
      max="86399"
      required
      name="seconds"
      id="seconds"
      placeholder="seconds"
    />
    <input
      v-model.trim="phrase"
      id="phrase"
      name="phrase"
      required
      placeholder="choose your phrase"
    />
    <button type="submit">Go</button>
  </form>
  <div v-show="showTimer" class="timer">
    <canvas ref="progressBar" width="300" height="250"></canvas>
    <button v-if="hms.hours !== null" @click="pauseTimer" class="pause">P</button>
    <time v-if="hms.hours !== null" ref="timerFrame">{{
      `${hms.hours.toString().padStart(2, 0)}:${hms.minutes.toString().padStart(2, 0)}:${hms.seconds
        .toString()
        .padStart(2, 0)}`
    }}</time>
    <button v-if="hms.hours !== null" @click="resetTimer" class="reset">R</button>
  </div>
</template>

<style scoped>
.settings {
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.settings input {
  width: 20rem;
  padding: 2rem;
  border-radius: 50%;
  text-align: center;
  outline: none;
}

.settings input:nth-child(2) {
  order: 1;
}
.timer {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.timer time {
  font-size: 3rem;
  color: white;
}
.reset,
.pause,
.settings button {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  z-index: 10;
  padding: 0 3px 0 3px;
}

canvas {
  position: absolute;
}
</style>
