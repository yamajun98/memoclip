var express = require('express');

const db = require('../models');
var router = express.Router();


// 追加 1
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




router.post('/create', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
console.log(req.body)
  db.User.create({
    userId: req.body.userId,
    name:req.body.name,
    password:req.body.password,
  })
  .then((value) => {
    if(value == null){
      const result = {"saccessToken":false}
        res.send('Not Create!');
    }else{
      const result = {"user":value,"saccessToken":true}
      res.json(result)
    }
  }).catch((err) => {
    console.log(err)
    // res.sendStatus(500);
    res.send(err)
  });
});

/*
  ユーザー情報の取得
   pram :id
   フォロー、フォロワー情報の取得
*/
router.post('/get', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  
  db.User.findOne({
    where:{
         id: req.body.id
    },
    include:[
      {
        model: db.UserFollow,  // 子テーブルを示す
        required: false,     // false で OUTER JOIN になる (true で INNER JOIN)
        as:"User_Follow"
      },
      {
        model: db.UserFollow,  // 子テーブルを示す
        required: false,     // false で OUTER JOIN になる (true で INNER JOIN)
        as:"User_Follower"
      },
      {
        model: db.Article,  // 子テーブルを示す
        required: false,     // false で OUTER JOIN になる (true で INNER JOIN)
        as:"User_FavoriteArticle"
      },
      {
        model: db.Article,  // 子テーブルを示す
        required: false,     // false で OUTER JOIN になる (true で INNER JOIN)
        as:"Articles",
        where:{
          status: 0
        },
      },
      {
        model: db.Tag,  // 子テーブルを示す
        required: false,     // false で OUTER JOIN になる (true で INNER JOIN)
        as:"UserTags",
      },

    ]
  }).then((result) => {
    res.send(result)
  }).catch((err) => {
    res.sendStatus(500);
  });

});

/*
   相手ユーザー情報の取得
   pram :id
   フォロー、フォロワー情報の取得
*/
router.post('/get/partner', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  db.User.findOne({
    where:{
         id: req.body.id
    },
    include:[
      {
        model: db.UserFollow,  // 子テーブルを示す
        required: false,     // false で OUTER JOIN になる (true で INNER JOIN)
        as:"Follow"
      },
      {
        model: db.UserFollow,  // 子テーブルを示す
        required: false,     // false で OUTER JOIN になる (true で INNER JOIN)
        as:"Follower",
        where:{
          follower_id:req.body.follower_id
        }
      },
      {
        model: db.Article,  // 子テーブルを示す
        required: false,     // false で OUTER JOIN になる (true で INNER JOIN)
        as:"FavoriteArticle"
      },
      {
        model: db.Article,  // 子テーブルを示す
        required: false,     // false で OUTER JOIN になる (true で INNER JOIN)
        as:"Articles",
        where:{
          status: 0
        },
      },
    ]
  })
  .then((result) => {
    res.send(result)
  }).catch((err) => {
    res.sendStatus(500);
  });

});

router.post('/edit', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  db.User.findOne({
    where:{
         id: req.body.id
    },
    include:[
      {
        model: db.UserFollow,  // 子テーブルを示す
        required: false,     // false で OUTER JOIN になる (true で INNER JOIN)
        as:"Follow"
      },
      {
        model: db.UserFollow,  // 子テーブルを示す
        required: false,     // false で OUTER JOIN になる (true で INNER JOIN)
        as:"Follower"
      },
    ]
  })
  .then((result) => {
    console.log(result)
    res.send(result)
  }).catch((err) => {
    res.sendStatus(500);
  });
});



/*
   ユーザー情報の編集
   pram :id
   フォロー、フォロワー情報の取得
*/
router.post('/edit/update', upload.single('file'), function(req, res, next) {

  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );


const body = JSON.parse(req.body.data)
 if(req.file == undefined){
      db.User.update({
        name: body.name,
        introduction:body.introduction
      },{
          where:{id:body.id}
        })
      .then((result) => {
        db.UserTag.destroy({
          where:{
            user_id:body.id
          }
        })
        .then((record) => {
          const taglist = []
          body.Tag.forEach(function(item, index) {
            taglist.push({
                user_id:body.id,
                tag_id:item.id
              })
          })
          console.log(taglist)
            db.UserTag.bulkCreate(
            taglist)
            .then((record) => {
              res.sendStatus(200);
            }).catch((err) => {
              res.sendStatus(500);
            });
        })
      }).catch((err) => {
        res.sendStatus(500);
      });
  }else{
    db.User.update({
      name: body.name,
      userId:body.username,
      image:decodeURIComponent(req.file?.originalname),
      introduction:body.introduction
    },{
        where:{id:req.body.id}
    })
    .then((result) => {
      db.UserTag.destroy({
        where:{
          user_id:body.id
        }
      })
      .then((record) => {
        const taglist = []
        JSON.parse(body.tag).forEach(function(item, index) {
          taglist.push({
              user_id:body.id,
              tag_id:item.id
            }) ;
        })
          db.UserTag.bulkCreate(
          taglist)
          .then((record) => {
            res.sendStatus(200);
          }).catch((err) => {
            res.sendStatus(500);
          });
      }).catch((err) => {
        res.sendStatus(500);
      });
    }).catch((err) => {
      res.sendStatus(500);
    });
  }
});



/* 
 ユーザーフォロー
*/ 
router.post('/follow', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  db.UserFollow.create({
    user_id:req.body.user_id,
    follower_id:req.body.follower_id
  })
  .then((record) => {
    console.log("フォロー登録")
    res.json(record)
  })
  .catch((err) => {
    res.sendStatus(500);
  });
});

/* 
 ユーザーフォロー解除
*/
router.post('/unfollow', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  db.UserFollow.destroy({
    where:{
          user_id:req.body.user_id,
          follower_id:req.body.follower_id
    }
  })
  .then((record) => {
    console.log("フォロー削除")
    res.json(record)
  })
  .catch((err) => {
    res.sendStatus(500);
  });
});

/* POST home page. */
router.get('/get/ranking', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  db.UserFollow.findAll({
    include:[
      {
        model:db.User,
        required: false,
        as:"Follower"
      }
    ],
    attributes: [
      'user_id',
      [db.sequelize.fn('count', db.sequelize.col('follower_id')), 'totalAmount']
    ],
    group: 'user_id',
    order: [[db.sequelize.col("totalAmount"), "DESC"]],
    limit:5
  })
  .then((record) => {
    res.json(record)
  })
  .catch((err) => {
    res.sendStatus(500);
  });
});


module.exports = router;
