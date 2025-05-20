import modules from "./modules.js"
import fitText from "./js_modules/fitText.mjs"
import fitImage from "./js_modules/fitImage.mjs"

var view = {};
var options = {
	"topic": null,
	"module": null,
	"description": null
};
var choices;
var menuState = new StateMachine({
	init: "choosingTopic",
	transitions: [
		{name: "choseTopic", from: "choosingTopic", to: "choosingModule"},
		{name: "choseModule", from: "choosingModule", to: "ready"},
		{name: "back", from: "ready", to: "choosingModule"},
		{name: "back", from: "choosingModule", to: "choosingTopic"}
	],
	methods: {
		"onLeaveState": function () {},
		"onChoosingTopic": function () {
			choices = [];
			modules.forEach(function (e, i) {
				choices.push(e.topic);
				if ((i+1)<=9) {
					Mousetrap.bind((i+1).toString(), function () {options.topic = e; menuState.choseTopic();});
				} else if ((i+1) == 10) {
					Mousetrap.bind("0", function () {options.topic = e; menuState.choseTopic();});
				} else if ((i+1) == 11) {
					Mousetrap.bind("a", function () {options.topic = e; menuState.choseTopic();});
				}

			});
		},
		"onChoosingModule": function () {
			game.results = [];
			choices = [];
			options.topic.modules.forEach(function (e, i) {
				choices.push(e.description);
				Mousetrap.bind((i+1).toString(), function () {options.module = e; menuState.choseModule();});
			});
		},
		"onReady": function () {
			Mousetrap.reset();
			Mousetrap.bind("space", function () {
				game.modules.game = options.module.view;
				game.state.go();
			});
		}
	}
});

view.setup = function () {
	if (menuState.is("ready")) {
		Mousetrap.bind("space", function () {
			game.modules.game = options.module.view;
			game.state.go();
		});
	}
	Mousetrap.bind("esc", function () {console.log("back"); menuState.back();});
};

view.update = function (dt) {
};

view.render = function (context) {
	let canvas = context.canvas;
	let prevFillStyle = context.fillStyle;

	context.fillStyle = "gray";
	context.fillRect(0, 0, canvas.width, canvas.height);
	context.fillStyle = "green";
	fitText(context, "Time Trials", 0, 0, canvas.width, canvas.height / 3);
	context.fillStyle = "yellow";
	if (menuState.is("choosingTopic")) {
		context.fillStyle = "red";
		var itemHeight = canvas.height * 2 / 3 / choices.length;
		choices.forEach(function (e, i, a) {
			if ((i+1)<=9) {
				fitText(context, (i+1).toString() + " " + e, 0, canvas.height / 3 + i * itemHeight, canvas.width, itemHeight);
			} else if ((i+1)===10) {
				fitText(context, "0" + " " + e, 0, canvas.height / 3 + i * itemHeight, canvas.width, itemHeight);
			} else if ((i+1)===11) {
				fitText(context, "A" + " " + e, 0, canvas.height / 3 + i * itemHeight, canvas.width, itemHeight);
			}
		});
	}
	if (menuState.is("choosingModule")) {
		fitText(context, options.topic.topic, 0, canvas.height * 3 / 9, canvas.width, canvas.height * 1 / 9);
		var itemHeight = canvas.height * 5 / 9 / choices.length;
		context.fillStyle = "red";
		choices.forEach(function (e, i, a) {
			fitText(context, (i+1).toString() + " " + e, 0, canvas.height * 4 / 9 + i * itemHeight, canvas.width, itemHeight);
		});
	}
	if (menuState.is("ready")) {
		fitText(context, options.topic.topic, 0, canvas.height * 3 / 9, canvas.width, canvas.height * 1 / 9);
		fitText(context, options.module.description, 0, canvas.height * 4 / 9, canvas.width, canvas.height * 1 / 9);
		context.fillStyle = "blue";
		//fitText(context, modules[options.grade + options.unit + options.part].description, 0, canvas.height * 5 / 9, canvas.width, canvas.height * 4 / 9);
	}

	context.fillStyle = prevFillStyle;
};

view.takedown = function () {
	Mousetrap.unbind("space");
	Mousetrap.unbind("esc");
};

export default view
