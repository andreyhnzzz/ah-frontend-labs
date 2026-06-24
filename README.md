# Enigma Essence — Landing Page

Landing page de perfumería premium. HTML5, CSS3 y Vanilla JS puros — sin frameworks.

**Cliente:** Enigma Essence · Ciudad Quesada, Costa Rica  
**Curso:** Programación en Ambiente Web I (ISW-521) · UTN · Prof. Bryan Chaves Salas

---

## Stack

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![WCAG 2.1](https://img.shields.io/badge/WCAG_2.1-AA-005A9C?style=for-the-badge)
![No Frameworks](https://img.shields.io/badge/Zero_Dependencies-100%25_Vanilla-22c55e?style=for-the-badge)

## Características

- Hero con layout de dos columnas y aislamiento de producto
- Galería horizontal con `scroll-snap-type: x mandatory` + drag-to-scroll en escritorio
- Bento grid responsivo (4 → 2 → 1 columna)
- Widget de accesibilidad: tamaño de texto, alto contraste, fuente legible, reducir movimiento — persiste en `localStorage`
- WCAG 2.1 AA: navegación por teclado, `aria-*`, `prefers-reduced-motion`
- Cumplimiento Ley N° 7600 (Costa Rica) y lineamientos CFIA

## Estructura

```
enigma-essence/
├── index.html
├── css/styles.css
├── js/main.js
└── img/
```

## Correr localmente

```bash
git clone https://github.com/andreyhnzzz/ah-frontend-labs.git
cd ah-frontend-labs
npx serve .
```

---

<sub>Built by <a href="https://github.com/andreyhnzzz">@andreyhnzzz</a> · UTN Costa Rica · 2026</sub>
