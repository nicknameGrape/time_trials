define(function (require) {
	var Loader = require("Loader");
	var HatDraw = require("HatDraw");
	var imageSearch = require("image_library/imageSearch");
	var fitText = require("fitText");
	var fitImage = require("fitImage");
	var Mousetrap = require("mousetrap.min");

	var view = {};
	var cue = {};
	var setupDone = false;

//	const subjects = [
//		"art",
//		"calligraphy",
//		"english",
//		"home economics",
//		"japanese",
//		"math",
//		"music",
//		"pe",
//		"science",
//		"social studies"
//	];

	const supplies = {
		"art": {
			"word cards": {"src": "word_cards.png"}
		},
		"calligraphy": {
			"calligraphy brush": "calligraphy_brush.png"}//,
		//"english": {*},
		//"home economics": {*},
		//"japanese": {*},
		//"math": {*},
		//"music": {*},
		//"pe": {*},
		//"science": {*},
		//"social studies": {*}
	}
	var subjectHD, cue;

	function makeCue() {
		var subject1 = subjectHD.drawOne();
		var subject2 = subjectHD.drawOne();
		var box1HD = new HatDraw(Object.keys(supplies[subject1]));
		var box2HD = new HatDraw(Object.keys(supplies[subject2]));
		console.log(subject1, box1HD.drawOne());
		console.log(subject2, box2HD.drawOne());
		cue = {
			"subject1": subject1,
			"subject2": subject2,
			"box1": [box1HD.drawOne()],
			"box2": [box2HD.drawOne()]
		}
	};

	var animationStartTime;
	
	view.setup = function () {
		subjectHD = new HatDraw(Object.keys(supplies));
		if (!setupDone) {
			var onload = function () {
				if (loader.assetsLoaded) {
					setupDone = true;
				}
			}
			loader = new Loader("modules/img/", onload);
			makeCue();
			progress = 0;
		}
		Mousetrap.bind("space", function () {
			progress += 1;
			if (progress === 3) {
				animationStartTime = performance.now();
			}
			if (progress === 4) {
				startTime = performance.now();
			}
		});
		Mousetrap.bind("enter", function () {
			game.state.finish();
		});
	};

	var animationStartTime, startTime, progress;
	view.render = function () {
		var canvas = game.canvas;
		var context = game.context;

		context.fillStyle = "black";
		context.fillRect(0, 0, canvas.width, canvas.height);
		context.fillStyle = "green";
		if (loader.assetsLoaded) {
			if (progress === 0) {
				fitText(context, cue.subject1)
			} else if (progress === 1) {
				fitText(context, cue.subject2)
			} else if (progress === 2) {
				fitText(context, "running toward corner")
			} else if (progress === 3) {
				var elapsed = performance.now() - animationStartTime;
				fitText(context, cue.box1 + "and" + cue.box2 + " flying")
				fitText(context, parseInt(elapsed))
			} else {
				var elapsed = performance.now() - startTime;
				fitText(context, cue.box1 + "and" + cue.box2 + " scattered")
				fitText(context, parseInt(elapsed))
			}
		}
	};

	view.update = function () {};
	view.takedown = function () {Mousetrap.unbind("space");};

	return view;
});
