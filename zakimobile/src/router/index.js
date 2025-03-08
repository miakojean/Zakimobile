import { createRouter, createWebHistory } from '@ionic/vue-router';

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../startview/homeLayout.vue') // ✅ Correct
  },
  {
    path: '/secondStep',
    name: 'SecondStep',
    component: () => import('../startview/secondStep.vue') // ✅ Correct,
  },
  {
    path: '/thirdStep',
    name: 'ThirdStep',
    component: () => import('../startview/thirdStep.vue') // ✅ Correct,
  }
   
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;

