define(function (require) {
	var Loader = require("Loader");
	var HatDraw = require("HatDraw");
	//var imageLibrary = require("image_library/images");
	var fitText = require("fitText");
	var fitImage = require("fitImage");
	var Mousetrap = require("mousetrap.min");

	var view = {};
	view.description = "Read Random Months";
	var cue = {};
	//var progress;
	var backgroundColor = "hsl(272,50%,50%)";
	var setupDone = false;
	var model;
	var feelingsHD;
	var loader;
	
	var upperBound, lowerBound, numbersHD;

	var makeCue = function () {
		var feeling = feelingsHD.drawOne();
		cue = {
			text: feeling.text,
			img: feeling.img,
			render: function () {
				var canvas = game.canvas;
				var context = game.context;
				fitImage(context, this.img, 0, 0, canvas.width, canvas.height*2/3);
				fitText(context, "I'm " + this.text + ".", 0, canvas.height*2/3, canvas.width, canvas.height / 4);
			}
		}
	}

	view.setup = function () {
		if (!setupDone) {
			loader = new Loader("../time_trials_2/modules/img/");
			var feelings = [
				//{"src": "angry.png", "text": "angry"},
				//{"src": "cold.png", "text": "cold"},
				//{"src": "excited.png", "text": "excited"},
				{"src": "fine.png", "text": "fine"},
				//{"src": "full.png", "text": "full"},
				{"src": "happy.png", "text": "happy"},
				//{"src": "hot.png", "text": "hot"},
				{"src": "hungry.png","text": "hungry"},
				//{"src": "hurt.png", "text": "hurt"},
				//{"src": "scared.png", "text": "scared"},
				//{"src": "sick.png", "text": "sick"},
				{"src": "sleepy.png", "text": "sleepy"},
				{"src": "sad.png", "text": "sad"},
				//{"src": "thirsty.png", "text": "thirsty"},
				{"src": "tired.png", "text": "tired"},
				//{"src": "bored.jpg", "text": "bored"}
			];
			feelings.forEach(function (o) {
				o.img = loader.newImageAsset(o.src, function () {if(loader.assetsLoaded) {feelingsHD = new HatDraw(feelings); setupDone = true; makeCue();}});
			});
		}
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
		if (setupDone) {
			cue.render();
		}
	};

	view.update = function () {};
	view.takedown = function () {Mousetrap.unbind("space");};

	return view;
});
