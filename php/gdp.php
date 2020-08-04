<?php
 header("Access-Control-Allow-Headers: *");
 header("Access-Control-Allow-Origin: *");
 header('Content-Type: application/json');
 require_once("datos_conexion.php");
 require("json_encode.php");
 require("json_decode.php");
 $enlace =  mysql_connect($host, $user, $pass);
 $datos = json_decode(file_get_contents("php://input"));
 $f1=$datos->f1;
 $f2=$datos->f2;
 mysql_query("SET CHARACTER SET utf8 ",$enlace);
 
 mysql_select_db("adoespecialidades",$enlace);
 $sql2="drop table if exists poblacion ";
 mysql_query($sql2,$enlace);
 $sql1="create table poblacion";
 $sql=' select cppredata.tdei,cppredata.identificacion,
 "" as coda,"4" as tu,cppredata.apellido1,cppredata.apellido2,
 cppredata.nombre1,cppredata.nombre2,
 round((to_days(curdate())-to_days(fecnac))/365.242159) as edad,
 "1" as ume,left(sexo,1) as sexo,municipios.codepto,municipios.codmunic,"U" as zona
 from cppredata
 
 inner join municipios on cppredata.ciudad_residencia=municipios.codigo
 
 
 ';
 if (($f1!="")&&($f2!="")){
 $sql.=" inner join cppre on cppredata.identificacion=cppre.paciente"; 	 
 $sql.=" where cppre.fecha between '$f1' and '$f2'";
 $sql.=" group by cppredata.identificacion";
 $sql2=$sql1." ".$sql;
 }else
	 $sql.=" limit 10";
 

 $datos=array();
 
  
 if ($resultado=mysql_query($sql,$enlace)){
	
    mysql_query($sql2,$enlace);
     while($dato=mysql_fetch_assoc($resultado)){
         
        
         $datos[]=$dato;
         
     }
     
     
 }else{
     
     $datos=array("Tipo"=>"Error","Mensaje"=>mysql_error($enlace),"SQL"=>$sql,"SQL2"=>$sql2);
     
 }
 
 header("Content-Length:".strlen(json_encode($datos)));
 echo json_encode($datos);
 
 mysql_free_result($resultado);
 mysql_close($enlace);


?>