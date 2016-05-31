import {expect}        from 'chai';
import {ShairportSync} from '../../../src/ShairportSync';
import {Output}        from '../../../src/Output';
import {Stream}        from '../../../src/Output/Stream';
import {Stdout}        from '../../../src/Output/Stream/Stdout';
import {ChildProcess}  from 'child_process';
import {Readable}      from 'stream';

describe('Stdout', () => {
    it('extends Output class', () => {
        const instance = new Stdout();

        expect(instance).to.be.instanceof(Output);
    });

    it('extends Stream class', () => {
        const instance = new Stdout();

        expect(instance).to.be.instanceof(Stream);
    });

    it('expose a stream property with received proc stdout', () => {
        const instance    = new Stdout();
        const proc        = new ChildProcess();
              proc.stdout = new Readable();

        expect(instance.stream).to.be.undefined;

        instance.start(proc);

        expect(instance.stream).to.equal(proc.stdout);
    });

    it('is named "stdout"', () => {
        const instance = new Stdout();

        expect(instance.name).to.equal('stdout');
    });

    it('provide empty args', () => {
        const instance = new Stdout();

        expect(instance.args).to.eql([]);
    });
});