import { ref } from 'vue'
import { defineStore } from 'pinia'

const API_URL = 'https://express-api-git-authorization-twogog.vercel.app/api/';

export const useDinoStore = defineStore('dino', () => {
  const users = ref([])
  
  function getUsers() {
    return users.value;
  }

  async function loadUsers() {
    try {
      const response = await fetch(API_URL + 'users')
      if (!response.ok) throw new Error(await response.text())
      users.value = await response.json()
      return users.value;
    } catch (error) {
      console.warn(error.message)
    }
  }

  async function addUser(user) {
    try {
      const response = await fetch(API_URL + 'registration', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
      })
      if (!response.ok) throw new Error(await response.text())
      users.value = await response.json()
      console.log(users.value)
      return users.value;
    } catch (error) {
      console.warn(error.message)
      throw new Error(error.message)
    }
  }

  async function checkUser(user) {
    try {
      const response = await fetch(API_URL + 'login', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
      })
      if (!response.ok) throw new Error(await response.text())
      users.value = await response.json()
      return users.value;
    } catch (error) {
      console.warn(error.message)
      throw new Error(error.message)
    }
  }

  async function addScore(user) {
    try {
      const response = await fetch(API_URL + 'score', {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
      })
      if (!response.ok) throw new Error(await response.text())
      users.value = await response.json()
      return users.value;
    } catch (error) {
      console.warn(error.message)
      throw new Error(error.message)
    }
  }

  return { users, addUser, addScore, loadUsers, getUsers, checkUser }
})
