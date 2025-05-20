define(function (require) {
	var Loader = require("Loader");
	var HatDraw = require("HatDraw");
	var imageLibrary = require("image_library/images");
	var blacklist = require("image_library/blacklist");
	var fitText = require("fitText");
	var fitImage = require("fitImage");
	var Mousetrap = require("mousetrap.min");

	var view = {};
	view.description = "What do you like?";
	var cue = {};
	var backgroundColor = "hsl(272,50%,50%)";
	var setupDone = false;
	var loader = new Loader("../image_library/images/");

	things = imageLibrary.filter(function (obj) {
		return !blacklist.includes(obj.text);
	});
	var thingsHD = new HatDraw(things);
	//var categories = ["animal", "fruit", "food", "drink", "color", "sport", "day", "month", "vegetable"];
	var categories = ["animal", "fruit", "food", "drink", "color", "sport", "vegetable"];
	var categoriesHD = new HatDraw(categories.map(function (e) {
		var matches = things.filter(function (obj) {
			return obj.tags.includes(e);
		});
		return {
			"text": e,
			"HD": new HatDraw(matches)
		};
	}));

	var makeCue = function () {
		var category = categoriesHD.drawOne();
		var images = [];
		for (var i=0; i<5; i++) {
			images.push(loader.newImageAsset(category.HD.drawOne().src, function () {
				if (loader.assetsLoaded) {
						cue.render();
				}
			}));
		}
		cue = {
			"text": category.text,
			"images": images,
			"render": function () {
				var canvas = game.canvas;
				var context = game.context;
				//context.globalCompositeOperation = "destination-over";
				var tileW = canvas.width/this.images.length;
				context.fillStyle = "gray";
				context.fillRect(0, 0, canvas.width, canvas.height);
				for (var i=0; i<this.images.length; i++) {
					fitImage(
						context,
						this.images[i],
						tileW*i,
						canvas.height*.2,
						tileW,
						canvas.height*.6
					);
				}
				context.fillStyle = "white";
				fitText(context, "What", 0, 0, canvas.width/3, canvas.height*.2);
				context.fillStyle = "yellow";
				fitText(context, this.text, canvas.width/3, 0, canvas.width*.7, canvas.height*.2);
				context.fillStyle = "white";
				fitText(context, "do you like?", 0, canvas.height*.8, canvas.width, canvas.height*.2);
			}
		}
	}


	view.setup = function () {
		if (!setupDone) {
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

		context.clearRect(0, 0, canvas.width, canvas.height);
		cue.render();
	};

	view.update = function () {};
	view.takedown = function () {Mousetrap.unbind("space");};

	return view;
});
