var me = {}

Map.init()

// socket.io stuff
var socket = io()

socket.on("init new user", function(users){
  for(id in users)
    if(users.hasOwnProperty(id)){
      Map.setXY(users[id].x, users[id].y, users[id].letter)
    }
})

socket.on("update user count", function(count){
  $("#userCount").text(count)
})

socket.on("new user", function(user){
  if(user.id == socket.io.engine.id){
    console.log("matched")
    user.letter = "@"
    me = user
  }
  Map.setXY(user.x, user.y, user.letter)
})

socket.on("disconnect user", function(user){
  Map.setXY(user.x, user.y, '.')
})

