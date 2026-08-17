// Lógica compartida de la página de preferencias.
// Usada por /preferences y por las variantes de diseño /preferences/v1..v10:
// mismo estado (f.answers), mismo autosave, distinta presentación.
import { computed, reactive, ref, watch } from 'vue'
import { useFunnel } from 'stores/funnel'
import { SCREENS, CATEGORIES, COUNTRIES, flagOf, TITLE_SUGGESTIONS } from 'src/data/screens'
import { suggestCities } from 'src/utils/cities'
import { currencySymbol } from 'src/utils/currency'

export const GROUPS = [
  ['Target role', 'Puesto objetivo'],
  ['Job preferences', 'Preferencias de empleo'],
  ['Company preferences', 'Preferencias de empresa']
]

export const FIELDS = [
  { n: 1, g: 0, icon: '🎯', t: ['Target job titles', 'Puestos objetivo'], sub: ['Up to 8 titles we use to match you with jobs', 'Hasta 8 puestos que usamos para encontrar tus matches'] },
  { n: 2, g: 0, icon: '📈', t: ['Career level', 'Nivel profesional'] },
  { n: 3, g: 0, icon: '🏭', t: ['Industries', 'Industrias'], sub: ['Pick the industries you want us to prioritize', 'Elige las industrias que quieres que prioricemos'] },
  { n: 4, g: 1, icon: '💼', t: ['Type of work', 'Tipo de trabajo'] },
  { n: 5, g: 1, icon: '🏠', t: ['Work mode', 'Modalidad'] },
  { n: 6, g: 1, icon: '💶', t: ['Minimum salary', 'Salario mínimo'] },
  { n: 7, g: 1, icon: '⚡', t: ['How fast do you want a job?', '¿Cómo de rápido quieres el empleo?'] },
  { n: 8, g: 1, icon: '🌍', t: ['Country', 'País'] },
  { n: 9, g: 1, icon: '📍', t: ['City / region', 'Ciudad / región'] },
  { n: 10, g: 2, icon: '🏢', t: ['Preferred company size', 'Tamaño de empresa preferido'], sub: ['You will still see other companies in your recommendations, but these will be prioritized', 'Seguirás viendo otras empresas en tus recomendaciones, pero estas tendrán prioridad'] },
  { n: 11, g: 2, icon: '⭐', t: ['Dream companies', 'Empresas soñadas'], sub: ["Companies you'd love to work for — we'll prioritize their openings", 'Empresas en las que te encantaría trabajar: priorizaremos sus ofertas'] }
]

export const CK = '<svg viewBox="0 0 24 24" width="22" height="22"><circle cx="12" cy="12" r="11" fill="currentColor"/><path d="M7.5 12.5l3 3 6-6.5" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>'

