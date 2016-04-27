// http://lib.ivank.net/?p=demos&d=plasma
/*	
	This demo is so cool, because it is all computed by JavaScript on CPU!
	There is no Fragment Shader for it. 
	Click on area to randomize parameters.
*/

var stage, bd, time = 0;
var a = 1, b = 2, c = 1, d = 1, e = 1;
var w = 400, h = 256;

// Precomputed sine table, -127 .. 127
var sin  = new Uint8Array(512);
for (var i = 0; i < 512; i++) sin[i] = (Math.sin(2 * Math.PI / 512 * i) * 127 + 127);
	
function Start()
{
	stage = new Stage('canvas');
	bd = BitmapData.empty(w, h, 0xff000000);
	
	var bm = new Bitmap(bd);
	bm.scaleX = stage.stageWidth / w;
	bm.scaleY = stage.stageHeight / h;
	stage.addChild(bm);
	
	stage.addEventListener(Event.ENTER_FRAME, onEF);
	stage.addEventListener(MouseEvent.MOUSE_DOWN, onMD);
}

function onEF(ev) { drawPlasma(); time++; }

function drawPlasma()
{
	var hh = h * 0.5 + 10 * d - 400;
	var hw = w * 0.5 + 10 * e - 400;
	var fr = time << 2, i3 = 1 / 3;
	var am = a - 1, bm = b - 1, es = e << 2;
	for(var y = 0; y < h; y++) // Rows.
		for(var x = 0; x < w; x++) { // Columns.
			var di = Math.floor(Math.sqrt((hh - y) * (hh - y) + (hw - x) * (hw - x)));
			var hi = (sin[(x * b + fr) & 511] + sin[(di * a + fr * b) & 511] + sin[359 - (y * a + x * b + fr) & 511]) * i3;
			
			var re = sin[((hi << am) + d)  & 511];
			var gr = sin[((hi << bm) + es) & 511];
			var bl = sin[ (hi << bm) & 511];
			bd.setPixel(x, y, (re << 16 | gr << 8 | bl));
		}
}

function onMD(ev) { a = rand(4); b = rand(4); c = rand(8); d = rand(180); e = rand(180); }
function rand(n) { return 1 + Math.floor(Math.random() * n); }



//// http://www.bidouille.org/prog/plasma
//// RequestAnim shim layer by Paul Irish.
//window.requestAnimFrame = (function() {
//	return  window.requestAnimationFrame       || 
//			window.webkitRequestAnimationFrame || 
//	     	window.mozRequestAnimationFrame    || 
//	      	window.oRequestAnimationFrame      || 
//	      	window.msRequestAnimationFrame     || 
//	 		function(/* function */ callback, /* DOMElement */ element) {
//	        	window.setTimeout(callback, 1000 / 60);
//	      	};
//})();
//
//function drawFrame(context, plasmaMap, colorMap) {
//	var time = new Date().getTime() * 0.003;
//    var w = context.canvas.width;
//    var h = context.canvas.height;
//    var imageData = context.getImageData(0, 0, w, h);
//    var px = imageData.data;
//    var kx = w/h;
//
//	for(var y=0; y < h; y++) {
//    	var yy = y / h - 0.5;
//        for(var x = 0; x < w; x++) {
//        	var xx = kx * x / w - kx / 2;
//            var v = plasmaMap(xx, yy, time);
//        	colorMap(px, (y * w + x) * 4, v);
//        }
//	}
//    context.putImageData(imageData, 0, 0);
//}
//
//function drawAnimated(canvasId, plasmaMap, colorMap) {
//	var canvas = document.getElementById(canvasId);
//   	var context = canvas.getContext('2d');
//  
//   	function animate() {
//    	drawFrame(context, plasmaMap, colorMap);
//      	requestAnimFrame(animate);
//   	}
//   	requestAnimFrame(animate);
//}
//
//function plasmaFinal(x, y, time) {
//	var v = 0;
//	v += Math.sin((x * 10 + time));
//	v += Math.sin((y * 10 + time) / 2.0);
//	v += Math.sin((x * 10 + y * 10 + time) / 2.0);
//	var cx = x + 0.5 * Math.sin(time / 5.0);
//	var cy = y + 0.5 * Math.cos(time / 3.0);
//	v += Math.sin(Math.sqrt(100 * (cx * cx + cy * cy) + 1) + time);
//	v = v / 2.0;
//	return v;
//}
//
//function colorMap(px, offset, v) {
//	px[offset] = 255 * (0.5 + 0.5 * Math.sin(Math.PI * v));
//    px[offset + 1] = 255*(0.5 + 0.5 * Math.sin(Math.PI * v + 2 * Math.PI / 3));
//    px[offset + 2] = 255*(0.5 + 0.5 * Math.sin(Math.PI * v + 4 * Math.PI / 3));
//    px[offset + 3] = 255;
//}
//
//drawAnimated('canvas', plasmaFinal, colorMap);
