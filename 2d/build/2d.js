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
	      for (this.data = []; this.data.length < this.size; this.data.push([])) {}
	
	      // Randomise the initial state:
	      for (var y = 0; y < this.size; y++) {
	        for (var x = 0; x < this.size; x++) {
	          this.data[y][x] = Math.round(Math.random());
	        }
	      }
	    }
	  }]);
	
	  return World;
	}();
	
	exports.default = World;

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzg2MTA3NGQ3MjA0MmRiNDhkZDEiLCJ3ZWJwYWNrOi8vLy4vMmQvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi8yZC9Xb3JsZC5qcyJdLCJuYW1lcyI6WyJTSVpFIiwid29ybGQiLCJXb3JsZCIsInNpemUiLCJkYXRhIiwiaW5pdCIsImxlbmd0aCIsInB1c2giLCJ5IiwieCIsIk1hdGgiLCJyb3VuZCIsInJhbmRvbSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQ3BDQTs7Ozs7O0FBRUEsS0FBTUEsT0FBTyxHQUFiLEMsQ0FBa0I7O0FBRWxCLEtBQUlDLFFBQVEsb0JBQVVELElBQVYsQ0FBWixDOzs7Ozs7Ozs7Ozs7Ozs7O0tDSnFCRSxLO0FBRW5CLGtCQUFZQyxJQUFaLEVBQ0E7QUFBQTs7QUFDRSxVQUFLQSxJQUFMLEdBQVlBLElBQVosQ0FERixDQUNvQjtBQUNsQixVQUFLQyxJQUFMLEdBQVksSUFBWjs7QUFFQSxVQUFLQyxJQUFMO0FBQ0Q7Ozs7NEJBR0Q7QUFDRTtBQUNBLFlBQUssS0FBS0QsSUFBTCxHQUFVLEVBQWYsRUFBbUIsS0FBS0EsSUFBTCxDQUFVRSxNQUFWLEdBQW1CLEtBQUtILElBQTNDLEVBQWlELEtBQUtDLElBQUwsQ0FBVUcsSUFBVixDQUFlLEVBQWYsQ0FBakQ7O0FBRUE7QUFDQSxZQUFLLElBQUlDLElBQUUsQ0FBWCxFQUFjQSxJQUFFLEtBQUtMLElBQXJCLEVBQTJCSyxHQUEzQjtBQUNFLGNBQUssSUFBSUMsSUFBRSxDQUFYLEVBQWNBLElBQUUsS0FBS04sSUFBckIsRUFBMkJNLEdBQTNCO0FBQ0UsZ0JBQUtMLElBQUwsQ0FBVUksQ0FBVixFQUFhQyxDQUFiLElBQWtCQyxLQUFLQyxLQUFMLENBQVdELEtBQUtFLE1BQUwsRUFBWCxDQUFsQjtBQURGO0FBREY7QUFHRDs7Ozs7O21CQW5Ca0JWLEsiLCJmaWxlIjoiMmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNzg2MTA3NGQ3MjA0MmRiNDhkZDEiLCJcblxuaW1wb3J0IFdvcmxkIGZyb20gJy4vV29ybGQuanMnO1xuXG5jb25zdCBTSVpFID0gMTAwOyAvLyBjZWxsc1xuXG5sZXQgd29ybGQgPSBuZXcgV29ybGQoU0laRSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi8yZC9tYWluLmpzIiwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdvcmxkXG57XG4gIGNvbnN0cnVjdG9yKHNpemUpXG4gIHtcbiAgICB0aGlzLnNpemUgPSBzaXplOyAvL2NlbGxzLCBzcXVhcmVcbiAgICB0aGlzLmRhdGEgPSBudWxsO1xuXG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICBpbml0KClcbiAge1xuICAgIC8vIENyZWF0ZSB0aGUgYXJyYXk6XG4gICAgZm9yICh0aGlzLmRhdGE9W107IHRoaXMuZGF0YS5sZW5ndGggPCB0aGlzLnNpemU7IHRoaXMuZGF0YS5wdXNoKFtdKSk7XG5cbiAgICAvLyBSYW5kb21pc2UgdGhlIGluaXRpYWwgc3RhdGU6XG4gICAgZm9yIChsZXQgeT0wOyB5PHRoaXMuc2l6ZTsgeSsrKVxuICAgICAgZm9yIChsZXQgeD0wOyB4PHRoaXMuc2l6ZTsgeCsrKVxuICAgICAgICB0aGlzLmRhdGFbeV1beF0gPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkpO1xuICB9XG5cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vMmQvV29ybGQuanMiXSwic291cmNlUm9vdCI6IiJ9