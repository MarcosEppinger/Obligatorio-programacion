class Sistema{
	constructor(){
		this.listaEmpresas = [];
		this.listaEmpresas.push(new Empresa('ModoViajes SA', 'Av Italia 51515', 'Viajes'));
		this.listaReclamos = [];
		this.letraSeleccionada = "*";
		this.listaBotones = [];
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
	darUltimoReclamo(){
		return this.listaReclamos.slice(-1);
	}
	darCantidadDeReclamos(emp){
		let suma = 0;
		for (let elem of this.listaReclamos){
			if (elem.empresa == emp){
					suma++;
			}
		}
		return suma;
	}
	darEmpresasFlitradas(){
		let lista = []
        if (this.letraSeleccionada === "*"){
			lista = this.listaEmpresas;
		}else{
			for (let i = 0; i < this.listaEmpresas.length; i++) {
            	let emp = this.listaEmpresas[i];
            	if(emp.nombre.charAt(0).toUpperCase() === this.letraSeleccionada){
                	lista.push(emp);
            	}
       		}
		}
			//ordenar lista
        return lista;
	}
	darEmpresasCreciente(){
        
		let arr = Array.from(this.darEmpresasFlitradas());
		return arr.sort(function(e1, e2){
            return e1.nombre.localeCompare(e2.nombre);
        });
    }

    darEmpresasDecreciente(){
        let arr = Array.from(this.darEmpresasFlitradas());
		return arr.sort(function(e1, e2){
            return e2.nombre.localeCompare(e1.nombre);
        });
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