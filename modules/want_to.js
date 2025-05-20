define(function (require) {
	var Loader = require("Loader");
	var HatDraw = require("HatDraw");
	var imageLibrary = require("image_library/images");
	var fitText = require("fitText");
	var fitImage = require("fitImage");
	var Mousetrap = require("mousetrap.min");

	var view = {};
	view.description = "want to go to, want to eat, want to see";
	var cue = {};
	var progress;
	var backgroundColor = "hsl(272,50%,50%)";
	var model;
	var loader = new Loader();

	var countries, animals, foods;
	var countriesHD, animalsHD, foodsHD;
	var blacklist = [
		"pet", "corn", "grapes", "amusement park"
	];
	var usePlural = [
		"cheeseburger",
		"egg",
		"apple",
		"orange",
		"lemon",
		"carrot",
		"strawberry",
		"banana",
		"parfait",
		"kiwi",
		"potato",
		"peach",
		"cherry",
		"tomato",
		"onion"
	]

	var makeCue = function () {
		var r = Math.random();
		var obj, text;
		if (r<1/3) {
			obj = countriesHD.drawOne();
			text = "I want to go to " + obj.text + ".";
		} else if (r<2/3) {
			obj = animalsHD.drawOne();
			text = "I want to see " + obj.plural + ".";
		} else if (r<1) {
			obj = foodsHD.drawOne();
			if (usePlural.indexOf(obj.text) !== -1) {
				text = "I want to eat " + obj.plural + ".";
			} else {
				text = "I want to eat " + obj.text + ".";
			}
		}
		console.log(obj);
		cue = {
			text: text,
			img: loader.newImageAsset("../image_library/images/" + obj.src),
			render: function () {
				var canvas = game.canvas;
				var context = game.context;
				fitText(context, this.text, 0, 0, canvas.width, canvas.height/3);
				fitImage(context, this.img, 0, canvas.height/3, canvas.width, canvas.height/2);
			}
		}
	}

	view.setup = function () {
		countries = []; animals = []; foods=[];
		imageLibrary.forEach(function (obj) {
			if (blacklist.indexOf(obj.text) == -1) {
				if (obj.tags.indexOf("country") !== -1) {
					countries.push(obj);
				}
				if (obj.tags.indexOf("animal") !== -1) {
					animals.push(obj);
				}
				if (
					obj.tags.indexOf("food") !== -1 ||
					obj.tags.indexOf("fruit") !== -1 ||
					obj.tags.indexOf("vegetable") !== -1 ||
					obj.tags.indexOf("dessert") !== -1
				) {
					foods.push(obj);
				}
			}
		});
		countriesHD = new HatDraw(countries);
		animalsHD = new HatDraw(animals);
		foodsHD = new HatDraw(foods);
		console.log(countries.length, animals.length, foods.length);

		makeCue();
		progress = 0;
		Mousetrap.bind("space", function () {
			progress++;
			backgroundColor = "hsl(" + (Math.random() * 360).toString() + ",50%,50%)";
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
		context.fillStyle = backgroundColor;
		context.fillRect(0, 0, canvas.width, canvas.height);
		context.fillStyle = "white";
		cue.render();
	};

	view.update = function () {};
	view.takedown = function () {Mousetrap.unbind("space");};

	return view;
});
