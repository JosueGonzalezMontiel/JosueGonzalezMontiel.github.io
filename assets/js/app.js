(function() {
    var inicio = document.getElementById("view-inicio");
    var proyectos = document.getElementById("view-proyectos");

    function mostrar(ruta) {
        if (ruta === "/proyectos") {
            inicio.style.display = "none";
            proyectos.style.display = "";
            proyectos.removeAttribute("hidden");
        } else {
            inicio.style.display = "";
            inicio.removeAttribute("hidden");
            proyectos.style.display = "none";
        }
    }

    function ir() {
        var h = location.hash || "";
        if (h.indexOf("proyectos") !== -1) {
            mostrar("/proyectos");
        } else {
            mostrar("/inicio");
        }
    }

    window.addEventListener("hashchange", ir);

    document.addEventListener("click", function(e) {
        var a = e.target.closest ? e.target.closest("a") : null;
        if (a && a.href && a.href.indexOf("#/proyectos") !== -1) {
            setTimeout(function() { mostrar("/proyectos"); }, 10);
        }
        if (a && a.href && a.href.indexOf("#/inicio") !== -1) {
            setTimeout(function() { mostrar("/inicio"); }, 10);
        }
    });

    ir();
})();
