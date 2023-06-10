import { ref } from 'vue'
import { defineStore } from 'pinia'

const API_URL = 'https://express-api-navy.vercel.app/api/users';

export const useDinoStore = defineStore('dino', () => {
  const users = ref([])
  
  function getUsers() {
    return users.value;
  }

  async function loadUsers() {
    try {
      const response = await fetch(API_URL)
      if (!response.ok) throw new Error('bad response')
      users.value = await response.json()
      return users.value;
    } catch (error) {
      console.warn(error.message)
    }
  }

  async function addUser(name) {
    try {
      const response = await fetch(API_URL, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name })
      })
      if (!response.ok) throw new Error('bad response')
      users.value = await response.json()
      return users.value;
    } catch (error) {
      console.warn(error.message)
    }
  }

  async function addScore(user) {
    try {
      const response = await fetch(API_URL, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
      })
      if (!response.ok) throw new Error('bad response')
      users.value = await response.json()
      return users.value;
    } catch (error) {
      console.warn(error.message)
    }
  }

  return { users, addUser, addScore, loadUsers, getUsers }
})
