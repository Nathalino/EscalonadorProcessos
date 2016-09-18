/*SIMULADOR DE PROCESSOS*/

//Variaveis Globais:
var idProcessos = 0;
var totalProcessadores;
var totalProcessosIniciais;
var quantum;

var processador = new Array();
var filap0 = new Array();
var filap1 = new Array();
var filap2 = new Array();
var filap3 = new Array();
var filaProntos = new Array();


//CONSTRUTOR
function consProcesso(){
	var id;
	var tempoVida;
	var tempoRestante;
	var filaPrioridade;	
}


/*CORPO DA SIMULACAO*/
function acao(){

	//Variavel de validacoes:
	var ValidacaoQuantum = validacaoCampos("fquantum", "quantum");
	var ValidacaoNumeroProcessosIniciais = validacaoCampos("fnProcessos", "número de processos iniciais");
	var ValidacaoProcessadores = validacaoCampos("fnProcessadores", "número de processadores");

	//Apos a validação iniciando o processo de simulacao:
	if(ValidacaoProcessadores && ValidacaoNumeroProcessosIniciais && ValidacaoQuantum){

		//Desabilitando os campos do formulario até a finalização do processamento:
		document.getElementById("fquantum").disabled = true;
		document.getElementById("fnProcessos").disabled = true;
		document.getElementById("fnProcessadores").disabled = true;

		//Inserido no HTML o tamanho do Quantum:
		quantum = document.getElementById("fquantum").value;
		document.getElementById("Cquantum").innerHTML = quantum;

		//Criando Processos e inserindo na Fila de espera:
		totalProcessosIniciais = document.getElementById("fnProcessos").value;
		CriacaoProcessos(totalProcessosIniciais);
		
		//Inserindo elementos no processadores:
		totalProcessadores = document.getElementById("fnProcessadores").value;
		Processando(totalProcessadores);
						ProcessadorEmMovimento();// >>>>>>>>>>>>>>>>_ COLOQUEI PRA TESTAR
		console.log("Fila de Prioridade 0");
		for(var i=0 ; i<filap0.length; i++){
			console.log(filap0[i]);	
		}
		console.log("/////////////////////");
		console.log("Fila de Prioridade 1");
		for(var i=0 ; i<filap1.length; i++){
			console.log(filap1[i]);	
		}
		console.log("/////////////////////");		
		console.log("Fila de Prioridade 2");
		for(var i=0 ; i<filap2.length; i++){
			console.log(filap2[i]);	
		}
		
		console.log("/////////////////////");
		console.log("Fila do Processador");
		for(var i=0 ; i<processador.length; i++){
			console.log(processador[i]);	
		}
		/*
		var a = 3;
		console.log("INICIO");
		for(var i=0 ; i<=a; i++){
			console.log(filap0[i]);
			console.log(filap1[i]);
			console.log(filap2[i]);
			console.log(filap3[i]);	
		}
		*/
	}


}


//CRIACAO DOS PROCESSOS:
function CriacaoProcessos(totalProcessos){

	for(var x = 0; x<totalProcessos; x++){

		var objetoProcessos = new consProcesso(); 
		var tempoDeVida = Math.floor((Math.random()*4)+16); //tempo entre 4 e 20.
		var nFilaPrioridade = Math.floor((Math.random()*3)+0);//tempo entre 3 e 0.

		objetoProcessos.id = idProcessos;
		objetoProcessos.tempoVida = tempoDeVida;
		objetoProcessos.tempoRestante = tempoDeVida;
		objetoProcessos.filaPrioridade = nFilaPrioridade;
		
		inserirElementoFila(objetoProcessos);
		idProcessos++;
	}

}


//INSERINDO ELEMENTOS NA FILA DE ACORDO COM SUA PRIORIDADE:
function inserirElementoFila(objeto){

	switch(objeto.filaPrioridade){
		
		case 0:
			filap0[filap0.length] = objeto;
			//console.log(filap0[filap0.length-1]);	
		break;
		
		case 1:
			filap1[filap1.length] = objeto;
			//console.log(filap1[filap1.length-1]);
		break;

		case 2:
			filap2[filap2.length] = objeto;
			//console.log(filap2[filap2.length-1]);
		break;

		case 3:
			filap3[filap3.length] = objeto;
			//console.log(filap3[filap3.length-1]);
		break;

		default:
			alert("Não foi possível criar o(s) processo(s) na(s) fila(s) de prioridade(s).");
		break;
	}

}


