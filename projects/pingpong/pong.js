(() => {
    const canvas = document.getElementById("pongCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    // DOM elements
    const timerDisplay = document.getElementById("timerDisplay");
    const speedDisplay = document.getElementById("speedDisplay");
    const bestDisplay = document.getElementById("bestDisplay");
    const finalTime = document.getElementById("finalTime");
    const bestTimeDisplay = document.getElementById("bestTimeDisplay");
    const startOverlay = document.getElementById("startOverlay");
    const gameOverOverlay = document.getElementById("gameOverOverlay");
    const btnStart = document.getElementById("btnStart");
    const btnRestart = document.getElementById("btnRestart");

    // Game state
    let gameRunning = false;
    let startTime = 0;
    let elapsed = 0;
    let bestTime = parseFloat(localStorage.getItem("pongBest") || "0");
    let animId = null;

    // Ball
    let ballX, ballY;
    const ballRadius = 10;
    let ballDX = 4;
    let ballDY = 3;
    const baseSpeed = 4;

    // Paddle (right side)
    const paddleWidth = 14;
    const paddleHeight = 90;
    let paddleY = 0;
    const paddleMargin = 12;

    // Input
    let mouseY = null;
    let keysDown = {};

    // Canvas sizing
    let W = 720, H = 400;

    function resizeCanvas() {
        const rect = canvas.getBoundingClientRect();
        W = Math.max(280, Math.floor(rect.width));
        H = Math.max(240, Math.floor(rect.height));

        const nextW = Math.floor(W * dpr);
        const nextH = Math.floor(H * dpr);
        if (canvas.width === nextW && canvas.height === nextH) return;
        canvas.width = nextW;
        canvas.height = nextH;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function resetBall() {
        ballX = 60;
        ballY = H / 2;
        const angle = (Math.random() * 0.8 - 0.4); // slight random angle
        ballDX = baseSpeed;
        ballDY = baseSpeed * Math.tan(angle);
    }

    function resetGame() {
        elapsed = 0;
        paddleY = H / 2 - paddleHeight / 2;
        resetBall();
        updateDisplays();
    }

    function startGame() {
        startOverlay.classList.add("hidden");
        gameOverOverlay.classList.add("hidden");
        resetGame();
        gameRunning = true;
        startTime = performance.now();
        if (animId) cancelAnimationFrame(animId);
        loop();
    }

    function gameOver() {
        gameRunning = false;
        if (animId) cancelAnimationFrame(animId);

        if (elapsed > bestTime) {
            bestTime = elapsed;
            localStorage.setItem("pongBest", bestTime.toFixed(2));
        }

        finalTime.textContent = elapsed.toFixed(2) + "s";
        if (bestTime > 0) {
            bestTimeDisplay.textContent = "Mejor tiempo: " + bestTime.toFixed(2) + "s";
        }
        bestDisplay.textContent = bestTime.toFixed(2) + "s";
        gameOverOverlay.classList.remove("hidden");
    }

    function updateDisplays() {
        timerDisplay.textContent = elapsed.toFixed(2) + "s";
        const speedMult = getSpeedMultiplier();
        speedDisplay.textContent = speedMult.toFixed(1) + "x";
        bestDisplay.textContent = bestTime.toFixed(2) + "s";
    }

    function getSpeedMultiplier() {
        // Speed increases every 5 seconds
        return 1.0 + Math.floor(elapsed / 5) * 0.2;
    }

    // --- Drawing ---
    function drawBall() {
        ctx.beginPath();
        ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#81c718";
        ctx.fill();
        ctx.closePath();

        // Glow effect
        ctx.shadowColor = "#81c718";
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        ctx.shadowBlur = 0;
    }

    function drawPaddle() {
        const px = W - paddleMargin - paddleWidth;

        // Paddle glow
        ctx.shadowColor = "#ff8a00";
        ctx.shadowBlur = 10;
        ctx.fillStyle = "#ff8a00";
        ctx.beginPath();
        ctx.roundRect(px, paddleY, paddleWidth, paddleHeight, 7);
        ctx.fill();
        ctx.shadowBlur = 0;
    }

    function drawCenterLine() {
        ctx.setLineDash([6, 8]);
        ctx.strokeStyle = "rgba(255,255,255,0.08)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(W / 2, 0);
        ctx.lineTo(W / 2, H);
        ctx.stroke();
        ctx.setLineDash([]);
    }

    function drawTrail() {
        // Subtle ball trail
        const speedMult = getSpeedMultiplier();
        const trailLen = Math.min(6, Math.floor(speedMult));
        for (let i = 1; i <= trailLen; i++) {
            const alpha = 0.08 * (trailLen - i + 1) / trailLen;
            ctx.beginPath();
            ctx.arc(ballX - ballDX * i * 1.5, ballY - ballDY * i * 1.5, ballRadius * 0.7, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(129, 199, 24, " + alpha + ")";
            ctx.fill();
            ctx.closePath();
        }
    }

    // --- Game logic ---
    function updatePaddle() {
        // Mouse input
        if (mouseY !== null) {
            paddleY = mouseY - paddleHeight / 2;
        }

        // Keyboard input
        const moveSpeed = 6;
        if (keysDown["ArrowUp"] || keysDown["w"] || keysDown["W"]) {
            paddleY -= moveSpeed;
        }
        if (keysDown["ArrowDown"] || keysDown["s"] || keysDown["S"]) {
            paddleY += moveSpeed;
        }

        // Clamp paddle
        if (paddleY < 0) paddleY = 0;
        if (paddleY + paddleHeight > H) paddleY = H - paddleHeight;
    }

    function updateBall() {
        const speedMult = getSpeedMultiplier();
        const currentDX = ballDX * speedMult;
        const currentDY = ballDY * speedMult;

        ballX += currentDX;
        ballY += currentDY;

        // Top/bottom walls
        if (ballY - ballRadius <= 0) {
            ballY = ballRadius;
            ballDY = Math.abs(ballDY);
        }
        if (ballY + ballRadius >= H) {
            ballY = H - ballRadius;
            ballDY = -Math.abs(ballDY);
        }

        // Left wall (just bounce)
        if (ballX - ballRadius <= 0) {
            ballX = ballRadius;
            ballDX = Math.abs(ballDX);
        }

        // Right side - paddle collision
        const px = W - paddleMargin - paddleWidth;
        if (ballX + ballRadius >= px && ballX + ballRadius <= px + paddleWidth + 6) {
            if (ballY >= paddleY && ballY <= paddleY + paddleHeight) {
                // Hit paddle!
                ballX = px - ballRadius;
                ballDX = -Math.abs(ballDX);

                // Vary angle based on where ball hits paddle
                const hitPos = (ballY - paddleY) / paddleHeight; // 0 to 1
                const angle = (hitPos - 0.5) * 1.2; // -0.6 to 0.6
                ballDY = baseSpeed * angle;
                if (Math.abs(ballDY) < 0.5) ballDY = (Math.random() < 0.5 ? -1 : 1) * 0.8;
            }
        }

        // Right wall - GAME OVER
        if (ballX + ballRadius >= W) {
            gameOver();
        }
    }

    function loop() {
        if (!gameRunning) return;
        animId = requestAnimationFrame(loop);

        elapsed = (performance.now() - startTime) / 1000;
        updateDisplays();
        updatePaddle();
        updateBall();

        // Draw
        ctx.clearRect(0, 0, W, H);
        drawCenterLine();
        drawTrail();
        drawBall();
        drawPaddle();
    }

    // --- Input handlers ---
    canvas.addEventListener("mousemove", (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseY = (e.clientY - rect.top) * (H / rect.height);
    });

    canvas.addEventListener("touchmove", (e) => {
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];
        mouseY = (touch.clientY - rect.top) * (H / rect.height);
    }, { passive: false });

    document.addEventListener("keydown", (e) => {
        keysDown[e.key] = true;
    });
    document.addEventListener("keyup", (e) => {
        delete keysDown[e.key];
    });

    // --- Buttons ---
    btnStart.addEventListener("click", startGame);
    btnRestart.addEventListener("click", startGame);

    // --- Init ---
    window.addEventListener("resize", resizeCanvas, { passive: true });
    resizeCanvas();
    bestDisplay.textContent = bestTime.toFixed(2) + "s";

    // Draw initial idle state
    function drawIdle() {
        ctx.clearRect(0, 0, W, H);
        drawCenterLine();
        // Draw static ball in center
        ballX = W / 2;
        ballY = H / 2;
        drawBall();
        // Draw paddle in center
        paddleY = H / 2 - paddleHeight / 2;
        drawPaddle();
    }
    drawIdle();
})();
