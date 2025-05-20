define(function (require) {
	var fitText = require("fitText");
	var fitTextArray = require("fitTextArray");

	var view = {};
	var topIndex;
	var displayResults;

	function elapsedToString(elapsed) {
		if (elapsed > 60000) {
			return Math.floor(elapsed / 60000) + "' " + ((elapsed % 60000) / 1000).toFixed(2) + " s";
		} else {
			return (elapsed / 1000).toFixed(2) + " s";
		}
	}

	function processResults() {
		var times = game.results.map(function (e) {
			return e.elapsed;
		});

		var perPerson = game.results.map(function (e) {
			return e.numberOfCues/e.elapsed;
		});

		var max = times[0];
		topIndex = 0;
		for (var i = 1; i < times.length; i++) {
			if (times[i] < max) { //better time
				topIndex = i;
				max = times[i];
			}
		}

		//displayResults = perPerson.map(function (e) {
		//	return elapsedToString(e);
		//});
		displayResults = times.map(function (e) {
			return elapsedToString(e);
		});
		console.log(times, displayResults);
	}

	view.setup = function () {
		Mousetrap.reset();
		Mousetrap.bind("enter", function () {game.state.back();});
		Mousetrap.bind("d", function () {game.results.pop(); processResults();});
		processResults();
	};

	view.update = function (dt) {
	};

	view.render = function () {
		var context = game.context;
		var canvas = game.canvas;
		var results = game.results
		var prevFillStyle = context.fillStyle;

		context.fillStyle = "gray";
		context.fillRect(0, 0, canvas.width, canvas.height);
		context.fillStyle = "black";
		context.fillRect(0, 0, canvas.width * 2 / 3, canvas.height);
		if (topIndex == game.results.length - 1) {
			context.fillStyle = "yellow";
		} else {
			context.fillStyle = "white";
		}
		if (displayResults.length > 0) {
			fitText(context, displayResults[displayResults.length - 1], 0, 0, canvas.width * 2 / 3, canvas.height);
			//fitText(context, "それぞれ", 0, 0, canvas.width*2/3, canvas.height*.2);
			//fitText(context, displayResults[displayResults.length - 1], 0, canvas.height*.2, canvas.width * 2 / 3, canvas.height*.8);
		}
		displayResults.slice(0, displayResults.length - 1).forEach(function (e, i, a) {
			//if (top.includes(game.results[i])) {
			if (i == topIndex) {
				context.fillStyle = "yellow";
			} else {
				context.fillStyle = "black";
			}
			fitText(context, e, canvas.width * 2 / 3, i * canvas.height / a.length, canvas.width / 3, canvas.height / a.length);
		});

		context.fillStyle = prevFillStyle;
	};

	view.takedown = function () {
		Mousetrap.unbind("enter");
		Mousetrap.unbind("d");
	};

	return view;
});
