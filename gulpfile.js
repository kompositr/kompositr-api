var gulp = require("gulp"),
    tslint = require("gulp-tslint"),
    tsc = require("gulp-typescript"),
    uglify = require("gulp-uglify"),
    runSequence = require("run-sequence"),
    jasmine = require("gulp-jasmine"),
    istanbul = require("gulp-istanbul");

var tsProject = tsc.createProject("tsconfig.json");

gulp.task("lint", () => {
    return gulp.src([
        "src/server/**/**.ts",
        "!node_modules/**",
        "!src/server/typings/**"
    ])
        .pipe(tslint({ formatter: "verbose" }))
        .pipe(tslint.report({
            summarizeFailureOutput: true
        }));
});

gulp.task("build-app", () => {
    return gulp.src([
        "src/**/**.ts",
        "!node_modules/**"
    ])
        .pipe(tsProject())
        .js.pipe(gulp.dest("src"));
});

gulp.task('pre-test', function () {
    return gulp.src(['src/server/**/*.js', '!node_modules', '!src/test/**'])
    // .pipe(istanbul({ includedUntested: true }))
    // .pipe(istanbul())
    // .pipe(istanbul.hookRequire())
});

gulp.task("test", ['pre-test'], () => {
    return gulp.src('src/test/**/*.test.js')
        .pipe(jasmine())
    // .pipe(istanbul.writeReports({
    //     dir: './build/unit-test-coverage',
    //     reporters: ['lcov'],
    //     reportOpts: { dir: './build/unit-test-coverage' }
    // }));
});