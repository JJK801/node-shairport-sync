import {expect}        from 'chai';
import {EventEmitter}  from 'events';
import mockSpawn       from 'mock-spawn';
import childProcess    from 'child_process';
import sinon           from 'sinon';

import {ShairportSync} from '../src/ShairportSync';
import {Output}        from '../src/Output';
import {Stdout}        from '../src/Output/Stream/Stdout';

describe('ShairportSync', () => {
    const spawn     = childProcess.spawn;
    const spawnMock = sinon.spy(() => new childProcess.ChildProcess());
    const command   = ShairportSync.command;

    before(() => {
        sinon.stub(childProcess, 'spawn', spawnMock);
    });

    beforeEach(() => {
        spawnMock.reset();
    });

    after(() => {
        childProcess.spawn = spawn;
    });

    afterEach(() => {
        ShairportSync.command = command;
    });

    it('is instance of EventEmitter', () => {
        const instance = new ShairportSync();

        expect(instance).to.be.an.instanceof(EventEmitter);
    });

    it('take a name that can be changed until process is started', () => {
        const instance = new ShairportSync();

        instance.name = 'My Receiver';

        expect(instance.name).to.equal('My Receiver');

        instance.name = 'My Receiver with new name';

        expect(instance.name).to.equal('My Receiver with new name');

        instance.start();

        instance.name = 'My Receiver name that will not appear';

        expect(instance.name).to.not.equal('My Receiver name that will not appear');
        expect(instance.name).to.equal('My Receiver with new name');
    });

    it("expose a read-only process property null by default", () => {
        const instance = new ShairportSync();

        expect(instance.process).to.be.null;

        expect(() => instance.process = 1).to.throw(TypeError);
    });

    it("fill the process property with spawn result property once started", () => {
        const instance = new ShairportSync();

        instance.start();

        expect(spawnMock.callCount).to.equal(1)
        expect(instance.process).to.equal(spawnMock.returnValues[0]);
    });

    it("expose a read-only output property with injected Output instance", () => {
        let instance = new ShairportSync();

        expect(instance.output).to.be.an.instanceof(Stdout);

        expect(() => instance.process = new Stdout()).to.throw(TypeError);

        const output = new Output();

        instance = new ShairportSync(output);

        expect(instance.output).to.equal(output);

        expect(() => instance.process = output).to.throw(TypeError);
    });

    it("emit an event on first start() with it's reference", () => {
        const instance         = new ShairportSync();
        const eventEmitterStub = sinon.stub(instance, 'emit');

        instance.start();

        expect(eventEmitterStub.called).to.be.true;
        expect(eventEmitterStub.calledWithExactly(ShairportSync.Events.START, instance));

        eventEmitterStub.reset();

        instance.start();

        expect(eventEmitterStub.called).to.be.false;
    });

    it("sync with the output on start", () => {
        const output           = new Output();
        const outputStartStub  = sinon.stub(output, 'start');

        sinon.stub(output, 'name', {get: () => 'test'});
        sinon.stub(output, 'args', {get: () => []});

        const instance         = new ShairportSync(output);

        instance.start();

        expect(outputStartStub.called).to.be.true;
        expect(outputStartStub.calledWithExactly(instance.process));
    });

    it("has a configurable 'command' static property that change spawn command", () => {
        expect(ShairportSync.command).to.equal('shairport-sync');

        ShairportSync.command = 'test';

        const instance = new ShairportSync();

        instance.start();

        expect(spawnMock.firstCall.args[0]).to.equal('test');
    });

    it("handle spawn arguments", () => {
        const instance = new ShairportSync();

        instance.name = 'My Receiver Name';

        instance.start([
            ['--name', 'My badly set name'],
            ['-n', 'My badly set name'],
            ['--output', 'badoutput'],
            ['-o', 'badoutput'],
            ['--custom-option']
        ]);

        expect(spawnMock.firstCall.args[1]).to.eql(['--custom-option', '--name', 'My Receiver Name', '--output', 'stdout']);
    });
});