/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var pug_has_own_property = Object.prototype.hasOwnProperty;

/**
 * Merge two attribute objects giving precedence
 * to values in object `b`. Classes are special-cased
 * allowing for arrays and merging/joining appropriately
 * resulting in a string.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api private
 */

exports.merge = pug_merge;
function pug_merge(a, b) {
  if (arguments.length === 1) {
    var attrs = a[0];
    for (var i = 1; i < a.length; i++) {
      attrs = pug_merge(attrs, a[i]);
    }
    return attrs;
  }

  for (var key in b) {
    if (key === 'class') {
      var valA = a[key] || [];
      a[key] = (Array.isArray(valA) ? valA : [valA]).concat(b[key] || []);
    } else if (key === 'style') {
      var valA = pug_style(a[key]);
      var valB = pug_style(b[key]);
      a[key] = valA + valB;
    } else {
      a[key] = b[key];
    }
  }

  return a;
};

/**
 * Process array, object, or string as a string of classes delimited by a space.
 *
 * If `val` is an array, all members of it and its subarrays are counted as
 * classes. If `escaping` is an array, then whether or not the item in `val` is
 * escaped depends on the corresponding item in `escaping`. If `escaping` is
 * not an array, no escaping is done.
 *
 * If `val` is an object, all the keys whose value is truthy are counted as
 * classes. No escaping is done.
 *
 * If `val` is a string, it is counted as a class. No escaping is done.
 *
 * @param {(Array.<string>|Object.<string, boolean>|string)} val
 * @param {?Array.<string>} escaping
 * @return {String}
 */
exports.classes = pug_classes;
function pug_classes_array(val, escaping) {
  var classString = '', className, padding = '', escapeEnabled = Array.isArray(escaping);
  for (var i = 0; i < val.length; i++) {
    className = pug_classes(val[i]);
    if (!className) continue;
    escapeEnabled && escaping[i] && (className = pug_escape(className));
    classString = classString + padding + className;
    padding = ' ';
  }
  return classString;
}
function pug_classes_object(val) {
  var classString = '', padding = '';
  for (var key in val) {
    if (key && val[key] && pug_has_own_property.call(val, key)) {
      classString = classString + padding + key;
      padding = ' ';
    }
  }
  return classString;
}
function pug_classes(val, escaping) {
  if (Array.isArray(val)) {
    return pug_classes_array(val, escaping);
  } else if (val && typeof val === 'object') {
    return pug_classes_object(val);
  } else {
    return val || '';
  }
}

/**
 * Convert object or string to a string of CSS styles delimited by a semicolon.
 *
 * @param {(Object.<string, string>|string)} val
 * @return {String}
 */

exports.style = pug_style;
function pug_style(val) {
  if (!val) return '';
  if (typeof val === 'object') {
    var out = '';
    for (var style in val) {
      /* istanbul ignore else */
      if (pug_has_own_property.call(val, style)) {
        out = out + style + ':' + val[style] + ';';
      }
    }
    return out;
  } else {
    val += '';
    if (val[val.length - 1] !== ';') 
      return val + ';';
    return val;
  }
};

/**
 * Render the given attribute.
 *
 * @param {String} key
 * @param {String} val
 * @param {Boolean} escaped
 * @param {Boolean} terse
 * @return {String}
 */
