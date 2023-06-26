window.addEventListener("load", inicio)

let sistema = new Sistema()

function inicio(){
	document.getElementById("idBtnD").addEventListener("click", agregarEmpresa)
	document.getElementById("idBtnD").addEventListener("click", cargarOption)
	document.getElementById("idBtnReclamo").addEventListener("click", agregarReclamo)
	document.getElementById("idCre").addEventListener("click", crearTabla);
    document.getElementById("idDecre").addEventListener("click", crearTabla);
    
	document.getElementById("idBoton").addEventListener("click", mostrarAgregarReclamos);
    document.getElementById("mIngresados").addEventListener("click", mostrarReclamos);
    document.getElementById("mPrincipal").addEventListener("click", mostrarPrincipal);
    document.getElementById("mAgregarE").addEventListener("click", mostrarAgregarEmpresa);
    document.getElementById("mEstadisticas").addEventListener("click", mostrarEstadisticas);
	
	actualizar();
	mostrarPrincipal();
}

function actualizar(){
	mostrarEmpresasSin();
	cargarOption();
	crearTabla();
	estadisticas()
}	

function mostrarEstadisticas(){
	ocultarTodos();
	document.getElementById("idEstadisticas").style.display = "block";
}

function mostrarAgregarEmpresa(){
	ocultarTodos();
	document.getElementById("idAgregarE").style.display = "block";
}

function mostrarPrincipal(){
	ocultarTodos();
	document.getElementById("idPrincipal").style.display = "block";
}

function mostrarAgregarReclamos(){
	ocultarTodos();
	document.getElementById("idReclamos").style.display = "block";
}

function mostrarReclamos(){
	ocultarTodos();
	document.getElementById("idIngresados").style.display = "block";
}

function ocultarTodos(){
	document.getElementById("idPrincipal").style.display = "none";
	document.getElementById("idReclamos").style.display = "none";
	document.getElementById("idIngresados").style.display = "none";
	document.getElementById("idEstadisticas").style.display = "none";
	document.getElementById("idAgregarE").style.display = "none";
}

function agregarEmpresa(){
	let miForm = document.getElementById("idFormEmpresa")
	if(miForm.reportValidity()){
		let nom = document.getElementById("idNombreD").value;
		let dire = document.getElementById("idDireccionD").value;
		let rubro = document.getElementById("idRubroD").value;
		if (sistema.existeEmpresa(nom)){
			alert ("Esta empresa ya está registrada.")
			miForm.reset();
		}else{
			sistema.agregarEmpresa(new Empresa(nom, dire, rubro))
			miForm.reset();
			actualizar();
		}
	}
}

function cargarOption(){
	let lista = document.getElementById("idEmpresa");
	lista.innerHTML = "";
	let datos = sistema.darEmpresas();
	for (let elem of datos){
		let nodo = document.createElement("option");
		let nodoTexto = document.createTextNode(elem);
		nodo.appendChild(nodoTexto)
		lista.appendChild(nodo);
	}
		
}

function agregarReclamo(){
	let miForm = document.getElementById("idFormReclamos")
	if(miForm.reportValidity()){
		let nom = document.getElementById("idNombre").value;
		let emp = document.getElementById("idEmpresa").value;
		let reclamo = document.getElementById("idReclamo").value;
		let texto = document.getElementById("idReclamoTexto").value;
		sistema.agregarReclamo(new Reclamo(nom, emp, reclamo, texto))
		miForm.reset();
		agregarArt();
		actualizar();
	}
}

function agregarArt(){
	let datos = sistema.darUltimoReclamo();
	let section = document.getElementById("idIngresados");
	let cantidad = sistema.listaReclamos.length;
	
	let art = document.createElement("article");
	let art1 = section.insertBefore(art, section.childNodes[2]);
	let h4 = document.createElement("h4");
	let re = document.createTextNode('Reclamo N. ' + cantidad);
	h4.appendChild(re);
	art1.appendChild(h4);

	let div = art.appendChild(document.createElement("div"));

	let p1 = document.createElement("p");
	p1.innerHTML =  datos[0].nombre + ": " + datos[0].reclamo;
	let p2 = document.createElement("p");
	p2.innerHTML =  "Empresa: " + datos[0].empresa;
	let p3 = document.createElement("p");
	p3.innerHTML =  datos[0].texto;

	div.append(p1, p2, p3);
	
	let boton = document.createElement("button");
	boton.id = "IdBotonArt" + cantidad;
	boton.innerHTML = "¡A mi También me pasó!";
	boton.className = "btn";
	div.append(boton);
	
	let contador = 0
	let cont = document.createTextNode(" Contador: " + 0);
	div.append(cont);
	boton.onclick = function(){
		cont.parentNode.removeChild(cont);
		contador++;
		cont = document.createTextNode(" Contador: "+ contador)
		
		div.append(cont);
	}
	actualizar();
}

