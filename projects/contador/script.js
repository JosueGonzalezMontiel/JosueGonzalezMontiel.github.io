(() => {
    const canvas = document.getElementById("miCanvas2");
    const contadorDisplay = document.getElementById("contador");
    const reiniciarButton = document.getElementById("reiniciar");
    if (!canvas || !contadorDisplay || !reiniciarButton) return;

    const ctx = canvas.getContext("2d");
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    function resizeCanvas() {
        const rect = canvas.getBoundingClientRect();
        const w = Math.max(280, Math.floor(rect.width));
        const h = Math.max(240, Math.floor(rect.height));

        const nextW = Math.floor(w * dpr);
        const nextH = Math.floor(h * dpr);
        if (canvas.width === nextW && canvas.height === nextH) return;
        canvas.width = nextW;
        canvas.height = nextH;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        x = w / 2;
        y = h / 2;
    }

    // Poligono
    let x = 0;
    let y = 0;
    let tamaño = 30;
    let dx = 3;
    let dy = 2;

    let colisiones = 0;

    function dibujarArbol() {
        ctx.beginPath();
        ctx.moveTo(x, y - tamaño);
        ctx.lineTo(x - tamaño / 2, y + tamaño / 2);
        ctx.lineTo(x + tamaño / 2, y + tamaño / 2);
        ctx.closePath();
        ctx.fillStyle = "#81c718";
        ctx.fill();

        ctx.fillStyle = "#8b5a2b";
        ctx.fillRect(x - tamaño / 8, y + tamaño / 2, tamaño / 4, tamaño / 4);
    }

    function actualizarColisiones() {
        colisiones++;
        contadorDisplay.textContent = colisiones;
        tamaño = Math.max(20, Math.min(60, tamaño + (Math.random() < 0.5 ? -10 : 10)));
    }

    reiniciarButton.addEventListener("click", () => {
        colisiones = 0;
        contadorDisplay.textContent = colisiones;
        tamaño = 30;
    });

    function animar() {
        const w = canvas.width / dpr;
        const h = canvas.height / dpr;

        ctx.clearRect(0, 0, w, h);
        dibujarArbol();

        if (x + dx > w - tamaño / 2 || x + dx < tamaño / 2) {
            dx = -dx;
            actualizarColisiones();
        }
        if (y + dy > h - tamaño / 2 || y + dy < tamaño) {
            dy = -dy;
            actualizarColisiones();
        }

        x += dx;
        y += dy;

        requestAnimationFrame(animar);
    }

    window.addEventListener("resize", resizeCanvas, { passive: true });
    resizeCanvas();
    animar();
})();
