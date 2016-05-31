import {expect}        from 'chai';
import {ShairportSync} from '../src/ShairportSync';
import {Output}        from '../src/Output';
import {ChildProcess}  from 'child_process';

describe('Output', () => {
    it('throw error on unoverrided methods', () => {
        const instance = new Output();

        expect(function () { instance.name; }).to.throw(Error, 'Output::name must be implemented.');
        expect(function () { instance.args; }).to.throw(Error, 'Output::args must be implemented.');
    });

    it('throw error on bad process', () => {
        const instance = new Output();

        expect(function () { instance.start(); }).to.throw(undefined, 'Output::start() Argument#1 must be an instanceof ChildProcess');
        expect(function () { instance.start({}); }).to.throw(undefined, 'Output::start() Argument#1 must be an instanceof ChildProcess');
        expect(function () { instance.start(new ChildProcess()); }).to.not.throw();
    });

    it("expose a read-only name property", () => {
        const instance = new Output();

        expect(() => instance.name = 1).to.throw(TypeError);
    });

    it("expose a read-only args property", () => {
        const instance = new Output();

        expect(() => instance.args = 1).to.throw(TypeError);
    });

    it("expose a read-only started property which is false by default and became true on start", () => {
        const instance = new Output();

        expect(instance.started).to.equal(false);
        expect(() => instance.started = 1).to.throw(TypeError);

        instance.start(new ChildProcess());

        expect(instance.started).to.equal(true);
    });
});