<?php
include "conexion.php";

$conexion = mysqli_connect($servidor, $usuario, $password, 'paper_pulse');

if (!$conexion) {
    die("Conexion fallida: " . mysqli_connect_error());
} else {
    echo "Conectado";
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $accion = $_POST["accion"];

    if ($accion == "guardar") {
        $nombre = isset($_POST['nombre']) ? $_POST['nombre'] : '';
        $existencias = isset($_POST['existencias']) ? $_POST['existencias'] : '';
        $precio = isset($_POST['precio']) ? $_POST['precio'] : '';
        $marca = isset($_POST['marca']) ? $_POST['marca'] : '';
        $tipo = isset($_POST['tipo']) ? $_POST['tipo'] : '';

        if ($nombre !== '' && $existencias !== '' && $precio !== '' && $marca !== '' && $tipo !== '') {
            $insertar = "INSERT INTO inventario(nombre, existencias, precio, marca, tipo) 
             VALUES('$nombre', '$existencias', '$precio', '$marca', '$tipo')";

            $consulta = mysqli_query($conexion, $insertar);

            if (!$consulta) {
                echo "Error al Guardar: " . mysqli_error($conexion);
            } else {
                echo "Registro guardado";
            }
        } else {
            echo "Uno o más campos no proporcionados.";
        }
    } elseif ($accion == "eliminar") {
        $id_producto_eliminar = isset($_POST['id_producto']) ? $_POST['id_producto'] : '';

        if ($id_producto_eliminar !== '') {
            $eliminar = "DELETE FROM inventario WHERE id_producto = '$id_producto_eliminar'";
            $consulta = mysqli_query($conexion, $eliminar);

            if (!$consulta) {
                echo "Error al Eliminar: " . mysqli_error($conexion);
            } else {
                echo "Registro eliminado";
            }
        } else {
            echo "ID de producto a eliminar no proporcionado.";
        }
    }
}

mysqli_close($conexion);
?>
