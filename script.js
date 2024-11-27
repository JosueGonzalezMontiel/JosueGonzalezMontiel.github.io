const canvas = document.getElementById("miCanvas");
const ctx = canvas.getContext("2d");

// Aseguramos que el lienzo sea suficientemente grande
canvas.width = 500;
canvas.height = 400;

// Propiedades iniciales de las bolas
let bolas = [
    
    { x: 150, y: 100, dx: -5, dy: 6, ancho: 80, alto: 8, color: "red" },
    { x: 300, y: 200, dx: 7, dy: -6, ancho: 80, alto: 8, color: "red" },
    { x: 400, y: 300, dx: -6, dy: -5, ancho: 80, alto: 8, color: "purple" },
    { x: 100, y: 150, dx: -5, dy: 6, ancho: 80, alto: 8, color: "red" },
    { x: 350, y: 250, dx: 7, dy: -6, ancho: 80, alto: 8, color: "blue" },
    { x: 250, y: 350, dx: -6, dy: -5, ancho: 80, alto: 8, color: "purple" }
];

// Función para dibujar una "bola" ovalada
function dibujarBola(bola) {
    ctx.beginPath();
    ctx.ellipse(bola.x, bola.y, bola.ancho, bola.alto, 0, 0, Math.PI * 2);
    ctx.fillStyle = bola.color;
    ctx.fill();
    ctx.closePath();
}

// Animación de las bolas
function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas

    // Dibujar y mover cada bola
    bolas.forEach(bola => {
        dibujarBola(bola);

        // Detectar colisiones con los bordes
        if (bola.x + bola.dx > canvas.width - bola.ancho || bola.x + bola.dx < bola.ancho) {
            bola.dx = -bola.dx; // Cambiar dirección en X
        }
        if (bola.y + bola.dy > canvas.height - bola.alto || bola.y + bola.dy < bola.alto) {
            bola.dy = -bola.dy; // Cambiar dirección en Y
        }

        // Actualizar posición
        bola.x += bola.dx;
        bola.y += bola.dy;
    });

    requestAnimationFrame(animar); // Continuar la animación
}

// Iniciar la animación
animar();
