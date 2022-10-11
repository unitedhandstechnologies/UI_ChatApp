require('dotenv').config();
const mails = {
	default: process.env.Mail || 'gmail',
	gmail: {
		host: process.env.MAILHOST,
		port: process.env.MAILPORT || 587,
		secure: false,
		requireTLS: true,
		auth: {
			user: process.env.MAILUSER || '',
			pass: process.env.MAILPASS || '',
		},
		tls: {
			ciphers: 'SSLv3',
		},
	},
	smtp: {
		pool: true,
		host: process.env.MAILHOST || '',
		port: process.env.MAILPORT || '',
		secureConnection: false, // use SSL
		auth: {
			user: process.env.MAILUSER || '',
			pass: process.env.MAILPASS || '',
		},
		tls: {
			ciphers: 'SSLv3',
		},
	},
	postmark: {
		auth: {
			apiKey: process.env.POSTMARKAPIKEY || '',
		},
	},
};

module.exports = mails;
