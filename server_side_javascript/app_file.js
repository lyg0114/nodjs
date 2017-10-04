
var express = require('express'); //nod_modules 에 있는 express모듈을 불러옴!!
var bodyParser = require('body-parser'); //post로 받게해주는 모듈
var multer = require('multer');
//var upload = multer({ dest: 'uploads/' })

var _storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

var upload = multer({ storage : _storage })
var fs = require('fs'); //file처리를 위한 모듈 pug에서 지원해주는거!
var app = express(); //application객체를 return
app.listen(4000, function(){
  console.log('Connected, 4000 port!');
}); //특정 포트를 listening하게 함! 연결되면 콜벡함수 호출
app.set('views', './views_file');
app.set('view engine','pug'); //express랑 pug랑 합침

app.use(bodyParser.urlencoded({ extended: false })); //bodyParser미들웨어 사용
app.locals.pretty=true; //html코드 명확하게 보이게 해주는거!


app.use('/user', express.static('uploads')); //user가 파일에 접근
app.get('/upload',function(req, res){

  res.render('upload');

});
                      //먼저 실행되는 미들웨어     //미들웨어후에 실행되는 콜백함수
app.post('/upload', upload.single('userfile') ,function(req, res){ //post방식!
  console.log(req.file);
res.send('Uploaded : '+req.file.filename);
});


app.get('/topic/new', function(req,res){ //라우팅

  fs.readdir('data',function(err,files){ //폴더안에 데이터를 읽어옴
    if(err)
    { console.log(err);
      res.status(500).send('Interneal Server Error');
    }
        res.render('new',{topics:files}); //template사용
      });
    });


app.get(['/topic','/topic/:id'], function(req,res){ //라우팅 //쓰기!!

  fs.readdir('data',function(err,files){

    if(err)
    { console.log(err);
      res.status(500).send('Interneal Server Error');
    }
    var id = req.params.id;

    if(id){// id값이 있을때
      fs.readFile('data/'+id,'utf8',function(err,data){
        if(err)
        {
          console.log(err);
          res.status(500).send('Interneal Server Error');
        }
        res.render('view',{topics:files, title:id, description:data});
        });
    }
    else{
      //id값 없을때
    res.render('view',{topics:files, title:'Welecome', description:'Hello, JavaScript for Server'}); //template사용
    }
});

});

app.post('/topic',function(req,res){ //post로 정보를 받아옴!! //읽기
  var title = req.body.title;
  var description = req.body.description;

  fs.writeFile('data/'+ title, description, function(err){
    if(err){ //에러처리
        res.status(500).send('Interneal Server Error');
    }
    res.redirect('/topic/'+ title);

  });

})
