import Loader from "../js_modules/Loader.mjs"
import HatDraw from "../js_modules/HatDraw.mjs"
import fitText from "../js_modules/fitText.mjs"
import fitImage from "../js_modules/fitImage.mjs"
import imageLibrary from "../image_library/image_library.mjs"
//	var blacklist = require("image_library/blacklist");
var blacklist = [];

var view = {};
view.description = "Can you swim?  Yes, I can.  No, I can't.";
var cue = {};
var progress;
var backgroundColor = "hsl(272,50%,50%)";
var setupDone = false;
var model;
var loader = new Loader("image_library/images/");

var things, thingsHD;


var makeCue = function () {
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
		fitImage(context, this.img, - canvas.width * .3, canvas.height / 2 * .2, canvas.width, canvas.height / 2 * .6);
		fitImage(context, this.img, canvas.width * .3, canvas.height / 2 * .2, canvas.width, canvas.height / 2 * .6);
		fitImage(context, this.img, 0, 0, canvas.width, canvas.height / 2);
		context.globalAlpha = .6;
		context.fillStyle = "yellow";
		fitText(context, "?", 0, 0, canvas.width, canvas.height / 2);
		context.fillStyle = "white";
		context.globalAlpha = 1;
		fitText(context, "Do you like " + this.text + "?", 0, canvas.height / 2, canvas.width, canvas.height / 2);
	};
}

view.setup = function () {
	if (!setupDone) {
		setupDone = true;
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

//return view;
export default view;
