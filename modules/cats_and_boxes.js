define(function (require) {
	var Loader = require("Loader");
	var HatDraw = require("HatDraw");
	var fitText = require("fitText");
	var fitImage = require("fitImage");
	var Mousetrap = require("mousetrap.min");
	
	var view = {};
	view.description = "Cats and Boxes";
	var cue = {};
	var backgroundColor = "hsl(272,50%,50%)";
	var setupDone = false;
	var loader = new Loader("modules/img/");

	var cues, cuesHD;
	function onload() {
		if (loader.assetsLoaded) {
			makeCue();
		}
	}

	var makeCue = function () {
		cue = cuesHD.drawOne();
		cue.render = function () {
			var canvas = game.canvas;
			var context = game.context;
			fitText(context, this.text1, canvas.width/2, 0, canvas.width/2, canvas.height/5);
			//if (this.text1.includes("Where")) {
			//}
			//fitImage(context, this.img, 0, canvas.height/5, canvas.width, canvas.height*3/5);
			fitImage(context, this.img, 0, 0, canvas.width, canvas.height);
			fitText(context, this.text2, 0, canvas.height*4/5, canvas.width, canvas.height/5);
		};
	}

	view.setup = function () {
		if (!setupDone) {
			var CUES = [
				{"src": "1by.png", "text1": "One cat", "text2": "by the box"},
				{"src": "1in.png", "text1": "One cat", "text2": "in the box"},
				{"src": "1on.png", "text1": "One cat", "text2": "on the box"},
				{"src": "1under.png", "text1": "One cat", "text2": "under the box"},
				{"src": "1where.png", "text1": "Where is", "text2": "the cat?"},
				{"src": "2by.png", "text1": "Two cats", "text2": "by the box"},
				{"src": "2in.png", "text1": "Two cats", "text2": "in the box"},
				{"src": "2on.png", "text1": "Two cats", "text2": "on the box"},
				{"src": "2under.png", "text1": "Two cats", "text2": "under the box"},
				{"src": "2where.png", "text1": "Where are", "text2": "the cats?"}
			];
			cues = CUES.map(function (o) {
				o.img = loader.newImageAsset(o.src, onload);
				return o;
			});
			cuesHD = new HatDraw(cues);

			setupDone = true;
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
