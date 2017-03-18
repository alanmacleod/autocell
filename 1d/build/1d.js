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
	
	var _Generation = __webpack_require__(3);
	
	var _Generation2 = _interopRequireDefault(_Generation);
	
	var _Rule = __webpack_require__(4);
	
	var _Rule2 = _interopRequireDefault(_Rule);
	
	var _Renderer = __webpack_require__(5);
	
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
/* 2 */,
/* 3 */
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
	    this.init(!!randomise);
	  }
	
	  _createClass(Generation, [{
	    key: "init",
	    value: function init(randomise) {
	      this.data = Array.from(new Array(this.size), function () {
	        return 0;
	      });
	      this.data[Math.round(this.size / 2)] = 1;
	
	      if (randomise) // wow
	        for (var t = 0; t < this.data.length; t++) {
	          this.data[t] = Math.round(Math.random());
	        }
	    }
	  }, {
	    key: "mutate",
	    value: function mutate(rule) {
	      var n = new Generation(this.size);
	
	      for (var t = 0; t < this.data.length; t++) {
	        var prev = t - 1 < 0 ? this.data.length - 1 : t - 1;
	        var next = t + 1 > this.data.length - 1 ? 0 : t + 1;
	
	        var l = this.data[prev];
	        var c = this.data[t];
	        var r = this.data[next];
	
	        var pattern = (l & 1) << 2 | (c & 1) << 1 | r & 1;
	        var nextgen = rule.apply(pattern);
	
	        n.data[t] = nextgen;
	      }
	
	      n.data[0] = this.data[0];
	      n.data[n.data.length - 1] = this.data[this.data.length - 1];
	
	      return n;
	    }
	  }]);
	
	  return Generation;
	}();
	
	exports.default = Generation;

