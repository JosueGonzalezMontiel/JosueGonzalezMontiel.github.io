const canvas = document.getElementById("miCanvas2");
const ctx = canvas.getContext("2d");
const contadorDisplay = document.getElementById("contador");
const reiniciarButton = document.getElementById("reiniciar");

// Poligono
let x = canvas.width / 2; // Posición inicial en X
let y = canvas.height / 2; // Posición en Y
let tamaño = 30; // Tamaño inicial 
let dx = 3; // Velocidad en X
let dy = 2; //en Y

let colisiones = 0;// Contador
function dibujarArbol() {
    ctx.beginPath();
    //triángulo
    ctx.moveTo(x, y - tamaño); // Punto superior
    ctx.lineTo(x - tamaño / 2, y + tamaño / 2); // Punto inferior izquierdo
    ctx.lineTo(x + tamaño / 2, y + tamaño / 2); // Punto inferior derecho
    ctx.closePath();
    ctx.fillStyle = "green";
    ctx.fill();

    // tronco
    ctx.fillStyle = "brown";
    ctx.fillRect(x - tamaño / 8, y + tamaño / 2, tamaño / 4, tamaño / 4);
}

function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas
    dibujarArbol();

    // Detectar colisiones con los bordes
    if (x + dx > canvas.width - tamaño / 2 || x + dx < tamaño / 2) {
        dx = -dx; // Cambiar dirección en X
        actualizarColisiones();
    }
    if (y + dy > canvas.height - tamaño / 2 || y + dy < tamaño) {
        dy = -dy; // Cambiar dirección en Y
        actualizarColisiones();
    }

    // Actualizar posición
    x += dx;
    y += dy;

    requestAnimationFrame(animar); // Continuar la animación
}

// Actualizar contador de colisiones
function actualizarColisiones() {
    colisiones++;
    contadorDisplay.textContent = colisiones;
    cambiarTamañoArbol();
}

// Cambiar el tamaño del árbol
function cambiarTamañoArbol() {
    tamaño = Math.max(20, Math.min(60, tamaño + (Math.random() < 0.5 ? -10 : 10)));
}

// Reiniciar el contador y restablecer tamaño del árbol
reiniciarButton.addEventListener("click", () => {
    colisiones = 0;
    contadorDisplay.textContent = colisiones;
    tamaño = 30; // Tamaño inicial
});

// Iniciar la animación
animar();
