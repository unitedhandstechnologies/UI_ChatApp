const ApiController = require("./ApiController");
const app = require("../../../helper/CommanMethod");
const Db = require("../../../helper/sqlBulider");
const ApiError = require("../../Exceptions/ApiError");
const { lang } = require("../../../config");
const DB = new Db();

class UserController extends ApiController {
	constructor() {
		super();
		this.addUser = this.addUser.bind(this);
		this.loginUser = this.loginUser.bind(this);
		this.userProfile = this.userProfile.bind(this);
		this.updateProfile = this.updateProfile.bind(this);
	}

	async addUser(Request) {
		const { RequestData } = Request;
		if (Request.files && Request.files.profile) {
			RequestData.profile = await app.upload_pic_with_await(
				Request.files.profile
			);
		}
		const userPhone = await DB.find("users", "first", {
			conditions: {
				phone: RequestData.phone,
			},
			fields: ["id"],
		});
		if (userPhone) {
			RequestData.id = userPhone.id;
		}
		const userId = await DB.save("users", { ...RequestData, isInvite: 0 });
		RequestData.lang = Request.lang;
		setTimeout(() => {
			this.mails(RequestData);
			const { countryCode, phone } = RequestData;
			app.sendSMS({
				to: `${countryCode}${phone}`,
				message: `Your OTP ${RequestData.otp}, Please don't share with anyone, Team Shusly.`,
			});
		}, 100);
		return {
			message: lang[Request.lang].signup,
			data: await super.userDetails(userId),
		};
	}
	async verifyOtp(req) {
		const required = {
			otp: req.body.otp,
		};
		const nonRequired = {
			deviceToken: req.body.deviceToken,
		};
		const request_data = await super.vaildation(required, nonRequired);
		if (parseInt(request_data.otp) !== req.body.userInfo.otp) {
			throw new ApiError(lang[req.lang].invaildOtp);
		}
		let { id } = req.body.userInfo;
		await DB.save("users", {
			id,
			status: 1,
			isOTPVerify: 1,
			deviceToken: req.body.deviceToken || "",
		});
		const usersInfo = await super.userDetails(req.body.userInfo.id);
		return {
			message: lang[req.lang].verifyOtp,
			data: usersInfo,
		};
	}

	async loginUser({
		body: { phone, countryCode, deviceToken, deviceType },
		lang = "en",
	}) {
		const requestData = await super.vaildation(
			{
				phone,
				countryCode,
			},
			{
				deviceToken,
				deviceType,
				lastLogin: app.currentTime,
				authorizationKey: app.createToken(),
			}
		);
		const firstNumbner = phone.charAt(0);
		if (parseInt(firstNumbner) === 0) {
			phone = phone.substring(1);
		}
		const userInfo = await super.loginWithPhone({
			phone,
			countryCode,
		});
		if (!userInfo)
			throw new ApiError("Account not found, please register first", 401);
		requestData.id = userInfo.id;
		requestData.otp = process.env.DEFAULT_OTP || app.randomNumber();
		await DB.save("users", requestData);
		userInfo.authorizationKey = requestData.authorizationKey;
		setTimeout(() => {
			app.sendSMS({
				to: `${countryCode}${phone}`,
				message: `Your OTP ${requestData.otp}, Please don't share with anyone, Team Shusly.`,
			});
		}, 100);
		return {
			message: "User login success",
			data: userInfo,
		};
	}
	async resendOtp({ body: { userId } }) {
		const userOtp = await DB.find("users", "first", {
			conditions: {
				id: userId,
			},
			fields: ["id", "otp", "countryCode", "phone"],
		});
		setTimeout(() => {
			app.sendSMS({
				to: `${userOtp.countryCode}${userOtp.phone}`,
				message: `Your OTP ${userOtp.otp}, Please don't share with anyone, Team Shusly.`,
			});
		}, 100);
		return {
			message: "Otp sent",
			data: [],
			status: 204,
		};
	}

