
var express = require("express");
var app = express();

var server = require("http").Server(app);
var io = require("socket.io")(server);

app.set("view engine", "jade");

//static middleware
var oneDay = 86400000;
app.use(express.compress());
app.use(express.static(__dirname + '/public', { maxAge: oneDay }));

app.get("/", function(req, res){
  res.render("index");
});

server.listen(8080, function(){
  console.log("Listening on port %d", server.address().port);
});


var userCount = 0;

var users = []

io.on("connection", function(socket){
	userCount++;
	var posX = Math.floor(Math.random()*70)
  var posY = Math.floor(Math.random()*40)
  var newUser = {
	  id: userCount,
	  x: posX,
	  y: posY
  }
  socket.emit("init", users)
	users.push(newUser)

	io.emit("newUser", newUser);

	socket.on("disconnect", function(){
		userCount--;
		io.emit("updateUserCount", userCount);
	})
})