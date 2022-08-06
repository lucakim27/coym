import { createWebHistory, createRouter } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: () => import('@/views/HomePage'),
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: () => import('@/views/LoginPage'),
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: () => import('@/views/RegisterPage'),
  },
  {
    path: '/comment',
    name: 'CommentPage',
    component: () => import('@/views/CommentPage'),
  },
  {
    path: '/online',
    name: 'OnlinePage',
    component: () => import('@/views/OnlinePage'),
  },
  {
    path: '/chat',
    name: 'ChatPage',
    component: () => import('@/views/ChatPage'),
  },
  {
    path: '/chart',
    name: 'ChartPage',
    component: () => import('@/views/ChartPage'),
  },
  {
    path: '/setting',
    name: 'SettingPage',
    component: () => import('@/views/SettingPage'),
  },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})