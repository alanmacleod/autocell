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
	
	var _Burrow = __webpack_require__(8);
	
	var _Burrow2 = _interopRequireDefault(_Burrow);
	
	var _Blur = __webpack_require__(9);
	
	var _Blur2 = _interopRequireDefault(_Blur);
	
	var _Snow = __webpack_require__(10);
	
	var _Snow2 = _interopRequireDefault(_Snow);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var SIZE = 75; // cells
	var VIEW_SCALE = 8;
	var WORLD_FRAME_RATE = 15;
	
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
	
	// world.evolve();
	// renderer.render(world.data);
	//
	// console.log(world.data);
	
	
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
	          // Does CellType provide a static 'test'ing function?
	          if (CellType.test) {
	            // Is it ok if we place the cell here?
	            //if ()
	            if (Math.random() <= spread) this.data[y][x] = new CellType(CellType.test(x, y, this.size, this.size));
	          } else {
	            if (Math.random() <= spread) this.data[y][x] = new CellType();
	          }
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
	      var n = 0;
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
	            this.canvas2d.block(x * this.scale, y * this.scale, this.scale, this.scale, col);
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
	
	var _Util = __webpack_require__(7);
	
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
	
	      var next = (this.value() + 1 + Math.floor(Math.random() * 3)) % MAX_VALUES;
	      //(this.value() + (Math.floor(Math.random() * 5))) % MAX_VALUES;
	
	      var change = false;
	      for (var t = 0; t < entity.linear.length; t++) {
	        if (entity.linear[t]) change = change || entity.linear[t].value() === next;
	      }
	
	      if (!change) {
	        var nc = this.averageValueNeighbours(entity);
	        if (Math.abs(this.value() - nc) == 1) this.value(nc);
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Cell2 = __webpack_require__(5);
	
	var _Cell3 = _interopRequireDefault(_Cell2);
	
	var _Util = __webpack_require__(7);
	
	var _Util2 = _interopRequireDefault(_Util);
	
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
	
	    _this.open = Math.random() > 0.4;
	    return _this;
	  }
	
	  _createClass(Burrow, [{
	    key: 'prepare',
	    value: function prepare() {
	      this.wasOpen = this.open;
	    }
	  }, {
	    key: 'shader',
	    value: function shader() {
	      return palette[this.value()];
	    }
	  }, {
	    key: 'value',
	    value: function value(v) {
	      return this.wasOpen ? 1 : 0;
	    }
	  }, {
	    key: 'mutate',
	    value: function mutate(entity) {
	      var num = this.numLiveNeighbours(entity);
	      this.open = this.wasOpen && num >= 4 || num >= 6;
	      return this;
	    }
	  }]);
	
	  return Burrow;
	}(_Cell3.default);
	
	exports.default = Burrow;

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
	
	var _Util = __webpack_require__(7);
	
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

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Cell2 = __webpack_require__(5);
	
	var _Cell3 = _interopRequireDefault(_Cell2);
	
	var _Util = __webpack_require__(7);
	
	var _Util2 = _interopRequireDefault(_Util);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var MAX_VALUES = 16;
	
	var palette = [[0, 0, 0], [255, 255, 255]];
	
	var bwpalette = [0, 255];
	
	var Snow = function (_Cell) {
	  _inherits(Snow, _Cell);
	
	  function Snow(pass) {
	    _classCallCheck(this, Snow);
	
	    var _this = _possibleConstructorReturn(this, (Snow.__proto__ || Object.getPrototypeOf(Snow)).call(this));
	
	    _this.snowing = false;
	    _this.value(0);
	
	    if (pass) _this.startSnowing();
	    return _this;
	  }
	
	  _createClass(Snow, [{
	    key: 'prepare',
	    value: function prepare() {}
	  }, {
	    key: 'startSnowing',
	    value: function startSnowing() {
	      this.snowing = true;
	      this.value(Math.random() > 0.6 ? MAX_VALUES : 0);
	    }
	  }, {
	    key: 'shader',
	    value: function shader() {
	      var i = _Util2.default.ilinerp(bwpalette, this.value() / MAX_VALUES);
	      return [i, i, i];
	
	      //return palette [ this.value() ];
	    }
	  }, {
	    key: 'value',
	    value: function value(v) {
	      if (v == undefined) return this.state;
	      this.state = v;
	    }
	  }, {
	    key: 'mutate',
	    value: function mutate(entity) {
	      if (this.snowing) {
	        this.value(this.value() - Math.round(Math.random() * 3));
	        //
	        if (this.value() < 8) {
	          entity.cells[2][1].snowing = true;
	          entity.cells[2][1].value(this.value() + 4);
	          this.value(MAX_VALUES);
	        }
	        //
	        // if (this.value() <= 0)
	        // {
	        //   this.value(0);
	        //   this.snowing = false;
	        // }
	      }
	
	      return this;
	    }
	  }]);
	
	  return Snow;
	}(_Cell3.default);
	
	Snow.test = function (x, y, w, h) {
	  return y == 0;
	  //return true;
	};
	
	exports.default = Snow;

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZTFhNzA2OWIxZjk1YzBmYmY4ZTYiLCJ3ZWJwYWNrOi8vLy4vMmQvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi8yZC9jb3JlL1dvcmxkLmpzIiwid2VicGFjazovLy8uLzJkL2NvcmUvUmVuZGVyZXIyZC5qcyIsIndlYnBhY2s6Ly8vLi9zaGFyZWQvQ2FudmFzMmQuanMiLCJ3ZWJwYWNrOi8vLy4vMmQvY2VsbHMvR29MLmpzIiwid2VicGFjazovLy8uLzJkL2NlbGxzL0NlbGwuanMiLCJ3ZWJwYWNrOi8vLy4vMmQvY2VsbHMvRmxvb2QuanMiLCJ3ZWJwYWNrOi8vLy4vMmQvY2VsbHMvVXRpbC5qcyIsIndlYnBhY2s6Ly8vLi8yZC9jZWxscy9CdXJyb3cuanMiLCJ3ZWJwYWNrOi8vLy4vMmQvY2VsbHMvQmx1ci5qcyIsIndlYnBhY2s6Ly8vLi8yZC9jZWxscy9Tbm93LmpzIl0sIm5hbWVzIjpbIlNJWkUiLCJWSUVXX1NDQUxFIiwiV09STERfRlJBTUVfUkFURSIsImZwc1RleHQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwibGFzdFRpbWUiLCJmcmFtZXMiLCJhdkZyYW1lcyIsIndvcmxkIiwic2l6ZSIsInNwcmVhZCIsInR5cGUiLCJyZW5kZXJlciIsInNjYWxlIiwid2luZG93IiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwicmVuZGVyIiwic2V0SW50ZXJ2YWwiLCJldm9sdmUiLCJ0aW1lTm93IiwicGVyZm9ybWFuY2UiLCJub3ciLCJ0aW1lVGFrZW4iLCJpbm5lckhUTUwiLCJ0b0ZpeGVkIiwiZGF0YSIsIldvcmxkIiwib3B0aW9ucyIsImluaXQiLCJDZWxsVHlwZSIsImFycmF5MmQiLCJpIiwieSIsIngiLCJ0ZXN0IiwiTWF0aCIsInJhbmRvbSIsInIiLCJyYWRpdXMiLCJudW0iLCJ2eCIsInZ5IiwibiIsImwiLCJpeSIsIml4Iiwid3JhcCIsInB1c2giLCJjZWxscyIsImxpbmVhciIsInN1YmplY3QiLCJ2IiwiZCIsImxlbmd0aCIsIm5leHQiLCJwcmVwYXJlIiwibXV0YXRlIiwibmVpZ2hib3VyaG9vZCIsIlJlbmRlcmVyMmQiLCJlbGVtZW50IiwiY2FudmFzMmQiLCJ3IiwiaCIsInJlc2l6ZSIsImNsZWFyIiwiY29sIiwic2hhZGVyIiwiYmxvY2siLCJDYW52YXMyZCIsInBhcmVudCIsImNyZWF0ZUVsZW1lbnQiLCJhcHBlbmRDaGlsZCIsImNvbnRleHQiLCJnZXRDb250ZXh0IiwiYyIsInQiLCJiZWdpblBhdGgiLCJyZWN0IiwiZmlsbFN0eWxlIiwiZmlsbCIsInN4Iiwic3kiLCJzdyIsInNoIiwiZHgiLCJkeSIsImR3IiwiZGgiLCJkcmF3SW1hZ2UiLCJjYW52YXMiLCJ3aWR0aCIsImhlaWdodCIsImNsaWVudFdpZHRoIiwiY2xpZW50SGVpZ2h0IiwiQUxJVkUiLCJERUFEIiwicGFsZXR0ZSIsIkdhbWVPZkxpZmUiLCJhbGl2ZSIsInJvdW5kIiwidW5kZWZpbmVkIiwibnVtTGl2ZU5laWdoYm91cnMiLCJtZSIsIm5ld1N0YXRlIiwidmFsdWUiLCJDZWxsIiwibmVpZ2hib3VycyIsInN1bSIsIk1BWF9WQUxVRVMiLCJSIiwiRyIsIkIiLCJSRURTIiwibWFwIiwiZSIsIkdSRUVOUyIsIkJMVUVTIiwiRmxvb2QiLCJzdGF0ZSIsImZsb29yIiwiaWxpbmVycCIsImVudGl0eSIsImNoYW5nZSIsIm5jIiwiYXZlcmFnZVZhbHVlTmVpZ2hib3VycyIsImFicyIsIlV0aWwiLCJ2YWx1ZXMiLCJwb3NpdGlvbiIsInAiLCJpMSIsImkyIiwicSIsIkJ1cnJvdyIsIm9wZW4iLCJ3YXNPcGVuIiwiQmx1ciIsImF2IiwiYndwYWxldHRlIiwiU25vdyIsInBhc3MiLCJzbm93aW5nIiwic3RhcnRTbm93aW5nIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztB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TXNFLE0sRUFDUDtBQUNFLFdBQUksS0FBS29CLE9BQVQsRUFDQTtBQUNFLGNBQUtyQyxLQUFMLENBQVksS0FBS0EsS0FBTCxLQUFlckUsS0FBS2dFLEtBQUwsQ0FBV2hFLEtBQUtDLE1BQUwsS0FBZ0IsQ0FBM0IsQ0FBM0I7QUFDQTtBQUNBLGFBQUksS0FBS29FLEtBQUwsS0FBZSxDQUFuQixFQUNBO0FBQ0lpQixrQkFBT3pFLEtBQVAsQ0FBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CNkYsT0FBbkIsR0FBNkIsSUFBN0I7QUFDQXBCLGtCQUFPekUsS0FBUCxDQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUJ3RCxLQUFuQixDQUF5QixLQUFLQSxLQUFMLEtBQWUsQ0FBeEM7QUFDQSxnQkFBS0EsS0FBTCxDQUFXSSxVQUFYO0FBQ0g7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRDs7QUFFRCxjQUFPLElBQVA7QUFFRDs7Ozs7O0FBSUgrQixNQUFLekcsSUFBTCxHQUFZLFVBQUNELENBQUQsRUFBSUQsQ0FBSixFQUFPNkIsQ0FBUCxFQUFVQyxDQUFWLEVBQWdCO0FBQzFCLFVBQU85QixLQUFLLENBQVo7QUFDQTtBQUNELEVBSEQ7O21CQUtlMkcsSSIsImZpbGUiOiIyZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBlMWE3MDY5YjFmOTVjMGZiZjhlNiIsIlxuXG5pbXBvcnQgV29ybGQgICAgICAgIGZyb20gJy4vY29yZS9Xb3JsZC5qcyc7XG5pbXBvcnQgUmVuZGVyZXIgICAgIGZyb20gJy4vY29yZS9SZW5kZXJlcjJkJztcbmltcG9ydCBHYW1lT2ZMaWZlICAgZnJvbSAnLi9jZWxscy9Hb0wnO1xuaW1wb3J0IEZsb29kICAgICAgICBmcm9tICcuL2NlbGxzL0Zsb29kJztcbmltcG9ydCBCdXJyb3cgICAgICAgZnJvbSAnLi9jZWxscy9CdXJyb3cnO1xuaW1wb3J0IEJsdXIgICAgICAgICBmcm9tICcuL2NlbGxzL0JsdXInO1xuaW1wb3J0IFNub3cgICAgICAgICBmcm9tICcuL2NlbGxzL1Nub3cnO1xuXG5jb25zdCBTSVpFID0gNzU7IC8vIGNlbGxzXG5jb25zdCBWSUVXX1NDQUxFID0gODtcbmNvbnN0IFdPUkxEX0ZSQU1FX1JBVEUgPSAxNTtcblxubGV0IGZwc1RleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZwc1wiKTtcblxubGV0IGxhc3RUaW1lID0gMCwgZnJhbWVzID0gMCwgYXZGcmFtZXMgPSAwO1xuXG5sZXQgd29ybGQgPSBuZXcgV29ybGQoe1xuICBzaXplOiBTSVpFLFxuICBzcHJlYWQ6IDEuMCxcbiAgdHlwZTogRmxvb2Rcbn0pO1xuXG5sZXQgcmVuZGVyZXIgPSBuZXcgUmVuZGVyZXIoXCJjb250ZW50XCIpO1xucmVuZGVyZXIuc2NhbGUgPSBWSUVXX1NDQUxFO1xuXG4vLyB3b3JsZC5ldm9sdmUoKTtcbi8vIHJlbmRlcmVyLnJlbmRlcih3b3JsZC5kYXRhKTtcbi8vXG4vLyBjb25zb2xlLmxvZyh3b3JsZC5kYXRhKTtcblxuXG53aW5kb3cud29ybGQgPSB3b3JsZDtcblxud2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpO1xud2luZG93LnNldEludGVydmFsKCgpID0+IHsgd29ybGQuZXZvbHZlKCkgfSwgMTAwMCAvIFdPUkxEX0ZSQU1FX1JBVEUpO1xuXG5mdW5jdGlvbiByZW5kZXIoKVxue1xuICBsZXQgdGltZU5vdyA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICBsZXQgdGltZVRha2VuID0gdGltZU5vdyAtIGxhc3RUaW1lO1xuXG4gIGF2RnJhbWVzICs9ICAxMDAwIC8gdGltZVRha2VuO1xuICBsYXN0VGltZSA9IHRpbWVOb3c7XG5cbiAgaWYgKGZyYW1lcysrID09IDEwKVxuICB7XG4gICAgZnBzVGV4dC5pbm5lckhUTUwgPSAoYXZGcmFtZXMgLyAxMCkudG9GaXhlZCgxKSArIFwiIEZQU1wiO1xuICAgIGZyYW1lcyA9IDA7XG4gICAgYXZGcmFtZXMgPSAwO1xuICB9XG5cbiAgcmVuZGVyZXIucmVuZGVyKHdvcmxkLmRhdGEpO1xuICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlbmRlcik7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi8yZC9tYWluLmpzIiwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdvcmxkXG57XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpXG4gIHtcblxuICAgIHRoaXMuc2l6ZSA9IG9wdGlvbnMuc2l6ZTsgLy9jZWxscywgc3F1YXJlXG4gICAgdGhpcy5kYXRhID0gbnVsbDtcblxuICAgIHRoaXMuaW5pdChvcHRpb25zLnR5cGUsIG9wdGlvbnMuc3ByZWFkKTtcbiAgfVxuXG4gIGluaXQoQ2VsbFR5cGUsIHNwcmVhZClcbiAge1xuICAgIC8vIENyZWF0ZSB0aGUgYXJyYXk6XG4gICAgdGhpcy5kYXRhID0gdGhpcy5hcnJheTJkKHRoaXMuc2l6ZSk7XG4gICAgbGV0IGkgPSAwO1xuXG4gICAgZm9yIChsZXQgeT0wOyB5PHRoaXMuc2l6ZTsgeSsrKVxuICAgIHtcbiAgICAgIGZvciAobGV0IHg9MDsgeDx0aGlzLnNpemU7IHgrKylcbiAgICAgIHtcbiAgICAgICAgLy8gRG9lcyBDZWxsVHlwZSBwcm92aWRlIGEgc3RhdGljICd0ZXN0J2luZyBmdW5jdGlvbj9cbiAgICAgICAgaWYgKENlbGxUeXBlLnRlc3QpXG4gICAgICAgIHtcbiAgICAgICAgICAvLyBJcyBpdCBvayBpZiB3ZSBwbGFjZSB0aGUgY2VsbCBoZXJlP1xuICAgICAgICAgIC8vaWYgKClcbiAgICAgICAgICBpZiAoTWF0aC5yYW5kb20oKSA8PSBzcHJlYWQpXG4gICAgICAgICAgICB0aGlzLmRhdGFbeV1beF0gPSBuZXcgQ2VsbFR5cGUoXG4gICAgICAgICAgICAgIENlbGxUeXBlLnRlc3QoeCx5LHRoaXMuc2l6ZSwgdGhpcy5zaXplKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoTWF0aC5yYW5kb20oKSA8PSBzcHJlYWQpXG4gICAgICAgICAgICB0aGlzLmRhdGFbeV1beF0gPSBuZXcgQ2VsbFR5cGUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuXG4gIH1cblxuICBuZWlnaGJvdXJob29kKHgsIHksIHIpXG4gIHtcbiAgICBsZXQgcmFkaXVzID0gciB8fCAxO1xuICAgIGxldCBudW0gPSAocmFkaXVzICogMikgKyAxO1xuXG4gICAgbGV0IHZ4ID0geCAtIHJhZGl1cztcbiAgICBsZXQgdnkgPSB5IC0gcmFkaXVzO1xuXG4gICAgbGV0IG4gPSB0aGlzLmFycmF5MmQobnVtKTtcbiAgICBsZXQgbCA9IFtdO1xuXG4gICAgZm9yIChsZXQgaXk9MDsgaXk8bnVtOyBpeSsrKVxuICAgIHtcbiAgICAgIHZ4ID0geCAtIHJhZGl1cztcbiAgICAgIGZvciAobGV0IGl4PTA7IGl4PG51bTsgaXgrKylcbiAgICAgIHtcbiAgICAgICAgbltpeV1baXhdID0gdGhpcy5kYXRhW3RoaXMud3JhcCh2eSldW3RoaXMud3JhcCh2eCldO1xuICAgICAgICBsLnB1c2godGhpcy5kYXRhW3RoaXMud3JhcCh2eSldW3RoaXMud3JhcCh2eCldKTtcbiAgICAgICAgdngrKztcbiAgICAgIH1cbiAgICAgIHZ5Kys7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGNlbGxzOiBuLFxuICAgICAgbGluZWFyOiBsLFxuICAgICAgcmFkaXVzOiByYWRpdXMsXG4gICAgICBzdWJqZWN0OiB0aGlzLmRhdGFbeV1beF1cbiAgICB9XG4gIH1cblxuICB3cmFwKHYpXG4gIHtcbiAgICBpZiAoIHYgPCAwICkgcmV0dXJuIHYgKyB0aGlzLnNpemU7XG4gICAgaWYgKCB2ID4gdGhpcy5zaXplLTEpIHJldHVybiB2IC0gdGhpcy5zaXplO1xuICAgIHJldHVybiB2O1xuICB9XG5cbiAgYXJyYXkyZChzaXplKVxuICB7XG4gICAgZm9yICh2YXIgZD1bXTsgZC5sZW5ndGggPCBzaXplOyBkLnB1c2goW10pKTtcbiAgICByZXR1cm4gZDtcbiAgfVxuXG4gIGV2b2x2ZSgpXG4gIHtcbiAgICBsZXQgbmV4dCA9IHRoaXMuYXJyYXkyZCh0aGlzLnNpemUpO1xuXG4gICAgdGhpcy5wcmVwYXJlKCk7XG5cbiAgICBmb3IgKGxldCB5PTA7IHk8dGhpcy5zaXplOyB5KyspXG4gICAge1xuICAgICAgZm9yIChsZXQgeD0wOyB4PHRoaXMuc2l6ZTsgeCsrKVxuICAgICAge1xuICAgICAgICBpZiAodGhpcy5kYXRhW3ldW3hdKVxuICAgICAgICAgIG5leHRbeV1beF0gPSB0aGlzLmRhdGFbeV1beF0ubXV0YXRlKHRoaXMubmVpZ2hib3VyaG9vZCh4LHkpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmRhdGEgPSBuZXh0O1xuICB9XG5cblxuICBwcmVwYXJlKClcbiAge1xuICAgIGxldCBuID0gMDtcbiAgICBmb3IgKGxldCB5PTA7IHk8dGhpcy5zaXplOyB5KyspXG4gICAgICBmb3IgKGxldCB4PTA7IHg8dGhpcy5zaXplOyB4KyspXG4gICAgICAgIGlmICh0aGlzLmRhdGFbeV1beF0pIHRoaXMuZGF0YVt5XVt4XS5wcmVwYXJlKCk7XG5cbiAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi8yZC9jb3JlL1dvcmxkLmpzIiwiXG5pbXBvcnQgQ2FudmFzMmQgZnJvbSAnLi4vLi4vc2hhcmVkL0NhbnZhczJkJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVuZGVyZXIyZFxue1xuICBjb25zdHJ1Y3RvcihlbGVtZW50KVxuICB7XG4gICAgdGhpcy5jYW52YXMyZCA9IG5ldyBDYW52YXMyZChlbGVtZW50KTtcbiAgICB0aGlzLnNjYWxlID0gMTtcbiAgICB0aGlzLnNpemUgPSAxO1xuICB9XG5cbiAgcmVzaXplKHcsIGgpXG4gIHtcbiAgICB0aGlzLmNhbnZhczJkLnJlc2l6ZSh3LCBoKTtcbiAgICB0aGlzLmNhbnZhczJkLmNsZWFyKCk7XG4gIH1cblxuICByZW5kZXIoZGF0YSlcbiAge1xuXG4gICAgaWYgKGRhdGEubGVuZ3RoICE9IHRoaXMuc2l6ZSlcbiAgICB7XG4gICAgICB0aGlzLnNpemUgPSBkYXRhLmxlbmd0aDtcbiAgICAgIHRoaXMucmVzaXplKHRoaXMuc2l6ZSAqIHRoaXMuc2NhbGUsIHRoaXMuc2l6ZSAqIHRoaXMuc2NhbGUpO1xuICAgIH1cblxuICAgIGZvciAobGV0IHk9MDsgeTx0aGlzLnNpemU7IHkrKylcbiAgICB7XG4gICAgICBmb3IgKGxldCB4PTA7IHg8dGhpcy5zaXplOyB4KyspXG4gICAgICB7XG4gICAgICAgIGlmIChkYXRhW3ldW3hdKVxuICAgICAgICB7XG4gICAgICAgICAgbGV0IGNvbCA9IGRhdGFbeV1beF0uc2hhZGVyKCk7XG4gICAgICAgIC8vbGV0IGNvbCA9IGRhdGFbeV1beF0gPyBbMCwwLDBdIDogWzI1NSwyNTUsMjU1XTtcbiAgICAgICAgICB0aGlzLmNhbnZhczJkLmJsb2NrKHggKiB0aGlzLnNjYWxlLCB5ICogdGhpcy5zY2FsZSwgdGhpcy5zY2FsZSwgdGhpcy5zY2FsZSwgY29sKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLzJkL2NvcmUvUmVuZGVyZXIyZC5qcyIsIlxuXG4vLyBCb2lsZXJwbGF0ZSBmdW5jdGlvbnMgdG8gd3JpdGUgdG8gdGhlIENhbnZhc1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYW52YXMyZFxue1xuICBjb25zdHJ1Y3RvcihwYXJlbnQpXG4gIHtcbiAgICB0aGlzLnBhcmVudCA9IHR5cGVvZiBwYXJlbnQgPT0gJ3N0cmluZycgPyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwYXJlbnQpIDogcGFyZW50O1xuICAgIHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgdGhpcy5wYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50KTtcbiAgICB0aGlzLmNvbnRleHQgPSB0aGlzLmVsZW1lbnQuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIHRoaXMuY2xlYXIoKTtcblxuICB9XG5cbiAgYmxvY2soeCx5LHcsaCxjKVxuICB7XG4gICAgbGV0IHQgPSB0aGlzLmNvbnRleHQ7XG4gICAgdC5iZWdpblBhdGgoKTtcbiAgICB0LnJlY3QoeCwgeSwgdywgaCk7XG4gICAgdC5maWxsU3R5bGUgPSBjID8gYHJnYigke2NbMF19LCR7Y1sxXX0sJHtjWzJdfSlgIDogXCJibGFja1wiO1xuICAgIHQuZmlsbCgpO1xuICB9XG5cbiAgc2VsZmJsaXQoc3gsIHN5LCBzdywgc2gsIGR4LCBkeSwgZHcsIGRoKVxuICB7XG4gICAgdGhpcy5jb250ZXh0LmRyYXdJbWFnZSh0aGlzLmNvbnRleHQuY2FudmFzLCBzeCwgc3ksIHN3LCBzaCwgZHgsIGR5LCBkdywgZGgpO1xuICB9XG5cbiAgY2xlYXIoYylcbiAge1xuICAgIGxldCB0ID0gdGhpcy5jb250ZXh0O1xuICAgIHQuYmVnaW5QYXRoKCk7XG4gICAgdC5yZWN0KDAsIDAsIHRoaXMuZWxlbWVudC53aWR0aCwgdGhpcy5lbGVtZW50LmhlaWdodCk7XG4gICAgdC5maWxsU3R5bGUgPSBjID8gYHJnYigke2NbMF19LCR7Y1sxXX0sJHtjWzJdfSlgIDogXCJ3aGl0ZVwiO1xuICAgIHQuZmlsbCgpO1xuICB9XG5cbiAgd2lkdGgoKVxuICB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudC53aWR0aDtcbiAgfVxuXG4gIGhlaWdodCgpXG4gIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50LmhlaWdodDtcbiAgfVxuXG4gIGZpdHdpbmRvdygpXG4gIHtcbiAgICB0aGlzLnJlc2l6ZSh0aGlzLnBhcmVudC5jbGllbnRXaWR0aCwgdGhpcy5wYXJlbnQuY2xpZW50SGVpZ2h0KTtcbiAgfVxuXG4gIHJlc2l6ZSh3LCBoKVxuICB7XG5cbiAgICB0aGlzLmVsZW1lbnQud2lkdGggPSB3O1xuICAgIHRoaXMuZWxlbWVudC5oZWlnaHQgPSBoO1xuXG4gICAgLy8gZHJhdygpXG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NoYXJlZC9DYW52YXMyZC5qcyIsIlxuaW1wb3J0IENlbGwgZnJvbSAnLi9DZWxsJztcblxuY29uc3QgQUxJVkUgPSAxLCBERUFEID0gMDtcblxuY29uc3QgcGFsZXR0ZSA9IFtcbiAgWzI1NSwyNTUsMjU1XSxcbiAgWzAsMCwwXVxuXTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZU9mTGlmZSBleHRlbmRzIENlbGxcbntcbiAgY29uc3RydWN0b3IoKVxuICB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmFsaXZlID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKTtcbiAgfVxuXG4gIHNoYWRlcigpXG4gIHtcbiAgICByZXR1cm4gcGFsZXR0ZVsgdGhpcy5hbGl2ZSBdO1xuICB9XG5cblxuICBldmFsdWF0ZSgpXG4gIHtcbiAgICByZXR1cm4gdGhpcy5hbGl2ZSA/IDEgOiAwO1xuICB9XG5cbiAgLy8gLy8gR2V0cyBvciBhc3NpZ25zIGEgJ3ZhbHVlJyB0byBmZWVkYmFjayBpbnRvIHRoZSBDZWxsICdpbnRlcmZhY2UnIGNvdW50aW5nIG1ldGhvZFxuICB2YWx1ZSh2KVxuICB7XG4gICAgaWYgKHYgPT09IHVuZGVmaW5lZCkgcmV0dXJuIHRoaXMuYWxpdmUgPyAxIDogMDtcbiAgICB0aGlzLmFsaXZlID0gKHYgPT0gMCkgPyBERUFEIDogQUxJVkU7XG4gIH1cblxuXG4gIG11dGF0ZShjZWxscylcbiAge1xuICAgIGxldCBuID0gdGhpcy5udW1MaXZlTmVpZ2hib3VycyhjZWxscyk7XG4gICAgbGV0IG1lID0gbmV3IEdhbWVPZkxpZmUoKTtcbiAgICBsZXQgbmV3U3RhdGUgPSBERUFEO1xuXG4gICAgaWYgKGNlbGxzLnN1YmplY3QuYWxpdmUgJiYgbiA8IDIpXG4gICAgICBuZXdTdGF0ZSA9IERFQUQ7XG4gICAgZWxzZSBpZiAoY2VsbHMuc3ViamVjdC5hbGl2ZSAmJiBuID4gMylcbiAgICAgIG5ld1N0YXRlID0gREVBRDtcbiAgICBlbHNlIGlmICghY2VsbHMuc3ViamVjdC5hbGl2ZSAmJiBuID09IDMpXG4gICAgICBuZXdTdGF0ZSA9IEFMSVZFO1xuICAgIGVsc2VcbiAgICAgIG5ld1N0YXRlID0gY2VsbHMuc3ViamVjdC52YWx1ZSgpO1xuXG4gICAgbWUudmFsdWUobmV3U3RhdGUpO1xuXG4gICAgcmV0dXJuIG1lO1xuICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLzJkL2NlbGxzL0dvTC5qcyIsIlxuLy8gVGhpcyBpcyB0aGUgYmFzZSB0eXBlIG9mIENlbGwgdXNlZCBmb3IgZXZlcnkgQ0EgdHlwZS5cbi8vIEl0J3MgbW9yZSBvZiBhIGNsYXNzaWNhbCBcIkludGVyZmFjZVwiIHRoYW4gYSBjbGFzcyBJIHN1cHBvc2VcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2VsbFxue1xuICBjb25zdHJ1Y3RvcigpXG4gIHtcblxuICB9XG5cbiAgcHJlcGFyZSgpXG4gIHtcblxuICB9XG5cbiAgbXV0YXRlKG5laWdoYm91cnMpXG4gIHtcblxuICB9XG5cbiAgc2hhZGVyKClcbiAge1xuXG4gIH1cblxuXG4gIHZhbHVlKClcbiAge1xuXG4gIH1cblxuICBudW1MaXZlTmVpZ2hib3VycyhuKVxuICB7XG4gICAgbGV0IG51bSA9IDA7XG5cbiAgICBmb3IgKGxldCB5ID0gMDsgeTxuLmNlbGxzLmxlbmd0aDsgeSsrKVxuICAgICAgZm9yIChsZXQgeCA9IDA7IHg8bi5jZWxsc1t5XS5sZW5ndGg7IHgrKylcbiAgICAgICAgaWYgKG4uY2VsbHNbeV1beF0pIGlmIChuLmNlbGxzW3ldW3hdLnZhbHVlKCkgPiAwKSBudW0gKys7XG5cbiAgICAvLyBkb24ndCBpbmNsdWRlICd1cycgaW4gdGhlIGNvdW50IVxuICAgIHJldHVybiBudW0gLSAobi5zdWJqZWN0LnZhbHVlKCkgPiAwID8gMSA6IDApO1xuICB9XG5cbiAgbnVtTmVpZ2hib3Vyc1dpdGhWYWx1ZShuLCB2KVxuICB7XG4gICAgbGV0IG51bSA9IDA7XG5cbiAgICBmb3IgKGxldCB0PTA7IHQ8bi5saW5lYXIubGVuZ3RoOyB0KyspXG4gICAge1xuICAgICAgaWYgKG4ubGluZWFyW3RdKVxuICAgICAgICBpZiAobi5saW5lYXJbdF0udmFsdWUoKSA9PSB2KSBudW0rKztcbiAgICB9XG4gICAgcmV0dXJuIG51bTtcbiAgfVxuXG4gIGF2ZXJhZ2VWYWx1ZU5laWdoYm91cnMobilcbiAge1xuICAgIGxldCBzdW0gPSAwO1xuICAgIGZvciAobGV0IHQ9MDsgdDxuLmxpbmVhci5sZW5ndGg7IHQrKylcbiAgICB7XG4gICAgICBpZiAobi5saW5lYXJbdF0pXG4gICAgICB7XG4gICAgICAgIHN1bSArPSBuLmxpbmVhclt0XS52YWx1ZSgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHN1bSAtPSBuLnN1YmplY3QudmFsdWUoKTtcblxuICAgIHJldHVybiBzdW0gLyAobi5saW5lYXIubGVuZ3RoLTEpO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi8yZC9jZWxscy9DZWxsLmpzIiwiXG5pbXBvcnQgQ2VsbCBmcm9tICcuL0NlbGwnO1xuaW1wb3J0IFV0aWwgZnJvbSAnLi9VdGlsJztcblxuY29uc3QgTUFYX1ZBTFVFUyA9IDMyO1xuY29uc3QgUj0wLCBHPTEsIEI9Mjtcbi8vXG4vLyBjb25zdCBwYWxldHRlID0gW1xuLy8gICBbMTAsIDI1NSwgOTZdLFxuLy8gICBbMjU1LCAzMiwgMjU1XSxcbi8vICAgWzE3MiwgNTQsIDI1NV0sXG4vLyAgIFszMiwgMzIsIDI1NV0sXG4vLyAgIFszMiwgMjU1LCAyNTVdLFxuLy8gICBbMzIsIDMyLCAyNTVdLFxuLy8gICBbMjU1LCAyNTUsIDMyXVxuLy8gXTtcblxuLy8gbmljZSBjbG91ZHNcbi8vIGNvbnN0IHBhbGV0dGUgPSBbXG4vLyAgIFs1MywgMTc3LCAyNTVdLFxuLy8gICBbMjAwLCAyMDAsIDIxNV0sXG4vLyAgIFsyNTUsIDI1NSwgMjU1XVxuLy8gXTtcblxuLy8gZmlyZSBpc2hcbi8vIGNvbnN0IHBhbGV0dGUgPSBbXG4vLyAgIFsyNTUsIDAsIDBdLFxuLy8gICBbMjU1LCAyNTUsIDBdLFxuLy8gICBbMjU1LCAyNTUsIDIyMF1cbi8vIF07XG5cbmNvbnN0IHBhbGV0dGUgPSBbXG4gIFsyNTUsMCwwLDFdLCBbMjU1LDk2LDAsMV0sIFsyNTUsMTkxLDAsMV0sIFsyMjMsMjU1LDAsMV0sXG4gIFsxMjgsMjU1LDAsMV0sIFszMiwyNTUsMCwxXSwgWzAsMjU1LDY0LDFdLCBbMCwyNTUsMTU5LDFdLFxuICBbMCwyNTUsMjU1LDFdLCBbMCwxNTksMjU1LDFdLCBbMCw2NCwyNTUsMV0sIFszMiwwLDI1NSwxXSxcbiAgWzEyNywwLDI1NSwxXSwgWzIyMywwLDI1NSwxXSwgWzI1NSwwLDE5MSwxXSwgWzI1NSwwLDk2LDFdXG5dO1xuXG5jb25zdCBSRURTID0gcGFsZXR0ZS5tYXAoKGUpID0+IHsgcmV0dXJuIGVbUl0gfSk7XG5jb25zdCBHUkVFTlMgPSBwYWxldHRlLm1hcCgoZSkgPT4geyByZXR1cm4gZVtHXSB9KTtcbmNvbnN0IEJMVUVTID0gcGFsZXR0ZS5tYXAoKGUpID0+IHsgcmV0dXJuIGVbQl0gfSk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZsb29kIGV4dGVuZHMgQ2VsbFxue1xuICBjb25zdHJ1Y3RvcigpXG4gIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuc3RhdGUgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBNQVhfVkFMVUVTKTtcbiAgfVxuXG4gIHNoYWRlcigpXG4gIHtcbiAgICBsZXQgaSA9IHRoaXMudmFsdWUoKSAvIE1BWF9WQUxVRVM7XG5cbiAgICByZXR1cm4gW1xuICAgICAgVXRpbC5pbGluZXJwKFJFRFMsIGkpICYgMHhmZixcbiAgICAgIFV0aWwuaWxpbmVycChHUkVFTlMsIGkpICYgMHhmZixcbiAgICAgIFV0aWwuaWxpbmVycChCTFVFUywgaSkgJiAweGZmXG4gICAgXTtcblxuICB9XG5cbiAgLy8gLy8gR2V0cyBvciBhc3NpZ25zIGEgJ3ZhbHVlJyB0byBmZWVkYmFjayBpbnRvIHRoZSBDZWxsICdpbnRlcmZhY2UnIGNvdW50aW5nIG1ldGhvZFxuICB2YWx1ZSh2KVxuICB7XG4gICAgaWYgKHYgPT0gdW5kZWZpbmVkKSByZXR1cm4gdGhpcy5zdGF0ZTtcbiAgICB0aGlzLnN0YXRlID0gdjtcbiAgfVxuXG5cbiAgbXV0YXRlKGVudGl0eSlcbiAge1xuXG4gICAgbGV0IG5leHQgPSAodGhpcy52YWx1ZSgpICsgMSArIChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAzKSkpICUgTUFYX1ZBTFVFUztcbiAgICAvLyh0aGlzLnZhbHVlKCkgKyAoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNSkpKSAlIE1BWF9WQUxVRVM7XG5cbiAgICBsZXQgY2hhbmdlID0gZmFsc2U7XG4gICAgZm9yIChsZXQgdD0wOyB0PGVudGl0eS5saW5lYXIubGVuZ3RoOyB0KyspXG4gICAge1xuICAgICAgaWYgKGVudGl0eS5saW5lYXJbdF0pXG4gICAgICAgIGNoYW5nZSA9IGNoYW5nZSB8fCBlbnRpdHkubGluZWFyW3RdLnZhbHVlKCkgPT09IG5leHQ7XG4gICAgfVxuXG4gICAgaWYgKCFjaGFuZ2UpXG4gICAge1xuICAgICAgbGV0IG5jID0gdGhpcy5hdmVyYWdlVmFsdWVOZWlnaGJvdXJzKGVudGl0eSk7XG4gICAgICBpZiAoTWF0aC5hYnModGhpcy52YWx1ZSgpIC0gbmMpID09IDEpXG4gICAgICAgIHRoaXMudmFsdWUobmMpO1xuXG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZSlcbiAgICAgIHRoaXMudmFsdWUobmV4dCk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG5cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vMmQvY2VsbHMvRmxvb2QuanMiLCJcblxuY2xhc3MgVXRpbFxue1xuICBjb25zdHJ1Y3RvcigpXG4gIHtcblxuICB9XG5cbiAgLy8gTGluZWFybHkgaW50ZXJwb2xhdGVzIGJldHdlZW4gYW4gYXJyYXkgb2YgdmFsdWVzXG4gIC8vIGUuZy4gdmFsdWVzID0gWzUsIDEwLCAxXSwgcCA9IDAuLjFcblxuICBpbGluZXJwKHZhbHVlcywgcG9zaXRpb24pXG4gIHtcbiAgICBpZiAocG9zaXRpb24gPj0gMSkgcmV0dXJuIHZhbHVlc1t2YWx1ZXMubGVuZ3RoLTFdO1xuICAgIGlmIChwb3NpdGlvbiA8IDApIHJldHVybiB2YWx1ZXNbMF07XG5cbiAgICBsZXQgcCA9IHBvc2l0aW9uICogKHZhbHVlcy5sZW5ndGggLSAxKTtcblxuICAgIGxldCBpMSA9IE1hdGguZmxvb3IocCk7XG4gICAgbGV0IGkyID0gaTEgKyAxO1xuICAgIGxldCBxID0gcCAtIGkxO1xuXG4gICAgbGV0IHYgPSAodmFsdWVzW2kxXSAqICgxLXEpKSArICh2YWx1ZXNbaTJdICogKHEpKTtcblxuICAgIHJldHVybiBNYXRoLnJvdW5kKHYpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IChuZXcgVXRpbCgpKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLzJkL2NlbGxzL1V0aWwuanMiLCJcbmltcG9ydCBDZWxsIGZyb20gJy4vQ2VsbCc7XG5pbXBvcnQgVXRpbCBmcm9tICcuL1V0aWwnO1xuXG5jb25zdCBwYWxldHRlID0gW1xuICBbMjU1LDI1NSwyNTVdLFxuICBbMCwwLDBdXG5dO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJ1cnJvdyBleHRlbmRzIENlbGxcbntcbiAgY29uc3RydWN0b3IoKVxuICB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLm9wZW4gPSBNYXRoLnJhbmRvbSgpID4gMC40O1xuICB9XG5cbiAgcHJlcGFyZSgpXG4gIHtcbiAgICB0aGlzLndhc09wZW4gPSB0aGlzLm9wZW47XG4gIH1cblxuICBzaGFkZXIoKVxuICB7XG4gICAgcmV0dXJuIHBhbGV0dGUgWyB0aGlzLnZhbHVlKCkgXTtcbiAgfVxuXG5cbiAgdmFsdWUodilcbiAge1xuICAgIHJldHVybiB0aGlzLndhc09wZW4gPyAxIDogMDtcbiAgfVxuXG5cbiAgbXV0YXRlKGVudGl0eSlcbiAge1xuICAgIGxldCBudW0gPSB0aGlzLm51bUxpdmVOZWlnaGJvdXJzKGVudGl0eSk7XG4gICAgdGhpcy5vcGVuID0gKHRoaXMud2FzT3BlbiAmJiBudW0gPj00KSB8fCBudW0gPj0gNjtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vMmQvY2VsbHMvQnVycm93LmpzIiwiXG5pbXBvcnQgQ2VsbCBmcm9tICcuL0NlbGwnO1xuaW1wb3J0IFV0aWwgZnJvbSAnLi9VdGlsJztcblxuY29uc3QgTUFYX1ZBTFVFUyA9IDMyO1xuY29uc3QgUj0wLEc9MSxCPTI7XG5jb25zdCBwYWxldHRlID0gW1xuICBbMCwwLDAsMV0sIFsyNTUsMCwwLDBdLCBbMjU1LDk2LDAsMV0sIFsyNTUsMTkxLDAsMV0sIFsyMjMsMjU1LDAsMV0sXG4gIFsxMjgsMjU1LDAsMV0sIFszMiwyNTUsMCwxXSwgWzAsMjU1LDY0LDFdLCBbMCwyNTUsMTU5LDFdLFxuICBbMCwyNTUsMjU1LDFdLCBbMCwxNTksMjU1LDFdLCBbMCw2NCwyNTUsMV0sIFszMiwwLDI1NSwxXSxcbiAgWzEyNywwLDI1NSwxXSwgWzIyMywwLDI1NSwxXSwgWzI1NSwwLDE5MSwxXSwgWzI1NSwwLDk2LDFdXG5dO1xuXG5cbmNvbnN0IFJFRFMgPSBwYWxldHRlLm1hcCgoZSkgPT4geyByZXR1cm4gZVtSXSB9KTtcbmNvbnN0IEdSRUVOUyA9IHBhbGV0dGUubWFwKChlKSA9PiB7IHJldHVybiBlW0ddIH0pO1xuY29uc3QgQkxVRVMgPSBwYWxldHRlLm1hcCgoZSkgPT4geyByZXR1cm4gZVtCXSB9KTtcblxuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJsdXIgZXh0ZW5kcyBDZWxsXG57XG4gIGNvbnN0cnVjdG9yKClcbiAge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5zdGF0ZSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIE1BWF9WQUxVRVMpO1xuICB9XG5cbiAgcHJlcGFyZSgpXG4gIHtcblxuICB9XG5cbiAgc2hhZGVyKClcbiAge1xuICAgIGxldCBpID0gdGhpcy5zdGF0ZSAvIE1BWF9WQUxVRVM7XG4gICAgcmV0dXJuIFtcbiAgICAgIFV0aWwuaWxpbmVycChSRURTLCBpKSAmIDB4ZmYsXG4gICAgICBVdGlsLmlsaW5lcnAoR1JFRU5TLCBpKSAmIDB4ZmYsXG4gICAgICBVdGlsLmlsaW5lcnAoQkxVRVMsIGkpICYgMHhmZlxuICAgIF07XG5cbiAgfVxuXG5cbiAgLy8gLy8gR2V0cyBvciBhc3NpZ25zIGEgJ3ZhbHVlJyB0byBmZWVkYmFjayBpbnRvIHRoZSBDZWxsICdpbnRlcmZhY2UnIGNvdW50aW5nIG1ldGhvZFxuICB2YWx1ZSh2KVxuICB7XG4gICAgaWYgKHYgPT0gdW5kZWZpbmVkKSByZXR1cm4gdGhpcy5zdGF0ZTtcbiAgICBpZiAodiA8IDApIHYrPSBNQVhfVkFMVUVTO1xuICAgIHRoaXMuc3RhdGUgPSBNYXRoLnJvdW5kKHYpO1xuICB9XG5cblxuICBtdXRhdGUoZW50aXR5KVxuICB7XG4gICAgLy8gaWYgKGVudGl0eS5jZWxsc1swXVsxXS52YWx1ZSgpID4gdGhpcy52YWx1ZSgpKVxuICAgIC8vIHtcbiAgICAvLyAgIGxldCB0ID0gdGhpcy52YWx1ZSgpO1xuICAgIC8vICAgdGhpcy52YWx1ZShlbnRpdHkuY2VsbHNbMF1bMV0udmFsdWUoKSk7XG4gICAgLy8gICBlbnRpdHkuY2VsbHNbMF1bMV0udmFsdWUodCk7XG4gICAgLy8gfSBlbHNlIHtcbiAgICAvLyAgIGxldCB0ID0gdGhpcy52YWx1ZSgpO1xuICAgIC8vICAgdGhpcy52YWx1ZShlbnRpdHkuY2VsbHNbMV1bMl0udmFsdWUoKSk7XG4gICAgLy8gICBlbnRpdHkuY2VsbHNbMV1bMl0udmFsdWUodCk7XG4gICAgLy8gfVxuICAgIGxldCBhdiA9IHRoaXMuYXZlcmFnZVZhbHVlTmVpZ2hib3VycyhlbnRpdHkpO1xuICAgIHRoaXMudmFsdWUoYXYpO1xuXG4gICAgLy8gaWYgKHRoaXMubnVtTmVpZ2hib3Vyc1dpdGhWYWx1ZShlbnRpdHksIDApID49IDIpXG4gICAgLy8ge1xuICAgIC8vICAgdGhpcy52YWx1ZShNQVhfVkFMVUVTLTEpO1xuICAgIC8vIH1cblxuICAgIC8vbGV0IGF2ID0gdGhpcy5hdmVyYWdlVmFsdWVOZWlnaGJvdXJzKGVudGl0eSkgKiAxLjA7XG5cblxuICAgIGlmIChNYXRoLnJhbmRvbSgpIDwgMC4wMSkgdGhpcy52YWx1ZSggMCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vMmQvY2VsbHMvQmx1ci5qcyIsIlxuaW1wb3J0IENlbGwgZnJvbSAnLi9DZWxsJztcbmltcG9ydCBVdGlsIGZyb20gJy4vVXRpbCc7XG5cbmNvbnN0IE1BWF9WQUxVRVMgPSAxNjtcblxuY29uc3QgcGFsZXR0ZSA9IFtcbiAgWzAsIDAsIDBdLFxuICBbMjU1LCAyNTUsIDI1NV1cbl07XG5cbmNvbnN0IGJ3cGFsZXR0ZSA9IFsgMCwgMjU1IF07XG5cbmNsYXNzIFNub3cgZXh0ZW5kcyBDZWxsXG57XG4gIGNvbnN0cnVjdG9yKHBhc3MpXG4gIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5zbm93aW5nID0gZmFsc2U7XG4gICAgdGhpcy52YWx1ZSgwKTtcblxuICAgIGlmIChwYXNzKVxuICAgICAgICB0aGlzLnN0YXJ0U25vd2luZygpO1xuICB9XG5cbiAgcHJlcGFyZSgpXG4gIHtcblxuICB9XG5cbiAgc3RhcnRTbm93aW5nKClcbiAge1xuICAgIHRoaXMuc25vd2luZyA9IHRydWU7XG4gICAgdGhpcy52YWx1ZSAoKE1hdGgucmFuZG9tKCkgPiAwLjYpID8gTUFYX1ZBTFVFUyA6IDApO1xuICB9XG5cbiAgc2hhZGVyKClcbiAge1xuICAgIGxldCBpID0gVXRpbC5pbGluZXJwKGJ3cGFsZXR0ZSwgdGhpcy52YWx1ZSgpIC8gTUFYX1ZBTFVFUyk7XG4gICAgcmV0dXJuIFsgaSwgaSwgaSBdO1xuXG4gICAgLy9yZXR1cm4gcGFsZXR0ZSBbIHRoaXMudmFsdWUoKSBdO1xuICB9XG5cblxuICB2YWx1ZSh2KVxuICB7XG4gICAgaWYgKHYgPT0gdW5kZWZpbmVkKSByZXR1cm4gdGhpcy5zdGF0ZTtcbiAgICB0aGlzLnN0YXRlID0gdjtcbiAgfVxuXG5cbiAgbXV0YXRlKGVudGl0eSlcbiAge1xuICAgIGlmICh0aGlzLnNub3dpbmcpXG4gICAge1xuICAgICAgdGhpcy52YWx1ZSggdGhpcy52YWx1ZSgpIC0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogMykpO1xuICAgICAgLy9cbiAgICAgIGlmICh0aGlzLnZhbHVlKCkgPCA4KVxuICAgICAge1xuICAgICAgICAgIGVudGl0eS5jZWxsc1syXVsxXS5zbm93aW5nID0gdHJ1ZTtcbiAgICAgICAgICBlbnRpdHkuY2VsbHNbMl1bMV0udmFsdWUodGhpcy52YWx1ZSgpICsgNCk7XG4gICAgICAgICAgdGhpcy52YWx1ZShNQVhfVkFMVUVTKTtcbiAgICAgIH1cbiAgICAgIC8vXG4gICAgICAvLyBpZiAodGhpcy52YWx1ZSgpIDw9IDApXG4gICAgICAvLyB7XG4gICAgICAvLyAgIHRoaXMudmFsdWUoMCk7XG4gICAgICAvLyAgIHRoaXMuc25vd2luZyA9IGZhbHNlO1xuICAgICAgLy8gfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuXG4gIH1cblxufVxuXG5Tbm93LnRlc3QgPSAoeCwgeSwgdywgaCkgPT4ge1xuICByZXR1cm4geSA9PSAwO1xuICAvL3JldHVybiB0cnVlO1xufVxuXG5leHBvcnQgZGVmYXVsdCBTbm93O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vMmQvY2VsbHMvU25vdy5qcyJdLCJzb3VyY2VSb290IjoiIn0=