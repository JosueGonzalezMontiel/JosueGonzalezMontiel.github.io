<?php 

    $servidor = "localhost";
    $usuario = "root";
    $password = "";
    $base = "paper_pulse";
    
    $conexion = new mysqli($servidor, $usuario, $password, $base);

    if ($conexion->connect_errno) {
        die("Conexion fallida: " . $conexion->connect_error);
    } else {
        echo "Conectado";
    }
?>
