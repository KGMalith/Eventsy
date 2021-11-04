const nodemailer = require('nodemailer');
const config = require('../../../config/config');

module.exports.sendEmail = async (bodyValues) => {

	// eslint-disable-next-line no-useless-catch
	try{
		let transporter = nodemailer.createTransport({
			service: config.Emails.EMAIL_SERVICE,
			auth: {
				user: config.Emails.EMAIL_USER,
				pass: config.Emails.EMAIL_PASSWORD
			},
		});

		let mailOptions = {
			from: config.Emails.EMAIL_USER_NAME,
			to: bodyValues.receiver_email,
			subject: bodyValues.email_subject,
			html: bodyValues.email_body,
			attachments: bodyValues.attachments
		};

		let promiseRespond = await transporter.sendMail(mailOptions);
		
		return promiseRespond;
	}catch(err){
		throw err;
	}
	
};