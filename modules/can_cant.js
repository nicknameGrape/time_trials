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
	view.description = "Can you swim?  Yes, I can.  No, I can't.";
	var cue = {};
	var cueIsQ = true;
	var progress;
	var backgroundColor = "hsl(272,50%,50%)";
	var setupDone = false;
	var model;
	var loader = new Loader("../image_library/images/");

	var things, thingsHD;

	var makeCue = function () {
		if (cueIsQ) {
			var thing = thingsHD.drawOne();
			console.log(thing);
			cue = {
				img: loader.newImageAsset(thing.src),
				text: thing.text
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
				fitText(context, "Can you " + this.text + "?", 0, canvas.height / 2, canvas.width, canvas.height / 2);
			};
		} else {
			var thing = thingsHD.drawn[0];
			console.log(thing);
			cue = {
				img: loader.newImageAsset(thing.src),
				text: thing.text
			}
			if (Math.random() < .5) {
				cue.render = function () {
					var canvas = game.canvas;
					var context = game.context;
					fitImage(context, this.img, 0, 0, canvas.width, canvas.height / 2);
					//context.globalAlpha = .4;
					context.fillStyle = "green";
					fitText(context, "O", 0, 0, canvas.width, canvas.height / 2);
					context.fillStyle = "white";
					//context.globalAlpha = 1;
					fitText(context, "Yes, I can.", 0, canvas.height / 2, canvas.width, canvas.height / 2);
				};
			} else {
				cue.render = function () {
					var canvas = game.canvas;
					var context = game.context;
					fitImage(context, this.img, 0, 0, canvas.width, canvas.height / 2);
					//context.globalAlpha = .4;
					context.fillStyle = "red";
					fitText(context, "X", 0, 0, canvas.width, canvas.height / 2);
					//context.globalAlpha = 1;
					context.fillStyle = "white";
					fitText(context, "No, I can't", 0, canvas.height / 2, canvas.width, canvas.height / 2);
				};
			}
		}
		cueIsQ = !cueIsQ;
	}

	view.setup = function () {
		if (!setupDone) {
			things = imageLibrary.filter(function (obj) {
					return obj.tags.indexOf("ability") !== -1;
			})
			thingsHD = new HatDraw(things);
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
