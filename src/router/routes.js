
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue'), meta: { loginRequired: true } },
      { path: '/login', component: () => import('pages/LoginPage.vue'), meta: { loginRedirect: true } },
      { path: '/profile', component: () => import('pages/UserProfile.vue'), meta: { loginRequired: true } },
      { path: '/update', component: () => import('pages/UpdateUser.vue'), meta: { loginRequired: true } },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]



export default routes
