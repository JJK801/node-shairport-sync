import _               from 'lodash';
import {expect}        from 'chai';
import {ShairportSync} from '../../../src/ShairportSync';
import {Output}        from '../../../src/Output';
import {Stream}        from '../../../src/Output/Stream';
import {Pipe}          from '../../../src/Output/Stream/Pipe';
import {ChildProcess}  from 'child_process';
import fs              from 'fs';
import {Readable}      from 'stream';
import sinon           from 'sinon';

describe('Pipe', () => {
    const createReadStream = fs.createReadStream;
    const streamMock       = sinon.spy(() => new Readable());

    before(() => {
        sinon.stub(fs, 'createReadStream', streamMock);
    });

    beforeEach(() => {
        streamMock.reset();
    });

    after(() => {
        fs.createReadStream = createReadStream;
    });

    it('must extends Output class', () => {
        const instance = new Pipe();

        expect(instance).to.be.instanceof(Output);
    });

    it('must extends Stream class', () => {
        const instance = new Pipe();

        expect(instance).to.be.instanceof(Stream);
    });

    it('is named "pipe"', () => {
        const instance = new Pipe();

        expect(instance.name).to.equal('pipe');
    });

    it('expose a "file" property with that can be changed until process start', () => {
        const instance = new Pipe();
        const proc     = new ChildProcess();

        instance.file = '/some/file/path';

        expect(instance.file).to.equal('/some/file/path');

        instance.file = '/some/other/file/path';

        expect(instance.file).to.equal('/some/other/file/path');

        instance.start(proc);

        instance.file = '/some/third/file/path';

        expect(instance.file).to.equal('/some/other/file/path');
    });

    it('provide only "file" in args', () => {
        const instance = new Pipe();

        instance.file = '/some/file/path';

        expect(instance.args).to.eql([instance.file]);
    });

    it('throw error if missing filename on start', () => {
        const instance = new Pipe();

        expect(_.bind(instance.start, instance)).to.throw(undefined, 'Pipe::file must be set before process start')
    });

    it('expose a stream property with the file read stream', () => {
        const instance = new Pipe();
        const proc     = new ChildProcess();

        instance.file = '/some/file/path';

        expect(instance.stream).to.be.undefined;

        instance.start(proc);

        expect(instance.stream).to.equal(streamMock.returnValues[0]);
        expect(instance.stream).to.equal(streamMock.returnValues[0]); // Ensure it memoize the stream created
    });
});