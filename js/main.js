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

        if (!themeButton || !themeIcon) {
            return;
        }

        document.body.classList.toggle("modo-claro", isLight);
        themeButton.setAttribute("aria-pressed", String(isLight));
        themeButton.setAttribute("aria-label", isLight ? "Cambiar a modo oscuro" : "Cambiar a modo claro");
        themeIcon.textContent = isLight ? "☀" : "☾";
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

        if (themeButton) {
            themeButton.addEventListener("click", () => this.toggleTheme());
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
