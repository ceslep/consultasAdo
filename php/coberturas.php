<?php
 header("Access-Control-Allow-Headers: *");
 header("Access-Control-Allow-Origin: *");
 header('Content-Type: application/json');
 require_once("datos_conexion.php");
 require("json_encode.php");
 require("json_decode.php");
 $datos=json_decode(file_get_contents("php://input"));
 $ids="(";
 foreach($datos as $dato=>$valor)$ids.="'".$valor."',";
 $ids=substr($ids,0,strlen($ids)-1);
 $ids.=")";

 $enlace =  mysql_connect($host, $user, $pass);
 
 mysql_query("SET CHARACTER SET utf8 ",$enlace);
 
 mysql_select_db("adoespecialidades",$enlace);
 $sql='
 select "              " AS rango,"              " as cantidad
UNION
select "1 a 5",count(cppre.ind) from cppre 
inner join procedimientos on cppre.procedimiento=procedimientos.codigo
inner join cppredata on cppre.paciente=cppredata.historia
where 1=1 and
cppre.paciente in '.$ids.' 
and edad between 1 and 5
and asistio="S"
and procedimientos.nombre like "%VALORA%"
UNION
select "6 a 11",count(cppre.ind) from cppre 
inner join procedimientos on cppre.procedimiento=procedimientos.codigo
inner join cppredata on cppre.paciente=cppredata.historia
where 1=1 and
cppre.paciente in '.$ids.' 
and edad between 6 and 11
and asistio="S"
and procedimientos.nombre like "%VALORA%"
UNION
select "12 a 15",count(cppre.ind) from cppre 
inner join procedimientos on cppre.procedimiento=procedimientos.codigo
inner join cppredata on cppre.paciente=cppredata.historia
where 1=1 and
cppre.paciente in '.$ids.' 
and edad between 12 and 15
and asistio="S"
and procedimientos.nombre like "%VALORA%"
UNION
select "16 a 17",count(cppre.ind) from cppre 
inner join procedimientos on cppre.procedimiento=procedimientos.codigo
inner join cppredata on cppre.paciente=cppredata.historia
where 1=1 and
cppre.paciente in '.$ids.' 
and edad between 16 and 17
and asistio="S"
and procedimientos.nombre like "%VALORA%"
UNION
select "18 a 19",count(cppre.ind) from cppre 
inner join procedimientos on cppre.procedimiento=procedimientos.codigo
inner join cppredata on cppre.paciente=cppredata.historia
where 1=1 and
cppre.paciente in '.$ids.' 
and edad between 18 and 19
and asistio="S"
and procedimientos.nombre like "%VALORA%"
UNION
select "20 a 29",count(cppre.ind) from cppre 
inner join procedimientos on cppre.procedimiento=procedimientos.codigo
inner join cppredata on cppre.paciente=cppredata.historia
where 1=1 and
cppre.paciente in '.$ids.' 
and edad between 20 and 29
and asistio="S"
and procedimientos.nombre like "%VALORA%"
UNION
select "30 a 44",count(cppre.ind) from cppre 
inner join procedimientos on cppre.procedimiento=procedimientos.codigo
inner join cppredata on cppre.paciente=cppredata.historia
where 1=1 and
cppre.paciente in '.$ids.' 
and edad between 30 and 44
and asistio="S"
and procedimientos.nombre like "%VALORA%"
UNION
select "45 a 59",count(cppre.ind) from cppre 
inner join procedimientos on cppre.procedimiento=procedimientos.codigo
inner join cppredata on cppre.paciente=cppredata.historia
where 1=1 and
cppre.paciente in '.$ids.' 
and edad between 45 and 59
and asistio="S"
and procedimientos.nombre like "%VALORA%"
UNION
select "Más de 60",count(cppre.ind) from cppre 
inner join procedimientos on cppre.procedimiento=procedimientos.codigo
inner join cppredata on cppre.paciente=cppredata.historia
where 1=1 and
cppre.paciente in '.$ids.' 
and edad between 60 and 110
and asistio="S"
and procedimientos.nombre like "%VALORA%"

 ';
//echo $sql;
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