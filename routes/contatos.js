module.exports = function (app) {
	var autenticacao = require('./../middlewares/autenticador');
	var contatos = app.controllers.contatos;
	
	app.get('/contatos', autenticacao, contatos.index);
	app.get('/contato/:id', autenticacao, contatos.show); 
	app.post('/contato', autenticacao, contatos.create); 
	app.get('/contato/:id/editar', autenticacao, contatos.edit); 
	app.put('/contato/:id', autenticacao, contatos.update); 
	app.delete('/contato/:id', autenticacao, contatos.destroy); 
};