'use strict';

var gulp = require('gulp');
var env = require('gulp-util').env;
var log = require('gulp-util').log;
var dateformat = require('gulp-util').date;
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var header = require('gulp-header');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var gulpConventionalChangelog = require('gulp-conventional-changelog');

var now = new Date();
var year = dateformat(now, "yyyy");
var pkg = require('./package.json');
var banner = [
  '/*!',
  ' * <%= pkg.name %> v<%= pkg.version %>',
  ' * The <%= pkg.license %> License',
  ' * Copyright (c) <%= year %> <%= pkg.authors.join(",") %>',
  ' */',
  '\n'
  ].join('\n');

var codeFiles = ['canvas-draw.html'];
      
gulp.task('lint', function(){
  log('Linting Files');
  return gulp.src(codeFiles)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter());
});

gulp.task('build', function() {
  return gulp.src(codeFiles)
    .pipe(uglify({'evil': true}))
    .pipe(header(banner, { pkg: pkg, year: year }))
    .pipe(rename({
      ext: ".min.js"
    }))
    .pipe(gulp.dest(''));
});

gulp.task('changelog', function() {
  return gulp
    .src(['package.json', 'CHANGELOG.md'])
    .pipe(gulpConventionalChangelog())
    .pipe(gulp.dest('.')); // will output one file only
});

gulp.task('default', ['build']);

