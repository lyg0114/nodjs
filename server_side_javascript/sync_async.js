
var fs = require('fs');

//sync
console.log(1);
var data = fs.readFileSync('text.txt',{encoding:'utf8'});
console.log(data);

//Async
console.log(2);
var data = fs.readFile('text.txt',{encoding:'utf8'},function(err, data){ //백그라운드에서 실행!!
    console.log(3);
    console.log(data);
  });
  console.log(4);
