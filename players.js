var map = require("./mapData.js")

var players = {}

var careers = {
  assassin: {
    display: "A",
    hp: 50,
    moveDelay: 100,
    actions: {
      skills: [function(){
        console.log("using skill")
      }],
      collision: function(other){
        console.log("crash!")
      }
    }
  }
}

function pushNew(newId){
  players[newId] = {
    id: newId,
    x: Math.floor(Math.random() * map.height),
    y: Math.floor(Math.random() * map.width),
    direction: {
      x: -1,
      y: 0
    },
    letter: 'P',
    careerTraits: careers.assassin
  }
  return players[newId]
}

function getAll(){
  return players
}

function getById(id){
  return players[id]
}

function deleteById(id){
  delete players[id]
}

function move(id, direction){
  players[id].direction = direction
  players[id].x += direction.x
  players[id].y += direction.y
}

module.exports = {
  pushNew: pushNew,
  getAll: getAll,
  getById: getById,
  deleteById: deleteById,
  move: move
}
