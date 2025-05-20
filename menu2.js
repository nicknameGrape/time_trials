define(function (require) {
	var fitText = require("fitText");
	var fitImage = require("fitImage");
	var Mousetrap = require("mousetrap.min");
	var modules = require("time_trials_2/modules2");
	var HatDraw = require("HatDraw");
	var StateMachine = require("state-machine3");

	var view = {};
	var options = {
		"topic": null,
		"module": null,
		"description": null
	};
	var choice, choices, descriptions, hd;
	var menuState = new StateMachine({
		init: "choosingTopic",
		transitions: [
			//{name: "choseTopic", from: "choosingTopic", to: "choosingModule"},
			//{name: "choseModule", from: "choosingModule", to: "ready"},
			//{name: "back", from: "ready", to: "choosingModule"},
			//{name: "back", from: "choosingModule", to: "choosingTopic"}
		],
		methods: {
		}
	});

	view.setup = function () {
		choice = hd.drawOne();
		console.log(choice)

		Mousetrap.bind("enter", function () {
			choice = hd.drawOne();
			console.log(choice);
			choice.view.setup();
		});
		Mousetrap.bind("space", function () {
			game.state.go();
			choice.view.setup();
			game.view = choice.view;
		});
	};

	view.update = function (dt) {
	};

	view.render = function (context) {
		let canvas = context.canvas;
		let prevFillStyle = context.fillStyle;

		context.clearRect(0, 0, canvas.width, canvas.height);
		context.fillStyle = "yellow";
		fitText(context, choice.description_japanese, 0, 0, canvas.width, canvas.height/2);
		fitText(context, choice.description, 0, canvas.height/2, canvas.width, canvas.height/2);

		context.fillStyle = prevFillStyle;
	};

	view.takedown = function () {
		Mousetrap.unbind("space");
		Mousetrap.unbind("esc");
	};

	//var FILTER = "lt11"
	var FILTER = prompt("ex. lt14");
	var textbook = FILTER.slice(0, 2);
	var level = FILTER.slice(2, 3);
	var unit = FILTER.slice(3, 4);
	choices = modules.filter(function (o) {
		if (
			o.id.includes(textbook)
		) {
			if (
				parseInt(o.id.slice(2, 3)) < parseInt(level)
			) {
				return true;
			}
			if (
				parseInt(o.id.slice(2, 3)) == parseInt(level)
			) {
				if (
					parseInt(o.id.slice(3, 4)) <= parseInt(unit)
				) {
					return true;
				}
			}
		} else {
			if (textbook == "js" && o.id.includes("lt")) {
				return true;
			} else {
				return false;
			}
		};
	})
	console.log(choices);
	descriptions = choices.map(function (o) {
		return o.description;
	});
	console.log(descriptions);
	hd = new HatDraw(choices);

	return view;
});
