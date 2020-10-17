import { Options } from 'sass';
import { Transform } from 'stream';

declare function sass(options?: Options): Transform;

export = sass;