//INSERINDO ELEMENTOS NA FILA PRONTO(S)----------------------------------------------------------------------------------------------------BrenoNegreiros
/*
function inserirProntos(objeto){
	
	filaProntos[filaProntos.length]=objeto;
	console.log("Prontos");
	console.log(filaProntos.toString());
}
*/




// Tirando da fila de prioridades e colando no processador---------------------------------------------------------------------------------BrenoNegreiros


function Processando(totalNucleos){

	var n = 0;

	console.log(totalNucleos);
	console.log("Entrou na função Processador");

	for(var x = 0; x < totalNucleos; x++){
		if(n <= 3){
			processador[processador.length] = removerElementoFila(n);		
			
			
			n++;
		}else{
			n = 0;
		}		
	}
	
}



function ProcessadorEmMovimento(){ //------------------------------------------------------------------------------------------------------BrenoNegreiros
	
		
		for(var x=0 ; x<processador.length; x++){
			
			quantum = 14 // >>>>>>>>>>>>>>>>_atribuindo valor ao quantum
			
			
		
			
			while(quantum!=0){  // >>>>>>>>>>>>>>>>_enquanto quantum não for 0 , ele continuará em loop
				
				
				
				
				
			processador[x].tempoRestante = Math.round((processador[x].tempoRestante-0.1)*10)/10; // >>>>>>>>>>>>>>>>_decrementando tempo restante do processo X
			quantum = Math.round((quantum-0.1)*10)/10;		// >>>>>>>>>>>>>>>>_decrementando o quantum
			
				
					
			  
		    }
			


		}
		
		
	
	
	
}

/*function sleep(milliseconds) {-----------------------------------------------------------------------------------------------------------BrenoNegreiros
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
*/

//REMOVENDO PRIMEIRO ELEMENTO DA FILA DE PRIORIDADE E RETORNANDO O PRIMEIRO ELEMENTO DA FILA----------------------------------------------BrenoNegreiros
function removerElementoFila(numero){

var temp = null;
var validacao = false;
	
	while(validacao != true){
		switch(numero){
				
				case 0:
					console.log("entrou case 0");
					if(filap0[0] == null){
						numero = 1;
						console.log("Foi para o caso 1");
					}else{
						temp = filap0[0];
						filap0.shift();
						validacao = true;
					}
				break;
				
				case 1:
					console.log("entrou case 1");
					if(filap1[0] == null){
						numero = 2;
						console.log("Foi para o caso 2");
					}else{
						temp = filap1[0];
						filap1.shift();
						validacao = true;
					}				
				break;

				case 2:
					console.log("entrou case 2");
					if(filap2[0] == null){
						numero = 3;
						console.log("Foi para o caso 3");
					}else{
						temp = filap2[0];
						filap2.shift();
						validacao = true;
					}					
				break;

				case 3:
					console.log("entrou case 3");
					if(filap3[0] == null){
						numero = 4;
						console.log("Foi para o caso 4");
					}else{
						temp = filap3[0];
						filap3.shift();
						validacao = true;
					}			
				break;

				case 4:
					console.log("entrou case 4");
					if(filap0[0] == null &&	filap1[0] == null && filap2[0] == null && filap3[0] == null){
						validacao = true;
					}else{
						numero = 0;
					}
				break;

				default:
					alert("Não foi possível remover processo(s) da fila de prioridade");
				break;
			}
	}
	console.log("Saiu da função removerElementoFila");
	return temp;
}


//VALIDACAO DOS CAMPOS DO FORMULÁRIO:
function validacaoCampos(nomeCampo, textoImpressao){
	var x = document.getElementById(nomeCampo).value;
	if( x == 0 || x == "" || x == null){
		alert("O campo do(a) "+ textoImpressao +" não poderá ficar em branco ou ser zerado.");
		return false;
	}else{
		return true;
	}
}