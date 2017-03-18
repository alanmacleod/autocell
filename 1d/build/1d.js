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
	}
	
	function Evolve() {
	  c.fitwindow();
	  c.clear();
	
	  var g = new _Generation2.default(worldSize);
	
	  renderer.render(g, 0);
	
	  for (var i = 1; i < iterations; i++) {
	    g = g.mutate(rule);
	    renderer.render(g, i);
	  }
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
	      var y = iteration * this.size;
	
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMTIwY2Y1OTFmYmU1Y2Q5NWY0OTIiLCJ3ZWJwYWNrOi8vLy4vMWQvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQ2FudmFzMmQuanMiLCJ3ZWJwYWNrOi8vLy4vMWQvR2VuZXJhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi8xZC9SdWxlLmpzIiwid2VicGFjazovLy8uLzFkL1JlbmRlcmVyLmpzIl0sIm5hbWVzIjpbInJlbmRlcmVyIiwiaXRlcmF0aW9ucyIsIndvcmxkU2l6ZSIsInJ1bGUiLCJjIiwiZml0d2luZG93IiwiSW5pdCIsIkV2b2x2ZSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJ0cyIsInRyIiwicyIsIk1hdGgiLCJtYXgiLCJtaW4iLCJ2YWx1ZSIsInIiLCJmbG9vciIsIndpZHRoIiwiaGVpZ2h0IiwiY2xlYXIiLCJnIiwicmVuZGVyIiwiaSIsIm11dGF0ZSIsIm9uY2xpY2siLCJ3aW5kb3ciLCJvbnJlc2l6ZSIsImUiLCJDYW52YXMyZCIsInBhcmVudCIsImVsZW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiYXBwZW5kQ2hpbGQiLCJjb250ZXh0IiwiZ2V0Q29udGV4dCIsIngiLCJ5IiwidyIsImgiLCJ0IiwiYmVnaW5QYXRoIiwicmVjdCIsImZpbGxTdHlsZSIsImZpbGwiLCJyZXNpemUiLCJjbGllbnRXaWR0aCIsImNsaWVudEhlaWdodCIsIkdlbmVyYXRpb24iLCJzaXplIiwicmFuZG9taXNlIiwiaW5pdCIsImRhdGEiLCJBcnJheSIsImZyb20iLCJyb3VuZCIsImxlbmd0aCIsInJhbmRvbSIsIndyYXAiLCJuIiwicHJldiIsIm5leHQiLCJsIiwicGF0dGVybiIsIm5leHRnZW4iLCJhcHBseSIsIlJ1bGUiLCJzZWVkIiwiUmVuZGVyZXIxZCIsImNhbnZhczJkIiwiZ2VuZXJhdGlvbiIsIml0ZXJhdGlvbiIsImJsb2NrIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7O0FDbkNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFMQTs7QUFPQSxLQUFJQSxpQkFBSjtBQUFBLEtBQWNDLG1CQUFkO0FBQUEsS0FBMEJDLGtCQUExQjtBQUFBLEtBQXFDQyxhQUFyQzs7QUFFQSxLQUFJQyxJQUFJLHVCQUFhLFNBQWIsQ0FBUjtBQUNBQSxHQUFFQyxTQUFGOztBQUdBQztBQUNBQzs7QUFHQSxVQUFTRCxJQUFULEdBQ0E7QUFBQSxjQUNpQixDQUFFRSxTQUFTQyxjQUFULENBQXdCLFNBQXhCLENBQUYsRUFDRUQsU0FBU0MsY0FBVCxDQUF3QixTQUF4QixDQURGLENBRGpCO0FBQUEsT0FDT0MsRUFEUDtBQUFBLE9BQ1dDLEVBRFg7QUFHRTs7QUFDQSxPQUFJQyxJQUFJQyxLQUFLQyxHQUFMLENBQVNELEtBQUtFLEdBQUwsQ0FBU0wsR0FBR00sS0FBWixFQUFtQixFQUFuQixDQUFULEVBQWdDLENBQWhDLENBQVI7QUFDQSxPQUFJQyxJQUFJSixLQUFLQyxHQUFMLENBQVNELEtBQUtFLEdBQUwsQ0FBU0osR0FBR0ssS0FBWixFQUFtQixHQUFuQixDQUFULEVBQWlDLENBQWpDLENBQVI7O0FBTEYsZUFPeUIsQ0FBQ0osQ0FBRCxFQUFJSyxDQUFKLENBUHpCO0FBT0dQLE1BQUdNLEtBUE47QUFPYUwsTUFBR0ssS0FQaEI7OztBQVNFaEIsY0FBVyx1QkFBZUksQ0FBZixFQUFrQlEsQ0FBbEIsQ0FBWDtBQUNBVCxVQUFPLG1CQUFTYyxDQUFULENBQVA7O0FBRUFmLGVBQVlXLEtBQUtLLEtBQUwsQ0FBV2QsRUFBRWUsS0FBRixLQUFZUCxDQUF2QixDQUFaO0FBQ0FYLGdCQUFhWSxLQUFLSyxLQUFMLENBQVdkLEVBQUVnQixNQUFGLEtBQWFSLENBQXhCLENBQWI7QUFDRDs7QUFFRCxVQUFTTCxNQUFULEdBQ0E7QUFDRUgsS0FBRUMsU0FBRjtBQUNBRCxLQUFFaUIsS0FBRjs7QUFFQSxPQUFJQyxJQUFJLHlCQUFlcEIsU0FBZixDQUFSOztBQUVBRixZQUFTdUIsTUFBVCxDQUFnQkQsQ0FBaEIsRUFBbUIsQ0FBbkI7O0FBRUEsUUFBSyxJQUFJRSxJQUFFLENBQVgsRUFBY0EsSUFBRXZCLFVBQWhCLEVBQTRCdUIsR0FBNUIsRUFDQTtBQUNFRixTQUFJQSxFQUFFRyxNQUFGLENBQVN0QixJQUFULENBQUo7QUFDQUgsY0FBU3VCLE1BQVQsQ0FBZ0JELENBQWhCLEVBQW1CRSxDQUFuQjtBQUNEO0FBRUY7O0FBR0RoQixVQUFTQyxjQUFULENBQXdCLFFBQXhCLEVBQWtDaUIsT0FBbEMsR0FBNEMsWUFBTTtBQUNoRHBCO0FBQ0FDO0FBQ0QsRUFIRDs7QUFNQW9CLFFBQU9DLFFBQVAsR0FBa0IsVUFBQ0MsQ0FBRCxFQUFPO0FBQ3ZCdkI7QUFDQUM7QUFDRCxFQUhEOztBQU1BLFM7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvREE7O0tBRXFCdUIsUTtBQUVuQixxQkFBWUMsTUFBWixFQUNBO0FBQUE7O0FBQ0UsVUFBS0EsTUFBTCxHQUFjLE9BQU9BLE1BQVAsSUFBaUIsUUFBakIsR0FBNEJ2QixTQUFTQyxjQUFULENBQXdCc0IsTUFBeEIsQ0FBNUIsR0FBOERBLE1BQTVFO0FBQ0EsVUFBS0MsT0FBTCxHQUFleEIsU0FBU3lCLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBZjtBQUNBLFVBQUtGLE1BQUwsQ0FBWUcsV0FBWixDQUF3QixLQUFLRixPQUE3QjtBQUNBLFVBQUtHLE9BQUwsR0FBZSxLQUFLSCxPQUFMLENBQWFJLFVBQWIsQ0FBd0IsSUFBeEIsQ0FBZjtBQUNBLFVBQUtmLEtBQUw7QUFFRDs7OzsyQkFFS2dCLEMsRUFBRUMsQyxFQUFFQyxDLEVBQUVDLEMsRUFBRXBDLEMsRUFDZDtBQUNFLFdBQUlxQyxJQUFJLEtBQUtOLE9BQWI7QUFDQU0sU0FBRUMsU0FBRjtBQUNBRCxTQUFFRSxJQUFGLENBQU9OLENBQVAsRUFBVUMsQ0FBVixFQUFhQyxDQUFiLEVBQWdCQyxDQUFoQjtBQUNBQyxTQUFFRyxTQUFGLEdBQWN4QyxhQUFXQSxFQUFFLENBQUYsQ0FBWCxTQUFtQkEsRUFBRSxDQUFGLENBQW5CLFNBQTJCQSxFQUFFLENBQUYsQ0FBM0IsU0FBcUMsT0FBbkQ7QUFDQXFDLFNBQUVJLElBQUY7QUFDRDs7OzJCQUVLekMsQyxFQUNOO0FBQ0UsV0FBSXFDLElBQUksS0FBS04sT0FBYjtBQUNBTSxTQUFFQyxTQUFGO0FBQ0FELFNBQUVFLElBQUYsQ0FBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLEtBQUtYLE9BQUwsQ0FBYWIsS0FBMUIsRUFBaUMsS0FBS2EsT0FBTCxDQUFhWixNQUE5QztBQUNBcUIsU0FBRUcsU0FBRixHQUFjeEMsYUFBV0EsRUFBRSxDQUFGLENBQVgsU0FBbUJBLEVBQUUsQ0FBRixDQUFuQixTQUEyQkEsRUFBRSxDQUFGLENBQTNCLFNBQXFDLE9BQW5EO0FBQ0FxQyxTQUFFSSxJQUFGO0FBQ0Q7Ozs2QkFHRDtBQUNFLGNBQU8sS0FBS2IsT0FBTCxDQUFhYixLQUFwQjtBQUNEOzs7OEJBR0Q7QUFDRSxjQUFPLEtBQUthLE9BQUwsQ0FBYVosTUFBcEI7QUFDRDs7O2lDQUdEO0FBQ0UsWUFBSzBCLE1BQUwsQ0FBWSxLQUFLZixNQUFMLENBQVlnQixXQUF4QixFQUFxQyxLQUFLaEIsTUFBTCxDQUFZaUIsWUFBakQ7QUFDRDs7OzRCQUVNVCxDLEVBQUdDLEMsRUFDVjs7QUFFRSxZQUFLUixPQUFMLENBQWFiLEtBQWIsR0FBcUJvQixDQUFyQjtBQUNBLFlBQUtQLE9BQUwsQ0FBYVosTUFBYixHQUFzQm9CLENBQXRCOztBQUVBO0FBQ0Q7Ozs7OzttQkFwRGtCVixROzs7Ozs7Ozs7Ozs7Ozs7O0tDRkFtQixVO0FBRW5CLHVCQUFZQyxJQUFaLEVBQWtCQyxTQUFsQixFQUNBO0FBQUE7O0FBQ0UsVUFBS0QsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsVUFBS0UsSUFBTDtBQUNEOzs7OzBCQUVJRCxTLEVBQ0w7QUFDRTtBQUNBLFlBQUtFLElBQUwsR0FBWUMsTUFBTUMsSUFBTixDQUFXLElBQUlELEtBQUosQ0FBVSxLQUFLSixJQUFmLENBQVgsRUFBaUM7QUFBQSxnQkFBTSxDQUFOO0FBQUEsUUFBakMsQ0FBWjs7QUFFQTtBQUNBLFlBQUtHLElBQUwsQ0FBVXhDLEtBQUsyQyxLQUFMLENBQVcsS0FBS04sSUFBTCxHQUFVLENBQXJCLENBQVYsSUFBcUMsQ0FBckM7O0FBRUEsV0FBSUMsU0FBSixFQUFlO0FBQ2IsY0FBSyxJQUFJVixJQUFFLENBQVgsRUFBY0EsSUFBRSxLQUFLWSxJQUFMLENBQVVJLE1BQTFCLEVBQWtDaEIsR0FBbEM7QUFDRSxnQkFBS1ksSUFBTCxDQUFVWixDQUFWLElBQWU1QixLQUFLMkMsS0FBTCxDQUFXM0MsS0FBSzZDLE1BQUwsRUFBWCxDQUFmO0FBREY7QUFFSDs7OzRCQUdNdkQsSSxFQUFNd0QsSSxFQUNiO0FBQ0U7QUFDQSxXQUFJQyxJQUFJLElBQUlYLFVBQUosQ0FBZSxLQUFLQyxJQUFwQixDQUFSOztBQUVBO0FBQ0EsWUFBSyxJQUFJVCxJQUFFLENBQVgsRUFBY0EsSUFBRSxLQUFLWSxJQUFMLENBQVVJLE1BQTFCLEVBQWtDaEIsR0FBbEMsRUFDQTtBQUNFO0FBQ0EsYUFBSW9CLE9BQU9wQixJQUFFLENBQUYsR0FBTSxDQUFOLEdBQVUsS0FBS1ksSUFBTCxDQUFVSSxNQUFWLEdBQWlCLENBQTNCLEdBQStCaEIsSUFBRSxDQUE1QztBQUNBLGFBQUlxQixPQUFPckIsSUFBRSxDQUFGLEdBQU0sS0FBS1ksSUFBTCxDQUFVSSxNQUFWLEdBQWlCLENBQXZCLEdBQTJCLENBQTNCLEdBQStCaEIsSUFBRSxDQUE1Qzs7QUFFQSxhQUFJc0IsSUFBSSxLQUFLVixJQUFMLENBQVVRLElBQVYsQ0FBUjtBQUNBLGFBQUl6RCxJQUFJLEtBQUtpRCxJQUFMLENBQVVaLENBQVYsQ0FBUjtBQUNBLGFBQUl4QixJQUFJLEtBQUtvQyxJQUFMLENBQVVTLElBQVYsQ0FBUjs7QUFFQTtBQUNBLGFBQUlFLFVBQVcsQ0FBQ0QsSUFBRSxDQUFILEtBQVMsQ0FBVixHQUFnQixDQUFDM0QsSUFBRSxDQUFILEtBQVMsQ0FBekIsR0FBK0JhLElBQUUsQ0FBL0M7O0FBRUE7QUFDQSxhQUFJZ0QsVUFBVTlELEtBQUsrRCxLQUFMLENBQVdGLE9BQVgsQ0FBZDs7QUFFQTtBQUNBSixXQUFFUCxJQUFGLENBQU9aLENBQVAsSUFBWXdCLE9BQVo7QUFDRDs7QUFFRDtBQUNBLFdBQUksQ0FBQ04sSUFBTCxFQUNBO0FBQ0VDLFdBQUVQLElBQUYsQ0FBTyxDQUFQLElBQVksS0FBS0EsSUFBTCxDQUFVLENBQVYsQ0FBWjtBQUNBTyxXQUFFUCxJQUFGLENBQU9PLEVBQUVQLElBQUYsQ0FBT0ksTUFBUCxHQUFjLENBQXJCLElBQTBCLEtBQUtKLElBQUwsQ0FBVSxLQUFLQSxJQUFMLENBQVVJLE1BQVYsR0FBaUIsQ0FBM0IsQ0FBMUI7QUFDRDs7QUFFRDtBQUNBLGNBQU9HLENBQVA7QUFDRDs7Ozs7O21CQXpEa0JYLFU7Ozs7Ozs7Ozs7Ozs7Ozs7S0NBQWtCLEk7QUFFbkIsaUJBQVlDLElBQVosRUFDQTtBQUFBOztBQUNFLFVBQUtBLElBQUwsR0FBWUEsT0FBTyxJQUFuQjtBQUVEOzs7OzJCQUVLUixDLEVBQ047QUFDRTtBQUNBO0FBQ0EsY0FBUyxLQUFLUSxJQUFMLElBQWFSLENBQWQsR0FBbUIsQ0FBM0I7QUFDRDs7Ozs7O21CQWJrQk8sSTs7Ozs7Ozs7Ozs7Ozs7OztLQ0FBRSxVO0FBRW5CO0FBQ0EsdUJBQVlDLFFBQVosRUFBc0JwQixJQUF0QixFQUNBO0FBQUE7O0FBQ0UsVUFBS29CLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0EsVUFBS3BCLElBQUwsR0FBWUEsSUFBWjtBQUNEOztBQUVEOzs7Ozs0QkFDT3FCLFUsRUFBWUMsUyxFQUNuQjtBQUNFLFdBQUlsQyxJQUFJa0MsWUFBWSxLQUFLdEIsSUFBekI7O0FBRUEsWUFBSyxJQUFJWCxJQUFFLENBQVgsRUFBY0EsSUFBRWdDLFdBQVdsQixJQUFYLENBQWdCSSxNQUFoQixHQUF1QixDQUF2QyxFQUEwQ2xCLEdBQTFDLEVBQ0E7QUFDRSxhQUFJRixJQUFJRSxJQUFJLEtBQUtXLElBQWpCO0FBQ0EsYUFBSXFCLFdBQVdsQixJQUFYLENBQWdCZCxDQUFoQixDQUFKLEVBQ0UsS0FBSytCLFFBQUwsQ0FBY0csS0FBZCxDQUFvQnBDLENBQXBCLEVBQXVCQyxDQUF2QixFQUEwQixLQUFLWSxJQUEvQixFQUFxQyxLQUFLQSxJQUExQztBQUNIO0FBRUY7Ozs7OzttQkFyQmtCbUIsVSIsImZpbGUiOiIxZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAxMjBjZjU5MWZiZTVjZDk1ZjQ5MiIsIlxuLy8gSW50ZXJlc3RpbmcgcnVsZXM6IDMwLCA0NSwgOTAsIDExMFxuXG5pbXBvcnQgQ2FudmFzMmQgICAgIGZyb20gJy4uL3NyYy9DYW52YXMyZCc7XG5pbXBvcnQgR2VuZXJhdGlvbiAgIGZyb20gJy4vR2VuZXJhdGlvbic7XG5pbXBvcnQgUnVsZSAgICAgICAgIGZyb20gJy4vUnVsZSc7XG5pbXBvcnQgUmVuZGVyZXIxZCAgIGZyb20gJy4vUmVuZGVyZXInO1xuXG5sZXQgcmVuZGVyZXIsIGl0ZXJhdGlvbnMsIHdvcmxkU2l6ZSwgcnVsZTtcblxubGV0IGMgPSBuZXcgQ2FudmFzMmQoXCJjb250ZW50XCIpO1xuYy5maXR3aW5kb3coKTtcblxuXG5Jbml0KCk7XG5Fdm9sdmUoKTtcblxuXG5mdW5jdGlvbiBJbml0KClcbntcbiAgbGV0IFt0cywgdHJdID0gWyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInR4dFNpemVcIiksXG4gICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0eHRSdWxlXCIpIF07XG4gIC8vIGNsYW1wIHZhbHVlcyBpbnRvIHJhbmdlXG4gIGxldCBzID0gTWF0aC5tYXgoTWF0aC5taW4odHMudmFsdWUsIDMyKSwxKTtcbiAgbGV0IHIgPSBNYXRoLm1heChNYXRoLm1pbih0ci52YWx1ZSwgMjU1KSwxKTtcblxuICBbdHMudmFsdWUsIHRyLnZhbHVlXSA9IFtzLCByXTtcblxuICByZW5kZXJlciA9IG5ldyBSZW5kZXJlcjFkKGMsIHMpO1xuICBydWxlID0gbmV3IFJ1bGUocik7XG5cbiAgd29ybGRTaXplID0gTWF0aC5mbG9vcihjLndpZHRoKCkgLyBzKTtcbiAgaXRlcmF0aW9ucyA9IE1hdGguZmxvb3IoYy5oZWlnaHQoKSAvIHMpO1xufVxuXG5mdW5jdGlvbiBFdm9sdmUoKVxue1xuICBjLmZpdHdpbmRvdygpO1xuICBjLmNsZWFyKCk7XG5cbiAgbGV0IGcgPSBuZXcgR2VuZXJhdGlvbih3b3JsZFNpemUpO1xuXG4gIHJlbmRlcmVyLnJlbmRlcihnLCAwKTtcblxuICBmb3IgKGxldCBpPTE7IGk8aXRlcmF0aW9uczsgaSsrKVxuICB7XG4gICAgZyA9IGcubXV0YXRlKHJ1bGUpO1xuICAgIHJlbmRlcmVyLnJlbmRlcihnLCBpKTtcbiAgfVxuXG59XG5cblxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJidG5SdW5cIikub25jbGljayA9ICgpID0+IHtcbiAgSW5pdCgpO1xuICBFdm9sdmUoKTtcbn1cblxuXG53aW5kb3cub25yZXNpemUgPSAoZSkgPT4ge1xuICBJbml0KCk7XG4gIEV2b2x2ZSgpO1xufVxuXG5cbi8vIGhlbGxvXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi8xZC9tYWluLmpzIiwiXG5cbi8vIEJvaWxlcnBsYXRlIGZ1bmN0aW9ucyB0byB3cml0ZSB0byB0aGUgQ2FudmFzIFxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYW52YXMyZFxue1xuICBjb25zdHJ1Y3RvcihwYXJlbnQpXG4gIHtcbiAgICB0aGlzLnBhcmVudCA9IHR5cGVvZiBwYXJlbnQgPT0gJ3N0cmluZycgPyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwYXJlbnQpIDogcGFyZW50O1xuICAgIHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgdGhpcy5wYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50KTtcbiAgICB0aGlzLmNvbnRleHQgPSB0aGlzLmVsZW1lbnQuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIHRoaXMuY2xlYXIoKTtcblxuICB9XG5cbiAgYmxvY2soeCx5LHcsaCxjKVxuICB7XG4gICAgbGV0IHQgPSB0aGlzLmNvbnRleHQ7XG4gICAgdC5iZWdpblBhdGgoKTtcbiAgICB0LnJlY3QoeCwgeSwgdywgaCk7XG4gICAgdC5maWxsU3R5bGUgPSBjID8gYHJnYigke2NbMF19LCR7Y1sxXX0sJHtjWzJdfSlgIDogXCJibGFja1wiO1xuICAgIHQuZmlsbCgpO1xuICB9XG5cbiAgY2xlYXIoYylcbiAge1xuICAgIGxldCB0ID0gdGhpcy5jb250ZXh0O1xuICAgIHQuYmVnaW5QYXRoKCk7XG4gICAgdC5yZWN0KDAsIDAsIHRoaXMuZWxlbWVudC53aWR0aCwgdGhpcy5lbGVtZW50LmhlaWdodCk7XG4gICAgdC5maWxsU3R5bGUgPSBjID8gYHJnYigke2NbMF19LCR7Y1sxXX0sJHtjWzJdfSlgIDogXCJ3aGl0ZVwiO1xuICAgIHQuZmlsbCgpO1xuICB9XG5cbiAgd2lkdGgoKVxuICB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudC53aWR0aDtcbiAgfVxuXG4gIGhlaWdodCgpXG4gIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50LmhlaWdodDtcbiAgfVxuXG4gIGZpdHdpbmRvdygpXG4gIHtcbiAgICB0aGlzLnJlc2l6ZSh0aGlzLnBhcmVudC5jbGllbnRXaWR0aCwgdGhpcy5wYXJlbnQuY2xpZW50SGVpZ2h0KTtcbiAgfVxuXG4gIHJlc2l6ZSh3LCBoKVxuICB7XG5cbiAgICB0aGlzLmVsZW1lbnQud2lkdGggPSB3O1xuICAgIHRoaXMuZWxlbWVudC5oZWlnaHQgPSBoO1xuXG4gICAgLy8gZHJhdygpXG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9DYW52YXMyZC5qcyIsIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHZW5lcmF0aW9uXG57XG4gIGNvbnN0cnVjdG9yKHNpemUsIHJhbmRvbWlzZSlcbiAge1xuICAgIHRoaXMuc2l6ZSA9IHNpemU7XG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICBpbml0KHJhbmRvbWlzZSlcbiAge1xuICAgIC8vIEFycmF5IG9mIHplcm9lc1xuICAgIHRoaXMuZGF0YSA9IEFycmF5LmZyb20obmV3IEFycmF5KHRoaXMuc2l6ZSksICgpID0+IDApO1xuXG4gICAgLy8gU3RpY2sgYSAxIGluIHRoZSBtaWRkbGVcbiAgICB0aGlzLmRhdGFbTWF0aC5yb3VuZCh0aGlzLnNpemUvMildID0gMTtcblxuICAgIGlmIChyYW5kb21pc2UpIC8vIHdvd1xuICAgICAgZm9yIChsZXQgdD0wOyB0PHRoaXMuZGF0YS5sZW5ndGg7IHQrKylcbiAgICAgICAgdGhpcy5kYXRhW3RdID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKTtcbiAgfVxuXG5cbiAgbXV0YXRlKHJ1bGUsIHdyYXApXG4gIHtcbiAgICAvLyBDcmVhdGUgYSBuZXcsIGJsYW5rLCBnZW5lcmF0aW9uIHRvIHdyaXRlIGludG9cbiAgICBsZXQgbiA9IG5ldyBHZW5lcmF0aW9uKHRoaXMuc2l6ZSk7XG5cbiAgICAvLyBMb29rIGF0IGVhY2ggJ2xpZmVmb3JtJyBpbiBvdXIgZ2VuZXJhdGlvbidzIHdvcmxkXG4gICAgZm9yIChsZXQgdD0wOyB0PHRoaXMuZGF0YS5sZW5ndGg7IHQrKylcbiAgICB7XG4gICAgICAvLyBHZXQgaXRzIG5laWdoYm91cnMsIHdyYXBwaW5nIHRoZSBlZGdlIGNhc2VzXG4gICAgICBsZXQgcHJldiA9IHQtMSA8IDAgPyB0aGlzLmRhdGEubGVuZ3RoLTEgOiB0LTE7XG4gICAgICBsZXQgbmV4dCA9IHQrMSA+IHRoaXMuZGF0YS5sZW5ndGgtMSA/IDAgOiB0KzE7XG5cbiAgICAgIGxldCBsID0gdGhpcy5kYXRhW3ByZXZdO1xuICAgICAgbGV0IGMgPSB0aGlzLmRhdGFbdF07XG4gICAgICBsZXQgciA9IHRoaXMuZGF0YVtuZXh0XTtcblxuICAgICAgLy8gQ3JlYXRlIGEgMy1iaXQgaW50ZWdlciBmcm9tIHRoZSBiaXQgcGF0dGVyblxuICAgICAgbGV0IHBhdHRlcm4gPSAoKGwmMSkgPDwgMikgfCAoKGMmMSkgPDwgMSkgfCAociYxKTtcblxuICAgICAgLy8gQXBwbHkgdGhlIHJ1bGUgdG8gdGhpcyBwYXR0ZXJuXG4gICAgICBsZXQgbmV4dGdlbiA9IHJ1bGUuYXBwbHkocGF0dGVybik7XG5cbiAgICAgIC8vIFB1dCB0aGUgbXV0YXRlZCAnbGlmZWZvcm0nIGludG8gdGhlIG5leHQgZ2VuZXJhdGlvblxuICAgICAgbi5kYXRhW3RdID0gbmV4dGdlbjtcbiAgICB9XG5cbiAgICAvLyBEaXNhYmxlIHdyYXBwaW5nXG4gICAgaWYgKCF3cmFwKVxuICAgIHtcbiAgICAgIG4uZGF0YVswXSA9IHRoaXMuZGF0YVswXTtcbiAgICAgIG4uZGF0YVtuLmRhdGEubGVuZ3RoLTFdID0gdGhpcy5kYXRhW3RoaXMuZGF0YS5sZW5ndGgtMV07XG4gICAgfVxuXG4gICAgLy8gcmV0dXJuIHRoZSBuZXh0IGdlbmVyYXRpb25cbiAgICByZXR1cm4gbjtcbiAgfVxuXG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLzFkL0dlbmVyYXRpb24uanMiLCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUnVsZVxue1xuICBjb25zdHJ1Y3RvcihzZWVkKVxuICB7XG4gICAgdGhpcy5zZWVkID0gc2VlZCAmIDB4ZmY7XG5cbiAgfVxuXG4gIGFwcGx5KG4pXG4gIHtcbiAgICAvLyBuIGlzIGEgbnVtYmVyIGZyb20gMCAtIDcgYW5kIGluZGljYXRlcyB0aGUgQml0IG9mIG91ciBydWxlIHRvIGFwcGx5XG4gICAgLy9jb25zb2xlLmxvZyhgU2hpZnRpbmcgdmFsdWUgJHt0aGlzLnNlZWR9ID4+ICR7bn0gdGltZXNgKTtcbiAgICByZXR1cm4gKCh0aGlzLnNlZWQgPj4gbikgJiAxKTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vMWQvUnVsZS5qcyIsIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZW5kZXJlcjFkXG57XG4gIC8vIHNpemUgPSBzcXVhcmUgc2l6ZSBvZiB0aGUgYmxvY2sgaW4gcGl4ZWxzXG4gIGNvbnN0cnVjdG9yKGNhbnZhczJkLCBzaXplKVxuICB7XG4gICAgdGhpcy5jYW52YXMyZCA9IGNhbnZhczJkO1xuICAgIHRoaXMuc2l6ZSA9IHNpemU7XG4gIH1cblxuICAvLyBEcmF3IGEgcm93IG9mIGJsb2NrcyBcbiAgcmVuZGVyKGdlbmVyYXRpb24sIGl0ZXJhdGlvbilcbiAge1xuICAgIGxldCB5ID0gaXRlcmF0aW9uICogdGhpcy5zaXplO1xuXG4gICAgZm9yIChsZXQgdz0wOyB3PGdlbmVyYXRpb24uZGF0YS5sZW5ndGgtMTsgdysrKVxuICAgIHtcbiAgICAgIGxldCB4ID0gdyAqIHRoaXMuc2l6ZTtcbiAgICAgIGlmIChnZW5lcmF0aW9uLmRhdGFbd10pXG4gICAgICAgIHRoaXMuY2FudmFzMmQuYmxvY2soeCwgeSwgdGhpcy5zaXplLCB0aGlzLnNpemUpO1xuICAgIH1cblxuICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLzFkL1JlbmRlcmVyLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==