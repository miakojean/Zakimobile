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
  },
  {
    path: '/signup',
    name: 'signup',
    component: ()=> import('../views/Registration.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../homeland/ProfileLand.vue')
  },
  {
    path: '/HomePage',
    name: 'homepage',
    component: () => import('../homeland/homepage.vue')
  },
  {
    path:'/article',
    name:'article',
    component: () => import('../homeland/articlesDetails.vue')
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});


export default router;
