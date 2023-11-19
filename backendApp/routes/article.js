var express = require('express');
var router = express.Router();
var db = require('../models/index.js');
const { Op } = require('sequelize')


/* 
      記事取得
*/
router.post('/', function(req, res, next) {
    // res.render('index', { title: 'Express' });
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );

    db.Article.findOne({
        where: { id: req.body.id },
        include: [
          {
            model: db.User,  // 子テーブルを示す
            required: false,
            as:"Users"     // false で OUTER JOIN になる (true で INNER JOIN)
          },
          { model: db.Tag, as: 'Tags' },
        ]
    })
    .then((record) => {
      console.log("記事取得完了")
      res.json(record)
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

//Top記事取得
router.post('/get', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  console.log(req.body.keyword);
  const PAGE_NUM = 6;
  const page = req.body.page;
  if(req.body.keyword == "latest"){
        db.Article.findAll({
          limit: PAGE_NUM,
          order:[
            ['createdAt','DESC']
          ],
          include: [
            {
              model: db.User,  // 子テーブルを示す
              required: false,   // false で OUTER JOIN になる (true で INNER JOIN)
              as:'Users',
            },
            { 
              model: db.Tag,
              as: 'Tags' 
            },
            {
               model: db.User, 
               required: false,
               as: 'favoriteArticle_article',
               where: { id: req.body.id } 
            },
          ]
        }).then((value) => {
          res.json(value)
        })
    }else if(req.body.keyword == "favorite"){
        db.Article.findAll({
          limit: PAGE_NUM,
          include: [
            {
              model: db.User,  // 子テーブルを示す
              required: false ,    // false で OUTER JOIN になる (true で INNER JOIN)
              as:'Users',
            },
            { model: db.Tag, as: 'Tags' },
            {
              model: db.User,
              required: false,
              as: 'favoriteArticle_article',
              where: {
                 id: req.body.id
             } 
           },
          ]
        })
        .then((value) => {
          res.json(value)
        }).catch((err) => {
          res.sendStatus(500);
        });
  }
});

/* 
      投稿記事取得
*/
router.post('/get/mypage', function(req, res, next) {
  console.log("-----マイページ記事取得-----");
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
  "Access-Control-Allow-Headers",
  "Origin, X-Requested-With, Content-Type, Accept"
   );
  const PAGE_NUM = 6;
  const page = req.body.page;
db.Article.count({
      where:{
          user_id: req.body.id,
          status: req.body.status,
      }, 
  }).then((data) => {
          db.Article.findAll({
          limit: PAGE_NUM,
          offset: PAGE_NUM * (page-1),
          where:{
              user_id: req.body.id,
              status: req.body.status
          },
          include: [
              {
              model: db.User,  // 子テーブルを示す
              required: false,     // false で OUTER JOIN になる (true で INNER JOIN)
              as:"Users"
              },
              { model: db.Tag, as: 'Tags' },
              {
                  model: db.User, 
                  required: false,
                  as: 'favoriteArticle_article',
                  where: {
                      id: req.body.id
                  } 
              },
          ]
      }).then((value) => {
          const result = []
          result.push({"value":value},{"num":Math.ceil(data/PAGE_NUM)})
          res.json(result)
      }).catch((err) => {
        res.sendStatus(500);
      });
})
});
 
/* 
  相手ユーザー記事取得
*/
router.post('/get/partner', function(req, res, next) {
  console.log("-----ユーザー記事取得-----");
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
  
  const PAGE_NUM = 6;
  const page = req.body.page;
  db.Article.count({
  where:{
      user_id: req.body.user_id,
      status: req.body.status,
  }, 
  })
  .then((data) => {
  db.Article.findAll({
      limit: PAGE_NUM,
      offset: PAGE_NUM * (page-1),
      where:{
      user_id: req.body.user_id,
      status: req.body.status
      },
      include: [
      {
          model: db.User,  // 子テーブルを示す
          required: false,     // false で OUTER JOIN になる (true で INNER JOIN)
          as:"Users"
      },
      { model: db.Tag, as: 'Tags' },
      {
          model: db.User, 
          required: false,
          as: 'favoriteArticle_article',
          where: {
              id: req.body.id
          } 
      },
      ]
  })
  .then((value) => {
      const result = []
      result.push({"value":value},{"num":Math.ceil(data/PAGE_NUM)})
      res.json(result)
  }).catch((err) => {
    res.sendStatus(500);
  });
  })
});


router.post('/get/tag', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  console.log(req.body.id)
  const PAGE_NUM = 6;
  console.log(req.body.keyword);
  const page = req.body.page;

  db.Article.count({
    where:{
      status:0
    },
    include:[
      { model: db.Tag, 
        as: 'Tags' ,
        where:{
          id: req.body.tag_id
        },
      },
    ]
  })

  .then((data) => {
    db.ArticleTag.findAll({
      limit: PAGE_NUM,
      offset: PAGE_NUM * (page-1),
      where:{
        tag_id: req.body.tag_id
      },
      include:[
        {
          model:db.Article,
          as:'Article_tag',
          where:{
             status:0
          },
          include:[
            {
              model: db.User,  // 子テーブルを示す
              required: false,     // false で OUTER JOIN になる (true で INNER JOIN)
              as:"Users"
              },
              { model: db.Tag, as: 'Tags' },
              {
                  model: db.User, 
                  required: false,
                  as: 'favoriteArticle_article',
                  where: {
                      id: req.body.id
                  } 
              },
          ]
        }
      ]
    })
    .then((value) => {
      console.log(value)
      const result = {"value":value,"num":Math.ceil(data/PAGE_NUM)}
      res.json(result)
      console.log(result)
    })
  })
});
/* 
  記事作成
*/
router.post('/regist', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  db.Article.create({
    title: req.body.name,
    user_id:req.body.id,
    tag: JSON.parse(req.body.tag)[0].name,
    body: req.body.body,
    status: req.body.status
  })
  .then((record) => {
    console.log("記事登録完了"+record.id)
    const taglist = []
    JSON.parse(req.body.tag).forEach(function(item, index) {
        taglist.push({tag_id:item.id,article_id:record.id}) ;
      })
      db.ArticleTag.bulkCreate(taglist)
        .then((record) => {
          res.sendStatus(200);
        })
        .catch((err) => {
          res.sendStatus(500);
        });
  }).catch((err) => {
    res.sendStatus(500);
  });
});

