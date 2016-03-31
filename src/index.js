require('colors');
const eslint = require('eslint');

module.exports = (content, file, conf) => {
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
    for (let i = 0, len = ignored.length; i < len; i++) {
      if (fis.util.filter(file.subpath, ignored[i])) {
        return;
      }
    }
  }
  const linter = eslint.linter;
  const ret = linter.verify(content, conf);
  const outputs = [];
  outputs.columnWidths = new Array(4).fill(0);
  ret.forEach(e => {
    if (e.fatal || e.severity) {
      const strs = [`${e.line}:${e.column}`, (e.severity === 1 ? 'warning'.yellow : 'error'.red),
               e.message, (e.ruleId || '').gray];
      outputs.columnWidths = strs.map((s, j) => Math.max(outputs.columnWidths[j], s.length));
      outputs.push(strs);
    }
  });
  if (outputs.length > 0) {
    console.log('\n', file.subpath);
    outputs.forEach(line => {
      const strs = line.map((s, j) => s + ' '.repeat(outputs.columnWidths[j] - s.length));
      const s = strs.reduce((prevVal, curVal) => `${prevVal}${curVal}  `, ' '.repeat(2));
      console.log(s);
    });
  }
};
