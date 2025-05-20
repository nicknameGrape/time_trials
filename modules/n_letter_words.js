define(function (require) {
	var Loader = require("Loader");
	var HatDraw = require("HatDraw");
	var imageLibrary = require("image_library/images");
	var fitText = require("fitText");
	var fitImage = require("fitImage");
	var Mousetrap = require("mousetrap.min");

	var view = {};
	view.description = "n-Letter Words";
	var cue = {};
	var wordsHD;
	var backgroundColor = "hsl(272,50%,50%)";
	var setupDone = false;
	var model;
	var loader = new Loader();
	var quizMode = false;
	var showImage = true;


	var makeCue = function () {
		var word = wordsHD.drawOne();
		console.log(word);
		cue = {
			text: word.text,
			img: loader.newImageAsset("../image_library/images/" + word.src),
			render: function () {
				var canvas = game.canvas;
				var context = game.context;
				fitText(context, this.text.toUpperCase().split("").join("-"), 0, 0, canvas.width, canvas.height / 2);
				if (showImage) {
					fitImage(context, this.img, 0, canvas.height / 2, canvas.width / 2, canvas.height / 2);
				}
				fitText(context, this.text, canvas.width / 2, canvas.height / 2, canvas.width / 2, canvas.height / 2);
				if (quizMode) {
					fitText(context, "Quiz Mode", 0, 0, canvas.width * .2, canvas.height * .07);
				}
			}
		}
		backgroundColor = "hsl(" + (Math.random() * 360).toString() + ",50%,50%)"
	}

	view.setup = function () {
		if (!setupDone) {
			var blacklist = [
			];
			//var length = parseInt(prompt("How many letters?"));
			var length = 3;
			words = imageLibrary.filter(function (obj) {
				return obj.text.length === length;
				//return obj.text.length === 3;
			})
			words = words.filter(function (obj) {
				return !blacklist.includes(obj.text);
			});
			wordsHD = new HatDraw(words);
			setupDone = true;
		}
		makeCue();
		Mousetrap.bind("space", function () {
			if (quizMode) {
				if (showImage) {
					showImage = false;
					makeCue();
				} else {
					showImage = true;
					cue.render();
				}
			} else {
				makeCue();
			}
		});
		Mousetrap.bind("enter", function () {
			game.state.finish();
		});
		Mousetrap.bind("q", function () {
				quizMode = !quizMode;
		});
		Mousetrap.bind("h", function () {
				showImage = !showImage;
				cue.render();
		});
		Mousetrap.bind("3", function () {
			var length = 3;
			words = imageLibrary.filter(function (obj) {
				return obj.text.length === length;
				//return obj.text.length === 3;
			})
			words = words.filter(function (obj) {
				return !blacklist.includes(obj.text);
			});
			wordsHD = new HatDraw(words);
		});
		Mousetrap.bind("4", function () {
			var length = 4;
			words = imageLibrary.filter(function (obj) {
				return obj.text.length === length;
				//return obj.text.length === 3;
			})
			words = words.filter(function (obj) {
				return !blacklist.includes(obj.text);
			});
			wordsHD = new HatDraw(words);
		});
		Mousetrap.bind("5", function () {
			var length = 5;
			words = imageLibrary.filter(function (obj) {
				return obj.text.length === length;
				//return obj.text.length === 3;
			})
			words = words.filter(function (obj) {
				return !blacklist.includes(obj.text);
			});
			wordsHD = new HatDraw(words);
		});
		Mousetrap.bind("6", function () {
			var length = 6;
			words = imageLibrary.filter(function (obj) {
				return obj.text.length === length;
				//return obj.text.length === 3;
			})
			words = words.filter(function (obj) {
				return !blacklist.includes(obj.text);
			});
			wordsHD = new HatDraw(words);
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