function mostrarEmpresasSin(){
	let array = sistema.darEmpresasSin();
	let ul = document.getElementById("idSinRec");
	ul.innerHTML = "";
	if (array.length == 0){
		let li = document.createElement('li')
		let texto = document.createTextNode("No hay empresas sin reclamos.")
		li.appendChild(texto);
		ul.appendChild(li);	
		
	}else{	
		for (let elem of array){
		let li = document.createElement('li')
		let texto = document.createTextNode(
			elem.nombre + " (" + elem.direccion + ") " + "Rubro: " + elem.rubro);
		li.appendChild(texto);
		ul.appendChild(li);
		}
	}
}	
		
function crearBotoneria(){
	let art = document.getElementById("botoneria");
	art.innerHTML = "";
	btn = document.createElement("button");
	btn.innerHTML = "*"
	btn.onclick = function(){
		sistema.letraSeleccionada = "*"
		crearTabla();
	}
	art.appendChild(btn);
	let letrasUsadas = [];
	for (let i=0; i< sistema.listaEmpresas.length; i++ ){
		
		letra = sistema.listaEmpresas[i].nombre.charAt(0).toUpperCase();
		
		if (!(letrasUsadas.includes(letra))){
			
			
			letrasUsadas.push(letra);
			let boton = document.createElement("button");
			boton.innerHTML = letra;
			//boton.id = "IdBotoneria" + letra;
			art.appendChild(boton);
			boton.onclick = function(){
				sistema.letraSeleccionada = boton.innerHTML;
				crearTabla();

			}
		}
	}
}

function crearTabla(){
	crearBotoneria();
	let table = document.getElementById("idTabla")
	table.innerHTML = ""
	let caption = document.createElement("caption");
	caption.innerHTML = "Empresas que empiezan con";
	table.appendChild(caption);
	let head = document.createElement("thead");
	let trh = document.createElement("tr");
	let th1 = document.createElement("th");
	let th2 = document.createElement("th");
	let th3 = document.createElement("th");
	let th4 = document.createElement("th");
	th1.innerHTML = "Nombre";
	th2.innerHTML = "Dirección";
	th3.innerHTML = "Rubro";
	th4.innerHTML = "Cantidad";
	trh.append(th1, th2, th3, th4);
	head.appendChild(trh);
	table.appendChild(head);
	let body = document.createElement("tbody");
	table.appendChild(body);
	
	let lista = []
	if(document.getElementById("idCre").checked){
        lista = sistema.darEmpresasCreciente();    
    }else{
        lista = sistema.darEmpresasDecreciente();    
    }
	for (let elem of lista){
		let tr = document.createElement("tr");
		let td1 = document.createElement('td');
		let td2 = document.createElement('td');
		let td3 = document.createElement('td');
		let td4 = document.createElement('td');
		td1.innerHTML = elem.nombre;
		td2.innerHTML = elem.direccion;
		td3.innerHTML = elem.rubro;
		td4.innerHTML = sistema.darCantidadDeReclamos(elem);
		tr.append(td1, td2, td3, td4);
		body.appendChild(tr);

		
		
	}
}

function estadisticas(){
	let p = document.getElementById("idEregistradas");
	let sumaEmpresas = 0;
	for (let elem of sistema.listaEmpresas){
		sumaEmpresas++
	}
	p.innerHTML = "Total de empresas registradas: " + sumaEmpresas;

	let p2 = document.getElementById("idPromedio");
	let sumaReclamos = 0;
	for (let elem of sistema.listaReclamos){
		sumaReclamos++
	}
	let promedio = (sumaReclamos/sumaEmpresas).toFixed(1);
	if (promedio == 0.0){
		p2.innerHTML = "El promedio de las cantidades considerando todos los reclamos " +
		"de todas las empresas es 0";
	}else{
		p2.innerHTML = "El promedio de las cantidades considerando todos los reclamos " +
		"de todas las empresas es " + promedio;
	}	

	let ul = document.getElementById("idUlMax");
	ul.innerHTML = "";
	let li = document.createElement('li')
	
	let res = sistema.darMayorRubro();
	if (res == ": cantidad: 0"){
		res = "No hay reclamos"
	}
	li.innerHTML = res;	
	ul.appendChild(li);
}