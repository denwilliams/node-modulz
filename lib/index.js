var cluster = require('cluster');
var workers = {};
var RESTART_INTERVAL = 2000;

/**
 * Runs the specified modules in their own domain/process
 * @param  {Array} what - Modules to run
 */
exports.run = function(what) {
	if (cluster.isMaster) {
		what.forEach(function(item) {
			runModule(item.id);
		});
		cluster.on('exit', function(worker, code, signal) {
			var id = workers[worker.id];
			console.log(id + ' crashed - restarting in '+RESTART_INTERVAL/1000+' seconds');
			setTimeout(function() {
				runModule(id);
			}, RESTART_INTERVAL);
		});
	} else {
		var ctx = what
		.filter(function(item) {
			return item.id == process.env.modulzId;
		})
		.map(function(item) {
			return modulzFactory(item.method, item.options);
		});
		if (ctx.length > 0) {
			ctx[0]();
		} else {
			console.log('couldn\'t find module '+id);
		}
	}
};

function runModule(id) {
	var worker = cluster.fork({modulzId: id});
	workers[worker.id] = id;
}

function modulzFactory(fn, options) {
	return function() {
		fn(options);
	};
}
