
var express = require("express")
var app = express()

var server = require("http").Server(app)
var io = require("socket.io")(server)

app.set("view engine", "jade")

//static middleware
var oneDay = 86400000
app.use(express.compress())
app.use(express.static(__dirname + '/public', { maxAge: oneDay }))

app.get("/", function(req, res){
  res.render("index")
})

server.listen(8080, function(){
  console.log("Listening on port %d", server.address().port)
})


var height = 30
var width = 50

var users = {}
var userCount = 0
io.on("connection", function(socket){
  var newId = socket.id
  socket.emit("init new user", users)

  users[newId] = {
    id: newId,
    x: Math.floor(Math.random() * height),
    y: Math.floor(Math.random() * width),
    letter: 'P'
  }
  userCount++
  io.emit("update user count", userCount)
  io.emit("new user", users[newId])

	socket.on("disconnect", function(){
	  var oldId = socket.id
	  socket.on("user move", function(user){
	    socket.broadcast.emit("user move", user)
	  })
		io.emit("disconnect user", users[oldId])
		delete users[oldId]
		userCount--
		io.emit("update user count", userCount)
	})
})