define(function (require) {
	var Loader = require("Loader");
	var HatDraw = require("HatDraw");
	//var imageLibrary = require("image_library/images");
	var imageSearch = require("image_library/imageSearch");
	var imageLibrary = imageSearch.imageLibrary;
	var blacklist = require("image_library/blacklist");
	var fitText = require("fitText");
	var fitImage = require("fitImage");
	var Mousetrap = require("mousetrap.min");

	var view = {};
	view.description = "Can you swim?  Yes, I can.  No, I can't.";
	var cue = {};
	var cueIsQ = true;
	var progress;
	var backgroundColor = "hsl(272,50%,50%)";
	var setupDone = false;
	var model;
	var loader = new Loader("../image_library/images/");

	var things, thingsHD, batsu, heart;

	var makeCue = function () {
		if (cueIsQ) {
			var thing = thingsHD.drawOne();
			console.log(thing);
			var text;
			if (thing.hasOwnProperty("like")) {
				text = thing.like;
			} else if (thing.plural !== "None") {
				text = thing.plural;
			} else {
				text = thing.text;
			}
			cue = {
				img: loader.newImageAsset(thing.src),
				text: text
			}
			cue.render = function () {
				var canvas = game.canvas;
				var context = game.context;
				context.fillStyle = "yellow";
				context.fillRect(0, 0, canvas.width, canvas.height);
				fitImage(context, this.img, - canvas.width * .3, canvas.height / 2 * .2, canvas.width, canvas.height / 2 * .6);
				fitImage(context, this.img, canvas.width * .3, canvas.height / 2 * .2, canvas.width, canvas.height / 2 * .6);
				fitImage(context, this.img, 0, 0, canvas.width, canvas.height / 2);
				context.globalAlpha = .4;
				context.fillStyle = "yellow";
				fitText(context, "?", 0, 0, canvas.width, canvas.height / 2);
				context.fillStyle = "white";
				context.globalAlpha = 1;
				fitText(context, "Do you like " + this.text + "?", 0, canvas.height / 2, canvas.width, canvas.height / 2);
			};
		} else {
			var thing = thingsHD.drawn[0];
			console.log(thing);
			cue = {
				img: loader.newImageAsset(thing.src),
				text: thing.text
			}
			if (Math.random() < .5) {
				cue.render = function () {
					var canvas = game.canvas;
					var context = game.context;
					context.fillStyle = "green";
					context.fillRect(0, 0, canvas.width, canvas.height);
				fitImage(context, this.img, - canvas.width * .3, canvas.height / 2 * .2, canvas.width, canvas.height / 2 * .6);
				fitImage(context, this.img, canvas.width * .3, canvas.height / 2 * .2, canvas.width, canvas.height / 2 * .6);
					fitImage(context, this.img, 0, 0, canvas.width, canvas.height / 2);
					context.globalAlpha = .4;
					context.fillStyle = "green";
					fitText(context, "O", 0, 0, canvas.width, canvas.height / 2);
					context.fillStyle = "white";
					context.globalAlpha = 1;
					fitText(context, "Yes, I do.", 0, canvas.height / 2, canvas.width, canvas.height / 2);
				};
			} else {
				cue.render = function () {
					var canvas = game.canvas;
					var context = game.context;
					context.fillStyle = "red";
					context.fillRect(0, 0, canvas.width, canvas.height);
				fitImage(context, this.img, - canvas.width * .3, canvas.height / 2 * .2, canvas.width, canvas.height / 2 * .6);
				fitImage(context, this.img, canvas.width * .3, canvas.height / 2 * .2, canvas.width, canvas.height / 2 * .6);
					fitImage(context, this.img, 0, 0, canvas.width, canvas.height / 2);
					context.globalAlpha = .4;
					fitImage(context, batsu, 0, 0, canvas.width, canvas.height / 2);
					context.globalAlpha = 1;
					context.fillStyle = "white";
					fitText(context, "No, I don't.", 0, canvas.height / 2, canvas.width, canvas.height / 2);
				};
			}
		}
		cueIsQ = !cueIsQ;
	}

	view.setup = function () {
		if (!setupDone) {
			things = imageLibrary.filter(function (obj) {
				return obj.tags.includes("fruit") ||
					obj.tags.includes("food") ||
					obj.tags.includes("drink") ||
					obj.tags.includes("pet") ||
					obj.tags.includes("sport") ||
					obj.tags.includes("color") ||
					obj.tags.includes("vegetable");
			})
			things = things.filter(function (obj) {
				return !blacklist.includes(obj.text);
			});
			console.log(things.map(function (obj) {
				return obj.text;
			}));
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
