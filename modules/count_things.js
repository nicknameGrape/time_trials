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

	//var upperBound, lowerBound, numbersHD;
	var blacklist = [
		"pet", "corn", "grapes"
	];
	var thingsHD, numbersHD;


	var makeCue = function () {
		var num = numbersHD.drawOne();
		var thing = thingsHD.drawOne();
		console.log(num);
		console.log(thing);
		cue = {
text: num + " " + (parseInt(num) !== 1 ? thing.plural : thing.text),
			img: loader.newImageAsset("../image_library/images/" + thing.src),
			render: function () {
				var canvas = game.canvas;
				var context = game.context;
				context.globalCompositeOperation = "destination-over";
				for (var i=0; i<parseInt(num); i++) {
				//for (var i=parseInt(num); i>0; i--) {
					//fitImage(context, this.img, (canvas.width * .5) / parseInt(num) * i, canvas.height * .4 / parseInt(num) * i, canvas.width / 2, canvas.height / 2 - canvas.height * .4 / parseInt(num) * i);
					fitImage(context, this.img,
						(canvas.width * .7) / parseInt(num) * i,
						canvas.height * .4 / parseInt(num) * i,
						canvas.width / 2,
						canvas.height / 2 - canvas.height * .4 / parseInt(num) * i);
				}
				context.globalCompositeOperation = "source-over";
				fitText(context, this.text, 0, canvas.height / 2, canvas.width, canvas.height / 2);
			}
		}
	}

	view.setup = function () {
		if (!setupDone) {
			//upperbound = prompt("upper bound");
			//lowerbound = prompt("lower bound");
			var upperBound = 20;
			var lowerBound = 11;
			var numbers = [];
			for (var i=lowerBound; i<=upperBound; i++) {
				numbers.push(i.toString());
			}
			numbersHD = new HatDraw(numbers);
			things = imageLibrary.filter(function (obj) {
				return obj.tags.includes("fruit");
					//obj.tags.includes("animal") ||
					//obj.tags.includes("vegetable");
			})
			things = things.filter(function (obj) {
				return !blacklist.includes(obj.text);
			});
			thingsHD = new HatDraw(things);
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

		context.clearRect(0, 0, canvas.width, canvas.height);
		cue.render();
		context.globalCompositeOperation = "destination-over";
		context.fillStyle = backgroundColor;
		context.fillRect(0, 0, canvas.width, canvas.height);
		context.fillStyle = "white";
		context.globalCompositeOperation = "source-over";
	};

	view.update = function () {};
	view.takedown = function () {Mousetrap.unbind("space");};

	return view;
});
