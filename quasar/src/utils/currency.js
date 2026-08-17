// Moneda según la ubicación del usuario: eurozona €, Reino Unido £, resto $.
// 1º el país elegido en el funnel; si aún no lo ha respondido (la pantalla de
// salario va antes que la de país), se estima por la región del navegador.
const EURO_COUNTRIES = ['Spain', 'France', 'Germany', 'Italy', 'Portugal', 'Netherlands', 'Belgium', 'Austria', 'Ireland', 'Finland', 'Greece', 'Slovakia', 'Slovenia', 'Lithuania', 'Latvia', 'Estonia', 'Luxembourg', 'Malta', 'Cyprus', 'Croatia']
const EURO_REGIONS = ['ES', 'FR', 'DE', 'IT', 'PT', 'NL', 'BE', 'AT', 'IE', 'FI', 'GR', 'SK', 'SI', 'LT', 'LV', 'EE', 'LU', 'MT', 'CY', 'HR']

export function currencySymbol (country) {
  if (country) {
    if (country === 'United Kingdom') return '£'
    return EURO_COUNTRIES.includes(country) ? '€' : '$'
  }
  const lang = (typeof navigator !== 'undefined' && navigator.language) || ''
  const region = (lang.split('-')[1] || '').toUpperCase()
  if (region === 'GB') return '£'
  if (EURO_REGIONS.includes(region)) return '€'
  return '$'
}
