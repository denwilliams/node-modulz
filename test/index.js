var modulz = require('../lib');

var modules = [
	{id: 'ONE', method:one, options: 'a'},
	{id: 'TWO', method:two, options: 'b'}
];

modulz.run(modules);


function one(options) {
	console.log('running one');
}

function two(options) {
	console.log('running two');
	setTimeout(function() {
		throw new Error();
	},5000);
}