---
description: Visual + accessibility + responsive audit for the current phase's UI output.
---

# /ui-review

## Scope

Only UI files touched in the current phase. Do NOT regression-audit the whole app.

## Checklist

### Responsive (breakpoints 375, 768, 1024, 1440)

- [ ] No horizontal scroll at 375.
- [ ] Nav collapses before content overflows.
- [ ] Tap targets >= 44x44 at mobile.

### Accessibility

- [ ] Every interactive element keyboard-reachable.
- [ ] Focus ring visible on dark and light themes.
- [ ] Color contrast WCAG AA minimum.
- [ ] `aria-*` attributes present on custom widgets.
- [ ] `prefers-reduced-motion` respected.

### Visual hygiene

- [ ] No emoji as UI icons.
- [ ] No inline hex colors in components.
- [ ] Consistent spacing scale.
- [ ] Empty / loading / error states exist for async UI.

### Content

- [ ] Copy: active voice, <= 2 sentences per UI block.
- [ ] Error messages tell the user what to do next.

## Output

`.planning/phase-N/UI-REVIEW.md` with per-item verdict, screenshots (paths), and blocker / flag / pass.

## Next recommended

```
Next recommended
----------------
Surface : Cursor Agent (to apply fixes)
Mode    : default
Model   : Composer 2 (Cursor)
Why     : UI fixes are fast iteration; Composer 2 is purpose-built.
Session : ok
```
