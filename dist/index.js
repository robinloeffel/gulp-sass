"use strict";
const node_stream_1 = require("node:stream");
const node_buffer_1 = require("node:buffer");
const sass_1 = require("sass");
module.exports = (options) => new node_stream_1.Transform({
    objectMode: true,
    transform: (file, _encoding, done) => {
        const sassOptions = {
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
            const result = (0, sass_1.compile)(file.path, sassOptions);
            file.contents = node_buffer_1.Buffer.from(result.css);
            file.extname = ".css";
            if (Boolean(file.sourceMap) && Boolean(result.sourceMap)) {
                file.sourceMap = result.sourceMap;
            }
            return done(null, file);
        }
        catch {
            return done(new Error("Sass compilation failed!"), file);
        }
    }
});
