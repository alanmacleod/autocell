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
	
	var _SpatialGrid = __webpack_require__(12);
	
	var _SpatialGrid2 = _interopRequireDefault(_SpatialGrid);
	
	var _World = __webpack_require__(2);
	
	var _World2 = _interopRequireDefault(_World);
	
	var _GoL = __webpack_require__(5);
	
	var _GoL2 = _interopRequireDefault(_GoL);
	
	var _Flood = __webpack_require__(7);
	
	var _Flood2 = _interopRequireDefault(_Flood);
	
	var _Burrow = __webpack_require__(9);
	
	var _Burrow2 = _interopRequireDefault(_Burrow);
	
	var _Blur = __webpack_require__(10);
	
	var _Blur2 = _interopRequireDefault(_Blur);
	
	var _Snow = __webpack_require__(11);
	
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
	
	var g = new _SpatialGrid2.default(0, 0, 100, 100, 3);
	
	g.add({ x: 17, y: 17, id: 0 });
	g.add({ x: 18, y: 18, id: 1 });
	g.add({ x: 1, y: 1, id: 2 });
	g.add({ x: 2, y: 2, id: 3 });
	g.add({ x: 33, y: 33, id: 4 });
	g.add({ x: 66, y: 66, id: 4 });
	
	console.log(g.query(3, 3, 1000));
	
	// g.query(99, 99, 4);
	
	//console.log(g);
	//
	//
	//
	//
	// let fpsText = document.getElementById("fps");
	//
	// let lastTime = 0, frames = 0, avFrames = 0;
	//
	// let world = new World({
	//   size: SIZE,
	//   spread: 1.0,
	//   process: 'vertical',
	//   type: GameOfLife,
	//   render: 'content',
	//   scale: VIEW_SCALE
	// });
	//
	//
	// // world.evolve();
	// // renderer.render(world.data);
	// //
	// // console.log(world.data);
	//
	// window.world = world;
	//
	// window.requestAnimationFrame(render);
	// window.setInterval(() => { world.evolve() }, 1000 / WORLD_FRAME_RATE);
	//
	// function render()
	// {
	//   let timeNow = performance.now();
	//   let timeTaken = timeNow - lastTime;
	//
	//   avFrames +=  1000 / timeTaken;
	//   lastTime = timeNow;
	//
	//   if (frames++ == 10)
	//   {
	//   //  fpsText.innerHTML = (avFrames / 10).toFixed(1) + " FPS";
	//     frames = 0;
	//     avFrames = 0;
	//   }
	//
	//   world.render();
	//   window.requestAnimationFrame(render);
	// }

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Renderer2d = __webpack_require__(3);
	
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Canvas2d = __webpack_require__(4);
	
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
/* 4 */
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Cell2 = __webpack_require__(6);
	
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
/* 6 */
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Cell2 = __webpack_require__(6);
	
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
/* 8 */
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Cell2 = __webpack_require__(6);
	
	var _Cell3 = _interopRequireDefault(_Cell2);
	
	var _Util = __webpack_require__(8);
	
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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Cell2 = __webpack_require__(6);
	
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

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Cell2 = __webpack_require__(6);
	
	var _Cell3 = _interopRequireDefault(_Cell2);
	
	var _Util = __webpack_require__(8);
	
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

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	//
	// Alan MacLeod 04-May-2017
	//
	// Grid.js
	// Cheap *dynamic* spatial index.
	// Splits an area into a simple grid, each cell keeps track of a list of objects
	// Generally performs better on modern hardware compared to reconstructing a quadtree etc
	// add() or move() objects. Performce nearest neighbour search with query()
	// Worst case performance O(n) if all objects bunched into one cell (T_T)
	
	var SpatialGrid = function () {
	  function SpatialGrid(minx, miny, maxx, maxy, cells) {
	    _classCallCheck(this, SpatialGrid);
	
	    this.grid = this.array2d(cells, cells);
	
	    this.width = maxx - minx;
	    this.height = maxy - miny;
	    this.numcells = cells;
	    this.xcellsize = this.width / cells;
	    this.ycellsize = this.height / cells;
	  }
	
	  // Expects: `item` contains `x` and `y` properties
	
	
	  _createClass(SpatialGrid, [{
	    key: "add",
	    value: function add(item) {
	      // Which cell
	      var cellx = this.wrap((item.x - this.mod(item.x, this.xcellsize)) / this.xcellsize);
	      var celly = this.wrap((item.y - this.mod(item.y, this.ycellsize)) / this.ycellsize);
	
	      var cell = this.grid[celly][cellx] || [];
	
	      if (!cell.includes(item)) cell.push(item);
	
	      this.grid[celly][cellx] = cell;
	    }
	
	    // FROM(fx,fy) -> TO(tx,ty)
	
	  }, {
	    key: "move",
	    value: function move(item, fx, fy, tx, ty) {
	      var cellfx = (fx - this.mod(fx, this.xcellsize)) / this.xcellsize;
	      var cellfy = (fy - this.mod(fy, this.ycellsize)) / this.ycellsize;
	      var celltx = (tx - this.mod(tx, this.xcellsize)) / this.xcellsize;
	      var cellty = (ty - this.mod(ty, this.ycellsize)) / this.ycellsize;
	
	      // We haven't left the cell, carry on
	      if (cellfx == celltx && cellfy == cellty) return;
	
	      // Remove us from the last cell
	      var cell = this.grid[cellfy][cellfx];
	      cell.splice(cell.indexOf(item), 1);
	
	      // Add us to the new cell
	      cell = this.grid[this.wrap(cellty)][this.wrap(celltx)];
	      cell.push(item);
	    }
	  }, {
	    key: "mod",
	    value: function mod(a, b) {
	      var r = a % b;
	      return r < 0 ? r + b : r;
	    }
	
	    // returns all objects in radius r from point x,y
	
	  }, {
	    key: "query",
	    value: function query(x, y, r) {
	      // Squared distance
	      var rsq = r * r;
	
	      // Which cell are we in?
	      var cellcentrex = (x - this.mod(x, this.xcellsize)) / this.xcellsize;
	      var cellcentrey = (y - this.mod(y, this.ycellsize)) / this.ycellsize;
	
	      // Use diagonal extent to find the cell range to search
	      var cellminx = (x - r - this.mod(x - r, this.xcellsize)) / this.xcellsize;
	      var cellminy = (y - r - this.mod(y - r, this.ycellsize)) / this.ycellsize;
	      var cellmaxx = (x + r - this.mod(x + r, this.xcellsize)) / this.xcellsize;
	      var cellmaxy = (y + r - this.mod(y + r, this.ycellsize)) / this.ycellsize;
	
	      var objs = [];
	
	      //FIXME: need a smarter solution to make sure each cell is visited only once
	      var once = this.array2d(this.numcells, this.numcells, 0);
	
	      for (var cy = cellminy; cy <= cellmaxy; cy++) {
	        for (var cx = cellminx; cx <= cellmaxx; cx++) {
	          var wx = this.wrap(cx),
	              wy = this.wrap(cy);
	
	          if (once[wy][wx]) continue;
	          once[wy][wx] = 1;
	
	          var cell = this.grid[wy][wx];
	          if (!cell) continue;
	
	          for (var t = 0; t < cell.length; t++) {
	            var item = cell[t];
	            var d = this.distsq(item.x, item.y, x, y);
	            if (d <= rsq) objs.push(item);
	          }
	        }
	      }
	
	      return objs;
	    }
	  }, {
	    key: "distsq",
	    value: function distsq(x1, y1, x2, y2) {
	      var xd = x2 - x1,
	          yd = y2 - y1;
	      return xd * xd + yd * yd;
	    }
	  }, {
	    key: "wrap",
	    value: function wrap(a) {
	      return this.mod(a, this.numcells);
	      // // This needs to be more sophisticated to wrap multiple numcells widths!
	      // if (a < 0) return a + this.numcells;
	      // if (a >= this.numcells) return a - this.numcells;
	      // return a;
	    }
	  }, {
	    key: "array2d",
	    value: function array2d(w, h) {
	      var init = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
	
	      var v = [];
	      for (var y = 0; y < h; y++) {
	        var _h = [];
	        for (var x = 0; x < w; x++) {
	          _h[x] = init;
	        }v.push(_h);
	      }
	
	      return v;
	    }
	  }]);
	
	  return SpatialGrid;
	}();
	
	exports.default = SpatialGrid;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzkwNGNmNDMwYzIxYTRjZjViMWIiLCJ3ZWJwYWNrOi8vLy4vMmQvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi8yZC9jb3JlL1dvcmxkLmpzIiwid2VicGFjazovLy8uLzJkL2NvcmUvUmVuZGVyZXIyZC5qcyIsIndlYnBhY2s6Ly8vLi9zaGFyZWQvQ2FudmFzMmQuanMiLCJ3ZWJwYWNrOi8vLy4vMmQvY2VsbHMvR29MLmpzIiwid2VicGFjazovLy8uLzJkL2NlbGxzL0NlbGwuanMiLCJ3ZWJwYWNrOi8vLy4vMmQvY2VsbHMvRmxvb2QuanMiLCJ3ZWJwYWNrOi8vLy4vMmQvY2VsbHMvVXRpbC5qcyIsIndlYnBhY2s6Ly8vLi8yZC9jZWxscy9CdXJyb3cuanMiLCJ3ZWJwYWNrOi8vLy4vMmQvY2VsbHMvQmx1ci5qcyIsIndlYnBhY2s6Ly8vLi8yZC9jZWxscy9Tbm93LmpzIiwid2VicGFjazovLy8uLzJkL2NvcmUvU3BhdGlhbEdyaWQuanMiXSwibmFtZXMiOlsiU0laRSIsIlZJRVdfU0NBTEUiLCJXT1JMRF9GUkFNRV9SQVRFIiwiZyIsImFkZCIsIngiLCJ5IiwiaWQiLCJjb25zb2xlIiwibG9nIiwicXVlcnkiLCJXb3JsZCIsIm9wdGlvbnMiLCJzaXplIiwiZGF0YSIsInB0eXBlIiwidmVydGljYWwiLCJzd2lybCIsInJlbmRlcmVyIiwicmVuZGVyIiwic2NhbGUiLCJldm9sdmUiLCJwcm9jZXNzIiwiaW5pdCIsInR5cGUiLCJzcHJlYWQiLCJDZWxsVHlwZSIsImFycmF5MmQiLCJpIiwidGVzdCIsIk1hdGgiLCJyYW5kb20iLCJyIiwicmFkaXVzIiwibnVtIiwidngiLCJ2eSIsIm4iLCJsIiwiaXkiLCJpeCIsIndyYXAiLCJwdXNoIiwiY2VsbHMiLCJsaW5lYXIiLCJzdWJqZWN0IiwidiIsImQiLCJsZW5ndGgiLCJuZXh0Iiwicm91bmQiLCJ4ZCIsInlkIiwidmlzaXRlZCIsIml0ZXJhdG9yIiwieGkiLCJtdXRhdGUiLCJuZWlnaGJvdXJob29kIiwieWkiLCJwcmVwYXJlIiwiUmVuZGVyZXIyZCIsImVsZW1lbnQiLCJjYW52YXMyZCIsInciLCJoIiwicmVzaXplIiwiY2xlYXIiLCJjb2wiLCJzaGFkZXIiLCJibG9jayIsIkNhbnZhczJkIiwicGFyZW50IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImNyZWF0ZUVsZW1lbnQiLCJhcHBlbmRDaGlsZCIsImNvbnRleHQiLCJnZXRDb250ZXh0IiwiYyIsInQiLCJiZWdpblBhdGgiLCJyZWN0IiwiZmlsbFN0eWxlIiwiZmlsbCIsInN4Iiwic3kiLCJzdyIsInNoIiwiZHgiLCJkeSIsImR3IiwiZGgiLCJkcmF3SW1hZ2UiLCJjYW52YXMiLCJ3aWR0aCIsImhlaWdodCIsImNsaWVudFdpZHRoIiwiY2xpZW50SGVpZ2h0IiwiQUxJVkUiLCJERUFEIiwicGFsZXR0ZSIsIkdhbWVPZkxpZmUiLCJhbGl2ZSIsInVuZGVmaW5lZCIsIm51bUxpdmVOZWlnaGJvdXJzIiwibWUiLCJuZXdTdGF0ZSIsInZhbHVlIiwiQ2VsbCIsIm5laWdoYm91cnMiLCJzdW0iLCJNQVhfVkFMVUVTIiwiUiIsIkciLCJCIiwiUkVEUyIsIm1hcCIsImUiLCJHUkVFTlMiLCJCTFVFUyIsIkZsb29kIiwic3RhdGUiLCJmbG9vciIsImlsaW5lcnAiLCJlbnRpdHkiLCJjaGFuZ2UiLCJuYyIsImF2ZXJhZ2VWYWx1ZU5laWdoYm91cnMiLCJhYnMiLCJVdGlsIiwidmFsdWVzIiwicG9zaXRpb24iLCJwIiwiaTEiLCJpMiIsInEiLCJCdXJyb3ciLCJvcGVuIiwid2FzT3BlbiIsIkJsdXIiLCJhdiIsImJ3cGFsZXR0ZSIsIlNub3ciLCJwYXNzIiwic25vd2luZyIsInN0YXJ0U25vd2luZyIsIlNwYXRpYWxHcmlkIiwibWlueCIsIm1pbnkiLCJtYXh4IiwibWF4eSIsImdyaWQiLCJudW1jZWxscyIsInhjZWxsc2l6ZSIsInljZWxsc2l6ZSIsIml0ZW0iLCJjZWxseCIsIm1vZCIsImNlbGx5IiwiY2VsbCIsImluY2x1ZGVzIiwiZngiLCJmeSIsInR4IiwidHkiLCJjZWxsZngiLCJjZWxsZnkiLCJjZWxsdHgiLCJjZWxsdHkiLCJzcGxpY2UiLCJpbmRleE9mIiwiYSIsImIiLCJyc3EiLCJjZWxsY2VudHJleCIsImNlbGxjZW50cmV5IiwiY2VsbG1pbngiLCJjZWxsbWlueSIsImNlbGxtYXh4IiwiY2VsbG1heHkiLCJvYmpzIiwib25jZSIsImN5IiwiY3giLCJ3eCIsInd5IiwiZGlzdHNxIiwieDEiLCJ5MSIsIngyIiwieTIiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7QUNwQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsS0FBTUEsT0FBTyxFQUFiLEMsQ0FBaUI7QUFDakIsS0FBTUMsYUFBYSxDQUFuQjtBQUNBLEtBQU1DLG1CQUFtQixFQUF6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUlB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ekksS0FBS0EsRUFBTixHQUFhQyxLQUFLQSxFQUExQjtBQUNEOzs7MEJBRUl1SCxDLEVBQ0w7QUFDRSxjQUFPLEtBQUtkLEdBQUwsQ0FBU2MsQ0FBVCxFQUFZLEtBQUtuQixRQUFqQixDQUFQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRDs7OzZCQUVPekYsQyxFQUFHQyxDLEVBQ1g7QUFBQSxXQURjekMsSUFDZCx1RUFEbUIsSUFDbkI7O0FBQ0UsV0FBSXVCLElBQUksRUFBUjtBQUNBLFlBQUssSUFBSXhDLElBQUUsQ0FBWCxFQUFjQSxJQUFFMEQsQ0FBaEIsRUFBbUIxRCxHQUFuQixFQUNBO0FBQ0UsYUFBSTBELEtBQUksRUFBUjtBQUNBLGNBQUssSUFBSTNELElBQUUsQ0FBWCxFQUFjQSxJQUFFMEQsQ0FBaEIsRUFBbUIxRCxHQUFuQjtBQUNFMkQsY0FBRTNELENBQUYsSUFBT2tCLElBQVA7QUFERixVQUVBdUIsRUFBRUosSUFBRixDQUFPc0IsRUFBUDtBQUNEOztBQUVELGNBQU9sQixDQUFQO0FBQ0Q7Ozs7OzttQkE5SGtCb0csVyIsImZpbGUiOiIyZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA3OTA0Y2Y0MzBjMjFhNGNmNWIxYiIsIlxuXG5pbXBvcnQgU3BhdGlhbEdyaWQgIGZyb20gJy4vY29yZS9TcGF0aWFsR3JpZCc7XG5pbXBvcnQgV29ybGQgICAgICAgIGZyb20gJy4vY29yZS9Xb3JsZC5qcyc7XG5pbXBvcnQgR2FtZU9mTGlmZSAgIGZyb20gJy4vY2VsbHMvR29MJztcbmltcG9ydCBGbG9vZCAgICAgICAgZnJvbSAnLi9jZWxscy9GbG9vZCc7XG5pbXBvcnQgQnVycm93ICAgICAgIGZyb20gJy4vY2VsbHMvQnVycm93JztcbmltcG9ydCBCbHVyICAgICAgICAgZnJvbSAnLi9jZWxscy9CbHVyJztcbmltcG9ydCBTbm93ICAgICAgICAgZnJvbSAnLi9jZWxscy9Tbm93Jztcbi8vaW1wb3J0IFJlbmRlcmVyICAgICBmcm9tICcuL1JlbmRlcmVyMmQnO1xuLy9pbXBvcnQgQ2FudmFzMmQgZnJvbSAnLi4vc2hhcmVkL0NhbnZhczJkJztcblxuLy8gXCJib2lkc1wiXG5cbmNvbnN0IFNJWkUgPSA1MDsgLy8gY2VsbHNcbmNvbnN0IFZJRVdfU0NBTEUgPSA4O1xuY29uc3QgV09STERfRlJBTUVfUkFURSA9IDMwO1xuLy9cbi8vIGxldCBjYW4gPSBuZXcgQ2FudmFzMmQoXCJjb250ZW50XCIpO1xuLy8gY2FuLnJlc2l6ZShTSVpFICogVklFV19TQ0FMRSwgU0laRSAqIFZJRVdfU0NBTEUpO1xuLy8gY2FuLmNsZWFyKCk7XG4vLyAvL2Nhbi5maXR3aW5kb3coKTtcbi8vXG4vLyBsZXQgY29scyA9IFtcbi8vICAgWzAsMCwwXSxcbi8vICAgWzI1NSwwLDBdLFxuLy8gICBbMCwyNTUsMF0sXG4vLyAgIFswLDAsMjU1XSxcbi8vICAgWzI1NSwyNTUsMF0sXG4vLyAgIFsyNTUsMCwyNTVdLFxuLy8gICBbMCwyNTUsMjU1XSxcbi8vICAgWzEyOCwwLDBdLFxuLy8gICBbMCwxMjgsMF0sXG4vLyAgIFswLDAsMTI4XSxcbi8vICAgWzEyOCwxMjgsMF0sXG4vLyAgIFswLDEyOCwxMjhdLFxuLy8gICBbMTI4LDAsMTI4XVxuLy8gXVxuLy9cbi8vXG4vLyBsZXQgbnVtID0gU0laRSAqIFNJWkU7XG4vLyBsZXQgeCA9IE1hdGgucm91bmQoU0laRSAvIDIpO1xuLy8gbGV0IHkgPSBNYXRoLnJvdW5kKFNJWkUgLyAyKTtcbi8vIGxldCB4ZCA9IDEsIHlkID0gMTtcbi8vIGxldCBvbnggPSB0cnVlO1xuLy8gbGV0IGNvdW50ZG93biA9IDE7XG4vLyBsZXQgaXRlcmF0aW9ucyA9IDE7XG4vLyBsZXQgZGlyID0gMTtcbi8vIGxldCBpbmMgPSAxO1xuLy8gbGV0IGNudW0gPSAwO1xuLy8gbGV0IHZpc2l0ZWQgPSAwO1xuLy9cbi8vIGxldCBpdGVyYXRvciA9IDE7XG4vLyBkb1xuLy8ge1xuLy9cbi8vICAgbGV0IGNvbCA9IGNvbHNbY251bSAlIDEzXTtcbi8vICAgY251bSsrXG4vLyAgIC8vIC8vIE1vdmUgeCAgbG9vcFxuLy8gICBjb25zb2xlLmxvZyhgTW92aW5nIHggJHtpdGVyYXRvcn0gcGxhY2VzICR7eGQ9PTE/Jz4nOic8J31gKTtcbi8vICAgZm9yIChsZXQgeGk9MDsgeGkgPCBpdGVyYXRvcjsgeGkrKylcbi8vICAge1xuLy8gICAgIGNhbi5ibG9jayh4ICogVklFV19TQ0FMRSwgeSpWSUVXX1NDQUxFLCBWSUVXX1NDQUxFLCBWSUVXX1NDQUxFLCBjb2wpO1xuLy8gICAgIHggKz0geGQ7XG4vLyAgICAgdmlzaXRlZCsrO1xuLy8gICB9XG4vLyAgIHhkID0gLXhkO1xuLy8gICAvLyAvLyBjaGFuZ2UgZGlyZWN0aW9uXG4vLyAgIC8vXG4vLyAgIGNvbCA9IGNvbHNbKGNudW0rKyklMTNdO1xuLy8gICBjb25zb2xlLmxvZyhgTW92aW5nIHkgJHtpdGVyYXRvcn0gcGxhY2VzICR7eWQ9PTE/J3YnOideJ31gKTtcbi8vICAgZm9yIChsZXQgeWk9MDsgeWkgPCBpdGVyYXRvcjsgeWkrKylcbi8vICAge1xuLy8gICAgIGNhbi5ibG9jayh4ICogVklFV19TQ0FMRSwgeSpWSUVXX1NDQUxFLCBWSUVXX1NDQUxFLCBWSUVXX1NDQUxFLCBjb2wpO1xuLy8gICAgIHkgKz0geWQ7XG4vLyAgICAgdmlzaXRlZCsrO1xuLy8gICB9XG4vLyAgIHlkID0gLXlkO1xuLy9cbi8vICAgaXRlcmF0b3IgKz0gMTtcbi8vIH0gd2hpbGUodmlzaXRlZCA8IG51bSk7XG4vL1xuXG5cblxuLy8gLy8gU3BlZWQgdGVzdFxuLy9cbi8vIGxldCBudW0gPSAyNTAwMDAwMDtcbi8vIGxldCBzdGFydCA9IHBlcmZvcm1hbmNlLm5vdygpO1xuLy8gbGV0IGkgPSBudW07XG4vLyBmb3IgKGxldCB0PTA7IHQ8bnVtOyB0KyspXG4vLyB7XG4vLyAgIGxldCB4ZGlmZiA9IChpIC0gbnVtKTtcbi8vICAgbGV0IHlkaWZmID0gKG51bSAtIGkpO1xuLy8gICBsZXQgc3F1YXJlZGlzdCA9IE1hdGguc3FydCgoeGRpZmYgKiB4ZGlmZikgKyAoeWRpZmYgKiB5ZGlmZikpO1xuLy8gICBpKys7XG4vLyB9XG4vLyBsZXQgdHRha2VuID0gcGVyZm9ybWFuY2Uubm93KCkgLSBzdGFydDtcbi8vIGNvbnNvbGUubG9nKFwiVGltZSB0YWtlbjogXCIsIHR0YWtlbik7XG4vLyAvL1xuXG5sZXQgZyA9IG5ldyBTcGF0aWFsR3JpZCgwLCAwLCAxMDAsIDEwMCwgMyk7XG5cblxuZy5hZGQoe3g6IDE3LCB5OjE3LCBpZDowfSk7XG5nLmFkZCh7eDogMTgsIHk6MTgsIGlkOjF9KTtcbmcuYWRkKHt4OiAxLCB5OjEsIGlkOjJ9KTtcbmcuYWRkKHt4OiAyLCB5OjIsIGlkOjN9KTtcbmcuYWRkKHt4OiAzMywgeTozMywgaWQ6NH0pO1xuZy5hZGQoe3g6IDY2LCB5OjY2LCBpZDo0fSk7XG5cbmNvbnNvbGUubG9nKGcucXVlcnkoMywgMywgMTAwMCkpO1xuXG5cblxuLy8gZy5xdWVyeSg5OSwgOTksIDQpO1xuXG4vL2NvbnNvbGUubG9nKGcpO1xuLy9cbi8vXG4vL1xuLy9cbi8vIGxldCBmcHNUZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmcHNcIik7XG4vL1xuLy8gbGV0IGxhc3RUaW1lID0gMCwgZnJhbWVzID0gMCwgYXZGcmFtZXMgPSAwO1xuLy9cbi8vIGxldCB3b3JsZCA9IG5ldyBXb3JsZCh7XG4vLyAgIHNpemU6IFNJWkUsXG4vLyAgIHNwcmVhZDogMS4wLFxuLy8gICBwcm9jZXNzOiAndmVydGljYWwnLFxuLy8gICB0eXBlOiBHYW1lT2ZMaWZlLFxuLy8gICByZW5kZXI6ICdjb250ZW50Jyxcbi8vICAgc2NhbGU6IFZJRVdfU0NBTEVcbi8vIH0pO1xuLy9cbi8vXG4vLyAvLyB3b3JsZC5ldm9sdmUoKTtcbi8vIC8vIHJlbmRlcmVyLnJlbmRlcih3b3JsZC5kYXRhKTtcbi8vIC8vXG4vLyAvLyBjb25zb2xlLmxvZyh3b3JsZC5kYXRhKTtcbi8vXG4vLyB3aW5kb3cud29ybGQgPSB3b3JsZDtcbi8vXG4vLyB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlbmRlcik7XG4vLyB3aW5kb3cuc2V0SW50ZXJ2YWwoKCkgPT4geyB3b3JsZC5ldm9sdmUoKSB9LCAxMDAwIC8gV09STERfRlJBTUVfUkFURSk7XG4vL1xuLy8gZnVuY3Rpb24gcmVuZGVyKClcbi8vIHtcbi8vICAgbGV0IHRpbWVOb3cgPSBwZXJmb3JtYW5jZS5ub3coKTtcbi8vICAgbGV0IHRpbWVUYWtlbiA9IHRpbWVOb3cgLSBsYXN0VGltZTtcbi8vXG4vLyAgIGF2RnJhbWVzICs9ICAxMDAwIC8gdGltZVRha2VuO1xuLy8gICBsYXN0VGltZSA9IHRpbWVOb3c7XG4vL1xuLy8gICBpZiAoZnJhbWVzKysgPT0gMTApXG4vLyAgIHtcbi8vICAgLy8gIGZwc1RleHQuaW5uZXJIVE1MID0gKGF2RnJhbWVzIC8gMTApLnRvRml4ZWQoMSkgKyBcIiBGUFNcIjtcbi8vICAgICBmcmFtZXMgPSAwO1xuLy8gICAgIGF2RnJhbWVzID0gMDtcbi8vICAgfVxuLy9cbi8vICAgd29ybGQucmVuZGVyKCk7XG4vLyAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKTtcbi8vIH1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLzJkL21haW4uanMiLCJcbmltcG9ydCBSZW5kZXJlciAgICAgZnJvbSAnLi9SZW5kZXJlcjJkJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV29ybGRcbntcbiAgY29uc3RydWN0b3Iob3B0aW9ucylcbiAge1xuICAgIHRoaXMuc2l6ZSA9IG9wdGlvbnMuc2l6ZTsgLy9jZWxscywgc3F1YXJlXG4gICAgdGhpcy5kYXRhID0gbnVsbDtcbiAgICB0aGlzLnB0eXBlID0ge307XG5cbiAgICB0aGlzLnB0eXBlWyd2ZXJ0aWNhbCddID0gdGhpcy52ZXJ0aWNhbDtcbiAgICB0aGlzLnB0eXBlWydzd2lybCddID0gdGhpcy5zd2lybDtcblxuICAgIHRoaXMucmVuZGVyZXIgPSBuZXcgUmVuZGVyZXIob3B0aW9ucy5yZW5kZXIpO1xuICAgIHRoaXMucmVuZGVyZXIuc2NhbGUgPSBvcHRpb25zLnNjYWxlO1xuXG4gICAgdGhpcy5ldm9sdmUgPSB0aGlzLnB0eXBlW29wdGlvbnMucHJvY2Vzc107XG5cbiAgICB0aGlzLmluaXQob3B0aW9ucy50eXBlLCBvcHRpb25zLnNwcmVhZCk7XG4gIH1cblxuICBpbml0KENlbGxUeXBlLCBzcHJlYWQpXG4gIHtcbiAgICAvLyBDcmVhdGUgdGhlIGFycmF5OlxuICAgIHRoaXMuZGF0YSA9IHRoaXMuYXJyYXkyZCh0aGlzLnNpemUpO1xuICAgIGxldCBpID0gMDtcblxuICAgIGZvciAobGV0IHk9MDsgeTx0aGlzLnNpemU7IHkrKylcbiAgICB7XG4gICAgICBmb3IgKGxldCB4PTA7IHg8dGhpcy5zaXplOyB4KyspXG4gICAgICB7XG4gICAgICAgIC8vIERvZXMgQ2VsbFR5cGUgcHJvdmlkZSBhIHN0YXRpYyAndGVzdCdpbmcgZnVuY3Rpb24/XG4gICAgICAgIGlmIChDZWxsVHlwZS50ZXN0KVxuICAgICAgICB7XG4gICAgICAgICAgLy8gSXMgaXQgb2sgaWYgd2UgcGxhY2UgdGhlIGNlbGwgaGVyZT9cbiAgICAgICAgICAvL2lmICgpXG4gICAgICAgICAgaWYgKE1hdGgucmFuZG9tKCkgPD0gc3ByZWFkKVxuICAgICAgICAgICAgdGhpcy5kYXRhW3ldW3hdID0gbmV3IENlbGxUeXBlKFxuICAgICAgICAgICAgICBDZWxsVHlwZS50ZXN0KHgseSx0aGlzLnNpemUsIHRoaXMuc2l6ZSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKE1hdGgucmFuZG9tKCkgPD0gc3ByZWFkKVxuICAgICAgICAgICAgdGhpcy5kYXRhW3ldW3hdID0gbmV3IENlbGxUeXBlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZW5kZXIoKVxuICB7XG4gICAgdGhpcy5yZW5kZXJlci5yZW5kZXIodGhpcy5kYXRhKTtcbiAgfVxuXG4gIG5laWdoYm91cmhvb2QoeCwgeSwgcilcbiAge1xuICAgIGxldCByYWRpdXMgPSByIHx8IDE7XG4gICAgbGV0IG51bSA9IChyYWRpdXMgKiAyKSArIDE7XG5cbiAgICBsZXQgdnggPSB4IC0gcmFkaXVzO1xuICAgIGxldCB2eSA9IHkgLSByYWRpdXM7XG5cbiAgICBsZXQgbiA9IHRoaXMuYXJyYXkyZChudW0pO1xuICAgIGxldCBsID0gW107XG5cbiAgICBmb3IgKGxldCBpeT0wOyBpeTxudW07IGl5KyspXG4gICAge1xuICAgICAgdnggPSB4IC0gcmFkaXVzO1xuICAgICAgZm9yIChsZXQgaXg9MDsgaXg8bnVtOyBpeCsrKVxuICAgICAge1xuICAgICAgICBuW2l5XVtpeF0gPSB0aGlzLmRhdGFbdGhpcy53cmFwKHZ5KV1bdGhpcy53cmFwKHZ4KV07XG4gICAgICAgIGwucHVzaCh0aGlzLmRhdGFbdGhpcy53cmFwKHZ5KV1bdGhpcy53cmFwKHZ4KV0pO1xuICAgICAgICB2eCsrO1xuICAgICAgfVxuICAgICAgdnkrKztcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgY2VsbHM6IG4sXG4gICAgICBsaW5lYXI6IGwsXG4gICAgICByYWRpdXM6IHJhZGl1cyxcbiAgICAgIHN1YmplY3Q6IHRoaXMuZGF0YVt5XVt4XVxuICAgIH1cbiAgfVxuXG4gIHdyYXAodilcbiAge1xuICAgIGlmICggdiA8IDAgKSByZXR1cm4gdiArIHRoaXMuc2l6ZTtcbiAgICBpZiAoIHYgPiB0aGlzLnNpemUtMSkgcmV0dXJuIHYgLSB0aGlzLnNpemU7XG4gICAgcmV0dXJuIHY7XG4gIH1cblxuICBhcnJheTJkKHNpemUpXG4gIHtcbiAgICBmb3IgKHZhciBkPVtdOyBkLmxlbmd0aCA8IHNpemU7IGQucHVzaChbXSkpO1xuICAgIHJldHVybiBkO1xuICB9XG5cbiAgLy8gbWFrZXMgdmVyeSBsaXR0bGUgZGlmZmVyZW5jZSA6L1xuICBzd2lybCgpXG4gIHtcbiAgICBsZXQgbmV4dCA9IHRoaXMuYXJyYXkyZCh0aGlzLnNpemUpO1xuICAgIGxldCBudW0gPSAodGhpcy5zaXplICogdGhpcy5zaXplKSArICh0aGlzLnNpemUgKiAyKTtcbiAgICBsZXQgeCA9IE1hdGgucm91bmQodGhpcy5zaXplIC8gMik7XG4gICAgbGV0IHkgPSBNYXRoLnJvdW5kKHRoaXMuc2l6ZSAvIDIpO1xuICAgIGxldCB4ZCA9IDEsIHlkID0gMTtcbiAgICBsZXQgdmlzaXRlZCA9IDA7XG5cbiAgICBsZXQgaXRlcmF0b3IgPSAxO1xuICAgIGRvXG4gICAge1xuICAgICAgZm9yIChsZXQgeGk9MDsgeGkgPCBpdGVyYXRvcjsgeGkrKylcbiAgICAgIHtcbiAgICAgICAgLy9jYW4uYmxvY2soeCAqIFZJRVdfU0NBTEUsIHkqVklFV19TQ0FMRSwgVklFV19TQ0FMRSwgVklFV19TQ0FMRSwgY29sKTtcbiAgICAgICAgaWYgKHRoaXMuZGF0YVt5XVt4XSlcbiAgICAgICAgICBuZXh0W3ldW3hdID0gdGhpcy5kYXRhW3ldW3hdLm11dGF0ZSh0aGlzLm5laWdoYm91cmhvb2QoeCx5KSk7XG5cbiAgICAgICAgeCArPSB4ZDtcbiAgICAgICAgdmlzaXRlZCsrO1xuICAgICAgICBpZiAoeCA8IDAgfHwgeCA+IHRoaXMuc2l6ZS0xKSBicmVhaztcbiAgICAgIH1cbiAgICAgIHhkID0gLXhkO1xuXG4gICAgICBmb3IgKGxldCB5aT0wOyB5aSA8IGl0ZXJhdG9yOyB5aSsrKVxuICAgICAge1xuXG4gICAgICAgIC8vY2FuLmJsb2NrKHggKiBWSUVXX1NDQUxFLCB5KlZJRVdfU0NBTEUsIFZJRVdfU0NBTEUsIFZJRVdfU0NBTEUsIGNvbCk7XG4gICAgICAgIGlmICh0aGlzLmRhdGFbeV1beF0pXG4gICAgICAgICAgbmV4dFt5XVt4XSA9IHRoaXMuZGF0YVt5XVt4XS5tdXRhdGUodGhpcy5uZWlnaGJvdXJob29kKHgseSkpO1xuXG4gICAgICAgIHkgKz0geWQ7XG4gICAgICAgIHZpc2l0ZWQrKztcbiAgICAgICAgaWYgKHkgPCAwIHx8IHkgPiB0aGlzLnNpemUtMSkgYnJlYWs7XG4gICAgICB9XG4gICAgICB5ZCA9IC15ZDtcblxuICAgICAgaXRlcmF0b3IgKz0gMTtcbiAgICB9IHdoaWxlKHZpc2l0ZWQgPCBudW0pO1xuXG4gICAgdGhpcy5kYXRhID0gbmV4dDtcbiAgfVxuXG4gIHZlcnRpY2FsKClcbiAge1xuICAgIGxldCBuZXh0ID0gdGhpcy5hcnJheTJkKHRoaXMuc2l6ZSk7XG5cbiAgICB0aGlzLnByZXBhcmUoKTtcblxuICAgIGZvciAobGV0IHk9MDsgeTx0aGlzLnNpemU7IHkrKylcbiAgICB7XG4gICAgICBmb3IgKGxldCB4PTA7IHg8dGhpcy5zaXplOyB4KyspXG4gICAgICB7XG4gICAgICAgIGlmICh0aGlzLmRhdGFbeV1beF0pXG4gICAgICAgICAgbmV4dFt5XVt4XSA9IHRoaXMuZGF0YVt5XVt4XS5tdXRhdGUodGhpcy5uZWlnaGJvdXJob29kKHgseSkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuZGF0YSA9IG5leHQ7XG4gIH1cblxuXG4gIHByZXBhcmUoKVxuICB7XG4gICAgbGV0IG4gPSAwO1xuICAgIGZvciAobGV0IHk9MDsgeTx0aGlzLnNpemU7IHkrKylcbiAgICAgIGZvciAobGV0IHg9MDsgeDx0aGlzLnNpemU7IHgrKylcbiAgICAgICAgaWYgKHRoaXMuZGF0YVt5XVt4XSkgdGhpcy5kYXRhW3ldW3hdLnByZXBhcmUoKTtcblxuICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLzJkL2NvcmUvV29ybGQuanMiLCJcbmltcG9ydCBDYW52YXMyZCBmcm9tICcuLi8uLi9zaGFyZWQvQ2FudmFzMmQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZW5kZXJlcjJkXG57XG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQpXG4gIHtcbiAgICB0aGlzLmNhbnZhczJkID0gbmV3IENhbnZhczJkKGVsZW1lbnQpO1xuICAgIHRoaXMuc2NhbGUgPSAxO1xuICAgIHRoaXMuc2l6ZSA9IDE7XG4gIH1cblxuICByZXNpemUodywgaClcbiAge1xuICAgIHRoaXMuY2FudmFzMmQucmVzaXplKHcsIGgpO1xuICAgIHRoaXMuY2FudmFzMmQuY2xlYXIoKTtcbiAgfVxuXG4gIHJlbmRlcihkYXRhKVxuICB7XG5cbiAgICBpZiAoZGF0YS5sZW5ndGggIT0gdGhpcy5zaXplKVxuICAgIHtcbiAgICAgIHRoaXMuc2l6ZSA9IGRhdGEubGVuZ3RoO1xuICAgICAgdGhpcy5yZXNpemUodGhpcy5zaXplICogdGhpcy5zY2FsZSwgdGhpcy5zaXplICogdGhpcy5zY2FsZSk7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgeT0wOyB5PHRoaXMuc2l6ZTsgeSsrKVxuICAgIHtcbiAgICAgIGZvciAobGV0IHg9MDsgeDx0aGlzLnNpemU7IHgrKylcbiAgICAgIHtcbiAgICAgICAgaWYgKGRhdGFbeV1beF0pXG4gICAgICAgIHtcbiAgICAgICAgICBsZXQgY29sID0gZGF0YVt5XVt4XS5zaGFkZXIoKTtcbiAgICAgICAgLy9sZXQgY29sID0gZGF0YVt5XVt4XSA/IFswLDAsMF0gOiBbMjU1LDI1NSwyNTVdO1xuICAgICAgICAgIHRoaXMuY2FudmFzMmQuYmxvY2soeCAqIHRoaXMuc2NhbGUsIHkgKiB0aGlzLnNjYWxlLCB0aGlzLnNjYWxlLCB0aGlzLnNjYWxlLCBjb2wpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vMmQvY29yZS9SZW5kZXJlcjJkLmpzIiwiXG5cbi8vIEJvaWxlcnBsYXRlIGZ1bmN0aW9ucyB0byB3cml0ZSB0byB0aGUgQ2FudmFzXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhbnZhczJkXG57XG4gIGNvbnN0cnVjdG9yKHBhcmVudClcbiAge1xuICAgIHRoaXMucGFyZW50ID0gdHlwZW9mIHBhcmVudCA9PSAnc3RyaW5nJyA/IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBhcmVudCkgOiBwYXJlbnQ7XG4gICAgdGhpcy5lbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICB0aGlzLnBhcmVudC5hcHBlbmRDaGlsZCh0aGlzLmVsZW1lbnQpO1xuICAgIHRoaXMuY29udGV4dCA9IHRoaXMuZWxlbWVudC5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgdGhpcy5jbGVhcigpO1xuXG4gIH1cblxuICBibG9jayh4LHksdyxoLGMpXG4gIHtcbiAgICBsZXQgdCA9IHRoaXMuY29udGV4dDtcbiAgICB0LmJlZ2luUGF0aCgpO1xuICAgIHQucmVjdCh4LCB5LCB3LCBoKTtcbiAgICB0LmZpbGxTdHlsZSA9IGMgPyBgcmdiKCR7Y1swXX0sJHtjWzFdfSwke2NbMl19KWAgOiBcImJsYWNrXCI7XG4gICAgdC5maWxsKCk7XG4gIH1cblxuICBzZWxmYmxpdChzeCwgc3ksIHN3LCBzaCwgZHgsIGR5LCBkdywgZGgpXG4gIHtcbiAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKHRoaXMuY29udGV4dC5jYW52YXMsIHN4LCBzeSwgc3csIHNoLCBkeCwgZHksIGR3LCBkaCk7XG4gIH1cblxuICBjbGVhcihjKVxuICB7XG4gICAgbGV0IHQgPSB0aGlzLmNvbnRleHQ7XG4gICAgdC5iZWdpblBhdGgoKTtcbiAgICB0LnJlY3QoMCwgMCwgdGhpcy5lbGVtZW50LndpZHRoLCB0aGlzLmVsZW1lbnQuaGVpZ2h0KTtcbiAgICB0LmZpbGxTdHlsZSA9IGMgPyBgcmdiKCR7Y1swXX0sJHtjWzFdfSwke2NbMl19KWAgOiBcIndoaXRlXCI7XG4gICAgdC5maWxsKCk7XG4gIH1cblxuICB3aWR0aCgpXG4gIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50LndpZHRoO1xuICB9XG5cbiAgaGVpZ2h0KClcbiAge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnQuaGVpZ2h0O1xuICB9XG5cbiAgZml0d2luZG93KClcbiAge1xuICAgIHRoaXMucmVzaXplKHRoaXMucGFyZW50LmNsaWVudFdpZHRoLCB0aGlzLnBhcmVudC5jbGllbnRIZWlnaHQpO1xuICB9XG5cbiAgcmVzaXplKHcsIGgpXG4gIHtcblxuICAgIHRoaXMuZWxlbWVudC53aWR0aCA9IHc7XG4gICAgdGhpcy5lbGVtZW50LmhlaWdodCA9IGg7XG5cbiAgICAvLyBkcmF3KClcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2hhcmVkL0NhbnZhczJkLmpzIiwiXG5pbXBvcnQgQ2VsbCBmcm9tICcuL0NlbGwnO1xuXG5jb25zdCBBTElWRSA9IDEsIERFQUQgPSAwO1xuXG5jb25zdCBwYWxldHRlID0gW1xuICBbMjU1LDI1NSwyNTVdLFxuICBbMCwwLDBdXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lT2ZMaWZlIGV4dGVuZHMgQ2VsbFxue1xuICBjb25zdHJ1Y3RvcigpXG4gIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuYWxpdmUgPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkpO1xuICB9XG5cbiAgc2hhZGVyKClcbiAgeyAgICBcbiAgICByZXR1cm4gcGFsZXR0ZVsgdGhpcy5hbGl2ZSBdO1xuICB9XG5cblxuICBldmFsdWF0ZSgpXG4gIHtcbiAgICByZXR1cm4gdGhpcy5hbGl2ZSA/IDEgOiAwO1xuICB9XG5cbiAgLy8gLy8gR2V0cyBvciBhc3NpZ25zIGEgJ3ZhbHVlJyB0byBmZWVkYmFjayBpbnRvIHRoZSBDZWxsICdpbnRlcmZhY2UnIGNvdW50aW5nIG1ldGhvZFxuICB2YWx1ZSh2KVxuICB7XG4gICAgaWYgKHYgPT09IHVuZGVmaW5lZCkgcmV0dXJuIHRoaXMuYWxpdmUgPyAxIDogMDtcbiAgICB0aGlzLmFsaXZlID0gKHYgPT0gMCkgPyBERUFEIDogQUxJVkU7XG4gIH1cblxuXG4gIG11dGF0ZShjZWxscylcbiAge1xuICAgIGxldCBuID0gdGhpcy5udW1MaXZlTmVpZ2hib3VycyhjZWxscyk7XG4gICAgbGV0IG1lID0gbmV3IEdhbWVPZkxpZmUoKTtcbiAgICBsZXQgbmV3U3RhdGUgPSBERUFEO1xuXG4gICAgaWYgKGNlbGxzLnN1YmplY3QuYWxpdmUgJiYgbiA8IDIpXG4gICAgICBuZXdTdGF0ZSA9IERFQUQ7XG4gICAgZWxzZSBpZiAoY2VsbHMuc3ViamVjdC5hbGl2ZSAmJiBuID4gMylcbiAgICAgIG5ld1N0YXRlID0gREVBRDtcbiAgICBlbHNlIGlmICghY2VsbHMuc3ViamVjdC5hbGl2ZSAmJiBuID09IDMpXG4gICAgICBuZXdTdGF0ZSA9IEFMSVZFO1xuICAgIGVsc2VcbiAgICAgIG5ld1N0YXRlID0gY2VsbHMuc3ViamVjdC52YWx1ZSgpO1xuXG4gICAgbWUudmFsdWUobmV3U3RhdGUpO1xuXG4gICAgcmV0dXJuIG1lO1xuICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLzJkL2NlbGxzL0dvTC5qcyIsIlxuLy8gVGhpcyBpcyB0aGUgYmFzZSB0eXBlIG9mIENlbGwgdXNlZCBmb3IgZXZlcnkgQ0EgdHlwZS5cbi8vIEl0J3MgbW9yZSBvZiBhIGNsYXNzaWNhbCBcIkludGVyZmFjZVwiIHRoYW4gYSBjbGFzcyBJIHN1cHBvc2VcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2VsbFxue1xuICBjb25zdHJ1Y3RvcigpXG4gIHtcblxuICB9XG5cbiAgcHJlcGFyZSgpXG4gIHtcblxuICB9XG5cbiAgbXV0YXRlKG5laWdoYm91cnMpXG4gIHtcblxuICB9XG5cbiAgc2hhZGVyKClcbiAge1xuXG4gIH1cblxuXG4gIHZhbHVlKClcbiAge1xuXG4gIH1cblxuICBudW1MaXZlTmVpZ2hib3VycyhuKVxuICB7XG4gICAgbGV0IG51bSA9IDA7XG5cbiAgICBmb3IgKGxldCB5ID0gMDsgeTxuLmNlbGxzLmxlbmd0aDsgeSsrKVxuICAgICAgZm9yIChsZXQgeCA9IDA7IHg8bi5jZWxsc1t5XS5sZW5ndGg7IHgrKylcbiAgICAgICAgaWYgKG4uY2VsbHNbeV1beF0pIGlmIChuLmNlbGxzW3ldW3hdLnZhbHVlKCkgPiAwKSBudW0gKys7XG5cbiAgICAvLyBkb24ndCBpbmNsdWRlICd1cycgaW4gdGhlIGNvdW50IVxuICAgIHJldHVybiBudW0gLSAobi5zdWJqZWN0LnZhbHVlKCkgPiAwID8gMSA6IDApO1xuICB9XG5cbiAgbnVtTmVpZ2hib3Vyc1dpdGhWYWx1ZShuLCB2KVxuICB7XG4gICAgbGV0IG51bSA9IDA7XG5cbiAgICBmb3IgKGxldCB0PTA7IHQ8bi5saW5lYXIubGVuZ3RoOyB0KyspXG4gICAge1xuICAgICAgaWYgKG4ubGluZWFyW3RdKVxuICAgICAgICBpZiAobi5saW5lYXJbdF0udmFsdWUoKSA9PSB2KSBudW0rKztcbiAgICB9XG4gICAgcmV0dXJuIG51bTtcbiAgfVxuXG4gIGF2ZXJhZ2VWYWx1ZU5laWdoYm91cnMobilcbiAge1xuICAgIGxldCBzdW0gPSAwO1xuICAgIGZvciAobGV0IHQ9MDsgdDxuLmxpbmVhci5sZW5ndGg7IHQrKylcbiAgICB7XG4gICAgICBpZiAobi5saW5lYXJbdF0pXG4gICAgICB7XG4gICAgICAgIHN1bSArPSBuLmxpbmVhclt0XS52YWx1ZSgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHN1bSAtPSBuLnN1YmplY3QudmFsdWUoKTtcblxuICAgIHJldHVybiBzdW0gLyAobi5saW5lYXIubGVuZ3RoLTEpO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi8yZC9jZWxscy9DZWxsLmpzIiwiXG5pbXBvcnQgQ2VsbCBmcm9tICcuL0NlbGwnO1xuaW1wb3J0IFV0aWwgZnJvbSAnLi9VdGlsJztcblxuY29uc3QgTUFYX1ZBTFVFUyA9IDMyO1xuY29uc3QgUj0wLCBHPTEsIEI9Mjtcbi8vXG4vLyBjb25zdCBwYWxldHRlID0gW1xuLy8gICBbMTAsIDI1NSwgOTZdLFxuLy8gICBbMjU1LCAzMiwgMjU1XSxcbi8vICAgWzE3MiwgNTQsIDI1NV0sXG4vLyAgIFszMiwgMzIsIDI1NV0sXG4vLyAgIFszMiwgMjU1LCAyNTVdLFxuLy8gICBbMzIsIDMyLCAyNTVdLFxuLy8gICBbMjU1LCAyNTUsIDMyXVxuLy8gXTtcblxuLy8gbmljZSBjbG91ZHNcbi8vIGNvbnN0IHBhbGV0dGUgPSBbXG4vLyAgIFs1MywgMTc3LCAyNTVdLFxuLy8gICBbMjAwLCAyMDAsIDIxNV0sXG4vLyAgIFsyNTUsIDI1NSwgMjU1XVxuLy8gXTtcblxuLy8gZmlyZSBpc2hcbi8vIGNvbnN0IHBhbGV0dGUgPSBbXG4vLyAgIFsyNTUsIDAsIDBdLFxuLy8gICBbMjU1LCAyNTUsIDBdLFxuLy8gICBbMjU1LCAyNTUsIDIyMF1cbi8vIF07XG5cbmNvbnN0IHBhbGV0dGUgPSBbXG4gIFsyNTUsMCwwLDFdLCBbMjU1LDk2LDAsMV0sIFsyNTUsMTkxLDAsMV0sIFsyMjMsMjU1LDAsMV0sXG4gIFsxMjgsMjU1LDAsMV0sIFszMiwyNTUsMCwxXSwgWzAsMjU1LDY0LDFdLCBbMCwyNTUsMTU5LDFdLFxuICBbMCwyNTUsMjU1LDFdLCBbMCwxNTksMjU1LDFdLCBbMCw2NCwyNTUsMV0sIFszMiwwLDI1NSwxXSxcbiAgWzEyNywwLDI1NSwxXSwgWzIyMywwLDI1NSwxXSwgWzI1NSwwLDE5MSwxXSwgWzI1NSwwLDk2LDFdXG5dO1xuXG5jb25zdCBSRURTID0gcGFsZXR0ZS5tYXAoKGUpID0+IHsgcmV0dXJuIGVbUl0gfSk7XG5jb25zdCBHUkVFTlMgPSBwYWxldHRlLm1hcCgoZSkgPT4geyByZXR1cm4gZVtHXSB9KTtcbmNvbnN0IEJMVUVTID0gcGFsZXR0ZS5tYXAoKGUpID0+IHsgcmV0dXJuIGVbQl0gfSk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZsb29kIGV4dGVuZHMgQ2VsbFxue1xuICBjb25zdHJ1Y3RvcigpXG4gIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuc3RhdGUgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBNQVhfVkFMVUVTKTtcbiAgfVxuXG4gIHNoYWRlcigpXG4gIHtcbiAgICBsZXQgaSA9IHRoaXMudmFsdWUoKSAvIE1BWF9WQUxVRVM7XG5cbiAgICByZXR1cm4gW1xuICAgICAgVXRpbC5pbGluZXJwKFJFRFMsIGkpICYgMHhmZixcbiAgICAgIFV0aWwuaWxpbmVycChHUkVFTlMsIGkpICYgMHhmZixcbiAgICAgIFV0aWwuaWxpbmVycChCTFVFUywgaSkgJiAweGZmXG4gICAgXTtcblxuICB9XG5cbiAgLy8gLy8gR2V0cyBvciBhc3NpZ25zIGEgJ3ZhbHVlJyB0byBmZWVkYmFjayBpbnRvIHRoZSBDZWxsICdpbnRlcmZhY2UnIGNvdW50aW5nIG1ldGhvZFxuICB2YWx1ZSh2KVxuICB7XG4gICAgaWYgKHYgPT0gdW5kZWZpbmVkKSByZXR1cm4gdGhpcy5zdGF0ZTtcbiAgICB0aGlzLnN0YXRlID0gdjtcbiAgfVxuXG5cbiAgbXV0YXRlKGVudGl0eSlcbiAge1xuXG4gICAgbGV0IG5leHQgPSAodGhpcy52YWx1ZSgpICsgMSArIChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAzKSkpICUgTUFYX1ZBTFVFUztcbiAgICAvLyh0aGlzLnZhbHVlKCkgKyAoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNSkpKSAlIE1BWF9WQUxVRVM7XG5cbiAgICBsZXQgY2hhbmdlID0gZmFsc2U7XG4gICAgZm9yIChsZXQgdD0wOyB0PGVudGl0eS5saW5lYXIubGVuZ3RoOyB0KyspXG4gICAge1xuICAgICAgaWYgKGVudGl0eS5saW5lYXJbdF0pXG4gICAgICAgIGNoYW5nZSA9IGNoYW5nZSB8fCBlbnRpdHkubGluZWFyW3RdLnZhbHVlKCkgPT09IG5leHQ7XG4gICAgfVxuXG4gICAgaWYgKCFjaGFuZ2UpXG4gICAge1xuICAgICAgbGV0IG5jID0gdGhpcy5hdmVyYWdlVmFsdWVOZWlnaGJvdXJzKGVudGl0eSk7XG4gICAgICBpZiAoTWF0aC5hYnModGhpcy52YWx1ZSgpIC0gbmMpID09IDEpXG4gICAgICAgIHRoaXMudmFsdWUobmMpO1xuXG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZSlcbiAgICAgIHRoaXMudmFsdWUobmV4dCk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG5cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vMmQvY2VsbHMvRmxvb2QuanMiLCJcblxuY2xhc3MgVXRpbFxue1xuICBjb25zdHJ1Y3RvcigpXG4gIHtcblxuICB9XG5cbiAgLy8gTGluZWFybHkgaW50ZXJwb2xhdGVzIGJldHdlZW4gYW4gYXJyYXkgb2YgdmFsdWVzXG4gIC8vIGUuZy4gdmFsdWVzID0gWzUsIDEwLCAxXSwgcCA9IDAuLjFcblxuICBpbGluZXJwKHZhbHVlcywgcG9zaXRpb24pXG4gIHtcbiAgICBpZiAocG9zaXRpb24gPj0gMSkgcmV0dXJuIHZhbHVlc1t2YWx1ZXMubGVuZ3RoLTFdO1xuICAgIGlmIChwb3NpdGlvbiA8IDApIHJldHVybiB2YWx1ZXNbMF07XG5cbiAgICBsZXQgcCA9IHBvc2l0aW9uICogKHZhbHVlcy5sZW5ndGggLSAxKTtcblxuICAgIGxldCBpMSA9IE1hdGguZmxvb3IocCk7XG4gICAgbGV0IGkyID0gaTEgKyAxO1xuICAgIGxldCBxID0gcCAtIGkxO1xuXG4gICAgbGV0IHYgPSAodmFsdWVzW2kxXSAqICgxLXEpKSArICh2YWx1ZXNbaTJdICogKHEpKTtcblxuICAgIHJldHVybiBNYXRoLnJvdW5kKHYpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IChuZXcgVXRpbCgpKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLzJkL2NlbGxzL1V0aWwuanMiLCJcbmltcG9ydCBDZWxsIGZyb20gJy4vQ2VsbCc7XG5pbXBvcnQgVXRpbCBmcm9tICcuL1V0aWwnO1xuXG5jb25zdCBwYWxldHRlID0gW1xuICBbMjU1LDI1NSwyNTVdLFxuICBbMCwwLDBdXG5dO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJ1cnJvdyBleHRlbmRzIENlbGxcbntcbiAgY29uc3RydWN0b3IoKVxuICB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLm9wZW4gPSBNYXRoLnJhbmRvbSgpID4gMC40O1xuICB9XG5cbiAgcHJlcGFyZSgpXG4gIHtcbiAgICB0aGlzLndhc09wZW4gPSB0aGlzLm9wZW47XG4gIH1cblxuICBzaGFkZXIoKVxuICB7XG4gICAgcmV0dXJuIHBhbGV0dGUgWyB0aGlzLnZhbHVlKCkgXTtcbiAgfVxuXG5cbiAgdmFsdWUodilcbiAge1xuICAgIHJldHVybiB0aGlzLndhc09wZW4gPyAxIDogMDtcbiAgfVxuXG5cbiAgbXV0YXRlKGVudGl0eSlcbiAge1xuICAgIGxldCBudW0gPSB0aGlzLm51bUxpdmVOZWlnaGJvdXJzKGVudGl0eSk7XG4gICAgdGhpcy5vcGVuID0gKHRoaXMud2FzT3BlbiAmJiBudW0gPj00KSB8fCBudW0gPj0gNjtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vMmQvY2VsbHMvQnVycm93LmpzIiwiXG5pbXBvcnQgQ2VsbCBmcm9tICcuL0NlbGwnO1xuaW1wb3J0IFV0aWwgZnJvbSAnLi9VdGlsJztcblxuY29uc3QgTUFYX1ZBTFVFUyA9IDMyO1xuY29uc3QgUj0wLEc9MSxCPTI7XG5jb25zdCBwYWxldHRlID0gW1xuICBbMCwwLDAsMV0sIFsyNTUsMCwwLDBdLCBbMjU1LDk2LDAsMV0sIFsyNTUsMTkxLDAsMV0sIFsyMjMsMjU1LDAsMV0sXG4gIFsxMjgsMjU1LDAsMV0sIFszMiwyNTUsMCwxXSwgWzAsMjU1LDY0LDFdLCBbMCwyNTUsMTU5LDFdLFxuICBbMCwyNTUsMjU1LDFdLCBbMCwxNTksMjU1LDFdLCBbMCw2NCwyNTUsMV0sIFszMiwwLDI1NSwxXSxcbiAgWzEyNywwLDI1NSwxXSwgWzIyMywwLDI1NSwxXSwgWzI1NSwwLDE5MSwxXSwgWzI1NSwwLDk2LDFdXG5dO1xuXG5cbmNvbnN0IFJFRFMgPSBwYWxldHRlLm1hcCgoZSkgPT4geyByZXR1cm4gZVtSXSB9KTtcbmNvbnN0IEdSRUVOUyA9IHBhbGV0dGUubWFwKChlKSA9PiB7IHJldHVybiBlW0ddIH0pO1xuY29uc3QgQkxVRVMgPSBwYWxldHRlLm1hcCgoZSkgPT4geyByZXR1cm4gZVtCXSB9KTtcblxuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJsdXIgZXh0ZW5kcyBDZWxsXG57XG4gIGNvbnN0cnVjdG9yKClcbiAge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5zdGF0ZSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIE1BWF9WQUxVRVMpO1xuICB9XG5cbiAgcHJlcGFyZSgpXG4gIHtcblxuICB9XG5cbiAgc2hhZGVyKClcbiAge1xuICAgIGxldCBpID0gdGhpcy5zdGF0ZSAvIE1BWF9WQUxVRVM7XG4gICAgcmV0dXJuIFtcbiAgICAgIFV0aWwuaWxpbmVycChSRURTLCBpKSAmIDB4ZmYsXG4gICAgICBVdGlsLmlsaW5lcnAoR1JFRU5TLCBpKSAmIDB4ZmYsXG4gICAgICBVdGlsLmlsaW5lcnAoQkxVRVMsIGkpICYgMHhmZlxuICAgIF07XG5cbiAgfVxuXG5cbiAgLy8gLy8gR2V0cyBvciBhc3NpZ25zIGEgJ3ZhbHVlJyB0byBmZWVkYmFjayBpbnRvIHRoZSBDZWxsICdpbnRlcmZhY2UnIGNvdW50aW5nIG1ldGhvZFxuICB2YWx1ZSh2KVxuICB7XG4gICAgaWYgKHYgPT0gdW5kZWZpbmVkKSByZXR1cm4gdGhpcy5zdGF0ZTtcbiAgICBpZiAodiA8IDApIHYrPSBNQVhfVkFMVUVTO1xuICAgIHRoaXMuc3RhdGUgPSBNYXRoLnJvdW5kKHYpO1xuICB9XG5cblxuICBtdXRhdGUoZW50aXR5KVxuICB7XG4gICAgLy8gaWYgKGVudGl0eS5jZWxsc1swXVsxXS52YWx1ZSgpID4gdGhpcy52YWx1ZSgpKVxuICAgIC8vIHtcbiAgICAvLyAgIGxldCB0ID0gdGhpcy52YWx1ZSgpO1xuICAgIC8vICAgdGhpcy52YWx1ZShlbnRpdHkuY2VsbHNbMF1bMV0udmFsdWUoKSk7XG4gICAgLy8gICBlbnRpdHkuY2VsbHNbMF1bMV0udmFsdWUodCk7XG4gICAgLy8gfSBlbHNlIHtcbiAgICAvLyAgIGxldCB0ID0gdGhpcy52YWx1ZSgpO1xuICAgIC8vICAgdGhpcy52YWx1ZShlbnRpdHkuY2VsbHNbMV1bMl0udmFsdWUoKSk7XG4gICAgLy8gICBlbnRpdHkuY2VsbHNbMV1bMl0udmFsdWUodCk7XG4gICAgLy8gfVxuICAgIGxldCBhdiA9IHRoaXMuYXZlcmFnZVZhbHVlTmVpZ2hib3VycyhlbnRpdHkpO1xuICAgIHRoaXMudmFsdWUoYXYpO1xuXG4gICAgLy8gaWYgKHRoaXMubnVtTmVpZ2hib3Vyc1dpdGhWYWx1ZShlbnRpdHksIDApID49IDIpXG4gICAgLy8ge1xuICAgIC8vICAgdGhpcy52YWx1ZShNQVhfVkFMVUVTLTEpO1xuICAgIC8vIH1cblxuICAgIC8vbGV0IGF2ID0gdGhpcy5hdmVyYWdlVmFsdWVOZWlnaGJvdXJzKGVudGl0eSkgKiAxLjA7XG5cblxuICAgIGlmIChNYXRoLnJhbmRvbSgpIDwgMC4wMSkgdGhpcy52YWx1ZSggMCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vMmQvY2VsbHMvQmx1ci5qcyIsIlxuaW1wb3J0IENlbGwgZnJvbSAnLi9DZWxsJztcbmltcG9ydCBVdGlsIGZyb20gJy4vVXRpbCc7XG5cbmNvbnN0IE1BWF9WQUxVRVMgPSAxNjtcblxuY29uc3QgcGFsZXR0ZSA9IFtcbiAgWzAsIDAsIDBdLFxuICBbMjU1LCAyNTUsIDI1NV1cbl07XG5cbmNvbnN0IGJ3cGFsZXR0ZSA9IFsgMCwgMjU1IF07XG5cbmNsYXNzIFNub3cgZXh0ZW5kcyBDZWxsXG57XG4gIGNvbnN0cnVjdG9yKHBhc3MpXG4gIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5zbm93aW5nID0gZmFsc2U7XG4gICAgdGhpcy52YWx1ZSgwKTtcblxuICAgIGlmIChwYXNzKVxuICAgICAgICB0aGlzLnN0YXJ0U25vd2luZygpO1xuICB9XG5cbiAgcHJlcGFyZSgpXG4gIHtcblxuICB9XG5cbiAgc3RhcnRTbm93aW5nKClcbiAge1xuICAgIHRoaXMuc25vd2luZyA9IHRydWU7XG4gICAgdGhpcy52YWx1ZSAoKE1hdGgucmFuZG9tKCkgPiAwLjYpID8gTUFYX1ZBTFVFUyA6IDApO1xuICB9XG5cbiAgc2hhZGVyKClcbiAge1xuICAgIGxldCBpID0gVXRpbC5pbGluZXJwKGJ3cGFsZXR0ZSwgdGhpcy52YWx1ZSgpIC8gTUFYX1ZBTFVFUyk7XG4gICAgcmV0dXJuIFsgaSwgaSwgaSBdO1xuXG4gICAgLy9yZXR1cm4gcGFsZXR0ZSBbIHRoaXMudmFsdWUoKSBdO1xuICB9XG5cbiAgdmFsdWUodilcbiAge1xuICAgIGlmICh2ID09IHVuZGVmaW5lZCkgcmV0dXJuIHRoaXMuc3RhdGU7XG4gICAgdGhpcy5zdGF0ZSA9IHY7XG4gIH1cblxuICBtdXRhdGUoZW50aXR5KVxuICB7XG4gICAgaWYgKHRoaXMuc25vd2luZylcbiAgICB7XG4gICAgICB0aGlzLnZhbHVlKCB0aGlzLnZhbHVlKCkgLSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAzKSk7XG4gICAgICAvL1xuICAgICAgaWYgKHRoaXMudmFsdWUoKSA8IDgpXG4gICAgICB7XG4gICAgICAgICAgZW50aXR5LmNlbGxzWzJdWzFdLnNub3dpbmcgPSB0cnVlO1xuICAgICAgICAgIGVudGl0eS5jZWxsc1syXVsxXS52YWx1ZSh0aGlzLnZhbHVlKCkgKyA0KTtcbiAgICAgICAgICB0aGlzLnZhbHVlKE1BWF9WQUxVRVMpO1xuICAgICAgfVxuICAgICAgLy9cbiAgICAgIC8vIGlmICh0aGlzLnZhbHVlKCkgPD0gMClcbiAgICAgIC8vIHtcbiAgICAgIC8vICAgdGhpcy52YWx1ZSgwKTtcbiAgICAgIC8vICAgdGhpcy5zbm93aW5nID0gZmFsc2U7XG4gICAgICAvLyB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgfVxuXG59XG5cblNub3cudGVzdCA9ICh4LCB5LCB3LCBoKSA9PiB7XG4gIHJldHVybiB5ID09IDA7XG4gIC8vcmV0dXJuIHRydWU7XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNub3c7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi8yZC9jZWxscy9Tbm93LmpzIiwiXG4vL1xuLy8gQWxhbiBNYWNMZW9kIDA0LU1heS0yMDE3XG4vL1xuLy8gR3JpZC5qc1xuLy8gQ2hlYXAgKmR5bmFtaWMqIHNwYXRpYWwgaW5kZXguXG4vLyBTcGxpdHMgYW4gYXJlYSBpbnRvIGEgc2ltcGxlIGdyaWQsIGVhY2ggY2VsbCBrZWVwcyB0cmFjayBvZiBhIGxpc3Qgb2Ygb2JqZWN0c1xuLy8gR2VuZXJhbGx5IHBlcmZvcm1zIGJldHRlciBvbiBtb2Rlcm4gaGFyZHdhcmUgY29tcGFyZWQgdG8gcmVjb25zdHJ1Y3RpbmcgYSBxdWFkdHJlZSBldGNcbi8vIGFkZCgpIG9yIG1vdmUoKSBvYmplY3RzLiBQZXJmb3JtY2UgbmVhcmVzdCBuZWlnaGJvdXIgc2VhcmNoIHdpdGggcXVlcnkoKVxuLy8gV29yc3QgY2FzZSBwZXJmb3JtYW5jZSBPKG4pIGlmIGFsbCBvYmplY3RzIGJ1bmNoZWQgaW50byBvbmUgY2VsbCAoVF9UKVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTcGF0aWFsR3JpZFxue1xuICBjb25zdHJ1Y3RvcihtaW54LCBtaW55LCBtYXh4LCBtYXh5LCBjZWxscylcbiAge1xuICAgIHRoaXMuZ3JpZCA9IHRoaXMuYXJyYXkyZChjZWxscywgY2VsbHMpO1xuXG4gICAgdGhpcy53aWR0aCA9IChtYXh4IC0gbWlueCk7XG4gICAgdGhpcy5oZWlnaHQgPSAobWF4eSAtIG1pbnkpO1xuICAgIHRoaXMubnVtY2VsbHMgPSBjZWxscztcbiAgICB0aGlzLnhjZWxsc2l6ZSA9IHRoaXMud2lkdGggIC8gY2VsbHM7XG4gICAgdGhpcy55Y2VsbHNpemUgPSB0aGlzLmhlaWdodCAvIGNlbGxzO1xuICB9XG5cbiAgLy8gRXhwZWN0czogYGl0ZW1gIGNvbnRhaW5zIGB4YCBhbmQgYHlgIHByb3BlcnRpZXNcbiAgYWRkKGl0ZW0pXG4gIHtcbiAgICAvLyBXaGljaCBjZWxsXG4gICAgbGV0IGNlbGx4ID0gdGhpcy53cmFwKChpdGVtLnggLSB0aGlzLm1vZChpdGVtLngsIHRoaXMueGNlbGxzaXplKSkgLyB0aGlzLnhjZWxsc2l6ZSk7XG4gICAgbGV0IGNlbGx5ID0gdGhpcy53cmFwKChpdGVtLnkgLSB0aGlzLm1vZChpdGVtLnksIHRoaXMueWNlbGxzaXplKSkgLyB0aGlzLnljZWxsc2l6ZSk7XG5cbiAgICBsZXQgY2VsbCA9IHRoaXMuZ3JpZFtjZWxseV1bY2VsbHhdIHx8IFtdO1xuXG4gICAgaWYgKCFjZWxsLmluY2x1ZGVzKGl0ZW0pKVxuICAgICAgY2VsbC5wdXNoKGl0ZW0pO1xuXG4gICAgdGhpcy5ncmlkW2NlbGx5XVtjZWxseF0gPSBjZWxsO1xuICB9XG5cbiAgLy8gRlJPTShmeCxmeSkgLT4gVE8odHgsdHkpXG4gIG1vdmUoaXRlbSwgZngsIGZ5LCB0eCwgdHkpXG4gIHtcbiAgICBsZXQgY2VsbGZ4ID0gKGZ4IC0gKHRoaXMubW9kKGZ4LCB0aGlzLnhjZWxsc2l6ZSkpKSAvIHRoaXMueGNlbGxzaXplO1xuICAgIGxldCBjZWxsZnkgPSAoZnkgLSAodGhpcy5tb2QoZnksIHRoaXMueWNlbGxzaXplKSkpIC8gdGhpcy55Y2VsbHNpemU7XG4gICAgbGV0IGNlbGx0eCA9ICh0eCAtICh0aGlzLm1vZCh0eCwgdGhpcy54Y2VsbHNpemUpKSkgLyB0aGlzLnhjZWxsc2l6ZTtcbiAgICBsZXQgY2VsbHR5ID0gKHR5IC0gKHRoaXMubW9kKHR5LCB0aGlzLnljZWxsc2l6ZSkpKSAvIHRoaXMueWNlbGxzaXplO1xuXG4gICAgLy8gV2UgaGF2ZW4ndCBsZWZ0IHRoZSBjZWxsLCBjYXJyeSBvblxuICAgIGlmICgoY2VsbGZ4ID09IGNlbGx0eCkgJiYgKGNlbGxmeSA9PSBjZWxsdHkpKSByZXR1cm47XG5cbiAgICAvLyBSZW1vdmUgdXMgZnJvbSB0aGUgbGFzdCBjZWxsXG4gICAgbGV0IGNlbGwgPSB0aGlzLmdyaWRbY2VsbGZ5XVtjZWxsZnhdO1xuICAgIGNlbGwuc3BsaWNlKGNlbGwuaW5kZXhPZihpdGVtKSwgMSk7XG5cbiAgICAvLyBBZGQgdXMgdG8gdGhlIG5ldyBjZWxsXG4gICAgY2VsbCA9IHRoaXMuZ3JpZFt0aGlzLndyYXAoY2VsbHR5KV1bdGhpcy53cmFwKGNlbGx0eCldO1xuICAgIGNlbGwucHVzaChpdGVtKTtcbiAgfVxuXG4gIG1vZChhLCAgYilcbiAge1xuICAgICAgbGV0IHIgPSBhICUgYjtcbiAgICAgIHJldHVybiByIDwgMCA/IHIgKyBiIDogcjtcbiAgfVxuXG4gIC8vIHJldHVybnMgYWxsIG9iamVjdHMgaW4gcmFkaXVzIHIgZnJvbSBwb2ludCB4LHlcbiAgcXVlcnkoeCwgeSwgcilcbiAge1xuICAgIC8vIFNxdWFyZWQgZGlzdGFuY2VcbiAgICBsZXQgcnNxID0gciAqIHI7XG5cbiAgICAvLyBXaGljaCBjZWxsIGFyZSB3ZSBpbj9cbiAgICBsZXQgY2VsbGNlbnRyZXggPSAoeCAtICh0aGlzLm1vZCh4LCB0aGlzLnhjZWxsc2l6ZSkpKSAvIHRoaXMueGNlbGxzaXplO1xuICAgIGxldCBjZWxsY2VudHJleSA9ICh5IC0gKHRoaXMubW9kKHksIHRoaXMueWNlbGxzaXplKSkpIC8gdGhpcy55Y2VsbHNpemU7XG5cbiAgICAvLyBVc2UgZGlhZ29uYWwgZXh0ZW50IHRvIGZpbmQgdGhlIGNlbGwgcmFuZ2UgdG8gc2VhcmNoXG4gICAgbGV0IGNlbGxtaW54ID0gKCh4IC0gcikgLSAodGhpcy5tb2QoKHggLSByKSwgdGhpcy54Y2VsbHNpemUpKSkgLyB0aGlzLnhjZWxsc2l6ZTtcbiAgICBsZXQgY2VsbG1pbnkgPSAoKHkgLSByKSAtICh0aGlzLm1vZCgoeSAtIHIpLCB0aGlzLnljZWxsc2l6ZSkpKSAvIHRoaXMueWNlbGxzaXplO1xuICAgIGxldCBjZWxsbWF4eCA9ICgoeCArIHIpIC0gKHRoaXMubW9kKCh4ICsgciksIHRoaXMueGNlbGxzaXplKSkpIC8gdGhpcy54Y2VsbHNpemU7XG4gICAgbGV0IGNlbGxtYXh5ID0gKCh5ICsgcikgLSAodGhpcy5tb2QoKHkgKyByKSwgdGhpcy55Y2VsbHNpemUpKSkgLyB0aGlzLnljZWxsc2l6ZTtcblxuICAgIGxldCBvYmpzID0gW107XG5cbiAgICAvL0ZJWE1FOiBuZWVkIGEgc21hcnRlciBzb2x1dGlvbiB0byBtYWtlIHN1cmUgZWFjaCBjZWxsIGlzIHZpc2l0ZWQgb25seSBvbmNlXG4gICAgbGV0IG9uY2UgPSB0aGlzLmFycmF5MmQodGhpcy5udW1jZWxscywgdGhpcy5udW1jZWxscywgMCk7XG5cbiAgICBmb3IgKGxldCBjeT1jZWxsbWlueTsgY3k8PWNlbGxtYXh5OyBjeSsrKVxuICAgIHtcbiAgICAgIGZvciAobGV0IGN4PWNlbGxtaW54OyBjeDw9Y2VsbG1heHg7IGN4KyspXG4gICAgICB7XG4gICAgICAgIGxldCB3eCA9IHRoaXMud3JhcChjeCksIHd5ID0gdGhpcy53cmFwKGN5KTtcblxuICAgICAgICBpZiAob25jZVt3eV1bd3hdKSBjb250aW51ZTtcbiAgICAgICAgb25jZVt3eV1bd3hdID0gMTtcblxuICAgICAgICBsZXQgY2VsbCA9IHRoaXMuZ3JpZFt3eV1bd3hdXG4gICAgICAgIGlmICghY2VsbCkgY29udGludWU7XG5cbiAgICAgICAgZm9yIChsZXQgdD0wOyB0PGNlbGwubGVuZ3RoOyB0KyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gY2VsbFt0XTtcbiAgICAgICAgICAgIGxldCBkID0gdGhpcy5kaXN0c3EoaXRlbS54LCBpdGVtLnksIHgsIHkpO1xuICAgICAgICAgICAgaWYgKGQgPD0gcnNxKSBvYmpzLnB1c2goaXRlbSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb2JqcztcbiAgfVxuXG4gIGRpc3RzcSh4MSwgeTEsIHgyLCB5MilcbiAge1xuICAgIGxldCB4ZCA9IHgyIC0geDEsIHlkID0geTIgLSB5MTtcbiAgICByZXR1cm4gKCh4ZCAqIHhkKSArICh5ZCAqIHlkKSk7XG4gIH1cblxuICB3cmFwKGEpXG4gIHtcbiAgICByZXR1cm4gdGhpcy5tb2QoYSwgdGhpcy5udW1jZWxscyk7XG4gICAgLy8gLy8gVGhpcyBuZWVkcyB0byBiZSBtb3JlIHNvcGhpc3RpY2F0ZWQgdG8gd3JhcCBtdWx0aXBsZSBudW1jZWxscyB3aWR0aHMhXG4gICAgLy8gaWYgKGEgPCAwKSByZXR1cm4gYSArIHRoaXMubnVtY2VsbHM7XG4gICAgLy8gaWYgKGEgPj0gdGhpcy5udW1jZWxscykgcmV0dXJuIGEgLSB0aGlzLm51bWNlbGxzO1xuICAgIC8vIHJldHVybiBhO1xuICB9XG5cbiAgYXJyYXkyZCh3LCBoLCBpbml0PW51bGwpXG4gIHtcbiAgICBsZXQgdiA9IFtdO1xuICAgIGZvciAobGV0IHk9MDsgeTxoOyB5KyspXG4gICAge1xuICAgICAgbGV0IGggPSBbXTtcbiAgICAgIGZvciAobGV0IHg9MDsgeDx3OyB4KyspXG4gICAgICAgIGhbeF0gPSBpbml0O1xuICAgICAgdi5wdXNoKGgpO1xuICAgIH1cblxuICAgIHJldHVybiB2O1xuICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLzJkL2NvcmUvU3BhdGlhbEdyaWQuanMiXSwic291cmNlUm9vdCI6IiJ9