
var express = require('express'); //nod_modules 에 있는 express모듈을 불러옴!!
var bodyParser = require('body-parser'); //post로 받게해주는 모듈
var fs = require('fs'); //file처리를 위한 모듈
var app = express(); //application객체를 return
app.listen(4000, function(){
  console.log('Connected, 4000 port!');
}); //특정 포트를 listening하게 함! 연결되면 콜벡함수 호출

app.use(bodyParser.urlencoded({ extended: false })); //bodyParser미들웨어 사용
app.locals.pretty=true; //html코드 명확하게 보이게 해주는거!
app.set('views', './views_file');
app.set('view engine','pug');

app.get('/topic/new', function(req,res){
  res.render('new');
});


app.post('/topic',function(req,res){ //post로 정보를 받아옴!!
  var title = req.body.title;
  var description = req.body.description;
  fs.writeFile('data/'+ title, description, function(err){
    if(err){ //에러처리
        res.status(500).send('Interneal Server Error');
    }
    res.send('Success!');

  });

})
