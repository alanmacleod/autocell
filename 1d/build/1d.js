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
	
	var _Renderer = __webpack_require__(4);
	
	var _Renderer2 = _interopRequireDefault(_Renderer);
	
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
	
	
	  renderer = new _Renderer2.default(c, s);
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

/***/ },
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

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzU2YzJmNGZhZmE5ODVkM2YwNzgiLCJ3ZWJwYWNrOi8vLy4vMWQvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi8xZC9HZW5lcmF0aW9uLmpzIiwid2VicGFjazovLy8uLzFkL1J1bGUuanMiLCJ3ZWJwYWNrOi8vLy4vMWQvUmVuZGVyZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc2hhcmVkL0NhbnZhczJkLmpzIl0sIm5hbWVzIjpbInJlbmRlcmVyIiwid29ybGRTaXplIiwicnVsZSIsInRpbWVyIiwiYyIsImZpdHdpbmRvdyIsIlJlc3RhcnQiLCJJbml0IiwiRXZvbHZlIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInRzIiwidHIiLCJzIiwiTWF0aCIsIm1heCIsIm1pbiIsInZhbHVlIiwiciIsImlzTmFOIiwiZmxvb3IiLCJ3aWR0aCIsIndpbmRvdyIsImNsZWFySW50ZXJ2YWwiLCJjbGVhciIsImciLCJpdGVyYXRpb24iLCJyZW5kZXIiLCJzZXRJbnRlcnZhbCIsIm11dGF0ZSIsIm9uY2xpY2siLCJvbnJlc2l6ZSIsImUiLCJHZW5lcmF0aW9uIiwic2l6ZSIsInJhbmRvbWlzZSIsImluaXQiLCJkYXRhIiwiQXJyYXkiLCJmcm9tIiwicm91bmQiLCJ0IiwibGVuZ3RoIiwicmFuZG9tIiwid3JhcCIsIm4iLCJwcmV2IiwibmV4dCIsImwiLCJwYXR0ZXJuIiwibmV4dGdlbiIsImFwcGx5IiwiUnVsZSIsInNlZWQiLCJSZW5kZXJlcjFkIiwiY2FudmFzMmQiLCJnZW5lcmF0aW9uIiwidmhlaWdodCIsImhlaWdodCIsInZ3aWR0aCIsIm1heHJvdyIsInkiLCJ4MSIsInkxIiwidyIsImgiLCJzZWxmYmxpdCIsImJsb2NrIiwieCIsIkNhbnZhczJkIiwicGFyZW50IiwiZWxlbWVudCIsImNyZWF0ZUVsZW1lbnQiLCJhcHBlbmRDaGlsZCIsImNvbnRleHQiLCJnZXRDb250ZXh0IiwiYmVnaW5QYXRoIiwicmVjdCIsImZpbGxTdHlsZSIsImZpbGwiLCJzeCIsInN5Iiwic3ciLCJzaCIsImR4IiwiZHkiLCJkdyIsImRoIiwiZHJhd0ltYWdlIiwiY2FudmFzIiwicmVzaXplIiwiY2xpZW50V2lkdGgiLCJjbGllbnRIZWlnaHQiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7QUNuQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUxBOztBQU9BLEtBQUlBLGlCQUFKO0FBQUEsS0FBY0Msa0JBQWQ7QUFBQSxLQUF5QkMsYUFBekI7QUFBQSxLQUErQkMsUUFBUSxJQUF2Qzs7QUFFQSxLQUFJQyxJQUFJLHVCQUFhLFNBQWIsQ0FBUjtBQUNBQSxHQUFFQyxTQUFGOztBQUVBQzs7QUFHQSxVQUFTQSxPQUFULEdBQ0E7QUFDRUM7QUFDQUM7QUFDRDs7QUFFRCxVQUFTRCxJQUFULEdBQ0E7QUFBQSxjQUNpQixDQUFFRSxTQUFTQyxjQUFULENBQXdCLFNBQXhCLENBQUYsRUFDRUQsU0FBU0MsY0FBVCxDQUF3QixTQUF4QixDQURGLENBRGpCO0FBQUEsT0FDT0MsRUFEUDtBQUFBLE9BQ1dDLEVBRFg7QUFHRTs7QUFDQSxPQUFJQyxJQUFJQyxLQUFLQyxHQUFMLENBQVNELEtBQUtFLEdBQUwsQ0FBU0wsR0FBR00sS0FBWixFQUFtQixFQUFuQixDQUFULEVBQWdDLENBQWhDLENBQVI7QUFDQSxPQUFJQyxJQUFJSixLQUFLQyxHQUFMLENBQVNELEtBQUtFLEdBQUwsQ0FBU0osR0FBR0ssS0FBWixFQUFtQixHQUFuQixDQUFULEVBQWlDLENBQWpDLENBQVI7O0FBRUFKLE9BQUlNLE1BQU1OLENBQU4sSUFBVyxDQUFYLEdBQWVBLENBQW5CO0FBQ0FLLE9B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Q0FuQyxTQUFFb0MsSUFBRixDQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsS0FBS04sT0FBTCxDQUFhbEQsS0FBMUIsRUFBaUMsS0FBS2tELE9BQUwsQ0FBYWIsTUFBOUM7QUFDQWpCLFNBQUVxQyxTQUFGLEdBQWMxRSxhQUFXQSxFQUFFLENBQUYsQ0FBWCxTQUFtQkEsRUFBRSxDQUFGLENBQW5CLFNBQTJCQSxFQUFFLENBQUYsQ0FBM0IsU0FBcUMsT0FBbkQ7QUFDQXFDLFNBQUVzQyxJQUFGO0FBQ0Q7Ozs2QkFHRDtBQUNFLGNBQU8sS0FBS1IsT0FBTCxDQUFhbEQsS0FBcEI7QUFDRDs7OzhCQUdEO0FBQ0UsY0FBTyxLQUFLa0QsT0FBTCxDQUFhYixNQUFwQjtBQUNEOzs7aUNBR0Q7QUFDRSxZQUFLZ0MsTUFBTCxDQUFZLEtBQUtwQixNQUFMLENBQVlxQixXQUF4QixFQUFxQyxLQUFLckIsTUFBTCxDQUFZc0IsWUFBakQ7QUFDRDs7OzRCQUVNNUIsQyxFQUFHQyxDLEVBQ1Y7O0FBRUUsWUFBS00sT0FBTCxDQUFhbEQsS0FBYixHQUFxQjJDLENBQXJCO0FBQ0EsWUFBS08sT0FBTCxDQUFhYixNQUFiLEdBQXNCTyxDQUF0Qjs7QUFFQTtBQUNEOzs7Ozs7bUJBekRrQkksUSIsImZpbGUiOiIxZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA3NTZjMmY0ZmFmYTk4NWQzZjA3OCIsIlxuLy8gSW50ZXJlc3RpbmcgcnVsZXM6IDMwLCA0NSwgOTAsIDExMFxuXG5pbXBvcnQgQ2FudmFzMmQgICAgIGZyb20gJy4uL3NoYXJlZC9DYW52YXMyZCc7XG5pbXBvcnQgR2VuZXJhdGlvbiAgIGZyb20gJy4vR2VuZXJhdGlvbic7XG5pbXBvcnQgUnVsZSAgICAgICAgIGZyb20gJy4vUnVsZSc7XG5pbXBvcnQgUmVuZGVyZXIxZCAgIGZyb20gJy4vUmVuZGVyZXInO1xuXG5sZXQgcmVuZGVyZXIsIHdvcmxkU2l6ZSwgcnVsZSwgdGltZXIgPSBudWxsO1xuXG5sZXQgYyA9IG5ldyBDYW52YXMyZChcImNvbnRlbnRcIik7XG5jLmZpdHdpbmRvdygpO1xuXG5SZXN0YXJ0KCk7XG5cblxuZnVuY3Rpb24gUmVzdGFydCgpXG57XG4gIEluaXQoKTtcbiAgRXZvbHZlKCk7XG59XG5cbmZ1bmN0aW9uIEluaXQoKVxue1xuICBsZXQgW3RzLCB0cl0gPSBbIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidHh0U2l6ZVwiKSxcbiAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInR4dFJ1bGVcIikgXTtcbiAgLy8gY2xhbXAgdmFsdWVzIGludG8gcmFuZ2VcbiAgbGV0IHMgPSBNYXRoLm1heChNYXRoLm1pbih0cy52YWx1ZSwgMzIpLDEpO1xuICBsZXQgciA9IE1hdGgubWF4KE1hdGgubWluKHRyLnZhbHVlLCAyNTUpLDEpO1xuXG4gIHMgPSBpc05hTihzKSA/IDQgOiBzO1xuICByID0gaXNOYU4ocikgPyA5MDogcjtcblxuICBbdHMudmFsdWUsIHRyLnZhbHVlXSA9IFtzLCByXTtcblxuICByZW5kZXJlciA9IG5ldyBSZW5kZXJlcjFkKGMsIHMpO1xuICBydWxlID0gbmV3IFJ1bGUocik7XG5cbiAgd29ybGRTaXplID0gTWF0aC5mbG9vcihjLndpZHRoKCkgLyBzKTtcblxuICBpZiAodGltZXIpIHdpbmRvdy5jbGVhckludGVydmFsKHRpbWVyKTtcblxuICBjLmNsZWFyKCk7XG59XG5cblxuZnVuY3Rpb24gRXZvbHZlKClcbntcbiAgYy5maXR3aW5kb3coKTtcbiAgYy5jbGVhcigpO1xuXG4gIC8vIENyZWF0ZSB0aGUgZmlyc3QgZ2VuZXJhdGlvblxuICBsZXQgZyA9IG5ldyBHZW5lcmF0aW9uKHdvcmxkU2l6ZSk7XG5cbiAgbGV0IGl0ZXJhdGlvbiA9IDA7XG4gIC8vIFJlbmRlciBmaXJzdCBnZW4gbm93XG4gIHJlbmRlcmVyLnJlbmRlcihnLCBpdGVyYXRpb24rKyk7XG5cbiAgLy8gRm9yIDJkKyB2ZXJzaW9uIHVzZSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKVxuICB0aW1lciA9IHdpbmRvdy5zZXRJbnRlcnZhbCgoKSA9PiB7XG5cbiAgICAvLyBNdXRhdGUgdGhlIGxhc3QgZ2VuZXJhdGlvbiBpbnRvIGEgbmV3IG9uZVxuICAgIGcgPSBnLm11dGF0ZShydWxlKTtcbiAgICByZW5kZXJlci5yZW5kZXIoZywgaXRlcmF0aW9uKyspO1xuXG4gIH0sIDI1KTtcblxufVxuXG5cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYnRuUnVuXCIpLm9uY2xpY2sgPSAoKSA9PiB7XG4gIFJlc3RhcnQoKTtcbn1cblxuXG53aW5kb3cub25yZXNpemUgPSAoZSkgPT4ge1xuICBSZXN0YXJ0KCk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi8xZC9tYWluLmpzIiwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdlbmVyYXRpb25cbntcbiAgY29uc3RydWN0b3Ioc2l6ZSwgcmFuZG9taXNlKVxuICB7XG4gICAgdGhpcy5zaXplID0gc2l6ZTtcbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIGluaXQocmFuZG9taXNlKVxuICB7XG4gICAgLy8gQXJyYXkgb2YgemVyb2VzXG4gICAgdGhpcy5kYXRhID0gQXJyYXkuZnJvbShuZXcgQXJyYXkodGhpcy5zaXplKSwgKCkgPT4gMCk7XG5cbiAgICAvLyBTdGljayBhIDEgaW4gdGhlIG1pZGRsZVxuICAgIHRoaXMuZGF0YVtNYXRoLnJvdW5kKHRoaXMuc2l6ZS8yKV0gPSAxO1xuXG4gICAgaWYgKHJhbmRvbWlzZSkgLy8gd293XG4gICAgICBmb3IgKGxldCB0PTA7IHQ8dGhpcy5kYXRhLmxlbmd0aDsgdCsrKVxuICAgICAgICB0aGlzLmRhdGFbdF0gPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkpO1xuICB9XG5cblxuICBtdXRhdGUocnVsZSwgd3JhcClcbiAge1xuICAgIC8vIENyZWF0ZSBhIG5ldywgYmxhbmssIGdlbmVyYXRpb24gdG8gd3JpdGUgaW50b1xuICAgIGxldCBuID0gbmV3IEdlbmVyYXRpb24odGhpcy5zaXplKTtcblxuICAgIC8vIExvb2sgYXQgZWFjaCAnbGlmZWZvcm0nIGluIG91ciBnZW5lcmF0aW9uJ3Mgd29ybGRcbiAgICBmb3IgKGxldCB0PTA7IHQ8dGhpcy5kYXRhLmxlbmd0aDsgdCsrKVxuICAgIHtcbiAgICAgIC8vIEdldCBpdHMgbmVpZ2hib3Vycywgd3JhcHBpbmcgdGhlIGVkZ2UgY2FzZXNcbiAgICAgIGxldCBwcmV2ID0gdC0xIDwgMCA/IHRoaXMuZGF0YS5sZW5ndGgtMSA6IHQtMTtcbiAgICAgIGxldCBuZXh0ID0gdCsxID4gdGhpcy5kYXRhLmxlbmd0aC0xID8gMCA6IHQrMTtcblxuICAgICAgbGV0IGwgPSB0aGlzLmRhdGFbcHJldl07XG4gICAgICBsZXQgYyA9IHRoaXMuZGF0YVt0XTtcbiAgICAgIGxldCByID0gdGhpcy5kYXRhW25leHRdO1xuXG4gICAgICAvLyBDcmVhdGUgYSAzLWJpdCBpbnRlZ2VyIGZyb20gdGhlIGJpdCBwYXR0ZXJuXG4gICAgICBsZXQgcGF0dGVybiA9ICgobCYxKSA8PCAyKSB8ICgoYyYxKSA8PCAxKSB8IChyJjEpO1xuXG4gICAgICAvLyBBcHBseSB0aGUgcnVsZSB0byB0aGlzIHBhdHRlcm5cbiAgICAgIGxldCBuZXh0Z2VuID0gcnVsZS5hcHBseShwYXR0ZXJuKTtcblxuICAgICAgLy8gUHV0IHRoZSBtdXRhdGVkICdsaWZlZm9ybScgaW50byB0aGUgbmV4dCBnZW5lcmF0aW9uXG4gICAgICBuLmRhdGFbdF0gPSBuZXh0Z2VuO1xuICAgIH1cblxuICAgIC8vIERpc2FibGUgd3JhcHBpbmdcbiAgICBpZiAoIXdyYXApXG4gICAge1xuICAgICAgbi5kYXRhWzBdID0gdGhpcy5kYXRhWzBdO1xuICAgICAgbi5kYXRhW24uZGF0YS5sZW5ndGgtMV0gPSB0aGlzLmRhdGFbdGhpcy5kYXRhLmxlbmd0aC0xXTtcbiAgICB9XG5cbiAgICAvLyByZXR1cm4gdGhlIG5leHQgZ2VuZXJhdGlvblxuICAgIHJldHVybiBuO1xuICB9XG5cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vMWQvR2VuZXJhdGlvbi5qcyIsIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSdWxlXG57XG4gIGNvbnN0cnVjdG9yKHNlZWQpXG4gIHtcbiAgICB0aGlzLnNlZWQgPSBzZWVkICYgMHhmZjtcblxuICB9XG5cbiAgYXBwbHkobilcbiAge1xuICAgIC8vIG4gaXMgYSBudW1iZXIgZnJvbSAwIC0gNyBhbmQgaW5kaWNhdGVzIHRoZSBCaXQgb2Ygb3VyIHJ1bGUgdG8gYXBwbHlcbiAgICAvL2NvbnNvbGUubG9nKGBTaGlmdGluZyB2YWx1ZSAke3RoaXMuc2VlZH0gPj4gJHtufSB0aW1lc2ApO1xuICAgIHJldHVybiAoKHRoaXMuc2VlZCA+PiBuKSAmIDEpO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi8xZC9SdWxlLmpzIiwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlbmRlcmVyMWRcbntcbiAgLy8gc2l6ZSA9IHNxdWFyZSBzaXplIG9mIHRoZSBibG9jayBpbiBwaXhlbHNcbiAgY29uc3RydWN0b3IoY2FudmFzMmQsIHNpemUpXG4gIHtcbiAgICB0aGlzLmNhbnZhczJkID0gY2FudmFzMmQ7XG4gICAgdGhpcy5zaXplID0gc2l6ZTtcbiAgfVxuXG4gIC8vIERyYXcgYSByb3cgb2YgYmxvY2tzXG4gIHJlbmRlcihnZW5lcmF0aW9uLCBpdGVyYXRpb24pXG4gIHtcbiAgICBsZXQgdmhlaWdodCA9IHRoaXMuY2FudmFzMmQuaGVpZ2h0KCk7XG4gICAgbGV0IHZ3aWR0aCA9IHRoaXMuY2FudmFzMmQud2lkdGgoKTtcblxuICAgIGxldCBtYXhyb3cgPSAoTWF0aC5mbG9vcih2aGVpZ2h0IC8gdGhpcy5zaXplKSkgLSAxO1xuXG4gICAgbGV0IHkgPSBpdGVyYXRpb24gKiB0aGlzLnNpemU7XG5cbiAgICAvLyBJdGVyYXRpb24gZXhjZWVkcyBzY3JlZW4gc3BhY2UuLi5cbiAgICBpZiAoaXRlcmF0aW9uID4gbWF4cm93KVxuICAgIHtcbiAgICAgIC8vIENvcHkgdGhlIHdob2xlIHNjcmVlbiBhbmQgc2hpZnQgaXQgdXAgb25lIGJsb2NrIHNpemVcbiAgICAgIGxldCB4MSA9IDAsIHkxID0gdGhpcy5zaXplO1xuICAgICAgbGV0IHcgPSB2d2lkdGgsIGggPSB2aGVpZ2h0IC0gdGhpcy5zaXplO1xuICAgICAgdGhpcy5jYW52YXMyZC5zZWxmYmxpdCh4MSwgeTEsIHcsIGgsIDAsIDAsIHcsIGgpO1xuXG4gICAgICAvLyBhZGp1c3QgaXRlcmF0aW9uIHRvIHRoZSBib3R0b20gbW9zdCByb3dcbiAgICAgIGl0ZXJhdGlvbiA9IG1heHJvdztcbiAgICAgIHkgPSBpdGVyYXRpb24gKiB0aGlzLnNpemU7XG5cbiAgICAgIC8vIENsZWFyIHRoZSBsYXN0IHJvdyByZWFkeSBmb3IgZHJhd2luZ1xuICAgICAgdGhpcy5jYW52YXMyZC5ibG9jaygwLCB5LCB2d2lkdGgsIHRoaXMuc2l6ZSwgWzI1NSwyNTUsMjU1XSk7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgdz0wOyB3PGdlbmVyYXRpb24uZGF0YS5sZW5ndGgtMTsgdysrKVxuICAgIHtcbiAgICAgIGxldCB4ID0gdyAqIHRoaXMuc2l6ZTtcbiAgICAgIGlmIChnZW5lcmF0aW9uLmRhdGFbd10pXG4gICAgICAgIHRoaXMuY2FudmFzMmQuYmxvY2soeCwgeSwgdGhpcy5zaXplLCB0aGlzLnNpemUpO1xuICAgIH1cblxuICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLzFkL1JlbmRlcmVyLmpzIiwiXG5cbi8vIEJvaWxlcnBsYXRlIGZ1bmN0aW9ucyB0byB3cml0ZSB0byB0aGUgQ2FudmFzXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhbnZhczJkXG57XG4gIGNvbnN0cnVjdG9yKHBhcmVudClcbiAge1xuICAgIHRoaXMucGFyZW50ID0gdHlwZW9mIHBhcmVudCA9PSAnc3RyaW5nJyA/IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBhcmVudCkgOiBwYXJlbnQ7XG4gICAgdGhpcy5lbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICB0aGlzLnBhcmVudC5hcHBlbmRDaGlsZCh0aGlzLmVsZW1lbnQpO1xuICAgIHRoaXMuY29udGV4dCA9IHRoaXMuZWxlbWVudC5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgdGhpcy5jbGVhcigpO1xuXG4gIH1cblxuICBibG9jayh4LHksdyxoLGMpXG4gIHtcbiAgICBsZXQgdCA9IHRoaXMuY29udGV4dDtcbiAgICB0LmJlZ2luUGF0aCgpO1xuICAgIHQucmVjdCh4LCB5LCB3LCBoKTtcbiAgICB0LmZpbGxTdHlsZSA9IGMgPyBgcmdiKCR7Y1swXX0sJHtjWzFdfSwke2NbMl19KWAgOiBcImJsYWNrXCI7XG4gICAgdC5maWxsKCk7XG4gIH1cblxuICBzZWxmYmxpdChzeCwgc3ksIHN3LCBzaCwgZHgsIGR5LCBkdywgZGgpXG4gIHtcbiAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKHRoaXMuY29udGV4dC5jYW52YXMsIHN4LCBzeSwgc3csIHNoLCBkeCwgZHksIGR3LCBkaCk7XG4gIH1cblxuICBjbGVhcihjKVxuICB7XG4gICAgbGV0IHQgPSB0aGlzLmNvbnRleHQ7XG4gICAgdC5iZWdpblBhdGgoKTtcbiAgICB0LnJlY3QoMCwgMCwgdGhpcy5lbGVtZW50LndpZHRoLCB0aGlzLmVsZW1lbnQuaGVpZ2h0KTtcbiAgICB0LmZpbGxTdHlsZSA9IGMgPyBgcmdiKCR7Y1swXX0sJHtjWzFdfSwke2NbMl19KWAgOiBcIndoaXRlXCI7XG4gICAgdC5maWxsKCk7XG4gIH1cblxuICB3aWR0aCgpXG4gIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50LndpZHRoO1xuICB9XG5cbiAgaGVpZ2h0KClcbiAge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnQuaGVpZ2h0O1xuICB9XG5cbiAgZml0d2luZG93KClcbiAge1xuICAgIHRoaXMucmVzaXplKHRoaXMucGFyZW50LmNsaWVudFdpZHRoLCB0aGlzLnBhcmVudC5jbGllbnRIZWlnaHQpO1xuICB9XG5cbiAgcmVzaXplKHcsIGgpXG4gIHtcblxuICAgIHRoaXMuZWxlbWVudC53aWR0aCA9IHc7XG4gICAgdGhpcy5lbGVtZW50LmhlaWdodCA9IGg7XG5cbiAgICAvLyBkcmF3KClcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2hhcmVkL0NhbnZhczJkLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==