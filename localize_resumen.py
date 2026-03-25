import os

file_path = r'c:\xampp\htdocs\JosueGonzalezMontiel.github.io\JosueGonzalezMontiel.github.io\projects\resumen\index.html'

with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

replacements = {
    '<a href="../../index.html#/inicio"\n                                class="btn btn-accent rounded-pill">Inicio</a>': 
        '<a href="../../index.html#/inicio"\n                                class="btn btn-accent rounded-pill" data-en="Home">Inicio</a>',
    
    '<a href="../../index.html#/proyectos"\n                                class="btn btn-accent rounded-pill">Mis proyectos</a>': 
        '<a href="../../index.html#/proyectos"\n                                class="btn btn-accent rounded-pill" data-en="My projects">Mis proyectos</a>',

    '<p class="kicker">Portafolio</p>': 
        '<p class="kicker" data-en="Portfolio">Portafolio</p>',
    
    '<h1 class="display-title mb-4">Resumen de lo aprendido</h1>': 
        '<h1 class="display-title mb-4" data-en="Summary of learned skills">Resumen de lo aprendido</h1>',
    
    '<p class="lead lead-muted mb-3" style="max-width: 100%;">Gran parte de mis proyectos': 
        '<p class="lead lead-muted mb-3" style="max-width: 100%;" data-en="A large part of my projects focus on backend development, where I have learned to build complete applications by understanding not only the code, but also the software development processes.">Gran parte de mis proyectos',
        
    '<p class="lead lead-muted mb-3" style="max-width: 100%;">Mi principal stack es Python': 
        '<p class="lead lead-muted mb-3" style="max-width: 100%;" data-en="My main stack is Python, although throughout my training I have also worked with Java, C, C++, and PHP. This has allowed me to understand different programming approaches and strengthen my logic.">Mi principal stack es Python',
    
    '<p class="lead lead-muted mb-3" style="max-width: 100%;">Aunque mi enfoque es backend': 
        '<p class="lead lead-muted mb-3" style="max-width: 100%;" data-en="Although my focus is backend, I also have frontend knowledge, having developed interfaces from scratch with HTML, CSS, JavaScript, and Bootstrap. This allows me to understand full-stack integration between client and server.">Aunque mi enfoque es backend',
    
    '<h3 class="card-title mb-3">Proceso estructurado</h3>': 
        '<h3 class="card-title mb-3" data-en="Structured Process">Proceso estructurado</h3>',
        
    '<p class="lead lead-muted">En el desarrollo de mis proyectos sigo un proceso estructurado que\n                            incluye:</p>': 
        '<p class="lead lead-muted" data-en="In the development of my projects, I follow a structured process that includes:">En el desarrollo de mis proyectos sigo un proceso estructurado que\n                            incluye:</p>',
    
    '<li>Recoleccion de requerimientos</li>': 
        '<li data-en="Requirements gathering">Recoleccion de requerimientos</li>',
        
    '<li>Definicion de casos de uso</li>': 
        '<li data-en="Definition of use cases">Definicion de casos de uso</li>',
        
    '<li>Diseno de bases de datos normalizadas y relacionales</li>': 
        '<li data-en="Design of normalized and relational databases">Diseno de bases de datos normalizadas y relacionales</li>',
        
    '<h3 class="card-title mb-3">Pruebas manuales</h3>': 
        '<h3 class="card-title mb-3" data-en="Manual Testing">Pruebas manuales</h3>',
        
    '<p class="lead lead-muted">Antes de implementar, realizo pruebas manuales para entender el\n                            comportamiento de los datos y asegurar que el diseno sea correcto.</p>': 
        '<p class="lead lead-muted" data-en="Before implementing, I conduct manual tests to understand data behavior and ensure the design is correct.">Antes de implementar, realizo pruebas manuales para entender el\n                            comportamiento de los datos y asegurar que el diseno sea correcto.</p>',
        
    '<a href="../../index.html#/proyectos" class="btn btn-accent rounded-pill">Volver a proyectos</a>': 
        '<a href="../../index.html#/proyectos" class="btn btn-accent rounded-pill" data-en="Back to projects">Volver a proyectos</a>',
        
    '<div class="col-12">Volver al portafolio: <a href="../../index.html#/proyectos"\n                        class="text-decoration-none" style="color: rgba(238,241,247,.95)">Mis proyectos</a></div>': 
        '<div class="col-12" data-en="Back to portfolio: <a href=\'../../index.html#/proyectos\' class=\'text-decoration-none\' style=\'color: rgba(238,241,247,.95)\'>My projects</a>">Volver al portafolio: <a href="../../index.html#/proyectos"\n                        class="text-decoration-none" style="color: rgba(238,241,247,.95)">Mis proyectos</a></div>',
}

for old_str, new_str in replacements.items():
    if old_str in html:
        html = html.replace(old_str, new_str)
    else:
        print(f"Warning: could not find snippet:\n{old_str[:50]}...")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(html)
print("Updated resumen index.html successfully.")
