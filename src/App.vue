<script setup>
  import MiniContainer from './components/MiniContainer.vue';
  import MainTheme from './components/animations/MainTheme.vue';
  import {animations} from './components/animations/index'
</script>

<template>
  <div class='outer-wrapper'>
    <MiniContainer v-for='(animation, ind) in animations' :key='ind' :animate='ind + 1'>
      <component :is='animation' />
    </MiniContainer>
  </div>

  <MainTheme />
</template>

<style scoped>

</style>
