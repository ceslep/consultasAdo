<?php
			header("Access-Control-Allow-Origin: *");
			require_once("datos_conexion.php");
			require("json_encode.php");
			$enlace =  mysql_connect($host, $user, $pass);
			
			mysql_select_db($database,$enlace);
			$sql='';
			$sql.='Select distinct concat_ws(":",abonos.ind,if(paciente.consecuencia="S",facturano,if(recibo is null,facturano,recibo))) as recibo,abonos.paciente,total_pacientes.nombres,';
			$sql.='concat_ws(" ",tipo_pago,detalle,items) as cheque,sum(valor_abono) as svalor_abono,saldos.saldo,hora,if(concita="S","Si","No") as concita,left(forma_de_pago,1) as fpago';
			$sql.=',facturano,dcoc,tipoa from abonos';
			$sql.=' left join total_pacientes on abonos.paciente=total_pacientes.historia';
			$sql.=' left join paciente on abonos.paciente=paciente.historia';
			$sql.=' left join saldos on abonos.paciente=saldos.paciente and abonos.tipo=saldos.tipo';
			$sql.=' where 1=1';
			$sql.=' and abonos.fecha>="2019-12-16" and abonos.fecha<="2019-12-16"';
			$sql.=' group by hora,paciente,facturano';
			$sql.=' UNION';
			$sql.=' select distinct concat_ws(":",abonos_borrados.ind,facturano) as recibo,abonos_borrados.paciente,total_pacientes.nombres,';
			$sql.=' concat_ws(" ","@ANULADA",tipo_pago,detalle,items,"@ANULADA") as cheque,sum(valor_abono) as svalor_abono,saldos.saldo,hora,if(concita="S","Si","No") as concita,left(forma_de_pago,1) as fpago';
			$sql.=' ,facturano,dcoc,tipoa from abonos_borrados';
			$sql.=' left join total_pacientes on abonos_borrados.paciente=total_pacientes.historia';
			$sql.=' left join paciente on abonos_borrados.paciente=paciente.historia';
			$sql.=' left join saldos on abonos_borrados.paciente=saldos.paciente and abonos_borrados.tipo=saldos.tipo';
			$sql.=' where 1=1';
			$sql.=' and abonos_borrados.fecha>="2019-12-16" and abonos_borrados.fecha<="2019-12-16"';
			$sql.=' group by hora,paciente,facturano';
			$sql.=' order by facturano';
			
			$resultado=mysql_query($sql,$enlace);
			$datos=array();
			while($dato=mysql_fetch_assoc($resultado)) $datos[]=$dato;
			
			echo json_encode($datos);
			mysql_close($enlace);
?>