import os

file_path = r'c:\xampp\htdocs\JosueGonzalezMontiel.github.io\JosueGonzalezMontiel.github.io\projects\pingpong\index.html'

with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

replacements = {
    '<a href="../../index.html#/inicio" class="btn btn-accent rounded-pill">Inicio</a>': 
        '<a href="../../index.html#/inicio" class="btn btn-accent rounded-pill" data-en="Home">Inicio</a>',
    
    '<a href="../../index.html#/proyectos" class="btn btn-accent rounded-pill">Mis proyectos</a>': 
        '<a href="../../index.html#/proyectos" class="btn btn-accent rounded-pill" data-en="My projects">Mis proyectos</a>',

    '<p class="kicker">Proyecto</p>': 
        '<p class="kicker" data-en="Project">Proyecto</p>',
    
    '<h1 class="section-title">Videojuego Ping Pong</h1>': 
        '<h1 class="section-title" data-en="Ping Pong Video Game">Videojuego Ping Pong</h1>',
    
    '<p class="lead lead-muted mx-auto" style="max-width: 600px;">Mueve la barra con el mouse o las teclas ↑ ↓ para rebotar la pelota. ¡La velocidad aumenta con el tiempo! Si la pelota toca el borde derecho, pierdes.</p>': 
        '<p class="lead lead-muted mx-auto" style="max-width: 600px;" data-en="Move the paddle with the mouse or ↑ ↓ keys to bounce the ball. Speed increases over time! If the ball hits the right edge, you lose.">Mueve la barra con el mouse o las teclas ↑ ↓ para rebotar la pelota. ¡La velocidad aumenta con el tiempo! Si la pelota toca el borde derecho, pierdes.</p>',
        
    '<h2>Ping Pong</h2>': 
        '<h2 data-en="Ping Pong">Ping Pong</h2>',
    
    '<p class="lead lead-muted">¿Cuanto tiempo aguantas?</p>': 
        '<p class="lead lead-muted" data-en="How long can you last?">¿Cuanto tiempo aguantas?</p>',
    
    '<button id="btnStart" class="btn btn-accent rounded-pill px-4">Iniciar juego</button>': 
        '<button id="btnStart" class="btn btn-accent rounded-pill px-4" data-en="Start Game">Iniciar juego</button>',
    
    '<h2>¡Perdiste!</h2>': 
        '<h2 data-en="Game Over!">¡Perdiste!</h2>',
        
    '<p class="stat-label">Tu tiempo</p>': 
        '<p class="stat-label" data-en="Your Time">Tu tiempo</p>',
        
    '<button id="btnRestart" class="btn btn-accent rounded-pill px-4">Jugar de nuevo</button>': 
        '<button id="btnRestart" class="btn btn-accent rounded-pill px-4" data-en="Play Again">Jugar de nuevo</button>',
        
    '<p class="stat-label mb-0">Tiempo</p>': 
        '<p class="stat-label mb-0" data-en="Time">Tiempo</p>',
        
    '<p class="stat-label mb-0">Velocidad</p>': 
        '<p class="stat-label mb-0" data-en="Speed">Velocidad</p>',
        
    '<p class="stat-label mb-0">Mejor tiempo</p>': 
        '<p class="stat-label mb-0" data-en="Best Time">Mejor tiempo</p>',

    '<div class="col-12">Volver al portafolio: <a href="../../index.html#/proyectos" class="text-decoration-none" style="color: rgba(238,241,247,.95)">Mis proyectos</a></div>': 
        '<div class="col-12" data-en="Back to portfolio: <a href=\'../../index.html#/proyectos\' class=\'text-decoration-none\' style=\'color: rgba(238,241,247,.95)\'>My projects</a>">Volver al portafolio: <a href="../../index.html#/proyectos" class="text-decoration-none" style="color: rgba(238,241,247,.95)">Mis proyectos</a></div>',
}

for old_str, new_str in replacements.items():
    if old_str in html:
        html = html.replace(old_str, new_str)
    else:
        print(f"Warning: could not find snippet:\n{old_str[:50]}...")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(html)
print("Updated pingpong index.html successfully.")
