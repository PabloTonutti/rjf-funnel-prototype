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
  // Cualquier variante antigua /preferences/vN redirige a la principal
  { path: '/preferences/:rest(.*)*', redirect: '/preferences' },
  {
    path: '/:catchAll(.*)*',
    redirect: '/'
  }
]

export default routes
