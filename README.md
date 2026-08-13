# JobWinner Funnel

Onboarding/quiz funnel for [jobwinner.ai](https://jobwinner.ai) — Vue 3 + Quasar SPA, bilingual (EN/ES).

**Live:** https://pablotonutti.github.io/rjf-funnel-prototype/

## Structure

| Path | What it is |
|---|---|
| `quasar/` | The app (Vue 3 + Quasar). Source in `quasar/src`; screens defined in `src/data/screens.js`, one component per screen type in `src/components/screens/`. |
| `worker/` | Cloudflare Worker (`jobwinner-ai.jobwinner.workers.dev`). Proxies OpenAI (resume/profile analysis → job titles, industries, ATS score) and Renidly (`GET /li-profile?handle=…` → LinkedIn profile as JSON). API keys live as Worker secrets, never in the client. |
| `docs/` | Production build served by GitHub Pages. Regenerated from `quasar/dist/spa` on each deploy. |
| `rjf-funnel-spec.md` | Funnel spec (screens, flow, branching). |
| `jobwinner-design-system.md` / `jobwinner-section-patterns.md` | Design reference. |

## Develop

```bash
cd quasar
npm install
npx quasar dev   # http://localhost:8890
```

## Deploy

**Funnel (GitHub Pages):**

```bash
cd quasar && npx quasar build && cd ..
rm -rf docs/assets docs/index.html && cp -R quasar/dist/spa/. docs/
git add docs && git commit -m "Deploy" && git push
```

**Worker (Cloudflare):**

```bash
cd worker
npx wrangler deploy
# secrets (one-time): npx wrangler secret put OPENAI_API_KEY · npx wrangler secret put RENIDLY_API_KEY
```
