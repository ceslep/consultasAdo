$(document).ready(()=>{
	
	
	var url="/adoweb/php/";
	$("#pacientes").hide();
	$("#pagos").hide();
	$("#apacientesModal").click(e=>{
		
	       $("#pacientes").hide();	
		   $("#pagos").hide();
		   $("#pacientesModal").modal("show");
		   $("#criterio").focus();
	});
	
	  
	$("#buscarPaciente").click(e=>{
		
		
		$("#pacientesModal").modal("hide");
		$(".navbar-toggler-icon").click();
		$.getJSON(url+"get_pacientes.php",{criterio:$("#criterio").val()},pacientes=>{
			
			let html="";
			pacientes.forEach(paciente=>{
				
				html+=`
						<tr>
							<td>
								${paciente.identificacion}
							</td>
							<td>
								${paciente.nombres}
							</td>
							<td>
								<button class="btn btn-info btn-sm verPagos" id="btn_a${paciente.identificacion}" data-id="${paciente.identificacion}">Ver</button>
							</td>
						</tr>
				
				`
					
				
			});
			$("#dataPacientes").html(html);
			$("#pacientes").show();
			  
		});
	});  
	
	
	$(document).on("click",".verPagos",e=>{
		
		
		let paciente=$(e.target).attr("data-id");
		$.getJSON(url+"get_pagos.php",{identificacion:paciente},pagos=>{
			
			let html="";
			pagos.forEach(pago=>{
				
						let valor=Number(parseFloat(pago.valor)).toLocaleString('co');
						html+=`
								<tr>
									<td>
										${pago.fecha}
									</td>
									<td style="text-align:right;">
										${pago.facturano}
									</td>
									<td style="text-align:right;">
										${valor}
									</td>
									<td>
										${pago.detalle}
									</td>
									<td>
										${pago.tipo_pago}
									</td>
									<td>
										${pago.doctor}
									</td>
								</tr>	
						`;
				
			});
			$("#dataPagos").html(html);
			$("#pacientes").hide();
			$("#pagos").show();
		});
		
		
	});
});