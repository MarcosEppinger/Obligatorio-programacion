window.addEventListener("load", inicio)

let sistema = new Sistema()

function inicio(){
	document.getElementById("idBtnD").addEventListener("click", agregarEmpresa)
	document.getElementById("idBtnD").addEventListener("click", cargarOption)
	document.getElementById("idBtnReclamo").addEventListener("click", agregarReclamo)
	
	actualizar();
}

function actualizar(){
	mostrarEmpresasSin();
	cargarOption();
	crearTabla();
	//document.getElementsByClassName("btn").addEventListener("click", contador)
}	


function agregarEmpresa(){
	let miForm = document.getElementById("idFormEmpresa")
	if(miForm.reportValidity()){
		let nom=document.getElementById("idNombreD").value;
		let dire=document.getElementById("idDireccionD").value;
		let rubro=document.getElementById("idRubroD").value;
		sistema.agregarEmpresa(new Empresa(nom, dire, rubro))
		miForm.reset();
		actualizar();
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
	let datos = sistema.darReclamos();
	let section = document.getElementById("idIngresados");
	section.innerHTML = ""
	let h3 = document.createElement("h3");
	let tit = document.createTextNode("Reclamos Ingresados (los más recientes primero)")
	h3.appendChild(tit);
	section.appendChild(h3)
	let art = document.createElement("article");
	for (let i = datos.length - 1; i>=0 ; i--) {
		
		let art1 = section.appendChild(art);
		let h4 = document.createElement("h4")
		let re = document.createTextNode('Reclamo N. ' + parseInt(i+1));
		h4.appendChild(re);
		art1.appendChild(h4);

		let div = art.appendChild(document.createElement("div"));
		
		let p1 = document.createElement("p");
		p1.innerHTML =  datos[i].nombre + ": " + datos[i].reclamo;
		let p2 = document.createElement("p");
		p2.innerHTML =  "Empresa: " + datos[i].empresa;
		let p3 = document.createElement("p");
		p3.innerHTML =  datos[i].texto;

		div.append(p1, p2, p3,);
		
		let boton = document.createElement("button");
		boton.id = "IdBotonArt" + i;
		boton.innerHTML = "A mi También me pasó!";
		boton.className = "btn";
		let conta = 0
		div.append(boton);
		boton.onclick = function(){
			
			conta++;
			let cont = document.createTextNode(" Contador: "+ conta)
			
			div.append(cont);
		}
		
		
		
	
		//let cont = document.createTextNode(" Contador: "+ conta)
		
	}
	actualizar();
}

//document.getElementsByClassName("btn").addEventListener("click", contador);

/*function contador(){
	
	let cont = 0;
	for (i = 0; i < sistema.listaReclamos.length; i++ ){
		let num = document.getElementById("IdBotonArt" + i)
		num.onclick = function(){
			cont++
		}
		
	
	}
return cont
}*/

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

function crearTabla(){
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
	for (let elem of sistema.listaEmpresas){
		let tr = document.createElement("tr");
		let td1 = document.createElement('td');
		let td2 = document.createElement('td');
		let td3 = document.createElement('td');
		//let td4 = document.createElement('td');
		td1.innerHTML = elem.nombre;
		td2.innerHTML = elem.direccion;
		td3.innerHTML = elem.rubro;
		//td4.innerHTML = elem.cantidad;
		tr.append(td1, td2, td3);
		body.appendChild(tr);

		
		
	}
}