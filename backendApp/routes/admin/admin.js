var express = require('express');
var router = express.Router();
var db = require('../../models/index.js');
var multer = require('multer');

var storage = multer.diskStorage({
  // ファイルの保存先を指定
  destination: function (req, file, cb) {
    cb(null, './public/image/')
  },
  // ファイル名を指定(オリジナルのファイル名を指定)
  filename: function (req, file, cb) {
    cb(null, decodeURIComponent(file.originalname))
  }
})

var upload = multer({ storage: storage })


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  db.Tag.findAll()
  .then((result) => {
    console.log(result)
    res.json(result)
  })

  console.log("server started on port 3002");
});


/* 
    ユーザー取得
*/
router.post('/get/user', function(req, res, next) {
    console.log("-----マイページフォロー取得-----");
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    const PAGE_NUM = 50;
    const page = req.body.page;
    db.User.findAll({
        limit: PAGE_NUM,
        offset: PAGE_NUM * (page-1)
    })  
    .then((data) => {
        res.json(data)
    })  
});


/* 
 ユーザー削除
*/
router.post('/delete/user', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );

        db.User.destroy({
        where:{
                id:JSON.parse(req.body.id),
        }
        })
        .then((record) => {
            res.sendStatus(200);
        })
        .catch((err) => {
        res.sendStatus(500);
        console.log(err);
        });

  });

  /* 
 ユーザー削除
*/
router.post('/delete/users', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
        db.User.destroy({
        where:{
                id:JSON.parse(req.body.id),
        }
        })
        .then((record) => {
            res.sendStatus(200);
        })
        .catch((err) => {
        res.sendStatus(500);
        console.log(err);
        });

  });


/* 
    タグ取得
*/
router.post('/get/tag', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    const PAGE_NUM = 15;
    const page = req.body.page;
    db.Tag.findAll({
        limit: PAGE_NUM,
        offset: PAGE_NUM * (page-1),
        include:[
            {
            model:db.Article,
            required: false,
            as:'Tag_Article',
            }
        ]
    })
    .then((result) => {
      res.json(result)
    }).catch((err) => {
      res.sendStatus(500);
    });
  });

  /* 
    タグ作成
*/
router.post('/create/tag', upload.single('file'),function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    console.log(req.body)
    db.Tag.create({
        name:req.body.name,
        image:req.body.image,
    })
    .then((result) => {
      res.json(result)
    }).catch((err) => {
      res.sendStatus(500);
    });
  });

/* 
 タグ削除
*/
router.post('/delete/tag', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );

        db.Tag.destroy({
        where:{
                id:req.body.id,
        }
        })
        .then((record) => {
            res.sendStatus(200);
        })
        .catch((err) => {
        res.sendStatus(500);
        });

  });

/* 
    記事取得
*/
router.post('/get/article', function(req, res, next) {
    console.log("-----マイページフォロー取得-----");
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    const PAGE_NUM = 50;
    const page = req.body.page;
    db.Article.findAll({
        limit: PAGE_NUM,
        offset: PAGE_NUM * (page-1),
        include:[
            {
                model:db.User,
                required: false,
                as:'Users'
            },
            {
                model:db.Tag,
                required: false,
                as:'Tags'
            }
        ]
    })  
    .then((data) => {
        res.json(data)
    })  
});

/* 
 記事削除
*/
router.post('/delete/tag', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );

        db.Article.destroy({
        where:{
                id:req.body.id,
        }
        })
        .then((record) => {
            res.sendStatus(200);
        })
        .catch((err) => {
        res.sendStatus(500);
        });

  });
module.exports = router;