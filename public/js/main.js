
/*var c=document.getElementById("Canvas");
var cxt=c.getContext("2d");
var img=new Image();
img.onload = function() {
	cxt.drawImage(img, 0, 0);
};
img.src = '1.jpg';*/

/*var c_=document.getElementById("Canvas_");
var cxt_=c_.getContext("2d");
var img_=new Image();
img_.onload = function() {
	cxt_.drawImage(img_, 0, 0);
};
img_.src = '1.jpg';*/
function mouse_cross (cursor,layer,coordinate) {
	var canvas=document.getElementById(cursor);
	var ctx=canvas.getContext("2d");
	var $canvas=$("#"+cursor);
	//console.log($canvas);
	var canvasOffset=$canvas.offset();
	var offsetX=Math.floor(canvasOffset.left);
	var offsetY=Math.floor(canvasOffset.top);
	console.log(canvasOffset)
	$(document).mousemove(function(e){	
		e.preventDefault();
		e.stopPropagation();

		mouseX=parseInt(e.clientX-offsetX);
		mouseY=parseInt(e.clientY-offsetY);

		ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx.beginPath();
		ctx.moveTo(mouseX,mouseY-15);
		ctx.lineTo(mouseX,mouseY+15);
		ctx.moveTo(mouseX-15,mouseY);
		ctx.lineTo(mouseX+15,mouseY);
		ctx.stroke();
	});

	//window.onload = function(){ 
	//console.log("window onload")
	var oC = document.getElementById(layer);  

	var oGC = oC.getContext('2d');
	//var previous;
	oGC.lineWidth = 3;
	oGC.fillStyle='rgba(255,0,0,0.5)';
	//oGC.strokeRect(10,10,10,10);

	oC.onmousedown = function(ev){  
	var ev = ev || window.event;  
	//oGC.moveTo(ev.clientX-oC.offsetLeft,ev.clientY-oC.offsetTop);  
	//console.log(oC.offsetLeft);
	xx=ev.clientX-offsetX;
	yy=ev.clientY-offsetY;
	document.onmousemove = function(ev){
	var ev = ev || window.event;
	//console.log(ev.clientX)
	oGC.clearRect(0,0,300,300);
	w=ev.clientX-xx-offsetX-oGC.lineWidth;
	h=ev.clientY-yy-offsetY-oGC.lineWidth;
	//console.log(w)
	oGC.strokeRect(xx+oGC.lineWidth/2,yy+oGC.lineWidth/2,w,h);
	//console.log(ev.clientY);
	//oGC.clearRect(xx,yy,ev.clientX-xx+oGC.lineWidth,ev.clientY-yy+oGC.lineWidth);


	//console.log(xx)
	//console.log(ev.clientX)
	 
	};  
	document.onmouseup = function(ev){ 
		//oGC.restore();
		console.log("Mouse Up")
		var ev = ev || window.event;
		oGC.clearRect(0,0,300,300);
		w=ev.clientX-xx-offsetX;
		h=ev.clientY-yy-offsetY;
		oGC.fillRect(xx,yy,w,h);
		var input=document.getElementById(coordinate);
		//console.log(xx)
		//console.log(yy)
		//console.log(w)
		//console.log(h)
		input.setAttribute("value",xx.toString()+" "+yy.toString()+" "+w.toString()+" "+h.toString());
		//oGC.save();

		//console.log(oGC);
		document.onmousemove = null;  
		document.onmouseup = null;  
	};  
	};
	//};
};
mouse_cross("cursor","layer2","coordinateL");
mouse_cross("cursor_","layer2_","coordinateR");
//console.log("here")