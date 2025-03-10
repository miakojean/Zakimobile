import { createRouter, createWebHistory } from '@ionic/vue-router';

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../startview/Startview.vue')
  },
  {
    path:'/aboutaccount', /* sign in or sign up */
    name: "aboutaccount",
    component: () => import('../startview/Aboutaccount.vue')
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import('../views/Loginpage.vue')
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});


export default router;
