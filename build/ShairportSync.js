'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ShairportSync = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _Output = require('./Output');

var _Stdout = require('./Output/Stream/Stdout');

var _events = require('events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _name = Symbol("name");
var _output = Symbol("output");
var _process = Symbol("process");

var ShairportSync = exports.ShairportSync = function (_EventEmitter) {
    _inherits(ShairportSync, _EventEmitter);

    function ShairportSync() {
        var output = arguments.length <= 0 || arguments[0] === undefined ? new _Stdout.Stdout() : arguments[0];

        _classCallCheck(this, ShairportSync);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ShairportSync).call(this));

        (0, _assert2.default)(output instanceof _Output.Output, 'new ShairportSync() Argument#1 must be an Output instance.');

        _this[_output] = output;
        _this[_process] = null;
        return _this;
    }

    _createClass(ShairportSync, [{
        key: 'start',
        value: function start() {
            var config = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

            if (this.process) return;

            var spawn = _child_process2.default.spawn;

            (0, _assert2.default)(_lodash2.default.isArray(config), 'ShairportSync::start() Argument#1 must be an Array.');

            var args = _lodash2.default.chain(config).clone(true).filter(function (opt) {
                return !_lodash2.default.includes(['--name', '--output', "-n", "-o"], opt[0]);
            });

            if (this.name) args = args.concat([['--name', this.name]]);

            args = args.concat([['--output', this.output.name]]);

            if (this.output.args.length) {
                args = args.concat([["--"]]).concat(this.output.args);
            }

            args = args.flatten().value();

            this[_process] = spawn(ShairportSync.command, args);

            this.output.start(this.process);

            this.emit(ShairportSync.Events.START, this);
        }
    }, {
        key: 'name',
        set: function set(name) {
            if (this.process) return;

            this[_name] = name;
        },
        get: function get() {
            return this[_name];
        }
    }, {
        key: 'output',
        get: function get() {
            return this[_output];
        }
    }, {
        key: 'process',
        get: function get() {
            return this[_process];
        }
    }]);

    return ShairportSync;
}(_events.EventEmitter);

ShairportSync.Events = {
    START: 'start'
};

ShairportSync.command = "shairport-sync";