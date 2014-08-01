var Map = (function(){
  var height = 35
  var width = 60
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

  function mapXY(x, y){
    return $("#a_" + x + "_" + y)
  }

  // public api
  return {
    init: init,
    setXY: setXY
  }
})();