const nodemailer = require('nodemailer');
class Mailer {
	constructor(oauth) {
		this.mail = {};
		this.oauth = oauth;
		this.htmlData = '';
		this.body = '';
	}

	subject(subject) {
		this.subject = subject;
		return this;
	}

	to(to) {
		this.to = to;
		return this;
	}

	html(mailTemplate, data = {}) {
		this.htmlData = {
			emailTemplate: mailTemplate,
			data,
		};
		return this;
	}

	body(data) {
		this.body = data;
		return this;
	}

	send() {
		try {
			if (typeof this.htmlData === 'object') {
				const ejs = require('ejs');
				const filePath = `/views/mails/${this.htmlData.emailTemplate}.ejs`;
				ejs.renderFile(
					global.appRoot + filePath,
					this.htmlData.data,
					(err, data) => {
						console.log(err);
						const transporter = nodemailer.createTransport(this.oauth);
						const mailOptions = {
							to: this.to,
							from: 'admin@rousocial.com',
							subject: this.subject,
							html: data,
						};
						transporter.sendMail(mailOptions, function (error, info) {
							if (error) {
								// eslint-disable-next-line no-console
								console.log('i am check error ', error);
							} else {
								// eslint-disable-next-line no-console
								console.log('Email sent: ' + info.response);
							}
						});
					}
				);
			} else {
				const transporter = nodemailer.createTransport(this.oauth);
				const mailOptions = {
					to: this.to,
					subject: this.subject,
					html: this.body,
				};
				transporter.sendMail(mailOptions, function (error, info) {
					if (error) {
						// eslint-disable-next-line no-console
						console.log('i am check error ', error);
					} else {
						// eslint-disable-next-line no-console
						console.log('Email sent: ' + info.response);
					}
				});
			}
		} catch (err) {
			// eslint-disable-next-line no-console
			console.log(err);
			return;
		}
	}
}

module.exports = Mailer;
