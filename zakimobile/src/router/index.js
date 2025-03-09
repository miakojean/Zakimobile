import { createRouter, createWebHistory } from '@ionic/vue-router';
import { myCustomTransition } from '../router/animation.js';

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../startview/homeLayout.vue')
  },
  {
    path: '/secondStep',
    name: 'SecondStep',
    component: () => import('../startview/secondStep.vue'),
    meta: { transition: 'slide-left' } // Optionnel
  },
  {
    path: '/thirdStep',
    name: 'ThirdStep',
    component: () => import('../startview/thirdStep.vue')
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

// ✅ Appliquer la transition personnalisée
router.beforeEach((to, from, next) => {
  to.meta.transition = myCustomTransition;
  next();
});

export default router;
