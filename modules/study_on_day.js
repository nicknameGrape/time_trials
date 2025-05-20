define(function (require) {
	var Loader = require("Loader");
	var HatDraw = require("HatDraw");
	var imageSearch = require("image_library/imageSearch");
	var fitText = require("fitText");
	var fitImage = require("fitImage");
	var Mousetrap = require("mousetrap.min");

	var view = {};
	view.description = "I like Monday.  I play piano.";
	var cue = {};
	//var progress;
	var backgroundColor = "hsl(272,50%,50%)";
	var setupDone = false;
	
	var daysHD, subjectsHD, loader;

	var makeCue = function () {
		var day = daysHD.drawOne();
		var subject = subjectsHD.drawOne();
		var img = 
		cue = {
			day: day,
			subject: subject,
			render: function () {
				var canvas = game.canvas;
				var context = game.context;
				fitText(context, "I like " + this.day.eng + ".", 0, 0, canvas.width * .7, canvas.height / 2);
				fitText(context, this.day.jap, canvas.width * .75, 0, canvas.width * .2, canvas.height / 2);
				fitText(context, "I study " + this.subject.eng + ".", 0, canvas.height/2, canvas.width * .7, canvas.height / 2);
				fitImage(context, this.subject.img, canvas.width * .7, canvas.height/2, canvas.width * .3, canvas.height / 2);
			}
		}
	}

	view.setup = function () {
		if (!setupDone) {
			setupDone = true;
			var days = [
				{"eng": "Sunday", "jap": "日", "img": null},
				{"eng": "Monday", "jap": "月", "img": null},
				{"eng": "Tuesday", "jap": "火", "img": null},
				{"eng": "Wednesday", "jap": "水", "img": null},
				{"eng": "Thursday", "jap": "木", "img": null},
				{"eng": "Friday", "jap": "金", "img": null},
				{"eng": "Saturday", "jap": "土", "img": null}
			];
			var subjects = [
				//{"eng": "*", "keyword": "*"},
				{"eng": "Japanese", "keyword": "Japanese"},
				{"eng": "English", "keyword": "English"},
				{"eng": "art", "keyword": "art"},
				{"eng": "music", "keyword": "music"},
				{"eng": "calligraphy", "keyword": "calligraphy"},
				{"eng": "social studies", "keyword": "social studies"},
				{"eng": "math", "keyword": "math"},
				{"eng": "science", "keyword": "science"},
				{"eng": "home economics", "keyword": "home economics"},
				{"eng": "P.E.", "keyword": "P.E."}
			]
			daysHD = new HatDraw(days);
			subjectsHD = new HatDraw(subjects);
			loader = new Loader("../image_library/images/");
			var onload = function () {
				if (loader.assetsLoaded) {
					makeCue();
				}
			}
			subjects.forEach(function (o) {
				o.img = loader.newImageAsset(imageSearch.searchText(o.keyword).src, onload);
			});
			//subjects[8].img = loader.newImageAsset(imageSearch.searchText("fish", 0).src, onload);
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
