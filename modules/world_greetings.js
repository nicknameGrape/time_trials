define(function (require) {
	var Loader = require("Loader");
	var HatDraw = require("HatDraw");
	var fitText = require("fitText");
	var fitImage = require("fitImage");
	var Mousetrap = require("mousetrap.min");

	var view = {};
	view.description = "world greetings";
	var loader = new Loader("../time_trials_2/modules/img/");

	var tmpCanvas, tmpContext;
	var background, foreground, hammer; //images
	var setupDone = false;

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
			"greetingKatakana": "Hello",
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
			"greetingKatakana": "Hello",
			"audioSource": "helloAustralia.mp3",
			"x": 1307,
			"y": 859,
			"a": .5550
		}
	]
	var greetingsHD;
	var greeting = null;

	var SPEED = 2000;
	var startTime;
	var hammered;
	var elapsedWhenHammered;

	var startGreeting = function () {
		startTime = performance.now();
		hammered = false;
		greeting = greetingsHD.drawOne();
	}

	view.setup = function () {
		if (!setupDone) {
			tmpCanvas = document.createElement("canvas");
			tmpContext = tmpCanvas.getContext("2d");

			loader = new Loader("../time_trials_2/modules/img/");
			background = loader.newImageAsset("world_greetings_background.png", function () {
				tmpCanvas.width = background.width;
				tmpCanvas.height = background.height;
			});
			foreground = loader.newImageAsset("world_greetings_foreground.png");
			hammer = loader.newImageAsset("hammer.png");

			greetings.forEach(function (obj) {
				obj.img = loader.newImageAsset(obj.kidImageSource);
				obj.imgHammered = loader.newImageAsset(obj.hammeredImageSource);
				obj.audio = loader.newAudioAsset(obj.audioSource);
			});
			greetingsHD = new HatDraw(greetings);

			setupDone = true;
		}

		greeting = null;
		hammered = null;
		startTime = null;

		Mousetrap.bind("space", function () {
			if (greeting === null) {
				startGreeting();
				game.startTime = performance.now();
			} else if (hammered === false) {
				greeting.audio.pause();
				greeting.audio.currentTime = 0;
				hammered = true;
				elapsedWhenHammered = performance.now() - startTime;
				setTimeout(function () {
					startGreeting();
				}, 800);
			}
		});
		Mousetrap.bind("enter", function () {
			greeting.audio.pause();
			game.state.finish();
		});
	};

	view.render = function () {
		var canvas = game.canvas;
		var context = game.context;
		var elapsed = performance.now() - startTime;
		var progress = elapsed;

		if (!loader.assetsLoaded) {
			context.fillStyle = "gray";
			fitText(context, "Loading");
		} else {
			context.clearRect(0, 0, canvas.width, canvas.height);
			fitImage(context, background);
			if (greeting !== null) {
				tmpContext.drawImage(background, 0, 0);
				tmpContext.save();
				tmpContext.translate(greeting.x, greeting.y);
				tmpContext.rotate(greeting.a);
				if (!hammered) {
					if (elapsed > SPEED) {
						progress = SPEED;
					}
					tmpContext.drawImage(
						greeting.img,
						-greeting.toeX,
						-greeting.img.height * .6 * progress / SPEED
					);
				} else {
					progress = elapsedWhenHammered;
					if (progress > SPEED) {
						progress = SPEED;
					}
					tmpContext.drawImage(
						greeting.imgHammered,
						-greeting.toeX,
						-greeting.img.height * .6 * progress * .7 / SPEED
					);
					tmpContext.drawImage(
						hammer,
						-250 + greeting.hammerX - greeting.toeX,
						-greeting.img.height * .6 * progress * .7 / SPEED - 150 + greeting.hammerY,
						300,
						200
					);
				}
				tmpContext.restore();
				tmpContext.drawImage(foreground, 0, 0);
				fitImage(context, tmpCanvas);
				if (elapsed > SPEED * 2.5) {
					context.fillStyle = "red";
					fitText(context, greeting.greetingKatakana, 0, 0, canvas.width, canvas.height/3);
				}
			}

		}

	};

	view.update = function () {
		if (greeting !== null) {
			var elapsed = performance.now() - startTime;
			if (elapsed > SPEED && !hammered && greeting.audio.paused) {
				greeting.audio.play();
			}
		}
	};
	view.takedown = function () {Mousetrap.unbind("space");};

	return view;
});
