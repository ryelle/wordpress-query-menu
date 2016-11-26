/*global SiteSettings */
/**
 * External dependencies
 */
import { combineReducers } from 'redux';
import API from 'wordpress-rest-api-oauth-1';
const api = new API( {
	url: SiteSettings.endpoint
} );

/**
 * Menu actions
 */
export const MENU_REQUEST = 'wordpress-redux/menu/REQUEST';
export const MENU_REQUEST_SUCCESS = 'wordpress-redux/menu/REQUEST_SUCCESS';
export const MENU_REQUEST_FAILURE = 'wordpress-redux/menu/REQUEST_FAILURE';

/**
 * Tracks all known menu objects, indexed by menu location
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action payload
 * @return {Object}        Updated state
 */
export function items( state = {}, action ) {
	switch ( action.type ) {
		case MENU_REQUEST_SUCCESS:
			return { ...state, [ action.location ]: action.menu };
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
export function requests( state = {}, action ) {
	switch ( action.type ) {
		case MENU_REQUEST:
		case MENU_REQUEST_SUCCESS:
		case MENU_REQUEST_FAILURE:
			return { ...state, [ action.location ]: MENU_REQUEST === action.type };
		default:
			return state;
	}
}

export default combineReducers( {
	items,
	requests
} );

/**
 * Triggers a network request to fetch a specific post from a site.
 *
 * @param  {string}   location  Menu location ID, as set by theme
 * @return {Function}           Action thunk
 */
export function requestMenu( location ) {
	return ( dispatch ) => {
		dispatch( {
			type: MENU_REQUEST,
			location
		} );

		api.get( `/wp-api-menus/v2/menu-locations/${ location }` ).then( menu => {
			dispatch( {
				type: MENU_REQUEST_SUCCESS,
				location,
				menu,
			} );
		} ).catch( error => {
			dispatch( {
				type: MENU_REQUEST_FAILURE,
				location,
				error
			} );
		} );
	};
}

/**
 * Force-set a menu with a given menu object tree
 *
 * @param  {string}   location  Menu location ID, as set by theme
 * @param  {object}   data      Menu data, as tree of menu items
 * @return {Function}           Action thunk
 */
export function setMenu( location, data ) {
	return ( dispatch ) => {
		dispatch( {
			type: MENU_REQUEST_SUCCESS,
			location,
			menu: data,
		} );
	};
}