export function usePrefs () {
  const f = useFunnel()
  const T = pair => f.T(pair)

  // Si se entra directo sin estado en memoria, cargar el snapshot guardado
  if (!Object.keys(f.answers).length) f.restorePlan()
  const a = f.answers

  // Auto-guardado con debounce
  let saveT = null
  watch(() => JSON.stringify(a), () => { clearTimeout(saveT); saveT = setTimeout(() => f.persistPlan(), 400) })

  const optsOf = id => (SCREENS.find(s => s.id === id) || {}).opts || []
  const same = (sel, o) => !!sel && sel.t && sel.t[0] === o.t[0]

  function hasMulti (id, o) { return (a[id] || []).some(x => x.t[0] === o.t[0]) }
  function toggleMulti (id, o) {
    if (!a[id]) a[id] = []
    const i = a[id].findIndex(x => x.t[0] === o.t[0])
    if (i >= 0) a[id].splice(i, 1); else a[id].push(o)
  }

  const hasCat = c => (a.P13 || []).some(x => x.t && x.t[0] === c[0])
  function toggleCat (c) {
    if (!a.P13) a.P13 = []
    const i = a.P13.findIndex(x => x.t && x.t[0] === c[0])
    if (i >= 0) a.P13.splice(i, 1); else a.P13.push({ t: c })
  }

  // --- Puestos objetivo con sugerencias (misma lista que el funnel) ---
  const titleDraft = ref('')
  const titleOpen = ref(false)
  const titleSugs = computed(() => {
    const q = titleDraft.value.trim().toLowerCase()
    if (q.length < 2) return []
    return TITLE_SUGGESTIONS
      .filter(t => t.toLowerCase().includes(q))
      .filter(t => !(a.P19T || []).some(x => x.toLowerCase() === t.toLowerCase()))
      .slice(0, 6)
  })
  function addTitle (t) {
    t = (t || '').trim()
    if (!t || (a.P19T || []).length >= 8) return
    if (!a.P19T) a.P19T = []
    if (!a.P19T.includes(t)) a.P19T.push(t)
    titleDraft.value = ''
    titleOpen.value = false
  }

  // --- Ciudad con typeahead (local + Photon por país) ---
  const cityDraft = ref(a.PCITY || '')
  const cityOpen = ref(false)
  const citySugs = ref([])
  let cityT = null
  function onCityType () {
    cityOpen.value = true
    clearTimeout(cityT)
    const q = cityDraft.value.trim()
    if (!q) { citySugs.value = []; a.PCITY = ''; return }
    cityT = setTimeout(async () => {
      citySugs.value = await suggestCities(q, a.P11, f.lang)
    }, 160)
  }
  function pickCity (name) {
    if (!name || !name.trim()) return
    a.PCITY = name.trim()
    cityDraft.value = name.trim()
    cityOpen.value = false
    citySugs.value = []
  }
  function closeSoon (which) {
    setTimeout(() => { if (which === 'title') titleOpen.value = false; else cityOpen.value = false }, 180)
  }

  // --- Salario / ritmo ---
  const PERIODS = [['Hourly', 'Por hora'], ['Monthly', 'Mensual'], ['Yearly', 'Anual']]
  function setSalaryPeriod (k) {
    a.P8 = { amount: a.P8 ? a.P8.amount : '', period: PERIODS[k] }
    a.P8_period = k
    f.salaryPeriod = k
  }
  function setSalaryAmount (v) {
    const n = String(v).replace(/[^0-9]/g, '')
    a.P8 = { amount: n, period: (a.P8 && a.P8.period) || PERIODS[f.salaryPeriod || 1] }
  }
  function speedLabel (m) {
    if (m >= 6) return f.lang === 'en' ? '6+ months' : '6+ meses'
    if (m === 1) return f.lang === 'en' ? '1 month' : '1 mes'
    return f.lang === 'en' ? `${m} months` : `${m} meses`
  }
  function setSpeed (m) { a.PSPEED = { months: m, t: [speedLabel(m), speedLabel(m)] } }

  // --- Preferencias de empresa ---
  const COMPANY_SIZES = ['1 - 50', '51 - 200', '201 - 1,000', '1,001+']
  function toggleSize (s) {
    if (!a.PCOMPSIZE) a.PCOMPSIZE = []
    const i = a.PCOMPSIZE.indexOf(s)
    if (i >= 0) a.PCOMPSIZE.splice(i, 1); else a.PCOMPSIZE.push(s)
  }
  const dreamDraft = ref('')
  function addDream () {
    const c = dreamDraft.value.trim()
    if (!c) return
    if (!a.PDREAM) a.PDREAM = []
    if (!a.PDREAM.some(x => x.toLowerCase() === c.toLowerCase())) a.PDREAM.push(c)
    dreamDraft.value = ''
  }

  // Resumen legible del valor actual de cada campo (para acordeones, paneles, etc.)
  function summary (n) {
    switch (n) {
      case 1: return (a.P19T || []).join(', ')
      case 2: return a.P16 ? T(a.P16.t) : ''
      case 3: return (a.P13 || []).map(x => T(x.t)).join(', ')
      case 4: return (a.P7 || []).map(x => T(x.t)).join(', ')
      case 5: return (a.P9 || []).map(x => T(x.t)).join(', ')
      case 6: return (a.P8 && a.P8.amount) ? `$${a.P8.amount} · ${T(a.P8.period)}` : ''
      case 7: return a.PSPEED ? speedLabel(a.PSPEED.months) : ''
      case 8: return a.P11 ? `${flagOf(a.P11)} ${a.P11}` : ''
      case 9: return a.PCITY || ''
      case 10: return (a.PCOMPSIZE || []).join(', ')
      case 11: return (a.PDREAM || []).join(', ')
      default: return ''
    }
  }
  const filled = n => !!summary(n)

  // Moneda por ubicación del usuario
  const sym = computed(() => currencySymbol(a.P11))

  return reactive({
    sym,
    f, T, a, CK, GROUPS, FIELDS, CATEGORIES, COUNTRIES, flagOf,
    optsOf, same, hasMulti, toggleMulti, hasCat, toggleCat,
    titleDraft, titleOpen, titleSugs, addTitle,
    cityDraft, cityOpen, citySugs, onCityType, pickCity, closeSoon,
    PERIODS, setSalaryPeriod, setSalaryAmount, speedLabel, setSpeed,
    COMPANY_SIZES, toggleSize, dreamDraft, addDream,
    summary, filled
  })
}
