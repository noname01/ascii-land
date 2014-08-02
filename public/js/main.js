var me = {}
var usersData = {}

Map.init()

// socket.io stuff
var socket = io()

socket.on("init new user", function(users){
  usersData = users
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
    user.letter = "@"
    me = user
  }
  Map.setXY(user.x, user.y, user.letter)
})

socket.on("disconnect user", function(user){
  Map.setXY(user.x, user.y, '.')
})

socket.on("user move", function(user){
  Map.setXY(usersData[user.id].x, usersData[user.id].y, '.')
  usersData[user.id].x = user.x
  usersData[user.id].y = user.y
  Map.setXY(user.x, user.y, user.letter)
})

$(window).bind('keyup', function(e){
  var code = e.KeyCode || e.which
  if(code == 37){
    console.log("left")
    move(me.x, me.y - 1)
  }
  else if(code == 38){
    console.log("up")
    move(me.x - 1, me.y)
  }
  else if(code == 39){
    console.log("right")
    move(me.x, me.y + 1)
  }
  else if(code == 40){
    console.log("down")
    move(me.x + 1, me.y)
  }
})

function move(x1, y1){
  if(x1 >= 0 && y1 >= 0 && x1 < Map.height && y1 < Map.width){
    Map.setXY(me.x, me.y, ".")
    me.x = x1
    me.y = y1
    Map.setXY(x1, y1, me.letter)
    socket.emit("user move", me)
  }
}