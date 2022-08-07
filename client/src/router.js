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
    path: '/users',
    name: 'UsersPage',
    component: () => import('@/views/UsersPage'),
  },
  // {
  //   path: '/chat',
  //   name: 'ChatPage',
  //   component: () => import('@/views/ChatPage'),
  // },
  {
    path: '/analysis',
    name: 'AnalysisPage',
    component: () => import('@/views/AnalysisPage'),
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