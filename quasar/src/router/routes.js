const routes = [
  {
    path: '/',
    component: () => import('layouts/FunnelLayout.vue'),
    children: [{ path: '', component: () => import('pages/FunnelPage.vue') }]
  },
  {
    path: '/:catchAll(.*)*',
    redirect: '/'
  }
]

export default routes
