const routes = [
  {
    path: '/',
    component: () => import('layouts/FunnelLayout.vue'),
    children: [{ path: '', component: () => import('pages/FunnelPage.vue') }]
  },
  {
    // Página de preferencias: todo lo capturado en el funnel, editable
    path: '/preferences',
    component: () => import('pages/PreferencesPage.vue')
  },
  {
    path: '/:catchAll(.*)*',
    redirect: '/'
  }
]

export default routes
