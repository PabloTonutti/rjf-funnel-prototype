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
  // Variantes de diseño propuestas para /preferences (misma lógica, distinta presentación)
  { path: '/preferences/v1', component: () => import('pages/prefs/PrefsV1.vue') },
  { path: '/preferences/v2', component: () => import('pages/prefs/PrefsV2.vue') },
  { path: '/preferences/v3', component: () => import('pages/prefs/PrefsV3.vue') },
  { path: '/preferences/v4', component: () => import('pages/prefs/PrefsV4.vue') },
  { path: '/preferences/v5', component: () => import('pages/prefs/PrefsV5.vue') },
  { path: '/preferences/v6', component: () => import('pages/prefs/PrefsV6.vue') },
  { path: '/preferences/v7', component: () => import('pages/prefs/PrefsV7.vue') },
  { path: '/preferences/v8', component: () => import('pages/prefs/PrefsV8.vue') },
  { path: '/preferences/v9', component: () => import('pages/prefs/PrefsV9.vue') },
  { path: '/preferences/v10', component: () => import('pages/prefs/PrefsV10.vue') },
  {
    path: '/:catchAll(.*)*',
    redirect: '/'
  }
]

export default routes
