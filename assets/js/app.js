var inicio = document.getElementById("view-inicio");
var proyectos = document.getElementById("view-proyectos");

function mostrarProyectos() {
    inicio.style.cssText = "display:none !important";
    proyectos.style.cssText = "display:block !important";
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function mostrarInicio() {
    inicio.style.cssText = "display:block !important";
    proyectos.style.cssText = "display:none !important";
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// Listeners directos
var btnInicio = document.querySelector('[data-nav="inicio"]');
var btnProyectos = document.querySelector('[data-nav="proyectos"]');

if (btnInicio) btnInicio.onclick = function() { mostrarInicio(); };
if (btnProyectos) btnProyectos.onclick = function() { mostrarProyectos(); };

var btnVer = document.querySelector('a[href="#/proyectos"]');
if (btnVer) btnVer.onclick = function() { mostrarProyectos(); };

// Estado inicial
mostrarInicio();
