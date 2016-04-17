var libgen = require("libgen");
var request = require("request");
var cheerio = require("cheerio");
var path = require("path");

var http = require('http');
var fs = require('fs');


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
libgen.mirror(function (err, urlString) {
    if(err)
        console.log('Mirror Bootstrap failed');
    else
        mirror = urlString;
});
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
			//console.log(data);
			callback({
				err: false,
				result: data,
                mirror: options.mirror
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
function scrape(requestUrl,callback){
    console.log('Scraping: '+requestUrl);
    request(requestUrl, function (err, response, html) {
        if(!err && response.statusCode == 200){
            var $ = cheerio.load(html);
            $ = $("H2",  "body");
            var href = $.parent().attr("href");
            return callback({
                err: false,
                result: href
            });
        }else {
            return callback({
                err: true,
                result: err
            });
        }
    });
}
exports.getDownloadLink = function(requestUrl, callback){
	console.log("Mirror before checking" + mirror);
    if(mirror){
		console.log("Mirror Link: " + mirror);
        scrape(mirror+"/get.php?md5="+requestUrl,callback);
    }
    else {
		console.log("Didn't find an exisitng mirror");
        libgen.mirror(function (err, urlString) {
            if(err || urlString == undefined){

				console.log("Problemo");
                return callback({
                    err: true,
                    result: err
                });
            }
            else{
				console.log("urlString:" + urlString);
				mirror = urlString;
				console.log(mirror);
                scrape(mirror+"/get.php?md5="+requestUrl,callback);
            }
        });
    }
};

exports.saveFile = function(filePath, fileUrl, callback){
    // using request since default http lib doesn't follow redirects and fails downloading
	console.log("Mirror" + mirror);
    var r = request(mirror + fileUrl);
    r.on( 'response', function( res ){
		// RegExp to extract the filename from Content-Disposition
		var regexp = /filename=\"(.*)\"/gi;
		// extract filename
		var filename = regexp.exec( res.headers['content-disposition'] )[1];
		console.log(path.join(filePath, filename));

		// create file write stream
        var fws = fs.createWriteStream( filename );

        // setup piping
        res.pipe( fws );

		res.on( 'end', function(){
			callback({
				err: false,
				result: "File saved"
			})
		});
	});
	//http.get(mirror + fileUrl, function(response) {
	//	response.pipe(file);
	//	file.on('finish', function() {
	//		file.close(
	//			callback({
	//				err: false,
	//				result: "File saved"
	//			})
	//		)
	//	});
	//}).on('error', function(err) {
	//	fs.unlink(filename);
	//	if (callback) callback(err.message);
	//});
};
