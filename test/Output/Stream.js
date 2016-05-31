import {expect}        from 'chai';
import {ShairportSync} from '../../src/ShairportSync';
import {Output}        from '../../src/Output';
import {Stream}        from '../../src/Output/Stream';

describe('Stream', () => {
    it('must extends Output class', () => {
        const instance = new Stream();

        expect(instance).to.be.instanceof(Output);
    });

    it('throw error on unoverrided methods', () => {
        const instance = new Stream();

        expect(function () { instance.stream; }).to.throw(Error, 'Stream::stream must be implemented.');
    });

    it("expose a read-only stream property", () => {
        const instance = new Stream();

        expect(() => instance.stream = 1).to.throw(TypeError);
    });
});