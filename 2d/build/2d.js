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
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var SIZE = 100; // cells
	
	var world = new _World2.default(SIZE);
	
	console.log(world.neighbourhood(0, 0));

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
	      var d = void 0;
	      for (d = []; d.length < size; d.push([])) {}
	      return d;
	    }
	  }, {
	    key: "mutate",
	    value: function mutate(rule) {
	      var next = this.array2d(this.size);
	
	      for (var y = 0; y < this.size; y++) {
	        for (var x = 0; x < this.size; x++) {
	          this.next[y][x] = rule.apply(this.neighbourhood(x, y));
	        }
	      }
	
	      this.data = next;
	    }
	  }]);
	
	  return World;
	}();
	
	exports.default = World;

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNWVlZDlhZDIyOTkwZTVmZDQyYmMiLCJ3ZWJwYWNrOi8vLy4vMmQvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi8yZC9Xb3JsZC5qcyJdLCJuYW1lcyI6WyJTSVpFIiwid29ybGQiLCJjb25zb2xlIiwibG9nIiwibmVpZ2hib3VyaG9vZCIsIldvcmxkIiwic2l6ZSIsImRhdGEiLCJpbml0IiwiYXJyYXkyZCIsImkiLCJ5IiwieCIsIk1hdGgiLCJyb3VuZCIsInJhbmRvbSIsInIiLCJyYWRpdXMiLCJudW0iLCJ2eCIsInZ5IiwibiIsIml5IiwiaXgiLCJ3cmFwIiwiY2VsbHMiLCJzdWJqZWN0IiwidiIsImQiLCJsZW5ndGgiLCJwdXNoIiwicnVsZSIsIm5leHQiLCJhcHBseSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQ3BDQTs7Ozs7O0FBRUEsS0FBTUEsT0FBTyxHQUFiLEMsQ0FBa0I7O0FBRWxCLEtBQUlDLFFBQVEsb0JBQVVELElBQVYsQ0FBWjs7QUFFQUUsU0FBUUMsR0FBUixDQUFZRixNQUFNRyxhQUFOLENBQW9CLENBQXBCLEVBQXNCLENBQXRCLENBQVosRTs7Ozs7Ozs7Ozs7Ozs7OztLQ05xQkMsSztBQUVuQixrQkFBWUMsSUFBWixFQUNBO0FBQUE7O0FBQ0UsVUFBS0EsSUFBTCxHQUFZQSxJQUFaLENBREYsQ0FDb0I7QUFDbEIsVUFBS0MsSUFBTCxHQUFZLElBQVo7O0FBRUEsVUFBS0MsSUFBTDtBQUNEOzs7OzRCQUdEO0FBQ0U7QUFDQSxZQUFLRCxJQUFMLEdBQVksS0FBS0UsT0FBTCxDQUFhLEtBQUtILElBQWxCLENBQVo7QUFDQSxXQUFJSSxJQUFJLENBQVI7QUFDQTtBQUNBLFlBQUssSUFBSUMsSUFBRSxDQUFYLEVBQWNBLElBQUUsS0FBS0wsSUFBckIsRUFBMkJLLEdBQTNCO0FBQ0UsY0FBSyxJQUFJQyxJQUFFLENBQVgsRUFBY0EsSUFBRSxLQUFLTixJQUFyQixFQUEyQk0sR0FBM0I7QUFDRSxnQkFBS0wsSUFBTCxDQUFVSSxDQUFWLEVBQWFDLENBQWIsSUFBa0JDLEtBQUtDLEtBQUwsQ0FBV0QsS0FBS0UsTUFBTCxFQUFYLENBQWxCO0FBREY7QUFERjtBQUdEOzs7bUNBRWFILEMsRUFBR0QsQyxFQUFHSyxDLEVBQ3BCO0FBQ0UsV0FBSUMsU0FBU0QsS0FBSyxDQUFsQjtBQUNBLFdBQUlFLE1BQU9ELFNBQVMsQ0FBVixHQUFlLENBQXpCOztBQUVBLFdBQUlFLEtBQUtQLElBQUlLLE1BQWI7QUFDQSxXQUFJRyxLQUFLVCxJQUFJTSxNQUFiOztBQUVBLFdBQUlJLElBQUksS0FBS1osT0FBTCxDQUFhUyxHQUFiLENBQVI7O0FBRUEsWUFBSyxJQUFJSSxLQUFHLENBQVosRUFBZUEsS0FBR0osR0FBbEIsRUFBdUJJLElBQXZCLEVBQ0E7QUFDRUgsY0FBS1AsSUFBSUssTUFBVDtBQUNBLGNBQUssSUFBSU0sS0FBRyxDQUFaLEVBQWVBLEtBQUdMLEdBQWxCLEVBQXVCSyxJQUF2QixFQUNBO0FBQ0VGLGFBQUVDLEVBQUYsRUFBTUMsRUFBTixJQUFZLEtBQUtoQixJQUFMLENBQVUsS0FBS2lCLElBQUwsQ0FBVUosRUFBVixDQUFWLEVBQXlCLEtBQUtJLElBQUwsQ0FBVUwsRUFBVixDQUF6QixDQUFaO0FBQ0FBO0FBQ0Q7QUFDREM7QUFDRDs7QUFFRCxjQUFPO0FBQ0xLLGdCQUFPSixDQURGO0FBRUxKLGlCQUFRQSxNQUZIO0FBR0xTLGtCQUFTLEtBQUtuQixJQUFMLENBQVVJLENBQVYsRUFBYUMsQ0FBYjtBQUhKLFFBQVA7QUFLRDs7OzBCQUVJZSxDLEVBQ0w7QUFDRSxXQUFLQSxJQUFJLENBQVQsRUFBYSxPQUFPQSxJQUFJLEtBQUtyQixJQUFoQjtBQUNiLFdBQUtxQixJQUFJLEtBQUtyQixJQUFMLEdBQVUsQ0FBbkIsRUFBc0IsT0FBT3FCLElBQUksS0FBS3JCLElBQWhCO0FBQ3RCLGNBQU9xQixDQUFQO0FBQ0Q7Ozs2QkFFT3JCLEksRUFDUjtBQUNFLFdBQUlzQixVQUFKO0FBQ0EsWUFBS0EsSUFBRSxFQUFQLEVBQVdBLEVBQUVDLE1BQUYsR0FBV3ZCLElBQXRCLEVBQTRCc0IsRUFBRUUsSUFBRixDQUFPLEVBQVAsQ0FBNUI7QUFDQSxjQUFPRixDQUFQO0FBQ0Q7Ozs0QkFFTUcsSSxFQUNQO0FBQ0UsV0FBSUMsT0FBTyxLQUFLdkIsT0FBTCxDQUFhLEtBQUtILElBQWxCLENBQVg7O0FBRUEsWUFBSyxJQUFJSyxJQUFFLENBQVgsRUFBY0EsSUFBRSxLQUFLTCxJQUFyQixFQUEyQkssR0FBM0IsRUFDQTtBQUNFLGNBQUssSUFBSUMsSUFBRSxDQUFYLEVBQWNBLElBQUUsS0FBS04sSUFBckIsRUFBMkJNLEdBQTNCO0FBQ0UsZ0JBQUtvQixJQUFMLENBQVVyQixDQUFWLEVBQWFDLENBQWIsSUFBa0JtQixLQUFLRSxLQUFMLENBQVcsS0FBSzdCLGFBQUwsQ0FBbUJRLENBQW5CLEVBQXFCRCxDQUFyQixDQUFYLENBQWxCO0FBREY7QUFFRDs7QUFFRCxZQUFLSixJQUFMLEdBQVl5QixJQUFaO0FBQ0Q7Ozs7OzttQkExRWtCM0IsSyIsImZpbGUiOiIyZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA1ZWVkOWFkMjI5OTBlNWZkNDJiYyIsIlxuXG5pbXBvcnQgV29ybGQgZnJvbSAnLi9Xb3JsZC5qcyc7XG5cbmNvbnN0IFNJWkUgPSAxMDA7IC8vIGNlbGxzXG5cbmxldCB3b3JsZCA9IG5ldyBXb3JsZChTSVpFKTtcblxuY29uc29sZS5sb2cod29ybGQubmVpZ2hib3VyaG9vZCgwLDApKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLzJkL21haW4uanMiLCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV29ybGRcbntcbiAgY29uc3RydWN0b3Ioc2l6ZSlcbiAge1xuICAgIHRoaXMuc2l6ZSA9IHNpemU7IC8vY2VsbHMsIHNxdWFyZVxuICAgIHRoaXMuZGF0YSA9IG51bGw7XG5cbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIGluaXQoKVxuICB7XG4gICAgLy8gQ3JlYXRlIHRoZSBhcnJheTpcbiAgICB0aGlzLmRhdGEgPSB0aGlzLmFycmF5MmQodGhpcy5zaXplKTtcbiAgICBsZXQgaSA9IDA7XG4gICAgLy8gUmFuZG9taXNlIHRoZSBpbml0aWFsIHN0YXRlOlxuICAgIGZvciAobGV0IHk9MDsgeTx0aGlzLnNpemU7IHkrKylcbiAgICAgIGZvciAobGV0IHg9MDsgeDx0aGlzLnNpemU7IHgrKylcbiAgICAgICAgdGhpcy5kYXRhW3ldW3hdID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKTtcbiAgfVxuXG4gIG5laWdoYm91cmhvb2QoeCwgeSwgcilcbiAge1xuICAgIGxldCByYWRpdXMgPSByIHx8IDE7XG4gICAgbGV0IG51bSA9IChyYWRpdXMgKiAyKSArIDE7XG5cbiAgICBsZXQgdnggPSB4IC0gcmFkaXVzO1xuICAgIGxldCB2eSA9IHkgLSByYWRpdXM7XG5cbiAgICBsZXQgbiA9IHRoaXMuYXJyYXkyZChudW0pO1xuXG4gICAgZm9yIChsZXQgaXk9MDsgaXk8bnVtOyBpeSsrKVxuICAgIHtcbiAgICAgIHZ4ID0geCAtIHJhZGl1cztcbiAgICAgIGZvciAobGV0IGl4PTA7IGl4PG51bTsgaXgrKylcbiAgICAgIHtcbiAgICAgICAgbltpeV1baXhdID0gdGhpcy5kYXRhW3RoaXMud3JhcCh2eSldW3RoaXMud3JhcCh2eCldO1xuICAgICAgICB2eCsrO1xuICAgICAgfVxuICAgICAgdnkrKztcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgY2VsbHM6IG4sXG4gICAgICByYWRpdXM6IHJhZGl1cyxcbiAgICAgIHN1YmplY3Q6IHRoaXMuZGF0YVt5XVt4XVxuICAgIH1cbiAgfVxuXG4gIHdyYXAodilcbiAge1xuICAgIGlmICggdiA8IDAgKSByZXR1cm4gdiArIHRoaXMuc2l6ZTtcbiAgICBpZiAoIHYgPiB0aGlzLnNpemUtMSkgcmV0dXJuIHYgLSB0aGlzLnNpemU7XG4gICAgcmV0dXJuIHY7XG4gIH1cblxuICBhcnJheTJkKHNpemUpXG4gIHtcbiAgICBsZXQgZDtcbiAgICBmb3IgKGQ9W107IGQubGVuZ3RoIDwgc2l6ZTsgZC5wdXNoKFtdKSk7XG4gICAgcmV0dXJuIGQ7XG4gIH1cblxuICBtdXRhdGUocnVsZSlcbiAge1xuICAgIGxldCBuZXh0ID0gdGhpcy5hcnJheTJkKHRoaXMuc2l6ZSk7XG5cbiAgICBmb3IgKGxldCB5PTA7IHk8dGhpcy5zaXplOyB5KyspXG4gICAge1xuICAgICAgZm9yIChsZXQgeD0wOyB4PHRoaXMuc2l6ZTsgeCsrKVxuICAgICAgICB0aGlzLm5leHRbeV1beF0gPSBydWxlLmFwcGx5KHRoaXMubmVpZ2hib3VyaG9vZCh4LHkpKTtcbiAgICB9XG5cbiAgICB0aGlzLmRhdGEgPSBuZXh0O1xuICB9XG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLzJkL1dvcmxkLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==