import Loader from "../js_modules/Loader.mjs"
import HatDraw from "../js_modules/HatDraw.mjs"
import fitText from "../js_modules/fitText.mjs"
import fitImage from "../js_modules/fitImage.mjs"

var view = {};
view.description = "world greetings";
var loader = new Loader("modules/img/");

var background, foreground;
var tmpCanvas = document.createElement("canvas");
var tmpContext = tmpCanvas.getContext("2d");
var setupDone;
var hammer;
var hammered;
var greetings = [
	{
		"countryEnglish": "Russia",
		"kidImageSource": "kidFinland.png",
		"hammeredImageSource": "kidFinlandHammered.png",
		"toeX": 49,
		"hammerX": 110,
		"hammerY": 22,
		"greetingKatakana": "ズドラーストヴィチェ",
		"audioSource": "helloRussia.mp3",
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
		"countryEnglish": "Saudi Arabia",
		"kidImageSource": "kidSaudiArabia.png",
		"hammeredImageSource": "kidSaudiArabiaHammered.png",
		"toeX": 54,
		"hammerX": 105,
		"hammerY": 48,
		"greetingKatakana": "アッサラームアレイコム",
		"audioSource": "helloSaudiArabia.mp3",
		"x": 456,
		"y": 772,
		"a": -.2450
	},
	{
		"countryEnglish": "Indonesia",
		"kidImageSource": "kidIndonesia.png",
		"hammeredImageSource": "kidIndonesiaHammered.png",
		"toeX": 78,
		"hammerX": 98,
		"hammerY": 14,
		"greetingKatakana": "スラマッシアン",
		"audioSource": "helloIndonesia.mp3",
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
var greetingsHD = new HatDraw(greetings);
var lastTime;
var hammeredElapsed;
var cue = {};

var makeCue = function () {
	lastTime = performance.now();
	hammered = false;
	cue = {
		"choice": greetingsHD.drawOne(),
		"render": function () {
			var canvas = game.canvas;
			var context = game.context;
			var elapsed;
			if (!hammered) {
				elapsed = performance.now() - lastTime;
			} else {
				elapsed = hammeredElapsed;
			}
			var SPEED = 2000;
			if (loader.assetsLoaded) {
				tmpContext.drawImage(background, 0, 0);
				tmpContext.save();
				tmpContext.translate(this.choice.x, this.choice.y);
				tmpContext.rotate(this.choice.a);
				if (elapsed < SPEED) {
					if (hammered) {
						tmpContext.drawImage(
							this.choice.imgHammered,
							-this.choice.toeX,
							-this.choice.img.height * .6 * elapsed / SPEED + 50
						);
						tmpContext.drawImage(
							hammer,
							-250 + this.choice.hammerX - this.choice.toeX,
							-this.choice.img.height * .6 * elapsed / SPEED - 150 + 50 + this.choice.hammerY,
							300,
							200
						);
					} else {
						tmpContext.drawImage(
							this.choice.img,
							-this.choice.toeX,
							-this.choice.img.height * .6 * elapsed / SPEED
						);
					}
				} else {
					if (hammered) {
						tmpContext.drawImage(
							this.choice.imgHammered,
							-this.choice.toeX,
							-this.choice.img.height * .6 + 50
						);
						tmpContext.drawImage(
							hammer,
							-250 + this.choice.hammerX - this.choice.toeX,
							-this.choice.img.height * .6 - 150 + 50 + this.choice.hammerY,
							300,
							200
						);
					} else {
						tmpContext.drawImage(
							this.choice.img,
							-this.choice.toeX,
							-this.choice.img.height * .6
						);
					}
				}
				tmpContext.restore();
				tmpContext.drawImage(foreground, 0, 0);
				fitImage(context, tmpCanvas);
			}
			if (elapsed > SPEED * .7) {
				if (this.choice.audio.paused && !hammered) {
					this.choice.audio.play();
				}
			}
			if (elapsed > SPEED * 2.5) {
				fitText(context, this.choice.greetingKatakana, 0, 0, canvas.width, canvas.height/3);
			}
		}
	}
}

view.setup = function () {
	if (!setupDone) {
		hammer = loader.newImageAsset("hammer.png");
		background = loader.newImageAsset("world_greetings_2_background.png", function () {tmpCanvas.width = background.width;tmpCanvas.height = background.height;});
		foreground = loader.newImageAsset("world_greetings_foreground.png");
		greetings.forEach(function (obj) {
			obj.img = loader.newImageAsset(obj.kidImageSource);
			obj.imgHammered = loader.newImageAsset(obj.hammeredImageSource);
			obj.audio = loader.newAudioAsset(obj.audioSource);
		});
		setupDone = true;
	}

	lastTime = null;
	hammered = null;

	Mousetrap.bind("space", function () {
		if (hammered === false) {
			if (cue.hasOwnProperty("choice")) {
				cue.choice.audio.pause();
				cue.choice.audio.currentTime = 0;
			}
			hammered = true;
			hammeredElapsed = performance.now() - lastTime;
			setTimeout(function () {
				makeCue();
			}, 800);
		} else if (hammered === null) {
			makeCue();
			game.startTime = performance.now();
		}
	});
	Mousetrap.bind("enter", function () {
		cue.choice.audio.pause();
		game.state.finish();
	});
};

view.render = function () {
	var canvas = game.canvas;
	var context = game.context;

	context.clearRect(0, 0, canvas.width, canvas.height);
	context.fillStyle = "red";
	fitImage(context, background);
	if (lastTime !== null) {
		cue.render();
	}
};

view.update = function () {};
view.takedown = function () {Mousetrap.unbind("space");};

//return view;
export default view
