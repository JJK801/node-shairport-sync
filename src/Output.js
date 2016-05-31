import assert          from 'assert';
import {ShairportSync} from './ShairportSync';
import {ChildProcess}  from 'child_process';

const _started = Symbol("started");

export class Output
{
    constructor () {
        this[_started] = false;
    }

    get name () {
        throw new Error(this.constructor.name+'::name must be implemented.');
    }

    get args () {
        throw new Error(this.constructor.name+'::args must be implemented.');
    }

    get started () {
        return this[_started];
    }

    start (proc) {
        if (this.started) return;

        assert(proc instanceof ChildProcess, this.constructor.name + '::start() Argument#1 must be an instanceof ChildProcess');

        this[_started] = true;
    }
}