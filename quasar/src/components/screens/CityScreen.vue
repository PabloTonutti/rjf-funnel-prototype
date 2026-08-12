<template>
  <div class="wrap"><div class="screen">
    <h1 class="qtitle">{{ title }}</h1>
    <p class="subtitle qsub">{{ f.T(screen.sub) }}</p>
    <div class="csel" :class="{ open: open && rows.length }" style="max-width:520px" ref="rootEl">
      <div class="csel-box">
        <span class="cflag" style="display:flex" v-html="ic('mappin')" />
        <input
          type="text" v-model="q" :placeholder="cityPlaceholder"
          autocomplete="off"
          @input="onType" @focus="open = true"
          @keydown.enter.stop.prevent="go"
        >
        <button v-if="q" class="city-clear" @click="q=''; rows=[]">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>
      <div class="csel-list">
        <button v-for="(r, k) in rows" :key="k" class="crow city-row" @click="pick(r)">
          <span class="city-pin" v-html="ic('mappin')" />
          <span class="city-txt"><b>{{ r.name }}</b><small v-if="r.sub">{{ r.sub }}</small></span>
          <span v-if="r.kind" class="city-kind">{{ r.kind }}</span>
        </button>
      </div>
    </div>
    <button class="skiplink skiplink-lg" @click="skip">{{ f.T(['Skip — anywhere works', 'Saltar: cualquier lugar me vale']) }}</button>
  </div></div>
  <FootContinue :label="f.T(['CONTINUE', 'Continuar'])" :disabled="!q.trim()" @go="go" />
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useFunnel } from 'stores/funnel'
import { CCODE } from 'src/data/screens'
import { ic } from 'assets/graphics'
import FootContinue from './FootContinue.vue'

defineProps({ screen: { type: Object, required: true } })
const f = useFunnel()
const q = ref(f.answers.PCITY || '')
const rows = ref([])
const open = ref(false)
const rootEl = ref(null)

const title = computed(() => {
  const c = f.answers.P11 || (f.lang === 'en' ? 'your country' : 'tu país')
  return f.lang === 'en' ? `Where exactly in ${c}?` : `¿En qué parte de ${c} exactamente?`
})

// Placeholder según el país elegido (su capital); si no lo conocemos, sin placeholder.
const cityPlaceholder = computed(() => {
  const cap = capitalOf()
  return cap ? f.T([`e.g. ${cap}`, `p. ej. ${cap}`]) : ''
})

