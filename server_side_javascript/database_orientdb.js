var OrientDB = require('orientjs'); //

  var server = OrientDB({ //Connection String
   host: 'localhost',
   port: 2424,
  username: 'root',
   password: '111111'
 });

var db = server.use('o2');
/*

db.record.get('#19:0').then(function (record) {
   console.log('Loaded record:', record.title);
 });
*/


//read
/*var sql = 'select from topic';
db.query(sql).then(function(results){

    console.log(results);
})
*/

var sql = 'select from topic where @rid=:rid';

var param = {
  params:{
      rid:'#19:0'
    }
};

db.query(sql, param).then(function(results){
    console.log(results);
})



/* //insert
var sql = 'insert into topic(title, description) values(:title,:desc)';
var param = {
  params:{
    title:'Express',
    desc:'Express is framwork for web'
  }
}

db.query(sql, param).then(function(results){
  console.log(results);
});
*/

/*  //update
var sql = 'update topic set title=:title where @rid=:rid';
db.query(sql, {
    params:{
      title:'Expressjs',
      rid:'#19:0'
    }
}).then(function(results){

    console.log(results);

})
*/


/*
 //delete

var sql = 'delete vertex from topic where @rid=:rid';
db.query(sql,{params:{rid:'#19:1'}}).then(function(results){
  console.log(results);
})
*/
