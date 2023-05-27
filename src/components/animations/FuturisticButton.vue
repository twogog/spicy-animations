<script setup>
  function setCoord(e) {
    const rect = e.target.getBoundingClientRect()
    const x = e.clientX * 3 - rect.left;
    e.currentTarget.style.setProperty('--futuristic-button', x + 'deg');
  }
</script>

<template>
  <div class='container'>
    <button @mousemove='setCoord' class='btn'>
      <i></i><i></i>
      <span>Button</span>
    </button>
  </div>
</template>

<style scoped>

.container {
  --futuristic-button: 45deg;
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn {
  position: relative;
  width: 150px;
  height: 55px;
  border-radius: 5px;
  border: none;
  background: transparent;
}
.btn i {
  position: absolute;
  inset: -2px;
  border-radius: 5px;
  background: linear-gradient(var(--futuristic-button), #00ccff, #0e1538, #0e1538, #d400d4);
}

.btn i:nth-child(2) {
  filter: blur(10px);
}
.btn span {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  color: #fff;
  letter-spacing: 2px;
  border-radius: 3px;
  border: 1px solid #040a29;
  background: rgba(14, 21, 56, 0.65);
  overflow: hidden;
}

.btn span::before {
  content: '';
  position: absolute;
  top: 0;
  left: -50%;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.075);
  transform: skew(25deg);
}

</style>
