const Db = require("../../helper/sqlBulider");
const app = require("../../helper/CommanMethod");
const DB = new Db();

const UserAuth = async (req, res, next) => {
	try {
		if (!res.auth) {
			return next();
		}
		const { headers } = req;
		if (!Object.prototype.hasOwnProperty.call(headers, "authorization")) {
			// eslint-disable-next-line no-throw-literal
			throw { code: 400, message: "Authorization key is required" };
		}
		const userDetails = await DB.find("users", "first", {
			conditions: {
				authorizationKey: req.headers.authorization,
			},
			fields: [
				"id",
				"name",
				"status",
				"otp",
				"authorizationKey",
				"phone",
				"countryCode",
				"profile",
			],
		});
		if (userDetails) {
			req.body.userId = userDetails.id;
			if (userDetails && userDetails.profile) {
				userDetails.profile = global.appURL + "uploads/" + userDetails.profile;
			}
			req.body.userInfo = userDetails;
			DB.save("users", {
				id: userDetails.id,
				lastApiCall: app.currentTime,
			});
			return next();
		}
		// eslint-disable-next-line no-throw-literal
		throw { code: 401, message: "Invaild Authorization" };
	} catch (err) {
		return app.error(res, err);
	}
};

module.exports = UserAuth;
