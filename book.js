vendorMadness = function(e, k, v) {
  var s = e.style;
  var cap = k.substring(0,1).toUpperCase() + k.substring(1);
  s['webkit'+cap] = 
  s['Moz'+cap] = 
  s['ms'+cap] = 
  s['O'+cap] = 
  s[k] = v;
};

setTransform = function(e, v) {
  var s = e.style;
  s.webkitTransform = 
  s.MozTransform =
  s.msTransform =
  s.OTransform =
  s.transform = v;
};

(function() {
var books = document.querySelectorAll('.book');

for (var i = 0; i < books.length; i++) {
  var book = books[i];
  var pages = book.childNodes;
  for (var j = 0; j < pages.length; j++) {
    if (pages[j].tagName == "DIV") {
      setTransform(pages[j], 'translate3d(0px, 0px, '+(-j)+'px)');
    }
  }
}
})();

(function() {
var px,py,sx,sy,down,rot=0,rotX=0,rotY=0,cancel;
var cardPage = document.querySelector('#myBook > div');
var pages = document.querySelectorAll('#myBook > div > div');
var currentPage = 0;

window.onmousedown = function(ev) {
  down = true;
  cancel = false;
  sx = px = ev.clientX;
  sy = py = ev.clientY;
  ev.preventDefault();
};

window.onmouseup = function(ev) {
  down = false;
};

window.onmousemove = function(ev) {
  if (down) {
    var x = ev.clientX;
    var y = ev.clientY;
    var dx = x-px;
    var dy = y-py;
    px = x;
    py = y;
    cancel = cancel || ((x-sx)*(x-sx)+(y-sy)*(y-sy) > 25);
    rotX -= dy * 1;
    rotY -= dx * 1;
    setTransform(cardPage, 'rotateX('+rotX+'deg) rotateY('+rotY+'deg)');
    ev.preventDefault();
  }
};

window.onclick = function(ev) {
  if (cancel) return;
  if (ev.clientX < 600) {
    previousPage();
  } else {
    nextPage();
  }
  ev.preventDefault();
};

var previousPage = function() {
  if (currentPage > 0) {
    currentPage--;
    setTransform(pages[currentPage], 'translate3d(0px,0px,'+(-currentPage)+'px) rotateY(0deg)');
  }
};
var nextPage = function() {
  if (currentPage < pages.length) {
    setTransform(pages[currentPage], 'translate3d(0px,0px,'+currentPage+'px) rotateY(-150deg)');
    currentPage++;
  }
};

return;

/* deprecated draggable page-turner

window.onmousemove = function(ev) {
  if (down) {
    var x = ev.clientX;
    var y = ev.clientY;
    var dx = x-px;
    var dy = y-py;
    px = x;
    py = y;
    rot = Math.min(0, Math.max(-150, rot+dx*2));
    var p = ((rot / -150)) * 2 * currentPage + -currentPage;
    setTransform(pages[currentPage], 'translate3d(0px,0px,'+p+'px) rotateY('+ rot + 'deg)');
    if (rot == -150 && currentPage < pages.length-1) {
      currentPage++;
      rot = 0;
    } else if (rot == 0 && currentPage > 0) {
      currentPage--;
      rot = -150;
    }
    ev.preventDefault();
  }
};
*/
})();

