window.addEventListener("load", inicio)

let sistema = new Sistema()

function inicio(){
	document.getElementById("idBtnD").addEventListener("click", agregarEmpresa)
	document.getElementById("idBtnD").addEventListener("click", cargarOption)
	document.getElementById("idBtnReclamo").addEventListener("click", agregarReclamo)
}

	
function agregarEmpresa(){
	let miForm = document.getElementById("idFormEmpresa")
	if(miForm.reportValidity()){
		let nom=document.getElementById("idNombreD").value;
		let dire=document.getElementById("idDireccionD").value;
		let rubro=document.getElementById("idRubroD").value;
		sistema.agregarEmpresa(new Empresa(nom, dire, rubro))
		miForm.reset();
		//actualizar();
	}
}

function cargarOption(){
	let lista = document.getElementById("idEmpresa");
	lista.innerHTML = "";
	let datos = sistema.darTodos();
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
		//actualizar();
	}
}