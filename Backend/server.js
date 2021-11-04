//Import .env package
require('dotenv').config();
//Initialize express
let express = require('express');
let app = express();
//import bodyparser
let bodyParser = require('body-parser');
//Import mongoose
let mongoose = require('mongoose');
//Import config file
let config = require('./config/config');
//Import CORS
let cors = require('cors');
//Import Main Routes File
let Routes = require('./app/mainRoute');
//Import file upload
const fileUpload = require('express-fileupload');
//Import Port Number
const PORT = config.server.port;

//Create mongoose connection
mongoose.connect(config.db.url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true
});

//make app use json
app.use(express.json());

// configure app to use bodyParser()
app.use(bodyParser.urlencoded({ extended: true }));

//use file upload middleware
app.use(fileUpload());

//import whitelist origins
const whitelist = config.whiteListedOrigins;

//check cors requests
const corsOptions = {
	origin: function (origin, callback) {
		if (whitelist.indexOf(origin) !== -1 || !origin) {
			callback(null, true);
		} else {
			callback(null, true);
		}
	}
};

var path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// =================================== File upload routes start =======================================

//upload research papers
app.post('/api/upload-research-paper', cors(corsOptions), (req, res) => {
	if (req.files === null) {
		return res.status(500).json({ success: false, msg: 'Research paper document not selected. Please select document', showMessage: true });
	}
	const file = req.files.file;
	if (file.mimetype !== 'application/pdf') {
		return res.status(500).json({ success: false, msg: 'Invalid file format', showMessage: true });
	}

	const fileName = `${Date.now()}_${file.name}`;

	file.mv(`${__dirname}/uploads/pdf/research_papers/${fileName}`, err => {
		if (err) {
			console.error(err);
			return res.status(500).json({ success: false, msg: err, showMessage: true });
		}
		let data = {
			file_path: `${config.Uploads.UPLOAD_BASE_URL}/uploads/pdf/research_papers/${fileName}`
		};

		res.status(200).json({ success: true, msg: 'uploaded', data: data, showMessage: true });
	});
});


//upload workshop proposal
app.post('/api/upload-workshop-proposal', cors(corsOptions), (req, res) => {
	if (req.files === null) {
		return res.status(500).json({ success: false, msg: 'Workshop proposal document not selected. Please select document', showMessage: true });
	}
	const file = req.files.file;
	if (file.mimetype !== 'application/pdf') {
		return res.status(500).json({ success: false, msg: 'Invalid file format', showMessage: true });
	}

	const fileName = `${Date.now()}_${file.name}`;

	file.mv(`${__dirname}/uploads/pdf/workshop_proposals/${fileName}`, err => {
		if (err) {
			console.error(err);
			return res.status(500).json({ success: false, msg: err, showMessage: true });
		}
		let data = {
			file_path: `${config.Uploads.UPLOAD_BASE_URL}/uploads/pdf/workshop_proposals/${fileName}`
		};

		res.status(200).json({ success: true, msg: 'uploaded', data: data, showMessage: true });
	});
});

// =================================== File upload routes end =======================================

// ===================== main routes ==================================
app.use('/api', cors(corsOptions), Routes);

// ===================== start server ==================================
app.listen(PORT, () => console.log('server is running on port:' + PORT));