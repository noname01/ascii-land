
Map.init()

// socket.io stuff
var socket = io();

socket.on("init new user", function(users){
  for(id in users)
    if(users.hasOwnProperty(id)){
      Map.setXY(users[id].x, users[id].y, 'P')
    }
})

socket.on("update user count", function(count){
  console.log(count)
  $("#userCount").text(count)
})

socket.on("new user", function(user){
  Map.setXY(user.x, user.y, 'P')
})

socket.on("disconnect user", function(user){
  Map.setXY(user.x, user.y, '.')
})