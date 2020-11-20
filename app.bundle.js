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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// Utility functions

var PREFIXES = 'Webkit Moz O ms'.split(' ');
var FLOAT_COMPARISON_EPSILON = 0.001;

// Copy all attributes from source object to destination object.
// destination object is mutated.
function extend(destination, source, recursive) {
    destination = destination || {};
    source = source || {};
    recursive = recursive || false;

    for (var attrName in source) {
        if (source.hasOwnProperty(attrName)) {
            var destVal = destination[attrName];
            var sourceVal = source[attrName];
            if (recursive && isObject(destVal) && isObject(sourceVal)) {
                destination[attrName] = extend(destVal, sourceVal, recursive);
            } else {
                destination[attrName] = sourceVal;
            }
        }
    }

    return destination;
}

// Renders templates with given variables. Variables must be surrounded with
// braces without any spaces, e.g. {variable}
// All instances of variable placeholders will be replaced with given content
// Example:
// render('Hello, {message}!', {message: 'world'})
function render(template, vars) {
    var rendered = template;

    for (var key in vars) {
        if (vars.hasOwnProperty(key)) {
            var val = vars[key];
            var regExpString = '\\{' + key + '\\}';
            var regExp = new RegExp(regExpString, 'g');

            rendered = rendered.replace(regExp, val);
        }
    }

    return rendered;
}

function setStyle(element, style, value) {
    var elStyle = element.style;  // cache for performance

    for (var i = 0; i < PREFIXES.length; ++i) {
        var prefix = PREFIXES[i];
        elStyle[prefix + capitalize(style)] = value;
    }

    elStyle[style] = value;
}

function setStyles(element, styles) {
    forEachObject(styles, function(styleValue, styleName) {
        // Allow disabling some individual styles by setting them
        // to null or undefined
        if (styleValue === null || styleValue === undefined) {
            return;
        }

        // If style's value is {prefix: true, value: '50%'},
        // Set also browser prefixed styles
        if (isObject(styleValue) && styleValue.prefix === true) {
            setStyle(element, styleName, styleValue.value);
        } else {
            element.style[styleName] = styleValue;
        }
    });
}

function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

function isString(obj) {
    return typeof obj === 'string' || obj instanceof String;
}

function isFunction(obj) {
    return typeof obj === 'function';
}

function isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
}

// Returns true if `obj` is object as in {a: 1, b: 2}, not if it's function or
// array
function isObject(obj) {
    if (isArray(obj)) {
        return false;
    }

    var type = typeof obj;
    return type === 'object' && !!obj;
}

function forEachObject(object, callback) {
    for (var key in object) {
        if (object.hasOwnProperty(key)) {
            var val = object[key];
            callback(val, key);
        }
    }
}

function floatEquals(a, b) {
    return Math.abs(a - b) < FLOAT_COMPARISON_EPSILON;
}

// https://coderwall.com/p/nygghw/don-t-use-innerhtml-to-empty-dom-elements
function removeChildren(el) {
    while (el.firstChild) {
        el.removeChild(el.firstChild);
    }
}

