var nome = document.getElementById('nome');
var linha = document.getElementById('linha');

var eid = document.getElementById('eid');
var enome = document.getElementById('enome');

var obrigacao = document.getElementById('obrigacao');

function preparaCadastro() {
	nome.value = '';
}

function cadastrar() {
	var Nome = nome.value.toString().trim();
	if(Nome.toString().trim().length <= 0) Nome = 'Sem nome';

	var objJSON = [];
	var banco = localStorage.getItem("shehur-compras-lista");
	if(banco) {
		objJSON = JSON.parse(banco.toString());
	}

	objObrigacoes = {Nome: Nome, Marcado: 0};
	objJSON.push(objObrigacoes);
	localStorage.setItem('shehur-compras-lista', JSON.stringify(objJSON));
	selecionar();
}

function selecionarUm(index=-1) {
	var Nome = document.getElementById('nome_'+index).innerText.toString().trim();
	eid.value = parseInt(index);
	enome.value = Nome;
}

function editar() {
	var Id = parseInt(eid.value);
	var Nome = enome.value.toString().trim();
	if(Nome.toString().trim().length <= 0) Nome = 'Sem nome';

	var objJSON = [];
	var banco = localStorage.getItem("shehur-compras-lista");
	if(banco) {
		objJSON = JSON.parse(banco.toString());
	}

	objObrigacoes = {Nome: Nome, Marcado: 0};
	objJSON[Id] = objObrigacoes;
	localStorage.setItem('shehur-compras-lista', JSON.stringify(objJSON));
	selecionar();
}

function deletar() {
	localStorage.setItem('shehur-compras-lista', "");
	selecionar();
}

function selecionarDel(index=-1) {
	var Nome = document.getElementById('nome_'+index).innerText.toString().trim();
	did.value = parseInt(index);
	obrigacao.innerText = Nome;
}

function deletarUM() {
	var Id = parseInt(did.value);

	var objJSON = [];
	var banco = localStorage.getItem("shehur-compras-lista");
	if(banco) {
		objJSON = JSON.parse(banco.toString());
	}

	objJSON.splice(Id, 1);
	localStorage.setItem('shehur-compras-lista', JSON.stringify(objJSON));
	selecionar();	
}

selecionar();
function selecionar() {
	var objJSON = [];
	var banco = localStorage.getItem("shehur-compras-lista");
	if(banco) {
		objJSON = JSON.parse(banco.toString());
	}

	var linha = "";
	var i=0;
	objJSON.forEach((item) => {
		var marcacao = parseInt(item.Marcado);
		var str = '';
		if(marcacao > 0) str = 'checked';
		linha += 
		"<tr>" +
			"<td><label class='switch'><input type='checkbox' id='check_" + i + "' onchange='marcar(" + i + ")' " + str + "><span class='slider round'></span></label></td>" +
			"<td id='nome_" + i + "' style='word-wrap: break-word'>" + item.Nome + "</td>" +
			"<td align='right'><button type='button' class='btn btn-primary' onclick='selecionarUm(" + i + ")' data-toggle='modal' data-target='#modalEditar'>e</button>" +
			"<button type='button' class='btn btn-danger' data-toggle='modal' onclick='selecionarDel(" + i + ")' data-target='#modalDeletar'>x</button></td>" +
		"</tr>";
		i++;
	});
	linhas.innerHTML = linha;
}

function marcar(index=-1) {
	var Id = parseInt(index);
	var Nome = document.getElementById('nome_'+index).innerText.toString().trim();
	if(Nome.toString().trim().length <= 0) Nome = 'Sem nome';
	var check = document.getElementById('check_'+index);
	var Marcado = 0;
	if(check.checked) Marcado = 1;

	var objJSON = [];
	var banco = localStorage.getItem("shehur-compras-lista");
	if(banco) {
		objJSON = JSON.parse(banco.toString());
	}

	objObrigacoes = {Nome: Nome, Marcado: Marcado};
	objJSON[Id] = objObrigacoes;
	localStorage.setItem('shehur-compras-lista', JSON.stringify(objJSON));	
}
