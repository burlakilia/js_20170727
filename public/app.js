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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
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
    str = str || __webpack_require__(22).readFileSync(filename, 'utf8')
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


/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if (item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function (modules, mediaQuery) {
		if (typeof modules === "string") modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for (var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if (typeof id === "number") alreadyImportedModules[id] = true;
		}
		for (i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if (mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if (mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}

/***/ }),
/* 3 */
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
    value: function toggle(state, args) {
      this.node.hidden = !state;

      if (state) {
        this.render(args);
      }
    }
  }]);

  return View;
}();

exports.default = View;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(13);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 5 */
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
            // #hash/1/1/1/ 1 - n
            var segments = hash.match(/^([^\/]+)(.*)/i);
            var id = void 0,
                args = [];

            if (segments.length && segments[2]) {
                args = segments[2].split('/');
                args = args.filter(function (item) {
                    return !!item;
                });
            }

            id = segments[1];

            return { id: id, args: args };
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _view = __webpack_require__(3);

var _view2 = _interopRequireDefault(_view);

var _question = __webpack_require__(18);

var _question2 = _interopRequireDefault(_question);

var _uiquestion = __webpack_require__(11);

var _uiquestion2 = _interopRequireDefault(_uiquestion);

var _uianswer = __webpack_require__(10);

var _uianswer2 = _interopRequireDefault(_uianswer);

var _quiz = __webpack_require__(12);

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
        value: async function render(args) {
            var _this2 = this;

            this.node.innerHTML = (0, _question2.default)({
                number: 1
            });

            var data = await this.model.fetch();
            var testData = data[0];
            var question = testData.data[+args[1] - 1];

            var quest = new _uiquestion2.default(this.node.querySelector('.js-info'), {
                title: '\u0412\u043E\u043F\u0440\u043E\u0441 N' + args[0],
                desc: question.question
            });

            var answers = new _uianswer2.default(this.node.querySelector('.js-answers'), {
                answers: question.answers.map(function (item) {
                    return item.value;
                })
            });

            quest.render();
            answers.render();

            answers.onSubmit = function (value) {
                _this2.model.addResult(args[0], args[1], value);
                location.href = './#question/1/2';
            };
        }
    }]);

    return VQuestion;
}(_view2.default);

exports.default = VQuestion;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _view = __webpack_require__(3);

var _view2 = _interopRequireDefault(_view);

var _results = __webpack_require__(19);

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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cdiv class=\"app\"\u003E\u003Cdiv class=\"app__view js-question\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"app__view js-results\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
module.exports = template;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _question = __webpack_require__(6);

var _question2 = _interopRequireDefault(_question);

var _results = __webpack_require__(7);

var _results2 = _interopRequireDefault(_results);

var _router = __webpack_require__(5);

var _router2 = _interopRequireDefault(_router);

var _app = __webpack_require__(8);

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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _uiblock = __webpack_require__(1);

var _uiblock2 = _interopRequireDefault(_uiblock);

var _uianswer = __webpack_require__(16);

var _uianswer2 = _interopRequireDefault(_uianswer);

__webpack_require__(20);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UIAnswer = function (_UIBlock) {
    _inherits(UIAnswer, _UIBlock);

    function UIAnswer(node, data) {
        _classCallCheck(this, UIAnswer);

        var _this = _possibleConstructorReturn(this, (UIAnswer.__proto__ || Object.getPrototypeOf(UIAnswer)).call(this, node));

        _this.data = data;
        return _this;
    }

    _createClass(UIAnswer, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            this.node.innerHTML = (0, _uianswer2.default)(this.data);
            var form = document.querySelector('form');

            form.addEventListener('submit', function (event) {
                event.preventDefault();
                _this2.onSubmit(form.elements.test.value);
            });
        }
    }, {
        key: 'onSubmit',
        value: function onSubmit(value) {}
    }]);

    return UIAnswer;
}(_uiblock2.default);

exports.default = UIAnswer;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _uiquestion = __webpack_require__(17);

