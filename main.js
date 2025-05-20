"use strict"

import image_library from "./image_library/image_library.mjs"
import finished from "./finished.js"
import menu from "./menu.js"

game.canvas = document.getElementById("myCanvas");
game.context = game.canvas.getContext("2d");
game.results = [];
game.numberOfCues = null;

game.modules = [];
game.modules.menu = menu;
game.modules.finished = finished;
game.modules.game = null;
//var startTime;
game.startTime;
game.state = new StateMachine({
	init: "menu",
	transitions: [
		{name: "go", from: "menu", to: "game"},
		{name: "finish", from: "game", to: "finished"},
		{name: "back", from: "finished", to: "menu"}
	],
	methods: {
		onEnterState: function () {
			var nextView = game.modules[this.state];
			nextView.setup();
			game.view = nextView;
		},
		onLeaveState: function () {
			if (this.state != "none") {
				var thisView = game.modules[this.state];
				thisView.takedown();
			}
		},
		onGo: function () {
			game.startTime = performance.now();
			game.numberOfCues = null;
			//Mousetrap.bind("enter", this.state.finish());
		},
		onBeforeFinish: function () {
			game.results.push({
				"elapsed": performance.now() - game.startTime,
				"numberOfCues": game.numberOfCues
			});
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
	game.view.update(dt);
	game.view.render(game.context);

	game.loop = window.requestAnimationFrame(animate);
}
game.view = menu;
game.loop = window.requestAnimationFrame(animate);
export default game
