(function() {
var books = document.querySelectorAll('.book');

for (var i = 0; i < books.length; i++) {
  var book = books[i];
  var pages = book.childNodes;
  for (var j = 0; j < pages.length; j++) {
    if (pages[j].tagName == "DIV") {
      pages[j].style.webkitTransform = pages[j].nullTrans = 'translate3d(0px, 0px, '+(-j)+'px)';
    }
  }
}
})();

(function() {
var sx,sy,down,rot=0;
var cardPage = document.querySelector('#myBook > div');
var pages = document.querySelectorAll('#myBook > div > div');
var currentPage = 0;

window.onmousedown = function(ev) {
  down = true;
  sx = ev.clientX;
  sy = ev.clientY;
  ev.preventDefault();
};

window.onmouseup = function(ev) {
  down = false;
};

window.onmousemove = function(ev) {
  if (down) {
    var x = ev.clientX;
    var y = ev.clientY;
    var dx = x-sx;
    var dy = y-sy;
    sx = x;
    sy = y;
    rot = Math.min(0, Math.max(-150, rot+dx*2));
    var p = ((rot / -150)) * 2 * currentPage + -currentPage;
    pages[currentPage].style.webkitTransform = 'translate3d(0px,0px,'+p+'px) rotateY('+ rot + 'deg)';
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
})();