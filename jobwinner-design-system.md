# JobWinner design system — tokens & rule map

Extracted from jobwinner.ai + app.jobwinner.ai. The generator (`scripts/restyle.py`)
scopes everything to `.elementor-<PAGE_ID>` so multiple pages never collide.

## Tokens

```
--jw-blue:#007AFF   --jw-blue-hover:#0062D6   --jw-tint:#EAF3FD
--jw-ink:#02112D    --jw-slate:#656F83        --jw-terracotta:#DE8F6E
--jw-cloud:#F5F9FD  --jw-line:#E3E9F2
--jw-success:#88AB75  --jw-success-bg:#F3F7EE  --jw-gold:#F2C037
radius: button 10px, card 16px
shadow: 0 1px 2px rgba(2,17,45,.05), 0 8px 24px rgba(2,17,45,.05)
```

Fonts: **Plus Jakarta Sans** 700/800 for headings, **Inter** 400/600 for body.
Both loaded via a Google Fonts `@import` at the top of the injected block.

## Canonical sizes (kept identical across every page)

- Hero H1: 2.8rem desktop, 2.4rem ≤767. Hero subtitle: 1.25rem desktop, 1rem ≤767.
- Zigzag benefit H2: 2.4rem desktop, 1.9rem ≤767. Zigzag bullets: 1.2rem.
- Section H2 (generic): 38px, 32px ≤1024. Body text-editor: 17px.

These are forced with `!important` on the specific hero/zigzag element ids because the
cloned widgets carry their own inline typography (usually Inter) that would otherwise win
on specificity. Forcing them is what keeps titles the same size on every clone.

## Detection (why it's by pattern, not id)

All tool pages are clones of one template, so **section _titles are stable but element
ids differ**. The generator finds sections by their container `_title`: `Hero`,
`COMPANIES` (or `Prueba social`), `Beneficios`, `Precios`, `FAQ`, `CTA`. Inside them it
finds widgets by `widgetType` (`nested-tabs`, `nested-accordion`, `icon-list`, `heading`,
`image`, `button`, `icon-box`) and by content patterns:

- Zigzag main H2 = the last `heading` before each `icon-list` in document order (skips the
  small eyebrow heading), unioned with headings that contain `<strong>` or size ≥ 1.8rem.
- Zigzag screenshots = `image` widgets with height ≥ 250 outside Hero/COMPANIES.
- Pricing = the `nested-tabs`; plan cards = its tab children with a background; the
  Recommended card = the one with a gradient bg or a "Recommended" heading; prices =
  text-editors containing `dynamic-price`; periods = `/week|/month|...`; "50% off" text;
  old price = the `html` widget in a plan card.
- Secondary buttons = buttons that are direct children of a `Beneficios` `e-div-block`
  (the duplicate zigzag CTAs), any button whose text contains "demo", and non-Recommended
  plan buttons.

## Rule map (what gets styled)

| Target | Effect |
|---|---|
| h1/h2/h3 headings | Plus Jakarta Sans 800, ink color, tight tracking, `text-shadow:none` |
| p / text-editor / li | Inter, slate |
| hero section | white background (kills the gradient) |
| hero H1 / subtitle | canonical sizes above |
| hero rating block | hidden (`display:none`) — replaced by the two review badges |
| hero image | transparent background, no shadow |
| review badges (added) | Trustpilot desktop + mobile, forced onto their own flex line |
| COMPANIES heading | small uppercase slate eyebrow |
| buttons (primary) | blue fill, radius 10, weight 600, subtle shadow |
| secondary buttons | white, 1px blue border, tint hover |
| hero & final CTA button | trailing → arrow via `::after` |
| zigzag bullets | success-green check icons |
| zigzag images | 6px `#DFEBFF` border, radius 16, `#F9FAFC` letterbox |
| zigzag H2 / bullets | 2.4rem / 1.2rem |
| pricing tabs | segmented pill control |
| plan cards | white card + line border; Recommended = 2px blue border + glow |
| Recommended label | blue pill pinned to card top edge |
| price number | Plus Jakarta Sans 800, 40px |
| old price / 50% off | line-through muted / green chip |
| FAQ accordion | white card, no dark item borders, blue chevrons, PJS titles |
| CTA inner | blue rounded card, white text, white button |
| CTA section wrapper | white background (no gray) |
| icon-box grids | tinted rounded blue icon tile, PJS title |

If the design changes, edit these rules in `scripts/restyle.py::build_css` so every page
inherits it on the next regenerate — don't sprinkle per-page overrides.
