var Map = (function(){
  var height = 25
  var width = 50
  var a = []

  var map = $("table")

  function init(mapData){
    a = mapData
    for(var i = 0; i < height; i++){
      var row = $("<tr></tr>")
      for(var j = 0; j < width; j++)
        row.append("<td id='a_" + i + "_" + j + "'>" + a[i][j] + "</td>")
      map.append(row)
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