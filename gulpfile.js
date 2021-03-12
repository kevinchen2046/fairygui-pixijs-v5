'use strict';
const gulp = require("gulp");
const minify = require('gulp-minify');
const inject = require("gulp-inject-string");
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');

gulp.task('build.js', () => {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(inject.replace('var fgui;', ''))
        .pipe(inject.prepend('window.fgui = {};\nwindow.fairygui = window.fgui;\n'))
        .pipe(inject.replace('var __extends =', 'window.__extends ='))
        .pipe(minify({ ext: { min: ".min.js" } }))
        .pipe(gulp.dest('./bin'));
});

gulp.task("build.d.ts", ["build.js"], () => {
    return tsProject.src()
        .pipe(tsProject())
        .dts.pipe(inject.append('import fairygui = fgui;'))
        .pipe(gulp.dest('./bin'));
});

gulp.task("build", ["build.d.ts"], () => {
    return gulp.src('bin/**/*')
        .pipe(gulp.dest('../demo/libs/fairygui/'))
});
