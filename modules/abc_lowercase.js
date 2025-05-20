define(function (require) {
	var Loader = require("Loader");
	var HatDraw = require("HatDraw");
	//var imageLibrary = require("image_library/images");
	var fitText = require("fitText");
	var fitImage = require("fitImage");
	var Mousetrap = require("mousetrap.min");

	var view = {};
	view.description = "Read Random Numbers";
	var cue = {};
	//var progress;
	var backgroundColor = "hsl(272,50%,50%)";
	var setupDone = false;
	
	var ABCs = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
	var length = 1;
	var makeCue = function () {
		var string = [];
		for (var i=0; i<length; i++) {
			string.push(lettersHD.drawOne());
		}
		cue = {
			text: string.join(" "),
			render: function () {
				var canvas = game.canvas;
				var context = game.context;
				fitText(context, this.text);
			}
		}
	}

	view.setup = function () {
		if (!setupDone) {
			//length = parseInt(prompt("How many letters?"));
			length = 3;
			setupDone = true;
			lettersHD = new HatDraw(ABCs);
		}
		makeCue();
		//progress = 0;
		Mousetrap.bind("space", function () {
			//progress++;
			backgroundColor = "hsl(" + (Math.random() * 360).toString() + ",50%,50%)"
			makeCue();
		});
		Mousetrap.bind("enter", function () {
			//progress++;
			game.state.finish();
		});
	};

	view.render = function () {
		var canvas = game.canvas;
		var context = game.context;

		context.fillStyle = backgroundColor;
		context.fillRect(0, 0, canvas.width, canvas.height);
		context.fillStyle = "white";
		cue.render();
	};

	view.update = function () {};
	view.takedown = function () {Mousetrap.unbind("space");};

	return view;
});
