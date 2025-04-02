import { createRouter, createWebHistory } from '@ionic/vue-router';

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/signin',
    name: 'connexion',
    component: () => import('../authentication/Loginpage.vue')
  },
  {
    path: '/',
    component: () => import('../components/tools/navigationFooter.vue'),
    children: [
      {
        path: '',
        redirect: '/home',
      },
      {
        path: 'home',
        component: () => import('../views/mainland/Home.vue'),
      },
      {
        path: 'cart',
        component: () => import('../views/mainland/Cart.vue'),
      },
      {
        path: 'library',
        component: () => import('../views/mainland/Settings.vue'),
      },
      {
        path: 'search',
        component: () => import('../views/mainland/Profile.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});


export default router;
