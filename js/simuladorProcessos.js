/*SIMULADOR DE PROCESSOS*/

//Variaveis Globais:
var idProcessos = 0;
var totalProcessadores;
var totalProcessosIniciais;
var quantum;
var executando;

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
		
		//Inserindo elementos no(s) processador(es):
		totalProcessadores = document.getElementById("fnProcessadores").value;
		inserirElementoNucleo();

		//Iniciando os processamentos:
		executando = setInterval("Processador()",1000);
		
		/*
		//ProcessadorEmMovimento();// >>>>>>>>>>>>>>>>_ COLOQUEI PRA TESTAR
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
		console.log("Fila de Prioridade 3");
		for(var i=0 ; i<filap3.length; i++){
			console.log(filap3[i]);	
		}		
		console.log("/////////////////////");
		console.log("Fila do Processador");
		for(var i=0 ; i<processador.length; i++){
			console.log(processador[i]);	
		}
		*/
		
	}


}


//CRIACAO DOS PROCESSOS:
function CriacaoProcessos(totalProcessos){

	for(var x = 0; x<totalProcessos; x++){

		var objetoProcessos = new consProcesso(); 
		var tempoDeVida = Math.floor((Math.random()*4)+16); //tempo entre 4 e 20.
		var nFilaPrioridade = Math.floor((Math.random()*4)+0);//tempo entre 3 e 0.

		//Adicionando os elementos no Objeto:
		objetoProcessos.id = idProcessos;
		objetoProcessos.tempoVida = tempoDeVida;
		objetoProcessos.tempoRestante = tempoDeVida;
		objetoProcessos.filaPrioridade = nFilaPrioridade;
		
		//Inserindo elemento na Fila:
		inserirElementoFila(objetoProcessos);
		//Inserindo elemento no HTML:
		addTAGs("filap"+nFilaPrioridade, "li", idProcessos, "bordar espera", 1, null);
		idProcessos++;

	}

}


//INSERINDO ELEMENTOS NA FILA DE ACORDO COM SUA PRIORIDADE:
function inserirElementoFila(objeto){

	switch(objeto.filaPrioridade){
		
		case 0:
			if(objeto.tempoRestante == 0){
				inserirElementoPronto(objeto);
			}else{
				filap0[filap0.length] = objeto;
			}
			//console.log(filap0[filap0.length-1]);	
		break;
		
		case 1:
			if(objeto.tempoRestante == 0){
				inserirElementoPronto(objeto);
			}else{
				filap1[filap1.length] = objeto;
			}		
			//console.log(filap1[filap1.length-1]);
		break;

		case 2:
			if(objeto.tempoRestante == 0){
				inserirElementoPronto(objeto);
			}else{
				filap2[filap2.length] = objeto;
			}		
			//console.log(filap2[filap2.length-1]);
		break;

		case 3:
			if(objeto.tempoRestante == 0){
				inserirElementoPronto(objeto);
			}else{
				filap3[filap3.length] = objeto;
			}
			//console.log(filap3[filap3.length-1]);
		break;

		default:
			alert("Não foi possível criar o(s) processo(s) na(s) fila(s) de prioridade(s).");
		break;
	}

}

//PROCESSADOR:
function inserirElementoNucleo(){
	var n = 0;
	for(var x = 0; x < totalProcessadores; x++){
		if(n <= 3){
			var objetoFila = removerElementoFila(n);
			processador[processador.length] = objetoFila;
			
			//Inserindo elemento no HTML:
			addTAGs("Nprocessos", "div", objetoFila.id, "molder", 2, objetoFila);								
			n++;

		}else{
			n = 0;
		}		
	}
}

function inserirElementoPronto(objeto){
	//Adicionando o elemento no Vetor de Filas Prontas:
	console.log(filaProntos.length);
	console.log("Objeto que será adicionado na fila pronta: "+ objeto);
	filaProntos[filaProntos.length] = objeto;
	//Inserindo elemento no HTML:
	addTAGs("filapronta", "li", objeto.id, "bordar pronto", 1, null);
}


