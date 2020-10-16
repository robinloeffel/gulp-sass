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
    let sassOptions = {
      file: file.path,
      ...options
    };

    if (file.isNull()) {
      return done(undefined, file);
    }

    if (file.isStream()) {
      stream.emit('error', new PluginError(pluginName, 'Streams are not supported!'));
    }

    if (file.basename.startsWith('_')) {
      return done();
    }

    if (file.sourceMap) {
      sassOptions = {
        sourceMap: file.relative.replace(file.extname, '.css.map'),
        ...sassOptions
      };
    }

    try {
      const result = sass.renderSync(sassOptions);
      const cssFile = new Vinyl({
        cwd: file.cwd,
        base: file.base,
        path: file.path.replace(file.extname, '.css'),
        contents: result.css
      });
      const mapFile = new Vinyl({
        cwd: file.cwd,
        base: file.base,
        path: file.path.replace(file.extname, '.map.css'),
        contents: result.map
      });

      stream.push(cssFile);
      stream.push(mapFile);

      return done();
    } catch (renderError) {
      stream.emit('error', new PluginError(pluginName, renderError));
    }
  };

  return stream;
};
