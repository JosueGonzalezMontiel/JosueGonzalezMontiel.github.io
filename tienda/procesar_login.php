<?php
include "conexion.php";

$conexion = mysqli_connect($servidor, $usuario, $password, 'paper_pulse');

if (!$conexion) {
    die("Conexion fallida: " . mysqli_connect_error());
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $accion = isset($_POST['accion']) ? $_POST['accion'] : '';

    if ($accion == "iniciar_sesion") {
        $nombre = isset($_POST['name']) ? trim($_POST['name']) : '';
        $password = isset($_POST['password']) ? trim($_POST['password']) : '';

        if ($nombre !== '' && $password !== '') {
            $consulta = "SELECT * FROM clientes WHERE nombre = '$nombre' AND password = '$password'";
            $resultado = mysqli_query($conexion, $consulta);

            if (!$resultado) {
                echo "Error al realizar la consulta: " . mysqli_error($conexion);
            } else {
                if (mysqli_num_rows($resultado) > 0) {
                    // Inicio de sesión exitoso
                    session_start();
                    $_SESSION['mensaje'] = "Inicio de sesión exitoso";
                    header('Location: index.html');
                    exit();
                } else {
                    // Contraseña incorrecta. Muestra un mensaje.
                    echo "Contraseña incorrecta. Inténtalo de nuevo.";
                }
            }
        } else {
            echo "Nombre y/o contraseña vacíos.";
        }
    } else {
        // Aquí puedes manejar las acciones para "INICIO" y "REGISTRARSE" si es necesario
        // Puedes redirigir o hacer lo que necesites con estos botones adicionales
        if ($accion == "inicio") {
            header('Location: index.html');
            exit();
        } elseif ($accion == "registrarse") {
            header('Location: registrar.html');
            exit();
        }
    }
}

mysqli_close($conexion);
?>

