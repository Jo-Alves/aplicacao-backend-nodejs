const App = require("../config/app")

let Pessoa = function(){
	this.nome = ""
	this.sobrenome = ""
	this.cpf = ""
	this.telefone = ""
	this.endereco = ""
	
	this.salvar = function(calback, cpfAlteracao){
		var nomeInstancia = this.nome
		var sobrenomeInstancia = this.sobrenome
		var cpfInstancia = this.cpf
		var telefoneInstancia = this.telefone
		var enderecoInstancia = this.endereco
		
		Pessoa.todos(function(pessoas){
			let pessoa;
			if (pessoas == []) {  
				console.log("Pessoas não encontrada na base de dados.");
				calback.call()
			} 
			else {
				if(cpfAlteracao)
				{
					pessoa = pessoas.reduce((acc, dados) => {
					acc.push(dados)
						if(dados.cpf === cpfAlteracao)
						{
							dados.nome = nomeInstancia
							dados.sobrenome = sobrenomeInstancia
							// dados.cpf = cpfInstancia
							dados.telefone = telefoneInstancia
							dados.endereco = enderecoInstancia
						}
						
						return acc
					}, [])
				}
				else
				{
					pessoa = pessoas
					let novaPessoa = {
						nome: nomeInstancia,
						sobrenome: sobrenomeInstancia,
						cpf: cpfInstancia,
						telefone: telefoneInstancia,
						endereco: enderecoInstancia
					}
					
					pessoa.push(novaPessoa)
				}
				
				Pessoa.salvarTodos(pessoa)
			}
			
			calback.call()	
		})
	}
	
	this.excluir = function(calback){
		let cpfInstancia = this.cpf
		Pessoa.todos(function(pessoas){
			if (pessoas == []) {  
				console.log("Pessoas não encontrada na base de dados."); 
			} 
			else {
				pessoasRestantes = pessoas.filter(({ cpf }) => cpf != cpfInstancia)
				
				Pessoa.salvarTodos(pessoasRestantes)
			}
			
			calback.call(null, pessoasRestantes)
		})
	}
}

Pessoa.buscar = function(cpfPessoa, calback){
	Pessoa.todos(function (pessoas){
		let pessoa = null
		if (pessoas == []) {  
			console.log("Pessoa não encontrada em nossa base de dados");
			calback.call(null, null);
		} 
		else {
			pessoa = pessoas.find(({ cpf }) => cpf === cpfPessoa)
		
			calback.call(null, pessoa);
		}
	})
}

Pessoa.buscarPorNome = function(nomePessoa, calback){
	Pessoa.todos(function (pessoas){
		let pessoasPesquisados = [];
		
		if (pessoas == []) {  
			console.log("Pessoa não encontrada em nossa base de dados");
		} 
		else {
			
			if(!nomePessoa){
				pessoaspessoasPesquisados = pessoas;
			}
			
			let reg = new RegExp(nomePessoa, "i")
			pessoasPesquisados = pessoas.filter(({ nome }) => nome.match(reg))
		
		}
		
		calback.call(null, pessoasPesquisados);
	})
}

Pessoa.salvarTodos = function(pessoas){
	var fs = require("fs")
	fs.writeFile(App.banco_arquivo, JSON.stringify(pessoas), err => {
		if(err){
			console.log("the file was saved!")
		}
	})
}

Pessoa.todos = function(callback){
	let fs = require("fs")
	fs.readFile(App.banco_arquivo, function(err, data) {
		pessoas = [];
		if (err) { 
		  console.log(err);
		}
		else{
			if(data.length > 0)
				pessoas = JSON.parse(data);
			else
				pessoas = null
		}
		callback.call(null, pessoas);
	});
}

Pessoa.criarBase = function () {
  const fs = require('fs');
  fs.writeFile(App.banco_arquivo, '[]', function (error) {
    if (error) {
      console.log(error, "");
    }
  });
};


module.exports = Pessoa