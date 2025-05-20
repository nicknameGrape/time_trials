define(function (require) {
	var Loader = require("Loader");
	var HatDraw = require("HatDraw");
	//var imageLibrary = require("image_library/images");
	var imageSearch = require("image_library/imageSearch");
	var imageLibrary = imageSearch.imageLibrary;
	var fitText = require("fitText");
	var fitImage = require("fitImage");
	var Mousetrap = require("mousetrap.min");
	
	if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, 'includes', {
    value: function(searchElement, fromIndex) {

      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      // 1. Let O be ? ToObject(this value).
      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If len is 0, return false.
      if (len === 0) {
        return false;
      }

      // 4. Let n be ? ToInteger(fromIndex).
      //    (If fromIndex is undefined, this step produces the value 0.)
      var n = fromIndex | 0;

      // 5. If n ? 0, then
      //  a. Let k be n.
      // 6. Else n < 0,
      //  a. Let k be len + n.
      //  b. If k < 0, let k be 0.
      var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

      function sameValueZero(x, y) {
        return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
      }

      // 7. Repeat, while k < len
      while (k < len) {
        // a. Let elementK be the result of ? Get(O, ! ToString(k)).
        // b. If SameValueZero(searchElement, elementK) is true, return true.
        if (sameValueZero(o[k], searchElement)) {
          return true;
        }
        // c. Increase k by 1. 
        k++;
      }

      // 8. Return false
      return false;
    }
  });
}

	var view = {};
	view.description = "How's the weather?";
	var cue = {};
	var cueIsQ = true;
	var progress;
	var backgroundColor = "hsl(272,50%,50%)";
	var setupDone = false;
	var model;
	var loader = new Loader("modules/img/");

	var weather, weatherHD;

	var makeCue = function () {
		if (cueIsQ) {
			cue = {};
			cue.render = function () {
				var canvas = game.canvas;
				var context = game.context;
				fitText(context, "How's the weather?", 0, 0, canvas.width, canvas.height);
			};
		} else {
			var todaysWeather = weatherHD.drawOne();
			console.log(todaysWeather);
			cue = {
				img: todaysWeather
			}
			cue.render = function () {
				var canvas = game.canvas;
				var context = game.context;
				fitImage(context, this.img, 0, 0, canvas.width, canvas.height);
				//context.globalAlpha = .4;
				//context.fillStyle = "yellow";
				//fitText(context, "?", 0, 0, canvas.width, canvas.height / 2);
				//context.fillStyle = "white";
				//context.globalAlpha = 1;
				//fitText(context, "Do you like " + this.text + "?", 0, canvas.height / 2, canvas.width, canvas.height / 2);
			};
		}
		cueIsQ = !cueIsQ;
	}

	view.setup = function () {
		if (!setupDone) {
			weather = [];
			weather.push(loader.newImageAsset("sunny.png"));
			weather.push(loader.newImageAsset("rainy.png"));
			weather.push(loader.newImageAsset("cloudy.png"));
			weather.push(loader.newImageAsset("snowing.png"));
			weatherHD = new HatDraw(weather);

			setupDone = true;
		}
		makeCue();
		progress = 0;
		Mousetrap.bind("space", function () {
			progress++;
			backgroundColor = "hsl(" + (Math.random() * 360).toString() + ",50%,50%)"
			makeCue();
		});
		Mousetrap.bind("enter", function () {
			progress++;
			game.state.finish();
		});
	};

	view.render = function () {
		var canvas = game.canvas;
		var context = game.context;

		context.fillStyle = backgroundColor;
		context.fillRect(0, 0, canvas.width, canvas.height);
		context.fillStyle = "white";
		cue.render();
	};

	view.update = function () {};
	view.takedown = function () {Mousetrap.unbind("space");};

	return view;
});
