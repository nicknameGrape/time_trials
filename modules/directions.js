define(function (require) {
	var Loader = require("Loader");
	var HatDraw = require("HatDraw");
	//var imageSearch = require("image_library/imageSearch");
	var fitText = require("fitText");
	var fitImage = require("fitImage");
	var Mousetrap = require("mousetrap.min");

	var view = {};
	view.description = "Where is the station?";
	var cue = {};
	//var progress;
	var backgroundColor = "hsl(272,50%,50%)";
	var setupDone = false;
	
	var buildingsHD, openHand, loader, localLoader;
	var isQuestion = true;
	function drawArrow(context, x, y, s, a) {
		context.save()
		context.translate(x, y);
		context.rotate(a);
		context.beginPath();
		context.moveTo(0, -s/2);
		context.lineTo(-s/2, 0);
		context.lineTo(-s/4, 0);
		context.lineTo(-s/4, s/2);
		context.lineTo(s/4, s/2);
		context.lineTo(s/4, 0);
		context.lineTo(s/2, 0);
		context.closePath();
		context.stroke();
		context.fill();
		context.restore();
	}

	var makeCue = function () {
		var building = buildingsHD.drawOne();
		var directions = [];
		for (var i=0;i<3;i++) {
			var r = Math.random();
			if (r<1/3) {
				directions.push({"text": "Turn left.", "a": -Math.PI/2});
			} else if (r<2/3) {
				directions.push({"text": "Turn right.", "a": Math.PI/2});
			} else {
				directions.push({"text": "Go straight.", "a": 0});
			}
		}
		cue = {
			"building": building,
			"directions": directions,
			"render": function () {
				var canvas = game.canvas;
				var context = game.context;
				if (isQuestion) {
					fitText(context, "Where is the " + this.building.text + "?", 0, 0, canvas.width, canvas.height*.3);
					context.save();
					context.translate(0, canvas.height/3);
					context.scale(1,.7)
					drawArrow(context, canvas.width/2, 0, canvas.height/8, 0);
					drawArrow(context, canvas.width*.8, 0, canvas.height/8, Math.PI/4);
					drawArrow(context, canvas.width*.8, canvas.height/2, canvas.height/8, Math.PI/2);
					drawArrow(context, canvas.width*.8, canvas.height*7/8, canvas.height/8, Math.PI*3/4);
					drawArrow(context, canvas.width*.5, canvas.height*7/8, canvas.height/8, Math.PI);
					drawArrow(context, canvas.width*.2, canvas.height*7/8, canvas.height/8, Math.PI*5/4);
					drawArrow(context, canvas.width*.2, canvas.height/2, canvas.height/8, Math.PI*6/4);
					drawArrow(context, canvas.width*.2, 0, canvas.height/8, Math.PI*7/4);
					context.restore();
					fitImage(context, this.building.img, 0, canvas.height/3, canvas.width, canvas.height*2/3);
				} else {
					fitImage(context, this.building.img, canvas.width*.5, canvas.height*.5, canvas.width*.6, canvas.height*.6);
					fitText(context, this.directions[0].text, 0, 0, canvas.width*.6, canvas.height/4);
					drawArrow(context, canvas.width*.8, canvas.height/8, canvas.height/5, this.directions[0].a);
					fitText(context, this.directions[1].text, 0, canvas.height/4, canvas.width*.6, canvas.height/4);
					drawArrow(context, canvas.width*.8, canvas.height/4 + canvas.height/8, canvas.height/5, this.directions[1].a);
					fitText(context, this.directions[2].text, 0, canvas.height*2/4, canvas.width*.6, canvas.height/4);
					drawArrow(context, canvas.width*.8, canvas.height*2/4 + canvas.height/8, canvas.height/5, this.directions[2].a);
					fitText(context, "Stop.", 0, canvas.height*3/4, canvas.width*.6, canvas.height/4);
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
				if (loader.assetsLoaded && buildingLoader.assetsLoaded) {
					makeCue();
				}
			}
			loader = new Loader("../image_library/images/", onload);
			buildingLoader = new Loader("../town_aftermath/images/", onload);
			var BUILDINGS = [
				{"src": "bank.PNG", "text": "bank"},
				{"src": "bookstore.PNG", "text": "bookstore"},
				{"src": "convenience_store.PNG", "text": "convenience store"},
				{"src": "department_store.PNG", "text": "department store"},
				{"src": "fire_station.PNG", "text": "fire station"},
				{"src": "flower_shop.PNG", "text": "flower shop"},
				{"src": "gas_station.PNG", "text": "gas station"},
				{"src": "hospital.PNG", "text": "hospital"},
				{"src": "library.PNG", "text": "library"},
				{"src": "park.PNG", "text": "park"},
				{"src": "pet_shop.PNG", "text": "pet shop"},
				{"src": "police_station.PNG", "text": "police station"},
				{"src": "post_office.PNG", "text": "post office"},
				{"src": "restaurant.PNG", "text": "restaurant"},
				{"src": "school.PNG", "text": "school"},
				{"src": "sports_shop.PNG", "text": "sports shop"},
				{"src": "station.PNG", "text": "station"},
				{"src": "supermarket.PNG", "text": "supermarket"}
			]
			var buildings = BUILDINGS.map(function (o) {
				var img = buildingLoader.newImageAsset(o.src, onload);
				return {
					"text": o.text,
					"img": img
				};
			});
			buildingsHD = new HatDraw(buildings);
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
		if (buildingLoader.assetsLoaded) {
			cue.render();
		}
	};

	view.update = function () {};
	view.takedown = function () {Mousetrap.unbind("space");};

	return view;
});
