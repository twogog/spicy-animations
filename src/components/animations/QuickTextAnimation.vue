<script setup>
</script>

<template>
  <div class='box'>
    <span style='--i:0;'>come & get it</span>
    <span style='--i:1;'>come & get it</span>
    <span style='--i:2;'>come & get it</span>
    <span style='--i:3;'>come & get it</span>
    <span style='--i:4;'>come & get it</span>
    <span style='--i:5;'>come & get it</span>
    <span style='--i:6;'>come & get it</span>
    <span style='--i:7;'>come & get it</span>
    <span style='--i:8;'>come & get it</span>
    <span style='--i:9;'>come & get it</span>
  </div>
</template>

<style scoped>
.box {
  --anim-color: #008000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: sans-serif;
}

.box span {
  -webkit-text-stroke: 1px var(--anim-color);
  color: transparent;
  letter-spacing: 5px;
  text-transform: uppercase;
  font-weight: 900;
  font-size: 20px;
  line-height: 22px;
  animation: animate 2.5s linear infinite;
  animation-delay: calc(var(--i) * 0.25s);
}

@keyframes animate {
  0%, 10% {
    color: var(--anim-color);
    filter: hue-rotate(0deg);
  }
  10.01% {
    color: transparent;
  }
  100% {
    color: transparent;
    filter: hue-rotate(720deg);
  }
}
</style>
