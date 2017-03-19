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
	
	var _World = __webpack_require__(1);
	
	var _World2 = _interopRequireDefault(_World);
	
	var _Renderer2d = __webpack_require__(2);
	
	var _Renderer2d2 = _interopRequireDefault(_Renderer2d);
	
	var _RuleGoL = __webpack_require__(4);
	
	var _RuleGoL2 = _interopRequireDefault(_RuleGoL);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var SIZE = 100; // cells
	var VIEW_SCALE = 8;
	
	var lastTime = 0,
	    frames = 0,
	    avFrames = 0;
	var world = new _World2.default(SIZE);
	var rule = new _RuleGoL2.default();
	var fpsText = document.getElementById("fps");
	
	var renderer = new _Renderer2d2.default("content");
	renderer.scale = VIEW_SCALE;
	
	window.requestAnimationFrame(render);
	
	function render() {
	  var timeNow = performance.now();
	  var timeTaken = timeNow - lastTime;
	
	  avFrames += 1000 / timeTaken;
	  lastTime = timeNow;
	
	  if (frames++ == 10) {
	    fpsText.innerHTML = (avFrames / 10).toFixed(1) + " FPS";
	    frames = 0;
	    avFrames = 0;
	    world.mutate(rule);
	  }
	
	  renderer.render(world.data);
	  window.requestAnimationFrame(render);
	}

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var World = function () {
	  function World(size) {
	    _classCallCheck(this, World);
	
	    this.size = size; //cells, square
	    this.data = null;
	
	    this.init();
	  }
	
	  _createClass(World, [{
	    key: "init",
	    value: function init() {
	      // Create the array:
	      this.data = this.array2d(this.size);
	      var i = 0;
	      // Randomise the initial state:
	      for (var y = 0; y < this.size; y++) {
	        for (var x = 0; x < this.size; x++) {
	          this.data[y][x] = Math.round(Math.random());
	        }
	      }
	    }
	  }, {
	    key: "neighbourhood",
	    value: function neighbourhood(x, y, r) {
	      var radius = r || 1;
	      var num = radius * 2 + 1;
	
	      var vx = x - radius;
	      var vy = y - radius;
	
	      var n = this.array2d(num);
	
	      for (var iy = 0; iy < num; iy++) {
	        vx = x - radius;
	        for (var ix = 0; ix < num; ix++) {
	          n[iy][ix] = this.data[this.wrap(vy)][this.wrap(vx)];
	          vx++;
	        }
	        vy++;
	      }
	
	      return {
	        cells: n,
	        radius: radius,
	        subject: this.data[y][x]
	      };
	    }
	  }, {
	    key: "wrap",
	    value: function wrap(v) {
	      if (v < 0) return v + this.size;
	      if (v > this.size - 1) return v - this.size;
	      return v;
	    }
	  }, {
	    key: "array2d",
	    value: function array2d(size) {
	      for (var d = []; d.length < size; d.push([])) {}
	      return d;
	    }
	  }, {
	    key: "mutate",
	    value: function mutate(rule) {
	      var next = this.array2d(this.size);
	
	      for (var y = 0; y < this.size; y++) {
	        for (var x = 0; x < this.size; x++) {
	          next[y][x] = rule.apply(this.neighbourhood(x, y));
	        }
	      }
	
	      this.data = next;
	    }
	  }]);
	
	  return World;
	}();
	
	exports.default = World;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Canvas2d = __webpack_require__(3);
	
	var _Canvas2d2 = _interopRequireDefault(_Canvas2d);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Renderer2d = function () {
	  function Renderer2d(element) {
	    _classCallCheck(this, Renderer2d);
	
	    this.canvas2d = new _Canvas2d2.default(element);
	    this.scale = 1;
	    this.size = 1;
	  }
	
	  _createClass(Renderer2d, [{
	    key: 'resize',
	    value: function resize(w, h) {
	      this.canvas2d.resize(w, h);
	      this.canvas2d.clear();
	    }
	  }, {
	    key: 'render',
	    value: function render(data) {
	
	      if (data.length != this.size) {
	        this.size = data.length;
	        this.resize(this.size * this.scale, this.size * this.scale);
	      }
	
	      for (var y = 0; y < this.size; y++) {
	        for (var x = 0; x < this.size; x++) {
	          var col = data[y][x] ? [0, 0, 0] : [255, 255, 255];
	          this.canvas2d.block(y * this.scale, x * this.scale, this.scale, this.scale, col);
	        }
	      }
	    }
	  }]);
	
	  return Renderer2d;
	}();
	
	exports.default = Renderer2d;

