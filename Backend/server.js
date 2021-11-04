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

// ===================== main routes ==================================
app.use('/api', cors(corsOptions), Routes);

// ===================== start server ==================================
app.listen(PORT, () => console.log('server is running on port:' + PORT));