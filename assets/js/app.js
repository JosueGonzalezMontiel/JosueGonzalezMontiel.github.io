(() => {
    const routes = {
        "/inicio": "view-inicio",
        "/proyectos": "view-proyectos"
    };

    function normalizeRoute(hash) {
        if (!hash) return "/inicio";
        const raw = hash.startsWith("#") ? hash.slice(1) : hash;
        const path = raw.startsWith("/") ? raw : `/${raw}`;
        return routes[path] ? path : "/inicio";
    }

    function setActiveView(route) {
        Object.entries(routes).forEach(([r, id]) => {
            const el = document.getElementById(id);
            if (!el) return;
            if (r === route) {
                el.hidden = false;
                el.classList.add("is-active");
            } else {
                el.hidden = true;
                el.classList.remove("is-active");
            }
        });

        document.querySelectorAll("[data-nav]").forEach((a) => {
            const isActive = a.getAttribute("data-nav") === route.replace("/", "");
            if (isActive) {
                a.classList.add("is-active");
                a.setAttribute("aria-current", "page");
            } else {
                a.classList.remove("is-active");
                a.removeAttribute("aria-current");
            }
        });
    }

    function closeMobileNav() {
        const nav = document.getElementById("navbarNav");
        if (!nav) return;
        if (!nav.classList.contains("show")) return;
        const collapse = bootstrap.Collapse.getOrCreateInstance(nav);
        collapse.hide();
    }

    function onRouteChange() {
        const route = normalizeRoute(location.hash);
        setActiveView(route);
        closeMobileNav();
    }

    document.addEventListener("click", (e) => {
        const a = e.target && e.target.closest ? e.target.closest("a[href^='#/']") : null;
        if (!a) return;
        // Let the browser update location.hash, then apply route.
        setTimeout(onRouteChange, 0);
    });

    window.addEventListener("hashchange", onRouteChange);

    if (!location.hash || location.hash === "#") {
        location.hash = "#/inicio";
    } else {
        onRouteChange();
    }

    // Wake up API server (best effort)
    fetch("https://final-api-p6mw.onrender.com/", { method: "GET" })
        .then((r) => (r.ok ? r.json().catch(() => null) : null))
        .catch(() => null);
})();
