import os

file_path = r'c:\xampp\htdocs\JosueGonzalezMontiel.github.io\JosueGonzalezMontiel.github.io\projects\contador\index.html'

with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

replacements = {
    '<a href="../../index.html#/inicio" class="btn btn-accent rounded-pill">Inicio</a>': 
        '<a href="../../index.html#/inicio" class="btn btn-accent rounded-pill" data-en="Home">Inicio</a>',
    
    '<a href="../../index.html#/proyectos" class="btn btn-accent rounded-pill">Mis proyectos</a>': 
        '<a href="../../index.html#/proyectos" class="btn btn-accent rounded-pill" data-en="My projects">Mis proyectos</a>',

    '<p class="kicker">Proyecto</p>': 
        '<p class="kicker" data-en="Project">Proyecto</p>',
    
    '<h1 class="section-title">Contador de colisiones</h1>': 
        '<h1 class="section-title" data-en="Collision Counter">Contador de colisiones</h1>',
    
    '<p class="lead lead-muted mx-auto">Canvas + animacion de movimiento de poligonos con contador de impactos.</p>': 
        '<p class="lead lead-muted mx-auto" data-en="Canvas + polygon movement animation with impact counter.">Canvas + animacion de movimiento de poligonos con contador de impactos.</p>',
        
    '<p class="mb-2">Colisiones con la pared: <span id="contador">0</span></p>': 
        '<p class="mb-2"><span data-en="Wall collisions: ">Colisiones con la pared: </span> <span id="contador">0</span></p>',
    
    '<button id="reiniciar" class="btn btn-accent rounded-pill">Reiniciar contador</button>': 
        '<button id="reiniciar" class="btn btn-accent rounded-pill" data-en="Reset counter">Reiniciar contador</button>',

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
print("Updated contador index.html successfully.")
