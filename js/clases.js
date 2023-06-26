class Sistema{
	constructor(){
		this.listaEmpresas = [];
		this.listaEmpresas.push(new Empresa('Alfa', '18 de Julio 12345', 'Muebles'));
		this.listaEmpresas.push(new Empresa('TodoViajes SA', 'Av Italia 51515', 'Viajes'));
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
	existeEmpresa(empresa){
        let existe = false;
        for (let i = 0; i < this.listaEmpresas.length && !existe; i++) {
            if (this.listaEmpresas[i].nombre.toLowerCase() === empresa.toLowerCase()){
                existe = true;
            }
        }
        return existe;
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
		let rubros = ["Viajes",
			"Restaurantes",
			"Bancos",
			"Muebles",
			"Autos",
			"Servicios",
			"General"]
		let arrayNum = [2, 2, 0, 0, 0, 0, 0]	
		let arrayEmpresas = Array.from(this.darEmpresasCon())
		let max = 0;
		let res = { rubro: [], cant: 0 };
		for (let i = 0; i < rubros.length; i++){
			for (let elem of arrayEmpresas){
				if (elem.rubro == rubros[i]){
					arrayNum[i]++
				}
			}
		}
		for (let i = 0; i < arrayNum.length; i++){
			if (arrayNum[i] > max){
			max = arrayNum[i];
			res = { rubro: [rubros[i]], cant: max };
			}else
			if (arrayNum[i] == max){
				res.rubro.push(rubros[i]);
			}
		}
		if (max == 0){
			return "No hay datos"
		}else{
		
		return res
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
