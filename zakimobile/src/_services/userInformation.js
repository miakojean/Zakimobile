import axios from 'axios';
import { refreshToken } from './authServices'; // Importe la fonction de refresh

const API_URL = 'http://127.0.0.1:8000/account/';

// Instance Axios configurée
const userApi = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10 secondes timeout
});

// Intercepteur pour ajouter le token et gérer les 401
userApi.interceptors.request.use(
  async (config) => {
    let accessToken = localStorage.getItem('access_token');
    
    if (!accessToken) {
      window.location.href = '/signin';
      throw new axios.Cancel('No access token - redirecting to login');
    }

    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur de réponse pour gérer les tokens expirés
userApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshResult = await refreshToken();
        if (refreshResult.success) {
          originalRequest.headers.Authorization = `Bearer ${refreshResult.access}`;
          return userApi(originalRequest);
        }
      } catch (refreshError) {
        console.error('Refresh token failed:', refreshError);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/signin';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export const fetchUserProfile = async () => {
  try {
    const response = await userApi.get('profile/');
    return {
      success: true,
      user: response.data.user,
      profile: response.data.profile || null
    };
  } catch (error) {
    return handleUserError(error);
  }
};

export const updateUserProfile = async (profileData) => {
  try {
    const response = await userApi.put('profile/', profileData);
    return {
      success: true,
      user: response.data.user,
      profile: response.data.profile
    };
  } catch (error) {
    return handleUserError(error);
  }
};

// Gestion centralisée des erreurs
const handleUserError = (error) => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        return {
          success: false,
          error: 'Session expirée',
          shouldLogout: true
        };
      case 403:
        return {
          success: false,
          error: 'Permissions insuffisantes'
        };
      case 404:
        return {
          success: false,
          error: 'Profil non trouvé'
        };
      default:
        return {
          success: false,
          error: `Erreur serveur (${error.response.status})`
        };
    }
  } else {
    return {
      success: false,
      error: 'Erreur réseau - Vérifiez votre connexion'
    };
  }
};