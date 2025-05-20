define(function (require) {
	var Loader = require("Loader");
	var HatDraw = require("HatDraw");
	//var imageLibrary = require("image_library/images");
	var imageSearch = require("image_library/imageSearch");
	//var imageLibrary = imageSearch.imageLibrary;
	var fitText = require("fitText");
	var fitImage = require("fitImage");
	var Mousetrap = require("mousetrap.min");
	
	var view = {};
	view.description = "Can you swim?  Yes, I can.  No, I can't.";
	var cue = {};
	var progress;
	var backgroundColor = "hsl(272,50%,50%)";
	var setupDone = false;
	var model;
	var loader = new Loader("../image_library/images/");

	var animals = [
		"cheetah",
		"horse",
		"dog",
		"kangaroo",
		"hippopotamus",
		"boy",
		"mouse",
		"ant",
		"cat",
		"flea",
		"girl",
		"grasshopper",
		"rabbit",
		"gazelle",
		"penguin",
		"elephant",
		"fish",
		"bird",
		"kappa"
	];
	var things = animals.map(function (e) {
		return imageSearch.searchText(e);
	});
	var actions = ["swim", "jump", "run", "fly"];

	var thingsHD = new HatDraw(things);
	var actionsHD = new HatDraw(actions);

	var makeCue = function () {
		var thing = thingsHD.drawOne();
		var action = actionsHD.drawOne();
		console.log(thing);
		cue = {
			"img": loader.newImageAsset(thing.src),
			"animal": thing.text,
			"ability": action
		}
		cue.render = function () {
			var canvas = game.canvas;
			var context = game.context;
			fitImage(context, this.img, 0, 0, canvas.width, canvas.height / 2);
			//context.globalAlpha = .4;
			context.fillStyle = "yellow";
			fitText(context, "?", 0, 0, canvas.width, canvas.height / 2);
			context.fillStyle = "white";
			//context.globalAlpha = 1;
			fitText(context, this.animal.charAt(0).toUpperCase() + this.animal.substr(1) + ", can you " + this.ability + "?", 0, canvas.height / 2, canvas.width, canvas.height / 2);
		};
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
