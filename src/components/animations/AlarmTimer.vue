<script setup>
import { ref, reactive } from 'vue'

const showTimer = ref(false)
const showSettings = ref(true)
const minutesInput = ref(null)
const timer = ref(null)

const hms = reactive({
  hours: null,
  minutes: null,
  seconds: null
})

function startTimer() {
  showTimer.value = true
  showSettings.value = false
  const endDate = new Date()
  const utcOffset = new Date().getTimezoneOffset()
  endDate.setMinutes(endDate.getMinutes() + minutesInput.value)

  timer.value = setInterval(() => {
    const currentDate = new Date()
    const result = new Date(
      Math.floor(endDate / 1000) * 1000 - Math.floor(currentDate / 1000) * 1000
    )

    hms.hours = result.getHours() + utcOffset / 60
    hms.minutes = result.getMinutes()
    hms.seconds = result.getSeconds()
    if (hms.hours === 0 && hms.minutes === 0 && hms.seconds === 0) clearInterval(timer.value)
  }, 1000)
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
    <time v-if="hms.hours !== null">{{
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
  display: flex;
  align-items: center;
  justify-content: center;
}
.timer time {
  font-size: 3rem;
  color: white;
}
</style>
