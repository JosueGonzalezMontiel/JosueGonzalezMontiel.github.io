var inicio = document.getElementById("view-inicio");
var proyectos = document.getElementById("view-proyectos");

function mostrar(ruta) {
    if (ruta === "proyectos") {
        inicio.style.setProperty("display", "none", "important");
        proyectos.style.setProperty("display", "block", "important");
    } else {
        inicio.style.setProperty("display", "block", "important");
        proyectos.style.setProperty("display", "none", "important");
    }
    window.scrollTo(0, 0);
}

// Botones navbar
var botones = document.querySelectorAll("[data-nav]");
for (var i = 0; i < botones.length; i++) {
    (function(btn) {
        btn.addEventListener("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
            var destino = btn.getAttribute("data-nav");
            mostrar(destino);
            location.hash = "#/" + destino;
        });
    })(botones[i]);
}

// Boton "Ver proyectos" en inicio
var verBtn = document.querySelector('a[href="#/proyectos"]');
if (verBtn) {
    verBtn.addEventListener("click", function(e) {
        e.preventDefault();
        mostrar("proyectos");
        location.hash = "#/proyectos";
    });
}

// Estado inicial
if (location.hash && location.hash.indexOf("proyectos") !== -1) {
    mostrar("proyectos");
} else {
    mostrar("inicio");
}
