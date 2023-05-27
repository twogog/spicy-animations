import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCodeStore = defineStore('code', () => {
  const code = ref('')
  const currentAnimation = ref('');
  
  function addToClipBoard() {
    navigator.clipboard.writeText(code.value);
  }

  function addCode(text) {
    code.value = text;
  }

  function changeCurrent(id) {
    console.log(id)
    currentAnimation.value = id;
  }

  return { addCode, addToClipBoard, changeCurrent, currentAnimation }
})
