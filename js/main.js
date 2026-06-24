function announce(message) {
    const region = document.getElementById("announcements");
    if (!region) return;
    region.textContent = "";
    setTimeout(() => { region.textContent = message; }, 50);
}

function setupReveal() {
    const els = document.querySelectorAll(".reveal");
    if (!els.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        els.forEach(el => el.classList.add("is-visible"));
        return;
    }

    if (!("IntersectionObserver" in window)) {
        els.forEach(el => el.classList.add("is-visible"));
        return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });

    els.forEach(el => observer.observe(el));
}

function setupGallery() {
    const track = document.getElementById("gallery-track");
    if (!track) return;

    const brands = [
        {
            name: "Chanel",
            svg: `<svg viewBox="0 0 200 145" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <defs><clipPath id="ch-lo"><rect x="0" y="65" width="200" height="80"/></clipPath></defs>
  <path d="M112.9,77 A35,35 0 1 1 112.9,53 L100.7,57.5 A22,22 0 1 0 100.7,72.5 Z"/>
  <path d="M87.1,53 A35,35 0 1 1 87.1,77 L99.3,72.5 A22,22 0 1 0 99.3,57.5 Z"/>
  <path d="M112.9,77 A35,35 0 1 1 112.9,53 L100.7,57.5 A22,22 0 1 0 100.7,72.5 Z" clip-path="url(#ch-lo)"/>
  <text x="100" y="124" text-anchor="middle" font-family="Cormorant Garamond,Georgia,serif" font-size="13" letter-spacing="8">CHANEL</text>
</svg>`
        },
        {
            name: "YSL",
            svg: `<svg viewBox="0 0 200 165" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <rect x="55" y="8" width="90" height="144" fill="none" stroke="currentColor" stroke-width="2"/>
  <text x="100" y="62" text-anchor="middle" font-family="Cormorant Garamond,Georgia,serif" font-size="38" font-weight="700">Y</text>
  <text x="100" y="104" text-anchor="middle" font-family="Cormorant Garamond,Georgia,serif" font-size="38" font-weight="700">S</text>
  <text x="100" y="146" text-anchor="middle" font-family="Cormorant Garamond,Georgia,serif" font-size="38" font-weight="700">L</text>
</svg>`
        },
        {
            name: "Dior",
            svg: `<svg viewBox="0 0 200 90" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <text x="100" y="56" text-anchor="middle" font-family="Cormorant Garamond,Georgia,serif" font-size="40" letter-spacing="6" font-weight="300" font-style="italic">Dior</text>
  <line x1="48" y1="65" x2="152" y2="65" stroke="currentColor" stroke-width="0.4" opacity="0.3"/>
  <text x="100" y="79" text-anchor="middle" font-family="Jost,sans-serif" font-size="7" letter-spacing="3.5" opacity="0.35" font-weight="300">CHRISTIAN DIOR · PARIS</text>
</svg>`
        },
        {
            name: "Prada",
            svg: `<svg viewBox="0 0 200 118" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M100,7 L166,42 L166,76 L100,111 L34,76 L34,42 Z" fill="none" stroke="currentColor" stroke-width="1.8"/>
  <path d="M100,14 L158,46 L158,72 L100,104 L42,72 L42,46 Z" fill="none" stroke="currentColor" stroke-width="0.4" opacity="0.28"/>
  <text x="100" y="61" text-anchor="middle" font-family="Cormorant Garamond,Georgia,serif" font-size="20" letter-spacing="5">PRADA</text>
  <text x="100" y="76" text-anchor="middle" font-family="Jost,sans-serif" font-size="6.5" letter-spacing="3.5" opacity="0.4" font-weight="300">MILANO</text>
</svg>`
        },
        {
            name: "Versace",
            svg: `<svg viewBox="0 0 200 138" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <line x1="22" y1="17" x2="178" y2="17" stroke="currentColor" stroke-width="1.5"/>
  <line x1="22" y1="20" x2="178" y2="20" stroke="currentColor" stroke-width="0.4" opacity="0.4"/>
  <path d="M22,17 L22,32 M22,17 L38,17 M38,17 L38,28 L28,28 L28,17" fill="none" stroke="currentColor" stroke-width="0.8" opacity="0.5"/>
  <path d="M178,17 L178,32 M178,17 L162,17 M162,17 L162,28 L172,28 L172,17" fill="none" stroke="currentColor" stroke-width="0.8" opacity="0.5"/>
  <text x="100" y="92" text-anchor="middle" font-family="Cormorant Garamond,Georgia,serif" font-size="64" font-weight="500">V</text>
  <line x1="22" y1="102" x2="178" y2="102" stroke="currentColor" stroke-width="1.5"/>
  <line x1="22" y1="105" x2="178" y2="105" stroke="currentColor" stroke-width="0.4" opacity="0.4"/>
  <text x="100" y="125" text-anchor="middle" font-family="Cormorant Garamond,Georgia,serif" font-size="13.5" letter-spacing="7">VERSACE</text>
</svg>`
        },
        {
            name: "Givenchy",
            svg: `<svg viewBox="0 0 200 88" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <line x1="20" y1="22" x2="180" y2="22" stroke="currentColor" stroke-width="1.1"/>
  <line x1="20" y1="25" x2="180" y2="25" stroke="currentColor" stroke-width="0.3" opacity="0.4"/>
  <text x="100" y="54" text-anchor="middle" font-family="Cormorant Garamond,Georgia,serif" font-size="22" letter-spacing="7" font-weight="300">GIVENCHY</text>
  <line x1="20" y1="61" x2="180" y2="61" stroke="currentColor" stroke-width="1.1"/>
  <line x1="20" y1="64" x2="180" y2="64" stroke="currentColor" stroke-width="0.3" opacity="0.4"/>
  <text x="100" y="78" text-anchor="middle" font-family="Jost,sans-serif" font-size="7" letter-spacing="4" opacity="0.35" font-weight="300">PARIS</text>
</svg>`
        },
        {
            name: "Valentino",
            svg: `<svg viewBox="0 0 200 118" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M40,14 L100,98 L160,14 L144,14 L100,80 L56,14 Z"/>
  <text x="100" y="112" text-anchor="middle" font-family="Cormorant Garamond,Georgia,serif" font-size="12" letter-spacing="7">VALENTINO</text>
</svg>`
        },
        {
            name: "Giorgio Armani",
            svg: `<svg viewBox="0 0 220 125" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M106,50 C90,44 72,36 50,30 C62,38 65,46 62,55 C51,50 38,50 28,57 C42,53 58,56 72,60 L103,64 Z"/>
  <path d="M114,50 C130,44 148,36 170,30 C158,38 155,46 158,55 C169,50 182,50 192,57 C178,53 162,56 148,60 L117,64 Z"/>
  <ellipse cx="110" cy="55" rx="9" ry="18"/>
  <circle cx="114" cy="35" r="8"/>
  <path d="M122,33 L130,35 L122,37 Z"/>
  <circle cx="116" cy="33" r="1.8" fill="#0d0c0b"/>
  <path d="M105,73 L102,83 L110,78 L118,83 L115,73 Z"/>
  <text x="110" y="103" text-anchor="middle" font-family="Jost,sans-serif" font-size="7.5" letter-spacing="5.5" font-weight="300">GIORGIO ARMANI</text>
  <line x1="18" y1="108" x2="202" y2="108" stroke="currentColor" stroke-width="0.3" opacity="0.2"/>
</svg>`
        },
        {
            name: "Jean Paul Gaultier",
            svg: `<svg viewBox="0 0 200 138" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <rect x="12" y="9" width="176" height="120" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <rect x="18" y="15" width="164" height="108" fill="none" stroke="currentColor" stroke-width="0.4" opacity="0.4"/>
  <path d="M12,30 L28,30 M28,9 L28,30" fill="none" stroke="currentColor" stroke-width="1.2"/>
  <path d="M188,30 L172,30 M172,9 L172,30" fill="none" stroke="currentColor" stroke-width="1.2"/>
  <path d="M12,108 L28,108 M28,129 L28,108" fill="none" stroke="currentColor" stroke-width="1.2"/>
  <path d="M188,108 L172,108 M172,129 L172,108" fill="none" stroke="currentColor" stroke-width="1.2"/>
  <text x="100" y="79" text-anchor="middle" font-family="Cormorant Garamond,Georgia,serif" font-size="40" letter-spacing="5" font-weight="300">JPG</text>
  <text x="100" y="103" text-anchor="middle" font-family="Jost,sans-serif" font-size="6.5" letter-spacing="2" opacity="0.45" font-weight="300">JEAN PAUL GAULTIER</text>
</svg>`
        },
        {
            name: "Carolina Herrera",
            svg: `<svg viewBox="0 0 200 118" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <text x="66" y="85" text-anchor="middle" font-family="Cormorant Garamond,Georgia,serif" font-size="74" font-weight="300" font-style="italic">C</text>
  <text x="136" y="85" text-anchor="middle" font-family="Cormorant Garamond,Georgia,serif" font-size="74" font-weight="300" font-style="italic">H</text>
  <text x="100" y="110" text-anchor="middle" font-family="Jost,sans-serif" font-size="6.5" letter-spacing="2.5" opacity="0.4" font-weight="300">CAROLINA HERRERA</text>
</svg>`
        },
        {
            name: "Dolce &amp; Gabbana",
            svg: `<svg viewBox="0 0 200 118" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <text x="50" y="84" text-anchor="middle" font-family="Cormorant Garamond,Georgia,serif" font-size="62" font-weight="400" font-style="italic">D</text>
  <text x="102" y="76" text-anchor="middle" font-family="Cormorant Garamond,Georgia,serif" font-size="36" font-weight="300">&amp;</text>
  <text x="152" y="84" text-anchor="middle" font-family="Cormorant Garamond,Georgia,serif" font-size="62" font-weight="400" font-style="italic">G</text>
  <text x="100" y="108" text-anchor="middle" font-family="Jost,sans-serif" font-size="6.5" letter-spacing="2.5" opacity="0.4" font-weight="300">DOLCE &amp; GABBANA</text>
</svg>`
        },
        {
            name: "Paco Rabanne",
            svg: `<svg viewBox="0 0 200 98" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M100,8 L106,18 L100,28 L94,18 Z" opacity="0.5"/>
  <text x="100" y="54" text-anchor="middle" font-family="Jost,sans-serif" font-size="13" letter-spacing="7" font-weight="300">PACO</text>
  <line x1="48" y1="60" x2="152" y2="60" stroke="currentColor" stroke-width="0.4" opacity="0.25"/>
  <text x="100" y="77" text-anchor="middle" font-family="Jost,sans-serif" font-size="13" letter-spacing="5.5" font-weight="300">RABANNE</text>
  <text x="100" y="92" text-anchor="middle" font-family="Jost,sans-serif" font-size="6.5" letter-spacing="3.5" opacity="0.35" font-weight="300">PARIS</text>
</svg>`
        },
        {
            name: "Lattafa",
            svg: `<svg viewBox="0 0 200 88" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <line x1="22" y1="20" x2="84" y2="20" stroke="currentColor" stroke-width="0.7" opacity="0.5"/>
  <line x1="116" y1="20" x2="178" y2="20" stroke="currentColor" stroke-width="0.7" opacity="0.5"/>
  <path d="M100,14 L104,20 L100,26 L96,20 Z"/>
  <text x="100" y="52" text-anchor="middle" font-family="Cormorant Garamond,Georgia,serif" font-size="22" letter-spacing="6" font-weight="300">LATTAFA</text>
  <line x1="62" y1="60" x2="138" y2="60" stroke="currentColor" stroke-width="0.35" opacity="0.25"/>
  <text x="100" y="74" text-anchor="middle" font-family="Jost,sans-serif" font-size="7" letter-spacing="3.5" opacity="0.35" font-weight="300">PERFUMES · DUBAI</text>
</svg>`
        },
        {
            name: "French Avenue",
            svg: `<svg viewBox="0 0 200 98" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <line x1="20" y1="17" x2="84" y2="17" stroke="currentColor" stroke-width="1.2"/>
  <line x1="20" y1="20" x2="84" y2="20" stroke="currentColor" stroke-width="0.4" opacity="0.4"/>
  <path d="M100,13 L105,18 L100,23 L95,18 Z"/>
  <line x1="116" y1="17" x2="180" y2="17" stroke="currentColor" stroke-width="1.2"/>
  <line x1="116" y1="20" x2="180" y2="20" stroke="currentColor" stroke-width="0.4" opacity="0.4"/>
  <text x="100" y="46" text-anchor="middle" font-family="Cormorant Garamond,Georgia,serif" font-size="15" letter-spacing="5">FRENCH</text>
  <text x="100" y="64" text-anchor="middle" font-family="Cormorant Garamond,Georgia,serif" font-size="15" letter-spacing="5">AVENUE</text>
  <line x1="20" y1="76" x2="84" y2="76" stroke="currentColor" stroke-width="1.2"/>
  <line x1="20" y1="79" x2="84" y2="79" stroke="currentColor" stroke-width="0.4" opacity="0.4"/>
  <path d="M100,72 L105,77 L100,82 L95,77 Z"/>
  <line x1="116" y1="76" x2="180" y2="76" stroke="currentColor" stroke-width="1.2"/>
  <line x1="116" y1="79" x2="180" y2="79" stroke="currentColor" stroke-width="0.4" opacity="0.4"/>
</svg>`
        },
        {
            name: "Afnan",
            svg: `<svg viewBox="0 0 200 88" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <text x="100" y="52" text-anchor="middle" font-family="Cormorant Garamond,Georgia,serif" font-size="32" letter-spacing="9" font-weight="300">AFNAN</text>
  <line x1="38" y1="60" x2="86" y2="60" stroke="currentColor" stroke-width="0.4" opacity="0.25"/>
  <path d="M96,57 L100,61 L104,57 L100,64 Z" opacity="0.4"/>
  <line x1="114" y1="60" x2="162" y2="60" stroke="currentColor" stroke-width="0.4" opacity="0.25"/>
  <text x="100" y="76" text-anchor="middle" font-family="Jost,sans-serif" font-size="7" letter-spacing="4" opacity="0.35" font-weight="300">PERFUMES</text>
</svg>`
        },
        {
            name: "Armaf",
            svg: `<svg viewBox="0 0 200 112" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M100,8 L122,17 L122,46 Q122,66 100,76 Q78,66 78,46 L78,17 Z" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <path d="M100,15 L117,23 L117,45 Q117,62 100,70 Q83,62 83,45 L83,23 Z" fill="none" stroke="currentColor" stroke-width="0.4" opacity="0.28"/>
  <text x="100" y="54" text-anchor="middle" font-family="Cormorant Garamond,Georgia,serif" font-size="24" font-weight="500">A</text>
  <text x="100" y="93" text-anchor="middle" font-family="Cormorant Garamond,Georgia,serif" font-size="18" letter-spacing="6">ARMAF</text>
  <text x="100" y="106" text-anchor="middle" font-family="Jost,sans-serif" font-size="6.5" letter-spacing="3" opacity="0.35" font-weight="300">DUBAI · UAE</text>
</svg>`
        },
    ];

    brands.forEach(({ name, svg }) => {
        const item = document.createElement("article");
        item.className = "gallery-item gallery-item--brand";
        item.setAttribute("role", "listitem");
        item.innerHTML = `<div class="brand-logo" aria-hidden="true">${svg}</div><span class="brand-name">${name}</span>`;
        track.appendChild(item);
    });

    /* ── drag-to-scroll con pointer events ── */
    let dragging   = false;
    let startX     = 0;
    let originLeft = 0;
    let moved      = false;          /* distingue click de arrastre */
    const SNAP_PROP = "scroll-snap-type";

    function dragStart(e) {
        /* solo boton primario del mouse; ignorar touch (touch usa scroll nativo) */
        if (e.pointerType === "touch") return;
        dragging   = true;
        moved      = false;
        startX     = e.clientX;
        originLeft = track.scrollLeft;

        track.setPointerCapture(e.pointerId);
        track.style.cursor = "grabbing";
        /* desactiva snap durante el arrastre para scroll fluido */
        track.style.scrollSnapType = "none";
        /* previene seleccion de texto e imagenes */
        track.style.userSelect = "none";
    }

    function dragMove(e) {
        if (!dragging) return;
        const delta = startX - e.clientX;
        if (Math.abs(delta) > 4) moved = true;
        track.scrollLeft = originLeft + delta;
    }

    function dragEnd(e) {
        if (!dragging) return;
        dragging = false;
        track.style.cursor = "";
        track.style.userSelect = "";

        /* reactiva snap: el navegador hace el snap magnetico al valor mas cercano */
        track.style.scrollSnapType = "";

        /* si no hubo movimiento real, deja propagar el click normalmente */
        if (!moved) return;
        /* absorbe el click para que no dispare links dentro de las tarjetas */
        track.addEventListener("click", e => e.stopPropagation(), { once: true, capture: true });
    }

    track.addEventListener("pointerdown",  dragStart);
    track.addEventListener("pointermove",  dragMove);
    track.addEventListener("pointerup",    dragEnd);
    track.addEventListener("pointerleave", dragEnd);
}

