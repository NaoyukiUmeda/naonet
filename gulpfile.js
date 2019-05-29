const $ = require('gulp');
const $plumber = require('gulp-plumber');
const $if = require('gulp-if');
const webpack = require('webpack');
const $webpack = require('webpack-stream');
const webpackConfig = require("./webpack.config");
const $postcss = require('gulp-postcss');
const sass = require('postcss-node-sass');
const $sass = require('gulp-sass');
const cssimport = require("postcss-import");
const autoprefixer = require('autoprefixer');
const cssdeclsort = require('css-declaration-sorter');
const mqpacker = require('css-mqpacker');
const cssnano = require('cssnano');
const $rename = require('gulp-rename');
const $sourcemaps = require('gulp-sourcemaps');
const $webserver = require('gulp-webserver');
const assemble = require('assemble');
const $extname = require('gulp-extname');
const bourbon = require('node-bourbon');
const neat = require('node-neat');

const DEV_DIR = 'develop';
const DIST_DIR = 'src/main/resources/static';
const DIST_ASSETS_DIR = DIST_DIR + '/assets';
let isDevelopment = true;
const app = assemble();

// bourbon.with(`${DIST_ASSETS_DIR}/stylesheets`);

$.task('script', () => {

  return $.src([
      `${DEV_DIR}/javascripts/entry/*.js`
    ])
    .pipe($plumber())
    .pipe($webpack(webpackConfig, webpack))
    .pipe($.dest(`${DIST_ASSETS_DIR}/javascripts`));
});

$.task('style', () => {

  const plugins = [
    sass({
      outputStyle: 'expanded'
    }),
    cssimport({
      path: ['node_modules']
    }),
    mqpacker(),
    autoprefixer({
      browsers: ['last 2 version']
    }),
    cssdeclsort({
      order: 'smacss'
    })
  ];
  if (!isDevelopment) {
    plugins.push(cssnano({
      autoprefixer: false,
      zindex: false
    }));
  }

  return $.src([
      `${DEV_DIR}/stylesheets/entry/*.scss`
    ])
    .pipe($plumber({
      errorHandler: function(e) {
        console.error(`\u001b[1;31m'${e.stack}\u001b[0m`);
        this.emit('end');
      }
    }))
    .pipe($if(isDevelopment, $sourcemaps.init()))
    .pipe($postcss(plugins))
    .pipe($sass({
      includePaths: bourbon.with(neat.includePaths)
    }))
    .pipe($rename({
      extname: '.css'
    }))
    .pipe($if(isDevelopment, $sourcemaps.write()))
    .pipe($.dest(`${DIST_ASSETS_DIR}/stylesheets`));
});

$.task('image', () => {
  return $.src([
      'node_modules/leaflet/dist/images/**/*',
      `${DEV_DIR}/images/**/*`
    ])
    .pipe($plumber())
    .pipe($.dest(`${DIST_ASSETS_DIR}/images`));
});

$.task('font', () => {
  return $.src([
      'node_modules/font-awesome/fonts/*'
    ])
    .pipe($.dest(`${DIST_ASSETS_DIR}/fonts`));
});

// $.task('webserver', () => {
//   return $.src(`${DIST_DIR}`)
//     .pipe($webserver({
//       host: '0.0.0.0',
//       // livereload: true,
//       port: 32000
//     }));
// });

$.task('watch', () => {
  $.watch(`${DEV_DIR}/javascripts/**/*`, $.series('script'));
  $.watch(`${DEV_DIR}/stylesheets/**/*`, $.series('style'));
  $.watch(`${DEV_DIR}/images/**/*`, $.series('image'));
});

$.task('develop', $.series($.parallel([
  'script', 'style', 'image', 'font'
]), $.parallel([ /*'webserver', */ 'watch'])));

$.task('default', $.series('develop'));
