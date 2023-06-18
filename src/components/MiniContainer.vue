<script setup>
import {animations} from '../assets/animations/index'
const props = defineProps(['animate'])

function addCurrentAnimation() {
  navigator.clipboard.writeText(animations[props.animate]);
}

</script>

<template>
  <div class='container'>
<slot>Here is some animation</slot>
<button @click='addCurrentAnimation'>copy code</button>
  </div>
</template>

<style scoped>
  .container {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 5rem;
    border: 1px #808080 solid;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    width: 30rem;
    aspect-ratio: 3/3;
  }

  button {
    border: none;
    background: #e6e4e4;
  }

</style>
