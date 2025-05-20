define(function (require) {
	var Loader = require("Loader");
	var HatDraw = require("HatDraw");
	//var imageLibrary = require("image_library/images");
	var fitText = require("fitText");
	var fitImage = require("fitImage");
	var Mousetrap = require("mousetrap.min");

	var view = {};
	view.description = "Times Typing";
	var cue = {};
	var backgroundColor = "hsl(272,50%,50%)";
	var setupDone = false;
	var keypressHandler = function (e) {
		console.log(e.key);
		guess = e.key;
		if (progress < 4) {
			if (e.key === cue.letter) {
				progress += 1;
				setTimeout(function () {
					makeCue();
					guess = "";
				}, 300);
			} else {
				removeEventListener("keypress", keypressHandler);
				setTimeout(function () {
					addEventListener("keypress", keypressHandler);
				}, 500);
			}
		} else {
			if (e.key === cue.letter) {
				game.state.finish();
			} else {
				removeEventListener("keypress", keypressHandler);
				setTimeout(function () {
					addEventListener("keypress", keypressHandler);
				}, 500);
			}
		}
	};
	
	var lettersHD;
	var progess;
	var startTime;
	var guess;

	var makeCue = function () {
		cue = {
			"letter": lettersHD.drawOne(),
			render: function () {
				var canvas = game.canvas;
				var context = game.context;
				fitText(context, this.letter, 0, 0, canvas.width, canvas.height);
				if (guess === this.letter) {
					context.fillStyle = "green";
				} else {
					context.fillStyle = "red";
				}
				context.save(); context.globalAlpha = .5;
				fitText(context, guess, 0, 0, canvas.width, canvas.height);
				context.restore();
				context.fillStyle = "white";
			}
		}
	}

	view.setup = function () {
		if (!setupDone) {
			var letters= ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
			lettersHD = new HatDraw(letters);
			setupDone = true;
		}
		makeCue();
		progress = 0;
		startTime = performance.now();
		addEventListener("keypress", keypressHandler);
		//Mousetrap.bind("space", function () {
		//	backgroundColor = "hsl(" + (Math.random() * 360).toString() + ",50%,50%)"
		//	makeCue();
		//});
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
	view.takedown = function () {removeEventListener("keypress", keypressHandler);};

	return view;
});
