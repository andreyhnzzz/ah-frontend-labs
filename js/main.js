const themeButton = document.querySelector(".theme-toggle");
const themeIcon = document.querySelector(".theme-toggle__icon");
const revealElements = document.querySelectorAll(".reveal");
const magneticButtons = document.querySelectorAll(".contact-link");
const storageKey = "tema-perfumeria";
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function applyTheme(theme) {
    const isLight = theme === "claro";

    document.body.classList.toggle("modo-claro", isLight);
    themeButton.setAttribute("aria-pressed", String(isLight));
    themeButton.setAttribute("aria-label", isLight ? "Cambiar a modo oscuro" : "Cambiar a modo claro");
    themeIcon.textContent = isLight ? "☀" : "☾";
}

const savedTheme = localStorage.getItem(storageKey);
applyTheme(savedTheme === "claro" ? "claro" : "oscuro");

themeButton.addEventListener("click", () => {
    const nextTheme = document.body.classList.contains("modo-claro") ? "oscuro" : "claro";

    localStorage.setItem(storageKey, nextTheme);
    applyTheme(nextTheme);
});

if ("IntersectionObserver" in window && !prefersReducedMotion) {
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
} else {
    revealElements.forEach((element) => element.classList.add("is-visible"));
}

if (!prefersReducedMotion && window.matchMedia("(pointer: fine)").matches) {
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
}
