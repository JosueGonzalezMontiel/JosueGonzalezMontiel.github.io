(() => {
    const views = {
        "/inicio": document.getElementById("view-inicio"),
        "/proyectos": document.getElementById("view-proyectos")
    };

    function showView(route) {
        var el = views[route];
        if (!el) {
            el = views["/inicio"];
            route = "/inicio";
        }

        for (var key in views) {
            var v = views[key];
            if (v) {
                if (key === route) {
                    v.style.display = "";
                    v.removeAttribute("hidden");
                } else {
                    v.style.display = "none";
                    v.setAttribute("hidden", "");
                }
            }
        }

        document.querySelectorAll("[data-nav]").forEach(function(a) {
            var nav = a.getAttribute("data-nav");
            if (nav === route.replace("/", "")) {
                a.classList.add("is-active");
            } else {
                a.classList.remove("is-active");
            }
        });
    }

    function getRoute() {
        var h = location.hash;
        if (!h || h === "#" || h === "#/") return "/inicio";
        var r = h.replace("#", "");
        if (r.charAt(0) !== "/") r = "/" + r;
        if (r === "/proyectos") return "/proyectos";
        return "/inicio";
    }

    function navigate() {
        showView(getRoute());
    }

    window.addEventListener("hashchange", navigate);

    if (!location.hash || location.hash === "#") {
        location.hash = "#/inicio";
    } else {
        navigate();
    }

    fetch("https://final-api-p6mw.onrender.com/", { method: "GET" }).catch(function() {});
})();
