define(function (require) {
	var Loader = require("Loader");
	var HatDraw = require("HatDraw");
	//var imageLibrary = require("image_library/images");
	var imageSearch = require("image_library/imageSearch");
	var imageLibrary = imageSearch.imageLibrary;
	var fitText = require("fitText");
	var fitImage = require("fitImage");
	var Mousetrap = require("mousetrap.min");
	
	var view = {};
	view.description = "It's sunny.";
	var cue = {};
	var progress;
	var backgroundColor = "hsl(272,50%,50%)";
	var setupDone = false;
	var model;
	var loader = new Loader("modules/img/");

	var weather, weatherHD;

	var makeCue = function () {
		var todaysWeather = weatherHD.drawOne();
		console.log(todaysWeather);
		cue = {
			img: todaysWeather
		}
		cue.render = function () {
			var canvas = game.canvas;
			var context = game.context;
			fitImage(context, this.img, 0, 0, canvas.width, canvas.height);
			//context.globalAlpha = .4;
			//context.fillStyle = "yellow";
			//fitText(context, "?", 0, 0, canvas.width, canvas.height / 2);
			//context.fillStyle = "white";
			//context.globalAlpha = 1;
			//fitText(context, "Do you like " + this.text + "?", 0, canvas.height / 2, canvas.width, canvas.height / 2);
		};
	}

	view.setup = function () {
		if (!setupDone) {
			weather = [];
			weather.push(loader.newImageAsset("sunny.png"));
			weather.push(loader.newImageAsset("rainy.png"));
			weather.push(loader.newImageAsset("cloudy.png"));
			weather.push(loader.newImageAsset("snowing.png"));
			weatherHD = new HatDraw(weather);

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
