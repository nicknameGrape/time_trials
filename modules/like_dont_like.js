define(function (require) {
	var Loader = require("Loader");
	var HatDraw = require("HatDraw");
	//var imageLibrary = require("image_library/images");
	var imageSearch = require("image_library/imageSearch");
	var blacklist = require("image_library/blacklist");
	var imageLibrary = imageSearch.imageLibrary;
	var fitText = require("fitText");
	var fitImage = require("fitImage");
	var Mousetrap = require("mousetrap.min");

	var view = {};
	view.description = "I like apples. I don't like spiders.";
	var cue = {};
	var progress;
	var backgroundColor = "hsl(272,50%,50%)";
	var setupDone = false;
	var model;
	var loader = new Loader("../image_library/images/");

	var things, thingsHD, batsu, heart;

	var makeCue = function () {
		var thing = thingsHD.drawOne();
		console.log(thing);
		cue = {
			img: loader.newImageAsset(thing.src),
		}
		if (Math.random() < .5) {
			cue.render = function () {
				var canvas = game.canvas;
				var context = game.context;
				fitImage(context, this.img, - canvas.width * .3, canvas.height / 2 * .2, canvas.width, canvas.height / 2 * .6);
				fitImage(context, this.img, canvas.width * .3, canvas.height / 2 * .2, canvas.width, canvas.height / 2 * .6);
				fitImage(context, this.img, 0, 0, canvas.width, canvas.height / 2);
				context.globalAlpha = .4;
				fitImage(context, batsu, 0, 0, canvas.width, canvas.height / 2);
				context.globalAlpha = 1;
				fitText(context, this.text, 0, canvas.height / 2, canvas.width, canvas.height / 2);
			}
			cue.text = "I don't like ";
		} else {
			cue.render = function () {
				var canvas = game.canvas;
				var context = game.context;
				context.globalAlpha = .4;
				fitImage(context, heart, 0, 0, canvas.width, canvas.height * .7);
				context.globalAlpha = 1;
				fitImage(context, this.img, - canvas.width * .3, canvas.height / 2 * .2, canvas.width, canvas.height / 2 * .6);
				fitImage(context, this.img, canvas.width * .3, canvas.height / 2 * .2, canvas.width, canvas.height / 2 * .6);
				fitImage(context, this.img, 0, 0, canvas.width, canvas.height / 2);
				fitText(context, this.text, 0, canvas.height / 2, canvas.width, canvas.height / 2);
			}
			cue.text = "I like ";
		}
		if (thing.hasOwnProperty("like")) {
			cue.text += thing.like + ".";
		} else if (thing.plural !== "None") {
			cue.text += thing.plural + ".";
		} else {
			cue.text += thing.text + ".";
		}
	}

	view.setup = function () {
		if (!setupDone) {
			things = imageLibrary.filter(function (obj) {
				return obj.tags.includes("fruit") ||
					obj.tags.includes("food") ||
					obj.tags.includes("drink") ||
					obj.tags.includes("color") ||
					obj.tags.includes("pet") ||
					obj.tags.includes("sport") ||
					obj.tags.includes("vegetable");
			})
			things = things.filter(function (obj) {
				return !blacklist.includes(obj.text);
			});
			thingsHD = new HatDraw(things);
			batsu = loader.newImageAsset(imageSearch.searchText("x").src);
			heart = loader.newImageAsset(imageSearch.searchText("heart").src);

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
