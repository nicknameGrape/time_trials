define(function (require) {
	var Loader = require("Loader");
	var Mousetrap = require("mousetrap.min");
	var fitImage = require("fitImage");
	var fitText = require("fitText");
	var fitMontage = require("fitMontage");
	var imageLibrary = require("image_library/images");
	var HatDraw = require("HatDraw");
	var blacklist = require("image_library/blacklist");

	var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext("2d");
	var loader = new Loader("../image_library/images/");
	var images = [], choice = null, img, progress;
	var n, hueDegree = 0;
	var hd, girl;
	var isBig;

	function takedown() {
		Mousetrap.unbind("space");
		Mousetrap.unbind("enter");
	}

	function setup() {
		girl = loader.newImageAsset("girl_z7xhnfni.png")
		var boringList = [
		"dolphin", "panda", "goat", "milk", "egg", "puzzle", "rice", "puppet", "bat", "ball", "mouse", "baseball", "spider", "cat", "gazelle", "elephant", "ant", "water", "miso soup", "barbecue", "butterfly", "nuts"
		];
		var things = imageLibrary.filter(function (obj) {
			return !blacklist.includes(obj.text) && 
					!boringList.includes(obj.text) &&
				(
				obj.tags.includes("fruit") ||
				obj.tags.includes("food") ||
				obj.tags.includes("drink") ||
				obj.tags.includes("pet") ||
				obj.tags.includes("animal") ||
				//obj.tags.includes("sport") ||
				obj.tags.includes("toy") ||
				//obj.tags.includes("color") ||
				obj.tags.includes("vegetable")
			);
		})

		hd = new HatDraw(things);
		newQuiz();
		Mousetrap.bind("space", function () {
			newQuiz();
		});
		Mousetrap.bind("enter", function () {
			game.state.finish();
		});
	}

	function newQuiz() {
		choice = hd.drawOne();
		img = loader.newImageAsset(choice.src, onload);
		n = Math.floor(Math.random()*5+1);
		isBig = (Math.random() < .5) ? true : false;
		hueDegree = Math.floor(Math.random()*3 + 1)*90;
	}

	function onload() {
		render();
	}

	//function keyPressHandler(e) {
	//	console.log(e.key);
	//	if (e.key === "1") {
	//		choice = 1; isBig = (Math.random() < .5) ? true : false; progress++;
	//	} else if (e.key === "2") {
	//		choice = 2; isBig = (Math.random() < .5) ? true : false; progress++;
	//	} else if (e.key === "3") {
	//		choice = 3; isBig = (Math.random() < .5) ? true : false; progress++;
	//	} else if (e.key === "4") {
	//		choice = 4; isBig = (Math.random() < .5) ? true : false; progress++;
	//	} else if (e.key === "5") {
	//		choice = 5; isBig = (Math.random() < .5) ? true : false; progress++;
	//	} else if (e.key === "6") {
	//		choice = 6; isBig = (Math.random() < .5) ? true : false; progress++;
	//	} else if (e.key === "Enter") {
	//		reset();
	//	} else if (e.key === " ") {
	//		if (choice !== null) {
	//			progress += 1;
	//			if (progress > 5) {
	//				reset();
	//			}
	//		}
	//	}
	//	render();
	//}

	function render() {
		//context.clearRect(0, 0, canvas.width, canvas.height);
		context.fillStyle = "gray";
		context.fillRect(0, 0, canvas.width, canvas.height);
		var tmpArray = [];
		for (var i=0;i<n;i++) {
			tmpArray.push(img);
		}
		if (isBig) {
			context.filter = "hue-rotate(" + hueDegree.toString() + "deg)";
			fitMontage(context, tmpArray);
			context.filter = "none";
			fitImage(context, girl, canvas.width*.5, canvas.height*.8, canvas.width*.2, canvas.height*.2);
		} else {
			fitImage(context, girl, 0, 182, 79, 55, 0, 0, canvas.width, canvas.height)
			context.filter = "hue-rotate(" + hueDegree.toString() + "deg)";
			fitMontage(context, tmpArray, canvas.width * .2, canvas.height * .2, canvas.width*.6, canvas.height*.6);
			context.filter = "none";
		}
	}

	function update() {
	}

	function reset() {
		progress = 0;
		choice = null;
		images = [];
		hueDegree = 0;
		for (var i=0; i<6; i++) {
			var o = hd.drawOne();
			console.log(o);
			var img = loader.newImageAsset(o.src, onload); 
			images.push(img);
		}
	};

	//window.addEventListener("keypress", keyPressHandler);
	//reset();

	return {
		"description": "{N} {Size} {Color} {Object}",
		"setup": setup,
		"render": render,
		"update": update,
		"takedown": takedown
	}
});
