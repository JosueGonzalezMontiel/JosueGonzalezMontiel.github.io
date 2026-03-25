import os

file_path = r'c:\xampp\htdocs\JosueGonzalezMontiel.github.io\JosueGonzalezMontiel.github.io\projects\agente-ia\index.html'

with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

replacements = {
    '<a href="../../index.html#/inicio"\n                                class="btn btn-accent rounded-pill">Inicio</a>': 
        '<a href="../../index.html#/inicio"\n                                class="btn btn-accent rounded-pill" data-en="Home">Inicio</a>',
    
    '<a href="../../index.html#/proyectos"\n                                class="btn btn-accent rounded-pill">Mis proyectos</a>': 
        '<a href="../../index.html#/proyectos"\n                                class="btn btn-accent rounded-pill" data-en="My projects">Mis proyectos</a>',

    '<p class="kicker">Portafolio</p>': 
        '<p class="kicker" data-en="Portfolio">Portafolio</p>',
    
    '<h1 class="display-title mb-4">Agente IA: crea, edita archivos y codigo</h1>': 
        '<h1 class="display-title mb-4" data-en="AI Agent: creates, edits files and code">Agente IA: crea, edita archivos y codigo</h1>',
    
    '<p class="lead lead-muted mb-3" style="max-width: 100%;">Este proyecto representa el desarrollo de un agente': 
        '<p class="lead lead-muted mb-3" style="max-width: 100%;" data-en="This project represents the development of an artificial intelligence agent capable of generating functional code, modifying and creating files autonomously, designed completely from scratch without the use of frameworks like LangChain or third-party automated tools.">Este proyecto representa el desarrollo de un agente',
        
    '<p class="lead lead-muted mb-3" style="max-width: 100%;">Solo se utiliza la API del modelo de lenguaje': 
        '<p class="lead lead-muted mb-3" style="max-width: 100%;" data-en="Only the language model API and Python are used, which allowed an understanding of its architecture, behavior, and capabilities.">Solo se utiliza la API del modelo de lenguaje',
    
    '<h3 class="card-title mb-3">Arquitectura y Diseno del Sistema</h3>': 
        '<h3 class="card-title mb-3" data-en="System Architecture and Design">Arquitectura y Diseno del Sistema</h3>',
        
    '<p class="lead lead-muted">El proyecto fue estructurado con un enfoque modular para garantizar orden, escalabilidad y mantenibilidad.</p>': 
        '<p class="lead lead-muted" data-en="The project was structured with a modular approach to ensure order, scalability, and maintainability.">El proyecto fue estructurado con un enfoque modular para garantizar orden, escalabilidad y mantenibilidad.</p>',
    
    '<p class="lead lead-muted">Se implemento una documentacion detallada y el uso de variables de entorno para una configuracion segura.</p>': 
        '<p class="lead lead-muted" data-en="Detailed documentation and the use of environment variables were implemented for a secure configuration.">Se implemento una documentacion detallada y el uso de variables de entorno para una configuracion segura.</p>',
        
    '<p class="lead lead-muted">Como parte del proceso de aprendizaje, se desarrollo un sistema de memoria persistente basado en archivos JSON, permitiendo al agente mantener contexto entre ejecuciones.</p>': 
        '<p class="lead lead-muted" data-en="As part of the learning process, a persistent memory system based on JSON files was developed, allowing the agent to maintain context between executions.">Como parte del proceso de aprendizaje, se desarrollo un sistema de memoria persistente basado en archivos JSON, permitiendo al agente mantener contexto entre ejecuciones.</p>',
        
    '<h3 class="card-title mb-3">Gestion Inteligente del Contexto</h3>': 
        '<h3 class="card-title mb-3" data-en="Intelligent Context Management">Gestion Inteligente del Contexto</h3>',
        
    '<p class="lead lead-muted">El agente incorpora un sistema de control del historial de conversacion.</p>': 
        '<p class="lead lead-muted" data-en="The agent incorporates a conversation history control system.">El agente incorpora un sistema de control del historial de conversacion.</p>',
        
    '<p class="lead lead-muted">Cuando se supera el limite de contexto, se ejecuta automaticamente un resumen inteligente, optimizando el uso de tokens sin perder informacion relevante.</p>': 
        '<p class="lead lead-muted" data-en="When the context limit is exceeded, an intelligent summary is automatically executed, optimizing token usage without losing relevant information.">Cuando se supera el limite de contexto, se ejecuta automaticamente un resumen inteligente, optimizando el uso de tokens sin perder informacion relevante.</p>',

    '<h3 class="card-title mb-3">Desarrollo de Herramientas Personalizadas</h3>': 
        '<h3 class="card-title mb-3" data-en="Development of Custom Tools">Desarrollo de Herramientas Personalizadas</h3>',
        
    '<p class="lead lead-muted">Todas las herramientas (tools) fueron disenadas e implementadas manualmente, permitiendo definir con precision como el agente interactua con el entorno.</p>': 
        '<p class="lead lead-muted" data-en="All tools were designed and implemented manually, allowing for precise definition of how the agent interacts with its environment.">Todas las herramientas (tools) fueron disenadas e implementadas manualmente, permitiendo definir con precision como el agente interactua con el entorno.</p>',
        
    '<h3 class="card-title mb-3">Integracion de Capacidades al Agente</h3>': 
        '<h3 class="card-title mb-3" data-en="Integration of Capabilities into the Agent">Integracion de Capacidades al Agente</h3>',
        
    '<p class="lead lead-muted">Las herramientas desarrolladas son registradas dinamicamente dentro del agente, habilitando la ejecucion de acciones especificas segun el contexto de la conversacion.</p>': 
        '<p class="lead lead-muted" data-en="The developed tools are dynamically registered within the agent, enabling the execution of specific actions based on the context of the conversation.">Las herramientas desarrolladas son registradas dinamicamente dentro del agente, habilitando la ejecucion de acciones especificas segun el contexto de la conversacion.</p>',

    '<h3 class="card-title mb-3">Toma de Decisiones Inteligente</h3>': 
        '<h3 class="card-title mb-3" data-en="Intelligent Decision Making">Toma de Decisiones Inteligente</h3>',
        
    '<p class="lead lead-muted">El agente es capaz de mantener conversaciones naturales y, al mismo tiempo, decidir cuando utilizar herramientas externas, diferenciando entre respuestas conversacionales y acciones ejecutables.</p>': 
        '<p class="lead lead-muted" data-en="The agent is capable of maintaining natural conversations and, at the same time, deciding when to use external tools, differentiating between conversational responses and executable actions.">El agente es capaz de mantener conversaciones naturales y, al mismo tiempo, decidir cuando utilizar herramientas externas, diferenciando entre respuestas conversacionales y acciones ejecutables.</p>',

    '<h3 class="card-title mb-3">Generacion Autonoma de Codigo</h3>': 
        '<h3 class="card-title mb-3" data-en="Autonomous Code Generation">Generacion Autonoma de Codigo</h3>',
        
    '<p class="lead lead-muted">El agente puede crear archivos completos con codigo funcional, permitiendo automatizar tareas de desarrollo y acelerar la creacion de proyectos.</p>': 
        '<p class="lead lead-muted" data-en="The agent can create complete files with functional code, allowing the automation of development tasks and accelerating project creation.">El agente puede crear archivos completos con codigo funcional, permitiendo automatizar tareas de desarrollo y acelerar la creacion de proyectos.</p>',

    '<h3 class="card-title mb-3">Resultado Final</h3>': 
        '<h3 class="card-title mb-3" data-en="Final Result">Resultado Final</h3>',
        
    '<p class="lead lead-muted" style="max-width: 100%;">Como resultado, el agente fue capaz de desarrollar su propia interfaz grafica de escritorio con Flet': 
        '<p class="lead lead-muted" style="max-width: 100%;" data-en="As a result, the agent was able to develop its own desktop graphical interface with Flet, demonstrating an advanced level of autonomy and practical application.">Como resultado, el agente fue capaz de desarrollar su propia interfaz grafica de escritorio con Flet',

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
print("Updated agente-ia index.html successfully.")
