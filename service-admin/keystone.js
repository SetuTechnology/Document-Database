// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();
const cron = require('node-cron');

// Require keystone
const keystone = require('keystone');
const handlebars = require('express-handlebars');
const fs = require('fs');
const {join} = require('path');

const addSafeReadOnlyGlobal = (prop, val) => {
	console.log('[FRAMEWORK]'.bold.yellow, `Exporting safely '${prop.bold}' from ${this.constructor.name}`.cyan);
	Object.defineProperty(global, prop, {
		get: function () {
			return val;
		},
		set: function () {
			console.log('You are trying to set the READONLY GLOBAL variable `', prop, '`. This is not permitted. Ignored!');
		}
	});
};

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.
keystone.init({
	'name': 'Documents Database',
	'brand': 'Documents Database',
	'less': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': '.hbs',
	'admin path': 'admin',
	'adminui custom styles': './public/styles/keystone.less',
	'custom engine': handlebars.create({
		layoutsDir: 'templates/views/layouts',
		partialsDir: 'templates/views/partials',
		defaultLayout: 'default',
		helpers: new (require('./templates/views/helpers'))(),
		extname: '.hbs',
	}).engine,
	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',
});

// Load your project's Models
keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});


// Load your project's Routes
keystone.set('routes', require('./routes'));


// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
	main: ['Location','Record'],
	users: ['users'],
});

// # ┌────────────── second (optional)
// # │ ┌──────────── minute
// # │ │ ┌────────── hour
// # │ │ │ ┌──────── day of month
// # │ │ │ │ ┌────── month
// # │ │ │ │ │ ┌──── day of week
// # │ │ │ │ │ │
// # │ │ │ │ │ │
// # * * * * * *

let sendMail = cron.schedule('* 15 10 * * *', () =>  {  // send mails at daily 10:15
	//
});

sendMail.start();

let checkForExpired = cron.schedule( '* 1 0 * * *', ()=>{  //check for expired date at 00:01 daily
	//
});
checkForExpired.start();

// Start Keystone to connect to your database and initialise the web server
keystone.start();
