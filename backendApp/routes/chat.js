var express = require('express');
const { Model } = require('sequelize');
var router = express.Router();
var db = require('../models/index.js');
const { Op } = require('sequelize')

router.post('/create', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
console.log(req.body)
  db.ChatMain.findOne({
    where: { 
                user_id: [req.body.user_id, req.body.my_id],
                user_id2:[req.body.user_id, req.body.my_id]
    }
  })
  .then((result) => {
    console.log(result)
    if(result==null){
        db.ChatMain.create({
            user_id: req.body.user_id,
            user_id2: req.body.my_id,
            roomName: req.body.name
        }).then((result) => {
            console.log(result)
            res.json(result)
        })
    }else{
        res.send(result)
    }
  }).catch((err) => {
    res.sendStatus(500);
  });
});

router.post('/get', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );  
    db.ChatText.findAll({
      where: { 
        chat_id: req.body.chat_id
      },
      include:[
        {
            model:db.User,
            required: false,
            as:"User"  
        }
      ]
  })
    .then((result) => {
      console.log(result)
        res.send(result)
    }).catch((err) => {
      res.sendStatus(500);
    });
  });


router.post('/get/userlist', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
  console.log(req.body)
  
    db.ChatMain.findAll({
                where: { 
                    [Op.or]: [
                    {
                        user_id: req.body.id, 
                    },  
                    {
                        user_id2: req.body.id, 
                    },  
                    ]
                       
                },
              include:[
                {
                    model:db.User,
                    required: false,
                    as:"Users"  
                },
                {
                    model:db.User,
                    required: false,
                    as:"User2"  
                },
                {
                    model:db.ChatText,
                    required: false,
                    as:"ChatText",
                    order: [
                        ['createdAt', 'DESC']
                    ],
                    limit: 1,
                }
              ]
  })
    .then((result) => {
      console.log(result)
        res.send(result)
    }).catch((err) => {
      res.sendStatus(500);
    });
  });


module.exports = router;