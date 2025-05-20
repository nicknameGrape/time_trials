define(function (require) {
	var Loader = require("Loader");
	var HatDraw = require("HatDraw");
	var imageLibrary = require("image_library/images");
	var fitText = require("fitText");
	var fitImage = require("fitImage");
	var Mousetrap = require("mousetrap.min");

	var view = {};
	view.description = "Show Random Colors";
	var cue = {};
	var backgroundColor = "hsl(272,50%,50%)";
	var setupDone = false;
	var model;
	
	var loader = new Loader("../image_library/images/");
	var colorsHD;

	var makeCue = function () {
		var color = colorsHD.drawOne();
		cue = {
			eng: color.text,
			img: color.img,
			render: function () {
				var canvas = game.canvas;
				var context = game.context;
				fitImage(context, this.img, 0, 0, canvas.width, canvas.height*3/4);
				context.fillStyle = this.eng;
				fitText(context, this.eng, canvas.width*.1, canvas.height*.7, canvas.width, canvas.height/4);
				context.fillStyle = "white";
			}
		}
	}

	view.setup = function () {
		if (!setupDone) {
			var colors = imageLibrary.filter(function (o) {
				return o.tags.includes("color");
			});
			var onload = function () {
				if (loader.assetsLoaded === true) {
					console.log("assets loaded");
					setupDone = true;
					Mousetrap.bind("space", function () {
						backgroundColor = "hsl(" + (Math.random() * 360).toString() + ",50%,50%)"
						makeCue();
					});
					Mousetrap.bind("enter", function () {
						game.state.finish();
					});
					console.log(colors);
					makeCue();
				}
			};
			colors.forEach(function (o) {
				o.img = loader.newImageAsset(o.src, onload);
			});
			colorsHD = new HatDraw(colors);
		}
	};

	view.render = function () {
		var canvas = game.canvas;
		var context = game.context;

		context.fillStyle = backgroundColor;
		context.fillRect(0, 0, canvas.width, canvas.height);
		context.fillStyle = "white";
		if (loader.assetsLoaded) {
			cue.render();
		};
	};

	view.update = function () {};
	view.takedown = function () {Mousetrap.unbind("space");};

	return view;
});
