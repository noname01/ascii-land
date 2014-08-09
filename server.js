var express = require("express")
var map = require("./mapData.js")
var players = require("./players.js")
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

map.init()

io.on("connection", function(socket){
  var newId = socket.id
  socket.emit("init new user", {users: players.getAll(), map: map.getMap()})

  var newUser = players.pushNew(newId)

  io.emit("new user", newUser)

	socket.on("user move", function(user){
	  //console.log(user)
	  //todo: check position
	  players.move(user.id, user.direction)
	  socket.broadcast.emit("user move", user)
	})

	socket.on("user skill", function(data){
	  var skillUser = players.getById(data.userId)
	  skillUser.careerTraits.actions.skills[data.skillId]()
	})

	socket.on("disconnect", function(){
	  var oldId = socket.id
		socket.broadcast.emit("disconnect user", players.getById(oldId))
		players.deleteById(oldId)
	})
})