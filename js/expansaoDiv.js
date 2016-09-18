
/*
	Função criada para expandir a div de processador. 
	Isso é para evitar que tenha mais de 4 núcleos e haja uma quebra de linha no conteúdo da div.
*/
function tamanho(){

	var nameDiv = "Nprocessos";
	var Div = document.getElementById(nameDiv).getElementsByTagName("div"); //Acessando o elemento da div.
	var total = 200 * Div.length; // 200 é o tamanho da largura - div núcleo.
	document.getElementById("Nprocessos").style.width = total+"px"; //Atribuindo na CSS o tamanho da Div NProcessos.

	var nameul = "Nfilas";
	var ul = document.getElementById(nameul).getElementsByTagName("li");
	var total = 300 * ul.length;
	document.getElementById(nameul).style.width = total+"px"; 
}
