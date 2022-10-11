const express = require('express');
const router = express.Router();
const db = require('../helper/sqlBulider');
const app = require('../helper/CommanMethod');
const DB = new db();
/* GET users listing. */
router.get('/verify/:auth_key', async (req, res) => {
	const checkAuth = await DB.find('users', 'first', {
		conditions: {
			authorization_key: req.params.auth_key,
		},
	});
	let successData = {
		error: false,
		message: 'Account Verify Successfully',
	};

	if (!checkAuth) {
		successData.error = true;
		successData.message = 'Invaild Url';
	} else {
		checkAuth.status = 1;
		checkAuth.authorization_key = '';
		DB.save('users', checkAuth);
	}
	res.render('verify-account', successData);
});
router
	.route('/change_password/:auth_key')
	.get(async (req, res) => {
		const checkAuth = await DB.find('users', 'first', {
			conditions: {
				forgot_password_hash: req.params.auth_key,
			},
		});
		let successData = {
			error: false,
			success: false,
			message: 'Create New Password',
		};

		if (!checkAuth) {
			successData.error = true;
			successData.success = true;
			successData.message = 'Invaild Url';
		}
		res.render('changepassword', successData);
	})
	.post(async (req, res) => {
		let successData = {
			error: true,
			success: true,
			message: 'Something Went Wrong',
		};
		const checkAuth = await DB.find('users', 'first', {
			conditions: {
				forgot_password_hash: req.params.auth_key,
			},
		});
		if (!checkAuth) {
			return res.render('changepassword', successData);
		}
		if (req.body.password.length === 0) {
			successData.message = 'Password Field is Required';
			return res.render('changepassword', successData);
		}
		if (req.body.password !== req.body.confirm_password) {
			successData.message = 'Confirm passoword is not match with password';
			return res.render('changepassword', successData);
		}
		await DB.save('users', {
			id: checkAuth.id,
			password: app.createHash(req.body.password),
			forgot_password_hash: '',
		});
		successData.success = true;
		successData.error = false;
		successData.message =
			'New Password updated Successfully. Please Login in app';
		return res.render('changepassword', successData);
	});
router.get('/profile/:post_id', function ({ params: { post_id } }, res) {
	res.render('share', { id: post_id });
});

module.exports = router;
