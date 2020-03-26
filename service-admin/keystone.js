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


let services = {};
try {
	console.log('path is ', join(__dirname, '/services'));
	let list = fs.readdirSync(join(__dirname, '/services'));
	list.forEach(item => {
		if (item.search(/.js$/) !== -1) {
			let name = item.toString().replace(/\.js$/, '');
			console.log('[FRAMEWORK]', `Loading Service: '${name}'`);
			services[name] = new (require(join(__dirname, '/services', name)));
		}
	});
	addSafeReadOnlyGlobal('services', services);
} catch (err) {
	console.log(err);
}

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

let sendMail = cron.schedule('* 0 8 * * *', () =>  {  // check for mails at daily 8:00
	//
});

sendMail.start();

let checkForExpired = cron.schedule( '* 1 0 * * *', async ()=>{  //check for deadline/expired date at 00:01 daily
	let start = new Date();
	start.setHours(0,0,0,0);

	let end = new Date();
	end.setHours(23,59,59,999);

	const Record = keystone.list('Record').model;

	let deadlineRecords = await Record.find({DeadlineOfRenewal: {$gte: start, $lt: end}});
	for(let rec of deadlineRecords){
		let a = await services.SendEmail.sendEmailToUser(rec, 1);
	}

	let expiredRecords = await Record.find({DeadlineOfRenewal: {$gte: start, $lt: end}});
	for(let rec of expiredRecords){
		let a = await services.SendEmail.sendEmailToUser(rec, 2);
	}


});
checkForExpired.start();

// let sendmail = async ()=>{
// 	console.log('inside this func');
// 	let start = new Date();
// 	start.setHours(0,0,0,0);
//
// 	let end = new Date();
// 	end.setHours(23,59,59,999);
//
// 	const Record = keystone.list('Record').model;
//
// 	let deadlineRecords = await Record.find({DeadlineOfRenewal: {$gte: start, $lt: end}});
// 	for(let rec of deadlineRecords){
// 		console.log('deadline ',rec);
// 		let a = await services.sendEmail.sendEmailToUser(rec.ReportProcessorEmailAddress, 1, rec.ReportName, []);
// 	}
//
// 	let expiredRecords = await Record.find({DeadlineOfRenewal: {$gte: start, $lt: end}});
// 	for(let rec of expiredRecords){
// 		console.log('expired',rec);
// 		let a = await services.sendEmail.sendEmailToUser(rec.ReportProcessorEmailAddress, 2, rec.ReportName, []);
// 	}
// };

// sendmail();

// Start Keystone to connect to your database and initialise the web server
keystone.start();
