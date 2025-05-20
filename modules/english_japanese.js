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
	var wordsHD;
	var progress;
	var backgroundColor = "hsl(272,50%,50%)";
	var setupDone = false;
	var model;
	var loader = new Loader();
	var startTime = null;
	var endTime = null;


	var makeCue = function () {
		var word = wordsHD.drawOne();
		console.log(word);
		var language;
		var hint;
		if (Math.random() < 0.5) {
			language = "English";
			hint = "日本語";
		} else {
			language = "Japanese";
			hint = "英語";
		}
		cue = {
			language: language,
			hint: hint,
			img: loader.newImageAsset("../image_library/images/" + word.src),
			render: function () {
				var canvas = game.canvas;
				var context = game.context;
				fitText(context, "What's", 0, 0, canvas.width / 2, canvas.height / 2);
				fitImage(context, this.img, canvas.width / 2, 0, canvas.width / 2, canvas.height / 2);
				fitText(context, this.hint, canvas.width * .65, canvas.height * .2, canvas.width * .2, canvas.height * .2);
				fitText(context, "in " + this.language + "?", 0, canvas.height / 2, canvas.width, canvas.height / 2);
			}
		}
	}

	view.setup = function () {
		if (!setupDone) {
			var blacklist = [
			];
			//var length = parseInt(prompt("How many letters?"));
			//words = imageLibrary.filter(function (obj) {
			//	return obj.text.length === length;
			//	//return obj.text.length === 3;
			//})
			//words = words.filter(function (obj) {
			//	return !blacklist.includes(obj.text);
			//});
			//wordsHD = new HatDraw(words);
			wordsHD = new HatDraw(imageLibrary);
			setupDone = true;
		}
		makeCue();
		startTime = performance.now()
		progress = 0;
		Mousetrap.bind("space", function () {
			progress++;
			backgroundColor = "hsl(" + (Math.random() * 360).toString() + ",50%,50%)"
			makeCue();
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
