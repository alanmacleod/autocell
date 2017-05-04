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
	
	var t1 = performance.now();
	for (var t = 0; t < 10000; t++) {
	  g.query(3, 3, 50);
	}console.log('Took ' + (performance.now() - t1) + ' ms');
	
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
	
	    this.maxRadius = Math.sqrt(this.width * this.width + this.height * this.height);
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
	      if (r > this.maxRadius) r = this.maxRadius;
	
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
	
	      //  console.log(`Checking numcells ${cellmaxx - cellminx}, ${cellmaxy - cellminy}`);
	
	      var objs = [];
	
	      if (cellmaxy - cellminy >= this.numcells) cellmaxy = cellminy + this.numcells - 1;
	      if (cellmaxx - cellminx >= this.numcells) cellmaxx = cellminx + this.numcells - 1;
	
	      for (var cy = cellminy; cy <= cellmaxy; cy++) {
	        for (var cx = cellminx; cx <= cellmaxx; cx++) {
	          var wx = this.wrap(cx),
	              wy = this.wrap(cy);
	
	          // if (once[wy][wx]) continue;
	          // once[wy][wx] = 1;
	
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNmYzNGM4OWE5YmJhZmJiYTQ5MDgiLCJ3ZWJwYWNrOi8vLy4vMmQvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi8yZC9jb3JlL1dvcmxkLmpzIiwid2VicGFjazovLy8uLzJkL2NvcmUvUmVuZGVyZXIyZC5qcyIsIndlYnBhY2s6Ly8vLi9zaGFyZWQvQ2FudmFzMmQuanMiLCJ3ZWJwYWNrOi8vLy4vMmQvY2VsbHMvR29MLmpzIiwid2VicGFjazovLy8uLzJkL2NlbGxzL0NlbGwuanMiLCJ3ZWJwYWNrOi8vLy4vMmQvY2VsbHMvRmxvb2QuanMiLCJ3ZWJwYWNrOi8vLy4vMmQvY2VsbHMvVXRpbC5qcyIsIndlYnBhY2s6Ly8vLi8yZC9jZWxscy9CdXJyb3cuanMiLCJ3ZWJwYWNrOi8vLy4vMmQvY2VsbHMvQmx1ci5qcyIsIndlYnBhY2s6Ly8vLi8yZC9jZWxscy9Tbm93LmpzIiwid2VicGFjazovLy8uLzJkL2NvcmUvU3BhdGlhbEdyaWQuanMiXSwibmFtZXMiOlsiU0laRSIsIlZJRVdfU0NBTEUiLCJXT1JMRF9GUkFNRV9SQVRFIiwiZyIsImFkZCIsIngiLCJ5IiwiaWQiLCJ0MSIsInBlcmZvcm1hbmNlIiwibm93IiwidCIsInF1ZXJ5IiwiY29uc29sZSIsImxvZyIsIldvcmxkIiwib3B0aW9ucyIsInNpemUiLCJkYXRhIiwicHR5cGUiLCJ2ZXJ0aWNhbCIsInN3aXJsIiwicmVuZGVyZXIiLCJyZW5kZXIiLCJzY2FsZSIsImV2b2x2ZSIsInByb2Nlc3MiLCJpbml0IiwidHlwZSIsInNwcmVhZCIsIkNlbGxUeXBlIiwiYXJyYXkyZCIsImkiLCJ0ZXN0IiwiTWF0aCIsInJhbmRvbSIsInIiLCJyYWRpdXMiLCJudW0iLCJ2eCIsInZ5IiwibiIsImwiLCJpeSIsIml4Iiwid3JhcCIsInB1c2giLCJjZWxscyIsImxpbmVhciIsInN1YmplY3QiLCJ2IiwiZCIsImxlbmd0aCIsIm5leHQiLCJyb3VuZCIsInhkIiwieWQiLCJ2aXNpdGVkIiwiaXRlcmF0b3IiLCJ4aSIsIm11dGF0ZSIsIm5laWdoYm91cmhvb2QiLCJ5aSIsInByZXBhcmUiLCJSZW5kZXJlcjJkIiwiZWxlbWVudCIsImNhbnZhczJkIiwidyIsImgiLCJyZXNpemUiLCJjbGVhciIsImNvbCIsInNoYWRlciIsImJsb2NrIiwiQ2FudmFzMmQiLCJwYXJlbnQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZENoaWxkIiwiY29udGV4dCIsImdldENvbnRleHQiLCJjIiwiYmVnaW5QYXRoIiwicmVjdCIsImZpbGxTdHlsZSIsImZpbGwiLCJzeCIsInN5Iiwic3ciLCJzaCIsImR4IiwiZHkiLCJkdyIsImRoIiwiZHJhd0ltYWdlIiwiY2FudmFzIiwid2lkdGgiLCJoZWlnaHQiLCJjbGllbnRXaWR0aCIsImNsaWVudEhlaWdodCIsIkFMSVZFIiwiREVBRCIsInBhbGV0dGUiLCJHYW1lT2ZMaWZlIiwiYWxpdmUiLCJ1bmRlZmluZWQiLCJudW1MaXZlTmVpZ2hib3VycyIsIm1lIiwibmV3U3RhdGUiLCJ2YWx1ZSIsIkNlbGwiLCJuZWlnaGJvdXJzIiwic3VtIiwiTUFYX1ZBTFVFUyIsIlIiLCJHIiwiQiIsIlJFRFMiLCJtYXAiLCJlIiwiR1JFRU5TIiwiQkxVRVMiLCJGbG9vZCIsInN0YXRlIiwiZmxvb3IiLCJpbGluZXJwIiwiZW50aXR5IiwiY2hhbmdlIiwibmMiLCJhdmVyYWdlVmFsdWVOZWlnaGJvdXJzIiwiYWJzIiwiVXRpbCIsInZhbHVlcyIsInBvc2l0aW9uIiwicCIsImkxIiwiaTIiLCJxIiwiQnVycm93Iiwib3BlbiIsIndhc09wZW4iLCJCbHVyIiwiYXYiLCJid3BhbGV0dGUiLCJTbm93IiwicGFzcyIsInNub3dpbmciLCJzdGFydFNub3dpbmciLCJTcGF0aWFsR3JpZCIsIm1pbngiLCJtaW55IiwibWF4eCIsIm1heHkiLCJncmlkIiwibnVtY2VsbHMiLCJ4Y2VsbHNpemUiLCJ5Y2VsbHNpemUiLCJtYXhSYWRpdXMiLCJzcXJ0IiwiaXRlbSIsImNlbGx4IiwibW9kIiwiY2VsbHkiLCJjZWxsIiwiaW5jbHVkZXMiLCJmeCIsImZ5IiwidHgiLCJ0eSIsImNlbGxmeCIsImNlbGxmeSIsImNlbGx0eCIsImNlbGx0eSIsInNwbGljZSIsImluZGV4T2YiLCJhIiwiYiIsInJzcSIsImNlbGxjZW50cmV4IiwiY2VsbGNlbnRyZXkiLCJjZWxsbWlueCIsImNlbGxtaW55IiwiY2VsbG1heHgiLCJjZWxsbWF4eSIsIm9ianMiLCJjeSIsImN4Iiwid3giLCJ3eSIsImRpc3RzcSIsIngxIiwieTEiLCJ4MiIsInkyIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7O0FDcENBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFDQTtBQUNBOztBQUVBOztBQUVBLEtBQU1BLE9BQU8sRUFBYixDLENBQWlCO0FBQ2pCLEtBQU1DLGFBQWEsQ0FBbkI7QUFDQSxLQUFNQyxtQkFBbUIsRUFBekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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LEVBQ0E7QUFDSSxpQkFBSXFKLE9BQU9JLEtBQUt6SixDQUFMLENBQVg7QUFDQSxpQkFBSXdDLElBQUksS0FBSzJJLE1BQUwsQ0FBWTlCLEtBQUszSixDQUFqQixFQUFvQjJKLEtBQUsxSixDQUF6QixFQUE0QkQsQ0FBNUIsRUFBK0JDLENBQS9CLENBQVI7QUFDQSxpQkFBSTZDLEtBQUsrSCxHQUFULEVBQWNPLEtBQUszSSxJQUFMLENBQVVrSCxJQUFWO0FBQ2pCO0FBQ0Y7QUFDRjs7QUFFRCxjQUFPeUIsSUFBUDtBQUNEOzs7NEJBRU1NLEUsRUFBSUMsRSxFQUFJQyxFLEVBQUlDLEUsRUFDbkI7QUFDRSxXQUFJM0ksS0FBSzBJLEtBQUtGLEVBQWQ7QUFBQSxXQUFrQnZJLEtBQUswSSxLQUFLRixFQUE1QjtBQUNBLGNBQVN6SSxLQUFLQSxFQUFOLEdBQWFDLEtBQUtBLEVBQTFCO0FBQ0Q7OzswQkFFSXdILEMsRUFDTDtBQUNFLGNBQU8sS0FBS2QsR0FBTCxDQUFTYyxDQUFULEVBQVksS0FBS3JCLFFBQWpCLENBQVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNEOzs7NkJBRU94RixDLEVBQUdDLEMsRUFDWDtBQUFBLFdBRGN6QyxJQUNkLHVFQURtQixJQUNuQjs7QUFDRSxXQUFJdUIsSUFBSSxFQUFSO0FBQ0EsWUFBSyxJQUFJNUMsSUFBRSxDQUFYLEVBQWNBLElBQUU4RCxDQUFoQixFQUFtQjlELEdBQW5CLEVBQ0E7QUFDRSxhQUFJOEQsS0FBSSxFQUFSO0FBQ0EsY0FBSyxJQUFJL0QsSUFBRSxDQUFYLEVBQWNBLElBQUU4RCxDQUFoQixFQUFtQjlELEdBQW5CO0FBQ0UrRCxjQUFFL0QsQ0FBRixJQUFPc0IsSUFBUDtBQURGLFVBRUF1QixFQUFFSixJQUFGLENBQU9zQixFQUFQO0FBQ0Q7O0FBRUQsY0FBT2xCLENBQVA7QUFDRDs7Ozs7O21CQXJJa0JtRyxXIiwiZmlsZSI6IjJkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDZmMzRjODlhOWJiYWZiYmE0OTA4IiwiXG5cbmltcG9ydCBTcGF0aWFsR3JpZCAgZnJvbSAnLi9jb3JlL1NwYXRpYWxHcmlkJztcbmltcG9ydCBXb3JsZCAgICAgICAgZnJvbSAnLi9jb3JlL1dvcmxkLmpzJztcbmltcG9ydCBHYW1lT2ZMaWZlICAgZnJvbSAnLi9jZWxscy9Hb0wnO1xuaW1wb3J0IEZsb29kICAgICAgICBmcm9tICcuL2NlbGxzL0Zsb29kJztcbmltcG9ydCBCdXJyb3cgICAgICAgZnJvbSAnLi9jZWxscy9CdXJyb3cnO1xuaW1wb3J0IEJsdXIgICAgICAgICBmcm9tICcuL2NlbGxzL0JsdXInO1xuaW1wb3J0IFNub3cgICAgICAgICBmcm9tICcuL2NlbGxzL1Nub3cnO1xuLy9pbXBvcnQgUmVuZGVyZXIgICAgIGZyb20gJy4vUmVuZGVyZXIyZCc7XG4vL2ltcG9ydCBDYW52YXMyZCBmcm9tICcuLi9zaGFyZWQvQ2FudmFzMmQnO1xuXG4vLyBcImJvaWRzXCJcblxuY29uc3QgU0laRSA9IDUwOyAvLyBjZWxsc1xuY29uc3QgVklFV19TQ0FMRSA9IDg7XG5jb25zdCBXT1JMRF9GUkFNRV9SQVRFID0gMzA7XG4vL1xuLy8gbGV0IGNhbiA9IG5ldyBDYW52YXMyZChcImNvbnRlbnRcIik7XG4vLyBjYW4ucmVzaXplKFNJWkUgKiBWSUVXX1NDQUxFLCBTSVpFICogVklFV19TQ0FMRSk7XG4vLyBjYW4uY2xlYXIoKTtcbi8vIC8vY2FuLmZpdHdpbmRvdygpO1xuLy9cbi8vIGxldCBjb2xzID0gW1xuLy8gICBbMCwwLDBdLFxuLy8gICBbMjU1LDAsMF0sXG4vLyAgIFswLDI1NSwwXSxcbi8vICAgWzAsMCwyNTVdLFxuLy8gICBbMjU1LDI1NSwwXSxcbi8vICAgWzI1NSwwLDI1NV0sXG4vLyAgIFswLDI1NSwyNTVdLFxuLy8gICBbMTI4LDAsMF0sXG4vLyAgIFswLDEyOCwwXSxcbi8vICAgWzAsMCwxMjhdLFxuLy8gICBbMTI4LDEyOCwwXSxcbi8vICAgWzAsMTI4LDEyOF0sXG4vLyAgIFsxMjgsMCwxMjhdXG4vLyBdXG4vL1xuLy9cbi8vIGxldCBudW0gPSBTSVpFICogU0laRTtcbi8vIGxldCB4ID0gTWF0aC5yb3VuZChTSVpFIC8gMik7XG4vLyBsZXQgeSA9IE1hdGgucm91bmQoU0laRSAvIDIpO1xuLy8gbGV0IHhkID0gMSwgeWQgPSAxO1xuLy8gbGV0IG9ueCA9IHRydWU7XG4vLyBsZXQgY291bnRkb3duID0gMTtcbi8vIGxldCBpdGVyYXRpb25zID0gMTtcbi8vIGxldCBkaXIgPSAxO1xuLy8gbGV0IGluYyA9IDE7XG4vLyBsZXQgY251bSA9IDA7XG4vLyBsZXQgdmlzaXRlZCA9IDA7XG4vL1xuLy8gbGV0IGl0ZXJhdG9yID0gMTtcbi8vIGRvXG4vLyB7XG4vL1xuLy8gICBsZXQgY29sID0gY29sc1tjbnVtICUgMTNdO1xuLy8gICBjbnVtKytcbi8vICAgLy8gLy8gTW92ZSB4ICBsb29wXG4vLyAgIGNvbnNvbGUubG9nKGBNb3ZpbmcgeCAke2l0ZXJhdG9yfSBwbGFjZXMgJHt4ZD09MT8nPic6JzwnfWApO1xuLy8gICBmb3IgKGxldCB4aT0wOyB4aSA8IGl0ZXJhdG9yOyB4aSsrKVxuLy8gICB7XG4vLyAgICAgY2FuLmJsb2NrKHggKiBWSUVXX1NDQUxFLCB5KlZJRVdfU0NBTEUsIFZJRVdfU0NBTEUsIFZJRVdfU0NBTEUsIGNvbCk7XG4vLyAgICAgeCArPSB4ZDtcbi8vICAgICB2aXNpdGVkKys7XG4vLyAgIH1cbi8vICAgeGQgPSAteGQ7XG4vLyAgIC8vIC8vIGNoYW5nZSBkaXJlY3Rpb25cbi8vICAgLy9cbi8vICAgY29sID0gY29sc1soY251bSsrKSUxM107XG4vLyAgIGNvbnNvbGUubG9nKGBNb3ZpbmcgeSAke2l0ZXJhdG9yfSBwbGFjZXMgJHt5ZD09MT8ndic6J14nfWApO1xuLy8gICBmb3IgKGxldCB5aT0wOyB5aSA8IGl0ZXJhdG9yOyB5aSsrKVxuLy8gICB7XG4vLyAgICAgY2FuLmJsb2NrKHggKiBWSUVXX1NDQUxFLCB5KlZJRVdfU0NBTEUsIFZJRVdfU0NBTEUsIFZJRVdfU0NBTEUsIGNvbCk7XG4vLyAgICAgeSArPSB5ZDtcbi8vICAgICB2aXNpdGVkKys7XG4vLyAgIH1cbi8vICAgeWQgPSAteWQ7XG4vL1xuLy8gICBpdGVyYXRvciArPSAxO1xuLy8gfSB3aGlsZSh2aXNpdGVkIDwgbnVtKTtcbi8vXG5cblxuXG4vLyAvLyBTcGVlZCB0ZXN0XG4vL1xuLy8gbGV0IG51bSA9IDI1MDAwMDAwO1xuLy8gbGV0IHN0YXJ0ID0gcGVyZm9ybWFuY2Uubm93KCk7XG4vLyBsZXQgaSA9IG51bTtcbi8vIGZvciAobGV0IHQ9MDsgdDxudW07IHQrKylcbi8vIHtcbi8vICAgbGV0IHhkaWZmID0gKGkgLSBudW0pO1xuLy8gICBsZXQgeWRpZmYgPSAobnVtIC0gaSk7XG4vLyAgIGxldCBzcXVhcmVkaXN0ID0gTWF0aC5zcXJ0KCh4ZGlmZiAqIHhkaWZmKSArICh5ZGlmZiAqIHlkaWZmKSk7XG4vLyAgIGkrKztcbi8vIH1cbi8vIGxldCB0dGFrZW4gPSBwZXJmb3JtYW5jZS5ub3coKSAtIHN0YXJ0O1xuLy8gY29uc29sZS5sb2coXCJUaW1lIHRha2VuOiBcIiwgdHRha2VuKTtcbi8vIC8vXG5cbmxldCBnID0gbmV3IFNwYXRpYWxHcmlkKDAsIDAsIDEwMCwgMTAwLCAzKTtcblxuXG5nLmFkZCh7eDogMTcsIHk6MTcsIGlkOjB9KTtcbmcuYWRkKHt4OiAxOCwgeToxOCwgaWQ6MX0pO1xuZy5hZGQoe3g6IDEsIHk6MSwgaWQ6Mn0pO1xuZy5hZGQoe3g6IDIsIHk6MiwgaWQ6M30pO1xuZy5hZGQoe3g6IDMzLCB5OjMzLCBpZDo0fSk7XG5nLmFkZCh7eDogNjYsIHk6NjYsIGlkOjR9KTtcblxudmFyIHQxPSBwZXJmb3JtYW5jZS5ub3coKTtcbmZvciAodmFyIHQ9MDsgdDwgMTAwMDA7IHQrKylcbiAgZy5xdWVyeSgzLCAzLCA1MCk7XG5cbmNvbnNvbGUubG9nKGBUb29rICR7cGVyZm9ybWFuY2Uubm93KCkgLSB0MX0gbXNgKTtcblxuXG5cbi8vXG4vL1xuLy9cbi8vIGxldCBmcHNUZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmcHNcIik7XG4vL1xuLy8gbGV0IGxhc3RUaW1lID0gMCwgZnJhbWVzID0gMCwgYXZGcmFtZXMgPSAwO1xuLy9cbi8vIGxldCB3b3JsZCA9IG5ldyBXb3JsZCh7XG4vLyAgIHNpemU6IFNJWkUsXG4vLyAgIHNwcmVhZDogMS4wLFxuLy8gICBwcm9jZXNzOiAndmVydGljYWwnLFxuLy8gICB0eXBlOiBHYW1lT2ZMaWZlLFxuLy8gICByZW5kZXI6ICdjb250ZW50Jyxcbi8vICAgc2NhbGU6IFZJRVdfU0NBTEVcbi8vIH0pO1xuLy9cbi8vXG4vLyAvLyB3b3JsZC5ldm9sdmUoKTtcbi8vIC8vIHJlbmRlcmVyLnJlbmRlcih3b3JsZC5kYXRhKTtcbi8vIC8vXG4vLyAvLyBjb25zb2xlLmxvZyh3b3JsZC5kYXRhKTtcbi8vXG4vLyB3aW5kb3cud29ybGQgPSB3b3JsZDtcbi8vXG4vLyB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlbmRlcik7XG4vLyB3aW5kb3cuc2V0SW50ZXJ2YWwoKCkgPT4geyB3b3JsZC5ldm9sdmUoKSB9LCAxMDAwIC8gV09STERfRlJBTUVfUkFURSk7XG4vL1xuLy8gZnVuY3Rpb24gcmVuZGVyKClcbi8vIHtcbi8vICAgbGV0IHRpbWVOb3cgPSBwZXJmb3JtYW5jZS5ub3coKTtcbi8vICAgbGV0IHRpbWVUYWtlbiA9IHRpbWVOb3cgLSBsYXN0VGltZTtcbi8vXG4vLyAgIGF2RnJhbWVzICs9ICAxMDAwIC8gdGltZVRha2VuO1xuLy8gICBsYXN0VGltZSA9IHRpbWVOb3c7XG4vL1xuLy8gICBpZiAoZnJhbWVzKysgPT0gMTApXG4vLyAgIHtcbi8vICAgLy8gIGZwc1RleHQuaW5uZXJIVE1MID0gKGF2RnJhbWVzIC8gMTApLnRvRml4ZWQoMSkgKyBcIiBGUFNcIjtcbi8vICAgICBmcmFtZXMgPSAwO1xuLy8gICAgIGF2RnJhbWVzID0gMDtcbi8vICAgfVxuLy9cbi8vICAgd29ybGQucmVuZGVyKCk7XG4vLyAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKTtcbi8vIH1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLzJkL21haW4uanMiLCJcbmltcG9ydCBSZW5kZXJlciAgICAgZnJvbSAnLi9SZW5kZXJlcjJkJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV29ybGRcbntcbiAgY29uc3RydWN0b3Iob3B0aW9ucylcbiAge1xuICAgIHRoaXMuc2l6ZSA9IG9wdGlvbnMuc2l6ZTsgLy9jZWxscywgc3F1YXJlXG4gICAgdGhpcy5kYXRhID0gbnVsbDtcbiAgICB0aGlzLnB0eXBlID0ge307XG5cbiAgICB0aGlzLnB0eXBlWyd2ZXJ0aWNhbCddID0gdGhpcy52ZXJ0aWNhbDtcbiAgICB0aGlzLnB0eXBlWydzd2lybCddID0gdGhpcy5zd2lybDtcblxuICAgIHRoaXMucmVuZGVyZXIgPSBuZXcgUmVuZGVyZXIob3B0aW9ucy5yZW5kZXIpO1xuICAgIHRoaXMucmVuZGVyZXIuc2NhbGUgPSBvcHRpb25zLnNjYWxlO1xuXG4gICAgdGhpcy5ldm9sdmUgPSB0aGlzLnB0eXBlW29wdGlvbnMucHJvY2Vzc107XG5cbiAgICB0aGlzLmluaXQob3B0aW9ucy50eXBlLCBvcHRpb25zLnNwcmVhZCk7XG4gIH1cblxuICBpbml0KENlbGxUeXBlLCBzcHJlYWQpXG4gIHtcbiAgICAvLyBDcmVhdGUgdGhlIGFycmF5OlxuICAgIHRoaXMuZGF0YSA9IHRoaXMuYXJyYXkyZCh0aGlzLnNpemUpO1xuICAgIGxldCBpID0gMDtcblxuICAgIGZvciAobGV0IHk9MDsgeTx0aGlzLnNpemU7IHkrKylcbiAgICB7XG4gICAgICBmb3IgKGxldCB4PTA7IHg8dGhpcy5zaXplOyB4KyspXG4gICAgICB7XG4gICAgICAgIC8vIERvZXMgQ2VsbFR5cGUgcHJvdmlkZSBhIHN0YXRpYyAndGVzdCdpbmcgZnVuY3Rpb24/XG4gICAgICAgIGlmIChDZWxsVHlwZS50ZXN0KVxuICAgICAgICB7XG4gICAgICAgICAgLy8gSXMgaXQgb2sgaWYgd2UgcGxhY2UgdGhlIGNlbGwgaGVyZT9cbiAgICAgICAgICAvL2lmICgpXG4gICAgICAgICAgaWYgKE1hdGgucmFuZG9tKCkgPD0gc3ByZWFkKVxuICAgICAgICAgICAgdGhpcy5kYXRhW3ldW3hdID0gbmV3IENlbGxUeXBlKFxuICAgICAgICAgICAgICBDZWxsVHlwZS50ZXN0KHgseSx0aGlzLnNpemUsIHRoaXMuc2l6ZSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKE1hdGgucmFuZG9tKCkgPD0gc3ByZWFkKVxuICAgICAgICAgICAgdGhpcy5kYXRhW3ldW3hdID0gbmV3IENlbGxUeXBlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZW5kZXIoKVxuICB7XG4gICAgdGhpcy5yZW5kZXJlci5yZW5kZXIodGhpcy5kYXRhKTtcbiAgfVxuXG4gIG5laWdoYm91cmhvb2QoeCwgeSwgcilcbiAge1xuICAgIGxldCByYWRpdXMgPSByIHx8IDE7XG4gICAgbGV0IG51bSA9IChyYWRpdXMgKiAyKSArIDE7XG5cbiAgICBsZXQgdnggPSB4IC0gcmFkaXVzO1xuICAgIGxldCB2eSA9IHkgLSByYWRpdXM7XG5cbiAgICBsZXQgbiA9IHRoaXMuYXJyYXkyZChudW0pO1xuICAgIGxldCBsID0gW107XG5cbiAgICBmb3IgKGxldCBpeT0wOyBpeTxudW07IGl5KyspXG4gICAge1xuICAgICAgdnggPSB4IC0gcmFkaXVzO1xuICAgICAgZm9yIChsZXQgaXg9MDsgaXg8bnVtOyBpeCsrKVxuICAgICAge1xuICAgICAgICBuW2l5XVtpeF0gPSB0aGlzLmRhdGFbdGhpcy53cmFwKHZ5KV1bdGhpcy53cmFwKHZ4KV07XG4gICAgICAgIGwucHVzaCh0aGlzLmRhdGFbdGhpcy53cmFwKHZ5KV1bdGhpcy53cmFwKHZ4KV0pO1xuICAgICAgICB2eCsrO1xuICAgICAgfVxuICAgICAgdnkrKztcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgY2VsbHM6IG4sXG4gICAgICBsaW5lYXI6IGwsXG4gICAgICByYWRpdXM6IHJhZGl1cyxcbiAgICAgIHN1YmplY3Q6IHRoaXMuZGF0YVt5XVt4XVxuICAgIH1cbiAgfVxuXG4gIHdyYXAodilcbiAge1xuICAgIGlmICggdiA8IDAgKSByZXR1cm4gdiArIHRoaXMuc2l6ZTtcbiAgICBpZiAoIHYgPiB0aGlzLnNpemUtMSkgcmV0dXJuIHYgLSB0aGlzLnNpemU7XG4gICAgcmV0dXJuIHY7XG4gIH1cblxuICBhcnJheTJkKHNpemUpXG4gIHtcbiAgICBmb3IgKHZhciBkPVtdOyBkLmxlbmd0aCA8IHNpemU7IGQucHVzaChbXSkpO1xuICAgIHJldHVybiBkO1xuICB9XG5cbiAgLy8gbWFrZXMgdmVyeSBsaXR0bGUgZGlmZmVyZW5jZSA6L1xuICBzd2lybCgpXG4gIHtcbiAgICBsZXQgbmV4dCA9IHRoaXMuYXJyYXkyZCh0aGlzLnNpemUpO1xuICAgIGxldCBudW0gPSAodGhpcy5zaXplICogdGhpcy5zaXplKSArICh0aGlzLnNpemUgKiAyKTtcbiAgICBsZXQgeCA9IE1hdGgucm91bmQodGhpcy5zaXplIC8gMik7XG4gICAgbGV0IHkgPSBNYXRoLnJvdW5kKHRoaXMuc2l6ZSAvIDIpO1xuICAgIGxldCB4ZCA9IDEsIHlkID0gMTtcbiAgICBsZXQgdmlzaXRlZCA9IDA7XG5cbiAgICBsZXQgaXRlcmF0b3IgPSAxO1xuICAgIGRvXG4gICAge1xuICAgICAgZm9yIChsZXQgeGk9MDsgeGkgPCBpdGVyYXRvcjsgeGkrKylcbiAgICAgIHtcbiAgICAgICAgLy9jYW4uYmxvY2soeCAqIFZJRVdfU0NBTEUsIHkqVklFV19TQ0FMRSwgVklFV19TQ0FMRSwgVklFV19TQ0FMRSwgY29sKTtcbiAgICAgICAgaWYgKHRoaXMuZGF0YVt5XVt4XSlcbiAgICAgICAgICBuZXh0W3ldW3hdID0gdGhpcy5kYXRhW3ldW3hdLm11dGF0ZSh0aGlzLm5laWdoYm91cmhvb2QoeCx5KSk7XG5cbiAgICAgICAgeCArPSB4ZDtcbiAgICAgICAgdmlzaXRlZCsrO1xuICAgICAgICBpZiAoeCA8IDAgfHwgeCA+IHRoaXMuc2l6ZS0xKSBicmVhaztcbiAgICAgIH1cbiAgICAgIHhkID0gLXhkO1xuXG4gICAgICBmb3IgKGxldCB5aT0wOyB5aSA8IGl0ZXJhdG9yOyB5aSsrKVxuICAgICAge1xuXG4gICAgICAgIC8vY2FuLmJsb2NrKHggKiBWSUVXX1NDQUxFLCB5KlZJRVdfU0NBTEUsIFZJRVdfU0NBTEUsIFZJRVdfU0NBTEUsIGNvbCk7XG4gICAgICAgIGlmICh0aGlzLmRhdGFbeV1beF0pXG4gICAgICAgICAgbmV4dFt5XVt4XSA9IHRoaXMuZGF0YVt5XVt4XS5tdXRhdGUodGhpcy5uZWlnaGJvdXJob29kKHgseSkpO1xuXG4gICAgICAgIHkgKz0geWQ7XG4gICAgICAgIHZpc2l0ZWQrKztcbiAgICAgICAgaWYgKHkgPCAwIHx8IHkgPiB0aGlzLnNpemUtMSkgYnJlYWs7XG4gICAgICB9XG4gICAgICB5ZCA9IC15ZDtcblxuICAgICAgaXRlcmF0b3IgKz0gMTtcbiAgICB9IHdoaWxlKHZpc2l0ZWQgPCBudW0pO1xuXG4gICAgdGhpcy5kYXRhID0gbmV4dDtcbiAgfVxuXG4gIHZlcnRpY2FsKClcbiAge1xuICAgIGxldCBuZXh0ID0gdGhpcy5hcnJheTJkKHRoaXMuc2l6ZSk7XG5cbiAgICB0aGlzLnByZXBhcmUoKTtcblxuICAgIGZvciAobGV0IHk9MDsgeTx0aGlzLnNpemU7IHkrKylcbiAgICB7XG4gICAgICBmb3IgKGxldCB4PTA7IHg8dGhpcy5zaXplOyB4KyspXG4gICAgICB7XG4gICAgICAgIGlmICh0aGlzLmRhdGFbeV1beF0pXG4gICAgICAgICAgbmV4dFt5XVt4XSA9IHRoaXMuZGF0YVt5XVt4XS5tdXRhdGUodGhpcy5uZWlnaGJvdXJob29kKHgseSkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuZGF0YSA9IG5leHQ7XG4gIH1cblxuXG4gIHByZXBhcmUoKVxuICB7XG4gICAgbGV0IG4gPSAwO1xuICAgIGZvciAobGV0IHk9MDsgeTx0aGlzLnNpemU7IHkrKylcbiAgICAgIGZvciAobGV0IHg9MDsgeDx0aGlzLnNpemU7IHgrKylcbiAgICAgICAgaWYgKHRoaXMuZGF0YVt5XVt4XSkgdGhpcy5kYXRhW3ldW3hdLnByZXBhcmUoKTtcblxuICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLzJkL2NvcmUvV29ybGQuanMiLCJcbmltcG9ydCBDYW52YXMyZCBmcm9tICcuLi8uLi9zaGFyZWQvQ2FudmFzMmQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZW5kZXJlcjJkXG57XG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQpXG4gIHtcbiAgICB0aGlzLmNhbnZhczJkID0gbmV3IENhbnZhczJkKGVsZW1lbnQpO1xuICAgIHRoaXMuc2NhbGUgPSAxO1xuICAgIHRoaXMuc2l6ZSA9IDE7XG4gIH1cblxuICByZXNpemUodywgaClcbiAge1xuICAgIHRoaXMuY2FudmFzMmQucmVzaXplKHcsIGgpO1xuICAgIHRoaXMuY2FudmFzMmQuY2xlYXIoKTtcbiAgfVxuXG4gIHJlbmRlcihkYXRhKVxuICB7XG5cbiAgICBpZiAoZGF0YS5sZW5ndGggIT0gdGhpcy5zaXplKVxuICAgIHtcbiAgICAgIHRoaXMuc2l6ZSA9IGRhdGEubGVuZ3RoO1xuICAgICAgdGhpcy5yZXNpemUodGhpcy5zaXplICogdGhpcy5zY2FsZSwgdGhpcy5zaXplICogdGhpcy5zY2FsZSk7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgeT0wOyB5PHRoaXMuc2l6ZTsgeSsrKVxuICAgIHtcbiAgICAgIGZvciAobGV0IHg9MDsgeDx0aGlzLnNpemU7IHgrKylcbiAgICAgIHtcbiAgICAgICAgaWYgKGRhdGFbeV1beF0pXG4gICAgICAgIHtcbiAgICAgICAgICBsZXQgY29sID0gZGF0YVt5XVt4XS5zaGFkZXIoKTtcbiAgICAgICAgLy9sZXQgY29sID0gZGF0YVt5XVt4XSA/IFswLDAsMF0gOiBbMjU1LDI1NSwyNTVdO1xuICAgICAgICAgIHRoaXMuY2FudmFzMmQuYmxvY2soeCAqIHRoaXMuc2NhbGUsIHkgKiB0aGlzLnNjYWxlLCB0aGlzLnNjYWxlLCB0aGlzLnNjYWxlLCBjb2wpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vMmQvY29yZS9SZW5kZXJlcjJkLmpzIiwiXG5cbi8vIEJvaWxlcnBsYXRlIGZ1bmN0aW9ucyB0byB3cml0ZSB0byB0aGUgQ2FudmFzXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhbnZhczJkXG57XG4gIGNvbnN0cnVjdG9yKHBhcmVudClcbiAge1xuICAgIHRoaXMucGFyZW50ID0gdHlwZW9mIHBhcmVudCA9PSAnc3RyaW5nJyA/IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBhcmVudCkgOiBwYXJlbnQ7XG4gICAgdGhpcy5lbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICB0aGlzLnBhcmVudC5hcHBlbmRDaGlsZCh0aGlzLmVsZW1lbnQpO1xuICAgIHRoaXMuY29udGV4dCA9IHRoaXMuZWxlbWVudC5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgdGhpcy5jbGVhcigpO1xuXG4gIH1cblxuICBibG9jayh4LHksdyxoLGMpXG4gIHtcbiAgICBsZXQgdCA9IHRoaXMuY29udGV4dDtcbiAgICB0LmJlZ2luUGF0aCgpO1xuICAgIHQucmVjdCh4LCB5LCB3LCBoKTtcbiAgICB0LmZpbGxTdHlsZSA9IGMgPyBgcmdiKCR7Y1swXX0sJHtjWzFdfSwke2NbMl19KWAgOiBcImJsYWNrXCI7XG4gICAgdC5maWxsKCk7XG4gIH1cblxuICBzZWxmYmxpdChzeCwgc3ksIHN3LCBzaCwgZHgsIGR5LCBkdywgZGgpXG4gIHtcbiAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKHRoaXMuY29udGV4dC5jYW52YXMsIHN4LCBzeSwgc3csIHNoLCBkeCwgZHksIGR3LCBkaCk7XG4gIH1cblxuICBjbGVhcihjKVxuICB7XG4gICAgbGV0IHQgPSB0aGlzLmNvbnRleHQ7XG4gICAgdC5iZWdpblBhdGgoKTtcbiAgICB0LnJlY3QoMCwgMCwgdGhpcy5lbGVtZW50LndpZHRoLCB0aGlzLmVsZW1lbnQuaGVpZ2h0KTtcbiAgICB0LmZpbGxTdHlsZSA9IGMgPyBgcmdiKCR7Y1swXX0sJHtjWzFdfSwke2NbMl19KWAgOiBcIndoaXRlXCI7XG4gICAgdC5maWxsKCk7XG4gIH1cblxuICB3aWR0aCgpXG4gIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50LndpZHRoO1xuICB9XG5cbiAgaGVpZ2h0KClcbiAge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnQuaGVpZ2h0O1xuICB9XG5cbiAgZml0d2luZG93KClcbiAge1xuICAgIHRoaXMucmVzaXplKHRoaXMucGFyZW50LmNsaWVudFdpZHRoLCB0aGlzLnBhcmVudC5jbGllbnRIZWlnaHQpO1xuICB9XG5cbiAgcmVzaXplKHcsIGgpXG4gIHtcblxuICAgIHRoaXMuZWxlbWVudC53aWR0aCA9IHc7XG4gICAgdGhpcy5lbGVtZW50LmhlaWdodCA9IGg7XG5cbiAgICAvLyBkcmF3KClcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2hhcmVkL0NhbnZhczJkLmpzIiwiXG5pbXBvcnQgQ2VsbCBmcm9tICcuL0NlbGwnO1xuXG5jb25zdCBBTElWRSA9IDEsIERFQUQgPSAwO1xuXG5jb25zdCBwYWxldHRlID0gW1xuICBbMjU1LDI1NSwyNTVdLFxuICBbMCwwLDBdXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lT2ZMaWZlIGV4dGVuZHMgQ2VsbFxue1xuICBjb25zdHJ1Y3RvcigpXG4gIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuYWxpdmUgPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkpO1xuICB9XG5cbiAgc2hhZGVyKClcbiAgeyAgICBcbiAgICByZXR1cm4gcGFsZXR0ZVsgdGhpcy5hbGl2ZSBdO1xuICB9XG5cblxuICBldmFsdWF0ZSgpXG4gIHtcbiAgICByZXR1cm4gdGhpcy5hbGl2ZSA/IDEgOiAwO1xuICB9XG5cbiAgLy8gLy8gR2V0cyBvciBhc3NpZ25zIGEgJ3ZhbHVlJyB0byBmZWVkYmFjayBpbnRvIHRoZSBDZWxsICdpbnRlcmZhY2UnIGNvdW50aW5nIG1ldGhvZFxuICB2YWx1ZSh2KVxuICB7XG4gICAgaWYgKHYgPT09IHVuZGVmaW5lZCkgcmV0dXJuIHRoaXMuYWxpdmUgPyAxIDogMDtcbiAgICB0aGlzLmFsaXZlID0gKHYgPT0gMCkgPyBERUFEIDogQUxJVkU7XG4gIH1cblxuXG4gIG11dGF0ZShjZWxscylcbiAge1xuICAgIGxldCBuID0gdGhpcy5udW1MaXZlTmVpZ2hib3VycyhjZWxscyk7XG4gICAgbGV0IG1lID0gbmV3IEdhbWVPZkxpZmUoKTtcbiAgICBsZXQgbmV3U3RhdGUgPSBERUFEO1xuXG4gICAgaWYgKGNlbGxzLnN1YmplY3QuYWxpdmUgJiYgbiA8IDIpXG4gICAgICBuZXdTdGF0ZSA9IERFQUQ7XG4gICAgZWxzZSBpZiAoY2VsbHMuc3ViamVjdC5hbGl2ZSAmJiBuID4gMylcbiAgICAgIG5ld1N0YXRlID0gREVBRDtcbiAgICBlbHNlIGlmICghY2VsbHMuc3ViamVjdC5hbGl2ZSAmJiBuID09IDMpXG4gICAgICBuZXdTdGF0ZSA9IEFMSVZFO1xuICAgIGVsc2VcbiAgICAgIG5ld1N0YXRlID0gY2VsbHMuc3ViamVjdC52YWx1ZSgpO1xuXG4gICAgbWUudmFsdWUobmV3U3RhdGUpO1xuXG4gICAgcmV0dXJuIG1lO1xuICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLzJkL2NlbGxzL0dvTC5qcyIsIlxuLy8gVGhpcyBpcyB0aGUgYmFzZSB0eXBlIG9mIENlbGwgdXNlZCBmb3IgZXZlcnkgQ0EgdHlwZS5cbi8vIEl0J3MgbW9yZSBvZiBhIGNsYXNzaWNhbCBcIkludGVyZmFjZVwiIHRoYW4gYSBjbGFzcyBJIHN1cHBvc2VcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2VsbFxue1xuICBjb25zdHJ1Y3RvcigpXG4gIHtcblxuICB9XG5cbiAgcHJlcGFyZSgpXG4gIHtcblxuICB9XG5cbiAgbXV0YXRlKG5laWdoYm91cnMpXG4gIHtcblxuICB9XG5cbiAgc2hhZGVyKClcbiAge1xuXG4gIH1cblxuXG4gIHZhbHVlKClcbiAge1xuXG4gIH1cblxuICBudW1MaXZlTmVpZ2hib3VycyhuKVxuICB7XG4gICAgbGV0IG51bSA9IDA7XG5cbiAgICBmb3IgKGxldCB5ID0gMDsgeTxuLmNlbGxzLmxlbmd0aDsgeSsrKVxuICAgICAgZm9yIChsZXQgeCA9IDA7IHg8bi5jZWxsc1t5XS5sZW5ndGg7IHgrKylcbiAgICAgICAgaWYgKG4uY2VsbHNbeV1beF0pIGlmIChuLmNlbGxzW3ldW3hdLnZhbHVlKCkgPiAwKSBudW0gKys7XG5cbiAgICAvLyBkb24ndCBpbmNsdWRlICd1cycgaW4gdGhlIGNvdW50IVxuICAgIHJldHVybiBudW0gLSAobi5zdWJqZWN0LnZhbHVlKCkgPiAwID8gMSA6IDApO1xuICB9XG5cbiAgbnVtTmVpZ2hib3Vyc1dpdGhWYWx1ZShuLCB2KVxuICB7XG4gICAgbGV0IG51bSA9IDA7XG5cbiAgICBmb3IgKGxldCB0PTA7IHQ8bi5saW5lYXIubGVuZ3RoOyB0KyspXG4gICAge1xuICAgICAgaWYgKG4ubGluZWFyW3RdKVxuICAgICAgICBpZiAobi5saW5lYXJbdF0udmFsdWUoKSA9PSB2KSBudW0rKztcbiAgICB9XG4gICAgcmV0dXJuIG51bTtcbiAgfVxuXG4gIGF2ZXJhZ2VWYWx1ZU5laWdoYm91cnMobilcbiAge1xuICAgIGxldCBzdW0gPSAwO1xuICAgIGZvciAobGV0IHQ9MDsgdDxuLmxpbmVhci5sZW5ndGg7IHQrKylcbiAgICB7XG4gICAgICBpZiAobi5saW5lYXJbdF0pXG4gICAgICB7XG4gICAgICAgIHN1bSArPSBuLmxpbmVhclt0XS52YWx1ZSgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHN1bSAtPSBuLnN1YmplY3QudmFsdWUoKTtcblxuICAgIHJldHVybiBzdW0gLyAobi5saW5lYXIubGVuZ3RoLTEpO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi8yZC9jZWxscy9DZWxsLmpzIiwiXG5pbXBvcnQgQ2VsbCBmcm9tICcuL0NlbGwnO1xuaW1wb3J0IFV0aWwgZnJvbSAnLi9VdGlsJztcblxuY29uc3QgTUFYX1ZBTFVFUyA9IDMyO1xuY29uc3QgUj0wLCBHPTEsIEI9Mjtcbi8vXG4vLyBjb25zdCBwYWxldHRlID0gW1xuLy8gICBbMTAsIDI1NSwgOTZdLFxuLy8gICBbMjU1LCAzMiwgMjU1XSxcbi8vICAgWzE3MiwgNTQsIDI1NV0sXG4vLyAgIFszMiwgMzIsIDI1NV0sXG4vLyAgIFszMiwgMjU1LCAyNTVdLFxuLy8gICBbMzIsIDMyLCAyNTVdLFxuLy8gICBbMjU1LCAyNTUsIDMyXVxuLy8gXTtcblxuLy8gbmljZSBjbG91ZHNcbi8vIGNvbnN0IHBhbGV0dGUgPSBbXG4vLyAgIFs1MywgMTc3LCAyNTVdLFxuLy8gICBbMjAwLCAyMDAsIDIxNV0sXG4vLyAgIFsyNTUsIDI1NSwgMjU1XVxuLy8gXTtcblxuLy8gZmlyZSBpc2hcbi8vIGNvbnN0IHBhbGV0dGUgPSBbXG4vLyAgIFsyNTUsIDAsIDBdLFxuLy8gICBbMjU1LCAyNTUsIDBdLFxuLy8gICBbMjU1LCAyNTUsIDIyMF1cbi8vIF07XG5cbmNvbnN0IHBhbGV0dGUgPSBbXG4gIFsyNTUsMCwwLDFdLCBbMjU1LDk2LDAsMV0sIFsyNTUsMTkxLDAsMV0sIFsyMjMsMjU1LDAsMV0sXG4gIFsxMjgsMjU1LDAsMV0sIFszMiwyNTUsMCwxXSwgWzAsMjU1LDY0LDFdLCBbMCwyNTUsMTU5LDFdLFxuICBbMCwyNTUsMjU1LDFdLCBbMCwxNTksMjU1LDFdLCBbMCw2NCwyNTUsMV0sIFszMiwwLDI1NSwxXSxcbiAgWzEyNywwLDI1NSwxXSwgWzIyMywwLDI1NSwxXSwgWzI1NSwwLDE5MSwxXSwgWzI1NSwwLDk2LDFdXG5dO1xuXG5jb25zdCBSRURTID0gcGFsZXR0ZS5tYXAoKGUpID0+IHsgcmV0dXJuIGVbUl0gfSk7XG5jb25zdCBHUkVFTlMgPSBwYWxldHRlLm1hcCgoZSkgPT4geyByZXR1cm4gZVtHXSB9KTtcbmNvbnN0IEJMVUVTID0gcGFsZXR0ZS5tYXAoKGUpID0+IHsgcmV0dXJuIGVbQl0gfSk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZsb29kIGV4dGVuZHMgQ2VsbFxue1xuICBjb25zdHJ1Y3RvcigpXG4gIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuc3RhdGUgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBNQVhfVkFMVUVTKTtcbiAgfVxuXG4gIHNoYWRlcigpXG4gIHtcbiAgICBsZXQgaSA9IHRoaXMudmFsdWUoKSAvIE1BWF9WQUxVRVM7XG5cbiAgICByZXR1cm4gW1xuICAgICAgVXRpbC5pbGluZXJwKFJFRFMsIGkpICYgMHhmZixcbiAgICAgIFV0aWwuaWxpbmVycChHUkVFTlMsIGkpICYgMHhmZixcbiAgICAgIFV0aWwuaWxpbmVycChCTFVFUywgaSkgJiAweGZmXG4gICAgXTtcblxuICB9XG5cbiAgLy8gLy8gR2V0cyBvciBhc3NpZ25zIGEgJ3ZhbHVlJyB0byBmZWVkYmFjayBpbnRvIHRoZSBDZWxsICdpbnRlcmZhY2UnIGNvdW50aW5nIG1ldGhvZFxuICB2YWx1ZSh2KVxuICB7XG4gICAgaWYgKHYgPT0gdW5kZWZpbmVkKSByZXR1cm4gdGhpcy5zdGF0ZTtcbiAgICB0aGlzLnN0YXRlID0gdjtcbiAgfVxuXG5cbiAgbXV0YXRlKGVudGl0eSlcbiAge1xuXG4gICAgbGV0IG5leHQgPSAodGhpcy52YWx1ZSgpICsgMSArIChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAzKSkpICUgTUFYX1ZBTFVFUztcbiAgICAvLyh0aGlzLnZhbHVlKCkgKyAoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNSkpKSAlIE1BWF9WQUxVRVM7XG5cbiAgICBsZXQgY2hhbmdlID0gZmFsc2U7XG4gICAgZm9yIChsZXQgdD0wOyB0PGVudGl0eS5saW5lYXIubGVuZ3RoOyB0KyspXG4gICAge1xuICAgICAgaWYgKGVudGl0eS5saW5lYXJbdF0pXG4gICAgICAgIGNoYW5nZSA9IGNoYW5nZSB8fCBlbnRpdHkubGluZWFyW3RdLnZhbHVlKCkgPT09IG5leHQ7XG4gICAgfVxuXG4gICAgaWYgKCFjaGFuZ2UpXG4gICAge1xuICAgICAgbGV0IG5jID0gdGhpcy5hdmVyYWdlVmFsdWVOZWlnaGJvdXJzKGVudGl0eSk7XG4gICAgICBpZiAoTWF0aC5hYnModGhpcy52YWx1ZSgpIC0gbmMpID09IDEpXG4gICAgICAgIHRoaXMudmFsdWUobmMpO1xuXG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZSlcbiAgICAgIHRoaXMudmFsdWUobmV4dCk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG5cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vMmQvY2VsbHMvRmxvb2QuanMiLCJcblxuY2xhc3MgVXRpbFxue1xuICBjb25zdHJ1Y3RvcigpXG4gIHtcblxuICB9XG5cbiAgLy8gTGluZWFybHkgaW50ZXJwb2xhdGVzIGJldHdlZW4gYW4gYXJyYXkgb2YgdmFsdWVzXG4gIC8vIGUuZy4gdmFsdWVzID0gWzUsIDEwLCAxXSwgcCA9IDAuLjFcblxuICBpbGluZXJwKHZhbHVlcywgcG9zaXRpb24pXG4gIHtcbiAgICBpZiAocG9zaXRpb24gPj0gMSkgcmV0dXJuIHZhbHVlc1t2YWx1ZXMubGVuZ3RoLTFdO1xuICAgIGlmIChwb3NpdGlvbiA8IDApIHJldHVybiB2YWx1ZXNbMF07XG5cbiAgICBsZXQgcCA9IHBvc2l0aW9uICogKHZhbHVlcy5sZW5ndGggLSAxKTtcblxuICAgIGxldCBpMSA9IE1hdGguZmxvb3IocCk7XG4gICAgbGV0IGkyID0gaTEgKyAxO1xuICAgIGxldCBxID0gcCAtIGkxO1xuXG4gICAgbGV0IHYgPSAodmFsdWVzW2kxXSAqICgxLXEpKSArICh2YWx1ZXNbaTJdICogKHEpKTtcblxuICAgIHJldHVybiBNYXRoLnJvdW5kKHYpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IChuZXcgVXRpbCgpKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLzJkL2NlbGxzL1V0aWwuanMiLCJcbmltcG9ydCBDZWxsIGZyb20gJy4vQ2VsbCc7XG5pbXBvcnQgVXRpbCBmcm9tICcuL1V0aWwnO1xuXG5jb25zdCBwYWxldHRlID0gW1xuICBbMjU1LDI1NSwyNTVdLFxuICBbMCwwLDBdXG5dO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJ1cnJvdyBleHRlbmRzIENlbGxcbntcbiAgY29uc3RydWN0b3IoKVxuICB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLm9wZW4gPSBNYXRoLnJhbmRvbSgpID4gMC40O1xuICB9XG5cbiAgcHJlcGFyZSgpXG4gIHtcbiAgICB0aGlzLndhc09wZW4gPSB0aGlzLm9wZW47XG4gIH1cblxuICBzaGFkZXIoKVxuICB7XG4gICAgcmV0dXJuIHBhbGV0dGUgWyB0aGlzLnZhbHVlKCkgXTtcbiAgfVxuXG5cbiAgdmFsdWUodilcbiAge1xuICAgIHJldHVybiB0aGlzLndhc09wZW4gPyAxIDogMDtcbiAgfVxuXG5cbiAgbXV0YXRlKGVudGl0eSlcbiAge1xuICAgIGxldCBudW0gPSB0aGlzLm51bUxpdmVOZWlnaGJvdXJzKGVudGl0eSk7XG4gICAgdGhpcy5vcGVuID0gKHRoaXMud2FzT3BlbiAmJiBudW0gPj00KSB8fCBudW0gPj0gNjtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vMmQvY2VsbHMvQnVycm93LmpzIiwiXG5pbXBvcnQgQ2VsbCBmcm9tICcuL0NlbGwnO1xuaW1wb3J0IFV0aWwgZnJvbSAnLi9VdGlsJztcblxuY29uc3QgTUFYX1ZBTFVFUyA9IDMyO1xuY29uc3QgUj0wLEc9MSxCPTI7XG5jb25zdCBwYWxldHRlID0gW1xuICBbMCwwLDAsMV0sIFsyNTUsMCwwLDBdLCBbMjU1LDk2LDAsMV0sIFsyNTUsMTkxLDAsMV0sIFsyMjMsMjU1LDAsMV0sXG4gIFsxMjgsMjU1LDAsMV0sIFszMiwyNTUsMCwxXSwgWzAsMjU1LDY0LDFdLCBbMCwyNTUsMTU5LDFdLFxuICBbMCwyNTUsMjU1LDFdLCBbMCwxNTksMjU1LDFdLCBbMCw2NCwyNTUsMV0sIFszMiwwLDI1NSwxXSxcbiAgWzEyNywwLDI1NSwxXSwgWzIyMywwLDI1NSwxXSwgWzI1NSwwLDE5MSwxXSwgWzI1NSwwLDk2LDFdXG5dO1xuXG5cbmNvbnN0IFJFRFMgPSBwYWxldHRlLm1hcCgoZSkgPT4geyByZXR1cm4gZVtSXSB9KTtcbmNvbnN0IEdSRUVOUyA9IHBhbGV0dGUubWFwKChlKSA9PiB7IHJldHVybiBlW0ddIH0pO1xuY29uc3QgQkxVRVMgPSBwYWxldHRlLm1hcCgoZSkgPT4geyByZXR1cm4gZVtCXSB9KTtcblxuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJsdXIgZXh0ZW5kcyBDZWxsXG57XG4gIGNvbnN0cnVjdG9yKClcbiAge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5zdGF0ZSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIE1BWF9WQUxVRVMpO1xuICB9XG5cbiAgcHJlcGFyZSgpXG4gIHtcblxuICB9XG5cbiAgc2hhZGVyKClcbiAge1xuICAgIGxldCBpID0gdGhpcy5zdGF0ZSAvIE1BWF9WQUxVRVM7XG4gICAgcmV0dXJuIFtcbiAgICAgIFV0aWwuaWxpbmVycChSRURTLCBpKSAmIDB4ZmYsXG4gICAgICBVdGlsLmlsaW5lcnAoR1JFRU5TLCBpKSAmIDB4ZmYsXG4gICAgICBVdGlsLmlsaW5lcnAoQkxVRVMsIGkpICYgMHhmZlxuICAgIF07XG5cbiAgfVxuXG5cbiAgLy8gLy8gR2V0cyBvciBhc3NpZ25zIGEgJ3ZhbHVlJyB0byBmZWVkYmFjayBpbnRvIHRoZSBDZWxsICdpbnRlcmZhY2UnIGNvdW50aW5nIG1ldGhvZFxuICB2YWx1ZSh2KVxuICB7XG4gICAgaWYgKHYgPT0gdW5kZWZpbmVkKSByZXR1cm4gdGhpcy5zdGF0ZTtcbiAgICBpZiAodiA8IDApIHYrPSBNQVhfVkFMVUVTO1xuICAgIHRoaXMuc3RhdGUgPSBNYXRoLnJvdW5kKHYpO1xuICB9XG5cblxuICBtdXRhdGUoZW50aXR5KVxuICB7XG4gICAgLy8gaWYgKGVudGl0eS5jZWxsc1swXVsxXS52YWx1ZSgpID4gdGhpcy52YWx1ZSgpKVxuICAgIC8vIHtcbiAgICAvLyAgIGxldCB0ID0gdGhpcy52YWx1ZSgpO1xuICAgIC8vICAgdGhpcy52YWx1ZShlbnRpdHkuY2VsbHNbMF1bMV0udmFsdWUoKSk7XG4gICAgLy8gICBlbnRpdHkuY2VsbHNbMF1bMV0udmFsdWUodCk7XG4gICAgLy8gfSBlbHNlIHtcbiAgICAvLyAgIGxldCB0ID0gdGhpcy52YWx1ZSgpO1xuICAgIC8vICAgdGhpcy52YWx1ZShlbnRpdHkuY2VsbHNbMV1bMl0udmFsdWUoKSk7XG4gICAgLy8gICBlbnRpdHkuY2VsbHNbMV1bMl0udmFsdWUodCk7XG4gICAgLy8gfVxuICAgIGxldCBhdiA9IHRoaXMuYXZlcmFnZVZhbHVlTmVpZ2hib3VycyhlbnRpdHkpO1xuICAgIHRoaXMudmFsdWUoYXYpO1xuXG4gICAgLy8gaWYgKHRoaXMubnVtTmVpZ2hib3Vyc1dpdGhWYWx1ZShlbnRpdHksIDApID49IDIpXG4gICAgLy8ge1xuICAgIC8vICAgdGhpcy52YWx1ZShNQVhfVkFMVUVTLTEpO1xuICAgIC8vIH1cblxuICAgIC8vbGV0IGF2ID0gdGhpcy5hdmVyYWdlVmFsdWVOZWlnaGJvdXJzKGVudGl0eSkgKiAxLjA7XG5cblxuICAgIGlmIChNYXRoLnJhbmRvbSgpIDwgMC4wMSkgdGhpcy52YWx1ZSggMCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vMmQvY2VsbHMvQmx1ci5qcyIsIlxuaW1wb3J0IENlbGwgZnJvbSAnLi9DZWxsJztcbmltcG9ydCBVdGlsIGZyb20gJy4vVXRpbCc7XG5cbmNvbnN0IE1BWF9WQUxVRVMgPSAxNjtcblxuY29uc3QgcGFsZXR0ZSA9IFtcbiAgWzAsIDAsIDBdLFxuICBbMjU1LCAyNTUsIDI1NV1cbl07XG5cbmNvbnN0IGJ3cGFsZXR0ZSA9IFsgMCwgMjU1IF07XG5cbmNsYXNzIFNub3cgZXh0ZW5kcyBDZWxsXG57XG4gIGNvbnN0cnVjdG9yKHBhc3MpXG4gIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5zbm93aW5nID0gZmFsc2U7XG4gICAgdGhpcy52YWx1ZSgwKTtcblxuICAgIGlmIChwYXNzKVxuICAgICAgICB0aGlzLnN0YXJ0U25vd2luZygpO1xuICB9XG5cbiAgcHJlcGFyZSgpXG4gIHtcblxuICB9XG5cbiAgc3RhcnRTbm93aW5nKClcbiAge1xuICAgIHRoaXMuc25vd2luZyA9IHRydWU7XG4gICAgdGhpcy52YWx1ZSAoKE1hdGgucmFuZG9tKCkgPiAwLjYpID8gTUFYX1ZBTFVFUyA6IDApO1xuICB9XG5cbiAgc2hhZGVyKClcbiAge1xuICAgIGxldCBpID0gVXRpbC5pbGluZXJwKGJ3cGFsZXR0ZSwgdGhpcy52YWx1ZSgpIC8gTUFYX1ZBTFVFUyk7XG4gICAgcmV0dXJuIFsgaSwgaSwgaSBdO1xuXG4gICAgLy9yZXR1cm4gcGFsZXR0ZSBbIHRoaXMudmFsdWUoKSBdO1xuICB9XG5cbiAgdmFsdWUodilcbiAge1xuICAgIGlmICh2ID09IHVuZGVmaW5lZCkgcmV0dXJuIHRoaXMuc3RhdGU7XG4gICAgdGhpcy5zdGF0ZSA9IHY7XG4gIH1cblxuICBtdXRhdGUoZW50aXR5KVxuICB7XG4gICAgaWYgKHRoaXMuc25vd2luZylcbiAgICB7XG4gICAgICB0aGlzLnZhbHVlKCB0aGlzLnZhbHVlKCkgLSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAzKSk7XG4gICAgICAvL1xuICAgICAgaWYgKHRoaXMudmFsdWUoKSA8IDgpXG4gICAgICB7XG4gICAgICAgICAgZW50aXR5LmNlbGxzWzJdWzFdLnNub3dpbmcgPSB0cnVlO1xuICAgICAgICAgIGVudGl0eS5jZWxsc1syXVsxXS52YWx1ZSh0aGlzLnZhbHVlKCkgKyA0KTtcbiAgICAgICAgICB0aGlzLnZhbHVlKE1BWF9WQUxVRVMpO1xuICAgICAgfVxuICAgICAgLy9cbiAgICAgIC8vIGlmICh0aGlzLnZhbHVlKCkgPD0gMClcbiAgICAgIC8vIHtcbiAgICAgIC8vICAgdGhpcy52YWx1ZSgwKTtcbiAgICAgIC8vICAgdGhpcy5zbm93aW5nID0gZmFsc2U7XG4gICAgICAvLyB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgfVxuXG59XG5cblNub3cudGVzdCA9ICh4LCB5LCB3LCBoKSA9PiB7XG4gIHJldHVybiB5ID09IDA7XG4gIC8vcmV0dXJuIHRydWU7XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNub3c7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi8yZC9jZWxscy9Tbm93LmpzIiwiXG4vL1xuLy8gQWxhbiBNYWNMZW9kIDA0LU1heS0yMDE3XG4vL1xuLy8gR3JpZC5qc1xuLy8gQ2hlYXAgKmR5bmFtaWMqIHNwYXRpYWwgaW5kZXguXG4vLyBTcGxpdHMgYW4gYXJlYSBpbnRvIGEgc2ltcGxlIGdyaWQsIGVhY2ggY2VsbCBrZWVwcyB0cmFjayBvZiBhIGxpc3Qgb2Ygb2JqZWN0c1xuLy8gR2VuZXJhbGx5IHBlcmZvcm1zIGJldHRlciBvbiBtb2Rlcm4gaGFyZHdhcmUgY29tcGFyZWQgdG8gcmVjb25zdHJ1Y3RpbmcgYSBxdWFkdHJlZSBldGNcbi8vIGFkZCgpIG9yIG1vdmUoKSBvYmplY3RzLiBQZXJmb3JtY2UgbmVhcmVzdCBuZWlnaGJvdXIgc2VhcmNoIHdpdGggcXVlcnkoKVxuLy8gV29yc3QgY2FzZSBwZXJmb3JtYW5jZSBPKG4pIGlmIGFsbCBvYmplY3RzIGJ1bmNoZWQgaW50byBvbmUgY2VsbCAoVF9UKVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTcGF0aWFsR3JpZFxue1xuICBjb25zdHJ1Y3RvcihtaW54LCBtaW55LCBtYXh4LCBtYXh5LCBjZWxscylcbiAge1xuICAgIHRoaXMuZ3JpZCA9IHRoaXMuYXJyYXkyZChjZWxscywgY2VsbHMpO1xuXG4gICAgdGhpcy53aWR0aCA9IChtYXh4IC0gbWlueCk7XG4gICAgdGhpcy5oZWlnaHQgPSAobWF4eSAtIG1pbnkpO1xuICAgIHRoaXMubnVtY2VsbHMgPSBjZWxscztcbiAgICB0aGlzLnhjZWxsc2l6ZSA9IHRoaXMud2lkdGggIC8gY2VsbHM7XG4gICAgdGhpcy55Y2VsbHNpemUgPSB0aGlzLmhlaWdodCAvIGNlbGxzO1xuXG4gICAgdGhpcy5tYXhSYWRpdXMgPSAoTWF0aC5zcXJ0KHRoaXMud2lkdGggKiB0aGlzLndpZHRoICsgdGhpcy5oZWlnaHQgKiB0aGlzLmhlaWdodCkpO1xuXG4gIH1cblxuICAvLyBFeHBlY3RzOiBgaXRlbWAgY29udGFpbnMgYHhgIGFuZCBgeWAgcHJvcGVydGllc1xuICBhZGQoaXRlbSlcbiAge1xuICAgIC8vIFdoaWNoIGNlbGxcbiAgICBsZXQgY2VsbHggPSB0aGlzLndyYXAoKGl0ZW0ueCAtIHRoaXMubW9kKGl0ZW0ueCwgdGhpcy54Y2VsbHNpemUpKSAvIHRoaXMueGNlbGxzaXplKTtcbiAgICBsZXQgY2VsbHkgPSB0aGlzLndyYXAoKGl0ZW0ueSAtIHRoaXMubW9kKGl0ZW0ueSwgdGhpcy55Y2VsbHNpemUpKSAvIHRoaXMueWNlbGxzaXplKTtcblxuICAgIGxldCBjZWxsID0gdGhpcy5ncmlkW2NlbGx5XVtjZWxseF0gfHwgW107XG5cbiAgICBpZiAoIWNlbGwuaW5jbHVkZXMoaXRlbSkpXG4gICAgICBjZWxsLnB1c2goaXRlbSk7XG5cbiAgICB0aGlzLmdyaWRbY2VsbHldW2NlbGx4XSA9IGNlbGw7XG4gIH1cblxuICAvLyBGUk9NKGZ4LGZ5KSAtPiBUTyh0eCx0eSlcbiAgbW92ZShpdGVtLCBmeCwgZnksIHR4LCB0eSlcbiAge1xuICAgIGxldCBjZWxsZnggPSAoZnggLSAodGhpcy5tb2QoZngsIHRoaXMueGNlbGxzaXplKSkpIC8gdGhpcy54Y2VsbHNpemU7XG4gICAgbGV0IGNlbGxmeSA9IChmeSAtICh0aGlzLm1vZChmeSwgdGhpcy55Y2VsbHNpemUpKSkgLyB0aGlzLnljZWxsc2l6ZTtcbiAgICBsZXQgY2VsbHR4ID0gKHR4IC0gKHRoaXMubW9kKHR4LCB0aGlzLnhjZWxsc2l6ZSkpKSAvIHRoaXMueGNlbGxzaXplO1xuICAgIGxldCBjZWxsdHkgPSAodHkgLSAodGhpcy5tb2QodHksIHRoaXMueWNlbGxzaXplKSkpIC8gdGhpcy55Y2VsbHNpemU7XG5cbiAgICAvLyBXZSBoYXZlbid0IGxlZnQgdGhlIGNlbGwsIGNhcnJ5IG9uXG4gICAgaWYgKChjZWxsZnggPT0gY2VsbHR4KSAmJiAoY2VsbGZ5ID09IGNlbGx0eSkpIHJldHVybjtcblxuICAgIC8vIFJlbW92ZSB1cyBmcm9tIHRoZSBsYXN0IGNlbGxcbiAgICBsZXQgY2VsbCA9IHRoaXMuZ3JpZFtjZWxsZnldW2NlbGxmeF07XG4gICAgY2VsbC5zcGxpY2UoY2VsbC5pbmRleE9mKGl0ZW0pLCAxKTtcblxuICAgIC8vIEFkZCB1cyB0byB0aGUgbmV3IGNlbGxcbiAgICBjZWxsID0gdGhpcy5ncmlkW3RoaXMud3JhcChjZWxsdHkpXVt0aGlzLndyYXAoY2VsbHR4KV07XG4gICAgY2VsbC5wdXNoKGl0ZW0pO1xuICB9XG5cbiAgbW9kKGEsICBiKVxuICB7XG4gICAgICBsZXQgciA9IGEgJSBiO1xuICAgICAgcmV0dXJuIHIgPCAwID8gciArIGIgOiByO1xuICB9XG5cbiAgLy8gcmV0dXJucyBhbGwgb2JqZWN0cyBpbiByYWRpdXMgciBmcm9tIHBvaW50IHgseVxuICBxdWVyeSh4LCB5LCByKVxuICB7XG4gICAgaWYgKHIgPiB0aGlzLm1heFJhZGl1cykgciA9IHRoaXMubWF4UmFkaXVzO1xuXG4gICAgLy8gU3F1YXJlZCBkaXN0YW5jZVxuICAgIGxldCByc3EgPSByICogcjtcblxuICAgIC8vIFdoaWNoIGNlbGwgYXJlIHdlIGluP1xuICAgIGxldCBjZWxsY2VudHJleCA9ICh4IC0gKHRoaXMubW9kKHgsIHRoaXMueGNlbGxzaXplKSkpIC8gdGhpcy54Y2VsbHNpemU7XG4gICAgbGV0IGNlbGxjZW50cmV5ID0gKHkgLSAodGhpcy5tb2QoeSwgdGhpcy55Y2VsbHNpemUpKSkgLyB0aGlzLnljZWxsc2l6ZTtcblxuICAgIC8vIFVzZSBkaWFnb25hbCBleHRlbnQgdG8gZmluZCB0aGUgY2VsbCByYW5nZSB0byBzZWFyY2hcbiAgICBsZXQgY2VsbG1pbnggPSAoKHggLSByKSAtICh0aGlzLm1vZCgoeCAtIHIpLCB0aGlzLnhjZWxsc2l6ZSkpKSAvIHRoaXMueGNlbGxzaXplO1xuICAgIGxldCBjZWxsbWlueSA9ICgoeSAtIHIpIC0gKHRoaXMubW9kKCh5IC0gciksIHRoaXMueWNlbGxzaXplKSkpIC8gdGhpcy55Y2VsbHNpemU7XG4gICAgbGV0IGNlbGxtYXh4ID0gKCh4ICsgcikgLSAodGhpcy5tb2QoKHggKyByKSwgdGhpcy54Y2VsbHNpemUpKSkgLyB0aGlzLnhjZWxsc2l6ZTtcbiAgICBsZXQgY2VsbG1heHkgPSAoKHkgKyByKSAtICh0aGlzLm1vZCgoeSArIHIpLCB0aGlzLnljZWxsc2l6ZSkpKSAvIHRoaXMueWNlbGxzaXplO1xuXG4gIC8vICBjb25zb2xlLmxvZyhgQ2hlY2tpbmcgbnVtY2VsbHMgJHtjZWxsbWF4eCAtIGNlbGxtaW54fSwgJHtjZWxsbWF4eSAtIGNlbGxtaW55fWApO1xuXG4gICAgbGV0IG9ianMgPSBbXTtcblxuICAgIGlmICgoY2VsbG1heHkgLSBjZWxsbWlueSkgPj0gdGhpcy5udW1jZWxscykgY2VsbG1heHkgPSBjZWxsbWlueSArIHRoaXMubnVtY2VsbHMgLSAxO1xuICAgIGlmICgoY2VsbG1heHggLSBjZWxsbWlueCkgPj0gdGhpcy5udW1jZWxscykgY2VsbG1heHggPSBjZWxsbWlueCArIHRoaXMubnVtY2VsbHMgLSAxO1xuXG4gICAgZm9yIChsZXQgY3k9Y2VsbG1pbnk7IGN5PD1jZWxsbWF4eTsgY3krKylcbiAgICB7XG4gICAgICBmb3IgKGxldCBjeD1jZWxsbWlueDsgY3g8PWNlbGxtYXh4OyBjeCsrKVxuICAgICAge1xuICAgICAgICBsZXQgd3ggPSB0aGlzLndyYXAoY3gpLCB3eSA9IHRoaXMud3JhcChjeSk7XG5cbiAgICAgICAgLy8gaWYgKG9uY2Vbd3ldW3d4XSkgY29udGludWU7XG4gICAgICAgIC8vIG9uY2Vbd3ldW3d4XSA9IDE7XG5cbiAgICAgICAgbGV0IGNlbGwgPSB0aGlzLmdyaWRbd3ldW3d4XVxuICAgICAgICBpZiAoIWNlbGwpIGNvbnRpbnVlO1xuXG4gICAgICAgIGZvciAobGV0IHQ9MDsgdDxjZWxsLmxlbmd0aDsgdCsrKVxuICAgICAgICB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IGNlbGxbdF07XG4gICAgICAgICAgICBsZXQgZCA9IHRoaXMuZGlzdHNxKGl0ZW0ueCwgaXRlbS55LCB4LCB5KTtcbiAgICAgICAgICAgIGlmIChkIDw9IHJzcSkgb2Jqcy5wdXNoKGl0ZW0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG9ianM7XG4gIH1cblxuICBkaXN0c3EoeDEsIHkxLCB4MiwgeTIpXG4gIHtcbiAgICBsZXQgeGQgPSB4MiAtIHgxLCB5ZCA9IHkyIC0geTE7XG4gICAgcmV0dXJuICgoeGQgKiB4ZCkgKyAoeWQgKiB5ZCkpO1xuICB9XG5cbiAgd3JhcChhKVxuICB7XG4gICAgcmV0dXJuIHRoaXMubW9kKGEsIHRoaXMubnVtY2VsbHMpO1xuICAgIC8vIC8vIFRoaXMgbmVlZHMgdG8gYmUgbW9yZSBzb3BoaXN0aWNhdGVkIHRvIHdyYXAgbXVsdGlwbGUgbnVtY2VsbHMgd2lkdGhzIVxuICAgIC8vIGlmIChhIDwgMCkgcmV0dXJuIGEgKyB0aGlzLm51bWNlbGxzO1xuICAgIC8vIGlmIChhID49IHRoaXMubnVtY2VsbHMpIHJldHVybiBhIC0gdGhpcy5udW1jZWxscztcbiAgICAvLyByZXR1cm4gYTtcbiAgfVxuXG4gIGFycmF5MmQodywgaCwgaW5pdD1udWxsKVxuICB7XG4gICAgbGV0IHYgPSBbXTtcbiAgICBmb3IgKGxldCB5PTA7IHk8aDsgeSsrKVxuICAgIHtcbiAgICAgIGxldCBoID0gW107XG4gICAgICBmb3IgKGxldCB4PTA7IHg8dzsgeCsrKVxuICAgICAgICBoW3hdID0gaW5pdDtcbiAgICAgIHYucHVzaChoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdjtcbiAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi8yZC9jb3JlL1NwYXRpYWxHcmlkLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==