module.exports = {
    extend: extend,
    render: render,
    setStyle: setStyle,
    setStyles: setStyles,
    capitalize: capitalize,
    isString: isString,
    isFunction: isFunction,
    isObject: isObject,
    forEachObject: forEachObject,
    floatEquals: floatEquals,
    removeChildren: removeChildren
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// Base object for different progress bar shapes

var Path = __webpack_require__(2);
var utils = __webpack_require__(0);

var DESTROYED_ERROR = 'Object is destroyed';

var Shape = function Shape(container, opts) {
    // Throw a better error if progress bars are not initialized with `new`
    // keyword
    if (!(this instanceof Shape)) {
        throw new Error('Constructor was called without new keyword');
    }

    // Prevent calling constructor without parameters so inheritance
    // works correctly. To understand, this is how Shape is inherited:
    //
    //   Line.prototype = new Shape();
    //
    // We just want to set the prototype for Line.
    if (arguments.length === 0) {
        return;
    }

    // Default parameters for progress bar creation
    this._opts = utils.extend({
        color: '#555',
        strokeWidth: 1.0,
        trailColor: null,
        trailWidth: null,
        fill: null,
        text: {
            style: {
                color: null,
                position: 'absolute',
                left: '50%',
                top: '50%',
                padding: 0,
                margin: 0,
                transform: {
                    prefix: true,
                    value: 'translate(-50%, -50%)'
                }
            },
            autoStyleContainer: true,
            alignToBottom: true,
            value: null,
            className: 'progressbar-text'
        },
        svgStyle: {
            display: 'block',
            width: '100%'
        },
        warnings: false
    }, opts, true);  // Use recursive extend

    // If user specifies e.g. svgStyle or text style, the whole object
    // should replace the defaults to make working with styles easier
    if (utils.isObject(opts) && opts.svgStyle !== undefined) {
        this._opts.svgStyle = opts.svgStyle;
    }
    if (utils.isObject(opts) && utils.isObject(opts.text) && opts.text.style !== undefined) {
        this._opts.text.style = opts.text.style;
    }

    var svgView = this._createSvgView(this._opts);

    var element;
    if (utils.isString(container)) {
        element = document.querySelector(container);
    } else {
        element = container;
    }

    if (!element) {
        throw new Error('Container does not exist: ' + container);
    }

    this._container = element;
    this._container.appendChild(svgView.svg);
    if (this._opts.warnings) {
        this._warnContainerAspectRatio(this._container);
    }

    if (this._opts.svgStyle) {
        utils.setStyles(svgView.svg, this._opts.svgStyle);
    }

    // Expose public attributes before Path initialization
    this.svg = svgView.svg;
    this.path = svgView.path;
    this.trail = svgView.trail;
    this.text = null;

    var newOpts = utils.extend({
        attachment: undefined,
        shape: this
    }, this._opts);
    this._progressPath = new Path(svgView.path, newOpts);

    if (utils.isObject(this._opts.text) && this._opts.text.value !== null) {
        this.setText(this._opts.text.value);
    }
};

Shape.prototype.animate = function animate(progress, opts, cb) {
    if (this._progressPath === null) {
        throw new Error(DESTROYED_ERROR);
    }

    this._progressPath.animate(progress, opts, cb);
};

Shape.prototype.stop = function stop() {
    if (this._progressPath === null) {
        throw new Error(DESTROYED_ERROR);
    }

    // Don't crash if stop is called inside step function
    if (this._progressPath === undefined) {
        return;
    }

    this._progressPath.stop();
};

Shape.prototype.pause = function pause() {
    if (this._progressPath === null) {
        throw new Error(DESTROYED_ERROR);
    }

    if (this._progressPath === undefined) {
        return;
    }

    if (!this._progressPath._tweenable) {
        // It seems that we can't pause this
        return;
    }

    this._progressPath._tweenable.pause();
};

Shape.prototype.resume = function resume() {
    if (this._progressPath === null) {
        throw new Error(DESTROYED_ERROR);
    }

    if (this._progressPath === undefined) {
        return;
    }

    if (!this._progressPath._tweenable) {
        // It seems that we can't resume this
        return;
    }

    this._progressPath._tweenable.resume();
};

Shape.prototype.destroy = function destroy() {
    if (this._progressPath === null) {
        throw new Error(DESTROYED_ERROR);
    }

    this.stop();
    this.svg.parentNode.removeChild(this.svg);
    this.svg = null;
    this.path = null;
    this.trail = null;
    this._progressPath = null;

    if (this.text !== null) {
        this.text.parentNode.removeChild(this.text);
        this.text = null;
    }
};

Shape.prototype.set = function set(progress) {
    if (this._progressPath === null) {
        throw new Error(DESTROYED_ERROR);
    }

    this._progressPath.set(progress);
};

Shape.prototype.value = function value() {
    if (this._progressPath === null) {
        throw new Error(DESTROYED_ERROR);
    }

    if (this._progressPath === undefined) {
        return 0;
    }

    return this._progressPath.value();
};

Shape.prototype.setText = function setText(newText) {
    if (this._progressPath === null) {
        throw new Error(DESTROYED_ERROR);
    }

    if (this.text === null) {
        // Create new text node
        this.text = this._createTextContainer(this._opts, this._container);
        this._container.appendChild(this.text);
    }

    // Remove previous text and add new
    if (utils.isObject(newText)) {
        utils.removeChildren(this.text);
        this.text.appendChild(newText);
    } else {
        this.text.innerHTML = newText;
    }
};

Shape.prototype._createSvgView = function _createSvgView(opts) {
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this._initializeSvg(svg, opts);

    var trailPath = null;
    // Each option listed in the if condition are 'triggers' for creating
    // the trail path
    if (opts.trailColor || opts.trailWidth) {
        trailPath = this._createTrail(opts);
        svg.appendChild(trailPath);
    }

    var path = this._createPath(opts);
    svg.appendChild(path);

    return {
        svg: svg,
        path: path,
        trail: trailPath
    };
};

Shape.prototype._initializeSvg = function _initializeSvg(svg, opts) {
    svg.setAttribute('viewBox', '0 0 100 100');
};

Shape.prototype._createPath = function _createPath(opts) {
    var pathString = this._pathString(opts);
    return this._createPathElement(pathString, opts);
};

Shape.prototype._createTrail = function _createTrail(opts) {
    // Create path string with original passed options
    var pathString = this._trailString(opts);

    // Prevent modifying original
    var newOpts = utils.extend({}, opts);

    // Defaults for parameters which modify trail path
    if (!newOpts.trailColor) {
        newOpts.trailColor = '#eee';
    }
    if (!newOpts.trailWidth) {
        newOpts.trailWidth = newOpts.strokeWidth;
    }

    newOpts.color = newOpts.trailColor;
    newOpts.strokeWidth = newOpts.trailWidth;

    // When trail path is set, fill must be set for it instead of the
    // actual path to prevent trail stroke from clipping
    newOpts.fill = null;

    return this._createPathElement(pathString, newOpts);
};

Shape.prototype._createPathElement = function _createPathElement(pathString, opts) {
    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', pathString);
    path.setAttribute('stroke', opts.color);
    path.setAttribute('stroke-width', opts.strokeWidth);

    if (opts.fill) {
        path.setAttribute('fill', opts.fill);
    } else {
        path.setAttribute('fill-opacity', '0');
    }

    return path;
};

Shape.prototype._createTextContainer = function _createTextContainer(opts, container) {
    var textContainer = document.createElement('div');
    textContainer.className = opts.text.className;

    var textStyle = opts.text.style;
    if (textStyle) {
        if (opts.text.autoStyleContainer) {
            container.style.position = 'relative';
        }

        utils.setStyles(textContainer, textStyle);
        // Default text color to progress bar's color
        if (!textStyle.color) {
            textContainer.style.color = opts.color;
        }
    }

    this._initializeTextContainer(opts, container, textContainer);
    return textContainer;
};

// Give custom shapes possibility to modify text element
Shape.prototype._initializeTextContainer = function(opts, container, element) {
    // By default, no-op
    // Custom shapes should respect API options, such as text.style
};

Shape.prototype._pathString = function _pathString(opts) {
    throw new Error('Override this function for each progress bar');
};

Shape.prototype._trailString = function _trailString(opts) {
    throw new Error('Override this function for each progress bar');
};

Shape.prototype._warnContainerAspectRatio = function _warnContainerAspectRatio(container) {
    if (!this.containerAspectRatio) {
        return;
    }

    var computedStyle = window.getComputedStyle(container, null);
    var width = parseFloat(computedStyle.getPropertyValue('width'), 10);
    var height = parseFloat(computedStyle.getPropertyValue('height'), 10);
    if (!utils.floatEquals(this.containerAspectRatio, width / height)) {
        console.warn(
            'Incorrect aspect ratio of container',
            '#' + container.id,
            'detected:',
            computedStyle.getPropertyValue('width') + '(width)',
            '/',
            computedStyle.getPropertyValue('height') + '(height)',
            '=',
            width / height
        );

        console.warn(
            'Aspect ratio of should be',
            this.containerAspectRatio
        );
    }
};

module.exports = Shape;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// Lower level API to animate any kind of svg path

var shifty = __webpack_require__(9);
var utils = __webpack_require__(0);

var Tweenable = shifty.Tweenable;

var EASING_ALIASES = {
    easeIn: 'easeInCubic',
    easeOut: 'easeOutCubic',
    easeInOut: 'easeInOutCubic'
};

var Path = function Path(path, opts) {
    // Throw a better error if not initialized with `new` keyword
    if (!(this instanceof Path)) {
        throw new Error('Constructor was called without new keyword');
    }

    // Default parameters for animation
    opts = utils.extend({
        delay: 0,
        duration: 800,
        easing: 'linear',
        from: {},
        to: {},
        step: function() {}
    }, opts);

    var element;
    if (utils.isString(path)) {
        element = document.querySelector(path);
    } else {
        element = path;
    }

    // Reveal .path as public attribute
    this.path = element;
    this._opts = opts;
    this._tweenable = null;

    // Set up the starting positions
    var length = this.path.getTotalLength();
    this.path.style.strokeDasharray = length + ' ' + length;
    this.set(0);
};

Path.prototype.value = function value() {
    var offset = this._getComputedDashOffset();
    var length = this.path.getTotalLength();

    var progress = 1 - offset / length;
    // Round number to prevent returning very small number like 1e-30, which
    // is practically 0
    return parseFloat(progress.toFixed(6), 10);
};

Path.prototype.set = function set(progress) {
    this.stop();

    this.path.style.strokeDashoffset = this._progressToOffset(progress);

    var step = this._opts.step;
    if (utils.isFunction(step)) {
        var easing = this._easing(this._opts.easing);
        var values = this._calculateTo(progress, easing);
        var reference = this._opts.shape || this;
        step(values, reference, this._opts.attachment);
    }
};

Path.prototype.stop = function stop() {
    this._stopTween();
    this.path.style.strokeDashoffset = this._getComputedDashOffset();
};

// Method introduced here:
// http://jakearchibald.com/2013/animated-line-drawing-svg/
Path.prototype.animate = function animate(progress, opts, cb) {
    opts = opts || {};

    if (utils.isFunction(opts)) {
        cb = opts;
        opts = {};
    }

    var passedOpts = utils.extend({}, opts);

    // Copy default opts to new object so defaults are not modified
    var defaultOpts = utils.extend({}, this._opts);
    opts = utils.extend(defaultOpts, opts);

    var shiftyEasing = this._easing(opts.easing);
    var values = this._resolveFromAndTo(progress, shiftyEasing, passedOpts);

    this.stop();

    // Trigger a layout so styles are calculated & the browser
    // picks up the starting position before animating
    this.path.getBoundingClientRect();

    var offset = this._getComputedDashOffset();
    var newOffset = this._progressToOffset(progress);

    var self = this;
    this._tweenable = new Tweenable();
    this._tweenable.tween({
        from: utils.extend({ offset: offset }, values.from),
        to: utils.extend({ offset: newOffset }, values.to),
        duration: opts.duration,
        delay: opts.delay,
        easing: shiftyEasing,
        step: function(state) {
            self.path.style.strokeDashoffset = state.offset;
            var reference = opts.shape || self;
            opts.step(state, reference, opts.attachment);
        }
    }).then(function(state) {
        if (utils.isFunction(cb)) {
            cb();
        }
    });
};

Path.prototype._getComputedDashOffset = function _getComputedDashOffset() {
    var computedStyle = window.getComputedStyle(this.path, null);
    return parseFloat(computedStyle.getPropertyValue('stroke-dashoffset'), 10);
};

Path.prototype._progressToOffset = function _progressToOffset(progress) {
    var length = this.path.getTotalLength();
    return length - progress * length;
};

// Resolves from and to values for animation.
Path.prototype._resolveFromAndTo = function _resolveFromAndTo(progress, easing, opts) {
    if (opts.from && opts.to) {
        return {
            from: opts.from,
            to: opts.to
        };
    }

    return {
        from: this._calculateFrom(easing),
        to: this._calculateTo(progress, easing)
    };
};

// Calculate `from` values from options passed at initialization
Path.prototype._calculateFrom = function _calculateFrom(easing) {
    return shifty.interpolate(this._opts.from, this._opts.to, this.value(), easing);
};

// Calculate `to` values from options passed at initialization
Path.prototype._calculateTo = function _calculateTo(progress, easing) {
    return shifty.interpolate(this._opts.from, this._opts.to, progress, easing);
};

Path.prototype._stopTween = function _stopTween() {
    if (this._tweenable !== null) {
        this._tweenable.stop();
        this._tweenable = null;
    }
};

Path.prototype._easing = function _easing(easing) {
    if (EASING_ALIASES.hasOwnProperty(easing)) {
        return EASING_ALIASES[easing];
    }

    return easing;
};

module.exports = Path;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// Circle shaped progress bar

var Shape = __webpack_require__(1);
var utils = __webpack_require__(0);

var Circle = function Circle(container, options) {
    // Use two arcs to form a circle
    // See this answer http://stackoverflow.com/a/10477334/1446092
    this._pathTemplate =
        'M 50,50 m 0,-{radius}' +
        ' a {radius},{radius} 0 1 1 0,{2radius}' +
        ' a {radius},{radius} 0 1 1 0,-{2radius}';

    this.containerAspectRatio = 1;

    Shape.apply(this, arguments);
};

Circle.prototype = new Shape();
Circle.prototype.constructor = Circle;

Circle.prototype._pathString = function _pathString(opts) {
    var widthOfWider = opts.strokeWidth;
    if (opts.trailWidth && opts.trailWidth > opts.strokeWidth) {
        widthOfWider = opts.trailWidth;
    }

    var r = 50 - widthOfWider / 2;

    return utils.render(this._pathTemplate, {
        radius: r,
        '2radius': r * 2
    });
};

Circle.prototype._trailString = function _trailString(opts) {
    return this._pathString(opts);
};

module.exports = Circle;


/***/ }),
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// import * as progressBar from 'progressbar.js'
var ProgressBar = __webpack_require__(7);


