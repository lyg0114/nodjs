
var express = require('express'); //nod_modules 에 있는 express모듈을 불러옴!!
var bodyParser = require('body-parser'); //post로 받게해주는 모듈
var fs = require('fs'); //file처리를 위한 모듈 pug에서 지원해주는거!
var app = express(); //application객체를 return
app.listen(4000, function(){
  console.log('Connected, 4000 port!');
}); //특정 포트를 listening하게 함! 연결되면 콜벡함수 호출

app.use(bodyParser.urlencoded({ extended: false })); //bodyParser미들웨어 사용
app.locals.pretty=true; //html코드 명확하게 보이게 해주는거!
app.set('views', './views_file');
app.set('view engine','pug');


app.get('/topic', function(req,res){

  fs.readdir('data',function(err,files){
    if(err)
    { console.log(err);
      res.status(500).send('Interneal Server Error');
    }
    res.render('view',{topics:files}); //template사용
  });

});
app.get('/topic/new', function(req,res){
  res.render('new'); //template사용
});

app.get('/topic/:id',function(req,res){ //데이터 출력
  var id = req.params.id;
  fs.readdir('data',function(err,files){
    if(err){
       console.log(err);
       res.status(500).send('Interneal Server Error');
    }
    fs.readFile('data/'+id,'utf8',function(err,data){
      if(err)
      { console.log(err);
        res.status(500).send('Interneal Server Error');
      }
      res.render('view',{topics:files, title:id, description:data});
      });
    });
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
