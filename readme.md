# @rbnlffl/gulp-sass

[![latest version on npm](https://img.shields.io/npm/v/@rbnlffl/gulp-sass)](https://www.npmjs.com/package/@rbnlffl/gulp-sass)
[![npm downloads a month](https://img.shields.io/npm/dm/@rbnlffl/gulp-sass)](https://www.npmjs.com/package/@rbnlffl/gulp-sass)
[![required node version](https://img.shields.io/node/v/@rbnlffl/gulp-sass)](https://github.com/nodejs/Release)
[![dependency status](https://img.shields.io/david/robinloeffel/gulp-sass)](https://david-dm.org/robinloeffel/gulp-sass)
[![gulp peer dep](https://img.shields.io/npm/dependency-version/@rbnlffl/gulp-sass/peer/gulp?label=gulp%20peer%20dep)](https://github.com/gulpjs/gulp)
[![sass dep](https://img.shields.io/npm/dependency-version/@rbnlffl/gulp-sass/sass?label=sass%20dep)](https://github.com/sass/dart-sass)
[![package license](https://img.shields.io/npm/l/@rbnlffl/gulp-sass)](license)

> Lightweight [`gulp`](https://github.com/gulpjs/gulp) wrapper around [`sass`](https://github.com/sass/dart-sass). 🏄🏼‍♂️

Nicely integrates the most recent version of [`sass`](https://github.com/sass/dart-sass) (`dart-sass`) into a [`gulp`](https://github.com/gulpjs/gulp) plugin.

## How

```sh
yarn add @rbnlffl/gulp-sass --dev
```

```js
const sass = require('@rbnlffl/gulp-sass');

gulp.task('css', () => {
  return gulp.src('source/css/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist'));
});
```

## Config

The plugin takes an options object and passes it directly to `sass`. You can see a full documentation of what props are available [here](https://sass-lang.com/documentation/js-api#options). Mind you that directly manipulating options regarding the file input and sourcemaps output is strongly discouraged, as this gets handled by the plugin itself. Below you'll find the most common options.

### `includePaths`

Type: `string[]`<br>
Default: `undefined`<br>

Tells `sass` where it can look for files to import from. A popular use case would be `node_modules`.

### `outputStyle`

Type: `string`<br>
Default: `'expanded'`<br>

Controls the output style of the emitted CSS chunks. Valid options are `'expanded'` and `'compressed'`.

### `indentType`

Type: `string`<br>
Default: `'space'`<br>

Whether to use a `space` or a `tab` character to use for indentation. Used together with [`indentWidth`](#indentwidth).

### `indentWidth`

Type: `number`<br>
Default: `2`<br>

How many `space` or `tab` characters should be used per indentation level.

## Why a new plugin?

Because [`gulp-sass`](https://github.com/dlmanning/gulp-sass) uses [`node-sass`](https://github.com/sass/node-sass) under the hood, which in turn relies on [`node-gyp`](https://github.com/nodejs/node-gyp) and needs to be built every fresh install. This is prone to leading to compile errors on newer versions of macOS. See [here](https://github.com/nodejs/node-gyp/blob/master/macOS_Catalina.md), for example.

## License

MIT
