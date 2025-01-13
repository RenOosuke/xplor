// cssVars({
//     // Targets
//     rootElement   : document,
//     shadowDOM     : false,
  
//     // Sources
//     include       : 'link[rel=stylesheet],style',
//     exclude       : '',
//     variables     : {},
  
//     // Options
//     onlyLegacy    : true,
//     preserveStatic: true,
//     preserveVars  : true,
//     silent        : false,
//     updateDOM     : true,
//     updateURLs    : true,
//     watch         : true,
  
//     // Callbacks
//     onBeforeSend: function(xhr, elm, url) {
//       // ...
//     },
//     onError: function(message, elm, xhr, url) {
//       // ...
//     },
//     onWarning: function(message) {
//       // ...
//     },
//     onSuccess: function(cssText, elm, url) {
//       // ...
//     },
//     onComplete: function(cssText, styleElms, cssVariables, benchmark) {
//       // ...
//     },
//     onFinally: function(hasChanged, hasNativeSupport, benchmark) {
//       // ...
//     }
// });

if (typeof Object.assign !== 'function') {
    Object.assign = function (target) {
      if (target == null) {
        // TypeError if undefined or null
        throw new TypeError('Cannot convert undefined or null to object');
      }
      var to = Object(target);
      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];
        if (nextSource != null) {
          // Skip over if undefined or null
          for (var key in nextSource) {
            if (Object.prototype.hasOwnProperty.call(nextSource, key)) {
              to[key] = nextSource[key];
            }
          }
        }
      }
      return to;
    };
  }
 
if (!Array.prototype.fill) {
Object.defineProperty(Array.prototype, 'fill', {
    value: function value(_value, start, end) {
    if (this == null) {
        throw new TypeError('Array.prototype.fill called on null or undefined');
    }
    var O = Object(this);
    var len = O.length >>> 0;
    var relativeStart = start === undefined ? 0 : start >> 0;
    var k = relativeStart < 0 ? Math.max(len + relativeStart, 0) : Math.min(relativeStart, len);
    var relativeEnd = end === undefined ? len : end >> 0;
    var final = relativeEnd < 0 ? Math.max(len + relativeEnd, 0) : Math.min(relativeEnd, len);
    while (k < final) {
        O[k] = _value;
        k++;
    }
    return O;
    }
});
}