document.addEventListener("DOMContentLoaded", () => {
    const langSelect = document.getElementById("langSwitch");
    if (!langSelect) return;

    // Retrieve saved language from localStorage or default to 'es'
    const savedLang = localStorage.getItem("userLang") || "es";
    langSelect.value = savedLang;

    // Apply translations on load if the selected language is not Spanish
    if (savedLang !== "es") {
        applyLanguage(savedLang);
    }

    // Add event listener to the switch selector
    langSelect.addEventListener("change", (e) => {
        const selected = e.target.value;
        localStorage.setItem("userLang", selected);
        applyLanguage(selected);
    });
});

function applyLanguage(lang) {
    // Find all elements looking for translations
    const elements = document.querySelectorAll("[data-en]");
    
    elements.forEach(el => {
        // If 'data-es' is not set, meaning it's the first time translating from original Spanish
        if (!el.hasAttribute("data-es")) {
            // Save the original Spanish HTML to data-es
            el.setAttribute("data-es", el.innerHTML);
        }

        // Apply the correct translation dynamically
        if (lang === "en") {
            el.innerHTML = el.getAttribute("data-en");
        } else {
            // Revert to original Spanish if "es" is chosen
            el.innerHTML = el.getAttribute("data-es");
        }
    });

    // Handle placehoders explicitly (for inputs if any exist later)
    const placeholders = document.querySelectorAll("[data-placeholder-en]");
    placeholders.forEach(el => {
        if (!el.hasAttribute("data-placeholder-es")) {
            el.setAttribute("data-placeholder-es", el.getAttribute("placeholder") || "");
        }
        if (lang === "en") {
            el.setAttribute("placeholder", el.getAttribute("data-placeholder-en"));
        } else {
            el.setAttribute("placeholder", el.getAttribute("data-placeholder-es"));
        }
    });
}
