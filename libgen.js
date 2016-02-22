var libgen = require("libgen");

var mirror= "";
function findMirror( options, searchCallback, callback) {
	libgen.mirror(function (err, urlString) {
		if (err) {
			console.error(err);
			return callback({
				err: true,
				result: err
			});
		}else {
			console.log(urlString + " works");
			options.mirror = urlString;
			mirror = urlString;
			console.log(options);
			return searchCallback(options, callback);
		}
	});
}

var options = {
  mirror: 'http://gen.lib.rus.ec',
  query: 'cats',
  count: 5,
  sort_by: 'year',
  reverse: true
};
function searchBook(options, callback){
	console.log(options);
	libgen.search(options, function (err, data) {
		if(err) {
			console.error(err);
			callback ({
				err: true,
				result: err
			});
		} else{
			console.log(data);
			callback({
				err: false,
				result: data
			});
		}
	});
}
exports.search = function(options, callback){
	if(!(options.query || typeof options.query === 'string')){
		return callback( {
			err: true,
			result: "Query cannot be empty, and related problem"
		})
	}
	if(mirror === ''){
		console.log("Mirror doesn't exists" );
		findMirror( options, searchBook, callback);
	} else {
		options.mirror = mirror;
		console.log("Mirror already exists: " + options.mirror);
		searchBook(options, callback)
	}
};


/*
exports.search(options, function(res){
	console.log("Stuff returned: " + JSON.stringify(res) );
});
*/

