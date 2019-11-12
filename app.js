const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');

process.env.NODE_ENV !== 'production' && require('dotenv').config();

//require api route
const indexApi = require('./routes');
const contactApi = require('./routes/contacts');
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
app.use(express.urlencoded({ extended: true }));

app.use(
	session({
		secret: process.env.SESSSECRET,
		resave: false,
		saveUninitialized: false
	})
);
// express middleware
// app.use(function(req, res, next) {
// 	next();
// });

app.get('/', (req, res) => {
	res.send('hello world');
});
// routes setup
app.use(indexApi);
app.use('/contact', contactApi);

app.listen(3000, (err) => {
	if (err) throw err;
	console.log('=> server now running on port 3000');
});