var _uiquestion2 = _interopRequireDefault(_uiquestion);

var _uiblock = __webpack_require__(1);

var _uiblock2 = _interopRequireDefault(_uiblock);

__webpack_require__(21);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UIQuestion = function (_UIBlock) {
    _inherits(UIQuestion, _UIBlock);

    /**
     * @param {Element} node
     * @param {Object} data
     * @param {string} data.title - заголовок
     * @param {string} data.desc - описание вопроса
     */
    function UIQuestion(node, data) {
        _classCallCheck(this, UIQuestion);

        var _this = _possibleConstructorReturn(this, (UIQuestion.__proto__ || Object.getPrototypeOf(UIQuestion)).call(this, node));

        _this.data = data;
        return _this;
    }

    _createClass(UIQuestion, [{
        key: 'render',
        value: function render(state) {
            this.node.innerHTML = (0, _uiquestion2.default)(this.data);
        }
    }]);

    return UIQuestion;
}(_uiblock2.default);

exports.default = UIQuestion;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URL = 'https://js20170727quiz-9acd.restdb.io/rest/quiz';
var apiKey = '59c92ddf04067cfd77ad9ac4';

var Quiz = function () {
    function Quiz() {
        _classCallCheck(this, Quiz);

        this.results = {};
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
    }, {
        key: 'addResult',
        value: function addResult(testId, questionId, variant) {
            this.results[testId] = _defineProperty({}, questionId, variant);

            console.log('addresult', this.results);
        }
    }]);

    return Quiz;
}();

