define(function (require) {
	var Loader = require("Loader");
	var HatDraw = require("HatDraw");
	var imageLibrary = require("image_library/images");
	var fitText = require("fitText");
	var fitImage = require("fitImage");
	var Mousetrap = require("mousetrap.min");

	var view = {};
	view.description = "English and Japanese";
	var cue = {};
	var isBlack = true;
	var wordsHD;
	var progress;
	var backgroundColor = "hsl(272,50%,50%)";
	var setupDone = false;
	var model;
	var loader = new Loader();
	var startTime = null;
	var endTime = null;


	var makeCue = function () {
		function onload() {
			cue.sContext.canvas.width = cue.img.width;
			cue.sContext.canvas.height = cue.img.height;
			cue.sContext.fillStyle = "black";
			cue.sContext.fillRect(0, 0, cue.sContext.canvas.width, cue.sContext.canvas.height);
			cue.sContext.globalCompositeOperation = "destination-in";
			fitImage(cue.sContext, cue.img);
			cue.render();
		}
		var word = wordsHD.drawOne();
		var img = loader.newImageAsset("../image_library/images/" + word.src, onload);
		var silhouette = document.createElement("canvas");
		var sContext = silhouette.getContext("2d");
		
		console.log(word);
		cue = {
			img: img,
			word: word,
			sContext: sContext,
			render: function () {
				var canvas = game.canvas;
				var context = game.context;

				if (isBlack) {
					fitText(context, "What's this?", 0, 0, canvas.width, canvas.height / 3);
					fitImage(context, this.sContext.canvas, 0, canvas.height/3, canvas.width, canvas.height*2/3);
				} else {
					fitImage(context, this.img, 0, canvas.height/3, canvas.width, canvas.height*2/3);
					fitText(context, this.word.text, 0, 0, canvas.width, canvas.height / 3);
				}

			}
		}
	}

	view.setup = function () {
		if (!setupDone) {
			var blacklist = [
			];
			silhouetteWords = imageLibrary.filter(function (o) {
				return !o.tags.includes("number") ||
					!o.tags.includes("month");
			});
			console.log("silhouette words", silhouetteWords);
			wordsHD = new HatDraw(silhouetteWords);
			setupDone = true;
		}
		makeCue();
		startTime = performance.now()
		progress = 0;
		Mousetrap.bind("space", function () {
			if (isBlack) {
				isBlack = false;
				cue.render();
			} else {
				progress++;
				backgroundColor = "hsl(" + (Math.random() * 360).toString() + ",50%,50%)"
				isBlack = true;
				makeCue();
			}

		});
		Mousetrap.bind("enter", function () {
			progress++;
			game.numberOfCues = progress;
			endTime = performance.now();
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