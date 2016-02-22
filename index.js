/**
 * Created by usman on 2/22/16.
 */

var libgenio = require("./libgenio");
var options = {
  mirror: '',
  query: 'The Alchemist Paulo',
  count: 5,
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
libgenio.search(options, function(){});

libgenio.getDownloadLink("83a766ef8183df3f2056654df6230291", function(result){
  saveFile("/home/usman/Documents/Books/test.jpg", result, function(status){

  });
});
