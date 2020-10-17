const { Transform } = require('stream');
const Vinyl = require('vinyl');
const PluginError = require('plugin-error');
const sass = require('sass');

const pluginName = '@rbnlffl/gulp-sass';

module.exports = (options = {}) => {
  const stream = new Transform({
    objectMode: true
  });

  stream._transform = (file, _encoding, done) => {
    const sassOptions = {
      file: file.path,
      ...file.sourceMap && {
        sourceMap: file.relative.replace(file.extname, '.css'),
        omitSourceMapUrl: true,
        sourceMapContents: true
      },
      ...options
    };

    if (file.isNull()) {
      return done(null, file);
    }

    if (file.isStream()) {
      return stream.emit('error', new PluginError(pluginName, 'Streams are not supported!'));
    }

    if (file.basename.startsWith('_')) {
      return done();
    }

    try {
      const result = sass.renderSync(sassOptions);

      const cssFile = new Vinyl({
        cwd: file.cwd,
        base: file.base,
        path: file.path.replace(file.extname, '.css'),
        contents: result.css,
        ...file.sourceMap && {
          sourceMap: JSON.parse(result.map.toString())
        }
      });

      stream.push(cssFile);
    } catch (renderError) {
      stream.emit('error', new PluginError(pluginName, renderError));
    }

    return done();
  };

  return stream;
};
