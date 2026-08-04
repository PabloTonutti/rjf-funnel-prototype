import { defineStore } from 'pinia'
import { SCREENS } from 'src/data/screens'

// Funnel engine — same navigation/branch logic as the HTML prototype.
// State lives in memory only (no localStorage), as specced.
export const useFunnel = defineStore('funnel', {
  state: () => ({
    lang: 'en',
    currentI: 0,
    history: [],
    answers: {},
    upload: null,
    salaryPeriod: 1,
    selectedPlan: 1,
    secondsLeft: 9 * 60 + 57
  }),

  getters: {
    screen: (s) => SCREENS[s.currentI],
    // T resolves an [en, es] pair against the active language
    T: (s) => (p) => (Array.isArray(p) ? (s.lang === 'en' ? p[0] : p[1]) : p)
  },

  actions: {
    nextIndex (i) {
      let n = i + 1
      while (SCREENS[n] && SCREENS[n].cond && !SCREENS[n].cond(this)) n++
      return n
    },
    go (i) {
      this.history.push(this.currentI)
      this.currentI = i
      window.scrollTo(0, 0)
    },
    next () { this.go(this.nextIndex(this.currentI)) },
    back () {
      if (!this.history.length) return
      let prev = this.history.pop()
      while (SCREENS[prev] && ['loader', 'uploading'].includes(SCREENS[prev].type) && this.history.length) {
        prev = this.history.pop()
      }
      this.currentI = prev
      window.scrollTo(0, 0)
    },
    toggleLang () { this.lang = this.lang === 'en' ? 'es' : 'en' },
    restart () {
      this.$patch({
        answers: {}, history: [], selectedPlan: 1, salaryPeriod: 1,
        upload: null, secondsLeft: 9 * 60 + 57, currentI: 0
      })
    }
  }
})
