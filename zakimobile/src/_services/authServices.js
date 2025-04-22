import axios from 'axios';

// Configuration
const API_BASE_URL = 'http://127.0.0.1:8000';
const API_URL = `${API_BASE_URL}/account/login/`;
const TOKEN_REFRESH_URL = `${API_BASE_URL}/api/token/refresh/`;

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Fonction pour vérifier si un token est expiré
export const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const [, payloadBase64] = token.split('.');
    const payload = JSON.parse(atob(payloadBase64));
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  } catch (error) {
    console.error("Erreur lors du décodage du token :", error);
    return true;
  }
};

// Gestion des tokens
const storeTokens = (access, refresh, username, profile = null) => {
  localStorage.setItem('access_token', access);
  localStorage.setItem('refresh_token', refresh);
  localStorage.setItem('username', username);
  if (profile) localStorage.setItem('profile', JSON.stringify(profile));
  api.defaults.headers.common['Authorization'] = `Bearer ${access}`;
};

export const login = async (emailOrUsername, password) => {
  try {
    const response = await api.post('/account/login/', {
      email_or_username: emailOrUsername,
      password,
    });

    const { access, refresh, user, profile } = response.data;
    storeTokens(access, refresh, emailOrUsername, profile);

    return { 
      success: true,
      user: user || { username: emailOrUsername },
      profile,
      message: "Connexion réussie"
    };
  } catch (error) {
    const errorData = handleAuthError(error);
    return {
      success: false,
      message: errorData.error,
      details: errorData.details
    };
  }
};

export const refreshToken = async () => {
  try {
    const refresh = localStorage.getItem('refresh_token');
    if (!refresh) throw new Error('No refresh token');

    const response = await api.post(TOKEN_REFRESH_URL, { refresh });
    const newAccessToken = response.data.access;

    localStorage.setItem('access_token', newAccessToken);
    api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

    return { success: true, access: newAccessToken };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.detail || 'Refresh token failed'
    };
  }
};

export const clearAuthData = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('username');
  localStorage.removeItem('profile');
  delete api.defaults.headers.common['Authorization'];
};

export const logout = async () => {
  try {
    const refreshToken = localStorage.getItem('refresh_token');
    const accessToken = localStorage.getItem('access_token');

    if (!refreshToken) {
      clearAuthData();
      return { success: true };
    }

    await api.post('/account/logout/', { 
      refresh: refreshToken 
    }, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    clearAuthData();
    return { success: true, message: 'Déconnexion réussie' };

  } catch (error) {
    clearAuthData();
    const errorResult = handleAuthError(error);
    return {
      success: false,
      error: errorResult.error,
      details: errorResult.details
    };
  }
};

// Intercepteur pour gérer les expirations de token
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    const accessToken = localStorage.getItem('access_token');

    const isUnauthorized = error.response?.status === 401;
    const isInvalidToken = error.response?.data?.code === 'token_not_valid';

    if (!originalRequest._retry && isUnauthorized && isInvalidToken && isTokenExpired(accessToken)) {
      originalRequest._retry = true;

      const refreshResult = await refreshToken();
      if (refreshResult.success) {
        originalRequest.headers.Authorization = `Bearer ${refreshResult.access}`;
        return api(originalRequest); // Refaire la requête avec le nouveau token
      }
    }

    if (isUnauthorized) {
      await logout();
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

// Gestion des erreurs centralisée
const handleAuthError = (error) => {
  if (!error.response) {
    return {
      success: false,
      error: "Erreur réseau - Vérifiez votre connexion internet",
      details: error.message
    };
  }

  switch (error.response.status) {
    case 400:
      return {
        success: false,
        error: "Requête invalide",
        details: error.response.data
      };
    case 401:
      return {
        success: false,
        error: "Identifiants incorrects",
        details: error.response.data?.error
      };
    case 500:
      return {
        success: false,
        error: "Erreur serveur - Réessayez plus tard",
        details: error.response.data
      };
    default:
      return {
        success: false,
        error: "Erreur inattendue",
        details: error.response.data
      };
  }
};

// Exporter l’instance API
export default api;
