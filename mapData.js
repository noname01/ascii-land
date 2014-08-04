// base map with no users
var height = 25
var width = 50

var a = []

function init(){
 for(var i = 0; i < height; i++){
   var a1 = []
   for(var j = 0; j < width; j++){
     a1.push(".")
   }
   a.push(a1)
 }
}

function getMap(){
  return a
}

module.exports = {
  width: width,
  height: height,
  init: init,
  getMap: getMap
}