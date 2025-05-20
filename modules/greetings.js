define(function (require) {
	var Loader = require("Loader");
	var HatDraw = require("HatDraw");
	var imageSearch = require("image_library/imageSearch");
	var fitText = require("fitText");
	var fitImage = require("fitImage");
	var Mousetrap = require("mousetrap.min");

	var view = {};
	view.description = "こんにちは。Welcome to Japan.";
	var cue = {};
	//var progress;
	var backgroundColor = "hsl(272,50%,50%)";
	var setupDone = false;
	
	var greetingsHD, loader;

	var makeCue = function () {
		var greeting = greetingsHD.drawOne();
		var greeting2 = greetingsHD.drawOne();
		//var country = countriesHD.drawOne();
		var img = 
		cue = {
			"greeting": greeting,
			"greeting2": greeting2,
			//"country": country,
			"render": function () {
				var canvas = game.canvas;
				var context = game.context;
				fitText(context, this.greeting.greetingKatakana, canvas.width*.3, 0, canvas.width*.7, canvas.height/2);
				fitImage(context, this.greeting.img, 0, 0, canvas.width*.3, canvas.height/2);
				fitText(context, this.greeting2.greetingKatakana, 0, canvas.height/2, canvas.width*.7, canvas.height/2);
				fitImage(context, this.greeting2.img, canvas.width*.7, canvas.height/2, canvas.width*.3, canvas.height/2);
				//fitImage(context, this.country.img, canvas.width/2, 0, canvas.width/2, canvas.height/3);
				//fitText(context, "I live in " + this.country.text + ".", 0, canvas.height*2/3, canvas.width, canvas.height/3);
			}
		}
	}

	view.setup = function () {
		if (!setupDone) {
			setupDone = true;
			var greetings = [
				{
					"countryEnglish": "Finland",
					"kidImageSource": "kidFinland.png",
					"hammeredImageSource": "kidFinlandHammered.png",
					"toeX": 49,
					"hammerX": 110,
					"hammerY": 22,
					"greetingKatakana": "テルヴェ",
					"audioSource": "helloFinland.mp3",
					"x": 177,
					"y": 895,
					"a": -.5314
				},
				{
					"countryEnglish": "China",
					"kidImageSource": "kidChina.png",
					"hammeredImageSource": "kidChinaHammered.png",
					"toeX": 69,
					"hammerX": 110,
					"hammerY": 35,
					"greetingKatakana": "ニーハオ",
					"audioSource": "helloChina.mp3",
					"x": 321,
					"y": 819,
					"a": -.3855
				},
				{
					"countryEnglish": "Germany",
					"kidImageSource": "kidGermany.png",
					"hammeredImageSource": "kidGermanyHammered.png",
					"toeX": 54,
					"hammerX": 105,
					"hammerY": 48,
					"greetingKatakana": "グーデンターク",
					"audioSource": "helloGermany.mp3",
					"x": 456,
					"y": 772,
					"a": -.2450
				},
				{
					"countryEnglish": "Japan",
					"kidImageSource": "kidJapan.png",
					"hammeredImageSource": "kidJapanHammered.png",
					"toeX": 78,
					"hammerX": 98,
					"hammerY": 14,
					"greetingKatakana": "こんにちは",
					"audioSource": "helloJapan.mp3",
					"x": 649,
					"y": 736,
					"a": -.1107
				},
				{
					"countryEnglish": "Kenya",
					"kidImageSource": "kidKenya.png",
					"hammeredImageSource": "kidKenyaHammered.png",
					"toeX": 26,
					"hammerX": 67,
					"hammerY": 17,
					"greetingKatakana": "ジャンボ",
					"audioSource": "helloKenya.mp3",
					"x": 813,
					"y": 727,
					"a": 0
				},
				{
					"countryEnglish": "India",
					"kidImageSource": "kidIndia.png",
					"hammeredImageSource": "kidIndiaHammered.png",
					"toeX": 69,
					"hammerX": 81,
					"hammerY": 31,
					"greetingKatakana": "ナマステ",
					"audioSource": "helloIndia.mp3",
					"x": 936,
					"y": 735,
					"a": .1714
				},
				{
					"countryEnglish": "Korea",
					"kidImageSource": "kidKorea.png",
					"hammeredImageSource": "kidKoreaHammered.png",
					"toeX": 66,
					"hammerX": 79,
					"hammerY": 18,
					"greetingKatakana": "アンニョンハセヨ",
					"audioSource": "helloKorea.mp3",
					"x": 1054,
					"y": 759,
					"a": .2948
				},
				{
					"countryEnglish": "America",
					"kidImageSource": "kidAmerica.png",
					"hammeredImageSource": "kidAmericaHammered.png",
					"toeX": 71,
					"hammerX": 100,
					"hammerY": 69,
					"greetingKatakana": "Hello!  Hello!",
					"audioSource": "helloAmerica.mp3",
					"x": 1165,
					"y": 795,
					"a": .3948
				},
				{
					"countryEnglish": "Australia",
					"kidImageSource": "kidAustralia.png",
					"hammeredImageSource": "kidAustraliaHammered.png",
					"toeX": 93,
					"hammerX": 87,
					"hammerY": 35,
					"greetingKatakana": "Hello!  Hello!",
					"audioSource": "helloAustralia.mp3",
					"x": 1307,
					"y": 859,
					"a": .5550
				}
			]
			greetingsHD = new HatDraw(greetings);
			loader = new Loader("../image_library/images/");
			localLoader = new Loader("modules/img/");
			var onload = function () {
				if (loader.assetsLoaded && localLoader.assetsLoaded) {
					makeCue();
				}
			}
			//countries.forEach(function (o) {
			//	o.img = loader.newImageAsset(o.src, onload);
			//});
			greetings.forEach(function (o) {
				o.img = localLoader.newImageAsset(o.kidImageSource, onload);
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
