const App = require("../config/app")

let Pessoa = function(){
	this.nome = ""
	this.sobrenome = ""
	this.cpf = ""
	this.telefone = ""
	this.endereco = ""
	
	this.salvar = function(callback, cpfAlteracao){
		let query;
		if(cpfAlteracao){
			query = "UPDATE teste.Pessoas SET nome = '" + this.nome + "', sobrenome = '" + this.sobrenome + "', telefone = '" + this.telefone + "', endereco = '" + this.endereco + "' WHERE cpf = '"+ cpfAlteracao + "'"
		}
		else{
			query = "INSERT INTO teste.Pessoas (cpf, nome, sobrenome, telefone, endereco) VALUES ('" + this.cpf + "', '" + this.nome + "', '" + this.sobrenome + "', '" + this.telefone + "', '" + this.endereco + "')"
			console.log(query)
		}
			
		App.db.cnn.exec(query, function(dadosPesquisadosTabela, erro){
			if(erro) {
				console.log("Erro ao executar a query (" + query + ")")
			}
				
			callback.call()
		})
	}
	
	this.excluir = function(callback){
		let query = "DELETE FROM teste.Pessoas WHERE  cpf  = '" + this.cpf + "'"
	
		App.db.cnn.exec(query, function(dadosPesquisadosTabela, erro){
			if(erro) {
				console.log("Erro ao executar a query (" + query + ")")
			}
			
			callback.call()
		})
	}
}

Pessoa.buscar = function(cpfPessoa, callback){
	
	let query = "SELECT * FROM teste.Pessoas WHERE cpf = '" + cpfPessoa + "'"
	
	App.db.cnn.exec(query, function(dadosPesquisadosTabela, erro){
		if(erro) {
			console.log("Erro ao executar a query (" + query + ")")
			callback.call(null, null)
		}
		else
		{
			if(dadosPesquisadosTabela.length > 0)
				callback.call(null, dadosPesquisadosTabela[0])
			else
				callback.call(null, null)
		}
	})
}

Pessoa.buscarPorNome = function(nomePessoa, callback){
	let query = "SELECT * FROM teste.Pessoas WHERE nome LIKE '%" + nomePessoa + "%' order by cpf asc"
	
	App.db.cnn.exec(query, function(dadosPesquisadosTabela, erro){
		if(erro) {
			console.log("Erro ao executar a query (" + query + ")")
			callback.call(null, [])
		}
		else
			callback.call(null, dadosPesquisadosTabela)
	})
}

Pessoa.todos = function(callback){
	let query = "SELECT * FROM teste.Pessoas order by cpf asc"
	
	App.db.cnn.exec(query, function(dadosPesquisadosTabela, erro){
		if(erro) {
			console.log("Erro ao executar a query (" + query + ")")
			callback.call(null, [])
		}
		else
			callback.call(null, dadosPesquisadosTabela)
	})
}

module.exports = Pessoa