import assert         from 'assert';
import childProcess   from 'child_process';
import _              from 'lodash';
import {Output}       from './Output';
import {Stdout}       from './Output/Stream/Stdout';
import {EventEmitter} from 'events';

const _name    = Symbol("name");
const _output  = Symbol("output");
const _process = Symbol("process");

export class ShairportSync extends EventEmitter
{
    constructor (output = new Stdout()) {
        super();

        assert(output instanceof Output, 'new ShairportSync() Argument#1 must be an Output instance.')

        this[_output]  = output;
        this[_process] = null;
    }

    set name (name) {
        if (this.process) return;

        this[_name] = name;
    }

    get name () {
        return this[_name];
    }

    get output () {
        return this[_output];
    }

    get process () {
        return this[_process];
    }

    start (config = []) {
        if (this.process) return;

        const spawn = childProcess.spawn;

        assert(_.isArray(config), 'ShairportSync::start() Argument#1 must be an Array.');

        let args = _.chain(config)
                    .clone(true)
                    .filter(opt => !_.includes(['--name', '--output', "-n", "-o"], opt[0]));

        if (this.name) args = args.concat([['--name',   this.name]]);

        args = args.concat([['--output', this.output.name]]);

        if (this.output.args.length) {
            args = args.concat([["--"]]).concat(this.output.args);
        }

        args = args.flatten().value();

        this[_process] = spawn(ShairportSync.command, args);

        this.output.start(this.process);

        this.emit(ShairportSync.Events.START, this);
    }
}

ShairportSync.Events = {
    START: 'start'
}

ShairportSync.command = "shairport-sync";