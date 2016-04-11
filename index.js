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
//libgen.utils.check.canDownload("02390179884E954F7307866EBF718A27",function(err,url){
//    if (err) {
//        return console.error(err);
//    }
//    else{
//    }
//});
libgenio.getDownloadLink("02390179884e954f7307866ebf718a27", function(result){
    console.log('DOWNLOAD LINK'+JSON.stringify(result));
    //  libgenio.saveFile("/home/ronniekinsley/Documents/abc.pdf", result.result, function(status){
    //      console.log(status);
    //});
});