/* 
  記事削除
*/
router.post('/delete', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  db.FavoriteArticle.destroy({
    where:{
      article_id:req.body.id
    }
  })
  .then((record) => {
    console.log("お気に入り削除")
      db.ArticleTag.destroy({
        where:{
          article_id:req.body.id
        }
      })
      .then((record) => {
        console.log("タグ削除")
          db.Article.destroy({
            where:{
                  id:req.body.id
            }
          })
          .then((record) => {
            console.log("記事削除")
            res.json(record)
          })
          .catch((err) => {
            res.sendStatus(500);
          });
        })
      .catch((err) => {
        res.sendStatus(500);
      });
  })
});

/* POST home page. */
router.post('/update', function(req, res, next) {

  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  console.log(req.body)
  db.ArticleTag.destroy({
    where:{
      article_id:req.body.id
    }
  })
  .then((record) => {
    console.log("記事タグ削除")
    db.Article.update(
      {
        title: req.body.name,
        tag: JSON.parse(req.body.tag)[0]?.name,
        body: req.body.body,
        status: req.body.status
      },{
           where:{
            id:req.body.id
      } 
      }
    )
    .then((record) => {
      const taglist = []
      JSON.parse(req.body.tag).forEach(function(item, index) {
        taglist.push({tag_id:item.id,article_id:req.body.id}) ;
      })
        db.ArticleTag.bulkCreate(
        taglist)
        .then((record) => {
          res.sendStatus(200);
        })
        .catch((err) => {
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      res.sendStatus(500);
    });
  })
});
/* 
  お気に入り登録
*/
router.post('/favorite/regist', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  db.FavoriteArticle.create({
    user_id:req.body.user_id,
    article_id:req.body.article_id
  })
  .then((record) => {
    res.json(record)
  })
  .catch((err) => {
    res.sendStatus(500);
  });
});



/* 
 お気に入り解除
*/
router.post('/favorite/delete', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  db.FavoriteArticle.destroy({
    where:{
          user_id:req.body.user_id,
          article_id:req.body.article_id
    }
  })
  .then((record) => {
    res.json(record)
  })
  .catch((err) => {
    res.sendStatus(500);
  });
});


//Top記事検索
router.post('/get/search', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  console.log(req.body.keyword);
  const page = req.body.page;
  const PAGE_NUM = 6;
  db.Article.count({
    where: {
      status:0,
      title: {
        [Op.like]: '%'+req.body.keyword+'%'
      }
    },
  }).then((data) => {
      db.Article.findAll({
        limit: PAGE_NUM,
        offset: PAGE_NUM * (page-1),
        where: {
          status:0,
          title: {
            [Op.like]: '%'+req.body.keyword+'%'
          }
        },
        include: [
          {
            model: db.User,  // 子テーブルを示す
            required: false,   // false で OUTER JOIN になる (true で INNER JOIN)
            as:'Users',
          },
          { 
            model: db.Tag,
            as: 'Tags' 
          },
          {
              model: db.User, 
              required: false,
              as: 'favoriteArticle_article',
              where: { id: req.body.id } 
          },
        ]
      }).then((value) => {
        const result = []
        result.push({"value":value},{"num":Math.ceil(data/PAGE_NUM)})
        res.json(result)
      }).catch((err) => {
        res.sendStatus(500);
      });
  })

});



module.exports = router;

