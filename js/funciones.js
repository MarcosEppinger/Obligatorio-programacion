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
	cargarOption()
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

		div.append(p1, p2, p3);
	}
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
			
