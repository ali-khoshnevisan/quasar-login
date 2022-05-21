
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: { loginRequired: true },
    children: [
      { path: '/profile', component: () => import('pages/UserProfile.vue'), meta: { loginRequired: true } },
      { path: '/update', component: () => import('pages/UpdateUser.vue'), meta: { loginRequired: true } },
    ]
  },
  { path: '/login', component: () => import('pages/LoginPage.vue'), meta: { loginRedirect: true } },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]



export default routes
