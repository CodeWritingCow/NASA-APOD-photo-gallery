'use strict';

var gulp = require('gulp'),
	gulpNgConfig = require('gulp-ng-config');

var configureSetup = {
	createModule: false,
	constants: {
		token: process.env.TOKEN
	}
};

gulp.task('config', function() {
	gulp.src('config.json')
		.pipe(gulpNgConfig('photoApp', configureSetup))
		.pipe(gulp.dest('.'));
});