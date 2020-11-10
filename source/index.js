const { Transform } = require('stream');
const path = require('path');
const PluginError = require('plugin-error');
const applySourceMap = require('vinyl-sourcemaps-apply');
const sass = require('sass');

const pluginName = '@rbnlffl/gulp-sass';

module.exports = (options = {}) => new Transform({
  objectMode: true,
  transform(file, _encoding, done) {
    const sassOptions = {
      file: file.path,
      ...file.sourceMap && {
        sourceMap: file.path,
        omitSourceMapUrl: true,
        sourceMapContents: true
      },
      ...options
    };

    if (file.isNull()) {
      return done(null, file);
    }

    if (file.isStream()) {
      return this.emit('error', new PluginError(pluginName, 'Streams are not supported!'));
    }

    if (file.basename.startsWith('_')) {
      return done();
    }

    try {
      const result = sass.renderSync(sassOptions);

      if (file.sourceMap && result.map) {
        const resultMap = JSON.parse(result.map.toString());
        resultMap.file = resultMap.file.replace('file://', '');
        resultMap.file = path.basename(resultMap.file);
        applySourceMap(file, resultMap);
      }

      file.contents = result.css;
      file.extname = '.css';

      return done(null, file);
    } catch (renderError) {
      return this.emit('error', new PluginError(pluginName, renderError));
    }
  }
});