const A11y = {
    KEYS: {
        HIGH_CONTRAST:   "a11y-high-contrast",
        REDUCE_MOTION:   "a11y-reduce-motion",
        FOCUS_ENHANCE:   "a11y-focus-enhance",
        DYSLEXIC:        "a11y-dyslexic",
        UNDERLINE_LINKS: "a11y-underline-links",
        TEXT_SCALE:      "a11y-text-scale",
    },

    state: {
        isOpen: false, textScale: 1,
        highContrast: false, reduceMotion: false,
        focusEnhance: false, dyslexic: false, underlineLinks: false,
    },

    init() {
        this.load();
        this.apply();
        this.wire();
    },

    load() {
        const get = k => localStorage.getItem(k);
        this.state.textScale     = parseFloat(get(this.KEYS.TEXT_SCALE)) || 1;
        this.state.highContrast  = get(this.KEYS.HIGH_CONTRAST)   === "true";
        this.state.reduceMotion  = get(this.KEYS.REDUCE_MOTION)   === "true";
        this.state.focusEnhance  = get(this.KEYS.FOCUS_ENHANCE)   === "true";
        this.state.dyslexic      = get(this.KEYS.DYSLEXIC)        === "true";
        this.state.underlineLinks = get(this.KEYS.UNDERLINE_LINKS) === "true";
    },

    apply() {
        const s = this.state;
        document.documentElement.style.setProperty("--a11y-text-scale", s.textScale);
        document.body.classList.toggle("a11y-high-contrast",  s.highContrast);
        document.body.classList.toggle("a11y-reduce-motion",  s.reduceMotion);
        document.body.classList.toggle("a11y-focus-enhance",  s.focusEnhance);
        document.body.classList.toggle("a11y-dyslexic",       s.dyslexic);
        document.body.classList.toggle("a11y-underline-links", s.underlineLinks);
        this.sync();
    },

    wire() {
        const toggle = document.getElementById("a11y-toggle");
        const close  = document.getElementById("a11y-close");
        if (!toggle) return;

        toggle.addEventListener("click", () => this.state.isOpen ? this.close() : this.open());
        close?.addEventListener("click",  () => this.close());

        document.addEventListener("keydown", e => {
            if (e.key === "Escape" && this.state.isOpen) this.close();
        });
        document.addEventListener("click", e => {
            const w = document.getElementById("a11y-widget");
            if (this.state.isOpen && w && !w.contains(e.target)) this.close();
        });

        document.getElementById("a11y-text-increase")?.addEventListener("click", () => this.scale(0.1));
        document.getElementById("a11y-text-decrease")?.addEventListener("click", () => this.scale(-0.1));
        document.getElementById("a11y-text-reset-size")?.addEventListener("click", () => this.setScale(1));

        [
            { id: "a11y-high-contrast",   key: "highContrast",   sk: this.KEYS.HIGH_CONTRAST,   label: "Alto contraste"     },
            { id: "a11y-reduce-motion",   key: "reduceMotion",   sk: this.KEYS.REDUCE_MOTION,   label: "Reducir movimiento" },
            { id: "a11y-focus-enhance",   key: "focusEnhance",   sk: this.KEYS.FOCUS_ENHANCE,   label: "Resaltar foco"      },
            { id: "a11y-dyslexic",        key: "dyslexic",       sk: this.KEYS.DYSLEXIC,        label: "Fuente legible"     },
            { id: "a11y-underline-links", key: "underlineLinks", sk: this.KEYS.UNDERLINE_LINKS, label: "Subrayar enlaces"   },
        ].forEach(({ id, key, sk, label }) => {
            document.getElementById(id)?.addEventListener("click", () => {
                this.state[key] = !this.state[key];
                localStorage.setItem(sk, this.state[key]);
                this.apply();
                announce(`${label} ${this.state[key] ? "activado" : "desactivado"}.`);
            });
        });

        document.getElementById("a11y-reset")?.addEventListener("click", () => this.reset());
    },

    scale(delta) {
        this.setScale(parseFloat(Math.min(1.4, Math.max(0.8, this.state.textScale + delta)).toFixed(1)));
    },

    setScale(v) {
        this.state.textScale = v;
        localStorage.setItem(this.KEYS.TEXT_SCALE, v);
        document.documentElement.style.setProperty("--a11y-text-scale", v);
        announce(`Tamano de texto: ${Math.round(v * 100)}%.`);
        this.sync();
    },

    open() {
        this.state.isOpen = true;
        document.getElementById("a11y-toggle")?.setAttribute("aria-expanded", "true");
        const panel = document.getElementById("a11y-panel");
        panel?.removeAttribute("hidden");
        setTimeout(() => document.getElementById("a11y-close")?.focus(), 60);
    },

    close() {
        this.state.isOpen = false;
        document.getElementById("a11y-toggle")?.setAttribute("aria-expanded", "false");
        document.getElementById("a11y-panel")?.setAttribute("hidden", "");
        document.getElementById("a11y-toggle")?.focus();
    },

    sync() {
        const map = {
            "a11y-high-contrast":  this.state.highContrast,
            "a11y-reduce-motion":  this.state.reduceMotion,
            "a11y-focus-enhance":  this.state.focusEnhance,
            "a11y-dyslexic":       this.state.dyslexic,
            "a11y-underline-links": this.state.underlineLinks,
        };
        Object.entries(map).forEach(([id, active]) => {
            const btn = document.getElementById(id);
            if (!btn) return;
            btn.setAttribute("aria-pressed", String(active));
            btn.classList.toggle("is-active", active);
        });
        document.getElementById("a11y-text-reset-size")?.setAttribute(
            "aria-label",
            `Restablecer tamano de texto (actual: ${Math.round(this.state.textScale * 100)}%)`
        );
    },

    reset() {
        Object.values(this.KEYS).forEach(k => localStorage.removeItem(k));
        Object.assign(this.state, {
            textScale: 1, highContrast: false, reduceMotion: false,
            focusEnhance: false, dyslexic: false, underlineLinks: false,
        });
        document.documentElement.style.removeProperty("--a11y-text-scale");
        this.apply();
        announce("Opciones de accesibilidad restablecidas.");
    },
};

