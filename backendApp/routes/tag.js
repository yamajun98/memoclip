var express = require('express');
var router = express.Router();
var db = require('../models/index.js');

/* 
    タグ取得
*/
router.get('/get', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  db.Tag.findAll({
  })
  .then((result) => {
    res.json(result)
  }).catch((err) => {
    res.sendStatus(500);
  });
});

/* 
    タグランキング取得
*/
router.get('/get/ranking', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  db.Tag.findAll({
      limit: 6,
      include: [
       { model: db.Article, as: 'Tag_Article' }
      ]
  }).then((result) => {
      res.json(result)
  }).catch((err) => {
      res.sendStatus(500);
  });
});


module.exports = router;
