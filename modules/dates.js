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
	
	var upperBound, lowerBound, monthsHD, datesHD;

	var makeCue = function () {
		var month = monthsHD.drawOne();
		var theDate = datesHD.drawOne();
		cue = {
			eng: month.eng,
			jap: month.jap,
			theDate: theDate,
			render: function () {
				var canvas = game.canvas;
				var context = game.context;
				fitText(context, this.jap + this.theDate.japanese, 0, 0, canvas.width, canvas.height / 3);
				fitText(context, this.eng + " " + this.theDate.numeral, 0, canvas.height / 3, canvas.width, canvas.height / 3);
				fitText(context, this.theDate.spelling, canvas.width * .4, canvas.height * 2 / 3, canvas.width * .6, canvas.height / 6);
			}
		}
	}

	view.setup = function () {
		if (!setupDone) {
			setupDone = true;
			var dates = [
				{"numeral": "1st", "spelling": "first", "japanese": "一日"},
				{"numeral": "2nd", "spelling": "second", "japanese": "二日"},
				{"numeral": "3rd", "spelling": "third", "japanese": "三日"},
				{"numeral": "4th", "spelling": "fourth", "japanese": "四日"},
				{"numeral": "5th", "spelling": "fifth", "japanese": "五日"},
				{"numeral": "6th", "spelling": "sixth", "japanese": "六日"},
				{"numeral": "7th", "spelling": "seventh", "japanese": "七日"},
				{"numeral": "8th", "spelling": "eighth", "japanese": "八日"},
				{"numeral": "9th", "spelling": "ninth", "japanese": "九日"},
				{"numeral": "10th", "spelling": "tenth", "japanese": "十日"},
				{"numeral": "11th", "spelling": "eleventh", "japanese": "十一日"},
				{"numeral": "12th", "spelling": "twelfth", "japanese": "十二日"},
				{"numeral": "13th", "spelling": "thirteenth", "japanese": "十三日"},
				{"numeral": "14th", "spelling": "fourteenth", "japanese": "十四日"},
				{"numeral": "15th", "spelling": "fifteenth", "japanese": "十五日"},
				{"numeral": "16th", "spelling": "sixteenth", "japanese": "十六日"},
				{"numeral": "17th", "spelling": "seventeenth", "japanese": "十七日"},
				{"numeral": "18th", "spelling": "eighteenth", "japanese": "十八日"},
				{"numeral": "19th", "spelling": "nineteenth", "japanese": "十九日"},
				{"numeral": "20th", "spelling": "twentieth", "japanese": "二十日"},
				{"numeral": "21st", "spelling": "twenty-first", "japanese": "二十一日"},
				{"numeral": "22nd", "spelling": "twenty-second", "japanese": "二十二日"},
				{"numeral": "23rd", "spelling": "twenty-third", "japanese": "二十三日"},
				{"numeral": "24th", "spelling": "twenty-fourth", "japanese": "二十四日"},
				{"numeral": "25th", "spelling": "twenty-fifth", "japanese": "二十五日"},
				{"numeral": "26th", "spelling": "twenty-sixth", "japanese": "二十六日"},
				{"numeral": "27th", "spelling": "twenty-seventy", "japanese": "二十七日"},
				{"numeral": "28th", "spelling": "twenty-eighth", "japanese": "二十八日"},
				{"numeral": "29th", "spelling": "twenty-ninth", "japanese": "二十九日"},
				{"numeral": "30th", "spelling": "thirtieth", "japanese": "三十日"},
				{"numeral": "31st", "spelling": "thirty-first", "japanese": "三十一日"},
				{"numeral": "32nd", "spelling": "thirty-second", "japanese": "三十二日"},
				{"numeral": "33rd", "spelling": "thirty-third", "japanese": "三十三日"}
			];
			datesHD = new HatDraw(dates);
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
