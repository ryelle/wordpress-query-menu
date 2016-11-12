/**
 * External dependencies
 */
import { expect } from 'chai';
import deepFreeze from 'deep-freeze';

/**
 * Internal dependencies
 */
import * as selectors from '../src/selectors';
import primary from './fixtures/primary';

const state = deepFreeze( {
	menu: {
		items: {
			primary
		},
		requests: {
			primary: false,
			footer: true,
		}
	}
} );

describe( 'Menu selectors', function() {
	it( 'should contain isRequestingMenu method', function() {
		expect( selectors.isRequestingMenu ).to.be.a( 'function' );
	} );

	it( 'should contain getMenu method', function() {
		expect( selectors.getMenu ).to.be.a( 'function' );
	} );

	describe( 'isRequestingMenu', function() {
		it( 'Should get `false` if the menu has not been requested yet', function() {
			expect( selectors.isRequestingMenu( state, 'unrequested-location' ) ).to.be.false;
		} );

		it( 'Should get `false` if this menu has already been fetched', function() {
			expect( selectors.isRequestingMenu( state, 'primary' ) ).to.be.false;
		} );

		it( 'Should get `true` if this menu is being fetched', function() {
			expect( selectors.isRequestingMenu( state, 'footer' ) ).to.be.true;
		} );
	} );

	describe( 'getMenu', function() {
		it( 'Should get `undefined` if the menu has not been requested yet', function() {
			expect( selectors.getMenu( state, 'footer' ) ).to.be.undefined;
		} );

		it( 'Should get the menu object tree if this menu is in our state', function() {
			expect( selectors.getMenu( state, 'primary' ) ).to.eql( primary );
		} );
	} );
} );
