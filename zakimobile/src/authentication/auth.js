// authStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  
  // State
  const user = ref(null)
  const accessToken = ref(localStorage.getItem('access_token') || null)
  const refreshToken = ref(localStorage.getItem('refresh_token') || null)
  const isAuthenticated = ref(false)
  const isLoading = ref(false)
  const error = ref(null)

  // Getters
  const getUser = () => user.value
  const getAccessToken = () => accessToken.value
  const isUserAuthenticated = () => isAuthenticated.value

  // Actions
  const login = async (credentials) => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await axios.post('http://127.0.0.1:8000/account/login/', credentials)
      
      // Set tokens
      accessToken.value = response.data.access
      refreshToken.value = response.data.refresh
      
      // Store tokens in localStorage
      localStorage.setItem('access_token', accessToken.value)
      localStorage.setItem('refresh_token', refreshToken.value)
      
      // Fetch user profile
      await fetchUserProfile()
      
      // Redirect after successful login
      router.push('/')
      
      return true
    } catch (err) {
      error.value = err.response?.data?.detail || 'Échec de la connexion'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/account/profile/', {
        headers: {
          Authorization: `Bearer ${accessToken.value}`
        }
      })
      
      user.value = response.data.user
      isAuthenticated.value = true
    } catch (err) {
      logout()
      throw err
    }
  }

  const logout = () => {
    // Clear tokens
    accessToken.value = null
    refreshToken.value = null
    user.value = null
    isAuthenticated.value = false
    
    // Remove from localStorage
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    
    // Redirect to login
    router.push('/login')
  }

  const checkAuth = async () => {
    if (accessToken.value) {
      try {
        await fetchUserProfile()
        return true
      } catch {
        logout()
        return false
      }
    }
    return false
  }

  // Initialize auth state when store is created
  const init = async () => {
    if (accessToken.value) {
      await checkAuth()
    }
  }

  // Call init
  init()

  return {
    // State
    user,
    accessToken,
    refreshToken,
    isAuthenticated,
    isLoading,
    error,
    
    // Getters
    getUser,
    getAccessToken,
    isUserAuthenticated,
    
    // Actions
    login,
    logout,
    fetchUserProfile,
    checkAuth
  }
})