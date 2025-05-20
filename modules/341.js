define(function (require) {
	var Loader = require("Loader");
	var HatDraw = require("HatDraw");
	//var imageLibrary = require("image_library/images");
	var fitText = require("fitText");
	var fitImage = require("fitImage");
	var Mousetrap = require("mousetrap.min");
	var Model = require("dressup/model");
	var putOn = require("dressup/putOn");

	var view = {};
	view.description = "Put on your shirt.";
	var cue = {};
	var progress;
	var backgroundColor = "hsl(272,50%,50%)";
	var setupDone = false;
	var model;
	var colorsHD = new HatDraw([
		{text: "red", code: "red"},
		{text: "light blue", code: "lightBlue"},
		{text: "blue", code: "blue"},
		{text: "yellow", code: "yellow"},
		{text: "purple", code: "purple"},
		{text: "orange", code: "orange"},
		{text: "green", code: "green"},
		{text: "black", code: "black"},
		{text: "white", code: "white"},
		{text: "pink", code: "pink"},
		{text: "brown", code: "SaddleBrown"}
	]);
	var clothesHD = new HatDraw([
		{text: "cap", code: "cap"},
		{text: "glasses", code: "glasses"},
		{text: "shirt", code: "longsleeve"},
		{text: "pants", code: "pants"},
		{text: "shorts", code: "shorts"},
		{text: "shoes", code: "shoes"},
		{text: "skirt", code: "skirt"},
		{text: "socks", code: "long_socks"},
		{text: "T-shirt", code: "tshirt"}
	]);

	function sew(type, color) {
		var canvas = document.createElement("canvas");
		canvas.width = 225; canvas.height = 542;
		putOn(canvas.getContext("2d"), type, color);
		return canvas;
	}

	var makeCue = function () {
		model = new Model();
		var color = colorsHD.drawOne();
		var type = clothesHD.drawOne();
		c = sew(type.code, color.code);
		model.context.globalCompositeOperation = "source-over";
		fitImage(model.context, c);

		cue = {
			color: color.text,
			type: type.text,
			text1: "Nice " + this.color + " " + this.type + "!",
			//text2: "and " + (drink.article == null ? "" : drink.article + " ") + drink.text + ", please.",
			//img1: dish.img,
			//img2: drink.img,
			render: function () {
				var canvas = game.canvas;
				var context = game.context;
				fitImage(context, model.canvas, canvas.width * 2 / 3, 0, canvas.width / 3, canvas.height);
				fitImage(context, c, canvas.width * 2 / 3, 0, canvas.width / 3, canvas.height);
				fitText(context, "Nice", 0, 0, canvas.width * 2 / 3, canvas.height / 4);
				fitText(context, this.color, 0, canvas.height / 4, canvas.width * 2 / 3, canvas.height / 4);
				fitText(context, this.type, 0, canvas.height / 2, canvas.width * 2 / 3, canvas.height / 4);
				//fitImage(context, this.img1, 0, canvas.height / 2, canvas.width / 2, canvas.height / 2);
				//fitImage(context, this.img2, canvas.width / 2, canvas.height / 2, canvas.width / 2, canvas.height / 2);
			}
		}
	}

	view.setup = function () {
		if (!setupDone) {
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
