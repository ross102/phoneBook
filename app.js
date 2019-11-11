const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');

//require api route
const indexApi = require('./api');
// database
mongoose.connect('mongodb://localhost:27017/phonebook', {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
});
// error messages from db
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongoDb connection error'));

// initialize express
const app = express();

// express body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
	session({
		secret: 'lions get scared',
		resave: false,
		saveUninitialized: false
	})
);

// routes setup
app.use('/', indexApi);

app.listen(3000, (err) => {
	if (err) throw err;
	console.log('=> server now running on port 3000');
});
