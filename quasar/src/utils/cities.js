// Typeahead de ciudades compartido (funnel /preferences): lista local instantánea
// por país desde el primer carácter + geocoder Photon filtrado por país a partir de 2.
import { CCODE } from 'src/data/screens'

export const LOCAL_CITIES = {
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

export const normCity = s => (s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

export function localCityMatches (country, query) {
  const list = LOCAL_CITIES[country] || []
  const nq = normCity(query)
  return list.filter(c => normCity(c).startsWith(nq)).slice(0, 6)
}

// Local instantáneo + Photon (a partir de 2 caracteres), deduplicado. → [{name}]
export async function suggestCities (query, country, lang = 'en', signal = undefined) {
  const local = localCityMatches(country, query).map(name => ({ name }))
  const q = (query || '').trim()
  if (q.length < 2) return local
  try {
    const r = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(q)}&limit=10&lang=${lang}`, { signal })
    const j = await r.json()
    const cc = CCODE[country] || null
    const seen = new Set(local.map(x => normCity(x.name)))
    const photon = (j.features || [])
      .filter(ft => !cc || ft.properties.countrycode === cc)
      .filter(ft => ['city', 'town', 'village', 'borough', 'suburb', 'state', 'county'].includes(ft.properties.osm_value) || ft.properties.type === 'city')
      .map(ft => ({ name: ft.properties.name }))
      .filter(x => { const k = normCity(x.name); if (!x.name || seen.has(k)) return false; seen.add(k); return true })
    return [...local, ...photon].slice(0, 6)
  } catch (e) { return local }
}
