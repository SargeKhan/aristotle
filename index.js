/**
 * Created by usman on 2/22/16.
 */

var libgenio = require("./libgenio");
var libgen = require("libgen");
var options = {
  mirror: '',
  query: 'The Alchemist Paulo',
  count: 25,
  sort_by: 'year',
  reverse: true
};
/*
libgenio.search( options, function(result){
  if(result.err){
    console.err(result.err)
  }else{
    console.log(result.result)
  }
  libgenio.search(options, function(result){
    console.log(JSON.stringify(result.data, null, 2));
  })
});
*/
//libgenio.search(options, function(data){
//    console.log(data);
//});
libgen.utils.check.canDownload("83a766ef8183df3f2056654df6230291",function(err,url){
    if (err) {
        return console.error(err);
    }
    else{
        libgenio.getDownloadLink(url, function(result){
            console.log('DOWNLOAD LINK'+JSON.stringify(result));
              libgenio.saveFile("/home/ronniekinsley/Documents/abc.pdf", result.result, function(status){
                  console.log(status);
            });
        });
    }
});
