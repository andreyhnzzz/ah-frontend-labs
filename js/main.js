const themeButton = document.querySelector(".theme-toggle");
const themeIcon = document.querySelector(".theme-toggle__icon");
const storageKey = "tema-perfumeria";

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