//REMOVENDO PRIMEIRO ELEMENTO DA FILA DE PRIORIDADE E RETORNANDO O PRIMEIRO ELEMENTO DA FILA:
function removerElementoFila(numero){

var temp = null;
var validacao = false;
	
	while(validacao != true){
		switch(numero){
				
				case 0:
					//console.log("entrou case 0");
					if(filap0[0] == null){
						numero = 1;
						//console.log("Foi para o caso 1");
					}else{
						temp = filap0[0];
						removerTAGs("filap"+numero, temp.id);
						filap0.shift();
						validacao = true;
					}
				break;
				
				case 1:
					//console.log("entrou case 1");
					if(filap1[0] == null){
						numero = 2;
						//console.log("Foi para o caso 2");
					}else{
						temp = filap1[0];
						removerTAGs("filap"+numero, temp.id);
						filap1.shift();
						validacao = true;
					}				
				break;

				case 2:
					//console.log("entrou case 2");
					if(filap2[0] == null){
						numero = 3;
						//console.log("Foi para o caso 3");
					}else{
						temp = filap2[0];
						removerTAGs("filap"+numero, temp.id);
						filap2.shift();
						validacao = true;
					}					
				break;

				case 3:
					//console.log("entrou case 3");
					if(filap3[0] == null){
						numero = 4;
						//console.log("Foi para o caso 4");
					}else{
						temp = filap3[0];
						removerTAGs("filap"+numero, temp.id);
						filap3.shift();
						validacao = true;
					}			
				break;

				case 4:
					//console.log("entrou case 4");
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
	//console.log("Saiu da função removerElementoFila");
	return temp;
}

function removerElementoProcessador(){

	var objetoProcessos = new consProcesso();

	//Pegando o tamanho do vetor do processador:
	var ultimaPosicao = processador.length;
	//Pegando o(s) ultimo dado(s) do vetor processador: 
	objetoProcessos = processador[ultimaPosicao];
 	var FilaPrioridade = processador[ultimaPosicao-1].filaPrioridade;

	//Remover o primeiro elemento do processador:
	var elementoRemovido = processador.shift();
	//Retornar o elemento para a fila de espera:
	inserirElementoFila(elementoRemovido);

	removerTAGs("Nprocessos", elementoRemovido.id);

	var newObjeto;

	//Verifica qual é último processo inserido no processador para verificar a sua fila de prioridade:
	if(FilaPrioridade == 0){
		newObjeto = removerElementoFila(1);
	}else{

		if(FilaPrioridade == 1){
			newObjeto = removerElementoFila(2);
		}else{
			if(FilaPrioridade == 2){
				newObjeto = removerElementoFila(3);
			}else{
				newObjeto = removerElementoFila(0);
			}
		}
	}
	return newObjeto;
}

function Processador(){

	var newObjeto;

	if(processador.length != 0 /*|| 
		filap0.length != 0 ||
		 filap1.length != 0 ||
		  filap2.length != 0 ||
		   filap3.length != 0*/){

		//Condição para o Decremento do Quantum:
		if(quantum >= 0){
			var objetoProcessos = new consProcesso();
			document.getElementById("Cquantum").innerHTML = quantum;

			var tempVida = processador[0].tempoRestante;
			
			if(tempVida >= 0){
				tempVida--;
				processador[0].tempoRestante = tempVida;
				document.getElementById("tR"+processador[0].id).innerHTML = tempVida;
			}else{
				newObjeto = processador.shift;
				console.log(newObjeto);
				inserirElementoPronto(newObjeto);
				removerTAGs("Nprocessos", processador[0].id);
			}
			quantum--;
		}else{
			//O quantum volta a ter o tamanho de origem digitada pelo usuário:
			quantum = document.getElementById("fquantum").value;
			document.getElementById("Cquantum").innerHTML = quantum;
			//Remover o primeiro elemento da Fila do Processador e tras o proximo elemento a ser inserido no processador.
			newObjeto = removerElementoProcessador();
			//Adiciona o proximo elemento da fila de espera no final do processador.
			processador.push(newObjeto);
			//Inserindo elemento no HTML:
			console.log(newObjeto.id);
			addTAGs("Nprocessos", "div", newObjeto.id, "molder", 2, newObjeto);
		}

	}else{
		//Parando de executar o Processador:
		clearInterval(executando);
	} 
	
}


//ADICIONANDO TAG no HTML:
function addTAGs(idSeletor, tag, idFilho, classFilho, codigoExibicao, objeto){
	//Acessando o elemento Pai:
	var objPai = document.getElementById(idSeletor);

    //Criando o elemento DIV;
    var objFilho = document.createElement(tag);

    //Definindo atributo ao objFilho: (ID)
    objFilho.setAttribute("id", idFilho);
        
    //Definindo Atributo ao objFilho (Class):
    objFilho.setAttribute("class", classFilho);        

    //Inserindo o elemento no pai:
    objPai.appendChild(objFilho);

    if(codigoExibicao == 1){
	    //Escrevendo algo no filho recém-criado:
		document.getElementById(idFilho).innerHTML = idFilho;
	}else{
	    //Escrevendo algo no filho recém-criado:
		document.getElementById(idFilho).innerHTML = "ID: "+idFilho+
													 "<br>Tempo de vida: "+objeto.tempoVida+
													 "<br>Tempo Restante:<div id='tR"+idFilho+"'>"+objeto.tempoRestante+"</div>";		
	}
}

//REMOVENDO TAG no HTML:
function removerTAGs(idSeletor, idfilho) {

	console.log("REMOVENDO: Fila"+idSeletor+" id do filho"+ idfilho);
    
    var objPai = document.getElementById(idSeletor);
    var objFilho = document.getElementById(idfilho);

    //Verificando se o Objeto existe antes de removelo:
    if(objFilho != null){
    	//Removendo o DIV com id específico do nó-pai:
    	var removido = objPai.removeChild(objFilho);
    }
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



