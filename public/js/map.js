var Map = (function(){
  var height = 25
  var width = 50
  var a = []

  var map = $("table")

  function init(){
    for(var i = 0; i < height; i++){
      var row = $("<tr></tr>")
      var a1 = []
      for(var j = 0; j < width; j++){
        a1.push(".")
        row.append("<td id='a_" + i + "_" + j + "'>.</td>")
      }
      map.append(row)
      a.push(a1)
    }
  }

  function setXY(x, y, ch){
    a[x][y] = ch;
    mapXY(x, y).text(ch)
  }

  function getXY(x, y){
    return a[x][y]
  }

  function mapXY(x, y){
    return $("#a_" + x + "_" + y)
  }

  function updateUserCount(count){
    $("#userCount").text(count)
  }


  // public api
  return {
    height: height,
    width: width,
    init: init,
    updateUserCount: updateUserCount,
    setXY: setXY,
    getXY: getXY
  }
})();