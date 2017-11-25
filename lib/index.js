'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _selectors = require('./selectors');

var _state = require('./state');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * External dependencies
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * Internal dependencies
 */


var debug = (0, _debug2.default)('query:menu');

var QueryMenu = function (_Component) {
	_inherits(QueryMenu, _Component);

	function QueryMenu() {
		_classCallCheck(this, QueryMenu);

		return _possibleConstructorReturn(this, (QueryMenu.__proto__ || Object.getPrototypeOf(QueryMenu)).apply(this, arguments));
	}

	_createClass(QueryMenu, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			this.request(this.props);
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (this.props.location === nextProps.location) {
				return;
			}

			this.request(nextProps);
		}
	}, {
		key: 'request',
		value: function request(props) {
			if (!props.requestingMenu) {
				debug('Request menu in location ' + props.location);
				props.requestMenu(props.location);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			return null;
		}
	}]);

	return QueryMenu;
}(_react.Component);

QueryMenu.propTypes = {
	location: _react.PropTypes.string.isRequired,
	requestingMenu: _react.PropTypes.bool,
	requestMenu: _react.PropTypes.func
};

QueryMenu.defaultProps = {
	requestMenu: function requestMenu() {}
};

exports.default = (0, _reactRedux.connect)(function (state, ownProps) {
	var location = ownProps.location;

	return {
		requestingMenu: (0, _selectors.isRequestingMenu)(state, location)
	};
}, function (dispatch) {
	return (0, _redux.bindActionCreators)({
		requestMenu: _state.requestMenu
	}, dispatch);
})(QueryMenu);