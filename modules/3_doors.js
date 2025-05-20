define(function (require) {
	var Loader = require("Loader");
	var HatDraw = require("HatDraw");
	//var imageLibrary = require("image_library/images");
	var imageSearch = require("image_library/imageSearch");
	var imageLibrary = imageSearch.imageLibrary;
	var fitText = require("fitText");
	var fitImage = require("fitImage");
	var Mousetrap = require("mousetrap.min");
	var doors1, doors2, doors3, monster;
	var checked = [];
	var diedAt = null;
	function bindKeys() {
		Mousetrap.bind("left", function () {
			checkDoor(0);
		});
		Mousetrap.bind("up", function () {
			checkDoor(1);
		});
		Mousetrap.bind("right", function () {
			checkDoor(2);
		});
	}
	function shuffle(a) {
		var j, x, i;
		for (i = a.length - 1; i > 0; i--) {
			j = Math.floor(Math.random() * (i + 1));
			x = a[i];
			a[i] = a[j];
			a[j] = x;
		}
		return a;
	}
	function checkDoor(index) {
		Mousetrap.reset();
		checked.push(index);
		if (cue.rooms[cue.currentRoom][index]) {
			setTimeout(function () {
				if (cue.currentRoom < 2) {
						cue.currentRoom += 1
						checked = [];
				} else {
					checked = [];
					game.state.finish();
				}
				bindKeys();
			}, 500);
		} else {
			diedAt = performance.now();
			setTimeout(function () {
				diedAt = null;
				cue.currentRoom = 0;
				checked = [];
				bindKeys();
			}, 1500);
		}
	}

	var view = {};
	view.description = "Can you swim?  Yes, I can.  No, I can't.";
	var cue = {};
	var setupDone = false;
	var model;
	var loader = new Loader("./modules/img/");

	var makeCue = function () {
		var room1 = [false, false, true];
		var room2 = [false, false, true];
		var room3 = [false, false, true];
		shuffle(room1);
		shuffle(room2);
		shuffle(room3);
		cue = {
			"rooms": [room1, room2, room3],
			"currentRoom": 0
		}
	}

	view.setup = function () {
		if (!setupDone) {
			setupDone = true;
		}
		doors1 = loader.newImageAsset("three_doors.jpg");
		doors2 = loader.newImageAsset("three_doors2.jpg");
		doors3 = loader.newImageAsset("three_doors3.jpg");
		monster = loader.newImageAsset("monster.png");
		bear = loader.newImageAsset("bear.png");
		ghost = loader.newImageAsset("ghost.png");
		ladybug = loader.newImageAsset("ladybug.jpg");
		cat = loader.newImageAsset("cat.png");
		spider = loader.newImageAsset("spider.png");

		makeCue();
		bindKeys();
	};

	view.render = function () {
		var canvas = game.canvas;
		var context = game.context;

		context.fillStyle = "brown";
		context.fillRect(0, 0, canvas.width, canvas.height);
		if (cue.currentRoom == 0) {
			fitImage(context, doors1);
			fitText(context, "Level 1", 0, 0, 200, 100);
		} else if (cue.currentRoom == 1) {
			fitImage(context, doors2);
			fitText(context, "Level 2", 0, 0, 200, 100);
		} else if (cue.currentRoom == 2) {
			fitImage(context, doors3);
			fitText(context, "Level 3", 0, 0, 200, 100);
		}
		if (checked.length > 0) {
			checked.forEach(function (e) {
				if (cue.rooms[cue.currentRoom][e]) {
					fitText(context, "CLEAR",
						300 * e, 50, 200, canvas.height
					);
				} else {
					if (cue.currentRoom === 0) {
						fitImage(context, ladybug,
							300 * e, 50, 200, canvas.height
						);
					} else if (cue.currentRoom === 1) {
						fitImage(context, cat,
							300 * e, 50, 200, canvas.height
						);
					} else if (cue.currentRoom === 2) {
						fitImage(context, spider,
							300 * e, 50, 200, canvas.height
						);
					}
				}
			});
		}
		if (diedAt !== null) {
			context.fillStyle = "white";
			context.globalAlpha = (performance.now() - diedAt) / 1500;
			//context.globalAlpha = .5;
			context.fillRect(0, 0, canvas.width, canvas.height);
			context.globalAlpha = 1;
		}
	};

	view.update = function () {
	};
	view.takedown = function () {Mousetrap.reset();};

	return view;
});
