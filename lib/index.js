'use strict';
/*eslint quotes: 0*/

Object.defineProperty(exports, '__esModule', {
  value: true
});
require('colors');

exports['default'] = function (content, file, conf) {
  var ignored = [];
  if (conf.ignored) {
    if (typeof conf.ignored === 'string' || fis.util.is(conf.ignored, 'RegExp')) {
      ignored = [conf.ignored];
    } else if (fis.util.is(conf.ignored, 'Array')) {
      ignored = conf.ignored;
    }
    delete conf.ignored;
  }
  if (ignored) {
    for (var i = 0, len = ignored.length; i < len; i++) {
      if (fis.util.filter(file.subpath, ignored[i])) {
        return;
      }
    }
  }
  var linter = require("eslint").linter;
  var ret = linter.verify(content, conf);
  var outputs = [];
  outputs.columnWidths = new Array(4).fill(0);
  ret.forEach(function (e) {
    if (e.fatal || e.severity) {
      var strs = [e.line + ':' + e.column, e.severity === 1 ? 'warning'.yellow : 'error'.red, e.message, (e.ruleId || '').gray];
      outputs.columnWidths = strs.map(function (s, j) {
        return Math.max(outputs.columnWidths[j], s.length);
      });
      outputs.push(strs);
    }
  });
  if (outputs.length > 0) {
    console.log('\n', file.subpath);
    outputs.forEach(function (strs) {
      strs = strs.map(function (s, j) {
        return s + ' '.repeat(outputs.columnWidths[j] - s.length);
      });
      var s = strs.reduce(function (prevVal, curVal) {
        return prevVal + curVal + '  ';
      }, ' '.repeat(2));
      console.log(s);
    });
  }
};

module.exports = exports['default'];