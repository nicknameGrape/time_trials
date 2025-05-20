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
	var model;
	
	var upperBound, lowerBound, numbersHD;

	var makeCue = function () {
		var num = numbersHD.drawOne();
		cue = {
			text: num,
			render: function () {
				var canvas = game.canvas;
				var context = game.context;
				fitText(context, this.text);
			}
		}
	}

	view.setup = function () {
		if (!setupDone) {
			setupDone = true;
			upperBound = prompt("Upper Bound");
			//lowerBound = prompt("Lower Bound");
			//upperBound = "21"
			lowerBound = "1"
			var numbers = [];
			for (var i=lowerBound; i<=upperBound; i++) {
				numbers.push(i.toString());
			}
			numbersHD = new HatDraw(numbers);
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
