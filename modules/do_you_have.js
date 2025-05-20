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
	
	var itemsHD, openHand, loader, localLoader;
	var isQuestion = true;

	var makeCue = function () {
		var item = itemsHD.drawOne();
		var tf = Math.random()<.5?true:false;
		cue = {
			"item": item,
			"tf": tf,
			"render": function () {
				var canvas = game.canvas;
				var context = game.context;
				if (isQuestion) {
					fitText(context, "Do you have " + this.item.info.article + " " + this.item.info.text + "?", 0, 0, canvas.width, canvas.height*.3);
					fitImage(context, closedHand, 0, canvas.height*.3, canvas.width, canvas.height*.7);
					context.globalAlpha = .3;
					fitImage(context, this.item.img, canvas.width*.4, canvas.height*.6, canvas.width*.2, canvas.height*.2);
					context.globalAlpha = 1;
					//fitImage(context, this.item.img, canvas.width*.3, canvas.height*.3, canvas.width*.4, canvas.height*.7);
				} else {
					fitImage(context, openHand, 0, canvas.height*.3, canvas.width, canvas.height*.7);
					if (tf) {
						fitText(context, "Yes, I do.", 0, 0, canvas.width, canvas.height*.3);
						fitImage(context, this.item.img, canvas.width*.3, canvas.height*.3, canvas.width*.4, canvas.height*.7);
					} else {
						fitText(context, "No, I don't.", 0, 0, canvas.width, canvas.height*.3);
					}
					//context.filter = "drop-shadow(0px 0px 10px black)"
					//context.filter = "blur(5px)"
					//context.filter = "none"
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
			closedHand = localLoader.newImageAsset("closed_hand.png", onload);
		}
		Mousetrap.bind("space", function () {
			if (isQuestion) {
				isQuestion = !isQuestion;
			} else {
				isQuestion = true;
				backgroundColor = "hsl(" + (Math.random() * 360).toString() + ",50%,50%)"
				makeCue();
			}
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
		if (localLoader.assetsLoaded && loader.assetsLoaded) {
			cue.render();
		}
	};

	view.update = function () {};
	view.takedown = function () {Mousetrap.unbind("space");};

	return view;
});
