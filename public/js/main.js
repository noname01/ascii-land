
var height = 40
var width = 70
var map = []

for(var i = 0; i < height; i++){
  map.push("......................................................................")
}


$("#map").text(map.join("\n"))

function replaceAt(str, index, char){
  return str.substr(0, index) + char + str.substr(index+char.length);
}

var socket = io();

socket.on("updateUserCount", function(obj){
  console.log(obj)
  var count = obj.userCount
  map[obj.y] = replaceAt(map[obj.y], obj.x, 'P')
  console.log("changed to " + count)
  $("#userCount").text(count)
  $("#map").text(map.join("\n"))
})