$(function() {

  var progressBar1 = new ProgressBar.Circle('#progressbar1', {
    color: '#fcb301',
    strokeWidth: 4,
    trailWidth: 4,
    text: {

      value: '106 <span>mph</span>',
    },
    trailColor: '#1e1e1e',
    easing: 'easeInOut'
  });


  var progressBar2 = new ProgressBar.Circle('#progressbar2', {
    color: '#fcb301',
    strokeWidth: 4,
    trailWidth: 4,
    text: {

      value: '229 <span>kg</span>',
    },
    trailColor: '#1e1e1e',
    easing: 'easeInOut'
  });


  var progressBar3 = new ProgressBar.Circle('#progressbar3', {
    color: '#fcb301',
    strokeWidth: 4,
    trailWidth: 4,
    text: {

      value: '5.7<small>L</small> <span>/100km</span>',
    },
    trailColor: '#1e1e1e',
    easing: 'easeInOut'
  });


  $(window).scroll(function () {
    var scroll = $(window).scrollTop() + $(window).height();

    $element = $('.specifications__progressbar');
    var offset = $element.offset().top;

    var elheigtn = $element.height() / 2;


    if (scroll > offset - elheigtn) {

      animated = false;
      progressBar1.animate(0.75, {
        duration: 1500
      });
      progressBar2.animate(0.75, {
        duration: 1500
      });
      progressBar3.animate(0.85, {
        duration: 1500
      });
    }
  });

  function hiddenMenu() {
    $('.header_blur').css('display', 'none');
    $('.menu__list').css('display', 'none');
  }

  $('.menu__icon').on('click', function () {
    $('.header_blur').css('display', 'block');
    $('.menu__list').css('display', 'block');
  });

  $('.menu__item_close').on('click', function () {
    hiddenMenu();
  });

  $('.menu__link').on('click', function () {
    hiddenMenu();
  });


  $('.scroll').on('click', function () {
    var heightScreen = document.documentElement.clientHeight;
    $('html').animate({scrollTop: heightScreen}, 800);
  });

  $('.more').on('click', function () {
    var classParent = $(this).parent().attr('class');
    var classElHide = '.' + classParent + ' .hidden';
    $(classElHide).toggleClass('show');


  });

  window.CI360.init();
  window.addEventListener("resize", function () {
    if (document.documentElement.clientWidth <= 548) {
      window.CI360.destroy();
    }
    if (document.documentElement.clientWidth > 549) {
      window.CI360.init();
    }
  });


});




