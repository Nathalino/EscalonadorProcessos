
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
var filaProcessados = new Array();

var objetoProcessos = new Object();


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

	}


}


//VALIDACAO DOS CAMPOS:
function validacaoCampos(nomeCampo, textoImpressao){
	var x = document.getElementById(nomeCampo).value;
	if( x == 0 || x == "" || x == null){
		alert("O campo do(a) "+ textoImpressao +" não poderá ficar em branco ou ser zerado.");
		return false;
	}else{
		return true;
	}
}


//CRIACAO DOS PROCESSOS:
function CriacaoProcessos(totalProcessos){

	for(var x = 0; x<=totalProcessos; x++){

		idProcessos++; 
		var tempoDeVida = Math.floor((Math.random()*4)+16); //tempo entre 4 e 20.
		quantum;
		var nFilaPrioridade = Math.floor((Math.random()*1)+3);//tempo entre 0 e 3.

		objetoProcessos.id = idProcessos;
		objetoProcessos.tempoVida = tempoDeVida;
		objetoProcessos.tempoRestante = tempoDeVida;
		objetoProcessos.filaPrioridade = nFilaPrioridade;

		console.log(tempoDeVida);
		console.log(nFilaPrioridade);

		inserirElementoFila(objetoProcessos);
	}


//INSERINDO ELEMENTOS NA FILA DE ACORDO COM SUA PRIORIDADE:
function inserirElementoFila(objeto){

	switch(objetoProcessos.filaPrioridade){
		
		case 0:
			filap0[filap0.length] = objeto;
			console.log(filap0.toString());
		break;
		
		case 1:
			filap1[filap1.length] = objeto;
			console.log(filap1.toString());
		break;

		case 2:
			filap2[filap2.length] = objeto;
			console.log(filap2.toString());
		break;

		case 3:
			filap3[filap3.length] = objeto;
			console.log(filap3.toString());
		break;

		default:
			alert("Não foi possível criar o(s) processo(s) na(s) fila(s) de prioridade(s).");
	}
}



}