exports.default = Quiz;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
	// get current location
	var location = typeof window !== "undefined" && window.location;

	if (!location) {
		throw new Error("fixUrls requires window.location");
	}

	// blank or null?
	if (!css || typeof css !== "string") {
		return css;
	}

	var baseUrl = location.protocol + "//" + location.host;
	var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
 This regular expression is just a way to recursively match brackets within
 a string.
 	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
    (  = Start a capturing group
      (?:  = Start a non-capturing group
          [^)(]  = Match anything that isn't a parentheses
          |  = OR
          \(  = Match a start parentheses
              (?:  = Start another non-capturing groups
                  [^)(]+  = Match anything that isn't a parentheses
                  |  = OR
                  \(  = Match a start parentheses
                      [^)(]*  = Match anything that isn't a parentheses
                  \)  = Match a end parentheses
              )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
  \)  = Match a close parens
 	 /gi  = Get all matches, not the first.  Be case insensitive.
  */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl.trim().replace(/^"(.*)"$/, function (o, $1) {
			return $1;
		}).replace(/^'(.*)'$/, function (o, $1) {
			return $1;
		});

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
			return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
			//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(true);
// imports


// module
exports.push([module.i, "/* code from here https://codepen.io/KenanYusuf/pen/PZKEKd */\n.answer {\n  display: block;\n  position: relative;\n  padding-left: 35px;\n  padding-top: 3px;\n  padding-bottom: 3px;\n  padding-right: 5px;\n  margin-bottom: 15px;\n  cursor: pointer;\n  font-size: 18px;\n  border-radius: 3px;\n  /* change label background if answer correct */\n  /* styles for custom checkbox */ }\n  .answer[data-correct=\"true\"] {\n    background-color: lightgreen; }\n  .answer[data-correct=\"false\"] {\n    background-color: salmon; }\n  .answer__indicator {\n    position: absolute;\n    top: 5px;\n    left: 5px;\n    height: 20px;\n    width: 20px;\n    background: #e6e6e6;\n    border-radius: 2px;\n    /* define common styles foa all types of custom marks */ }\n    .answer__indicator:after {\n      content: '';\n      position: absolute;\n      display: none; }\n\n/* hide real input */\n.answer input {\n  position: absolute;\n  z-index: -1;\n  opacity: 0; }\n\n/* define round base of radiobuttons */\n.answer--radio .answer__indicator {\n  border-radius: 50%; }\n\n/* draw a mark for checkbox */\n.answer--checkbox .answer__indicator:after {\n  left: 8px;\n  top: 4px;\n  width: 3px;\n  height: 8px;\n  border: solid #fff;\n  border-width: 0 2px 2px 0;\n  transform: rotate(45deg); }\n\n/* draw custom mark for radiobutton */\n.answer--radio .answer__indicator:after {\n  left: 7px;\n  top: 7px;\n  height: 6px;\n  width: 6px;\n  border-radius: 50%;\n  background: #fff; }\n\n/* show mark when checkbox checked  */\n.answer input:checked ~ .answer__indicator:after {\n  display: block; }\n\n/* change background in checkbox */\n.answer input:checked ~ .answer__indicator {\n  background: #2aa1c0; }\n\n/* highlight focus */\n.answer:hover input ~ .answer__indicator,\n.answer input:focus ~ .answer__indicator {\n  background: #ccc; }\n\n.answer:hover input:not([disabled]):checked ~ .answer__indicator,\n.answer input:checked:focus ~ .answer__indicator {\n  background: #0e647d; }\n\n/* style for disabled checkbox */\n.answer input:disabled ~ .answer__indicator {\n  background: #e6e6e6;\n  opacity: 0.6;\n  pointer-events: none; }\n\n.answer--checkbox input:disabled ~ .answer__indicator:after {\n  border-color: #7b7b7b; }\n\n/* make mark darker in disabled radiobtn */\n.answer--radio input:disabled ~ .answer__indicator:after {\n  background: #7b7b7b; }\n", "", {"version":3,"sources":["/Users/burlak/projects/js_20170727/blocks/uianswer/uianswer.scss"],"names":[],"mappings":"AAAA,6DAA6D;AAC7D;EACE,eAAe;EACf,mBAAmB;EACnB,mBAAmB;EACnB,iBAAiB;EACjB,oBAAoB;EACpB,mBAAmB;EACnB,oBAAoB;EACpB,gBAAgB;EAChB,gBAAgB;EAChB,mBAAmB;EACnB,+CAA+C;EAC/C,gCAAgC,EAAE;EAClC;IACE,6BAA6B,EAAE;EACjC;IACE,yBAAyB,EAAE;EAC7B;IACE,mBAAmB;IACnB,SAAS;IACT,UAAU;IACV,aAAa;IACb,YAAY;IACZ,oBAAoB;IACpB,mBAAmB;IACnB,wDAAwD,EAAE;IAC1D;MACE,YAAY;MACZ,mBAAmB;MACnB,cAAc,EAAE;;AAEtB,qBAAqB;AACrB;EACE,mBAAmB;EACnB,YAAY;EACZ,WAAW,EAAE;;AAEf,uCAAuC;AACvC;EACE,mBAAmB,EAAE;;AAEvB,8BAA8B;AAC9B;EACE,UAAU;EACV,SAAS;EACT,WAAW;EACX,YAAY;EACZ,mBAAmB;EACnB,0BAA0B;EAC1B,yBAAyB,EAAE;;AAE7B,sCAAsC;AACtC;EACE,UAAU;EACV,SAAS;EACT,YAAY;EACZ,WAAW;EACX,mBAAmB;EACnB,iBAAiB,EAAE;;AAErB,sCAAsC;AACtC;EACE,eAAe,EAAE;;AAEnB,mCAAmC;AACnC;EACE,oBAAoB,EAAE;;AAExB,qBAAqB;AACrB;;EAEE,iBAAiB,EAAE;;AAErB;;EAEE,oBAAoB,EAAE;;AAExB,iCAAiC;AACjC;EACE,oBAAoB;EACpB,aAAa;EACb,qBAAqB,EAAE;;AAEzB;EACE,sBAAsB,EAAE;;AAE1B,2CAA2C;AAC3C;EACE,oBAAoB,EAAE","file":"uianswer.scss","sourcesContent":["/* code from here https://codepen.io/KenanYusuf/pen/PZKEKd */\n.answer {\n  display: block;\n  position: relative;\n  padding-left: 35px;\n  padding-top: 3px;\n  padding-bottom: 3px;\n  padding-right: 5px;\n  margin-bottom: 15px;\n  cursor: pointer;\n  font-size: 18px;\n  border-radius: 3px;\n  /* change label background if answer correct */\n  /* styles for custom checkbox */ }\n  .answer[data-correct=\"true\"] {\n    background-color: lightgreen; }\n  .answer[data-correct=\"false\"] {\n    background-color: salmon; }\n  .answer__indicator {\n    position: absolute;\n    top: 5px;\n    left: 5px;\n    height: 20px;\n    width: 20px;\n    background: #e6e6e6;\n    border-radius: 2px;\n    /* define common styles foa all types of custom marks */ }\n    .answer__indicator:after {\n      content: '';\n      position: absolute;\n      display: none; }\n\n/* hide real input */\n.answer input {\n  position: absolute;\n  z-index: -1;\n  opacity: 0; }\n\n/* define round base of radiobuttons */\n.answer--radio .answer__indicator {\n  border-radius: 50%; }\n\n/* draw a mark for checkbox */\n.answer--checkbox .answer__indicator:after {\n  left: 8px;\n  top: 4px;\n  width: 3px;\n  height: 8px;\n  border: solid #fff;\n  border-width: 0 2px 2px 0;\n  transform: rotate(45deg); }\n\n/* draw custom mark for radiobutton */\n.answer--radio .answer__indicator:after {\n  left: 7px;\n  top: 7px;\n  height: 6px;\n  width: 6px;\n  border-radius: 50%;\n  background: #fff; }\n\n/* show mark when checkbox checked  */\n.answer input:checked ~ .answer__indicator:after {\n  display: block; }\n\n/* change background in checkbox */\n.answer input:checked ~ .answer__indicator {\n  background: #2aa1c0; }\n\n/* highlight focus */\n.answer:hover input ~ .answer__indicator,\n.answer input:focus ~ .answer__indicator {\n  background: #ccc; }\n\n.answer:hover input:not([disabled]):checked ~ .answer__indicator,\n.answer input:checked:focus ~ .answer__indicator {\n  background: #0e647d; }\n\n/* style for disabled checkbox */\n.answer input:disabled ~ .answer__indicator {\n  background: #e6e6e6;\n  opacity: 0.6;\n  pointer-events: none; }\n\n.answer--checkbox input:disabled ~ .answer__indicator:after {\n  border-color: #7b7b7b; }\n\n/* make mark darker in disabled radiobtn */\n.answer--radio input:disabled ~ .answer__indicator:after {\n  background: #7b7b7b; }\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(true);
// imports


// module
exports.push([module.i, ".question {\n  display: block;\n  vertical-align: top;\n  background: #fff;\n  text-align: left;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);\n  padding: 30px;\n  max-width: 300px;\n  border-radius: 5px;\n  margin: 10px; }\n  .question__title {\n    font-weight: 500;\n    margin-top: 0; }\n  .question__text::after {\n    display: block;\n    content: '';\n    margin-top: 16px;\n    border-bottom: 1px solid lightgrey; }\n", "", {"version":3,"sources":["/Users/burlak/projects/js_20170727/blocks/uiquestion/uiquestion.scss"],"names":[],"mappings":"AAAA;EACE,eAAe;EACf,oBAAoB;EACpB,iBAAiB;EACjB,iBAAiB;EACjB,yCAAyC;EACzC,cAAc;EACd,iBAAiB;EACjB,mBAAmB;EACnB,aAAa,EAAE;EACf;IACE,iBAAiB;IACjB,cAAc,EAAE;EAClB;IACE,eAAe;IACf,YAAY;IACZ,iBAAiB;IACjB,mCAAmC,EAAE","file":"uiquestion.scss","sourcesContent":[".question {\n  display: block;\n  vertical-align: top;\n  background: #fff;\n  text-align: left;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);\n  padding: 30px;\n  max-width: 300px;\n  border-radius: 5px;\n  margin: 10px; }\n  .question__title {\n    font-weight: 500;\n    margin-top: 0; }\n  .question__text::after {\n    display: block;\n    content: '';\n    margin-top: 16px;\n    border-bottom: 1px solid lightgrey; }\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (answers, submit) {pug_html = pug_html + "\u003Cform class=\"js-form\"\u003E\u003Cul\u003E";
// iterate answers
;(function(){
  var $$obj = answers;
  if ('number' == typeof $$obj.length) {
      for (var index = 0, $$l = $$obj.length; index < $$l; index++) {
        var val = $$obj[index];
pug_html = pug_html + "\u003Clabel class=\"answer answer--checkbox\"\u003E" + (pug.escape(null == (pug_interp = val) ? "" : pug_interp)) + "\u003Cinput" + (" type=\"radio\" name=\"test\""+pug.attr("value", `${index}`, true, true)) + "\u003E\u003Cdiv class=\"answer__indicator\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Flabel\u003E";
      }
  } else {
    var $$l = 0;
    for (var index in $$obj) {
      $$l++;
      var val = $$obj[index];
pug_html = pug_html + "\u003Clabel class=\"answer answer--checkbox\"\u003E" + (pug.escape(null == (pug_interp = val) ? "" : pug_interp)) + "\u003Cinput" + (" type=\"radio\" name=\"test\""+pug.attr("value", `${index}`, true, true)) + "\u003E\u003Cdiv class=\"answer__indicator\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Flabel\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ful\u003E\u003Cbutton" + (pug.attr("type", submit, true, true)) + "\u003EОтветить\u003C\u002Fbutton\u003E\u003C\u002Fform\u003E";}.call(this,"answers" in locals_for_with?locals_for_with.answers:typeof answers!=="undefined"?answers:undefined,"submit" in locals_for_with?locals_for_with.submit:typeof submit!=="undefined"?submit:undefined));;return pug_html;};
module.exports = template;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (desc, title) {pug_html = pug_html + "\u003Csection class=\"question\"\u003E\u003Ch1 class=\"question__title\"\u003E" + (pug.escape(null == (pug_interp = title) ? "" : pug_interp)) + "\u003C\u002Fh1\u003E\u003Cp class=\"question__text\"\u003E" + (pug.escape(null == (pug_interp = desc) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003C\u002Fsection\u003E";}.call(this,"desc" in locals_for_with?locals_for_with.desc:typeof desc!=="undefined"?desc:undefined,"title" in locals_for_with?locals_for_with.title:typeof title!=="undefined"?title:undefined));;return pug_html;};
module.exports = template;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cdiv class=\"question\"\u003EВопрос на засыпку\u003Cdiv class=\"question__info js-info\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"question__options js-answers\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"question__navigate\"\u003E\u003Ca href=\"#results\"\u003EК результатам\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
module.exports = template;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (result) {pug_html = pug_html + "\u003Cdiv class=\"results\"\u003E\u003Ch2\u003EПоздравляем  вы прошли тест\u003C\u002Fh2\u003E\u003Cdiv class=\"results__count\"\u003E" + (pug.escape(null == (pug_interp = result) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003Cdiv class=\"results__navigate\"\u003E\u003Ca href=\"#question\"\u003EК вопр\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";}.call(this,"result" in locals_for_with?locals_for_with.result:typeof result!=="undefined"?result:undefined));;return pug_html;};
module.exports = template;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(14);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(4)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js??ref--2-1!../../node_modules/sass-loader/lib/loader.js!./uianswer.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js??ref--2-1!../../node_modules/sass-loader/lib/loader.js!./uianswer.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(15);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(4)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js??ref--2-1!../../node_modules/sass-loader/lib/loader.js!./uiquestion.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js??ref--2-1!../../node_modules/sass-loader/lib/loader.js!./uiquestion.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 22 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map