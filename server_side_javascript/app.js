
//Main Page//

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.locals.pretty=true;

app.set('view engine','pug');
app.set('views','./views');

app.use(express.static('public')); //정적인 파일 만들기
// 이코드를 추가하면됨, public라는 디 렉토리에 정적인 파일을 두면 사용자들에게 서비스할 수 있다.

app.use(bodyParser.urlencoded({ extended: false })); //미들웨어

app.get('/topic',function(req, res){

   res.send(req.query.id+','+req.query.name);

});


app.get('/template',function(req, res){
  res.render('temp',{time:Date(), _title:'Pug'
  });
});


//중요한 코드!!!!!!!!!!!!!!!!!!
app.get('/',function(req, res){
  res.send('Hello home page');
});

app.get('/1', function(req,res){
  res.send('Hello Router, <img src="/1.jpg">');
});

app.get('/dynamic', function(req,res){
  var lis='';
  for(var i=0 ;i<10 ;i++ )
  {
    lis += '<li>coding</li>';
  }
  var time = Date();
  var output = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title></title>
    </head>
    <body>
      Hello, Dynamic!
      <ul>
        ${lis}
      </ul>
      ${time}
    </body>
  </html>
`
  res.send(output);
});


//중요한 코드!!!!!!!!!!!!!!!!!!
app.get('/login',function(req, res){ //라우팅
  res.send('Login please');
});
//중요한 코드!!!!!!!!!!!!!!!!!!
app.listen(3000, function(){
  console.log('Connected 3000 port!!');
});
