/*
 * v1
 * auth pankaj vashisht @sharmapankaj688@gmail.com
 * helper can used in the whole app for sending mail , push  , payment etc work.
 * function with anysc , await or without anysc awit .
 */

/**
 * first import the configration file after get the all configration
 * send mail , push , file upload etc .
 * when function cal then that file import at moment.
 */
const { config, mails, SMS } = require("../config");
const fs = require("fs");
const crypto = require("crypto");
const https = require("https");
const url = require("url");
const twilio = require("twilio");

module.exports = {
	send_mail: function (object) {
		const { nodemailer } = require("./mails");
		const Sendmails = new nodemailer(mails[mails.default]);
		Sendmails.to(object.to)
			.subject(object.subject)
			.html(object.template, object.data)
			.send();
	},
	mailgun: function () {},
	upload_pic_with_await: function (
		file,
		folder_name = "uploads/",
		unlink = null
	) {
		try {
			if (!file) {
				return false; // if not getting the image
			} else {
				if (unlink) {
					//
				}

				let upload_path = global.appRoot + "/public/" + folder_name;
				let image = file;
				let image_array = image.mimetype.split("/");
				let extension = image_array[image_array.length - 1];
				var timestamp = parseInt(new Date().getTime());
				if (extension === "plain") {
					extension = "mp4";
				}
				if (extension === "mpeg") {
					extension = "mp3";
				}
				image.mv(
					upload_path + "/" + timestamp + "." + extension,
					function (err) {
						if (err) {
							// eslint-disable-next-line no-console
							console.log(err);
						} else {
							// eslint-disable-next-line no-console
							console.log("file_uploaded");
						}
					}
				);
				return timestamp + "." + extension;
			}
		} catch (err) {
			console.log(err);
			throw { code: 415, message: JSON.stringify(err) };
		}
	},
	send_push: function (data) {
		const headers = {
			Authorization: `key=${process.env.GOOGLE_KEY_USER}`,
			"Content-Type": "application/json",
		};
		const pushObject = {
			registration_ids: !Array.isArray(data.token)
				? [data.token]
				: data.token.map((val) => val.device_token),
			notification: {
				body: data.message,
				title: `${config.App_name}`,
				priority: "high",
			},
			data,
		};
		console.log(pushObject);
		POST(
			"https://fcm.googleapis.com/fcm/send",
			JSON.stringify(pushObject),
			headers
		)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
		// const fcm = new FCM(GOOGLE_KEY);
		// const body = {
		// 	body: data.message,
		// 	title: config.App_name,
		// 	notification_code: data.notification_code,
		// 	data
		// };
		// console.log(body);
		// fcm
		// 	.sendPromise(data.token, body)
		// 	.then((res) => {
		// 		console.log(res);
		// 	})
		// 	.catch((err) => {
		// 		console.log(err);
		// 	});
	},
	send_push_apn: function () {},
	paypal: async function () {},
	stripe: async function () {},
	brain_tree: async function () {},
	sendSMS: (data) => {
		const { accountSid, authToken, sendNumber } = SMS[SMS.default];
		const client = new twilio(accountSid, authToken);
		console.log({ data });
		client.messages
			.create({
				body: data.message,
				to: "+" + data.to, // Text this number
				from: sendNumber, // From a valid Twilio number
			})
			.then((message) => console.log(message))
			.catch((err) => {
				console.log(err);
			});
	},
	error: function (res, err) {
		try {
			let code =
				typeof err === "object"
					? err.hasOwnProperty("code")
						? err.code
						: 500
					: 403;
			let message =
				typeof err === "object"
					? err.hasOwnProperty("message")
						? err.message
						: err
					: err;
			res.status(code).json({
				success: false,
				error_message: message,
				code: code,
				data: [],
			});
		} catch (error) {
			res.status(500).json(error);
		}
	},
	IsJsonString: (str) => {
		try {
			JSON.parse(str);
		} catch (e) {
			return false;
		}
		return true;
	},
	success: function (res, data) {
		res.json({
			success: true,
			message: data.message,
			code: 200,
			data: data.data,
		});
	},
	loadModel: function (file_name = null) {
		try {
			if (fs.existsSync(config.root_path + "model/" + file_name + ".js")) {
				let models = require("../model/" + file_name);
				return new models();
			} else {
				let message =
					"Model " +
					file_name +
					" Not Found on the server.Please create the " +
					file_name +
					" in model folder.";
				throw { code: 404, message };
			}
		} catch (err) {
			throw err;
		}
	},

	createToken() {
		let key = "abc" + new Date().getTime();
		return crypto.createHash("sha1").update(key).digest("hex");
	},
	addUrl(data, key, folder = "uploads") {
		if (data.length === 0) {
			return [];
		}
		return data.map((element) => {
			if (!Array.isArray(key)) {
				if (element[key]) {
					element[key] = global.appURL + folder + "/" + element[key];
				}
			} else {
				for (const names of key) {
					if (element[names]) {
						element[names] = global.appURL + folder + "/" + element[names];
					}
				}
			}
			return element;
		});
	},
	createHash(key, hash = "sha1") {
		return crypto.createHash(hash).update(key).digest("hex");
	},
	convertDate(timestamp) {
		const today = new Date(timestamp * 1000);
		let dd = today.getDate();
		let mm = today.getMonth() + 1; //January is 0!

		var yyyy = today.getFullYear();
		if (dd < 10) {
			dd = "0" + dd;
		}
		if (mm < 10) {
			mm = "0" + mm;
		}
		return dd + "-" + mm + "-" + yyyy;
	},
	checkDob(dob) {
		const brithDate = new Date(dob * 1000);
		const birthMonth = brithDate.getMonth();
		const birthDay = brithDate.getDate();
		const brithInfo = `${birthMonth}${birthDay}`;
		const today = new Date();
		const todayDay = today.getDate();
		const currentMonth = today.getMonth();
		const todayInfo = `${currentMonth}${todayDay}`;
		if (brithInfo === todayInfo) {
			return true;
		}
		return false;
	},
	UserToken: function (id, req) {
		const clientIp = req.connection.remoteAddress;
		const { isMobile, isDesktop, browser, version, os, platform, source } =
			req.useragent;
		let token =
			id +
			clientIp +
			isMobile +
			isDesktop +
			os +
			version +
			platform +
			source +
			browser;
		return this.createHash(token);
	},
	ImageUrl(name, folder = "uploads") {
		return global.appURL + folder + "/" + name;
	},
	randomNumber() {
		return Math.floor(100000 + Math.random() * 900000);
	},
	removeCountryCode(phoneNumber) {
		let phoneCopy = phoneNumber.replace("+", "").replace(/ /g, "");
		if (phoneCopy.length === 11 && phoneCopy.charAt(0) !== 0) {
			return phoneCopy;
		}
		if (phoneCopy.length === 12 && phoneCopy.charAt(0) === 0) {
			return phoneCopy;
		}
		if (phoneCopy.length >= 15 && phoneCopy.charAt(0) === 0) {
			return phoneCopy.substr(-11);
		}
		if (
			phoneCopy.length === 14 &&
			phoneCopy.charAt(0) === 0 &&
			phoneCopy.charAt(1) === 0
		) {
			return phoneCopy.substr(-10);
		}
		if (phoneCopy.length >= 13 && phoneCopy.charAt(0) !== 0) {
			return phoneCopy.substr(-11);
		}
		if (phoneCopy.length > 10) {
			phoneCopy = phoneCopy.substr(-10);
		}
		return phoneCopy;
	},
	getCountryCode(phone, fullPhone) {
		let phoneCopy = fullPhone.replace("+", "").replace(/ /g, "");
		if (phone === phoneCopy) return false;
		return parseInt(phoneCopy.replace(phone, ""), 10);
	},
	makerandomString(length) {
		var result = "";
		var characters =
			"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		var charactersLength = characters.length;
		for (var i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	},
	get currentTime() {
		return Math.round(new Date().getTime() / 1000, 0);
	},
	currentTimeZone(timeZone) {
		const date = new Date();
		date.toLocaleString("en-US", { timeZone });
		return Math.round(date.getTime() / 1000, 0);
	},
	dateConvertWithTimeZone(userDate, timeZone) {
		const date = new Date(userDate * 1000);
		date.toLocaleString("en-US", { timeZone });
		return Math.round(date.getTime() / 1000, 0);
	},
	currentWeekStartAndEndDate() {
		const curr = new Date();
		const first = curr.getDate() - curr.getDay();
		const last = first + 6;
		return {
			first: Math.round(new Date(curr.setDate(first)).getTime() / 1000, 0),
			last: Math.round(new Date(curr.setDate(last)).getTime() / 1000, 0),
		};
	},
	unixTimeStamp(date) {
		return Math.round(new Date(date).getTime() / 1000, 0);
	},
	setZeroHours(timeZone) {
		const date = new Date();
		date.toLocaleString("en-US", { timeZone });
		date.setHours(0);
		date.setMinutes(0);
		return Math.round(date.getTime() / 1000, 0);
	},
	getStartTimeAndEndTime(date, hours, duration, timeZone) {
		const time = hours.split(":");
		const convertDate = (timestamp) => {
			const today = new Date(timestamp * 1000);
			const intlDateObj = new Intl.DateTimeFormat("en-US", {
				timeZone,
			});
			console.log(intlDateObj.format(today));
			const selectedDate = new Date(intlDateObj.format(today));
			let dd = selectedDate.getDate();
			let mm = selectedDate.getMonth() + 1; //January is 0!
			var yyyy = selectedDate.getFullYear();
			if (dd < 10) {
				dd = "0" + dd;
			}
			if (mm < 10) {
				mm = "0" + mm;
			}
			return `${yyyy}/${mm}/${dd}`;
		};
		const convertedDate = convertDate(date);
		const addedHourDate = `${convertedDate} ${
			time[0]
		}:${time[1].trim()}:00 +0530`;
		console.log(addedHourDate);
		const newDate = new Date(addedHourDate);
		const start_time = Math.round(newDate.getTime() / 1000, 0);
		const end_time = start_time + duration * 60;
		return {
			start_time,
			end_time,
		};
	},
};

function POST(apiUrl, data, headers) {
	return new Promise((resolve, reject) => {
		const host = url.parse(apiUrl).hostname;
		const path = url.parse(apiUrl).pathname;
		const options = {
			host,
			path,
			method: "post",
			headers,
		};
		const request = https.request(options, function (res) {
			res.setEncoding("utf-8");
			let responseString = "";
			res.on("data", function (data) {
				responseString += data;
			});
			request.on("error", function (error) {
				reject(error);
			});
			res.on("end", function () {
				resolve(responseString);
			});
		});
		request.write(data);
		request.end();
	});
}
