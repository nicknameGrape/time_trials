define(function (require) {
	var HatDraw = require("HatDraw");
	var fitText = require("fitText");
	var Mousetrap = require("mousetrap.min");

	var view = {};
	view.description = "Rainbow";
	var colorHD;
	var cue = {};
	var amount = 7;
	var backgroundColor = "skyBlue";
	var setupDone = false;

	var makeCue = function () {
		var colors = [];
		for (var i=0; i<amount; i++) {
			var color = colorHD.drawOne();
			if (color === "brown") {
				color = "sienna";
			} else if (color === "pink") {
				color = "deepPink";
			} else if (color === "orange") {
				color = "darkOrange";
			} else {
				color = color;
			}
			colors.push(color);
		}
		//one more
		colors.push("skyBlue");
		cue = {
			render: function () {
				var canvas = game.canvas;
				var context = game.context;
				context.fillStyle = "skyBlue";
				context.fillRect(0, 0, canvas.width, canvas.height);
				//rainbow
				for (var i=0; i<colors.length; i++) {
					context.fillStyle = colors[i];
					var width = canvas.width / colors.length;
					//context.fillRect(width * i, 0, width, canvas.height);
					context.beginPath();
					context.arc(canvas.width * 1.5, canvas.height, canvas.width * 1.4 - width * .8 * i, 3, 1);
					context.fill();
				}
			}
		}
		console.log(colors);
	}

	view.setup = function () {
		if (!setupDone) {
			var colors = [
				"red",
				"yellow",
				"blue",
				"green",
				"pink",
				"black",
				"white",
				"orange",
				"purple",
				"brown"
			];
			colorHD = new HatDraw(colors);
			setupDone = true;
		}
		makeCue();
		for (let i=1; i<=9; i++) {
			Mousetrap.bind(i.toString(), function () {
				amount = i;
			});
		}
		Mousetrap.bind("5", function () {
			amount = 5;
		});
		Mousetrap.bind("space", function () {
			makeCue();
		});
		Mousetrap.bind("enter", function () {
			game.state.finish();
		});
	};

	view.render = function () {
		var canvas = game.canvas;
		var context = game.context;
		cue.render();
	};

	view.update = function () {};
	view.takedown = function () {Mousetrap.unbind("space");};

	return view;
});
