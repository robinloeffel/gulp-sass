const gulp = require("gulp");
const sass = require("../dist");

gulp.task("default", () => gulp.src("fixtures/*.scss", {
    sourcemaps: true
  })
  .pipe(sass({
    style: "compressed"
  }))
  .pipe(gulp.dest("results", {
    sourcemaps: "."
  })));
