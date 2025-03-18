// api.js
import axios from 'axios';

// Configuration globale d'Axios (URL de base, headers par défaut, etc.)
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/', // Remplacez par l'URL de votre API Django
  headers: {
    'Content-Type': 'application/json',
    // Vous pouvez ajouter d'autres headers par défaut ici si nécessaire
  },
});

// Intercepteurs pour les requêtes (par exemple, ajouter le token JWT)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token'); // Récupérez votre token JWT
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteurs pour les réponses (par exemple, gestion des erreurs, rafraîchissement du token)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Exemple de gestion d'une erreur 401 (token expiré) et tentative de rafraîchissement
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          const rs = await axios.post('/api/token/refresh/', { refresh: refreshToken }); // Endpoint de rafraîchissement de token Django Simple JWT
          const newAccessToken = rs.data.access;
          localStorage.setItem('access_token', newAccessToken);
          api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
          return api(originalRequest); // Retry la requête originale avec le nouveau token
        } catch (_error) {
          // Gérez l'échec du rafraîchissement du token (par exemple, redirection vers la page de connexion)
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          // router.push('/login'); // Si vous avez votre router Vue ici
          console.error("Erreur lors du rafraîchissement du token:", _error);
          return Promise.reject(_error);
        }
      } else {
        // Rediriger vers la page de connexion si aucun refresh token n'est disponible
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        // router.push('/login');
        console.error("Pas de refresh token disponible, redirection vers la connexion.");
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

// Fonctions pour effectuer des appels API spécifiques
const login = (credentials) => {
  return api.post('account/login/', credentials); // Endpoint de connexion Django Simple JWT
};

const register = (userData) => {
  return api.post('/users/', userData); // Exemple d'endpoint d'enregistrement
};

const getData = () => {
  return api.get('/protected-resource/'); // Exemple d'endpoint protégé
};

const postData = (data) => {
  return api.post('/some-resource/', data);
};

const updateData = (id, data) => {
  return api.put(`/some-resource/${id}/`, data);
};

const deleteData = (id) => {
  return api.delete(`/some-resource/${id}/`);
};

export default {
  login,
  register,
  getData,
  postData,
  updateData,
  deleteData,
  // Ajoutez d'autres fonctions d'appel API ici
  api, // Exposez l'instance Axios configurée si nécessaire
};
