<?php
include "conexion.php";

$conexion = mysqli_connect($servidor, $usuario, $password, 'paper_pulse');

if (!$conexion) {
    die("Conexion fallida: " . mysqli_connect_error());
}

$muestratabla = "SELECT * FROM inventario";
$consulta = mysqli_query($conexion, $muestratabla);
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mostrar Inventario</title>
    <link rel="stylesheet" href="estilos_inventario.css">
    <style>
        body {
            background-color: #242430;
            font-family: 'Poppins', sans-serif;
        }

        .container {
            max-width: 600px;
            margin: 50px auto;
        }

        table {
            border-collapse: collapse;
            width: 100%;
            margin-top: 20px;
            background-color: #2b2a3d;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
            overflow: hidden;
        }

        td,
        th {
            border: 1px solid #7270EC;
            padding: 10px;
            text-align: center;
            color: #FEFFFF;
        }

        th {
            background: #7270EC;
            text-transform: uppercase;
        }

        td {
            border-bottom: 2px solid #363548;
            font-size: 18px;
        }
    </style>
</head>

<body>
    <div class="container">
        <table>
            <thead>
                <tr>
                    <th>ID Producto</th>
                    <th>Nombre</th>
                    <th>Existencias</th>
                    <th>Precio</th>
                    <th>Marca</th>
                    <th>Tipo</th>
                </tr>
            </thead>
            <tbody>
                <?php
                while ($fila = mysqli_fetch_array($consulta)) {
                    ?>
                    <tr>
                        <td><?php echo $fila['id_producto'] ?></td>
                        <td><?php echo $fila['nombre'] ?></td>
                        <td><?php echo $fila['existencias'] ?></td>
                        <td><?php echo $fila['precio'] ?></td>
                        <td><?php echo $fila['marca'] ?></td>
                        <td><?php echo $fila['tipo'] ?></td>
                    </tr>
                <?php
            } ?>
            </tbody>
        </table>
    </div>
</body>

</html>