/***/ },
/* 4 */
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
/* 5 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOTM5YWQ3N2MwYzQwMTJlYjg4ZGUiLCJ3ZWJwYWNrOi8vLy4vMWQvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQ2FudmFzMmQuanMiLCJ3ZWJwYWNrOi8vLy4vMWQvR2VuZXJhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi8xZC9SdWxlLmpzIiwid2VicGFjazovLy8uLzFkL1JlbmRlcmVyLmpzIl0sIm5hbWVzIjpbInJlbmRlcmVyIiwiaXRlcmF0aW9ucyIsIndvcmxkU2l6ZSIsInJ1bGUiLCJjIiwiZml0d2luZG93IiwiSW5pdCIsIkV2b2x2ZSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJ0cyIsInRyIiwicyIsIk1hdGgiLCJtYXgiLCJtaW4iLCJ2YWx1ZSIsInIiLCJmbG9vciIsIndpZHRoIiwiaGVpZ2h0IiwiY2xlYXIiLCJnIiwicmVuZGVyIiwiaSIsIm11dGF0ZSIsIm9uY2xpY2siLCJ3aW5kb3ciLCJvbnJlc2l6ZSIsImUiLCJDYW52YXMyZCIsInBhcmVudCIsImVsZW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiYXBwZW5kQ2hpbGQiLCJjb250ZXh0IiwiZ2V0Q29udGV4dCIsIngiLCJ5IiwidyIsImgiLCJ0IiwiYmVnaW5QYXRoIiwicmVjdCIsImZpbGxTdHlsZSIsImZpbGwiLCJyZXNpemUiLCJjbGllbnRXaWR0aCIsImNsaWVudEhlaWdodCIsIkdlbmVyYXRpb24iLCJzaXplIiwicmFuZG9taXNlIiwiaW5pdCIsImRhdGEiLCJBcnJheSIsImZyb20iLCJyb3VuZCIsImxlbmd0aCIsInJhbmRvbSIsIm4iLCJwcmV2IiwibmV4dCIsImwiLCJwYXR0ZXJuIiwibmV4dGdlbiIsImFwcGx5IiwiUnVsZSIsInNlZWQiLCJSZW5kZXJlcjFkIiwiY2FudmFzMmQiLCJnZW5lcmF0aW9uIiwiaXRlcmF0aW9uIiwiYmxvY2siXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7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QUlvQixXQUFXakIsSUFBWCxDQUFnQmQsQ0FBaEIsQ0FBSixFQUNFLEtBQUs4QixRQUFMLENBQWNHLEtBQWQsQ0FBb0JuQyxDQUFwQixFQUF1QkMsQ0FBdkIsRUFBMEIsS0FBS1ksSUFBL0IsRUFBcUMsS0FBS0EsSUFBMUM7QUFDSDtBQUVGOzs7Ozs7bUJBckJrQmtCLFUiLCJmaWxlIjoiMWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgOTM5YWQ3N2MwYzQwMTJlYjg4ZGUiLCJcbi8vIEludGVyZXN0aW5nIHJ1bGVzOiAzMCwgNDUsIDkwLCAxMTBcblxuaW1wb3J0IENhbnZhczJkICAgICBmcm9tICcuLi9zcmMvQ2FudmFzMmQnO1xuaW1wb3J0IEdlbmVyYXRpb24gICBmcm9tICcuL0dlbmVyYXRpb24nO1xuaW1wb3J0IFJ1bGUgICAgICAgICBmcm9tICcuL1J1bGUnO1xuaW1wb3J0IFJlbmRlcmVyMWQgICBmcm9tICcuL1JlbmRlcmVyJztcblxubGV0IHJlbmRlcmVyLCBpdGVyYXRpb25zLCB3b3JsZFNpemUsIHJ1bGU7XG5cbmxldCBjID0gbmV3IENhbnZhczJkKFwiY29udGVudFwiKTtcbmMuZml0d2luZG93KCk7XG5cblxuSW5pdCgpO1xuRXZvbHZlKCk7XG5cblxuZnVuY3Rpb24gSW5pdCgpXG57XG4gIGxldCBbdHMsIHRyXSA9IFsgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0eHRTaXplXCIpLFxuICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidHh0UnVsZVwiKSBdO1xuICAvLyBjbGFtcCB2YWx1ZXMgaW50byByYW5nZVxuICBsZXQgcyA9IE1hdGgubWF4KE1hdGgubWluKHRzLnZhbHVlLCAzMiksMSk7XG4gIGxldCByID0gTWF0aC5tYXgoTWF0aC5taW4odHIudmFsdWUsIDI1NSksMSk7XG5cbiAgW3RzLnZhbHVlLCB0ci52YWx1ZV0gPSBbcywgcl07XG5cbiAgcmVuZGVyZXIgPSBuZXcgUmVuZGVyZXIxZChjLCBzKTtcbiAgcnVsZSA9IG5ldyBSdWxlKHIpO1xuXG4gIHdvcmxkU2l6ZSA9IE1hdGguZmxvb3IoYy53aWR0aCgpIC8gcyk7XG4gIGl0ZXJhdGlvbnMgPSBNYXRoLmZsb29yKGMuaGVpZ2h0KCkgLyBzKTtcbn1cblxuZnVuY3Rpb24gRXZvbHZlKClcbntcbiAgYy5maXR3aW5kb3coKTtcbiAgYy5jbGVhcigpO1xuXG4gIGxldCBnID0gbmV3IEdlbmVyYXRpb24od29ybGRTaXplKTtcblxuICByZW5kZXJlci5yZW5kZXIoZywgMCk7XG5cbiAgZm9yIChsZXQgaT0xOyBpPGl0ZXJhdGlvbnM7IGkrKylcbiAge1xuICAgIGcgPSBnLm11dGF0ZShydWxlKTtcbiAgICByZW5kZXJlci5yZW5kZXIoZywgaSk7XG4gIH1cblxufVxuXG5cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYnRuUnVuXCIpLm9uY2xpY2sgPSAoKSA9PiB7XG4gIEluaXQoKTtcbiAgRXZvbHZlKCk7XG59XG5cblxud2luZG93Lm9ucmVzaXplID0gKGUpID0+IHtcbiAgSW5pdCgpO1xuICBFdm9sdmUoKTtcbn1cblxuXG4vLyBoZWxsb1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vMWQvbWFpbi5qcyIsIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYW52YXMyZFxue1xuICBjb25zdHJ1Y3RvcihwYXJlbnQpXG4gIHtcbiAgICB0aGlzLnBhcmVudCA9IHR5cGVvZiBwYXJlbnQgPT0gJ3N0cmluZycgPyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwYXJlbnQpIDogcGFyZW50O1xuICAgIHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgdGhpcy5wYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50KTtcbiAgICB0aGlzLmNvbnRleHQgPSB0aGlzLmVsZW1lbnQuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIHRoaXMuY2xlYXIoKTtcblxuICB9XG5cbiAgYmxvY2soeCx5LHcsaCxjKVxuICB7XG4gICAgbGV0IHQgPSB0aGlzLmNvbnRleHQ7XG4gICAgdC5iZWdpblBhdGgoKTtcbiAgICB0LnJlY3QoeCwgeSwgdywgaCk7XG4gICAgdC5maWxsU3R5bGUgPSBjID8gYHJnYigke2NbMF19LCR7Y1sxXX0sJHtjWzJdfSlgIDogXCJibGFja1wiO1xuICAgIHQuZmlsbCgpO1xuICB9XG5cbiAgY2xlYXIoYylcbiAge1xuICAgIGxldCB0ID0gdGhpcy5jb250ZXh0O1xuICAgIHQuYmVnaW5QYXRoKCk7XG4gICAgdC5yZWN0KDAsIDAsIHRoaXMuZWxlbWVudC53aWR0aCwgdGhpcy5lbGVtZW50LmhlaWdodCk7XG4gICAgdC5maWxsU3R5bGUgPSBjID8gYHJnYigke2NbMF19LCR7Y1sxXX0sJHtjWzJdfSlgIDogXCJ3aGl0ZVwiO1xuICAgIHQuZmlsbCgpO1xuICB9XG5cbiAgd2lkdGgoKVxuICB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudC53aWR0aDtcbiAgfVxuXG4gIGhlaWdodCgpXG4gIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50LmhlaWdodDtcbiAgfVxuXG4gIGZpdHdpbmRvdygpXG4gIHtcbiAgICB0aGlzLnJlc2l6ZSh0aGlzLnBhcmVudC5jbGllbnRXaWR0aCwgdGhpcy5wYXJlbnQuY2xpZW50SGVpZ2h0KTtcbiAgfVxuXG4gIHJlc2l6ZSh3LCBoKVxuICB7XG5cbiAgICB0aGlzLmVsZW1lbnQud2lkdGggPSB3O1xuICAgIHRoaXMuZWxlbWVudC5oZWlnaHQgPSBoO1xuICAgIFxuICAgIC8vIGRyYXcoKVxuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQ2FudmFzMmQuanMiLCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2VuZXJhdGlvblxue1xuICBjb25zdHJ1Y3RvcihzaXplLCByYW5kb21pc2UpXG4gIHtcbiAgICB0aGlzLnNpemUgPSBzaXplO1xuICAgIHRoaXMuaW5pdCghIXJhbmRvbWlzZSk7XG4gIH1cblxuICBpbml0KHJhbmRvbWlzZSlcbiAge1xuICAgIHRoaXMuZGF0YSA9IEFycmF5LmZyb20obmV3IEFycmF5KHRoaXMuc2l6ZSksICgpID0+IDApO1xuICAgIHRoaXMuZGF0YVtNYXRoLnJvdW5kKHRoaXMuc2l6ZS8yKV0gPSAxO1xuXG4gICAgaWYgKHJhbmRvbWlzZSkgLy8gd293XG4gICAgICBmb3IgKGxldCB0PTA7IHQ8dGhpcy5kYXRhLmxlbmd0aDsgdCsrKVxuICAgICAgICB0aGlzLmRhdGFbdF0gPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkpO1xuICB9XG5cblxuICBtdXRhdGUocnVsZSlcbiAge1xuICAgIGxldCBuID0gbmV3IEdlbmVyYXRpb24odGhpcy5zaXplKTtcblxuICAgIGZvciAobGV0IHQ9MDsgdDx0aGlzLmRhdGEubGVuZ3RoOyB0KyspXG4gICAge1xuICAgICAgbGV0IHByZXYgPSB0LTEgPCAwID8gdGhpcy5kYXRhLmxlbmd0aC0xIDogdC0xO1xuICAgICAgbGV0IG5leHQgPSB0KzEgPiB0aGlzLmRhdGEubGVuZ3RoLTEgPyAwIDogdCsxO1xuXG4gICAgICBsZXQgbCA9IHRoaXMuZGF0YVtwcmV2XTtcbiAgICAgIGxldCBjID0gdGhpcy5kYXRhW3RdO1xuICAgICAgbGV0IHIgPSB0aGlzLmRhdGFbbmV4dF07XG5cbiAgICAgIGxldCBwYXR0ZXJuID0gKChsJjEpIDw8IDIpIHwgKChjJjEpIDw8IDEpIHwgKHImMSk7XG4gICAgICBsZXQgbmV4dGdlbiA9IHJ1bGUuYXBwbHkocGF0dGVybik7XG5cbiAgICAgIG4uZGF0YVt0XSA9IG5leHRnZW47XG4gICAgfVxuXG4gICAgbi5kYXRhWzBdID0gdGhpcy5kYXRhWzBdO1xuICAgIG4uZGF0YVtuLmRhdGEubGVuZ3RoLTFdID0gdGhpcy5kYXRhW3RoaXMuZGF0YS5sZW5ndGgtMV07XG5cbiAgICByZXR1cm4gbjtcblxuICB9XG5cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vMWQvR2VuZXJhdGlvbi5qcyIsIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSdWxlXG57XG4gIGNvbnN0cnVjdG9yKHNlZWQpXG4gIHtcbiAgICB0aGlzLnNlZWQgPSBzZWVkICYgMHhmZjtcblxuICB9XG5cbiAgYXBwbHkobilcbiAge1xuICAgIC8vIG4gaXMgYSBudW1iZXIgZnJvbSAwIC0gNyBhbmQgaW5kaWNhdGVzIHRoZSBCaXQgb2Ygb3VyIHJ1bGUgdG8gYXBwbHlcbiAgICAvL2NvbnNvbGUubG9nKGBTaGlmdGluZyB2YWx1ZSAke3RoaXMuc2VlZH0gPj4gJHtufSB0aW1lc2ApO1xuICAgIHJldHVybiAoKHRoaXMuc2VlZCA+PiBuKSAmIDEpO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi8xZC9SdWxlLmpzIiwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlbmRlcmVyMWRcbntcbiAgLy8gc2l6ZSA9IHNxdWFyZSBzaXplIG9mIHRoZSBibG9jayBpbiBwaXhlbHNcbiAgY29uc3RydWN0b3IoY2FudmFzMmQsIHNpemUpXG4gIHtcbiAgICB0aGlzLmNhbnZhczJkID0gY2FudmFzMmQ7XG4gICAgdGhpcy5zaXplID0gc2l6ZTtcbiAgfVxuXG5cbiAgcmVuZGVyKGdlbmVyYXRpb24sIGl0ZXJhdGlvbilcbiAge1xuICAgIGxldCB5ID0gaXRlcmF0aW9uICogdGhpcy5zaXplO1xuXG4gICAgZm9yIChsZXQgdz0wOyB3PGdlbmVyYXRpb24uZGF0YS5sZW5ndGgtMTsgdysrKVxuICAgIHtcbiAgICAgIGxldCB4ID0gdyAqIHRoaXMuc2l6ZTtcbiAgICAgIGlmIChnZW5lcmF0aW9uLmRhdGFbd10pXG4gICAgICAgIHRoaXMuY2FudmFzMmQuYmxvY2soeCwgeSwgdGhpcy5zaXplLCB0aGlzLnNpemUpO1xuICAgIH1cblxuICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLzFkL1JlbmRlcmVyLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==