function setupFAQ() {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    document.querySelectorAll(".faq-item").forEach(details => {
        const summary = details.querySelector("summary");
        const body    = details.querySelector(".faq-item__body");
        if (!summary || !body) return;

        summary.addEventListener("click", e => {
            e.preventDefault();

            if (reduced) {
                details.open = !details.open;
                return;
            }

            if (details.open) {
                /* cierre: scrollHeight -> 0 */
                body.style.height   = body.scrollHeight + "px";
                body.style.opacity  = "1";
                body.style.overflow = "hidden";

                requestAnimationFrame(() => {
                    body.style.transition = "height 0.38s cubic-bezier(0.4,0,0.2,1), opacity 0.28s ease";
                    body.style.height     = "0";
                    body.style.opacity    = "0";
                });

                body.addEventListener("transitionend", function handler(ev) {
                    if (ev.propertyName !== "height") return;
                    details.open       = false;
                    body.style.cssText = "";
                    body.removeEventListener("transitionend", handler);
                });
            } else {
                /* apertura: 0 -> scrollHeight */
                details.open       = true;
                const h            = body.scrollHeight;
                body.style.cssText = "height:0;opacity:0;overflow:hidden";

                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        body.style.transition = "height 0.38s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease";
                        body.style.height     = h + "px";
                        body.style.opacity    = "1";
                    });
                });

                body.addEventListener("transitionend", function handler(ev) {
                    if (ev.propertyName !== "height") return;
                    body.style.cssText = "";
                    body.removeEventListener("transitionend", handler);
                });
            }
        });
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}

function init() {
    setupReveal();
    setupGallery();
    setupFAQ();
    A11y.init();
}
