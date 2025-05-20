define(function (require) {
	var HatDraw = require("HatDraw");
	var fitText = require("fitText");
	var Mousetrap = require("mousetrap.min");

	var view = {};
	view.grade = 5;
	view.unit = 5;
	view.part = 1;
	view.description = "Particolored Shapes";
	var colorHD, shapeHD;
	var cue = {};
	var amount = 5;
	var backgroundColor = "hsl(272,50%,50%)";
	var setupDone = false;

	function drawRectangle(context, x, y, w, h, a, padding) {
		context.save();
		context.translate(x + w / 2, y + h / 2);
		context.rotate(a);
		context.fillRect(
			-w * (1 - padding) / 2,
			-(w / 2) * (1 - padding) / 2,
			w * (1 - padding),
			w / 2 * (1 - padding)
		)
		context.restore();
	}

	function drawSquare(context, x, y, w, h, a, padding) {
		context.save();
		context.translate(x + w / 2, y + h / 2);
		context.rotate(a);
		var sideLength = w > h ? h : w;
		context.fillRect(
			-sideLength * (1 - padding) / 2,
			-sideLength * (1 - padding) / 2,
			sideLength * (1 - padding),
			sideLength * (1 - padding)
		)
		context.restore();
	}

	function drawCircle(context, x, y, w, h, a, padding) {
		context.save();
		context.translate(x + w / 2, y + h / 2)
		context.beginPath();
		var radius = w > h ? h / 2 : w / 2;
		context.arc(
			0,
			0,
			radius * (1 - padding),
			0,
			Math.PI * 2,
			false
		);
		context.fill();
		context.restore();
	}

	function drawTriangle(context, x, y, w, h, a, padding) {
		context.save();
		context.translate(x + w / 2, y + h / 2)
		context.translate(0, h / 12);
		context.rotate(a);
		var sideLength = w > h ? h / 2 : w / 2;
		let angle = -Math.PI / 2;
		context.beginPath();
		context.moveTo(Math.cos(angle) * sideLength, Math.sin(angle) * sideLength);
		angle -= Math.PI * 2 / 3;
		context.lineTo(Math.cos(angle) * sideLength, Math.sin(angle) * sideLength);
		angle -= Math.PI * 2 / 3;
		context.lineTo(Math.cos(angle) * sideLength, Math.sin(angle) * sideLength);
		angle -= Math.PI * 2 / 3;
		context.lineTo(Math.cos(angle) * sideLength, Math.sin(angle) * sideLength);
		context.fill();
		context.restore();
	}

	function drawDiamond(context, x, y, w, h, a, padding) {
		context.save();
		context.translate(x + w / 2, y + h / 2)
		context.rotate(a);
		var unit = h > w * 2 ? (1 - padding) * w : (1 - padding) * h / 2;
		context.beginPath();
		context.moveTo(0, -unit);
		context.lineTo(-unit / 2, 0);
		context.lineTo(0, unit);
		context.lineTo(unit / 2, 0);
		context.lineTo(0, -unit);
		context.fill();
		context.restore();
	}

	function drawStar(context, x, y, w, h, a, padding) {
		context.save();
		context.translate(x + w / 2, y + h / 2)
		context.rotate(a);
		var radius1 = h > w ? (1 - padding) * w / 1.7 : (1 - padding) * h / 1.7;
		var radius2 = radius1 * .4;
		let angle = -Math.PI / 2;
		context.beginPath();
		context.moveTo(Math.cos(angle) * radius1, Math.sin(angle) * radius1);
		angle -= Math.PI * 2 / 10;
		context.lineTo(Math.cos(angle) * radius2, Math.sin(angle) * radius2);
		angle -= Math.PI * 2 / 10;
		context.lineTo(Math.cos(angle) * radius1, Math.sin(angle) * radius1);
		angle -= Math.PI * 2 / 10;
		context.lineTo(Math.cos(angle) * radius2, Math.sin(angle) * radius2);
		angle -= Math.PI * 2 / 10;
		context.lineTo(Math.cos(angle) * radius1, Math.sin(angle) * radius1);
		angle -= Math.PI * 2 / 10;
		context.lineTo(Math.cos(angle) * radius2, Math.sin(angle) * radius2);
		angle -= Math.PI * 2 / 10;
		context.lineTo(Math.cos(angle) * radius1, Math.sin(angle) * radius1);
		angle -= Math.PI * 2 / 10;
		context.lineTo(Math.cos(angle) * radius2, Math.sin(angle) * radius2);
		angle -= Math.PI * 2 / 10;
		context.lineTo(Math.cos(angle) * radius1, Math.sin(angle) * radius1);
		angle -= Math.PI * 2 / 10;
		context.lineTo(Math.cos(angle) * radius2, Math.sin(angle) * radius2);
		context.fill();
		context.restore();
	}

	function drawHeart(context, x, y, w, h, a, padding) {
		context.save();
		context.translate(x + w / 2, y + h * .4)
		context.rotate(a);
		context.beginPath();
		var size = w > h ? (1 - padding) * h / 2 : (1 - padding) * w / 2;
		context.moveTo(size, 0);
		context.arc(
			size / 2,
			0,
			size / 2 ,
			0,
			Math.PI,
			true
		);
		context.arc(
			-size / 2,
			0,
			size / 2 ,
			0,
			Math.PI,
			true
		);
		context.bezierCurveTo(-size, size / 2, -size / 2, size / 2, 0, size * 3 / 2);
		context.bezierCurveTo(size / 2, size / 2, size, size / 2, size, 0);
		context.lineTo(size, 0);
		context.fill();
		context.restore();
	}

	var makeCue = function () {
		var shape = shapeHD.drawOne();
		var colors = [];
		var angles = [];
		for (var i=0; i<amount; i++) {
			angles.push(Math.PI / 4 * Math.random() - Math.PI / 8);
			var color = colorHD.drawOne();
			if (color === "brown") {
				color = "sienna";
			} else if (color === "pink") {
				color = "deepPink";
			} else if (color === "orange") {
				color = "darkOrange";
			} else {
				color = color;
			}
			colors.push(color);
		}
		cue = {
			text: shape,
			render: function () {
				var canvas = game.canvas;
				var context = game.context;
				//background
				//if (colors.indexOf("black") !== 0 && colors.indexOf("white") !== 0) {
					//context.fillStyle = "gray";
				//} else {
					//context.fillStyle = "black";
				//}
				context.fillStyle = "DarkSlateGray";
				context.fillRect(0, 0, canvas.width, canvas.height);
				//shapes
				for (var i=0; i<amount; i++) {
					context.fillStyle = colors[i];
					if (shape === "circle") {drawCircle(context, i * canvas.width / amount, 0, canvas.width / amount, canvas.height / 2, angles[i], .3);}
					else if (shape === "triangle") {drawTriangle(context, i * canvas.width / amount, 0, canvas.width / amount, canvas.height / 2, angles[i], .3);}
					else if (shape === "square") {drawSquare(context, i * canvas.width / amount, 0, canvas.width / amount, canvas.height / 2, angles[i], .3);}
					else if (shape === "diamond") {drawDiamond(context, i * canvas.width / amount, 0, canvas.width / amount, canvas.height / 2, angles[i], .3);}
					else if (shape === "rectangle") {drawRectangle(context, i * canvas.width / amount, 0, canvas.width / amount, canvas.height / 2, angles[i], .3);}
					else if (shape === "heart") {drawHeart(context, i * canvas.width / amount, 0, canvas.width / amount, canvas.height / 2, angles[i], .3);}
					else if (shape === "star") {drawStar(context, i * canvas.width / amount, 0, canvas.width / amount, canvas.height / 2, angles[i], .3);}
				}
				//text
				//if (color === "black") {
				//	context.fillStyle = "black";
				//} else {
				//	context.fillStyle = "white";
				//}
				context.fillStyle = "white";
				fitText(context, amount === 1 ? this.text : this.text + "s", 0, canvas.height / 2, canvas.width, canvas.height / 2);
			}
		}
		console.log(colors);
	}

	view.setup = function () {
		if (!setupDone) {
			var amounts = [1, 2, 3, 4, 5];
			var colors = [
				"red",
				"yellow",
				"blue",
				"green",
				"pink",
				"black",
				"white",
				"orange",
				"purple",
				"brown"
			];
			var shapes = [
				"circle",
				"triangle",
				"square",
				"diamond",
				"rectangle",
				"heart",
				"star"
			];
			amountHD = new HatDraw(amounts);
			colorHD = new HatDraw(colors);
			shapeHD = new HatDraw(shapes);
			setupDone = true;
		}
		makeCue();
		for (let i=1; i<=5; i++) {
			Mousetrap.bind(i.toString(), function () {
				amount = i;
			});
		}
		Mousetrap.bind("5", function () {
			amount = 5;
		});
		Mousetrap.bind("space", function () {
			makeCue();
		});
		Mousetrap.bind("enter", function () {
			game.state.finish();
		});
	};

	view.render = function () {
		var canvas = game.canvas;
		var context = game.context;
		cue.render();
	};

	view.update = function () {};
	view.takedown = function () {Mousetrap.unbind("space");};

	return view;
});
