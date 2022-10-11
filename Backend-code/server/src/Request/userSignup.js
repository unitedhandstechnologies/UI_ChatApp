const { vaildation } = require("../../utils/DataValidation");
const app = require("../../helper/CommanMethod");
module.exports = async (Request, res, next) => {
	const requried = {
		name: Request.body.name,
		phone: Request.body.phone,
		countryCode: Request.body.countryCode,
		checkexist: 1,
	};
	const nonRequired = {
		deviceType: Request.body.deviceType,
		deviceToken: Request.body.deviceToken,
		authorizationKey: app.createToken(),
		isInvite: 0,
		otp: process.env.DEFAULT_OTP || app.randomNumber(),
	};
	if (requried.phone) {
		const firstNumbner = requried.phone.charAt(0);
		if (parseInt(firstNumbner) === 0) {
			requried.phone = requried.phone.substring(1);
		}
	}

	try {
		Request.RequestData = await vaildation(requried, nonRequired);
		next();
	} catch (err) {
		return app.error(res, err);
	}
};
