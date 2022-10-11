const Apiresponse = (fn) => async (req, res) => {
	try {
		const { data = {}, message, status = 200 } = await fn(req, res);
		res.status(status).send({
			success: true,
			status,
			message,
			data,
		});
	} catch (err) {
		return error(res, err);
	}
};

const error = (res, err) => {
	try {
		const code =
			typeof err === 'object'
				? err.hasOwnProperty('code')
					? err.code
					: 500
				: 403;
		const message =
			typeof err === 'object'
				? err.hasOwnProperty('message')
					? err.message
					: err
				: err;
		res.status(code).json({
			success: false,
			error_message:
				typeof message === 'object' ? JSON.stringify(message) : message,
			code: code,
			data: [],
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error_message: typeof error === 'object' ? JSON.stringify(error) : error,
			code: 500,
			data: [],
		});
	}
};
module.exports = Apiresponse;
