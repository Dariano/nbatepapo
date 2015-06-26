module.exports = function (io) {
	var sockets = io.sockets;
	console.log('sockets antes '+ sockets);
	sockets.on('connection', function (client) {
		console.log('depois '  + client);
		var session = client.handshake.session;
		var usuario = session.usuario;
		
		client.on('send-server', function (msg) {
			msg = "<b>" + usuario.nome + ": </b> " + msg + "<br>";
			client.emit('send-client', msg);
			client.broadcast.emit('send-client', msg);
		});
	});
};