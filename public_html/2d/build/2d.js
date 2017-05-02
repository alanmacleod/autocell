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
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _World = __webpack_require__(1);
	
	var _World2 = _interopRequireDefault(_World);
	
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
	
	//import Renderer     from './Renderer2d';
	//import Canvas2d from '../shared/Canvas2d';
	
	// "boids"
	
	var SIZE = 50; // cells
	var VIEW_SCALE = 8;
	var WORLD_FRAME_RATE = 30;
	//
	// let can = new Canvas2d("content");
	// can.resize(SIZE * VIEW_SCALE, SIZE * VIEW_SCALE);
	// can.clear();
	// //can.fitwindow();
	//
	// let cols = [
	//   [0,0,0],
	//   [255,0,0],
	//   [0,255,0],
	//   [0,0,255],
	//   [255,255,0],
	//   [255,0,255],
	//   [0,255,255],
	//   [128,0,0],
	//   [0,128,0],
	//   [0,0,128],
	//   [128,128,0],
	//   [0,128,128],
	//   [128,0,128]
	// ]
	//
	//
	// let num = SIZE * SIZE;
	// let x = Math.round(SIZE / 2);
	// let y = Math.round(SIZE / 2);
	// let xd = 1, yd = 1;
	// let onx = true;
	// let countdown = 1;
	// let iterations = 1;
	// let dir = 1;
	// let inc = 1;
	// let cnum = 0;
	// let visited = 0;
	//
	// let iterator = 1;
	// do
	// {
	//
	//   let col = cols[cnum % 13];
	//   cnum++
	//   // // Move x  loop
	//   console.log(`Moving x ${iterator} places ${xd==1?'>':'<'}`);
	//   for (let xi=0; xi < iterator; xi++)
	//   {
	//     can.block(x * VIEW_SCALE, y*VIEW_SCALE, VIEW_SCALE, VIEW_SCALE, col);
	//     x += xd;
	//     visited++;
	//   }
	//   xd = -xd;
	//   // // change direction
	//   //
	//   col = cols[(cnum++)%13];
	//   console.log(`Moving y ${iterator} places ${yd==1?'v':'^'}`);
	//   for (let yi=0; yi < iterator; yi++)
	//   {
	//     can.block(x * VIEW_SCALE, y*VIEW_SCALE, VIEW_SCALE, VIEW_SCALE, col);
	//     y += yd;
	//     visited++;
	//   }
	//   yd = -yd;
	//
	//   iterator += 1;
	// } while(visited < num);
	//
	
	
	// // Speed test
	//
	// let num = 25000000;
	// let start = performance.now();
	// let i = num;
	// for (let t=0; t<num; t++)
	// {
	//   let xdiff = (i - num);
	//   let ydiff = (num - i);
	//   let squaredist = Math.sqrt((xdiff * xdiff) + (ydiff * ydiff));
	//   i++;
	// }
	// let ttaken = performance.now() - start;
	// console.log("Time taken: ", ttaken);
	// //
	
	
	var fpsText = document.getElementById("fps");
	
	var lastTime = 0,
	    frames = 0,
	    avFrames = 0;
	
	var world = new _World2.default({
	  size: SIZE,
	  spread: 1.0,
	  process: 'vertical',
	  type: _GoL2.default,
	  render: 'content',
	  scale: VIEW_SCALE
	});
	
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
	    //  fpsText.innerHTML = (avFrames / 10).toFixed(1) + " FPS";
	    frames = 0;
	    avFrames = 0;
	  }
	
	  world.render();
	  window.requestAnimationFrame(render);
	}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Renderer2d = __webpack_require__(2);
	
	var _Renderer2d2 = _interopRequireDefault(_Renderer2d);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var World = function () {
	  function World(options) {
	    _classCallCheck(this, World);
	
	    this.size = options.size; //cells, square
	    this.data = null;
	    this.ptype = {};
	
	    this.ptype['vertical'] = this.vertical;
	    this.ptype['swirl'] = this.swirl;
	
	    this.renderer = new _Renderer2d2.default(options.render);
	    this.renderer.scale = options.scale;
	
	    this.evolve = this.ptype[options.process];
	
	    this.init(options.type, options.spread);
	  }
	
	  _createClass(World, [{
	    key: 'init',
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
	    key: 'render',
	    value: function render() {
	      this.renderer.render(this.data);
	    }
	  }, {
	    key: 'neighbourhood',
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
	    key: 'wrap',
	    value: function wrap(v) {
	      if (v < 0) return v + this.size;
	      if (v > this.size - 1) return v - this.size;
	      return v;
	    }
	  }, {
	    key: 'array2d',
	    value: function array2d(size) {
	      for (var d = []; d.length < size; d.push([])) {}
	      return d;
	    }
	
	    // makes very little difference :/
	
	  }, {
	    key: 'swirl',
	    value: function swirl() {
	      var next = this.array2d(this.size);
	      var num = this.size * this.size + this.size * 2;
	      var x = Math.round(this.size / 2);
	      var y = Math.round(this.size / 2);
	      var xd = 1,
	          yd = 1;
	      var visited = 0;
	
	      var iterator = 1;
	      do {
	        for (var xi = 0; xi < iterator; xi++) {
	          //can.block(x * VIEW_SCALE, y*VIEW_SCALE, VIEW_SCALE, VIEW_SCALE, col);
	          if (this.data[y][x]) next[y][x] = this.data[y][x].mutate(this.neighbourhood(x, y));
	
	          x += xd;
	          visited++;
	          if (x < 0 || x > this.size - 1) break;
	        }
	        xd = -xd;
	
	        for (var yi = 0; yi < iterator; yi++) {
	
	          //can.block(x * VIEW_SCALE, y*VIEW_SCALE, VIEW_SCALE, VIEW_SCALE, col);
	          if (this.data[y][x]) next[y][x] = this.data[y][x].mutate(this.neighbourhood(x, y));
	
	          y += yd;
	          visited++;
	          if (y < 0 || y > this.size - 1) break;
	        }
	        yd = -yd;
	
	        iterator += 1;
	      } while (visited < num);
	
	      this.data = next;
	    }
	  }, {
	    key: 'vertical',
	    value: function vertical() {
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
	    key: 'prepare',
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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 3 */
/***/ (function(module, exports) {

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

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 5 */
/***/ (function(module, exports) {

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

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 7 */
/***/ (function(module, exports) {

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

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDg2NGU3MGUxYzZkZDhkOWFiNTkiLCJ3ZWJwYWNrOi8vLy4vMmQvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi8yZC9jb3JlL1dvcmxkLmpzIiwid2VicGFjazovLy8uLzJkL2NvcmUvUmVuZGVyZXIyZC5qcyIsIndlYnBhY2s6Ly8vLi9zaGFyZWQvQ2FudmFzMmQuanMiLCJ3ZWJwYWNrOi8vLy4vMmQvY2VsbHMvR29MLmpzIiwid2VicGFjazovLy8uLzJkL2NlbGxzL0NlbGwuanMiLCJ3ZWJwYWNrOi8vLy4vMmQvY2VsbHMvRmxvb2QuanMiLCJ3ZWJwYWNrOi8vLy4vMmQvY2VsbHMvVXRpbC5qcyIsIndlYnBhY2s6Ly8vLi8yZC9jZWxscy9CdXJyb3cuanMiLCJ3ZWJwYWNrOi8vLy4vMmQvY2VsbHMvQmx1ci5qcyIsIndlYnBhY2s6Ly8vLi8yZC9jZWxscy9Tbm93LmpzIl0sIm5hbWVzIjpbIlNJWkUiLCJWSUVXX1NDQUxFIiwiV09STERfRlJBTUVfUkFURSIsImZwc1RleHQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwibGFzdFRpbWUiLCJmcmFtZXMiLCJhdkZyYW1lcyIsIndvcmxkIiwic2l6ZSIsInNwcmVhZCIsInByb2Nlc3MiLCJ0eXBlIiwicmVuZGVyIiwic2NhbGUiLCJ3aW5kb3ciLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJzZXRJbnRlcnZhbCIsImV2b2x2ZSIsInRpbWVOb3ciLCJwZXJmb3JtYW5jZSIsIm5vdyIsInRpbWVUYWtlbiIsIldvcmxkIiwib3B0aW9ucyIsImRhdGEiLCJwdHlwZSIsInZlcnRpY2FsIiwic3dpcmwiLCJyZW5kZXJlciIsImluaXQiLCJDZWxsVHlwZSIsImFycmF5MmQiLCJpIiwieSIsIngiLCJ0ZXN0IiwiTWF0aCIsInJhbmRvbSIsInIiLCJyYWRpdXMiLCJudW0iLCJ2eCIsInZ5IiwibiIsImwiLCJpeSIsIml4Iiwid3JhcCIsInB1c2giLCJjZWxscyIsImxpbmVhciIsInN1YmplY3QiLCJ2IiwiZCIsImxlbmd0aCIsIm5leHQiLCJyb3VuZCIsInhkIiwieWQiLCJ2aXNpdGVkIiwiaXRlcmF0b3IiLCJ4aSIsIm11dGF0ZSIsIm5laWdoYm91cmhvb2QiLCJ5aSIsInByZXBhcmUiLCJSZW5kZXJlcjJkIiwiZWxlbWVudCIsImNhbnZhczJkIiwidyIsImgiLCJyZXNpemUiLCJjbGVhciIsImNvbCIsInNoYWRlciIsImJsb2NrIiwiQ2FudmFzMmQiLCJwYXJlbnQiLCJjcmVhdGVFbGVtZW50IiwiYXBwZW5kQ2hpbGQiLCJjb250ZXh0IiwiZ2V0Q29udGV4dCIsImMiLCJ0IiwiYmVnaW5QYXRoIiwicmVjdCIsImZpbGxTdHlsZSIsImZpbGwiLCJzeCIsInN5Iiwic3ciLCJzaCIsImR4IiwiZHkiLCJkdyIsImRoIiwiZHJhd0ltYWdlIiwiY2FudmFzIiwid2lkdGgiLCJoZWlnaHQiLCJjbGllbnRXaWR0aCIsImNsaWVudEhlaWdodCIsIkFMSVZFIiwiREVBRCIsInBhbGV0dGUiLCJHYW1lT2ZMaWZlIiwiYWxpdmUiLCJ1bmRlZmluZWQiLCJudW1MaXZlTmVpZ2hib3VycyIsIm1lIiwibmV3U3RhdGUiLCJ2YWx1ZSIsIkNlbGwiLCJuZWlnaGJvdXJzIiwic3VtIiwiTUFYX1ZBTFVFUyIsIlIiLCJHIiwiQiIsIlJFRFMiLCJtYXAiLCJlIiwiR1JFRU5TIiwiQkxVRVMiLCJGbG9vZCIsInN0YXRlIiwiZmxvb3IiLCJpbGluZXJwIiwiZW50aXR5IiwiY2hhbmdlIiwibmMiLCJhdmVyYWdlVmFsdWVOZWlnaGJvdXJzIiwiYWJzIiwiVXRpbCIsInZhbHVlcyIsInBvc2l0aW9uIiwicCIsImkxIiwiaTIiLCJxIiwiQnVycm93Iiwib3BlbiIsIndhc09wZW4iLCJCbHVyIiwiYXYiLCJid3BhbGV0dGUiLCJTbm93IiwicGFzcyIsInNub3dpbmciLCJzdGFydFNub3dpbmciXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVB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SUEsS0FBS3VELFNBQVQsRUFBb0IsT0FBTyxLQUFLa0IsS0FBWjtBQUNwQixZQUFLQSxLQUFMLEdBQWF6RSxDQUFiO0FBQ0Q7Ozs0QkFFTTRFLE0sRUFDUDtBQUNFLFdBQUksS0FBS29CLE9BQVQsRUFDQTtBQUNFLGNBQUtyQyxLQUFMLENBQVksS0FBS0EsS0FBTCxLQUFlM0UsS0FBS29CLEtBQUwsQ0FBV3BCLEtBQUtDLE1BQUwsS0FBZ0IsQ0FBM0IsQ0FBM0I7QUFDQTtBQUNBLGFBQUksS0FBSzBFLEtBQUwsS0FBZSxDQUFuQixFQUNBO0FBQ0lpQixrQkFBTy9FLEtBQVAsQ0FBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CbUcsT0FBbkIsR0FBNkIsSUFBN0I7QUFDQXBCLGtCQUFPL0UsS0FBUCxDQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUI4RCxLQUFuQixDQUF5QixLQUFLQSxLQUFMLEtBQWUsQ0FBeEM7QUFDQSxnQkFBS0EsS0FBTCxDQUFXSSxVQUFYO0FBQ0g7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRDs7QUFFRCxjQUFPLElBQVA7QUFFRDs7Ozs7O0FBSUgrQixNQUFLL0csSUFBTCxHQUFZLFVBQUNELENBQUQsRUFBSUQsQ0FBSixFQUFPb0MsQ0FBUCxFQUFVQyxDQUFWLEVBQWdCO0FBQzFCLFVBQU9yQyxLQUFLLENBQVo7QUFDQTtBQUNELEVBSEQ7O21CQUtlaUgsSSIsImZpbGUiOiIyZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA0ODY0ZTcwZTFjNmRkOGQ5YWI1OSIsIlxuXG5pbXBvcnQgV29ybGQgICAgICAgIGZyb20gJy4vY29yZS9Xb3JsZC5qcyc7XG5pbXBvcnQgR2FtZU9mTGlmZSAgIGZyb20gJy4vY2VsbHMvR29MJztcbmltcG9ydCBGbG9vZCAgICAgICAgZnJvbSAnLi9jZWxscy9GbG9vZCc7XG5pbXBvcnQgQnVycm93ICAgICAgIGZyb20gJy4vY2VsbHMvQnVycm93JztcbmltcG9ydCBCbHVyICAgICAgICAgZnJvbSAnLi9jZWxscy9CbHVyJztcbmltcG9ydCBTbm93ICAgICAgICAgZnJvbSAnLi9jZWxscy9Tbm93Jztcbi8vaW1wb3J0IFJlbmRlcmVyICAgICBmcm9tICcuL1JlbmRlcmVyMmQnO1xuLy9pbXBvcnQgQ2FudmFzMmQgZnJvbSAnLi4vc2hhcmVkL0NhbnZhczJkJztcblxuLy8gXCJib2lkc1wiXG5cbmNvbnN0IFNJWkUgPSA1MDsgLy8gY2VsbHNcbmNvbnN0IFZJRVdfU0NBTEUgPSA4O1xuY29uc3QgV09STERfRlJBTUVfUkFURSA9IDMwO1xuLy9cbi8vIGxldCBjYW4gPSBuZXcgQ2FudmFzMmQoXCJjb250ZW50XCIpO1xuLy8gY2FuLnJlc2l6ZShTSVpFICogVklFV19TQ0FMRSwgU0laRSAqIFZJRVdfU0NBTEUpO1xuLy8gY2FuLmNsZWFyKCk7XG4vLyAvL2Nhbi5maXR3aW5kb3coKTtcbi8vXG4vLyBsZXQgY29scyA9IFtcbi8vICAgWzAsMCwwXSxcbi8vICAgWzI1NSwwLDBdLFxuLy8gICBbMCwyNTUsMF0sXG4vLyAgIFswLDAsMjU1XSxcbi8vICAgWzI1NSwyNTUsMF0sXG4vLyAgIFsyNTUsMCwyNTVdLFxuLy8gICBbMCwyNTUsMjU1XSxcbi8vICAgWzEyOCwwLDBdLFxuLy8gICBbMCwxMjgsMF0sXG4vLyAgIFswLDAsMTI4XSxcbi8vICAgWzEyOCwxMjgsMF0sXG4vLyAgIFswLDEyOCwxMjhdLFxuLy8gICBbMTI4LDAsMTI4XVxuLy8gXVxuLy9cbi8vXG4vLyBsZXQgbnVtID0gU0laRSAqIFNJWkU7XG4vLyBsZXQgeCA9IE1hdGgucm91bmQoU0laRSAvIDIpO1xuLy8gbGV0IHkgPSBNYXRoLnJvdW5kKFNJWkUgLyAyKTtcbi8vIGxldCB4ZCA9IDEsIHlkID0gMTtcbi8vIGxldCBvbnggPSB0cnVlO1xuLy8gbGV0IGNvdW50ZG93biA9IDE7XG4vLyBsZXQgaXRlcmF0aW9ucyA9IDE7XG4vLyBsZXQgZGlyID0gMTtcbi8vIGxldCBpbmMgPSAxO1xuLy8gbGV0IGNudW0gPSAwO1xuLy8gbGV0IHZpc2l0ZWQgPSAwO1xuLy9cbi8vIGxldCBpdGVyYXRvciA9IDE7XG4vLyBkb1xuLy8ge1xuLy9cbi8vICAgbGV0IGNvbCA9IGNvbHNbY251bSAlIDEzXTtcbi8vICAgY251bSsrXG4vLyAgIC8vIC8vIE1vdmUgeCAgbG9vcFxuLy8gICBjb25zb2xlLmxvZyhgTW92aW5nIHggJHtpdGVyYXRvcn0gcGxhY2VzICR7eGQ9PTE/Jz4nOic8J31gKTtcbi8vICAgZm9yIChsZXQgeGk9MDsgeGkgPCBpdGVyYXRvcjsgeGkrKylcbi8vICAge1xuLy8gICAgIGNhbi5ibG9jayh4ICogVklFV19TQ0FMRSwgeSpWSUVXX1NDQUxFLCBWSUVXX1NDQUxFLCBWSUVXX1NDQUxFLCBjb2wpO1xuLy8gICAgIHggKz0geGQ7XG4vLyAgICAgdmlzaXRlZCsrO1xuLy8gICB9XG4vLyAgIHhkID0gLXhkO1xuLy8gICAvLyAvLyBjaGFuZ2UgZGlyZWN0aW9uXG4vLyAgIC8vXG4vLyAgIGNvbCA9IGNvbHNbKGNudW0rKyklMTNdO1xuLy8gICBjb25zb2xlLmxvZyhgTW92aW5nIHkgJHtpdGVyYXRvcn0gcGxhY2VzICR7eWQ9PTE/J3YnOideJ31gKTtcbi8vICAgZm9yIChsZXQgeWk9MDsgeWkgPCBpdGVyYXRvcjsgeWkrKylcbi8vICAge1xuLy8gICAgIGNhbi5ibG9jayh4ICogVklFV19TQ0FMRSwgeSpWSUVXX1NDQUxFLCBWSUVXX1NDQUxFLCBWSUVXX1NDQUxFLCBjb2wpO1xuLy8gICAgIHkgKz0geWQ7XG4vLyAgICAgdmlzaXRlZCsrO1xuLy8gICB9XG4vLyAgIHlkID0gLXlkO1xuLy9cbi8vICAgaXRlcmF0b3IgKz0gMTtcbi8vIH0gd2hpbGUodmlzaXRlZCA8IG51bSk7XG4vL1xuXG5cblxuLy8gLy8gU3BlZWQgdGVzdFxuLy9cbi8vIGxldCBudW0gPSAyNTAwMDAwMDtcbi8vIGxldCBzdGFydCA9IHBlcmZvcm1hbmNlLm5vdygpO1xuLy8gbGV0IGkgPSBudW07XG4vLyBmb3IgKGxldCB0PTA7IHQ8bnVtOyB0KyspXG4vLyB7XG4vLyAgIGxldCB4ZGlmZiA9IChpIC0gbnVtKTtcbi8vICAgbGV0IHlkaWZmID0gKG51bSAtIGkpO1xuLy8gICBsZXQgc3F1YXJlZGlzdCA9IE1hdGguc3FydCgoeGRpZmYgKiB4ZGlmZikgKyAoeWRpZmYgKiB5ZGlmZikpO1xuLy8gICBpKys7XG4vLyB9XG4vLyBsZXQgdHRha2VuID0gcGVyZm9ybWFuY2Uubm93KCkgLSBzdGFydDtcbi8vIGNvbnNvbGUubG9nKFwiVGltZSB0YWtlbjogXCIsIHR0YWtlbik7XG4vLyAvL1xuXG5cblxubGV0IGZwc1RleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZwc1wiKTtcblxubGV0IGxhc3RUaW1lID0gMCwgZnJhbWVzID0gMCwgYXZGcmFtZXMgPSAwO1xuXG5sZXQgd29ybGQgPSBuZXcgV29ybGQoe1xuICBzaXplOiBTSVpFLFxuICBzcHJlYWQ6IDEuMCxcbiAgcHJvY2VzczogJ3ZlcnRpY2FsJyxcbiAgdHlwZTogR2FtZU9mTGlmZSxcbiAgcmVuZGVyOiAnY29udGVudCcsXG4gIHNjYWxlOiBWSUVXX1NDQUxFXG59KTtcblxuXG4vLyB3b3JsZC5ldm9sdmUoKTtcbi8vIHJlbmRlcmVyLnJlbmRlcih3b3JsZC5kYXRhKTtcbi8vXG4vLyBjb25zb2xlLmxvZyh3b3JsZC5kYXRhKTtcblxud2luZG93LndvcmxkID0gd29ybGQ7XG5cbndpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKTtcbndpbmRvdy5zZXRJbnRlcnZhbCgoKSA9PiB7IHdvcmxkLmV2b2x2ZSgpIH0sIDEwMDAgLyBXT1JMRF9GUkFNRV9SQVRFKTtcblxuZnVuY3Rpb24gcmVuZGVyKClcbntcbiAgbGV0IHRpbWVOb3cgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgbGV0IHRpbWVUYWtlbiA9IHRpbWVOb3cgLSBsYXN0VGltZTtcblxuICBhdkZyYW1lcyArPSAgMTAwMCAvIHRpbWVUYWtlbjtcbiAgbGFzdFRpbWUgPSB0aW1lTm93O1xuXG4gIGlmIChmcmFtZXMrKyA9PSAxMClcbiAge1xuICAvLyAgZnBzVGV4dC5pbm5lckhUTUwgPSAoYXZGcmFtZXMgLyAxMCkudG9GaXhlZCgxKSArIFwiIEZQU1wiO1xuICAgIGZyYW1lcyA9IDA7XG4gICAgYXZGcmFtZXMgPSAwO1xuICB9XG5cbiAgd29ybGQucmVuZGVyKCk7XG4gIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLzJkL21haW4uanMiLCJcbmltcG9ydCBSZW5kZXJlciAgICAgZnJvbSAnLi9SZW5kZXJlcjJkJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV29ybGRcbntcbiAgY29uc3RydWN0b3Iob3B0aW9ucylcbiAge1xuICAgIHRoaXMuc2l6ZSA9IG9wdGlvbnMuc2l6ZTsgLy9jZWxscywgc3F1YXJlXG4gICAgdGhpcy5kYXRhID0gbnVsbDtcbiAgICB0aGlzLnB0eXBlID0ge307XG5cbiAgICB0aGlzLnB0eXBlWyd2ZXJ0aWNhbCddID0gdGhpcy52ZXJ0aWNhbDtcbiAgICB0aGlzLnB0eXBlWydzd2lybCddID0gdGhpcy5zd2lybDtcblxuICAgIHRoaXMucmVuZGVyZXIgPSBuZXcgUmVuZGVyZXIob3B0aW9ucy5yZW5kZXIpO1xuICAgIHRoaXMucmVuZGVyZXIuc2NhbGUgPSBvcHRpb25zLnNjYWxlO1xuXG4gICAgdGhpcy5ldm9sdmUgPSB0aGlzLnB0eXBlW29wdGlvbnMucHJvY2Vzc107XG5cbiAgICB0aGlzLmluaXQob3B0aW9ucy50eXBlLCBvcHRpb25zLnNwcmVhZCk7XG4gIH1cblxuICBpbml0KENlbGxUeXBlLCBzcHJlYWQpXG4gIHtcbiAgICAvLyBDcmVhdGUgdGhlIGFycmF5OlxuICAgIHRoaXMuZGF0YSA9IHRoaXMuYXJyYXkyZCh0aGlzLnNpemUpO1xuICAgIGxldCBpID0gMDtcblxuICAgIGZvciAobGV0IHk9MDsgeTx0aGlzLnNpemU7IHkrKylcbiAgICB7XG4gICAgICBmb3IgKGxldCB4PTA7IHg8dGhpcy5zaXplOyB4KyspXG4gICAgICB7XG4gICAgICAgIC8vIERvZXMgQ2VsbFR5cGUgcHJvdmlkZSBhIHN0YXRpYyAndGVzdCdpbmcgZnVuY3Rpb24/XG4gICAgICAgIGlmIChDZWxsVHlwZS50ZXN0KVxuICAgICAgICB7XG4gICAgICAgICAgLy8gSXMgaXQgb2sgaWYgd2UgcGxhY2UgdGhlIGNlbGwgaGVyZT9cbiAgICAgICAgICAvL2lmICgpXG4gICAgICAgICAgaWYgKE1hdGgucmFuZG9tKCkgPD0gc3ByZWFkKVxuICAgICAgICAgICAgdGhpcy5kYXRhW3ldW3hdID0gbmV3IENlbGxUeXBlKFxuICAgICAgICAgICAgICBDZWxsVHlwZS50ZXN0KHgseSx0aGlzLnNpemUsIHRoaXMuc2l6ZSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKE1hdGgucmFuZG9tKCkgPD0gc3ByZWFkKVxuICAgICAgICAgICAgdGhpcy5kYXRhW3ldW3hdID0gbmV3IENlbGxUeXBlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZW5kZXIoKVxuICB7XG4gICAgdGhpcy5yZW5kZXJlci5yZW5kZXIodGhpcy5kYXRhKTtcbiAgfVxuXG4gIG5laWdoYm91cmhvb2QoeCwgeSwgcilcbiAge1xuICAgIGxldCByYWRpdXMgPSByIHx8IDE7XG4gICAgbGV0IG51bSA9IChyYWRpdXMgKiAyKSArIDE7XG5cbiAgICBsZXQgdnggPSB4IC0gcmFkaXVzO1xuICAgIGxldCB2eSA9IHkgLSByYWRpdXM7XG5cbiAgICBsZXQgbiA9IHRoaXMuYXJyYXkyZChudW0pO1xuICAgIGxldCBsID0gW107XG5cbiAgICBmb3IgKGxldCBpeT0wOyBpeTxudW07IGl5KyspXG4gICAge1xuICAgICAgdnggPSB4IC0gcmFkaXVzO1xuICAgICAgZm9yIChsZXQgaXg9MDsgaXg8bnVtOyBpeCsrKVxuICAgICAge1xuICAgICAgICBuW2l5XVtpeF0gPSB0aGlzLmRhdGFbdGhpcy53cmFwKHZ5KV1bdGhpcy53cmFwKHZ4KV07XG4gICAgICAgIGwucHVzaCh0aGlzLmRhdGFbdGhpcy53cmFwKHZ5KV1bdGhpcy53cmFwKHZ4KV0pO1xuICAgICAgICB2eCsrO1xuICAgICAgfVxuICAgICAgdnkrKztcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgY2VsbHM6IG4sXG4gICAgICBsaW5lYXI6IGwsXG4gICAgICByYWRpdXM6IHJhZGl1cyxcbiAgICAgIHN1YmplY3Q6IHRoaXMuZGF0YVt5XVt4XVxuICAgIH1cbiAgfVxuXG4gIHdyYXAodilcbiAge1xuICAgIGlmICggdiA8IDAgKSByZXR1cm4gdiArIHRoaXMuc2l6ZTtcbiAgICBpZiAoIHYgPiB0aGlzLnNpemUtMSkgcmV0dXJuIHYgLSB0aGlzLnNpemU7XG4gICAgcmV0dXJuIHY7XG4gIH1cblxuICBhcnJheTJkKHNpemUpXG4gIHtcbiAgICBmb3IgKHZhciBkPVtdOyBkLmxlbmd0aCA8IHNpemU7IGQucHVzaChbXSkpO1xuICAgIHJldHVybiBkO1xuICB9XG5cbiAgLy8gbWFrZXMgdmVyeSBsaXR0bGUgZGlmZmVyZW5jZSA6L1xuICBzd2lybCgpXG4gIHtcbiAgICBsZXQgbmV4dCA9IHRoaXMuYXJyYXkyZCh0aGlzLnNpemUpO1xuICAgIGxldCBudW0gPSAodGhpcy5zaXplICogdGhpcy5zaXplKSArICh0aGlzLnNpemUgKiAyKTtcbiAgICBsZXQgeCA9IE1hdGgucm91bmQodGhpcy5zaXplIC8gMik7XG4gICAgbGV0IHkgPSBNYXRoLnJvdW5kKHRoaXMuc2l6ZSAvIDIpO1xuICAgIGxldCB4ZCA9IDEsIHlkID0gMTtcbiAgICBsZXQgdmlzaXRlZCA9IDA7XG5cbiAgICBsZXQgaXRlcmF0b3IgPSAxO1xuICAgIGRvXG4gICAge1xuICAgICAgZm9yIChsZXQgeGk9MDsgeGkgPCBpdGVyYXRvcjsgeGkrKylcbiAgICAgIHtcbiAgICAgICAgLy9jYW4uYmxvY2soeCAqIFZJRVdfU0NBTEUsIHkqVklFV19TQ0FMRSwgVklFV19TQ0FMRSwgVklFV19TQ0FMRSwgY29sKTtcbiAgICAgICAgaWYgKHRoaXMuZGF0YVt5XVt4XSlcbiAgICAgICAgICBuZXh0W3ldW3hdID0gdGhpcy5kYXRhW3ldW3hdLm11dGF0ZSh0aGlzLm5laWdoYm91cmhvb2QoeCx5KSk7XG5cbiAgICAgICAgeCArPSB4ZDtcbiAgICAgICAgdmlzaXRlZCsrO1xuICAgICAgICBpZiAoeCA8IDAgfHwgeCA+IHRoaXMuc2l6ZS0xKSBicmVhaztcbiAgICAgIH1cbiAgICAgIHhkID0gLXhkO1xuXG4gICAgICBmb3IgKGxldCB5aT0wOyB5aSA8IGl0ZXJhdG9yOyB5aSsrKVxuICAgICAge1xuXG4gICAgICAgIC8vY2FuLmJsb2NrKHggKiBWSUVXX1NDQUxFLCB5KlZJRVdfU0NBTEUsIFZJRVdfU0NBTEUsIFZJRVdfU0NBTEUsIGNvbCk7XG4gICAgICAgIGlmICh0aGlzLmRhdGFbeV1beF0pXG4gICAgICAgICAgbmV4dFt5XVt4XSA9IHRoaXMuZGF0YVt5XVt4XS5tdXRhdGUodGhpcy5uZWlnaGJvdXJob29kKHgseSkpO1xuXG4gICAgICAgIHkgKz0geWQ7XG4gICAgICAgIHZpc2l0ZWQrKztcbiAgICAgICAgaWYgKHkgPCAwIHx8IHkgPiB0aGlzLnNpemUtMSkgYnJlYWs7XG4gICAgICB9XG4gICAgICB5ZCA9IC15ZDtcblxuICAgICAgaXRlcmF0b3IgKz0gMTtcbiAgICB9IHdoaWxlKHZpc2l0ZWQgPCBudW0pO1xuXG4gICAgdGhpcy5kYXRhID0gbmV4dDtcbiAgfVxuXG4gIHZlcnRpY2FsKClcbiAge1xuICAgIGxldCBuZXh0ID0gdGhpcy5hcnJheTJkKHRoaXMuc2l6ZSk7XG5cbiAgICB0aGlzLnByZXBhcmUoKTtcblxuICAgIGZvciAobGV0IHk9MDsgeTx0aGlzLnNpemU7IHkrKylcbiAgICB7XG4gICAgICBmb3IgKGxldCB4PTA7IHg8dGhpcy5zaXplOyB4KyspXG4gICAgICB7XG4gICAgICAgIGlmICh0aGlzLmRhdGFbeV1beF0pXG4gICAgICAgICAgbmV4dFt5XVt4XSA9IHRoaXMuZGF0YVt5XVt4XS5tdXRhdGUodGhpcy5uZWlnaGJvdXJob29kKHgseSkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuZGF0YSA9IG5leHQ7XG4gIH1cblxuXG4gIHByZXBhcmUoKVxuICB7XG4gICAgbGV0IG4gPSAwO1xuICAgIGZvciAobGV0IHk9MDsgeTx0aGlzLnNpemU7IHkrKylcbiAgICAgIGZvciAobGV0IHg9MDsgeDx0aGlzLnNpemU7IHgrKylcbiAgICAgICAgaWYgKHRoaXMuZGF0YVt5XVt4XSkgdGhpcy5kYXRhW3ldW3hdLnByZXBhcmUoKTtcblxuICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLzJkL2NvcmUvV29ybGQuanMiLCJcbmltcG9ydCBDYW52YXMyZCBmcm9tICcuLi8uLi9zaGFyZWQvQ2FudmFzMmQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZW5kZXJlcjJkXG57XG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQpXG4gIHtcbiAgICB0aGlzLmNhbnZhczJkID0gbmV3IENhbnZhczJkKGVsZW1lbnQpO1xuICAgIHRoaXMuc2NhbGUgPSAxO1xuICAgIHRoaXMuc2l6ZSA9IDE7XG4gIH1cblxuICByZXNpemUodywgaClcbiAge1xuICAgIHRoaXMuY2FudmFzMmQucmVzaXplKHcsIGgpO1xuICAgIHRoaXMuY2FudmFzMmQuY2xlYXIoKTtcbiAgfVxuXG4gIHJlbmRlcihkYXRhKVxuICB7XG5cbiAgICBpZiAoZGF0YS5sZW5ndGggIT0gdGhpcy5zaXplKVxuICAgIHtcbiAgICAgIHRoaXMuc2l6ZSA9IGRhdGEubGVuZ3RoO1xuICAgICAgdGhpcy5yZXNpemUodGhpcy5zaXplICogdGhpcy5zY2FsZSwgdGhpcy5zaXplICogdGhpcy5zY2FsZSk7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgeT0wOyB5PHRoaXMuc2l6ZTsgeSsrKVxuICAgIHtcbiAgICAgIGZvciAobGV0IHg9MDsgeDx0aGlzLnNpemU7IHgrKylcbiAgICAgIHtcbiAgICAgICAgaWYgKGRhdGFbeV1beF0pXG4gICAgICAgIHtcbiAgICAgICAgICBsZXQgY29sID0gZGF0YVt5XVt4XS5zaGFkZXIoKTtcbiAgICAgICAgLy9sZXQgY29sID0gZGF0YVt5XVt4XSA/IFswLDAsMF0gOiBbMjU1LDI1NSwyNTVdO1xuICAgICAgICAgIHRoaXMuY2FudmFzMmQuYmxvY2soeCAqIHRoaXMuc2NhbGUsIHkgKiB0aGlzLnNjYWxlLCB0aGlzLnNjYWxlLCB0aGlzLnNjYWxlLCBjb2wpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vMmQvY29yZS9SZW5kZXJlcjJkLmpzIiwiXG5cbi8vIEJvaWxlcnBsYXRlIGZ1bmN0aW9ucyB0byB3cml0ZSB0byB0aGUgQ2FudmFzXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhbnZhczJkXG57XG4gIGNvbnN0cnVjdG9yKHBhcmVudClcbiAge1xuICAgIHRoaXMucGFyZW50ID0gdHlwZW9mIHBhcmVudCA9PSAnc3RyaW5nJyA/IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBhcmVudCkgOiBwYXJlbnQ7XG4gICAgdGhpcy5lbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICB0aGlzLnBhcmVudC5hcHBlbmRDaGlsZCh0aGlzLmVsZW1lbnQpO1xuICAgIHRoaXMuY29udGV4dCA9IHRoaXMuZWxlbWVudC5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgdGhpcy5jbGVhcigpO1xuXG4gIH1cblxuICBibG9jayh4LHksdyxoLGMpXG4gIHtcbiAgICBsZXQgdCA9IHRoaXMuY29udGV4dDtcbiAgICB0LmJlZ2luUGF0aCgpO1xuICAgIHQucmVjdCh4LCB5LCB3LCBoKTtcbiAgICB0LmZpbGxTdHlsZSA9IGMgPyBgcmdiKCR7Y1swXX0sJHtjWzFdfSwke2NbMl19KWAgOiBcImJsYWNrXCI7XG4gICAgdC5maWxsKCk7XG4gIH1cblxuICBzZWxmYmxpdChzeCwgc3ksIHN3LCBzaCwgZHgsIGR5LCBkdywgZGgpXG4gIHtcbiAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKHRoaXMuY29udGV4dC5jYW52YXMsIHN4LCBzeSwgc3csIHNoLCBkeCwgZHksIGR3LCBkaCk7XG4gIH1cblxuICBjbGVhcihjKVxuICB7XG4gICAgbGV0IHQgPSB0aGlzLmNvbnRleHQ7XG4gICAgdC5iZWdpblBhdGgoKTtcbiAgICB0LnJlY3QoMCwgMCwgdGhpcy5lbGVtZW50LndpZHRoLCB0aGlzLmVsZW1lbnQuaGVpZ2h0KTtcbiAgICB0LmZpbGxTdHlsZSA9IGMgPyBgcmdiKCR7Y1swXX0sJHtjWzFdfSwke2NbMl19KWAgOiBcIndoaXRlXCI7XG4gICAgdC5maWxsKCk7XG4gIH1cblxuICB3aWR0aCgpXG4gIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50LndpZHRoO1xuICB9XG5cbiAgaGVpZ2h0KClcbiAge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnQuaGVpZ2h0O1xuICB9XG5cbiAgZml0d2luZG93KClcbiAge1xuICAgIHRoaXMucmVzaXplKHRoaXMucGFyZW50LmNsaWVudFdpZHRoLCB0aGlzLnBhcmVudC5jbGllbnRIZWlnaHQpO1xuICB9XG5cbiAgcmVzaXplKHcsIGgpXG4gIHtcblxuICAgIHRoaXMuZWxlbWVudC53aWR0aCA9IHc7XG4gICAgdGhpcy5lbGVtZW50LmhlaWdodCA9IGg7XG5cbiAgICAvLyBkcmF3KClcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2hhcmVkL0NhbnZhczJkLmpzIiwiXG5pbXBvcnQgQ2VsbCBmcm9tICcuL0NlbGwnO1xuXG5jb25zdCBBTElWRSA9IDEsIERFQUQgPSAwO1xuXG5jb25zdCBwYWxldHRlID0gW1xuICBbMjU1LDI1NSwyNTVdLFxuICBbMCwwLDBdXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lT2ZMaWZlIGV4dGVuZHMgQ2VsbFxue1xuICBjb25zdHJ1Y3RvcigpXG4gIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuYWxpdmUgPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkpO1xuICB9XG5cbiAgc2hhZGVyKClcbiAgeyAgICBcbiAgICByZXR1cm4gcGFsZXR0ZVsgdGhpcy5hbGl2ZSBdO1xuICB9XG5cblxuICBldmFsdWF0ZSgpXG4gIHtcbiAgICByZXR1cm4gdGhpcy5hbGl2ZSA/IDEgOiAwO1xuICB9XG5cbiAgLy8gLy8gR2V0cyBvciBhc3NpZ25zIGEgJ3ZhbHVlJyB0byBmZWVkYmFjayBpbnRvIHRoZSBDZWxsICdpbnRlcmZhY2UnIGNvdW50aW5nIG1ldGhvZFxuICB2YWx1ZSh2KVxuICB7XG4gICAgaWYgKHYgPT09IHVuZGVmaW5lZCkgcmV0dXJuIHRoaXMuYWxpdmUgPyAxIDogMDtcbiAgICB0aGlzLmFsaXZlID0gKHYgPT0gMCkgPyBERUFEIDogQUxJVkU7XG4gIH1cblxuXG4gIG11dGF0ZShjZWxscylcbiAge1xuICAgIGxldCBuID0gdGhpcy5udW1MaXZlTmVpZ2hib3VycyhjZWxscyk7XG4gICAgbGV0IG1lID0gbmV3IEdhbWVPZkxpZmUoKTtcbiAgICBsZXQgbmV3U3RhdGUgPSBERUFEO1xuXG4gICAgaWYgKGNlbGxzLnN1YmplY3QuYWxpdmUgJiYgbiA8IDIpXG4gICAgICBuZXdTdGF0ZSA9IERFQUQ7XG4gICAgZWxzZSBpZiAoY2VsbHMuc3ViamVjdC5hbGl2ZSAmJiBuID4gMylcbiAgICAgIG5ld1N0YXRlID0gREVBRDtcbiAgICBlbHNlIGlmICghY2VsbHMuc3ViamVjdC5hbGl2ZSAmJiBuID09IDMpXG4gICAgICBuZXdTdGF0ZSA9IEFMSVZFO1xuICAgIGVsc2VcbiAgICAgIG5ld1N0YXRlID0gY2VsbHMuc3ViamVjdC52YWx1ZSgpO1xuXG4gICAgbWUudmFsdWUobmV3U3RhdGUpO1xuXG4gICAgcmV0dXJuIG1lO1xuICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLzJkL2NlbGxzL0dvTC5qcyIsIlxuLy8gVGhpcyBpcyB0aGUgYmFzZSB0eXBlIG9mIENlbGwgdXNlZCBmb3IgZXZlcnkgQ0EgdHlwZS5cbi8vIEl0J3MgbW9yZSBvZiBhIGNsYXNzaWNhbCBcIkludGVyZmFjZVwiIHRoYW4gYSBjbGFzcyBJIHN1cHBvc2VcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2VsbFxue1xuICBjb25zdHJ1Y3RvcigpXG4gIHtcblxuICB9XG5cbiAgcHJlcGFyZSgpXG4gIHtcblxuICB9XG5cbiAgbXV0YXRlKG5laWdoYm91cnMpXG4gIHtcblxuICB9XG5cbiAgc2hhZGVyKClcbiAge1xuXG4gIH1cblxuXG4gIHZhbHVlKClcbiAge1xuXG4gIH1cblxuICBudW1MaXZlTmVpZ2hib3VycyhuKVxuICB7XG4gICAgbGV0IG51bSA9IDA7XG5cbiAgICBmb3IgKGxldCB5ID0gMDsgeTxuLmNlbGxzLmxlbmd0aDsgeSsrKVxuICAgICAgZm9yIChsZXQgeCA9IDA7IHg8bi5jZWxsc1t5XS5sZW5ndGg7IHgrKylcbiAgICAgICAgaWYgKG4uY2VsbHNbeV1beF0pIGlmIChuLmNlbGxzW3ldW3hdLnZhbHVlKCkgPiAwKSBudW0gKys7XG5cbiAgICAvLyBkb24ndCBpbmNsdWRlICd1cycgaW4gdGhlIGNvdW50IVxuICAgIHJldHVybiBudW0gLSAobi5zdWJqZWN0LnZhbHVlKCkgPiAwID8gMSA6IDApO1xuICB9XG5cbiAgbnVtTmVpZ2hib3Vyc1dpdGhWYWx1ZShuLCB2KVxuICB7XG4gICAgbGV0IG51bSA9IDA7XG5cbiAgICBmb3IgKGxldCB0PTA7IHQ8bi5saW5lYXIubGVuZ3RoOyB0KyspXG4gICAge1xuICAgICAgaWYgKG4ubGluZWFyW3RdKVxuICAgICAgICBpZiAobi5saW5lYXJbdF0udmFsdWUoKSA9PSB2KSBudW0rKztcbiAgICB9XG4gICAgcmV0dXJuIG51bTtcbiAgfVxuXG4gIGF2ZXJhZ2VWYWx1ZU5laWdoYm91cnMobilcbiAge1xuICAgIGxldCBzdW0gPSAwO1xuICAgIGZvciAobGV0IHQ9MDsgdDxuLmxpbmVhci5sZW5ndGg7IHQrKylcbiAgICB7XG4gICAgICBpZiAobi5saW5lYXJbdF0pXG4gICAgICB7XG4gICAgICAgIHN1bSArPSBuLmxpbmVhclt0XS52YWx1ZSgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHN1bSAtPSBuLnN1YmplY3QudmFsdWUoKTtcblxuICAgIHJldHVybiBzdW0gLyAobi5saW5lYXIubGVuZ3RoLTEpO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi8yZC9jZWxscy9DZWxsLmpzIiwiXG5pbXBvcnQgQ2VsbCBmcm9tICcuL0NlbGwnO1xuaW1wb3J0IFV0aWwgZnJvbSAnLi9VdGlsJztcblxuY29uc3QgTUFYX1ZBTFVFUyA9IDMyO1xuY29uc3QgUj0wLCBHPTEsIEI9Mjtcbi8vXG4vLyBjb25zdCBwYWxldHRlID0gW1xuLy8gICBbMTAsIDI1NSwgOTZdLFxuLy8gICBbMjU1LCAzMiwgMjU1XSxcbi8vICAgWzE3MiwgNTQsIDI1NV0sXG4vLyAgIFszMiwgMzIsIDI1NV0sXG4vLyAgIFszMiwgMjU1LCAyNTVdLFxuLy8gICBbMzIsIDMyLCAyNTVdLFxuLy8gICBbMjU1LCAyNTUsIDMyXVxuLy8gXTtcblxuLy8gbmljZSBjbG91ZHNcbi8vIGNvbnN0IHBhbGV0dGUgPSBbXG4vLyAgIFs1MywgMTc3LCAyNTVdLFxuLy8gICBbMjAwLCAyMDAsIDIxNV0sXG4vLyAgIFsyNTUsIDI1NSwgMjU1XVxuLy8gXTtcblxuLy8gZmlyZSBpc2hcbi8vIGNvbnN0IHBhbGV0dGUgPSBbXG4vLyAgIFsyNTUsIDAsIDBdLFxuLy8gICBbMjU1LCAyNTUsIDBdLFxuLy8gICBbMjU1LCAyNTUsIDIyMF1cbi8vIF07XG5cbmNvbnN0IHBhbGV0dGUgPSBbXG4gIFsyNTUsMCwwLDFdLCBbMjU1LDk2LDAsMV0sIFsyNTUsMTkxLDAsMV0sIFsyMjMsMjU1LDAsMV0sXG4gIFsxMjgsMjU1LDAsMV0sIFszMiwyNTUsMCwxXSwgWzAsMjU1LDY0LDFdLCBbMCwyNTUsMTU5LDFdLFxuICBbMCwyNTUsMjU1LDFdLCBbMCwxNTksMjU1LDFdLCBbMCw2NCwyNTUsMV0sIFszMiwwLDI1NSwxXSxcbiAgWzEyNywwLDI1NSwxXSwgWzIyMywwLDI1NSwxXSwgWzI1NSwwLDE5MSwxXSwgWzI1NSwwLDk2LDFdXG5dO1xuXG5jb25zdCBSRURTID0gcGFsZXR0ZS5tYXAoKGUpID0+IHsgcmV0dXJuIGVbUl0gfSk7XG5jb25zdCBHUkVFTlMgPSBwYWxldHRlLm1hcCgoZSkgPT4geyByZXR1cm4gZVtHXSB9KTtcbmNvbnN0IEJMVUVTID0gcGFsZXR0ZS5tYXAoKGUpID0+IHsgcmV0dXJuIGVbQl0gfSk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZsb29kIGV4dGVuZHMgQ2VsbFxue1xuICBjb25zdHJ1Y3RvcigpXG4gIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuc3RhdGUgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBNQVhfVkFMVUVTKTtcbiAgfVxuXG4gIHNoYWRlcigpXG4gIHtcbiAgICBsZXQgaSA9IHRoaXMudmFsdWUoKSAvIE1BWF9WQUxVRVM7XG5cbiAgICByZXR1cm4gW1xuICAgICAgVXRpbC5pbGluZXJwKFJFRFMsIGkpICYgMHhmZixcbiAgICAgIFV0aWwuaWxpbmVycChHUkVFTlMsIGkpICYgMHhmZixcbiAgICAgIFV0aWwuaWxpbmVycChCTFVFUywgaSkgJiAweGZmXG4gICAgXTtcblxuICB9XG5cbiAgLy8gLy8gR2V0cyBvciBhc3NpZ25zIGEgJ3ZhbHVlJyB0byBmZWVkYmFjayBpbnRvIHRoZSBDZWxsICdpbnRlcmZhY2UnIGNvdW50aW5nIG1ldGhvZFxuICB2YWx1ZSh2KVxuICB7XG4gICAgaWYgKHYgPT0gdW5kZWZpbmVkKSByZXR1cm4gdGhpcy5zdGF0ZTtcbiAgICB0aGlzLnN0YXRlID0gdjtcbiAgfVxuXG5cbiAgbXV0YXRlKGVudGl0eSlcbiAge1xuXG4gICAgbGV0IG5leHQgPSAodGhpcy52YWx1ZSgpICsgMSArIChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAzKSkpICUgTUFYX1ZBTFVFUztcbiAgICAvLyh0aGlzLnZhbHVlKCkgKyAoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNSkpKSAlIE1BWF9WQUxVRVM7XG5cbiAgICBsZXQgY2hhbmdlID0gZmFsc2U7XG4gICAgZm9yIChsZXQgdD0wOyB0PGVudGl0eS5saW5lYXIubGVuZ3RoOyB0KyspXG4gICAge1xuICAgICAgaWYgKGVudGl0eS5saW5lYXJbdF0pXG4gICAgICAgIGNoYW5nZSA9IGNoYW5nZSB8fCBlbnRpdHkubGluZWFyW3RdLnZhbHVlKCkgPT09IG5leHQ7XG4gICAgfVxuXG4gICAgaWYgKCFjaGFuZ2UpXG4gICAge1xuICAgICAgbGV0IG5jID0gdGhpcy5hdmVyYWdlVmFsdWVOZWlnaGJvdXJzKGVudGl0eSk7XG4gICAgICBpZiAoTWF0aC5hYnModGhpcy52YWx1ZSgpIC0gbmMpID09IDEpXG4gICAgICAgIHRoaXMudmFsdWUobmMpO1xuXG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZSlcbiAgICAgIHRoaXMudmFsdWUobmV4dCk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG5cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vMmQvY2VsbHMvRmxvb2QuanMiLCJcblxuY2xhc3MgVXRpbFxue1xuICBjb25zdHJ1Y3RvcigpXG4gIHtcblxuICB9XG5cbiAgLy8gTGluZWFybHkgaW50ZXJwb2xhdGVzIGJldHdlZW4gYW4gYXJyYXkgb2YgdmFsdWVzXG4gIC8vIGUuZy4gdmFsdWVzID0gWzUsIDEwLCAxXSwgcCA9IDAuLjFcblxuICBpbGluZXJwKHZhbHVlcywgcG9zaXRpb24pXG4gIHtcbiAgICBpZiAocG9zaXRpb24gPj0gMSkgcmV0dXJuIHZhbHVlc1t2YWx1ZXMubGVuZ3RoLTFdO1xuICAgIGlmIChwb3NpdGlvbiA8IDApIHJldHVybiB2YWx1ZXNbMF07XG5cbiAgICBsZXQgcCA9IHBvc2l0aW9uICogKHZhbHVlcy5sZW5ndGggLSAxKTtcblxuICAgIGxldCBpMSA9IE1hdGguZmxvb3IocCk7XG4gICAgbGV0IGkyID0gaTEgKyAxO1xuICAgIGxldCBxID0gcCAtIGkxO1xuXG4gICAgbGV0IHYgPSAodmFsdWVzW2kxXSAqICgxLXEpKSArICh2YWx1ZXNbaTJdICogKHEpKTtcblxuICAgIHJldHVybiBNYXRoLnJvdW5kKHYpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IChuZXcgVXRpbCgpKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLzJkL2NlbGxzL1V0aWwuanMiLCJcbmltcG9ydCBDZWxsIGZyb20gJy4vQ2VsbCc7XG5pbXBvcnQgVXRpbCBmcm9tICcuL1V0aWwnO1xuXG5jb25zdCBwYWxldHRlID0gW1xuICBbMjU1LDI1NSwyNTVdLFxuICBbMCwwLDBdXG5dO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJ1cnJvdyBleHRlbmRzIENlbGxcbntcbiAgY29uc3RydWN0b3IoKVxuICB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLm9wZW4gPSBNYXRoLnJhbmRvbSgpID4gMC40O1xuICB9XG5cbiAgcHJlcGFyZSgpXG4gIHtcbiAgICB0aGlzLndhc09wZW4gPSB0aGlzLm9wZW47XG4gIH1cblxuICBzaGFkZXIoKVxuICB7XG4gICAgcmV0dXJuIHBhbGV0dGUgWyB0aGlzLnZhbHVlKCkgXTtcbiAgfVxuXG5cbiAgdmFsdWUodilcbiAge1xuICAgIHJldHVybiB0aGlzLndhc09wZW4gPyAxIDogMDtcbiAgfVxuXG5cbiAgbXV0YXRlKGVudGl0eSlcbiAge1xuICAgIGxldCBudW0gPSB0aGlzLm51bUxpdmVOZWlnaGJvdXJzKGVudGl0eSk7XG4gICAgdGhpcy5vcGVuID0gKHRoaXMud2FzT3BlbiAmJiBudW0gPj00KSB8fCBudW0gPj0gNjtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vMmQvY2VsbHMvQnVycm93LmpzIiwiXG5pbXBvcnQgQ2VsbCBmcm9tICcuL0NlbGwnO1xuaW1wb3J0IFV0aWwgZnJvbSAnLi9VdGlsJztcblxuY29uc3QgTUFYX1ZBTFVFUyA9IDMyO1xuY29uc3QgUj0wLEc9MSxCPTI7XG5jb25zdCBwYWxldHRlID0gW1xuICBbMCwwLDAsMV0sIFsyNTUsMCwwLDBdLCBbMjU1LDk2LDAsMV0sIFsyNTUsMTkxLDAsMV0sIFsyMjMsMjU1LDAsMV0sXG4gIFsxMjgsMjU1LDAsMV0sIFszMiwyNTUsMCwxXSwgWzAsMjU1LDY0LDFdLCBbMCwyNTUsMTU5LDFdLFxuICBbMCwyNTUsMjU1LDFdLCBbMCwxNTksMjU1LDFdLCBbMCw2NCwyNTUsMV0sIFszMiwwLDI1NSwxXSxcbiAgWzEyNywwLDI1NSwxXSwgWzIyMywwLDI1NSwxXSwgWzI1NSwwLDE5MSwxXSwgWzI1NSwwLDk2LDFdXG5dO1xuXG5cbmNvbnN0IFJFRFMgPSBwYWxldHRlLm1hcCgoZSkgPT4geyByZXR1cm4gZVtSXSB9KTtcbmNvbnN0IEdSRUVOUyA9IHBhbGV0dGUubWFwKChlKSA9PiB7IHJldHVybiBlW0ddIH0pO1xuY29uc3QgQkxVRVMgPSBwYWxldHRlLm1hcCgoZSkgPT4geyByZXR1cm4gZVtCXSB9KTtcblxuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJsdXIgZXh0ZW5kcyBDZWxsXG57XG4gIGNvbnN0cnVjdG9yKClcbiAge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5zdGF0ZSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIE1BWF9WQUxVRVMpO1xuICB9XG5cbiAgcHJlcGFyZSgpXG4gIHtcblxuICB9XG5cbiAgc2hhZGVyKClcbiAge1xuICAgIGxldCBpID0gdGhpcy5zdGF0ZSAvIE1BWF9WQUxVRVM7XG4gICAgcmV0dXJuIFtcbiAgICAgIFV0aWwuaWxpbmVycChSRURTLCBpKSAmIDB4ZmYsXG4gICAgICBVdGlsLmlsaW5lcnAoR1JFRU5TLCBpKSAmIDB4ZmYsXG4gICAgICBVdGlsLmlsaW5lcnAoQkxVRVMsIGkpICYgMHhmZlxuICAgIF07XG5cbiAgfVxuXG5cbiAgLy8gLy8gR2V0cyBvciBhc3NpZ25zIGEgJ3ZhbHVlJyB0byBmZWVkYmFjayBpbnRvIHRoZSBDZWxsICdpbnRlcmZhY2UnIGNvdW50aW5nIG1ldGhvZFxuICB2YWx1ZSh2KVxuICB7XG4gICAgaWYgKHYgPT0gdW5kZWZpbmVkKSByZXR1cm4gdGhpcy5zdGF0ZTtcbiAgICBpZiAodiA8IDApIHYrPSBNQVhfVkFMVUVTO1xuICAgIHRoaXMuc3RhdGUgPSBNYXRoLnJvdW5kKHYpO1xuICB9XG5cblxuICBtdXRhdGUoZW50aXR5KVxuICB7XG4gICAgLy8gaWYgKGVudGl0eS5jZWxsc1swXVsxXS52YWx1ZSgpID4gdGhpcy52YWx1ZSgpKVxuICAgIC8vIHtcbiAgICAvLyAgIGxldCB0ID0gdGhpcy52YWx1ZSgpO1xuICAgIC8vICAgdGhpcy52YWx1ZShlbnRpdHkuY2VsbHNbMF1bMV0udmFsdWUoKSk7XG4gICAgLy8gICBlbnRpdHkuY2VsbHNbMF1bMV0udmFsdWUodCk7XG4gICAgLy8gfSBlbHNlIHtcbiAgICAvLyAgIGxldCB0ID0gdGhpcy52YWx1ZSgpO1xuICAgIC8vICAgdGhpcy52YWx1ZShlbnRpdHkuY2VsbHNbMV1bMl0udmFsdWUoKSk7XG4gICAgLy8gICBlbnRpdHkuY2VsbHNbMV1bMl0udmFsdWUodCk7XG4gICAgLy8gfVxuICAgIGxldCBhdiA9IHRoaXMuYXZlcmFnZVZhbHVlTmVpZ2hib3VycyhlbnRpdHkpO1xuICAgIHRoaXMudmFsdWUoYXYpO1xuXG4gICAgLy8gaWYgKHRoaXMubnVtTmVpZ2hib3Vyc1dpdGhWYWx1ZShlbnRpdHksIDApID49IDIpXG4gICAgLy8ge1xuICAgIC8vICAgdGhpcy52YWx1ZShNQVhfVkFMVUVTLTEpO1xuICAgIC8vIH1cblxuICAgIC8vbGV0IGF2ID0gdGhpcy5hdmVyYWdlVmFsdWVOZWlnaGJvdXJzKGVudGl0eSkgKiAxLjA7XG5cblxuICAgIGlmIChNYXRoLnJhbmRvbSgpIDwgMC4wMSkgdGhpcy52YWx1ZSggMCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vMmQvY2VsbHMvQmx1ci5qcyIsIlxuaW1wb3J0IENlbGwgZnJvbSAnLi9DZWxsJztcbmltcG9ydCBVdGlsIGZyb20gJy4vVXRpbCc7XG5cbmNvbnN0IE1BWF9WQUxVRVMgPSAxNjtcblxuY29uc3QgcGFsZXR0ZSA9IFtcbiAgWzAsIDAsIDBdLFxuICBbMjU1LCAyNTUsIDI1NV1cbl07XG5cbmNvbnN0IGJ3cGFsZXR0ZSA9IFsgMCwgMjU1IF07XG5cbmNsYXNzIFNub3cgZXh0ZW5kcyBDZWxsXG57XG4gIGNvbnN0cnVjdG9yKHBhc3MpXG4gIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5zbm93aW5nID0gZmFsc2U7XG4gICAgdGhpcy52YWx1ZSgwKTtcblxuICAgIGlmIChwYXNzKVxuICAgICAgICB0aGlzLnN0YXJ0U25vd2luZygpO1xuICB9XG5cbiAgcHJlcGFyZSgpXG4gIHtcblxuICB9XG5cbiAgc3RhcnRTbm93aW5nKClcbiAge1xuICAgIHRoaXMuc25vd2luZyA9IHRydWU7XG4gICAgdGhpcy52YWx1ZSAoKE1hdGgucmFuZG9tKCkgPiAwLjYpID8gTUFYX1ZBTFVFUyA6IDApO1xuICB9XG5cbiAgc2hhZGVyKClcbiAge1xuICAgIGxldCBpID0gVXRpbC5pbGluZXJwKGJ3cGFsZXR0ZSwgdGhpcy52YWx1ZSgpIC8gTUFYX1ZBTFVFUyk7XG4gICAgcmV0dXJuIFsgaSwgaSwgaSBdO1xuXG4gICAgLy9yZXR1cm4gcGFsZXR0ZSBbIHRoaXMudmFsdWUoKSBdO1xuICB9XG5cbiAgdmFsdWUodilcbiAge1xuICAgIGlmICh2ID09IHVuZGVmaW5lZCkgcmV0dXJuIHRoaXMuc3RhdGU7XG4gICAgdGhpcy5zdGF0ZSA9IHY7XG4gIH1cblxuICBtdXRhdGUoZW50aXR5KVxuICB7XG4gICAgaWYgKHRoaXMuc25vd2luZylcbiAgICB7XG4gICAgICB0aGlzLnZhbHVlKCB0aGlzLnZhbHVlKCkgLSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAzKSk7XG4gICAgICAvL1xuICAgICAgaWYgKHRoaXMudmFsdWUoKSA8IDgpXG4gICAgICB7XG4gICAgICAgICAgZW50aXR5LmNlbGxzWzJdWzFdLnNub3dpbmcgPSB0cnVlO1xuICAgICAgICAgIGVudGl0eS5jZWxsc1syXVsxXS52YWx1ZSh0aGlzLnZhbHVlKCkgKyA0KTtcbiAgICAgICAgICB0aGlzLnZhbHVlKE1BWF9WQUxVRVMpO1xuICAgICAgfVxuICAgICAgLy9cbiAgICAgIC8vIGlmICh0aGlzLnZhbHVlKCkgPD0gMClcbiAgICAgIC8vIHtcbiAgICAgIC8vICAgdGhpcy52YWx1ZSgwKTtcbiAgICAgIC8vICAgdGhpcy5zbm93aW5nID0gZmFsc2U7XG4gICAgICAvLyB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgfVxuXG59XG5cblNub3cudGVzdCA9ICh4LCB5LCB3LCBoKSA9PiB7XG4gIHJldHVybiB5ID09IDA7XG4gIC8vcmV0dXJuIHRydWU7XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNub3c7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi8yZC9jZWxscy9Tbm93LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==