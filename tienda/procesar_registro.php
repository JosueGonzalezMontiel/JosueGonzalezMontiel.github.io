<?php
include "conexion.php";

$conexion = mysqli_connect($servidor, $usuario, $password, 'paper_pulse');

if (!$conexion) {
    die("Conexion fallida: " . mysqli_connect_error());
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $accion = isset($_POST["accion"]) ? $_POST["accion"] : '';

    if ($accion == "guardar") {
        $nombre = isset($_POST['nombre']) ? $_POST['nombre'] : '';
        $telefono = isset($_POST['telefono']) ? $_POST['telefono'] : '';
        $password = isset($_POST['password']) ? $_POST['password'] : '';

        if ($nombre !== '' && $telefono !== '' && $password !== '') {
            $insertar = "INSERT INTO clientes(id_cliente, nombre, telefono, password) 
             VALUES(NULL, '$nombre', '$telefono', '$password')";

            $consulta = mysqli_query($conexion, $insertar);

            if (!$consulta) {
                echo "Error al Guardar: " . mysqli_error($conexion);
            } else {
                // Registro guardado exitosamente, redirige a login.html
                header('Location: login.html');
                exit();
            }
        } else {
            echo "Nombre, teléfono o contraseña no proporcionados.";
        }
    } elseif ($accion == "eliminar") {
        $nombre_eliminar = isset($_POST['nombre']) ? $_POST['nombre'] : '';
        $telefono_eliminar = isset($_POST['telefono']) ? $_POST['telefono'] : '';

        if ($nombre_eliminar !== '' && $telefono_eliminar !== '') {
            $eliminar = "DELETE FROM clientes WHERE nombre = '$nombre_eliminar' AND telefono = '$telefono_eliminar'";
            $consulta = mysqli_query($conexion, $eliminar);

            if (!$consulta) {
                echo "Error al Eliminar: " . mysqli_error($conexion);
            } else {
                // Registro eliminado exitosamente, redirige a index.html
                header('Location: index.html');
                exit();
            }
        } else {
            echo "Nombre o teléfono a eliminar no proporcionado.";
        }
    }
}

mysqli_close($conexion);
?>

