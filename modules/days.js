define(function (require) {
	var Loader = require("Loader");
	var HatDraw = require("HatDraw");
	//var imageLibrary = require("image_library/images");
	var fitText = require("fitText");
	var fitImage = require("fitImage");
	var Mousetrap = require("mousetrap.min");

	var view = {};
	view.description = "Read Random Days";
	var cue = {};
	//var progress;
	var backgroundColor = "hsl(272,50%,50%)";
	var setupDone = false;
	var model;
	
	var upperBound, lowerBound, numbersHD;

	var makeCue = function () {
		var day = daysHD.drawOne();
		cue = {
			eng: day.eng,
			jap: day.jap,
			render: function () {
				var canvas = game.canvas;
				var context = game.context;
				fitText(context, this.eng, 0, 0, canvas.width, canvas.height / 2);
				fitText(context, this.jap, 0, canvas.height / 2, canvas.width, canvas.height / 2);
			}
		}
	}

	view.setup = function () {
		if (!setupDone) {
			setupDone = true;
			var days = [
				{"eng": "Sunday", "jap": "日ようび", "img": null},
				{"eng": "Monday", "jap": "月ようび", "img": null},
				{"eng": "Tuesday", "jap": "火ようび", "img": null},
				{"eng": "Wednesday", "jap": "水ようび", "img": null},
				{"eng": "Thursday", "jap": "木ようび", "img": null},
				{"eng": "Friday", "jap": "金ようび", "img": null},
				{"eng": "Saturday", "jap": "土ようび", "img": null}
			];
			daysHD = new HatDraw(days);
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
