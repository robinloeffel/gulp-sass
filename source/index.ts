import { Buffer } from "node:buffer";
import { Transform } from "node:stream";
import { compile, type Options } from "sass";
import type { BufferFile } from "vinyl";

const plugin = (options?: Options<"sync">) => new Transform({
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
      done(null, file);
      return;
    }

    if (file.isStream()) {
      done(new Error("Streams are not supported!"), file);
      return;
    }

    if (file.basename.startsWith("_")) {
      done();
      return;
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

      done(null, file);
    } catch {
      done(new Error("Sass compilation failed!"), file);
    }
  }
});

export default plugin;
