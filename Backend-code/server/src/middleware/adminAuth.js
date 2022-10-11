const Db = require('../../helper/sqlBulider');
const app = require('../../helper/CommanMethod');
const DB = new Db();

const AdminAuth = async (req, res, next) => {
	try {
		if (req.path === '/login') {
			return next();
		}
		if (!req.headers.hasOwnProperty('authorization')) {
			throw { code: 400, message: 'Authorization key is required' };
		}
		let user_details = await DB.find('admins', 'first', {
			conditions: {
				token: req.headers.authorization,
			},
		});
		if (user_details) {
			req.auth_info = user_details;
			next();
			return;
		}
		throw { code: 401, message: 'Invaild Authorization' };
	} catch (err) {
		app.error(res, err);
	}
};

module.exports = AdminAuth;
