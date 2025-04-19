import { createRouter, createWebHistory } from '@ionic/vue-router';

const routes = [
  {
    path: '/signin',
    name: 'connexion',
    component: () => import('../authentication/Loginpage.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/signup',
    name: 'inscription',
    component: () => import('../authentication/Registration.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/',
    component: () => import('../components/tools/navigationFooter.vue'),
    meta: { requiresAuth: true }, // Toutes les routes enfants nécessitent une auth
    children: [
      {
        path: '',
        redirect: 'home'
      },
      {
        path: 'home',
        component: () => import('../views/mainland/Home.vue')
      },
      {
        path: 'orders',
        component: () => import('../views/mainland/Home.vue')
      },
      {
        path: 'cart',
        component: () => import('../views/mainland/Cart.vue')
      },
      {
        path: 'settings',
        component: () => import('../views/mainland/Settings.vue')
      },
      {
        path: 'profile',
        component: () => import('../views/mainland/Profile.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/home' // Fallback pour les routes inexistantes
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('access_token');
  
  // Redirection si tentative d'accès à une route protégée sans auth
  if (to.meta.requiresAuth && !isAuthenticated) {
    return next('/signin');
  }
  
  // Redirection si déjà connecté mais sur signin/signup
  if ((to.name === 'connexion' || to.name === 'inscription') && isAuthenticated) {
    return next('/home');
  }

  next();
});

export default router;