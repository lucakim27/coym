import { createWebHistory, createRouter } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: () => import('@/views/HomePage'),
  },
  {
    path: '/comment/:id',
    name: 'CommentPage',
    component: () => import('@/views/CommentPage'),
  },
  {
    path: '/users',
    name: 'UsersPage',
    component: () => import('@/views/UsersPage'),
  },
  {
    path: '/request',
    name: 'RequestPage',
    component: () => import('@/views/RequestPage'),
  },
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
  {
    path: '/profile/:id',
    name: 'ProfilePage',
    component: () => import('@/views/ProfilePage'),
  },
  {
    path: '/privacyPolicy',
    name: 'PrivacyPolicyPage',
    component: () => import('@/views/PrivacyPolicyPage'),
  },
  {
    path: '/aboutUs',
    name: 'AboutUsPage',
    component: () => import('@/views/AboutUsPage'),
  },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})