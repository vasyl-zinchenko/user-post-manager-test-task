import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    redirect: '/user-list',
  },
  {
    path: '/user-list',
    name: 'user-list',
    component: () => import('../pages/UserList.vue'),
  },
  {
    path: '/:notFound(.*)',
    redirect: '/',
  },
];

export const router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  history: createWebHistory(),
  routes,
});
