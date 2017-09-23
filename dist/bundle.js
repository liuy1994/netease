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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
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
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
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
/* 1 */
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

var	fixUrls = __webpack_require__(6);

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
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__index_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__reset_css__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__reset_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__reset_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__style_css__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__playing_css__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__playing_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__playing_css__);






/***/ }),
/* 3 */
/***/ (function(module, exports) {

//tab组件
$('ol#tabs').on('click', 'li', function (e) {
  let $li = $(e.currentTarget)
  $li.addClass('active').siblings().removeClass('active')
  let index = $li.index()
  $('#tabs-content').children().eq(index).addClass('active').siblings().removeClass('active')
})

//删除单条搜索记录
$('.search-history').on('click', '.icon-delete', function (e) {
  $(e.currentTarget).parent().remove()
})

//点击清空搜索
$('#icon-empty').on('click', function (e) {
  $('#search')[0].value = ''
  noinput()
})

//点击热门搜索
$('#search-hot').on('click', 'li', function (e) {
  $('#search')[0].value = e.currentTarget.innerText
  input()
})

//搜索框输入
var timer = null
$('#search').on('input', function (e) {
  if (timer) {
    window.clearTimeout(timer)
  } else {
  }
  timer = setTimeout(function () {
    var value = $(e.currentTarget).val().trim()
    input()
    if (value === '') {
      noinput()
    }
    setTimeout(function () {
      if ($('#search-result')[0].innerHTML === '') {
        var h6 = `<h6>没有结果<h6>`
        $('#search-result').append(h6)
      } else {
      }
    }, 200)
  }, 300)
})

//点击搜索历史
$('#search-history li').on('click', 'div', function (e) {
  $('#search')[0].value = e.currentTarget.innerText
  input()
})


// input没有内容
function noinput() {
  $($('#note')[0]).removeClass('hiden')
  $($('.search-hot')[0]).removeClass('hiden')
  $($('#history-item')[0]).removeClass('hiden')
  $($('#search-content')[0]).addClass('hiden')
  $($('#icon-empty')[0]).addClass('hiden')
  $($('#search-result')[0]).addClass('hiden')
}

// input有内容
function input() {
  $($('#note')[0]).addClass('hiden')
  $($('.search-hot')[0]).addClass('hiden')
  $($('#history-item')[0]).addClass('hiden')
  $($('#search-content')[0]).removeClass('hiden')
  $($('#icon-empty')[0]).removeClass('hiden')
  $($('#search-result')[0]).removeClass('hiden')
  var value = $($('#search')[0]).val().trim()
  $($('#search-content')[0]).empty()
  var p = `
    <p>搜索“${value}”</p>
    <h5>搜索结果</h5>
    `
  $($('#search-content')[0]).append(p)
  search(value)
}





//搜索歌手
function search(value) {
  $($('#search-result')[0]).empty()
  if (value === '') {
  } else {
    var query1 = new AV.Query('Song')
    query1.contains('author', value)
    var query2 = new AV.Query('Song')
    query2.contains('name', value)
    var query = AV.Query.or(query1, query2)
    query.find().then(function (result) {
      for (var i = 0; i < result.length; i++) {
        var song = result[i].attributes
        var a = `
                <a href="./playing.html?${result[i].id}" data-id="${result[i].id}">
                <div class="a">
                    <div class="name">
                        <p>${song.name}</p>
                    </div>
                    <div class="author sq">${song.author} - ${song.album}</div>
                    <div class="icon-play"></div>
                </div>
            </a>
                `
        $('#search-result').append(a)
      }
    })
  }
}











//查找ID
var a = $('.list a')
var i = 0
for (i = 0; i < a.length; i++) {
  var regex = /([A-Z].*|[\u4e00-\u9fa5].*)/
  var matches = a[i].innerText.match(regex)[0]
  var name = matches.split('(')[0].trim()
  addId(name)
}


//把id添加到关键字
function addId(name) {
  var j = i
  var query = new AV.Query('Song')
  query.contains('name', name)
  query.find().then(function (results) {
    var result = results[0]
    var id = result.id
    a[j].setAttribute('href', './playing.html?' + id)
  })
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(5);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/autoprefixer-loader/index.js!./reset.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/autoprefixer-loader/index.js!./reset.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "*{margin:0;padding:0;box-sizing:border-box}ol,ul{list-style:none}:after,:before{box-sizing:border-box}a{color:inherit;text-decoration:none}body{font-family:Helvetica,sans-serif}h1,h2,h3,h4,h5,h6{font-weight:400}", ""]);

// exports


/***/ }),
/* 6 */
/***/ (function(module, exports) {


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
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(8);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/autoprefixer-loader/index.js!./style.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/autoprefixer-loader/index.js!./style.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, ".hiden{display:none}.topbar{background:#d43c33;height:64px;width:100vw;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-ms-flex-align:center;align-items:center;position:fixed;top:0;z-index:100}.topbar .logo svg{width:142px;height:25px;margin-left:10px;margin-top:5px}.topbar .download a{color:#fff;font-size:15px;margin-right:10px;padding:0 10px;display:inline-block;line-height:30px;position:relative}.topbar .download a:after{content:\"\";width:200%;height:200%;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scale(.5);transform:scale(.5);border:1px solid #fff;position:absolute;top:0;left:0;border-radius:50px}.tabs .tabs-control{border-bottom:1px solid #d9d9d9;height:40px;width:100vw;position:fixed;z-index:100;top:64px;background:#fff}.tabs .tabs-control,.tabs .tabs-control li{display:-webkit-box;display:-ms-flexbox;display:flex}.tabs .tabs-control li{font-size:15px;width:33.333333%;line-height:35px;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;position:relative}.tabs .tabs-control li .text{padding:3px 5px 0;position:relative}.tabs .tabs-control li.active{color:#d43c33}.tabs .tabs-control li.active .text:after{content:\"\";width:100%;height:2px;background:#d33a31;position:absolute;z-index:5;bottom:-1px;left:0}.tabs .tabs-content{margin-top:125px;position:relative}.tabs .tabs-content .recommend{display:none}.tabs .tabs-content .recommend.active{display:block}.tabs .tabs-content .hot{display:none}.tabs .tabs-content .hot.active{display:block}.tabs .tabs-content .search{display:none}.tabs .tabs-content .search.active{display:block}.tabs .tabs-content .recommend{margin-top:20px}.tabs .tabs-content .recommend h3{font-size:17px;line-height:20px;padding-left:9px;margin-bottom:14px;position:relative}.tabs .tabs-content .recommend h3:after{content:\"\";position:absolute;width:2px;height:16px;top:1px;left:0;background:#d43c33}.tabs .tabs-content .recommend .album{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-ms-flex-wrap:wrap;flex-wrap:wrap;margin-bottom:24px}.tabs .tabs-content .recommend .album .images{width:32.8vw;padding-bottom:16px;position:relative}.tabs .tabs-content .recommend .album .images:after{content:\"123\\4E07\";position:absolute;top:0;right:0;padding-left:13px;z-index:5;font-size:12px;line-height:10px;margin:6px 5px;color:#fff;background:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMiAyMCI+PGcgb3BhY2l0eT0iLjE1Ij48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGZpbGw9IiMwNDAwMDAiIGQ9Im0yMiAxNi43NzdjMCAxLjIzMy0xLjEyMSAyLjIzMy0yLjUwNiAyLjIzMy0xLjM4NCAwLTIuNTA2LTEtMi41MDYtMi4yMzN2LTIuNTUzYzAtMS4yMzQgMS4xMjItMi4yMzMgMi41MDYtMi4yMzMuMTc0IDAgLjM0My4wMTcuNTA2LjA0NnYtMS4zN2gtLjAzM2MuMDE3LS4yMi4wMzMtLjQ0MS4wMzMtLjY2NiAwLTQuNDE4LTMuNTgyLTgtOC04LTQuNDE4IDAtOCAzLjU4Mi04IDggMCAuMjI1LjAxNi40NDYuMDM0LjY2NmgtLjAzNHYxLjM3Yy4xNjMtLjAyOS4zMzMtLjA0Ni41MDUtLjA0NiAxLjM4NCAwIDIuNTA2Ljk5OSAyLjUwNiAyLjIzM3YyLjU1M2MwIDEuMjMzLTEuMTIyIDIuMjMzLTIuNTA2IDIuMjMzcy0yLjUwNS0uOTk5LTIuNTA1LTIuMjMzdi0yLjU1M2MwLS4yNTguMDU5LS41MDEuMTQ4LS43My0uMDg1LS4xNDgtLjE0OC0uMzEtLjE0OC0uNDkzdi0yLjY2N2MwLS4wMjMuMDEyLS4wNDMuMDEzLS4wNjctLjAwNC0uMDg4LS4wMTMtLjE3Ni0uMDEzLS4yNjYgMC01LjUyMyA0LjQ3Ny0xMCAxMC0xMCA1LjUyMyAwIDEwIDQuNDc3IDEwIDEwIDAgLjA5LS4wMDkuMTc4LS4wMTQuMjY2LjAwMi4wMjQuMDE0LjA0NC4wMTQuMDY3djJjMCAuMzA2LS4xNDUuNTY5LS4zNi43NTMuMjI0LjMzNC4zNi43Mi4zNiAxLjEzOHYyLjU1MiIvPjwvZz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGZpbGw9IiNmZmYiIGQ9Im0yMCAxNi43NzdjMCAxLjIzMy0xLjEyMSAyLjIzMy0yLjUwNiAyLjIzMy0xLjM4NCAwLTIuNTA2LTEtMi41MDYtMi4yMzN2LTIuNTUzYzAtMS4yMzQgMS4xMjItMi4yMzMgMi41MDYtMi4yMzMuMTc0IDAgLjM0My4wMTcuNTA2LjA0NnYtMS4zN2gtLjAzM2MuMDE3LS4yMi4wMzMtLjQ0MS4wMzMtLjY2NiAwLTQuNDE4LTMuNTgyLTgtOC04LTQuNDE4IDAtOCAzLjU4Mi04IDggMCAuMjI1LjAxNi40NDYuMDM0LjY2NmgtLjAzNHYxLjM3Yy4xNjMtLjAyOS4zMzMtLjA0Ni41MDUtLjA0NiAxLjM4NCAwIDIuNTA2Ljk5OSAyLjUwNiAyLjIzM3YyLjU1M2MwIDEuMjMzLTEuMTIyIDIuMjMzLTIuNTA2IDIuMjMzcy0yLjUwNS0uOTk5LTIuNTA1LTIuMjMzdi0yLjU1M2MwLS4yNTguMDU5LS41MDEuMTQ4LS43My0uMDg1LS4xNDgtLjE0OC0uMzEtLjE0OC0uNDkzdi0yLjY2N2MwLS4wMjMuMDEyLS4wNDMuMDEzLS4wNjctLjAwNC0uMDg4LS4wMTMtLjE3Ni0uMDEzLS4yNjYgMC01LjUyMyA0LjQ3Ny0xMCAxMC0xMCA1LjUyMyAwIDEwIDQuNDc3IDEwIDEwIDAgLjA5LS4wMDkuMTc4LS4wMTQuMjY2LjAwMi4wMjQuMDE0LjA0NC4wMTQuMDY3djJjMCAuMzA2LS4xNDUuNTY5LS4zNi43NTMuMjI0LjMzNC4zNi43Mi4zNiAxLjEzOHYyLjU1MiIvPjwvc3ZnPg==) no-repeat 0 0}.tabs .tabs-content .recommend .album .images img{width:32.8vw;vertical-align:top;position:relative}.tabs .tabs-content .recommend .album .images p{font-size:13px;line-height:1.2;padding:6px 2px 0 6px;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden}.tabs .tabs-content .recommend .last-list .name p{font-size:17px;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1;overflow:hidden;position:relative}.tabs .tabs-content .recommend .last-list{margin-left:10px;position:relative}.tabs .tabs-content .recommend .last-list .a{width:100%;position:relative;padding:6px 0}.tabs .tabs-content .recommend .last-list .a:after{content:\"\";height:1px;width:100%;background:rgba(0,0,0,.1);position:absolute;bottom:0;left:0}.tabs .tabs-content .recommend .last-list .name{width:86.133333vw;height:25px;padding-top:3px}.tabs .tabs-content .recommend .last-list .name p span{color:#888}.tabs .tabs-content .recommend .last-list .author{font-size:12px;color:#888;width:86.133333vw;height:18px;padding-top:2px;position:relative;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1}.tabs .tabs-content .recommend .last-list .author.sq{padding-left:16px}.tabs .tabs-content .recommend .last-list .author.sq:after{content:\"\";width:12px;height:8px;position:absolute;left:0;top:5px;background:url(http://ovmr7ndid.bkt.clouddn.com/icon1.png);background-size:166px 97px}.tabs .tabs-content .recommend .last-list .icon-play{width:22px;height:22px;position:absolute;top:16px;right:10px;background:url(http://ovmr7ndid.bkt.clouddn.com/icon1.png) no-repeat -24px 0;background-size:166px 97px}.tabs .tabs-content .recommend .art{margin-top:4px;height:200px;padding-top:63px;background:url(http://ovmr7ndid.bkt.clouddn.com/bg1.png);background-size:372px 203px}.tabs .tabs-content .recommend .art .logo{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;margin-bottom:15px}.tabs .tabs-content .recommend .art .logo .logosvg{height:44px}.tabs .tabs-content .recommend .art .download{border:1px solid #d33a31;border-radius:20px;color:#d33a31;width:301px;height:40px;font-size:16px;margin:5px auto;line-height:38px;text-align:center}.tabs .tabs-content .recommend .art .remark{color:#888;font-size:12px;-webkit-transform:scale(.75);transform:scale(.75);line-height:16px;text-align:center}.tabs .tabs-content .hot{margin-top:-20px;position:relative;width:100vw}.tabs .tabs-content .hot .hotbar{padding-left:19px;width:100%;height:146px;background:url(http://ovmr7ndid.bkt.clouddn.com/bg2.jpg) no-repeat 0 0;background-size:100% 146px;position:relative;display:-webkit-box;display:-ms-flexbox;display:flex}.tabs .tabs-content .hot .hotbar:after{content:\"\";background-color:rgba(0,0,0,.2);width:100%;height:100%;position:absolute;z-index:1;top:0;right:0;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.tabs .tabs-content .hot .hotbar .hot-logo{width:142px;height:67px;z-index:5;position:absolute;top:25px;background:url(//s3.music.126.net/m/s/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880) no-repeat -23px -30px;background-size:166px 97px}.tabs .tabs-content .hot .hotbar .date{z-index:5;color:hsla(0,0%,100%,.8);font-size:12px;-webkit-transform:scale(.9);transform:scale(.9);position:absolute;bottom:29px;left:15px}.tabs .tabs-content .hot .hot-list{position:absolute;top:145px;left:2.666667vw;width:97.333333vw}.tabs .tabs-content .hot .hot-list a{display:-webkit-box;display:-ms-flexbox;display:flex}.tabs .tabs-content .hot .hot-list .number{font-size:17px;color:#999;height:55px;padding-top:19px;padding-right:10px}.tabs .tabs-content .hot .hot-list .number.top{color:#df3436}.tabs .tabs-content .hot .hot-list .a{position:relative;width:100%}.tabs .tabs-content .hot .hot-list .a:after{content:\"\";height:1px;width:100%;background:rgba(0,0,0,.1);position:absolute;bottom:0;left:0}.tabs .tabs-content .hot .hot-list .a .name{font-size:17px;margin-top:10px;margin-left:-1px;margin-bottom:4px;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1;overflow:hidden;width:80vw}.tabs .tabs-content .hot .hot-list .a .name span{color:#888}.tabs .tabs-content .hot .hot-list .a .author{font-size:12px;width:80vw;color:#888;position:relative;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1;overflow:hidden;left:-1px}.tabs .tabs-content .hot .hot-list .a .author.sq{padding-left:16px}.tabs .tabs-content .hot .hot-list .a .author.sq:after{content:\"\";width:12px;height:8px;position:absolute;left:0;top:3px;background:url(http://ovmr7ndid.bkt.clouddn.com/icon1.png);background-size:166px 97px}.tabs .tabs-content .hot .hot-list .a .icon-play{width:22px;height:22px;background:url(//s3.music.126.net/m/s/img/index_icon_2x.png?5207a28…) -24px 0;background-size:166px 97px;position:absolute;top:17px;right:9px}.tabs .tabs-content .hot .loadMore{position:absolute;top:1246px;left:-1px;line-height:55px;width:100vw;font-size:14px;text-align:center;color:#999}.tabs .tabs-content .search{position:absolute;top:-15px;left:0;width:100vw}.tabs .tabs-content .search .search-bar{position:relative;width:calc(100% - 20px);height:30px;margin:10px;background:#ebecec;border-radius:30px;display:-webkit-box;display:-ms-flexbox;display:flex}.tabs .tabs-content .search .search-bar .note{position:absolute;top:7px;left:30px;font-size:14px;color:#c9c9c9;background:transparent;z-index:5}.tabs .tabs-content .search .search-bar .note.hiden{display:none}.tabs .tabs-content .search .search-bar input{height:30px;width:295px;border:0;background:transparent;font-size:14px;z-index:10}.tabs .tabs-content .search .search-bar input:focus{outline:none}.tabs .tabs-content .search .search-bar .icon-search{height:30px;width:30px;background:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxLDIzLjUzNWwtMS40MTQsMS40MTRsLTcuMzE1LTcuMzE0CgkJQzE0LjcwOSwxOS4xMDcsMTIuNDYsMjAsMTAsMjBDNC40NzcsMjAsMCwxNS41MjMsMCwxMEMwLDQuNDc3LDQuNDc3LDAsMTAsMGM1LjUyMywwLDEwLDQuNDc3LDEwLDEwYzAsMi4zNDItMC44MTEsNC40OS0yLjE2LDYuMTk1CgkJTDI1LjE4MSwyMy41MzV6IE0xMCwyYy00LjQxOCwwLTgsMy41ODItOCw4czMuNTgyLDgsOCw4YzQuNDE4LDAsOC0zLjU4Miw4LThTMTQuNDE4LDIsMTAsMnoiLz48L3N2Zz4=) no-repeat 8px 9px;background-size:13px 13px}.tabs .tabs-content .search .search-bar .icon-empty{display:block;height:30px;width:30px;background:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyOCAyOCI+PGcgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBmaWxsPSIjYmNiZGJkIiBkPSJNMTQsMGM3LjczMiwwLDE0LDYuMjY4LDE0LDE0YzAsNy43MzItNi4yNjgsMTQtMTQsMTQKCVMwLDIxLjczMiwwLDE0QzAsNi4yNjgsNi4yNjgsMCwxNCwweiIvPjxnIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ViZWNlYiIgc3Ryb2tlLXdpZHRoPSIyLjUiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCI+PHBhdGggZD0ibTE5IDlsLTEwIDEwIi8+PHBhdGggZD0ibTkgOWwxMCAxMCIvPjwvZz48L2c+PC9zdmc+) no-repeat 7px 7px;background-size:14px 14px;position:absolute;top:1px;right:-1px}.tabs .tabs-content .search .search-bar .icon-empty.hiden{display:none}.tabs .tabs-content .search .search-bar .input:focus:valid+.icon-empty{display:block}.tabs .tabs-content .search .segment{height:1px;width:200%;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scale(.5);transform:scale(.5);background:rgba(0,0,0,.1);margin-top:15px;margin-bottom:13px}.tabs .tabs-content .search h5{font-size:12px;color:#666;padding:0 10px}.tabs .tabs-content .search .search-hot ul.list{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;padding:10px}.tabs .tabs-content .search .search-hot ul.list li{display:inline-block;height:32px;margin-right:8px;margin-bottom:7px;padding:0 13px;font-size:14px;line-height:32px;color:#333;border:1px solid hsla(231,9%,84%,.7);border-radius:32px}.tabs .tabs-content .search .search-result .name p{font-size:17px;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1;overflow:hidden;position:relative}.tabs .tabs-content .search .search-result{margin-left:10px;position:relative;padding-top:10px}.tabs .tabs-content .search .search-result h5{margin-left:-10px}.tabs .tabs-content .search .search-result .a{width:100%;position:relative;padding:6px 0}.tabs .tabs-content .search .search-result .a:after{content:\"\";height:1px;width:100%;background:rgba(0,0,0,.1);position:absolute;bottom:0;left:0}.tabs .tabs-content .search .search-result .name{width:86.133333vw;height:25px;padding-top:3px}.tabs .tabs-content .search .search-result .name p span{color:#888}.tabs .tabs-content .search .search-result .author{font-size:12px;color:#888;width:86.133333vw;height:18px;padding-top:2px;position:relative;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1}.tabs .tabs-content .search .search-result .author.sq{padding-left:16px}.tabs .tabs-content .search .search-result .author.sq:after{content:\"\";width:12px;height:8px;position:absolute;left:0;top:5px;background:url(http://ovmr7ndid.bkt.clouddn.com/icon1.png);background-size:166px 97px}.tabs .tabs-content .search .search-result .icon-play{width:22px;height:22px;position:absolute;top:16px;right:10px;background:url(http://ovmr7ndid.bkt.clouddn.com/icon1.png) no-repeat -24px 0;background-size:166px 97px}.tabs .tabs-content .search .search-result h6{line-height:35px;font-size:16px;padding-top:10px}.tabs .tabs-content .search .search-result h6:after{content:\"\";height:1px;width:100%;background:rgba(0,0,0,.1);position:absolute;bottom:0;left:0}.tabs .tabs-content .search .search-content{width:94.666667vw;height:40px;margin:0 auto;margin-bottom:10px;margin-top:-3px;border-bottom:1px solid rgba(0,0,0,.1);padding-top:5px;position:relative}.tabs .tabs-content .search .search-content p{color:#507daf;font-size:15px}.tabs .tabs-content .search .search-content h5{margin-left:-10px;margin-top:20px}.tabs .tabs-content .search .search-history{width:100vw;height:45px}.tabs .tabs-content .search .search-history li{display:-webkit-box;display:-ms-flexbox;display:flex;position:relative}.tabs .tabs-content .search .search-history .icon-history{width:15px;height:15px;margin:10px;margin-top:15px;background:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMCAzMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljYWNhIiBkPSJtMTUgMzBjLTguMjg0IDAtMTUtNi43MTYtMTUtMTVzNi43MTYtMTUgMTUtMTUgMTUgNi43MTYgMTUgMTUtNi43MTYgMTUtMTUgMTVtMC0yOGMtNy4xOCAwLTEzIDUuODItMTMgMTNzNS44MiAxMyAxMyAxMyAxMy01LjgyIDEzLTEzLTUuODItMTMtMTMtMTNtNyAxNmgtOGMtLjU1MiAwLTEtLjQ0Ny0xLTF2LTEwYzAtLjU1My40NDgtMSAxLTFzMSAuNDQ3IDEgMXY5aDdjLjU1MyAwIDEgLjQ0NyAxIDFzLS40NDcgMS0xIDEiLz48L3N2Zz4=);background-size:cover}.tabs .tabs-content .search .search-history li>div{font-size:14px;line-height:45px;border-bottom:1px solid rgba(0,0,0,.1);width:calc(98.9vw - 30px)}.tabs .tabs-content .search .search-history .icon-delete{width:27px;height:30px;margin-top:16px;background:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjOTk5ODk5IiBkPSJtMTMuMzc5IDEybDEwLjMzOCAxMC4zMzdjLjM4MS4zODEuMzgxLjk5OCAwIDEuMzc5cy0uOTk4LjM4MS0xLjM3OCAwbC0xMC4zMzgtMTAuMzM4LTEwLjMzOCAxMC4zMzhjLS4zOC4zODEtLjk5Ny4zODEtMS4zNzggMHMtLjM4MS0uOTk4IDAtMS4zNzlsMTAuMzM4LTEwLjMzNy0xMC4zMzgtMTAuMzM4Yy0uMzgxLS4zOC0uMzgxLS45OTcgMC0xLjM3OHMuOTk4LS4zODEgMS4zNzggMGwxMC4zMzggMTAuMzM4IDEwLjMzOC0xMC4zMzhjLjM4LS4zODEuOTk3LS4zODEgMS4zNzggMHMuMzgxLjk5OCAwIDEuMzc4bC0xMC4zMzggMTAuMzM4Ii8+PC9zdmc+) no-repeat;background-size:12px 12px;border-bottom:1px solid rgba(0,0,0,.1)}", ""]);

