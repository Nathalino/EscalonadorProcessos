
/*
	Função criada para expandir a div de processador. 
	Isso é para evitar que tenha mais de 4 núcleos e haja uma quebra de linha no conteúdo da div.
*/
function tamanho(){
	var Div = document.getElementById("Nprocessos").getElementsByTagName("div"); //Acessando o elemento da div.
	var total = 200 * Div.length; // 200 é o tamanho da largura - div núcleo.
	document.getElementById("Nprocessos").style.width = total+"px"; //Atribuindo na CSS o tamanho da Div NProcessos.
}

function a(){
	alert("So tirando onda");
}