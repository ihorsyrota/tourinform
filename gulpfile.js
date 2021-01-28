let gulp = require('gulp'),
    sass = require('gulp-sass'),
    concatCss = require('gulp-concat-css'),
    concat = require('gulp-concat'),
    cssmin = require('gulp-cssmin');


//sass compiler task
gulp.task('sass', function () {
    gulp.src('assets/sass/*.+(scss|sass)')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('assets/sass/styles'));
});
//minify css task
gulp.task('mincss', function () {
    return gulp.src('assets/sass/styles/*.css')
        .pipe(concatCss("main.min.css"))
        .pipe(cssmin())
        .pipe(gulp.dest('public/css'));
});

//concat js libs task (It necessary if there are many libs)
gulp.task('scripts', function () {
    return gulp.src([
        'assets/js/lib/jquery.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
        'node_modules/slick-carousel/slick/slick.min.js',
        'assets/js/common.js'])
        .pipe(concat('main.min.js'))
        .pipe(gulp.dest('public/js'));
});
//watch task (tracks changes in files)
gulp.task('watch', function () {
    gulp.watch('assets/sass/**/*.+(scss|sass)', ['sass']);
    gulp.watch('assets/sass/styles/*.css', ['mincss']);
    gulp.watch('assets/js/*.js', ['scripts']);
});

//icons
var async = require('async');
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');
var consolidate = require('gulp-consolidate');
var fontName = 'icons-font';

gulp.task('iconfont', function (done) {
    var iconStream = gulp.src(['assets/icons/*.svg'])
        .pipe(iconfontCss({
            fontName: fontName,
            path: 'assets/templates/font-style.scss',
            targetPath: '../../../assets/sass/core_project/_icons.scss',
            fontPath: '../css/fonts/'
        }))
        .pipe(iconfont({fontName: 'icons-font', normalize: true, fontHeight: 1001}));

    async.parallel([
        function handleGlyphs(cb) {
            iconStream.on('glyphs', function (glyphs, options) {
                gulp.src('../templates/font-style.css')
                    .pipe(consolidate('lodash', {
                        glyphs: glyphs,
                        fontName: fontName,
                        path: 'assets/templates/font-style.scss',
                        targetPath: '../../../assets/sass/core_project/_icons.scss',
                        fontPath: '../css/fonts/'
                    }))
                    .pipe(gulp.dest('assets/css/'))
                    .on('finish', cb);
            });
        },
        function handleFonts(cb) {
            iconStream
                .pipe(gulp.dest('public/css/fonts/'))
                .on('finish', cb);
        }
    ], done);
});


gulp.task('default', ['sass', 'mincss', 'scripts', 'iconfont', 'watch']);