// Ciudades principales por país: sugerencias INSTANTÁNEAS desde el primer carácter
// (Photon complementa/afina a partir de 2 caracteres).
const LOCAL_CITIES = {
  Spain: ['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Zaragoza', 'Málaga', 'Bilbao', 'Alicante', 'Murcia', 'Granada', 'Palma', 'Las Palmas', 'Vigo', 'A Coruña', 'San Sebastián'],
  Mexico: ['Mexico City', 'Guadalajara', 'Monterrey', 'Puebla', 'Tijuana', 'Querétaro', 'Mérida', 'Cancún', 'León', 'Toluca'],
  Argentina: ['Buenos Aires', 'Córdoba', 'Rosario', 'Mendoza', 'La Plata', 'Mar del Plata', 'Salta', 'Tucumán'],
  Colombia: ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena', 'Bucaramanga', 'Pereira'],
  Chile: ['Santiago', 'Valparaíso', 'Concepción', 'Viña del Mar', 'Antofagasta', 'Temuco'],
  Peru: ['Lima', 'Arequipa', 'Trujillo', 'Cusco', 'Chiclayo', 'Piura'],
  Uruguay: ['Montevideo', 'Punta del Este', 'Salto'],
  Ecuador: ['Quito', 'Guayaquil', 'Cuenca'],
  'United States': ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Miami', 'San Francisco', 'Seattle', 'Boston', 'Austin', 'Denver', 'Atlanta', 'Dallas', 'Washington'],
  'United Kingdom': ['London', 'Manchester', 'Birmingham', 'Edinburgh', 'Glasgow', 'Leeds', 'Liverpool', 'Bristol'],
  Ireland: ['Dublin', 'Cork', 'Galway', 'Limerick', 'Waterford'],
  France: ['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Bordeaux', 'Lille', 'Nantes', 'Nice'],
  Germany: ['Berlin', 'Munich', 'Hamburg', 'Frankfurt', 'Cologne', 'Stuttgart', 'Düsseldorf', 'Leipzig'],
  Italy: ['Rome', 'Milan', 'Naples', 'Turin', 'Bologna', 'Florence', 'Venice'],
  Portugal: ['Lisbon', 'Porto', 'Braga', 'Coimbra', 'Faro'],
  Netherlands: ['Amsterdam', 'Rotterdam', 'The Hague', 'Utrecht', 'Eindhoven'],
  Belgium: ['Brussels', 'Antwerp', 'Ghent', 'Liège'],
  Switzerland: ['Zurich', 'Geneva', 'Basel', 'Bern', 'Lausanne'],
  Canada: ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa'],
  Brazil: ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Brasília', 'Curitiba', 'Porto Alegre'],
  Australia: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide']
}
const norm = s => (s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
function localMatches (query) {
  const list = LOCAL_CITIES[f.answers.P11] || []
  const nq = norm(query)
  return list.filter(c => norm(c).startsWith(nq)).slice(0, 6)
    .map(name => ({ name, sub: '', kind: name === capitalOf() ? f.T(['Capital', 'Capital']) : f.T(['City', 'Ciudad']) }))
}
function mergeRows (locals, photon) {
  const seen = new Set(locals.map(r => norm(r.name)))
  return [...locals, ...photon.filter(r => !seen.has(norm(r.name)))].slice(0, 6)
}

// Free typeahead geocoding (photon.komoot.io, CORS-friendly), filtered to the chosen country
let debounce = null, ctrl = null
function onType () {
  open.value = true
  clearTimeout(debounce)
  const query = q.value.trim()
  if (query.length < 1) { rows.value = []; return }
  rows.value = localMatches(query) // instantáneo desde el PRIMER carácter
  if (query.length < 2) return     // Photon afina a partir de 2
  debounce = setTimeout(async () => {
    try {
      if (ctrl) ctrl.abort()
      ctrl = new AbortController()
      const lang = f.lang === 'es' ? 'es' : 'en'
      const r = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=12&lang=${lang}`, { signal: ctrl.signal })
      const j = await r.json()
      const cc = CCODE[f.answers.P11] || null
      const KIND = { city: ['City', 'Ciudad'], town: ['Town', 'Pueblo'], village: ['Village', 'Pueblo'], borough: ['District', 'Distrito'], suburb: ['Area', 'Zona'], state: ['Region', 'Región'], county: ['Region', 'Región'] }
      const seen = new Set()
      const photonRows = (j.features || [])
        .filter(ft => !cc || ft.properties.countrycode === cc)
        .filter(ft => ['city', 'town', 'village', 'borough', 'suburb', 'state', 'county'].includes(ft.properties.osm_value) || ft.properties.type === 'city')
        .map(ft => {
          const p = ft.properties
          const sub = [p.postcode, p.state || p.county].filter(Boolean).join(' · ')
          const kindPair = KIND[p.osm_value] || (p.type === 'city' ? KIND.city : null)
          return { name: p.name, sub, kind: p.name === capitalOf() ? f.T(['Capital', 'Capital']) : (kindPair ? f.T(kindPair) : '') }
        })
        .filter(r => { const k = r.name + '|' + r.sub; if (seen.has(k)) return false; seen.add(k); return true })
        .slice(0, 6)
      rows.value = mergeRows(localMatches(q.value.trim()), photonRows)
    } catch (e) { /* offline or aborted → free-text input still works */ }
  }, 160)
}
function capitalOf () {
  const caps = { Spain: 'Madrid', France: 'Paris', Germany: 'Berlin', Italy: 'Rome', Portugal: 'Lisbon', Ireland: 'Dublin', 'United Kingdom': 'London', 'United States': 'Washington', Netherlands: 'Amsterdam', Belgium: 'Brussels', Austria: 'Vienna', Mexico: 'Mexico City', Argentina: 'Buenos Aires' }
  return caps[f.answers.P11] || ''
}
function pick (r) { q.value = r.name; rows.value = []; open.value = false }
function go () { if (q.value.trim()) { f.answers.PCITY = q.value.trim(); f.next() } }
function skip () { f.answers.PCITY = ''; f.next() }

function onDocClick (e) { if (rootEl.value && !rootEl.value.contains(e.target)) open.value = false }
onMounted(() => document.addEventListener('click', onDocClick))
onUnmounted(() => { document.removeEventListener('click', onDocClick); clearTimeout(debounce); if (ctrl) ctrl.abort() })
</script>
