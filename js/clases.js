class Sistema{
	constructor(){
		this.listaEmpresas=[];
		this.listaEmpresas.push(new Empresa('Epp', 'Veracierto', 'Bobinados'));
		this.listaReclamos = [];
	}
	agregarEmpresa(unaEmpresa){
		this.listaEmpresas.push(unaEmpresa);
	}
	darTodos(){
		return this.listaEmpresas;
	}
	agregarReclamo(unReclamo){
		this.listaReclamos.push(unReclamo);
	}
}

class Empresa{
	constructor(nombre, direccion, rubro){
		this.nombreE=nombre
		this.direccion=direccion
		this.rubro=rubro
	}
	toString(){
		return this.nombreE;
	}
	
}

class Reclamo{
	constructor(nombre, Empresa, reclamo, texto){
		this.nombre=nombre
		this.empresa=Empresa
		this.reclamo=reclamo
		this.texto=texto
	}
	
}