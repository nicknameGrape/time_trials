define(function (require) {
	var Loader = require("Loader");
	var HatDraw = require("HatDraw");
	var imageSearch = require("image_library/imageSearch");
	var fitText = require("fitText");
	var fitImage = require("fitImage");
	var Mousetrap = require("mousetrap.min");

	var view = {};
	view.description = "I'd like spaghetti.";
	var cue = {};
	//var progress;
	var backgroundColor = "hsl(272,50%,50%)";
	var setupDone = false;
	
	var itemsHD, TYPES, pointingHand, loader, localLoader;

	var makeCue = function () {
		var item = itemsHD.drawOne();
		var type = TYPES[Math.floor(Math.random()*TYPES.length)];
		var others = itemsHD.undrawn;
		cue = {
			"item": item,
			"type": type,
			"render": function () {
				var canvas = game.canvas;
				var context = game.context;
				var article;

				if (type === "statement") {
					fitImage(context, this.item.img, 0, canvas.height*.3, canvas.width*.4, canvas.height*.7);
					fitImage(context, others[0].img, canvas.width/4, canvas.height*.3, canvas.width*.4, canvas.height*.7);
					fitImage(context, pointingHand, 0, canvas.height*.3, canvas.width/4, canvas.height*.7);
					if (
						this.item.info.article === "None" ||
						this.item.info.article === null ||
						this.item.info.article === "" ||
						typeof this.item.info.article === "undefined"
					) {
						fitText(context, "I'd like " + this.item.info.text + ".", 0, 0, canvas.width, canvas.height*.3);
					} else {
						fitText(context, "I'd like " + this.item.info.article + " " + this.item.info.text + ".", 0, 0, canvas.width, canvas.height*.3);
					}
				} else if (type === "negative") {
					fitText(context, "I don't have " + this.item.info.article + " " + this.item.info.text + ".", 0, 0, canvas.width, canvas.height*.3);
					context.globalAlpha = .3;
					//context.filter = "drop-shadow(0px 0px 10px black)"
					context.filter = "blur(5px)"
					fitImage(context, this.item.img, canvas.width*.3, canvas.height*.3, canvas.width*.4, canvas.height*.7);
					context.filter = "none"
					context.globalAlpha = 1;
				}
			}
		}
	}

	view.setup = function () {
		if (!setupDone) {
			setupDone = true;
			var onload = function () {
				if (loader.assetsLoaded && localLoader.assetsLoaded) {
					makeCue();
				}
			}
			loader = new Loader("../image_library/images/", onload);
			localLoader = new Loader("modules/img/", onload);
			TYPES = ["statement"];
			var ITEMS = [
				"sushi",
				"salad",
				"sandwich"
			]
			var items = ITEMS.map(function (str) {
				var result = imageSearch.searchText(str)
				var img = loader.newImageAsset(result.src, onload);
				return {
					"info": result,
					"img": img
				};
			});
			itemsHD = new HatDraw(items);
			pointingHand = localLoader.newImageAsset("pointingHand.png", onload);
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
		//context.fillStyle = "black";
		context.fillRect(0, 0, canvas.width, canvas.height);
		context.fillStyle = "white";
		if (loader.assetsLoaded) {
			cue.render();
		}
	};

	view.update = function () {};
	view.takedown = function () {Mousetrap.unbind("space");};

	return view;
});
