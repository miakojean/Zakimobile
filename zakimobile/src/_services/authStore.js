import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

export const useUserStore = defineStore('user', () => {
  const router = useRouter()
  
  // State initial avec valeurs par défaut
  const state = ref({
    user: {
      username: '',
      first_name: '',
      last_name: '',
      email: '',
    },
    profile: {
      gender: '',
      phone_number: '',
      address: '',
      birthday: '',
      commune: '',
    },
    lastFetch: null,
    token: localStorage.getItem('access_token') || '',
    isLoggedIn: computed(() => !!state.value.token)
  })

  // Charger depuis localStorage
  function loadFromStorage() {
    const saved = localStorage.getItem('user_store')
    if (saved) {
      const parsed = JSON.parse(saved)
      state.value = {
        ...state.value,
        ...parsed,
        isLoggedIn: computed(() => !!parsed.token)
      }
    }
  }

  // Sauvegarder dans localStorage
  function saveToStorage() {
    const toSave = {
      user: state.value.user,
      profile: state.value.profile,
      lastFetch: state.value.lastFetch,
      token: state.value.token
    }
    localStorage.setItem('user_store', JSON.stringify(toSave))
  }

  // Récupérer les données utilisateur (avec cache)
  async function fetchUser(force = false) {
    const token = localStorage.getItem('access_token')
    if (!token) {
      logout()
      return
    }

    // Vérifier si les données sont récentes (10 minutes)
    const isDataFresh = state.value.lastFetch && 
                      (Date.now() - state.value.lastFetch < 600000)

    if (!force && isDataFresh) return

    try {
      const response = await axios.get('http://127.0.0.1:8000/account/profile/', {
        headers: { Authorization: `Bearer ${token}` }
      })

      state.value.user = response.data.user || {}
      state.value.profile = response.data.profile || {}
      state.value.lastFetch = Date.now()
      state.value.token = token
      
      saveToStorage()
    } catch (error) {
      if (error.response?.status === 401) {
        logout()
      }
      throw error
    }
  }

  // Connexion
  async function login(credentials) {
    const response = await axios.post('http://127.0.0.1:8000/account/login/', credentials)
    localStorage.setItem('access_token', response.data.access)
    localStorage.setItem('refresh_token', response.data.refresh)
    await fetchUser(true) // Force le refresh après login
  }

  // Déconnexion
  function logout() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('user_store')
    state.value.token = ''
    state.value.user = {}
    state.value.profile = {}
    router.push('/signin')
  }

  // Initialisation au chargement du store
  loadFromStorage()

  return {
    state,
    fetchUser,
    login,
    logout,
    loadFromStorage,
    saveToStorage
  }
})