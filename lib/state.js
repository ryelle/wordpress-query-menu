'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.MENU_REQUEST_FAILURE = exports.MENU_REQUEST_SUCCESS = exports.MENU_REQUEST = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /*global SiteSettings */
/**
 * External dependencies
 */


exports.items = items;
exports.requests = requests;
exports.requestMenu = requestMenu;
exports.setMenu = setMenu;

var _redux = require('redux');

var _wordpressRestApiOauth = require('wordpress-rest-api-oauth-1');

var _wordpressRestApiOauth2 = _interopRequireDefault(_wordpressRestApiOauth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var api = new _wordpressRestApiOauth2.default({
	url: SiteSettings.endpoint
});

/**
 * Menu actions
 */
var MENU_REQUEST = exports.MENU_REQUEST = 'wordpress-redux/menu/REQUEST';
var MENU_REQUEST_SUCCESS = exports.MENU_REQUEST_SUCCESS = 'wordpress-redux/menu/REQUEST_SUCCESS';
var MENU_REQUEST_FAILURE = exports.MENU_REQUEST_FAILURE = 'wordpress-redux/menu/REQUEST_FAILURE';

/**
 * Tracks all known menu objects, indexed by menu location
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action payload
 * @return {Object}        Updated state
 */
function items() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var action = arguments[1];

	switch (action.type) {
		case MENU_REQUEST_SUCCESS:
			return _extends({}, state, _defineProperty({}, action.location, action.menu));
		default:
			return state;
	}
}

/**
 * Returns the updated post requests state after an action has been
 * dispatched. The state reflects a mapping of menu location to a
 * boolean reflecting whether a request for the post is in progress.
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action payload
 * @return {Object}        Updated state
 */
function requests() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var action = arguments[1];

	switch (action.type) {
		case MENU_REQUEST:
		case MENU_REQUEST_SUCCESS:
		case MENU_REQUEST_FAILURE:
			return _extends({}, state, _defineProperty({}, action.location, MENU_REQUEST === action.type));
		default:
			return state;
	}
}

exports.default = (0, _redux.combineReducers)({
	items: items,
	requests: requests
});

/**
 * Triggers a network request to fetch a specific post from a site.
 *
 * @param  {string}   location  Menu location ID, as set by theme
 * @return {Function}           Action thunk
 */

function requestMenu(location) {
	return function (dispatch) {
		dispatch({
			type: MENU_REQUEST,
			location: location
		});

		api.get('/wp-api-menus/v2/menu-locations/' + location).then(function (menu) {
			dispatch({
				type: MENU_REQUEST_SUCCESS,
				location: location,
				menu: menu
			});
		}).catch(function (error) {
			dispatch({
				type: MENU_REQUEST_FAILURE,
				location: location,
				error: error
			});
		});
	};
}

/**
 * Force-set a menu with a given menu object tree
 *
 * @param  {string}   location  Menu location ID, as set by theme
 * @param  {object}   data      Menu data, as tree of menu items
 * @return {Function}           Action thunk
 */
function setMenu(location, data) {
	return function (dispatch) {
		dispatch({
			type: MENU_REQUEST_SUCCESS,
			location: location,
			menu: data
		});
	};
}