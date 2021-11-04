module.exports = {
	db:{
		url: process.env.DB_URL
	},
	server:{
		port: process.env.APP_PORT
	},
	whiteListedOrigins: process.env.WHITE_LISTED_DOMAINS,
	JWT:{
		secret: process.env.JWT_SECRET
	},
	Emails:{
		EMAIL_SERVICE: process.env.NODEMAILER_SERVICE,
		EMAIL_USER: process.env.NODEMAILER_USER,
		EMAIL_USER_NAME: process.env.NODEMAILER_USER_NAME,
		EMAIL_PASSWORD: process.env.NODEMAILER_PASS
	},
	Uploads:{
		UPLOAD_BASE_URL: process.env.UPLOAD_BASE_URL
	}
};