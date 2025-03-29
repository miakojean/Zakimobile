import { createRouter, createWebHistory } from '@ionic/vue-router';

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../startview/Startview.vue'),
    meta: { noTransition: true }
  },
  {
    path:'/aboutaccount', /* sign in or sign up */
    name: "aboutaccount",
    component: () => import('../startview/Aboutaccount.vue'),
    meta: { noTransition: true }
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
    path:'/sendmail',
    name:'sendmail',
    component: () => import('../authentication/sendEmail.vue')
  },
  {
    path:'/resetpassword',
    name:'resetpassword',
    component: () => import('../authentication/PasswordReset.vue')
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
  },
  {
    path: '/article/:slug', // Le `:slug` indique un paramètre dynamique
    name: 'articleDetails', // Un nom de route plus générique
    component: () => import('../homeland/articlesDetails.vue')
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});


export default router;
