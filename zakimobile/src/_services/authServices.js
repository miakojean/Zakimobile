import axios from 'axios';

// Configuration
const API_BASE_URL = 'http://127.0.0.1:8000';
const API_URL = `${API_BASE_URL}/account/login/`;
const TOKEN_REFRESH_URL = `${API_BASE_URL}/account/token/refresh/`;

// Instance Axios configurée
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000, // 5 secondes timeout
  headers: {
    'Content-Type': 'application/json',
  }
});

// Gestion des tokens
// Modifier storeTokens
const storeTokens = (access, refresh, username, profile = null) => {
  localStorage.setItem('access_token', access);
  localStorage.setItem('refresh_token', refresh);
  localStorage.setItem('username', username);
  if (profile) localStorage.setItem('profile', JSON.stringify(profile));
  
  api.defaults.headers.common['Authorization'] = `Bearer ${access}`;
};

// Modifier la fonction login
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
      message: "Connexion réussie" // Ajouté pour cohérence
    };
  } catch (error) {
    const errorData = handleAuthError(error);
    return {
      success: false,
      message: errorData.error, // Renommé pour cohérence
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
    clearAuthData();
    return { success: false, error: 'Session expirée - Veuillez vous reconnecter' };
  }
};

export const clearAuthData = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('username');
  delete api.defaults.headers.common['Authorization'];
};

// Intercepteur pour les requêtes expirées
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const refreshResult = await refreshToken();
      if (refreshResult.success) {
        originalRequest.headers['Authorization'] = `Bearer ${refreshResult.access}`;
        return api(originalRequest);
      }
    }
    
    return Promise.reject(error);
  }
);

// Gestion centralisée des erreurs
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

export const logout = async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      const accessToken = localStorage.getItem('access_token');
  
      if (!refreshToken) {
        console.warn('Aucun refresh token trouvé - nettoyage local');
        clearAuthData();
        return { success: true };
      }
  
      // 1. Appel au endpoint de logout backend
      await api.post('/account/logout/', { 
        refresh: refreshToken 
      }, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
  
      // 2. Nettoyage côté front (toujours exécuté même si le backend échoue)
      clearAuthData();
  
      return { 
        success: true,
        message: 'Déconnexion réussie' 
      };
  
    } catch (error) {
      // Nettoyage quand même en cas d'erreur
      clearAuthData();
  
      const errorResult = handleAuthError(error);
      return {
        success: false,
        error: errorResult.error,
        details: errorResult.details
      };
    }
};

// Exporte l'instance configurée
export default api;