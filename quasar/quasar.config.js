/* eslint-env node */
const { configure } = require('quasar/wrappers')

module.exports = configure(function (ctx) {
  return {
    boot: ['i18n'],

    css: ['app.scss'],

    extras: [],

    build: {
      target: {
        browser: ['es2020', 'firefox115', 'chrome115', 'safari14'],
        node: 'node18'
      },
      vueRouterMode: 'hash',
      // GitHub Pages project site serves under /rjf-funnel-prototype/
      publicPath: ctx.dev ? '/' : '/rjf-funnel-prototype/'
    },

    devServer: {
      port: 8890,
      open: false
    },

    framework: {
      config: {},
      // The funnel keeps the prototype's own CSS for pixel parity.
      // Quasar plugins/components can be added here as the team builds on top.
      plugins: []
    },

    animations: []
  }
})
