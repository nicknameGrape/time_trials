define(function (require) {
	var Loader = require("Loader");
	var HatDraw = require("HatDraw");
	var imageLibrary = require("image_library/images");
	var fitText = require("fitText");
	var fitImage = require("fitImage");
	var Mousetrap = require("mousetrap.min");

	var view = {};
	view.description = "Numbers 1 to 30";
	var cue = {};
	var progress;
	var backgroundColor = "hsl(272,50%,50%)";
	var setupDone = false;
	var loader = new Loader();
	var veggiesHD = new HatDraw(
		imageLibrary.filter(function (obj) {
			return obj.tags.includes("vegetable");
		})
	);

	var makeCue = function () {
		var veg = veggiesHD.drawOne();
		cue = {
			text: veg.text,
			img: loader.newImageAsset("../image_library/images/" + veg.src),
			render: function () {
				var canvas = game.canvas;
				var context = game.context;
				fitImage(context, this.img);
			}
		}
	}

	view.setup = function () {
		if (!setupDone) {
			setupDone = true;
		}
		makeCue();
		progress = 0;
		Mousetrap.bind("space", function () {
			progress++;
			backgroundColor = "hsl(" + (Math.random() * 360).toString() + ",50%,50%)"
			makeCue();
		});
		Mousetrap.bind("enter", function () {
			progress++;
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
