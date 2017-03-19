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
	
	var _GoL = __webpack_require__(4);
	
	var _GoL2 = _interopRequireDefault(_GoL);
	
	var _Flood = __webpack_require__(6);
	
	var _Flood2 = _interopRequireDefault(_Flood);
	
	var _Burrow = __webpack_require__(7);
	
	var _Burrow2 = _interopRequireDefault(_Burrow);
	
	var _Blur = __webpack_require__(9);
	
	var _Blur2 = _interopRequireDefault(_Blur);
	
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
	  type: _Blur2.default
	});
	
	var renderer = new _Renderer2d2.default("content");
	renderer.scale = VIEW_SCALE;
	
	renderer.render(world.data);
	world.evolve();
	
	window.world = world;
	
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
	
	      this.prepare();
	
	      for (var y = 0; y < this.size; y++) {
	        for (var x = 0; x < this.size; x++) {
	          if (this.data[y][x]) next[y][x] = this.data[y][x].mutate(this.neighbourhood(x, y));
	        }
	      }
	
	      this.data = next;
	    }
	  }, {
	    key: "prepare",
	    value: function prepare() {
	      for (var y = 0; y < this.size; y++) {
	        for (var x = 0; x < this.size; x++) {
	          if (this.data[y][x]) this.data[y][x].prepare();
	        }
	      }
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
/* 4 */
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
	    key: "prepare",
	    value: function prepare() {}
	  }, {
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
	  }, {
	    key: "numNeighboursWithValue",
	    value: function numNeighboursWithValue(n, v) {
	      var num = 0;
	
	      for (var t = 0; t < n.linear.length; t++) {
	        if (n.linear[t]) if (n.linear[t].value() == v) num++;
	      }
	      return num;
	    }
	  }, {
	    key: "averageValueNeighbours",
	    value: function averageValueNeighbours(n) {
	      var sum = 0;
	      for (var t = 0; t < n.linear.length; t++) {
	        if (n.linear[t]) {
	          sum += n.linear[t].value();
	        }
	      }
	
	      sum -= n.subject.value();
	
	      return sum / (n.linear.length - 1);
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
	
	var _Util = __webpack_require__(8);
	
	var _Util2 = _interopRequireDefault(_Util);
	
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
	
	      return [_Util2.default.ilinerp(REDS, i) & 0xff, _Util2.default.ilinerp(GREENS, i) & 0xff, _Util2.default.ilinerp(BLUES, i) & 0xff];
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
	  }]);
	
	  return Flood;
	}(_Cell3.default);
	
	exports.default = Flood;

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
	
	var palette = [[255, 255, 255], [0, 0, 0]];
	
	var Burrow = function (_Cell) {
	  _inherits(Burrow, _Cell);
	
	  function Burrow() {
	    _classCallCheck(this, Burrow);
	
	    var _this = _possibleConstructorReturn(this, (Burrow.__proto__ || Object.getPrototypeOf(Burrow)).call(this));
	
	    _this.alive = Math.round(Math.random());
	    return _this;
	  }
	
	  _createClass(Burrow, [{
	    key: 'prepare',
	    value: function prepare() {}
	  }, {
	    key: 'shader',
	    value: function shader() {
	      return palette[this.alive];
	    }
	
	    // // Gets or assigns a 'value' to feedback into the Cell 'interface' counting method
	
	  }, {
	    key: 'value',
	    value: function value(v) {}
	  }, {
	    key: 'mutate',
	    value: function mutate(cells) {}
	  }]);
	
	  return Burrow;
	}(_Cell3.default);
	
	exports.default = Burrow;

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Util = function () {
	  function Util() {
	    _classCallCheck(this, Util);
	  }
	
	  // Linearly interpolates between an array of values
	  // e.g. values = [5, 10, 1], p = 0..1
	
	  _createClass(Util, [{
	    key: "ilinerp",
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
	
	  return Util;
	}();
	
	exports.default = new Util();

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Cell2 = __webpack_require__(5);
	
	var _Cell3 = _interopRequireDefault(_Cell2);
	
	var _Util = __webpack_require__(8);
	
	var _Util2 = _interopRequireDefault(_Util);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var MAX_VALUES = 32;
	var R = 0,
	    G = 1,
	    B = 2;
	var palette = [[0, 0, 0, 1], [255, 0, 0, 0], [255, 96, 0, 1], [255, 191, 0, 1], [223, 255, 0, 1], [128, 255, 0, 1], [32, 255, 0, 1], [0, 255, 64, 1], [0, 255, 159, 1], [0, 255, 255, 1], [0, 159, 255, 1], [0, 64, 255, 1], [32, 0, 255, 1], [127, 0, 255, 1], [223, 0, 255, 1], [255, 0, 191, 1], [255, 0, 96, 1]];
	
	var REDS = palette.map(function (e) {
	  return e[R];
	});
	var GREENS = palette.map(function (e) {
	  return e[G];
	});
	var BLUES = palette.map(function (e) {
	  return e[B];
	});
	
	var Blur = function (_Cell) {
	  _inherits(Blur, _Cell);
	
	  function Blur() {
	    _classCallCheck(this, Blur);
	
	    var _this = _possibleConstructorReturn(this, (Blur.__proto__ || Object.getPrototypeOf(Blur)).call(this));
	
	    _this.state = Math.floor(Math.random() * MAX_VALUES);
	    return _this;
	  }
	
	  _createClass(Blur, [{
	    key: 'prepare',
	    value: function prepare() {}
	  }, {
	    key: 'shader',
	    value: function shader() {
	      var i = this.state / MAX_VALUES;
	      return [_Util2.default.ilinerp(REDS, i) & 0xff, _Util2.default.ilinerp(GREENS, i) & 0xff, _Util2.default.ilinerp(BLUES, i) & 0xff];
	    }
	
	    // // Gets or assigns a 'value' to feedback into the Cell 'interface' counting method
	
	  }, {
	    key: 'value',
	    value: function value(v) {
	      if (v == undefined) return this.state;
	      if (v < 0) v += MAX_VALUES;
	      this.state = Math.round(v);
	    }
	  }, {
	    key: 'mutate',
	    value: function mutate(entity) {
	      // if (entity.cells[0][1].value() > this.value())
	      // {
	      //   let t = this.value();
	      //   this.value(entity.cells[0][1].value());
	      //   entity.cells[0][1].value(t);
	      // } else {
	      //   let t = this.value();
	      //   this.value(entity.cells[1][2].value());
	      //   entity.cells[1][2].value(t);
	      // }
	      var av = this.averageValueNeighbours(entity);
	      this.value(av);
	
	      // if (this.numNeighboursWithValue(entity, 0) >= 2)
	      // {
	      //   this.value(MAX_VALUES-1);
	      // }
	
	      //let av = this.averageValueNeighbours(entity) * 1.0;
	
	
	      if (Math.random() < 0.01) this.value(0);
	      return this;
	    }
	  }]);
	
	  return Blur;
	}(_Cell3.default);
	
	exports.default = Blur;

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDAyMmJlMWQ2YTBhOGFlOWZiNGEiLCJ3ZWJwYWNrOi8vLy4vMmQvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi8yZC9jb3JlL1dvcmxkLmpzIiwid2VicGFjazovLy8uLzJkL2NvcmUvUmVuZGVyZXIyZC5qcyIsIndlYnBhY2s6Ly8vLi9zaGFyZWQvQ2FudmFzMmQuanMiLCJ3ZWJwYWNrOi8vLy4vMmQvY2VsbHMvR29MLmpzIiwid2VicGFjazovLy8uLzJkL2NlbGxzL0NlbGwuanMiLCJ3ZWJwYWNrOi8vLy4vMmQvY2VsbHMvRmxvb2QuanMiLCJ3ZWJwYWNrOi8vLy4vMmQvY2VsbHMvQnVycm93LmpzIiwid2VicGFjazovLy8uLzJkL2NlbGxzL1V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vMmQvY2VsbHMvQmx1ci5qcyJdLCJuYW1lcyI6WyJTSVpFIiwiVklFV19TQ0FMRSIsIldPUkxEX0ZSQU1FX1JBVEUiLCJmcHNUZXh0IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImxhc3RUaW1lIiwiZnJhbWVzIiwiYXZGcmFtZXMiLCJ3b3JsZCIsInNpemUiLCJzcHJlYWQiLCJ0eXBlIiwicmVuZGVyZXIiLCJzY2FsZSIsInJlbmRlciIsImRhdGEiLCJldm9sdmUiLCJ3aW5kb3ciLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJzZXRJbnRlcnZhbCIsInRpbWVOb3ciLCJwZXJmb3JtYW5jZSIsIm5vdyIsInRpbWVUYWtlbiIsImlubmVySFRNTCIsInRvRml4ZWQiLCJXb3JsZCIsIm9wdGlvbnMiLCJpbml0IiwiQ2VsbFR5cGUiLCJhcnJheTJkIiwiaSIsInkiLCJ4IiwiTWF0aCIsInJhbmRvbSIsInIiLCJyYWRpdXMiLCJudW0iLCJ2eCIsInZ5IiwibiIsImwiLCJpeSIsIml4Iiwid3JhcCIsInB1c2giLCJjZWxscyIsImxpbmVhciIsInN1YmplY3QiLCJ2IiwiZCIsImxlbmd0aCIsIm5leHQiLCJwcmVwYXJlIiwibXV0YXRlIiwibmVpZ2hib3VyaG9vZCIsIlJlbmRlcmVyMmQiLCJlbGVtZW50IiwiY2FudmFzMmQiLCJ3IiwiaCIsInJlc2l6ZSIsImNsZWFyIiwiY29sIiwic2hhZGVyIiwiYmxvY2siLCJDYW52YXMyZCIsInBhcmVudCIsImNyZWF0ZUVsZW1lbnQiLCJhcHBlbmRDaGlsZCIsImNvbnRleHQiLCJnZXRDb250ZXh0IiwiYyIsInQiLCJiZWdpblBhdGgiLCJyZWN0IiwiZmlsbFN0eWxlIiwiZmlsbCIsInN4Iiwic3kiLCJzdyIsInNoIiwiZHgiLCJkeSIsImR3IiwiZGgiLCJkcmF3SW1hZ2UiLCJjYW52YXMiLCJ3aWR0aCIsImhlaWdodCIsImNsaWVudFdpZHRoIiwiY2xpZW50SGVpZ2h0IiwiQUxJVkUiLCJERUFEIiwicGFsZXR0ZSIsIkdhbWVPZkxpZmUiLCJhbGl2ZSIsInJvdW5kIiwidW5kZWZpbmVkIiwibnVtTGl2ZU5laWdoYm91cnMiLCJtZSIsIm5ld1N0YXRlIiwidmFsdWUiLCJDZWxsIiwibmVpZ2hib3VycyIsInN1bSIsIk1BWF9WQUxVRVMiLCJSIiwiRyIsIkIiLCJSRURTIiwibWFwIiwiZSIsIkdSRUVOUyIsIkJMVUVTIiwiRmxvb2QiLCJzdGF0ZSIsImZsb29yIiwiaWxpbmVycCIsImVudGl0eSIsImNoYW5nZSIsIkJ1cnJvdyIsIlV0aWwiLCJ2YWx1ZXMiLCJwb3NpdGlvbiIsInAiLCJpMSIsImkyIiwicSIsIkJsdXIiLCJhdiIsImF2ZXJhZ2VWYWx1ZU5laWdoYm91cnMiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7QUNwQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7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WUFBS1UsS0FBTCxHQUFhbkYsS0FBS2dFLEtBQUwsQ0FBV2hELENBQVgsQ0FBYjtBQUNEOzs7NEJBR01zRSxNLEVBQ1A7QUFDRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQUlXLEtBQUssS0FBS0Msc0JBQUwsQ0FBNEJaLE1BQTVCLENBQVQ7QUFDQSxZQUFLakIsS0FBTCxDQUFXNEIsRUFBWDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0EsV0FBSWpHLEtBQUtDLE1BQUwsS0FBZ0IsSUFBcEIsRUFBMEIsS0FBS29FLEtBQUwsQ0FBWSxDQUFaO0FBQzFCLGNBQU8sSUFBUDtBQUNEOzs7Ozs7bUJBM0RrQjJCLEkiLCJmaWxlIjoiMmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMDAyMmJlMWQ2YTBhOGFlOWZiNGEiLCJcblxuaW1wb3J0IFdvcmxkICAgICAgICBmcm9tICcuL2NvcmUvV29ybGQuanMnO1xuaW1wb3J0IFJlbmRlcmVyICAgICBmcm9tICcuL2NvcmUvUmVuZGVyZXIyZCc7XG5pbXBvcnQgR2FtZU9mTGlmZSAgIGZyb20gJy4vY2VsbHMvR29MJztcbmltcG9ydCBGbG9vZCAgICAgICAgZnJvbSAnLi9jZWxscy9GbG9vZCc7XG5pbXBvcnQgQnVycm93ICAgICAgIGZyb20gJy4vY2VsbHMvQnVycm93JztcbmltcG9ydCBCbHVyICAgICAgICAgZnJvbSAnLi9jZWxscy9CbHVyJztcblxuY29uc3QgU0laRSA9IDc1OyAvLyBjZWxsc1xuY29uc3QgVklFV19TQ0FMRSA9IDg7XG5jb25zdCBXT1JMRF9GUkFNRV9SQVRFID0gMzA7XG5cbmxldCBmcHNUZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmcHNcIik7XG5cbmxldCBsYXN0VGltZSA9IDAsIGZyYW1lcyA9IDAsIGF2RnJhbWVzID0gMDtcblxubGV0IHdvcmxkID0gbmV3IFdvcmxkKHtcbiAgc2l6ZTogU0laRSxcbiAgc3ByZWFkOiAxLjAsXG4gIHR5cGU6IEJsdXJcbn0pO1xuXG5sZXQgcmVuZGVyZXIgPSBuZXcgUmVuZGVyZXIoXCJjb250ZW50XCIpO1xucmVuZGVyZXIuc2NhbGUgPSBWSUVXX1NDQUxFO1xuXG5yZW5kZXJlci5yZW5kZXIod29ybGQuZGF0YSk7XG53b3JsZC5ldm9sdmUoKTtcblxud2luZG93LndvcmxkID0gd29ybGQ7XG5cbndpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKTtcbndpbmRvdy5zZXRJbnRlcnZhbCgoKSA9PiB7IHdvcmxkLmV2b2x2ZSgpIH0sIDEwMDAgLyBXT1JMRF9GUkFNRV9SQVRFKTtcblxuZnVuY3Rpb24gcmVuZGVyKClcbntcbiAgbGV0IHRpbWVOb3cgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgbGV0IHRpbWVUYWtlbiA9IHRpbWVOb3cgLSBsYXN0VGltZTtcblxuICBhdkZyYW1lcyArPSAgMTAwMCAvIHRpbWVUYWtlbjtcbiAgbGFzdFRpbWUgPSB0aW1lTm93O1xuXG4gIGlmIChmcmFtZXMrKyA9PSAxMClcbiAge1xuICAgIGZwc1RleHQuaW5uZXJIVE1MID0gKGF2RnJhbWVzIC8gMTApLnRvRml4ZWQoMSkgKyBcIiBGUFNcIjtcbiAgICBmcmFtZXMgPSAwO1xuICAgIGF2RnJhbWVzID0gMDtcbiAgfVxuXG4gIHJlbmRlcmVyLnJlbmRlcih3b3JsZC5kYXRhKTtcbiAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vMmQvbWFpbi5qcyIsIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXb3JsZFxue1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKVxuICB7XG5cbiAgICB0aGlzLnNpemUgPSBvcHRpb25zLnNpemU7IC8vY2VsbHMsIHNxdWFyZVxuICAgIHRoaXMuZGF0YSA9IG51bGw7XG5cbiAgICB0aGlzLmluaXQob3B0aW9ucy50eXBlLCBvcHRpb25zLnNwcmVhZCk7XG4gIH1cblxuICBpbml0KENlbGxUeXBlLCBzcHJlYWQpXG4gIHtcbiAgICAvLyBDcmVhdGUgdGhlIGFycmF5OlxuICAgIHRoaXMuZGF0YSA9IHRoaXMuYXJyYXkyZCh0aGlzLnNpemUpO1xuICAgIGxldCBpID0gMDtcblxuICAgIGZvciAobGV0IHk9MDsgeTx0aGlzLnNpemU7IHkrKylcbiAgICAgIGZvciAobGV0IHg9MDsgeDx0aGlzLnNpemU7IHgrKylcbiAgICAgICAgaWYgKE1hdGgucmFuZG9tKCkgPD0gc3ByZWFkKVxuICAgICAgICAgIHRoaXMuZGF0YVt5XVt4XSA9IG5ldyBDZWxsVHlwZSgpO1xuICB9XG5cbiAgbmVpZ2hib3VyaG9vZCh4LCB5LCByKVxuICB7XG4gICAgbGV0IHJhZGl1cyA9IHIgfHwgMTtcbiAgICBsZXQgbnVtID0gKHJhZGl1cyAqIDIpICsgMTtcblxuICAgIGxldCB2eCA9IHggLSByYWRpdXM7XG4gICAgbGV0IHZ5ID0geSAtIHJhZGl1cztcblxuICAgIGxldCBuID0gdGhpcy5hcnJheTJkKG51bSk7XG4gICAgbGV0IGwgPSBbXTtcblxuICAgIGZvciAobGV0IGl5PTA7IGl5PG51bTsgaXkrKylcbiAgICB7XG4gICAgICB2eCA9IHggLSByYWRpdXM7XG4gICAgICBmb3IgKGxldCBpeD0wOyBpeDxudW07IGl4KyspXG4gICAgICB7XG4gICAgICAgIG5baXldW2l4XSA9IHRoaXMuZGF0YVt0aGlzLndyYXAodnkpXVt0aGlzLndyYXAodngpXTtcbiAgICAgICAgbC5wdXNoKHRoaXMuZGF0YVt0aGlzLndyYXAodnkpXVt0aGlzLndyYXAodngpXSk7XG4gICAgICAgIHZ4Kys7XG4gICAgICB9XG4gICAgICB2eSsrO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBjZWxsczogbixcbiAgICAgIGxpbmVhcjogbCxcbiAgICAgIHJhZGl1czogcmFkaXVzLFxuICAgICAgc3ViamVjdDogdGhpcy5kYXRhW3ldW3hdXG4gICAgfVxuICB9XG5cbiAgd3JhcCh2KVxuICB7XG4gICAgaWYgKCB2IDwgMCApIHJldHVybiB2ICsgdGhpcy5zaXplO1xuICAgIGlmICggdiA+IHRoaXMuc2l6ZS0xKSByZXR1cm4gdiAtIHRoaXMuc2l6ZTtcbiAgICByZXR1cm4gdjtcbiAgfVxuXG4gIGFycmF5MmQoc2l6ZSlcbiAge1xuICAgIGZvciAodmFyIGQ9W107IGQubGVuZ3RoIDwgc2l6ZTsgZC5wdXNoKFtdKSk7XG4gICAgcmV0dXJuIGQ7XG4gIH1cblxuICBldm9sdmUoKVxuICB7XG4gICAgbGV0IG5leHQgPSB0aGlzLmFycmF5MmQodGhpcy5zaXplKTtcblxuICAgIHRoaXMucHJlcGFyZSgpO1xuXG4gICAgZm9yIChsZXQgeT0wOyB5PHRoaXMuc2l6ZTsgeSsrKVxuICAgIHtcbiAgICAgIGZvciAobGV0IHg9MDsgeDx0aGlzLnNpemU7IHgrKylcbiAgICAgIHtcbiAgICAgICAgaWYgKHRoaXMuZGF0YVt5XVt4XSlcbiAgICAgICAgICBuZXh0W3ldW3hdID0gdGhpcy5kYXRhW3ldW3hdLm11dGF0ZSh0aGlzLm5laWdoYm91cmhvb2QoeCx5KSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5kYXRhID0gbmV4dDtcbiAgfVxuXG5cbiAgcHJlcGFyZSgpXG4gIHtcbiAgICBmb3IgKGxldCB5PTA7IHk8dGhpcy5zaXplOyB5KyspXG4gICAgICBmb3IgKGxldCB4PTA7IHg8dGhpcy5zaXplOyB4KyspXG4gICAgICAgIGlmICh0aGlzLmRhdGFbeV1beF0pIHRoaXMuZGF0YVt5XVt4XS5wcmVwYXJlKCk7XG4gIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vMmQvY29yZS9Xb3JsZC5qcyIsIlxuaW1wb3J0IENhbnZhczJkIGZyb20gJy4uLy4uL3NoYXJlZC9DYW52YXMyZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlbmRlcmVyMmRcbntcbiAgY29uc3RydWN0b3IoZWxlbWVudClcbiAge1xuICAgIHRoaXMuY2FudmFzMmQgPSBuZXcgQ2FudmFzMmQoZWxlbWVudCk7XG4gICAgdGhpcy5zY2FsZSA9IDE7XG4gICAgdGhpcy5zaXplID0gMTtcbiAgfVxuXG4gIHJlc2l6ZSh3LCBoKVxuICB7XG4gICAgdGhpcy5jYW52YXMyZC5yZXNpemUodywgaCk7XG4gICAgdGhpcy5jYW52YXMyZC5jbGVhcigpO1xuICB9XG5cbiAgcmVuZGVyKGRhdGEpXG4gIHtcblxuICAgIGlmIChkYXRhLmxlbmd0aCAhPSB0aGlzLnNpemUpXG4gICAge1xuICAgICAgdGhpcy5zaXplID0gZGF0YS5sZW5ndGg7XG4gICAgICB0aGlzLnJlc2l6ZSh0aGlzLnNpemUgKiB0aGlzLnNjYWxlLCB0aGlzLnNpemUgKiB0aGlzLnNjYWxlKTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCB5PTA7IHk8dGhpcy5zaXplOyB5KyspXG4gICAge1xuICAgICAgZm9yIChsZXQgeD0wOyB4PHRoaXMuc2l6ZTsgeCsrKVxuICAgICAge1xuICAgICAgICBpZiAoZGF0YVt5XVt4XSlcbiAgICAgICAge1xuICAgICAgICAgIGxldCBjb2wgPSBkYXRhW3ldW3hdLnNoYWRlcigpO1xuICAgICAgICAvL2xldCBjb2wgPSBkYXRhW3ldW3hdID8gWzAsMCwwXSA6IFsyNTUsMjU1LDI1NV07XG4gICAgICAgICAgdGhpcy5jYW52YXMyZC5ibG9jayh5ICogdGhpcy5zY2FsZSwgeCAqIHRoaXMuc2NhbGUsIHRoaXMuc2NhbGUsIHRoaXMuc2NhbGUsIGNvbCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi8yZC9jb3JlL1JlbmRlcmVyMmQuanMiLCJcblxuLy8gQm9pbGVycGxhdGUgZnVuY3Rpb25zIHRvIHdyaXRlIHRvIHRoZSBDYW52YXNcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FudmFzMmRcbntcbiAgY29uc3RydWN0b3IocGFyZW50KVxuICB7XG4gICAgdGhpcy5wYXJlbnQgPSB0eXBlb2YgcGFyZW50ID09ICdzdHJpbmcnID8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGFyZW50KSA6IHBhcmVudDtcbiAgICB0aGlzLmVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgIHRoaXMucGFyZW50LmFwcGVuZENoaWxkKHRoaXMuZWxlbWVudCk7XG4gICAgdGhpcy5jb250ZXh0ID0gdGhpcy5lbGVtZW50LmdldENvbnRleHQoXCIyZFwiKTtcbiAgICB0aGlzLmNsZWFyKCk7XG5cbiAgfVxuXG4gIGJsb2NrKHgseSx3LGgsYylcbiAge1xuICAgIGxldCB0ID0gdGhpcy5jb250ZXh0O1xuICAgIHQuYmVnaW5QYXRoKCk7XG4gICAgdC5yZWN0KHgsIHksIHcsIGgpO1xuICAgIHQuZmlsbFN0eWxlID0gYyA/IGByZ2IoJHtjWzBdfSwke2NbMV19LCR7Y1syXX0pYCA6IFwiYmxhY2tcIjtcbiAgICB0LmZpbGwoKTtcbiAgfVxuXG4gIHNlbGZibGl0KHN4LCBzeSwgc3csIHNoLCBkeCwgZHksIGR3LCBkaClcbiAge1xuICAgIHRoaXMuY29udGV4dC5kcmF3SW1hZ2UodGhpcy5jb250ZXh0LmNhbnZhcywgc3gsIHN5LCBzdywgc2gsIGR4LCBkeSwgZHcsIGRoKTtcbiAgfVxuXG4gIGNsZWFyKGMpXG4gIHtcbiAgICBsZXQgdCA9IHRoaXMuY29udGV4dDtcbiAgICB0LmJlZ2luUGF0aCgpO1xuICAgIHQucmVjdCgwLCAwLCB0aGlzLmVsZW1lbnQud2lkdGgsIHRoaXMuZWxlbWVudC5oZWlnaHQpO1xuICAgIHQuZmlsbFN0eWxlID0gYyA/IGByZ2IoJHtjWzBdfSwke2NbMV19LCR7Y1syXX0pYCA6IFwid2hpdGVcIjtcbiAgICB0LmZpbGwoKTtcbiAgfVxuXG4gIHdpZHRoKClcbiAge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnQud2lkdGg7XG4gIH1cblxuICBoZWlnaHQoKVxuICB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudC5oZWlnaHQ7XG4gIH1cblxuICBmaXR3aW5kb3coKVxuICB7XG4gICAgdGhpcy5yZXNpemUodGhpcy5wYXJlbnQuY2xpZW50V2lkdGgsIHRoaXMucGFyZW50LmNsaWVudEhlaWdodCk7XG4gIH1cblxuICByZXNpemUodywgaClcbiAge1xuXG4gICAgdGhpcy5lbGVtZW50LndpZHRoID0gdztcbiAgICB0aGlzLmVsZW1lbnQuaGVpZ2h0ID0gaDtcblxuICAgIC8vIGRyYXcoKVxuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zaGFyZWQvQ2FudmFzMmQuanMiLCJcbmltcG9ydCBDZWxsIGZyb20gJy4vQ2VsbCc7XG5cbmNvbnN0IEFMSVZFID0gMSwgREVBRCA9IDA7XG5cbmNvbnN0IHBhbGV0dGUgPSBbXG4gIFsyNTUsMjU1LDI1NV0sXG4gIFswLDAsMF1cbl07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVPZkxpZmUgZXh0ZW5kcyBDZWxsXG57XG4gIGNvbnN0cnVjdG9yKClcbiAge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5hbGl2ZSA9IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSk7XG4gIH1cblxuICBzaGFkZXIoKVxuICB7XG4gICAgcmV0dXJuIHBhbGV0dGVbIHRoaXMuYWxpdmUgXTtcbiAgfVxuXG5cbiAgZXZhbHVhdGUoKVxuICB7XG4gICAgcmV0dXJuIHRoaXMuYWxpdmUgPyAxIDogMDtcbiAgfVxuXG4gIC8vIC8vIEdldHMgb3IgYXNzaWducyBhICd2YWx1ZScgdG8gZmVlZGJhY2sgaW50byB0aGUgQ2VsbCAnaW50ZXJmYWNlJyBjb3VudGluZyBtZXRob2RcbiAgdmFsdWUodilcbiAge1xuICAgIGlmICh2ID09PSB1bmRlZmluZWQpIHJldHVybiB0aGlzLmFsaXZlID8gMSA6IDA7XG4gICAgdGhpcy5hbGl2ZSA9ICh2ID09IDApID8gREVBRCA6IEFMSVZFO1xuICB9XG5cblxuICBtdXRhdGUoY2VsbHMpXG4gIHtcbiAgICBsZXQgbiA9IHRoaXMubnVtTGl2ZU5laWdoYm91cnMoY2VsbHMpO1xuICAgIGxldCBtZSA9IG5ldyBHYW1lT2ZMaWZlKCk7XG4gICAgbGV0IG5ld1N0YXRlID0gREVBRDtcblxuICAgIGlmIChjZWxscy5zdWJqZWN0LmFsaXZlICYmIG4gPCAyKVxuICAgICAgbmV3U3RhdGUgPSBERUFEO1xuICAgIGVsc2UgaWYgKGNlbGxzLnN1YmplY3QuYWxpdmUgJiYgbiA+IDMpXG4gICAgICBuZXdTdGF0ZSA9IERFQUQ7XG4gICAgZWxzZSBpZiAoIWNlbGxzLnN1YmplY3QuYWxpdmUgJiYgbiA9PSAzKVxuICAgICAgbmV3U3RhdGUgPSBBTElWRTtcbiAgICBlbHNlXG4gICAgICBuZXdTdGF0ZSA9IGNlbGxzLnN1YmplY3QudmFsdWUoKTtcblxuICAgIG1lLnZhbHVlKG5ld1N0YXRlKTtcblxuICAgIHJldHVybiBtZTtcbiAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi8yZC9jZWxscy9Hb0wuanMiLCJcbi8vIFRoaXMgaXMgdGhlIGJhc2UgdHlwZSBvZiBDZWxsIHVzZWQgZm9yIGV2ZXJ5IENBIHR5cGUuXG4vLyBJdCdzIG1vcmUgb2YgYSBjbGFzc2ljYWwgXCJJbnRlcmZhY2VcIiB0aGFuIGEgY2xhc3MgSSBzdXBwb3NlXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENlbGxcbntcbiAgY29uc3RydWN0b3IoKVxuICB7XG5cbiAgfVxuXG4gIHByZXBhcmUoKVxuICB7XG5cbiAgfVxuXG4gIG11dGF0ZShuZWlnaGJvdXJzKVxuICB7XG5cbiAgfVxuXG4gIHNoYWRlcigpXG4gIHtcblxuICB9XG5cblxuICB2YWx1ZSgpXG4gIHtcblxuICB9XG5cbiAgbnVtTGl2ZU5laWdoYm91cnMobilcbiAge1xuICAgIGxldCBudW0gPSAwO1xuXG4gICAgZm9yIChsZXQgeSA9IDA7IHk8bi5jZWxscy5sZW5ndGg7IHkrKylcbiAgICAgIGZvciAobGV0IHggPSAwOyB4PG4uY2VsbHNbeV0ubGVuZ3RoOyB4KyspXG4gICAgICAgIGlmIChuLmNlbGxzW3ldW3hdKSBpZiAobi5jZWxsc1t5XVt4XS52YWx1ZSgpID4gMCkgbnVtICsrO1xuXG4gICAgLy8gZG9uJ3QgaW5jbHVkZSAndXMnIGluIHRoZSBjb3VudCFcbiAgICByZXR1cm4gbnVtIC0gKG4uc3ViamVjdC52YWx1ZSgpID4gMCA/IDEgOiAwKTtcbiAgfVxuXG4gIG51bU5laWdoYm91cnNXaXRoVmFsdWUobiwgdilcbiAge1xuICAgIGxldCBudW0gPSAwO1xuXG4gICAgZm9yIChsZXQgdD0wOyB0PG4ubGluZWFyLmxlbmd0aDsgdCsrKVxuICAgIHtcbiAgICAgIGlmIChuLmxpbmVhclt0XSlcbiAgICAgICAgaWYgKG4ubGluZWFyW3RdLnZhbHVlKCkgPT0gdikgbnVtKys7XG4gICAgfVxuICAgIHJldHVybiBudW07XG4gIH1cblxuICBhdmVyYWdlVmFsdWVOZWlnaGJvdXJzKG4pXG4gIHtcbiAgICBsZXQgc3VtID0gMDtcbiAgICBmb3IgKGxldCB0PTA7IHQ8bi5saW5lYXIubGVuZ3RoOyB0KyspXG4gICAge1xuICAgICAgaWYgKG4ubGluZWFyW3RdKVxuICAgICAge1xuICAgICAgICBzdW0gKz0gbi5saW5lYXJbdF0udmFsdWUoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzdW0gLT0gbi5zdWJqZWN0LnZhbHVlKCk7XG5cbiAgICByZXR1cm4gc3VtIC8gKG4ubGluZWFyLmxlbmd0aC0xKTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vMmQvY2VsbHMvQ2VsbC5qcyIsIlxuaW1wb3J0IENlbGwgZnJvbSAnLi9DZWxsJztcbmltcG9ydCBVdGlsIGZyb20gJy4vVXRpbCc7XG5cbmNvbnN0IE1BWF9WQUxVRVMgPSAzMjtcbmNvbnN0IFI9MCwgRz0xLCBCPTI7XG4vL1xuLy8gY29uc3QgcGFsZXR0ZSA9IFtcbi8vICAgWzEwLCAyNTUsIDk2XSxcbi8vICAgWzI1NSwgMzIsIDI1NV0sXG4vLyAgIFsxNzIsIDU0LCAyNTVdLFxuLy8gICBbMzIsIDMyLCAyNTVdLFxuLy8gICBbMzIsIDI1NSwgMjU1XSxcbi8vICAgWzMyLCAzMiwgMjU1XSxcbi8vICAgWzI1NSwgMjU1LCAzMl1cbi8vIF07XG5cbi8vIG5pY2UgY2xvdWRzXG4vLyBjb25zdCBwYWxldHRlID0gW1xuLy8gICBbNTMsIDE3NywgMjU1XSxcbi8vICAgWzIwMCwgMjAwLCAyMTVdLFxuLy8gICBbMjU1LCAyNTUsIDI1NV1cbi8vIF07XG5cbi8vIGZpcmUgaXNoXG4vLyBjb25zdCBwYWxldHRlID0gW1xuLy8gICBbMjU1LCAwLCAwXSxcbi8vICAgWzI1NSwgMjU1LCAwXSxcbi8vICAgWzI1NSwgMjU1LCAyMjBdXG4vLyBdO1xuXG5jb25zdCBwYWxldHRlID0gW1xuICBbMjU1LDAsMCwxXSwgWzI1NSw5NiwwLDFdLCBbMjU1LDE5MSwwLDFdLCBbMjIzLDI1NSwwLDFdLFxuICBbMTI4LDI1NSwwLDFdLCBbMzIsMjU1LDAsMV0sIFswLDI1NSw2NCwxXSwgWzAsMjU1LDE1OSwxXSxcbiAgWzAsMjU1LDI1NSwxXSwgWzAsMTU5LDI1NSwxXSwgWzAsNjQsMjU1LDFdLCBbMzIsMCwyNTUsMV0sXG4gIFsxMjcsMCwyNTUsMV0sIFsyMjMsMCwyNTUsMV0sIFsyNTUsMCwxOTEsMV0sIFsyNTUsMCw5NiwxXVxuXTtcblxuY29uc3QgUkVEUyA9IHBhbGV0dGUubWFwKChlKSA9PiB7IHJldHVybiBlW1JdIH0pO1xuY29uc3QgR1JFRU5TID0gcGFsZXR0ZS5tYXAoKGUpID0+IHsgcmV0dXJuIGVbR10gfSk7XG5jb25zdCBCTFVFUyA9IHBhbGV0dGUubWFwKChlKSA9PiB7IHJldHVybiBlW0JdIH0pO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGbG9vZCBleHRlbmRzIENlbGxcbntcbiAgY29uc3RydWN0b3IoKVxuICB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnN0YXRlID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogTUFYX1ZBTFVFUyk7XG4gIH1cblxuICBzaGFkZXIoKVxuICB7XG4gICAgbGV0IGkgPSB0aGlzLnZhbHVlKCkgLyBNQVhfVkFMVUVTO1xuXG4gICAgcmV0dXJuIFtcbiAgICAgIFV0aWwuaWxpbmVycChSRURTLCBpKSAmIDB4ZmYsXG4gICAgICBVdGlsLmlsaW5lcnAoR1JFRU5TLCBpKSAmIDB4ZmYsXG4gICAgICBVdGlsLmlsaW5lcnAoQkxVRVMsIGkpICYgMHhmZlxuICAgIF07XG5cbiAgfVxuXG4gIC8vIC8vIEdldHMgb3IgYXNzaWducyBhICd2YWx1ZScgdG8gZmVlZGJhY2sgaW50byB0aGUgQ2VsbCAnaW50ZXJmYWNlJyBjb3VudGluZyBtZXRob2RcbiAgdmFsdWUodilcbiAge1xuICAgIGlmICh2ID09IHVuZGVmaW5lZCkgcmV0dXJuIHRoaXMuc3RhdGU7XG4gICAgdGhpcy5zdGF0ZSA9IHY7XG4gIH1cblxuXG4gIG11dGF0ZShlbnRpdHkpXG4gIHtcblxuICAgIGxldCBuZXh0ID0gKHRoaXMudmFsdWUoKSArIChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA1KSkpICUgTUFYX1ZBTFVFUztcblxuICAgIGxldCBjaGFuZ2UgPSBmYWxzZTtcbiAgICBmb3IgKGxldCB0PTA7IHQ8ZW50aXR5LmxpbmVhci5sZW5ndGg7IHQrKylcbiAgICB7XG4gICAgICBpZiAoZW50aXR5LmxpbmVhclt0XSlcbiAgICAgICAgY2hhbmdlID0gY2hhbmdlIHx8IGVudGl0eS5saW5lYXJbdF0udmFsdWUoKSA9PT0gbmV4dDtcbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlKVxuICAgICAgdGhpcy52YWx1ZShuZXh0KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cblxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi8yZC9jZWxscy9GbG9vZC5qcyIsIlxuaW1wb3J0IENlbGwgZnJvbSAnLi9DZWxsJztcblxuXG5jb25zdCBwYWxldHRlID0gW1xuICBbMjU1LDI1NSwyNTVdLFxuICBbMCwwLDBdXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdXJyb3cgZXh0ZW5kcyBDZWxsXG57XG4gIGNvbnN0cnVjdG9yKClcbiAge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5hbGl2ZSA9IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSk7XG4gIH1cblxuICBwcmVwYXJlKClcbiAge1xuXG4gIH1cblxuICBzaGFkZXIoKVxuICB7XG4gICAgcmV0dXJuIHBhbGV0dGVbIHRoaXMuYWxpdmUgXTtcbiAgfVxuXG5cbiAgLy8gLy8gR2V0cyBvciBhc3NpZ25zIGEgJ3ZhbHVlJyB0byBmZWVkYmFjayBpbnRvIHRoZSBDZWxsICdpbnRlcmZhY2UnIGNvdW50aW5nIG1ldGhvZFxuICB2YWx1ZSh2KVxuICB7XG4gIH1cblxuXG4gIG11dGF0ZShjZWxscylcbiAge1xuXG4gIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vMmQvY2VsbHMvQnVycm93LmpzIiwiXG5cbmNsYXNzIFV0aWxcbntcbiAgY29uc3RydWN0b3IoKVxuICB7XG5cbiAgfVxuXG4gIC8vIExpbmVhcmx5IGludGVycG9sYXRlcyBiZXR3ZWVuIGFuIGFycmF5IG9mIHZhbHVlc1xuICAvLyBlLmcuIHZhbHVlcyA9IFs1LCAxMCwgMV0sIHAgPSAwLi4xXG5cbiAgaWxpbmVycCh2YWx1ZXMsIHBvc2l0aW9uKVxuICB7XG4gICAgaWYgKHBvc2l0aW9uID49IDEpIHJldHVybiB2YWx1ZXNbdmFsdWVzLmxlbmd0aC0xXTtcbiAgICBpZiAocG9zaXRpb24gPCAwKSByZXR1cm4gdmFsdWVzWzBdO1xuXG4gICAgbGV0IHAgPSBwb3NpdGlvbiAqICh2YWx1ZXMubGVuZ3RoIC0gMSk7XG5cbiAgICBsZXQgaTEgPSBNYXRoLmZsb29yKHApO1xuICAgIGxldCBpMiA9IGkxICsgMTtcbiAgICBsZXQgcSA9IHAgLSBpMTtcblxuICAgIGxldCB2ID0gKHZhbHVlc1tpMV0gKiAoMS1xKSkgKyAodmFsdWVzW2kyXSAqIChxKSk7XG5cbiAgICByZXR1cm4gTWF0aC5yb3VuZCh2KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCAobmV3IFV0aWwoKSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi8yZC9jZWxscy9VdGlsLmpzIiwiXG5pbXBvcnQgQ2VsbCBmcm9tICcuL0NlbGwnO1xuaW1wb3J0IFV0aWwgZnJvbSAnLi9VdGlsJztcblxuY29uc3QgTUFYX1ZBTFVFUyA9IDMyO1xuY29uc3QgUj0wLEc9MSxCPTI7XG5jb25zdCBwYWxldHRlID0gW1xuICBbMCwwLDAsMV0sIFsyNTUsMCwwLDBdLCBbMjU1LDk2LDAsMV0sIFsyNTUsMTkxLDAsMV0sIFsyMjMsMjU1LDAsMV0sXG4gIFsxMjgsMjU1LDAsMV0sIFszMiwyNTUsMCwxXSwgWzAsMjU1LDY0LDFdLCBbMCwyNTUsMTU5LDFdLFxuICBbMCwyNTUsMjU1LDFdLCBbMCwxNTksMjU1LDFdLCBbMCw2NCwyNTUsMV0sIFszMiwwLDI1NSwxXSxcbiAgWzEyNywwLDI1NSwxXSwgWzIyMywwLDI1NSwxXSwgWzI1NSwwLDE5MSwxXSwgWzI1NSwwLDk2LDFdXG5dO1xuXG5cbmNvbnN0IFJFRFMgPSBwYWxldHRlLm1hcCgoZSkgPT4geyByZXR1cm4gZVtSXSB9KTtcbmNvbnN0IEdSRUVOUyA9IHBhbGV0dGUubWFwKChlKSA9PiB7IHJldHVybiBlW0ddIH0pO1xuY29uc3QgQkxVRVMgPSBwYWxldHRlLm1hcCgoZSkgPT4geyByZXR1cm4gZVtCXSB9KTtcblxuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJsdXIgZXh0ZW5kcyBDZWxsXG57XG4gIGNvbnN0cnVjdG9yKClcbiAge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5zdGF0ZSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIE1BWF9WQUxVRVMpO1xuICB9XG5cbiAgcHJlcGFyZSgpXG4gIHtcblxuICB9XG5cbiAgc2hhZGVyKClcbiAge1xuICAgIGxldCBpID0gdGhpcy5zdGF0ZSAvIE1BWF9WQUxVRVM7XG4gICAgcmV0dXJuIFtcbiAgICAgIFV0aWwuaWxpbmVycChSRURTLCBpKSAmIDB4ZmYsXG4gICAgICBVdGlsLmlsaW5lcnAoR1JFRU5TLCBpKSAmIDB4ZmYsXG4gICAgICBVdGlsLmlsaW5lcnAoQkxVRVMsIGkpICYgMHhmZlxuICAgIF07XG5cbiAgfVxuXG5cbiAgLy8gLy8gR2V0cyBvciBhc3NpZ25zIGEgJ3ZhbHVlJyB0byBmZWVkYmFjayBpbnRvIHRoZSBDZWxsICdpbnRlcmZhY2UnIGNvdW50aW5nIG1ldGhvZFxuICB2YWx1ZSh2KVxuICB7XG4gICAgaWYgKHYgPT0gdW5kZWZpbmVkKSByZXR1cm4gdGhpcy5zdGF0ZTtcbiAgICBpZiAodiA8IDApIHYrPSBNQVhfVkFMVUVTO1xuICAgIHRoaXMuc3RhdGUgPSBNYXRoLnJvdW5kKHYpO1xuICB9XG5cblxuICBtdXRhdGUoZW50aXR5KVxuICB7XG4gICAgLy8gaWYgKGVudGl0eS5jZWxsc1swXVsxXS52YWx1ZSgpID4gdGhpcy52YWx1ZSgpKVxuICAgIC8vIHtcbiAgICAvLyAgIGxldCB0ID0gdGhpcy52YWx1ZSgpO1xuICAgIC8vICAgdGhpcy52YWx1ZShlbnRpdHkuY2VsbHNbMF1bMV0udmFsdWUoKSk7XG4gICAgLy8gICBlbnRpdHkuY2VsbHNbMF1bMV0udmFsdWUodCk7XG4gICAgLy8gfSBlbHNlIHtcbiAgICAvLyAgIGxldCB0ID0gdGhpcy52YWx1ZSgpO1xuICAgIC8vICAgdGhpcy52YWx1ZShlbnRpdHkuY2VsbHNbMV1bMl0udmFsdWUoKSk7XG4gICAgLy8gICBlbnRpdHkuY2VsbHNbMV1bMl0udmFsdWUodCk7XG4gICAgLy8gfVxuICAgIGxldCBhdiA9IHRoaXMuYXZlcmFnZVZhbHVlTmVpZ2hib3VycyhlbnRpdHkpO1xuICAgIHRoaXMudmFsdWUoYXYpO1xuXG4gICAgLy8gaWYgKHRoaXMubnVtTmVpZ2hib3Vyc1dpdGhWYWx1ZShlbnRpdHksIDApID49IDIpXG4gICAgLy8ge1xuICAgIC8vICAgdGhpcy52YWx1ZShNQVhfVkFMVUVTLTEpO1xuICAgIC8vIH1cblxuICAgIC8vbGV0IGF2ID0gdGhpcy5hdmVyYWdlVmFsdWVOZWlnaGJvdXJzKGVudGl0eSkgKiAxLjA7XG5cblxuICAgIGlmIChNYXRoLnJhbmRvbSgpIDwgMC4wMSkgdGhpcy52YWx1ZSggMCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vMmQvY2VsbHMvQmx1ci5qcyJdLCJzb3VyY2VSb290IjoiIn0=