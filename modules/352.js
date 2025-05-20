define(function (require) {
	var Loader = require("Loader");
	var HatDraw = require("HatDraw");
	var imageLibrary = require("image_library/images");
	var fitText = require("fitText");
	var fitImage = require("fitImage");
	var Mousetrap = require("mousetrap.min");

	var view = {};
	view.description = "Count Things 1 to 30";
	var cue = {};
	var progress;
	var backgroundColor = "hsl(272,50%,50%)";
	var setupDone = false;
	var model;
	var loader = new Loader();

	var numbersHD = new HatDraw([
		"1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"
	]);
	var blacklist = [
		"pet", "corn" 
	];
	things = imageLibrary.filter(function (obj) {
		return obj.tags.includes("fruit") ||
			obj.tags.includes("animal") ||
			obj.tags.includes("stationary") ||
			obj.tags.includes("vegetable");
	})
	things = things.filter(function (obj) {
		return !blacklist.includes(obj.text);
	});
	var thingsHD = new HatDraw(things);


	var makeCue = function () {
		var num = numbersHD.drawOne();
		var thing = thingsHD.drawOne();
		console.log(thing);
		cue = {
text: num + " " + (parseInt(num) !== 1 ? thing.plural : thing.text),
			img: loader.newImageAsset("../image_library/images/" + thing.src),
			render: function () {
				var canvas = game.canvas;
				var context = game.context;
				for (var i=parseInt(num); i>0; i--) {
					fitImage(context, this.img, (canvas.width * .5) / parseInt(num) * i, canvas.height * .4 / parseInt(num) * i, canvas.width / 2, canvas.height / 2 - canvas.height * .4 / parseInt(num) * i);
				}
				fitText(context, this.text, 0, canvas.height / 2, canvas.width, canvas.height / 2);
			}
		}
	}

	view.setup = function () {
		if (!setupDone) {
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
