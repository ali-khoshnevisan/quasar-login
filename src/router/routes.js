import auth from "./middlewares/authentication"
import login from "./middlewares/isLogin"

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: { middleware: [auth] },
    children: [
      { path: '/profile', component: () => import('pages/UserProfile.vue'), meta: { middleware: [auth] } },
      { path: '/update', component: () => import('pages/UpdateUser.vue'), meta: { middleware: [auth] } },
      { path: '/video', component: () => import('pages/VideoPlayer.vue'), meta: { middleware: [auth] } },
    ]
  },
  { path: '/login', component: () => import('pages/LoginPage.vue'), meta: { middleware: [login] } },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]



export default routes
