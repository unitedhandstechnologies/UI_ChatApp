const Db = require('../../../helper/sqlBulider');
const app = require('../../../helper/CommanMethod');
const ApiError = require('../../Exceptions/ApiError');
let DB = new Db();
const ApiController = require('./ApiController');
class AdminController extends ApiController {
	constructor() {
		super();
		this.limit = 20;
		this.offset = 1;
		this.login = this.login.bind(this);
		this.allUser = this.allUser.bind(this);
	}
	async login(req, res) {
		const { body } = req;
		try {
			const login_details = await DB.find('admins', 'first', {
				conditions: {
					email: body.email,
					status: 1,
				},
			});
			if (login_details) {
				if (app.createHash(body.password) !== login_details.password)
					throw new ApiError('Wrong Email or password');
				delete login_details.password;
				const token = await app.UserToken(login_details.id, req);
				await DB.save('admins', {
					id: login_details.id,
					token,
				});
				login_details.token = token;
				if (login_details.profile) {
					login_details.profile = app.ImageUrl(login_details.profile);
				}
				return app.success(res, {
					message: 'User login successfully',
					data: login_details,
				});
			}
			throw new ApiError('Wrong Email or password');
		} catch (err) {
			app.error(res, err);
		}
	}
	async allUser(Request) {
		const { page, limit, q = '', status = '' } = Request.query;
		const offset = (page - 1) * limit;
		let conditions = `where userType = 0`;
		if (status) {
			conditions += ` and status = ${status} `;
		}
		if (q) {
			conditions += ` and (name like '%${q}%' or email like '%${q}%' )`;
		}
		const query = `select * from users ${conditions} order by id desc limit ${offset}, ${limit}`;
		const total = `select count(*) as total from users ${conditions}`;
		const result = {
			pagination: await super.Paginations(total, offset, limit),
			result: app.addUrl(await DB.first(query), ['profile']),
		};
		return result;
	}
	async allCategories({ query: { limit = 20, page = 1, q = '' } }) {
		const offset = (page - 1) * limit;
		let condititon = '';
		if (q) {
			condititon = `where name like '%${q}%'`;
		}
		const services = await DB.first(
			`select * from Specialties ${condititon} order by id desc limit ${offset}, ${limit}`
		);
		const total = `select count(*) as total from Specialties ${condititon}`;
		const result = {
			pagination: await super.Paginations(total, offset, limit),
			result: app.addUrl(services, ['image']),
		};
		return result;
	}
	async allAdvisors(Request) {
		const { page, limit, q = '', status = '' } = Request.query;
		const offset = (page - 1) * limit;
		let conditions = `where userType = 1`;
		if (status) {
			conditions += ` and status = ${status} `;
		}
		if (q) {
			conditions += ` and (name like '%${q}%' or email like '%${q}%') `;
		}
		const query = `select * from users ${conditions} order by id desc limit ${offset}, ${limit}`;
		const total = `select count(*) as total from users ${conditions}`;
		const advisors = app.addUrl(await DB.first(query), ['profile']);
		const allData = advisors.map(async (val) => {
			const specialization = await DB.find('advisorSpecialties', 'all', {
				conditions: {
					advisorId: val.id,
				},
				join: [
					'Specialties on (Specialties.id =  advisorSpecialties.specialtieId)',
				],
				fields: ['Specialties.*'],
			});
			val.specialization = specialization;
			return val;
		});
		const result = {
			pagination: await super.Paginations(total, offset, limit),
			result: await Promise.all(allData),
		};
		return result;
	}

	async addAdvisar({ body: { name, password, email, aboutUs, specialties } }) {
		const data = await super.vaildation({
			name,
			password,
			email,
			aboutUs,
			specialties,
			userType: 1,
			status: 1,
		});
		const query = `select * from users where email = '${email}'`;
		const emailInfo = await DB.first(query);
		if (emailInfo.length > 0) {
			throw new ApiError('Email already registered Please use another');
		}
		const advisorId = await DB.save('users', data);
		const SpecialtieList = specialties.split(',');
		SpecialtieList.forEach((specialtieId) => {
			DB.save('advisorSpecialties', {
				specialtieId,
				advisorId,
			});
		});
		return advisorId;
	}

	async updateAdvisorProfile({
		body: { name, email, aboutUs, status, specialties, id, specialization },
	}) {
		const data = await super.vaildation({
			name,
			status,
			email,
			aboutUs,
			specialties,
			userType: 1,
			id,
		});
		const query = `select * from users where email = '${email}' and id != ${id}`;
		const emailInfo = await DB.first(query);
		if (emailInfo.length > 0) {
			throw new ApiError('Email already registered Please use another');
		}
		const advisorId = await DB.save('users', data);
		const SpecialtieList = specialties.split(',');
		await DB.first(
			`delete from advisorSpecialties where advisorId=${advisorId} and specialtieId NOT IN (${specialties})`
		);
		const filterData = SpecialtieList.filter(
			(val) => !specialization.find((id) => id.id === val)
		);
		filterData.forEach((specialtieId) => {
			DB.save('advisorSpecialties', {
				specialtieId,
				advisorId,
			});
		});
		return advisorId;
	}

