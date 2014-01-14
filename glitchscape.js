define("glitchscape",[],function(){

	// var	colors = ['red','green','blue','yellow','teal','white','black','grey'];
	var colors = [];
	var max_colors = 300;
	var min_opacity = 0;
	var max_opacity = 1;
	var canvas;
	var container = document.getElementsByTagName("body")[0];
	var buffer = 20;
	function random_preset_color() {

		if (colors.length == 0)
			for(var i = 0; i < max_colors; i++)
				colors.push( random_color() );

		return colors[Math.floor( Math.random() * colors.length )];
	}

	function random_color() {
		var c = "rgba(";
		c += Math.ceil(Math.random() * 255) + ",";
		c += Math.ceil(Math.random() * 255) + ",";
		c += Math.ceil(Math.random() * 255) + ",";
		c += float_between(min_opacity,max_opacity) + ")";
		return c;
	}

	function height() {
		return container.clientHeight;
	}
	
	function width() {
		return container.clientWidth;
	}

	function random_x() {
		return integer_between(buffer, width() - buffer * 2);
	}

	function random_y() {
		return integer_between(buffer, height() - buffer * 2);
	}
	
	function integer_between(a,b) {
		return parseInt(float_between(a,b));
	}
	
	function float_between(a,b) {
		var top = Math.max(a,b);
		var bottom = Math.min(a,b);
		return Math.random() * (top - bottom) + bottom;
	}

	function get_context() {
		
		if (!canvas) {
			canvas = document.createElement("canvas");
			canvas.setAttribute("width", width());
			canvas.setAttribute("height", height());
			container.appendChild(canvas);
		}

		return canvas.getContext("2d");

	}
	
	function shape_box(x,y,w,h,color) {

		var ctx = get_context();

		ctx.lineWidth = 0;

		ctx.fillStyle = color || random_color();
		ctx.moveTo(x, y);

		ctx.beginPath();

		ctx.rect(x,y,w,h);
		
		ctx.closePath();
		ctx.fill();

	}

	function shape_spike(x,y,w,h,color,sides) {

		var ctx = get_context();

		ctx.lineWidth = 0;
		
		ctx.fillStyle = color || random_preset_color();
		ctx.moveTo(x, y);
		ctx.beginPath();

		for(var i = 0; i < (sides || 10); i++)
			ctx.lineTo(integer_between(x,x+w), integer_between(y,y+h));

		ctx.lineTo(x, y);
		ctx.closePath();
		ctx.fill();

	}
	
	function shape_curve(x,y,w,h,color,curves) {
		
		var ctx = get_context();

		ctx.lineWidth = 0;
		
		ctx.fillStyle = color || random_preset_color();
		ctx.moveTo(x, y);
		ctx.beginPath();

		var new_x, new_y;
		var last_x = x;
		var last_y = y;

		for(var i = 0; i < (curves || 10); i++) {
			new_x = integer_between(x,x+w)
			new_y = integer_between(y,y+h);
			ctx.arcTo(last_x, last_y, new_x, new_y, Math.abs(last_x - new_x));
			last_x = new_x;
			last_y = new_y;
		}

		ctx.arcTo(last_x,last_y,x,y, Math.abs(last_x - x));
		ctx.closePath();
		ctx.fill();

	}

	function bounds() {

		var ctx = get_context();

		ctx.lineStyle = "black";
		ctx.lineWidth = 3;

		ctx.moveTo(20,10);
		ctx.lineTo(10,10);
		ctx.lineTo(10,20);
		ctx.stroke();

		ctx.moveTo(20,height() - 10);
		ctx.lineTo(10,height() - 10);
		ctx.lineTo(10,height() - 20);
		ctx.stroke();

		ctx.moveTo(width() - 20,10);
		ctx.lineTo(width() - 10,10);
		ctx.lineTo(width() - 10,20);
		ctx.stroke();

		ctx.moveTo(width() - 20, height() - 10);
		ctx.lineTo(width() - 10,height() - 10);
		ctx.lineTo(width() - 10,height() - 20);
		ctx.stroke();

	}

	function box() {
		var x1 = random_x();
		var y1 = random_y();
		var x2 = random_x();
		var y2 = random_y();
		shape_box(x1,y1,x2,y2,random_preset_color());
	}

	function spike() {
		var x1 = random_x();
		var y1 = random_y();
		var x2 = random_x();
		var y2 = random_y();
		shape_spike(x1,y1,x2,y2,random_preset_color());
	}

	function curve() {
		var x1 = random_x();
		var y1 = random_y();
		var x2 = random_x();
		var y2 = random_y();
		shape_curve(x1,y1,x2,y2,random_preset_color());
	}

	function run() {

		shape_box(0,0,width(),height());

		setTimeout(function(){
	
			setInterval(box,250);
			setInterval(curve,100);
			setInterval(spike,500);
			
		}, 250);

	}

	/**
	 * public methods
	 */
	return {
		run : run
	}

});