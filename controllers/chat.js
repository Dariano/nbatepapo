module.exports = function (app) {
	var ChatController = {
		index: function (req, res) {
			var params = { email: req.session.usuario.email };
			
			res.render('chat/index', params);
		}
	};
	console.log(ChatController);
	return ChatController;

};