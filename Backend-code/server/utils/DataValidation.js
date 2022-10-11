const { emailRegex, phoneRegex } = require('./regexConstants');
const { BadRequestException, ApiError } = require('../src/Exceptions');
const crypto = require('crypto');
const Db = require('../helper/sqlBulider');
const { lang } = require('../config');
const DB = new Db();

const validateEmail = (key, value) => {
	switch (true) {
		case !value:
			return { [key]: 'Email field is required' };

		case !emailRegex.test(value):
			return { [key]: 'Invalid email address' };

		default:
			return { [key]: '' };
	}
};

const validatePassword = (key, value) => {
	switch (true) {
		case !value:
			return { [key]: 'Please enter your password' };

		case value.length < 8:
			return { [key]: 'Value must be longer than 8 characters' };

		default:
			return { [key]: '' };
	}
};

const validateName = (key, value, length = 3) => {
	switch (true) {
		case !value:
			return { [key]: 'This field is required' };

		case value.length < length:
			return { [key]: `Value must be longer than ${length} characters` };

		default:
			return { [key]: '' };
	}
};

const validatePhone = (key, value) => {
	switch (true) {
		case !value:
			return { [key]: 'This field is required' };

		case !phoneRegex.test(value):
			return { [key]: `Please enter the vaild phone` };

		default:
			return { [key]: '' };
	}
};

const checkAllRequiredFields = (fields) => {
	let message = '';
	const empty = [];
	for (let key in fields) {
		if (fields.hasOwnProperty(key)) {
			if (fields[key] === undefined || fields[key] === '') {
				empty.push(key);
			}
		}
	}
	if (empty.length !== 0) {
		message = empty.toString();
		if (empty.length > 1) {
			message += ' ' + lang['en'].fieldsRequired;
		} else {
			message += ' ' + lang['en'].fieldsRequired;
		}
		return [true, message];
	}
	return [false, null];
};

const checkingAvailability = async (key, value, model) => {
	const result = await DB.first(
		`select id from ${model} where ${key} = '${value}'`
	);
	if (result.length) {
		return true;
	}
	return false;
};

const checkingPhoneAvailability = async ({ phone, countryCode }) => {
	const result = await DB.first(
		`select id from users where phone = '${phone}' and countryCode = ${countryCode} and isInvite != 1`
	);
	if (result.length) {
		return true;
	}
	return false;
};

// const  exitData = async (key, value, model) => {
// 		const result = await DB.first(`select id from ${model} where ${key} = ${value}`);
// 		if (result.length) {
// 			return [true, result];
//         }
//         return [false, null]
// }

const vaildation = async (required, non_required = {}) => {
	try {
		const [badRequest, errorMessage] = checkAllRequiredFields(required);
		if (badRequest) {
			throw new BadRequestException(errorMessage);
		}
		if (required.hasOwnProperty('checkexist') && required.checkexist === 1) {
			if (required.hasOwnProperty('email')) {
				if (await checkingAvailability('email', required.email, 'users')) {
					throw new ApiError('email already exists');
				}
			}
			if (required.hasOwnProperty('phone')) {
				if (await checkingPhoneAvailability({ ...required })) {
					throw new ApiError('phone already exists');
				}
			}
			if (required.hasOwnProperty('username')) {
				if (
					await checkingAvailability('username', required.username, 'users')
				) {
					throw new ApiError('username already exists');
				}
			}
		}
		let final_data = Object.assign(required, non_required);
		if (final_data.hasOwnProperty('password')) {
			final_data.password = crypto
				.createHash('sha1')
				.update(final_data.password)
				.digest('hex');
		}
		if (final_data.hasOwnProperty('old_password')) {
			final_data.old_password = crypto
				.createHash('sha1')
				.update(final_data.old_password)
				.digest('hex');
		}
		if (final_data.hasOwnProperty('new_password')) {
			final_data.new_password = crypto
				.createHash('sha1')
				.update(final_data.new_password)
				.digest('hex');
		}

		for (const data in final_data) {
			if (!final_data[data]) {
				delete final_data[data];
			} else {
				if (typeof final_data[data] === 'string') {
					final_data[data] = final_data[data].trim();
				}
			}
		}
		return final_data;
	} catch (err) {
		throw err;
		//App.error(res, err);
	}
};
module.exports = {
	validateEmail,
	validatePassword,
	validateName,
	checkAllRequiredFields,
	validatePhone,
	vaildation,
};
