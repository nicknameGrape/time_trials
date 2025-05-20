define(function (require) {
	var Loader = require("Loader");
	var HatDraw = require("HatDraw");
	//var imageLibrary = require("image_library/images");
	var fitText = require("fitText");
	var fitImage = require("fitImage");
	var Mousetrap = require("mousetrap.min");

	var view = {};
	view.description = "Random Digital Clock Times";
	var cue = {};
	//var progress;
	var backgroundColor = "hsl(272,50%,50%)";
	var setupDone = false;
	var images = [];
	var imageHD;
	
	var makeCue = function () {
		var image = imageHD.drawOne();
		cue = {
			img: image,
			render: function () {
				var canvas = game.canvas;
				var context = game.context;
				fitImage(context, this.img, 0, 0, canvas.width, canvas.height);
			}
		}
	}

	view.setup = function () {
		var loader = new Loader("modules/img/");
		if (!setupDone) {
			setupDone = true;
			var sources = [
"0105.PNG",
"0210.PNG",
"0315.PNG",
"0420.PNG",
"0525.PNG",
"0630.PNG",
"0735.PNG",
"0840.PNG",
"0945.PNG",
"1050.PNG",
"1155.PNG",
"1200.PNG"
			];
			sources.forEach(function (e) {
				images.push(loader.newImageAsset(e));
			});
			imageHD = new HatDraw(images);
		}
		makeCue();
		Mousetrap.bind("space", function () {
			backgroundColor = "hsl(" + (Math.random() * 360).toString() + ",50%,50%)"
			makeCue();
		});
		Mousetrap.bind("enter", function () {
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
