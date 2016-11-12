/**
 * Returns a menu object tree by its location name.
 *
 * @param  {Object} state    Global state tree
 * @param  {String} location Menu location ID, as set by theme
 * @return {Object}          Menu object tree
 */
export function getMenu( state, location ) {
	return state.menu.items[ location ];
}

/**
 * Returns true if a request is in progress for the specified menu, or
 * false otherwise.
 *
 * @param  {Object}  state     Global state tree
 * @param  {String}  location  Menu location ID, as set by theme
 * @return {Boolean}           Whether request is in progress
 */
export function isRequestingMenu( state, location ) {
	if ( ! state.menu.requests ) {
		return false;
	}

	return !! state.menu.requests[ location ];
}
