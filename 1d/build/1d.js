/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _Canvas2d = __webpack_require__(1);
	
	var _Canvas2d2 = _interopRequireDefault(_Canvas2d);
	
	var _Generation = __webpack_require__(2);
	
	var _Generation2 = _interopRequireDefault(_Generation);
	
	var _Rule = __webpack_require__(3);
	
	var _Rule2 = _interopRequireDefault(_Rule);
	
	var _Renderer1d = __webpack_require__(4);
	
	var _Renderer1d2 = _interopRequireDefault(_Renderer1d);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Interesting rules: 30, 45, 90, 110
	
	var renderer = void 0,
	    worldSize = void 0,
	    rule = void 0,
	    timer = null;
	
	var c = new _Canvas2d2.default("content");
	c.fitwindow();
	
	Restart();
	
	function Restart() {
	  Init();
	  Evolve();
	}
	
	function Init() {
	  var _ref = [document.getElementById("txtSize"), document.getElementById("txtRule")],
	      ts = _ref[0],
	      tr = _ref[1];
	  // clamp values into range
	
	  var s = Math.max(Math.min(ts.value, 32), 1);
	  var r = Math.max(Math.min(tr.value, 255), 1);
	
	  s = isNaN(s) ? 4 : s;
	  r = isNaN(r) ? 90 : r;
	
	  var _ref2 = [s, r];
	  ts.value = _ref2[0];
	  tr.value = _ref2[1];
	
	
	  renderer = new _Renderer1d2.default(c, s);
	  rule = new _Rule2.default(r);
	
	  worldSize = Math.floor(c.width() / s);
	
	  if (timer) window.clearInterval(timer);
	
	  c.clear();
	}
	
	function Evolve() {
	  c.fitwindow();
	  c.clear();
	
	  // Create the first generation
	  var g = new _Generation2.default(worldSize);
	
	  var iteration = 0;
	  // Render first gen now
	  renderer.render(g, iteration++);
	
	  // For 2d+ version use requestAnimationFrame()
	  timer = window.setInterval(function () {
	
	    // Mutate the last generation into a new one
	    g = g.mutate(rule);
	    renderer.render(g, iteration++);
	  }, 25);
	}
	
	document.getElementById("btnRun").onclick = function () {
	  Restart();
	};
	
	window.onresize = function (e) {
	  Restart();
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	// Boilerplate functions to write to the Canvas
	
	var Canvas2d = function () {
	  function Canvas2d(parent) {
	    _classCallCheck(this, Canvas2d);
	
	    this.parent = typeof parent == 'string' ? document.getElementById(parent) : parent;
	    this.element = document.createElement("canvas");
	    this.parent.appendChild(this.element);
	    this.context = this.element.getContext("2d");
	    this.clear();
	  }
	
	  _createClass(Canvas2d, [{
	    key: "block",
	    value: function block(x, y, w, h, c) {
	      var t = this.context;
	      t.beginPath();
	      t.rect(x, y, w, h);
	      t.fillStyle = c ? "rgb(" + c[0] + "," + c[1] + "," + c[2] + ")" : "black";
	      t.fill();
	    }
	  }, {
	    key: "selfblit",
	    value: function selfblit(sx, sy, sw, sh, dx, dy, dw, dh) {
	      this.context.drawImage(this.context.canvas, sx, sy, sw, sh, dx, dy, dw, dh);
	    }
	  }, {
	    key: "clear",
	    value: function clear(c) {
	      var t = this.context;
	      t.beginPath();
	      t.rect(0, 0, this.element.width, this.element.height);
	      t.fillStyle = c ? "rgb(" + c[0] + "," + c[1] + "," + c[2] + ")" : "white";
	      t.fill();
	    }
	  }, {
	    key: "width",
	    value: function width() {
	      return this.element.width;
	    }
	  }, {
	    key: "height",
	    value: function height() {
	      return this.element.height;
	    }
	  }, {
	    key: "fitwindow",
	    value: function fitwindow() {
	      this.resize(this.parent.clientWidth, this.parent.clientHeight);
	    }
	  }, {
	    key: "resize",
	    value: function resize(w, h) {
	
	      this.element.width = w;
	      this.element.height = h;
	
	      // draw()
	    }
	  }]);
	
	  return Canvas2d;
	}();
	
	exports.default = Canvas2d;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Generation = function () {
	  function Generation(size, randomise) {
	    _classCallCheck(this, Generation);
	
	    this.size = size;
	    this.init();
	  }
	
	  _createClass(Generation, [{
	    key: "init",
	    value: function init(randomise) {
	      // Array of zeroes
	      this.data = Array.from(new Array(this.size), function () {
	        return 0;
	      });
	
	      // Stick a 1 in the middle
	      this.data[Math.round(this.size / 2)] = 1;
	
	      if (randomise) // wow
	        for (var t = 0; t < this.data.length; t++) {
	          this.data[t] = Math.round(Math.random());
	        }
	    }
	  }, {
	    key: "mutate",
	    value: function mutate(rule, wrap) {
	      // Create a new, blank, generation to write into
	      var n = new Generation(this.size);
	
	      // Look at each 'lifeform' in our generation's world
	      for (var t = 0; t < this.data.length; t++) {
	        // Get its neighbours, wrapping the edge cases
	        var prev = t - 1 < 0 ? this.data.length - 1 : t - 1;
	        var next = t + 1 > this.data.length - 1 ? 0 : t + 1;
	
	        var l = this.data[prev];
	        var c = this.data[t];
	        var r = this.data[next];
	
	        // Create a 3-bit integer from the bit pattern
	        var pattern = (l & 1) << 2 | (c & 1) << 1 | r & 1;
	
	        // Apply the rule to this pattern
	        var nextgen = rule.apply(pattern);
	
	        // Put the mutated 'lifeform' into the next generation
	        n.data[t] = nextgen;
	      }
	
	      // Disable wrapping
	      if (!wrap) {
	        n.data[0] = this.data[0];
	        n.data[n.data.length - 1] = this.data[this.data.length - 1];
	      }
	
	      // return the next generation
	      return n;
	    }
	  }]);
	
	  return Generation;
	}();
	
	exports.default = Generation;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Rule = function () {
	  function Rule(seed) {
	    _classCallCheck(this, Rule);
	
	    this.seed = seed & 0xff;
	  }
	
	  _createClass(Rule, [{
	    key: "apply",
	    value: function apply(n) {
	      // n is a number from 0 - 7 and indicates the Bit of our rule to apply
	      //console.log(`Shifting value ${this.seed} >> ${n} times`);
	      return this.seed >> n & 1;
	    }
	  }]);
	
	  return Rule;
	}();
	
	exports.default = Rule;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Renderer1d = function () {
	  // size = square size of the block in pixels
	  function Renderer1d(canvas2d, size) {
	    _classCallCheck(this, Renderer1d);
	
	    this.canvas2d = canvas2d;
	    this.size = size;
	  }
	
	  // Draw a row of blocks
	
	
	  _createClass(Renderer1d, [{
	    key: "render",
	    value: function render(generation, iteration) {
	      var vheight = this.canvas2d.height();
	      var vwidth = this.canvas2d.width();
	
	      var maxrow = Math.floor(vheight / this.size) - 1;
	
	      var y = iteration * this.size;
	
	      // Iteration exceeds screen space...
	      if (iteration > maxrow) {
	        // Copy the whole screen and shift it up one block size
	        var x1 = 0,
	            y1 = this.size;
	        var w = vwidth,
	            h = vheight - this.size;
	        this.canvas2d.selfblit(x1, y1, w, h, 0, 0, w, h);
	
	        // adjust iteration to the bottom most row
	        iteration = maxrow;
	        y = iteration * this.size;
	
	        // Clear the last row ready for drawing
	        this.canvas2d.block(0, y, vwidth, this.size, [255, 255, 255]);
	      }
	
	      for (var _w = 0; _w < generation.data.length - 1; _w++) {
	        var x = _w * this.size;
	        if (generation.data[_w]) this.canvas2d.block(x, y, this.size, this.size);
	      }
	    }
	  }]);
	
	  return Renderer1d;
	}();
	
	exports.default = Renderer1d;

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDc1NDk5Y2M1YTllZDBjOWYyZWMiLCJ3ZWJwYWNrOi8vLy4vMWQvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9zaGFyZWQvQ2FudmFzMmQuanMiLCJ3ZWJwYWNrOi8vLy4vMWQvR2VuZXJhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi8xZC9SdWxlLmpzIiwid2VicGFjazovLy8uLzFkL1JlbmRlcmVyMWQuanMiXSwibmFtZXMiOlsicmVuZGVyZXIiLCJ3b3JsZFNpemUiLCJydWxlIiwidGltZXIiLCJjIiwiZml0d2luZG93IiwiUmVzdGFydCIsIkluaXQiLCJFdm9sdmUiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwidHMiLCJ0ciIsInMiLCJNYXRoIiwibWF4IiwibWluIiwidmFsdWUiLCJyIiwiaXNOYU4iLCJmbG9vciIsIndpZHRoIiwid2luZG93IiwiY2xlYXJJbnRlcnZhbCIsImNsZWFyIiwiZyIsIml0ZXJhdGlvbiIsInJlbmRlciIsInNldEludGVydmFsIiwibXV0YXRlIiwib25jbGljayIsIm9ucmVzaXplIiwiZSIsIkNhbnZhczJkIiwicGFyZW50IiwiZWxlbWVudCIsImNyZWF0ZUVsZW1lbnQiLCJhcHBlbmRDaGlsZCIsImNvbnRleHQiLCJnZXRDb250ZXh0IiwieCIsInkiLCJ3IiwiaCIsInQiLCJiZWdpblBhdGgiLCJyZWN0IiwiZmlsbFN0eWxlIiwiZmlsbCIsInN4Iiwic3kiLCJzdyIsInNoIiwiZHgiLCJkeSIsImR3IiwiZGgiLCJkcmF3SW1hZ2UiLCJjYW52YXMiLCJoZWlnaHQiLCJyZXNpemUiLCJjbGllbnRXaWR0aCIsImNsaWVudEhlaWdodCIsIkdlbmVyYXRpb24iLCJzaXplIiwicmFuZG9taXNlIiwiaW5pdCIsImRhdGEiLCJBcnJheSIsImZyb20iLCJyb3VuZCIsImxlbmd0aCIsInJhbmRvbSIsIndyYXAiLCJuIiwicHJldiIsIm5leHQiLCJsIiwicGF0dGVybiIsIm5leHRnZW4iLCJhcHBseSIsIlJ1bGUiLCJzZWVkIiwiUmVuZGVyZXIxZCIsImNhbnZhczJkIiwiZ2VuZXJhdGlvbiIsInZoZWlnaHQiLCJ2d2lkdGgiLCJtYXhyb3ciLCJ4MSIsInkxIiwic2VsZmJsaXQiLCJibG9jayJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQ25DQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBTEE7O0FBT0EsS0FBSUEsaUJBQUo7QUFBQSxLQUFjQyxrQkFBZDtBQUFBLEtBQXlCQyxhQUF6QjtBQUFBLEtBQStCQyxRQUFRLElBQXZDOztBQUVBLEtBQUlDLElBQUksdUJBQWEsU0FBYixDQUFSO0FBQ0FBLEdBQUVDLFNBQUY7O0FBRUFDOztBQUdBLFVBQVNBLE9BQVQsR0FDQTtBQUNFQztBQUNBQztBQUNEOztBQUVELFVBQVNELElBQVQsR0FDQTtBQUFBLGNBQ2lCLENBQUVFLFNBQVNDLGNBQVQsQ0FBd0IsU0FBeEIsQ0FBRixFQUNFRCxTQUFTQyxjQUFULENBQXdCLFNBQXhCLENBREYsQ0FEakI7QUFBQSxPQUNPQyxFQURQO0FBQUEsT0FDV0MsRUFEWDtBQUdFOztBQUNBLE9BQUlDLElBQUlDLEtBQUtDLEdBQUwsQ0FBU0QsS0FBS0UsR0FBTCxDQUFTTCxHQUFHTSxLQUFaLEVBQW1CLEVBQW5CLENBQVQsRUFBZ0MsQ0FBaEMsQ0FBUjtBQUNBLE9BQUlDLElBQUlKLEtBQUtDLEdBQUwsQ0FBU0QsS0FBS0UsR0FBTCxDQUFTSixHQUFHSyxLQUFaLEVBQW1CLEdBQW5CLENBQVQsRUFBaUMsQ0FBakMsQ0FBUjs7QUFFQUosT0FBSU0sTUFBTU4sQ0FBTixJQUFXLENBQVgsR0FBZUEsQ0FBbkI7QUFDQUss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aEQsQ0FBL0IsRUFBa0NDLENBQWxDLEVBQXFDLENBQXJDLEVBQXdDLENBQXhDLEVBQTJDRCxDQUEzQyxFQUE4Q0MsQ0FBOUM7O0FBRUE7QUFDQWpCLHFCQUFZOEQsTUFBWjtBQUNBL0MsYUFBSWYsWUFBWSxLQUFLc0MsSUFBckI7O0FBRUE7QUFDQSxjQUFLb0IsUUFBTCxDQUFjUSxLQUFkLENBQW9CLENBQXBCLEVBQXVCbkQsQ0FBdkIsRUFBMEI4QyxNQUExQixFQUFrQyxLQUFLdkIsSUFBdkMsRUFBNkMsQ0FBQyxHQUFELEVBQUssR0FBTCxFQUFTLEdBQVQsQ0FBN0M7QUFDRDs7QUFFRCxZQUFLLElBQUl0QixLQUFFLENBQVgsRUFBY0EsS0FBRTJDLFdBQVdsQixJQUFYLENBQWdCSSxNQUFoQixHQUF1QixDQUF2QyxFQUEwQzdCLElBQTFDLEVBQ0E7QUFDRSxhQUFJRixJQUFJRSxLQUFJLEtBQUtzQixJQUFqQjtBQUNBLGFBQUlxQixXQUFXbEIsSUFBWCxDQUFnQnpCLEVBQWhCLENBQUosRUFDRSxLQUFLMEMsUUFBTCxDQUFjUSxLQUFkLENBQW9CcEQsQ0FBcEIsRUFBdUJDLENBQXZCLEVBQTBCLEtBQUt1QixJQUEvQixFQUFxQyxLQUFLQSxJQUExQztBQUNIO0FBRUY7Ozs7OzttQkExQ2tCbUIsVSIsImZpbGUiOiIxZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAwNzU0OTljYzVhOWVkMGM5ZjJlYyIsIlxuLy8gSW50ZXJlc3RpbmcgcnVsZXM6IDMwLCA0NSwgOTAsIDExMFxuXG5pbXBvcnQgQ2FudmFzMmQgICAgIGZyb20gJy4uL3NoYXJlZC9DYW52YXMyZCc7XG5pbXBvcnQgR2VuZXJhdGlvbiAgIGZyb20gJy4vR2VuZXJhdGlvbic7XG5pbXBvcnQgUnVsZSAgICAgICAgIGZyb20gJy4vUnVsZSc7XG5pbXBvcnQgUmVuZGVyZXIxZCAgIGZyb20gJy4vUmVuZGVyZXIxZCc7XG5cbmxldCByZW5kZXJlciwgd29ybGRTaXplLCBydWxlLCB0aW1lciA9IG51bGw7XG5cbmxldCBjID0gbmV3IENhbnZhczJkKFwiY29udGVudFwiKTtcbmMuZml0d2luZG93KCk7XG5cblJlc3RhcnQoKTtcblxuXG5mdW5jdGlvbiBSZXN0YXJ0KClcbntcbiAgSW5pdCgpO1xuICBFdm9sdmUoKTtcbn1cblxuZnVuY3Rpb24gSW5pdCgpXG57XG4gIGxldCBbdHMsIHRyXSA9IFsgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0eHRTaXplXCIpLFxuICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidHh0UnVsZVwiKSBdO1xuICAvLyBjbGFtcCB2YWx1ZXMgaW50byByYW5nZVxuICBsZXQgcyA9IE1hdGgubWF4KE1hdGgubWluKHRzLnZhbHVlLCAzMiksMSk7XG4gIGxldCByID0gTWF0aC5tYXgoTWF0aC5taW4odHIudmFsdWUsIDI1NSksMSk7XG5cbiAgcyA9IGlzTmFOKHMpID8gNCA6IHM7XG4gIHIgPSBpc05hTihyKSA/IDkwOiByO1xuXG4gIFt0cy52YWx1ZSwgdHIudmFsdWVdID0gW3MsIHJdO1xuXG4gIHJlbmRlcmVyID0gbmV3IFJlbmRlcmVyMWQoYywgcyk7XG4gIHJ1bGUgPSBuZXcgUnVsZShyKTtcblxuICB3b3JsZFNpemUgPSBNYXRoLmZsb29yKGMud2lkdGgoKSAvIHMpO1xuXG4gIGlmICh0aW1lcikgd2luZG93LmNsZWFySW50ZXJ2YWwodGltZXIpO1xuXG4gIGMuY2xlYXIoKTtcbn1cblxuXG5mdW5jdGlvbiBFdm9sdmUoKVxue1xuICBjLmZpdHdpbmRvdygpO1xuICBjLmNsZWFyKCk7XG5cbiAgLy8gQ3JlYXRlIHRoZSBmaXJzdCBnZW5lcmF0aW9uXG4gIGxldCBnID0gbmV3IEdlbmVyYXRpb24od29ybGRTaXplKTtcblxuICBsZXQgaXRlcmF0aW9uID0gMDtcbiAgLy8gUmVuZGVyIGZpcnN0IGdlbiBub3dcbiAgcmVuZGVyZXIucmVuZGVyKGcsIGl0ZXJhdGlvbisrKTtcblxuICAvLyBGb3IgMmQrIHZlcnNpb24gdXNlIHJlcXVlc3RBbmltYXRpb25GcmFtZSgpXG4gIHRpbWVyID0gd2luZG93LnNldEludGVydmFsKCgpID0+IHtcblxuICAgIC8vIE11dGF0ZSB0aGUgbGFzdCBnZW5lcmF0aW9uIGludG8gYSBuZXcgb25lXG4gICAgZyA9IGcubXV0YXRlKHJ1bGUpO1xuICAgIHJlbmRlcmVyLnJlbmRlcihnLCBpdGVyYXRpb24rKyk7XG5cbiAgfSwgMjUpO1xuXG59XG5cblxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJidG5SdW5cIikub25jbGljayA9ICgpID0+IHtcbiAgUmVzdGFydCgpO1xufVxuXG5cbndpbmRvdy5vbnJlc2l6ZSA9IChlKSA9PiB7XG4gIFJlc3RhcnQoKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLzFkL21haW4uanMiLCJcblxuLy8gQm9pbGVycGxhdGUgZnVuY3Rpb25zIHRvIHdyaXRlIHRvIHRoZSBDYW52YXNcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FudmFzMmRcbntcbiAgY29uc3RydWN0b3IocGFyZW50KVxuICB7XG4gICAgdGhpcy5wYXJlbnQgPSB0eXBlb2YgcGFyZW50ID09ICdzdHJpbmcnID8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGFyZW50KSA6IHBhcmVudDtcbiAgICB0aGlzLmVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgIHRoaXMucGFyZW50LmFwcGVuZENoaWxkKHRoaXMuZWxlbWVudCk7XG4gICAgdGhpcy5jb250ZXh0ID0gdGhpcy5lbGVtZW50LmdldENvbnRleHQoXCIyZFwiKTtcbiAgICB0aGlzLmNsZWFyKCk7XG5cbiAgfVxuXG4gIGJsb2NrKHgseSx3LGgsYylcbiAge1xuICAgIGxldCB0ID0gdGhpcy5jb250ZXh0O1xuICAgIHQuYmVnaW5QYXRoKCk7XG4gICAgdC5yZWN0KHgsIHksIHcsIGgpO1xuICAgIHQuZmlsbFN0eWxlID0gYyA/IGByZ2IoJHtjWzBdfSwke2NbMV19LCR7Y1syXX0pYCA6IFwiYmxhY2tcIjtcbiAgICB0LmZpbGwoKTtcbiAgfVxuXG4gIHNlbGZibGl0KHN4LCBzeSwgc3csIHNoLCBkeCwgZHksIGR3LCBkaClcbiAge1xuICAgIHRoaXMuY29udGV4dC5kcmF3SW1hZ2UodGhpcy5jb250ZXh0LmNhbnZhcywgc3gsIHN5LCBzdywgc2gsIGR4LCBkeSwgZHcsIGRoKTtcbiAgfVxuXG4gIGNsZWFyKGMpXG4gIHtcbiAgICBsZXQgdCA9IHRoaXMuY29udGV4dDtcbiAgICB0LmJlZ2luUGF0aCgpO1xuICAgIHQucmVjdCgwLCAwLCB0aGlzLmVsZW1lbnQud2lkdGgsIHRoaXMuZWxlbWVudC5oZWlnaHQpO1xuICAgIHQuZmlsbFN0eWxlID0gYyA/IGByZ2IoJHtjWzBdfSwke2NbMV19LCR7Y1syXX0pYCA6IFwid2hpdGVcIjtcbiAgICB0LmZpbGwoKTtcbiAgfVxuXG4gIHdpZHRoKClcbiAge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnQud2lkdGg7XG4gIH1cblxuICBoZWlnaHQoKVxuICB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudC5oZWlnaHQ7XG4gIH1cblxuICBmaXR3aW5kb3coKVxuICB7XG4gICAgdGhpcy5yZXNpemUodGhpcy5wYXJlbnQuY2xpZW50V2lkdGgsIHRoaXMucGFyZW50LmNsaWVudEhlaWdodCk7XG4gIH1cblxuICByZXNpemUodywgaClcbiAge1xuXG4gICAgdGhpcy5lbGVtZW50LndpZHRoID0gdztcbiAgICB0aGlzLmVsZW1lbnQuaGVpZ2h0ID0gaDtcblxuICAgIC8vIGRyYXcoKVxuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zaGFyZWQvQ2FudmFzMmQuanMiLCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2VuZXJhdGlvblxue1xuICBjb25zdHJ1Y3RvcihzaXplLCByYW5kb21pc2UpXG4gIHtcbiAgICB0aGlzLnNpemUgPSBzaXplO1xuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgaW5pdChyYW5kb21pc2UpXG4gIHtcbiAgICAvLyBBcnJheSBvZiB6ZXJvZXNcbiAgICB0aGlzLmRhdGEgPSBBcnJheS5mcm9tKG5ldyBBcnJheSh0aGlzLnNpemUpLCAoKSA9PiAwKTtcblxuICAgIC8vIFN0aWNrIGEgMSBpbiB0aGUgbWlkZGxlXG4gICAgdGhpcy5kYXRhW01hdGgucm91bmQodGhpcy5zaXplLzIpXSA9IDE7XG5cbiAgICBpZiAocmFuZG9taXNlKSAvLyB3b3dcbiAgICAgIGZvciAobGV0IHQ9MDsgdDx0aGlzLmRhdGEubGVuZ3RoOyB0KyspXG4gICAgICAgIHRoaXMuZGF0YVt0XSA9IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSk7XG4gIH1cblxuXG4gIG11dGF0ZShydWxlLCB3cmFwKVxuICB7XG4gICAgLy8gQ3JlYXRlIGEgbmV3LCBibGFuaywgZ2VuZXJhdGlvbiB0byB3cml0ZSBpbnRvXG4gICAgbGV0IG4gPSBuZXcgR2VuZXJhdGlvbih0aGlzLnNpemUpO1xuXG4gICAgLy8gTG9vayBhdCBlYWNoICdsaWZlZm9ybScgaW4gb3VyIGdlbmVyYXRpb24ncyB3b3JsZFxuICAgIGZvciAobGV0IHQ9MDsgdDx0aGlzLmRhdGEubGVuZ3RoOyB0KyspXG4gICAge1xuICAgICAgLy8gR2V0IGl0cyBuZWlnaGJvdXJzLCB3cmFwcGluZyB0aGUgZWRnZSBjYXNlc1xuICAgICAgbGV0IHByZXYgPSB0LTEgPCAwID8gdGhpcy5kYXRhLmxlbmd0aC0xIDogdC0xO1xuICAgICAgbGV0IG5leHQgPSB0KzEgPiB0aGlzLmRhdGEubGVuZ3RoLTEgPyAwIDogdCsxO1xuXG4gICAgICBsZXQgbCA9IHRoaXMuZGF0YVtwcmV2XTtcbiAgICAgIGxldCBjID0gdGhpcy5kYXRhW3RdO1xuICAgICAgbGV0IHIgPSB0aGlzLmRhdGFbbmV4dF07XG5cbiAgICAgIC8vIENyZWF0ZSBhIDMtYml0IGludGVnZXIgZnJvbSB0aGUgYml0IHBhdHRlcm5cbiAgICAgIGxldCBwYXR0ZXJuID0gKChsJjEpIDw8IDIpIHwgKChjJjEpIDw8IDEpIHwgKHImMSk7XG5cbiAgICAgIC8vIEFwcGx5IHRoZSBydWxlIHRvIHRoaXMgcGF0dGVyblxuICAgICAgbGV0IG5leHRnZW4gPSBydWxlLmFwcGx5KHBhdHRlcm4pO1xuXG4gICAgICAvLyBQdXQgdGhlIG11dGF0ZWQgJ2xpZmVmb3JtJyBpbnRvIHRoZSBuZXh0IGdlbmVyYXRpb25cbiAgICAgIG4uZGF0YVt0XSA9IG5leHRnZW47XG4gICAgfVxuXG4gICAgLy8gRGlzYWJsZSB3cmFwcGluZ1xuICAgIGlmICghd3JhcClcbiAgICB7XG4gICAgICBuLmRhdGFbMF0gPSB0aGlzLmRhdGFbMF07XG4gICAgICBuLmRhdGFbbi5kYXRhLmxlbmd0aC0xXSA9IHRoaXMuZGF0YVt0aGlzLmRhdGEubGVuZ3RoLTFdO1xuICAgIH1cblxuICAgIC8vIHJldHVybiB0aGUgbmV4dCBnZW5lcmF0aW9uXG4gICAgcmV0dXJuIG47XG4gIH1cblxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi8xZC9HZW5lcmF0aW9uLmpzIiwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJ1bGVcbntcbiAgY29uc3RydWN0b3Ioc2VlZClcbiAge1xuICAgIHRoaXMuc2VlZCA9IHNlZWQgJiAweGZmO1xuXG4gIH1cblxuICBhcHBseShuKVxuICB7XG4gICAgLy8gbiBpcyBhIG51bWJlciBmcm9tIDAgLSA3IGFuZCBpbmRpY2F0ZXMgdGhlIEJpdCBvZiBvdXIgcnVsZSB0byBhcHBseVxuICAgIC8vY29uc29sZS5sb2coYFNoaWZ0aW5nIHZhbHVlICR7dGhpcy5zZWVkfSA+PiAke259IHRpbWVzYCk7XG4gICAgcmV0dXJuICgodGhpcy5zZWVkID4+IG4pICYgMSk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLzFkL1J1bGUuanMiLCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVuZGVyZXIxZFxue1xuICAvLyBzaXplID0gc3F1YXJlIHNpemUgb2YgdGhlIGJsb2NrIGluIHBpeGVsc1xuICBjb25zdHJ1Y3RvcihjYW52YXMyZCwgc2l6ZSlcbiAge1xuICAgIHRoaXMuY2FudmFzMmQgPSBjYW52YXMyZDtcbiAgICB0aGlzLnNpemUgPSBzaXplO1xuICB9XG5cbiAgLy8gRHJhdyBhIHJvdyBvZiBibG9ja3NcbiAgcmVuZGVyKGdlbmVyYXRpb24sIGl0ZXJhdGlvbilcbiAge1xuICAgIGxldCB2aGVpZ2h0ID0gdGhpcy5jYW52YXMyZC5oZWlnaHQoKTtcbiAgICBsZXQgdndpZHRoID0gdGhpcy5jYW52YXMyZC53aWR0aCgpO1xuXG4gICAgbGV0IG1heHJvdyA9IChNYXRoLmZsb29yKHZoZWlnaHQgLyB0aGlzLnNpemUpKSAtIDE7XG5cbiAgICBsZXQgeSA9IGl0ZXJhdGlvbiAqIHRoaXMuc2l6ZTtcblxuICAgIC8vIEl0ZXJhdGlvbiBleGNlZWRzIHNjcmVlbiBzcGFjZS4uLlxuICAgIGlmIChpdGVyYXRpb24gPiBtYXhyb3cpXG4gICAge1xuICAgICAgLy8gQ29weSB0aGUgd2hvbGUgc2NyZWVuIGFuZCBzaGlmdCBpdCB1cCBvbmUgYmxvY2sgc2l6ZVxuICAgICAgbGV0IHgxID0gMCwgeTEgPSB0aGlzLnNpemU7XG4gICAgICBsZXQgdyA9IHZ3aWR0aCwgaCA9IHZoZWlnaHQgLSB0aGlzLnNpemU7XG4gICAgICB0aGlzLmNhbnZhczJkLnNlbGZibGl0KHgxLCB5MSwgdywgaCwgMCwgMCwgdywgaCk7XG5cbiAgICAgIC8vIGFkanVzdCBpdGVyYXRpb24gdG8gdGhlIGJvdHRvbSBtb3N0IHJvd1xuICAgICAgaXRlcmF0aW9uID0gbWF4cm93O1xuICAgICAgeSA9IGl0ZXJhdGlvbiAqIHRoaXMuc2l6ZTtcblxuICAgICAgLy8gQ2xlYXIgdGhlIGxhc3Qgcm93IHJlYWR5IGZvciBkcmF3aW5nXG4gICAgICB0aGlzLmNhbnZhczJkLmJsb2NrKDAsIHksIHZ3aWR0aCwgdGhpcy5zaXplLCBbMjU1LDI1NSwyNTVdKTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCB3PTA7IHc8Z2VuZXJhdGlvbi5kYXRhLmxlbmd0aC0xOyB3KyspXG4gICAge1xuICAgICAgbGV0IHggPSB3ICogdGhpcy5zaXplO1xuICAgICAgaWYgKGdlbmVyYXRpb24uZGF0YVt3XSlcbiAgICAgICAgdGhpcy5jYW52YXMyZC5ibG9jayh4LCB5LCB0aGlzLnNpemUsIHRoaXMuc2l6ZSk7XG4gICAgfVxuXG4gIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vMWQvUmVuZGVyZXIxZC5qcyJdLCJzb3VyY2VSb290IjoiIn0=