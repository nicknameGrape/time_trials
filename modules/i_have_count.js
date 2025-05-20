define(function (require) {
	var Loader = require("Loader");
	var HatDraw = require("HatDraw");
	var imageSearch = require("image_library/imageSearch");
	var fitText = require("fitText");
	var fitImage = require("fitImage");
	var Mousetrap = require("mousetrap.min");

	var view = {};
	view.description = "I have a pencil.";
	var cue = {};
	//var progress;
	var backgroundColor = "hsl(272,50%,50%)";
	var setupDone = false;
	
	var itemsHD, TYPES, openHand, loader, localLoader;

	var makeCue = function () {
		var item = itemsHD.drawOne();
		var type = TYPES[Math.floor(Math.random()*TYPES.length)];
		cue = {
			"item": item,
			"type": type,
			"render": function () {
				var canvas = game.canvas;
				var context = game.context;
				if (type === "statement") {
					fitImage(context, openHand, 0, canvas.height*.2, canvas.width, canvas.height*.8);
					fitText(context, "I have " + this.item.info.article + " " + this.item.info.text + ".", 0, 0, canvas.width, canvas.height*.3);
					fitImage(context, this.item.img, canvas.width*.3, canvas.height*.3, canvas.width*.4, canvas.height*.7);
				} else if (type === "count") {
					fitImage(context, openHand, 0, canvas.height*.2, canvas.width/2, canvas.height*.8);
					fitImage(context, this.item.img, canvas.width/8, canvas.height*.4, canvas.width*.3, canvas.height*.5);
					context.save();
					context.scale(-1,1);
					fitImage(context, openHand, -canvas.width, canvas.height*.2, canvas.width/2, canvas.height*.8);
					context.restore();
					fitImage(context, this.item.img, canvas.width*5/8, canvas.height*.4, canvas.width*.3, canvas.height*.5);
					fitText(context, "I have two " + this.item.info.plural + ".", 0, 0, canvas.width, canvas.height*.3);
					context.globalAlpha = .3;
					//context.filter = "drop-shadow(0px 0px 10px black)"
					//context.filter = "blur(5px)"
					//fitImage(context, this.item.img, canvas.width*.3, canvas.height*.3, canvas.width*.4, canvas.height*.7);
					//context.filter = "none"
					context.globalAlpha = 1;
				} else if (type === "negative") {
					fitImage(context, openHand, 0, canvas.height*.2, canvas.width, canvas.height*.8);
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
			TYPES = ["statement", "statement", "count", "count", "negative"];
			var ITEMS = [
				"pencil",
				"pen",
				"pencil case",
				"pencil sharpener",
				"marker",
				"notebook",
				"magnet",
				"stapler",
				"glue stick",
				"eraser",
				"ruler",
				"calendar"
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
			openHand = localLoader.newImageAsset("open_hand.png", onload);
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
