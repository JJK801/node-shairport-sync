import assert from 'assert';
import {Stream} from '../Stream';
import {createReadStream} from 'fs';

const _file   = Symbol("file");
const _stream = Symbol("stream");

export class Pipe extends Stream
{
    get name () {
        return 'pipe';
    }

    get args () {
        return [this.file];
    }

    get stream () {
        if (!this.started) return undefined;

        if (!this[_stream]) this[_stream] = createReadStream(this.file);

        return this[_stream];
    }

    get file () {
        return this[_file];
    }

    set file (file) {
        if (this.started) return;

        this[_file] = file;
    }

    start (proc) {
        if (this.started) return;

        assert(this.file, this.constructor.name + '::file must be set before process start');

        super.start(proc);
    }
}