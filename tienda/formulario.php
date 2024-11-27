<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registrar Clientes</title>
    <link rel="stylesheet" href="estilos.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet">
</head>
<body>
    <div class="container">
        <form action="funciones.php" method="post" class="formulario">
            <label for="nombre">Nombre</label>
            <input type="text" id="nombre" name="nombre">
            
            <label for="telefono">Telefono</label>
            <input type="text" id="telefono" name="telefono">
            
            <label for="password">Password</label>
            <input type="text" id="password" name="password">
            
            <div class="botones">
                <button type="submit" name="accion" value="guardar" class="btn-guardar">Guardar</button>
                <button type="submit" name="accion" value="eliminar" class="btn-eliminar">Eliminar</button>
                <button type="reset" class="btn-borrar">Borrar</button>
            </div>
        </form>
    </div>
</body>
</html>


