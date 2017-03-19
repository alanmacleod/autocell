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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZDBiNjVmNzk3NmNjZDE3ZjRhMWMiLCJ3ZWJwYWNrOi8vLy4vMWQvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQ2FudmFzMmQuanMiLCJ3ZWJwYWNrOi8vLy4vMWQvR2VuZXJhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi8xZC9SdWxlLmpzIiwid2VicGFjazovLy8uLzFkL1JlbmRlcmVyLmpzIl0sIm5hbWVzIjpbInJlbmRlcmVyIiwid29ybGRTaXplIiwicnVsZSIsInRpbWVyIiwiYyIsImZpdHdpbmRvdyIsIlJlc3RhcnQiLCJJbml0IiwiRXZvbHZlIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInRzIiwidHIiLCJzIiwiTWF0aCIsIm1heCIsIm1pbiIsInZhbHVlIiwiciIsImlzTmFOIiwiZmxvb3IiLCJ3aWR0aCIsIndpbmRvdyIsImNsZWFySW50ZXJ2YWwiLCJjbGVhciIsImciLCJpdGVyYXRpb24iLCJyZW5kZXIiLCJzZXRJbnRlcnZhbCIsIm11dGF0ZSIsIm9uY2xpY2siLCJvbnJlc2l6ZSIsImUiLCJDYW52YXMyZCIsInBhcmVudCIsImVsZW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiYXBwZW5kQ2hpbGQiLCJjb250ZXh0IiwiZ2V0Q29udGV4dCIsIngiLCJ5IiwidyIsImgiLCJ0IiwiYmVnaW5QYXRoIiwicmVjdCIsImZpbGxTdHlsZSIsImZpbGwiLCJzeCIsInN5Iiwic3ciLCJzaCIsImR4IiwiZHkiLCJkdyIsImRoIiwiZHJhd0ltYWdlIiwiY2FudmFzIiwiaGVpZ2h0IiwicmVzaXplIiwiY2xpZW50V2lkdGgiLCJjbGllbnRIZWlnaHQiLCJHZW5lcmF0aW9uIiwic2l6ZSIsInJhbmRvbWlzZSIsImluaXQiLCJkYXRhIiwiQXJyYXkiLCJmcm9tIiwicm91bmQiLCJsZW5ndGgiLCJyYW5kb20iLCJ3cmFwIiwibiIsInByZXYiLCJuZXh0IiwibCIsInBhdHRlcm4iLCJuZXh0Z2VuIiwiYXBwbHkiLCJSdWxlIiwic2VlZCIsIlJlbmRlcmVyMWQiLCJjYW52YXMyZCIsImdlbmVyYXRpb24iLCJ2aGVpZ2h0IiwidndpZHRoIiwibWF4cm93IiwieDEiLCJ5MSIsInNlbGZibGl0IiwiYmxvY2siXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7QUNuQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUxBOztBQU9BLEtBQUlBLGlCQUFKO0FBQUEsS0FBY0Msa0JBQWQ7QUFBQSxLQUF5QkMsYUFBekI7QUFBQSxLQUErQkMsUUFBUSxJQUF2Qzs7QUFFQSxLQUFJQyxJQUFJLHVCQUFhLFNBQWIsQ0FBUjtBQUNBQSxHQUFFQyxTQUFGOztBQUVBQzs7QUFHQSxVQUFTQSxPQUFULEdBQ0E7QUFDRUM7QUFDQUM7QUFDRDs7QUFFRCxVQUFTRCxJQUFULEdBQ0E7QUFBQSxjQUNpQixDQUFFRSxTQUFTQyxjQUFULENBQXdCLFNBQXhCLENBQUYsRUFDRUQsU0FBU0MsY0FBVCxDQUF3QixTQUF4QixDQURGLENBRGpCO0FBQUEsT0FDT0MsRUFEUDtBQUFBLE9BQ1dDLEVBRFg7QUFHRTs7QUFDQSxPQUFJQyxJQUFJQyxLQUFLQyxHQUFMLENBQVNELEtBQUtFLEdBQUwsQ0FBU0wsR0FBR00sS0FBWixFQUFtQixFQUFuQixDQUFULEVBQWdDLENBQWhDLENBQVI7QUFDQSxPQUFJQyxJQUFJSixLQUFLQyxHQUFMLENBQVNELEtBQUtFLEdBQUwsQ0FBU0osR0FBR0ssS0FBWixFQUFtQixHQUFuQixDQUFULEVBQWlDLENBQWpDLENBQVI7O0FBRUFKLE9BQUlNLE1BQU1OLENBQU4sSUFBVyxDQUFYLEdBQWVBLENBQW5CO0FBQ0FLLE9BQUlDLE1BQU1ELENBQU4sSUFBVyxFQUFYLEdBQWVBLENBQW5COztBQVJGLGVBVXlCLENBQUNMLENBQUQsRUFBSUssQ0FBSixDQVZ6QjtBQVVHUCxNQUFHTSxLQVZOO0FBVWFMLE1BQUdLLEtBVmhCOzs7QUFZRWpCLGNBQVcsdUJBQWVJLENBQWYsRUFBa0JTLENBQWxCLENBQVg7QUFDQVgsVUFBTyxtQkFBU2dCLENBQVQsQ0FBUDs7QUFFQWpCLGVBQVlhLEtBQUtNLEtBQUwsQ0FBV2hCLEVBQUVpQixLQUFGLEtBQVlSLENBQXZCLENBQVo7O0FBRUEsT0FBSVYsS0FBSixFQUFXbUIsT0FBT0MsYUFBUCxDQUFxQnBCLEtBQXJCOztBQUVYQyxLQUFFb0IsS0FBRjtBQUNEOztBQUdELFVBQVNoQixNQUFULEdBQ0E7QUFDRUosS0FBRUMsU0FBRjtBQUNBRCxLQUFFb0IsS0FBRjs7QUFFQTtBQUNBLE9BQUlDLElBQUkseUJBQWV4QixTQUFmLENBQVI7O0FBRUEsT0FBSXlCLFlBQVksQ0FBaEI7QUFDQTtBQUNBMUIsWUFBUzJCLE1BQVQsQ0FBZ0JGLENBQWhCLEVBQW1CQyxXQUFuQjs7QUFFQTtBQUNBdkIsV0FBUW1CLE9BQU9NLFdBQVAsQ0FBbUIsWUFBTTs7QUFFL0I7QUFDQUgsU0FBSUEsRUFBRUksTUFBRixDQUFTM0IsSUFBVCxDQUFKO0FBQ0FGLGNBQVMyQixNQUFULENBQWdCRixDQUFoQixFQUFtQkMsV0FBbkI7QUFFRCxJQU5PLEVBTUwsRUFOSyxDQUFSO0FBUUQ7O0FBR0RqQixVQUFTQyxjQUFULENBQXdCLFFBQXhCLEVBQWtDb0IsT0FBbEMsR0FBNEMsWUFBTTtBQUNoRHhCO0FBQ0QsRUFGRDs7QUFLQWdCLFFBQU9TLFFBQVAsR0FBa0IsVUFBQ0MsQ0FBRCxFQUFPO0FBQ3ZCMUI7QUFDRCxFQUZELEM7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6RUE7O0tBRXFCMkIsUTtBQUVuQixxQkFBWUMsTUFBWixFQUNBO0FBQUE7O0FBQ0UsVUFBS0EsTUFBTCxHQUFjLE9BQU9BLE1BQVAsSUFBaUIsUUFBakIsR0FBNEJ6QixTQUFTQyxjQUFULENBQXdCd0IsTUFBeEIsQ0FBNUIsR0FBOERBLE1BQTVFO0FBQ0EsVUFBS0MsT0FBTCxHQUFlMUIsU0FBUzJCLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBZjtBQUNBLFVBQUtGLE1BQUwsQ0FBWUcsV0FBWixDQUF3QixLQUFLRixPQUE3QjtBQUNBLFVBQUtHLE9BQUwsR0FBZSxLQUFLSCxPQUFMLENBQWFJLFVBQWIsQ0FBd0IsSUFBeEIsQ0FBZjtBQUNBLFVBQUtmLEtBQUw7QUFFRDs7OzsyQkFFS2dCLEMsRUFBRUMsQyxFQUFFQyxDLEVBQUVDLEMsRUFBRXZDLEMsRUFDZDtBQUNFLFdBQUl3QyxJQUFJLEtBQUtOLE9BQWI7QUFDQU0sU0FBRUMsU0FBRjtBQUNBRCxTQUFFRSxJQUFGLENBQU9OLENBQVAsRUFBVUMsQ0FBVixFQUFhQyxDQUFiLEVBQWdCQyxDQUFoQjtBQUNBQyxTQUFFRyxTQUFGLEdBQWMzQyxhQUFXQSxFQUFFLENBQUYsQ0FBWCxTQUFtQkEsRUFBRSxDQUFGLENBQW5CLFNBQTJCQSxFQUFFLENBQUYsQ0FBM0IsU0FBcUMsT0FBbkQ7QUFDQXdDLFNBQUVJLElBQUY7QUFDRDs7OzhCQUVRQyxFLEVBQUlDLEUsRUFBSUMsRSxFQUFJQyxFLEVBQUlDLEUsRUFBSUMsRSxFQUFJQyxFLEVBQUlDLEUsRUFDckM7QUFDRSxZQUFLbEIsT0FBTCxDQUFhbUIsU0FBYixDQUF1QixLQUFLbkIsT0FBTCxDQUFhb0IsTUFBcEMsRUFBNENULEVBQTVDLEVBQWdEQyxFQUFoRCxFQUFvREMsRUFBcEQsRUFBd0RDLEVBQXhELEVBQTREQyxFQUE1RCxFQUFnRUMsRUFBaEUsRUFBb0VDLEVBQXBFLEVBQXdFQyxFQUF4RTtBQUNEOzs7MkJBRUtwRCxDLEVBQ047QUFDRSxXQUFJd0MsSUFBSSxLQUFLTixPQUFiO0FBQ0FNLFNBQUVDLFNBQUY7QUFDQUQsU0FBRUUsSUFBRixDQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsS0FBS1gsT0FBTCxDQUFhZCxLQUExQixFQUFpQyxLQUFLYyxPQUFMLENBQWF3QixNQUE5QztBQUNBZixTQUFFRyxTQUFGLEdBQWMzQyxhQUFXQSxFQUFFLENBQUYsQ0FBWCxTQUFtQkEsRUFBRSxDQUFGLENBQW5CLFNBQTJCQSxFQUFFLENBQUYsQ0FBM0IsU0FBcUMsT0FBbkQ7QUFDQXdDLFNBQUVJLElBQUY7QUFDRDs7OzZCQUdEO0FBQ0UsY0FBTyxLQUFLYixPQUFMLENBQWFkLEtBQXBCO0FBQ0Q7Ozs4QkFHRDtBQUNFLGNBQU8sS0FBS2MsT0FBTCxDQUFhd0IsTUFBcEI7QUFDRDs7O2lDQUdEO0FBQ0UsWUFBS0MsTUFBTCxDQUFZLEtBQUsxQixNQUFMLENBQVkyQixXQUF4QixFQUFxQyxLQUFLM0IsTUFBTCxDQUFZNEIsWUFBakQ7QUFDRDs7OzRCQUVNcEIsQyxFQUFHQyxDLEVBQ1Y7O0FBRUUsWUFBS1IsT0FBTCxDQUFhZCxLQUFiLEdBQXFCcUIsQ0FBckI7QUFDQSxZQUFLUCxPQUFMLENBQWF3QixNQUFiLEdBQXNCaEIsQ0FBdEI7O0FBRUE7QUFDRDs7Ozs7O21CQXpEa0JWLFE7Ozs7Ozs7Ozs7Ozs7Ozs7S0NGQThCLFU7QUFFbkIsdUJBQVlDLElBQVosRUFBa0JDLFNBQWxCLEVBQ0E7QUFBQTs7QUFDRSxVQUFLRCxJQUFMLEdBQVlBLElBQVo7QUFDQSxVQUFLRSxJQUFMO0FBQ0Q7Ozs7MEJBRUlELFMsRUFDTDtBQUNFO0FBQ0EsWUFBS0UsSUFBTCxHQUFZQyxNQUFNQyxJQUFOLENBQVcsSUFBSUQsS0FBSixDQUFVLEtBQUtKLElBQWYsQ0FBWCxFQUFpQztBQUFBLGdCQUFNLENBQU47QUFBQSxRQUFqQyxDQUFaOztBQUVBO0FBQ0EsWUFBS0csSUFBTCxDQUFVckQsS0FBS3dELEtBQUwsQ0FBVyxLQUFLTixJQUFMLEdBQVUsQ0FBckIsQ0FBVixJQUFxQyxDQUFyQzs7QUFFQSxXQUFJQyxTQUFKLEVBQWU7QUFDYixjQUFLLElBQUlyQixJQUFFLENBQVgsRUFBY0EsSUFBRSxLQUFLdUIsSUFBTCxDQUFVSSxNQUExQixFQUFrQzNCLEdBQWxDO0FBQ0UsZ0JBQUt1QixJQUFMLENBQVV2QixDQUFWLElBQWU5QixLQUFLd0QsS0FBTCxDQUFXeEQsS0FBSzBELE1BQUwsRUFBWCxDQUFmO0FBREY7QUFFSDs7OzRCQUdNdEUsSSxFQUFNdUUsSSxFQUNiO0FBQ0U7QUFDQSxXQUFJQyxJQUFJLElBQUlYLFVBQUosQ0FBZSxLQUFLQyxJQUFwQixDQUFSOztBQUVBO0FBQ0EsWUFBSyxJQUFJcEIsSUFBRSxDQUFYLEVBQWNBLElBQUUsS0FBS3VCLElBQUwsQ0FBVUksTUFBMUIsRUFBa0MzQixHQUFsQyxFQUNBO0FBQ0U7QUFDQSxhQUFJK0IsT0FBTy9CLElBQUUsQ0FBRixHQUFNLENBQU4sR0FBVSxLQUFLdUIsSUFBTCxDQUFVSSxNQUFWLEdBQWlCLENBQTNCLEdBQStCM0IsSUFBRSxDQUE1QztBQUNBLGFBQUlnQyxPQUFPaEMsSUFBRSxDQUFGLEdBQU0sS0FBS3VCLElBQUwsQ0FBVUksTUFBVixHQUFpQixDQUF2QixHQUEyQixDQUEzQixHQUErQjNCLElBQUUsQ0FBNUM7O0FBRUEsYUFBSWlDLElBQUksS0FBS1YsSUFBTCxDQUFVUSxJQUFWLENBQVI7QUFDQSxhQUFJdkUsSUFBSSxLQUFLK0QsSUFBTCxDQUFVdkIsQ0FBVixDQUFSO0FBQ0EsYUFBSTFCLElBQUksS0FBS2lELElBQUwsQ0FBVVMsSUFBVixDQUFSOztBQUVBO0FBQ0EsYUFBSUUsVUFBVyxDQUFDRCxJQUFFLENBQUgsS0FBUyxDQUFWLEdBQWdCLENBQUN6RSxJQUFFLENBQUgsS0FBUyxDQUF6QixHQUErQmMsSUFBRSxDQUEvQzs7QUFFQTtBQUNBLGFBQUk2RCxVQUFVN0UsS0FBSzhFLEtBQUwsQ0FBV0YsT0FBWCxDQUFkOztBQUVBO0FBQ0FKLFdBQUVQLElBQUYsQ0FBT3ZCLENBQVAsSUFBWW1DLE9BQVo7QUFDRDs7QUFFRDtBQUNBLFdBQUksQ0FBQ04sSUFBTCxFQUNBO0FBQ0VDLFdBQUVQLElBQUYsQ0FBTyxDQUFQLElBQVksS0FBS0EsSUFBTCxDQUFVLENBQVYsQ0FBWjtBQUNBTyxXQUFFUCxJQUFGLENBQU9PLEVBQUVQLElBQUYsQ0FBT0ksTUFBUCxHQUFjLENBQXJCLElBQTBCLEtBQUtKLElBQUwsQ0FBVSxLQUFLQSxJQUFMLENBQVVJLE1BQVYsR0FBaUIsQ0FBM0IsQ0FBMUI7QUFDRDs7QUFFRDtBQUNBLGNBQU9HLENBQVA7QUFDRDs7Ozs7O21CQXpEa0JYLFU7Ozs7Ozs7Ozs7Ozs7Ozs7S0NBQWtCLEk7QUFFbkIsaUJBQVlDLElBQVosRUFDQTtBQUFBOztBQUNFLFVBQUtBLElBQUwsR0FBWUEsT0FBTyxJQUFuQjtBQUVEOzs7OzJCQUVLUixDLEVBQ047QUFDRTtBQUNBO0FBQ0EsY0FBUyxLQUFLUSxJQUFMLElBQWFSLENBQWQsR0FBbUIsQ0FBM0I7QUFDRDs7Ozs7O21CQWJrQk8sSTs7Ozs7Ozs7Ozs7Ozs7OztLQ0FBRSxVO0FBRW5CO0FBQ0EsdUJBQVlDLFFBQVosRUFBc0JwQixJQUF0QixFQUNBO0FBQUE7O0FBQ0UsVUFBS29CLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0EsVUFBS3BCLElBQUwsR0FBWUEsSUFBWjtBQUNEOztBQUVEOzs7Ozs0QkFDT3FCLFUsRUFBWTNELFMsRUFDbkI7QUFDRSxXQUFJNEQsVUFBVSxLQUFLRixRQUFMLENBQWN6QixNQUFkLEVBQWQ7QUFDQSxXQUFJNEIsU0FBUyxLQUFLSCxRQUFMLENBQWMvRCxLQUFkLEVBQWI7O0FBRUEsV0FBSW1FLFNBQVUxRSxLQUFLTSxLQUFMLENBQVdrRSxVQUFVLEtBQUt0QixJQUExQixDQUFELEdBQW9DLENBQWpEOztBQUVBLFdBQUl2QixJQUFJZixZQUFZLEtBQUtzQyxJQUF6Qjs7QUFFQTtBQUNBLFdBQUl0QyxZQUFZOEQsTUFBaEIsRUFDQTtBQUNFO0FBQ0EsYUFBSUMsS0FBSyxDQUFUO0FBQUEsYUFBWUMsS0FBSyxLQUFLMUIsSUFBdEI7QUFDQSxhQUFJdEIsSUFBSTZDLE1BQVI7QUFBQSxhQUFnQjVDLElBQUkyQyxVQUFVLEtBQUt0QixJQUFuQztBQUNBLGNBQUtvQixRQUFMLENBQWNPLFFBQWQsQ0FBdUJGLEVBQXZCLEVBQTJCQyxFQUEzQixFQUErQmhELENBQS9CLEVBQWtDQyxDQUFsQyxFQUFxQyxDQUFyQyxFQUF3QyxDQUF4QyxFQUEyQ0QsQ0FBM0MsRUFBOENDLENBQTlDOztBQUVBO0FBQ0FqQixxQkFBWThELE1BQVo7QUFDQS9DLGFBQUlmLFlBQVksS0FBS3NDLElBQXJCOztBQUVBO0FBQ0EsY0FBS29CLFFBQUwsQ0FBY1EsS0FBZCxDQUFvQixDQUFwQixFQUF1Qm5ELENBQXZCLEVBQTBCOEMsTUFBMUIsRUFBa0MsS0FBS3ZCLElBQXZDLEVBQTZDLENBQUMsR0FBRCxFQUFLLEdBQUwsRUFBUyxHQUFULENBQTdDO0FBQ0Q7O0FBRUQsWUFBSyxJQUFJdEIsS0FBRSxDQUFYLEVBQWNBLEtBQUUyQyxXQUFXbEIsSUFBWCxDQUFnQkksTUFBaEIsR0FBdUIsQ0FBdkMsRUFBMEM3QixJQUExQyxFQUNBO0FBQ0UsYUFBSUYsSUFBSUUsS0FBSSxLQUFLc0IsSUFBakI7QUFDQSxhQUFJcUIsV0FBV2xCLElBQVgsQ0FBZ0J6QixFQUFoQixDQUFKLEVBQ0UsS0FBSzBDLFFBQUwsQ0FBY1EsS0FBZCxDQUFvQnBELENBQXBCLEVBQXVCQyxDQUF2QixFQUEwQixLQUFLdUIsSUFBL0IsRUFBcUMsS0FBS0EsSUFBMUM7QUFDSDtBQUVGOzs7Ozs7bUJBMUNrQm1CLFUiLCJmaWxlIjoiMWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZDBiNjVmNzk3NmNjZDE3ZjRhMWMiLCJcbi8vIEludGVyZXN0aW5nIHJ1bGVzOiAzMCwgNDUsIDkwLCAxMTBcblxuaW1wb3J0IENhbnZhczJkICAgICBmcm9tICcuLi9zcmMvQ2FudmFzMmQnO1xuaW1wb3J0IEdlbmVyYXRpb24gICBmcm9tICcuL0dlbmVyYXRpb24nO1xuaW1wb3J0IFJ1bGUgICAgICAgICBmcm9tICcuL1J1bGUnO1xuaW1wb3J0IFJlbmRlcmVyMWQgICBmcm9tICcuL1JlbmRlcmVyJztcblxubGV0IHJlbmRlcmVyLCB3b3JsZFNpemUsIHJ1bGUsIHRpbWVyID0gbnVsbDtcblxubGV0IGMgPSBuZXcgQ2FudmFzMmQoXCJjb250ZW50XCIpO1xuYy5maXR3aW5kb3coKTtcblxuUmVzdGFydCgpO1xuXG5cbmZ1bmN0aW9uIFJlc3RhcnQoKVxue1xuICBJbml0KCk7XG4gIEV2b2x2ZSgpO1xufVxuXG5mdW5jdGlvbiBJbml0KClcbntcbiAgbGV0IFt0cywgdHJdID0gWyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInR4dFNpemVcIiksXG4gICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0eHRSdWxlXCIpIF07XG4gIC8vIGNsYW1wIHZhbHVlcyBpbnRvIHJhbmdlXG4gIGxldCBzID0gTWF0aC5tYXgoTWF0aC5taW4odHMudmFsdWUsIDMyKSwxKTtcbiAgbGV0IHIgPSBNYXRoLm1heChNYXRoLm1pbih0ci52YWx1ZSwgMjU1KSwxKTtcblxuICBzID0gaXNOYU4ocykgPyA0IDogcztcbiAgciA9IGlzTmFOKHIpID8gOTA6IHI7XG5cbiAgW3RzLnZhbHVlLCB0ci52YWx1ZV0gPSBbcywgcl07XG5cbiAgcmVuZGVyZXIgPSBuZXcgUmVuZGVyZXIxZChjLCBzKTtcbiAgcnVsZSA9IG5ldyBSdWxlKHIpO1xuXG4gIHdvcmxkU2l6ZSA9IE1hdGguZmxvb3IoYy53aWR0aCgpIC8gcyk7XG5cbiAgaWYgKHRpbWVyKSB3aW5kb3cuY2xlYXJJbnRlcnZhbCh0aW1lcik7XG5cbiAgYy5jbGVhcigpO1xufVxuXG5cbmZ1bmN0aW9uIEV2b2x2ZSgpXG57XG4gIGMuZml0d2luZG93KCk7XG4gIGMuY2xlYXIoKTtcblxuICAvLyBDcmVhdGUgdGhlIGZpcnN0IGdlbmVyYXRpb25cbiAgbGV0IGcgPSBuZXcgR2VuZXJhdGlvbih3b3JsZFNpemUpO1xuXG4gIGxldCBpdGVyYXRpb24gPSAwO1xuICAvLyBSZW5kZXIgZmlyc3QgZ2VuIG5vd1xuICByZW5kZXJlci5yZW5kZXIoZywgaXRlcmF0aW9uKyspO1xuXG4gIC8vIEZvciAyZCsgdmVyc2lvbiB1c2UgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKClcbiAgdGltZXIgPSB3aW5kb3cuc2V0SW50ZXJ2YWwoKCkgPT4ge1xuXG4gICAgLy8gTXV0YXRlIHRoZSBsYXN0IGdlbmVyYXRpb24gaW50byBhIG5ldyBvbmVcbiAgICBnID0gZy5tdXRhdGUocnVsZSk7XG4gICAgcmVuZGVyZXIucmVuZGVyKGcsIGl0ZXJhdGlvbisrKTtcblxuICB9LCAyNSk7XG5cbn1cblxuXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJ0blJ1blwiKS5vbmNsaWNrID0gKCkgPT4ge1xuICBSZXN0YXJ0KCk7XG59XG5cblxud2luZG93Lm9ucmVzaXplID0gKGUpID0+IHtcbiAgUmVzdGFydCgpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vMWQvbWFpbi5qcyIsIlxuXG4vLyBCb2lsZXJwbGF0ZSBmdW5jdGlvbnMgdG8gd3JpdGUgdG8gdGhlIENhbnZhc1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYW52YXMyZFxue1xuICBjb25zdHJ1Y3RvcihwYXJlbnQpXG4gIHtcbiAgICB0aGlzLnBhcmVudCA9IHR5cGVvZiBwYXJlbnQgPT0gJ3N0cmluZycgPyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwYXJlbnQpIDogcGFyZW50O1xuICAgIHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgdGhpcy5wYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50KTtcbiAgICB0aGlzLmNvbnRleHQgPSB0aGlzLmVsZW1lbnQuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIHRoaXMuY2xlYXIoKTtcblxuICB9XG5cbiAgYmxvY2soeCx5LHcsaCxjKVxuICB7XG4gICAgbGV0IHQgPSB0aGlzLmNvbnRleHQ7XG4gICAgdC5iZWdpblBhdGgoKTtcbiAgICB0LnJlY3QoeCwgeSwgdywgaCk7XG4gICAgdC5maWxsU3R5bGUgPSBjID8gYHJnYigke2NbMF19LCR7Y1sxXX0sJHtjWzJdfSlgIDogXCJibGFja1wiO1xuICAgIHQuZmlsbCgpO1xuICB9XG5cbiAgc2VsZmJsaXQoc3gsIHN5LCBzdywgc2gsIGR4LCBkeSwgZHcsIGRoKVxuICB7XG4gICAgdGhpcy5jb250ZXh0LmRyYXdJbWFnZSh0aGlzLmNvbnRleHQuY2FudmFzLCBzeCwgc3ksIHN3LCBzaCwgZHgsIGR5LCBkdywgZGgpO1xuICB9XG5cbiAgY2xlYXIoYylcbiAge1xuICAgIGxldCB0ID0gdGhpcy5jb250ZXh0O1xuICAgIHQuYmVnaW5QYXRoKCk7XG4gICAgdC5yZWN0KDAsIDAsIHRoaXMuZWxlbWVudC53aWR0aCwgdGhpcy5lbGVtZW50LmhlaWdodCk7XG4gICAgdC5maWxsU3R5bGUgPSBjID8gYHJnYigke2NbMF19LCR7Y1sxXX0sJHtjWzJdfSlgIDogXCJ3aGl0ZVwiO1xuICAgIHQuZmlsbCgpO1xuICB9XG5cbiAgd2lkdGgoKVxuICB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudC53aWR0aDtcbiAgfVxuXG4gIGhlaWdodCgpXG4gIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50LmhlaWdodDtcbiAgfVxuXG4gIGZpdHdpbmRvdygpXG4gIHtcbiAgICB0aGlzLnJlc2l6ZSh0aGlzLnBhcmVudC5jbGllbnRXaWR0aCwgdGhpcy5wYXJlbnQuY2xpZW50SGVpZ2h0KTtcbiAgfVxuXG4gIHJlc2l6ZSh3LCBoKVxuICB7XG5cbiAgICB0aGlzLmVsZW1lbnQud2lkdGggPSB3O1xuICAgIHRoaXMuZWxlbWVudC5oZWlnaHQgPSBoO1xuXG4gICAgLy8gZHJhdygpXG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9DYW52YXMyZC5qcyIsIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHZW5lcmF0aW9uXG57XG4gIGNvbnN0cnVjdG9yKHNpemUsIHJhbmRvbWlzZSlcbiAge1xuICAgIHRoaXMuc2l6ZSA9IHNpemU7XG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICBpbml0KHJhbmRvbWlzZSlcbiAge1xuICAgIC8vIEFycmF5IG9mIHplcm9lc1xuICAgIHRoaXMuZGF0YSA9IEFycmF5LmZyb20obmV3IEFycmF5KHRoaXMuc2l6ZSksICgpID0+IDApO1xuXG4gICAgLy8gU3RpY2sgYSAxIGluIHRoZSBtaWRkbGVcbiAgICB0aGlzLmRhdGFbTWF0aC5yb3VuZCh0aGlzLnNpemUvMildID0gMTtcblxuICAgIGlmIChyYW5kb21pc2UpIC8vIHdvd1xuICAgICAgZm9yIChsZXQgdD0wOyB0PHRoaXMuZGF0YS5sZW5ndGg7IHQrKylcbiAgICAgICAgdGhpcy5kYXRhW3RdID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKTtcbiAgfVxuXG5cbiAgbXV0YXRlKHJ1bGUsIHdyYXApXG4gIHtcbiAgICAvLyBDcmVhdGUgYSBuZXcsIGJsYW5rLCBnZW5lcmF0aW9uIHRvIHdyaXRlIGludG9cbiAgICBsZXQgbiA9IG5ldyBHZW5lcmF0aW9uKHRoaXMuc2l6ZSk7XG5cbiAgICAvLyBMb29rIGF0IGVhY2ggJ2xpZmVmb3JtJyBpbiBvdXIgZ2VuZXJhdGlvbidzIHdvcmxkXG4gICAgZm9yIChsZXQgdD0wOyB0PHRoaXMuZGF0YS5sZW5ndGg7IHQrKylcbiAgICB7XG4gICAgICAvLyBHZXQgaXRzIG5laWdoYm91cnMsIHdyYXBwaW5nIHRoZSBlZGdlIGNhc2VzXG4gICAgICBsZXQgcHJldiA9IHQtMSA8IDAgPyB0aGlzLmRhdGEubGVuZ3RoLTEgOiB0LTE7XG4gICAgICBsZXQgbmV4dCA9IHQrMSA+IHRoaXMuZGF0YS5sZW5ndGgtMSA/IDAgOiB0KzE7XG5cbiAgICAgIGxldCBsID0gdGhpcy5kYXRhW3ByZXZdO1xuICAgICAgbGV0IGMgPSB0aGlzLmRhdGFbdF07XG4gICAgICBsZXQgciA9IHRoaXMuZGF0YVtuZXh0XTtcblxuICAgICAgLy8gQ3JlYXRlIGEgMy1iaXQgaW50ZWdlciBmcm9tIHRoZSBiaXQgcGF0dGVyblxuICAgICAgbGV0IHBhdHRlcm4gPSAoKGwmMSkgPDwgMikgfCAoKGMmMSkgPDwgMSkgfCAociYxKTtcblxuICAgICAgLy8gQXBwbHkgdGhlIHJ1bGUgdG8gdGhpcyBwYXR0ZXJuXG4gICAgICBsZXQgbmV4dGdlbiA9IHJ1bGUuYXBwbHkocGF0dGVybik7XG5cbiAgICAgIC8vIFB1dCB0aGUgbXV0YXRlZCAnbGlmZWZvcm0nIGludG8gdGhlIG5leHQgZ2VuZXJhdGlvblxuICAgICAgbi5kYXRhW3RdID0gbmV4dGdlbjtcbiAgICB9XG5cbiAgICAvLyBEaXNhYmxlIHdyYXBwaW5nXG4gICAgaWYgKCF3cmFwKVxuICAgIHtcbiAgICAgIG4uZGF0YVswXSA9IHRoaXMuZGF0YVswXTtcbiAgICAgIG4uZGF0YVtuLmRhdGEubGVuZ3RoLTFdID0gdGhpcy5kYXRhW3RoaXMuZGF0YS5sZW5ndGgtMV07XG4gICAgfVxuXG4gICAgLy8gcmV0dXJuIHRoZSBuZXh0IGdlbmVyYXRpb25cbiAgICByZXR1cm4gbjtcbiAgfVxuXG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLzFkL0dlbmVyYXRpb24uanMiLCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUnVsZVxue1xuICBjb25zdHJ1Y3RvcihzZWVkKVxuICB7XG4gICAgdGhpcy5zZWVkID0gc2VlZCAmIDB4ZmY7XG5cbiAgfVxuXG4gIGFwcGx5KG4pXG4gIHtcbiAgICAvLyBuIGlzIGEgbnVtYmVyIGZyb20gMCAtIDcgYW5kIGluZGljYXRlcyB0aGUgQml0IG9mIG91ciBydWxlIHRvIGFwcGx5XG4gICAgLy9jb25zb2xlLmxvZyhgU2hpZnRpbmcgdmFsdWUgJHt0aGlzLnNlZWR9ID4+ICR7bn0gdGltZXNgKTtcbiAgICByZXR1cm4gKCh0aGlzLnNlZWQgPj4gbikgJiAxKTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vMWQvUnVsZS5qcyIsIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZW5kZXJlcjFkXG57XG4gIC8vIHNpemUgPSBzcXVhcmUgc2l6ZSBvZiB0aGUgYmxvY2sgaW4gcGl4ZWxzXG4gIGNvbnN0cnVjdG9yKGNhbnZhczJkLCBzaXplKVxuICB7XG4gICAgdGhpcy5jYW52YXMyZCA9IGNhbnZhczJkO1xuICAgIHRoaXMuc2l6ZSA9IHNpemU7XG4gIH1cblxuICAvLyBEcmF3IGEgcm93IG9mIGJsb2Nrc1xuICByZW5kZXIoZ2VuZXJhdGlvbiwgaXRlcmF0aW9uKVxuICB7XG4gICAgbGV0IHZoZWlnaHQgPSB0aGlzLmNhbnZhczJkLmhlaWdodCgpO1xuICAgIGxldCB2d2lkdGggPSB0aGlzLmNhbnZhczJkLndpZHRoKCk7XG5cbiAgICBsZXQgbWF4cm93ID0gKE1hdGguZmxvb3IodmhlaWdodCAvIHRoaXMuc2l6ZSkpIC0gMTtcblxuICAgIGxldCB5ID0gaXRlcmF0aW9uICogdGhpcy5zaXplO1xuXG4gICAgLy8gSXRlcmF0aW9uIGV4Y2VlZHMgc2NyZWVuIHNwYWNlLi4uXG4gICAgaWYgKGl0ZXJhdGlvbiA+IG1heHJvdylcbiAgICB7XG4gICAgICAvLyBDb3B5IHRoZSB3aG9sZSBzY3JlZW4gYW5kIHNoaWZ0IGl0IHVwIG9uZSBibG9jayBzaXplXG4gICAgICBsZXQgeDEgPSAwLCB5MSA9IHRoaXMuc2l6ZTtcbiAgICAgIGxldCB3ID0gdndpZHRoLCBoID0gdmhlaWdodCAtIHRoaXMuc2l6ZTtcbiAgICAgIHRoaXMuY2FudmFzMmQuc2VsZmJsaXQoeDEsIHkxLCB3LCBoLCAwLCAwLCB3LCBoKTtcblxuICAgICAgLy8gYWRqdXN0IGl0ZXJhdGlvbiB0byB0aGUgYm90dG9tIG1vc3Qgcm93XG4gICAgICBpdGVyYXRpb24gPSBtYXhyb3c7XG4gICAgICB5ID0gaXRlcmF0aW9uICogdGhpcy5zaXplO1xuXG4gICAgICAvLyBDbGVhciB0aGUgbGFzdCByb3cgcmVhZHkgZm9yIGRyYXdpbmdcbiAgICAgIHRoaXMuY2FudmFzMmQuYmxvY2soMCwgeSwgdndpZHRoLCB0aGlzLnNpemUsIFsyNTUsMjU1LDI1NV0pO1xuICAgIH1cblxuICAgIGZvciAobGV0IHc9MDsgdzxnZW5lcmF0aW9uLmRhdGEubGVuZ3RoLTE7IHcrKylcbiAgICB7XG4gICAgICBsZXQgeCA9IHcgKiB0aGlzLnNpemU7XG4gICAgICBpZiAoZ2VuZXJhdGlvbi5kYXRhW3ddKVxuICAgICAgICB0aGlzLmNhbnZhczJkLmJsb2NrKHgsIHksIHRoaXMuc2l6ZSwgdGhpcy5zaXplKTtcbiAgICB9XG5cbiAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi8xZC9SZW5kZXJlci5qcyJdLCJzb3VyY2VSb290IjoiIn0=