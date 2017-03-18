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
	    iterations = void 0,
	    worldSize = void 0,
	    rule = void 0;
	
	var c = new _Canvas2d2.default("content");
	c.fitwindow();
	
	Init();
	Evolve();
	
	function Init() {
	  var _ref = [document.getElementById("txtSize"), document.getElementById("txtRule")],
	      ts = _ref[0],
	      tr = _ref[1];
	  // clamp values into range
	
	  var s = Math.max(Math.min(ts.value, 32), 1);
	  var r = Math.max(Math.min(tr.value, 255), 1);
	
	  var _ref2 = [s, r];
	  ts.value = _ref2[0];
	  tr.value = _ref2[1];
	
	
	  renderer = new _Renderer2.default(c, s);
	  rule = new _Rule2.default(r);
	
	  worldSize = Math.floor(c.width() / s);
	  iterations = Math.floor(c.height() / s);
	
	  c.clear();
	}
	
	function Evolve() {
	  c.fitwindow();
	  c.clear();
	
	  var g = new _Generation2.default(worldSize);
	
	  renderer.render(g, 0);
	  var iteration = 1;
	
	  window.setInterval(function () {
	    g = g.mutate(rule);
	    renderer.render(g, iteration);
	    iteration++;
	  }, 10);
	
	  // for (let i=1; i<iterations+1000; i++)
	  // {
	  //   g = g.mutate(rule);
	  //   renderer.render(g, i);
	  // }
	}
	
	document.getElementById("btnRun").onclick = function () {
	  Init();
	  Evolve();
	};
	
	window.onresize = function (e) {
	  Init();
	  Evolve();
	};
	
	// hello

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
	
	      if (iteration > maxrow) {
	
	        var x1 = 0,
	            y1 = 1 * this.size;
	        var xw = vwidth,
	            yh = vheight - this.size;
	        this.canvas2d.context.drawImage(this.canvas2d.context.canvas, x1, y1, xw, yh, 0, 0, xw, yh);
	
	        iteration = maxrow;
	        y = iteration * this.size;
	        this.canvas2d.block(0, y, vwidth, this.size, [255, 255, 255]);
	
	        //  return;
	      }
	
	      //if (iteration > maxrow) return;
	
	
	      for (var w = 0; w < generation.data.length - 1; w++) {
	        var x = w * this.size;
	        if (generation.data[w]) this.canvas2d.block(x, y, this.size, this.size);
	      }
	    }
	  }]);
	
	  return Renderer1d;
	}();
	
	exports.default = Renderer1d;

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOWIyYzgyNmQ0MTUyNzUyMWI0YmIiLCJ3ZWJwYWNrOi8vLy4vMWQvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQ2FudmFzMmQuanMiLCJ3ZWJwYWNrOi8vLy4vMWQvR2VuZXJhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi8xZC9SdWxlLmpzIiwid2VicGFjazovLy8uLzFkL1JlbmRlcmVyLmpzIl0sIm5hbWVzIjpbInJlbmRlcmVyIiwiaXRlcmF0aW9ucyIsIndvcmxkU2l6ZSIsInJ1bGUiLCJjIiwiZml0d2luZG93IiwiSW5pdCIsIkV2b2x2ZSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJ0cyIsInRyIiwicyIsIk1hdGgiLCJtYXgiLCJtaW4iLCJ2YWx1ZSIsInIiLCJmbG9vciIsIndpZHRoIiwiaGVpZ2h0IiwiY2xlYXIiLCJnIiwicmVuZGVyIiwiaXRlcmF0aW9uIiwid2luZG93Iiwic2V0SW50ZXJ2YWwiLCJtdXRhdGUiLCJvbmNsaWNrIiwib25yZXNpemUiLCJlIiwiQ2FudmFzMmQiLCJwYXJlbnQiLCJlbGVtZW50IiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZENoaWxkIiwiY29udGV4dCIsImdldENvbnRleHQiLCJ4IiwieSIsInciLCJoIiwidCIsImJlZ2luUGF0aCIsInJlY3QiLCJmaWxsU3R5bGUiLCJmaWxsIiwicmVzaXplIiwiY2xpZW50V2lkdGgiLCJjbGllbnRIZWlnaHQiLCJHZW5lcmF0aW9uIiwic2l6ZSIsInJhbmRvbWlzZSIsImluaXQiLCJkYXRhIiwiQXJyYXkiLCJmcm9tIiwicm91bmQiLCJsZW5ndGgiLCJyYW5kb20iLCJ3cmFwIiwibiIsInByZXYiLCJuZXh0IiwibCIsInBhdHRlcm4iLCJuZXh0Z2VuIiwiYXBwbHkiLCJSdWxlIiwic2VlZCIsIlJlbmRlcmVyMWQiLCJjYW52YXMyZCIsImdlbmVyYXRpb24iLCJ2aGVpZ2h0IiwidndpZHRoIiwibWF4cm93IiwieDEiLCJ5MSIsInh3IiwieWgiLCJkcmF3SW1hZ2UiLCJjYW52YXMiLCJibG9jayJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQ25DQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBTEE7O0FBT0EsS0FBSUEsaUJBQUo7QUFBQSxLQUFjQyxtQkFBZDtBQUFBLEtBQTBCQyxrQkFBMUI7QUFBQSxLQUFxQ0MsYUFBckM7O0FBRUEsS0FBSUMsSUFBSSx1QkFBYSxTQUFiLENBQVI7QUFDQUEsR0FBRUMsU0FBRjs7QUFHQUM7QUFDQUM7O0FBR0EsVUFBU0QsSUFBVCxHQUNBO0FBQUEsY0FDaUIsQ0FBRUUsU0FBU0MsY0FBVCxDQUF3QixTQUF4QixDQUFGLEVBQ0VELFNBQVNDLGNBQVQsQ0FBd0IsU0FBeEIsQ0FERixDQURqQjtBQUFBLE9BQ09DLEVBRFA7QUFBQSxPQUNXQyxFQURYO0FBR0U7O0FBQ0EsT0FBSUMsSUFBSUMsS0FBS0MsR0FBTCxDQUFTRCxLQUFLRSxHQUFMLENBQVNMLEdBQUdNLEtBQVosRUFBbUIsRUFBbkIsQ0FBVCxFQUFnQyxDQUFoQyxDQUFSO0FBQ0EsT0FBSUMsSUFBSUosS0FBS0MsR0FBTCxDQUFTRCxLQUFLRSxHQUFMLENBQVNKLEdBQUdLLEtBQVosRUFBbUIsR0FBbkIsQ0FBVCxFQUFpQyxDQUFqQyxDQUFSOztBQUxGLGVBT3lCLENBQUNKLENBQUQsRUFBSUssQ0FBSixDQVB6QjtBQU9HUCxNQUFHTSxLQVBOO0FBT2FMLE1BQUdLLEtBUGhCOzs7QUFTRWhCLGNBQVcsdUJBQWVJLENBQWYsRUFBa0JRLENBQWxCLENBQVg7QUFDQVQsVUFBTyxtQkFBU2MsQ0FBVCxDQUFQOztBQUVBZixlQUFZVyxLQUFLSyxLQUFMLENBQVdkLEVBQUVlLEtBQUYsS0FBWVAsQ0FBdkIsQ0FBWjtBQUNBWCxnQkFBYVksS0FBS0ssS0FBTCxDQUFXZCxFQUFFZ0IsTUFBRixLQUFhUixDQUF4QixDQUFiOztBQUVBUixLQUFFaUIsS0FBRjtBQUNEOztBQUVELFVBQVNkLE1BQVQsR0FDQTtBQUNFSCxLQUFFQyxTQUFGO0FBQ0FELEtBQUVpQixLQUFGOztBQUVBLE9BQUlDLElBQUkseUJBQWVwQixTQUFmLENBQVI7O0FBRUFGLFlBQVN1QixNQUFULENBQWdCRCxDQUFoQixFQUFtQixDQUFuQjtBQUNBLE9BQUlFLFlBQVksQ0FBaEI7O0FBRUFDLFVBQU9DLFdBQVAsQ0FBbUIsWUFBTTtBQUN2QkosU0FBSUEsRUFBRUssTUFBRixDQUFTeEIsSUFBVCxDQUFKO0FBQ0FILGNBQVN1QixNQUFULENBQWdCRCxDQUFoQixFQUFtQkUsU0FBbkI7QUFDQUE7QUFDRCxJQUpELEVBSUcsRUFKSDs7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUQ7O0FBR0RoQixVQUFTQyxjQUFULENBQXdCLFFBQXhCLEVBQWtDbUIsT0FBbEMsR0FBNEMsWUFBTTtBQUNoRHRCO0FBQ0FDO0FBQ0QsRUFIRDs7QUFNQWtCLFFBQU9JLFFBQVAsR0FBa0IsVUFBQ0MsQ0FBRCxFQUFPO0FBQ3ZCeEI7QUFDQUM7QUFDRCxFQUhEOztBQU1BLFM7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4RUE7O0tBRXFCd0IsUTtBQUVuQixxQkFBWUMsTUFBWixFQUNBO0FBQUE7O0FBQ0UsVUFBS0EsTUFBTCxHQUFjLE9BQU9BLE1BQVAsSUFBaUIsUUFBakIsR0FBNEJ4QixTQUFTQyxjQUFULENBQXdCdUIsTUFBeEIsQ0FBNUIsR0FBOERBLE1BQTVFO0FBQ0EsVUFBS0MsT0FBTCxHQUFlekIsU0FBUzBCLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBZjtBQUNBLFVBQUtGLE1BQUwsQ0FBWUcsV0FBWixDQUF3QixLQUFLRixPQUE3QjtBQUNBLFVBQUtHLE9BQUwsR0FBZSxLQUFLSCxPQUFMLENBQWFJLFVBQWIsQ0FBd0IsSUFBeEIsQ0FBZjtBQUNBLFVBQUtoQixLQUFMO0FBRUQ7Ozs7MkJBRUtpQixDLEVBQUVDLEMsRUFBRUMsQyxFQUFFQyxDLEVBQUVyQyxDLEVBQ2Q7QUFDRSxXQUFJc0MsSUFBSSxLQUFLTixPQUFiO0FBQ0FNLFNBQUVDLFNBQUY7QUFDQUQsU0FBRUUsSUFBRixDQUFPTixDQUFQLEVBQVVDLENBQVYsRUFBYUMsQ0FBYixFQUFnQkMsQ0FBaEI7QUFDQUMsU0FBRUcsU0FBRixHQUFjekMsYUFBV0EsRUFBRSxDQUFGLENBQVgsU0FBbUJBLEVBQUUsQ0FBRixDQUFuQixTQUEyQkEsRUFBRSxDQUFGLENBQTNCLFNBQXFDLE9BQW5EO0FBQ0FzQyxTQUFFSSxJQUFGO0FBQ0Q7OzsyQkFFSzFDLEMsRUFDTjtBQUNFLFdBQUlzQyxJQUFJLEtBQUtOLE9BQWI7QUFDQU0sU0FBRUMsU0FBRjtBQUNBRCxTQUFFRSxJQUFGLENBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxLQUFLWCxPQUFMLENBQWFkLEtBQTFCLEVBQWlDLEtBQUtjLE9BQUwsQ0FBYWIsTUFBOUM7QUFDQXNCLFNBQUVHLFNBQUYsR0FBY3pDLGFBQVdBLEVBQUUsQ0FBRixDQUFYLFNBQW1CQSxFQUFFLENBQUYsQ0FBbkIsU0FBMkJBLEVBQUUsQ0FBRixDQUEzQixTQUFxQyxPQUFuRDtBQUNBc0MsU0FBRUksSUFBRjtBQUNEOzs7NkJBR0Q7QUFDRSxjQUFPLEtBQUtiLE9BQUwsQ0FBYWQsS0FBcEI7QUFDRDs7OzhCQUdEO0FBQ0UsY0FBTyxLQUFLYyxPQUFMLENBQWFiLE1BQXBCO0FBQ0Q7OztpQ0FHRDtBQUNFLFlBQUsyQixNQUFMLENBQVksS0FBS2YsTUFBTCxDQUFZZ0IsV0FBeEIsRUFBcUMsS0FBS2hCLE1BQUwsQ0FBWWlCLFlBQWpEO0FBQ0Q7Ozs0QkFFTVQsQyxFQUFHQyxDLEVBQ1Y7O0FBRUUsWUFBS1IsT0FBTCxDQUFhZCxLQUFiLEdBQXFCcUIsQ0FBckI7QUFDQSxZQUFLUCxPQUFMLENBQWFiLE1BQWIsR0FBc0JxQixDQUF0Qjs7QUFFQTtBQUNEOzs7Ozs7bUJBcERrQlYsUTs7Ozs7Ozs7Ozs7Ozs7OztLQ0ZBbUIsVTtBQUVuQix1QkFBWUMsSUFBWixFQUFrQkMsU0FBbEIsRUFDQTtBQUFBOztBQUNFLFVBQUtELElBQUwsR0FBWUEsSUFBWjtBQUNBLFVBQUtFLElBQUw7QUFDRDs7OzswQkFFSUQsUyxFQUNMO0FBQ0U7QUFDQSxZQUFLRSxJQUFMLEdBQVlDLE1BQU1DLElBQU4sQ0FBVyxJQUFJRCxLQUFKLENBQVUsS0FBS0osSUFBZixDQUFYLEVBQWlDO0FBQUEsZ0JBQU0sQ0FBTjtBQUFBLFFBQWpDLENBQVo7O0FBRUE7QUFDQSxZQUFLRyxJQUFMLENBQVV6QyxLQUFLNEMsS0FBTCxDQUFXLEtBQUtOLElBQUwsR0FBVSxDQUFyQixDQUFWLElBQXFDLENBQXJDOztBQUVBLFdBQUlDLFNBQUosRUFBZTtBQUNiLGNBQUssSUFBSVYsSUFBRSxDQUFYLEVBQWNBLElBQUUsS0FBS1ksSUFBTCxDQUFVSSxNQUExQixFQUFrQ2hCLEdBQWxDO0FBQ0UsZ0JBQUtZLElBQUwsQ0FBVVosQ0FBVixJQUFlN0IsS0FBSzRDLEtBQUwsQ0FBVzVDLEtBQUs4QyxNQUFMLEVBQVgsQ0FBZjtBQURGO0FBRUg7Ozs0QkFHTXhELEksRUFBTXlELEksRUFDYjtBQUNFO0FBQ0EsV0FBSUMsSUFBSSxJQUFJWCxVQUFKLENBQWUsS0FBS0MsSUFBcEIsQ0FBUjs7QUFFQTtBQUNBLFlBQUssSUFBSVQsSUFBRSxDQUFYLEVBQWNBLElBQUUsS0FBS1ksSUFBTCxDQUFVSSxNQUExQixFQUFrQ2hCLEdBQWxDLEVBQ0E7QUFDRTtBQUNBLGFBQUlvQixPQUFPcEIsSUFBRSxDQUFGLEdBQU0sQ0FBTixHQUFVLEtBQUtZLElBQUwsQ0FBVUksTUFBVixHQUFpQixDQUEzQixHQUErQmhCLElBQUUsQ0FBNUM7QUFDQSxhQUFJcUIsT0FBT3JCLElBQUUsQ0FBRixHQUFNLEtBQUtZLElBQUwsQ0FBVUksTUFBVixHQUFpQixDQUF2QixHQUEyQixDQUEzQixHQUErQmhCLElBQUUsQ0FBNUM7O0FBRUEsYUFBSXNCLElBQUksS0FBS1YsSUFBTCxDQUFVUSxJQUFWLENBQVI7QUFDQSxhQUFJMUQsSUFBSSxLQUFLa0QsSUFBTCxDQUFVWixDQUFWLENBQVI7QUFDQSxhQUFJekIsSUFBSSxLQUFLcUMsSUFBTCxDQUFVUyxJQUFWLENBQVI7O0FBRUE7QUFDQSxhQUFJRSxVQUFXLENBQUNELElBQUUsQ0FBSCxLQUFTLENBQVYsR0FBZ0IsQ0FBQzVELElBQUUsQ0FBSCxLQUFTLENBQXpCLEdBQStCYSxJQUFFLENBQS9DOztBQUVBO0FBQ0EsYUFBSWlELFVBQVUvRCxLQUFLZ0UsS0FBTCxDQUFXRixPQUFYLENBQWQ7O0FBRUE7QUFDQUosV0FBRVAsSUFBRixDQUFPWixDQUFQLElBQVl3QixPQUFaO0FBQ0Q7O0FBRUQ7QUFDQSxXQUFJLENBQUNOLElBQUwsRUFDQTtBQUNFQyxXQUFFUCxJQUFGLENBQU8sQ0FBUCxJQUFZLEtBQUtBLElBQUwsQ0FBVSxDQUFWLENBQVo7QUFDQU8sV0FBRVAsSUFBRixDQUFPTyxFQUFFUCxJQUFGLENBQU9JLE1BQVAsR0FBYyxDQUFyQixJQUEwQixLQUFLSixJQUFMLENBQVUsS0FBS0EsSUFBTCxDQUFVSSxNQUFWLEdBQWlCLENBQTNCLENBQTFCO0FBQ0Q7O0FBRUQ7QUFDQSxjQUFPRyxDQUFQO0FBQ0Q7Ozs7OzttQkF6RGtCWCxVOzs7Ozs7Ozs7Ozs7Ozs7O0tDQUFrQixJO0FBRW5CLGlCQUFZQyxJQUFaLEVBQ0E7QUFBQTs7QUFDRSxVQUFLQSxJQUFMLEdBQVlBLE9BQU8sSUFBbkI7QUFFRDs7OzsyQkFFS1IsQyxFQUNOO0FBQ0U7QUFDQTtBQUNBLGNBQVMsS0FBS1EsSUFBTCxJQUFhUixDQUFkLEdBQW1CLENBQTNCO0FBQ0Q7Ozs7OzttQkFia0JPLEk7Ozs7Ozs7Ozs7Ozs7Ozs7S0NBQUUsVTtBQUVuQjtBQUNBLHVCQUFZQyxRQUFaLEVBQXNCcEIsSUFBdEIsRUFDQTtBQUFBOztBQUNFLFVBQUtvQixRQUFMLEdBQWdCQSxRQUFoQjtBQUNBLFVBQUtwQixJQUFMLEdBQVlBLElBQVo7QUFDRDs7QUFFRDs7Ozs7NEJBQ09xQixVLEVBQVloRCxTLEVBQ25CO0FBQ0UsV0FBSWlELFVBQVUsS0FBS0YsUUFBTCxDQUFjbkQsTUFBZCxFQUFkO0FBQ0EsV0FBSXNELFNBQVMsS0FBS0gsUUFBTCxDQUFjcEQsS0FBZCxFQUFiOztBQUVBLFdBQUl3RCxTQUFVOUQsS0FBS0ssS0FBTCxDQUFXdUQsVUFBVSxLQUFLdEIsSUFBMUIsQ0FBRCxHQUFvQyxDQUFqRDs7QUFFQSxXQUFJWixJQUFJZixZQUFZLEtBQUsyQixJQUF6Qjs7QUFFQSxXQUFJM0IsWUFBWW1ELE1BQWhCLEVBQ0E7O0FBRUUsYUFBSUMsS0FBSyxDQUFUO0FBQUEsYUFBWUMsS0FBSyxJQUFJLEtBQUsxQixJQUExQjtBQUNBLGFBQUkyQixLQUFLSixNQUFUO0FBQUEsYUFBaUJLLEtBQUtOLFVBQVUsS0FBS3RCLElBQXJDO0FBQ0EsY0FBS29CLFFBQUwsQ0FBY25DLE9BQWQsQ0FBc0I0QyxTQUF0QixDQUFnQyxLQUFLVCxRQUFMLENBQWNuQyxPQUFkLENBQXNCNkMsTUFBdEQsRUFBOERMLEVBQTlELEVBQWtFQyxFQUFsRSxFQUFzRUMsRUFBdEUsRUFBMEVDLEVBQTFFLEVBQThFLENBQTlFLEVBQWlGLENBQWpGLEVBQW9GRCxFQUFwRixFQUF3RkMsRUFBeEY7O0FBRUF2RCxxQkFBWW1ELE1BQVo7QUFDQXBDLGFBQUlmLFlBQVksS0FBSzJCLElBQXJCO0FBQ0EsY0FBS29CLFFBQUwsQ0FBY1csS0FBZCxDQUFvQixDQUFwQixFQUF1QjNDLENBQXZCLEVBQTBCbUMsTUFBMUIsRUFBa0MsS0FBS3ZCLElBQXZDLEVBQTZDLENBQUMsR0FBRCxFQUFLLEdBQUwsRUFBUyxHQUFULENBQTdDOztBQUVGO0FBQ0M7O0FBRUQ7OztBQUtBLFlBQUssSUFBSVgsSUFBRSxDQUFYLEVBQWNBLElBQUVnQyxXQUFXbEIsSUFBWCxDQUFnQkksTUFBaEIsR0FBdUIsQ0FBdkMsRUFBMENsQixHQUExQyxFQUNBO0FBQ0UsYUFBSUYsSUFBSUUsSUFBSSxLQUFLVyxJQUFqQjtBQUNBLGFBQUlxQixXQUFXbEIsSUFBWCxDQUFnQmQsQ0FBaEIsQ0FBSixFQUNFLEtBQUsrQixRQUFMLENBQWNXLEtBQWQsQ0FBb0I1QyxDQUFwQixFQUF1QkMsQ0FBdkIsRUFBMEIsS0FBS1ksSUFBL0IsRUFBcUMsS0FBS0EsSUFBMUM7QUFDSDtBQUVGOzs7Ozs7bUJBN0NrQm1CLFUiLCJmaWxlIjoiMWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgOWIyYzgyNmQ0MTUyNzUyMWI0YmIiLCJcbi8vIEludGVyZXN0aW5nIHJ1bGVzOiAzMCwgNDUsIDkwLCAxMTBcblxuaW1wb3J0IENhbnZhczJkICAgICBmcm9tICcuLi9zcmMvQ2FudmFzMmQnO1xuaW1wb3J0IEdlbmVyYXRpb24gICBmcm9tICcuL0dlbmVyYXRpb24nO1xuaW1wb3J0IFJ1bGUgICAgICAgICBmcm9tICcuL1J1bGUnO1xuaW1wb3J0IFJlbmRlcmVyMWQgICBmcm9tICcuL1JlbmRlcmVyJztcblxubGV0IHJlbmRlcmVyLCBpdGVyYXRpb25zLCB3b3JsZFNpemUsIHJ1bGU7XG5cbmxldCBjID0gbmV3IENhbnZhczJkKFwiY29udGVudFwiKTtcbmMuZml0d2luZG93KCk7XG5cblxuSW5pdCgpO1xuRXZvbHZlKCk7XG5cblxuZnVuY3Rpb24gSW5pdCgpXG57XG4gIGxldCBbdHMsIHRyXSA9IFsgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0eHRTaXplXCIpLFxuICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidHh0UnVsZVwiKSBdO1xuICAvLyBjbGFtcCB2YWx1ZXMgaW50byByYW5nZVxuICBsZXQgcyA9IE1hdGgubWF4KE1hdGgubWluKHRzLnZhbHVlLCAzMiksMSk7XG4gIGxldCByID0gTWF0aC5tYXgoTWF0aC5taW4odHIudmFsdWUsIDI1NSksMSk7XG5cbiAgW3RzLnZhbHVlLCB0ci52YWx1ZV0gPSBbcywgcl07XG5cbiAgcmVuZGVyZXIgPSBuZXcgUmVuZGVyZXIxZChjLCBzKTtcbiAgcnVsZSA9IG5ldyBSdWxlKHIpO1xuXG4gIHdvcmxkU2l6ZSA9IE1hdGguZmxvb3IoYy53aWR0aCgpIC8gcyk7XG4gIGl0ZXJhdGlvbnMgPSBNYXRoLmZsb29yKGMuaGVpZ2h0KCkgLyBzKTtcblxuICBjLmNsZWFyKCk7XG59XG5cbmZ1bmN0aW9uIEV2b2x2ZSgpXG57XG4gIGMuZml0d2luZG93KCk7XG4gIGMuY2xlYXIoKTtcblxuICBsZXQgZyA9IG5ldyBHZW5lcmF0aW9uKHdvcmxkU2l6ZSk7XG5cbiAgcmVuZGVyZXIucmVuZGVyKGcsIDApO1xuICBsZXQgaXRlcmF0aW9uID0gMTtcblxuICB3aW5kb3cuc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgIGcgPSBnLm11dGF0ZShydWxlKTtcbiAgICByZW5kZXJlci5yZW5kZXIoZywgaXRlcmF0aW9uKTtcbiAgICBpdGVyYXRpb24rKztcbiAgfSwgMTApO1xuXG4gIC8vIGZvciAobGV0IGk9MTsgaTxpdGVyYXRpb25zKzEwMDA7IGkrKylcbiAgLy8ge1xuICAvLyAgIGcgPSBnLm11dGF0ZShydWxlKTtcbiAgLy8gICByZW5kZXJlci5yZW5kZXIoZywgaSk7XG4gIC8vIH1cblxufVxuXG5cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYnRuUnVuXCIpLm9uY2xpY2sgPSAoKSA9PiB7XG4gIEluaXQoKTtcbiAgRXZvbHZlKCk7XG59XG5cblxud2luZG93Lm9ucmVzaXplID0gKGUpID0+IHtcbiAgSW5pdCgpO1xuICBFdm9sdmUoKTtcbn1cblxuXG4vLyBoZWxsb1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vMWQvbWFpbi5qcyIsIlxuXG4vLyBCb2lsZXJwbGF0ZSBmdW5jdGlvbnMgdG8gd3JpdGUgdG8gdGhlIENhbnZhcyBcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FudmFzMmRcbntcbiAgY29uc3RydWN0b3IocGFyZW50KVxuICB7XG4gICAgdGhpcy5wYXJlbnQgPSB0eXBlb2YgcGFyZW50ID09ICdzdHJpbmcnID8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGFyZW50KSA6IHBhcmVudDtcbiAgICB0aGlzLmVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgIHRoaXMucGFyZW50LmFwcGVuZENoaWxkKHRoaXMuZWxlbWVudCk7XG4gICAgdGhpcy5jb250ZXh0ID0gdGhpcy5lbGVtZW50LmdldENvbnRleHQoXCIyZFwiKTtcbiAgICB0aGlzLmNsZWFyKCk7XG5cbiAgfVxuXG4gIGJsb2NrKHgseSx3LGgsYylcbiAge1xuICAgIGxldCB0ID0gdGhpcy5jb250ZXh0O1xuICAgIHQuYmVnaW5QYXRoKCk7XG4gICAgdC5yZWN0KHgsIHksIHcsIGgpO1xuICAgIHQuZmlsbFN0eWxlID0gYyA/IGByZ2IoJHtjWzBdfSwke2NbMV19LCR7Y1syXX0pYCA6IFwiYmxhY2tcIjtcbiAgICB0LmZpbGwoKTtcbiAgfVxuXG4gIGNsZWFyKGMpXG4gIHtcbiAgICBsZXQgdCA9IHRoaXMuY29udGV4dDtcbiAgICB0LmJlZ2luUGF0aCgpO1xuICAgIHQucmVjdCgwLCAwLCB0aGlzLmVsZW1lbnQud2lkdGgsIHRoaXMuZWxlbWVudC5oZWlnaHQpO1xuICAgIHQuZmlsbFN0eWxlID0gYyA/IGByZ2IoJHtjWzBdfSwke2NbMV19LCR7Y1syXX0pYCA6IFwid2hpdGVcIjtcbiAgICB0LmZpbGwoKTtcbiAgfVxuXG4gIHdpZHRoKClcbiAge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnQud2lkdGg7XG4gIH1cblxuICBoZWlnaHQoKVxuICB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudC5oZWlnaHQ7XG4gIH1cblxuICBmaXR3aW5kb3coKVxuICB7XG4gICAgdGhpcy5yZXNpemUodGhpcy5wYXJlbnQuY2xpZW50V2lkdGgsIHRoaXMucGFyZW50LmNsaWVudEhlaWdodCk7XG4gIH1cblxuICByZXNpemUodywgaClcbiAge1xuXG4gICAgdGhpcy5lbGVtZW50LndpZHRoID0gdztcbiAgICB0aGlzLmVsZW1lbnQuaGVpZ2h0ID0gaDtcblxuICAgIC8vIGRyYXcoKVxuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQ2FudmFzMmQuanMiLCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2VuZXJhdGlvblxue1xuICBjb25zdHJ1Y3RvcihzaXplLCByYW5kb21pc2UpXG4gIHtcbiAgICB0aGlzLnNpemUgPSBzaXplO1xuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgaW5pdChyYW5kb21pc2UpXG4gIHtcbiAgICAvLyBBcnJheSBvZiB6ZXJvZXNcbiAgICB0aGlzLmRhdGEgPSBBcnJheS5mcm9tKG5ldyBBcnJheSh0aGlzLnNpemUpLCAoKSA9PiAwKTtcblxuICAgIC8vIFN0aWNrIGEgMSBpbiB0aGUgbWlkZGxlXG4gICAgdGhpcy5kYXRhW01hdGgucm91bmQodGhpcy5zaXplLzIpXSA9IDE7XG5cbiAgICBpZiAocmFuZG9taXNlKSAvLyB3b3dcbiAgICAgIGZvciAobGV0IHQ9MDsgdDx0aGlzLmRhdGEubGVuZ3RoOyB0KyspXG4gICAgICAgIHRoaXMuZGF0YVt0XSA9IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSk7XG4gIH1cblxuXG4gIG11dGF0ZShydWxlLCB3cmFwKVxuICB7XG4gICAgLy8gQ3JlYXRlIGEgbmV3LCBibGFuaywgZ2VuZXJhdGlvbiB0byB3cml0ZSBpbnRvXG4gICAgbGV0IG4gPSBuZXcgR2VuZXJhdGlvbih0aGlzLnNpemUpO1xuXG4gICAgLy8gTG9vayBhdCBlYWNoICdsaWZlZm9ybScgaW4gb3VyIGdlbmVyYXRpb24ncyB3b3JsZFxuICAgIGZvciAobGV0IHQ9MDsgdDx0aGlzLmRhdGEubGVuZ3RoOyB0KyspXG4gICAge1xuICAgICAgLy8gR2V0IGl0cyBuZWlnaGJvdXJzLCB3cmFwcGluZyB0aGUgZWRnZSBjYXNlc1xuICAgICAgbGV0IHByZXYgPSB0LTEgPCAwID8gdGhpcy5kYXRhLmxlbmd0aC0xIDogdC0xO1xuICAgICAgbGV0IG5leHQgPSB0KzEgPiB0aGlzLmRhdGEubGVuZ3RoLTEgPyAwIDogdCsxO1xuXG4gICAgICBsZXQgbCA9IHRoaXMuZGF0YVtwcmV2XTtcbiAgICAgIGxldCBjID0gdGhpcy5kYXRhW3RdO1xuICAgICAgbGV0IHIgPSB0aGlzLmRhdGFbbmV4dF07XG5cbiAgICAgIC8vIENyZWF0ZSBhIDMtYml0IGludGVnZXIgZnJvbSB0aGUgYml0IHBhdHRlcm5cbiAgICAgIGxldCBwYXR0ZXJuID0gKChsJjEpIDw8IDIpIHwgKChjJjEpIDw8IDEpIHwgKHImMSk7XG5cbiAgICAgIC8vIEFwcGx5IHRoZSBydWxlIHRvIHRoaXMgcGF0dGVyblxuICAgICAgbGV0IG5leHRnZW4gPSBydWxlLmFwcGx5KHBhdHRlcm4pO1xuXG4gICAgICAvLyBQdXQgdGhlIG11dGF0ZWQgJ2xpZmVmb3JtJyBpbnRvIHRoZSBuZXh0IGdlbmVyYXRpb25cbiAgICAgIG4uZGF0YVt0XSA9IG5leHRnZW47XG4gICAgfVxuXG4gICAgLy8gRGlzYWJsZSB3cmFwcGluZ1xuICAgIGlmICghd3JhcClcbiAgICB7XG4gICAgICBuLmRhdGFbMF0gPSB0aGlzLmRhdGFbMF07XG4gICAgICBuLmRhdGFbbi5kYXRhLmxlbmd0aC0xXSA9IHRoaXMuZGF0YVt0aGlzLmRhdGEubGVuZ3RoLTFdO1xuICAgIH1cblxuICAgIC8vIHJldHVybiB0aGUgbmV4dCBnZW5lcmF0aW9uXG4gICAgcmV0dXJuIG47XG4gIH1cblxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi8xZC9HZW5lcmF0aW9uLmpzIiwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJ1bGVcbntcbiAgY29uc3RydWN0b3Ioc2VlZClcbiAge1xuICAgIHRoaXMuc2VlZCA9IHNlZWQgJiAweGZmO1xuXG4gIH1cblxuICBhcHBseShuKVxuICB7XG4gICAgLy8gbiBpcyBhIG51bWJlciBmcm9tIDAgLSA3IGFuZCBpbmRpY2F0ZXMgdGhlIEJpdCBvZiBvdXIgcnVsZSB0byBhcHBseVxuICAgIC8vY29uc29sZS5sb2coYFNoaWZ0aW5nIHZhbHVlICR7dGhpcy5zZWVkfSA+PiAke259IHRpbWVzYCk7XG4gICAgcmV0dXJuICgodGhpcy5zZWVkID4+IG4pICYgMSk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLzFkL1J1bGUuanMiLCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVuZGVyZXIxZFxue1xuICAvLyBzaXplID0gc3F1YXJlIHNpemUgb2YgdGhlIGJsb2NrIGluIHBpeGVsc1xuICBjb25zdHJ1Y3RvcihjYW52YXMyZCwgc2l6ZSlcbiAge1xuICAgIHRoaXMuY2FudmFzMmQgPSBjYW52YXMyZDtcbiAgICB0aGlzLnNpemUgPSBzaXplO1xuICB9XG5cbiAgLy8gRHJhdyBhIHJvdyBvZiBibG9ja3NcbiAgcmVuZGVyKGdlbmVyYXRpb24sIGl0ZXJhdGlvbilcbiAge1xuICAgIGxldCB2aGVpZ2h0ID0gdGhpcy5jYW52YXMyZC5oZWlnaHQoKTtcbiAgICBsZXQgdndpZHRoID0gdGhpcy5jYW52YXMyZC53aWR0aCgpO1xuXG4gICAgbGV0IG1heHJvdyA9IChNYXRoLmZsb29yKHZoZWlnaHQgLyB0aGlzLnNpemUpKSAtIDE7XG5cbiAgICBsZXQgeSA9IGl0ZXJhdGlvbiAqIHRoaXMuc2l6ZTtcblxuICAgIGlmIChpdGVyYXRpb24gPiBtYXhyb3cpXG4gICAge1xuXG4gICAgICBsZXQgeDEgPSAwLCB5MSA9IDEgKiB0aGlzLnNpemU7XG4gICAgICBsZXQgeHcgPSB2d2lkdGgsIHloID0gdmhlaWdodCAtIHRoaXMuc2l6ZTsgICAgICBcbiAgICAgIHRoaXMuY2FudmFzMmQuY29udGV4dC5kcmF3SW1hZ2UodGhpcy5jYW52YXMyZC5jb250ZXh0LmNhbnZhcywgeDEsIHkxLCB4dywgeWgsIDAsIDAsIHh3LCB5aCk7XG5cbiAgICAgIGl0ZXJhdGlvbiA9IG1heHJvdztcbiAgICAgIHkgPSBpdGVyYXRpb24gKiB0aGlzLnNpemU7XG4gICAgICB0aGlzLmNhbnZhczJkLmJsb2NrKDAsIHksIHZ3aWR0aCwgdGhpcy5zaXplLCBbMjU1LDI1NSwyNTVdKTtcblxuICAgIC8vICByZXR1cm47XG4gICAgfVxuXG4gICAgLy9pZiAoaXRlcmF0aW9uID4gbWF4cm93KSByZXR1cm47XG5cblxuXG5cbiAgICBmb3IgKGxldCB3PTA7IHc8Z2VuZXJhdGlvbi5kYXRhLmxlbmd0aC0xOyB3KyspXG4gICAge1xuICAgICAgbGV0IHggPSB3ICogdGhpcy5zaXplO1xuICAgICAgaWYgKGdlbmVyYXRpb24uZGF0YVt3XSlcbiAgICAgICAgdGhpcy5jYW52YXMyZC5ibG9jayh4LCB5LCB0aGlzLnNpemUsIHRoaXMuc2l6ZSk7XG4gICAgfVxuXG4gIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vMWQvUmVuZGVyZXIuanMiXSwic291cmNlUm9vdCI6IiJ9