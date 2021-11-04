let sendEmail = require('./sendEmail');

module.exports.sendVerificationToken = async (values) => {
	let emailBody = `
            <img src="cid:companyLogo"/>
            <h1>Verification Token</h1>
            <p>Hello, ${values.user_name},</p>
            <p>Your verification code is <b>:${values.verification_code}</b></p>
            <p>verification code will be expire within <b>24 hours.</b></p>
        `;
	let  attachments = [{
		filename: 'logo.png',
		path: './uploads/logo.png',
		cid: 'companyLogo'
	}];

	let data = {
		receiver_email:values.receiver,
		email_subject:'Email Verification Token',
		email_body: emailBody,
		attachments: attachments
	};

	let promiseRespond = await sendEmail.sendEmail(data);

	return promiseRespond;
};

module.exports.sendForgotPasswordVerificationToken = async (values) => {
	let emailBody = `
            <img src="cid:companyLogo"/>
            <h1>Reset Password Verification Token</h1>
            <p>Hello ${values.user_name},</p>
            <p>Your verification code is <b>:${values.verification_code}</b></p>
            <p>verification code will be expire within <b>24 hours.</b></p>
        `;
	let attachments = [{
		filename: 'logo.png',
		path: './uploads/logo.png',
		cid: 'companyLogo'
	}];

	let data = {
		receiver_email: values.receiver,
		email_subject: 'Reset Password Verification Token',
		email_body: emailBody,
		attachments: attachments
	};

	let promiseRespond = await sendEmail.sendEmail(data);

	return promiseRespond;
};

module.exports.reSendPasswordVerificationToken = async (values) => {
	let emailBody = `
            <img src="cid:companyLogo"/>
            <h1>Verification Token</h1>
            <p>Hello ${values.user_name},</p>
            <p>Your verification code is <b>:${values.verification_code}</b></p>
            <p>verification code will be expire within <b>24 hours.</b></p>
        `;
	let attachments = [{
		filename: 'logo.png',
		path: './uploads/logo.png',
		cid: 'companyLogo'
	}];

	let data = {
		receiver_email: values.receiver,
		email_subject: 'Verification Token',
		email_body: emailBody,
		attachments: attachments
	};

	let promiseRespond = await sendEmail.sendEmail(data);

	return promiseRespond;
};

module.exports.sendContactMessageReceived = async (values) => {
	let emailBody = `
            <img src="cid:companyLogo"/>
            <h1>Contact Message Received</h1>
            <p>Hello ${values.user_name},</p>
            <p>Thank you for contact us.</p>
            <p>We received your message. We will respond to your message as soon as possible.</p>
        `;
	let attachments = [{
		filename: 'logo.png',
		path: './uploads/logo.png',
		cid: 'companyLogo'
	}];

	let data = {
		receiver_email: values.receiver,
		email_subject: 'Contact Message Received',
		email_body: emailBody,
		attachments: attachments
	};

	let promiseRespond = await sendEmail.sendEmail(data);

	return promiseRespond;
};

module.exports.paymentSuccessMessage = async (values) => {
	let emailBody = `
            <img src="cid:companyLogo"/>
            <h1>Payment Successful</h1>
            <p>Hello ${values.user_name},</p>
            <p>We have received your payment of Rs.${values.payment_amount} for order number: ${values.order_id}.</p>
            <p>Thank you for your purchase</p>
        `;
	let attachments = [{
		filename: 'logo.png',
		path: './uploads/logo.png',
		cid: 'companyLogo'
	}];

	let data = {
		receiver_email: values.receiver,
		email_subject: 'Payment Successful',
		email_body: emailBody,
		attachments: attachments
	};

	let promiseRespond = await sendEmail.sendEmail(data);

	return promiseRespond;
};

module.exports.paymentUnSuccessMessage = async (values) => {
	let emailBody = `
            <img src="cid:companyLogo"/>
            <h1>Payment UnSuccessful</h1>
            <p>Hello ${values.user_name},</p>
            <p>We are sorry, Payment didn't completed.</p>
            <p>We did not received your payment of Rs.${values.payment_amount} for order number: ${values.order_id}. Until your payment is success delivery will be hold.</p>
        `;
	let attachments = [{
		filename: 'logo.png',
		path: './uploads/logo.png',
		cid: 'companyLogo'
	}];

	let data = {
		receiver_email: values.receiver,
		email_subject: 'Payment UnSuccessful',
		email_body: emailBody,
		attachments: attachments
	};

	let promiseRespond = await sendEmail.sendEmail(data);

	return promiseRespond;
};