exports.attr = pug_attr;
function pug_attr(key, val, escaped, terse) {
  if (val === false || val == null || !val && (key === 'class' || key === 'style')) {
    return '';
  }
  if (val === true) {
    return ' ' + (terse ? key : key + '="' + key + '"');
  }
  if (typeof val.toJSON === 'function') {
    val = val.toJSON();
  }
  if (typeof val !== 'string') {
    val = JSON.stringify(val);
    if (!escaped && val.indexOf('"') !== -1) {
      return ' ' + key + '=\'' + val.replace(/'/g, '&#39;') + '\'';
    }
  }
  if (escaped) val = pug_escape(val);
  return ' ' + key + '="' + val + '"';
};

/**
 * Render the given attributes object.
 *
 * @param {Object} obj
 * @param {Object} terse whether to use HTML5 terse boolean attributes
 * @return {String}
 */
exports.attrs = pug_attrs;
function pug_attrs(obj, terse){
  var attrs = '';

  for (var key in obj) {
    if (pug_has_own_property.call(obj, key)) {
      var val = obj[key];

      if ('class' === key) {
        val = pug_classes(val);
        attrs = pug_attr(key, val, false, terse) + attrs;
        continue;
      }
      if ('style' === key) {
        val = pug_style(val);
      }
      attrs += pug_attr(key, val, false, terse);
    }
  }

  return attrs;
};

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

var pug_match_html = /["&<>]/;
exports.escape = pug_escape;
function pug_escape(_html){
  var html = '' + _html;
  var regexResult = pug_match_html.exec(html);
  if (!regexResult) return _html;

  var result = '';
  var i, lastIndex, escape;
  for (i = regexResult.index, lastIndex = 0; i < html.length; i++) {
    switch (html.charCodeAt(i)) {
      case 34: escape = '&quot;'; break;
      case 38: escape = '&amp;'; break;
      case 60: escape = '&lt;'; break;
      case 62: escape = '&gt;'; break;
      default: continue;
    }
    if (lastIndex !== i) result += html.substring(lastIndex, i);
    lastIndex = i + 1;
    result += escape;
  }
  if (lastIndex !== i) return result + html.substring(lastIndex, i);
  else return result;
};

/**
 * Re-throw the given `err` in context to the
 * the pug in `filename` at the given `lineno`.
 *
 * @param {Error} err
 * @param {String} filename
 * @param {String} lineno
 * @param {String} str original source
 * @api private
 */

exports.rethrow = pug_rethrow;
function pug_rethrow(err, filename, lineno, str){
  if (!(err instanceof Error)) throw err;
  if ((typeof window != 'undefined' || !filename) && !str) {
    err.message += ' on line ' + lineno;
    throw err;
  }
  try {
    str = str || __webpack_require__(15).readFileSync(filename, 'utf8')
  } catch (ex) {
    pug_rethrow(err, null, lineno)
  }
  var context = 3
    , lines = str.split('\n')
    , start = Math.max(lineno - context, 0)
    , end = Math.min(lines.length, lineno + context);

  // Error context
  var context = lines.slice(start, end).map(function(line, i){
    var curr = i + start + 1;
    return (curr == lineno ? '  > ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'Pug') + ':' + lineno
    + '\n' + context + '\n\n' + err.message;
  throw err;
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UIBlock = function () {
    function UIBlock(node) {
        _classCallCheck(this, UIBlock);

        this.node = node;
    }

    _createClass(UIBlock, [{
        key: "render",
        value: function render(data) {
            console.log(data);
        }
    }]);

    return UIBlock;
}();

exports.default = UIBlock;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var View = function () {
  function View(node) {
    _classCallCheck(this, View);

    this.node = node;
  }

  _createClass(View, [{
    key: "toggle",
    value: function toggle(state) {
      this.node.hidden = !state;

      if (state) {
        this.render();
      }
    }
  }]);

  return View;
}();

exports.default = View;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var pParseHash = Symbol('parse hash');

var Router = function () {
    function Router(node) {
        _classCallCheck(this, Router);

        this.node = node;
        this.views = {};
    }

    _createClass(Router, [{
        key: 'register',
        value: function register(url, view) {
            this.views[url] = view;
            console.log(url, view);
        }

        /**
         * Метод парсит хеш по шаблону
         * Например #questions/1234/1234,
         * будет преобразован в следующий объект
         *  {
         *      id: #questions,
         *      args: [1234, 1234]
         *  }
         * @param hash
         * @return {Object}
         */

    }, {
        key: pParseHash,
        value: function value(hash) {
            return { id: hash, args: [] };
        }
    }, {
        key: 'onRoute',
        value: function onRoute(hash) {
            var params = this[pParseHash](hash);
            var view = this.views[params.id];

            if (this.current) {
                this.current.toggle(false);
            }

            if (view) {
                view.toggle(true, params.args);
                this.current = view;
            }
        }
    }, {
        key: 'start',
        value: function start() {
            var _this = this;

            window.addEventListener('hashchange', function () {
                _this.onRoute(location.hash);
            });

            this.onRoute(location.hash);
        }
    }]);

    return Router;
}();

exports.default = Router;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _view = __webpack_require__(2);

var _view2 = _interopRequireDefault(_view);

var _question = __webpack_require__(13);

var _question2 = _interopRequireDefault(_question);

var _uiquestion = __webpack_require__(9);

var _uiquestion2 = _interopRequireDefault(_uiquestion);

var _uianswer = __webpack_require__(8);

var _uianswer2 = _interopRequireDefault(_uianswer);

var _quiz = __webpack_require__(10);

var _quiz2 = _interopRequireDefault(_quiz);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VQuestion = function (_View) {
    _inherits(VQuestion, _View);

    function VQuestion(node) {
        _classCallCheck(this, VQuestion);

        var _this = _possibleConstructorReturn(this, (VQuestion.__proto__ || Object.getPrototypeOf(VQuestion)).call(this, node));

        _this.model = new _quiz2.default();
        return _this;
    }

    _createClass(VQuestion, [{
        key: 'render',
        value: function render(state) {
            var _this2 = this;

            this.node.innerHTML = (0, _question2.default)({
                number: 1
            });

            this.model.fetch().then(function (data) {
                console.log(data);

                var quest = new _uiquestion2.default(_this2.node.querySelector('.js-info'), {});

                var answers = new _uianswer2.default(_this2.node.querySelector('.js-options'), {});

                answers.onChoice = function (val) {
                    console.log('user choice is', val);
                };
            });
        }
    }]);

    return VQuestion;
}(_view2.default);

exports.default = VQuestion;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _view = __webpack_require__(2);

var _view2 = _interopRequireDefault(_view);

var _results = __webpack_require__(14);

var _results2 = _interopRequireDefault(_results);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VResults = function (_View) {
    _inherits(VResults, _View);

    function VResults(node) {
        _classCallCheck(this, VResults);

        return _possibleConstructorReturn(this, (VResults.__proto__ || Object.getPrototypeOf(VResults)).call(this, node));
    }

    _createClass(VResults, [{
        key: 'render',
        value: function render() {
            this.node.innerHTML = (0, _results2.default)({
                result: 800
            });
        }
    }]);

    return VResults;
}(_view2.default);

exports.default = VResults;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cdiv class=\"app\"\u003E\u003Cdiv class=\"app__view js-question\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"app__view js-results\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
module.exports = template;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _question = __webpack_require__(4);

var _question2 = _interopRequireDefault(_question);

var _results = __webpack_require__(5);

var _results2 = _interopRequireDefault(_results);

var _router = __webpack_require__(3);

var _router2 = _interopRequireDefault(_router);

var _app = __webpack_require__(6);

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.addEventListener('DOMContentLoaded', function () {
    var router = new _router2.default(document.body);

    document.body.innerHTML = (0, _app2.default)();

    router.register('#question', new _question2.default(document.querySelector('.js-question')));
    router.register('#results', new _results2.default(document.querySelector('.js-results')));
    router.start();
});

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _uiblock = __webpack_require__(1);

var _uiblock2 = _interopRequireDefault(_uiblock);

var _uianswer = __webpack_require__(11);

var _uianswer2 = _interopRequireDefault(_uianswer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UIAnswer = function (_UIBlock) {
  _inherits(UIAnswer, _UIBlock);

  function UIAnswer(node) {
    _classCallCheck(this, UIAnswer);

    var _this = _possibleConstructorReturn(this, (UIAnswer.__proto__ || Object.getPrototypeOf(UIAnswer)).call(this, node));

    _this.answerText = "answer";
    _this.answerType = "checkbox";
    _this.answerName = "name";
    _this.answerChecked = "false";

    node.addEventListener('click', function (event) {
      _this.onChoice(event.target.value);
    });
    return _this;
  }

  _createClass(UIAnswer, [{
    key: 'render',
    value: function render() {
      this.node.innerHTML = (0, _uianswer2.default)({});
    }
  }, {
    key: 'start',
    value: function start() {}
  }]);

  return UIAnswer;
}(_uiblock2.default);

exports.default = UIAnswer;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _uiquestion = __webpack_require__(12);

var _uiquestion2 = _interopRequireDefault(_uiquestion);

var _uiblock = __webpack_require__(1);

var _uiblock2 = _interopRequireDefault(_uiblock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UIQuestion = function (_UIBlock) {
    _inherits(UIQuestion, _UIBlock);

    function UIQuestion(node) {
        _classCallCheck(this, UIQuestion);

        var _this = _possibleConstructorReturn(this, (UIQuestion.__proto__ || Object.getPrototypeOf(UIQuestion)).call(this, node));

        _this.questionTitle = "Question Title", _this.questionBody = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea expedita magnam libero ut autem aperiam velit minus nobis recusandae modi adipisci, voluptatem minima error deleniti ratione asperiores illum molestiae quaerat.";
        return _this;
    }

    _createClass(UIQuestion, [{
        key: 'render',
        value: function render(state) {
            this.node.innerHTML = (0, _uiquestion2.default)({});
        }
    }]);

    return UIQuestion;
}(_uiblock2.default);

exports.default = UIQuestion;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = 'https://js20170727quiz-9acd.restdb.io/rest/quiz';
var apiKey = '59c92ddf04067cfd77ad9ac4';

var Quiz = function () {
    function Quiz() {
        _classCallCheck(this, Quiz);
    }

    _createClass(Quiz, [{
        key: 'fetch',
        value: function (_fetch) {
            function fetch() {
                return _fetch.apply(this, arguments);
            }

            fetch.toString = function () {
                return _fetch.toString();
            };

            return fetch;
        }(function () {

            return fetch(URL, {
                headers: {
                    'x-apikey': apiKey
                },
                mode: 'cors'
            }).then(function (res) {
                return res.json();
            }).then(function (res) {
                res = res.map(function (item) {
                    item.data = JSON.parse(item.data);
                    return item;
                });

                return res;
            });
        })
    }]);

    return Quiz;
}();

exports.default = Quiz;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (answerChecked, answerName, answerText, answerType) {pug_html = pug_html + "\u003Clabel class=\"answer answer--checkbox\"\u003E" + (pug.escape(null == (pug_interp = answerText) ? "" : pug_interp)) + "\u003Cinput" + (pug.attr("type", `${answerType}`, true, true)+pug.attr("name", `${answerName}`, true, true)+pug.attr("checked", `${answerChecked}`, true, true)) + "\u003E\u003Cdiv class=\"answer__indicator\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Flabel\u003E";}.call(this,"answerChecked" in locals_for_with?locals_for_with.answerChecked:typeof answerChecked!=="undefined"?answerChecked:undefined,"answerName" in locals_for_with?locals_for_with.answerName:typeof answerName!=="undefined"?answerName:undefined,"answerText" in locals_for_with?locals_for_with.answerText:typeof answerText!=="undefined"?answerText:undefined,"answerType" in locals_for_with?locals_for_with.answerType:typeof answerType!=="undefined"?answerType:undefined));;return pug_html;};
module.exports = template;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (questionBody, questionTitle) {pug_html = pug_html + "\u003Csection class=\"question\"\u003E\u003Ch1 class=\"question__title\"\u003E" + (pug.escape(null == (pug_interp = questionTitle) ? "" : pug_interp)) + "\u003C\u002Fh1\u003E\u003Cp class=\"question__text\"\u003E" + (pug.escape(null == (pug_interp = questionBody) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003C\u002Fsection\u003E";}.call(this,"questionBody" in locals_for_with?locals_for_with.questionBody:typeof questionBody!=="undefined"?questionBody:undefined,"questionTitle" in locals_for_with?locals_for_with.questionTitle:typeof questionTitle!=="undefined"?questionTitle:undefined));;return pug_html;};
module.exports = template;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cdiv class=\"question\"\u003E\u003Cdiv class=\"question__info js-info\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"question__options js-options\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"question__navigate\"\u003E\u003Ca href=\"#results\"\u003EК результатам\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
module.exports = template;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (result) {pug_html = pug_html + "\u003Cdiv class=\"results\"\u003E\u003Ch2\u003EПоздравляем  вы прошли тест\u003C\u002Fh2\u003E\u003Cdiv class=\"results__count\"\u003E" + (pug.escape(null == (pug_interp = result) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003Cdiv class=\"results__navigate\"\u003E\u003Ca href=\"#question\"\u003EК вопр\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";}.call(this,"result" in locals_for_with?locals_for_with.result:typeof result!=="undefined"?result:undefined));;return pug_html;};
module.exports = template;

/***/ }),
/* 15 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map