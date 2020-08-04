<?php
		header("Access-Control-Allow-Origin: *");
		require_once("datos_conexion.php");
		require("json_encode.php");
		xcvxzvxcvxc
		$datos=array("Tipo"=>"Error","Mensaje"=>mysql_error($enlace),"SQL"=>$sql);
		echo json_encode($datos);
		mysql_close($enlace);
?>