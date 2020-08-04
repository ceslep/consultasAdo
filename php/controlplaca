<?php
 header("Access-Control-Allow-Headers: *");
 header("Access-Control-Allow-Origin: *");
 header('Content-Type: application/json');
 require_once("datos_conexion.php");
 require("json_encode.php");
 require("json_decode.php");
 $enlace =  mysql_connect($host, $user, $pass);
 
 mysql_query("SET CHARACTER SET utf8 ",$enlace);
 
 mysql_select_db("adoespecialidades",$enlace);
 
 $sql='
 select "Rangos de Edades" as rango,"Cantidad" as cantidad
UNION
select "1 a 5",count(edad) from poblacion 
where edad between 1 and 6
UNION
select "6 a 11",count(edad) from poblacion 
where edad between 6 and 11
UNION
select "12 a 15",count(edad) from poblacion 
where edad between 12 and 15
UNION
select "16 a 17",count(edad) from poblacion 
where edad between 16 and 17
UNION
select "18 a 19",count(edad) from poblacion 
where edad between 18 and 19
UNION
select "20 a 29",count(edad) from poblacion 
where edad between 20 and 29
UNION
select "30 a 44",count(edad) from poblacion 
where edad between 30 and 44
UNION
select "45 a 59",count(edad) from poblacion 
where edad between 45 and 59
UNION
select "Mas de 60",count(edad) from poblacion 
where edad between 60 and 110
';
 

 $datos=array();
  $k=0;
 if ($resultado=mysql_query($sql,$enlace)){
    
     while($dato=mysql_fetch_assoc($resultado)){
         
	     if ($k==0) {
			 $k++;
			 continue;}
	
         $datos[]=$dato;
         
     }
     
     
 }else{
     
     $datos=array("Tipo"=>"Error","Mensaje"=>mysql_error($enlace),"SQL"=>$sql);
     
 }
 
 header("Content-Length:".strlen(json_encode($datos)));
 echo json_encode($datos);
 
 mysql_free_result($resultado);
 mysql_close($enlace);


?>