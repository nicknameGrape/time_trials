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
	
	var upperBound, lowerBound, numbersHD;

	var makeCue = function () {
		var month = monthsHD.drawOne();
		cue = {
			eng: month.eng,
			jap: month.jap,
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
			var months = [
				{"eng": "January", "jap": "一月", "img": null},
				{"eng": "February", "jap": "二月", "img": null},
				{"eng": "March", "jap": "三月", "img": null},
				{"eng": "April", "jap": "四月", "img": null},
				{"eng": "May", "jap": "五月", "img": null},
				{"eng": "June", "jap": "六月", "img": null},
				{"eng": "July", "jap": "七月", "img": null},
				{"eng": "August", "jap": "八月", "img": null},
				{"eng": "September", "jap": "九月", "img": null},
				{"eng": "October", "jap": "十月", "img": null},
				{"eng": "November", "jap": "十一月", "img": null},
				{"eng": "December", "jap": "十二月", "img": null},
			];
			monthsHD = new HatDraw(months);
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
