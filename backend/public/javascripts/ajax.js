carregarEstados = function(){
	$.ajax("/estados.json").done(dados => {
		
		$("#estado").append(`<option class="form-control" value="">Selecione o estado</option>`)
		dados.forEach(dado => {
			let key = Object.keys(dado)[0]
			let values = Object.values(dado)			
			$("#estado").append(`<option class="form-control" value="${key}">${values}</option>`)
		})
	})
}

carregarCidades = function(){
	let estado = $("#estado").val()
	$.ajax(`/cidades.json?estado=${estado}`).done(dados => {
		$("#cidade").html("")
		dados.forEach(dado => {
			$("#cidade").append(`<option class="form-control" value="${dado}">${dado}</option>`)
		})
	})
}