// exports


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(10);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/autoprefixer-loader/index.js!./playing.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/autoprefixer-loader/index.js!./playing.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, ".playing{height:100vh;position:relative;font-family:Helvetica,sans-serif;overflow:hidden}.playing:after{content:\"\";width:100%;height:100%;position:absolute;z-index:-5;top:0;left:0;-webkit-filter:blur(50px) brightness(.5);filter:blur(50px) brightness(.5)}.playing .point{height:137px;width:96px;background:url(http://ovmr7ndid.bkt.clouddn.com/point.png);background-size:cover;margin-left:calc(50% - 15px);position:relative;z-index:5}.playing .point.pause{-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:rotate(-20deg);transform:rotate(-20deg);transition-duration:.5s}.playing .wrapper{margin-top:-67px;position:relative}.playing .wrapper #icon-play{padding:2px;background:rgba(0,0,0,.2) url(http://ovmr7ndid.bkt.clouddn.com/%E6%92%AD%E6%94%BE.png) no-repeat;background-size:cover}.playing .wrapper #icon-pause,.playing .wrapper #icon-play{width:56px;height:56px;border-radius:50%;position:absolute;z-index:10;top:calc(50% - 28px);left:calc(50% - 28px)}.playing .wrapper #icon-pause{background:rgba(0,0,0,.2) url(http://ovmr7ndid.bkt.clouddn.com/%E6%9A%82%E5%81%9C.png) no-repeat;background-size:cover}.playing .wrapper.pause #icon-pause,.playing .wrapper.play #icon-play{display:none}.playing .wrapper .circle{height:296px;width:296px;margin:0 auto;background:url(http://ovmr7ndid.bkt.clouddn.com/circle1.png);background-size:cover;position:relative}.playing .wrapper.play .circle{-webkit-animation:rotate 15s linear infinite;animation:rotate 15s linear infinite}@-webkit-keyframes rotate{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes rotate{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}.playing .wrapper .circle:before{content:\"\";position:absolute;top:0;left:0;width:100%;height:100%;background:url(http://ovmr7ndid.bkt.clouddn.com/circle2.png);background-size:cover}.playing .wrapper .circle .cover{width:184px;height:184px;position:absolute;top:calc(50% - 92px);left:calc(50% - 92px)}.playing .wrapper .circle .cover img{width:calc(100% - 2px);height:calc(100% - 2px);border:1px solid #bbb;border-radius:50%}.playing .name{color:#fff;font-size:18px;line-height:1.1;margin-top:25px;text-align:center;margin-bottom:14px}.playing .lyric,.playing .name span{font-size:16px;color:hsla(0,0%,100%,.6)}.playing .lyric{height:96px;overflow:hidden;margin-top:14px;line-height:1.5;text-align:center}.playing .lyric .content p{padding-bottom:8px}.playing .nnnnn1{top:0;right:0;bottom:82px;z-index:9}.playing .more,.playing .nnnnn1{position:absolute;left:0;width:100%}.playing .more{bottom:20px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;font-size:18px}.playing .more a{display:block}.playing .more .open{height:42px;width:140px;color:#d43b32;border:1px solid #d43b32;border-radius:4px;padding-top:11px;padding-left:48px}.playing .more .download{height:42px;width:140px;color:#fff;background:#d43b32;margin-left:3.2vw;border-radius:4px;padding-top:12px;padding-left:49px}", ""]);

// exports


/***/ })
/******/ ]);