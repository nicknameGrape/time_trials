define(function (require) {
	var Loader = require("Loader");
	var HatDraw = require("HatDraw");
	var imageSearch = require("image_library/imageSearch");
	var fitText = require("fitText");
	var fitImage = require("fitImage");
	var Mousetrap = require("mousetrap.min");

	var view = {};
	view.description = "I'm a doctor.  I live in the U.S.A.";
	var cue = {};
	//var progress;
	var backgroundColor = "hsl(272,50%,50%)";
	var setupDone = false;
	
	var jobsHD, countriesHD, loader;

	var makeCue = function () {
		var job = jobsHD.drawOne();
		var country = countriesHD.drawOne();
		var img = 
		cue = {
			"job": job,
			"country": country,
			"render": function () {
				var canvas = game.canvas;
				var context = game.context;
				fitImage(context, this.job.img, 0, 0, canvas.width/2, canvas.height/3);
				fitImage(context, this.country.img, canvas.width/2, 0, canvas.width/2, canvas.height/3);
				if (this.job.text == "illustrator") {
					fitText(context, "I'm an " + this.job.text + ".", 0, canvas.height/3, canvas.width, canvas.height/3);
				} else {
					fitText(context, "I'm a " + this.job.text + ".", 0, canvas.height/3, canvas.width, canvas.height/3);
				}
				fitText(context, "I live in " + this.country.text + ".", 0, canvas.height*2/3, canvas.width, canvas.height/3);
			}
		}
	}

	view.setup = function () {
		if (!setupDone) {
			setupDone = true;
			var jobs = [
				{"text": "baseball player", "src": "baseball_player.PNG"},
				{"text": "basketball player", "src": "basketball_player.PNG"},
				{"text": "designer", "src": "designer.PNG"},
				{"text": "doctor", "src": "doctor.PNG"},
				{"text": "florist", "src": "florist.PNG"},
				{"text": "game creator", "src": "game_creator.PNG"},
				{"text": "illustrator", "src": "illustrator.PNG"},
				{"text": "police officer", "src": "police_officer.PNG"},
				{"text": "soccer player", "src": "soccer_player.PNG"},
				{"text": "teacher", "src": "teacher.PNG"}
			];
			var countries = imageSearch.imageLibrary.filter(function (o) {
				return o["tags"].includes("country");
			});
			console.log(countries);
			jobsHD = new HatDraw(jobs);
			countriesHD = new HatDraw(countries);
			loader = new Loader("../image_library/images/");
			localLoader = new Loader("modules/img/");
			var onload = function () {
				if (loader.assetsLoaded && localLoader.assetsLoaded) {
					makeCue();
				}
			}
			countries.forEach(function (o) {
				o.img = loader.newImageAsset(o.src, onload);
			});
			jobs.forEach(function (o) {
				o.img = localLoader.newImageAsset(o.src, onload);
			});
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
		if (loader.assetsLoaded && localLoader.assetsLoaded) {
			cue.render();
		}
	};

	view.update = function () {};
	view.takedown = function () {Mousetrap.unbind("space");};

	return view;
});
