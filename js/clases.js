class Sistema{
	constructor(){
		this.listaEmpresas = [];
		this.listaEmpresas.push(new Empresa('ModoViajes SA', 'Av Italia 51515', 'Viajes'));
		this.listaReclamos = [];
		this.letraSeleccionada = "*";
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
		let empresasSinReclamos = [];
		for (let emp of this.listaEmpresas){
			let tieneReclamos = false;
			for (let rec of this.listaReclamos){
				if (rec.empresa === emp.nombre){
					tieneReclamos = true
					break;
				}
			}
			if (!tieneReclamos){
				empresasSinReclamos.push(emp)
			}
		}
	return empresasSinReclamos;
	}
	darEmpresasCon(){
		let arraySin = Array.from(this.darEmpresasSin());
		let arrayComp = Array.from(this.listaEmpresas)
		let dif = arrayComp.filter(x => !arraySin.includes(x));
		return dif;
	}
	darMayorRubro(){
		let arr = []
		let array = Array.from(this.darEmpresasCon())
		//suma = 0;
		for (let elem of array){
			arr.push(elem.rubro)
	
		}
		console.log (arr)

		let contador = {};
  		let maxRepetido = '';
  		let maxCount = 0;

  		for (let i = 0; i < arr.length; i++) {
   			const elemento = arr[i];
   			contador[elemento] = (contador[elemento] || 0) + 1;

    	if (contador[elemento] > maxCount) {
      		maxCount = contador[elemento];
      		maxRepetido = elemento;
    		}
  		}

		return maxRepetido + ": cantidad: " + maxCount;
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