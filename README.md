# Enigma Essence — Premium Perfumery Landing Page

<div align="center">

  <img src="img/logo.svg" alt="Enigma Essence logo" width="90" />

  <br />

  *Responsive, accessible landing page for a local artisanal perfumery startup.*

  <br />

  [![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
  [![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
  [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
  [![WCAG 2.1](https://img.shields.io/badge/WCAG_2.1-Level_A-005A9C?style=for-the-badge)](https://www.w3.org/WAI/standards-guidelines/wcag/)
  [![No Frameworks](https://img.shields.io/badge/No_CSS_Frameworks-100%25_Vanilla-success?style=for-the-badge)](https://css-tricks.com/)

</div>

---

## Overview

**Client:** Local artisanal perfumery startup — Ciudad Quesada, Costa Rica

**Objective:** Design and build a high-conversion, fully responsive landing page communicating a premium black-and-gold brand identity. The page serves as the perfumery's primary digital touchpoint, funneling visitors toward direct contact via WhatsApp, Instagram, and TikTok — with no e-commerce overhead.

**[Live Demo →](#)** *(coming soon)*

---

## Visual & Interaction Design

The aesthetic is **luxury minimalism**: a near-black background, a warm gold accent palette, and generous whitespace. Every visual decision — from the Cormorant Garamond display typeface to the CSS clip-path diagonal section breaks — reinforces the premium positioning of the brand.

### Entrance Animations (Hero)

The above-the-fold experience features a **staggered entrance sequence** driven purely by CSS `@keyframes` with precise delays, so the heading, subtitle, and CTA button each emerge in order on page load. A vertically animated gold line beneath the hero content acts as a subtle scroll prompt.

### Scroll-Triggered Reveals

An `IntersectionObserver` watches every `.reveal` and `[data-reveal]` element. As content enters the viewport, each element transitions from its hidden state — some fading up, others sliding in from the left or right — using a `cubic-bezier(0.16, 1, 0.3, 1)` spring curve for a natural, physical feel.

### Scroll Progress Indicator

A 2px gradient bar, fixed at the very top of the viewport, fills from left to right as the user scrolls. It is updated in a `requestAnimationFrame`-debounced scroll listener for maximum smoothness.

### 3D Card Tilt

On desktop (pointer: fine), the four guarantee cards respond to `mousemove` with a live perspective tilt calculated from the cursor's offset from each card's center. On `mouseleave`, the card snaps back smoothly via CSS `transition`.

### Shimmer Sweep

Both the guarantee cards and the primary CTA buttons feature a `::before` / `::after` pseudo-element gradient that sweeps across the surface on hover — a polished micro-interaction achieved without any JavaScript.

### Magnetic Buttons

The contact links in the contact section apply a soft magnetic pull on hover: the element tracks the cursor using CSS custom properties (`--magnetic-x`, `--magnetic-y`) updated via `mousemove`, keeping the visual displacement subtle (8% horizontal, 18% vertical of the offset).

### CSS Parallax → JS Parallax

The hero background image scrolls at a reduced rate relative to the page using `requestAnimationFrame`-based parallax, replacing the initial CSS `translateZ` approach for more precise, performant control.

### FAQ Smooth Accordion

The native `<details>` element cannot be CSS-transitioned. The solution: the answer container uses `grid-template-rows: 0fr → 1fr` — a zero-overhead trick that lets CSS animate the row height smoothly. A small inline SVG chevron rotates 180° on open/close. JavaScript intercepts the default toggle to animate the closing direction as well.

### Custom Cursor

On pointer-fine devices, the default cursor is replaced with a small gold dot that scales and becomes semi-transparent over interactive elements (`a`, `button`, `summary`). Cursor position is tracked via `requestAnimationFrame` for smooth 60fps movement.

---

## Technical Highlights

| Area | Implementation |
|------|---------------|
| **Layout — Navigation** | CSS Flexbox (`space-between`, `align-items: center`) |
| **Layout — Cards** | CSS Grid (`repeat(auto-fit, minmax(220px, 1fr))`) |
| **Layout — Contact Hub** | CSS Flexbox (column, responsive) |
| **Responsiveness** | Three breakpoints: 1024px, 768px, 480px via `@media` |
| **Typography** | `Cormorant Garamond` (headings) + `Jost` (body) via Google Fonts |
| **Theme system** | CSS custom properties on `:root` and `body.modo-claro` |
| **Persistence** | `localStorage` — dark/light preference survives page reload |
| **Scroll animation** | `IntersectionObserver` API, `threshold: 0.18`, `rootMargin` offset |
| **Hero parallax** | `requestAnimationFrame`-throttled scroll listener |
| **3D tilt** | Per-card `mousemove` perspective transform calculation |
| **FAQ accordion** | `grid-template-rows` CSS trick + JS-controlled `open` attribute |
| **Animated gradient** | `@property` custom property (`--gold-angle`) animated with `@keyframes` |
| **Glassmorphism** | `backdrop-filter: blur(16px) saturate(140%)` with `@supports` fallback |
| **Section atmosphere** | CSS `clip-path: polygon()` diagonal cuts + SVG noise grain texture |
| **Ambient glows** | `radial-gradient` pseudo-elements per section |
| **Accessibility** | Full keyboard navigation, ARIA labels, `:focus` indicator, `alt` on all images |
| **Reduced motion** | Comprehensive `@media (prefers-reduced-motion: reduce)` block disabling all animations |

---

## Technologies & Tools

### Core Stack
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript_ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

### Dev Workflow
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)
![VS Code](https://img.shields.io/badge/VS_Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white)

### Design & Accessibility
![Responsive Design](https://img.shields.io/badge/Responsive_Design-Mobile_First-4CAF50?style=for-the-badge)
![WCAG 2.1](https://img.shields.io/badge/WCAG_2.1-Level_A-005A9C?style=for-the-badge)
![CSS Grid](https://img.shields.io/badge/CSS_Grid-FF6B6B?style=for-the-badge)
![Flexbox](https://img.shields.io/badge/Flexbox-4ECDC4?style=for-the-badge)
![Google Fonts](https://img.shields.io/badge/Google_Fonts-4285F4?style=for-the-badge&logo=google&logoColor=white)

### CSS Techniques
![CSS Custom Properties](https://img.shields.io/badge/CSS_Custom_Properties-1572B6?style=for-the-badge)
![CSS @property](https://img.shields.io/badge/@property_API-8B5CF6?style=for-the-badge)
![clip--path](https://img.shields.io/badge/clip--path-E34F26?style=for-the-badge)
![backdrop--filter](https://img.shields.io/badge/backdrop--filter-0EA5E9?style=for-the-badge)
![CSS Grid Trick](https://img.shields.io/badge/grid--template--rows_trick-FF6B6B?style=for-the-badge)

### JS APIs
![IntersectionObserver](https://img.shields.io/badge/IntersectionObserver-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![requestAnimationFrame](https://img.shields.io/badge/requestAnimationFrame-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![localStorage](https://img.shields.io/badge/localStorage-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![matchMedia](https://img.shields.io/badge/matchMedia-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## Accessibility

This project adheres to **WCAG 2.1 Level A** throughout:

- All images carry descriptive `alt` attributes; decorative images use `alt=""` with `aria-hidden="true"`.
- Interactive elements use `role`, `aria-label`, and `aria-pressed` where native semantics are insufficient.
- Color contrast ratio meets the 4.5:1 minimum for normal text in both dark and light modes.
- The entire page is navigable via keyboard (`Tab`, `Enter`, `Space`). The `:focus` outline is always visible.
- All CSS animations and JS-driven motion are conditionally disabled when the OS reports `prefers-reduced-motion: reduce`.

---

## File Structure

```
enigma-essence/
├── index.html          # Semantic HTML5 document
├── css/
│   └── styles.css      # All styling — CSS variables, layout, animations
├── js/
│   └── main.js         # Theme, scroll observer, parallax, tilt, FAQ, cursor
└── img/
    ├── logo.svg
    ├── banner.webp
    ├── flyer.webp
    ├── favico.ico
    └── icons/
        ├── whatsapp.svg
        ├── instagram.svg
        └── tiktok.svg
```

---

## Running Locally

No build tools, no dependencies, no `npm install`.

```bash
git clone https://github.com/andreyhnzzz/ah-frontend-labs.git
cd ah-frontend-labs
# Open index.html in your browser — or use any static server:
npx serve .
```

---

## Academic Context

This project was developed as **Laboratory #1** for the course *Programación en Ambiente Web I* (ISW-521) at Universidad Técnica Nacional (UTN), Costa Rica, under Prof. Bryan Chaves Salas. It accounts for 15% of the final grade and is evaluated in two equal phases: a code submission review and a live oral technical defense.

**Key constraint:** all styling must be implemented with pure CSS3 — no external CSS frameworks (Bootstrap, Tailwind, etc.) permitted.

---

## What I Practiced

- Structuring real-world UI with semantic HTML5 without reaching for divs as a default.
- Building complex, multi-breakpoint layouts using only Flexbox and CSS Grid.
- Achieving production-grade animation and interaction without any JavaScript library.
- Applying the `@property` API to animate CSS custom properties as first-class values.
- Using `IntersectionObserver` for performant, battery-friendly scroll effects.
- Implementing the `grid-template-rows: 0fr → 1fr` pattern for smooth disclosure animations.
- Thinking critically about when to use `localStorage` vs `sessionStorage` for state persistence.
- Auditing color contrast and keyboard flows as part of the development process, not as an afterthought.

---

<div align="center">
  <sub>Built with precision by <a href="https://github.com/andreyhnzzz">@andreyhnzzz</a> · UTN Costa Rica · 2026</sub>
</div>
