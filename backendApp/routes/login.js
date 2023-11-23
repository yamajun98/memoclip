var express = require('express');
var router = express.Router();
var db = require('../models/index.js');

/*
ログイン機能
*/
router.post('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  
  db.User.findOne({
    where: {
         userId: req.body.userId,
         password: req.body.password
     },
  })
  .then((value) => {
    console.log(value)
    if(value == null){
      const result = {"accessToken":false}
      res.json(result)
    }else{
      const result = {"user":value,"accessToken":true}
      res.json(result)
    }
  }).catch((err) => {
    res.sendStatus(500);
  });

});

module.exports = router;