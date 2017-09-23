var gulp = require('gulp');
var postcss = require('gulp-postcss');
var del = require('del');
var autoprefixer = require('autoprefixer');
const babel = require('gulp-babel');
var minify = require('gulp-minify');

gulp.task('rm', function() {
  // You can use multiple globbing patterns as you would with `gulp.src`
  return del(['dist/**']);
});
gulp.task('postcss',['rm'], function () {
  var postcss      = require('gulp-postcss');
  var sourcemaps   = require('gulp-sourcemaps');
  var autoprefixer = require('autoprefixer');
  return gulp.src('./src/*.css')
      .pipe(sourcemaps.init())
      .pipe(postcss([autoprefixer() ]))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('./dist'));
});
gulp.task('postcss-watch', function () {
  var postcss      = require('gulp-postcss');
  var sourcemaps   = require('gulp-sourcemaps');
  var autoprefixer = require('autoprefixer');
  return gulp.src('./src/*.css')
      .pipe(sourcemaps.init())
      .pipe(postcss([autoprefixer() ]))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('./dist'));
});
gulp.task('babel', ['rm'],function(){
gulp.src('./src/index.js')
  .pipe(babel({
    presets: ['env']
  }))
  .pipe(minify({
    noSource:true,
    ext:{min:'.js'}
  }))
  .pipe(gulp.dest('./dist'))
  gulp.src('./src/playing.js')
  .pipe(babel({
    presets: ['env']
  }))
  .pipe(minify({
    noSource:true,
    ext:{min:'.js'}
  }))
  .pipe(gulp.dest('./dist'))
});

gulp.task('babel-watch', ['rm'],function(){
  gulp.src('./src/index.js')
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(minify({
      noSource:true,
      ext:{min:'.js'}
    }))
    .pipe(gulp.dest('./dist'))
    gulp.src('./src/playing.js')
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(minify({
      noSource:true,
      ext:{min:'.js'}
    }))
    .pipe(gulp.dest('./dist'))
  });


gulp.task('watch',function(){
  var watcher1 = gulp.watch('src/*.js', ['babel-watch']);
  watcher1.on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
  var watcher2 = gulp.watch('src/*.css', ['postcss-watch']);
  watcher2.on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
})





gulp.task('default',['rm','postcss','babel'])
