import {Stream} from '../Stream';

const _stream = Symbol("stream");

export class Stdout extends Stream
{
    get name () {
        return 'stdout';
    }

    get args () {
        return [];
    }

    get stream () {
        return this[_stream];
    }

    start (proc) {
        if (this.stream) return;

        super.start(proc);

        this[_stream] = proc.stdout;
    }
}