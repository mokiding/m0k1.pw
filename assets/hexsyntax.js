document.addEventListener('DOMContentLoaded', function() {
  var charcolors = {'a':"red", 'b':"orange", 'c':"cyan", 'd':"yellow", 'e':"blue", 'f':"purple", 'g':"red", 'h':"orange", 'i':"yellow", 'j':"green", 'k':"blue", 'l':"blue", 'm':"red", 'n':"orange", 'o':"yellow", 'p':"green", 'q':"blue", 'r':"purple", 's':"green", 't':"orange", 'u':"yellow", 'v':"green", 'w':"blue", 'x':"purple", 'y':"red", 'z':"orange", '1':"red", '2':"green", '3':"red", '4':"purple", '5':"orange", '6':"blue", '7':"red", '8':"orange", '9':"orange", '0':"yellow", '!':"red", '@':"red", '#':"blue", '$':"green", '%':"yellow", '^':"green", '&':"red", '*':"yellow", '+':"orange", '-':"orange", '_':"yellow", '.':"blue", '|':"green", '?':"green", '{':"orange", '}':"orange", '=':"green", '~':"yellow", "'":"purple", '"':"purple", "(":"yellow", ")":"yellow", "/":"green", "<":"green", ">":"green", ";":"purple", "[":"red", "]":"red", ":":"cyan"};
  var colorhexes = {
    "red":    "#ff6666",
    "orange": "#ff9933",
    "yellow": "#ffff66",
    "green":  "#66ee66",
    "cyan":   "#66ccff",
    "blue":   "#6666ff",
    "purple": "#9900ff"
  };
  var color_for = function(str) {
    var char = str.substr(0,1).toLowerCase();
    if (char === '.' && str.length > 1) char = str.substr(1,1).toLowerCase();
    var color = null;
    if (char in charcolors) {
      color = charcolors[char];
      if (color in colorhexes) color = colorhexes[color];
    }
    return color;
  };

  var prelist = document.getElementsByTagName("pre");
  for (var i=0; i<prelist.length; i++) {
    var pre = prelist[i];
    if (pre.childNodes.length !== 1 || pre.childNodes[0].nodeType !== 3 /*text*/) continue;
    var text = pre.childNodes[0].nodeValue;
    pre.removeChild(pre.childNodes[0]);
    var append = function(text, styles) {
      if (styles) {
        var span = document.createElement("span");
        span.appendChild(document.createTextNode(text));
        for (var k in styles) {
          span.style[k] = styles[k];
        }
        pre.appendChild(span);
      } else {
        pre.appendChild(document.createTextNode(text));
      }
    };
    text.replace(/((?:\s|^)(?:(?:\/\/|\#).*|\/\*(?:.|\n)*?\*\/|\.{3}.*?\.{3}))|(([\"\'])(?:(?!\\|\3).|\\.)*\3)|(\d+(?:\.\d+)?|\.\d+)|(\s)|([\$\@\%\&\*]?\w+)|(\W)/g, function(m,ct,qt,qt_c,nl,ws,wc,nw){
      if (typeof ct === "string" && ct.length) {
        append(ct, {color:"#999999"});
      } else if (typeof qt === "string" && qt.length) {
        var color = color_for(qt);
        append(qt, color?{color:color}:null);
      } else if (typeof nl === "string" && nl.length) {
        var color = color_for(nl);
        append(nl, color?{color:color}:null);
      } else if (typeof ws === "string" && ws.length) {
        append(ws);
      } else if (typeof wc === "string" && wc.length) {
        var color = color_for(wc);
        append(wc, color?{color:color}:null);
      } else if (typeof nw === "string" && nw.length) {
        var color = color_for(nw);
        append(nw, color?{color:color}:null);
      }
      return '';
    });
  }
});