/***/ },
/* 3 */
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Rule2 = __webpack_require__(5);
	
	var _Rule3 = _interopRequireDefault(_Rule2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ALIVE = 1,
	    DEAD = 0;
	
	var GameOfLife = function (_Rule) {
	  _inherits(GameOfLife, _Rule);
	
	  function GameOfLife() {
	    _classCallCheck(this, GameOfLife);
	
	    return _possibleConstructorReturn(this, (GameOfLife.__proto__ || Object.getPrototypeOf(GameOfLife)).call(this));
	  }
	
	  _createClass(GameOfLife, [{
	    key: "apply",
	    value: function apply(cells) {
	      var n = this.numNeighbours(cells);
	      var newState = void 0;
	
	      if (cells.subject == ALIVE && n < 2) newState = DEAD;else if (cells.subject == ALIVE && n > 3) newState = DEAD;else if (cells.subject == DEAD && n == 3) newState = ALIVE;else newState = cells.subject;
	
	      return newState;
	
	      // if      ((board[x][y] == 1) && (neighbors <  2)) next[x][y] = 0;
	      //     else if ((board[x][y] == 1) && (neighbors >  3)) next[x][y] = 0;
	      //     else if ((board[x][y] == 0) && (neighbors == 3)) next[x][y] = 1;
	      //     else next[x][y] = board[x][y];
	    }
	  }]);
	
	  return GameOfLife;
	}(_Rule3.default);
	
	exports.default = GameOfLife;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Rule = function () {
	  function Rule() {
	    _classCallCheck(this, Rule);
	  }
	
	  _createClass(Rule, [{
	    key: "numNeighbours",
	    value: function numNeighbours(n) {
	      var num = 0;
	
	      for (var y = 0; y < n.cells.length; y++) {
	        for (var x = 0; x < n.cells[y].length; x++) {
	          if (n.cells[y][x] != 0) num++;
	        }
	      }
	
	      // don't include 'us' in the count!
	      return num - (n.subject != 0 ? 1 : 0);
	    }
	  }]);
	
	  return Rule;
	}();
	
	exports.default = Rule;

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZTVlNjBmMzgxYmI5ZjUxZmI5MjkiLCJ3ZWJwYWNrOi8vLy4vMmQvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi8yZC9Xb3JsZC5qcyIsIndlYnBhY2s6Ly8vLi8yZC9SZW5kZXJlcjJkLmpzIiwid2VicGFjazovLy8uL3NoYXJlZC9DYW52YXMyZC5qcyIsIndlYnBhY2s6Ly8vLi8yZC9SdWxlLUdvTC5qcyIsIndlYnBhY2s6Ly8vLi8yZC9SdWxlLmpzIl0sIm5hbWVzIjpbIlNJWkUiLCJWSUVXX1NDQUxFIiwibGFzdFRpbWUiLCJmcmFtZXMiLCJhdkZyYW1lcyIsIndvcmxkIiwicnVsZSIsImZwc1RleHQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwicmVuZGVyZXIiLCJzY2FsZSIsIndpbmRvdyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsInJlbmRlciIsInRpbWVOb3ciLCJwZXJmb3JtYW5jZSIsIm5vdyIsInRpbWVUYWtlbiIsImlubmVySFRNTCIsInRvRml4ZWQiLCJtdXRhdGUiLCJkYXRhIiwiV29ybGQiLCJzaXplIiwiaW5pdCIsImFycmF5MmQiLCJpIiwieSIsIngiLCJNYXRoIiwicm91bmQiLCJyYW5kb20iLCJyIiwicmFkaXVzIiwibnVtIiwidngiLCJ2eSIsIm4iLCJpeSIsIml4Iiwid3JhcCIsImNlbGxzIiwic3ViamVjdCIsInYiLCJkIiwibGVuZ3RoIiwicHVzaCIsIm5leHQiLCJhcHBseSIsIm5laWdoYm91cmhvb2QiLCJSZW5kZXJlcjJkIiwiZWxlbWVudCIsImNhbnZhczJkIiwidyIsImgiLCJyZXNpemUiLCJjbGVhciIsImNvbCIsImJsb2NrIiwiQ2FudmFzMmQiLCJwYXJlbnQiLCJjcmVhdGVFbGVtZW50IiwiYXBwZW5kQ2hpbGQiLCJjb250ZXh0IiwiZ2V0Q29udGV4dCIsImMiLCJ0IiwiYmVnaW5QYXRoIiwicmVjdCIsImZpbGxTdHlsZSIsImZpbGwiLCJzeCIsInN5Iiwic3ciLCJzaCIsImR4IiwiZHkiLCJkdyIsImRoIiwiZHJhd0ltYWdlIiwiY2FudmFzIiwid2lkdGgiLCJoZWlnaHQiLCJjbGllbnRXaWR0aCIsImNsaWVudEhlaWdodCIsIkFMSVZFIiwiREVBRCIsIkdhbWVPZkxpZmUiLCJudW1OZWlnaGJvdXJzIiwibmV3U3RhdGUiLCJSdWxlIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7O0FDcENBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsS0FBTUEsT0FBTyxHQUFiLEMsQ0FBa0I7QUFDbEIsS0FBTUMsYUFBYSxDQUFuQjs7QUFFQSxLQUFJQyxXQUFXLENBQWY7QUFBQSxLQUFrQkMsU0FBUyxDQUEzQjtBQUFBLEtBQThCQyxXQUFXLENBQXpDO0FBQ0EsS0FBSUMsUUFBUSxvQkFBVUwsSUFBVixDQUFaO0FBQ0EsS0FBSU0sT0FBTyx1QkFBWDtBQUNBLEtBQUlDLFVBQVVDLFNBQVNDLGNBQVQsQ0FBd0IsS0FBeEIsQ0FBZDs7QUFFQSxLQUFJQyxXQUFXLHlCQUFhLFNBQWIsQ0FBZjtBQUNBQSxVQUFTQyxLQUFULEdBQWlCVixVQUFqQjs7QUFFQVcsUUFBT0MscUJBQVAsQ0FBNkJDLE1BQTdCOztBQUdBLFVBQVNBLE1BQVQsR0FDQTtBQUNFLE9BQUlDLFVBQVVDLFlBQVlDLEdBQVosRUFBZDtBQUNBLE9BQUlDLFlBQVlILFVBQVViLFFBQTFCOztBQUVBRSxlQUFhLE9BQU9jLFNBQXBCO0FBQ0FoQixjQUFXYSxPQUFYOztBQUVBLE9BQUlaLFlBQVksRUFBaEIsRUFDQTtBQUNFSSxhQUFRWSxTQUFSLEdBQW9CLENBQUNmLFdBQVcsRUFBWixFQUFnQmdCLE9BQWhCLENBQXdCLENBQXhCLElB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QU1DLE9BQU4sSUFBaUIyQyxLQUFqQixJQUEwQmhELElBQUksQ0FBbEMsRUFDSG9ELFdBQVdILElBQVgsQ0FERyxLQUVBLElBQUk3QyxNQUFNQyxPQUFOLElBQWlCNEMsSUFBakIsSUFBeUJqRCxLQUFLLENBQWxDLEVBQ0hvRCxXQUFXSixLQUFYLENBREcsS0FHSEksV0FBV2hELE1BQU1DLE9BQWpCOztBQUVGLGNBQU8rQyxRQUFQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUQ7Ozs7OzttQkE1QmtCRixVOzs7Ozs7Ozs7Ozs7Ozs7O0tDSEFHLEk7QUFFbkIsbUJBQ0E7QUFBQTtBQUVDOzs7O21DQUVhckQsQyxFQUNkO0FBQ0UsV0FBSUgsTUFBTSxDQUFWOztBQUVBLFlBQUssSUFBSVAsSUFBSSxDQUFiLEVBQWdCQSxJQUFFVSxFQUFFSSxLQUFGLENBQVFJLE1BQTFCLEVBQWtDbEIsR0FBbEMsRUFDQTtBQUNFLGNBQUssSUFBSUMsSUFBSSxDQUFiLEVBQWdCQSxJQUFFUyxFQUFFSSxLQUFGLENBQVFkLENBQVIsRUFBV2tCLE1BQTdCLEVBQXFDakIsR0FBckMsRUFDQTtBQUNFLGVBQUlTLEVBQUVJLEtBQUYsQ0FBUWQsQ0FBUixFQUFXQyxDQUFYLEtBQWlCLENBQXJCLEVBQXdCTTtBQUN6QjtBQUNGOztBQUVEO0FBQ0EsY0FBT0EsT0FBT0csRUFBRUssT0FBRixJQUFhLENBQWIsR0FBaUIsQ0FBakIsR0FBcUIsQ0FBNUIsQ0FBUDtBQUNEOzs7Ozs7bUJBckJrQmdELEkiLCJmaWxlIjoiMmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZTVlNjBmMzgxYmI5ZjUxZmI5MjkiLCJcblxuaW1wb3J0IFdvcmxkICAgICAgICBmcm9tICcuL1dvcmxkLmpzJztcbmltcG9ydCBSZW5kZXJlciAgICAgZnJvbSAnLi9SZW5kZXJlcjJkJztcbmltcG9ydCBHYW1lT2ZMaWZlICAgZnJvbSAnLi9SdWxlLUdvTCc7XG5cbmNvbnN0IFNJWkUgPSAxMDA7IC8vIGNlbGxzXG5jb25zdCBWSUVXX1NDQUxFID0gODtcblxubGV0IGxhc3RUaW1lID0gMCwgZnJhbWVzID0gMCwgYXZGcmFtZXMgPSAwO1xubGV0IHdvcmxkID0gbmV3IFdvcmxkKFNJWkUpO1xubGV0IHJ1bGUgPSBuZXcgR2FtZU9mTGlmZSgpO1xubGV0IGZwc1RleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZwc1wiKTtcblxubGV0IHJlbmRlcmVyID0gbmV3IFJlbmRlcmVyKFwiY29udGVudFwiKTtcbnJlbmRlcmVyLnNjYWxlID0gVklFV19TQ0FMRTtcblxud2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpO1xuXG5cbmZ1bmN0aW9uIHJlbmRlcigpXG57XG4gIGxldCB0aW1lTm93ID0gcGVyZm9ybWFuY2Uubm93KCk7XG4gIGxldCB0aW1lVGFrZW4gPSB0aW1lTm93IC0gbGFzdFRpbWU7XG5cbiAgYXZGcmFtZXMgKz0gIDEwMDAgLyB0aW1lVGFrZW47XG4gIGxhc3RUaW1lID0gdGltZU5vdztcblxuICBpZiAoZnJhbWVzKysgPT0gMTApXG4gIHtcbiAgICBmcHNUZXh0LmlubmVySFRNTCA9IChhdkZyYW1lcyAvIDEwKS50b0ZpeGVkKDEpICsgXCIgRlBTXCI7XG4gICAgZnJhbWVzID0gMDtcbiAgICBhdkZyYW1lcyA9IDA7XG4gICAgd29ybGQubXV0YXRlKHJ1bGUpO1xuICB9XG5cblxuXG5cblxuICByZW5kZXJlci5yZW5kZXIod29ybGQuZGF0YSk7XG4gIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLzJkL21haW4uanMiLCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV29ybGRcbntcbiAgY29uc3RydWN0b3Ioc2l6ZSlcbiAge1xuICAgIHRoaXMuc2l6ZSA9IHNpemU7IC8vY2VsbHMsIHNxdWFyZVxuICAgIHRoaXMuZGF0YSA9IG51bGw7XG5cbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIGluaXQoKVxuICB7XG4gICAgLy8gQ3JlYXRlIHRoZSBhcnJheTpcbiAgICB0aGlzLmRhdGEgPSB0aGlzLmFycmF5MmQodGhpcy5zaXplKTtcbiAgICBsZXQgaSA9IDA7XG4gICAgLy8gUmFuZG9taXNlIHRoZSBpbml0aWFsIHN0YXRlOlxuICAgIGZvciAobGV0IHk9MDsgeTx0aGlzLnNpemU7IHkrKylcbiAgICAgIGZvciAobGV0IHg9MDsgeDx0aGlzLnNpemU7IHgrKylcbiAgICAgICAgdGhpcy5kYXRhW3ldW3hdID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKTtcbiAgfVxuXG4gIG5laWdoYm91cmhvb2QoeCwgeSwgcilcbiAge1xuICAgIGxldCByYWRpdXMgPSByIHx8IDE7XG4gICAgbGV0IG51bSA9IChyYWRpdXMgKiAyKSArIDE7XG5cbiAgICBsZXQgdnggPSB4IC0gcmFkaXVzO1xuICAgIGxldCB2eSA9IHkgLSByYWRpdXM7XG5cbiAgICBsZXQgbiA9IHRoaXMuYXJyYXkyZChudW0pO1xuXG4gICAgZm9yIChsZXQgaXk9MDsgaXk8bnVtOyBpeSsrKVxuICAgIHtcbiAgICAgIHZ4ID0geCAtIHJhZGl1cztcbiAgICAgIGZvciAobGV0IGl4PTA7IGl4PG51bTsgaXgrKylcbiAgICAgIHtcbiAgICAgICAgbltpeV1baXhdID0gdGhpcy5kYXRhW3RoaXMud3JhcCh2eSldW3RoaXMud3JhcCh2eCldO1xuICAgICAgICB2eCsrO1xuICAgICAgfVxuICAgICAgdnkrKztcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgY2VsbHM6IG4sXG4gICAgICByYWRpdXM6IHJhZGl1cyxcbiAgICAgIHN1YmplY3Q6IHRoaXMuZGF0YVt5XVt4XVxuICAgIH1cbiAgfVxuXG4gIHdyYXAodilcbiAge1xuICAgIGlmICggdiA8IDAgKSByZXR1cm4gdiArIHRoaXMuc2l6ZTtcbiAgICBpZiAoIHYgPiB0aGlzLnNpemUtMSkgcmV0dXJuIHYgLSB0aGlzLnNpemU7XG4gICAgcmV0dXJuIHY7XG4gIH1cblxuICBhcnJheTJkKHNpemUpXG4gIHtcbiAgICBmb3IgKHZhciBkPVtdOyBkLmxlbmd0aCA8IHNpemU7IGQucHVzaChbXSkpO1xuICAgIHJldHVybiBkO1xuICB9XG5cbiAgbXV0YXRlKHJ1bGUpXG4gIHtcbiAgICBsZXQgbmV4dCA9IHRoaXMuYXJyYXkyZCh0aGlzLnNpemUpO1xuXG4gICAgZm9yIChsZXQgeT0wOyB5PHRoaXMuc2l6ZTsgeSsrKVxuICAgIHtcbiAgICAgIGZvciAobGV0IHg9MDsgeDx0aGlzLnNpemU7IHgrKylcbiAgICAgICAgbmV4dFt5XVt4XSA9IHJ1bGUuYXBwbHkodGhpcy5uZWlnaGJvdXJob29kKHgseSkpO1xuICAgIH1cblxuICAgIHRoaXMuZGF0YSA9IG5leHQ7XG4gIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vMmQvV29ybGQuanMiLCJcbmltcG9ydCBDYW52YXMyZCBmcm9tICcuLi9zaGFyZWQvQ2FudmFzMmQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZW5kZXJlcjJkXG57XG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQpXG4gIHtcbiAgICB0aGlzLmNhbnZhczJkID0gbmV3IENhbnZhczJkKGVsZW1lbnQpO1xuICAgIHRoaXMuc2NhbGUgPSAxO1xuICAgIHRoaXMuc2l6ZSA9IDE7XG4gIH1cblxuICByZXNpemUodywgaClcbiAge1xuICAgIHRoaXMuY2FudmFzMmQucmVzaXplKHcsIGgpO1xuICAgIHRoaXMuY2FudmFzMmQuY2xlYXIoKTtcbiAgfVxuXG4gIHJlbmRlcihkYXRhKVxuICB7XG5cbiAgICBpZiAoZGF0YS5sZW5ndGggIT0gdGhpcy5zaXplKVxuICAgIHtcbiAgICAgIHRoaXMuc2l6ZSA9IGRhdGEubGVuZ3RoO1xuICAgICAgdGhpcy5yZXNpemUodGhpcy5zaXplICogdGhpcy5zY2FsZSwgdGhpcy5zaXplICogdGhpcy5zY2FsZSk7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgeT0wOyB5PHRoaXMuc2l6ZTsgeSsrKVxuICAgIHtcbiAgICAgIGZvciAobGV0IHg9MDsgeDx0aGlzLnNpemU7IHgrKylcbiAgICAgIHtcbiAgICAgICAgbGV0IGNvbCA9IGRhdGFbeV1beF0gPyBbMCwwLDBdIDogWzI1NSwyNTUsMjU1XTtcbiAgICAgICAgdGhpcy5jYW52YXMyZC5ibG9jayh5ICogdGhpcy5zY2FsZSwgeCAqIHRoaXMuc2NhbGUsIHRoaXMuc2NhbGUsIHRoaXMuc2NhbGUsIGNvbCk7XG4gICAgICB9XG4gICAgfVxuXG4gIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vMmQvUmVuZGVyZXIyZC5qcyIsIlxuXG4vLyBCb2lsZXJwbGF0ZSBmdW5jdGlvbnMgdG8gd3JpdGUgdG8gdGhlIENhbnZhc1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYW52YXMyZFxue1xuICBjb25zdHJ1Y3RvcihwYXJlbnQpXG4gIHtcbiAgICB0aGlzLnBhcmVudCA9IHR5cGVvZiBwYXJlbnQgPT0gJ3N0cmluZycgPyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwYXJlbnQpIDogcGFyZW50O1xuICAgIHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgdGhpcy5wYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50KTtcbiAgICB0aGlzLmNvbnRleHQgPSB0aGlzLmVsZW1lbnQuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIHRoaXMuY2xlYXIoKTtcblxuICB9XG5cbiAgYmxvY2soeCx5LHcsaCxjKVxuICB7XG4gICAgbGV0IHQgPSB0aGlzLmNvbnRleHQ7XG4gICAgdC5iZWdpblBhdGgoKTtcbiAgICB0LnJlY3QoeCwgeSwgdywgaCk7XG4gICAgdC5maWxsU3R5bGUgPSBjID8gYHJnYigke2NbMF19LCR7Y1sxXX0sJHtjWzJdfSlgIDogXCJibGFja1wiO1xuICAgIHQuZmlsbCgpO1xuICB9XG5cbiAgc2VsZmJsaXQoc3gsIHN5LCBzdywgc2gsIGR4LCBkeSwgZHcsIGRoKVxuICB7XG4gICAgdGhpcy5jb250ZXh0LmRyYXdJbWFnZSh0aGlzLmNvbnRleHQuY2FudmFzLCBzeCwgc3ksIHN3LCBzaCwgZHgsIGR5LCBkdywgZGgpO1xuICB9XG5cbiAgY2xlYXIoYylcbiAge1xuICAgIGxldCB0ID0gdGhpcy5jb250ZXh0O1xuICAgIHQuYmVnaW5QYXRoKCk7XG4gICAgdC5yZWN0KDAsIDAsIHRoaXMuZWxlbWVudC53aWR0aCwgdGhpcy5lbGVtZW50LmhlaWdodCk7XG4gICAgdC5maWxsU3R5bGUgPSBjID8gYHJnYigke2NbMF19LCR7Y1sxXX0sJHtjWzJdfSlgIDogXCJ3aGl0ZVwiO1xuICAgIHQuZmlsbCgpO1xuICB9XG5cbiAgd2lkdGgoKVxuICB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudC53aWR0aDtcbiAgfVxuXG4gIGhlaWdodCgpXG4gIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50LmhlaWdodDtcbiAgfVxuXG4gIGZpdHdpbmRvdygpXG4gIHtcbiAgICB0aGlzLnJlc2l6ZSh0aGlzLnBhcmVudC5jbGllbnRXaWR0aCwgdGhpcy5wYXJlbnQuY2xpZW50SGVpZ2h0KTtcbiAgfVxuXG4gIHJlc2l6ZSh3LCBoKVxuICB7XG5cbiAgICB0aGlzLmVsZW1lbnQud2lkdGggPSB3O1xuICAgIHRoaXMuZWxlbWVudC5oZWlnaHQgPSBoO1xuXG4gICAgLy8gZHJhdygpXG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NoYXJlZC9DYW52YXMyZC5qcyIsIlxuaW1wb3J0IFJ1bGUgZnJvbSBcIi4vUnVsZVwiO1xuXG5jb25zdCBBTElWRSA9IDEsIERFQUQgPSAwO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lT2ZMaWZlIGV4dGVuZHMgUnVsZVxue1xuICBjb25zdHJ1Y3RvcigpXG4gIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgYXBwbHkoY2VsbHMpXG4gIHtcbiAgICBsZXQgbiA9IHRoaXMubnVtTmVpZ2hib3VycyhjZWxscyk7XG4gICAgbGV0IG5ld1N0YXRlO1xuXG4gICAgaWYgKGNlbGxzLnN1YmplY3QgPT0gQUxJVkUgJiYgbiA8IDIpXG4gICAgICBuZXdTdGF0ZSA9IERFQUQ7XG4gICAgZWxzZSBpZiAoY2VsbHMuc3ViamVjdCA9PSBBTElWRSAmJiBuID4gMylcbiAgICAgIG5ld1N0YXRlID0gREVBRDtcbiAgICBlbHNlIGlmIChjZWxscy5zdWJqZWN0ID09IERFQUQgJiYgbiA9PSAzKVxuICAgICAgbmV3U3RhdGUgPSBBTElWRTtcbiAgICBlbHNlXG4gICAgICBuZXdTdGF0ZSA9IGNlbGxzLnN1YmplY3Q7XG5cbiAgICByZXR1cm4gbmV3U3RhdGU7XG5cbiAgICAvLyBpZiAgICAgICgoYm9hcmRbeF1beV0gPT0gMSkgJiYgKG5laWdoYm9ycyA8ICAyKSkgbmV4dFt4XVt5XSA9IDA7XG4gICAgLy8gICAgIGVsc2UgaWYgKChib2FyZFt4XVt5XSA9PSAxKSAmJiAobmVpZ2hib3JzID4gIDMpKSBuZXh0W3hdW3ldID0gMDtcbiAgICAvLyAgICAgZWxzZSBpZiAoKGJvYXJkW3hdW3ldID09IDApICYmIChuZWlnaGJvcnMgPT0gMykpIG5leHRbeF1beV0gPSAxO1xuICAgIC8vICAgICBlbHNlIG5leHRbeF1beV0gPSBib2FyZFt4XVt5XTtcblxuICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLzJkL1J1bGUtR29MLmpzIiwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJ1bGVcbntcbiAgY29uc3RydWN0b3IoKVxuICB7XG5cbiAgfVxuXG4gIG51bU5laWdoYm91cnMobilcbiAge1xuICAgIGxldCBudW0gPSAwO1xuXG4gICAgZm9yIChsZXQgeSA9IDA7IHk8bi5jZWxscy5sZW5ndGg7IHkrKylcbiAgICB7XG4gICAgICBmb3IgKGxldCB4ID0gMDsgeDxuLmNlbGxzW3ldLmxlbmd0aDsgeCsrKVxuICAgICAge1xuICAgICAgICBpZiAobi5jZWxsc1t5XVt4XSAhPSAwKSBudW0gKys7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gZG9uJ3QgaW5jbHVkZSAndXMnIGluIHRoZSBjb3VudCFcbiAgICByZXR1cm4gbnVtIC0gKG4uc3ViamVjdCAhPSAwID8gMSA6IDApO1xuICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLzJkL1J1bGUuanMiXSwic291cmNlUm9vdCI6IiJ9