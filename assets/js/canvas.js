(() => {
    const canvas = document.getElementById("miCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const container = canvas.parentElement;

    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    function resizeCanvas() {
        if (!container) return;
        const rect = container.getBoundingClientRect();
        const w = Math.max(260, Math.floor(rect.width));
        const h = Math.max(260, Math.floor(rect.height));

        const nextW = Math.floor(w * dpr);
        const nextH = Math.floor(h * dpr);
        if (canvas.width === nextW && canvas.height === nextH) return;

        canvas.width = nextW;
        canvas.height = nextH;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function rand(min, max) {
        return Math.random() * (max - min) + min;
    }

    function makeBola() {
        const w = container ? Math.max(320, container.clientWidth) : 500;
        const base = Math.max(0.75, Math.min(1.15, w / 520));
        const ancho = rand(46, 86) * base;
        const alto = rand(3, 6) * base;
        const speed = rand(1.4, 3.2) * base;
        const angle = rand(0, Math.PI * 2);

        const colors = ["#ff8a00", "#ff3c00", "#81c718"];
        return {
            x: rand(ancho + 16, (container?.clientWidth || 500) - ancho - 16),
            y: rand(alto + 16, (container?.clientHeight || 360) - alto - 16),
            dx: Math.cos(angle) * speed,
            dy: Math.sin(angle) * speed,
            ancho,
            alto,
            color: colors[Math.floor(Math.random() * colors.length)]
        };
    }

    let bolas = Array.from({ length: 6 }, makeBola);

    function draw() {
        const w = canvas.width / dpr;
        const h = canvas.height / dpr;

        ctx.clearRect(0, 0, w, h);

        bolas.forEach((bola) => {
            ctx.beginPath();
            ctx.ellipse(bola.x, bola.y, bola.ancho, bola.alto, 0, 0, Math.PI * 2);
            ctx.fillStyle = bola.color;
            ctx.globalAlpha = 0.9;
            ctx.fill();
            ctx.closePath();
            ctx.globalAlpha = 1;

            if (bola.x + bola.dx > w - bola.ancho || bola.x + bola.dx < bola.ancho) bola.dx = -bola.dx;
            if (bola.y + bola.dy > h - bola.alto || bola.y + bola.dy < bola.alto) bola.dy = -bola.dy;

            bola.x += bola.dx;
            bola.y += bola.dy;
        });

        requestAnimationFrame(draw);
    }

    window.addEventListener("resize", () => {
        resizeCanvas();
        bolas = bolas.map((b) => ({ ...b, x: Math.min(b.x, (canvas.width / dpr) - b.ancho - 8), y: Math.min(b.y, (canvas.height / dpr) - b.alto - 8) }));
    }, { passive: true });

    resizeCanvas();
    draw();
})();
