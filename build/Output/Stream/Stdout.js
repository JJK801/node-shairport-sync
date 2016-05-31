'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Stdout = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Stream2 = require('../Stream');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _stream = Symbol("stream");

var Stdout = exports.Stdout = function (_Stream) {
    _inherits(Stdout, _Stream);

    function Stdout() {
        _classCallCheck(this, Stdout);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Stdout).apply(this, arguments));
    }

    _createClass(Stdout, [{
        key: 'start',
        value: function start(proc) {
            if (this.stream) return;

            _get(Object.getPrototypeOf(Stdout.prototype), 'start', this).call(this, proc);

            this[_stream] = proc.stdout;
        }
    }, {
        key: 'name',
        get: function get() {
            return 'stdout';
        }
    }, {
        key: 'args',
        get: function get() {
            return [];
        }
    }, {
        key: 'stream',
        get: function get() {
            return this[_stream];
        }
    }]);

    return Stdout;
}(_Stream2.Stream);