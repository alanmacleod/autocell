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
	
	var _SpatialGrid = __webpack_require__(1);
	
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
	
	var _Boid = __webpack_require__(12);
	
	var _Boid2 = _interopRequireDefault(_Boid);
	
	var _OpenWorld = __webpack_require__(14);
	
	var _OpenWorld2 = _interopRequireDefault(_OpenWorld);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	//import Renderer     from './Renderer2d';
	//import Canvas2d from '../shared/Canvas2d';
	
	// "boids"
	
	var SIZE = 100; // cells
	var VIEW_SCALE = 4;
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
	
	// 10,000 items in a 10,000 x 10,1000 grid  = 4ms
	
	// let g = new SpatialGrid(0, 0, 10000, 10000, 100);
	//
	// for (var t=0; t< 20000; t++)
	// {
	//   g.add({x: Math.random() * 10000, y: Math.random() * 10000});
	// }
	//
	// // g.add({x: 17, y:17, id:0});
	// // g.add({x: 18, y:18, id:1});
	// // g.add({x: 1, y:1, id:2});
	// // g.add({x: 2, y:2, id:3});
	// // g.add({x: 33, y:33, id:4});
	// // g.add({x: 66, y:66, id:4});
	//
	// var t1= performance.now();
	// for (var t=0; t< 20000; t++)
	//   g.query(3, 3, 110);
	//
	// console.log(`Took ${performance.now() - t1} ms`);
	//
	
	
	var fpsText = document.getElementById("fps");
	
	var lastTime = 0,
	    frames = 0,
	    avFrames = 0;
	
	var world = new _OpenWorld2.default({
	  size: SIZE,
	  spread: 1.0,
	  process: 'vertical',
	  type: _Boid2.default,
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
	// Cheap *dynamic* spatial index (2D)
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
	
	    this.foundObjects = [];
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
	  }, {
	    key: "query",
	    value: function query(x, y, r) {
	      if (r > this.maxRadius) r = this.maxRadius;
	
	      // Squared distance
	      var rsq = r * r;
	
	      // Which cell are we in?
	      // let cellcentrex = (x - (this.mod(x, this.xcellsize))) / this.xcellsize;
	      // let cellcentrey = (y - (this.mod(y, this.ycellsize))) / this.ycellsize;
	
	      // Use diagonal extent to find the cell range to search
	      var cellminx = (x - r - this.mod(x - r, this.xcellsize)) / this.xcellsize;
	      var cellminy = (y - r - this.mod(y - r, this.ycellsize)) / this.ycellsize;
	      var cellmaxx = (x + r - this.mod(x + r, this.xcellsize)) / this.xcellsize;
	      var cellmaxy = (y + r - this.mod(y + r, this.ycellsize)) / this.ycellsize;
	
	      //  console.log(`Checking numcells ${cellmaxx - cellminx}, ${cellmaxy - cellminy}`);
	
	      if (cellminx < 0) cellminx = 0;
	      if (cellmaxx >= this.xcellsize) cellmaxx = this.xcellsize - 1;
	
	      if (cellminy < 0) cellminy = 0;
	      if (cellmaxy >= this.ycellsize) cellmaxy = this.ycellsize - 1;
	
	      this.foundObjects = [];
	      //
	      // if ((cellmaxy - cellminy) >= this.numcells) cellmaxy = cellminy + this.numcells - 1;
	      // if ((cellmaxx - cellminx) >= this.numcells) cellmaxx = cellminx + this.numcells - 1;
	
	      for (var cy = cellminy; cy <= cellmaxy; cy++) {
	        for (var cx = cellminx; cx <= cellmaxx; cx++) {
	          // let wx = this.wrap(cx), wy = this.wrap(cy);
	
	          // if (once[wy][wx]) continue;
	          // once[wy][wx] = 1;
	
	          var cell = this.grid[cy][cx];
	          if (!cell) continue;
	
	          for (var t = 0; t < cell.length; t++) {
	            var item = cell[t];
	            var d = this.distsq(item.x, item.y, x, y);
	            if (d <= rsq) this.foundObjects.push(item);
	          }
	        }
	      }
	
	      return this.foundObjects;
	    }
	
	    // returns all objects in radius r from point x,y
	
	  }, {
	    key: "querywrap",
	    value: function querywrap(x, y, r) {
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

/***/ }),
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
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Vector = __webpack_require__(13);
	
	var _Vector2 = _interopRequireDefault(_Vector);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var PALETTE = [[0, 0, 0]];
	
	var Boid = function () {
	  function Boid(position, bounds) {
	    _classCallCheck(this, Boid);
	
	    this.bounds = bounds;
	    this.speed = 1 + Math.random() / 4;
	    this.shyness = 10 + Math.random() * 10;
	
	    this.velocity = new _Vector2.default((Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4);
	
	    // console.log(this.velocity);
	    this.position = new _Vector2.default(Math.random() * this.bounds.x, Math.random() * this.bounds.y);
	    //this.position =  new Vector2(Math.random() * 10, Math.random() * 10);
	    this.prepare();
	  }
	
	  _createClass(Boid, [{
	    key: 'shader',
	    value: function shader() {
	      return PALETTE[0];
	    }
	  }, {
	    key: 'mutate',
	    value: function mutate(stats) {
	      this.velocity = this.velocity.add(this.separate(stats.neighbours, this.shyness)).add(this.align(stats.neighbours)).add(this.cohesion2(stats.neighbours))
	      //.add( this.cohesion( stats.centroid ) )
	      //.add(this.seek(stats.mouse))
	      .norm();
	
	      //console.log( this.align( stats.neighbours ) );
	
	
	      this.position = this.position.add(this.velocity);
	
	      this.bound();
	      this.dirty = true;
	    }
	  }, {
	    key: 'rate',
	    value: function rate(neighbours) {
	      var av = new _Vector2.default(0, 0);
	
	      if (!neighbours.length) return av;
	
	      for (var t = 0; t < neighbours.length; t++) {
	        av = av.add(neighbours[t].velocity);
	      }av = av.div(neighbours.length);
	
	      return av.sub(this.velocity).div(4);
	    }
	  }, {
	    key: 'seek',
	    value: function seek(target) {
	      var desired = target.sub(this.position).norm();
	      var steer = desired.sub(this.velocity).norm().mul(0.7);
	      return steer;
	    }
	  }, {
	    key: 'align2',
	    value: function align2(neighbours) {
	      var distsq = 20 * 20;
	
	      var c = new _Vector2.default(0, 0);
	      var num = 0;
	
	      for (var t = 0; t < neighbours.length; t++) {
	        var d = neighbours[t].position.distsq(this.position);
	        if (d > 0 && d < distsq) {
	          c = c.add(neighbours[t].velocity);
	          num++;
	        }
	      }
	
	      if (!num) return c;
	
	      return c.div(num).norm().mul(1.5).sub(this.velocity).norm();
	    }
	  }, {
	    key: 'cohesion2',
	    value: function cohesion2(neighbours) {
	      var c = new _Vector2.default(0, 0);
	      if (neighbours.length == 0) return c;
	
	      for (var t = 0; t < neighbours.length; t++) {
	        if (t & 1) c = c.add(neighbours[t].position);
	      } //console.log( neighbours.length );
	
	      //return this.cohesion( c.div( neighbours.length ) );
	      //return c.div(neighbours.length).norm().sub(this.position);
	      return this.seek(c.div(neighbours.length).mul(.8));
	    }
	  }, {
	    key: 'align',
	    value: function align(neighbours) {
	      var c = new _Vector2.default(0, 0);
	      if (neighbours.length == 0) return c;
	
	      for (var t = 0; t < neighbours.length; t++) {
	        c = c.add(neighbours[t].velocity);
	      } //console.log( neighbours.length );
	
	      //return this.cohesion( c.div( neighbours.length ) );
	      return c.div(neighbours.length).norm().mul(this.speed).sub(this.velocity);
	    }
	  }, {
	    key: 'separate',
	    value: function separate(neighbours, spacing) {
	      var spacingsq = spacing * spacing;
	
	      var c = new _Vector2.default(0, 0);
	      if (!neighbours.length) return c;
	
	      var num = 0;
	
	      for (var t = 0; t < neighbours.length; t++) {
	        var d = neighbours[t].position.distsq(this.position);
	
	        if (d < spacingsq) {
	          var diff = this.position.sub(neighbours[t].position).norm();
	          c = c.add(diff.div(d));
	          num++;
	        }
	
	        if (!num) return c;
	
	        c = c.div(num).norm();
	
	        return c.sub(this.velocity).norm();
	      }
	      //
	      // for (let t=0; t<neighbours.length; t++)
	      // {
	      //     c = c.sub(
	      //               neighbours[t].position
	      //               .sub(this.position)
	      //               .norm()
	      //         );
	      // }
	      //
	      // return c.norm();
	    }
	  }, {
	    key: 'cohesion',
	    value: function cohesion(target) {
	      return target.sub(this.position).sub(this.velocity).norm();
	    }
	  }, {
	    key: 'bound',
	    value: function bound() {
	      this.position.x = this.wrap(this.position.x, this.bounds.x);
	      this.position.y = this.wrap(this.position.y, this.bounds.y);
	    }
	
	    // wrap(v, max)
	    // {
	    //   if ( v < 0 ) 0
	    //   if ( v > max-1) return max-1;
	    //   return v;
	    // }
	
	  }, {
	    key: 'wrap',
	    value: function wrap(v, max) {
	      if (v < 0) return v + max;
	      if (v > max - 1) return v - max;
	      return v;
	    }
	
	    // Called at the start of every frame
	
	  }, {
	    key: 'prepare',
	    value: function prepare() {
	      this.dirty = false;
	    }
	  }]);
	
	  return Boid;
	}();
	
	exports.default = Boid;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Vector2 = function () {
	  function Vector2(x, y) {
	    _classCallCheck(this, Vector2);
	
	    this.x = 0 || x;
	    this.y = 0 || y;
	  }
	
	  _createClass(Vector2, [{
	    key: "set",
	    value: function set(x, y) {
	      var _ref = [x, y];
	      this.x = _ref[0];
	      this.y = _ref[1];
	
	      return this;
	    }
	  }, {
	    key: "sub",
	    value: function sub(b) {
	      return new Vector2(b.x - this.x, b.y - this.y);
	    }
	  }, {
	    key: "add",
	    value: function add(b) {
	      return new Vector2(b.x + this.x, b.y + this.y);
	    }
	  }, {
	    key: "mul",
	    value: function mul(s) {
	      return new Vector2(this.x * s, this.y * s);
	    }
	  }, {
	    key: "div",
	    value: function div(s) {
	      return new Vector2(this.x / s, this.y / s);
	    }
	  }, {
	    key: "norm",
	    value: function norm() {
	      var m = this.mag();
	      return m ? this.div(m) : this;
	    }
	  }, {
	    key: "mag",
	    value: function mag() {
	      return Math.sqrt(this.x * this.x + this.y * this.y);
	    }
	  }, {
	    key: "dist",
	    value: function dist(b) {
	      var xd = b.x - this.x,
	          yd = b.y - this.y;
	
	      return Math.sqrt(xd * xd + yd * yd);
	    }
	  }, {
	    key: "distsq",
	    value: function distsq(b) {
	      var xd = b.x - this.x,
	          yd = b.y - this.y;
	
	      return xd * xd + yd * yd;
	    }
	  }]);
	
	  return Vector2;
	}();
	
	exports.default = Vector2;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	//import Renderer     from './Renderer2d';
	
	
	var _Vector = __webpack_require__(13);
	
	var _Vector2 = _interopRequireDefault(_Vector);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var PIXI = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"pixi.js\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())); // ffs update your module defs, PIXI
	
	
	var OpenWorld = function () {
	  function OpenWorld(options) {
	    var _this = this;
	
	    _classCallCheck(this, OpenWorld);
	
	    this.size = options.size; // World size
	    this.data = null;
	    this.scale = options.scale || 1;
	
	    this.element = document.getElementById(options.render);
	
	    this.renderer = PIXI.autoDetectRenderer(this.size * this.scale, this.size * this.scale);
	    this.stage = new PIXI.Container();
	    this.element.appendChild(this.renderer.view);
	    this.mouse = new _Vector2.default(0, 0);
	
	    this.element.onmousemove = function (e) {
	      _this.mouse.set(e.clientX, e.clientY);
	    };
	
	    this.init(options.type, options.spread);
	  }
	
	  // Create and save a list of entities
	
	
	  _createClass(OpenWorld, [{
	    key: 'init',
	    value: function init(CellType, spread) {
	      this.data = [];
	      this.graphics = [];
	
	      var done = 0,
	          max = 100;
	
	      for (var y = 0; y < this.size; y++) {
	        for (var x = 0; x < this.size; x++) {
	          if (Math.random() < spread) {
	            var c = new CellType(new _Vector2.default(x, y), new _Vector2.default(this.size, this.size));
	            this.data.push(c);
	
	            var r = new PIXI.Graphics();
	
	            r.beginFill(0xffffff);
	            r.drawRect(0, 0, this.scale, this.scale);
	            r.endFill();
	            r.x = c.position.x * this.scale;
	            r.y = c.position.y * this.scale;
	            this.graphics.push(r);
	            this.stage.addChild(r);
	
	            done++;
	          }
	          if (done == max) break;
	        }
	        if (done == max) break;
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      // for (let l=this.data.length, i=0; i<l; i++)
	      // {
	      //   let e = this.data[i];
	      //   let c = e.shader();
	      //
	      // }
	      this.renderer.render(this.stage);
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
	  }, {
	    key: 'evolve',
	    value: function evolve() {
	      this.prepare();
	
	      var statistics = {
	        centroid: this.centroid(),
	        number: this.data.length,
	        mouse: this.mouse.div(this.scale),
	        all: this.data
	      };
	
	      var radius = 100;
	
	      for (var t = 0, l = this.data.length; t < l; t++) {
	        statistics.neighbours = this.neighbourhood(t, radius);
	
	        this.data[t].mutate(statistics);
	
	        if (this.data[t].dirty) {
	          this.graphics[t].x = Math.round(this.data[t].position.x * this.scale);
	          this.graphics[t].y = Math.round(this.data[t].position.y * this.scale);
	        }
	      }
	    }
	
	    // index = lookup for this.data[] (to skip self-test), r = radius in world units
	
	  }, {
	    key: 'neighbourhood',
	    value: function neighbourhood(index, r) {
	      var rs = r * r;
	      var n = [];
	      var test = this.data[index].position;
	
	      for (var t = 0, l = this.data.length; t < l; t++) {
	        if (t == index) continue;
	        var d = this.data[t].position.distsq(test);
	        if (d <= rs) n.push(this.data[t]);
	      }
	
	      return n;
	    }
	  }, {
	    key: 'centroid',
	    value: function centroid() {
	      var sx = 0,
	          sy = 0;
	      for (var t = 0, l = this.data.length; t < l; t++) {
	        sx += this.data[t].position.x;
	        sy += this.data[t].position.y;
	      }
	
	      return new _Vector2.default(sx / this.data.length, sy / this.data.length);
	    }
	  }, {
	    key: 'prepare',
	    value: function prepare() {
	      for (var t = 0, l = this.data.length; t < l; t++) {
	        this.data[t].prepare();
	      } // let n = 0;
	      // for (let y=0; y<this.size; y++)
	      //   for (let x=0; x<this.size; x++)
	      //     if (this.data[y][x]) this.data[y][x].prepare();
	    }
	  }]);
	
	  return OpenWorld;
	}();
	
	exports.default = OpenWorld;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgN2ExOWNmOGIwZTc2OTNhMDAzOWIiLCJ3ZWJwYWNrOi8vLy4vMmQvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi8yZC9jb3JlL1NwYXRpYWxHcmlkLmpzIiwid2VicGFjazovLy8uLzJkL2NvcmUvV29ybGQuanMiLCJ3ZWJwYWNrOi8vLy4vMmQvY29yZS9SZW5kZXJlcjJkLmpzIiwid2VicGFjazovLy8uL3NoYXJlZC9DYW52YXMyZC5qcyIsIndlYnBhY2s6Ly8vLi8yZC9jZWxscy9Hb0wuanMiLCJ3ZWJwYWNrOi8vLy4vMmQvY2VsbHMvQ2VsbC5qcyIsIndlYnBhY2s6Ly8vLi8yZC9jZWxscy9GbG9vZC5qcyIsIndlYnBhY2s6Ly8vLi8yZC9jZWxscy9VdGlsLmpzIiwid2VicGFjazovLy8uLzJkL2NlbGxzL0J1cnJvdy5qcyIsIndlYnBhY2s6Ly8vLi8yZC9jZWxscy9CbHVyLmpzIiwid2VicGFjazovLy8uLzJkL2NlbGxzL1Nub3cuanMiLCJ3ZWJwYWNrOi8vLy4vMmQvY2VsbHMvQm9pZC5qcyIsIndlYnBhY2s6Ly8vLi8yZC9tYXRoL1ZlY3RvcjIuanMiLCJ3ZWJwYWNrOi8vLy4vMmQvY29yZS9PcGVuV29ybGQuanMiXSwibmFtZXMiOlsiU0laRSIsIlZJRVdfU0NBTEUiLCJXT1JMRF9GUkFNRV9SQVRFIiwiZnBzVGV4dCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJsYXN0VGltZSIsImZyYW1lcyIsImF2RnJhbWVzIiwid29ybGQiLCJzaXplIiwic3ByZWFkIiwicHJvY2VzcyIsInR5cGUiLCJyZW5kZXIiLCJzY2FsZSIsIndpbmRvdyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsInNldEludGVydmFsIiwiZXZvbHZlIiwidGltZU5vdyIsInBlcmZvcm1hbmNlIiwibm93IiwidGltZVRha2VuIiwiU3BhdGlhbEdyaWQiLCJtaW54IiwibWlueSIsIm1heHgiLCJtYXh5IiwiY2VsbHMiLCJncmlkIiwiYXJyYXkyZCIsIndpZHRoIiwiaGVpZ2h0IiwibnVtY2VsbHMiLCJ4Y2VsbHNpemUiLCJ5Y2VsbHNpemUiLCJtYXhSYWRpdXMiLCJNYXRoIiwic3FydCIsImZvdW5kT2JqZWN0cyIsIml0ZW0iLCJjZWxseCIsIndyYXAiLCJ4IiwibW9kIiwiY2VsbHkiLCJ5IiwiY2VsbCIsImluY2x1ZGVzIiwicHVzaCIsImZ4IiwiZnkiLCJ0eCIsInR5IiwiY2VsbGZ4IiwiY2VsbGZ5IiwiY2VsbHR4IiwiY2VsbHR5Iiwic3BsaWNlIiwiaW5kZXhPZiIsImEiLCJiIiwiciIsInJzcSIsImNlbGxtaW54IiwiY2VsbG1pbnkiLCJjZWxsbWF4eCIsImNlbGxtYXh5IiwiY3kiLCJjeCIsInQiLCJsZW5ndGgiLCJkIiwiZGlzdHNxIiwiY2VsbGNlbnRyZXgiLCJjZWxsY2VudHJleSIsIm9ianMiLCJ3eCIsInd5IiwieDEiLCJ5MSIsIngyIiwieTIiLCJ4ZCIsInlkIiwidyIsImgiLCJpbml0IiwidiIsIldvcmxkIiwib3B0aW9ucyIsImRhdGEiLCJwdHlwZSIsInZlcnRpY2FsIiwic3dpcmwiLCJyZW5kZXJlciIsIkNlbGxUeXBlIiwiaSIsInRlc3QiLCJyYW5kb20iLCJyYWRpdXMiLCJudW0iLCJ2eCIsInZ5IiwibiIsImwiLCJpeSIsIml4IiwibGluZWFyIiwic3ViamVjdCIsIm5leHQiLCJyb3VuZCIsInZpc2l0ZWQiLCJpdGVyYXRvciIsInhpIiwibXV0YXRlIiwibmVpZ2hib3VyaG9vZCIsInlpIiwicHJlcGFyZSIsIlJlbmRlcmVyMmQiLCJlbGVtZW50IiwiY2FudmFzMmQiLCJyZXNpemUiLCJjbGVhciIsImNvbCIsInNoYWRlciIsImJsb2NrIiwiQ2FudmFzMmQiLCJwYXJlbnQiLCJjcmVhdGVFbGVtZW50IiwiYXBwZW5kQ2hpbGQiLCJjb250ZXh0IiwiZ2V0Q29udGV4dCIsImMiLCJiZWdpblBhdGgiLCJyZWN0IiwiZmlsbFN0eWxlIiwiZmlsbCIsInN4Iiwic3kiLCJzdyIsInNoIiwiZHgiLCJkeSIsImR3IiwiZGgiLCJkcmF3SW1hZ2UiLCJjYW52YXMiLCJjbGllbnRXaWR0aCIsImNsaWVudEhlaWdodCIsIkFMSVZFIiwiREVBRCIsInBhbGV0dGUiLCJHYW1lT2ZMaWZlIiwiYWxpdmUiLCJ1bmRlZmluZWQiLCJudW1MaXZlTmVpZ2hib3VycyIsIm1lIiwibmV3U3RhdGUiLCJ2YWx1ZSIsIkNlbGwiLCJuZWlnaGJvdXJzIiwic3VtIiwiTUFYX1ZBTFVFUyIsIlIiLCJHIiwiQiIsIlJFRFMiLCJtYXAiLCJlIiwiR1JFRU5TIiwiQkxVRVMiLCJGbG9vZCIsInN0YXRlIiwiZmxvb3IiLCJpbGluZXJwIiwiZW50aXR5IiwiY2hhbmdlIiwibmMiLCJhdmVyYWdlVmFsdWVOZWlnaGJvdXJzIiwiYWJzIiwiVXRpbCIsInZhbHVlcyIsInBvc2l0aW9uIiwicCIsImkxIiwiaTIiLCJxIiwiQnVycm93Iiwib3BlbiIsIndhc09wZW4iLCJCbHVyIiwiYXYiLCJid3BhbGV0dGUiLCJTbm93IiwicGFzcyIsInNub3dpbmciLCJzdGFydFNub3dpbmciLCJQQUxFVFRFIiwiQm9pZCIsImJvdW5kcyIsInNwZWVkIiwic2h5bmVzcyIsInZlbG9jaXR5Iiwic3RhdHMiLCJhZGQiLCJzZXBhcmF0ZSIsImFsaWduIiwiY29oZXNpb24yIiwibm9ybSIsImJvdW5kIiwiZGlydHkiLCJkaXYiLCJzdWIiLCJ0YXJnZXQiLCJkZXNpcmVkIiwic3RlZXIiLCJtdWwiLCJzZWVrIiwic3BhY2luZyIsInNwYWNpbmdzcSIsImRpZmYiLCJtYXgiLCJWZWN0b3IyIiwicyIsIm0iLCJtYWciLCJQSVhJIiwicmVxdWlyZSIsIk9wZW5Xb3JsZCIsImF1dG9EZXRlY3RSZW5kZXJlciIsInN0YWdlIiwiQ29udGFpbmVyIiwidmlldyIsIm1vdXNlIiwib25tb3VzZW1vdmUiLCJzZXQiLCJjbGllbnRYIiwiY2xpZW50WSIsImdyYXBoaWNzIiwiZG9uZSIsIkdyYXBoaWNzIiwiYmVnaW5GaWxsIiwiZHJhd1JlY3QiLCJlbmRGaWxsIiwiYWRkQ2hpbGQiLCJz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T2tDLENBQVA7QUFDRDs7O2dDQUdEO0FBQ0UsV0FBSWtDLEtBQUssQ0FBVDtBQUFBLFdBQVlDLEtBQUssQ0FBakI7QUFDQSxZQUFLLElBQUlyRSxJQUFFLENBQU4sRUFBUW1DLElBQUUsS0FBS2QsSUFBTCxDQUFVcEIsTUFBekIsRUFBaUNELElBQUVtQyxDQUFuQyxFQUFzQ25DLEdBQXRDLEVBQ0E7QUFDRW9FLGVBQU0sS0FBSy9DLElBQUwsQ0FBVXJCLENBQVYsRUFBYWlILFFBQWIsQ0FBc0I1SSxDQUE1QjtBQUNBZ0csZUFBTSxLQUFLaEQsSUFBTCxDQUFVckIsQ0FBVixFQUFhaUgsUUFBYixDQUFzQnpJLENBQTVCO0FBQ0Q7O0FBRUQsY0FBTyxxQkFBWTRGLEtBQUssS0FBSy9DLElBQUwsQ0FBVXBCLE1BQTNCLEVBQW1Db0UsS0FBSyxLQUFLaEQsSUFBTCxDQUFVcEIsTUFBbEQsQ0FBUDtBQUNEOzs7K0JBSUQ7QUFDRSxZQUFLLElBQUlELElBQUUsQ0FBTixFQUFRbUMsSUFBRSxLQUFLZCxJQUFMLENBQVVwQixNQUF6QixFQUFpQ0QsSUFBRW1DLENBQW5DLEVBQXNDbkMsR0FBdEM7QUFDRSxjQUFLcUIsSUFBTCxDQUFVckIsQ0FBVixFQUFhZ0QsT0FBYjtBQURGLFFBREYsQ0FHRTtBQUNBO0FBQ0E7QUFDQTtBQUNEOzs7Ozs7bUJBdEprQitHLFMiLCJmaWxlIjoiMmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgN2ExOWNmOGIwZTc2OTNhMDAzOWIiLCJcblxuaW1wb3J0IFNwYXRpYWxHcmlkICBmcm9tICcuL2NvcmUvU3BhdGlhbEdyaWQnO1xuaW1wb3J0IFdvcmxkICAgICAgICBmcm9tICcuL2NvcmUvV29ybGQuanMnO1xuaW1wb3J0IEdhbWVPZkxpZmUgICBmcm9tICcuL2NlbGxzL0dvTCc7XG5pbXBvcnQgRmxvb2QgICAgICAgIGZyb20gJy4vY2VsbHMvRmxvb2QnO1xuaW1wb3J0IEJ1cnJvdyAgICAgICBmcm9tICcuL2NlbGxzL0J1cnJvdyc7XG5pbXBvcnQgQmx1ciAgICAgICAgIGZyb20gJy4vY2VsbHMvQmx1cic7XG5pbXBvcnQgU25vdyAgICAgICAgIGZyb20gJy4vY2VsbHMvU25vdyc7XG5pbXBvcnQgQm9pZCAgICAgICAgIGZyb20gJy4vY2VsbHMvQm9pZCdcbmltcG9ydCBPcGVuV29ybGQgICAgZnJvbSAnLi9jb3JlL09wZW5Xb3JsZCc7XG5cbi8vaW1wb3J0IFJlbmRlcmVyICAgICBmcm9tICcuL1JlbmRlcmVyMmQnO1xuLy9pbXBvcnQgQ2FudmFzMmQgZnJvbSAnLi4vc2hhcmVkL0NhbnZhczJkJztcblxuLy8gXCJib2lkc1wiXG5cbmNvbnN0IFNJWkUgPSAxMDA7IC8vIGNlbGxzXG5jb25zdCBWSUVXX1NDQUxFID0gNDtcbmNvbnN0IFdPUkxEX0ZSQU1FX1JBVEUgPSAzMDtcbi8vXG4vLyBsZXQgY2FuID0gbmV3IENhbnZhczJkKFwiY29udGVudFwiKTtcbi8vIGNhbi5yZXNpemUoU0laRSAqIFZJRVdfU0NBTEUsIFNJWkUgKiBWSUVXX1NDQUxFKTtcbi8vIGNhbi5jbGVhcigpO1xuLy8gLy9jYW4uZml0d2luZG93KCk7XG4vL1xuLy8gbGV0IGNvbHMgPSBbXG4vLyAgIFswLDAsMF0sXG4vLyAgIFsyNTUsMCwwXSxcbi8vICAgWzAsMjU1LDBdLFxuLy8gICBbMCwwLDI1NV0sXG4vLyAgIFsyNTUsMjU1LDBdLFxuLy8gICBbMjU1LDAsMjU1XSxcbi8vICAgWzAsMjU1LDI1NV0sXG4vLyAgIFsxMjgsMCwwXSxcbi8vICAgWzAsMTI4LDBdLFxuLy8gICBbMCwwLDEyOF0sXG4vLyAgIFsxMjgsMTI4LDBdLFxuLy8gICBbMCwxMjgsMTI4XSxcbi8vICAgWzEyOCwwLDEyOF1cbi8vIF1cbi8vXG4vL1xuLy8gbGV0IG51bSA9IFNJWkUgKiBTSVpFO1xuLy8gbGV0IHggPSBNYXRoLnJvdW5kKFNJWkUgLyAyKTtcbi8vIGxldCB5ID0gTWF0aC5yb3VuZChTSVpFIC8gMik7XG4vLyBsZXQgeGQgPSAxLCB5ZCA9IDE7XG4vLyBsZXQgb254ID0gdHJ1ZTtcbi8vIGxldCBjb3VudGRvd24gPSAxO1xuLy8gbGV0IGl0ZXJhdGlvbnMgPSAxO1xuLy8gbGV0IGRpciA9IDE7XG4vLyBsZXQgaW5jID0gMTtcbi8vIGxldCBjbnVtID0gMDtcbi8vIGxldCB2aXNpdGVkID0gMDtcbi8vXG4vLyBsZXQgaXRlcmF0b3IgPSAxO1xuLy8gZG9cbi8vIHtcbi8vXG4vLyAgIGxldCBjb2wgPSBjb2xzW2NudW0gJSAxM107XG4vLyAgIGNudW0rK1xuLy8gICAvLyAvLyBNb3ZlIHggIGxvb3Bcbi8vICAgY29uc29sZS5sb2coYE1vdmluZyB4ICR7aXRlcmF0b3J9IHBsYWNlcyAke3hkPT0xPyc+JzonPCd9YCk7XG4vLyAgIGZvciAobGV0IHhpPTA7IHhpIDwgaXRlcmF0b3I7IHhpKyspXG4vLyAgIHtcbi8vICAgICBjYW4uYmxvY2soeCAqIFZJRVdfU0NBTEUsIHkqVklFV19TQ0FMRSwgVklFV19TQ0FMRSwgVklFV19TQ0FMRSwgY29sKTtcbi8vICAgICB4ICs9IHhkO1xuLy8gICAgIHZpc2l0ZWQrKztcbi8vICAgfVxuLy8gICB4ZCA9IC14ZDtcbi8vICAgLy8gLy8gY2hhbmdlIGRpcmVjdGlvblxuLy8gICAvL1xuLy8gICBjb2wgPSBjb2xzWyhjbnVtKyspJTEzXTtcbi8vICAgY29uc29sZS5sb2coYE1vdmluZyB5ICR7aXRlcmF0b3J9IHBsYWNlcyAke3lkPT0xPyd2JzonXid9YCk7XG4vLyAgIGZvciAobGV0IHlpPTA7IHlpIDwgaXRlcmF0b3I7IHlpKyspXG4vLyAgIHtcbi8vICAgICBjYW4uYmxvY2soeCAqIFZJRVdfU0NBTEUsIHkqVklFV19TQ0FMRSwgVklFV19TQ0FMRSwgVklFV19TQ0FMRSwgY29sKTtcbi8vICAgICB5ICs9IHlkO1xuLy8gICAgIHZpc2l0ZWQrKztcbi8vICAgfVxuLy8gICB5ZCA9IC15ZDtcbi8vXG4vLyAgIGl0ZXJhdG9yICs9IDE7XG4vLyB9IHdoaWxlKHZpc2l0ZWQgPCBudW0pO1xuLy9cblxuXG5cbi8vIC8vIFNwZWVkIHRlc3Rcbi8vXG4vLyBsZXQgbnVtID0gMjUwMDAwMDA7XG4vLyBsZXQgc3RhcnQgPSBwZXJmb3JtYW5jZS5ub3coKTtcbi8vIGxldCBpID0gbnVtO1xuLy8gZm9yIChsZXQgdD0wOyB0PG51bTsgdCsrKVxuLy8ge1xuLy8gICBsZXQgeGRpZmYgPSAoaSAtIG51bSk7XG4vLyAgIGxldCB5ZGlmZiA9IChudW0gLSBpKTtcbi8vICAgbGV0IHNxdWFyZWRpc3QgPSBNYXRoLnNxcnQoKHhkaWZmICogeGRpZmYpICsgKHlkaWZmICogeWRpZmYpKTtcbi8vICAgaSsrO1xuLy8gfVxuLy8gbGV0IHR0YWtlbiA9IHBlcmZvcm1hbmNlLm5vdygpIC0gc3RhcnQ7XG4vLyBjb25zb2xlLmxvZyhcIlRpbWUgdGFrZW46IFwiLCB0dGFrZW4pO1xuLy8gLy9cblxuLy8gMTAsMDAwIGl0ZW1zIGluIGEgMTAsMDAwIHggMTAsMTAwMCBncmlkICA9IDRtc1xuXG4vLyBsZXQgZyA9IG5ldyBTcGF0aWFsR3JpZCgwLCAwLCAxMDAwMCwgMTAwMDAsIDEwMCk7XG4vL1xuLy8gZm9yICh2YXIgdD0wOyB0PCAyMDAwMDsgdCsrKVxuLy8ge1xuLy8gICBnLmFkZCh7eDogTWF0aC5yYW5kb20oKSAqIDEwMDAwLCB5OiBNYXRoLnJhbmRvbSgpICogMTAwMDB9KTtcbi8vIH1cbi8vXG4vLyAvLyBnLmFkZCh7eDogMTcsIHk6MTcsIGlkOjB9KTtcbi8vIC8vIGcuYWRkKHt4OiAxOCwgeToxOCwgaWQ6MX0pO1xuLy8gLy8gZy5hZGQoe3g6IDEsIHk6MSwgaWQ6Mn0pO1xuLy8gLy8gZy5hZGQoe3g6IDIsIHk6MiwgaWQ6M30pO1xuLy8gLy8gZy5hZGQoe3g6IDMzLCB5OjMzLCBpZDo0fSk7XG4vLyAvLyBnLmFkZCh7eDogNjYsIHk6NjYsIGlkOjR9KTtcbi8vXG4vLyB2YXIgdDE9IHBlcmZvcm1hbmNlLm5vdygpO1xuLy8gZm9yICh2YXIgdD0wOyB0PCAyMDAwMDsgdCsrKVxuLy8gICBnLnF1ZXJ5KDMsIDMsIDExMCk7XG4vL1xuLy8gY29uc29sZS5sb2coYFRvb2sgJHtwZXJmb3JtYW5jZS5ub3coKSAtIHQxfSBtc2ApO1xuLy9cblxuXG5cblxuXG5sZXQgZnBzVGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZnBzXCIpO1xuXG5sZXQgbGFzdFRpbWUgPSAwLCBmcmFtZXMgPSAwLCBhdkZyYW1lcyA9IDA7XG5cbmxldCB3b3JsZCA9IG5ldyBPcGVuV29ybGQoe1xuICBzaXplOiBTSVpFLFxuICBzcHJlYWQ6IDEuMCxcbiAgcHJvY2VzczogJ3ZlcnRpY2FsJyxcbiAgdHlwZTogQm9pZCxcbiAgcmVuZGVyOiAnY29udGVudCcsXG4gIHNjYWxlOiBWSUVXX1NDQUxFXG59KTtcblxuXG4vLyB3b3JsZC5ldm9sdmUoKTtcbi8vIHJlbmRlcmVyLnJlbmRlcih3b3JsZC5kYXRhKTtcbi8vXG4vLyBjb25zb2xlLmxvZyh3b3JsZC5kYXRhKTtcblxud2luZG93LndvcmxkID0gd29ybGQ7XG5cbndpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKTtcbndpbmRvdy5zZXRJbnRlcnZhbCgoKSA9PiB7IHdvcmxkLmV2b2x2ZSgpIH0sIDEwMDAgLyBXT1JMRF9GUkFNRV9SQVRFKTtcblxuZnVuY3Rpb24gcmVuZGVyKClcbntcbiAgbGV0IHRpbWVOb3cgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgbGV0IHRpbWVUYWtlbiA9IHRpbWVOb3cgLSBsYXN0VGltZTtcblxuICBhdkZyYW1lcyArPSAgMTAwMCAvIHRpbWVUYWtlbjtcbiAgbGFzdFRpbWUgPSB0aW1lTm93O1xuXG4gIGlmIChmcmFtZXMrKyA9PSAxMClcbiAge1xuICAvLyAgZnBzVGV4dC5pbm5lckhUTUwgPSAoYXZGcmFtZXMgLyAxMCkudG9GaXhlZCgxKSArIFwiIEZQU1wiO1xuICAgIGZyYW1lcyA9IDA7XG4gICAgYXZGcmFtZXMgPSAwO1xuICB9XG5cbiAgd29ybGQucmVuZGVyKCk7XG4gIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLzJkL21haW4uanMiLCJcbi8vXG4vLyBBbGFuIE1hY0xlb2QgMDQtTWF5LTIwMTdcbi8vXG4vLyBHcmlkLmpzXG4vLyBDaGVhcCAqZHluYW1pYyogc3BhdGlhbCBpbmRleCAoMkQpXG4vLyBTcGxpdHMgYW4gYXJlYSBpbnRvIGEgc2ltcGxlIGdyaWQsIGVhY2ggY2VsbCBrZWVwcyB0cmFjayBvZiBhIGxpc3Qgb2Ygb2JqZWN0c1xuLy8gR2VuZXJhbGx5IHBlcmZvcm1zIGJldHRlciBvbiBtb2Rlcm4gaGFyZHdhcmUgY29tcGFyZWQgdG8gcmVjb25zdHJ1Y3RpbmcgYSBxdWFkdHJlZSBldGNcbi8vIGFkZCgpIG9yIG1vdmUoKSBvYmplY3RzLiBQZXJmb3JtY2UgbmVhcmVzdCBuZWlnaGJvdXIgc2VhcmNoIHdpdGggcXVlcnkoKVxuLy8gV29yc3QgY2FzZSBwZXJmb3JtYW5jZSBPKG4pIGlmIGFsbCBvYmplY3RzIGJ1bmNoZWQgaW50byBvbmUgY2VsbCAoVF9UKVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTcGF0aWFsR3JpZFxue1xuICBjb25zdHJ1Y3RvcihtaW54LCBtaW55LCBtYXh4LCBtYXh5LCBjZWxscylcbiAge1xuICAgIHRoaXMuZ3JpZCA9IHRoaXMuYXJyYXkyZChjZWxscywgY2VsbHMpO1xuXG4gICAgdGhpcy53aWR0aCA9IChtYXh4IC0gbWlueCk7XG4gICAgdGhpcy5oZWlnaHQgPSAobWF4eSAtIG1pbnkpO1xuICAgIHRoaXMubnVtY2VsbHMgPSBjZWxscztcbiAgICB0aGlzLnhjZWxsc2l6ZSA9IHRoaXMud2lkdGggIC8gY2VsbHM7XG4gICAgdGhpcy55Y2VsbHNpemUgPSB0aGlzLmhlaWdodCAvIGNlbGxzO1xuXG4gICAgdGhpcy5tYXhSYWRpdXMgPSAoTWF0aC5zcXJ0KHRoaXMud2lkdGggKiB0aGlzLndpZHRoICsgdGhpcy5oZWlnaHQgKiB0aGlzLmhlaWdodCkpO1xuXG4gICAgdGhpcy5mb3VuZE9iamVjdHMgPSBbXTtcbiAgfVxuXG4gIC8vIEV4cGVjdHM6IGBpdGVtYCBjb250YWlucyBgeGAgYW5kIGB5YCBwcm9wZXJ0aWVzXG4gIGFkZChpdGVtKVxuICB7XG4gICAgLy8gV2hpY2ggY2VsbFxuICAgIGxldCBjZWxseCA9IHRoaXMud3JhcCgoaXRlbS54IC0gdGhpcy5tb2QoaXRlbS54LCB0aGlzLnhjZWxsc2l6ZSkpIC8gdGhpcy54Y2VsbHNpemUpO1xuICAgIGxldCBjZWxseSA9IHRoaXMud3JhcCgoaXRlbS55IC0gdGhpcy5tb2QoaXRlbS55LCB0aGlzLnljZWxsc2l6ZSkpIC8gdGhpcy55Y2VsbHNpemUpO1xuXG4gICAgbGV0IGNlbGwgPSB0aGlzLmdyaWRbY2VsbHldW2NlbGx4XSB8fCBbXTtcblxuICAgIGlmICghY2VsbC5pbmNsdWRlcyhpdGVtKSlcbiAgICAgIGNlbGwucHVzaChpdGVtKTtcblxuICAgIHRoaXMuZ3JpZFtjZWxseV1bY2VsbHhdID0gY2VsbDtcbiAgfVxuXG4gIC8vIEZST00oZngsZnkpIC0+IFRPKHR4LHR5KVxuICBtb3ZlKGl0ZW0sIGZ4LCBmeSwgdHgsIHR5KVxuICB7XG4gICAgbGV0IGNlbGxmeCA9IChmeCAtICh0aGlzLm1vZChmeCwgdGhpcy54Y2VsbHNpemUpKSkgLyB0aGlzLnhjZWxsc2l6ZTtcbiAgICBsZXQgY2VsbGZ5ID0gKGZ5IC0gKHRoaXMubW9kKGZ5LCB0aGlzLnljZWxsc2l6ZSkpKSAvIHRoaXMueWNlbGxzaXplO1xuICAgIGxldCBjZWxsdHggPSAodHggLSAodGhpcy5tb2QodHgsIHRoaXMueGNlbGxzaXplKSkpIC8gdGhpcy54Y2VsbHNpemU7XG4gICAgbGV0IGNlbGx0eSA9ICh0eSAtICh0aGlzLm1vZCh0eSwgdGhpcy55Y2VsbHNpemUpKSkgLyB0aGlzLnljZWxsc2l6ZTtcblxuICAgIC8vIFdlIGhhdmVuJ3QgbGVmdCB0aGUgY2VsbCwgY2Fycnkgb25cbiAgICBpZiAoKGNlbGxmeCA9PSBjZWxsdHgpICYmIChjZWxsZnkgPT0gY2VsbHR5KSkgcmV0dXJuO1xuXG4gICAgLy8gUmVtb3ZlIHVzIGZyb20gdGhlIGxhc3QgY2VsbFxuICAgIGxldCBjZWxsID0gdGhpcy5ncmlkW2NlbGxmeV1bY2VsbGZ4XTtcbiAgICBjZWxsLnNwbGljZShjZWxsLmluZGV4T2YoaXRlbSksIDEpO1xuXG4gICAgLy8gQWRkIHVzIHRvIHRoZSBuZXcgY2VsbFxuICAgIGNlbGwgPSB0aGlzLmdyaWRbdGhpcy53cmFwKGNlbGx0eSldW3RoaXMud3JhcChjZWxsdHgpXTtcbiAgICBjZWxsLnB1c2goaXRlbSk7XG4gIH1cblxuICBtb2QoYSwgIGIpXG4gIHtcbiAgICAgIGxldCByID0gYSAlIGI7XG4gICAgICByZXR1cm4gciA8IDAgPyByICsgYiA6IHI7XG4gIH1cblxuICBxdWVyeSh4LCB5LCByKVxuICB7XG4gICAgaWYgKHIgPiB0aGlzLm1heFJhZGl1cykgciA9IHRoaXMubWF4UmFkaXVzO1xuXG4gICAgLy8gU3F1YXJlZCBkaXN0YW5jZVxuICAgIGxldCByc3EgPSByICogcjtcblxuICAgIC8vIFdoaWNoIGNlbGwgYXJlIHdlIGluP1xuICAgIC8vIGxldCBjZWxsY2VudHJleCA9ICh4IC0gKHRoaXMubW9kKHgsIHRoaXMueGNlbGxzaXplKSkpIC8gdGhpcy54Y2VsbHNpemU7XG4gICAgLy8gbGV0IGNlbGxjZW50cmV5ID0gKHkgLSAodGhpcy5tb2QoeSwgdGhpcy55Y2VsbHNpemUpKSkgLyB0aGlzLnljZWxsc2l6ZTtcblxuICAgIC8vIFVzZSBkaWFnb25hbCBleHRlbnQgdG8gZmluZCB0aGUgY2VsbCByYW5nZSB0byBzZWFyY2hcbiAgICBsZXQgY2VsbG1pbnggPSAoKHggLSByKSAtICh0aGlzLm1vZCgoeCAtIHIpLCB0aGlzLnhjZWxsc2l6ZSkpKSAvIHRoaXMueGNlbGxzaXplO1xuICAgIGxldCBjZWxsbWlueSA9ICgoeSAtIHIpIC0gKHRoaXMubW9kKCh5IC0gciksIHRoaXMueWNlbGxzaXplKSkpIC8gdGhpcy55Y2VsbHNpemU7XG4gICAgbGV0IGNlbGxtYXh4ID0gKCh4ICsgcikgLSAodGhpcy5tb2QoKHggKyByKSwgdGhpcy54Y2VsbHNpemUpKSkgLyB0aGlzLnhjZWxsc2l6ZTtcbiAgICBsZXQgY2VsbG1heHkgPSAoKHkgKyByKSAtICh0aGlzLm1vZCgoeSArIHIpLCB0aGlzLnljZWxsc2l6ZSkpKSAvIHRoaXMueWNlbGxzaXplO1xuXG4gIC8vICBjb25zb2xlLmxvZyhgQ2hlY2tpbmcgbnVtY2VsbHMgJHtjZWxsbWF4eCAtIGNlbGxtaW54fSwgJHtjZWxsbWF4eSAtIGNlbGxtaW55fWApO1xuXG4gICAgaWYgKGNlbGxtaW54IDwgMCkgY2VsbG1pbnggPSAwO1xuICAgIGlmIChjZWxsbWF4eCA+PSB0aGlzLnhjZWxsc2l6ZSkgY2VsbG1heHggPSB0aGlzLnhjZWxsc2l6ZS0xO1xuXG4gICAgaWYgKGNlbGxtaW55IDwgMCkgY2VsbG1pbnkgPSAwO1xuICAgIGlmIChjZWxsbWF4eSA+PSB0aGlzLnljZWxsc2l6ZSkgY2VsbG1heHkgPSB0aGlzLnljZWxsc2l6ZSAtIDE7XG5cbiAgICB0aGlzLmZvdW5kT2JqZWN0cyA9IFtdO1xuICAgIC8vXG4gICAgLy8gaWYgKChjZWxsbWF4eSAtIGNlbGxtaW55KSA+PSB0aGlzLm51bWNlbGxzKSBjZWxsbWF4eSA9IGNlbGxtaW55ICsgdGhpcy5udW1jZWxscyAtIDE7XG4gICAgLy8gaWYgKChjZWxsbWF4eCAtIGNlbGxtaW54KSA+PSB0aGlzLm51bWNlbGxzKSBjZWxsbWF4eCA9IGNlbGxtaW54ICsgdGhpcy5udW1jZWxscyAtIDE7XG5cbiAgICBmb3IgKGxldCBjeT1jZWxsbWlueTsgY3k8PWNlbGxtYXh5OyBjeSsrKVxuICAgIHtcbiAgICAgIGZvciAobGV0IGN4PWNlbGxtaW54OyBjeDw9Y2VsbG1heHg7IGN4KyspXG4gICAgICB7XG4gICAgICAgIC8vIGxldCB3eCA9IHRoaXMud3JhcChjeCksIHd5ID0gdGhpcy53cmFwKGN5KTtcblxuICAgICAgICAvLyBpZiAob25jZVt3eV1bd3hdKSBjb250aW51ZTtcbiAgICAgICAgLy8gb25jZVt3eV1bd3hdID0gMTtcblxuICAgICAgICBsZXQgY2VsbCA9IHRoaXMuZ3JpZFtjeV1bY3hdXG4gICAgICAgIGlmICghY2VsbCkgY29udGludWU7XG5cbiAgICAgICAgZm9yIChsZXQgdD0wOyB0PGNlbGwubGVuZ3RoOyB0KyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gY2VsbFt0XTtcbiAgICAgICAgICAgIGxldCBkID0gdGhpcy5kaXN0c3EoaXRlbS54LCBpdGVtLnksIHgsIHkpO1xuICAgICAgICAgICAgaWYgKGQgPD0gcnNxKSB0aGlzLmZvdW5kT2JqZWN0cy5wdXNoKGl0ZW0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuZm91bmRPYmplY3RzO1xuICB9XG5cblxuICAvLyByZXR1cm5zIGFsbCBvYmplY3RzIGluIHJhZGl1cyByIGZyb20gcG9pbnQgeCx5XG4gIHF1ZXJ5d3JhcCh4LCB5LCByKVxuICB7XG4gICAgaWYgKHIgPiB0aGlzLm1heFJhZGl1cykgciA9IHRoaXMubWF4UmFkaXVzO1xuXG4gICAgLy8gU3F1YXJlZCBkaXN0YW5jZVxuICAgIGxldCByc3EgPSByICogcjtcblxuICAgIC8vIFdoaWNoIGNlbGwgYXJlIHdlIGluP1xuICAgIGxldCBjZWxsY2VudHJleCA9ICh4IC0gKHRoaXMubW9kKHgsIHRoaXMueGNlbGxzaXplKSkpIC8gdGhpcy54Y2VsbHNpemU7XG4gICAgbGV0IGNlbGxjZW50cmV5ID0gKHkgLSAodGhpcy5tb2QoeSwgdGhpcy55Y2VsbHNpemUpKSkgLyB0aGlzLnljZWxsc2l6ZTtcblxuICAgIC8vIFVzZSBkaWFnb25hbCBleHRlbnQgdG8gZmluZCB0aGUgY2VsbCByYW5nZSB0byBzZWFyY2hcbiAgICBsZXQgY2VsbG1pbnggPSAoKHggLSByKSAtICh0aGlzLm1vZCgoeCAtIHIpLCB0aGlzLnhjZWxsc2l6ZSkpKSAvIHRoaXMueGNlbGxzaXplO1xuICAgIGxldCBjZWxsbWlueSA9ICgoeSAtIHIpIC0gKHRoaXMubW9kKCh5IC0gciksIHRoaXMueWNlbGxzaXplKSkpIC8gdGhpcy55Y2VsbHNpemU7XG4gICAgbGV0IGNlbGxtYXh4ID0gKCh4ICsgcikgLSAodGhpcy5tb2QoKHggKyByKSwgdGhpcy54Y2VsbHNpemUpKSkgLyB0aGlzLnhjZWxsc2l6ZTtcbiAgICBsZXQgY2VsbG1heHkgPSAoKHkgKyByKSAtICh0aGlzLm1vZCgoeSArIHIpLCB0aGlzLnljZWxsc2l6ZSkpKSAvIHRoaXMueWNlbGxzaXplO1xuXG4gIC8vICBjb25zb2xlLmxvZyhgQ2hlY2tpbmcgbnVtY2VsbHMgJHtjZWxsbWF4eCAtIGNlbGxtaW54fSwgJHtjZWxsbWF4eSAtIGNlbGxtaW55fWApO1xuXG4gICAgbGV0IG9ianMgPSBbXTtcblxuICAgIGlmICgoY2VsbG1heHkgLSBjZWxsbWlueSkgPj0gdGhpcy5udW1jZWxscykgY2VsbG1heHkgPSBjZWxsbWlueSArIHRoaXMubnVtY2VsbHMgLSAxO1xuICAgIGlmICgoY2VsbG1heHggLSBjZWxsbWlueCkgPj0gdGhpcy5udW1jZWxscykgY2VsbG1heHggPSBjZWxsbWlueCArIHRoaXMubnVtY2VsbHMgLSAxO1xuXG4gICAgZm9yIChsZXQgY3k9Y2VsbG1pbnk7IGN5PD1jZWxsbWF4eTsgY3krKylcbiAgICB7XG4gICAgICBmb3IgKGxldCBjeD1jZWxsbWlueDsgY3g8PWNlbGxtYXh4OyBjeCsrKVxuICAgICAge1xuICAgICAgICBsZXQgd3ggPSB0aGlzLndyYXAoY3gpLCB3eSA9IHRoaXMud3JhcChjeSk7XG5cbiAgICAgICAgLy8gaWYgKG9uY2Vbd3ldW3d4XSkgY29udGludWU7XG4gICAgICAgIC8vIG9uY2Vbd3ldW3d4XSA9IDE7XG5cbiAgICAgICAgbGV0IGNlbGwgPSB0aGlzLmdyaWRbd3ldW3d4XVxuICAgICAgICBpZiAoIWNlbGwpIGNvbnRpbnVlO1xuXG4gICAgICAgIGZvciAobGV0IHQ9MDsgdDxjZWxsLmxlbmd0aDsgdCsrKVxuICAgICAgICB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IGNlbGxbdF07XG4gICAgICAgICAgICBsZXQgZCA9IHRoaXMuZGlzdHNxKGl0ZW0ueCwgaXRlbS55LCB4LCB5KTtcbiAgICAgICAgICAgIGlmIChkIDw9IHJzcSkgb2Jqcy5wdXNoKGl0ZW0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG9ianM7XG4gIH1cblxuICBkaXN0c3EoeDEsIHkxLCB4MiwgeTIpXG4gIHtcbiAgICBsZXQgeGQgPSB4MiAtIHgxLCB5ZCA9IHkyIC0geTE7XG4gICAgcmV0dXJuICgoeGQgKiB4ZCkgKyAoeWQgKiB5ZCkpO1xuICB9XG5cbiAgd3JhcChhKVxuICB7XG4gICAgcmV0dXJuIHRoaXMubW9kKGEsIHRoaXMubnVtY2VsbHMpO1xuICAgIC8vIC8vIFRoaXMgbmVlZHMgdG8gYmUgbW9yZSBzb3BoaXN0aWNhdGVkIHRvIHdyYXAgbXVsdGlwbGUgbnVtY2VsbHMgd2lkdGhzIVxuICAgIC8vIGlmIChhIDwgMCkgcmV0dXJuIGEgKyB0aGlzLm51bWNlbGxzO1xuICAgIC8vIGlmIChhID49IHRoaXMubnVtY2VsbHMpIHJldHVybiBhIC0gdGhpcy5udW1jZWxscztcbiAgICAvLyByZXR1cm4gYTtcbiAgfVxuXG4gIGFycmF5MmQodywgaCwgaW5pdD1udWxsKVxuICB7XG4gICAgbGV0IHYgPSBbXTtcbiAgICBmb3IgKGxldCB5PTA7IHk8aDsgeSsrKVxuICAgIHtcbiAgICAgIGxldCBoID0gW107XG4gICAgICBmb3IgKGxldCB4PTA7IHg8dzsgeCsrKVxuICAgICAgICBoW3hdID0gaW5pdDtcbiAgICAgIHYucHVzaChoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdjtcbiAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi8yZC9jb3JlL1NwYXRpYWxHcmlkLmpzIiwiXG5pbXBvcnQgUmVuZGVyZXIgICAgIGZyb20gJy4vUmVuZGVyZXIyZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdvcmxkXG57XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpXG4gIHtcbiAgICB0aGlzLnNpemUgPSBvcHRpb25zLnNpemU7IC8vY2VsbHMsIHNxdWFyZVxuICAgIHRoaXMuZGF0YSA9IG51bGw7XG4gICAgdGhpcy5wdHlwZSA9IHt9O1xuXG4gICAgdGhpcy5wdHlwZVsndmVydGljYWwnXSA9IHRoaXMudmVydGljYWw7XG4gICAgdGhpcy5wdHlwZVsnc3dpcmwnXSA9IHRoaXMuc3dpcmw7XG5cbiAgICB0aGlzLnJlbmRlcmVyID0gbmV3IFJlbmRlcmVyKG9wdGlvbnMucmVuZGVyKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNjYWxlID0gb3B0aW9ucy5zY2FsZTtcblxuICAgIHRoaXMuZXZvbHZlID0gdGhpcy5wdHlwZVtvcHRpb25zLnByb2Nlc3NdO1xuXG4gICAgdGhpcy5pbml0KG9wdGlvbnMudHlwZSwgb3B0aW9ucy5zcHJlYWQpO1xuICB9XG5cbiAgaW5pdChDZWxsVHlwZSwgc3ByZWFkKVxuICB7XG4gICAgLy8gQ3JlYXRlIHRoZSBhcnJheTpcbiAgICB0aGlzLmRhdGEgPSB0aGlzLmFycmF5MmQodGhpcy5zaXplKTtcbiAgICBsZXQgaSA9IDA7XG5cbiAgICBmb3IgKGxldCB5PTA7IHk8dGhpcy5zaXplOyB5KyspXG4gICAge1xuICAgICAgZm9yIChsZXQgeD0wOyB4PHRoaXMuc2l6ZTsgeCsrKVxuICAgICAge1xuICAgICAgICAvLyBEb2VzIENlbGxUeXBlIHByb3ZpZGUgYSBzdGF0aWMgJ3Rlc3QnaW5nIGZ1bmN0aW9uP1xuICAgICAgICBpZiAoQ2VsbFR5cGUudGVzdClcbiAgICAgICAge1xuICAgICAgICAgIC8vIElzIGl0IG9rIGlmIHdlIHBsYWNlIHRoZSBjZWxsIGhlcmU/XG4gICAgICAgICAgLy9pZiAoKVxuICAgICAgICAgIGlmIChNYXRoLnJhbmRvbSgpIDw9IHNwcmVhZClcbiAgICAgICAgICAgIHRoaXMuZGF0YVt5XVt4XSA9IG5ldyBDZWxsVHlwZShcbiAgICAgICAgICAgICAgQ2VsbFR5cGUudGVzdCh4LHksdGhpcy5zaXplLCB0aGlzLnNpemUpXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChNYXRoLnJhbmRvbSgpIDw9IHNwcmVhZClcbiAgICAgICAgICAgIHRoaXMuZGF0YVt5XVt4XSA9IG5ldyBDZWxsVHlwZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKClcbiAge1xuICAgIHRoaXMucmVuZGVyZXIucmVuZGVyKHRoaXMuZGF0YSk7XG4gIH1cblxuICBuZWlnaGJvdXJob29kKHgsIHksIHIpXG4gIHtcbiAgICBsZXQgcmFkaXVzID0gciB8fCAxO1xuICAgIGxldCBudW0gPSAocmFkaXVzICogMikgKyAxO1xuXG4gICAgbGV0IHZ4ID0geCAtIHJhZGl1cztcbiAgICBsZXQgdnkgPSB5IC0gcmFkaXVzO1xuXG4gICAgbGV0IG4gPSB0aGlzLmFycmF5MmQobnVtKTtcbiAgICBsZXQgbCA9IFtdO1xuXG4gICAgZm9yIChsZXQgaXk9MDsgaXk8bnVtOyBpeSsrKVxuICAgIHtcbiAgICAgIHZ4ID0geCAtIHJhZGl1cztcbiAgICAgIGZvciAobGV0IGl4PTA7IGl4PG51bTsgaXgrKylcbiAgICAgIHtcbiAgICAgICAgbltpeV1baXhdID0gdGhpcy5kYXRhW3RoaXMud3JhcCh2eSldW3RoaXMud3JhcCh2eCldO1xuICAgICAgICBsLnB1c2godGhpcy5kYXRhW3RoaXMud3JhcCh2eSldW3RoaXMud3JhcCh2eCldKTtcbiAgICAgICAgdngrKztcbiAgICAgIH1cbiAgICAgIHZ5Kys7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGNlbGxzOiBuLFxuICAgICAgbGluZWFyOiBsLFxuICAgICAgcmFkaXVzOiByYWRpdXMsXG4gICAgICBzdWJqZWN0OiB0aGlzLmRhdGFbeV1beF1cbiAgICB9XG4gIH1cblxuICB3cmFwKHYpXG4gIHtcbiAgICBpZiAoIHYgPCAwICkgcmV0dXJuIHYgKyB0aGlzLnNpemU7XG4gICAgaWYgKCB2ID4gdGhpcy5zaXplLTEpIHJldHVybiB2IC0gdGhpcy5zaXplO1xuICAgIHJldHVybiB2O1xuICB9XG5cbiAgYXJyYXkyZChzaXplKVxuICB7XG4gICAgZm9yICh2YXIgZD1bXTsgZC5sZW5ndGggPCBzaXplOyBkLnB1c2goW10pKTtcbiAgICByZXR1cm4gZDtcbiAgfVxuXG4gIC8vIG1ha2VzIHZlcnkgbGl0dGxlIGRpZmZlcmVuY2UgOi9cbiAgc3dpcmwoKVxuICB7XG4gICAgbGV0IG5leHQgPSB0aGlzLmFycmF5MmQodGhpcy5zaXplKTtcbiAgICBsZXQgbnVtID0gKHRoaXMuc2l6ZSAqIHRoaXMuc2l6ZSkgKyAodGhpcy5zaXplICogMik7XG4gICAgbGV0IHggPSBNYXRoLnJvdW5kKHRoaXMuc2l6ZSAvIDIpO1xuICAgIGxldCB5ID0gTWF0aC5yb3VuZCh0aGlzLnNpemUgLyAyKTtcbiAgICBsZXQgeGQgPSAxLCB5ZCA9IDE7XG4gICAgbGV0IHZpc2l0ZWQgPSAwO1xuXG4gICAgbGV0IGl0ZXJhdG9yID0gMTtcbiAgICBkb1xuICAgIHtcbiAgICAgIGZvciAobGV0IHhpPTA7IHhpIDwgaXRlcmF0b3I7IHhpKyspXG4gICAgICB7XG4gICAgICAgIC8vY2FuLmJsb2NrKHggKiBWSUVXX1NDQUxFLCB5KlZJRVdfU0NBTEUsIFZJRVdfU0NBTEUsIFZJRVdfU0NBTEUsIGNvbCk7XG4gICAgICAgIGlmICh0aGlzLmRhdGFbeV1beF0pXG4gICAgICAgICAgbmV4dFt5XVt4XSA9IHRoaXMuZGF0YVt5XVt4XS5tdXRhdGUodGhpcy5uZWlnaGJvdXJob29kKHgseSkpO1xuXG4gICAgICAgIHggKz0geGQ7XG4gICAgICAgIHZpc2l0ZWQrKztcbiAgICAgICAgaWYgKHggPCAwIHx8IHggPiB0aGlzLnNpemUtMSkgYnJlYWs7XG4gICAgICB9XG4gICAgICB4ZCA9IC14ZDtcblxuICAgICAgZm9yIChsZXQgeWk9MDsgeWkgPCBpdGVyYXRvcjsgeWkrKylcbiAgICAgIHtcblxuICAgICAgICAvL2Nhbi5ibG9jayh4ICogVklFV19TQ0FMRSwgeSpWSUVXX1NDQUxFLCBWSUVXX1NDQUxFLCBWSUVXX1NDQUxFLCBjb2wpO1xuICAgICAgICBpZiAodGhpcy5kYXRhW3ldW3hdKVxuICAgICAgICAgIG5leHRbeV1beF0gPSB0aGlzLmRhdGFbeV1beF0ubXV0YXRlKHRoaXMubmVpZ2hib3VyaG9vZCh4LHkpKTtcblxuICAgICAgICB5ICs9IHlkO1xuICAgICAgICB2aXNpdGVkKys7XG4gICAgICAgIGlmICh5IDwgMCB8fCB5ID4gdGhpcy5zaXplLTEpIGJyZWFrO1xuICAgICAgfVxuICAgICAgeWQgPSAteWQ7XG5cbiAgICAgIGl0ZXJhdG9yICs9IDE7XG4gICAgfSB3aGlsZSh2aXNpdGVkIDwgbnVtKTtcblxuICAgIHRoaXMuZGF0YSA9IG5leHQ7XG4gIH1cblxuICB2ZXJ0aWNhbCgpXG4gIHtcbiAgICBsZXQgbmV4dCA9IHRoaXMuYXJyYXkyZCh0aGlzLnNpemUpO1xuXG4gICAgdGhpcy5wcmVwYXJlKCk7XG5cbiAgICBmb3IgKGxldCB5PTA7IHk8dGhpcy5zaXplOyB5KyspXG4gICAge1xuICAgICAgZm9yIChsZXQgeD0wOyB4PHRoaXMuc2l6ZTsgeCsrKVxuICAgICAge1xuICAgICAgICBpZiAodGhpcy5kYXRhW3ldW3hdKVxuICAgICAgICAgIG5leHRbeV1beF0gPSB0aGlzLmRhdGFbeV1beF0ubXV0YXRlKHRoaXMubmVpZ2hib3VyaG9vZCh4LHkpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmRhdGEgPSBuZXh0O1xuICB9XG5cblxuICBwcmVwYXJlKClcbiAge1xuICAgIGxldCBuID0gMDtcbiAgICBmb3IgKGxldCB5PTA7IHk8dGhpcy5zaXplOyB5KyspXG4gICAgICBmb3IgKGxldCB4PTA7IHg8dGhpcy5zaXplOyB4KyspXG4gICAgICAgIGlmICh0aGlzLmRhdGFbeV1beF0pIHRoaXMuZGF0YVt5XVt4XS5wcmVwYXJlKCk7XG5cbiAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi8yZC9jb3JlL1dvcmxkLmpzIiwiXG5pbXBvcnQgQ2FudmFzMmQgZnJvbSAnLi4vLi4vc2hhcmVkL0NhbnZhczJkJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVuZGVyZXIyZFxue1xuICBjb25zdHJ1Y3RvcihlbGVtZW50KVxuICB7XG4gICAgdGhpcy5jYW52YXMyZCA9IG5ldyBDYW52YXMyZChlbGVtZW50KTtcbiAgICB0aGlzLnNjYWxlID0gMTtcbiAgICB0aGlzLnNpemUgPSAxO1xuICB9XG5cbiAgcmVzaXplKHcsIGgpXG4gIHtcbiAgICB0aGlzLmNhbnZhczJkLnJlc2l6ZSh3LCBoKTtcbiAgICB0aGlzLmNhbnZhczJkLmNsZWFyKCk7XG4gIH1cblxuICByZW5kZXIoZGF0YSlcbiAge1xuXG4gICAgaWYgKGRhdGEubGVuZ3RoICE9IHRoaXMuc2l6ZSlcbiAgICB7XG4gICAgICB0aGlzLnNpemUgPSBkYXRhLmxlbmd0aDtcbiAgICAgIHRoaXMucmVzaXplKHRoaXMuc2l6ZSAqIHRoaXMuc2NhbGUsIHRoaXMuc2l6ZSAqIHRoaXMuc2NhbGUpO1xuICAgIH1cblxuICAgIGZvciAobGV0IHk9MDsgeTx0aGlzLnNpemU7IHkrKylcbiAgICB7XG4gICAgICBmb3IgKGxldCB4PTA7IHg8dGhpcy5zaXplOyB4KyspXG4gICAgICB7XG4gICAgICAgIGlmIChkYXRhW3ldW3hdKVxuICAgICAgICB7XG4gICAgICAgICAgbGV0IGNvbCA9IGRhdGFbeV1beF0uc2hhZGVyKCk7XG4gICAgICAgIC8vbGV0IGNvbCA9IGRhdGFbeV1beF0gPyBbMCwwLDBdIDogWzI1NSwyNTUsMjU1XTtcbiAgICAgICAgICB0aGlzLmNhbnZhczJkLmJsb2NrKHggKiB0aGlzLnNjYWxlLCB5ICogdGhpcy5zY2FsZSwgdGhpcy5zY2FsZSwgdGhpcy5zY2FsZSwgY29sKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLzJkL2NvcmUvUmVuZGVyZXIyZC5qcyIsIlxuXG4vLyBCb2lsZXJwbGF0ZSBmdW5jdGlvbnMgdG8gd3JpdGUgdG8gdGhlIENhbnZhc1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYW52YXMyZFxue1xuICBjb25zdHJ1Y3RvcihwYXJlbnQpXG4gIHtcbiAgICB0aGlzLnBhcmVudCA9IHR5cGVvZiBwYXJlbnQgPT0gJ3N0cmluZycgPyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwYXJlbnQpIDogcGFyZW50O1xuICAgIHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgdGhpcy5wYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50KTtcbiAgICB0aGlzLmNvbnRleHQgPSB0aGlzLmVsZW1lbnQuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIHRoaXMuY2xlYXIoKTtcblxuICB9XG5cbiAgYmxvY2soeCx5LHcsaCxjKVxuICB7XG4gICAgbGV0IHQgPSB0aGlzLmNvbnRleHQ7XG4gICAgdC5iZWdpblBhdGgoKTtcbiAgICB0LnJlY3QoeCwgeSwgdywgaCk7XG4gICAgdC5maWxsU3R5bGUgPSBjID8gYHJnYigke2NbMF19LCR7Y1sxXX0sJHtjWzJdfSlgIDogXCJibGFja1wiO1xuICAgIHQuZmlsbCgpO1xuICB9XG5cbiAgc2VsZmJsaXQoc3gsIHN5LCBzdywgc2gsIGR4LCBkeSwgZHcsIGRoKVxuICB7XG4gICAgdGhpcy5jb250ZXh0LmRyYXdJbWFnZSh0aGlzLmNvbnRleHQuY2FudmFzLCBzeCwgc3ksIHN3LCBzaCwgZHgsIGR5LCBkdywgZGgpO1xuICB9XG5cbiAgY2xlYXIoYylcbiAge1xuICAgIGxldCB0ID0gdGhpcy5jb250ZXh0O1xuICAgIHQuYmVnaW5QYXRoKCk7XG4gICAgdC5yZWN0KDAsIDAsIHRoaXMuZWxlbWVudC53aWR0aCwgdGhpcy5lbGVtZW50LmhlaWdodCk7XG4gICAgdC5maWxsU3R5bGUgPSBjID8gYHJnYigke2NbMF19LCR7Y1sxXX0sJHtjWzJdfSlgIDogXCJ3aGl0ZVwiO1xuICAgIHQuZmlsbCgpO1xuICB9XG5cbiAgd2lkdGgoKVxuICB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudC53aWR0aDtcbiAgfVxuXG4gIGhlaWdodCgpXG4gIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50LmhlaWdodDtcbiAgfVxuXG4gIGZpdHdpbmRvdygpXG4gIHtcbiAgICB0aGlzLnJlc2l6ZSh0aGlzLnBhcmVudC5jbGllbnRXaWR0aCwgdGhpcy5wYXJlbnQuY2xpZW50SGVpZ2h0KTtcbiAgfVxuXG4gIHJlc2l6ZSh3LCBoKVxuICB7XG5cbiAgICB0aGlzLmVsZW1lbnQud2lkdGggPSB3O1xuICAgIHRoaXMuZWxlbWVudC5oZWlnaHQgPSBoO1xuXG4gICAgLy8gZHJhdygpXG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NoYXJlZC9DYW52YXMyZC5qcyIsIlxuaW1wb3J0IENlbGwgZnJvbSAnLi9DZWxsJztcblxuY29uc3QgQUxJVkUgPSAxLCBERUFEID0gMDtcblxuY29uc3QgcGFsZXR0ZSA9IFtcbiAgWzI1NSwyNTUsMjU1XSxcbiAgWzAsMCwwXVxuXTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZU9mTGlmZSBleHRlbmRzIENlbGxcbntcbiAgY29uc3RydWN0b3IoKVxuICB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmFsaXZlID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKTtcbiAgfVxuXG4gIHNoYWRlcigpXG4gIHsgICAgXG4gICAgcmV0dXJuIHBhbGV0dGVbIHRoaXMuYWxpdmUgXTtcbiAgfVxuXG5cbiAgZXZhbHVhdGUoKVxuICB7XG4gICAgcmV0dXJuIHRoaXMuYWxpdmUgPyAxIDogMDtcbiAgfVxuXG4gIC8vIC8vIEdldHMgb3IgYXNzaWducyBhICd2YWx1ZScgdG8gZmVlZGJhY2sgaW50byB0aGUgQ2VsbCAnaW50ZXJmYWNlJyBjb3VudGluZyBtZXRob2RcbiAgdmFsdWUodilcbiAge1xuICAgIGlmICh2ID09PSB1bmRlZmluZWQpIHJldHVybiB0aGlzLmFsaXZlID8gMSA6IDA7XG4gICAgdGhpcy5hbGl2ZSA9ICh2ID09IDApID8gREVBRCA6IEFMSVZFO1xuICB9XG5cblxuICBtdXRhdGUoY2VsbHMpXG4gIHtcbiAgICBsZXQgbiA9IHRoaXMubnVtTGl2ZU5laWdoYm91cnMoY2VsbHMpO1xuICAgIGxldCBtZSA9IG5ldyBHYW1lT2ZMaWZlKCk7XG4gICAgbGV0IG5ld1N0YXRlID0gREVBRDtcblxuICAgIGlmIChjZWxscy5zdWJqZWN0LmFsaXZlICYmIG4gPCAyKVxuICAgICAgbmV3U3RhdGUgPSBERUFEO1xuICAgIGVsc2UgaWYgKGNlbGxzLnN1YmplY3QuYWxpdmUgJiYgbiA+IDMpXG4gICAgICBuZXdTdGF0ZSA9IERFQUQ7XG4gICAgZWxzZSBpZiAoIWNlbGxzLnN1YmplY3QuYWxpdmUgJiYgbiA9PSAzKVxuICAgICAgbmV3U3RhdGUgPSBBTElWRTtcbiAgICBlbHNlXG4gICAgICBuZXdTdGF0ZSA9IGNlbGxzLnN1YmplY3QudmFsdWUoKTtcblxuICAgIG1lLnZhbHVlKG5ld1N0YXRlKTtcblxuICAgIHJldHVybiBtZTtcbiAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi8yZC9jZWxscy9Hb0wuanMiLCJcbi8vIFRoaXMgaXMgdGhlIGJhc2UgdHlwZSBvZiBDZWxsIHVzZWQgZm9yIGV2ZXJ5IENBIHR5cGUuXG4vLyBJdCdzIG1vcmUgb2YgYSBjbGFzc2ljYWwgXCJJbnRlcmZhY2VcIiB0aGFuIGEgY2xhc3MgSSBzdXBwb3NlXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENlbGxcbntcbiAgY29uc3RydWN0b3IoKVxuICB7XG5cbiAgfVxuXG4gIHByZXBhcmUoKVxuICB7XG5cbiAgfVxuXG4gIG11dGF0ZShuZWlnaGJvdXJzKVxuICB7XG5cbiAgfVxuXG4gIHNoYWRlcigpXG4gIHtcblxuICB9XG5cblxuICB2YWx1ZSgpXG4gIHtcblxuICB9XG5cbiAgbnVtTGl2ZU5laWdoYm91cnMobilcbiAge1xuICAgIGxldCBudW0gPSAwO1xuXG4gICAgZm9yIChsZXQgeSA9IDA7IHk8bi5jZWxscy5sZW5ndGg7IHkrKylcbiAgICAgIGZvciAobGV0IHggPSAwOyB4PG4uY2VsbHNbeV0ubGVuZ3RoOyB4KyspXG4gICAgICAgIGlmIChuLmNlbGxzW3ldW3hdKSBpZiAobi5jZWxsc1t5XVt4XS52YWx1ZSgpID4gMCkgbnVtICsrO1xuXG4gICAgLy8gZG9uJ3QgaW5jbHVkZSAndXMnIGluIHRoZSBjb3VudCFcbiAgICByZXR1cm4gbnVtIC0gKG4uc3ViamVjdC52YWx1ZSgpID4gMCA/IDEgOiAwKTtcbiAgfVxuXG4gIG51bU5laWdoYm91cnNXaXRoVmFsdWUobiwgdilcbiAge1xuICAgIGxldCBudW0gPSAwO1xuXG4gICAgZm9yIChsZXQgdD0wOyB0PG4ubGluZWFyLmxlbmd0aDsgdCsrKVxuICAgIHtcbiAgICAgIGlmIChuLmxpbmVhclt0XSlcbiAgICAgICAgaWYgKG4ubGluZWFyW3RdLnZhbHVlKCkgPT0gdikgbnVtKys7XG4gICAgfVxuICAgIHJldHVybiBudW07XG4gIH1cblxuICBhdmVyYWdlVmFsdWVOZWlnaGJvdXJzKG4pXG4gIHtcbiAgICBsZXQgc3VtID0gMDtcbiAgICBmb3IgKGxldCB0PTA7IHQ8bi5saW5lYXIubGVuZ3RoOyB0KyspXG4gICAge1xuICAgICAgaWYgKG4ubGluZWFyW3RdKVxuICAgICAge1xuICAgICAgICBzdW0gKz0gbi5saW5lYXJbdF0udmFsdWUoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzdW0gLT0gbi5zdWJqZWN0LnZhbHVlKCk7XG5cbiAgICByZXR1cm4gc3VtIC8gKG4ubGluZWFyLmxlbmd0aC0xKTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vMmQvY2VsbHMvQ2VsbC5qcyIsIlxuaW1wb3J0IENlbGwgZnJvbSAnLi9DZWxsJztcbmltcG9ydCBVdGlsIGZyb20gJy4vVXRpbCc7XG5cbmNvbnN0IE1BWF9WQUxVRVMgPSAzMjtcbmNvbnN0IFI9MCwgRz0xLCBCPTI7XG4vL1xuLy8gY29uc3QgcGFsZXR0ZSA9IFtcbi8vICAgWzEwLCAyNTUsIDk2XSxcbi8vICAgWzI1NSwgMzIsIDI1NV0sXG4vLyAgIFsxNzIsIDU0LCAyNTVdLFxuLy8gICBbMzIsIDMyLCAyNTVdLFxuLy8gICBbMzIsIDI1NSwgMjU1XSxcbi8vICAgWzMyLCAzMiwgMjU1XSxcbi8vICAgWzI1NSwgMjU1LCAzMl1cbi8vIF07XG5cbi8vIG5pY2UgY2xvdWRzXG4vLyBjb25zdCBwYWxldHRlID0gW1xuLy8gICBbNTMsIDE3NywgMjU1XSxcbi8vICAgWzIwMCwgMjAwLCAyMTVdLFxuLy8gICBbMjU1LCAyNTUsIDI1NV1cbi8vIF07XG5cbi8vIGZpcmUgaXNoXG4vLyBjb25zdCBwYWxldHRlID0gW1xuLy8gICBbMjU1LCAwLCAwXSxcbi8vICAgWzI1NSwgMjU1LCAwXSxcbi8vICAgWzI1NSwgMjU1LCAyMjBdXG4vLyBdO1xuXG5jb25zdCBwYWxldHRlID0gW1xuICBbMjU1LDAsMCwxXSwgWzI1NSw5NiwwLDFdLCBbMjU1LDE5MSwwLDFdLCBbMjIzLDI1NSwwLDFdLFxuICBbMTI4LDI1NSwwLDFdLCBbMzIsMjU1LDAsMV0sIFswLDI1NSw2NCwxXSwgWzAsMjU1LDE1OSwxXSxcbiAgWzAsMjU1LDI1NSwxXSwgWzAsMTU5LDI1NSwxXSwgWzAsNjQsMjU1LDFdLCBbMzIsMCwyNTUsMV0sXG4gIFsxMjcsMCwyNTUsMV0sIFsyMjMsMCwyNTUsMV0sIFsyNTUsMCwxOTEsMV0sIFsyNTUsMCw5NiwxXVxuXTtcblxuY29uc3QgUkVEUyA9IHBhbGV0dGUubWFwKChlKSA9PiB7IHJldHVybiBlW1JdIH0pO1xuY29uc3QgR1JFRU5TID0gcGFsZXR0ZS5tYXAoKGUpID0+IHsgcmV0dXJuIGVbR10gfSk7XG5jb25zdCBCTFVFUyA9IHBhbGV0dGUubWFwKChlKSA9PiB7IHJldHVybiBlW0JdIH0pO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGbG9vZCBleHRlbmRzIENlbGxcbntcbiAgY29uc3RydWN0b3IoKVxuICB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnN0YXRlID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogTUFYX1ZBTFVFUyk7XG4gIH1cblxuICBzaGFkZXIoKVxuICB7XG4gICAgbGV0IGkgPSB0aGlzLnZhbHVlKCkgLyBNQVhfVkFMVUVTO1xuXG4gICAgcmV0dXJuIFtcbiAgICAgIFV0aWwuaWxpbmVycChSRURTLCBpKSAmIDB4ZmYsXG4gICAgICBVdGlsLmlsaW5lcnAoR1JFRU5TLCBpKSAmIDB4ZmYsXG4gICAgICBVdGlsLmlsaW5lcnAoQkxVRVMsIGkpICYgMHhmZlxuICAgIF07XG5cbiAgfVxuXG4gIC8vIC8vIEdldHMgb3IgYXNzaWducyBhICd2YWx1ZScgdG8gZmVlZGJhY2sgaW50byB0aGUgQ2VsbCAnaW50ZXJmYWNlJyBjb3VudGluZyBtZXRob2RcbiAgdmFsdWUodilcbiAge1xuICAgIGlmICh2ID09IHVuZGVmaW5lZCkgcmV0dXJuIHRoaXMuc3RhdGU7XG4gICAgdGhpcy5zdGF0ZSA9IHY7XG4gIH1cblxuXG4gIG11dGF0ZShlbnRpdHkpXG4gIHtcblxuICAgIGxldCBuZXh0ID0gKHRoaXMudmFsdWUoKSArIDEgKyAoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMykpKSAlIE1BWF9WQUxVRVM7XG4gICAgLy8odGhpcy52YWx1ZSgpICsgKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDUpKSkgJSBNQVhfVkFMVUVTO1xuXG4gICAgbGV0IGNoYW5nZSA9IGZhbHNlO1xuICAgIGZvciAobGV0IHQ9MDsgdDxlbnRpdHkubGluZWFyLmxlbmd0aDsgdCsrKVxuICAgIHtcbiAgICAgIGlmIChlbnRpdHkubGluZWFyW3RdKVxuICAgICAgICBjaGFuZ2UgPSBjaGFuZ2UgfHwgZW50aXR5LmxpbmVhclt0XS52YWx1ZSgpID09PSBuZXh0O1xuICAgIH1cblxuICAgIGlmICghY2hhbmdlKVxuICAgIHtcbiAgICAgIGxldCBuYyA9IHRoaXMuYXZlcmFnZVZhbHVlTmVpZ2hib3VycyhlbnRpdHkpO1xuICAgICAgaWYgKE1hdGguYWJzKHRoaXMudmFsdWUoKSAtIG5jKSA9PSAxKVxuICAgICAgICB0aGlzLnZhbHVlKG5jKTtcblxuICAgIH1cblxuICAgIGlmIChjaGFuZ2UpXG4gICAgICB0aGlzLnZhbHVlKG5leHQpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuXG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLzJkL2NlbGxzL0Zsb29kLmpzIiwiXG5cbmNsYXNzIFV0aWxcbntcbiAgY29uc3RydWN0b3IoKVxuICB7XG5cbiAgfVxuXG4gIC8vIExpbmVhcmx5IGludGVycG9sYXRlcyBiZXR3ZWVuIGFuIGFycmF5IG9mIHZhbHVlc1xuICAvLyBlLmcuIHZhbHVlcyA9IFs1LCAxMCwgMV0sIHAgPSAwLi4xXG5cbiAgaWxpbmVycCh2YWx1ZXMsIHBvc2l0aW9uKVxuICB7XG4gICAgaWYgKHBvc2l0aW9uID49IDEpIHJldHVybiB2YWx1ZXNbdmFsdWVzLmxlbmd0aC0xXTtcbiAgICBpZiAocG9zaXRpb24gPCAwKSByZXR1cm4gdmFsdWVzWzBdO1xuXG4gICAgbGV0IHAgPSBwb3NpdGlvbiAqICh2YWx1ZXMubGVuZ3RoIC0gMSk7XG5cbiAgICBsZXQgaTEgPSBNYXRoLmZsb29yKHApO1xuICAgIGxldCBpMiA9IGkxICsgMTtcbiAgICBsZXQgcSA9IHAgLSBpMTtcblxuICAgIGxldCB2ID0gKHZhbHVlc1tpMV0gKiAoMS1xKSkgKyAodmFsdWVzW2kyXSAqIChxKSk7XG5cbiAgICByZXR1cm4gTWF0aC5yb3VuZCh2KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCAobmV3IFV0aWwoKSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi8yZC9jZWxscy9VdGlsLmpzIiwiXG5pbXBvcnQgQ2VsbCBmcm9tICcuL0NlbGwnO1xuaW1wb3J0IFV0aWwgZnJvbSAnLi9VdGlsJztcblxuY29uc3QgcGFsZXR0ZSA9IFtcbiAgWzI1NSwyNTUsMjU1XSxcbiAgWzAsMCwwXVxuXTtcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdXJyb3cgZXh0ZW5kcyBDZWxsXG57XG4gIGNvbnN0cnVjdG9yKClcbiAge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5vcGVuID0gTWF0aC5yYW5kb20oKSA+IDAuNDtcbiAgfVxuXG4gIHByZXBhcmUoKVxuICB7XG4gICAgdGhpcy53YXNPcGVuID0gdGhpcy5vcGVuO1xuICB9XG5cbiAgc2hhZGVyKClcbiAge1xuICAgIHJldHVybiBwYWxldHRlIFsgdGhpcy52YWx1ZSgpIF07XG4gIH1cblxuXG4gIHZhbHVlKHYpXG4gIHtcbiAgICByZXR1cm4gdGhpcy53YXNPcGVuID8gMSA6IDA7XG4gIH1cblxuXG4gIG11dGF0ZShlbnRpdHkpXG4gIHtcbiAgICBsZXQgbnVtID0gdGhpcy5udW1MaXZlTmVpZ2hib3VycyhlbnRpdHkpO1xuICAgIHRoaXMub3BlbiA9ICh0aGlzLndhc09wZW4gJiYgbnVtID49NCkgfHwgbnVtID49IDY7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLzJkL2NlbGxzL0J1cnJvdy5qcyIsIlxuaW1wb3J0IENlbGwgZnJvbSAnLi9DZWxsJztcbmltcG9ydCBVdGlsIGZyb20gJy4vVXRpbCc7XG5cbmNvbnN0IE1BWF9WQUxVRVMgPSAzMjtcbmNvbnN0IFI9MCxHPTEsQj0yO1xuY29uc3QgcGFsZXR0ZSA9IFtcbiAgWzAsMCwwLDFdLCBbMjU1LDAsMCwwXSwgWzI1NSw5NiwwLDFdLCBbMjU1LDE5MSwwLDFdLCBbMjIzLDI1NSwwLDFdLFxuICBbMTI4LDI1NSwwLDFdLCBbMzIsMjU1LDAsMV0sIFswLDI1NSw2NCwxXSwgWzAsMjU1LDE1OSwxXSxcbiAgWzAsMjU1LDI1NSwxXSwgWzAsMTU5LDI1NSwxXSwgWzAsNjQsMjU1LDFdLCBbMzIsMCwyNTUsMV0sXG4gIFsxMjcsMCwyNTUsMV0sIFsyMjMsMCwyNTUsMV0sIFsyNTUsMCwxOTEsMV0sIFsyNTUsMCw5NiwxXVxuXTtcblxuXG5jb25zdCBSRURTID0gcGFsZXR0ZS5tYXAoKGUpID0+IHsgcmV0dXJuIGVbUl0gfSk7XG5jb25zdCBHUkVFTlMgPSBwYWxldHRlLm1hcCgoZSkgPT4geyByZXR1cm4gZVtHXSB9KTtcbmNvbnN0IEJMVUVTID0gcGFsZXR0ZS5tYXAoKGUpID0+IHsgcmV0dXJuIGVbQl0gfSk7XG5cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCbHVyIGV4dGVuZHMgQ2VsbFxue1xuICBjb25zdHJ1Y3RvcigpXG4gIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuc3RhdGUgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBNQVhfVkFMVUVTKTtcbiAgfVxuXG4gIHByZXBhcmUoKVxuICB7XG5cbiAgfVxuXG4gIHNoYWRlcigpXG4gIHtcbiAgICBsZXQgaSA9IHRoaXMuc3RhdGUgLyBNQVhfVkFMVUVTO1xuICAgIHJldHVybiBbXG4gICAgICBVdGlsLmlsaW5lcnAoUkVEUywgaSkgJiAweGZmLFxuICAgICAgVXRpbC5pbGluZXJwKEdSRUVOUywgaSkgJiAweGZmLFxuICAgICAgVXRpbC5pbGluZXJwKEJMVUVTLCBpKSAmIDB4ZmZcbiAgICBdO1xuXG4gIH1cblxuXG4gIC8vIC8vIEdldHMgb3IgYXNzaWducyBhICd2YWx1ZScgdG8gZmVlZGJhY2sgaW50byB0aGUgQ2VsbCAnaW50ZXJmYWNlJyBjb3VudGluZyBtZXRob2RcbiAgdmFsdWUodilcbiAge1xuICAgIGlmICh2ID09IHVuZGVmaW5lZCkgcmV0dXJuIHRoaXMuc3RhdGU7XG4gICAgaWYgKHYgPCAwKSB2Kz0gTUFYX1ZBTFVFUztcbiAgICB0aGlzLnN0YXRlID0gTWF0aC5yb3VuZCh2KTtcbiAgfVxuXG5cbiAgbXV0YXRlKGVudGl0eSlcbiAge1xuICAgIC8vIGlmIChlbnRpdHkuY2VsbHNbMF1bMV0udmFsdWUoKSA+IHRoaXMudmFsdWUoKSlcbiAgICAvLyB7XG4gICAgLy8gICBsZXQgdCA9IHRoaXMudmFsdWUoKTtcbiAgICAvLyAgIHRoaXMudmFsdWUoZW50aXR5LmNlbGxzWzBdWzFdLnZhbHVlKCkpO1xuICAgIC8vICAgZW50aXR5LmNlbGxzWzBdWzFdLnZhbHVlKHQpO1xuICAgIC8vIH0gZWxzZSB7XG4gICAgLy8gICBsZXQgdCA9IHRoaXMudmFsdWUoKTtcbiAgICAvLyAgIHRoaXMudmFsdWUoZW50aXR5LmNlbGxzWzFdWzJdLnZhbHVlKCkpO1xuICAgIC8vICAgZW50aXR5LmNlbGxzWzFdWzJdLnZhbHVlKHQpO1xuICAgIC8vIH1cbiAgICBsZXQgYXYgPSB0aGlzLmF2ZXJhZ2VWYWx1ZU5laWdoYm91cnMoZW50aXR5KTtcbiAgICB0aGlzLnZhbHVlKGF2KTtcblxuICAgIC8vIGlmICh0aGlzLm51bU5laWdoYm91cnNXaXRoVmFsdWUoZW50aXR5LCAwKSA+PSAyKVxuICAgIC8vIHtcbiAgICAvLyAgIHRoaXMudmFsdWUoTUFYX1ZBTFVFUy0xKTtcbiAgICAvLyB9XG5cbiAgICAvL2xldCBhdiA9IHRoaXMuYXZlcmFnZVZhbHVlTmVpZ2hib3VycyhlbnRpdHkpICogMS4wO1xuXG5cbiAgICBpZiAoTWF0aC5yYW5kb20oKSA8IDAuMDEpIHRoaXMudmFsdWUoIDApO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLzJkL2NlbGxzL0JsdXIuanMiLCJcbmltcG9ydCBDZWxsIGZyb20gJy4vQ2VsbCc7XG5pbXBvcnQgVXRpbCBmcm9tICcuL1V0aWwnO1xuXG5jb25zdCBNQVhfVkFMVUVTID0gMTY7XG5cbmNvbnN0IHBhbGV0dGUgPSBbXG4gIFswLCAwLCAwXSxcbiAgWzI1NSwgMjU1LCAyNTVdXG5dO1xuXG5jb25zdCBid3BhbGV0dGUgPSBbIDAsIDI1NSBdO1xuXG5jbGFzcyBTbm93IGV4dGVuZHMgQ2VsbFxue1xuICBjb25zdHJ1Y3RvcihwYXNzKVxuICB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuc25vd2luZyA9IGZhbHNlO1xuICAgIHRoaXMudmFsdWUoMCk7XG5cbiAgICBpZiAocGFzcylcbiAgICAgICAgdGhpcy5zdGFydFNub3dpbmcoKTtcbiAgfVxuXG4gIHByZXBhcmUoKVxuICB7XG5cbiAgfVxuXG4gIHN0YXJ0U25vd2luZygpXG4gIHtcbiAgICB0aGlzLnNub3dpbmcgPSB0cnVlO1xuICAgIHRoaXMudmFsdWUgKChNYXRoLnJhbmRvbSgpID4gMC42KSA/IE1BWF9WQUxVRVMgOiAwKTtcbiAgfVxuXG4gIHNoYWRlcigpXG4gIHtcbiAgICBsZXQgaSA9IFV0aWwuaWxpbmVycChid3BhbGV0dGUsIHRoaXMudmFsdWUoKSAvIE1BWF9WQUxVRVMpO1xuICAgIHJldHVybiBbIGksIGksIGkgXTtcblxuICAgIC8vcmV0dXJuIHBhbGV0dGUgWyB0aGlzLnZhbHVlKCkgXTtcbiAgfVxuXG4gIHZhbHVlKHYpXG4gIHtcbiAgICBpZiAodiA9PSB1bmRlZmluZWQpIHJldHVybiB0aGlzLnN0YXRlO1xuICAgIHRoaXMuc3RhdGUgPSB2O1xuICB9XG5cbiAgbXV0YXRlKGVudGl0eSlcbiAge1xuICAgIGlmICh0aGlzLnNub3dpbmcpXG4gICAge1xuICAgICAgdGhpcy52YWx1ZSggdGhpcy52YWx1ZSgpIC0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogMykpO1xuICAgICAgLy9cbiAgICAgIGlmICh0aGlzLnZhbHVlKCkgPCA4KVxuICAgICAge1xuICAgICAgICAgIGVudGl0eS5jZWxsc1syXVsxXS5zbm93aW5nID0gdHJ1ZTtcbiAgICAgICAgICBlbnRpdHkuY2VsbHNbMl1bMV0udmFsdWUodGhpcy52YWx1ZSgpICsgNCk7XG4gICAgICAgICAgdGhpcy52YWx1ZShNQVhfVkFMVUVTKTtcbiAgICAgIH1cbiAgICAgIC8vXG4gICAgICAvLyBpZiAodGhpcy52YWx1ZSgpIDw9IDApXG4gICAgICAvLyB7XG4gICAgICAvLyAgIHRoaXMudmFsdWUoMCk7XG4gICAgICAvLyAgIHRoaXMuc25vd2luZyA9IGZhbHNlO1xuICAgICAgLy8gfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuXG4gIH1cblxufVxuXG5Tbm93LnRlc3QgPSAoeCwgeSwgdywgaCkgPT4ge1xuICByZXR1cm4geSA9PSAwO1xuICAvL3JldHVybiB0cnVlO1xufVxuXG5leHBvcnQgZGVmYXVsdCBTbm93O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vMmQvY2VsbHMvU25vdy5qcyIsIlxuaW1wb3J0IFZlY3RvcjIgIGZyb20gJy4uL21hdGgvVmVjdG9yMic7XG5cbmNvbnN0IFBBTEVUVEUgPSBbXG4gIFswLDAsMF1cbl07XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9pZFxue1xuICBjb25zdHJ1Y3Rvcihwb3NpdGlvbiwgYm91bmRzKVxuICB7XG4gICAgdGhpcy5ib3VuZHMgPSBib3VuZHM7XG4gICAgdGhpcy5zcGVlZCA9IDEgKyAoTWF0aC5yYW5kb20oKSAvIDQpXG4gICAgdGhpcy5zaHluZXNzID0gMTAgKyAoTWF0aC5yYW5kb20oKSAqIDEwKTtcblxuICAgIHRoaXMudmVsb2NpdHkgPSBuZXcgVmVjdG9yMihcbiAgICAgIChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDQsXG4gICAgICAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiA0XG4gICAgKVxuXG4gICAgLy8gY29uc29sZS5sb2codGhpcy52ZWxvY2l0eSk7XG4gICB0aGlzLnBvc2l0aW9uID0gIG5ldyBWZWN0b3IyKE1hdGgucmFuZG9tKCkgKiB0aGlzLmJvdW5kcy54LCBNYXRoLnJhbmRvbSgpICogdGhpcy5ib3VuZHMueSk7XG4gICAgLy90aGlzLnBvc2l0aW9uID0gIG5ldyBWZWN0b3IyKE1hdGgucmFuZG9tKCkgKiAxMCwgTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICB0aGlzLnByZXBhcmUoKTtcblxuICB9XG5cbiAgc2hhZGVyKClcbiAge1xuICAgIHJldHVybiBQQUxFVFRFWzBdO1xuICB9XG5cbiAgbXV0YXRlKHN0YXRzKVxuICB7XG4gICAgdGhpcy52ZWxvY2l0eSA9IHRoaXMudmVsb2NpdHlcbiAgICAgICAgICAgICAgICAgICAgLmFkZCh0aGlzLnNlcGFyYXRlKHN0YXRzLm5laWdoYm91cnMsIHRoaXMuc2h5bmVzcykpXG4gICAgICAgICAgICAgICAgICAgIC5hZGQodGhpcy5hbGlnbihzdGF0cy5uZWlnaGJvdXJzKSlcbiAgICAgICAgICAgICAgICAgICAgLmFkZCh0aGlzLmNvaGVzaW9uMihzdGF0cy5uZWlnaGJvdXJzKSlcbiAgICAgICAgICAgICAgICAgICAgLy8uYWRkKCB0aGlzLmNvaGVzaW9uKCBzdGF0cy5jZW50cm9pZCApIClcbiAgICAgICAgICAgICAgICAgICAgLy8uYWRkKHRoaXMuc2VlayhzdGF0cy5tb3VzZSkpXG4gICAgICAgICAgICAgICAgICAgIC5ub3JtKCk7XG5cbiAgICAvL2NvbnNvbGUubG9nKCB0aGlzLmFsaWduKCBzdGF0cy5uZWlnaGJvdXJzICkgKTtcblxuXG5cblxuXG4gICAgdGhpcy5wb3NpdGlvbiA9IHRoaXMucG9zaXRpb24uYWRkKHRoaXMudmVsb2NpdHkpO1xuXG5cbiAgICB0aGlzLmJvdW5kKCk7XG4gICAgdGhpcy5kaXJ0eSA9IHRydWU7XG4gIH1cblxuXG4gIHJhdGUobmVpZ2hib3VycylcbiAge1xuICAgIGxldCBhdiA9IG5ldyBWZWN0b3IyKDAsMCk7XG5cbiAgICBpZiAoIW5laWdoYm91cnMubGVuZ3RoKSByZXR1cm4gYXY7XG5cbiAgICBmb3IgKGxldCB0PTA7IHQ8bmVpZ2hib3Vycy5sZW5ndGg7IHQrKylcbiAgICAgICAgYXYgPSBhdi5hZGQobmVpZ2hib3Vyc1t0XS52ZWxvY2l0eSk7XG5cbiAgICBhdiA9IGF2LmRpdihuZWlnaGJvdXJzLmxlbmd0aCk7XG5cbiAgICByZXR1cm4gYXYuc3ViKHRoaXMudmVsb2NpdHkpLmRpdig0KTtcbiAgfVxuXG4gIHNlZWsodGFyZ2V0KVxuICB7XG4gICAgbGV0IGRlc2lyZWQgPSB0YXJnZXQuc3ViKHRoaXMucG9zaXRpb24pLm5vcm0oKTtcbiAgICBsZXQgc3RlZXIgPSBkZXNpcmVkLnN1Yih0aGlzLnZlbG9jaXR5KS5ub3JtKCkubXVsKDAuNylcbiAgICByZXR1cm4gc3RlZXI7XG4gIH1cblxuICBhbGlnbjIobmVpZ2hib3VycylcbiAge1xuICAgIGxldCBkaXN0c3EgPSAyMCAqIDIwO1xuXG4gICAgbGV0IGMgPSBuZXcgVmVjdG9yMigwLDApO1xuICAgIGxldCBudW0gPSAwO1xuXG4gICAgZm9yIChsZXQgdD0wOyB0PCBuZWlnaGJvdXJzLmxlbmd0aDsgdCsrKVxuICAgIHtcbiAgICAgIGxldCBkID0gbmVpZ2hib3Vyc1t0XS5wb3NpdGlvbi5kaXN0c3EodGhpcy5wb3NpdGlvbik7XG4gICAgICBpZiAoZCA+IDAgJiYgZCA8IGRpc3RzcSlcbiAgICAgIHtcbiAgICAgICAgYyA9IGMuYWRkKG5laWdoYm91cnNbdF0udmVsb2NpdHkpO1xuICAgICAgICBudW0rKztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIW51bSkgcmV0dXJuIGM7XG5cbiAgICByZXR1cm4gYy5kaXYobnVtKS5ub3JtKCkubXVsKDEuNSkuc3ViKHRoaXMudmVsb2NpdHkpLm5vcm0oKTtcblxuICB9XG5cbiAgY29oZXNpb24yKG5laWdoYm91cnMpXG4gIHtcbiAgICBsZXQgYyA9IG5ldyBWZWN0b3IyKDAsMClcbiAgICBpZiAobmVpZ2hib3Vycy5sZW5ndGggPT0gMCkgcmV0dXJuIGM7XG5cblxuICAgIGZvciAobGV0IHQ9MDsgdDxuZWlnaGJvdXJzLmxlbmd0aDsgdCsrKVxuICAgICAgaWYgKHQgJiAxKSBjID0gYy5hZGQobmVpZ2hib3Vyc1t0XS5wb3NpdGlvbik7XG5cbiAgICAvL2NvbnNvbGUubG9nKCBuZWlnaGJvdXJzLmxlbmd0aCApO1xuXG4gICAgLy9yZXR1cm4gdGhpcy5jb2hlc2lvbiggYy5kaXYoIG5laWdoYm91cnMubGVuZ3RoICkgKTtcbiAgICAvL3JldHVybiBjLmRpdihuZWlnaGJvdXJzLmxlbmd0aCkubm9ybSgpLnN1Yih0aGlzLnBvc2l0aW9uKTtcbiAgICByZXR1cm4gdGhpcy5zZWVrKGMuZGl2KG5laWdoYm91cnMubGVuZ3RoKS5tdWwoLjgpKTtcblxuICB9XG5cbiAgYWxpZ24obmVpZ2hib3VycylcbiAge1xuICAgIGxldCBjID0gbmV3IFZlY3RvcjIoMCwwKVxuICAgIGlmIChuZWlnaGJvdXJzLmxlbmd0aCA9PSAwKSByZXR1cm4gYztcblxuXG4gICAgZm9yIChsZXQgdD0wOyB0PG5laWdoYm91cnMubGVuZ3RoOyB0KyspXG4gICAgICBjID0gYy5hZGQobmVpZ2hib3Vyc1t0XS52ZWxvY2l0eSk7XG5cbiAgICAvL2NvbnNvbGUubG9nKCBuZWlnaGJvdXJzLmxlbmd0aCApO1xuXG4gICAgLy9yZXR1cm4gdGhpcy5jb2hlc2lvbiggYy5kaXYoIG5laWdoYm91cnMubGVuZ3RoICkgKTtcbiAgICByZXR1cm4gYy5kaXYobmVpZ2hib3Vycy5sZW5ndGgpLm5vcm0oKS5tdWwodGhpcy5zcGVlZCkuc3ViKHRoaXMudmVsb2NpdHkpO1xuICB9XG5cbiAgc2VwYXJhdGUobmVpZ2hib3Vycywgc3BhY2luZylcbiAge1xuICAgIGxldCBzcGFjaW5nc3EgPSBzcGFjaW5nICogc3BhY2luZztcblxuICAgIGxldCBjID0gbmV3IFZlY3RvcjIoMCwwKTtcbiAgICBpZiAoIW5laWdoYm91cnMubGVuZ3RoKSByZXR1cm4gYztcblxuICAgIGxldCBudW0gPSAwO1xuXG4gICAgZm9yIChsZXQgdD0wOyB0PG5laWdoYm91cnMubGVuZ3RoOyB0KyspXG4gICAge1xuICAgICAgbGV0IGQgPSBuZWlnaGJvdXJzW3RdLnBvc2l0aW9uLmRpc3RzcSh0aGlzLnBvc2l0aW9uKTtcblxuICAgICAgaWYgKGQgPCBzcGFjaW5nc3EpXG4gICAgICB7XG4gICAgICAgIGxldCBkaWZmID0gdGhpcy5wb3NpdGlvbi5zdWIobmVpZ2hib3Vyc1t0XS5wb3NpdGlvbikubm9ybSgpO1xuICAgICAgICBjID0gYy5hZGQoZGlmZi5kaXYoZCkpO1xuICAgICAgICBudW0rKztcbiAgICAgIH1cblxuICAgICAgaWYgKCFudW0pIHJldHVybiBjO1xuXG4gICAgICBjID0gYy5kaXYobnVtKS5ub3JtKCk7XG5cbiAgICAgIHJldHVybiBjLnN1Yih0aGlzLnZlbG9jaXR5KS5ub3JtKCk7XG5cbiAgICB9XG4gICAgLy9cbiAgICAvLyBmb3IgKGxldCB0PTA7IHQ8bmVpZ2hib3Vycy5sZW5ndGg7IHQrKylcbiAgICAvLyB7XG4gICAgLy8gICAgIGMgPSBjLnN1YihcbiAgICAvLyAgICAgICAgICAgICAgIG5laWdoYm91cnNbdF0ucG9zaXRpb25cbiAgICAvLyAgICAgICAgICAgICAgIC5zdWIodGhpcy5wb3NpdGlvbilcbiAgICAvLyAgICAgICAgICAgICAgIC5ub3JtKClcbiAgICAvLyAgICAgICAgICk7XG4gICAgLy8gfVxuICAgIC8vXG4gICAgLy8gcmV0dXJuIGMubm9ybSgpO1xuICB9XG5cbiAgY29oZXNpb24odGFyZ2V0KVxuICB7XG4gICAgcmV0dXJuIHRhcmdldC5zdWIodGhpcy5wb3NpdGlvbilcbiAgICAgICAgICAgICAgICAgLnN1Yih0aGlzLnZlbG9jaXR5KVxuICAgICAgICAgICAgICAgICAubm9ybSgpO1xuICB9XG5cbiAgYm91bmQoKVxuICB7XG4gICAgdGhpcy5wb3NpdGlvbi54ID0gdGhpcy53cmFwKHRoaXMucG9zaXRpb24ueCwgdGhpcy5ib3VuZHMueCk7XG4gICAgdGhpcy5wb3NpdGlvbi55ID0gdGhpcy53cmFwKHRoaXMucG9zaXRpb24ueSwgdGhpcy5ib3VuZHMueSk7XG4gIH1cblxuICAvLyB3cmFwKHYsIG1heClcbiAgLy8ge1xuICAvLyAgIGlmICggdiA8IDAgKSAwXG4gIC8vICAgaWYgKCB2ID4gbWF4LTEpIHJldHVybiBtYXgtMTtcbiAgLy8gICByZXR1cm4gdjtcbiAgLy8gfVxuXG4gIHdyYXAodiwgbWF4KVxuICB7XG4gICAgaWYgKCB2IDwgMCApIHJldHVybiB2ICsgbWF4O1xuICAgIGlmICggdiA+IG1heC0xKSByZXR1cm4gdiAtIG1heDtcbiAgICByZXR1cm4gdjtcbiAgfVxuXG5cbiAgLy8gQ2FsbGVkIGF0IHRoZSBzdGFydCBvZiBldmVyeSBmcmFtZVxuICBwcmVwYXJlKClcbiAge1xuICAgIHRoaXMuZGlydHkgPSBmYWxzZTtcbiAgfVxuXG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLzJkL2NlbGxzL0JvaWQuanMiLCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmVjdG9yMlxue1xuICBjb25zdHJ1Y3Rvcih4LCB5KVxuICB7XG4gICAgdGhpcy54ID0gMCB8fCB4O1xuICAgIHRoaXMueSA9IDAgfHwgeTtcbiAgfVxuXG4gIHNldCh4LCB5KVxuICB7XG4gICAgW3RoaXMueCwgdGhpcy55XSA9IFt4LCB5XTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHN1YihiKVxuICB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IyKGIueCAtIHRoaXMueCwgYi55IC0gdGhpcy55KTtcbiAgfVxuXG4gIGFkZChiKVxuICB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IyKGIueCArIHRoaXMueCwgYi55ICsgdGhpcy55KTtcbiAgfVxuXG4gIG11bChzKVxuICB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IyKHRoaXMueCAqIHMsIHRoaXMueSAqIHMpO1xuICB9XG5cbiAgZGl2KHMpXG4gIHtcbiAgICByZXR1cm4gbmV3IFZlY3RvcjIodGhpcy54IC8gcywgdGhpcy55IC8gcyk7XG4gIH1cblxuICBub3JtKClcbiAge1xuICAgIGxldCBtID0gdGhpcy5tYWcoKTtcbiAgICByZXR1cm4gbSA/IHRoaXMuZGl2KG0pIDogdGhpcztcbiAgfVxuXG4gIG1hZygpXG4gIHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMueCAqIHRoaXMueCArIHRoaXMueSAqIHRoaXMueSk7XG4gIH1cblxuICBkaXN0KGIpXG4gIHtcbiAgICBsZXQgW3hkLCB5ZF0gPSBbIGIueCAtIHRoaXMueCwgYi55IC0gdGhpcy55XTtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHhkKnhkICsgeWQqeWQpO1xuICB9XG5cbiAgZGlzdHNxKGIpXG4gIHtcbiAgICBsZXQgW3hkLCB5ZF0gPSBbIGIueCAtIHRoaXMueCwgYi55IC0gdGhpcy55XTtcbiAgICByZXR1cm4gKHhkKnhkICsgeWQqeWQpO1xuICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLzJkL21hdGgvVmVjdG9yMi5qcyIsIlxuLy9pbXBvcnQgUmVuZGVyZXIgICAgIGZyb20gJy4vUmVuZGVyZXIyZCc7XG5pbXBvcnQgVmVjdG9yMiAgZnJvbSAnLi4vbWF0aC9WZWN0b3IyLmpzJztcbmxldCBQSVhJID0gcmVxdWlyZSgncGl4aS5qcycpOyAgICAvLyBmZnMgdXBkYXRlIHlvdXIgbW9kdWxlIGRlZnMsIFBJWElcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPcGVuV29ybGRcbntcbiAgY29uc3RydWN0b3Iob3B0aW9ucylcbiAge1xuICAgIHRoaXMuc2l6ZSA9IG9wdGlvbnMuc2l6ZTsgLy8gV29ybGQgc2l6ZVxuICAgIHRoaXMuZGF0YSA9IG51bGw7XG4gICAgdGhpcy5zY2FsZSA9IG9wdGlvbnMuc2NhbGUgfHwgMTtcblxuICAgIHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKG9wdGlvbnMucmVuZGVyKTtcblxuICAgIHRoaXMucmVuZGVyZXIgPSBQSVhJLmF1dG9EZXRlY3RSZW5kZXJlcih0aGlzLnNpemUgKiB0aGlzLnNjYWxlLCB0aGlzLnNpemUgKiB0aGlzLnNjYWxlKTtcbiAgICB0aGlzLnN0YWdlID0gbmV3IFBJWEkuQ29udGFpbmVyKCk7XG4gICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMucmVuZGVyZXIudmlldyk7XG4gICAgdGhpcy5tb3VzZSA9IG5ldyBWZWN0b3IyKDAsMCk7XG5cbiAgICB0aGlzLmVsZW1lbnQub25tb3VzZW1vdmUgPSAoZSkgPT4geyB0aGlzLm1vdXNlLnNldChlLmNsaWVudFgsIGUuY2xpZW50WSk7fVxuXG4gICAgdGhpcy5pbml0KG9wdGlvbnMudHlwZSwgb3B0aW9ucy5zcHJlYWQpO1xuICB9XG5cbiAgLy8gQ3JlYXRlIGFuZCBzYXZlIGEgbGlzdCBvZiBlbnRpdGllc1xuICBpbml0KENlbGxUeXBlLCBzcHJlYWQpXG4gIHtcbiAgICB0aGlzLmRhdGEgPSBbXTtcbiAgICB0aGlzLmdyYXBoaWNzID0gW107XG5cbiAgICBsZXQgZG9uZSA9IDAsIG1heCA9IDEwMDtcblxuICAgIGZvciAobGV0IHk9MDsgeTx0aGlzLnNpemU7IHkrKylcbiAgICB7XG4gICAgICBmb3IgKGxldCB4PTA7IHg8dGhpcy5zaXplOyB4KyspXG4gICAgICB7XG4gICAgICAgIGlmIChNYXRoLnJhbmRvbSgpIDwgc3ByZWFkKVxuICAgICAgICB7XG4gICAgICAgICAgbGV0IGMgPSBuZXcgQ2VsbFR5cGUobmV3IFZlY3RvcjIoeCwgeSksIG5ldyBWZWN0b3IyKHRoaXMuc2l6ZSwgdGhpcy5zaXplKSlcbiAgICAgICAgICB0aGlzLmRhdGEucHVzaChcbiAgICAgICAgICAgIGNcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgdmFyIHIgPSBuZXcgUElYSS5HcmFwaGljcygpO1xuXG4gICAgICAgICAgci5iZWdpbkZpbGwoMHhmZmZmZmYpO1xuICAgICAgICAgIHIuZHJhd1JlY3QoMCwwLHRoaXMuc2NhbGUsIHRoaXMuc2NhbGUpO1xuICAgICAgICAgIHIuZW5kRmlsbCgpO1xuICAgICAgICAgIHIueCA9IGMucG9zaXRpb24ueCAqIHRoaXMuc2NhbGU7XG4gICAgICAgICAgci55ID0gYy5wb3NpdGlvbi55ICogdGhpcy5zY2FsZTtcbiAgICAgICAgICB0aGlzLmdyYXBoaWNzLnB1c2gocik7XG4gICAgICAgICAgdGhpcy5zdGFnZS5hZGRDaGlsZChyKTtcblxuICAgICAgICAgIGRvbmUrKztcbiAgICAgICAgfVxuICAgICAgICBpZiAoZG9uZSA9PSBtYXgpIGJyZWFrO1xuICAgICAgfVxuICAgICAgaWYgKGRvbmUgPT0gbWF4KSBicmVhaztcbiAgICB9XG5cbiAgfVxuXG4gIHJlbmRlcigpXG4gIHtcbiAgICAvLyBmb3IgKGxldCBsPXRoaXMuZGF0YS5sZW5ndGgsIGk9MDsgaTxsOyBpKyspXG4gICAgLy8ge1xuICAgIC8vICAgbGV0IGUgPSB0aGlzLmRhdGFbaV07XG4gICAgLy8gICBsZXQgYyA9IGUuc2hhZGVyKCk7XG4gICAgLy9cbiAgICAvLyB9XG4gICAgdGhpcy5yZW5kZXJlci5yZW5kZXIodGhpcy5zdGFnZSk7XG4gIH1cblxuXG5cbiAgd3JhcCh2KVxuICB7XG4gICAgaWYgKCB2IDwgMCApIHJldHVybiB2ICsgdGhpcy5zaXplO1xuICAgIGlmICggdiA+IHRoaXMuc2l6ZS0xKSByZXR1cm4gdiAtIHRoaXMuc2l6ZTtcbiAgICByZXR1cm4gdjtcbiAgfVxuXG4gIGFycmF5MmQoc2l6ZSlcbiAge1xuICAgIGZvciAodmFyIGQ9W107IGQubGVuZ3RoIDwgc2l6ZTsgZC5wdXNoKFtdKSk7XG4gICAgcmV0dXJuIGQ7XG4gIH1cblxuICBldm9sdmUoKVxuICB7XG4gICAgdGhpcy5wcmVwYXJlKCk7XG5cbiAgICBsZXQgc3RhdGlzdGljcyA9IHtcbiAgICAgIGNlbnRyb2lkOiB0aGlzLmNlbnRyb2lkKCksXG4gICAgICBudW1iZXI6IHRoaXMuZGF0YS5sZW5ndGgsXG4gICAgICBtb3VzZTogdGhpcy5tb3VzZS5kaXYodGhpcy5zY2FsZSksXG4gICAgICBhbGw6IHRoaXMuZGF0YVxuICAgIH1cblxuICAgIGxldCByYWRpdXMgPSAxMDA7XG5cbiAgICBmb3IgKGxldCB0PTAsbD10aGlzLmRhdGEubGVuZ3RoOyB0PGw7dCsrKVxuICAgIHtcbiAgICAgIHN0YXRpc3RpY3MubmVpZ2hib3VycyA9IHRoaXMubmVpZ2hib3VyaG9vZCh0LCByYWRpdXMpO1xuXG4gICAgICB0aGlzLmRhdGFbdF0ubXV0YXRlKHN0YXRpc3RpY3MpO1xuXG4gICAgICBpZiAodGhpcy5kYXRhW3RdLmRpcnR5KVxuICAgICAge1xuICAgICAgICB0aGlzLmdyYXBoaWNzW3RdLnggPSBNYXRoLnJvdW5kKHRoaXMuZGF0YVt0XS5wb3NpdGlvbi54ICogdGhpcy5zY2FsZSk7XG4gICAgICAgIHRoaXMuZ3JhcGhpY3NbdF0ueSA9IE1hdGgucm91bmQodGhpcy5kYXRhW3RdLnBvc2l0aW9uLnkgKiB0aGlzLnNjYWxlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgfVxuXG4gIC8vIGluZGV4ID0gbG9va3VwIGZvciB0aGlzLmRhdGFbXSAodG8gc2tpcCBzZWxmLXRlc3QpLCByID0gcmFkaXVzIGluIHdvcmxkIHVuaXRzXG4gIG5laWdoYm91cmhvb2QoaW5kZXgsIHIpXG4gIHtcbiAgICBsZXQgcnMgPSByICogcjtcbiAgICBsZXQgbiA9IFtdO1xuICAgIGxldCB0ZXN0ID0gdGhpcy5kYXRhW2luZGV4XS5wb3NpdGlvbjtcblxuICAgIGZvciAobGV0IHQ9MCwgbD10aGlzLmRhdGEubGVuZ3RoOyB0PGw7IHQrKylcbiAgICB7XG4gICAgICBpZiAoIHQgPT0gaW5kZXggKSBjb250aW51ZTtcbiAgICAgIGxldCBkID0gdGhpcy5kYXRhW3RdLnBvc2l0aW9uLmRpc3RzcSh0ZXN0KTtcbiAgICAgIGlmICggZCA8PSBycyApIG4ucHVzaCh0aGlzLmRhdGFbdF0pO1xuICAgIH1cblxuICAgIHJldHVybiBuO1xuICB9XG5cbiAgY2VudHJvaWQoKVxuICB7XG4gICAgbGV0IHN4ID0gMCwgc3kgPSAwO1xuICAgIGZvciAobGV0IHQ9MCxsPXRoaXMuZGF0YS5sZW5ndGg7IHQ8bDsgdCsrKVxuICAgIHtcbiAgICAgIHN4ICs9IHRoaXMuZGF0YVt0XS5wb3NpdGlvbi54O1xuICAgICAgc3kgKz0gdGhpcy5kYXRhW3RdLnBvc2l0aW9uLnk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IyKHN4IC8gdGhpcy5kYXRhLmxlbmd0aCwgc3kgLyB0aGlzLmRhdGEubGVuZ3RoKTtcbiAgfVxuXG5cbiAgcHJlcGFyZSgpXG4gIHtcbiAgICBmb3IgKGxldCB0PTAsbD10aGlzLmRhdGEubGVuZ3RoOyB0PGw7IHQrKylcbiAgICAgIHRoaXMuZGF0YVt0XS5wcmVwYXJlKCk7XG4gICAgLy8gbGV0IG4gPSAwO1xuICAgIC8vIGZvciAobGV0IHk9MDsgeTx0aGlzLnNpemU7IHkrKylcbiAgICAvLyAgIGZvciAobGV0IHg9MDsgeDx0aGlzLnNpemU7IHgrKylcbiAgICAvLyAgICAgaWYgKHRoaXMuZGF0YVt5XVt4XSkgdGhpcy5kYXRhW3ldW3hdLnByZXBhcmUoKTtcbiAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi8yZC9jb3JlL09wZW5Xb3JsZC5qcyJdLCJzb3VyY2VSb290IjoiIn0=