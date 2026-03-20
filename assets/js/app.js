var inicio = document.getElementById("view-inicio");
var proyectos = document.getElementById("view-proyectos");

function mostrarProyectos() {
    inicio.style.display = "none";
    proyectos.style.display = "block";
}

function mostrarInicio() {
    inicio.style.display = "block";
    proyectos.style.display = "none";
}

// Botones del navbar
var btnInicio = document.querySelector('[data-nav="inicio"]');
var btnProyectos = document.querySelector('[data-nav="proyectos"]');

if (btnInicio) {
    btnInicio.addEventListener("click", function(ev) {
        ev.preventDefault();
        location.hash = "#/inicio";
        mostrarInicio();
    });
}

if (btnProyectos) {
    btnProyectos.addEventListener("click", function(ev) {
        ev.preventDefault();
        location.hash = "#/proyectos";
        mostrarProyectos();
    });
}

// Boton "Ver proyectos" en inicio
var btnVer = document.querySelector('a[href="#/proyectos"]');
if (btnVer) {
    btnVer.addEventListener("click", function(ev) {
        ev.preventDefault();
        location.hash = "#/proyectos";
        mostrarProyectos();
    });
}

// Por si cambia el hash manualmente
window.addEventListener("hashchange", function() {
    if (location.hash.indexOf("proyectos") !== -1) {
        mostrarProyectos();
    } else {
        mostrarInicio();
    }
});

// Estado inicial
if (location.hash.indexOf("proyectos") !== -1) {
    mostrarProyectos();
} else {
    mostrarInicio();
}
