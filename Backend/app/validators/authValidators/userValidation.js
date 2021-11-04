const {userSignupValidationSchema}  = require('./userSchema');

module.exports = {
	userSignupValidation:async(req,res,next) =>{
		const respond = await userSignupValidationSchema.validate(req.body);
		if(respond.error){
			res.status(500).json({
				success: false,
				msg: respond.error.details[0].message,
				showMessage: true
			});
		}else{
			next();
		}
	},
};