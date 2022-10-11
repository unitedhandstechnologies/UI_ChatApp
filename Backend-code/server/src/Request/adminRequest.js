const Validation = require('../../helper/Validation');

const login = (req, res, next) => {
	const required = {
		email: ['isEmail'],
	};
	console.log(
		new Validation(required, req.body).isEmail(req.body.email).isVaild
	);
	next();
};

module.exports = {
	login,
};
