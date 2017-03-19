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
	
	var _Canvas2d = __webpack_require__(5);
	
	var _Canvas2d2 = _interopRequireDefault(_Canvas2d);
	
	var _Generation = __webpack_require__(2);
	
	var _Generation2 = _interopRequireDefault(_Generation);
	
	var _Rule = __webpack_require__(3);
	
	var _Rule2 = _interopRequireDefault(_Rule);
	
	var _Renderer1d = __webpack_require__(6);
	
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
/* 1 */,
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
/* 4 */,
/* 5 */
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
/* 6 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZTExYTJjYmFkYWQxNmRkMDVlNzUiLCJ3ZWJwYWNrOi8vLy4vMWQvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi8xZC9HZW5lcmF0aW9uLmpzIiwid2VicGFjazovLy8uLzFkL1J1bGUuanMiLCJ3ZWJwYWNrOi8vLy4vc2hhcmVkL0NhbnZhczJkLmpzIiwid2VicGFjazovLy8uLzFkL1JlbmRlcmVyMWQuanMiXSwibmFtZXMiOlsicmVuZGVyZXIiLCJ3b3JsZFNpemUiLCJydWxlIiwidGltZXIiLCJjIiwiZml0d2luZG93IiwiUmVzdGFydCIsIkluaXQiLCJFdm9sdmUiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwidHMiLCJ0ciIsInMiLCJNYXRoIiwibWF4IiwibWluIiwidmFsdWUiLCJyIiwiaXNOYU4iLCJmbG9vciIsIndpZHRoIiwid2luZG93IiwiY2xlYXJJbnRlcnZhbCIsImNsZWFyIiwiZyIsIml0ZXJhdGlvbiIsInJlbmRlciIsInNldEludGVydmFsIiwibXV0YXRlIiwib25jbGljayIsIm9ucmVzaXplIiwiZSIsIkdlbmVyYXRpb24iLCJzaXplIiwicmFuZG9taXNlIiwiaW5pdCIsImRhdGEiLCJBcnJheSIsImZyb20iLCJyb3VuZCIsInQiLCJsZW5ndGgiLCJyYW5kb20iLCJ3cmFwIiwibiIsInByZXYiLCJuZXh0IiwibCIsInBhdHRlcm4iLCJuZXh0Z2VuIiwiYXBwbHkiLCJSdWxlIiwic2VlZCIsIkNhbnZhczJkIiwicGFyZW50IiwiZWxlbWVudCIsImNyZWF0ZUVsZW1lbnQiLCJhcHBlbmRDaGlsZCIsImNvbnRleHQiLCJnZXRDb250ZXh0IiwieCIsInkiLCJ3IiwiaCIsImJlZ2luUGF0aCIsInJlY3QiLCJmaWxsU3R5bGUiLCJmaWxsIiwic3giLCJzeSIsInN3Iiwic2giLCJkeCIsImR5IiwiZHciLCJkaCIsImRyYXdJbWFnZSIsImNhbnZhcyIsImhlaWdodCIsInJlc2l6ZSIsImNsaWVudFdpZHRoIiwiY2xpZW50SGVpZ2h0IiwiUmVuZGVyZXIxZCIsImNhbnZhczJkIiwiZ2VuZXJhdGlvbiIsInZoZWlnaHQiLCJ2d2lkdGgiLCJtYXhyb3ciLCJ4MSIsInkxIiwic2VsZmJsaXQiLCJibG9jayJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQ25DQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBTEE7O0FBT0EsS0FBSUEsaUJBQUo7QUFBQSxLQUFjQyxrQkFBZDtBQUFBLEtBQXlCQyxhQUF6QjtBQUFBLEtBQStCQyxRQUFRLElBQXZDOztBQUVBLEtBQUlDLElBQUksdUJBQWEsU0FBYixDQUFSO0FBQ0FBLEdBQUVDLFNBQUY7O0FBRUFDOztBQUdBLFVBQVNBLE9BQVQsR0FDQTtBQUNFQztBQUNBQztBQUNEOztBQUVELFVBQVNELElBQVQsR0FDQTtBQUFBLGNBQ2lCLENBQUVFLFNBQVNDLGNBQVQsQ0FBd0IsU0FBeEIsQ0FBRixFQUNFRCxTQUFTQyxjQUFULENBQXdCLFNBQXhCLENBREYsQ0FEakI7QUFBQSxPQUNPQyxFQURQO0FBQUEsT0FDV0MsRUFEWDtBQUdFOztBQUNBLE9BQUlDLElBQUlDLEtBQUtDLEdBQUwsQ0FBU0QsS0FBS0UsR0FBTCxDQUFTTCxHQUFHTSxLQUFaLEVBQW1CLEVBQW5CLENBQVQsRUFBZ0MsQ0FBaEMsQ0FBUjtBQUNBLE9BQUlDLElBQUlKLEtBQUtDLEdBQUwsQ0FBU0QsS0FBS0UsR0FBTCxDQUFTSixHQUFHSyxLQUFaLEVBQW1CLEdBQW5CLENBQVQsRUFBaUMsQ0FBakMsQ0FBUjs7QUFFQUosT0FBSU0sTUFBTU4sQ0FBTixJQUFXLENBQVgsR0FBZUEsQ0FBbkI7QUFDQUss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K0IzQixDQUEvQixFQUFrQ0MsQ0FBbEMsRUFBcUMsQ0FBckMsRUFBd0MsQ0FBeEMsRUFBMkNELENBQTNDLEVBQThDQyxDQUE5Qzs7QUFFQTtBQUNBdEMscUJBQVk4RCxNQUFaO0FBQ0ExQixhQUFJcEMsWUFBWSxLQUFLUSxJQUFyQjs7QUFFQTtBQUNBLGNBQUtrRCxRQUFMLENBQWNRLEtBQWQsQ0FBb0IsQ0FBcEIsRUFBdUI5QixDQUF2QixFQUEwQnlCLE1BQTFCLEVBQWtDLEtBQUtyRCxJQUF2QyxFQUE2QyxDQUFDLEdBQUQsRUFBSyxHQUFMLEVBQVMsR0FBVCxDQUE3QztBQUNEOztBQUVELFlBQUssSUFBSTZCLEtBQUUsQ0FBWCxFQUFjQSxLQUFFc0IsV0FBV2hELElBQVgsQ0FBZ0JLLE1BQWhCLEdBQXVCLENBQXZDLEVBQTBDcUIsSUFBMUMsRUFDQTtBQUNFLGFBQUlGLElBQUlFLEtBQUksS0FBSzdCLElBQWpCO0FBQ0EsYUFBSW1ELFdBQVdoRCxJQUFYLENBQWdCMEIsRUFBaEIsQ0FBSixFQUNFLEtBQUtxQixRQUFMLENBQWNRLEtBQWQsQ0FBb0IvQixDQUFwQixFQUF1QkMsQ0FBdkIsRUFBMEIsS0FBSzVCLElBQS9CLEVBQXFDLEtBQUtBLElBQTFDO0FBQ0g7QUFFRjs7Ozs7O21CQTFDa0JpRCxVIiwiZmlsZSI6IjFkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGUxMWEyY2JhZGFkMTZkZDA1ZTc1IiwiXG4vLyBJbnRlcmVzdGluZyBydWxlczogMzAsIDQ1LCA5MCwgMTEwXG5cbmltcG9ydCBDYW52YXMyZCAgICAgZnJvbSAnLi4vc2hhcmVkL0NhbnZhczJkJztcbmltcG9ydCBHZW5lcmF0aW9uICAgZnJvbSAnLi9HZW5lcmF0aW9uJztcbmltcG9ydCBSdWxlICAgICAgICAgZnJvbSAnLi9SdWxlJztcbmltcG9ydCBSZW5kZXJlcjFkICAgZnJvbSAnLi9SZW5kZXJlcjFkJztcblxubGV0IHJlbmRlcmVyLCB3b3JsZFNpemUsIHJ1bGUsIHRpbWVyID0gbnVsbDtcblxubGV0IGMgPSBuZXcgQ2FudmFzMmQoXCJjb250ZW50XCIpO1xuYy5maXR3aW5kb3coKTtcblxuUmVzdGFydCgpO1xuXG5cbmZ1bmN0aW9uIFJlc3RhcnQoKVxue1xuICBJbml0KCk7XG4gIEV2b2x2ZSgpO1xufVxuXG5mdW5jdGlvbiBJbml0KClcbntcbiAgbGV0IFt0cywgdHJdID0gWyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInR4dFNpemVcIiksXG4gICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0eHRSdWxlXCIpIF07XG4gIC8vIGNsYW1wIHZhbHVlcyBpbnRvIHJhbmdlXG4gIGxldCBzID0gTWF0aC5tYXgoTWF0aC5taW4odHMudmFsdWUsIDMyKSwxKTtcbiAgbGV0IHIgPSBNYXRoLm1heChNYXRoLm1pbih0ci52YWx1ZSwgMjU1KSwxKTtcblxuICBzID0gaXNOYU4ocykgPyA0IDogcztcbiAgciA9IGlzTmFOKHIpID8gOTA6IHI7XG5cbiAgW3RzLnZhbHVlLCB0ci52YWx1ZV0gPSBbcywgcl07XG5cbiAgcmVuZGVyZXIgPSBuZXcgUmVuZGVyZXIxZChjLCBzKTtcbiAgcnVsZSA9IG5ldyBSdWxlKHIpO1xuXG4gIHdvcmxkU2l6ZSA9IE1hdGguZmxvb3IoYy53aWR0aCgpIC8gcyk7XG5cbiAgaWYgKHRpbWVyKSB3aW5kb3cuY2xlYXJJbnRlcnZhbCh0aW1lcik7XG5cbiAgYy5jbGVhcigpO1xufVxuXG5cbmZ1bmN0aW9uIEV2b2x2ZSgpXG57XG4gIGMuZml0d2luZG93KCk7XG4gIGMuY2xlYXIoKTtcblxuICAvLyBDcmVhdGUgdGhlIGZpcnN0IGdlbmVyYXRpb25cbiAgbGV0IGcgPSBuZXcgR2VuZXJhdGlvbih3b3JsZFNpemUpO1xuXG4gIGxldCBpdGVyYXRpb24gPSAwO1xuICAvLyBSZW5kZXIgZmlyc3QgZ2VuIG5vd1xuICByZW5kZXJlci5yZW5kZXIoZywgaXRlcmF0aW9uKyspO1xuXG4gIC8vIEZvciAyZCsgdmVyc2lvbiB1c2UgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKClcbiAgdGltZXIgPSB3aW5kb3cuc2V0SW50ZXJ2YWwoKCkgPT4ge1xuXG4gICAgLy8gTXV0YXRlIHRoZSBsYXN0IGdlbmVyYXRpb24gaW50byBhIG5ldyBvbmVcbiAgICBnID0gZy5tdXRhdGUocnVsZSk7XG4gICAgcmVuZGVyZXIucmVuZGVyKGcsIGl0ZXJhdGlvbisrKTtcblxuICB9LCAyNSk7XG5cbn1cblxuXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJ0blJ1blwiKS5vbmNsaWNrID0gKCkgPT4ge1xuICBSZXN0YXJ0KCk7XG59XG5cblxud2luZG93Lm9ucmVzaXplID0gKGUpID0+IHtcbiAgUmVzdGFydCgpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vMWQvbWFpbi5qcyIsIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHZW5lcmF0aW9uXG57XG4gIGNvbnN0cnVjdG9yKHNpemUsIHJhbmRvbWlzZSlcbiAge1xuICAgIHRoaXMuc2l6ZSA9IHNpemU7XG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICBpbml0KHJhbmRvbWlzZSlcbiAge1xuICAgIC8vIEFycmF5IG9mIHplcm9lc1xuICAgIHRoaXMuZGF0YSA9IEFycmF5LmZyb20obmV3IEFycmF5KHRoaXMuc2l6ZSksICgpID0+IDApO1xuXG4gICAgLy8gU3RpY2sgYSAxIGluIHRoZSBtaWRkbGVcbiAgICB0aGlzLmRhdGFbTWF0aC5yb3VuZCh0aGlzLnNpemUvMildID0gMTtcblxuICAgIGlmIChyYW5kb21pc2UpIC8vIHdvd1xuICAgICAgZm9yIChsZXQgdD0wOyB0PHRoaXMuZGF0YS5sZW5ndGg7IHQrKylcbiAgICAgICAgdGhpcy5kYXRhW3RdID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKTtcbiAgfVxuXG5cbiAgbXV0YXRlKHJ1bGUsIHdyYXApXG4gIHtcbiAgICAvLyBDcmVhdGUgYSBuZXcsIGJsYW5rLCBnZW5lcmF0aW9uIHRvIHdyaXRlIGludG9cbiAgICBsZXQgbiA9IG5ldyBHZW5lcmF0aW9uKHRoaXMuc2l6ZSk7XG5cbiAgICAvLyBMb29rIGF0IGVhY2ggJ2xpZmVmb3JtJyBpbiBvdXIgZ2VuZXJhdGlvbidzIHdvcmxkXG4gICAgZm9yIChsZXQgdD0wOyB0PHRoaXMuZGF0YS5sZW5ndGg7IHQrKylcbiAgICB7XG4gICAgICAvLyBHZXQgaXRzIG5laWdoYm91cnMsIHdyYXBwaW5nIHRoZSBlZGdlIGNhc2VzXG4gICAgICBsZXQgcHJldiA9IHQtMSA8IDAgPyB0aGlzLmRhdGEubGVuZ3RoLTEgOiB0LTE7XG4gICAgICBsZXQgbmV4dCA9IHQrMSA+IHRoaXMuZGF0YS5sZW5ndGgtMSA/IDAgOiB0KzE7XG5cbiAgICAgIGxldCBsID0gdGhpcy5kYXRhW3ByZXZdO1xuICAgICAgbGV0IGMgPSB0aGlzLmRhdGFbdF07XG4gICAgICBsZXQgciA9IHRoaXMuZGF0YVtuZXh0XTtcblxuICAgICAgLy8gQ3JlYXRlIGEgMy1iaXQgaW50ZWdlciBmcm9tIHRoZSBiaXQgcGF0dGVyblxuICAgICAgbGV0IHBhdHRlcm4gPSAoKGwmMSkgPDwgMikgfCAoKGMmMSkgPDwgMSkgfCAociYxKTtcblxuICAgICAgLy8gQXBwbHkgdGhlIHJ1bGUgdG8gdGhpcyBwYXR0ZXJuXG4gICAgICBsZXQgbmV4dGdlbiA9IHJ1bGUuYXBwbHkocGF0dGVybik7XG5cbiAgICAgIC8vIFB1dCB0aGUgbXV0YXRlZCAnbGlmZWZvcm0nIGludG8gdGhlIG5leHQgZ2VuZXJhdGlvblxuICAgICAgbi5kYXRhW3RdID0gbmV4dGdlbjtcbiAgICB9XG5cbiAgICAvLyBEaXNhYmxlIHdyYXBwaW5nXG4gICAgaWYgKCF3cmFwKVxuICAgIHtcbiAgICAgIG4uZGF0YVswXSA9IHRoaXMuZGF0YVswXTtcbiAgICAgIG4uZGF0YVtuLmRhdGEubGVuZ3RoLTFdID0gdGhpcy5kYXRhW3RoaXMuZGF0YS5sZW5ndGgtMV07XG4gICAgfVxuXG4gICAgLy8gcmV0dXJuIHRoZSBuZXh0IGdlbmVyYXRpb25cbiAgICByZXR1cm4gbjtcbiAgfVxuXG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLzFkL0dlbmVyYXRpb24uanMiLCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUnVsZVxue1xuICBjb25zdHJ1Y3RvcihzZWVkKVxuICB7XG4gICAgdGhpcy5zZWVkID0gc2VlZCAmIDB4ZmY7XG5cbiAgfVxuXG4gIGFwcGx5KG4pXG4gIHtcbiAgICAvLyBuIGlzIGEgbnVtYmVyIGZyb20gMCAtIDcgYW5kIGluZGljYXRlcyB0aGUgQml0IG9mIG91ciBydWxlIHRvIGFwcGx5XG4gICAgLy9jb25zb2xlLmxvZyhgU2hpZnRpbmcgdmFsdWUgJHt0aGlzLnNlZWR9ID4+ICR7bn0gdGltZXNgKTtcbiAgICByZXR1cm4gKCh0aGlzLnNlZWQgPj4gbikgJiAxKTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vMWQvUnVsZS5qcyIsIlxuXG4vLyBCb2lsZXJwbGF0ZSBmdW5jdGlvbnMgdG8gd3JpdGUgdG8gdGhlIENhbnZhc1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYW52YXMyZFxue1xuICBjb25zdHJ1Y3RvcihwYXJlbnQpXG4gIHtcbiAgICB0aGlzLnBhcmVudCA9IHR5cGVvZiBwYXJlbnQgPT0gJ3N0cmluZycgPyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwYXJlbnQpIDogcGFyZW50O1xuICAgIHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgdGhpcy5wYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50KTtcbiAgICB0aGlzLmNvbnRleHQgPSB0aGlzLmVsZW1lbnQuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIHRoaXMuY2xlYXIoKTtcblxuICB9XG5cbiAgYmxvY2soeCx5LHcsaCxjKVxuICB7XG4gICAgbGV0IHQgPSB0aGlzLmNvbnRleHQ7XG4gICAgdC5iZWdpblBhdGgoKTtcbiAgICB0LnJlY3QoeCwgeSwgdywgaCk7XG4gICAgdC5maWxsU3R5bGUgPSBjID8gYHJnYigke2NbMF19LCR7Y1sxXX0sJHtjWzJdfSlgIDogXCJibGFja1wiO1xuICAgIHQuZmlsbCgpO1xuICB9XG5cbiAgc2VsZmJsaXQoc3gsIHN5LCBzdywgc2gsIGR4LCBkeSwgZHcsIGRoKVxuICB7XG4gICAgdGhpcy5jb250ZXh0LmRyYXdJbWFnZSh0aGlzLmNvbnRleHQuY2FudmFzLCBzeCwgc3ksIHN3LCBzaCwgZHgsIGR5LCBkdywgZGgpO1xuICB9XG5cbiAgY2xlYXIoYylcbiAge1xuICAgIGxldCB0ID0gdGhpcy5jb250ZXh0O1xuICAgIHQuYmVnaW5QYXRoKCk7XG4gICAgdC5yZWN0KDAsIDAsIHRoaXMuZWxlbWVudC53aWR0aCwgdGhpcy5lbGVtZW50LmhlaWdodCk7XG4gICAgdC5maWxsU3R5bGUgPSBjID8gYHJnYigke2NbMF19LCR7Y1sxXX0sJHtjWzJdfSlgIDogXCJ3aGl0ZVwiO1xuICAgIHQuZmlsbCgpO1xuICB9XG5cbiAgd2lkdGgoKVxuICB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudC53aWR0aDtcbiAgfVxuXG4gIGhlaWdodCgpXG4gIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50LmhlaWdodDtcbiAgfVxuXG4gIGZpdHdpbmRvdygpXG4gIHtcbiAgICB0aGlzLnJlc2l6ZSh0aGlzLnBhcmVudC5jbGllbnRXaWR0aCwgdGhpcy5wYXJlbnQuY2xpZW50SGVpZ2h0KTtcbiAgfVxuXG4gIHJlc2l6ZSh3LCBoKVxuICB7XG5cbiAgICB0aGlzLmVsZW1lbnQud2lkdGggPSB3O1xuICAgIHRoaXMuZWxlbWVudC5oZWlnaHQgPSBoO1xuXG4gICAgLy8gZHJhdygpXG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NoYXJlZC9DYW52YXMyZC5qcyIsIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZW5kZXJlcjFkXG57XG4gIC8vIHNpemUgPSBzcXVhcmUgc2l6ZSBvZiB0aGUgYmxvY2sgaW4gcGl4ZWxzXG4gIGNvbnN0cnVjdG9yKGNhbnZhczJkLCBzaXplKVxuICB7XG4gICAgdGhpcy5jYW52YXMyZCA9IGNhbnZhczJkO1xuICAgIHRoaXMuc2l6ZSA9IHNpemU7XG4gIH1cblxuICAvLyBEcmF3IGEgcm93IG9mIGJsb2Nrc1xuICByZW5kZXIoZ2VuZXJhdGlvbiwgaXRlcmF0aW9uKVxuICB7XG4gICAgbGV0IHZoZWlnaHQgPSB0aGlzLmNhbnZhczJkLmhlaWdodCgpO1xuICAgIGxldCB2d2lkdGggPSB0aGlzLmNhbnZhczJkLndpZHRoKCk7XG5cbiAgICBsZXQgbWF4cm93ID0gKE1hdGguZmxvb3IodmhlaWdodCAvIHRoaXMuc2l6ZSkpIC0gMTtcblxuICAgIGxldCB5ID0gaXRlcmF0aW9uICogdGhpcy5zaXplO1xuXG4gICAgLy8gSXRlcmF0aW9uIGV4Y2VlZHMgc2NyZWVuIHNwYWNlLi4uXG4gICAgaWYgKGl0ZXJhdGlvbiA+IG1heHJvdylcbiAgICB7XG4gICAgICAvLyBDb3B5IHRoZSB3aG9sZSBzY3JlZW4gYW5kIHNoaWZ0IGl0IHVwIG9uZSBibG9jayBzaXplXG4gICAgICBsZXQgeDEgPSAwLCB5MSA9IHRoaXMuc2l6ZTtcbiAgICAgIGxldCB3ID0gdndpZHRoLCBoID0gdmhlaWdodCAtIHRoaXMuc2l6ZTtcbiAgICAgIHRoaXMuY2FudmFzMmQuc2VsZmJsaXQoeDEsIHkxLCB3LCBoLCAwLCAwLCB3LCBoKTtcblxuICAgICAgLy8gYWRqdXN0IGl0ZXJhdGlvbiB0byB0aGUgYm90dG9tIG1vc3Qgcm93XG4gICAgICBpdGVyYXRpb24gPSBtYXhyb3c7XG4gICAgICB5ID0gaXRlcmF0aW9uICogdGhpcy5zaXplO1xuXG4gICAgICAvLyBDbGVhciB0aGUgbGFzdCByb3cgcmVhZHkgZm9yIGRyYXdpbmdcbiAgICAgIHRoaXMuY2FudmFzMmQuYmxvY2soMCwgeSwgdndpZHRoLCB0aGlzLnNpemUsIFsyNTUsMjU1LDI1NV0pO1xuICAgIH1cblxuICAgIGZvciAobGV0IHc9MDsgdzxnZW5lcmF0aW9uLmRhdGEubGVuZ3RoLTE7IHcrKylcbiAgICB7XG4gICAgICBsZXQgeCA9IHcgKiB0aGlzLnNpemU7XG4gICAgICBpZiAoZ2VuZXJhdGlvbi5kYXRhW3ddKVxuICAgICAgICB0aGlzLmNhbnZhczJkLmJsb2NrKHgsIHksIHRoaXMuc2l6ZSwgdGhpcy5zaXplKTtcbiAgICB9XG5cbiAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi8xZC9SZW5kZXJlcjFkLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==