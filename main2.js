"use strict"

requirejs.config({
baseUrl: '../js',
paths: {
	time_trials_2: '../time_trials_2',
	image_library: '../image_library',
}
});

var game = {};
game.canvas = document.getElementById("myCanvas");
game.context = game.canvas.getContext("2d");

require(["polyfills", "Loader"], function (polyfills, Loader) {
	game.loader = new Loader("../image_library/images/");
});

require(["state-machine3", "time_trials_2/menu2", "mousetrap.min"], function (StateMachine, menu, Mousetrap) {
//var audio_file = new Audio("beats/looperman-l-0150060-0051974-futureanalysis-beepity.wav");
//var audio_file = new Audio("beats/looperman-l-1564425-0089216-rasputin1963-reggaeton-drum-groove.wav");
//var audio_file = new Audio("beats/looperman-l-1564425-0089240-rasputin1963-do-the-twist.wav");
//var audio_file = new Audio("beats/looperman-l-1564425-0089625-rasputin1963-shaken-tambourine-riff-upbeat.wav");
//var audio_file = new Audio("beats/looperman-l-1564425-0089661-rasputin1963-1950s-rock-n-roll-piano-riff.wav");
//var audio_file = new Audio("beats/looperman-l-1564425-0089821-rasputin1963-will-this-be-it.wav");
//var audio_file = new Audio("beats/looperman-l-1564425-0090036-rasputin1963-vintage-wurly-riff.wav");
	//var audio_file = new Audio("beats/looperman-l-1564425-0088181-rasputin1963-mexican-cumbia-rhythm.wav");
	//var audio_file = new Audio("beats/looperman-l-1564425-0088499-rasputin1963-classic-bossa-nova-rhythm.wav");
	var audio_file = new Audio("beats/looperman-l-1564425-0089234-rasputin1963-classic-cha-cha-cha-percussion.wav");
	var timeoutSet = false;
	audio_file.addEventListener('timeupdate', function(e){
			var buffer = .25
			var remaining = this.duration - this.currentTime;
			if(this.currentTime > this.duration - buffer){
			//if(remaining < 1 && !timeoutSet){
				//setTimeout(function () {
					this.currentTime = 0
					this.play()
					timeoutSet = false;
				//}.bind(this), remaining*1000);
			}
			});
	game.view = null;
	game.state = new StateMachine({
		init: "menu",
		transitions: [
			{name: "go", from: "menu", to: "going"},
			{name: "back", from: "going", to: "menu"},
			{name: "finish", from: "going", to: "menu"}
		],
		methods: {
			onEnterMenu: function () {
				menu.setup();
				var prevPath = game.loader.path;
				game.loader.path = prevPath;
				game.view = menu;
				Mousetrap.bind("b", function () {
					audio_file.play();
				});
			},
			onEnterGoing: function () {
			},
			onLeaveState: function () {
			},
			onGo: function () {
			},
			onFinish: function () {
			},
			onBeforeFinish: function () {
			}
		}
	});

	var lastTime = null;
	function animate() {
		var dt;
		if (lastTime !== null) {
			dt = performance.now() - lastTime;
		} else {
			dt = 0;
		}
		lastTime = performance.now();

		//console.log("looping");
		if (game.module !== null) {
			game.view.update(dt);
			game.view.render(game.context);
		}

		game.loop = window.requestAnimationFrame(animate);
	}
	game.loop = window.requestAnimationFrame(animate);
});
