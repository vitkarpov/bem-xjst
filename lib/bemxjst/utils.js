var AMP = '&amp;';
var LT = '&lt;';
var GT = '&gt;';
var QUOT = '&quot;';
var SINGLE_QUOT = '&#39;';

var AMP_RE = /&/g;
var QUOT_RE = /"/g;
var SINGLE_QUOT_RE = /'/g;
var LT_RE = /</g;
var GT_RE = />/g;

exports.xmlEscape = function(str) {
  str = str + '';

  var i = str.length;
  var escapes = 0; // 1 — escape '&', 2 — escape '<', 4 — escape '>'

  while (i--) {
    switch (str[i]) {
      case '&':
        escapes |= 1;
      break;

      case '<':
        escapes |= 2;
      break;

      case '>':
        escapes |= 4;
      break;
    }
  }

  if (escapes & 1)
    str = str.replace(AMP_RE, AMP);

  if (escapes & 2)
    str = str.replace(LT_RE, LT);

  if (escapes & 4)
    str = str.replace(GT_RE, GT);

  return str;
};

exports.attrEscape = function(str) {
  str = str + '';

  var i = str.length;
  var escapes = 0; // 1 — escape '&', 2 — escape '"'

  while (i--) {
    switch (str[i]) {
      case '&':
        escapes |= 1;
      break;

      case '"':
        escapes |= 2;
      break;
    }
  }

  if (escapes & 1)
    str = str.replace(AMP_RE, AMP);

  if (escapes & 2)
    str = str.replace(QUOT_RE, QUOT);

  return str;
};

exports.jsAttrEscape = function(str) {
  str = str + '';

  var i = str.length;
  var escapes = 0; // 1 — escape '&', 2 — escape "'"

  while (i--) {
    switch (str[i]) {
      case '&':
        escapes |= 1;
      break;

      case '\'':
        escapes |= 2;
      break;
    }
  }

  if (escapes & 1)
    str = str.replace(AMP_RE, AMP);

  if (escapes & 2)
    str = str.replace(SINGLE_QUOT_RE, SINGLE_QUOT);

  return str;
};

exports.extend = function extend(o1, o2) {
  if (!o1 || !o2)
    return o1 || o2;

  var res = {};
  var n;

  for (n in o1)
    if (o1.hasOwnProperty(n))
      res[n] = o1[n];
  for (n in o2)
    if (o2.hasOwnProperty(n))
      res[n] = o2[n];
  return res;
};

var SHORT_TAGS = { // hash for quick check if tag short
  area: 1, base: 1, br: 1, col: 1, command: 1, embed: 1, hr: 1, img: 1,
  input: 1, keygen: 1, link: 1, meta: 1, param: 1, source: 1, wbr: 1
};

exports.isShortTag = function isShortTag(t) {
  return SHORT_TAGS.hasOwnProperty(t);
};

exports.isSimple = function isSimple(obj) {
  if (!obj || obj === true) return true;
  if (!obj.block &&
      !obj.elem &&
      !obj.tag &&
      !obj.cls &&
      !obj.attrs &&
      obj.hasOwnProperty('html') &&
      isSimple(obj.html))
    return true;
  return typeof obj === 'string' || typeof obj === 'number';
};

exports.isObj = function isObj(val) {
  return val && typeof val === 'object' && !Array.isArray(val) &&
    val !== null;
};

var uniqCount = 0;
var uniqId = +new Date();
var uniqExpando = '__' + uniqId;
var uniqPrefix = 'uniq' + uniqId;

function getUniq() {
  return uniqPrefix + (++uniqCount);
}
exports.getUniq = getUniq;

exports.identify = function identify(obj, onlyGet) {
  if (!obj)
    return getUniq();
  if (onlyGet || obj[uniqExpando])
    return obj[uniqExpando];

  var u = getUniq();
  obj[uniqExpando] = u;
  return u;
};

exports.fnToString = function fnToString(code) {
  // It is fine to compile without templates at first
  if (!code)
    return '';

  if (typeof code === 'function') {
    // Examples:
    //   function () { … }
    //   function name() { … }
    //   function (a, b) { … }
    //   function name(a, b) { … }
    var regularFunction = /^function\s*[^{]+{|}$/g;

    // Examples:
    //   () => { … }
    //   (a, b) => { … }
    //   _ => { … }
    var arrowFunction = /^(_|\(\w|[^=>]+\))\s=>\s{|}$/g;

    code = code.toString();
    code = code.replace(
      code.indexOf('function') === 0 ? regularFunction : arrowFunction,
    '');
  }

  return code;
};

/**
 * regexp for check may attribute be unquoted
 *
 * https://www.w3.org/TR/html4/intro/sgmltut.html#h-3.2.2
 * https://www.w3.org/TR/html5/syntax.html#attributes
 */
var UNQUOTED_ATTR_REGEXP = /^[:\w.-]+$/;

exports.isUnquotedAttr = function isUnquotedAttr(str) {
  return str && UNQUOTED_ATTR_REGEXP.exec(str);
};
