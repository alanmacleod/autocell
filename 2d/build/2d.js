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
	
	var _CellGoL = __webpack_require__(3);
	
	var _CellGoL2 = _interopRequireDefault(_CellGoL);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var SIZE = 100; // cells
	var VIEW_SCALE = 8;
	
	var lastTime = 0,
	    frames = 0,
	    avFrames = 0;
	
	var world = new _World2.default({
	  size: SIZE,
	  spread: 1.0,
	  type: _CellGoL2.default
	});
	
	var renderer = new _Renderer2d2.default("content");
	renderer.scale = VIEW_SCALE;
	
	world.mutate();
	
	renderer.render(world.data);
	
	var fpsText = document.getElementById("fps");
	
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
	    world.mutate();
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
	  function World(options) {
	    _classCallCheck(this, World);
	
	    this.size = options.size; //cells, square
	    this.data = null;
	
	    this.init(options.type, options.spread);
	  }
	
	  _createClass(World, [{
	    key: "init",
	    value: function init(CellType, spread) {
	      // Create the array:
	      this.data = this.array2d(this.size);
	      var i = 0;
	
	      for (var y = 0; y < this.size; y++) {
	        for (var x = 0; x < this.size; x++) {
	          if (Math.random() <= spread) this.data[y][x] = new CellType();
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
	    value: function mutate() {
	      var next = this.array2d(this.size);
	
	      for (var y = 0; y < this.size; y++) {
	        for (var x = 0; x < this.size; x++) {
	          if (this.data[y][x]) next[y][x] = this.data[y][x].mutate(this.neighbourhood(x, y));
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
	
	var _Canvas2d = __webpack_require__(5);
	
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
	          if (data[y][x]) {
	            var col = data[y][x].shader();
	            //let col = data[y][x] ? [0,0,0] : [255,255,255];
	            this.canvas2d.block(y * this.scale, x * this.scale, this.scale, this.scale, col);
	          }
	        }
	      }
	    }
	  }]);
	
	  return Renderer2d;
	}();
	
	exports.default = Renderer2d;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Cell2 = __webpack_require__(4);
	
	var _Cell3 = _interopRequireDefault(_Cell2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ALIVE = 1,
	    DEAD = 0;
	
	var palette = [[255, 255, 255], [0, 0, 0]];
	
	var GameOfLife = function (_Cell) {
	  _inherits(GameOfLife, _Cell);
	
	  function GameOfLife() {
	    _classCallCheck(this, GameOfLife);
	
	    var _this = _possibleConstructorReturn(this, (GameOfLife.__proto__ || Object.getPrototypeOf(GameOfLife)).call(this));
	
	    _this.alive = Math.round(Math.random());
	    return _this;
	  }
	
	  _createClass(GameOfLife, [{
	    key: 'shader',
	    value: function shader() {
	      return palette[this.alive];
	    }
	
	    // Assigns a generic 'value' to feedback into the Cell 'interface' counting method
	
	  }, {
	    key: 'evaluate',
	    value: function evaluate() {
	      return this.alive ? 1 : 0;
	    }
	  }, {
	    key: 'mutate',
	    value: function mutate(cells) {
	      var n = this.numNeighbours(cells);
	      var me = new GameOfLife();
	      var newState = DEAD;
	
	      if (cells.subject.alive && n < 2) newState = DEAD;else if (cells.subject.alive && n > 3) newState = DEAD;else if (!cells.subject.alive && n == 3) newState = ALIVE;else newState = cells.subject.alive;
	
	      me.alive = newState;
	      return me;
	    }
	  }]);
	
	  return GameOfLife;
	}(_Cell3.default);
	
	exports.default = GameOfLife;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Cell = function () {
	  function Cell() {
	    _classCallCheck(this, Cell);
	  }
	
	  _createClass(Cell, [{
	    key: "init",
	    value: function init(options) {
	      if (!options) return;
	    }
	  }, {
	    key: "mutate",
	    value: function mutate(neighbours) {}
	  }, {
	    key: "shader",
	    value: function shader() {}
	  }, {
	    key: "evaluate",
	    value: function evaluate() {}
	  }, {
	    key: "numNeighbours",
	    value: function numNeighbours(n) {
	      var num = 0;
	
	      for (var y = 0; y < n.cells.length; y++) {
	        for (var x = 0; x < n.cells[y].length; x++) {
	          if (n.cells[y][x]) if (n.cells[y][x].evaluate() > 0) num++;
	        }
	      } // don't include 'us' in the count!
	      return num - (n.subject.evaluate() > 0 ? 1 : 0);
	    }
	  }]);
	
	  return Cell;
	}();
	
	exports.default = Cell;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZWU3MmJlMzliYTc2MmM0N2E5MTkiLCJ3ZWJwYWNrOi8vLy4vMmQvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi8yZC9jb3JlL1dvcmxkLmpzIiwid2VicGFjazovLy8uLzJkL2NvcmUvUmVuZGVyZXIyZC5qcyIsIndlYnBhY2s6Ly8vLi8yZC9jZWxscy9DZWxsLUdvTC5qcyIsIndlYnBhY2s6Ly8vLi8yZC9jZWxscy9DZWxsLmpzIiwid2VicGFjazovLy8uL3NoYXJlZC9DYW52YXMyZC5qcyJdLCJuYW1lcyI6WyJTSVpFIiwiVklFV19TQ0FMRSIsImxhc3RUaW1lIiwiZnJhbWVzIiwiYXZGcmFtZXMiLCJ3b3JsZCIsInNpemUiLCJzcHJlYWQiLCJ0eXBlIiwicmVuZGVyZXIiLCJzY2FsZSIsIm11dGF0ZSIsInJlbmRlciIsImRhdGEiLCJmcHNUZXh0IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsIndpbmRvdyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsInRpbWVOb3ciLCJwZXJmb3JtYW5jZSIsIm5vdyIsInRpbWVUYWtlbiIsImlubmVySFRNTCIsInRvRml4ZWQiLCJXb3JsZCIsIm9wdGlvbnMiLCJpbml0IiwiQ2VsbFR5cGUiLCJhcnJheTJkIiwiaSIsInkiLCJ4IiwiTWF0aCIsInJhbmRvbSIsInIiLCJyYWRpdXMiLCJudW0iLCJ2eCIsInZ5IiwibiIsIml5IiwiaXgiLCJ3cmFwIiwiY2VsbHMiLCJzdWJqZWN0IiwidiIsImQiLCJsZW5ndGgiLCJwdXNoIiwibmV4dCIsIm5laWdoYm91cmhvb2QiLCJSZW5kZXJlcjJkIiwiZWxlbWVudCIsImNhbnZhczJkIiwidyIsImgiLCJyZXNpemUiLCJjbGVhciIsImNvbCIsInNoYWRlciIsImJsb2NrIiwiQUxJVkUiLCJERUFEIiwicGFsZXR0ZSIsIkdhbWVPZkxpZmUiLCJhbGl2ZSIsInJvdW5kIiwibnVtTmVpZ2hib3VycyIsIm1lIiwibmV3U3RhdGUiLCJDZWxsIiwibmVpZ2hib3VycyIsImV2YWx1YXRlIiwiQ2FudmFzMmQiLCJwYXJlbnQiLCJjcmVhdGVFbGVtZW50IiwiYXBwZW5kQ2hpbGQiLCJjb250ZXh0IiwiZ2V0Q29udGV4dCIsImMiLCJ0IiwiYmVnaW5QYXRoIiwicmVjdCIsImZpbGxTdHlsZSIsImZpbGwiLCJzeCIsInN5Iiwic3ciLCJzaCIsImR4IiwiZHkiLCJkdyIsImRoIiwiZHJhd0ltYWdlIiwiY2FudmFzIiwid2lkdGgiLCJoZWlnaHQiLCJjbGllbnRXaWR0aCIsImNsaWVudEhlaWdodCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQ3BDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLEtBQU1BLE9BQU8sR0FBYixDLENBQWtCO0FBQ2xCLEtBQU1DLGFBQWEsQ0FBbkI7O0FBRUEsS0FBSUMsV0FBVyxDQUFmO0FBQUEsS0FBa0JDLFNBQVMsQ0FBM0I7QUFBQSxLQUE4QkMsV0FBVyxDQUF6Qzs7QUFFQSxLQUFJQyxRQUFRLG9CQUFVO0FBQ3BCQyxTQUFNTixJQURjO0FBRXBCTyxXQUFRLEdBRlk7QUFHcEJDO0FBSG9CLEVBQVYsQ0FBWjs7QUFNQSxLQUFJQyxXQUFXLHlCQUFhLFNBQWIsQ0FBZjtBQUNBQSxVQUFTQyxLQUFULEdBQWlCVCxVQUFqQjs7QUFHQUksT0FBTU0sTUFBTjs7QUFFQUYsVUFBU0csTUFBVCxDQUFnQlAsTUFBTVEsSUFBdEI7O0FBR0EsS0FBSUMsVUFBVUMsU0FBU0MsY0FBVCxDQUF3QixLQUF4QixDQUFkOztBQUVBQyxRQUFPQyxxQkFBUCxDQUE2Qk4sTUFBN0I7O0FBRUEsVUFBU0EsTUFBVCxHQUNBO0FBQ0UsT0FBSU8sVUFBVUMs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RDs7OzJCQUVLYixDLEVBQ047QUFDRSxXQUFJQyxJQUFJLEtBQUtILE9BQWI7QUFDQUcsU0FBRUMsU0FBRjtBQUNBRCxTQUFFRSxJQUFGLENBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxLQUFLOUIsT0FBTCxDQUFhMkMsS0FBMUIsRUFBaUMsS0FBSzNDLE9BQUwsQ0FBYTRDLE1BQTlDO0FBQ0FoQixTQUFFRyxTQUFGLEdBQWNKLGFBQVdBLEVBQUUsQ0FBRixDQUFYLFNBQW1CQSxFQUFFLENBQUYsQ0FBbkIsU0FBMkJBLEVBQUUsQ0FBRixDQUEzQixTQUFxQyxPQUFuRDtBQUNBQyxTQUFFSSxJQUFGO0FBQ0Q7Ozs2QkFHRDtBQUNFLGNBQU8sS0FBS2hDLE9BQUwsQ0FBYTJDLEtBQXBCO0FBQ0Q7Ozs4QkFHRDtBQUNFLGNBQU8sS0FBSzNDLE9BQUwsQ0FBYTRDLE1BQXBCO0FBQ0Q7OztpQ0FHRDtBQUNFLFlBQUt4QyxNQUFMLENBQVksS0FBS2tCLE1BQUwsQ0FBWXVCLFdBQXhCLEVBQXFDLEtBQUt2QixNQUFMLENBQVl3QixZQUFqRDtBQUNEOzs7NEJBRU01QyxDLEVBQUdDLEMsRUFDVjs7QUFFRSxZQUFLSCxPQUFMLENBQWEyQyxLQUFiLEdBQXFCekMsQ0FBckI7QUFDQSxZQUFLRixPQUFMLENBQWE0QyxNQUFiLEdBQXNCekMsQ0FBdEI7O0FBRUE7QUFDRDs7Ozs7O21CQXpEa0JrQixRIiwiZmlsZSI6IjJkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGVlNzJiZTM5YmE3NjJjNDdhOTE5IiwiXG5cbmltcG9ydCBXb3JsZCAgICAgICAgZnJvbSAnLi9jb3JlL1dvcmxkLmpzJztcbmltcG9ydCBSZW5kZXJlciAgICAgZnJvbSAnLi9jb3JlL1JlbmRlcmVyMmQnO1xuaW1wb3J0IEdhbWVPZkxpZmUgICBmcm9tICcuL2NlbGxzL0NlbGwtR29MJztcblxuY29uc3QgU0laRSA9IDEwMDsgLy8gY2VsbHNcbmNvbnN0IFZJRVdfU0NBTEUgPSA4O1xuXG5sZXQgbGFzdFRpbWUgPSAwLCBmcmFtZXMgPSAwLCBhdkZyYW1lcyA9IDA7XG5cbmxldCB3b3JsZCA9IG5ldyBXb3JsZCh7XG4gIHNpemU6IFNJWkUsXG4gIHNwcmVhZDogMS4wLFxuICB0eXBlOiBHYW1lT2ZMaWZlXG59KTtcblxubGV0IHJlbmRlcmVyID0gbmV3IFJlbmRlcmVyKFwiY29udGVudFwiKTtcbnJlbmRlcmVyLnNjYWxlID0gVklFV19TQ0FMRTtcblxuXG53b3JsZC5tdXRhdGUoKTtcblxucmVuZGVyZXIucmVuZGVyKHdvcmxkLmRhdGEpO1xuXG5cbmxldCBmcHNUZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmcHNcIik7XG5cbndpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKTtcblxuZnVuY3Rpb24gcmVuZGVyKClcbntcbiAgbGV0IHRpbWVOb3cgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgbGV0IHRpbWVUYWtlbiA9IHRpbWVOb3cgLSBsYXN0VGltZTtcblxuICBhdkZyYW1lcyArPSAgMTAwMCAvIHRpbWVUYWtlbjtcbiAgbGFzdFRpbWUgPSB0aW1lTm93O1xuXG4gIGlmIChmcmFtZXMrKyA9PSAxMClcbiAge1xuICAgIGZwc1RleHQuaW5uZXJIVE1MID0gKGF2RnJhbWVzIC8gMTApLnRvRml4ZWQoMSkgKyBcIiBGUFNcIjtcbiAgICBmcmFtZXMgPSAwO1xuICAgIGF2RnJhbWVzID0gMDtcbiAgICB3b3JsZC5tdXRhdGUoKTtcbiAgfVxuXG4gIHJlbmRlcmVyLnJlbmRlcih3b3JsZC5kYXRhKTtcbiAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vMmQvbWFpbi5qcyIsIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXb3JsZFxue1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKVxuICB7XG5cbiAgICB0aGlzLnNpemUgPSBvcHRpb25zLnNpemU7IC8vY2VsbHMsIHNxdWFyZVxuICAgIHRoaXMuZGF0YSA9IG51bGw7XG5cbiAgICB0aGlzLmluaXQob3B0aW9ucy50eXBlLCBvcHRpb25zLnNwcmVhZCk7XG4gIH1cblxuICBpbml0KENlbGxUeXBlLCBzcHJlYWQpXG4gIHtcbiAgICAvLyBDcmVhdGUgdGhlIGFycmF5OlxuICAgIHRoaXMuZGF0YSA9IHRoaXMuYXJyYXkyZCh0aGlzLnNpemUpO1xuICAgIGxldCBpID0gMDtcblxuICAgIGZvciAobGV0IHk9MDsgeTx0aGlzLnNpemU7IHkrKylcbiAgICAgIGZvciAobGV0IHg9MDsgeDx0aGlzLnNpemU7IHgrKylcbiAgICAgICAgaWYgKE1hdGgucmFuZG9tKCkgPD0gc3ByZWFkKVxuICAgICAgICAgIHRoaXMuZGF0YVt5XVt4XSA9IG5ldyBDZWxsVHlwZSgpO1xuICB9XG5cbiAgbmVpZ2hib3VyaG9vZCh4LCB5LCByKVxuICB7XG4gICAgbGV0IHJhZGl1cyA9IHIgfHwgMTtcbiAgICBsZXQgbnVtID0gKHJhZGl1cyAqIDIpICsgMTtcblxuICAgIGxldCB2eCA9IHggLSByYWRpdXM7XG4gICAgbGV0IHZ5ID0geSAtIHJhZGl1cztcblxuICAgIGxldCBuID0gdGhpcy5hcnJheTJkKG51bSk7XG5cbiAgICBmb3IgKGxldCBpeT0wOyBpeTxudW07IGl5KyspXG4gICAge1xuICAgICAgdnggPSB4IC0gcmFkaXVzO1xuICAgICAgZm9yIChsZXQgaXg9MDsgaXg8bnVtOyBpeCsrKVxuICAgICAge1xuICAgICAgICBuW2l5XVtpeF0gPSB0aGlzLmRhdGFbdGhpcy53cmFwKHZ5KV1bdGhpcy53cmFwKHZ4KV07XG4gICAgICAgIHZ4Kys7XG4gICAgICB9XG4gICAgICB2eSsrO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBjZWxsczogbixcbiAgICAgIHJhZGl1czogcmFkaXVzLFxuICAgICAgc3ViamVjdDogdGhpcy5kYXRhW3ldW3hdXG4gICAgfVxuICB9XG5cbiAgd3JhcCh2KVxuICB7XG4gICAgaWYgKCB2IDwgMCApIHJldHVybiB2ICsgdGhpcy5zaXplO1xuICAgIGlmICggdiA+IHRoaXMuc2l6ZS0xKSByZXR1cm4gdiAtIHRoaXMuc2l6ZTtcbiAgICByZXR1cm4gdjtcbiAgfVxuXG4gIGFycmF5MmQoc2l6ZSlcbiAge1xuICAgIGZvciAodmFyIGQ9W107IGQubGVuZ3RoIDwgc2l6ZTsgZC5wdXNoKFtdKSk7XG4gICAgcmV0dXJuIGQ7XG4gIH1cblxuICBtdXRhdGUoKVxuICB7XG4gICAgbGV0IG5leHQgPSB0aGlzLmFycmF5MmQodGhpcy5zaXplKTtcblxuICAgIGZvciAobGV0IHk9MDsgeTx0aGlzLnNpemU7IHkrKylcbiAgICB7XG4gICAgICBmb3IgKGxldCB4PTA7IHg8dGhpcy5zaXplOyB4KyspXG4gICAgICB7XG4gICAgICAgIGlmICh0aGlzLmRhdGFbeV1beF0pXG4gICAgICAgICAgbmV4dFt5XVt4XSA9IHRoaXMuZGF0YVt5XVt4XS5tdXRhdGUodGhpcy5uZWlnaGJvdXJob29kKHgseSkpO1xuXG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5kYXRhID0gbmV4dDtcbiAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi8yZC9jb3JlL1dvcmxkLmpzIiwiXG5pbXBvcnQgQ2FudmFzMmQgZnJvbSAnLi4vLi4vc2hhcmVkL0NhbnZhczJkJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVuZGVyZXIyZFxue1xuICBjb25zdHJ1Y3RvcihlbGVtZW50KVxuICB7XG4gICAgdGhpcy5jYW52YXMyZCA9IG5ldyBDYW52YXMyZChlbGVtZW50KTtcbiAgICB0aGlzLnNjYWxlID0gMTtcbiAgICB0aGlzLnNpemUgPSAxO1xuICB9XG5cbiAgcmVzaXplKHcsIGgpXG4gIHtcbiAgICB0aGlzLmNhbnZhczJkLnJlc2l6ZSh3LCBoKTtcbiAgICB0aGlzLmNhbnZhczJkLmNsZWFyKCk7XG4gIH1cblxuICByZW5kZXIoZGF0YSlcbiAge1xuXG4gICAgaWYgKGRhdGEubGVuZ3RoICE9IHRoaXMuc2l6ZSlcbiAgICB7XG4gICAgICB0aGlzLnNpemUgPSBkYXRhLmxlbmd0aDtcbiAgICAgIHRoaXMucmVzaXplKHRoaXMuc2l6ZSAqIHRoaXMuc2NhbGUsIHRoaXMuc2l6ZSAqIHRoaXMuc2NhbGUpO1xuICAgIH1cblxuICAgIGZvciAobGV0IHk9MDsgeTx0aGlzLnNpemU7IHkrKylcbiAgICB7XG4gICAgICBmb3IgKGxldCB4PTA7IHg8dGhpcy5zaXplOyB4KyspXG4gICAgICB7XG4gICAgICAgIGlmIChkYXRhW3ldW3hdKVxuICAgICAgICB7XG4gICAgICAgICAgbGV0IGNvbCA9IGRhdGFbeV1beF0uc2hhZGVyKCk7XG4gICAgICAgIC8vbGV0IGNvbCA9IGRhdGFbeV1beF0gPyBbMCwwLDBdIDogWzI1NSwyNTUsMjU1XTtcbiAgICAgICAgICB0aGlzLmNhbnZhczJkLmJsb2NrKHkgKiB0aGlzLnNjYWxlLCB4ICogdGhpcy5zY2FsZSwgdGhpcy5zY2FsZSwgdGhpcy5zY2FsZSwgY29sKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLzJkL2NvcmUvUmVuZGVyZXIyZC5qcyIsIlxuaW1wb3J0IENlbGwgZnJvbSAnLi9DZWxsJztcblxuY29uc3QgQUxJVkUgPSAxLCBERUFEID0gMDtcblxuY29uc3QgcGFsZXR0ZSA9IFtcbiAgWzI1NSwyNTUsMjU1XSxcbiAgWzAsMCwwXVxuXTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZU9mTGlmZSBleHRlbmRzIENlbGxcbntcbiAgY29uc3RydWN0b3IoKVxuICB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmFsaXZlID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKTtcbiAgfVxuXG4gIHNoYWRlcigpXG4gIHtcbiAgICByZXR1cm4gcGFsZXR0ZVsgdGhpcy5hbGl2ZSBdO1xuICB9XG5cbiAgLy8gQXNzaWducyBhIGdlbmVyaWMgJ3ZhbHVlJyB0byBmZWVkYmFjayBpbnRvIHRoZSBDZWxsICdpbnRlcmZhY2UnIGNvdW50aW5nIG1ldGhvZFxuICBldmFsdWF0ZSgpXG4gIHtcbiAgICByZXR1cm4gdGhpcy5hbGl2ZSA/IDEgOiAwO1xuICB9XG5cbiAgbXV0YXRlKGNlbGxzKVxuICB7XG4gICAgbGV0IG4gPSB0aGlzLm51bU5laWdoYm91cnMoY2VsbHMpO1xuICAgIGxldCBtZSA9IG5ldyBHYW1lT2ZMaWZlKCk7XG4gICAgbGV0IG5ld1N0YXRlID0gREVBRDtcblxuICAgIGlmIChjZWxscy5zdWJqZWN0LmFsaXZlICYmIG4gPCAyKVxuICAgICAgbmV3U3RhdGUgPSBERUFEO1xuICAgIGVsc2UgaWYgKGNlbGxzLnN1YmplY3QuYWxpdmUgJiYgbiA+IDMpXG4gICAgICBuZXdTdGF0ZSA9IERFQUQ7XG4gICAgZWxzZSBpZiAoIWNlbGxzLnN1YmplY3QuYWxpdmUgJiYgbiA9PSAzKVxuICAgICAgbmV3U3RhdGUgPSBBTElWRTtcbiAgICBlbHNlXG4gICAgICBuZXdTdGF0ZSA9IGNlbGxzLnN1YmplY3QuYWxpdmU7XG5cbiAgICBtZS5hbGl2ZSA9IG5ld1N0YXRlO1xuICAgIHJldHVybiBtZTtcbiAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi8yZC9jZWxscy9DZWxsLUdvTC5qcyIsIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDZWxsXG57XG4gIGNvbnN0cnVjdG9yKClcbiAge1xuXG4gIH1cblxuICBpbml0KG9wdGlvbnMpXG4gIHtcbiAgICBpZiAoIW9wdGlvbnMpIHJldHVybjtcblxuICB9XG5cbiAgbXV0YXRlKG5laWdoYm91cnMpXG4gIHtcblxuICB9XG5cbiAgc2hhZGVyKClcbiAge1xuXG4gIH1cblxuICBldmFsdWF0ZSgpXG4gIHtcblxuICB9XG5cbiAgbnVtTmVpZ2hib3VycyhuKVxuICB7XG4gICAgbGV0IG51bSA9IDA7XG5cbiAgICBmb3IgKGxldCB5ID0gMDsgeTxuLmNlbGxzLmxlbmd0aDsgeSsrKVxuICAgICAgZm9yIChsZXQgeCA9IDA7IHg8bi5jZWxsc1t5XS5sZW5ndGg7IHgrKylcbiAgICAgICAgaWYgKG4uY2VsbHNbeV1beF0pIGlmIChuLmNlbGxzW3ldW3hdLmV2YWx1YXRlKCkgPiAwKSBudW0gKys7XG5cbiAgICAvLyBkb24ndCBpbmNsdWRlICd1cycgaW4gdGhlIGNvdW50IVxuICAgIHJldHVybiBudW0gLSAobi5zdWJqZWN0LmV2YWx1YXRlKCkgPiAwID8gMSA6IDApO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi8yZC9jZWxscy9DZWxsLmpzIiwiXG5cbi8vIEJvaWxlcnBsYXRlIGZ1bmN0aW9ucyB0byB3cml0ZSB0byB0aGUgQ2FudmFzXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhbnZhczJkXG57XG4gIGNvbnN0cnVjdG9yKHBhcmVudClcbiAge1xuICAgIHRoaXMucGFyZW50ID0gdHlwZW9mIHBhcmVudCA9PSAnc3RyaW5nJyA/IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBhcmVudCkgOiBwYXJlbnQ7XG4gICAgdGhpcy5lbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICB0aGlzLnBhcmVudC5hcHBlbmRDaGlsZCh0aGlzLmVsZW1lbnQpO1xuICAgIHRoaXMuY29udGV4dCA9IHRoaXMuZWxlbWVudC5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgdGhpcy5jbGVhcigpO1xuXG4gIH1cblxuICBibG9jayh4LHksdyxoLGMpXG4gIHtcbiAgICBsZXQgdCA9IHRoaXMuY29udGV4dDtcbiAgICB0LmJlZ2luUGF0aCgpO1xuICAgIHQucmVjdCh4LCB5LCB3LCBoKTtcbiAgICB0LmZpbGxTdHlsZSA9IGMgPyBgcmdiKCR7Y1swXX0sJHtjWzFdfSwke2NbMl19KWAgOiBcImJsYWNrXCI7XG4gICAgdC5maWxsKCk7XG4gIH1cblxuICBzZWxmYmxpdChzeCwgc3ksIHN3LCBzaCwgZHgsIGR5LCBkdywgZGgpXG4gIHtcbiAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKHRoaXMuY29udGV4dC5jYW52YXMsIHN4LCBzeSwgc3csIHNoLCBkeCwgZHksIGR3LCBkaCk7XG4gIH1cblxuICBjbGVhcihjKVxuICB7XG4gICAgbGV0IHQgPSB0aGlzLmNvbnRleHQ7XG4gICAgdC5iZWdpblBhdGgoKTtcbiAgICB0LnJlY3QoMCwgMCwgdGhpcy5lbGVtZW50LndpZHRoLCB0aGlzLmVsZW1lbnQuaGVpZ2h0KTtcbiAgICB0LmZpbGxTdHlsZSA9IGMgPyBgcmdiKCR7Y1swXX0sJHtjWzFdfSwke2NbMl19KWAgOiBcIndoaXRlXCI7XG4gICAgdC5maWxsKCk7XG4gIH1cblxuICB3aWR0aCgpXG4gIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50LndpZHRoO1xuICB9XG5cbiAgaGVpZ2h0KClcbiAge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnQuaGVpZ2h0O1xuICB9XG5cbiAgZml0d2luZG93KClcbiAge1xuICAgIHRoaXMucmVzaXplKHRoaXMucGFyZW50LmNsaWVudFdpZHRoLCB0aGlzLnBhcmVudC5jbGllbnRIZWlnaHQpO1xuICB9XG5cbiAgcmVzaXplKHcsIGgpXG4gIHtcblxuICAgIHRoaXMuZWxlbWVudC53aWR0aCA9IHc7XG4gICAgdGhpcy5lbGVtZW50LmhlaWdodCA9IGg7XG5cbiAgICAvLyBkcmF3KClcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2hhcmVkL0NhbnZhczJkLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==