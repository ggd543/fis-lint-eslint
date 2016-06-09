require('colors');
const eslint = require('eslint');
const CLIEngine = eslint.CLIEngine;

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

  const globals = Object.keys(conf.globals || {}).map(k => `${k}:${conf.globals[k]}`);
  conf.globals = globals;

  const cli = new CLIEngine(conf);

  const report = cli.executeOnText(content, file.realpath);
  const formatter = cli.getFormatter();
  if (report.errorCount > 0 || report.warningCount > 0) {
    console.log(formatter(report.results));
  }

};
