const UserPreferences = {
    KEYS: {
        THEME: "tema-perfumeria",
        LANGUAGE: "idioma-preferido",
        VISITED: "primera-visita"
    },

    THEMES: {
        DARK: "oscuro",
        LIGHT: "claro"
    },

    state: {
        theme: "oscuro",
        language: "es",
        isFirstVisit: true
    },

    init() {
        this.loadTheme();
        this.loadLanguage();
        this.checkFirstVisit();
        this.setupEventListeners();
        this.setupRevealAnimations();
        this.setupMagneticButtons();
        this.setupCarousel();
        this.setupFAQAnimations();
    },

    loadTheme() {
        const savedTheme = localStorage.getItem(this.KEYS.THEME);
        this.state.theme = savedTheme === this.THEMES.LIGHT ? this.THEMES.LIGHT : this.THEMES.DARK;
        this.applyTheme(this.state.theme);
    },

    applyTheme(theme) {
        const isLight = theme === this.THEMES.LIGHT;
        const themeButton = document.querySelector(".theme-toggle");
        const themeIcon = document.querySelector(".theme-toggle__icon");
        const themeSwitch = document.getElementById("theme-switch");

        document.body.classList.toggle("modo-claro", isLight);

        if (themeSwitch) {
            themeSwitch.checked = isLight;
            themeSwitch.setAttribute("aria-label", isLight ? "Cambiar a modo oscuro" : "Cambiar a modo claro");
        }

        if (themeButton) {
            themeButton.setAttribute("aria-pressed", String(isLight));
            themeButton.setAttribute("aria-label", isLight ? "Cambiar a modo oscuro" : "Cambiar a modo claro");
        }

        if (themeIcon) {
            themeIcon.textContent = isLight ? "sun" : "moon";
        }

        sessionStorage.setItem("tema-sesion-actual", theme);
    },
    toggleTheme() {
        this.state.theme = this.state.theme === this.THEMES.DARK ? this.THEMES.LIGHT : this.THEMES.DARK;
        localStorage.setItem(this.KEYS.THEME, this.state.theme);
        this.applyTheme(this.state.theme);
        this.announce(`Tema cambiado a modo ${this.state.theme}.`);
    },

    announce(message) {
        const liveRegion = document.getElementById("announcements");

        if (liveRegion) {
            liveRegion.textContent = "";
            window.setTimeout(() => {
                liveRegion.textContent = message;
            }, 50);
        }
    },

    loadLanguage() {
        const savedLanguage = localStorage.getItem(this.KEYS.LANGUAGE);

        if (savedLanguage) {
            this.state.language = savedLanguage;
            document.documentElement.lang = savedLanguage;
        }
    },

    checkFirstVisit() {
        const hasVisited = sessionStorage.getItem(this.KEYS.VISITED);
        this.state.isFirstVisit = !hasVisited;

        if (this.state.isFirstVisit) {
            sessionStorage.setItem(this.KEYS.VISITED, "true");
            console.log("Bienvenido a Enigma Essence. Esta es tu primera visita de la sesión.");
        }
    },

    setupEventListeners() {
        const themeButton = document.querySelector(".theme-toggle");
        const themeSwitch = document.getElementById("theme-switch");

        if (themeButton) {
            themeButton.addEventListener("click", () => this.toggleTheme());
        }

        if (themeSwitch) {
            themeSwitch.addEventListener("change", () => {
                this.state.theme = themeSwitch.checked ? this.THEMES.LIGHT : this.THEMES.DARK;
                localStorage.setItem(this.KEYS.THEME, this.state.theme);
                this.applyTheme(this.state.theme);
                this.announce(`Tema cambiado a modo ${this.state.theme}.`);
            });
        }
    },
    setupRevealAnimations() {
        const revealElements = document.querySelectorAll(".reveal");
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (prefersReducedMotion) {
            revealElements.forEach((element) => element.classList.add("is-visible"));
            return;
        }

        if ("IntersectionObserver" in window) {
            const revealObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.18,
                rootMargin: "0px 0px -8% 0px"
            });

            revealElements.forEach((element) => revealObserver.observe(element));
            return;
        }

        revealElements.forEach((element) => element.classList.add("is-visible"));
    },

    setupMagneticButtons() {
        const magneticButtons = document.querySelectorAll(".contact-link");
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const hasFinePointer = window.matchMedia("(pointer: fine)").matches;

        if (prefersReducedMotion || !hasFinePointer) {
            return;
        }

        magneticButtons.forEach((button) => {
            button.classList.add("is-magnetic");

            button.addEventListener("mousemove", (event) => {
                const rect = button.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const moveX = (event.clientX - centerX) * 0.08;
                const moveY = (event.clientY - centerY) * 0.18;

                button.style.setProperty("--magnetic-x", `${moveX}px`);
                button.style.setProperty("--magnetic-y", `${moveY}px`);
            });

            button.addEventListener("mouseleave", () => {
                button.style.setProperty("--magnetic-x", "0px");
                button.style.setProperty("--magnetic-y", "0px");
            });
        });
    },

    setupCarousel() {
        const carouselInner = document.getElementById("carousel-inner");

        if (!carouselInner) {
            return;
        }

        const images = [
            "img/frag-webp/1663335194-bleu-de-chanel-eau-de-toilette-spray-3-4fl-oz--packshot-default-107460-8848377315358.webp",
            "img/frag-webp/9857872822302.webp",
            "img/frag-webp/FAKHARGOLDLattafa-Photoroom-2024-12-23T184729.671.webp",
            "img/frag-webp/FAKHARGOLDLattafa-Photoroom_41.webp",
            "img/frag-webp/LATASADB.webp",
            "img/frag-webp/Perfumes-Hombre-Gentleman-Givenchy.webp",
            "img/frag-webp/Valentino-Uomo-Born-In-Roma-Intense-Aromatica-CR-454052296.webp",
            "img/frag-webp/nautica-voyage.webp",
            "img/frag-webp/rasasi-hawas-tropical-edp-100ml-hombre-unisex-7160424.webp",
            "img/frag-webp/rn-image_picker_lib_temp_2820dd9e-ca46-42fd-8486-6325e3a069f2.webp",
            "img/frag-webp/yves-saint-laurent-y-edp-perfume-perfume-cologne-767661.webp"
        ];

        carouselInner.textContent = "";
        carouselInner.style.setProperty("--quantity", images.length);

        images.forEach((src, index) => {
            const card = document.createElement("div");
            card.className = "card";
            card.style.setProperty("--index", index);

            const img = document.createElement("img");
            img.className = "img";
            img.src = src;
            img.alt = `Perfume ${index + 1} de la colección`;
            img.loading = "lazy";

            card.appendChild(img);
            carouselInner.appendChild(card);
        });
    },

    setupFAQAnimations() {
        const faqEntries = document.querySelectorAll(".faq-entry");

        if (faqEntries.length === 0) {
            return;
        }

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (prefersReducedMotion) {
            faqEntries.forEach((entry) => entry.classList.add("is-visible"));
            return;
        }

        if ("IntersectionObserver" in window) {
            const faqObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: "0px 0px -10% 0px"
            });

            faqEntries.forEach((entry) => faqObserver.observe(entry));
            return;
        }

        faqEntries.forEach((entry) => entry.classList.add("is-visible"));
    },

    compareStorageTypes() {
        console.group("Comparación de Web Storage");
        console.log("localStorage persiste después de cerrar el navegador.", {
            tema: localStorage.getItem(this.KEYS.THEME),
            idioma: localStorage.getItem(this.KEYS.LANGUAGE)
        });
        console.log("sessionStorage se elimina al cerrar la pestaña.", {
            temaSesion: sessionStorage.getItem("tema-sesion-actual"),
            primeraVisita: sessionStorage.getItem(this.KEYS.VISITED)
        });
        console.groupEnd();
    }
};

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => UserPreferences.init());
} else {
    UserPreferences.init();
}

window.userPreferences = UserPreferences;
