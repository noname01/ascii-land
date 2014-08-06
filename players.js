var map = require("./mapData.js")

var players = {}

var careers = {
  assassin: {
    display: "A",
    hp: 50,
    moveDelay: 100,
    actions: {
      collision: function(other){
        other.hurtby(200)
      }
    }
  }
}

function pushNew(newId){
  players[newId] = {
    id: newId,
    x: Math.floor(Math.random() * map.height),
    y: Math.floor(Math.random() * map.width),
    letter: 'P',
    career: "assassin"
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

function setPos(id, x, y){
  players[id].x = x
  players[id].y = y
}

module.exports = {
  pushNew: pushNew,
  getAll: getAll,
  getById: getById,
  deleteById: deleteById,
  setPos: setPos
}
