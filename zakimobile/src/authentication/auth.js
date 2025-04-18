// stores/authStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()

  // State
  const user = ref(null)
  const tokens = ref({
    access: localStorage.getItem('access_token') || null,
    refresh: localStorage.getItem('refresh_token') || null
  })
  const authStatus = ref({
    isLoading: false,
    error: null,
    isAuthenticated: !!localStorage.getItem('access_token')
  })

  // Actions
  const login = async (credentials) => {
    authStatus.value.isLoading = true
    authStatus.value.error = null

    try {
      const response = await axios.post('http://127.0.0.1:8000/account/login/', credentials)
      
      // Mise à jour des tokens
      tokens.value = {
        access: response.data.access,
        refresh: response.data.refresh
      }
      
      // Stockage dans localStorage
      localStorage.setItem('access_token', tokens.value.access)
      localStorage.setItem('refresh_token', tokens.value.refresh)
      
      // Récupération du profil utilisateur
      await fetchUserProfile()
      
      // Mise à jour du statut
      authStatus.value.isAuthenticated = true
      
      // Redirection
      router.push('/')
      
      return true
    } catch (error) {
      handleAuthError(error)
      throw error
    } finally {
      authStatus.value.isLoading = false
    }
  }

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/account/profile/', {
        headers: {
          Authorization: `Bearer ${tokens.value.access}`
        }
      })
      user.value = response.data.user
    } catch (error) {
      logout()
      throw error
    }
  }

  const logout = () => {
    // Réinitialisation du state
    user.value = null
    tokens.value = { access: null, refresh: null }
    authStatus.value = {
      isLoading: false,
      error: null,
      isAuthenticated: false
    }
    
    // Nettoyage du localStorage
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    
    // Redirection
    router.push('/login')
  }

  const checkAuth = async () => {
    if (!tokens.value.access) return false
    
    try {
      await fetchUserProfile()
      authStatus.value.isAuthenticated = true
      return true
    } catch (error) {
      logout()
      return false
    }
  }

  // Gestion centralisée des erreurs
  const handleAuthError = (error) => {
    if (!error.response && error.message === "Network Error") {
      authStatus.value.error = "Le serveur ne répond pas (backend éteint ou problème CORS)"
    } else if (error.response) {
      authStatus.value.error = error.response.data?.error || "Identifiants incorrects"
    } else {
      authStatus.value.error = "Erreur inconnue lors de l'authentification"
    }
  }

  // Initialisation au chargement du store
  const initialize = async () => {
    if (tokens.value.access) {
      await checkAuth()
    }
  }

  // Appel initial
  initialize()

  return {
    // State
    user,
    tokens,
    ...authStatus.value, // Spread pour accès direct à isLoading, error, isAuthenticated
    
    // Actions
    login,
    logout,
    checkAuth,
    fetchUserProfile
  }
})