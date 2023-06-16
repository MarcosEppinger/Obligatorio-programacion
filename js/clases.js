class Sistema{
	constructor(){
		this.listaEmpresas= [];
		this.listaEmpresas.push(new Empresa('Epp', 'Veracierto', 'Bobinados'));
		this.listaReclamos = [];
	}
	agregarEmpresa(unaEmpresa){
		this.listaEmpresas.push(unaEmpresa);
	}
	darEmpresas(){
		return this.listaEmpresas;
	}
	agregarReclamo(unReclamo){
		this.listaReclamos.push(unReclamo);
	}
	darReclamos(){
		return this.listaReclamos;
	}
	darEmpresasSin(){
		let arr = Array.from(this.listaEmpresas);
		for (let emp of this.listaEmpresas){
			for (let rec of this.listaReclamos){
				if (rec.empresa === emp.nombre){
					arr.shift()
				}
			}
		}
	return arr;
	}
	darMayorRubro(){
		let arr = Array.from(this.listaEmpresas);
		suma = 0;
		for (let elem of arr){
			
		}
	}
}

class Empresa{
	constructor(nombre, direccion, rubro){
		this.nombre=nombre
		this.direccion=direccion
		this.rubro=rubro
	}
	toString(){
		return this.nombre
	}
	
}

class Reclamo{
	constructor(nombre, empresa, reclamo, texto){
		this.nombre=nombre
		this.empresa=empresa
		this.reclamo=reclamo
		this.texto=texto
	}
	
}