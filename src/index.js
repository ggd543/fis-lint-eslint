'use strict';
/*eslint quotes: 0*/

require('colors');

export default (content, file, conf) => {
  let ignored = [];
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
  let linter = require("eslint").linter;
  let ret = linter.verify(content, conf);
  let outputs = [];
  outputs.columnWidths = new Array(4).fill(0);
  ret.forEach(e => {
    if (e.fatal || e.severity) {
      var strs = [e.line + ':' + e.column, (e.severity === 1 ? 'warning'.yellow : 'error'.red),  e.message, (e.ruleId || '').gray];
      outputs.columnWidths = strs.map((s, j) => Math.max(outputs.columnWidths[j], s.length));
      outputs.push(strs);
    }
  });
  if (outputs.length > 0) {
    console.log('\n', file.subpath);
    outputs.forEach(strs => {
      strs = strs.map((s, j) => s + ' '.repeat(outputs.columnWidths[j] - s.length));
      let s = strs.reduce((prevVal, curVal) => {
        return prevVal + curVal + '  ';
      }, ' '.repeat(2));
      console.log(s);
    });
  }
};

