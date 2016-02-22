/**
 * Created by usman on 2/22/16.
 */

var libgen = require("./libgen");
var options = {
  mirror: '',
  query: 'cats',
  count: 5,
  sort_by: 'year',
  reverse: true
};
libgen.search( options, function(result){
  if(result.err){
    console.err(result.err)
  }else{
    console.log(result.result)
  }
  libgen.search(options, function(result){
    console.log(JSON.stringify(result));
  })

});
