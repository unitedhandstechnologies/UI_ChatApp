const crypto = require("crypto");
const Db = require("../../../helper/sqlBulider");
const ApiError = require("../../Exceptions/ApiError");
const { lang } = require("../../../config");
const App = require("../../../helper/CommanMethod");
const DB = new Db();

class ApiController {
	constructor() {
		this.userDetails = this.userDetails.bind(this);
	}
	async vaildation(required, non_required = {}) {
		try {
			let message = "";
			let empty = [];
			let table_name = required.hasOwnProperty("table_name")
				? required.table_name
				: "users";
			for (let key in required) {
				if (required.hasOwnProperty(key)) {
					if (required[key] === undefined || required[key] === "") {
						empty.push(key);
					}
				}
			}
			if (empty.length !== 0) {
				message = empty.toString();
				if (empty.length > 1) {
					message += " " + lang["en"].fieldsRequired;
				} else {
					message += " " + lang["en"].fieldsRequired;
				}
				throw new ApiError(message, 400);
			}

			if (required.hasOwnProperty("checkexist") && required.checkexist === 1) {
				if (required.hasOwnProperty("email")) {
					if (
						await this.checkingAvailability("email", required.email, table_name)
					) {
						throw new ApiError(lang["en"].emailRegister);
					}
				}
				if (required.hasOwnProperty("phone")) {
					if (
						await this.checkingAvailability("phone", required.phone, table_name)
					) {
						throw new ApiError(lang["en"].emailRegister);
					}
				}
				if (required.hasOwnProperty("username")) {
					if (
						await this.checkingAvailability(
							"username",
							required.username,
							table_name
						)
					) {
						throw new ApiError("username already exits");
					}
				}
			}

			let final_data = Object.assign(required, non_required);

			if (final_data.hasOwnProperty("password")) {
				final_data.password = crypto
					.createHash("sha1")
					.update(final_data.password)
					.digest("hex");
			}

			if (final_data.hasOwnProperty("old_password")) {
				final_data.old_password = crypto
					.createHash("sha1")
					.update(final_data.old_password)
					.digest("hex");
			}
			if (final_data.hasOwnProperty("new_password")) {
				final_data.new_password = crypto
					.createHash("sha1")
					.update(final_data.new_password)
					.digest("hex");
			}

			for (let data in final_data) {
				if (final_data[data] === undefined) {
					delete final_data[data];
				} else {
					if (typeof final_data[data] == "string") {
						final_data[data] = final_data[data].trim();
					}
				}
			}
			return final_data;
		} catch (err) {
			throw err;
		}
	}

	async checkingAvailability(key, value, table_name) {
		let query =
			"select * from " +
			table_name +
			" where `" +
			key +
			"` = '" +
			value +
			"' limit 1";
		let data = await DB.first(query);
		if (data.length) {
			return true;
		} else {
			return false;
		}
	}
	async QueryPaginations(table, page, limit) {
		const totalRecord = await DB.first(table);
		const totalPage = Math.round(totalRecord[0].total / limit, 0) || 1;
		return {
			currentPage: page + 1,
			totalPage,
			totalRecord: totalRecord[0].total,
			limit: parseInt(limit),
		};
	}
	async Paginations(table, condition, page, limit) {
		delete condition.limit;
		delete condition.orderBy;
		const totalRecord = await DB.find(table, "count", condition);
		let totalPage = Math.round(totalRecord[0].totalRecord / limit, 0);
		if (totalPage === 0) {
			totalPage = 1;
		}
		return {
			currentPage: page + 1,
			totalPage,
			totalRecord: totalRecord[0].totalRecord,
			limit: parseInt(limit),
		};
	}

	async sendPush(pushObject, id) {
		const User = await DB.find("users", "first", {
			conditions: {
				id,
			},
		});
		if (User.deviceToken) {
			pushObject["token"] = User.deviceToken;
			App.send_push(pushObject);
		}
	}

	async loginWithEmail({ email, password }) {
		const userInfo = await DB.find("users", "first", {
			conditions: {
				email,
			},
			fields: ["id", "password"],
		});
		if (!userInfo) {
			return null;
		}
		if (password !== userInfo.password) {
			return null;
		}
		return await this.userDetails(userInfo.id);
	}

	async loginWithPhone({ phone, countryCode }) {
		const userInfo = await DB.find("users", "first", {
			conditions: {
				phone,
				countryCode,
			},
			fields: ["id"],
		});
		if (!userInfo) {
			return null;
		}
		return await this.userDetails(userInfo.id);
	}
	async totalEarning(userId, type = "all") {
		let conditions = "";
		if (type === "daily") {
			conditions = ` and from_unixtime(threads.modified, "%y%d%m") = from_unixtime(${App.currentTime}, "%y%d%m")`;
		} else if (type === "weakly") {
			conditions = ` and modified > ${App.currentTime - 604800}`;
		}
		const totalEarning = await DB.first(
			`select sum(totalMins) as total from threads where (user_id = ${userId} or friend_id = ${userId}) ${conditions}`
		);
		return totalEarning[0].total || 0;
	}

	async userDetails(id, key = "id", authKey = true) {
		const result = await DB.find("users", "first", {
			conditions: {
				[key]: id,
			},
			fields: ["id", "name", "status", "authorizationKey", "phone", "profile"],
		});
		if (!result) return result;
		if (result.profile) {
			result.profile = global.appURL + "uploads/" + result.profile;
		}
		return result;
	}
}

module.exports = ApiController;
