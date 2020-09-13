var express = require('express');
var router = express.Router();
var Pessoa = require('../modelos/pessoa');

router.get('/', function(request, response, next) {
  Pessoa.todos(function(pessoas) {
	 // if(!pessoas){
		// Pessoa.criarBase()
		// pessoas = []
	// }
    response.render('index', { 
      title: 'Node.js com framework express',
      pessoas: pessoas
    });
  });
});

router.get('/alterar', function(request, response, next) {
  Pessoa.buscar(request.query.cpf, function(pessoa) {
    if (pessoa == null) { 
      console.log("Pessoa não encontrada");
      response.render('alterar', {'pessoa': {}})
    }
    else{
      response.render('alterar', {'pessoa': pessoa})
    }
  });
});

router.post('/alterar-pessoa', function(request, response, next) {
  var pessoa = new Pessoa();

  pessoa.cpf        = request.body.cpf;
  pessoa.nome       = request.body.nome;
  pessoa.sobrenome  = request.body.sobrenome;
  pessoa.telefone   = request.body.telefone;
  pessoa.endereco   = request.body.endereco;

  pessoa.salvar(function(){
    response.redirect("/");
  }, request.query.cpfAterar)
});


router.get('/excluir', function(request, response, next) {
  var pessoa = new Pessoa();
  pessoa.cpf = request.query.cpf;
  pessoa.excluir(function(){
    response.redirect("/");
  })

});

router.get('/pesquisar', function(request, response, next) {
  Pessoa.buscarPorNome(request.query.nome, function(pessoas) {
    response.render('index', { 
      title: 'Pesquisando em arquivos', 
      pessoas: pessoas
    });
  });
});

router.get('/estados.json', function(request, response, next) {
    response.send([
		{ "MG": "Minas Gerais" },
		{ "RJ": "Rio de Janeiro" },
		{ "SP": "São Paulo" }
    ]);
});

router.get('/cidades.json', function(request, response, next) {
	let cidades_estados = [
		{ "MG": [
			"Belo Horizonte",
			"Curvelo",
			"Felício dos Santos",
			"Sete Lagoas"
		]},
		{ "RJ": [
			'Aparigé',
			'Areal',
			'Rio de Janeiro',
			'Niteroi'
		]},
		{ "SP": [
			"Alvare Florence",
			"Aguaí",
			"Águas da Prata",
			"São Paulo"
		]}
    ]
	
	if(request.query.estado){		
		var cidades = []
		
		cidades_estados.forEach(city => {
			let estadoRequest = request.query.estado.toUpperCase()
			
			if(city[estadoRequest])
			{
				cidades = city[estadoRequest]
			}
		})
		
		if(cidades == []){
			cidades = cidades_estados
		}
	}
    response.send(cidades);
});

router.post('/cadastrar-pessoa', function(request, response, next) {
  var pessoa = new Pessoa();

  pessoa.cpf        = request.body.cpf;
  pessoa.nome       = request.body.nome;
  pessoa.sobrenome  = request.body.sobrenome;
  pessoa.telefone   = request.body.telefone;
  pessoa.endereco   = request.body.endereco;

  pessoa.salvar(function(){
    response.redirect("/");
  });
});

module.exports = router;
