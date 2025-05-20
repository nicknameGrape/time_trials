define(function (require) {
	var Loader = require("Loader");
	var HatDraw = require("HatDraw");
	var fitText = require("fitText");
	var fitImage = require("fitImage");
	var Mousetrap = require("mousetrap.min");

	var view = {};
	view.description = "Let's try 2 Hours of the Day and Routines";
	var cue = {};
	//var progress;
	var backgroundColor = "hsl(272,50%,50%)";
	var setupDone = false;
	var model;
	var routinesHD, timesHD;
	var loader;
	var progress = 0;
	
	var makeCue = function () {
		//if (Math.random() < .5) {
		if (progress % 2 === 1) {
			var feeling = routinesHD.drawOne();
			cue = {
				text: feeling.text,
				img: feeling.img,
				render: function () {
					var canvas = game.canvas;
					var context = game.context;
					fitImage(context, this.img, 0, 0, canvas.width, canvas.height*2/3);
					fitText(context, "It's " + this.text + ".", 0, canvas.height*2/3, canvas.width, canvas.height / 4);
				}
			}
		} else {
			var time = timesHD.drawOne();
			cue = {
				clock: time.clock,
				text: time.text,
				render: function () {
					var canvas = game.canvas;
					var context = game.context;
					context.fillStyle = "black";
					context.fillRect(0, 0, canvas.width, canvas.height/2);
					context.fillStyle = "red";
					fitText(context, this.clock, canvas.width/4, canvas.height/2/4, canvas.width/2, canvas.height/2/2);
					context.fillStyle = "white";
					fitText(context, this.text, 0, canvas.height/2, canvas.width, canvas.height/2);
				}
			}
		}
		progress += 1;
	}

	view.setup = function () {
		if (!setupDone) {
			loader = new Loader("../time_trials_2/modules/img/");
			var routines = [
				{"src": "bathtime.png", "text": "bath time"},
				{"src": "bedtime.png", "text": "bed time"},
				{"src": "breakfasttime.png", "text": "breakfast time"},
				{"src": "dinnertime.png", "text": "dinner time"},
				{"src": "dreamtime.png", "text": "dream time"},
				{"src": "homeworktime.png", "text": "homework time"},
				{"src": "lunchtime.png", "text": "lunch time"},
				{"src": "snacktime.png", "text": "snack time"},
				{"src": "studytime.png", "text": "study time"},
				{"src": "wakeuptime.png", "text": "wake up time"}
			];
			routines.forEach(function (o) {
				o.img = loader.newImageAsset(o.src, function () {if(loader.assetsLoaded) {routinesHD = new HatDraw(routines); setupDone = true; makeCue();}});
			});
			var times = [];
			for (var i=1; i<13; i++) {
				times.push({"clock": i + ":00 AM", "text": "It's " + i + " AM."});
				times.push({"clock": i + ":00 PM", "text": "It's " + i + " PM."});
			}
			timesHD = new HatDraw(times);

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