	async getConsultations({ query: { page = 1, limit = 20, isEnd = '' } }) {
		const offset = (page - 1) * limit;
		let condition = '';
		if (isEnd) {
			condition = `where isEnd = ${isEnd} `;
		}
		const query = `select users.id as friend_id, advisor.userType as advisorUserType, advisor.name as advisorName, advisor.email as advisorEmail, users.userType as userType, users.name as userName, users.email as userEmail,
		chats.*, threads.totalMins
		from threads join chats on (chats.id = threads.last_chat_id) join users as advisor on (advisor.id =  user_id) join users on (users.id =  friend_id) ${condition} order by threads.id desc limit ${offset}, ${limit}`;
		const total = `select count(*) as total  from threads join chats on (chats.id = threads.last_chat_id) join users as advisor on (advisor.id =  user_id) join users on (users.id =  friend_id) ${condition}`;
		const result = {
			pagination: await super.Paginations(total, offset, limit),
			result: await DB.first(query),
		};
		return result;
	}

	async addUser(Request) {
		const { body } = Request;
		if (body.email) {
			const query = `select * from users where email = '${body.email}'`;
			const email = await DB.first(query);
			if (email.length > 0) {
				throw new ApiError('Email already registered Please use another');
			}
		}
		delete body.profile;
		body.password = app.createHash(body.password);
		if (Request.files && Request.files.profile) {
			body.profile = await app.upload_pic_with_await(Request.files.profile);
		}
		delete body.licence;
		if (Request.files && Request.files.licence) {
			body.licence = await app.upload_pic_with_await(Request.files.licence);
		}
		return await DB.save('users', body);
	}

	async editUser(Request) {
		const { body } = Request;
		if (body.email) {
			const query = `select * from users where email = '${body.email}' and id != ${body.id}`;
			const email = await DB.first(query);
			if (email.length > 0) {
				throw new ApiError('Email Already registered Please use another');
			}
		}
		delete body.profile;
		body.password = app.createHash(body.password);
		if (Request.files && Request.files.profile) {
			body.profile = await app.upload_pic_with_await(Request.files.profile);
		}
		return await DB.save('users', body);
	}

	async adminProfile(Request) {
		const { body } = Request;
		if (body.password === 'empty' || body.password === '') {
			delete body.password;
		} else {
			body.password = app.createHash(body.password);
		}
		delete body.profile;
		if (Request.files && Request.files.profile) {
			body.profile = await app.upload_pic_with_await(Request.files.profile);
		}
		const admin_id = await DB.save('admins', body);
		const admin_info = await DB.first(
			`select * from admins where id = ${admin_id} limit 1`
		);
		if (admin_info[0].profile.length > 0) {
			admin_info[0].profile = app.ImageUrl(admin_info[0].profile);
		}
		return admin_info[0];
	}

	async updateData(req) {
		const { body } = req;
		if (body.id === undefined) {
			throw new ApiError('id is missing', 400);
		}
		if (req.files && req.files.picture) {
			body.picture = await app.upload_pic_with_await(req.files.picture);
		}
		if (req.files && req.files.image) {
			body.image = await app.upload_pic_with_await(req.files.image);
		}
		if (req.files && req.files.profile) {
			body.profile = await app.upload_pic_with_await(req.files.profile);
		}
		return await DB.save(body.table, body);
	}

	async deleteData(req) {
		const { body } = req;
		if (body.id === undefined) {
			throw new ApiError('id is missing', 400);
		}
		if (body.table === 'sesyhs') {
			const id = await DB.first(
				`update seshys set status = 2 where id = ${body.id}`
			);
			const getAllAttendUsers = await DB.find('attendSeshys', 'all', {
				conditions: {
					seshyId: body.id,
					raw: [`attendSeshys.status in (0,1) and users.device_token != ''`],
				},
				join: ['users on (users.id = attendSeshys.userId)'],
				fields: ['users.device_token'],
			});
			app.send_push({
				token: getAllAttendUsers,
				message: body.message,
				userType: 0,
				data: {
					seshyId: id,
					notificationCode: 2,
					userType: 0,
				},
			});
			return id;
		}
		return await DB.first(`delete from ${body.table} where id = ${body.id}`);
	}

	async Notification({ body: { message, userType = 1 } }) {
		const allUser = await DB.find('users', 'all', {
			conditions: {
				userType,
				raw: [`deviceToken != ''`],
			},
			fields: ['deviceToken'],
		});
		app.send_push({
			token: [...allUser],
			message,
			userType,
		});
		return {};
	}

	async updateDocumentStatus({ body: { status, userId } }) {
		return await DB.first(
			`update userDocuments set status= ${!status} where userId=${userId}`
		);
	}

	async dashboard() {
		const totalUser = await DB.first(
			`select count(id) as total from users where userType = 0`
		);
		const totalAdvisor = await DB.first(
			`select count(id) as total from users where userType=1`
		);
		const activeConsultations = await DB.first(
			'select count(id) as total from threads where isEnd=0'
		);
		const pastConsultations = await DB.first(
			'select count(id) as total from threads where isEnd=1'
		);
		const dailyMints = await DB.first(
			`select sum(totalMins) as total from threads where from_unixtime(threads.modified, "%y%d%m") = from_unixtime(${app.currentTime}, "%y%d%m")`
		);
		const weaklyMints = await DB.first(
			`select sum(totalMins) as total from threads where modified > ${
				app.currentTime - 604800
			}`
		);
		return {
			totalUser: totalUser[0].total,
			totalAdvisor: totalAdvisor[0].total,
			activeConsultations: activeConsultations[0].total,
			pastConsultations: pastConsultations[0].total,
			dailyMints: dailyMints[0].total || 0,
			weaklyMints: weaklyMints[0].total || 0,
		};
	}

	async appInfo() {
		return await DB.first('select * from app_informations');
	}
	async getAppSetting() {
		return await DB.first(
			`select * from appSettings where keyName != 'sessionDaysLimit'`
		);
	}
}

module.exports = AdminController;
