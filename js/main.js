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

    const images = [
        { src: "img/frag-webp/1663335194-bleu-de-chanel-eau-de-toilette-spray-3-4fl-oz--packshot-default-107460-8848377315358.webp", alt: "Bleu de Chanel Eau de Toilette" },
        { src: "img/frag-webp/9857872822302.webp",                                                                                  alt: "Fragancia premium de la coleccion" },
        { src: "img/frag-webp/FAKHARGOLDLattafa-Photoroom-2024-12-23T184729.671.webp",                                              alt: "Fakhar Gold de Lattafa" },
        { src: "img/frag-webp/FAKHARGOLDLattafa-Photoroom_41.webp",                                                                alt: "Fakhar Gold Lattafa variante" },
        { src: "img/frag-webp/LATASADB.webp",                                                                                       alt: "Lattafa coleccion arabiga" },
        { src: "img/frag-webp/Perfumes-Hombre-Gentleman-Givenchy.webp",                                                             alt: "Gentleman de Givenchy" },
        { src: "img/frag-webp/Valentino-Uomo-Born-In-Roma-Intense-Aromatica-CR-454052296.webp",                                     alt: "Valentino Uomo Born In Roma Intense" },
        { src: "img/frag-webp/nautica-voyage.webp",                                                                                 alt: "Nautica Voyage" },
        { src: "img/frag-webp/rasasi-hawas-tropical-edp-100ml-hombre-unisex-7160424.webp",                                          alt: "Rasasi Hawas Tropical EDP" },
        { src: "img/frag-webp/rn-image_picker_lib_temp_2820dd9e-ca46-42fd-8486-6325e3a069f2.webp",                                  alt: "Fragancia exclusiva de la coleccion" },
        { src: "img/frag-webp/yves-saint-laurent-y-edp-perfume-perfume-cologne-767661.webp",                                        alt: "YSL Y Eau de Parfum" },
    ];

    images.forEach(({ src, alt }) => {
        const item = document.createElement("div");
        item.className = "gallery-item";

        const img = document.createElement("img");
        img.src = src;
        img.alt = alt;
        img.loading = "lazy";
        img.width = 260;
        img.height = 347;
        /* stop drag from picking up the image as a ghost */
        img.draggable = false;

        item.appendChild(img);
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

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}

function init() {
    setupReveal();
    setupGallery();
    A11y.init();
}
