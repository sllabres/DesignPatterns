var gulp = require('gulp'),
    watch = require('gulp-watch'),
    qunit = require('node-qunit-phantomjs');

gulp.task('test', function() {
	watch('*.js', function() {
	qunit('./testrunner.html');
	});
});
