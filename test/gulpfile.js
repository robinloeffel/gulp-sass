import gulp from "gulp";
import sass from "../dist/index.js";

gulp.task("default", () => gulp.src("fixtures/*.scss", {
    sourcemaps: true
  })
  .pipe(sass({
    style: "compressed"
  }))
  .pipe(gulp.dest("results", {
    sourcemaps: "."
  })));
