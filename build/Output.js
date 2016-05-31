'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Output = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _ShairportSync = require('./ShairportSync');

var _child_process = require('child_process');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _started = Symbol("started");

var Output = exports.Output = function () {
    function Output() {
        _classCallCheck(this, Output);

        this[_started] = false;
    }

    _createClass(Output, [{
        key: 'start',
        value: function start(proc) {
            if (this.started) return;

            (0, _assert2.default)(proc instanceof _child_process.ChildProcess, this.constructor.name + '::start() Argument#1 must be an instanceof ChildProcess');

            this[_started] = true;
        }
    }, {
        key: 'name',
        get: function get() {
            throw new Error(this.constructor.name + '::name must be implemented.');
        }
    }, {
        key: 'args',
        get: function get() {
            throw new Error(this.constructor.name + '::args must be implemented.');
        }
    }, {
        key: 'started',
        get: function get() {
            return this[_started];
        }
    }]);

    return Output;
}();