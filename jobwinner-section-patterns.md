# Section patterns & clone helper

All tool pages share one lineage, so the safest way to add a section is to **clone a real
one from a page that already has it** and swap the text. Cloning preserves structure and
inherits the generator's styling.

## Clone helper — reassign every id

When you deep-copy a subtree you must give every nested element a fresh unique id, or
Elementor breaks on duplicate ids.

```python
import copy, random
def uid(existing):
    while True:
        i = '%07x' % random.randint(0x1000000, 0xfffffff)
        if i not in existing:
            existing.add(i); return i

def clone(node, existing):
    n = copy.deepcopy(node)
    def re_id(e):
        if isinstance(e, dict):
            if 'id' in e: e['id'] = uid(existing)
            for c in e.get('elements', []) or []: re_id(c)
    re_id(n); return n
# seed `existing` with every id already present in the target page (and in the source).
```

## Zigzag row (image + h2 + 3 bullets)

A `Beneficios` section is a container whose children are `e-div-block` rows. Two layouts
alternate: **text-left** `e-div-block[ container[heading, icon-list, button], image, button ]`
and **image-left** `e-div-block[ button, image, container[heading, icon-list, button] ]`.

To add rows: clone an existing `e-div-block`, then inside the clone set the first
`heading.settings.title` (wrap the emphasized copy in `<strong>`), rewrite the
`icon-list.settings.icon_list[].text` (keep 3 items to match the source), and blank the
image with `settings.image = {'url':'','id':''}` so the user drops in a real screenshot.
Append the clone to the `Beneficios` container's `elements`. Alternate text-left / image-left
sources to keep the zigzag rhythm. The generator styles them automatically (they're inside
`Beneficios`).

Screenshot sizing that matches the design: image widget `height 400px`,
`_element_custom_width ~44%`, `object-fit scale-down`. The generator supplies the blue
border + `#F9FAFC` letterbox.

## Icon-box grid (1-2-3 steps and "why" grids)

Clone a grid section like ats-checker's "Contacto" (`heading + intro text + N icon-boxes`).
Each `icon-box` has:
```
settings.title_text          "1. Set up your interview"
settings.description_text     "Pick the role or paste the job description..."
settings.selected_icon        {"value":"far fa-file-lines","library":"fa-regular"}
```
Set the section heading, the intro paragraph, and each box; delete extra boxes if you need
fewer (e.g. 3 for steps, 6 for a why-grid). The generator gives icon-boxes a tinted rounded
blue icon tile and Plus Jakarta Sans titles.

For a numbered 1-2-3 steps section, prefix each `title_text` with "1.", "2.", "3." and pick
a topical icon per step (e.g. file → microphone → chart).

## Placement

Typical order: Hero, COMPANIES, **steps (Como empezar)**, feature sections, **Beneficios
(zigzag rows)**, **why-grid (Beneficios extra)**, Precios, FAQ, CTA, `__faq_schema__`.
Insert new top-level sections into the section array at the index you want (e.g. steps
right after `COMPANIES`, why-grid right before `Precios`). Leave `__faq_schema__` last —
it's the FAQ rich-results JSON-LD and must stay.

## Editing existing copy

Direct string replace on the decoded `_elementor_data` string is the most robust way to
change one phrase or wrap a word in an `<a>` link (structural walks can miss items nested
in atomic widgets). Replace on the decoded string, then re-embed and push:
```python
s = meta['_elementor_data']                       # decoded JSON string of the array
s = s.replace('Interview Preparation',
              '<a href="https://jobwinner.ai/tools/interview-preparation/">Interview Preparation</a>')
# push {"meta":{"_elementor_data": s}}  (json.dump escapes the inner quotes)
```
