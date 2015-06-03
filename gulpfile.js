var gulp = require("gulp");
plugins = require("gulp-load-plugins")();
var babelify = require("babelify");
var browserify = require("browserify");
var del = require("del");
var through2 = require('through2');
var pngquant = require("imagemin-pngquant");
var lazypipe = require("lazypipe");
var dist = "dist/";
var report_src = "src/*.md";

var assets_pipeline = lazypipe().pipe(plugins.sourcemaps.init,
  {loadMaps: true, debug: true});


gulp.task("bower", function () {
  return plugins.bower("src/libs");
});

gulp.task("watch-bower", function () {
  gulp.watch(["bower.json"], ["bower"]);
});

gulp.task("sass", ["bower"], function () {
  return gulp.src("src/sass/*.scss")
    .pipe(plugins.newer({dest: "build/css", ext: ".css"}))
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass({precision: 8}))
    .on("error", plugins.util.log)
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest("build/css"));
});

gulp.task("watch-sass", function () {
  gulp.watch(["src/sass/*.scss"], ["sass"]);
});

gulp.task("clean", function () {
  del(dist + "*", {force: true});
});

gulp.task("mrproper", ["clean"], function () {
  del("build/*");
});

gulp.task("nuke", ["mrproper"], function () {
  del("src/libs/*");
});

gulp.task("fonts", function () {
  return gulp.src("src/fonts/*")
    .pipe(plugins.newer(dist + "fonts"))
    .pipe(gulp.dest(dist + "fonts"));
});

gulp.task("pack-svg", function () {
  return gulp.src(["src/img/*.svg"])
    .pipe(plugins.newer(dist + "img"))
    .pipe(plugins.if(["**/*.svg"], plugins.svgmin()))
    .pipe(gulp.dest(dist + "img"));
});

gulp.task("images", function () {
    return gulp.src(["src/img/*.png", "src/img/*.jpg", "!**/_*"])
        .pipe(plugins.newer(dist + "img"))
        .pipe(plugins.imagemin({
            multipass: true,
            progressive: true,
            optimizationLevel: 6,
            use: [pngquant()]
        }))
        .pipe(gulp.dest(dist + "img"));
});

gulp.task("media", ["images", "pack-svg"]);

gulp.task("watch-media", function () {
  gulp.watch(["src/img/*"], ["media"]);
});

gulp.task("browserify", function () {
  return gulp.src("src/js/*.js")
    .pipe(plugins.newer("build/js"))
    .pipe(through2.obj(function (file, enc, next) {
      browserify(file.path, {debug: true})
        .transform(babelify)
        .bundle(function (err, res) {
          if (err) {
            return next(err);
          }
          file.contents = res;
          next(null, file);
        });
    }))
    // Super ugly fix for missing semicolon preventing from concatting
    .pipe(plugins.replace("},{}]},{},[1])", "},{}]},{},[1]);"))
    .pipe(gulp.dest("build/js"))
});

gulp.task("watch-browserify", function () {
  gulp.watch(["src/js/*.js"], ["default"]);
});

gulp.task("markdown", function() {
  return gulp.src(report_src)
      .pipe(plugins.markdown())
      .pipe(plugins.concat("markdown.html", {newLine: "<br><br><hr><br><br>\n"}))
      .pipe(gulp.dest("build"))
});

gulp.task("benchmark", ["sass", "browserify", "markdown"], function () {
  var assets = plugins.useref.assets({}, assets_pipeline);
  return gulp.src("src/benchmark.html")
      .pipe(plugins.nunjucksHtml({
        locals: {date: new Date()},
        searchPaths: ["src", "build"]
      }).on("error", plugins.util.log))
      .pipe(assets)
      .pipe(plugins.if(["**/*.js", "!**/jquery.min.js"],
          plugins.uglify({ie_proof: false}).on("error", plugins.util.log)))
      .pipe(plugins.if("*.css", lazypipe()
          .pipe(plugins.autoprefixer)
          .pipe(plugins.minifyCss,
          {roundingPrecision: -1, keepSpecialComments: 0})()))
      .pipe(plugins.sourcemaps.write("maps"))
      .pipe(assets.restore())
      .pipe(plugins.useref())
      .pipe(plugins.if("*.html", plugins.minifyHtml({empty: true, loose: true})))
      .pipe(gulp.dest(dist));
});

gulp.task("default", ["fonts", "media", "benchmark"]);
