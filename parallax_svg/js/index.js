var banner = document.getElementById('banner');
banner.addEventListener('load',function() {
    var bannerSVGDoc = this.contentDocument;
    var layersBannerEl = bannerSVGDoc.getElementsByClassName('layer');
    for (var i = 0; i < layersBannerEl.length; i++) {
    }
}, false);

header.onmousemove = function(e) {
    var moveX = e.clientX;
    var moveY = e.clientY;
    var clientW = document.documentElement.clientWidth;
    var clientH = document.documentElement.clientHeight;
    var bannerSVGDoc = banner.contentDocument;
    var layersBannerEl = bannerSVGDoc.getElementsByClassName('layer');
    for (var i = 0; i < layersBannerEl.length; i++) {
        var deepZ = layersBannerEl[i].getAttribute('data-deepz');
        var bgPosX = (moveX - moveX * (2560 / clientW) + (2560 - clientW)/2) * deepZ;
        var bgPosY = (moveY - moveY * ((clientH + 488) / clientH) + ((clientH + 488) - clientH)/2) * deepZ;    
        layersBannerEl[i].style.transform = 'translate('+bgPosX+'px, '+bgPosY+'px)';
    }
}

/*
var object = document.getElementById("’object’"); //получаем элмент object
var svgDocument = object.contentDocument; //получаем svg элемент внутри object
var svgElement = svgDocument.getElementById("some_id_in_svg"); //получаем любой элемент внутри svg
svgElement.setAttribute("fill", "black"); //меняем атрибуты выбранного элемента
/*
header.onmousemove = function(e) {
    var moveX = (e.clientX - 1) / 15;
    var moveY = (e.clientY - 1) / 15;
    banner.style.transform = 'translate3d('+moveX+'px, '+moveY+'px, 0)';
}
*/



/*
Plugin.prototype.onMouseMove = function(event) {

    // Cache mouse coordinates.
    var clientX = event.clientX;
    var clientY = event.clientY;

    // Calculate Mouse Input
    if (!this.orientationSupport && this.relativeInput) {

      // Clip mouse coordinates inside element bounds.
      if (this.clipRelativeInput) {
        clientX = Math.max(clientX, this.ex);
        clientX = Math.min(clientX, this.ex + this.ew);
        clientY = Math.max(clientY, this.ey);
        clientY = Math.min(clientY, this.ey + this.eh);
      }

      // Calculate input relative to the element.
      this.ix = (clientX - this.ex - this.ecx) / this.erx;
      this.iy = (clientY - this.ey - this.ecy) / this.ery;

    } else {

      // Calculate input relative to the window.
      this.ix = (clientX - this.wcx) / this.wrx;
      this.iy = (clientY - this.wcy) / this.wry;
    }
  };
}*/