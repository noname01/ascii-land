var me = {}
var usersData = {}
var userCount = 0
var allowMove = false
var allowMoveInterval = 500

// socket.io stuff
var socket = io()

socket.on("init new user", function(data){
  Map.init(data.map)
  usersData = data.users
  for(id in usersData)
    if(usersData.hasOwnProperty(id)){
      Map.setXY(usersData[id].x, usersData[id].y, usersData[id].letter)
      userCount++
    }
  Map.updateUserCount(userCount)

})

socket.on("new user", function(user){
  var ch = user.letter
  usersData[user.id] = user
  //console.log("userData", usersData)
  if(user.id == socket.io.engine.id){
    me = jQuery.extend({}, user)
    me.letter = "@"
    ch = "@"
  }
  Map.setXY(user.x, user.y, ch)
  userCount++
  Map.updateUserCount(userCount)
})

socket.on("disconnect user", function(user){
  Map.setXY(user.x, user.y, '.')
  delete usersData[user.id]
  userCount--
  Map.updateUserCount(userCount)
})

socket.on("user move", function(user){
  //console.log("user move", user)
  Map.setXY(usersData[user.id].x, usersData[user.id].y, '.')
  usersData[user.id].x = user.x
  usersData[user.id].y = user.y
  Map.setXY(user.x, user.y, user.letter)
})

window.setInterval(function(){
  allowMove = true
}, allowMoveInterval)

$(window).bind('keydown', function(e){
  if(!allowMove) return
  allowMove = false
  var code = e.KeyCode || e.which
  if(code == 37){
    //console.log("left")
    moveTo(me.x, me.y - 1)
  }
  else if(code == 38){
    //console.log("up")
    moveTo(me.x - 1, me.y)
  }
  else if(code == 39){
    //console.log("right")
    moveTo(me.x, me.y + 1)
  }
  else if(code == 40){
    //console.log("down")
    moveTo(me.x + 1, me.y)
  }
})

function moveTo(x1, y1){
  if(x1 >= 0 && y1 >= 0 && x1 < Map.height && y1 < Map.width && Map.getXY(x1, y1) == "."){
    Map.setXY(me.x, me.y, ".")
    me.x = x1
    me.y = y1
    Map.setXY(x1, y1, me.letter)
    usersData[me.id].x = x1
    usersData[me.id].y = y1
    socket.emit("user move", usersData[me.id])
  }
}