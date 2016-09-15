//variables gloabales
var listos, bloqueados, suspendidos, terminados, nProcesos,bloqueado;
var gant, canvas, ctx;
//main de la aplicación
$(document).ready(function(){	
	canvas=document.getElementById("gant");
	ctx=canvas.getContext("2d");
	bloqueado = false;
	nProcesos =5;//<-----NUMERO DE PROCESOS
	$("#gant").attr("height", 23*nProcesos);
	$("#contenedor").height(400 +(nProcesos*32));
	$("#contenedor2").height(100 +(nProcesos*23));
	$(".columna").height(20+(nProcesos*35));
	listos = new cola();	
	bloqueados = new cola();
	suspendidos = new cola();
	terminados = new cola();
	crearCola(nProcesos);
	gantear();	
	roundRobin();	
});
function gantear(){
	gant = new Array(nProcesos);
	for(i=0;i<nProcesos;i++){
		gant[i]=[];
		for(j=0;j<nProcesos;j++){
			gant[i].push(i);
		}
	}
	console.log(gant);
}
//crea la cola listos con datos aleatorios
function crearCola(procesos){
	for(i=0;i<procesos;i++){
		var id = i+1;
		var tiempo = Math.floor((Math.random()*4)+8);//tiempo entre 8 y 12
		var quantum = Math.floor((Math.random()*3)+2);//quantum entre 2 y 5
		listos.insertarUltimo(id,tiempo,quantum,0);		
	}
	dibujarCola(0);
}
function roundRobin(){
	var etapa1 = true;
	var etapa2 = true;
	var nodo;
	var suspendidoT = Math.floor((Math.random()*3)+3);
	var bloqueadoT = Math.floor((Math.random()*3)+3);	
	var nAtendidos=0;
	var clock=0;

	var hilo=setInterval(function(){
		$("#reloj").html("Sección Crítica: "+clock+" Milisegundos");
		clock= Math.round((clock+0.1)*10)/10;;		
		if(etapa1){
			if(!listos.vacia()){				
				nodo = listos.extraerPrimero();
				dibujarCola(0);		
				dibujarTransicion(nodo, 1);		
				dibujarProceso(nodo);				
				etapa1=false;
				etapa2=true;
			}
		}
		if(etapa2){
			if(nodo.tiempo>0){
				if(nodo.quantum>0){
					if(!bloquear(1)){//BLOQUEA UN PROCESO
						nodo.quantum = Math.round((nodo.quantum-0.1)*10)/10;
						nodo.tiempo =Math.round((nodo.tiempo-0.1)*10)/10;
						dibujarProceso(nodo);
						dibujarGant(nodo.proceso-1);
					}else{
						nodo.recurso = Math.floor((Math.random()*4));
						nodo.quantum = Math.floor((Math.random()*3)+2);//quantum entre 2 y 5
						bloqueados.insertarUltimo(nodo.proceso, nodo.tiempo, nodo.quantum, nodo.recurso);
						dibujarProceso(null);
						dibujarCola(1);
						etapa2=false;
						etapa1=true;
						mensaje(nodo, 0);
					}
				}else{
					 nodo.quantum = Math.floor((Math.random()*3)+2);//quantum entre 2 y 5
					 suspendidos.insertarUltimo(nodo.proceso, nodo.tiempo, nodo.quantum,0);
					 dibujarProceso(null);
					 dibujarCola(2);
					 etapa2=false;
					 etapa1=true;
				}
			}else{
				terminados.insertarUltimo(nodo.proceso, nodo.tiempo, nodo.quantum,0);
				dibujarProceso(null);
				dibujarCola(3);
				etapa2=false;
				etapa1=true;
				nAtendidos++;
			}
		}
		if(!suspendidos.vacia()){
			if(suspendidoT>0){
				suspendidoT-=0.1;
			}else{
				suspendidoT = Math.floor((Math.random()*2)+2);//TIEMPO QUE SE DEMORAN EN SUSPENDIDOS 2-4
				var temp = suspendidos.extraerPrimero();
				listos.insertarUltimo(temp.proceso, temp.tiempo, temp.quantum,0);
				dibujarCola(0);
				dibujarCola(2);
			}
		}
		if(!bloqueados.vacia()){
			if(bloqueadoT>0){
				bloqueadoT-=0.1;
			}else{
				bloqueadoT = Math.floor((Math.random()*2)+2);//TIEMPO QUE SE DEMORAN EN BLOQUEADOS 2-4
				var temp = bloqueados.extraerPrimero();
				listos.insertarUltimo(temp.proceso, temp.tiempo, temp.quantum,temp.recurso);
				dibujarCola(0);
				dibujarCola(1);
				mensaje(temp,1);
			}
		}
		if(nAtendidos == nProcesos){
			$("#mensaje").html("Todos los procesos se han atendido exitosamente!");
			clearInterval(hilo);
		}
	},500);//<---VELOCIDAD DEL HILO EN MS
}
function dibujarCola(i){
	var text = "";
	var textoCola="";
	var F=function(){} ; 	
	var nodo;
	switch(i){
		case 0:textoCola="#listos";F.prototype = listos;break;
		case 1:textoCola="#bloqueados";F.prototype = bloqueados;break;
		case 2:textoCola="#suspendidos";F.prototype = suspendidos;break;
		case 3:textoCola="#terminados";F.prototype = terminados;break;
	}
	var cola = new F();
	text +="<ul class='lista'>";
	while(!cola.vacia()){
		nodo = cola.extraerPrimero();
		text +="<li><p>proceso "+nodo.proceso+"</p></li>";
	}	
	text +="</ul>";
	$(textoCola).html(text);
}
function dibujarProceso(nodo){
	var text = "";
	if(nodo!=null){
		text +="<p>proceso "+nodo.proceso+"</p>";
		text +="<p>Tiempo de Ejecución:"+nodo.tiempo+"</p>";
		text +="<p>Quantum: "+nodo.quantum+"</p>";	
	}else{
		$("#proceso").animate({opacity:'0'},100);
	}
	$("#proceso").html(text);
}
function dibujarTransicion(nodo, n){
	$("#anim").html("proceso "+ nodo.proceso);	
	if(n==1){
		var w = $(window).width();
		var h = $(window).height();
		var w1= (w*0.41)+"px";
		$("#proceso").animate({opacity:'0'},400);
		$("#anim").animate({opacity:'1'},0);
		$("#anim").offset({ top: h*0.4, left: w*0.1 });
		$("#anim").animate({left:w1, top:'140px', width:'260px'},300);	
		$("#anim").animate({opacity:'0'},200);
		$("#proceso").animate({opacity:'1'},0);
	}	
}
function bloquear(n){
	var bloquear = Math.floor((Math.random()*100)+1);
	var b=false;	
	if(bloquear<=n){
		b=true;
	}
	return b;
}
function dibujarGant(n){	
	ctx.fillStyle="#5353FF";
	ctx.font="20px Arial";
	for(i=0;i<nProcesos;i++){
		if(i==n){
			gant[i].push(1);			
		}else{
			gant[i].push(0);
		}
		ctx.fillText("proceso"+(i+1),10,22*(i+1));
	}
	for(i=0;i<nProcesos;i++){
		var ultimo = gant[i].length-1;
			if(gant[i][ultimo]==1){
				ctx.fillRect(100+Math.round(gant[i].length/(nProcesos*0.1)),5+(22*i),1,20);
			}	
	}

}
function mensaje(p, r){
	var text="Proceso "+p.proceso+": ";	
	if(r==0){
		switch(p.recurso){
			case 0: text+="No hay papel en la impresora";break;
			case 1: text+="El puerto USB ha sido desconectado";break;
			case 2: text+="El proceso ha sido interrumpido por el usuario";break;
			case 3: text+="no se encuentra punto de acceso a la red";break;
			default: break;
		}
		$("#mensaje").html("<p>"+text+"</p>");
		$( "#mensaje" ).show();
		$( "#mensaje" ).fadeOut( 4000, function() {});
	}else if(r==1){
		switch(p.recurso){
			case 0: text+="Ya hay papel en la impresora";break;
			case 1: text+="El puerto USB ha sido reconectado";break;
			case 2: text+="El proceso ha sido reanudado por el usuario";break;
			case 3: text+="ya hay acceso a la red";break;
			default: break;
		}
		$("#respuesta").html("<p>"+text+"</p>");
		$( "#respuesta" ).show();
		$( "#respuesta" ).fadeOut( 4000, function() {});
	}
}

