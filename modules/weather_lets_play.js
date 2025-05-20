define(function (require) {
	var Loader = require("Loader");
	var HatDraw = require("HatDraw");
	var imageSearch = require("image_library/imageSearch");
	var fitText = require("fitText");
	var fitImage = require("fitImage");
	var Mousetrap = require("mousetrap.min");

	var view = {};
	view.description = "It's sunny.  Let's play dodgeball.";
	var cue = {};
	//var progress;
	//var backgroundColor = "hsl(272,50%,50%)";
	var setupDone = false;
	
	var weathersHD, activitiesHD, loader;

	var makeCue = function () {
		var weather = weathersHD.drawOne();
		var activity = activitiesHD.drawOne();
		var img = 
		cue = {
			"weather": weather,
			"activity": activity,
			"render": function () {
				var canvas = game.canvas;
				var context = game.context;
				fitImage(context, this.weather.img);
				fitText(context, "It's " + this.weather.eng + ".", 0, 0, canvas.width, canvas.height / 4);
				fitText(context, this.activity.eng, 0, canvas.height*3/4, canvas.width, canvas.height / 4);
				fitImage(context, this.activity.img, 0, canvas.height/4, canvas.width, canvas.height / 2);
			}
		}
	}

	view.setup = function () {
		if (!setupDone) {
			setupDone = true;
			var weathers = [
				{"eng": "sunny", "src": "sunny_bg.png"},
				{"eng": "rainy", "src": "rainy_bg.png"},
				{"eng": "cloudy", "src": "cloudy_bg.png"},
				{"eng": "snowy", "src": "snowy_bg.png"}
			];
			var activities = [
				//{"eng": "*", "keyword": "*"},
				{"eng": "Let's play cards.", "keyword": "cards"},
				{"eng": "Let's play dodgeball.", "keyword": "dodgeball"},
				{"eng": "Let's play tag.", "keyword": "tag"},
				{"eng": "Let's make a snowman.", "keyword": "snowman"},
				{"eng": "Let's eat mushrooms.", "keyword": "mushroom"},
				{"eng": "Let's eat soup.", "keyword": "soup"},
				{"eng": "Let's eat watermelon.", "keyword": "watermelon"},
				{"eng": "Let's eat pie.", "keyword": "pie"},
				{"eng": "Let's eat fish.", "keyword": "fish"},
				{"eng": "Let's eat sandwiches.", "keyword": "sandwich"},
				{"eng": "Let's eat salad.", "keyword": "salad"},
				{"eng": "Let's go swimming.", "keyword": "swimming"},
				{"eng": "Let's go shopping.", "keyword": "shopping"},
				{"eng": "Let's play piano.", "keyword": "piano"},
				{"eng": "Let's play soccer.", "keyword": "soccer"},
				{"eng": "Let's play tennis.", "keyword": "tennis"},
				{"eng": "Let's watch TV.", "keyword": "TV"},
				{"eng": "Let's play baseball.", "keyword": "baseball"}
			]
			weathersHD = new HatDraw(weathers);
			activitiesHD = new HatDraw(activities);
			loader = new Loader("../image_library/images/");
			localLoader = new Loader("modules/img/");
			var onload = function () {
				if (loader.assetsLoaded) {
					makeCue();
				}
			}
			activities.forEach(function (o) {
				o.img = loader.newImageAsset(imageSearch.searchText(o.keyword).src, onload);
			});
			weathers.forEach(function (o) {
				o.img = localLoader.newImageAsset(o.src, onload);
			});
			activities[8].img = loader.newImageAsset(imageSearch.searchText("fish", 0).src, onload);
		}
		Mousetrap.bind("space", function () {
			//backgroundColor = "hsl(" + (Math.random() * 360).toString() + ",50%,50%)"
			makeCue();
		});
		Mousetrap.bind("enter", function () {
			game.state.finish();
		});
	};

	view.render = function () {
		var canvas = game.canvas;
		var context = game.context;

		//context.fillStyle = backgroundColor;
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
