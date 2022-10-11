const express = require('express');
const router = express.Router();
const { AdminController } = require('../src/Controller/admin/index');
const { cross, AdminAuth } = require('../src/middleware/index');
const response = require('../helper/Response');
const Admin = new AdminController();

router.use([cross, AdminAuth]);
router.get('/', function (req, res) {
	res.json(' APi workings ');
});
router.post('/login', Admin.login);
router.post('/send-push', response(Admin.Notification));
router.get('/dashboard', response(Admin.dashboard));
router
	.route('/users')
	.get(response(Admin.allUser))
	.post(response(Admin.addUser))
	.put(response(Admin.editUser))
	.delete(response(Admin.deleteData));
router
	.route('/advisors')
	.get(response(Admin.allAdvisors))
	.post(response(Admin.addAdvisar))
	.put(response(Admin.updateAdvisorProfile))
	.delete(response(Admin.deleteData));
router.post('/admin-profile', response(Admin.adminProfile));
router.put('/update-status', response(Admin.updateData));
router.put('/send-push', response(Admin.Notification));
router.get('/consultation', response(Admin.getConsultations));
router.get('/specialties', response(Admin.allCategories));
router
	.route('/app-info/')
	.get(response(Admin.appInfo))
	.put(response(Admin.updateData));

module.exports = router;
