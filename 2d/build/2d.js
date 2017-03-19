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
	
	var _GoL = __webpack_require__(6);
	
	var _GoL2 = _interopRequireDefault(_GoL);
	
	var _Flood = __webpack_require__(7);
	
	var _Flood2 = _interopRequireDefault(_Flood);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var SIZE = 75; // cells
	var VIEW_SCALE = 8;
	var WORLD_FRAME_RATE = 30;
	
	var fpsText = document.getElementById("fps");
	
	var lastTime = 0,
	    frames = 0,
	    avFrames = 0;
	
	var world = new _World2.default({
	  size: SIZE,
	  spread: 1.0,
	  type: _Flood2.default
	});
	
	var renderer = new _Renderer2d2.default("content");
	renderer.scale = VIEW_SCALE;
	
	renderer.render(world.data);
	world.evolve();
	
	window.requestAnimationFrame(render);
	window.setInterval(function () {
	  world.evolve();
	}, 1000 / WORLD_FRAME_RATE);
	
	function render() {
	  var timeNow = performance.now();
	  var timeTaken = timeNow - lastTime;
	
	  avFrames += 1000 / timeTaken;
	  lastTime = timeNow;
	
	  if (frames++ == 10) {
	    fpsText.innerHTML = (avFrames / 10).toFixed(1) + " FPS";
	    frames = 0;
	    avFrames = 0;
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
	      var l = [];
	
	      for (var iy = 0; iy < num; iy++) {
	        vx = x - radius;
	        for (var ix = 0; ix < num; ix++) {
	          n[iy][ix] = this.data[this.wrap(vy)][this.wrap(vx)];
	          l.push(this.data[this.wrap(vy)][this.wrap(vx)]);
	          vx++;
	        }
	        vy++;
	      }
	
	      return {
	        cells: n,
	        linear: l,
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
	    key: "evolve",
	    value: function evolve() {
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
/* 4 */,
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	// This is the base type of Cell used for every CA type.
	// It's more of a classical "Interface" than a class I suppose
	
	var Cell = function () {
	  function Cell() {
	    _classCallCheck(this, Cell);
	  }
	
	  _createClass(Cell, [{
	    key: "mutate",
	    value: function mutate(neighbours) {}
	  }, {
	    key: "shader",
	    value: function shader() {}
	  }, {
	    key: "value",
	    value: function value() {}
	  }, {
	    key: "numLiveNeighbours",
	    value: function numLiveNeighbours(n) {
	      var num = 0;
	
	      for (var y = 0; y < n.cells.length; y++) {
	        for (var x = 0; x < n.cells[y].length; x++) {
	          if (n.cells[y][x]) if (n.cells[y][x].value() > 0) num++;
	        }
	      } // don't include 'us' in the count!
	      return num - (n.subject.value() > 0 ? 1 : 0);
	    }
	  }]);
	
	  return Cell;
	}();
	
	exports.default = Cell;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Cell2 = __webpack_require__(5);
	
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
	  }, {
	    key: 'evaluate',
	    value: function evaluate() {
	      return this.alive ? 1 : 0;
	    }
	
	    // // Gets or assigns a 'value' to feedback into the Cell 'interface' counting method
	
	  }, {
	    key: 'value',
	    value: function value(v) {
	      if (v === undefined) return this.alive ? 1 : 0;
	      this.alive = v == 0 ? DEAD : ALIVE;
	    }
	  }, {
	    key: 'mutate',
	    value: function mutate(cells) {
	      var n = this.numLiveNeighbours(cells);
	      var me = new GameOfLife();
	      var newState = DEAD;
	
	      if (cells.subject.alive && n < 2) newState = DEAD;else if (cells.subject.alive && n > 3) newState = DEAD;else if (!cells.subject.alive && n == 3) newState = ALIVE;else newState = cells.subject.value();
	
	      me.value(newState);
	
	      return me;
	    }
	  }]);
	
	  return GameOfLife;
	}(_Cell3.default);
	
	exports.default = GameOfLife;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Cell2 = __webpack_require__(5);
	
	var _Cell3 = _interopRequireDefault(_Cell2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var MAX_VALUES = 32;
	var R = 0,
	    G = 1,
	    B = 2;
	//
	// const palette = [
	//   [10, 255, 96],
	//   [255, 32, 255],
	//   [172, 54, 255],
	//   [32, 32, 255],
	//   [32, 255, 255],
	//   [32, 32, 255],
	//   [255, 255, 32]
	// ];
	
	// nice clouds
	// const palette = [
	//   [53, 177, 255],
	//   [200, 200, 215],
	//   [255, 255, 255]
	// ];
	
	// fire ish
	// const palette = [
	//   [255, 0, 0],
	//   [255, 255, 0],
	//   [255, 255, 220]
	// ];
	
	var palette = [[255, 0, 0, 1], [255, 96, 0, 1], [255, 191, 0, 1], [223, 255, 0, 1], [128, 255, 0, 1], [32, 255, 0, 1], [0, 255, 64, 1], [0, 255, 159, 1], [0, 255, 255, 1], [0, 159, 255, 1], [0, 64, 255, 1], [32, 0, 255, 1], [127, 0, 255, 1], [223, 0, 255, 1], [255, 0, 191, 1], [255, 0, 96, 1]];
	
	var REDS = palette.map(function (e) {
	  return e[R];
	});
	var GREENS = palette.map(function (e) {
	  return e[G];
	});
	var BLUES = palette.map(function (e) {
	  return e[B];
	});
	
	var Flood = function (_Cell) {
	  _inherits(Flood, _Cell);
	
	  function Flood() {
	    _classCallCheck(this, Flood);
	
	    var _this = _possibleConstructorReturn(this, (Flood.__proto__ || Object.getPrototypeOf(Flood)).call(this));
	
	    _this.state = Math.floor(Math.random() * MAX_VALUES);
	    return _this;
	  }
	
	  _createClass(Flood, [{
	    key: 'shader',
	    value: function shader() {
	      var i = this.value() / MAX_VALUES;
	
	      var c = [this.ilinerp(REDS, i) & 0xff, this.ilinerp(GREENS, i) & 0xff, this.ilinerp(BLUES, i) & 0xff];
	
	      //console.log(c);
	      return c;
	    }
	
	    // // Gets or assigns a 'value' to feedback into the Cell 'interface' counting method
	
	  }, {
	    key: 'value',
	    value: function value(v) {
	      if (v == undefined) return this.state;
	      this.state = v;
	    }
	  }, {
	    key: 'mutate',
	    value: function mutate(entity) {
	
	      var next = (this.value() + Math.floor(Math.random() * 5)) % MAX_VALUES;
	
	      var change = false;
	      for (var t = 0; t < entity.linear.length; t++) {
	        if (entity.linear[t]) change = change || entity.linear[t].value() === next;
	      }
	
	      if (change) this.value(next);
	
	      return this;
	    }
	
	    // Linearly interpolates between an array of values
	    // e.g. values = [5, 10, 1], p = 0..1
	
	  }, {
	    key: 'ilinerp',
	    value: function ilinerp(values, position) {
	      if (position >= 1) return values[values.length - 1];
	      if (position < 0) return values[0];
	
	      var p = position * (values.length - 1);
	
	      var i1 = Math.floor(p);
	      var i2 = i1 + 1;
	      var q = p - i1;
	
	      var v = values[i1] * (1 - q) + values[i2] * q;
	
	      return Math.round(v);
	    }
	  }]);
	
	  return Flood;
	}(_Cell3.default);
	
	exports.default = Flood;

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMTZiNGI2M2E2NTU4NWY2ODg4ODkiLCJ3ZWJwYWNrOi8vLy4vMmQvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi8yZC9jb3JlL1dvcmxkLmpzIiwid2VicGFjazovLy8uLzJkL2NvcmUvUmVuZGVyZXIyZC5qcyIsIndlYnBhY2s6Ly8vLi9zaGFyZWQvQ2FudmFzMmQuanMiLCJ3ZWJwYWNrOi8vLy4vMmQvY2VsbHMvQ2VsbC5qcyIsIndlYnBhY2s6Ly8vLi8yZC9jZWxscy9Hb0wuanMiLCJ3ZWJwYWNrOi8vLy4vMmQvY2VsbHMvRmxvb2QuanMiXSwibmFtZXMiOlsiU0laRSIsIlZJRVdfU0NBTEUiLCJXT1JMRF9GUkFNRV9SQVRFIiwiZnBzVGV4dCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJsYXN0VGltZSIsImZyYW1lcyIsImF2RnJhbWVzIiwid29ybGQiLCJzaXplIiwic3ByZWFkIiwidHlwZSIsInJlbmRlcmVyIiwic2NhbGUiLCJyZW5kZXIiLCJkYXRhIiwiZXZvbHZlIiwid2luZG93IiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwic2V0SW50ZXJ2YWwiLCJ0aW1lTm93IiwicGVyZm9ybWFuY2UiLCJub3ciLCJ0aW1lVGFrZW4iLCJpbm5lckhUTUwiLCJ0b0ZpeGVkIiwiV29ybGQiLCJvcHRpb25zIiwiaW5pdCIsIkNlbGxUeXBlIiwiYXJyYXkyZCIsImkiLCJ5IiwieCIsIk1hdGgiLCJyYW5kb20iLCJyIiwicmFkaXVzIiwibnVtIiwidngiLCJ2eSIsIm4iLCJsIiwiaXkiLCJpeCIsIndyYXAiLCJwdXNoIiwiY2VsbHMiLCJsaW5lYXIiLCJzdWJqZWN0IiwidiIsImQiLCJsZW5ndGgiLCJuZXh0IiwibXV0YXRlIiwibmVpZ2hib3VyaG9vZCIsIlJlbmRlcmVyMmQiLCJlbGVtZW50IiwiY2FudmFzMmQiLCJ3IiwiaCIsInJlc2l6ZSIsImNsZWFyIiwiY29sIiwic2hhZGVyIiwiYmxvY2siLCJDYW52YXMyZCIsInBhcmVudCIsImNyZWF0ZUVsZW1lbnQiLCJhcHBlbmRDaGlsZCIsImNvbnRleHQiLCJnZXRDb250ZXh0IiwiYyIsInQiLCJiZWdpblBhdGgiLCJyZWN0IiwiZmlsbFN0eWxlIiwiZmlsbCIsInN4Iiwic3kiLCJzdyIsInNoIiwiZHgiLCJkeSIsImR3IiwiZGgiLCJkcmF3SW1hZ2UiLCJjYW52YXMiLCJ3aWR0aCIsImhlaWdodCIsImNsaWVudFdpZHRoIiwiY2xpZW50SGVpZ2h0IiwiQ2VsbCIsIm5laWdoYm91cnMiLCJ2YWx1ZSIsIkFMSVZFIiwiREVBRCIsInBhbGV0dGUiLCJHYW1lT2ZMaWZlIiwiYWxpdmUiLCJyb3VuZCIsInVuZGVmaW5lZCIsIm51bUxpdmVOZWlnaGJvdXJzIiwibWUiLCJuZXdTdGF0ZSIsIk1BWF9WQUxVRVMiLCJSIiwiRyIsIkIiLCJSRURTIiwibWFwIiwiZSIsIkdSRUVOUyIsIkJMVUVTIiwiRmxvb2QiLCJzdGF0ZSIsImZsb29yIiwiaWxpbmVycCIsImVudGl0eSIsImNoYW5nZSIsInZhbHVlcyIsInBvc2l0aW9uIiwicCIsImkxIiwiaTIiLCJxIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7O0FDcENBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxLQUFNQSxPQUFPLEVBQWIsQyxDQUFpQjtBQUNqQixLQUFNQyxhQUFhLENBQW5CO0FBQ0EsS0FBTUMsbUJBQW1CLEVBQXpCOztBQUVBLEtBQUlDLFVBQVVDLFNBQVNDLGNBQVQsQ0FBd0IsS0FBeEIsQ0FBZDs7QUFFQSxLQUFJQyxXQUFXLENBQWY7QUFBQSxLQUFrQkMsU0FBUyxDQUEzQjtBQUFBLEtBQThCQyxXQUFX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QixXQUFJRSxJQUFJRCxZQUFZRCxPQUFPcEUsTUFBUCxHQUFnQixDQUE1QixDQUFSOztBQUVBLFdBQUl1RSxLQUFLekYsS0FBS2tGLEtBQUwsQ0FBV00sQ0FBWCxDQUFUO0FBQ0EsV0FBSUUsS0FBS0QsS0FBSyxDQUFkO0FBQ0EsV0FBSUUsSUFBSUgsSUFBSUMsRUFBWjs7QUFFQSxXQUFJekUsSUFBS3NFLE9BQU9HLEVBQVAsS0FBYyxJQUFFRSxDQUFoQixDQUFELEdBQXdCTCxPQUFPSSxFQUFQLElBQWNDLENBQTlDOztBQUVBLGNBQU8zRixLQUFLa0UsS0FBTCxDQUFXbEQsQ0FBWCxDQUFQO0FBQ0Q7Ozs7OzttQkFqRWtCZ0UsSyIsImZpbGUiOiIyZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAxNmI0YjYzYTY1NTg1ZjY4ODg4OSIsIlxuXG5pbXBvcnQgV29ybGQgICAgICAgIGZyb20gJy4vY29yZS9Xb3JsZC5qcyc7XG5pbXBvcnQgUmVuZGVyZXIgICAgIGZyb20gJy4vY29yZS9SZW5kZXJlcjJkJztcbmltcG9ydCBHYW1lT2ZMaWZlICAgZnJvbSAnLi9jZWxscy9Hb0wnO1xuaW1wb3J0IEZsb29kICAgICAgICBmcm9tICcuL2NlbGxzL0Zsb29kJztcblxuY29uc3QgU0laRSA9IDc1OyAvLyBjZWxsc1xuY29uc3QgVklFV19TQ0FMRSA9IDg7XG5jb25zdCBXT1JMRF9GUkFNRV9SQVRFID0gMzA7XG5cbmxldCBmcHNUZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmcHNcIik7XG5cbmxldCBsYXN0VGltZSA9IDAsIGZyYW1lcyA9IDAsIGF2RnJhbWVzID0gMDtcblxubGV0IHdvcmxkID0gbmV3IFdvcmxkKHtcbiAgc2l6ZTogU0laRSxcbiAgc3ByZWFkOiAxLjAsXG4gIHR5cGU6IEZsb29kXG59KTtcblxubGV0IHJlbmRlcmVyID0gbmV3IFJlbmRlcmVyKFwiY29udGVudFwiKTtcbnJlbmRlcmVyLnNjYWxlID0gVklFV19TQ0FMRTtcblxucmVuZGVyZXIucmVuZGVyKHdvcmxkLmRhdGEpO1xud29ybGQuZXZvbHZlKCk7XG5cblxuXG53aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlbmRlcik7XG53aW5kb3cuc2V0SW50ZXJ2YWwoKCkgPT4geyB3b3JsZC5ldm9sdmUoKSB9LCAxMDAwIC8gV09STERfRlJBTUVfUkFURSk7XG5cbmZ1bmN0aW9uIHJlbmRlcigpXG57XG4gIGxldCB0aW1lTm93ID0gcGVyZm9ybWFuY2Uubm93KCk7XG4gIGxldCB0aW1lVGFrZW4gPSB0aW1lTm93IC0gbGFzdFRpbWU7XG5cbiAgYXZGcmFtZXMgKz0gIDEwMDAgLyB0aW1lVGFrZW47XG4gIGxhc3RUaW1lID0gdGltZU5vdztcblxuICBpZiAoZnJhbWVzKysgPT0gMTApXG4gIHtcbiAgICBmcHNUZXh0LmlubmVySFRNTCA9IChhdkZyYW1lcyAvIDEwKS50b0ZpeGVkKDEpICsgXCIgRlBTXCI7XG4gICAgZnJhbWVzID0gMDtcbiAgICBhdkZyYW1lcyA9IDA7XG4gIH1cblxuICByZW5kZXJlci5yZW5kZXIod29ybGQuZGF0YSk7XG4gIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLzJkL21haW4uanMiLCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV29ybGRcbntcbiAgY29uc3RydWN0b3Iob3B0aW9ucylcbiAge1xuXG4gICAgdGhpcy5zaXplID0gb3B0aW9ucy5zaXplOyAvL2NlbGxzLCBzcXVhcmVcbiAgICB0aGlzLmRhdGEgPSBudWxsO1xuXG4gICAgdGhpcy5pbml0KG9wdGlvbnMudHlwZSwgb3B0aW9ucy5zcHJlYWQpO1xuICB9XG5cbiAgaW5pdChDZWxsVHlwZSwgc3ByZWFkKVxuICB7XG4gICAgLy8gQ3JlYXRlIHRoZSBhcnJheTpcbiAgICB0aGlzLmRhdGEgPSB0aGlzLmFycmF5MmQodGhpcy5zaXplKTtcbiAgICBsZXQgaSA9IDA7XG5cbiAgICBmb3IgKGxldCB5PTA7IHk8dGhpcy5zaXplOyB5KyspXG4gICAgICBmb3IgKGxldCB4PTA7IHg8dGhpcy5zaXplOyB4KyspXG4gICAgICAgIGlmIChNYXRoLnJhbmRvbSgpIDw9IHNwcmVhZClcbiAgICAgICAgICB0aGlzLmRhdGFbeV1beF0gPSBuZXcgQ2VsbFR5cGUoKTtcbiAgfVxuXG4gIG5laWdoYm91cmhvb2QoeCwgeSwgcilcbiAge1xuICAgIGxldCByYWRpdXMgPSByIHx8IDE7XG4gICAgbGV0IG51bSA9IChyYWRpdXMgKiAyKSArIDE7XG5cbiAgICBsZXQgdnggPSB4IC0gcmFkaXVzO1xuICAgIGxldCB2eSA9IHkgLSByYWRpdXM7XG5cbiAgICBsZXQgbiA9IHRoaXMuYXJyYXkyZChudW0pO1xuICAgIGxldCBsID0gW107XG5cbiAgICBmb3IgKGxldCBpeT0wOyBpeTxudW07IGl5KyspXG4gICAge1xuICAgICAgdnggPSB4IC0gcmFkaXVzO1xuICAgICAgZm9yIChsZXQgaXg9MDsgaXg8bnVtOyBpeCsrKVxuICAgICAge1xuICAgICAgICBuW2l5XVtpeF0gPSB0aGlzLmRhdGFbdGhpcy53cmFwKHZ5KV1bdGhpcy53cmFwKHZ4KV07XG4gICAgICAgIGwucHVzaCh0aGlzLmRhdGFbdGhpcy53cmFwKHZ5KV1bdGhpcy53cmFwKHZ4KV0pO1xuICAgICAgICB2eCsrO1xuICAgICAgfVxuICAgICAgdnkrKztcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgY2VsbHM6IG4sXG4gICAgICBsaW5lYXI6IGwsXG4gICAgICByYWRpdXM6IHJhZGl1cyxcbiAgICAgIHN1YmplY3Q6IHRoaXMuZGF0YVt5XVt4XVxuICAgIH1cbiAgfVxuXG4gIHdyYXAodilcbiAge1xuICAgIGlmICggdiA8IDAgKSByZXR1cm4gdiArIHRoaXMuc2l6ZTtcbiAgICBpZiAoIHYgPiB0aGlzLnNpemUtMSkgcmV0dXJuIHYgLSB0aGlzLnNpemU7XG4gICAgcmV0dXJuIHY7XG4gIH1cblxuICBhcnJheTJkKHNpemUpXG4gIHtcbiAgICBmb3IgKHZhciBkPVtdOyBkLmxlbmd0aCA8IHNpemU7IGQucHVzaChbXSkpO1xuICAgIHJldHVybiBkO1xuICB9XG5cbiAgZXZvbHZlKClcbiAge1xuICAgIGxldCBuZXh0ID0gdGhpcy5hcnJheTJkKHRoaXMuc2l6ZSk7XG5cbiAgICBmb3IgKGxldCB5PTA7IHk8dGhpcy5zaXplOyB5KyspXG4gICAge1xuICAgICAgZm9yIChsZXQgeD0wOyB4PHRoaXMuc2l6ZTsgeCsrKVxuICAgICAge1xuICAgICAgICBpZiAodGhpcy5kYXRhW3ldW3hdKVxuICAgICAgICAgIG5leHRbeV1beF0gPSB0aGlzLmRhdGFbeV1beF0ubXV0YXRlKHRoaXMubmVpZ2hib3VyaG9vZCh4LHkpKTtcblxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuZGF0YSA9IG5leHQ7XG4gIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vMmQvY29yZS9Xb3JsZC5qcyIsIlxuaW1wb3J0IENhbnZhczJkIGZyb20gJy4uLy4uL3NoYXJlZC9DYW52YXMyZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlbmRlcmVyMmRcbntcbiAgY29uc3RydWN0b3IoZWxlbWVudClcbiAge1xuICAgIHRoaXMuY2FudmFzMmQgPSBuZXcgQ2FudmFzMmQoZWxlbWVudCk7XG4gICAgdGhpcy5zY2FsZSA9IDE7XG4gICAgdGhpcy5zaXplID0gMTtcbiAgfVxuXG4gIHJlc2l6ZSh3LCBoKVxuICB7XG4gICAgdGhpcy5jYW52YXMyZC5yZXNpemUodywgaCk7XG4gICAgdGhpcy5jYW52YXMyZC5jbGVhcigpO1xuICB9XG5cbiAgcmVuZGVyKGRhdGEpXG4gIHtcblxuICAgIGlmIChkYXRhLmxlbmd0aCAhPSB0aGlzLnNpemUpXG4gICAge1xuICAgICAgdGhpcy5zaXplID0gZGF0YS5sZW5ndGg7XG4gICAgICB0aGlzLnJlc2l6ZSh0aGlzLnNpemUgKiB0aGlzLnNjYWxlLCB0aGlzLnNpemUgKiB0aGlzLnNjYWxlKTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCB5PTA7IHk8dGhpcy5zaXplOyB5KyspXG4gICAge1xuICAgICAgZm9yIChsZXQgeD0wOyB4PHRoaXMuc2l6ZTsgeCsrKVxuICAgICAge1xuICAgICAgICBpZiAoZGF0YVt5XVt4XSlcbiAgICAgICAge1xuICAgICAgICAgIGxldCBjb2wgPSBkYXRhW3ldW3hdLnNoYWRlcigpO1xuICAgICAgICAvL2xldCBjb2wgPSBkYXRhW3ldW3hdID8gWzAsMCwwXSA6IFsyNTUsMjU1LDI1NV07XG4gICAgICAgICAgdGhpcy5jYW52YXMyZC5ibG9jayh5ICogdGhpcy5zY2FsZSwgeCAqIHRoaXMuc2NhbGUsIHRoaXMuc2NhbGUsIHRoaXMuc2NhbGUsIGNvbCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi8yZC9jb3JlL1JlbmRlcmVyMmQuanMiLCJcblxuLy8gQm9pbGVycGxhdGUgZnVuY3Rpb25zIHRvIHdyaXRlIHRvIHRoZSBDYW52YXNcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FudmFzMmRcbntcbiAgY29uc3RydWN0b3IocGFyZW50KVxuICB7XG4gICAgdGhpcy5wYXJlbnQgPSB0eXBlb2YgcGFyZW50ID09ICdzdHJpbmcnID8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGFyZW50KSA6IHBhcmVudDtcbiAgICB0aGlzLmVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgIHRoaXMucGFyZW50LmFwcGVuZENoaWxkKHRoaXMuZWxlbWVudCk7XG4gICAgdGhpcy5jb250ZXh0ID0gdGhpcy5lbGVtZW50LmdldENvbnRleHQoXCIyZFwiKTtcbiAgICB0aGlzLmNsZWFyKCk7XG5cbiAgfVxuXG4gIGJsb2NrKHgseSx3LGgsYylcbiAge1xuICAgIGxldCB0ID0gdGhpcy5jb250ZXh0O1xuICAgIHQuYmVnaW5QYXRoKCk7XG4gICAgdC5yZWN0KHgsIHksIHcsIGgpO1xuICAgIHQuZmlsbFN0eWxlID0gYyA/IGByZ2IoJHtjWzBdfSwke2NbMV19LCR7Y1syXX0pYCA6IFwiYmxhY2tcIjtcbiAgICB0LmZpbGwoKTtcbiAgfVxuXG4gIHNlbGZibGl0KHN4LCBzeSwgc3csIHNoLCBkeCwgZHksIGR3LCBkaClcbiAge1xuICAgIHRoaXMuY29udGV4dC5kcmF3SW1hZ2UodGhpcy5jb250ZXh0LmNhbnZhcywgc3gsIHN5LCBzdywgc2gsIGR4LCBkeSwgZHcsIGRoKTtcbiAgfVxuXG4gIGNsZWFyKGMpXG4gIHtcbiAgICBsZXQgdCA9IHRoaXMuY29udGV4dDtcbiAgICB0LmJlZ2luUGF0aCgpO1xuICAgIHQucmVjdCgwLCAwLCB0aGlzLmVsZW1lbnQud2lkdGgsIHRoaXMuZWxlbWVudC5oZWlnaHQpO1xuICAgIHQuZmlsbFN0eWxlID0gYyA/IGByZ2IoJHtjWzBdfSwke2NbMV19LCR7Y1syXX0pYCA6IFwid2hpdGVcIjtcbiAgICB0LmZpbGwoKTtcbiAgfVxuXG4gIHdpZHRoKClcbiAge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnQud2lkdGg7XG4gIH1cblxuICBoZWlnaHQoKVxuICB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudC5oZWlnaHQ7XG4gIH1cblxuICBmaXR3aW5kb3coKVxuICB7XG4gICAgdGhpcy5yZXNpemUodGhpcy5wYXJlbnQuY2xpZW50V2lkdGgsIHRoaXMucGFyZW50LmNsaWVudEhlaWdodCk7XG4gIH1cblxuICByZXNpemUodywgaClcbiAge1xuXG4gICAgdGhpcy5lbGVtZW50LndpZHRoID0gdztcbiAgICB0aGlzLmVsZW1lbnQuaGVpZ2h0ID0gaDtcblxuICAgIC8vIGRyYXcoKVxuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zaGFyZWQvQ2FudmFzMmQuanMiLCJcbi8vIFRoaXMgaXMgdGhlIGJhc2UgdHlwZSBvZiBDZWxsIHVzZWQgZm9yIGV2ZXJ5IENBIHR5cGUuXG4vLyBJdCdzIG1vcmUgb2YgYSBjbGFzc2ljYWwgXCJJbnRlcmZhY2VcIiB0aGFuIGEgY2xhc3MgSSBzdXBwb3NlXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENlbGxcbntcbiAgY29uc3RydWN0b3IoKVxuICB7XG5cbiAgfVxuXG4gIG11dGF0ZShuZWlnaGJvdXJzKVxuICB7XG5cbiAgfVxuXG4gIHNoYWRlcigpXG4gIHtcblxuICB9XG5cblxuICB2YWx1ZSgpXG4gIHtcblxuICB9XG5cbiAgbnVtTGl2ZU5laWdoYm91cnMobilcbiAge1xuICAgIGxldCBudW0gPSAwO1xuXG4gICAgZm9yIChsZXQgeSA9IDA7IHk8bi5jZWxscy5sZW5ndGg7IHkrKylcbiAgICAgIGZvciAobGV0IHggPSAwOyB4PG4uY2VsbHNbeV0ubGVuZ3RoOyB4KyspXG4gICAgICAgIGlmIChuLmNlbGxzW3ldW3hdKSBpZiAobi5jZWxsc1t5XVt4XS52YWx1ZSgpID4gMCkgbnVtICsrO1xuXG4gICAgLy8gZG9uJ3QgaW5jbHVkZSAndXMnIGluIHRoZSBjb3VudCFcbiAgICByZXR1cm4gbnVtIC0gKG4uc3ViamVjdC52YWx1ZSgpID4gMCA/IDEgOiAwKTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vMmQvY2VsbHMvQ2VsbC5qcyIsIlxuaW1wb3J0IENlbGwgZnJvbSAnLi9DZWxsJztcblxuY29uc3QgQUxJVkUgPSAxLCBERUFEID0gMDtcblxuY29uc3QgcGFsZXR0ZSA9IFtcbiAgWzI1NSwyNTUsMjU1XSxcbiAgWzAsMCwwXVxuXTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZU9mTGlmZSBleHRlbmRzIENlbGxcbntcbiAgY29uc3RydWN0b3IoKVxuICB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmFsaXZlID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKTtcbiAgfVxuXG4gIHNoYWRlcigpXG4gIHtcbiAgICByZXR1cm4gcGFsZXR0ZVsgdGhpcy5hbGl2ZSBdO1xuICB9XG5cblxuICBldmFsdWF0ZSgpXG4gIHtcbiAgICByZXR1cm4gdGhpcy5hbGl2ZSA/IDEgOiAwO1xuICB9XG5cbiAgLy8gLy8gR2V0cyBvciBhc3NpZ25zIGEgJ3ZhbHVlJyB0byBmZWVkYmFjayBpbnRvIHRoZSBDZWxsICdpbnRlcmZhY2UnIGNvdW50aW5nIG1ldGhvZFxuICB2YWx1ZSh2KVxuICB7XG4gICAgaWYgKHYgPT09IHVuZGVmaW5lZCkgcmV0dXJuIHRoaXMuYWxpdmUgPyAxIDogMDtcbiAgICB0aGlzLmFsaXZlID0gKHYgPT0gMCkgPyBERUFEIDogQUxJVkU7XG4gIH1cblxuXG4gIG11dGF0ZShjZWxscylcbiAge1xuICAgIGxldCBuID0gdGhpcy5udW1MaXZlTmVpZ2hib3VycyhjZWxscyk7XG4gICAgbGV0IG1lID0gbmV3IEdhbWVPZkxpZmUoKTtcbiAgICBsZXQgbmV3U3RhdGUgPSBERUFEO1xuXG4gICAgaWYgKGNlbGxzLnN1YmplY3QuYWxpdmUgJiYgbiA8IDIpXG4gICAgICBuZXdTdGF0ZSA9IERFQUQ7XG4gICAgZWxzZSBpZiAoY2VsbHMuc3ViamVjdC5hbGl2ZSAmJiBuID4gMylcbiAgICAgIG5ld1N0YXRlID0gREVBRDtcbiAgICBlbHNlIGlmICghY2VsbHMuc3ViamVjdC5hbGl2ZSAmJiBuID09IDMpXG4gICAgICBuZXdTdGF0ZSA9IEFMSVZFO1xuICAgIGVsc2VcbiAgICAgIG5ld1N0YXRlID0gY2VsbHMuc3ViamVjdC52YWx1ZSgpO1xuXG4gICAgbWUudmFsdWUobmV3U3RhdGUpO1xuXG4gICAgcmV0dXJuIG1lO1xuICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLzJkL2NlbGxzL0dvTC5qcyIsIlxuaW1wb3J0IENlbGwgZnJvbSAnLi9DZWxsJztcblxuY29uc3QgTUFYX1ZBTFVFUyA9IDMyO1xuY29uc3QgUj0wLCBHPTEsIEI9Mjtcbi8vXG4vLyBjb25zdCBwYWxldHRlID0gW1xuLy8gICBbMTAsIDI1NSwgOTZdLFxuLy8gICBbMjU1LCAzMiwgMjU1XSxcbi8vICAgWzE3MiwgNTQsIDI1NV0sXG4vLyAgIFszMiwgMzIsIDI1NV0sXG4vLyAgIFszMiwgMjU1LCAyNTVdLFxuLy8gICBbMzIsIDMyLCAyNTVdLFxuLy8gICBbMjU1LCAyNTUsIDMyXVxuLy8gXTtcblxuLy8gbmljZSBjbG91ZHNcbi8vIGNvbnN0IHBhbGV0dGUgPSBbXG4vLyAgIFs1MywgMTc3LCAyNTVdLFxuLy8gICBbMjAwLCAyMDAsIDIxNV0sXG4vLyAgIFsyNTUsIDI1NSwgMjU1XVxuLy8gXTtcblxuLy8gZmlyZSBpc2hcbi8vIGNvbnN0IHBhbGV0dGUgPSBbXG4vLyAgIFsyNTUsIDAsIDBdLFxuLy8gICBbMjU1LCAyNTUsIDBdLFxuLy8gICBbMjU1LCAyNTUsIDIyMF1cbi8vIF07XG5cbmNvbnN0IHBhbGV0dGUgPSBbXG5bMjU1LDAsMCwxXSwgWzI1NSw5NiwwLDFdLCBbMjU1LDE5MSwwLDFdLCBbMjIzLDI1NSwwLDFdLFxuICBbMTI4LDI1NSwwLDFdLCBbMzIsMjU1LDAsMV0sIFswLDI1NSw2NCwxXSwgWzAsMjU1LDE1OSwxXSxcbiAgWzAsMjU1LDI1NSwxXSwgWzAsMTU5LDI1NSwxXSwgWzAsNjQsMjU1LDFdLCBbMzIsMCwyNTUsMV0sXG4gIFsxMjcsMCwyNTUsMV0sIFsyMjMsMCwyNTUsMV0sIFsyNTUsMCwxOTEsMV0sIFsyNTUsMCw5NiwxXV07XG5cbmNvbnN0IFJFRFMgPSBwYWxldHRlLm1hcCgoZSkgPT4geyByZXR1cm4gZVtSXSB9KTtcbmNvbnN0IEdSRUVOUyA9IHBhbGV0dGUubWFwKChlKSA9PiB7IHJldHVybiBlW0ddIH0pO1xuY29uc3QgQkxVRVMgPSBwYWxldHRlLm1hcCgoZSkgPT4geyByZXR1cm4gZVtCXSB9KTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmxvb2QgZXh0ZW5kcyBDZWxsXG57XG4gIGNvbnN0cnVjdG9yKClcbiAge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5zdGF0ZSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIE1BWF9WQUxVRVMpO1xuICB9XG5cbiAgc2hhZGVyKClcbiAge1xuICAgIGxldCBpID0gdGhpcy52YWx1ZSgpIC8gTUFYX1ZBTFVFUztcblxuICAgIGxldCBjPSAgW1xuICAgICAgdGhpcy5pbGluZXJwKFJFRFMsIGkpICYgMHhmZixcbiAgICAgIHRoaXMuaWxpbmVycChHUkVFTlMsIGkpICYgMHhmZiAsXG4gICAgICB0aGlzLmlsaW5lcnAoQkxVRVMsIGkpICYgMHhmZlxuICAgIF07XG5cbiAgICAvL2NvbnNvbGUubG9nKGMpO1xuICAgIHJldHVybiBjO1xuXG4gIH1cblxuICAvLyAvLyBHZXRzIG9yIGFzc2lnbnMgYSAndmFsdWUnIHRvIGZlZWRiYWNrIGludG8gdGhlIENlbGwgJ2ludGVyZmFjZScgY291bnRpbmcgbWV0aG9kXG4gIHZhbHVlKHYpXG4gIHtcbiAgICBpZiAodiA9PSB1bmRlZmluZWQpIHJldHVybiB0aGlzLnN0YXRlO1xuICAgIHRoaXMuc3RhdGUgPSB2O1xuICB9XG5cblxuICBtdXRhdGUoZW50aXR5KVxuICB7XG5cbiAgICBsZXQgbmV4dCA9ICh0aGlzLnZhbHVlKCkgKyAoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNSkpKSAlIE1BWF9WQUxVRVM7XG5cbiAgICBsZXQgY2hhbmdlID0gZmFsc2U7XG4gICAgZm9yIChsZXQgdD0wOyB0PGVudGl0eS5saW5lYXIubGVuZ3RoOyB0KyspXG4gICAge1xuICAgICAgaWYgKGVudGl0eS5saW5lYXJbdF0pXG4gICAgICAgIGNoYW5nZSA9IGNoYW5nZSB8fCBlbnRpdHkubGluZWFyW3RdLnZhbHVlKCkgPT09IG5leHQ7XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZSlcbiAgICAgIHRoaXMudmFsdWUobmV4dCk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIExpbmVhcmx5IGludGVycG9sYXRlcyBiZXR3ZWVuIGFuIGFycmF5IG9mIHZhbHVlc1xuICAvLyBlLmcuIHZhbHVlcyA9IFs1LCAxMCwgMV0sIHAgPSAwLi4xXG4gIGlsaW5lcnAodmFsdWVzLCBwb3NpdGlvbilcbiAge1xuICAgIGlmIChwb3NpdGlvbiA+PSAxKSByZXR1cm4gdmFsdWVzW3ZhbHVlcy5sZW5ndGgtMV07XG4gICAgaWYgKHBvc2l0aW9uIDwgMCkgcmV0dXJuIHZhbHVlc1swXTtcblxuICAgIGxldCBwID0gcG9zaXRpb24gKiAodmFsdWVzLmxlbmd0aCAtIDEpO1xuXG4gICAgbGV0IGkxID0gTWF0aC5mbG9vcihwKTtcbiAgICBsZXQgaTIgPSBpMSArIDE7XG4gICAgbGV0IHEgPSBwIC0gaTE7XG5cbiAgICBsZXQgdiA9ICh2YWx1ZXNbaTFdICogKDEtcSkpICsgKHZhbHVlc1tpMl0gKiAocSkpO1xuXG4gICAgcmV0dXJuIE1hdGgucm91bmQodik7XG4gIH1cblxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi8yZC9jZWxscy9GbG9vZC5qcyJdLCJzb3VyY2VSb290IjoiIn0=