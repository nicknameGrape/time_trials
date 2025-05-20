define(function (require) {
	var HatDraw = require("HatDraw");
	var imageLibrary = require("image_library/images");
	var fitText = require("fitText");
	var fitImage = require("fitImage");
	var Mousetrap = require("mousetrap.min");

	var view = {};
	view.description = "I'll have a cheeseburger";
	var dishObjs = [];
	var drinkObjs = [];
	var drinkObjs = [];
	var dishHD, drinkHD;
	var cue = {};
	var progress;
	var backgroundColor = "hsl(272,50%,50%)";
	var setupDone = false;

	var makeCue = function () {
		var hd;
		if (Math.random() < 1/3) { 
			var dish = dishHD.drawOne();
			var drink = drinkHD.drawOne();
			cue = {
				text1: "I'll have " + (dish.article == null ? "" : dish.article + " ") + dish.text,
				text2: "and " + (drink.article == null ? "" : drink.article + " ") + drink.text + ", please.",
				img1: dish.img,
				img2: drink.img,
				render: function () {
					var canvas = game.canvas;
					var context = game.context;
					fitText(context, this.text1, 0, 0, canvas.width, canvas.height / 4);
					fitText(context, this.text2, 0, canvas.height / 4, canvas.width, canvas.height / 4);
					fitImage(context, this.img1, 0, canvas.height / 2, canvas.width / 2, canvas.height / 2);
					fitImage(context, this.img2, canvas.width / 2, canvas.height / 2, canvas.width / 2, canvas.height / 2);
				}
			}
		} else {
			hd = Math.random() < .5 ? dishHD : drinkHD;
			var item = hd.drawOne();
			cue = {
				text: ((item.article == null ? "" : item.article) + " " + item.text + ", please.").trim(),
				img: item.img,
				render: function () {
					var canvas = game.canvas;
					var context = game.context;
					fitText(context, "I'll have", 0, 0, canvas.width, canvas.height / 4);
					fitText(context, this.text, 0, canvas.height / 4, canvas.width, canvas.height / 4);
					fitImage(context, this.img, 0, canvas.height / 2, canvas.width, canvas.height / 2);
				}
			}
		}
	}

	view.setup = function () {
		if (!setupDone) {
			var dishes = [
				"cheeseburger",
				"pizza",
				"fish",
				"spaghetti",
				"chicken",
				"curry"
			];
			var drinks = [
				"milk",
				"orange juice",
				"water",
				"tea",
				"cola",
				"coffee"
			];
			imageLibrary.forEach(function (el) {
				if (dishes.includes(el.text)) {
					el.img = game.loader.newImageAsset(el.src);
					dishObjs.push(el)
					delete dishes[dishes.indexOf(el.text)];
				}
				if (drinks.includes(el.text)) {
					el.img = game.loader.newImageAsset(el.src);
					drinkObjs.push(el)
					delete drinks[drinks.indexOf(el.text)];
				}
			});
			dishHD = new HatDraw(dishObjs);
			drinkHD = new HatDraw(drinkObjs);
			setupDone = true;
		}
		makeCue();
		progress = 0;
		Mousetrap.bind("space", function () {
			if (progress < 2) {
				progress++;
				backgroundColor = "hsl(" + (Math.random() * 360).toString() + ",50%,50%)"
				makeCue();
			} else {
				game.state.finish();
			}
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
