define(function (require) {
	var fitText = require("fitText");
	var fitImage = require("fitImage");
	var Loader = require("Loader");
	var loader
	var canvas = game.canvas;
	var context = game.context;
	var prevPath;

	var images;
	var start;
	var end;

	function checkLoaded() {
		if (game.loader.assetsLoaded) {
			render();
		}
	}

	function render() {
		context.clearRect(0, 0, canvas.width, canvas.height);
		var rIndex = Math.floor(images.length*Math.random());
		fitImage(context, images[rIndex]);
		images.splice(rIndex, 1);
	}

	var setup = function () {
		prevPath = game.loader.path;
		game.loader.path = "img/";
		images = [
			game.loader.newImageAsset("1on.png", checkLoaded),
			game.loader.newImageAsset("2on.png", checkLoaded),
			game.loader.newImageAsset("1under.png", checkLoaded),
			game.loader.newImageAsset("2under.png", checkLoaded),
			game.loader.newImageAsset("1by.png", checkLoaded),
			game.loader.newImageAsset("2by.png", checkLoaded),
			game.loader.newImageAsset("1in.png", checkLoaded),
			game.loader.newImageAsset("2in.png", checkLoaded)//,
			//game.loader.newImageAsset("1where.png", checkLoaded),
			//game.loader.newImageAsset("2where.png", checkLoaded)
		]
		Mousetrap.bind("space", function () {
			console.log("space pressed");
			if (images.length > 3) {
				render();
			} else {
				end = performance.now();
				context.clearRect(0, 0, canvas.width, canvas.height);
				fitText(context, ((end - start)/1000).toFixed(2) + " s", 0, canvas.width/4, canvas.width, canvas.height/4);
				setTimeout(function () {game.state.back();}, 5000);
			}
		})
		start = performance.now();
	}

	var takedown = function () {
		game.loader.path = prevPath;
		Mousetrap.unbind("space");
	}

	return {
		"title": "Cats",
		"setup": setup,
		"takedown": takedown,
		"start": start,
		"end": end
	};
	console.log("prepositions module loaded");
});
