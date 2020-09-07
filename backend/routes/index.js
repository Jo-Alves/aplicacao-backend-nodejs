var express = require('express');
var router = express.Router();
let pessoas = []
 const banco_Arquivo = "C:/Users/val/Desktop/bdArquivo/bancoArquivo.js";


router.get('/', function(request, response, next) {
	let dados = { title: 'Nodejs com framerwork Express'}
	
	carregarBase(function read(err, data){
		
		if (data.length === 0) {    
			dados['pessoas'] = [];
			criarBase();
		} 
		else {
			dados['pessoas'] = JSON.parse(data);
		}
		
		// if(err)
		// {
			// console.log(err),
			// dados["pessoas"] = []
		// }
		// else
		// {
			// dados["pessoas"] = JSON.parse(data)
		// }
  
		response.render('index', dados);
	})
});

router.post('/cadastrar-pessoa', function(request, response, next) {
	
	carregarBase(function read(err, data){
		
		if(err)
		{
			console.log(err);
			return;
		}
		
		pessoas = JSON.parse(data)
	
		let nome = request.body.nome;
		pessoa = {
			nome: request.body.nome,
			sobrenome: request.body.sobrenome,
			cpf: request.body.cpf,
			telefone: request.body.telefone,
			endereco: request.body.endereco
		}

		salvarBase(pessoa)
	
		response.render('index', {title: 'cadastrar Pessoa', pessoas});
	})
});

// funçõe auxiliares para arquivos
var carregarBase = calback => {
	var fs = require("fs")
	fs.readFile(banco_Arquivo, calback)
}

var salvarBase = pessoa => {
	pessoas.push(pessoa)
	var fs = require("fs")
	fs.writeFile(banco_Arquivo, JSON.stringify(pessoas), err => {
		if(err){
			console.log("the file was saved!")
		}
	})
}

const criarBase = function () {
  const fs = require('fs');
  fs.writeFile(banco_Arquivo, '[]', function (error) {
    if (error) {
      console.log(error, "");
    }
  });
};

module.exports = router;
