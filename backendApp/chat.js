var db = require('./models/index.js');

exports.func = function(server){

    var io = require("socket.io")(server, {
        cors: {
          origin: "http://localhost:3001",
          methods: ["GET", "POST"]
        }
      });
      

    io.on('connection',function(socket){
        console.log('connected');
        
        socket.on('room',function(msg){
            socket.join(msg.roomName);//ルーム作成
        });
        socket.on('message',function(msg){
            console.log('message: ' + msg.comment);
            // DBに追加
            db.ChatText.create({
                chat_id: msg.roomId,
                text: msg.comment,
                send_id: msg.userId
            }).then((result) => {

            console.log("id:"+result.id)
                db.ChatText.findOne({
                    where:{
                        id: result.id 
                    },
                    include:[
                        {
                            model:db.User,
                            required: false,
                            as:"User"  
                        }
                      ]
                }).then((result) => {
                    io.to(msg.roomName).emit('message', result);
                })
            })

        });
        
      });


}


