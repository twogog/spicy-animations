<script setup></script>

<template>
  <div class="stars"></div>
  <div class="twinkling"></div>
</template>

<style scoped>
.stars,
.twinkling {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: block;
  z-index: -10;
}

.stars {
  background: #000
    url(https://i.postimg.cc/hhFD7Nkf/apps-47636-13819498107583324-fb06b53a-4974-4acb-85e6-f6f363f85ab6-edec48d0-ec35-4a1f-8bf5-c455987b4a.png)
    repeat top center;
}

.twinkling {
  background-image: url(https://i.postimg.cc/CLpNr4PF/twinkling.png);
  animation: 10s twinkle infinite;
  animation-timing-function: linear;
}

@keyframes twinkle {
  from {
    background-position: 0;
  }
  to {
    background-position: -100px 0;
  }
}
</style>
