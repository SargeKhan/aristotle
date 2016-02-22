var libgen = require("libgen");
var mirror = ""

function findMirror(callback){
	libgen.mirror(function(err, urlString){
    if(err) return console.error(err);
    console.log(urlString + " works");
	hostname = urlString;
	return callback(hostname);
});

var options = {
  mirror: 'http://gen.lib.rus.ec',
  query: 'cats',
  count: 5,
  sort_by: 'year',
  reverse: true
};
exports.search = function(options){
	if(!(options.query || typeof options.query === 'string')){
		return { 
			err: true,
			result: "Query cannot be empty, and related problem"
		}
	}
	if(!mirror){
		findMirror()
		
	libgen.search(op

}
