'use strict';

require('colors');
var eslint = require('eslint');
var CLIEngine = eslint.CLIEngine;

module.exports = function (content, file, conf) {
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

  var globals = Object.keys(conf.globals || {}).map(function (k) {
    return k + ':' + conf.globals[k];
  });
  conf.globals = globals;

  var cli = new CLIEngine(conf);

  var report = cli.executeOnText(content, file.realpath);
  var formatter = cli.getFormatter();
  if (report.errorCount > 0 || report.warningCount > 0) {
    console.log(formatter(report.results));
  }
};