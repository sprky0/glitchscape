$(function(){

	var ext = (new Audio().canPlayType("audio/mp3")) ? "mp3" : "wav",
		aud = [],
		_z = 1,
		$container = $("body");

	for(var j = 0; j < 20; j++) {
		for (var i = 1; i <= 8; i++) {
			var a = new Audio();
			a.src = "audio/" + i + "." + ext;
			a.volume = .6;
			aud.push(a);
		}
	}

	function random_color() {
		var c = "rgba(";
		c += Math.ceil(Math.random() * 255) + ",";
		c += Math.ceil(Math.random() * 255) + ",";
		c += Math.ceil(Math.random() * 255) + ",";
		c += "1)";
		return c;
	}

	function z() {
		_z++;
		return z;
	}

	function beep() {
		var a = aud[ Math.floor( Math.random() * aud.length ) ];
		a.play();
	}

	function random(target) {
		var divs = $(".active"),
			selected = Math.floor( Math.random() * divs.length );
		return divs.get(selected);
	}

	function click_action(e) {
		beep();
		split( $(this) );
	}

	function key_action() {
		beep();
		split( random() );
	}

	function split(target) {

		var $target = $(target),
			mode = Math.random() > .5 ? "vertical" : "horizontal";

		$target.removeClass("active");

		var width = $target.width(),
			height = $target.height(),
			top = $target.position() ? $target.position().top : 0,
			left = $target.position() ? $target.position().left : 0;

		switch(mode) {
			case "vertical":

				$("<div>")
					.addClass("active absolute")
					.css({
						"background-color" : random_color(),
						top : top + "px",
						left : left + "px",
						width : width + "px",
						height : (height / 2) + "px",
						"z-index" : z()
					})
					.appendTo($container);

				$("<div>")
					.addClass("active absolute")
					.css({
						"background-color" : random_color(),
						top : (top + height / 2) + "px",
						left : left,
						width : width + "px",
						height : (height / 2) + "px",
						"z-index" : z()
					})
					.appendTo($container);

			break;
			case "horizontal":

				$("<div>")
					.addClass("active absolute")
					.css({
						"background-color" : random_color(),
						top : top + "px",
						left : (left + height / 2) + "px",
						width : (width / 2) + "px",
						height : height
					})
					.appendTo(target);

				$("<div>")
					.addClass("active absolute")
					.css({
						"background-color" : random_color(),
						top : (top + height / 2) + "px",
						left : left,
						width : (width / 2) + "px",
						height : height + "px"
					})
					.appendTo(target);

			break;
		}

	}


	/*
	$(document)
		.on("keyup",key_action)
		.on("click",".active",click_action);
	*/

	setInterval(key_action,250);

});