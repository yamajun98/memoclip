var express = require('express');
var router = express.Router();
var db = require('../models/index.js');

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
  }).catch((err) => {
    res.sendStatus(500);
  });
});


/* 
    フォロー一覧取得
*/
router.post('/follow', function(req, res, next) {
    console.log("-----マイページフォロー取得-----");
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );

    db.UserFollow.findAll({
        where:{
            follower_id: req.body.id,
        }, 
        include:[
        {
            model:db.User,
            as:'Follower',
            include:[
            {
            model: db.UserFollow,
            required: false,
            as: 'Follower',
            where:{
                follower_id: req.body.id,
            }
            },
            ]
        }
        ]
    })  
    .then((data) => {
        res.json(data)
    }).catch((err) => {
        res.sendStatus(500);
    }); 
});

/* 
    フォロワー一覧取得
*/
router.post('/follower', function(req, res, next) {
    console.log("-----マイページフォロワー取得-----");
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    db.UserFollow.findAll({
        where:{
            user_id: req.body.id,
        }, 
        include:[
        {
            model:db.User,
            as:'Follow',
            include:[
            {
            model: db.UserFollow,
            required: false,
            as: 'Follower',
            where:{
                follower_id: req.body.id,
            }
            },
            ]
        }
        
        ]
    })
    .then((data) => {
        res.json(data)
    }).catch((err) => {
        res.sendStatus(500);
    });
}); 

/* 
    お気に入り記事一覧取得
*/
router.post('/favorite', function(req, res, next) {
  console.log("-----マイページお気に入り記事取得-----");
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  db.FavoriteArticle.findAll({
      where:{
          user_id: req.body.id,
      }, 
      include:[
        {
          model: db.Article,  // 子テーブルを示す
          required: false,     // false で OUTER JOIN になる (true で INNER JOIN)
          as:"FavoriteArticle",
          where: {
            status: 0
          },
          include:[
            {
            model: db.User,
            required: false,
            as: 'Users',
            },
          ]
        },
      ]
    })
    .then((data) => {
      res.json(data);
    }).catch((err) => {
        res.sendStatus(500);
    });  
});

module.exports = router;