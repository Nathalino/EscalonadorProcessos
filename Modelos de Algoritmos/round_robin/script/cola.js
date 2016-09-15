/*------------------
	OBJETO COLA
-------------------*/
//constructor
function cola(){
	this.raiz = null;
	this.fondo = null;
	this.insertarPrimero = insertarNodoP;
	this.insertarUltimo = insertarNodoU;
	this.extraerPrimero = extraerNodoP;
	this.extraerUltimo = extraerNodoU;
	this.vacia = vacia;
}

//inserta un nodo en la cola de primero
function insertarNodoP(proceso, tiempo, quantum,recurso){
	var nuevo = new nodo();
	nuevo.proceso = proceso;
	nuevo.tiempo = tiempo;
	nuevo.quantum = quantum;
	nuevo.recurso = recurso;
	nuevo.sig = null;

	if(this.vacia()){
		this.raiz = nuevo;
        this.fondo = nuevo;
	}else{
		this.raiz = nuevo;
		this.raiz.sig = this.fondo;
		this.fondo = this.raiz;
	}
}

//inserta un nodo en la cola de ultimo
function insertarNodoU(proceso, tiempo, quantum,recurso){
	var nuevo = new nodo();
	var colaTemp = new cola();
	nuevo.proceso = proceso;
	nuevo.tiempo = tiempo;
	nuevo.quantum = quantum;
	nuevo.recurso = recurso;
	nuevo.sig = null;

	if(this.vacia()){
		this.raiz = nuevo;
        this.fondo = nuevo;
	}else{
		while(!this.vacia()){	
			var temp = new nodo();		
			temp = this.extraerPrimero();
			colaTemp.insertarPrimero(temp.proceso, temp.tiempo, temp.quantum,temp.recurso); 		
		}
		this.insertarPrimero(proceso, tiempo, quantum,recurso);		
		while(!colaTemp.vacia()){
			var temp = new nodo();		
			temp = colaTemp.extraerPrimero();
			this.insertarPrimero(temp.proceso, temp.tiempo, temp.quantum,temp.recurso); 	
		}
	}
}

//retorna el primer nodo de la cola
function extraerNodoP(){
	var nuevo = this.raiz;
	if(!this.vacia()){
		this.raiz = this.raiz.sig;
	}
	return nuevo;
}

//retorna el ultimo nodo de la cola
function extraerNodoU(){
	var nuevo = new nodo();
	var colaTemp = new cola();
	while(this.raiz.sig!=null){	
		var temp = new nodo();		
		temp = this.extraerPrimero();
		colaTemp.insertarPrimero(temp.proceso, temp.tiempo, temp.quantum,temp.recurso); 		
	}
	nuevo = this.extraerPrimero();		
	while(!colaTemp.vacia()){
		var temp = new nodo();		
		temp = colaTemp.extraerPrimero();
		this.insertarPrimero(temp.proceso, temp.tiempo, temp.quantum,temp.recurso); 	
	}
	return nuevo;
}

//devuelva true si la cola esta vacia
function vacia(){
	if (this.raiz == null) {
        return true;
    } else {
        return false;
    }
}