/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
    // Higher level API, different shaped progress bars
    Line: __webpack_require__(8),
    Circle: __webpack_require__(3),
    SemiCircle: __webpack_require__(10),
    Square: __webpack_require__(11),

    // Lower level API to use any SVG path
    Path: __webpack_require__(2),

    // Base-class for creating new custom shapes
    // to be in line with the API of built-in shapes
    // Undocumented.
    Shape: __webpack_require__(1),

    // Internal utils, undocumented.
    utils: __webpack_require__(0)
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// Line shaped progress bar

var Shape = __webpack_require__(1);
var utils = __webpack_require__(0);

var Line = function Line(container, options) {
    this._pathTemplate = 'M 0,{center} L 100,{center}';
    Shape.apply(this, arguments);
};

Line.prototype = new Shape();
Line.prototype.constructor = Line;

Line.prototype._initializeSvg = function _initializeSvg(svg, opts) {
    svg.setAttribute('viewBox', '0 0 100 ' + opts.strokeWidth);
    svg.setAttribute('preserveAspectRatio', 'none');
};

Line.prototype._pathString = function _pathString(opts) {
    return utils.render(this._pathTemplate, {
        center: opts.strokeWidth / 2
    });
};

Line.prototype._trailString = function _trailString(opts) {
    return this._pathString(opts);
};

