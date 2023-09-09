import { Transform } from "node:stream";
import { Buffer } from "node:buffer";

import { type BufferFile } from "vinyl";
import { compile, type Options } from "sass";

export = (options: Options<"sync">) => new Transform({
  objectMode: true,
  transform: (file: BufferFile, _encoding, done) => {
    const sassOptions: Options<"sync"> = {
      ...Boolean(file.sourceMap) && {
        sourceMap: true,
        sourceMapIncludeSources: true
      },
      ...options
    };

    if (file.isNull()) {
      return done(null, file);
    }

    if (file.isStream()) {
      return done(new Error("Streams are not supported!"), file);
    }

    if (file.basename.startsWith("_")) {
      return done();
    }

    try {
      const result = compile(file.path, sassOptions);

      file.contents = Buffer.from(result.css);
      file.extname = ".css";

      if (Boolean(file.sourceMap) && Boolean(result.sourceMap)) {
        file.sourceMap = {
          file: file.relative,
          ...result.sourceMap
        };
      }

      return done(null, file);
    } catch {
      return done(new Error("Sass compilation failed!"), file);
    }
  }
});
