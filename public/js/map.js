var Map = (function(){
  var height = 40
  var width = 70
  var a = []

  function init(){
    var row = ""
    for(var i = 0; i < width; i++)
      row += "."
    for(var i = 0; i < height; i++)
      a.push(row)
    rerender()
  }

  function rerender(){
    $("#map").text(a.join("\n"))
  }

  function setXY(x, y, ch){
    a[y] = replaceAt(a[y], x, ch)
  }

  // helpers
  function replaceAt(str, index, char){
    return str.substr(0, index) + char + str.substr(index+char.length);
  }

  // public api
  return {
    init: init,
    rerender: rerender,
    setXY: setXY
  }
})();