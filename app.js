'use strict';

var pacs = [];
var tabla;
$(document).ready(() => {


    //  var url = "http://192.168.2.25/adoweb/php/";
    var url = "php/";
    $("#pacientes").hide();
    $("#pagos").hide();
    $("#apacientesModal").click(e => {

        $("#pacientes").hide();
        $("#pagos").hide();
        $("#pacientesModal").modal("show");
        $("#criterio").focus();
    });


    $("#buscarPaciente").click(e => {

        // $(".navbar-toggler").click();
        $("#pacientesModal").modal("hide");

        $("#cverpagos").addClass("d-none");

        $.getJSON(url + "get_pacientes.php", { criterio: $("#criterio").val() }, pacientes => {

            let html = "";
            pacientes.forEach(paciente => {

                html += `
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
            $("#cverpagos").removeClass("d-none");
            $("#pacientes").show();

        });
    });


    $(document).on("click", ".verPagos", e => {


        let paciente = $(e.target).attr("data-id");
        $.getJSON(url + "get_pagos.php", { identificacion: paciente }, pagos => {

            let html = "";
            pagos.forEach(pago => {

                let valor = Number(parseFloat(pago.valor)).toLocaleString('co');
                html += `
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
            $("#pagos").removeClass("d-none");
        });


    });


    $("#navbarNavAltMarkup .nav-item").click(e => {
        e.preventDefault();
        $(".navbar-toggler").click();
        $(".page").addClass("d-none");
    });


    const getDataPac = async(f1 = "", f2 = "") => {

        $("#tablePacientes").toggleClass("d-none");
        let response = await fetch(url + "gdp.php", {
            method: "POST",
            body: JSON.stringify({ f1: f1, f2: f2 }),
            mode: 'cors',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "true",
                "Content-Type": "application/json"

            }
        });

        const reader = response.body.getReader();

        // Step 2: get total length
        const contentLength = +response.headers.get('Content-Length');
        console.log(response.headers.get('Content-Length'));
        // Step 3: read the data
        let receivedLength = 0; // received that many bytes at the moment
        let chunks = []; // array of received binary chunks (comprises the body)
        while (true) {
            const { done, value } = await reader.read();

            if (done) {
                break;
            }

            chunks.push(value);
            receivedLength += value.length;
            console.clear();

            console.log(receivedLength);
            let porcinicio = parseInt(receivedLength / contentLength * 100);
            $(".progress-bar").css("width", `${porcinicio}%`);
            $(".progress-bar").text(`${porcinicio}%`)
            $("#textload").text(`Recibiendo Datos ${parseInt(receivedLength / 1000)} kB de ${Math.round(contentLength / (1000))} kB`);

            console.log(`Received ${parseInt(receivedLength / contentLength * 100)}% of ${contentLength}`);
        }
        $("#textload").html(`Completado... Construyendo...</br>Espere por favor...`);

        // Step 4: concatenate chunks into single Uint8Array
        let chunksAll = new Uint8Array(receivedLength); // (4.1)
        let position = 0;
        for (let chunk of chunks) {
            chunksAll.set(chunk, position); // (4.2)
            position += chunk.length;
        }

        // Step 5: decode into a string
        let result = new TextDecoder("utf-8").decode(chunksAll);

        // We're done!
        let datos = JSON.parse(result);
        return (datos);
    }

    $("#navbarNavAltMarkup .dropdown-item").click(async e => {
        console.clear();
        e.preventDefault();
        $(".page").addClass("d-none");
        $(".navbar-toggler").click();

        let container = $(e.currentTarget).data("container");
        $(container).removeClass("d-none");
        await gdb();

    });


    const gdb = async(f1, f2) => {


        $(".spinner-border").toggleClass("d-none");
        $("#textload").toggleClass("d-none");
        $(".progress").toggleClass("d-none");
        let pacientes = await getDataPac(f1, f2);
        console.log(pacientes);
        let html = "<table id='tdataPac' class='display'>";
        html += "<thead>";
        html += "<tr>";
        Object.keys(pacientes[0]).forEach(key => {
            html += "<th>";
            html += key;
            html += "</th>";
        });
        html += "</tr>";
        html += "</thead>";
        html += "<tbody>";
        pacientes.forEach(paciente => {

            html += "<tr>";
            Object.keys(paciente).forEach(key => {
                html += "<td>";
                html += paciente[key];
                html += "</td>";
            });
            html += "</tr>";

        });
        html += "</tbody>";
        html += "</table>";
        $("#tablePacientes").empty().html(html);

        $("#tdataPac").DataTable({
            "language": {
                "url": "//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json"
            }
        });
        $("#textload").toggleClass("d-none");
        $(".progress").toggleClass("d-none");
        $(".spinner-border").toggleClass("d-none");
        $("#tablePacientes").toggleClass("d-none");
        $("#tdataPac").removeClass("d-none");

        return pacientes.map(p => {
            return p.identificacion
        });
    }


    $(".btnFechas").click(e => {
        e.preventDefault();
        let fechas =
            `<div class="row">

                    			<div class="col-12 col-sm-6">
                    				<label for="fecha1">Fecha Inicial</label>
                    				<input type="date" name="fecha1" id="fecha1">
                    			</div>
                    			<div class="col-12 col-sm-6">
                    				<label for="fecha2">Fecha Final</label>
                    				<input type="date" name="fecha1" id="fecha2">
                    			</div>
                    		</div>`;



        alertify.confirm('Seleccione Las Fechas', fechas, selFechas, function() { alertify.error('Cancel') });
        $("#fecha1,#fecha2").val(new Date().toDateInputValue());
    });


    const selFechas = async _ => {
        alertify.success('Consulta realizada con las fechas seleccionadas');
        let f1 = $("#fecha1").val();
        let f2 = $("#fecha2").val();
        pacs = await gdb(f1, f2);
        console.log(pacs);

    }



    const dataGraph = async(remoteFile, tabledt, thead, tbody, chart, label, body) => {
        console.clear();
        $(".spb").toggleClass("d-none");
        let params = {};
        if (body != "")
            params = { method: "POST", body: body, headers: { "Content-Type": "application/json" } };
        let response = await fetch(url + remoteFile, params);
        let poblacion = await response.json();
        console.log(poblacion);
        let html = '<tr>';
        Object.keys(poblacion[0]).forEach(key => {
            html += `
					<th>
						${key}
					</th>
			
			`
        });
        html += '</tr>';
        $(thead).empty().html(html);
        html = "";
        poblacion.forEach((dato, i) => {

            html += '<tr>';
            Object.keys(dato).forEach(key => {
                html += `
						
						<td class="text-center">
							${dato[key]}
						</td>
				
				`
            });
            html += '</tr>';
        });
        console.log(html);
        $(tbody).empty().html(html);
        let labels = poblacion.map((v) => {
            return v.rango;
        });
        console.log(labels);
        let edades = poblacion.map((v) => {
            return parseInt(v.cantidad);
        });
        console.log(edades);
        let colors = getColors(poblacion.length);
        let borders = getBorders(poblacion.length);

        var ctx = $(chart);
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: label,
                    data: edades,
                    backgroundColor: colors,
                    borderColor: borders,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
        if (tabla != undefined) tabla.destroy();
        tabla = $(tabledt).DataTable({
            "language": {
                "url": "//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json"
            },
            "ordering": false,
            "searching": false,

        });
        $(".spb").toggleClass("d-none");
    }

    const poblacion = async _ => {
        dataGraph("poblacion.php", "#poblacion", "#theadp", "#tpoblacion", "#myChartPoblacion", "Rangos de edades población atendida", "");
    }

    const coberturas = async _ => {
        dataGraph("coberturas.php", "#poblacionc", "#theadc", "#tcoberturas", "#myChartPoblacionc", "Consulta Odontológica población atendida", JSON.stringify(pacs));
    }

    const detartraje = async _ => {
        dataGraph("coberturas.php", "#poblaciondt", "#theaddt", "#tcoberturasdt", "#myChartPoblaciondt", "Control Placa Profilaxis - Detartraje", JSON.stringify(pacs));
    }

    $('.collapse').on('show.bs.collapse', e => {
        let collapse = $(e.currentTarget).attr("id");
        switch (collapse) {
            case 'collapseOne':
                poblacion();
                break;
            case 'collapseTwo':
                coberturas();
                break;
            case 'collapseThree':
                detartraje();
                break;
        }
    })

});