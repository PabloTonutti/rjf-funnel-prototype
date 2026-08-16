// Gráfica "miembros vs candidato medio" compartida entre la pantalla del funnel
// (ChartScreen, '55% of our members find a job within the 1st month') y el paywall.
// Coherente con el titular: la línea JobWinner pasa EXACTAMENTE por 55% en la
// semana 4 (= 1er mes), con pendiente suave.
export function membersChartSvg (f) {
  const M = [9, 24, 40, 55, 63, 71, 78], A = [2, 5, 7, 10, 20, 25, 27]
  const X = i => 52 + i * 44, Y = p => 198 - p * 1.7
  const line = (d, c) => `<polyline points="${d.map((p, i) => X(i) + ',' + Y(p)).join(' ')}" fill="none" stroke="${c}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>`
  const dots = (d, c) => d.map((p, i) => `<circle cx="${X(i)}" cy="${Y(p)}" r="3.5" fill="${c}" stroke="#fff" stroke-width="1.5"/>`).join('')
  let grid = '', ylab = ''
  for (let p = 0; p <= 100; p += 10) {
    grid += `<line x1="48" y1="${Y(p)}" x2="${X(6) + 8}" y2="${Y(p)}" stroke="#EDF1F7" stroke-width="1"/>`
    ylab += `<text x="41" y="${Y(p) + 3.5}" text-anchor="end" font-size="9.5" fill="#9AA5B5" font-family="Inter,sans-serif">${p}%</text>`
  }
  const w = f.lang === 'en' ? 'w' : 's'
  const xlab = M.map((_, i) => `<text x="${X(i)}" y="216" text-anchor="middle" font-size="10" fill="#9AA5B5" font-family="Inter,sans-serif">${i + 1}${w}</text>`).join('')
  const membersLbl = f.T(['JobWinner members', 'Miembros JobWinner'])
  const avgLbl = f.T(['Average candidate', 'Candidato medio'])
  return `<svg viewBox="0 0 360 226" style="width:100%;max-width:430px">
    ${grid}${ylab}${xlab}
    <line x1="48" y1="${Y(55)}" x2="${X(3)}" y2="${Y(55)}" stroke="#007AFF" stroke-width="1.5" stroke-dasharray="3 4" opacity=".5"/>
    <line x1="${X(3)}" y1="${Y(55)}" x2="${X(3)}" y2="${Y(0)}" stroke="#007AFF" stroke-width="1.5" stroke-dasharray="3 4" opacity=".5"/>
    ${line(A, '#DE8F6E')}${dots(A, '#DE8F6E')}
    ${line(M, '#007AFF')}${dots(M, '#007AFF')}
    <g><rect x="196" y="16" width="152" height="26" rx="13" fill="#007AFF"/><text x="272" y="33" text-anchor="middle" font-size="11.5" font-weight="700" fill="#fff" font-family="Inter,sans-serif">${membersLbl}</text></g>
    <g><rect x="204" y="118" width="144" height="26" rx="13" fill="#fff" stroke="#DE8F6E" stroke-width="1.5"/><text x="276" y="135" text-anchor="middle" font-size="11.5" font-weight="700" fill="#C06B45" font-family="Inter,sans-serif">${avgLbl}</text></g>
  </svg>`
}
