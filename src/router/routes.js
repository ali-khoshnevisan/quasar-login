import auth from "./middlewares/authentication"
import login from "./middlewares/isLogin"

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: { middleware: [auth] },
    children: [
      { path: '/profile',name:'profile', component: () => import('pages/UserProfile.vue'), meta: { middleware: [auth] } },
      { path: '/update',name:'update', component: () => import('pages/UpdateUser.vue'), meta: { middleware: [auth] } },
      { path: '/video',name:'video', component: () => import('pages/VideoPlayer.vue'), meta: { middleware: [auth] } },
      { path: '/study',name:'study', component: () => import('pages/studyPlan.vue'), meta: { middleware: [auth] } },
    ]
  },
  { path: '/login',name:'login', component: () => import('pages/LoginPage.vue'), meta: { middleware: [login] } },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]



export default routes
