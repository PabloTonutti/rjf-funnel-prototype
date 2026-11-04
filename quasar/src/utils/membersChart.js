// Gráfica "miembros vs candidato medio" compartida entre la pantalla del funnel
// (ChartScreen P3b/P3bR, '65% of our members land a job within the first 3 months') y el paywall.
// Coherente con el titular: la línea JobWinner pasa EXACTAMENTE por 65% en el
// mes 3, con líneas guía punteadas en ese punto. Eje X en meses (1m…6m).
export function membersChartSvg (f, maxWidth = 430) {
  // VALORES PROVISIONALES hasta tener datos reales. Solo el 65% en el mes 3 (M[2]) es el dato del titular.
  const M = [22, 45, 65, 76, 83, 88] // miembros JobWinner
  const A = [6, 16, 24, 29, 33, 36] // candidato medio: curva como M y 24% en el mes 3 (brecha 65 vs 24 en el punto del titular)
  const K = 2 // índice del mes 3
  const last = M.length - 1
  const X = i => 52 + i * 52, Y = p => 198 - p * 1.7
  const line = (d, c) => `<polyline points="${d.map((p, i) => X(i) + ',' + Y(p)).join(' ')}" fill="none" stroke="${c}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>`
  const dots = (d, c) => d.map((p, i) => `<circle cx="${X(i)}" cy="${Y(p)}" r="3.5" fill="${c}" stroke="#fff" stroke-width="1.5"/>`).join('')
  let grid = '', ylab = ''
  for (let p = 0; p <= 100; p += 10) {
    grid += `<line x1="48" y1="${Y(p)}" x2="${X(last) + 8}" y2="${Y(p)}" stroke="#EDF1F7" stroke-width="1"/>`
    ylab += `<text x="41" y="${Y(p) + 3.5}" text-anchor="end" font-size="9.5" fill="#9AA5B5" font-family="Inter,sans-serif">${p}%</text>`
  }
  const xlab = M.map((_, i) => `<text x="${X(i)}" y="216" text-anchor="middle" font-size="10" fill="#9AA5B5" font-family="Inter,sans-serif">${i + 1}m</text>`).join('')
  const membersLbl = f.T(['JobWinner members', 'Miembros JobWinner'])
  const avgLbl = f.T(['Average candidate', 'Candidato medio'])
  // Etiquetas: miembros arriba-izquierda (encima del tramo de subida), candidato medio debajo de su línea, a la derecha.
  return `<svg viewBox="0 0 360 226" style="width:100%;max-width:${maxWidth}px">
    ${grid}${ylab}${xlab}
    <line x1="48" y1="${Y(M[K])}" x2="${X(K)}" y2="${Y(M[K])}" stroke="#007AFF" stroke-width="1.5" stroke-dasharray="3 4" opacity=".5"/>
    <line x1="${X(K)}" y1="${Y(M[K])}" x2="${X(K)}" y2="${Y(0)}" stroke="#007AFF" stroke-width="1.5" stroke-dasharray="3 4" opacity=".5"/>
    ${line(A, '#DE8F6E')}${dots(A, '#DE8F6E')}
    ${line(M, '#007AFF')}${dots(M, '#007AFF')}
    <g><rect x="56" y="30" width="152" height="26" rx="13" fill="#007AFF"/><text x="132" y="47" text-anchor="middle" font-size="11.5" font-weight="700" fill="#fff" font-family="Inter,sans-serif">${membersLbl}</text></g>
    <g><rect x="212" y="158" width="136" height="26" rx="13" fill="#fff" stroke="#DE8F6E" stroke-width="1.5"/><text x="280" y="175" text-anchor="middle" font-size="11.5" font-weight="700" fill="#C06B45" font-family="Inter,sans-serif">${avgLbl}</text></g>
  </svg>`
}
