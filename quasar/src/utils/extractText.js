// Best-effort in-browser resume text extraction (PDF / DOCX / plain text).
// Returns '' when the format can't be read — callers fall back gracefully.
export async function extractText (file) {
  const name = (file.name || '').toLowerCase()
  try {
    if (/\.(txt|md|rtf)$/.test(name)) {
      return await file.text()
    }
    if (name.endsWith('.pdf')) {
      const pdfjs = await import('pdfjs-dist')
      const worker = (await import('pdfjs-dist/build/pdf.worker.min.mjs?url')).default
      pdfjs.GlobalWorkerOptions.workerSrc = worker
      const doc = await pdfjs.getDocument({ data: await file.arrayBuffer() }).promise
      let text = ''
      const pages = Math.min(doc.numPages, 4)
      for (let i = 1; i <= pages; i++) {
        const page = await doc.getPage(i)
        const content = await page.getTextContent()
        text += content.items.map(it => it.str).join(' ') + '\n'
      }
      return text
    }
    if (/\.docx$/.test(name)) {
      const mammoth = (await import('mammoth/mammoth.browser')).default
      const res = await mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() })
      return res.value || ''
    }
  } catch (e) {
    // unreadable file → caller falls back
  }
  return ''
}