	async getMobileUser(req) {
		const userId = req.body.userId;
		const { countryCode } = req.body.userInfo;
		if (!Array.isArray(req.body)) {
			throw new ApiError("Json array is missing", 400);
		}
		const final = [];
		const totalLength = req.body.length;
		const contacts = req.body;
		for (let i = 0; i < totalLength; i++) {
			if (contacts[i].phoneNumbers.length > 0) {
				const phone = app.removeCountryCode(contacts[i].phoneNumbers[0].number);
				const phoneCopy = contacts[i].phoneNumbers[0].number;

				if (phone !== req.body.userInfo.phone) {
					let query =
						"select id, name,  phone, countryCode, profile from users where isInvite = 0 and phone like '" +
						phone +
						"%' limit 1 ";
					const user = await DB.first(query);
					contacts[i].isRegister = false;
					const userCountryCode = app.getCountryCode(phone, phoneCopy);
					contacts[i].phoneNumbers[0].number = userCountryCode
						? `+${userCountryCode}${phone}`
						: `+${countryCode}${phone}`;
					if (user.length > 0) {
						//contacts[i].displayName = user[0].name;
						if (user[0].profile.length > 0) {
							user[0].profile = app.ImageUrl(user[0].profile);
						}
						contacts[i].isRegister = true;
						contacts[i].userInfo = user[0];
						contacts[i].threadInfo = {
							friendId: user[0].id,
							receiverId: user[0].id,
							senderId: parseInt(userId),
							friendInfo: {
								...user[0],
							},
						};
					}
					final.push(contacts[i]);
				}
			}
		}
		return {
			message: "sync users successfully",
			data: final,
		};
	}

	async appInfo() {
		const app_info = await DB.find("app_informations", "all");
		return {
			message: "App Informations",
			data: app_info,
		};
	}
	async changePassword(req) {
		const required = {
			old_password: req.body.old_password,
			new_password: req.body.new_password,
		};
		const request_data = await super.vaildation(required, {});
		const loginInfo = req.body.userInfo;
		if (loginInfo.password !== request_data.old_password) {
			throw new ApiError(lang[req.lang].oldPassword);
		}
		loginInfo.password = request_data.new_password;
		await DB.save("users", loginInfo);
		return {
			message: "Password changed",
			data: [],
		};
	}

	async updateProfile({ body: { userId, name }, files = {} }) {
		const required = {
			id: userId,
		};
		const non_required = {
			name,
		};
		const request_data = await super.vaildation(required, non_required);
		if (files && files.profile) {
			request_data.profile = await app.upload_pic_with_await(files.profile);
		}
		await DB.save("users", request_data);
		const usersinfo = await super.userDetails(request_data.id);
		return {
			message: "Sweet! Your profile has been updated",
			data: usersinfo,
		};
	}

	async logout(Request) {
		const { userId } = Request.body;
		await DB.save("users", {
			id: userId,
			authorizationKey: "",
			deviceToken: "",
		});
		return {
			message: "User Logout successfully",
			data: [],
		};
	}

	async deleteAccount(Request) {
		const { userId } = Request.body;
		await DB.first(`delete from users where id = ${userId}`);
		return {
			message: "User Logout successfully",
			data: [],
		};
	}

	async userProfile({ params: { userId } }) {
		const usersinfo = await super.userDetails(userId, "id", false);
		return {
			message: "Advisor Information",
			data: usersinfo,
		};
	}
	async blockUsers({ body: { user_id, friend_id = 0 } }) {
		if (friend_id === 0) throw new ApiError("friend_id is required", 422);
		const checkBlock = await DB.find("blockUser", "first", {
			conditions: {
				user_id,
				friend_id,
			},
		});
		let message = "User blocked";
		if (checkBlock) {
			await DB.first(`delete from blockUser where id = ${checkBlock.id}`);
			message = "User unblocked";
		} else {
			await DB.save("blockUser", { user_id, friend_id });
		}
		return {
			message,
		};
	}

	mails({ email, phone, first_name, last_name, authorization_key, otp }) {
		const mail = {
			to: email,
			subject: "User Account Verification",
			template: "user_signup",
			data: {
				first_name,
				last_name,
				url: global.appURL + "users/verify/" + authorization_key,
			},
		};
		try {
			app.sendSMS({
				to: phone,
				message: `Hi ${first_name} ${last_name}, Your one time password for phone verification is ${otp}`,
			});
			app.send_mail(mail);
			return true;
		} catch (error) {}
	}
}

module.exports = UserController;
