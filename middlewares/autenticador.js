module.exports = function (req, res, next) {
	if (!req.session.usuario) {
		return res.redirect('/');
	}
	console.log('Autenticacao');
	return next();
};