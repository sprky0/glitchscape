$(function(){

	var ext = (new Audio().canPlayType("audio/mp3")) ? "mp3" : "wav",
		aud = [],
		_z = 1,
		$container = $("body"),
		options = {
			audio : false,
			divisions : Math.floor( Math.random() * 5000 + 1)

		},
		colors = [];

	for(var j = 0; j < 20; j++) {
		for (var i = 1; i <= 8; i++) {
			var a = new Audio();
			a.src = "audio/" + i + "." + ext;
			a.volume = .6;
			aud.push(a);
		}
	}

	function random_preset_color() {
		return colors[Math.floor( Math.random() * colors.length )];
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
		if (options.audio !== true)
			return false;
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
			mode = Math.random() > .5 ? "v" : "h";

		var width = $target.width(),
			height = $target.height(),
			top = $target.position() ? $target.position().top : 0,
			left = $target.position() ? $target.position().left : 0;

		$target.remove(); // removeClass("active");

		switch(mode) {
			case "v":

				$("<div>")
					.addClass("active absolute")
					.css({
						"background-color" : random_preset_color(),
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
						"background-color" : random_preset_color(),
						top : (top + height / 2) + "px",
						left : left,
						width : width + "px",
						height : (height / 2) + "px",
						"z-index" : z()
					})
					.appendTo($container);

			break;
			case "h":

				$("<div>")
					.addClass("active absolute")
					.css({
						"background-color" : random_preset_color(),
						top : top + "px",
						left : left + "px",
						width : (width / 2) + "px",
						height : height + "px",
						"z-index" : z()
					})
					.appendTo($container);

				$("<div>")
					.addClass("active absolute")
					.css({
						"background-color" : random_preset_color(),
						top : top + "px",
						left : (left + width / 2) + "px",
						width : (width / 2) + "px",
						height : height + "px",
						"z-index" : z()
					})
					.appendTo($container);

			break;
		}

	}

	$(document)
		.on("mouseover",".active",click_action) // .on("keyup",key_action)
		.on("click",".active",click_action);

	for( var i = 0; i < 3; i++)
		colors.push(random_color());

	while(options.divisions > 0) {
		key_action();
		options.divisions--;
	}

	// setInterval(key_action,1);
	// key_action();

});