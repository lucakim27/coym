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
    path: '/people',
    name: 'PeoplePage',
    component: () => import('@/views/PeoplePage'),
  },
  {
    path: '/request',
    name: 'RequestPage',
    component: () => import('@/views/RequestPage'),
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
  {
    path: '/search',
    name: 'SearchPage',
    component: () => import('@/views/SearchPage'),
  },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})