module.exports = Line;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/*! Shifty 2.12.0 - https://github.com/jeremyckahn/shifty */
!function(t,n){ true?module.exports=n():undefined}(window,(function(){return function(t){var n={};function e(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,e),i.l=!0,i.exports}return e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:r})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(e.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var i in t)e.d(r,i,function(n){return t[n]}.bind(null,i));return r},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="",e(e.s=3)}([function(t,n,e){"use strict";(function(t){e.d(n,"e",(function(){return m})),e.d(n,"c",(function(){return b})),e.d(n,"b",(function(){return w})),e.d(n,"a",(function(){return S})),e.d(n,"d",(function(){return j}));var r=e(1);function i(t,n){var e;if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(e=function(t,n){if(!t)return;if("string"==typeof t)return u(t,n);var e=Object.prototype.toString.call(t).slice(8,-1);"Object"===e&&t.constructor&&(e=t.constructor.name);if("Map"===e||"Set"===e)return Array.from(t);if("Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return u(t,n)}(t))||n&&t&&"number"==typeof t.length){e&&(t=e);var r=0,i=function(){};return{s:i,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,a=!0,c=!1;return{s:function(){e=t[Symbol.iterator]()},n:function(){var t=e.next();return a=t.done,t},e:function(t){c=!0,o=t},f:function(){try{a||null==e.return||e.return()}finally{if(c)throw o}}}}function u(t,n){(null==n||n>t.length)&&(n=t.length);for(var e=0,r=new Array(n);e<n;e++)r[e]=t[e];return r}function o(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}function a(t,n){for(var e=0;e<n.length;e++){var r=n[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function c(t){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function f(t,n){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable}))),e.push.apply(e,r)}return e}function s(t){for(var n=1;n<arguments.length;n++){var e=null!=arguments[n]?arguments[n]:{};n%2?f(Object(e),!0).forEach((function(n){l(t,n,e[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):f(Object(e)).forEach((function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(e,n))}))}return t}function l(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}var h="undefined"!=typeof window?window:t,p=h.requestAnimationFrame||h.webkitRequestAnimationFrame||h.oRequestAnimationFrame||h.msRequestAnimationFrame||h.mozCancelRequestAnimationFrame&&h.mozRequestAnimationFrame||setTimeout,d=function(){},v=null,y=null,_=s({},r),m=function(t,n,e,r,i,u,o){var a=t<u?0:(t-u)/i;for(var c in n){var f=o[c],s=f.call?f:_[f],l=e[c];n[c]=l+(r[c]-l)*s(a)}return n},g=function(t,n){var e=t._data,r=t._currentState,i=t._delay,u=t._easing,o=t._originalState,a=t._duration,c=t._render,f=t._targetState,s=t._timestamp,l=s+i+a,h=n>l?l:n,p=a-(l-h);h>=l?(c(f,e,p),t.stop(!0)):(t._applyFilter("beforeTween"),h<s+i?(h=1,a=1,s=1):s+=i,m(h,r,o,f,a,s,u),t._applyFilter("afterTween"),c(r,e,p))},b=function(){for(var t=S.now(),n=v;n;){var e=n._next;g(n,t),n=e}},w=function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"linear",e={},r=c(n);if("string"===r||"function"===r)for(var i in t)e[i]=n;else for(var u in t)e[u]=n[u]||"linear";return e},O=function(t){if(t===v)(v=t._next)?v._previous=null:y=null;else if(t===y)(y=t._previous)?y._next=null:v=null;else{var n=t._previous,e=t._next;n._next=e,e._previous=n}t._previous=t._next=null},S=function(){function t(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0;o(this,t),l(this,"_config",null),l(this,"_data",{}),l(this,"_filters",[]),l(this,"_next",null),l(this,"_previous",null),l(this,"_timestamp",null),l(this,"_resolve",null),l(this,"_reject",null),this._currentState=n,e&&this.setConfig(e)}var n,e,r;return n=t,(e=[{key:"_applyFilter",value:function(t){var n,e=i(this._filters);try{for(e.s();!(n=e.n()).done;){var r=n.value[t];r&&r(this)}}catch(t){e.e(t)}finally{e.f()}}},{key:"tween",value:function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:void 0,e=this._data,r=this._config;return this._isPlaying&&this.stop(),!n&&r||this.setConfig(n),this._pausedAtTime=null,this._timestamp=t.now(),this._start(this.get(),e),this.resume()}},{key:"setConfig",value:function(){var n=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=s(s({},this._config),e),i=this._config=r,u=i.attachment,o=i.data,a=i.duration,c=void 0===a?500:a,f=i.easing,l=i.promise,h=void 0===l?Promise:l,p=i.start,v=void 0===p?d:p,y=i.render,_=void 0===y?r.step||d:y,m=i.step,g=void 0===m?d:m,b=e.delay,O=void 0===b?0:b,S=e.from,j=e.to;this._data=o||u||this._data,this._isPlaying=!1,this._pausedAtTime=null,this._scheduleId=null,this._delay=O,this._start=v,this._render=_||g,this._duration=c,this._currentState=s({},S||this.get()),this._originalState=this.get(),this._targetState=s({},j||this.get());var M=this._currentState;this._targetState=s(s({},M),this._targetState),this._easing=w(M,f);var k=t.filters;for(var P in this._filters.length=0,k)k[P].doesApply(this)&&this._filters.push(k[P]);return this._applyFilter("tweenCreated"),this._promise=new h((function(t,e){n._resolve=t,n._reject=e})),this._promise.catch(d),this}},{key:"get",value:function(){return s({},this._currentState)}},{key:"set",value:function(t){this._currentState=t}},{key:"pause",value:function(){if(this._isPlaying)return this._pausedAtTime=t.now(),this._isPlaying=!1,O(this),this}},{key:"resume",value:function(){if(null===this._timestamp)return this.tween();if(this._isPlaying)return this._promise;var n=t.now();return this._pausedAtTime&&(this._timestamp+=n-this._pausedAtTime,this._pausedAtTime=null),this._isPlaying=!0,null===v?(v=this,y=this,function t(){v&&(p.call(h,t,1e3/60),b())}()):(this._previous=y,y._next=this,y=this),this._promise}},{key:"seek",value:function(n){n=Math.max(n,0);var e=t.now();return this._timestamp+n===0||(this._timestamp=e-n,this._isPlaying||g(this,e)),this}},{key:"stop",value:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],n=this._currentState,e=this._data,r=this._easing,i=this._originalState,u=this._resolve,o=this._targetState;return this._isPlaying?(this._isPlaying=!1,O(this),t&&(this._applyFilter("beforeTween"),m(1,n,i,o,1,0,r),this._applyFilter("afterTween"),this._applyFilter("afterTweenEnd")),u&&u({data:e,state:n,tweenable:this}),this._resolve=null,this._reject=null,this):this}},{key:"cancel",value:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],n=this._currentState,e=this._data,r=this._isPlaying;return r?(this._reject({data:e,state:n,tweenable:this}),this._resolve=null,this._reject=null,this.stop(t)):this}},{key:"isPlaying",value:function(){return this._isPlaying}},{key:"setScheduleFunction",value:function(n){t.setScheduleFunction(n)}},{key:"data",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return t&&(this._data=s({},t)),this._data}},{key:"dispose",value:function(){for(var t in this)delete this[t]}}])&&a(n.prototype,e),r&&a(n,r),t}();function j(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=new S,e=n.tween(t);return e.tweenable=n,e}S.setScheduleFunction=function(t){return p=t},S.formulas=_,S.filters={},S.now=Date.now||function(){return+new Date}}).call(this,e(2))},function(t,n,e){"use strict";e.r(n),e.d(n,"linear",(function(){return r})),e.d(n,"easeInQuad",(function(){return i})),e.d(n,"easeOutQuad",(function(){return u})),e.d(n,"easeInOutQuad",(function(){return o})),e.d(n,"easeInCubic",(function(){return a})),e.d(n,"easeOutCubic",(function(){return c})),e.d(n,"easeInOutCubic",(function(){return f})),e.d(n,"easeInQuart",(function(){return s})),e.d(n,"easeOutQuart",(function(){return l})),e.d(n,"easeInOutQuart",(function(){return h})),e.d(n,"easeInQuint",(function(){return p})),e.d(n,"easeOutQuint",(function(){return d})),e.d(n,"easeInOutQuint",(function(){return v})),e.d(n,"easeInSine",(function(){return y})),e.d(n,"easeOutSine",(function(){return _})),e.d(n,"easeInOutSine",(function(){return m})),e.d(n,"easeInExpo",(function(){return g})),e.d(n,"easeOutExpo",(function(){return b})),e.d(n,"easeInOutExpo",(function(){return w})),e.d(n,"easeInCirc",(function(){return O})),e.d(n,"easeOutCirc",(function(){return S})),e.d(n,"easeInOutCirc",(function(){return j})),e.d(n,"easeOutBounce",(function(){return M})),e.d(n,"easeInBack",(function(){return k})),e.d(n,"easeOutBack",(function(){return P})),e.d(n,"easeInOutBack",(function(){return A})),e.d(n,"elastic",(function(){return T})),e.d(n,"swingFromTo",(function(){return x})),e.d(n,"swingFrom",(function(){return E})),e.d(n,"swingTo",(function(){return I})),e.d(n,"bounce",(function(){return F})),e.d(n,"bouncePast",(function(){return C})),e.d(n,"easeFromTo",(function(){return D})),e.d(n,"easeFrom",(function(){return q})),e.d(n,"easeTo",(function(){return Q}));
/*!
 * All equations are adapted from Thomas Fuchs'
 * [Scripty2](https://github.com/madrobby/scripty2/blob/master/src/effects/transitions/penner.js).
 *
 * Based on Easing Equations (c) 2003 [Robert
 * Penner](http://www.robertpenner.com/), all rights reserved. This work is
 * [subject to terms](http://www.robertpenner.com/easing_terms_of_use.html).
 */
/*!
 *  TERMS OF USE - EASING EQUATIONS
 *  Open source under the BSD License.
 *  Easing Equations (c) 2003 Robert Penner, all rights reserved.
 */
var r=function(t){return t},i=function(t){return Math.pow(t,2)},u=function(t){return-(Math.pow(t-1,2)-1)},o=function(t){return(t/=.5)<1?.5*Math.pow(t,2):-.5*((t-=2)*t-2)},a=function(t){return Math.pow(t,3)},c=function(t){return Math.pow(t-1,3)+1},f=function(t){return(t/=.5)<1?.5*Math.pow(t,3):.5*(Math.pow(t-2,3)+2)},s=function(t){return Math.pow(t,4)},l=function(t){return-(Math.pow(t-1,4)-1)},h=function(t){return(t/=.5)<1?.5*Math.pow(t,4):-.5*((t-=2)*Math.pow(t,3)-2)},p=function(t){return Math.pow(t,5)},d=function(t){return Math.pow(t-1,5)+1},v=function(t){return(t/=.5)<1?.5*Math.pow(t,5):.5*(Math.pow(t-2,5)+2)},y=function(t){return 1-Math.cos(t*(Math.PI/2))},_=function(t){return Math.sin(t*(Math.PI/2))},m=function(t){return-.5*(Math.cos(Math.PI*t)-1)},g=function(t){return 0===t?0:Math.pow(2,10*(t-1))},b=function(t){return 1===t?1:1-Math.pow(2,-10*t)},w=function(t){return 0===t?0:1===t?1:(t/=.5)<1?.5*Math.pow(2,10*(t-1)):.5*(2-Math.pow(2,-10*--t))},O=function(t){return-(Math.sqrt(1-t*t)-1)},S=function(t){return Math.sqrt(1-Math.pow(t-1,2))},j=function(t){return(t/=.5)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)},M=function(t){return t<1/2.75?7.5625*t*t:t<2/2.75?7.5625*(t-=1.5/2.75)*t+.75:t<2.5/2.75?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375},k=function(t){var n=1.70158;return t*t*((n+1)*t-n)},P=function(t){var n=1.70158;return(t-=1)*t*((n+1)*t+n)+1},A=function(t){var n=1.70158;return(t/=.5)<1?t*t*((1+(n*=1.525))*t-n)*.5:.5*((t-=2)*t*((1+(n*=1.525))*t+n)+2)},T=function(t){return-1*Math.pow(4,-8*t)*Math.sin((6*t-1)*(2*Math.PI)/2)+1},x=function(t){var n=1.70158;return(t/=.5)<1?t*t*((1+(n*=1.525))*t-n)*.5:.5*((t-=2)*t*((1+(n*=1.525))*t+n)+2)},E=function(t){var n=1.70158;return t*t*((n+1)*t-n)},I=function(t){var n=1.70158;return(t-=1)*t*((n+1)*t+n)+1},F=function(t){return t<1/2.75?7.5625*t*t:t<2/2.75?7.5625*(t-=1.5/2.75)*t+.75:t<2.5/2.75?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375},C=function(t){return t<1/2.75?7.5625*t*t:t<2/2.75?2-(7.5625*(t-=1.5/2.75)*t+.75):t<2.5/2.75?2-(7.5625*(t-=2.25/2.75)*t+.9375):2-(7.5625*(t-=2.625/2.75)*t+.984375)},D=function(t){return(t/=.5)<1?.5*Math.pow(t,4):-.5*((t-=2)*Math.pow(t,3)-2)},q=function(t){return Math.pow(t,4)},Q=function(t){return Math.pow(t,.25)}},function(t,n){var e;e=function(){return this}();try{e=e||new Function("return this")()}catch(t){"object"==typeof window&&(e=window)}t.exports=e},function(t,n,e){"use strict";e.r(n),e.d(n,"processTweens",(function(){return o.c})),e.d(n,"Tweenable",(function(){return o.a})),e.d(n,"tween",(function(){return o.d})),e.d(n,"interpolate",(function(){return I})),e.d(n,"Scene",(function(){return N})),e.d(n,"setBezierFunction",(function(){return z})),e.d(n,"unsetBezierFunction",(function(){return L}));var r={};e.r(r),e.d(r,"doesApply",(function(){return S})),e.d(r,"tweenCreated",(function(){return j})),e.d(r,"beforeTween",(function(){return M})),e.d(r,"afterTween",(function(){return k}));var i,u,o=e(0),a=/(\d|-|\.)/,c=/([^\-0-9.]+)/g,f=/[0-9.-]+/g,s=(i=f.source,u=/,\s*/.source,new RegExp("rgb\\(".concat(i).concat(u).concat(i).concat(u).concat(i,"\\)"),"g")),l=/^.*\(/,h=/#([0-9]|[a-f]){3,6}/gi,p=function(t,n){return t.map((function(t,e){return"_".concat(n,"_").concat(e)}))};function d(t){return parseInt(t,16)}var v=function(t){return"rgb(".concat((n=t,3===(n=n.replace(/#/,"")).length&&(n=(n=n.split(""))[0]+n[0]+n[1]+n[1]+n[2]+n[2]),[d(n.substr(0,2)),d(n.substr(2,2)),d(n.substr(4,2))]).join(","),")");var n},y=function(t,n,e){var r=n.match(t),i=n.replace(t,"VAL");return r&&r.forEach((function(t){return i=i.replace("VAL",e(t))})),i},_=function(t){for(var n in t){var e=t[n];"string"==typeof e&&e.match(h)&&(t[n]=y(h,e,v))}},m=function(t){var n=t.match(f).map(Math.floor),e=t.match(l)[0];return"".concat(e).concat(n.join(","),")")},g=function(t){return t.match(f)},b=function(t,n){var e={};return n.forEach((function(n){e[n]=t[n],delete t[n]})),e},w=function(t,n){return n.map((function(n){return t[n]}))},O=function(t,n){return n.forEach((function(n){return t=t.replace("VAL",+n.toFixed(4))})),t},S=function(t){var n=t._currentState;return Object.keys(n).some((function(t){return"string"==typeof n[t]}))};function j(t){var n=t._currentState;[n,t._originalState,t._targetState].forEach(_),t._tokenData=function(t){var n,e,r={};for(var i in t){var u=t[i];"string"==typeof u&&(r[i]={formatString:(n=u,e=void 0,e=n.match(c),e?(1===e.length||n.charAt(0).match(a))&&e.unshift(""):e=["",""],e.join("VAL")),chunkNames:p(g(u),i)})}return r}(n)}function M(t){var n=t._currentState,e=t._originalState,r=t._targetState,i=t._easing,u=t._tokenData;!function(t,n){var e=function(e){var r=n[e].chunkNames,i=t[e];if("string"==typeof i){var u=i.split(" "),o=u[u.length-1];r.forEach((function(n,e){return t[n]=u[e]||o}))}else r.forEach((function(n){return t[n]=i}));delete t[e]};for(var r in n)e(r)}(i,u),[n,e,r].forEach((function(t){return function(t,n){var e=function(e){g(t[e]).forEach((function(r,i){return t[n[e].chunkNames[i]]=+r})),delete t[e]};for(var r in n)e(r)}(t,u)}))}function k(t){var n=t._currentState,e=t._originalState,r=t._targetState,i=t._easing,u=t._tokenData;[n,e,r].forEach((function(t){return function(t,n){for(var e in n){var r=n[e],i=r.chunkNames,u=r.formatString,o=O(u,w(b(t,i),i));t[e]=y(s,o,m)}}(t,u)})),function(t,n){for(var e in n){var r=n[e].chunkNames,i=t[r[0]];t[e]="string"==typeof i?r.map((function(n){var e=t[n];return delete t[n],e})).join(" "):i}}(i,u)}function P(t,n){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable}))),e.push.apply(e,r)}return e}function A(t){for(var n=1;n<arguments.length;n++){var e=null!=arguments[n]?arguments[n]:{};n%2?P(Object(e),!0).forEach((function(n){T(t,n,e[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):P(Object(e)).forEach((function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(e,n))}))}return t}function T(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}var x=new o.a,E=o.a.filters,I=function(t,n,e,r){var i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,u=A({},t),a=Object(o.b)(t,r);for(var c in x._filters.length=0,x.set({}),x._currentState=u,x._originalState=t,x._targetState=n,x._easing=a,E)E[c].doesApply(x)&&x._filters.push(E[c]);x._applyFilter("tweenCreated"),x._applyFilter("beforeTween");var f=Object(o.e)(e,u,t,n,1,i,a);return x._applyFilter("afterTween"),f};function F(t){return function(t){if(Array.isArray(t))return C(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,n){if(!t)return;if("string"==typeof t)return C(t,n);var e=Object.prototype.toString.call(t).slice(8,-1);"Object"===e&&t.constructor&&(e=t.constructor.name);if("Map"===e||"Set"===e)return Array.from(t);if("Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return C(t,n)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function C(t,n){(null==n||n>t.length)&&(n=t.length);for(var e=0,r=new Array(n);e<n;e++)r[e]=t[e];return r}function D(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}function q(t,n){for(var e=0;e<n.length;e++){var r=n[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function Q(t,n){var e=n.get(t);if(!e)throw new TypeError("attempted to get private field on non-instance");return e.get?e.get.call(t):e.value}var B=new WeakMap,N=function(){function t(){D(this,t),B.set(this,{writable:!0,value:[]});for(var n=arguments.length,e=new Array(n),r=0;r<n;r++)e[r]=arguments[r];e.forEach(this.add.bind(this))}var n,e,r;return n=t,(e=[{key:"add",value:function(t){return Q(this,B).push(t),t}},{key:"remove",value:function(t){var n=Q(this,B).indexOf(t);return~n&&Q(this,B).splice(n,1),t}},{key:"empty",value:function(){return this.tweenables.map(this.remove.bind(this))}},{key:"isPlaying",value:function(){return Q(this,B).some((function(t){return t.isPlaying()}))}},{key:"play",value:function(){return Q(this,B).forEach((function(t){return t.tween()})),this}},{key:"pause",value:function(){return Q(this,B).forEach((function(t){return t.pause()})),this}},{key:"resume",value:function(){return Q(this,B).forEach((function(t){return t.resume()})),this}},{key:"stop",value:function(t){return Q(this,B).forEach((function(n){return n.stop(t)})),this}},{key:"tweenables",get:function(){return F(Q(this,B))}},{key:"promises",get:function(){return Q(this,B).map((function(t){return t._promise}))}}])&&q(n.prototype,e),r&&q(n,r),t}();function R(t,n,e,r,i,u){var o,a,c=0,f=0,s=0,l=0,h=0,p=0,d=function(t){return((c*t+f)*t+s)*t},v=function(t){return(3*c*t+2*f)*t+s},y=function(t){return t>=0?t:0-t};return c=1-(s=3*n)-(f=3*(r-n)-s),l=1-(p=3*e)-(h=3*(i-e)-p),o=t,a=function(t){return 1/(200*t)}(u),function(t){return((l*t+h)*t+p)*t}(function(t,n){var e,r,i,u,o,a;for(i=t,a=0;a<8;a++){if(u=d(i)-t,y(u)<n)return i;if(o=v(i),y(o)<1e-6)break;i-=u/o}if((i=t)<(e=0))return e;if(i>(r=1))return r;for(;e<r;){if(u=d(i),y(u-t)<n)return i;t>u?e=i:r=i,i=.5*(r-e)+e}return i}(o,a))}var z=function(t,n,e,r,i){var u=function(t,n,e,r){return function(i){return R(i,t,n,e,r,1)}}(n,e,r,i);return u.displayName=t,u.x1=n,u.y1=e,u.x2=r,u.y2=i,o.a.formulas[t]=u},L=function(t){return delete o.a.formulas[t]};o.a.filters.token=r}])}));
//# sourceMappingURL=shifty.js.map

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// Semi-SemiCircle shaped progress bar

var Shape = __webpack_require__(1);
var Circle = __webpack_require__(3);
var utils = __webpack_require__(0);

var SemiCircle = function SemiCircle(container, options) {
    // Use one arc to form a SemiCircle
    // See this answer http://stackoverflow.com/a/10477334/1446092
    this._pathTemplate =
        'M 50,50 m -{radius},0' +
        ' a {radius},{radius} 0 1 1 {2radius},0';

    this.containerAspectRatio = 2;

    Shape.apply(this, arguments);
};

SemiCircle.prototype = new Shape();
SemiCircle.prototype.constructor = SemiCircle;

SemiCircle.prototype._initializeSvg = function _initializeSvg(svg, opts) {
    svg.setAttribute('viewBox', '0 0 100 50');
};

SemiCircle.prototype._initializeTextContainer = function _initializeTextContainer(
    opts,
    container,
    textContainer
) {
    if (opts.text.style) {
        // Reset top style
        textContainer.style.top = 'auto';
        textContainer.style.bottom = '0';

        if (opts.text.alignToBottom) {
            utils.setStyle(textContainer, 'transform', 'translate(-50%, 0)');
        } else {
            utils.setStyle(textContainer, 'transform', 'translate(-50%, 50%)');
        }
    }
};

// Share functionality with Circle, just have different path
SemiCircle.prototype._pathString = Circle.prototype._pathString;
SemiCircle.prototype._trailString = Circle.prototype._trailString;

module.exports = SemiCircle;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// Square shaped progress bar
// Note: Square is not core part of API anymore. It's left here
//       for reference. square is not included to the progressbar
//       build anymore

var Shape = __webpack_require__(1);
var utils = __webpack_require__(0);

var Square = function Square(container, options) {
    this._pathTemplate =
        'M 0,{halfOfStrokeWidth}' +
        ' L {width},{halfOfStrokeWidth}' +
        ' L {width},{width}' +
        ' L {halfOfStrokeWidth},{width}' +
        ' L {halfOfStrokeWidth},{strokeWidth}';

    this._trailTemplate =
        'M {startMargin},{halfOfStrokeWidth}' +
        ' L {width},{halfOfStrokeWidth}' +
        ' L {width},{width}' +
        ' L {halfOfStrokeWidth},{width}' +
        ' L {halfOfStrokeWidth},{halfOfStrokeWidth}';

    Shape.apply(this, arguments);
};

Square.prototype = new Shape();
Square.prototype.constructor = Square;

Square.prototype._pathString = function _pathString(opts) {
    var w = 100 - opts.strokeWidth / 2;

    return utils.render(this._pathTemplate, {
        width: w,
        strokeWidth: opts.strokeWidth,
        halfOfStrokeWidth: opts.strokeWidth / 2
    });
};

Square.prototype._trailString = function _trailString(opts) {
    var w = 100 - opts.strokeWidth / 2;

    return utils.render(this._trailTemplate, {
        width: w,
        strokeWidth: opts.strokeWidth,
        halfOfStrokeWidth: opts.strokeWidth / 2,
        startMargin: opts.strokeWidth / 2 - opts.trailWidth / 2
    });
};

module.exports = Square;


/***/ })
/******/ ]);
//# sourceMappingURL=app.bundle.js.map